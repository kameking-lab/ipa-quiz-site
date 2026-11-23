"use client";

import * as React from "react";
import Link from "next/link";
import { BadgeWall } from "@/app/account/badges/BadgeWall";
import { readXp, xpProgress, type XpProgress } from "@/lib/gamification/xp";

export function DashboardBadges() {
  const [xp, setXp] = React.useState<XpProgress | null>(null);
  const [totalXp, setTotalXp] = React.useState(0);

  React.useEffect(() => {
    const state = readXp();
     
    setXp(xpProgress(state.total));
    setTotalXp(state.total);
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="mb-1 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-300">
              レベル
            </p>
            <p className="text-3xl font-bold text-violet-950 dark:text-violet-50 sm:text-4xl">
              Lv. {xp?.level ?? "—"}
            </p>
            <p className="mt-0.5 text-xs text-violet-700 dark:text-violet-300">
              累計 {totalXp.toLocaleString("ja-JP")} XP
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-violet-700 dark:text-violet-300">次のレベルまで</p>
            <p className="text-lg font-semibold text-violet-950 dark:text-violet-50">
              {xp?.isMax
                ? "MAX"
                : xp
                  ? `${xp.xpForNextLevel - xp.xpIntoLevel} XP`
                  : "—"}
            </p>
          </div>
        </div>
        {xp && !xp.isMax && (
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/60 dark:bg-zinc-900/60">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
              style={{ width: `${Math.round(xp.progress * 100)}%` }}
            />
          </div>
        )}
      </div>

      <p className="text-sm text-muted-foreground">以前に案内された特典については、<Link href="/contact#legacy-benefits" className="inline-flex min-h-11 items-center underline underline-offset-4">お問い合わせください</Link>。</p>

      <BadgeWall />
    </div>
  );
}
