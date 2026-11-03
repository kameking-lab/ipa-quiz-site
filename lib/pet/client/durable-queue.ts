import { documentSchema, emptyGuestSnapshot, replySchema, snapshotSchema } from "./contracts";
import type { PetClientTransport, PetExclusivePort, PetStoragePort, QueueDocument } from "./contracts";
import type { GuestSnapshot, PetRequest } from "../server/contracts";

export type QueueStatus = "local" | "queued" | "accepted" | "expired" | "retry" | "wrong_account" |
  "storage_error" | "invalid_response" | "recovery_required" | "legacy_hold" | "capacity_hold";
export interface QueueView { status: QueueStatus; document: QueueDocument | null }
class DurableWriteError extends Error {}
/** No default namespace or production connection. All dependencies must be explicit. */
export class DurablePetQueue {
  private view: QueueView = { status: "local", document: null };
  private listeners = new Set<() => void>();
  constructor(private readonly options: {
    key: string; storage: PetStoragePort; exclusive: PetExclusivePort; transport: PetClientTransport;
    currentAccount: () => string | null; uuid: () => string;
    sha256: (text: string) => Promise<string>;
    transportTimeoutMs?: number;
  }) {
    if (!options.key) throw new Error("explicit_storage_key_required");
    if (options.transportTimeoutMs !== undefined && (!Number.isSafeInteger(options.transportTimeoutMs) ||
      options.transportTimeoutMs < 1 || options.transportTimeoutMs > 60000)) throw new Error("invalid_transport_timeout");
  }
  getView = (): QueueView => this.view;
  subscribe = (listener: () => void): (() => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener); }; };
  private publish(status: QueueStatus, document = this.view.document) {
    // Consumers cannot mutate the controller's durable working document.
    this.view = { status, document: document ? structuredClone(document) : null };
    this.listeners.forEach(listener => listener());
  }
  private fresh() { return { segmentId: this.options.uuid(), snapshot: emptyGuestSnapshot() }; }
  private read(): QueueDocument {
    const raw = this.options.storage.getItem(this.options.key);
    return raw === null ? { version: 1, revision: 0, account: null, guest: this.fresh(), detached: [], connections: [], queue: [] }
      : documentSchema.parse(JSON.parse(raw));
  }
  private save(doc: QueueDocument) {
    try {
      const next = documentSchema.parse({ ...doc, revision: doc.revision + 1 });
      this.options.storage.setItem(this.options.key, JSON.stringify(next));
      doc.revision = next.revision;
    } catch { throw new DurableWriteError("durable_write_failed"); }
  }
  private async locked(operation: (doc: QueueDocument) => Promise<void>): Promise<QueueView> {
    try {
      await this.options.exclusive.run(this.options.key, async () => {
        let doc: QueueDocument;
        try { doc = this.read(); } catch { this.publish("storage_error", null); return; }
        try { await operation(doc); } catch { this.publish("storage_error", this.read()); }
      });
    } catch { this.publish("storage_error"); }
    return this.view;
  }
  load() { return this.locked(async doc => { this.publish("local", doc); }); }
  /** Export is deliberately caller-controlled; contains account IDs and source credentials. Never log. */
  exportRaw(): string | null { return this.options.storage.getItem(this.options.key); }
  /** Must be called on identity changes before new guest actions. Nonempty guest data is retained. */
  synchronizeAccount() { return this.locked(async doc => {
    const account = this.options.currentAccount();
    if (account !== doc.account) {
      if (doc.guest.snapshot.answers > 0) doc.detached.push(doc.guest);
      doc.guest = this.fresh(); doc.account = account; this.save(doc);
    }
    this.publish("local", doc);
  }); }
  /** Self-reported decorative guest action; never verification, billing or ranking evidence. */
  guestAction(action: "answer" | "feed" | "bandana") { return this.locked(async doc => {
    if (doc.account !== this.options.currentAccount()) { this.publish("wrong_account", doc); return; }
    const s = { ...doc.guest.snapshot };
    if (action === "answer") { s.answers += 1; s.food = Math.min(300, s.food + 1); }
    if (action === "feed" && s.food > 0) { s.food -= 1; s.meals += 1; }
    if (action === "bandana" && s.answers >= 5) s.outfit = "bandana";
    doc.guest.snapshot = snapshotSchema.parse(s); this.save(doc); this.publish("local", doc);
  }); }
  /** Exact user-chosen segment, including detached data, needs explicit confirmation. */
  confirmImport(segmentId: string, confirmed: boolean) { return this.locked(async doc => {
    const owner = this.options.currentAccount();
    if (!owner || owner !== doc.account) { this.publish("wrong_account", doc); return; }
    if (!confirmed) { this.publish("local", doc); return; }
    if (doc.queue.some(q => q.owner === owner && !q.accepted)) { this.publish("recovery_required", doc); return; }
    const segment = doc.guest.segmentId === segmentId ? doc.guest : doc.detached.find(s => s.segmentId === segmentId);
    if (!segment || !segment.snapshot.answers) { this.publish("recovery_required", doc); return; }
    if (!segment.snapshot.identified) { this.publish("legacy_hold", doc); return; }
    const connection = doc.connections.find(c => c.owner === owner);
    doc.queue.push({ owner, ...segment, segmentNo: connection?.nextSegmentNo ?? 1,
      source: connection?.source ?? null, reservation: null, accepted: false });
    if (segment === doc.guest) doc.guest = this.fresh();
    else doc.detached = doc.detached.filter(s => s.segmentId !== segmentId);
    this.save(doc); this.publish("queued", doc);
  }); }
  private async hash(snapshot: GuestSnapshot) {
    return this.options.sha256(JSON.stringify(snapshot.identified
      ? [snapshot.answers, snapshot.food, snapshot.meals, snapshot.outfit, snapshot.identified]
      : [snapshot.answers, snapshot.food, snapshot.meals, snapshot.outfit]));
  }
  private async boundedSend(request: PetRequest, owner: string): Promise<unknown> {
    const abort = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      return await Promise.race([
        this.options.transport.send(structuredClone(request), owner, abort.signal),
        new Promise<never>((_resolve, reject) => {
          timer = setTimeout(() => { abort.abort(); reject(new Error("transport_timeout")); }, this.options.transportTimeoutMs ?? 15000);
        }),
      ]);
    } finally { if (timer !== undefined) clearTimeout(timer); }
    // Abort is NOT rollback: next explicit attempt resolves durable status.
  }
  /** One explicit recovery attempt; no timer, retry loop or destructive reset. */
  recover(segmentId: string, confirmRenewal = false) { return this.locked(async doc => {
    const q = doc.queue.find(item => item.segmentId === segmentId);
    if (!q) { this.publish("recovery_required", doc); return; }
    const isOwner = () => this.options.currentAccount() === q.owner && doc.account === q.owner;
    if (!isOwner()) { this.publish("wrong_account", doc); return; }
    if (q.accepted) { this.publish("accepted", doc); return; }
    if (!q.snapshot.identified) {
      // Legacy unknown ACK recovery is status-only. Never register, reserve,
      // import, renew or rewrite its original snapshot/UUID/hash.
      if (!q.source) { this.publish("legacy_hold", doc); return; }
      try {
        const parsed = replySchema.safeParse(await this.boundedSend({ action: "status", source: q.source, segmentNo: q.segmentNo }, q.owner));
        if (!parsed.success) { this.publish("invalid_response", doc); return; }
        if (parsed.data.outcome === "already_accepted" && parsed.data.lastAcceptedSegment === q.segmentNo && !parsed.data.reservation) {
          const connection = doc.connections.find(item => item.owner === q.owner && item.source === q.source && item.nextSegmentNo === q.segmentNo);
          if (!connection) { this.publish("recovery_required", doc); return; }
          q.accepted = true; connection.nextSegmentNo++; this.save(doc);
          this.publish(isOwner() ? "accepted" : "wrong_account", doc); return;
        }
        this.publish(isOwner() ? "legacy_hold" : "wrong_account", doc);
      } catch { this.publish(isOwner() ? "retry" : "wrong_account", doc); }
      return;
    }
    const snapshotHash = await this.hash(q.snapshot);
    if (q.reservation && q.reservation.snapshotHash !== snapshotHash) { this.publish("recovery_required", doc); return; }
    const send = async (request: PetRequest) => {
      if (!isOwner()) throw new Error("identity_changed");
      const result = replySchema.safeParse(await this.boundedSend(request, q.owner));
      if (!result.success) throw new Error("invalid_response");
      if ("source" in request && result.data.source !== undefined && result.data.source !== request.source) throw new Error("invalid_response");
      // Late responses can persist old queue recovery data but cannot trigger another send.
      return { reply: result.data, ownerStillActive: isOwner() };
    };
    const accepted = (reply: ReturnType<typeof replySchema.parse>) => {
      if (reply.lastAcceptedSegment !== q.segmentNo || reply.reservation) throw new Error("invalid_response");
      const connection = doc.connections.find(c => c.owner === q.owner);
      if (!connection || connection.source !== q.source || connection.nextSegmentNo !== q.segmentNo) throw new Error("invalid_response");
      q.accepted = true; connection.nextSegmentNo += 1;
      this.save(doc); this.publish(isOwner() ? "accepted" : "wrong_account", doc);
    };
    const retainReservation = (reply: ReturnType<typeof replySchema.parse>) => {
      const r = reply.reservation;
      if (!r || r.segmentNo !== q.segmentNo || r.segmentId !== q.segmentId || r.snapshotHash !== snapshotHash ||
        reply.lastAcceptedSegment !== q.segmentNo - 1 || (q.reservation && q.reservation.reservationId !== r.reservationId)) throw new Error("invalid_response");
      q.reservation = r; this.save(doc);
    };
    const fields = () => ({ source: q.source!, segmentNo: q.segmentNo, segmentId: q.segmentId, snapshot: q.snapshot });
    try {
      if (!q.source) {
        const { reply, ownerStillActive } = await send({ action: "register", confirmed: true });
        if (reply.outcome !== "registered" || !reply.source || reply.lastAcceptedSegment !== 0) throw new Error("invalid_response");
        q.source = reply.source;
        doc.connections.push({ owner: q.owner, source: reply.source, nextSegmentNo: 1 }); this.save(doc);
        if (!ownerStillActive) { this.publish("wrong_account", doc); return; }
      }
      const status = await send({ action: "status", source: q.source!, segmentNo: q.segmentNo });
      let needsRenewal = status.reply.outcome === "expired";
      if (status.reply.outcome === "already_accepted") { accepted(status.reply); return; }
      if (!status.ownerStillActive) { this.publish("wrong_account", doc); return; }
      if (["pending", "expired"].includes(status.reply.outcome)) retainReservation(status.reply);
      else if (status.reply.outcome !== "pending_gap" || status.reply.lastAcceptedSegment !== q.segmentNo - 1 || status.reply.reservation) {
        this.publish("recovery_required", doc); return;
      } else if (q.reservation) { this.publish("recovery_required", doc); return; }
      if (!q.reservation) {
        const reserved = await send({ action: "reserve", ...fields() });
        if (reserved.reply.outcome === "already_accepted") { accepted(reserved.reply); return; }
        if (!["reserved", "expired"].includes(reserved.reply.outcome)) { this.publish("recovery_required", doc); return; }
        retainReservation(reserved.reply);
        needsRenewal = reserved.reply.outcome === "expired";
        if (!reserved.ownerStillActive) { this.publish("wrong_account", doc); return; }
        if (reserved.reply.outcome === "expired" && !confirmRenewal) { this.publish("expired", doc); return; }
      }
      if (needsRenewal) {
        if (!confirmRenewal) { this.publish("expired", doc); return; }
        const renewed = await send({ action: "renew", ...fields(), reservationId: q.reservation!.reservationId, confirmed: true });
        if (renewed.reply.outcome === "already_accepted") { accepted(renewed.reply); return; }
        if (renewed.reply.outcome !== "renewed") { this.publish("recovery_required", doc); return; }
        retainReservation(renewed.reply);
        if (!renewed.ownerStillActive) { this.publish("wrong_account", doc); return; }
      }
      const imported = await send({ action: "import", ...fields(), reservationId: q.reservation!.reservationId, confirmed: true });
      if (imported.reply.outcome === "legacy_hold" || imported.reply.outcome === "capacity_hold") { this.publish(imported.reply.outcome, doc); return; }
      if (["applied", "already_accepted"].includes(imported.reply.outcome)) { accepted(imported.reply); return; }
      if (imported.reply.outcome === "expired") { retainReservation(imported.reply); this.publish("expired", doc); return; }
      this.publish("recovery_required", doc);
    } catch (error) {
      if (error instanceof DurableWriteError) { this.publish("storage_error", this.read()); return; }
      this.publish(error instanceof Error && error.message === "invalid_response" ? "invalid_response" :
        !isOwner() ? "wrong_account" : "retry", doc);
    }
  }); }
}

/** Real browser primitives, explicitly unavailable when Web Locks is unsupported. */
export function browserPetExclusive(locks: LockManager | undefined): PetExclusivePort {
  return { async run(key, operation) {
    if (!locks) throw new Error("exclusive_browser_storage_unavailable");
    return locks.request(`pet-queue:${key}`, { mode: "exclusive" }, operation);
  } };
}
export async function browserPetSha256(text: string): Promise<string> {
  const bytes = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(bytes), byte => byte.toString(16).padStart(2, "0")).join("");
}
