"use client";

import * as React from "react";
import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { readStreak } from "./storage";
import type { StreakState } from "./core";

export function StreakBadge({ className }: { className?: string }) {
  const [state, setState] = React.useState<StreakState | null>(null);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(readStreak());

    const refresh = () => setState(readStreak());
    const interval = window.setInterval(refresh, 60_000);
    const onStorage = (e: StorageEvent) => {
      if (e.key === "ipa-quiz:streak:v1") refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refresh);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
    };
  }, []);

  if (!state || state.currentStreak === 0) return null;

  const flameColor = state.todayCompleted
    ? "text-orange-500 dark:text-orange-400"
    : "text-zinc-400 dark:text-zinc-500";
  const bgColor = state.todayCompleted
    ? "bg-orange-50 border-orange-200 text-orange-900 dark:bg-orange-950/40 dark:border-orange-900/60 dark:text-orange-100"
    : "bg-zinc-50 border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold",
        bgColor,
        className,
      )}
      title={
        state.todayCompleted
          ? `${state.currentStreak}日連続で学習中！`
          : `連続${state.currentStreak}日。今日学習すると継続！`
      }
    >
      <Flame className={cn("h-3.5 w-3.5", flameColor)} aria-hidden="true" />
      <span>{state.currentStreak}</span>
    </span>
  );
}
