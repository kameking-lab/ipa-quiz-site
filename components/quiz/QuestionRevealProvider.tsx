"use client";

import * as React from "react";

interface RevealContextValue {
  revealed: boolean;
  revealExplanation: () => void;
  answerContext: { selectedChoice?: string; isCorrect?: boolean };
  setAnswerContext: React.Dispatch<React.SetStateAction<{ selectedChoice?: string; isCorrect?: boolean }>>;
}

const RevealContext = React.createContext<RevealContextValue | null>(null);
const noop = () => {};

/** Coordinates the inline answer with the readable, server-rendered explanation. */
export function QuestionRevealProvider({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = React.useState(false);
  const [answerContext, setAnswerContext] = React.useState<{ selectedChoice?: string; isCorrect?: boolean }>({});
  const revealExplanation = React.useCallback(() => setRevealed(true), []);
  return <RevealContext.Provider value={{ revealed, revealExplanation, answerContext, setAnswerContext }}>{children}</RevealContext.Provider>;
}

export function useQuestionExplanationReveal(): () => void {
  return React.useContext(RevealContext)?.revealExplanation ?? noop;
}

/** Keep a follow-up grounded in this answer without recording a reading-only visit. */
export function useQuestionAnswerContext() {
  const context = React.useContext(RevealContext);
  return {
    answerContext: context?.answerContext ?? {},
    setAnswerContext: context?.setAnswerContext ?? noop,
  };
}

export function QuestionExplanationDetails({ children }: { children: React.ReactNode }) {
  const revealed = React.useContext(RevealContext)?.revealed ?? false;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (revealed) setOpen(true);
  }, [revealed]);

  React.useEffect(() => {
    const revealHashTarget = () => {
      if (window.location.hash === "#explanation") setOpen(true);
    };
    revealHashTarget();
    window.addEventListener("hashchange", revealHashTarget);
    return () => window.removeEventListener("hashchange", revealHashTarget);
  }, []);

  return <details open={open} onToggle={(event) => setOpen(event.currentTarget.open)} className="group">
    {children}
  </details>;
}
