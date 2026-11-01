import { z } from "zod";
import { PET_LIMITS } from "../state";

const selections = z.preprocess((value, context) => {
  if (value !== null && typeof value === "object" && Object.getOwnPropertyNames(value)
    .some(key => ["__proto__", "constructor", "prototype"].includes(key))) {
    context.addIssue({ code: "custom", message: "Unsafe native B slot identifier" });
    return z.NEVER;
  }
  return value;
}, z.record(z.string(), z.string()));
/** Browser shape/copy only. The unchanged server validator alone establishes
 * canonical completeness, readiness and grade. No history/snapshot conversion. */
export const petLearningSubmissionSchema = z.discriminatedUnion("source", [
  z.object({ source: z.literal("question"), questionId: z.string().min(1),
    answer: z.discriminatedUnion("kind", [
      z.object({ kind: z.literal("multiple-choice"), selected: z.array(z.string()) }).strict(),
      z.object({ kind: z.literal("numeric"), value: z.string() }).strict(),
      z.object({ kind: z.literal("ordering"), selected: z.array(z.string()) }).strict(),
      z.object({ kind: z.literal("native-b"), selections }).strict(),
    ]) }).strict(),
  z.object({ source: z.literal("library"), examId: z.string().min(1), questionId: z.string().min(1),
    answer: z.object({ kind: z.literal("library-choice"), choice: z.number().int() }).strict() }).strict(),
]);
export type PetLearningSubmission = z.infer<typeof petLearningSubmissionSchema>;
const timestamp = z.number().int().min(0).max(8_640_000_000_000_000);
export const petLearningEventSchema = z.object({ id: z.uuid(), owner: z.string().min(1).max(128).regex(/^[^\s,\x00-\x1f\x7f]+$/),
  occurredAt: timestamp, expiresAt: timestamp }).strict()
  .refine(value => value.expiresAt > value.occurredAt && value.expiresAt - value.occurredAt <= PET_LIMITS.commandLifetimeMs);
export const petLearningEventReplySchema = z.discriminatedUnion("outcome", [
  z.object({ outcome: z.literal("issued"), event: petLearningEventSchema }).strict(),
  z.object({ outcome: z.literal("existing"), event: petLearningEventSchema }).strict(),
  z.object({ outcome: z.literal("invalid") }).strict(),
  z.object({ outcome: z.literal("account_unavailable") }).strict(),
  z.object({ outcome: z.literal("event_unavailable") }).strict(),
]);
export type PetLearningEventReply = z.infer<typeof petLearningEventReplySchema>;
export type PetLearningEvent = z.infer<typeof petLearningEventSchema>;
export interface PetLearningEventTransport {
  send(input: PetLearningSubmission, expectedAccount: string, signal?: AbortSignal): Promise<PetLearningEventReply>;
}
