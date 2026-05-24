"use client";

import * as React from "react";
import Link from "next/link";
import { BookOpen, Clock, Flame, Target, TrendingUp, ArrowRight } from "lucide-react";
import { LS_KEYS } from "@/lib/storage/keys";
import { readStreak } from "@/lib/streak/storage";
import { examLabel } from "@/lib/utils";
import {
  computeExamProbabilities,
  daysUntilNextExam,
  estimateStudyMinutes,
  type ExamPassProbability,
  type QuestionMeta,
} from "@/lib/dashboard/analytics";
import type { HistoryEntry } from "@/lib/storage/history";
import { LearningHeatmap } from "@/components/motivation/LearningHeatmap";

interface OverviewData {
  totalAnswered: number;
  studyMinutes: number;
  streak: number;
  longestStreak: number;
  daysToExam: number;
  examLabel: string;
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
    const exam = daysUntilNextExam();
    const uniqueIds = [...new Set(entries.map((e) => e.id))];

    void fetchQuestionMeta(uniqueIds).then((meta) => {
      const examProbs = computeExamProbabilities(entries, meta);
      // Prefer exams that have crossed PROB_MIN_SAMPLE — a tiny-sample 61%
      // outranking a meaningful 45% would surface a "計測中" placeholder
      // even though the user has a real measurable exam.
      const sortedProbs = [...examProbs].sort((a, b) => {
        if (a.enoughSample !== b.enoughSample) return a.enoughSample ? -1 : 1;
        return b.passProbability - a.passProbability;
      });
      const examTopProb = sortedProbs[0];
      setData({
        totalAnswered: entries.length,
        studyMinutes: estimateStudyMinutes(entries.length),
        streak: streak.currentStreak,
        longestStreak: streak.longestStreak,
        daysToExam: exam.days,
        examLabel: exam.label,
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
      <div className="flex justify-end">
        <Link
          href="/quiz/stream"
          className="inline-flex items-center gap-1 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
        >
          学習を始める
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <KpiCard
          icon={<BookOpen className="h-4 w-4" />}
          label="総問題数"
          value={data.totalAnswered.toLocaleString("ja-JP")}
          unit="問"
          tone="sky"
        />
        <KpiCard
          icon={<Clock className="h-4 w-4" />}
          label="学習時間"
          value={studyTimeLabel}
          tone="violet"
        />
        <KpiCard
          icon={<Flame className="h-4 w-4" />}
          label="連続日数"
          value={String(data.streak)}
          unit={`日 (最長${data.longestStreak})`}
          tone="amber"
        />
        <KpiCard
          icon={<Target className="h-4 w-4" />}
          label="次の試験まで"
          value={String(data.daysToExam)}
          unit="日"
          sub={data.examLabel}
          tone="rose"
        />
        <KpiCard
          icon={<TrendingUp className="h-4 w-4" />}
          label="予測合格率"
          value={
            data.examTopProb && data.examTopProb.enoughSample
              ? `${data.examTopProb.passProbability}%`
              : "計測中"
          }
          sub={
            !data.examTopProb
              ? "—"
              : data.examTopProb.enoughSample
                ? examLabel(data.examTopProb.exam)
                : `あと ${data.examTopProb.answersUntilSample} 問で計測開始`
          }
          tone="emerald"
        />
      </section>

      <section>
        <h2 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          学習カレンダー（直近365日）
        </h2>
        <LearningHeatmap days={365} showStats />
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
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit?: string;
  sub?: string;
  tone: "sky" | "violet" | "amber" | "rose" | "emerald";
}) {
  const toneClass: Record<typeof tone, string> = {
    sky: "from-sky-500 to-cyan-500",
    violet: "from-violet-500 to-fuchsia-500",
    amber: "from-amber-500 to-orange-500",
    rose: "from-rose-500 to-pink-500",
    emerald: "from-emerald-500 to-teal-500",
  };
  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div
        className={`absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gradient-to-br ${toneClass[tone]} opacity-20 blur-2xl`}
      />
      <div className="relative">
        <div className="mb-1 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {icon}
          {label}
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold sm:text-3xl">{value}</span>
          {unit && <span className="text-xs text-zinc-500">{unit}</span>}
        </div>
        {sub && (
          <div className="mt-0.5 truncate text-[11px] text-zinc-500 dark:text-zinc-400">
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}
