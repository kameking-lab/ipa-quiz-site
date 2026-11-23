"use client";

import * as React from "react";
import { BookOpen, Clock, Flame, TrendingUp, ArrowRight } from "lucide-react";
import { LS_KEYS } from "@/lib/storage/keys";
import { readStreak } from "@/lib/streak/storage";
import { examLabel } from "@/lib/utils";
import {
  computeExamProbabilities,
  estimateStudyMinutes,
  type ExamPassProbability,
  type QuestionMeta,
} from "@/lib/dashboard/analytics";
import type { HistoryEntry } from "@/lib/storage/history";
import { LearningHeatmap } from "@/components/motivation/LearningHeatmap";
import { tsuginoScheduleUrl } from "@/lib/tsugino-qualification";

interface OverviewData {
  totalAnswered: number;
  studyMinutes: number;
  streak: number;
  longestStreak: number;
  examTopProb: ExamPassProbability | undefined;
}

function loadHistoryEntries(): HistoryEntry[] {
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

async function fetchQuestionMeta(ids: string[]): Promise<QuestionMeta[]> {
  if (ids.length === 0) return [];
  try {
    const res = await fetch("/api/questions/meta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { meta: QuestionMeta[] };
    return json.meta;
  } catch {
    return [];
  }
}

export function DashboardOverview() {
  const [data, setData] = React.useState<OverviewData | null>(null);

  React.useEffect(() => {
    const entries = loadHistoryEntries();
    const streak = readStreak();
    const uniqueIds = [...new Set(entries.map((e) => e.id))];

    void fetchQuestionMeta(uniqueIds).then((meta) => {
      const examProbs = computeExamProbabilities(entries, meta);
      const sortedProbs = [...examProbs].sort((a, b) =>
        b.answered - a.answered || b.accuracy - a.accuracy);
      const examTopProb = sortedProbs.find((probability) => probability.answered > 0);
      setData({
        totalAnswered: entries.length,
        studyMinutes: estimateStudyMinutes(entries.length),
        streak: streak.currentStreak,
        longestStreak: streak.longestStreak,
        examTopProb,
      });
    });
  }, []);

  if (!data) {
    return <div className="h-64 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />;
  }

  const studyHours = Math.floor(data.studyMinutes / 60);
  const studyMins = data.studyMinutes % 60;
  const studyTimeLabel =
    studyHours > 0 ? `${studyHours}時間${studyMins}分` : `${studyMins}分`;

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <KpiCard
          icon={<BookOpen className="h-4 w-4" />}
          label="これまでの回答"
          value={data.totalAnswered.toLocaleString("ja-JP")}
          unit="問"
        />
        <KpiCard
          icon={<Clock className="h-4 w-4" />}
          label="学習時間（目安）"
          value={studyTimeLabel}
        />
        <KpiCard
          icon={<Flame className="h-4 w-4" />}
          label="連続日数"
          value={String(data.streak)}
          unit="日"
          sub={`最長${data.longestStreak}日`}
        />
        <KpiCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="記録の正答率"
          value={data.examTopProb ? `${Math.round(data.examTopProb.accuracy * 100)}%` : "—"}
          sub={data.examTopProb
            ? `${examLabel(data.examTopProb.exam)} · ${data.examTopProb.answered}問の記録`
            : data.totalAnswered > 0 ? "正答率を読み込めませんでした" : "まだ回答記録がありません"}
        />
      </section>

      <details className="rounded-xl border border-border px-4">
        <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">試験日程</summary>
      <a
        href={tsuginoScheduleUrl(data.examTopProb?.exam)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-12 items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground hover:bg-muted"
      >
        <span>試験日・申込締切は「次の資格」で確認</span>
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
      </details>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          直近12週間
        </h2>
        <LearningHeatmap days={84} interactive={false} showStats />
      </section>
    </div>
  );
}

function KpiCard({
  icon,
  label,
  value,
  unit,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  sub?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="relative">
        <div className="mb-1 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          {icon}
          {label}
        </div>
        <div className="flex flex-wrap items-baseline gap-x-1 gap-y-0.5">
          <span className="text-2xl font-bold sm:text-3xl">{value}</span>
          {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
        </div>
        {sub && (
          <div className="mt-1 break-words text-xs text-zinc-500 dark:text-zinc-400">
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}
