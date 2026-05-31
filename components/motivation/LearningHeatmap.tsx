"use client";

import * as React from "react";
import { createHistoryStore } from "@/lib/storage/history";
import {
  generateDayRange,
  intensityLevel,
  syncHeatmapWithHistory,
  totalAnswered,
  totalStudyDays,
} from "@/lib/motivation/heatmap";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

// 24px (h-6 w-6) interactive cells meet the WCAG 2.5.8 minimum tap target
// (empirical review A-5/G-3: the dashboard heatmap was 12–14px). The card's
// overflow-x-auto wrapper lets the wider year grid scroll on mobile. No sm:
// variant so the legend swatch override (h-2.5 w-2.5) fully wins at every width.
const CELL_BASE = "h-6 w-6 rounded-[3px] transition-colors";

const LEVEL_COLOR: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: "bg-zinc-100 dark:bg-zinc-800",
  1: "bg-emerald-200 dark:bg-emerald-900/60",
  2: "bg-emerald-400 dark:bg-emerald-700",
  3: "bg-emerald-500 dark:bg-emerald-500",
  4: "bg-emerald-700 dark:bg-emerald-300",
};

interface Props {
  days?: number;
  compact?: boolean;
  showStats?: boolean;
}

function formatTooltip(date: string, count: number): string {
  return count > 0 ? `${date}: ${count}問` : `${date}: 学習なし`;
}

export function LearningHeatmap({ days = 365, compact = false, showStats = true }: Props) {
  const [byDate, setByDate] = React.useState<Record<string, number> | null>(null);
  const [hovered, setHovered] = React.useState<{ date: string; count: number } | null>(null);

  React.useEffect(() => {
    const store = createHistoryStore();
    const entries = store.exportJson();
    let parsedEntries: { entries: { id: string; selected: string; correct: boolean; at: number }[] };
    try {
      parsedEntries = JSON.parse(entries);
    } catch {
      parsedEntries = { entries: [] };
    }
     
    setByDate(syncHeatmapWithHistory(parsedEntries.entries));
  }, []);

  const dates = React.useMemo(() => generateDayRange(days), [days]);

  if (!byDate) {
    return (
      <Card>
        <CardContent className="pt-5">
          <div className="h-24 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-900" />
        </CardContent>
      </Card>
    );
  }

  const studyDays = totalStudyDays(byDate);
  const answered = totalAnswered(byDate);

  // 53 weeks max (371 days padded so first column starts on Sunday-ish row)
  const cells = dates.map((date) => ({
    date,
    count: byDate[date] ?? 0,
  }));

  // Pad start to align week rows: Sunday = 0, Monday = 1, ... in JST.
  const firstDow = new Date(`${dates[0]}T00:00:00+09:00`).getUTCDay(); // JST midnight UTC+9, so use UTC day
  const pad = firstDow;
  const padded: ({ date: string; count: number } | null)[] = Array(pad).fill(null).concat(cells);
  // Fill end to multiple of 7
  while (padded.length % 7 !== 0) padded.push(null);

  // Group into weeks (columns of 7) – render row-major DOWs.
  const weeks: ({ date: string; count: number } | null)[][] = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7));
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="pt-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-sm font-semibold">学習カレンダー</h3>
          </div>
          {showStats && (
            <div className="flex gap-3 text-[11px] text-zinc-500 dark:text-zinc-400">
              <span>
                <strong className="text-zinc-700 dark:text-zinc-200">{studyDays}</strong> 日
              </span>
              <span>
                <strong className="text-zinc-700 dark:text-zinc-200">
                  {answered.toLocaleString("ja-JP")}
                </strong>{" "}
                問
              </span>
            </div>
          )}
        </div>

        <div className="overflow-x-auto pb-1" role="group" aria-label="過去365日の学習ヒートマップ">
          <div className="inline-flex gap-[3px]">
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((cell, di) => {
                  if (!cell) {
                    return (
                      <div
                        key={di}
                        className={cn(CELL_BASE, "bg-transparent")}
                        aria-hidden="true"
                      />
                    );
                  }
                  const lvl = intensityLevel(cell.count);
                  return (
                    <button
                      key={di}
                      type="button"
                      title={formatTooltip(cell.date, cell.count)}
                      onMouseEnter={() => setHovered(cell)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(cell)}
                      onBlur={() => setHovered(null)}
                      className={cn(CELL_BASE, LEVEL_COLOR[lvl], "ring-0 hover:ring-2 hover:ring-emerald-400")}
                      aria-label={formatTooltip(cell.date, cell.count)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-2 flex items-center justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
          <span className="truncate">
            {hovered
              ? formatTooltip(hovered.date, hovered.count)
              : compact
                ? "今日の学習で草が育ちます"
                : "ホバーで日別の問題数を確認"}
          </span>
          <div className="flex items-center gap-1">
            <span>少</span>
            {[0, 1, 2, 3, 4].map((l) => (
              <span
                key={l}
                className={cn(
                  CELL_BASE,
                  LEVEL_COLOR[l as 0 | 1 | 2 | 3 | 4],
                  "h-2.5 w-2.5",
                )}
              />
            ))}
            <span>多</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
