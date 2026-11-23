"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { createHistoryStore } from "@/lib/storage/history";
import { recordStudyToday, STREAK_100_DAY_EVENT } from "./storage";
import { jstDateString } from "./core";
import { MilestoneToast } from "./MilestoneToast";
import type { StreakMilestone } from "./core";

export function StreakTracker() {
  const pathname = usePathname();
  const [toast, setToast] = React.useState<StreakMilestone | null>(null);

  React.useEffect(() => {
    const poll = () => {
      const history = createHistoryStore();
      const today = jstDateString();
      // Opening a page with yesterday's history is not today's study. Looking
      // at actual answer dates also works after the 2000-entry history cap.
      if (!history.getAllEntries().some(entry => Number.isFinite(new Date(entry.at).getTime()) && jstDateString(new Date(entry.at)) === today)) return;

      const { reachedMilestone } = recordStudyToday();
      if (reachedMilestone) setToast(reachedMilestone);
    };

    poll();
    const interval = window.setInterval(poll, 5_000);
    const onFocus = () => poll();
    const on100Days = () => setToast(100);
    window.addEventListener("focus", onFocus);
    window.addEventListener(STREAK_100_DAY_EVENT, on100Days);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener(STREAK_100_DAY_EVENT, on100Days);
    };
  }, []);

  // Keep streak recording active without interrupting practice or the blog trial.
  return toast && !pathname?.startsWith("/quiz") && !pathname?.startsWith("/q/") && !pathname?.startsWith("/blog/") ? <MilestoneToast milestone={toast} onClose={() => setToast(null)} /> : null;
}
