import { PET_CLOUD_MAX_BYTES, parsePetCloudEnvelope } from "../v1/cloud-merge";
import type { PetCloudEnvelope } from "../v1/cloud-merge";
import { checkPetCloudUpdate } from "./cloud-validation";

/** Storage port. `version` is a compare-and-set counter starting at 1. */
export interface PetCloudRow { document: unknown; version: number }
export interface PetCloudRepository {
  findVersion(userId: string): Promise<number | null>;
  find(userId: string): Promise<PetCloudRow | null>;
  /** false when a row already exists (lost a create race). */
  create(userId: string, document: unknown): Promise<boolean>;
  /** false when the stored version is no longer `expected`. */
  update(userId: string, expected: number, document: unknown): Promise<boolean>;
}
export interface PetCloudDeps {
  /** The signed-in user's id from trusted server auth, or null. */
  userId(): Promise<string | null>;
  repository(): PetCloudRepository | null;
  now(): number;
  limiter: PetCloudLimiter;
}

const HEADERS = { "Cache-Control": "private, no-store", Vary: "Cookie", "X-Content-Type-Options": "nosniff" };
const json = (value: unknown, status = 200, extra: Record<string, string> = {}) =>
  Response.json(value, { status, headers: { ...HEADERS, ...extra } });
const MAX_BODY = PET_CLOUD_MAX_BYTES + 4096;

/** Per-instance sliding window per account. Writes are already batched by the
 * client (one every ~15-60 s); this only stops a runaway or hostile loop. */
export class PetCloudLimiter {
  private readonly hits = new Map<string, number[]>();
  constructor(private readonly limits: { read: number; write: number; windowMs: number } = { read: 30, write: 12, windowMs: 60_000 }) {}
  allow(kind: "read" | "write", userId: string, now: number): boolean {
    const key = `${kind}:${userId}`, since = now - this.limits.windowMs;
    const recent = (this.hits.get(key) ?? []).filter(time => time > since);
    if (recent.length >= this.limits[kind]) { this.hits.set(key, recent); return false; }
    recent.push(now); this.hits.set(key, recent);
    if (this.hits.size > 10_000) for (const [entry, times] of this.hits) if (times.every(time => time <= since)) this.hits.delete(entry);
    return true;
  }
}

/** Same-origin only. Browsers send Sec-Fetch-Site/Origin on fetch; requests
 * from other sites (or without either header on a write) are refused. */
export function isSameOriginRequest(request: Request, write: boolean): boolean {
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return false;
  const origin = request.headers.get("origin");
  if (!origin) return !write || site === "same-origin";
  try {
    const host = new URL(origin).host;
    return host === new URL(request.url).host || host === request.headers.get("x-forwarded-host") || host === request.headers.get("host");
  } catch { return false; }
}

async function readBody(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid_request");
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.byteLength;
    if (size > MAX_BODY) { await reader.cancel(); throw new Error("request_too_large"); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return JSON.parse(new TextDecoder().decode(bytes));
}
function storedEnvelope(row: PetCloudRow | null, userId: string): PetCloudEnvelope | null {
  if (!row) return null;
  const envelope = parsePetCloudEnvelope(row.document);
  if (envelope.document.ownerScope !== `user:${userId}`) throw new Error("stored_owner_mismatch");
  return envelope;
}

export async function getPetCloudProfile(request: Request, deps: PetCloudDeps): Promise<Response> {
  try {
    if (!isSameOriginRequest(request, false)) return json({ error: "invalid_origin" }, 403);
    const repository = deps.repository();
    if (!repository) return json({ error: "unavailable" }, 503);
    const userId = await deps.userId();
    if (!userId) return json({ error: "sign_in_required" }, 401);
    if (!deps.limiter.allow("read", userId, deps.now())) return json({ error: "rate_limited" }, 429, { "Retry-After": "60" });
    const known = Number(new URL(request.url).searchParams.get("known"));
    // A version-only lookup first: unchanged copies cost no document transfer.
    if (Number.isSafeInteger(known) && known > 0 && await repository.findVersion(userId) === known)
      return json({ version: known, unchanged: true });
    const row = await repository.find(userId);
    return json({ version: row?.version ?? 0, envelope: storedEnvelope(row, userId) });
  } catch { return json({ error: "unavailable" }, 503); }
}

export async function putPetCloudProfile(request: Request, deps: PetCloudDeps): Promise<Response> {
  try {
    if (!isSameOriginRequest(request, true)) return json({ error: "invalid_origin" }, 403);
    const repository = deps.repository();
    if (!repository) return json({ error: "unavailable" }, 503);
    const userId = await deps.userId();
    if (!userId) return json({ error: "sign_in_required" }, 401);
    const now = deps.now();
    if (!deps.limiter.allow("write", userId, now)) return json({ error: "rate_limited" }, 429, { "Retry-After": "60" });
    let body: unknown;
    try { body = await readBody(request); }
    catch (error) { return json({ error: error instanceof Error && error.message === "request_too_large" ? "request_too_large" : "invalid_request" }, error instanceof Error && error.message === "request_too_large" ? 413 : 400); }
    const input = body as { expectedVersion?: unknown; envelope?: unknown } | null;
    if (!input || typeof input !== "object" || !Number.isSafeInteger(input.expectedVersion) || (input.expectedVersion as number) < 0)
      return json({ error: "invalid_request" }, 400);
    const expected = input.expectedVersion as number;
    const row = await repository.find(userId);
    const conflict = () => json({ error: "version_conflict", version: row?.version ?? 0, envelope: storedEnvelope(row, userId) }, 409);
    if ((row?.version ?? 0) !== expected) return conflict();
    const check = checkPetCloudUpdate(input.envelope, userId, storedEnvelope(row, userId), now);
    if (!check.ok) return json({ error: "rejected", reason: check.reason }, 422);
    const document: unknown = JSON.parse(check.serialized);
    const written = row ? await repository.update(userId, expected, document) : await repository.create(userId, document);
    if (!written) {
      const latest = await repository.find(userId);
      return json({ error: "version_conflict", version: latest?.version ?? 0, envelope: storedEnvelope(latest, userId) }, 409);
    }
    return json({ version: expected + 1 });
  } catch { return json({ error: "unavailable" }, 503); }
}
