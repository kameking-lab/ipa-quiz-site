import { z } from "zod";
import type { GuestSnapshot, PetRequest } from "../server/contracts";
import { identifiedPetRewardManifestSchema } from "../reward-contracts";

const count = z.number().int().min(0).max(Number.MAX_SAFE_INTEGER);
const uuid = z.uuid();
const credential = z.string().regex(/^[a-f0-9]{64}$/);
export const snapshotSchema = z.object({ answers: count, food: count.max(300), meals: count,
  outfit: z.enum(["none", "bandana"]), identified: identifiedPetRewardManifestSchema.optional() }).strict().superRefine((snapshot, context) => {
    if (snapshot.identified && (snapshot.answers !== snapshot.identified.entries.length ||
      snapshot.food !== snapshot.identified.entries.filter(entry => entry.food === "available").length ||
      snapshot.meals !== snapshot.identified.entries.filter(entry => entry.food === "consumed").length))
      context.addIssue({ code: "custom", message: "Identified snapshot totals mismatch" });
  }).refine(s =>
  s.food + s.meals <= s.answers && (s.outfit !== "bandana" || s.answers >= 5));
export const reservationSchema = z.object({ reservationId: uuid, segmentNo: count.min(1),
  segmentId: uuid, snapshotHash: credential, issuedAt: count.max(8_640_000_000_000_000), expiresAt: count.max(8_640_000_000_000_000) }).strict()
  .refine(r => r.expiresAt > r.issuedAt && r.expiresAt - r.issuedAt <= 7 * 86400000);
export const queueItemSchema = z.object({
  owner: z.string().min(1).max(128), segmentId: uuid, segmentNo: count.min(1), snapshot: snapshotSchema,
  source: credential.nullable(), reservation: reservationSchema.nullable(), accepted: z.boolean(),
}).strict().refine(q => (!q.reservation || (q.source !== null && q.reservation.segmentId === q.segmentId &&
  q.reservation.segmentNo === q.segmentNo)) && (!q.accepted || q.source !== null));
export const documentSchema = z.object({ version: z.literal(1), revision: count,
  account: z.string().min(1).max(128).nullable(),
  guest: z.object({ segmentId: uuid, snapshot: snapshotSchema }).strict(),
  // Detached guest segments are retained after logout/switch; never implicitly imported.
  detached: z.array(z.object({ segmentId: uuid, snapshot: snapshotSchema }).strict()),
  connections: z.array(z.object({ owner: z.string().min(1).max(128), source: credential, nextSegmentNo: count.min(1) }).strict()),
  queue: z.array(queueItemSchema),
}).strict().refine(d => new Set([d.guest.segmentId, ...d.detached.map(s => s.segmentId),
  ...d.queue.map(q => q.segmentId)]).size === 1 + d.detached.length + d.queue.length &&
  new Set(d.connections.map(c => c.owner)).size === d.connections.length &&
  new Set(d.connections.map(c => c.source)).size === d.connections.length &&
  new Set(d.queue.filter(q => !q.accepted).map(q => q.owner)).size === d.queue.filter(q => !q.accepted).length &&
  d.queue.every(q => {
    const c = d.connections.find(c => c.owner === q.owner);
    return q.source === null ? !c && q.segmentNo === 1 : !!c && q.source === c.source &&
      (q.accepted ? q.segmentNo < c.nextSegmentNo : q.segmentNo === c.nextSegmentNo);
  }));
export type QueueDocument = z.infer<typeof documentSchema>;
export type QueueItem = z.infer<typeof queueItemSchema>;
export const replySchema = z.object({
  outcome: z.enum(["ok", "registered", "reserved", "applied", "already_accepted", "pending", "expired",
    "renewed", "deleted", "source_unavailable", "source_busy", "pending_gap", "reservation_mismatch", "invalid", "account_unavailable", "legacy_hold", "capacity_hold"]),
  source: credential.optional(), lastAcceptedSegment: count.optional(), reservation: reservationSchema.optional(),
  // Account totals are deliberately not persisted or copied to guest progress.
  state: z.unknown().optional(),
}).strict();
export interface PetClientTransport {
  /** MUST atomically bind trusted server auth to expectedAccount; no owner field in wire body. */
  send(request: PetRequest, expectedAccount: string, signal?: AbortSignal): Promise<unknown>;
}
export interface PetStoragePort { getItem(key: string): string | null; setItem(key: string, value: string): void }
export interface PetExclusivePort { run<T>(key: string, operation: () => Promise<T>): Promise<T> }
export const disconnectedPetTransport: PetClientTransport = {
  async send() { throw new Error("transport_disconnected"); },
};
export function emptyGuestSnapshot(): GuestSnapshot { return { answers: 0, food: 0, meals: 0, outfit: "none" }; }
