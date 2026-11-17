"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Question } from "@/lib/questions/types";
import { isReferenceOnlyQuestionId } from "@/lib/questions/assessment";
import { readSettings } from "@/lib/storage/settings";
import { createActiveClock } from "./activity";
import { recordLearningAction } from "./pace-storage";

/** Invisible instrumentation; mounting/timers alone never award learning points. */
export function useQuestionActivity(question: Question | null | undefined, revealed: boolean) {
  const session = useRef<{
    questionId: string; attemptId: string; answered: boolean; explanationRead: boolean;
    answerClock: ReturnType<typeof createActiveClock>; explanationClock: ReturnType<typeof createActiveClock> | null;
  } | null>(null);
  const endRef = useRef<HTMLSpanElement>(null);
  const atEnd = useRef(false);
  const questionId = question?.id;
  useEffect(() => {
    if (!questionId) return;
    const foreground = () => document.visibilityState === "visible" && document.hasFocus();
    const clock = createActiveClock(() => performance.now(), foreground());
    const current = { questionId, attemptId: crypto.randomUUID(), answered: false, explanationRead: false,
      answerClock: clock, explanationClock: null as ReturnType<typeof createActiveClock> | null };
    session.current = current;
    const visibility = () => {
      current.answerClock.setVisible(foreground());
      current.explanationClock?.setVisible(foreground());
    };
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("focus", visibility);
    window.addEventListener("blur", visibility);
    return () => { document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("focus", visibility); window.removeEventListener("blur", visibility); session.current = null; };
  }, [questionId]);
  const recordExplanation = useCallback(() => {
    const current = session.current;
    if (!question || !current || current.questionId !== question.id || !current.answered || current.explanationRead ||
      !atEnd.current || document.visibilityState !== "visible" || !document.hasFocus() || (current.explanationClock?.milliseconds() ?? 0) < 5000 ||
      !readSettings().recordHistory || isReferenceOnlyQuestionId(question.id)) return;
    current.explanationRead = true;
    recordLearningAction({ id: `${current.attemptId}:explanation`, questionId: question.id, exam: question.exam,
      at: Date.now(), kind: "explanation-read" });
  }, [question]);
  useEffect(() => {
    atEnd.current = false;
    if (!revealed || !endRef.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(entries => { atEnd.current = entries.some(entry => entry.isIntersecting); });
    observer.observe(endRef.current);
    // Visibility alone does not prove reading: require an actual learner interaction.
    window.addEventListener("scroll", recordExplanation, { passive: true, capture: true });
    window.addEventListener("keydown", recordExplanation);
    return () => { observer.disconnect(); window.removeEventListener("scroll", recordExplanation, true); window.removeEventListener("keydown", recordExplanation); };
  }, [questionId, revealed, recordExplanation]);
  const recordAnswer = useCallback((correct: boolean) => {
    const current = session.current;
    if (!question || !current || current.questionId !== question.id || current.answered ||
      !readSettings().recordHistory || isReferenceOnlyQuestionId(question.id)) return;
    current.answered = true;
    current.explanationClock = createActiveClock(() => performance.now(), document.visibilityState === "visible" && document.hasFocus());
    recordLearningAction({ id: `${current.attemptId}:answer`, questionId: question.id, exam: question.exam, at: Date.now(),
      kind: "answer", activeMs: current.answerClock.milliseconds(), questionType: question.type, correct });
  }, [question]);
  return { recordAnswer, recordExplanation, endRef };
}
