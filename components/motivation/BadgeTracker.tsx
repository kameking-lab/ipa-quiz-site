"use client";

import * as React from "react";
import { readStreak } from "@/lib/streak/storage";
import { syncBadgesWithStreak } from "@/lib/motivation/badges";

export function BadgeTracker() {
  React.useEffect(() => {
    const tick = () => {
      const streak = readStreak();
      syncBadgesWithStreak(streak.currentStreak, streak.longestStreak);
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    const onFocus = () => tick();
    window.addEventListener("focus", onFocus);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("focus", onFocus);
    };
  }, []);
  return null;
}
