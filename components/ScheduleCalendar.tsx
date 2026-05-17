"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScheduleTaskItem } from "@/components/ScheduleTaskItem";
import {
  computeCompletionStats,
  getProgress,
  setTaskDone,
} from "@/lib/study-plan/storage";
import type { DailyTask, ProgressMap, StudyPlan } from "@/lib/study-plan/types";

const PHASE_BADGE: Record<DailyTask["phase"], { label: string; tone: string }> = {
  early: { label: "序盤", tone: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200" },
  middle: {
    label: "中盤",
    tone: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  },
  late: {
    label: "終盤",
    tone: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
  },
};

function startOfWeek(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00`);
  const day = d.getDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day; // ISO week: Monday start
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

function formatDateLabel(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  const m = d.getMonth() + 1;
  const day = d.getDate();
  const wd = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  return `${m}/${day}（${wd}）`;
}

function groupByWeek(daily: DailyTask[]): Map<string, DailyTask[]> {
  const map = new Map<string, DailyTask[]>();
  for (const d of daily) {
    const wk = startOfWeek(d.date);
    if (!map.has(wk)) map.set(wk, []);
    map.get(wk)!.push(d);
  }
  return map;
}

interface Props {
  plan: StudyPlan;
}

export function ScheduleCalendar({ plan }: Props) {
  const [progress, setProgress] = React.useState<ProgressMap>({});

  React.useEffect(() => {
    setProgress(getProgress(plan.id));
  }, [plan.id]);

  const handleToggle = (key: string, done: boolean) => {
    const next = setTaskDone(plan.id, key, done);
    setProgress({ ...next });
  };

  const stats = React.useMemo(
    () => computeCompletionStats(plan, progress),
    [plan, progress],
  );

  const weeks = React.useMemo(() => groupByWeek(plan.daily), [plan]);

  if (plan.daily.length === 0) {
    return (
      <Card>
        <CardContent className="py-6 text-sm text-muted-foreground">
          試験日までの日数が足りません。試験日を見直してください。
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-4 text-sm">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <div className="text-xs text-muted-foreground">進捗</div>
            <div className="text-2xl font-semibold tabular-nums">
              {stats.percent}%
            </div>
            <div className="text-xs text-muted-foreground">
              {stats.done} / {stats.total} タスク完了
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">残り</div>
            <div className="text-lg font-semibold tabular-nums">
              {plan.summary.daysRemaining} 日
            </div>
          </div>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${stats.percent}%` }}
            aria-hidden
          />
        </div>
      </div>

      {Array.from(weeks.entries()).map(([weekStart, days], i) => (
        <section key={weekStart} aria-labelledby={`week-${i}`}>
          <h2
            id={`week-${i}`}
            className="mb-2 text-sm font-semibold text-muted-foreground"
          >
            第 {i + 1} 週（{formatDateLabel(weekStart)} 〜）
          </h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {days.map((day) => {
              const dayDone = day.tasks.every((t) => progress[t.key]?.done);
              const phase = PHASE_BADGE[day.phase];
              return (
                <Card
                  key={day.date}
                  className={dayDone && day.tasks.length > 0 ? "opacity-70" : ""}
                >
                  <CardContent className="p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="font-medium">{formatDateLabel(day.date)}</div>
                      <div className="flex items-center gap-2">
                        <Badge className={phase.tone}>{phase.label}</Badge>
                        <span className="text-xs tabular-nums text-muted-foreground">
                          {day.budgetMinutes}分
                        </span>
                      </div>
                    </div>
                    {day.tasks.length === 0 ? (
                      <p className="text-xs text-muted-foreground">
                        休息日（学習時間 {day.budgetMinutes} 分のため割当なし）
                      </p>
                    ) : (
                      <ul className="space-y-1.5">
                        {day.tasks.map((t) => (
                          <ScheduleTaskItem
                            key={t.key}
                            task={t}
                            done={Boolean(progress[t.key]?.done)}
                            onToggle={(next) => handleToggle(t.key, next)}
                          />
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
