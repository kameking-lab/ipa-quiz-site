"use client";

import * as React from "react";
import { createHistoryStore } from "@/lib/storage/history";
import { Card, CardContent } from "@/components/ui/card";
import { readAiUsage, FREE_DAILY_LIMIT_CLIENT } from "@/lib/storage/rate-limit-client";
import { examLabel } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";
import { cn } from "@/lib/utils";

type TabId = "overview" | "weakness" | "progress";

const MIN_FOR_ANALYSIS = 20;
const MIN_EXAMS_FOR_CHART = 3;

interface ExamStat {
  exam: string;
  label: string;
  total: number;
  correct: number;
  accuracy: number;
}

function getExamCode(id: string): string {
  return id.split("-")[0];
}

function buildExamStats(entries: Array<{ id: string; correct: boolean }>): ExamStat[] {
  const lastAttempt = new Map<string, boolean>();
  for (const e of entries) lastAttempt.set(e.id, e.correct);

  const byExam = new Map<string, { total: number; correct: number }>();
  for (const [id, ok] of lastAttempt) {
    const exam = getExamCode(id);
    const cur = byExam.get(exam) ?? { total: 0, correct: 0 };
    byExam.set(exam, { total: cur.total + 1, correct: cur.correct + (ok ? 1 : 0) });
  }

  return [...byExam.entries()]
    .map(([exam, s]) => ({
      exam,
      label: examLabel(exam as ExamCode),
      total: s.total,
      correct: s.correct,
      accuracy: s.total > 0 ? s.correct / s.total : 0,
    }))
    .sort((a, b) => a.accuracy - b.accuracy);
}

function AccuracyBar({ accuracy }: { accuracy: number }) {
  const pct = Math.round(accuracy * 100);
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            pct < 50
              ? "bg-red-500 dark:bg-red-400"
              : pct < 70
                ? "bg-amber-500 dark:bg-amber-400"
                : "bg-emerald-500 dark:bg-emerald-400",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="w-10 text-right text-xs font-medium tabular-nums">{pct}%</span>
    </div>
  );
}

export function HistoryStats() {
  const [activeTab, setActiveTab] = React.useState<TabId>("overview");
  const [data, setData] = React.useState<{
    total: number;
    correct: number;
    uniqueAnswered: number;
    examStats: ExamStat[];
  } | null>(null);
  const [usage, setUsage] = React.useState({ count: 0, date: "" });

  React.useEffect(() => {
    const h = createHistoryStore();
    const s = h.getStats();
    const raw = JSON.parse(h.exportJson()) as {
      entries: Array<{ id: string; correct: boolean }>;
    };
     
    setData({
      total: s.total,
      correct: s.correct,
      uniqueAnswered: s.uniqueAnswered,
      examStats: buildExamStats(raw.entries),
    });
    setUsage(readAiUsage());
  }, []);

  if (!data) {
    return (
      <Card>
        <CardContent className="pt-5">
          <div className="h-16 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-900" />
        </CardContent>
      </Card>
    );
  }

  const accuracy = data.total ? Math.round((data.correct / data.total) * 100) : null;
  const aiRemaining = Math.max(FREE_DAILY_LIMIT_CLIENT - usage.count, 0);
  const weakExams = data.examStats.filter((e) => e.accuracy < 0.6);
  const hasEnoughData = data.uniqueAnswered >= MIN_FOR_ANALYSIS;
  const hasEnoughExams = data.examStats.length >= MIN_EXAMS_FOR_CHART;

  const TABS: { id: TabId; label: string }[] = [
    { id: "overview", label: "概要" },
    { id: "weakness", label: "弱点" },
    { id: "progress", label: "進捗" },
  ];

  return (
    <Card>
      <CardContent className="pt-4">
        {/* Tab bar */}
        <div className="mb-4 flex gap-1 border-b border-zinc-200 dark:border-zinc-800">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "-mb-px border-b-2 px-3 pb-2 text-xs font-medium transition-colors",
                activeTab === tab.id
                  ? "border-sky-500 text-sky-600 dark:border-sky-400 dark:text-sky-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-3 gap-4 text-center sm:text-left">
            <div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400">回答済み</div>
              <div className="text-lg font-bold">{data.uniqueAnswered}問</div>
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
                {aiRemaining}/{FREE_DAILY_LIMIT_CLIENT}
              </div>
            </div>
          </div>
        )}

        {/* Weakness tab */}
        {activeTab === "weakness" && (
          <>
            {!hasEnoughData ? (
              <div className="rounded-xl bg-zinc-50 p-4 text-center text-xs text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                <p className="font-medium">データ収集中</p>
                <p className="mt-1">
                  最低{MIN_FOR_ANALYSIS}問の解答データが必要です。現在{data.uniqueAnswered}問
                </p>
              </div>
            ) : weakExams.length === 0 ? (
              <p className="text-center text-xs text-zinc-500 dark:text-zinc-400">
                正答率60%未満の試験区分はありません。
              </p>
            ) : (
              <ul className="space-y-3">
                {weakExams.map((e) => (
                  <li key={e.exam}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-800 dark:text-zinc-100">
                        {e.label}
                      </span>
                      <span className="text-zinc-500 dark:text-zinc-400">{e.total}問</span>
                    </div>
                    <AccuracyBar accuracy={e.accuracy} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}

        {/* Progress tab */}
        {activeTab === "progress" && (
          <>
            {!hasEnoughData ? (
              <div className="rounded-xl bg-zinc-50 p-4 text-center text-xs text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
                <p className="font-medium">データ収集中</p>
                <p className="mt-1">
                  最低{MIN_FOR_ANALYSIS}問の解答データが必要です。現在{data.uniqueAnswered}問
                </p>
              </div>
            ) : !hasEnoughExams ? (
              <div className="space-y-3">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  チャート表示には{MIN_EXAMS_FOR_CHART}試験区分以上のデータが必要です（現在
                  {data.examStats.length}区分）。
                </p>
                {data.examStats.map((e) => (
                  <div key={e.exam}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-800 dark:text-zinc-100">
                        {e.label}
                      </span>
                      <span className="text-zinc-500 dark:text-zinc-400">{e.total}問</span>
                    </div>
                    <AccuracyBar accuracy={e.accuracy} />
                  </div>
                ))}
              </div>
            ) : (
              <ul className="space-y-3">
                {[...data.examStats].sort((a, b) => b.total - a.total).map((e) => (
                  <li key={e.exam}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="font-medium text-zinc-800 dark:text-zinc-100">
                        {e.label}
                      </span>
                      <span className="text-zinc-500 dark:text-zinc-400">{e.total}問</span>
                    </div>
                    <AccuracyBar accuracy={e.accuracy} />
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
