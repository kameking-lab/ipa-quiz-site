"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Flame } from "lucide-react";
import { createHistoryStore } from "@/lib/storage/history";
import { jstDateString } from "@/lib/streak/core";
import { readStreak } from "@/lib/streak/storage";

const DAY_COUNT = 30;

interface DayCell {
  iso: string;
  label: string;
  count: number;
  correct: number;
}

function buildLast30Days(): { iso: string; label: string }[] {
  const out: { iso: string; label: string }[] = [];
  const today = new Date();
  for (let i = DAY_COUNT - 1; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    const iso = jstDateString(d);
    const label = `${d.getMonth() + 1}/${d.getDate()}`;
    out.push({ iso, label });
  }
  return out;
}

function intensityClass(count: number): string {
  if (count === 0) {
    return "bg-zinc-100 dark:bg-zinc-800";
  }
  if (count < 5) {
    return "bg-emerald-200 dark:bg-emerald-900/60";
  }
  if (count < 15) {
    return "bg-emerald-400 dark:bg-emerald-700";
  }
  if (count < 30) {
    return "bg-emerald-500 dark:bg-emerald-600";
  }
  return "bg-emerald-600 dark:bg-emerald-500";
}

export function LearningCalendar() {
  const [days, setDays] = React.useState<DayCell[]>([]);
  const [currentStreak, setCurrentStreak] = React.useState(0);
  const [todayCount, setTodayCount] = React.useState(0);
  const [hydrated, setHydrated] = React.useState(false);
  const [hovered, setHovered] = React.useState<DayCell | null>(null);

  React.useEffect(() => {
    const skeleton = buildLast30Days();
    const store = createHistoryStore();
    const entries = store.getAllEntries();
    const byDay = new Map<string, { count: number; correct: number }>();
    for (const e of entries) {
      const iso = jstDateString(new Date(e.at));
      const bucket = byDay.get(iso) ?? { count: 0, correct: 0 };
      bucket.count += 1;
      if (e.correct) bucket.correct += 1;
      byDay.set(iso, bucket);
    }
    const cells: DayCell[] = skeleton.map((d) => {
      const b = byDay.get(d.iso);
      return {
        iso: d.iso,
        label: d.label,
        count: b?.count ?? 0,
        correct: b?.correct ?? 0,
      };
    });
    const todayIso = jstDateString();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDays(cells);
    setCurrentStreak(readStreak().currentStreak);
    setTodayCount(byDay.get(todayIso)?.count ?? 0);
    setHydrated(true);
  }, []);

  if (!hydrated) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="h-32 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-900" />
      </div>
    );
  }

  return (
    <section
      aria-labelledby="learning-calendar-heading"
      className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <h2
            id="learning-calendar-heading"
            className="text-sm font-semibold text-zinc-700 dark:text-zinc-300"
          >
            学習カレンダー <span className="text-xs font-normal text-zinc-500">直近30日</span>
          </h2>
          <div className="mt-1 flex flex-wrap items-baseline gap-3 text-xs text-zinc-600 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1">
              <Flame
                className={`h-3.5 w-3.5 ${currentStreak > 0 ? "text-orange-500" : "text-zinc-400"}`}
                aria-hidden="true"
              />
              連続 <strong className="text-sm text-zinc-900 dark:text-zinc-50">{currentStreak}</strong>日
            </span>
            <span>
              今日 <strong className="text-sm text-zinc-900 dark:text-zinc-50">{todayCount}</strong>問
            </span>
          </div>
        </div>
        <Link
          href="/account/dashboard"
          className="inline-flex shrink-0 items-center gap-0.5 rounded-md px-2 py-1 text-[11px] font-medium text-sky-700 hover:bg-sky-50 dark:text-sky-300 dark:hover:bg-sky-950/40"
        >
          詳細
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
        </Link>
      </div>

      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: "repeat(15, minmax(0, 1fr))" }}
        role="img"
        aria-label={`過去${DAY_COUNT}日間の学習量ヒートマップ`}
      >
        {days.map((d) => {
          const accuracy =
            d.count > 0 ? Math.round((d.correct / d.count) * 100) : null;
          const title =
            d.count === 0
              ? `${d.label}: 学習なし`
              : `${d.label}: ${d.count}問 / 正答率 ${accuracy}%`;
          return (
            <button
              key={d.iso}
              type="button"
              title={title}
              aria-label={title}
              onMouseEnter={() => setHovered(d)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(d)}
              onBlur={() => setHovered(null)}
              onClick={() => setHovered((cur) => (cur?.iso === d.iso ? null : d))}
              className={`aspect-square rounded-sm transition hover:ring-2 hover:ring-sky-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${intensityClass(d.count)}`}
            />
          );
        })}
      </div>

      <div className="mt-2 min-h-[1.25rem] text-[11px] text-zinc-600 dark:text-zinc-400">
        {hovered ? (
          <span>
            <strong>{hovered.label}</strong>
            {hovered.count === 0
              ? "（学習なし）"
              : ` ${hovered.count}問 / 正答率 ${Math.round((hovered.correct / hovered.count) * 100)}%`}
          </span>
        ) : (
          <span className="text-zinc-400 dark:text-zinc-500">
            セルにカーソル/タップで日次詳細
          </span>
        )}
      </div>
    </section>
  );
}
