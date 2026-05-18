"use client";

import * as React from "react";
import { X, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { ACHIEVEMENTS, TIER_META } from "@/lib/gamification/achievements";

interface Props {
  achievementId: string;
  onClose: () => void;
}

export function AchievementToast({ achievementId, onClose }: Props) {
  const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);

  React.useEffect(() => {
    const t = window.setTimeout(onClose, 6000);
    return () => window.clearTimeout(t);
  }, [onClose]);

  if (!achievement) return null;

  const tier = TIER_META[achievement.tier];

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-sm"
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
