import { LS_KEYS } from "@/lib/storage/keys";
import { browserPetExclusive } from "./durable-queue";
import { LearningPetStore } from "./learning-store";
import { createPetSubmissionRouter } from "./submission-router";
import type { PetSubmissionRouter } from "./submission-router";
import type { PetLearningSubmission } from "./learning-submission-contracts";
import type { PetLearningSubmissionContext, PetAccountSubmissionSink } from "./submission-router-contracts";
export type { PetLearningSubmissionContext, PetSubmissionRouterView, PetSubmissionRouterPort } from "./submission-router-contracts";

let browserStore: LearningPetStore | undefined;
let browserRouter: PetSubmissionRouter | undefined;
/** Called only in browser effects/actions. No storage or browser access at import. */
export function getBrowserLearningPet(): LearningPetStore {
  if (typeof window === "undefined") throw new Error("browser_required");
  if (!browserStore) {
    browserStore = new LearningPetStore({ key: LS_KEYS.petLearning,
      storage: { getItem: key => window.localStorage.getItem(key), setItem: (key, value) => window.localStorage.setItem(key, value) },
      exclusive: browserPetExclusive(navigator.locks), now: Date.now });
  }
  return browserStore;
}
/** The caller is the explicit answer submission path, never a restored snapshot. */
export function notifyLearningPetAnswer(_input: { exam: string; questionId: string; scope: string }) {
  void _input;
  // Metadata-only decoration notifications no longer grant a second reward.
  // The finite real producers now call notifyLearningPetSubmission with raw data.
}
export function getBrowserPetSubmissionRouter(): PetSubmissionRouter {
  if (typeof window === "undefined") throw new Error("browser_required");
  return browserRouter ??= createPetSubmissionRouter({ store: getBrowserLearningPet() });
}
export function notifyLearningPetSubmission(input: PetLearningSubmission, context: PetLearningSubmissionContext): void {
  if (typeof window === "undefined") return;
  try { void getBrowserPetSubmissionRouter().submit(input, context).catch(() => undefined); } catch { /* Keep study usable; no fallback grant. */ }
}
export function registerPetAccountLearning(chain: PetAccountSubmissionSink): () => void {
  return getBrowserPetSubmissionRouter().register(chain);
}
