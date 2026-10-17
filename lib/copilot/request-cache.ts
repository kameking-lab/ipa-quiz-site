import { createHash, randomBytes } from "node:crypto";

const TTL_SECONDS = 90;
const MAX_BODY_BYTES = 32 * 1024;
const KV_TIMEOUT_MS = 1_500;
const TOKEN_PATTERN = /^[a-f0-9]{64}$/u;

export interface CopilotRequestTicket {
  key: string;
  token: string;
  value: string;
}

export type CopilotRequestStart =
  | { kind: "claimed"; ticket: CopilotRequestTicket }
  | { kind: "cached"; text: string }
  | { kind: "pending" }
  | { kind: "unavailable" };

type Message = { role: "user" | "assistant"; content: string };

function clientIp(request: Request): string | null {
  const raw = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")?.trim();
  // A missing IP must not turn all visitors into one shared answer cache.
  return raw && raw.length <= 128 ? raw : null;
}

function config(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL?.replace(/\/$/, "");
  const token = process.env.KV_REST_API_TOKEN;
  return url && token ? { url, token } : null;
}

type KvResult = { ok: true; result: unknown } | { ok: false };

async function command(args: (string | number)[]): Promise<KvResult> {
  const cfg = config();
  if (!cfg) return { ok: false };
  try {
    const response = await fetch(`${cfg.url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${cfg.token}`, "Content-Type": "application/json" },
      body: JSON.stringify([args]),
      signal: AbortSignal.timeout(KV_TIMEOUT_MS),
    });
    if (!response.ok) return { ok: false };
    const json: unknown = await response.json();
    if (!Array.isArray(json) || json.length !== 1) return { ok: false };
    const entry: unknown = json[0];
    if (typeof entry !== "object" || entry === null || !("result" in entry) || "error" in entry) {
      return { ok: false };
    }
    return { ok: true, result: entry.result };
  } catch {
    return { ok: false };
  }
}

function parseEntry(value: unknown): { state: "pending"; token: string } | { state: "ready"; text: string } | null {
  if (typeof value !== "string") return null;
  try {
    const parsed: unknown = JSON.parse(value);
    if (typeof parsed !== "object" || parsed === null) return null;
    if ("state" in parsed && parsed.state === "pending" && "token" in parsed
      && typeof parsed.token === "string" && TOKEN_PATTERN.test(parsed.token)) {
      return { state: "pending", token: parsed.token };
    }
    if ("state" in parsed && parsed.state === "ready" && "text" in parsed
      && typeof parsed.text === "string" && parsed.text.length > 0
      && Buffer.byteLength(parsed.text, "utf8") <= MAX_BODY_BYTES) {
      return { state: "ready", text: parsed.text };
    }
    return null;
  } catch {
    return null;
  }
}

export async function beginCopilotRequest(input: {
  request: Request;
  model: string;
  system: string;
  userMessages: Message[];
}): Promise<CopilotRequestStart> {
  const ip = clientIp(input.request);
  if (!ip || !config()) return { kind: "unavailable" };
  const digest = createHash("sha256")
    .update(JSON.stringify([ip, input.model, input.system, input.userMessages]))
    .digest("hex");
  const key = `copilot:request:v1:${digest}`;
  const token = randomBytes(32).toString("hex");
  const pendingValue = JSON.stringify({ state: "pending", token });
  const claim = await command(["SET", key, pendingValue, "EX", TTL_SECONDS, "NX"]);
  if (!claim.ok) return { kind: "unavailable" };
  if (claim.result === "OK") return { kind: "claimed", ticket: { key, token, value: pendingValue } };
  if (claim.result !== null) return { kind: "unavailable" };

  const current = await command(["GET", key]);
  if (!current.ok) return { kind: "unavailable" };
  const entry = parseEntry(current.result);
  if (entry?.state === "pending") return { kind: "pending" };
  if (entry?.state === "ready") return { kind: "cached", text: entry.text };
  return { kind: "unavailable" };
}

const COMPLETE_SCRIPT = `if redis.call('GET', KEYS[1]) == ARGV[1] then
  return redis.call('SET', KEYS[1], ARGV[2], 'EX', ARGV[3])
end
return 0`;

function validTicket(ticket: CopilotRequestTicket): boolean {
  return TOKEN_PATTERN.test(ticket.token)
    && /^copilot:request:v1:[a-f0-9]{64}$/u.test(ticket.key)
    && ticket.value === JSON.stringify({ state: "pending", token: ticket.token });
}

export async function completeCopilotRequest(ticket: CopilotRequestTicket, text: string): Promise<boolean> {
  if (!validTicket(ticket) || !text || Buffer.byteLength(text, "utf8") > MAX_BODY_BYTES) return false;
  const ready = JSON.stringify({ state: "ready", text });
  const result = await command(["EVAL", COMPLETE_SCRIPT, 1, ticket.key, ticket.value, ready, TTL_SECONDS]);
  return result.ok && result.result === "OK";
}

const RELEASE_SCRIPT = `if redis.call('GET', KEYS[1]) == ARGV[1] then
  return redis.call('DEL', KEYS[1])
end
return 0`;

/** Release only a lease whose provider has not started. Never use after dispatch. */
export async function releaseCopilotRequest(ticket: CopilotRequestTicket): Promise<boolean> {
  if (!validTicket(ticket)) return false;
  const result = await command(["EVAL", RELEASE_SCRIPT, 1, ticket.key, ticket.value]);
  return result.ok && result.result === 1;
}
