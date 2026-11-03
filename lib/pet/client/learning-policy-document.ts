import { z } from "zod";
import { petRewardReferenceSchema, petGuestRewardEntrySchema, petRewardReferenceKey } from "../reward-contracts";
import { petLearningSubmissionSchema, petLearningEventSchema } from "./learning-submission-contracts";

const count = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
export const learningRewardPolicySchema = z.object({ version: z.literal(2),
  /** Exact pre-policy bytes; preservation is separate from spendable balances. */
  legacy: z.object({ raw: z.string().nullable(), answers: z.array(z.string()), food: count, meals: count,
    outfit: z.enum(["none", "bandana"]) }).strict(),
  entries: z.array(petGuestRewardEntrySchema.extend({ state: z.enum(["active", "sealed", "accepted", "duplicate_hold"]),
    owner: z.string().min(1).nullable(), segmentId: z.uuid().nullable() }).strict()),
  pending: z.array(z.object({ id: z.uuid(), owner: z.string().min(1).max(128), reference: petRewardReferenceSchema,
    input: petLearningSubmissionSchema.nullable(), event: petLearningEventSchema.nullable() }).strict()
    .refine(entry => entry.event ? entry.event.owner === entry.owner && entry.input === null : entry.input !== null)),
  accountSeen: z.array(z.object({ owner: z.string().min(1), reference: petRewardReferenceSchema, eventId: z.uuid() }).strict()),
}).strict().superRefine((document, context) => {
  const issue = () => context.addIssue({ code: "custom", message: "Duplicate or inconsistent reward policy entry" });
  if (new Set(document.entries.map(entry => petRewardReferenceKey(entry.reference))).size !== document.entries.length ||
    new Set(document.pending.map(entry => entry.id)).size !== document.pending.length ||
    new Set(document.pending.map(entry => JSON.stringify([entry.owner, petRewardReferenceKey(entry.reference)]))).size !== document.pending.length ||
    new Set(document.accountSeen.map(entry => JSON.stringify([entry.owner, petRewardReferenceKey(entry.reference)]))).size !== document.accountSeen.length) issue();
  for (const entry of document.entries) {
    if (entry.state === "active" ? entry.owner !== null || entry.segmentId !== null : entry.owner === null || entry.segmentId === null) issue();
  }
});
export type LearningRewardPolicy = z.infer<typeof learningRewardPolicySchema>;
export type PendingPetSubmission = LearningRewardPolicy["pending"][number];
