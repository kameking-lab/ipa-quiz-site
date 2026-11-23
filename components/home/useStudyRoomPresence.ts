"use client";

import { useEffect, useState } from "react";
import { nextJstMidnight } from "@/lib/billing/reset-time";
import { parseMeasuredPresence, PRESENCE_REPLAY_EVENT, PRESENCE_STATE_EVENT, type MeasuredPresence } from "@/lib/study-presence-contract";

/** Listen to the one existing StudyPresence publisher; mounting a summary never adds a request. */
export function useStudyRoomPresence() {
  const [sample, setSample] = useState<{ snapshot: MeasuredPresence | null; current: boolean }>({ snapshot: null, current: false });
  useEffect(() => {
    let expiry: ReturnType<typeof setTimeout> | undefined;
    let dayRollover: ReturnType<typeof setTimeout> | undefined;
    const update = (event: Event) => {
      clearTimeout(expiry);
      clearTimeout(dayRollover);
      const detail: unknown = (event as CustomEvent<unknown>).detail;
      const state = detail && typeof detail === "object" ? detail as Record<string, unknown> : null;
      const snapshot = state?.mode === "measured" ? parseMeasuredPresence(state.snapshot)
        : state?.mode === "stale" ? parseMeasuredPresence(state.previous) : null;
      const now = Date.now();
      if (snapshot?.today) {
        const dayEnd = nextJstMidnight(Date.parse(snapshot.measuredAt)).getTime();
        if (dayEnd <= now) { setSample({ snapshot: null, current: false }); return; }
        dayRollover = setTimeout(() => setSample({ snapshot: null, current: false }), dayEnd - now);
      }
      const remaining = snapshot ? Date.parse(snapshot.validUntil) - now : 0;
      const current = Boolean(snapshot && state?.mode === "measured" && remaining > 0);
      setSample({ snapshot, current });
      if (current) expiry = setTimeout(() => setSample(value => ({ ...value, current: false })), remaining);
    };
    window.addEventListener(PRESENCE_STATE_EVENT, update);
    window.dispatchEvent(new Event(PRESENCE_REPLAY_EVENT));
    return () => { clearTimeout(expiry); clearTimeout(dayRollover); window.removeEventListener(PRESENCE_STATE_EVENT, update); };
  }, []);
  return sample;
}
