"use client";

import * as React from "react";
import { createHistoryStore } from "@/lib/storage/history";
import { recordStudyToday } from "./storage";
import { jstDateString } from "./core";
import { MilestoneToast } from "./MilestoneToast";
import type { StreakMilestone } from "./core";
import { usePathname } from "next/navigation";

export function StreakTracker() {
  const [toast, setToast] = React.useState<StreakMilestone | null>(null);
  const pathname = usePathname();

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
    window.addEventListener("focus", onFocus);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  return toast && !pathname?.startsWith("/quiz") && !pathname?.startsWith("/blog/") ? <MilestoneToast milestone={toast} onClose={() => setToast(null)} /> : null;
}
