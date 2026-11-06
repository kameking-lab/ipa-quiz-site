"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { recordReview } from "@/lib/learning/spaced-repetition";
import type { Question } from "@/lib/questions/types";
import type { PetLearningSubmission } from "@/lib/pet/client/learning-submission-contracts";
import type { PetAttempt, PetOwnerLease, PetV1Context } from "@/lib/pet/v1/runtime";
import type { SlimMockQuestion } from "@/lib/mock-exam/types";
import type { ChoiceKey } from "@/lib/questions/types";
import { LS_KEYS } from "@/lib/storage/keys";
import { browserPetSubmissions, petSubmissionPaintDelay } from "@/lib/pet/v1/submission-order";

type Answer = Extract<PetLearningSubmission, { source: "question" }>["answer"];
/** A study session has one owner lease and no UI state. Closing the decoration
 * does not stop submissions. Auth failures/loading never become guest rewards. */
export function usePetLearning() {
  const state = useRef<{ sessionId: string; owner: Promise<PetOwnerLease | null>; revoke(): void } | null>(null);
  useEffect(() => {
    if (typeof globalThis.crypto?.randomUUID !== "function") return;
    let refresh = 0;
    const runtime = import("@/lib/pet/v1/runtime");
    const candidate = () => {
      let revoked = false;
      const owner = runtime.then(module => module.preparePetOwner(() => !revoked)).catch(() => null);
      return { sessionId: crypto.randomUUID(), owner, revoke: () => { revoked = true; } };
    };
    const prepare = () => {
      const epoch = ++refresh;
      const previous = state.current;
      const next = candidate();
      if (!previous) { state.current = next; return; }
      void Promise.all([previous.owner, next.owner]).then(([oldOwner, newOwner]) => {
        if (epoch !== refresh) { next.revoke(); return; }
        // Focus/online is a revalidation, not a new learning session. Preserve
        // queued events and distinct-answer combos when the owner is unchanged.
        if (oldOwner?.isCurrent() && (!newOwner || newOwner.ownerScope === oldOwner.ownerScope)) { next.revoke(); return; }
        previous.revoke();
        state.current = next;
      }).catch(() => next.revoke());
    };
    prepare();
    const storage = (event: StorageEvent) => { if (event.key === LS_KEYS.syncLocalOwner || event.key === null) prepare(); };
    const visible = () => { if (document.visibilityState === "visible") prepare(); };
    window.addEventListener("focus", prepare);
    window.addEventListener("online", prepare);
    window.addEventListener("storage", storage);
    window.addEventListener("pet-v1:owner-changed", prepare);
    document.addEventListener("visibilitychange", visible);
    return () => {
      // Pending submissions may finish across route changes; each one checks
      // auth again. Keep its captured lease, never switch it to the new route.
      window.removeEventListener("focus", prepare);
      window.removeEventListener("online", prepare);
      window.removeEventListener("storage", storage);
      window.removeEventListener("pet-v1:owner-changed", prepare);
      document.removeEventListener("visibilitychange", visible);
    };
  }, []);
  const submit = useCallback((input: PetLearningSubmission | null, context: PetV1Context,
    reviewBefore: PetAttempt["reviewBefore"] = null) => {
    try {
      const session = state.current;
      if (!session) return;
      const attempt = { eventId: crypto.randomUUID(), sessionId: session.sessionId, occurredAt: Date.now(), reviewBefore };
      // The timeout begins outside the answer's paint and input budget. No JSON
      // parsing, validation, network, storage or model calculation in this call.
      const ready = petSubmissionPaintDelay();
      void browserPetSubmissions.enqueue(async () => {
        await ready;
        await session.owner.then(async owner => {
          if (!owner) return;
          const runtime = await import("@/lib/pet/v1/runtime");
          await runtime.persistBrowserPetAttempt(owner, attempt, input, context);
        });
      }).catch(() => undefined);
    } catch { /* Optional pet support must never break an answer or its history. */ }
  }, []);
  return useMemo(() => ({
    submit,
    record(question: Question, answer: Answer, correct: boolean) {
      let before: PetAttempt["reviewBefore"] = null;
      recordReview(question.id, correct, undefined, snapshot => { before = snapshot; });
      submit({ source: "question", questionId: question.id, answer }, { source: "question", question }, before);
    },
    answer(question: Question, answer: Answer) {
      submit({ source: "question", questionId: question.id, answer }, { source: "question", question });
    },
    mock(question: SlimMockQuestion, selected: ChoiceKey | undefined, correct: boolean) {
      let before: PetAttempt["reviewBefore"] = null;
      recordReview(question.id, correct, undefined, snapshot => { before = snapshot; });
      if (selected !== undefined) submit({ source: "question", questionId: question.id,
        answer: { kind: "multiple-choice", selected: [selected] } }, { source: "mock", question }, before);
    },
    reveal(question: Question) { submit(null, { source: "question", question }); },
  }), [submit]);
}
