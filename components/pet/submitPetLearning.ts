import { notifyLearningPetSubmission } from "@/lib/pet/client/learning-bridge";
import type { PetLearningSubmission } from "@/lib/pet/client/learning-submission-contracts";
import type { PetLearningSubmissionContext } from "@/lib/pet/client/learning-bridge";

/** Reward failure must never prevent the original answer/history/decorations. */
export function submitPetLearning(input: PetLearningSubmission, context: PetLearningSubmissionContext): void {
  try {
    void Promise.resolve(notifyLearningPetSubmission(structuredClone(input), structuredClone(context))).catch(() => undefined);
  } catch { /* The study submission remains usable. */ }
}
