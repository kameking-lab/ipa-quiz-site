"use client";

import * as React from "react";
import { createHistoryStore, getPremiumFlag, setPremiumFlag } from "@/lib/storage/history";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { readAiUsage, FREE_DAILY_LIMIT_CLIENT } from "@/lib/storage/rate-limit-client";

export function HistoryStats() {
  const [stats, setStats] = React.useState<{ total: number; correct: number; uniqueAnswered: number } | null>(null);
  const [premium, setPremium] = React.useState(false);
  const [usage, setUsage] = React.useState({ count: 0, date: "" });

  React.useEffect(() => {
    const h = createHistoryStore();
    const s = h.getStats();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats({ total: s.total, correct: s.correct, uniqueAnswered: s.uniqueAnswered });
    setPremium(getPremiumFlag());
    setUsage(readAiUsage());
  }, []);

  if (!stats) {
    return (
      <Card>
        <CardContent className="pt-5">
          <div className="h-16 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-900" />
        </CardContent>
      </Card>
    );
  }

  const accuracy = stats.total ? Math.round((stats.correct / stats.total) * 100) : null;

  return (
    <Card>
      <CardContent className="pt-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="grid grid-cols-3 gap-4 text-center sm:text-left">
            <div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">回答済み</div>
              <div className="text-lg font-bold">{stats.uniqueAnswered}問</div>
            </div>
            <div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">正答率</div>
              <div className="text-lg font-bold">
                {accuracy !== null ? `${accuracy}%` : "-"}
              </div>
            </div>
            <div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">AI残</div>
              <div className="text-lg font-bold">
                {premium
                  ? "無制限"
                  : `${Math.max(FREE_DAILY_LIMIT_CLIENT - usage.count, 0)}/${FREE_DAILY_LIMIT_CLIENT}`}
              </div>
            </div>
          </div>
          <label className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
            プレミアム（ベータ）
            <Switch
              checked={premium}
              onCheckedChange={(v) => {
                setPremiumFlag(v);
                setPremium(v);
              }}
            />
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
