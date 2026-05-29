"use client";

import * as React from "react";
import { X, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACHIEVEMENTS, TIER_META } from "@/lib/gamification/achievements";

/** Auto-dismiss after this long unless the pointer is hovering the toast. */
const AUTO_DISMISS_MS = 5000;

interface Props {
  achievementId: string;
  onClose: () => void;
}

export function AchievementToast({ achievementId, onClose }: Props) {
  const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
  // Pause the auto-dismiss while hovered/focused so users can read or click ×.
  const [paused, setPaused] = React.useState(false);

  // Hold onClose in a ref so the dismiss timer below depends only on `paused`,
  // not on onClose's identity. The parent (QuizPlayer) re-renders every second
  // via its elapsed-time interval and passes a fresh inline onClose each time;
  // keying the effect on onClose restarted the 5s timer on every tick, so it
  // never fired and the toast lingered over the controls indefinitely (致命傷⑧
  // follow-up — caught by the badge-toast auto-dismiss E2E).
  const onCloseRef = React.useRef(onClose);
  React.useEffect(() => {
    onCloseRef.current = onClose;
  });

  React.useEffect(() => {
    if (paused) return;
    const t = window.setTimeout(() => onCloseRef.current(), AUTO_DISMISS_MS);
    return () => window.clearTimeout(t);
  }, [paused]);

  if (!achievement) return null;

  const tier = TIER_META[achievement.tier];

  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="achievement-toast"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      // Top-center, below the sticky quiz header. 致命傷⑧: the previous
      // bottom-center placement (bottom-4, z-70) sat over the mobile fixed
      // 「次の問題へ」 CTA bar and the answer action icons (AIに聞く/星/ブックマーク/
      // 共有) and the desktop floating copilot — all anchored to the bottom —
      // blocking interaction. Anchoring to the top keeps it clear of every
      // bottom control while staying visible and auto-dismissing.
      className="fixed inset-x-4 top-[4.5rem] z-[70] mx-auto max-w-sm"
      style={{ animation: "slide-down 220ms cubic-bezier(0.2, 0.8, 0.2, 1)" }}
    >
      <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 p-4 shadow-xl dark:border-amber-900/60 dark:from-amber-950/70 dark:via-yellow-950/60 dark:to-orange-950/70">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-2 top-2 rounded-lg p-1 text-zinc-500 transition-colors hover:bg-white/40 dark:text-zinc-400 dark:hover:bg-black/20"
          aria-label="閉じる"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="flex items-center gap-3 pr-6">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-300 bg-white/60 text-xl shadow-sm dark:border-amber-900 dark:bg-black/20">
            <Trophy className="h-5 w-5 text-amber-500" aria-hidden="true" />
          </div>
          <div className="min-w-0 flex-1">
            <div className={cn("text-xs font-semibold", tier.color)}>
              {tier.emoji} {tier.label}バッジ獲得
            </div>
            <div className="truncate text-sm font-bold text-zinc-900 dark:text-zinc-50">
              {achievement.name}
            </div>
            <p className="truncate text-xs text-zinc-600 dark:text-zinc-400">
              {achievement.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
