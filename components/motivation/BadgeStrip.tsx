"use client";

import * as React from "react";
import Link from "next/link";
import {
  BADGES,
  BADGE_THRESHOLDS,
  getEarnedBadges,
  nextBadge,
  syncBadgesWithStreak,
} from "@/lib/motivation/badges";
import { readStreak } from "@/lib/streak/storage";
import { BadgeMedallion } from "./BadgeMedallion";

export function BadgeStrip() {
  const [earned, setEarned] = React.useState<Set<number>>(new Set());
  const [streak, setStreak] = React.useState({ current: 0, longest: 0 });

  React.useEffect(() => {
    const s = readStreak();
    const { state } = syncBadgesWithStreak(s.currentStreak, s.longestStreak);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEarned(new Set(state.earned));
    setStreak({ current: s.currentStreak, longest: s.longestStreak });
  }, []);

  const next = nextBadge(streak.current);
  const earnedCount = BADGE_THRESHOLDS.filter((t) => earned.has(t)).length;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          連続学習バッジ
          <span className="ml-2 text-xs font-normal text-zinc-500 dark:text-zinc-400">
            {earnedCount}/{BADGE_THRESHOLDS.length} 獲得
          </span>
        </h3>
        <Link
          href="/account/dashboard?tab=badges"
          className="text-xs text-sky-600 hover:underline dark:text-sky-400"
        >
          全て見る →
        </Link>
      </div>

      <div className="flex items-end gap-3 overflow-x-auto pb-1">
        {BADGE_THRESHOLDS.map((t) => {
          const def = BADGES[t];
          const isEarned = earned.has(t);
          return (
            <div key={t} className="flex flex-col items-center gap-1.5">
              <BadgeMedallion badge={def} earned={isEarned} size="sm" />
              <span className="max-w-[64px] text-center text-[10px] leading-tight text-zinc-600 dark:text-zinc-400">
                {def.name}
              </span>
            </div>
          );
        })}
      </div>

      {next && (
        <p className="mt-3 text-[11px] text-zinc-500 dark:text-zinc-400">
          次のバッジ:{" "}
          <span className="font-semibold text-zinc-700 dark:text-zinc-200">
            {next.name}
          </span>
          （あと{next.threshold - streak.current}日）
        </p>
      )}
    </div>
  );
}
