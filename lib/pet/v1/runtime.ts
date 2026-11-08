import { readSyncAccount } from "@/lib/sync/ownership";
import { LS_KEYS } from "@/lib/storage/keys";
import { browserPetExclusive } from "../client/durable-queue";
import { validateLocalPetLearningSubmission } from "../submission-validation";
import type { PetLearningSubmission } from "../client/learning-submission-contracts";
import type { PetLearningSubmissionContext } from "../client/submission-router-contracts";
import { canonicalPetQualification, petLearningFactSchema } from "./profile";
import type { PetLearningFact } from "./profile";
import { PetProfileStore } from "./profile-store";
import type { PetOwnerContext } from "./profile-store";
import { applyPetLearningFact } from "./learning";
import type { PetLearningResult } from "./learning";
import { migrateLegacyPetProfiles } from "./migration";
import { petLocalOwnerResolver } from "./platform";
import { signalPetAccountOwner } from "./cloud-signal";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { getChoiceKeys, isAcceptedAnswer } from "@/lib/questions/answers";
import { isReferenceOnlyQuestionId } from "@/lib/questions/assessment";
import type { SlimMockQuestion } from "@/lib/mock-exam/types";

export type PetV1Context = PetLearningSubmissionContext | { source: "mock"; question: SlimMockQuestion };

export interface PetAttempt {
  eventId: string; sessionId: string; occurredAt: number;
  reviewBefore: PetLearningFact["reviewBefore"];
}
export interface PetOwnerLease extends PetOwnerContext { revalidate(): Promise<boolean> }
let pendingAccount: ReturnType<typeof readSyncAccount> | null = null;
/** Concurrent pet views/sessions on one page share a single in-flight session
 * request. Nothing is cached after it settles, so every later revalidation
 * still sees an account switch. */
function readPetAccount() {
  if (pendingAccount) return pendingAccount;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  const request: ReturnType<typeof readSyncAccount> = Promise.resolve().then(() => readSyncAccount(controller.signal))
    .finally(() => { clearTimeout(timeout); if (pendingAccount === request) pendingAccount = null; });
  pendingAccount = request;
  return request;
}
/** Session truth comes from auth, never the last cloud-sync owner alone. */
export async function preparePetOwner(isCurrent: () => boolean): Promise<PetOwnerLease | null> {
  try {
    const localResolver = petLocalOwnerResolver();
    if (localResolver) return await localResolver(isCurrent);
    const token = localStorage.getItem(LS_KEYS.syncLocalOwner);
    const account = await readPetAccount();
    const ownerScope = account ? `user:${account.id}` : "guest";
    const current = () => isCurrent() && localStorage.getItem(LS_KEYS.syncLocalOwner) === token;
    if (!current()) return null;
    // Members' pets are also saved to their account (lazy, layout-level sync).
    if (account) signalPetAccountOwner(ownerScope);
    return { ownerScope, isCurrent: current, async revalidate() {
      try {
        if (!current()) return false;
        const latest = await readPetAccount();
        return current() && (latest ? `user:${latest.id}` : "guest") === ownerScope;
      } catch { return false; }
    } };
  } catch { return null; }
}
export function browserPetProfiles() {
  return new PetProfileStore({ storage: localStorage, exclusive: browserPetExclusive(navigator.locks), now: Date.now });
}
/** Validation/JSON/locking happens after paint; never call from a render/load. */
export async function persistPetAttempt(options: {
  owner: PetOwnerLease; store: PetProfileStore; timeZone: string; attempt: PetAttempt;
  context: PetV1Context; input: PetLearningSubmission | null;
  notify: (result: PetLearningResult) => void; legacyRaw: () => string | null;
}): Promise<string> {
  const { owner, store, timeZone, attempt, context, input } = options;
  // Library year/subject IDs are not qualifications. Their explicit mapping is
  // held until the catalog has a canonical learning ID (P05 coverage table).
  if (context.source === "library") return "unsupported";
  const qualificationId = canonicalPetQualification(context.source === "mock" ? context.question.petContext?.qualificationId ?? "" : context.question.exam);
  if (!qualificationId) return "unsupported";
  let validated: { grade: "correct" | "incorrect" | "unscored" } | null;
  if (context.source === "mock") {
    if (!context.question.petContext?.eligible || isReferenceOnlyQuestionId(context.question.id) || input?.source !== "question" ||
      input.questionId !== context.question.id || input.answer.kind !== "multiple-choice" || input.answer.selected.length !== 1 ||
      !getChoiceKeys(context.question.choices).some(key => key === (input.answer as { selected: string[] }).selected[0])) return "invalid";
    validated = { grade: isAcceptedAnswer(context.question.answer, input.answer.selected[0]) ? "correct" : "incorrect" };
  } else validated = input === null ? null : validateLocalPetLearningSubmission(input, context);
  if (input !== null && !validated) return "invalid";
  if (context.source === "question" && input === null && (!isPracticeReadyQuestion(context.question) || context.question.type === "descriptive" || context.question.type === "essay")) return "unsupported";
  const reviewBefore = attempt.reviewBefore;
  const fact = petLearningFactSchema.safeParse({ ...attempt, ownerScope: owner.ownerScope, qualificationId,
    canonicalQuestionId: context.question.id, contentVersion: context.source === "mock" ? context.question.petContext!.contentVersion : context.question.publicationVersion ?? context.question.lastUpdated ?? "local-question-v1", policyVersion: 1,
    attemptKind: input === null ? "revealed" : "answer", grade: validated?.grade ?? "ungraded",
    fieldId: context.question.category?.trim().slice(0, 200) || null,
    reviewCycleId: reviewBefore === null ? null : JSON.stringify([reviewBefore.lastReviewedAt, reviewBefore.dueAt]),
  });
  if (!fact.success) return "invalid";
  if (!await owner.revalidate()) return "owner_changed";
  let applied: PetLearningResult | undefined;
  const saved = await store.update({ ...owner, verifyCurrent: () => owner.revalidate() }, timeZone, previous => {
    const migrated = owner.ownerScope === "guest" ? migrateLegacyPetProfiles(previous, options.legacyRaw(), attempt.occurredAt) : previous;
    applied = applyPetLearningFact(migrated, fact.data);
    return applied.document;
  });
  if (saved.status !== "ready") return saved.status;
  if (!owner.isCurrent() || !await owner.revalidate()) return "owner_changed";
  if (applied?.outcome === "applied") options.notify({ ...applied, document: saved.document });
  return applied?.outcome ?? "invalid";
}

export async function persistBrowserPetAttempt(owner: PetOwnerLease, attempt: PetAttempt,
  input: PetLearningSubmission | null, context: PetV1Context) {
  return persistPetAttempt({ owner, attempt, input, context, store: browserPetProfiles(),
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    legacyRaw: () => localStorage.getItem(LS_KEYS.petLearning),
    notify: result => window.dispatchEvent(new CustomEvent("pet-v1:committed", { detail: {
      ownerScope: owner.ownerScope, questionId: context.question.id,
      qualificationId: result.document.events.at(-1)?.qualificationId,
      occurredAt: attempt.occurredAt,
      sessionId: attempt.sessionId, eventId: attempt.eventId, result,
    } })),
  });
}
