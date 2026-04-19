"use client";

import * as React from "react";
import { createHistoryStore } from "@/lib/storage/history";
import { recordStudyToday } from "./storage";
import { jstDateString } from "./core";
import { MilestoneToast } from "./MilestoneToast";
import type { StreakMilestone } from "./core";

const PROBE_KEY = "ipa-quiz:streak:probe:v1";

function readProbe(): { date: string; entryCount: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(PROBE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as { date: string; entryCount: number };
  } catch {
    return null;
  }
}

function writeProbe(probe: { date: string; entryCount: number }): void {
  try {
    window.localStorage.setItem(PROBE_KEY, JSON.stringify(probe));
  } catch {
    // ignore
  }
}

export function StreakTracker() {
  const [toast, setToast] = React.useState<StreakMilestone | null>(null);

  React.useEffect(() => {
    const poll = () => {
      const history = createHistoryStore();
      const total = history.getStats().total;
      const today = jstDateString();
      const probe = readProbe();

      const answeredSinceLastCheck =
        !probe || probe.date !== today
          ? total > 0
          : total > probe.entryCount;

      if (!answeredSinceLastCheck) {
        writeProbe({ date: today, entryCount: total });
        return;
      }

      const { reachedMilestone } = recordStudyToday();
      writeProbe({ date: today, entryCount: total });
      if (reachedMilestone) setToast(reachedMilestone);
    };

    poll();
    const interval = window.setInterval(poll, 5_000);
    const onFocus = () => poll();
    window.addEventListener("focus", onFocus);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return toast ? <MilestoneToast milestone={toast} onClose={() => setToast(null)} /> : null;
}
