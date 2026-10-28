"use client";

import { useEffect, useState } from "react";
import { parseMeasuredPresence, PRESENCE_STATE_EVENT, type MeasuredPresence } from "@/lib/study-presence-contract";
import { StudyRoom } from "@/components/home/StudyRoom";

export interface StudySuggestion { name: string; href: string }

export function TotalAnswerCounter({ suggestions = [] }: { suggestions?: readonly StudySuggestion[] }) {
  const [snapshot, setSnapshot] = useState<MeasuredPresence | null>(null);
  useEffect(() => {
    const update = (event: Event) => {
      const detail: unknown = (event as CustomEvent<unknown>).detail;
      const state = detail && typeof detail === "object" ? detail as Record<string, unknown> : null;
      // The room labels this as a historical sample, including after expiry,
      // idle or a failed refresh. Never replace its time with receipt time.
      const measured = state?.mode === "measured" ? parseMeasuredPresence(state.snapshot)
        : state?.mode === "stale" ? parseMeasuredPresence(state.previous) : null;
      setSnapshot(measured);
    };
    window.addEventListener(PRESENCE_STATE_EVENT, update);
    return () => { window.removeEventListener(PRESENCE_STATE_EVENT, update); };
  }, []);
  return <section id="study-room" data-study-presence-viewer aria-label={snapshot === null ? "学習のご案内" : "前回取得時点の学習状況"} aria-live="off" className="study-room scroll-mt-24">
    <StudyRoom snapshot={snapshot} suggestions={suggestions} />
  </section>;
}
