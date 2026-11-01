import "server-only";
import { z } from "zod";
import { identifiedPetRewardManifestSchema } from "../reward-contracts";

const count = z.number().int().min(0).max(Number.MAX_SAFE_INTEGER);
const sequence = count.min(1);
const owner = z.string().min(1).max(128);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const credential = z.string().regex(/^[a-f0-9]{64}$/);
const timestamp = z.number().int().min(0).max(8_640_000_000_000_000);
export const guestSnapshotSchema = z.object({
  answers: count,
  food: count.max(300),
  meals: count,
  outfit: z.enum(["none", "bandana"]),
  identified: identifiedPetRewardManifestSchema.optional(),
}).strict().refine(value => value.food + value.meals <= value.answers &&
  (value.outfit !== "bandana" || value.answers >= 5) && (!value.identified ||
    (value.answers === value.identified.entries.length &&
      value.food === value.identified.entries.filter(entry => entry.food === "available").length &&
      value.meals === value.identified.entries.filter(entry => entry.food === "consumed").length)), "inconsistent_guest_segment");
export type GuestSnapshot = z.infer<typeof guestSnapshotSchema>;

const segment = { source: credential, segmentNo: sequence, segmentId: z.uuid(), snapshot: guestSnapshotSchema };
export const petRequestSchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("read") }).strict(),
  z.object({ action: z.literal("register"), confirmed: z.literal(true) }).strict(),
  z.object({ action: z.literal("reserve"), ...segment }).strict(),
  z.object({ action: z.literal("import"), ...segment, reservationId: z.uuid(), confirmed: z.literal(true) }).strict(),
  z.object({ action: z.literal("renew"), ...segment, reservationId: z.uuid(), confirmed: z.literal(true) }).strict(),
  z.object({ action: z.literal("status"), source: credential, segmentNo: sequence }).strict(),
  z.object({ action: z.literal("delete"), confirmed: z.literal(true) }).strict(),
]);
export type PetRequest = z.infer<typeof petRequestSchema>;
const pendingSchema = z.object({
  segmentId: z.uuid(), snapshotHash: hash, reservationId: z.uuid(),
  issuedAt: timestamp, expiresAt: timestamp,
}).strict().refine(value => value.expiresAt > value.issuedAt &&
  value.expiresAt - value.issuedAt <= 7 * 86_400_000);
const petStateSchema = z.object({
  version: z.literal(1), answers: count, food: count.max(300), meals: count,
  outfit: z.enum(["none", "bandana"]),
  lastVisitDay: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable(),
}).strict();
export const petDocumentSchema = z.object({
  version: z.literal(1),
  pets: z.array(z.object({ owner, state: petStateSchema }).strict()),
  sources: z.array(z.object({
    sourceHash: hash, owner, lastAcceptedSegment: count,
    pending: pendingSchema.nullable(),
  }).strict()),
  claims: z.array(z.object({ sourceHash: hash, segmentNo: sequence, expiresAt: timestamp }).strict()),
}).strict().superRefine((doc, context) => {
  const owners = new Set(doc.pets.map(pet => pet.owner));
  const sources = new Set(doc.sources.map(source => source.sourceHash));
  const claims = new Set(doc.claims.map(claim => `${claim.sourceHash}:${claim.segmentNo}`));
  if (owners.size !== doc.pets.length || sources.size !== doc.sources.length || claims.size !== doc.claims.length ||
    doc.sources.some(source => !owners.has(source.owner)) || doc.claims.some(claim => !sources.has(claim.sourceHash))) {
    context.addIssue({ code: "custom", message: "invalid_pet_relationships" });
  }
});
export type PetDocument = z.infer<typeof petDocumentSchema>;
export type PetSource = PetDocument["sources"][number];
export interface PetRepository {
  /** Must serialize fresh-read + callback + atomic commit across ALL instances. */
  transaction<T>(operation: (document: PetDocument) => T): Promise<T>;
}
export function emptyPetDocument(): PetDocument {
  return { version: 1, pets: [], sources: [], claims: [] };
}
export class PetStorageError extends Error {
  constructor(public readonly code: "storage_busy" | "storage_unavailable", cause?: unknown) { super(code, { cause }); }
}
