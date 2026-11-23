"use client";

import * as React from "react";
import Link from "next/link";
import { LS_KEYS } from "@/lib/storage/keys";
import type { ExamCode } from "@/lib/questions/types";
import type { HistoryEntry } from "@/lib/storage/history";

interface Props {
  exam: ExamCode;
  totalQuestions: number;
}

function loadEntries(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LS_KEYS.history);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as { entries?: HistoryEntry[] };
    return Array.isArray(parsed.entries) ? parsed.entries : [];
  } catch {
    return [];
  }
}

export function ExamProgressBar({ exam, totalQuestions }: Props) {
  const [progress, setProgress] = React.useState<{
    answered: number;
    wrong: number;
    correct: number;
    accuracy: number;
  } | null>(null);

  React.useEffect(() => {
    const entries = loadEntries().filter((e) => e.id.startsWith(`${exam}-`));
    const latest = new Map(entries.map((entry) => [entry.id, entry.correct]));
    const correctEntries = entries.filter((e) => e.correct);
     
    setProgress({
      answered: latest.size,
      wrong: [...latest.values()].filter((correct) => !correct).length,
      correct: correctEntries.length,
      accuracy: entries.length > 0 ? correctEntries.length / entries.length : 0,
    });
  }, [exam]);

  if (!progress || progress.answered === 0) return null;

  const pct = totalQuestions > 0 ? Math.round((progress.answered / totalQuestions) * 100) : 0;
  const accuracyPct = Math.round(progress.accuracy * 100);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            この試験での進捗
          </p>
          <p className="mt-0.5 text-2xl font-bold tabular-nums">
            {progress.answered.toLocaleString("ja-JP")}
            <span className="ml-1 text-sm font-normal text-muted-foreground">
              / {totalQuestions.toLocaleString("ja-JP")} 問
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">正答率</p>
          <p className="text-2xl font-bold tabular-nums text-sky-700 dark:text-sky-300">
            {accuracyPct}%
          </p>
        </div>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full bg-gradient-to-r from-sky-500 to-violet-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      {progress.wrong > 0 && (
        <Link href={'/quiz?' + new URLSearchParams({ mode: "review", exam, reviewKind: "wrong" })} className="mt-2 inline-flex min-h-11 items-center text-sm underline">
          間違えた問題を復習
        </Link>
      )}
    </div>
  );
}
