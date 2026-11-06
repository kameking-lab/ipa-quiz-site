import type { PetLearningSubmission } from "@/lib/pet/client/learning-submission-contracts";
import type { PetLearningSubmissionContext } from "@/lib/pet/client/learning-bridge";

/** Retired P05 entry: metadata-only legacy callers must not grant in parallel
 * with v1. Active producers use usePetLearning's owner/session-bound envelope.
 * Keep the old storage and explicit legacy tools readable for migration. */
export function submitPetLearning(_input: PetLearningSubmission, _context: PetLearningSubmissionContext): void {
  void _input; void _context;
  // Deliberately no legacy grant or account queue.
}
