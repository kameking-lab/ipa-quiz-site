"use client";

import * as React from "react";
import {
  BADGES,
  BADGE_THRESHOLDS,
  syncBadgesWithStreak,
} from "@/lib/motivation/badges";
import { readStreak } from "@/lib/streak/storage";
import { BadgeMedallion } from "@/components/motivation/BadgeMedallion";
import { SocialShare } from "@/components/motivation/SocialShare";
import { buildBadgeText, buildOgImageUrl } from "@/lib/motivation/share";
import { Share2 } from "lucide-react";

function formatDate(ts?: number): string | null {
  if (!ts) return null;
  const d = new Date(ts);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日獲得`;
}

export function BadgeWall() {
  const [earned, setEarned] = React.useState<Set<number>>(new Set());
  const [earnedAt, setEarnedAt] = React.useState<Partial<Record<number, number>>>({});
  const [streak, setStreak] = React.useState({ current: 0, longest: 0 });
  const [shareTarget, setShareTarget] = React.useState<number | null>(null);

  React.useEffect(() => {
    const s = readStreak();
    const { state } = syncBadgesWithStreak(s.currentStreak, s.longestStreak);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEarned(new Set(state.earned));
    setEarnedAt(state.earnedAt);
    setStreak({ current: s.currentStreak, longest: s.longestStreak });
  }, []);

  return (
    <>
      <div className="mb-6 rounded-2xl border border-zinc-200 bg-gradient-to-br from-sky-50 to-indigo-50 p-5 dark:border-zinc-800 dark:from-sky-950/40 dark:to-indigo-950/40">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">現在の連続学習</p>
            <p className="text-3xl font-bold tracking-tight">{streak.current}日</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">最高記録</p>
            <p className="text-2xl font-semibold">{streak.longest}日</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {BADGE_THRESHOLDS.map((t) => {
          const def = BADGES[t];
          const isEarned = earned.has(t);
          const at = formatDate(earnedAt[t]);
          return (
            <div
              key={t}
              className={`flex flex-col gap-3 rounded-2xl border p-4 ${
                isEarned
                  ? "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
                  : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50"
              }`}
            >
              <div className="flex items-center gap-4">
                <BadgeMedallion badge={def} earned={isEarned} size="md" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                    {def.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-zinc-600 dark:text-zinc-400">
                    {def.tagline}
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-500 dark:text-zinc-400">
                    {isEarned ? at ?? "獲得済み" : `あと${Math.max(0, def.threshold - streak.current)}日`}
                  </p>
                </div>
                {isEarned && (
                  <button
                    type="button"
                    onClick={() => setShareTarget(shareTarget === t ? null : t)}
                    className="rounded-lg border border-zinc-200 p-1.5 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-900"
                    aria-label="シェアする"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              {isEarned && shareTarget === t && (
                <SocialShare
                  text={buildBadgeText({ name: def.name, days: def.threshold })}
                  url={typeof window !== "undefined" ? window.location.origin : "https://ipa-quiz-site.vercel.app"}
                  imageUrl={buildOgImageUrl({
                    type: "badge",
                    title: def.name,
                    badge: def.name,
                    streak: def.threshold,
                  })}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
