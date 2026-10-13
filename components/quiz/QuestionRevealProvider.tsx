"use client";

import * as React from "react";

interface RevealContextValue {
  revealed: boolean;
  revealExplanation: () => void;
}

const RevealContext = React.createContext<RevealContextValue | null>(null);
const noop = () => {};

/** Coordinates the inline answer with the readable, server-rendered explanation. */
export function QuestionRevealProvider({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = React.useState(false);
  const revealExplanation = React.useCallback(() => setRevealed(true), []);
  return <RevealContext.Provider value={{ revealed, revealExplanation }}>{children}</RevealContext.Provider>;
}

export function useQuestionExplanationReveal(): () => void {
  return React.useContext(RevealContext)?.revealExplanation ?? noop;
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
