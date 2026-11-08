import { LS_KEYS } from "@/lib/storage/keys";
import type { PetExclusivePort } from "../client/contracts";
import { browserPetExclusive } from "../client/durable-queue";
import {
  applyPetCloudEnvelope, emptyPetCloudState, handoffPetGuest, hasPetProgress, localPetCloudEnvelope, mergePetCloudEnvelopes,
  notePetCloudLocalChanges, parsePetCloudEnvelope, petCloudDeviceIdSchema, petCloudHash, petCloudStateFor, petCloudStateSchema,
} from "./cloud-merge";
import type { PetCloudEnvelope, PetCloudState } from "./cloud-merge";
import type { PetProfileDocument } from "./profile";
import type { PetOwnerContext, PetProfileStore } from "./profile-store";
import type { PetOwnerLease } from "./runtime";

/**
 * Background cloud save for a signed-in member's chihuahuas.
 *
 * The device document stays the source of what is shown; this module only
 * reconciles it with the account's server copy:
 * - after a change it waits for a quiet moment (15 s, at most 60 s) and sends
 *   one batched write; leaving or hiding the page sends it right away;
 * - offline or failed writes stay in the device document and are sent when the
 *   connection returns (or on the next visit);
 * - writes are compare-and-set; on a conflict the newer server copy is merged
 *   (never lowering growth) and sent again;
 * - on sign-in, the device guest's chihuahuas are handed over to the account
 *   (see {@link handoffPetGuest}) and the guest copy is emptied once saved.
 */
export const PET_CLOUD_ENDPOINT = "/api/pet/profile";
export const PET_CLOUD_DEBOUNCE_MS = 15_000;
export const PET_CLOUD_MAX_WAIT_MS = 60_000;
export const PET_CLOUD_PULL_INTERVAL_MS = 60_000;
export const PET_CLOUD_RETRY_MS = 60_000;
const KEEPALIVE_BYTES = 60_000;

export type PetCloudOutcome = "pushed" | "synced" | "idle" | "offline" | "unavailable" | "signed_out" | "owner_changed"
  | "rejected" | "conflict" | "storage_error" | "invalid_data" | "stopped";
export interface PetCloudStoragePort { getItem(key: string): string | null; setItem(key: string, value: string): void }
export interface PetCloudSyncDeps {
  fetch: typeof fetch;
  storage: PetCloudStoragePort;
  store: PetProfileStore;
  exclusive: PetExclusivePort;
  prepareOwner(isCurrent: () => boolean): Promise<PetOwnerLease | null>;
  now(): number;
  timeZone(): string;
  publish(document: PetProfileDocument): void;
  randomId(): string;
}
type Remote = { version: number; envelope: PetCloudEnvelope | null };
type Fetched = { kind: "changed"; remote: Remote } | { kind: "unchanged" } | { kind: "error"; outcome: PetCloudOutcome };

export function petCloudUserId(ownerScope: string): string | null {
  return ownerScope.startsWith("user:") && ownerScope.length > 5 ? ownerScope.slice(5) : null;
}

export class PetCloudSync {
  private lease: PetOwnerLease | null = null;
  private generation = 0;
  private stopped = false;
  private chain: Promise<unknown> = Promise.resolve();
  private timer: ReturnType<typeof setTimeout> | null = null;
  private retry: ReturnType<typeof setTimeout> | null = null;
  private pendingSince = 0;
  private lastPull = 0;
  private rejectedHash: string | null = null;

  constructor(private readonly deps: PetCloudSyncDeps) {}

  get ownerScope() { return this.lease?.ownerScope ?? null; }

  /** Resolves the signed-in owner and runs the first pull. false for guests. */
  async start(): Promise<boolean> {
    const generation = ++this.generation;
    this.lease = null;
    const lease = await this.deps.prepareOwner(() => !this.stopped && generation === this.generation);
    if (!lease || generation !== this.generation || this.stopped || !petCloudUserId(lease.ownerScope)) return false;
    this.lease = lease;
    void this.syncNow(true);
    return true;
  }
  stop() {
    this.stopped = true; this.generation++; this.lease = null;
    if (this.timer) clearTimeout(this.timer);
    if (this.retry) clearTimeout(this.retry);
    this.timer = this.retry = null;
  }
  /** A local change happened: batch it into one write. */
  requestSync() {
    if (this.stopped || !this.lease) return;
    const now = this.deps.now();
    if (!this.pendingSince) this.pendingSince = now;
    if (this.timer) clearTimeout(this.timer);
    const wait = Math.max(0, Math.min(PET_CLOUD_DEBOUNCE_MS, this.pendingSince + PET_CLOUD_MAX_WAIT_MS - now));
    this.timer = setTimeout(() => { this.timer = null; void this.syncNow(false); }, wait);
  }
  /** Page hidden or leaving: send what is pending now, surviving navigation. */
  flush() {
    if (this.stopped || !this.lease) return Promise.resolve<PetCloudOutcome>("stopped");
    if (this.timer) { clearTimeout(this.timer); this.timer = null; }
    return this.syncNow(false, true);
  }
  /** Back on the page: pick up other devices' changes, at most once a minute. */
  refresh() {
    if (this.stopped || !this.lease) return;
    if (this.deps.now() - this.lastPull >= PET_CLOUD_PULL_INTERVAL_MS) void this.syncNow(true);
  }
  syncNow(pull: boolean, keepalive = false): Promise<PetCloudOutcome> {
    const task = this.chain.then(() => this.run(pull, keepalive));
    this.chain = task.catch(() => undefined);
    return task.catch((): PetCloudOutcome => "storage_error");
  }

  private async run(pull: boolean, keepalive: boolean): Promise<PetCloudOutcome> {
    const lease = this.lease, userId = lease && petCloudUserId(lease.ownerScope);
    if (this.stopped || !lease || !userId || !lease.isCurrent()) return "stopped";
    this.pendingSince = 0;
    const outcome = await this.deps.exclusive.run(`pet-cloud:${userId}`, () => this.locked(lease, userId, pull, keepalive));
    if (["offline", "unavailable", "conflict"].includes(outcome) && !this.stopped) {
      if (this.retry) clearTimeout(this.retry);
      this.retry = setTimeout(() => { this.retry = null; void this.syncNow(false); }, PET_CLOUD_RETRY_MS);
    }
    if (outcome === "signed_out" || outcome === "owner_changed") this.lease = null;
    return outcome;
  }

  private stateKey(userId: string) { return LS_KEYS.petCloudStatePrefix + encodeURIComponent(userId); }
  private readState(userId: string): PetCloudState | null {
    try {
      const raw = this.deps.storage.getItem(this.stateKey(userId));
      return raw === null ? null : petCloudStateSchema.parse(JSON.parse(raw));
    } catch { return null; }
  }
  private writeState(userId: string, state: PetCloudState) {
    this.deps.storage.setItem(this.stateKey(userId), JSON.stringify(state));
  }
  private deviceId(): string {
    const existing = this.deps.storage.getItem(LS_KEYS.petCloudDevice);
    if (existing && petCloudDeviceIdSchema.safeParse(existing).success) return existing;
    const created = this.deps.randomId().replace(/[^A-Za-z0-9_-]/g, "").slice(0, 64);
    petCloudDeviceIdSchema.parse(created);
    this.deps.storage.setItem(LS_KEYS.petCloudDevice, created);
    return created;
  }

  private async locked(lease: PetOwnerLease, userId: string, pull: boolean, keepalive: boolean): Promise<PetCloudOutcome> {
    const { store } = this.deps, timeZone = this.deps.timeZone();
    const context: PetOwnerContext = { ownerScope: lease.ownerScope, isCurrent: lease.isCurrent, verifyCurrent: () => lease.revalidate() };
    const guestContext: PetOwnerContext = { ownerScope: "guest", isCurrent: lease.isCurrent, verifyCurrent: () => lease.revalidate() };
    const deviceId = this.deviceId();
    const stored = this.readState(userId);
    let state = stored ?? emptyPetCloudState();
    const guest = await store.load(guestContext, timeZone);
    const guestDocument = guest.status === "ready" && guest.document.profiles.some(hasPetProgress) ? guest.document : null;

    let remote: Remote | null = null;
    // A handoff compares against the account's current copy, so it always pulls.
    if (pull || !stored || guestDocument) {
      const fetched = await this.get(stored ? state.version : 0);
      if (fetched.kind === "error") return fetched.outcome;
      this.lastPull = this.deps.now();
      if (fetched.kind === "changed") remote = fetched.remote;
    }
    let handedOff = false;
    for (let attempt = 0; attempt < 4; attempt++) {
      if (!lease.isCurrent()) return "owner_changed";
      if (remote) {
        const absorbed = await this.absorb(context, timeZone, userId, deviceId, state, remote);
        if (typeof absorbed === "string") return absorbed;
        state = absorbed; remote = null;
      }
      if (guestDocument && !handedOff) {
        const result = await store.update(context, timeZone, current => handoffPetGuest(current, guestDocument).document);
        if (result.status !== "ready") return result.status;
        this.deps.publish(result.document);
        handedOff = true;
      }
      const loaded = await store.load(context, timeZone);
      if (loaded.status !== "ready") return loaded.status;
      const now = this.deps.now();
      const noted = notePetCloudLocalChanges(loaded.document, state, now);
      // Keep the first time a local preference change was seen across retries.
      if (JSON.stringify(noted) !== JSON.stringify(state)) { state = noted; this.writeState(userId, state); }
      if (loaded.document.profiles.length === 0 && state.version === 0) return "idle";
      const envelope = localPetCloudEnvelope(loaded.document, state, deviceId, now);
      const hash = petCloudHash(envelope);
      if (hash === state.hash) {
        if (handedOff) await this.clearGuest(guestContext, timeZone, guestDocument!.revision);
        return "synced";
      }
      if (hash === this.rejectedHash) return "rejected";
      const put = await this.put(state.version, envelope, keepalive);
      if (put.kind === "ok") {
        state = petCloudStateFor(envelope, put.version);
        this.writeState(userId, state);
        if (handedOff) await this.clearGuest(guestContext, timeZone, guestDocument!.revision);
        return "pushed";
      }
      if (put.kind === "conflict") { remote = put.remote; continue; }
      if (put.kind === "rejected") { this.rejectedHash = hash; return "rejected"; }
      return put.outcome;
    }
    return "conflict";
  }

  /** Merge a server copy into the device document. The merge state is saved
   * before the document, so an interrupted write can only under-count. */
  private async absorb(context: PetOwnerContext, timeZone: string, userId: string, deviceId: string,
    state: PetCloudState, remote: Remote): Promise<PetCloudState | PetCloudOutcome> {
    if (!remote.envelope) {
      const next = { ...state, version: remote.version, hash: "" };
      this.writeState(userId, next);
      return next;
    }
    const server = remote.envelope;
    if (server.document.ownerScope !== context.ownerScope) return "invalid_data";
    let next: PetCloudState = state, changed = false;
    const result = await this.deps.store.update(context, timeZone, current => {
      const now = this.deps.now();
      const local = localPetCloudEnvelope(current, state, deviceId, now);
      const merged = mergePetCloudEnvelopes(local, server);
      next = { ...petCloudStateFor(server, remote.version), meta: merged.meta, values: petCloudStateFor(merged, remote.version).values };
      this.writeState(userId, next);
      const applied = applyPetCloudEnvelope(current, merged);
      changed = applied !== current;
      return applied;
    });
    if (result.status !== "ready") return result.status;
    if (changed) this.deps.publish(result.document);
    return next;
  }

  private async clearGuest(context: PetOwnerContext, timeZone: string, revision: number) {
    // Only the copy that was handed over; a newer guest copy waits for next time.
    // Legacy migration record stays so the old device pet is not imported again.
    await this.deps.store.update(context, timeZone, document => {
      if (document.revision !== revision) throw new Error("pet_guest_changed");
      return { ...document, profiles: [], events: [] };
    });
  }

  private async get(known: number): Promise<Fetched> {
    let response: Response;
    try {
      response = await this.deps.fetch(`${PET_CLOUD_ENDPOINT}${known > 0 ? `?known=${known}` : ""}`,
        { method: "GET", credentials: "same-origin", cache: "no-store", headers: { Accept: "application/json" } });
    } catch { return { kind: "error", outcome: "offline" }; }
    if (response.status === 401) return { kind: "error", outcome: "signed_out" };
    if (!response.ok) return { kind: "error", outcome: "unavailable" };
    try {
      const body = await response.json() as { version?: unknown; unchanged?: unknown; envelope?: unknown };
      if (!Number.isSafeInteger(body.version)) return { kind: "error", outcome: "unavailable" };
      if (body.unchanged === true) return { kind: "unchanged" };
      return { kind: "changed", remote: { version: body.version as number,
        envelope: body.envelope === null || body.envelope === undefined ? null : parsePetCloudEnvelope(body.envelope) } };
    } catch { return { kind: "error", outcome: "unavailable" }; }
  }
  private async put(expectedVersion: number, envelope: PetCloudEnvelope, keepalive: boolean):
    Promise<{ kind: "ok"; version: number } | { kind: "conflict"; remote: Remote } | { kind: "rejected" } | { kind: "error"; outcome: PetCloudOutcome }> {
    const body = JSON.stringify({ expectedVersion, envelope });
    let response: Response;
    try {
      response = await this.deps.fetch(PET_CLOUD_ENDPOINT, { method: "PUT", credentials: "same-origin", cache: "no-store",
        headers: { "Content-Type": "application/json", Accept: "application/json" }, body,
        // keepalive requests are capped at 64 KiB by browsers.
        keepalive: keepalive && body.length < KEEPALIVE_BYTES });
    } catch { return { kind: "error", outcome: "offline" }; }
    if (response.status === 401) return { kind: "error", outcome: "signed_out" };
    if (response.status === 422) return { kind: "rejected" };
    try {
      const value = await response.json() as { version?: unknown; envelope?: unknown };
      if (response.status === 409 && Number.isSafeInteger(value.version))
        return { kind: "conflict", remote: { version: value.version as number,
          envelope: value.envelope === null || value.envelope === undefined ? null : parsePetCloudEnvelope(value.envelope) } };
      if (response.ok && Number.isSafeInteger(value.version)) return { kind: "ok", version: value.version as number };
    } catch { /* fall through */ }
    return { kind: "error", outcome: "unavailable" };
  }
}

/** Browser wiring; loaded lazily only after a signed-in pet owner appears. */
export async function browserPetCloudSync(): Promise<PetCloudSync> {
  const runtime = await import("./runtime");
  return new PetCloudSync({
    fetch: (...args) => fetch(...args), storage: localStorage, store: runtime.browserPetProfiles(),
    exclusive: browserPetExclusive(navigator.locks), prepareOwner: runtime.preparePetOwner,
    now: Date.now, timeZone: () => Intl.DateTimeFormat().resolvedOptions().timeZone,
    publish: document => window.dispatchEvent(new CustomEvent("pet-v1:updated", { detail: document })),
    randomId: () => crypto.randomUUID(),
  });
}
