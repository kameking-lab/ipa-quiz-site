import { z } from "zod";

const id = z.string().min(1);
/** References are locators only. A server must resolve them against its own
 * canonical loader before claiming a reward; a browser reference is no proof. */
export const petRewardReferenceSchema = z.discriminatedUnion("source", [
  z.object({ source: z.literal("question"), exam: id, questionId: id }).strict(),
  z.object({ source: z.literal("library"), examId: id, questionId: id }).strict(),
]);
export type PetRewardReference = z.infer<typeof petRewardReferenceSchema>;
export function petRewardReferenceKey(reference: PetRewardReference): string {
  return JSON.stringify(reference.source === "question"
    ? ["question", reference.exam, reference.questionId]
    : ["library", reference.examId, reference.questionId]);
}
export const canonicalPetRewardIdentitySchema = z.object({ canonicalExam: id, canonicalQuestion: id }).strict();
export type CanonicalPetRewardIdentity = z.infer<typeof canonicalPetRewardIdentitySchema>;
export function canonicalPetRewardKey(identity: CanonicalPetRewardIdentity): string {
  return JSON.stringify([identity.canonicalExam, identity.canonicalQuestion]);
}
/** Exactly one potential food token per identified answer. No token is invented
 * for legacy aggregates whose per-question disposition is not known. */
export const petGuestRewardEntrySchema = z.object({ reference: petRewardReferenceSchema,
  food: z.enum(["none", "available", "consumed"]) }).strict();
export type PetGuestRewardEntry = z.infer<typeof petGuestRewardEntrySchema>;
export const identifiedPetRewardManifestSchema = z.object({ version: z.literal(1),
  entries: z.array(petGuestRewardEntrySchema) }).strict().superRefine((manifest, context) => {
  const keys = manifest.entries.map(entry => petRewardReferenceKey(entry.reference));
  if (new Set(keys).size !== keys.length) context.addIssue({ code: "custom", message: "Duplicate guest reward reference" });
});
export type IdentifiedPetRewardManifest = z.infer<typeof identifiedPetRewardManifestSchema>;
