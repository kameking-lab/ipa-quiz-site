"use client";

import * as React from "react";
import Link from "next/link";
import { LS_KEYS } from "@/lib/storage/keys";
import { EXAM_LABELS } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";

interface StoredEntry {
  id: string;
  selected: string;
  correct: boolean;
  at: number;
}

interface CategoryStats {
  exam: ExamCode;
  category: string;
  total: number;
  correct: number;
  accuracy: number;
}

const EXAMS: ExamCode[] = [
  "ip",
  "sg",
  "fe",
  "ap",
  "sc",
  "nw",
  "db",
  "es",
  "st",
  "sa",
  "pm",
  "sm",
  "au",
];

export function WeaknessHeatmapClient() {
  const [entries, setEntries] = React.useState<StoredEntry[]>([]);
  const [questionMap, setQuestionMap] = React.useState<Map<
    string,
    { exam: ExamCode; category: string }
  > | null>(null);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEYS.history);
      if (raw) {
        const parsed = JSON.parse(raw) as { entries?: StoredEntry[] };
        setEntries(parsed.entries ?? []);
      }
    } catch {
      // ignore
    }
  }, []);

  React.useEffect(() => {
    if (entries.length === 0) {
      setQuestionMap(new Map());
      return;
    }
    const ids = [...new Set(entries.map((e) => e.id))];
    fetch("/api/questions/meta", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ids }),
    })
      .then((r) => r.json())
      .then((data: { meta: Array<{ id: string; exam: ExamCode; category: string }> }) => {
        const m = new Map<string, { exam: ExamCode; category: string }>();
        for (const item of data.meta) m.set(item.id, { exam: item.exam, category: item.category });
        setQuestionMap(m);
      })
      .catch(() => setQuestionMap(new Map()));
  }, [entries]);

  if (questionMap === null) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
        集計中...
      </div>
    );
  }

  if (entries.length === 0 || questionMap.size === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6 text-center text-sm text-muted-foreground">
        まだ回答履歴がありません。
        <Link href="/" className="ml-1 text-primary hover:underline">
          ホーム
        </Link>
        からクイズを始めて履歴を作成してください。
      </div>
    );
  }

  // Group: exam → category → {total, correct}
  const stats = new Map<string, { exam: ExamCode; category: string; total: number; correct: number }>();
  for (const e of entries) {
    const meta = questionMap.get(e.id);
    if (!meta) continue;
    const key = `${meta.exam}|${meta.category}`;
    const cur = stats.get(key) ?? {
      exam: meta.exam,
      category: meta.category,
      total: 0,
      correct: 0,
    };
    cur.total += 1;
    if (e.correct) cur.correct += 1;
    stats.set(key, cur);
  }
  const allStats: CategoryStats[] = [...stats.values()].map((s) => ({
    ...s,
    accuracy: s.total === 0 ? 0 : s.correct / s.total,
  }));

  // Group by exam for display
  const byExam = new Map<ExamCode, CategoryStats[]>();
  for (const s of allStats) {
    const list = byExam.get(s.exam) ?? [];
    list.push(s);
    byExam.set(s.exam, list);
  }
  for (const list of byExam.values()) {
    list.sort((a, b) => a.accuracy - b.accuracy);
  }

  const totalAnswered = allStats.reduce((sum, s) => sum + s.total, 0);
  const totalCorrect = allStats.reduce((sum, s) => sum + s.correct, 0);
  const overall = totalAnswered === 0 ? 0 : totalCorrect / totalAnswered;
  const weakest = allStats
    .filter((s) => s.total >= 3)
    .sort((a, b) => a.accuracy - b.accuracy)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="回答済み" value={totalAnswered.toLocaleString("ja-JP")} unit="問" />
        <StatCard label="正答" value={totalCorrect.toLocaleString("ja-JP")} unit="問" />
        <StatCard
          label="正答率"
          value={(overall * 100).toFixed(1)}
          unit="%"
          tone={overall >= 0.7 ? "good" : overall >= 0.5 ? "warn" : "bad"}
        />
        <StatCard label="学習分野" value={String(allStats.length)} unit="分野" />
      </div>

      {weakest.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm font-semibold text-foreground">
            最重点フォロー分野（正答率の低い順、3問以上回答）
          </h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {weakest.map((w) => (
              <Link
                key={`${w.exam}-${w.category}`}
                href={`/quiz?mode=topic&exam=${w.exam}&category=${encodeURIComponent(w.category)}`}
                className="flex items-center justify-between rounded-xl border border-border bg-card p-3 text-sm transition hover:border-primary/40"
              >
                <div>
                  <div className="text-xs text-muted-foreground">
                    {EXAM_LABELS[w.exam] ?? w.exam.toUpperCase()}
                  </div>
                  <div className="font-semibold">{w.category}</div>
                </div>
                <div className="text-right">
                  <div
                    className={
                      "text-lg font-bold " +
                      (w.accuracy < 0.5
                        ? "text-rose-600 dark:text-rose-400"
                        : w.accuracy < 0.7
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-emerald-600 dark:text-emerald-400")
                    }
                  >
                    {(w.accuracy * 100).toFixed(0)}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {w.correct}/{w.total}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-2 text-sm font-semibold text-foreground">試験区分×分野マップ</h2>
        <div className="space-y-3">
          {EXAMS.map((exam) => {
            const list = byExam.get(exam);
            if (!list || list.length === 0) return null;
            return (
              <div
                key={exam}
                className="rounded-2xl border border-border bg-card p-4"
              >
                <div className="mb-2 text-sm font-semibold text-foreground">
                  {EXAM_LABELS[exam] ?? exam.toUpperCase()}
                </div>
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-4">
                  {list.map((s) => (
                    <Link
                      key={s.category}
                      href={`/quiz?mode=topic&exam=${s.exam}&category=${encodeURIComponent(s.category)}`}
                      className={
                        "flex flex-col gap-0.5 rounded-lg p-2 text-xs transition hover:scale-[1.02] " +
                        toneClass(s.accuracy)
                      }
                      title={`${s.correct}/${s.total} 正答`}
                    >
                      <span className="truncate font-medium">{s.category}</span>
                      <span className="font-bold">
                        {(s.accuracy * 100).toFixed(0)}%
                        <span className="ml-1 font-normal opacity-75">
                          ({s.correct}/{s.total})
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  unit,
  tone,
}: {
  label: string;
  value: string;
  unit: string;
  tone?: "good" | "warn" | "bad";
}) {
  const toneClass =
    tone === "good"
      ? "text-emerald-600 dark:text-emerald-400"
      : tone === "warn"
        ? "text-amber-600 dark:text-amber-400"
        : tone === "bad"
          ? "text-rose-600 dark:text-rose-400"
          : "text-foreground";
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className={"mt-1 text-xl font-bold " + toneClass}>
        {value}
        <span className="ml-0.5 text-xs font-normal text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
}

function toneClass(accuracy: number): string {
  if (accuracy >= 0.8)
    return "bg-emerald-100 text-emerald-900 hover:bg-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-200";
  if (accuracy >= 0.6)
    return "bg-lime-100 text-lime-900 hover:bg-lime-200 dark:bg-lime-950/60 dark:text-lime-200";
  if (accuracy >= 0.4)
    return "bg-amber-100 text-amber-900 hover:bg-amber-200 dark:bg-amber-950/60 dark:text-amber-200";
  return "bg-rose-100 text-rose-900 hover:bg-rose-200 dark:bg-rose-950/60 dark:text-rose-200";
}
