"use client";

import { useEffect, useState } from "react";
import { parseMeasuredPresence, PRESENCE_STATE_EVENT, type MeasuredPresence } from "@/lib/study-presence-contract";
import { StudyRoom } from "@/components/home/StudyRoom";

export interface StudySuggestion { name: string; href: string }

export function TotalAnswerCounter({ suggestions = [] }: { suggestions?: readonly StudySuggestion[] }) {
  const [snapshot, setSnapshot] = useState<MeasuredPresence | null>(null);
  useEffect(() => {
    let expiry: ReturnType<typeof setTimeout> | undefined;
    const update = (event: Event) => {
      clearTimeout(expiry);
      const detail: unknown = (event as CustomEvent<unknown>).detail;
      const state = detail && typeof detail === "object" ? detail as Record<string, unknown> : null;
      const measured = state?.mode === "measured" ? parseMeasuredPresence(state.snapshot) : null;
      const fresh = measured && Date.parse(measured.validUntil) > Date.now() ? measured : null;
      setSnapshot(fresh);
      if (fresh) expiry = setTimeout(() => {
        setSnapshot(null);
      }, Date.parse(fresh.validUntil) - Date.now());
    };
    window.addEventListener(PRESENCE_STATE_EVENT, update);
    return () => { clearTimeout(expiry); window.removeEventListener(PRESENCE_STATE_EVENT, update); };
  }, []);
  return <section id="study-room" data-study-presence-viewer aria-label={snapshot === null ? "学習のご案内" : "直近5分の学習状況"} aria-live="off" className="study-room scroll-mt-24">
    <StudyRoom snapshot={snapshot} suggestions={suggestions} />
  </section>;
}
