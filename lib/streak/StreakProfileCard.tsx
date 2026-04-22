"use client";

import * as React from "react";
import { Flame, Trophy, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { readStreak } from "./storage";
import { nextMilestone, type StreakState } from "./core";

const MILESTONE_LABEL: Record<number, string> = {
  3: "スタートダッシュ",
  7: "1週間達成",
  14: "2週間マスター",
  30: "1ヶ月コミット",
  100: "100日の猛者",
};

export function StreakProfileCard() {
  const [state, setState] = React.useState<StreakState | null>(null);

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(readStreak());
  }, []);

  if (!state) return null;

  const next = nextMilestone(state.currentStreak);
  const isActive = state.currentStreak > 0;
  const flameSize = state.currentStreak >= 30 ? "h-8 w-8" : state.currentStreak >= 7 ? "h-7 w-7" : "h-6 w-6";
  const latestMilestone =
    state.milestonesReached.length > 0
      ? state.milestonesReached[state.milestonesReached.length - 1]
      : null;

  return (
    <Card
      className={cn(
        "overflow-hidden",
        isActive && state.todayCompleted
          ? "border-orange-200 dark:border-orange-900/60"
          : undefined,
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "rounded-xl border p-2",
                isActive && state.todayCompleted
                  ? "border-orange-200 bg-orange-50 dark:border-orange-900/60 dark:bg-orange-950/40"
                  : "border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900",
              )}
            >
              <Flame
                className={cn(
                  flameSize,
                  isActive && state.todayCompleted
                    ? "text-orange-500 dark:text-orange-400"
                    : "text-zinc-400 dark:text-zinc-500",
                )}
                aria-hidden="true"
              />
            </div>
            <div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400">連続学習</div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold tracking-tight">
                  {state.currentStreak}
                </span>
                <span className="text-sm text-zinc-600 dark:text-zinc-400">日</span>
              </div>
              {!state.todayCompleted && isActive && (
                <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                  今日学習するとストリーク継続！
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 text-right text-xs text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1">
              <Trophy className="h-3 w-3" aria-hidden="true" />
              <span>最高 {state.longestStreak}日</span>
            </div>
            {latestMilestone && (
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-amber-500" aria-hidden="true" />
                <span>{MILESTONE_LABEL[latestMilestone]} 達成</span>
              </div>
            )}
          </div>
        </div>
        {next && (
          <div className="mt-3">
            <div className="mb-1 flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
              <span>次のマイルストーン：{MILESTONE_LABEL[next]}（{next}日）</span>
              <span>
                あと{next - state.currentStreak}日
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-rose-500"
                style={{
                  width: `${Math.min(100, Math.round((state.currentStreak / next) * 100))}%`,
                }}
              />
            </div>
          </div>
        )}
        {!isActive && (
          <p className="mt-2 text-[11px] text-zinc-500 dark:text-zinc-400">
            今日問題に答えると連続学習がスタートします。毎日コツコツ積み上げましょう。
          </p>
        )}
      </CardContent>
    </Card>
  );
}
