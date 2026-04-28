"use client";

import * as React from "react";
import Link from "next/link";
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
} from "recharts";
import {
  BookOpen,
  Clock,
  Flame,
  Target,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { ALL_QUESTIONS } from "@/data/questions";
import { LS_KEYS } from "@/lib/storage/keys";
import { readStreak } from "@/lib/streak/storage";
import { examLabel } from "@/lib/utils";
import {
  computeCategoryStats,
  computeExamProbabilities,
  daysUntilNextExam,
  estimateStudyMinutes,
  radarSlots,
  topStrongCategories,
  topWeakCategories,
  type CategoryStat,
  type ExamPassProbability,
} from "@/lib/dashboard/analytics";
import type { HistoryEntry } from "@/lib/storage/history";

interface DashboardData {
  totalAnswered: number;
  uniqueAnswered: number;
  studyMinutes: number;
  streak: number;
  longestStreak: number;
  daysToExam: number;
  examLabel: string;
  categoryStats: CategoryStat[];
  weak: CategoryStat[];
  strong: CategoryStat[];
  examProbs: ExamPassProbability[];
  examTopProb: ExamPassProbability;
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

export function Dashboard() {
  const [data, setData] = React.useState<DashboardData | null>(null);

  React.useEffect(() => {
    const entries = loadHistoryEntries();
    const streak = readStreak();
    const categoryStats = computeCategoryStats(entries, ALL_QUESTIONS);
    const weak = topWeakCategories(categoryStats);
    const strong = topStrongCategories(categoryStats);
    const examProbs = computeExamProbabilities(entries, ALL_QUESTIONS);
    const examTopProb = [...examProbs].sort((a, b) => b.passProbability - a.passProbability)[0];
    const exam = daysUntilNextExam();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData({
      totalAnswered: entries.length,
      uniqueAnswered: new Set(entries.map((e) => e.id)).size,
      studyMinutes: estimateStudyMinutes(entries.length),
      streak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      daysToExam: exam.days,
      examLabel: exam.label,
      categoryStats,
      weak,
      strong,
      examProbs,
      examTopProb,
    });
  }, []);

  if (!data) {
    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-10">
        <div className="h-64 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />
      </main>
    );
  }

  const studyHours = Math.floor(data.studyMinutes / 60);
  const studyMins = data.studyMinutes % 60;
  const studyTimeLabel =
    studyHours > 0 ? `${studyHours}時間${studyMins}分` : `${studyMins}分`;

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">学習ダッシュボード</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Apple Healthスタイル — あなたの過去問学習を一目で
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/quiz/stream"
            className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          >
            学習を始める
          </Link>
        </div>
      </div>

      <section className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
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
          value={`${data.examTopProb?.passProbability ?? 0}%`}
          sub={data.examTopProb ? examLabel(data.examTopProb.exam) : "—"}
          tone="emerald"
        />
      </section>

      <section className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-4 lg:col-span-2 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            分野別習熟度（直近10分野）
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={radarSlots(data.categoryStats).map((s) => ({
                  category: s.category,
                  accuracy: Math.round(s.accuracy * 100),
                  answered: s.answered,
                }))}
              >
                <PolarGrid stroke="rgba(120,120,135,0.3)" />
                <PolarAngleAxis
                  dataKey="category"
                  tick={{ fontSize: 11, fill: "currentColor" }}
                  className="text-zinc-700 dark:text-zinc-300"
                />
                <PolarRadiusAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 9, fill: "rgba(120,120,135,0.7)" }}
                  axisLine={false}
                  stroke="rgba(120,120,135,0.3)"
                />
                <Radar
                  name="正答率"
                  dataKey="accuracy"
                  stroke="#0284c7"
                  fill="#0ea5e9"
                  fillOpacity={0.35}
                />
                <Tooltip
                  formatter={(v) => [`${v}%`, "正答率"]}
                  contentStyle={{
                    background: "rgba(24,24,27,0.95)",
                    border: "none",
                    borderRadius: 8,
                    color: "#fff",
                    fontSize: 12,
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          {data.categoryStats.length === 0 && (
            <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-400">
              まだ学習履歴がありません。ストリーム学習や通常モードで問題を解くと表示されます。
            </p>
          )}
        </div>

        <div className="space-y-3">
          <CategoryListCard
            title="弱点 TOP3"
            tone="red"
            items={data.weak}
            empty="3問以上解いた分野が必要です"
          />
          <CategoryListCard
            title="得意 TOP3"
            tone="green"
            items={data.strong}
            empty="3問以上解いた分野が必要です"
          />
        </div>
      </section>

      <section className="mb-6 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          試験別 合格確率（13区分）
        </h2>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {data.examProbs
            .sort((a, b) => b.passProbability - a.passProbability)
            .map((p) => (
              <ExamRow key={p.exam} prob={p} />
            ))}
        </div>
        <p className="mt-3 text-[11px] text-zinc-500 dark:text-zinc-400">
          ※ 60%以上の正答率と60問以上のサンプルを「合格圏」目安として算出（参考値）。
        </p>
      </section>
    </main>
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

function CategoryListCard({
  title,
  tone,
  items,
  empty,
}: {
  title: string;
  tone: "red" | "green";
  items: CategoryStat[];
  empty: string;
}) {
  const toneClass = tone === "red"
    ? "border-red-200 bg-red-50 text-red-900 dark:border-red-900 dark:bg-red-950/40 dark:text-red-100"
    : "border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100";
  const accentText = tone === "red" ? "text-red-600 dark:text-red-300" : "text-emerald-600 dark:text-emerald-300";
  return (
    <div className={`rounded-2xl border p-4 ${toneClass}`}>
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider opacity-80">
        {title}
      </h3>
      {items.length === 0 ? (
        <p className="text-xs opacity-70">{empty}</p>
      ) : (
        <ol className="space-y-2">
          {items.map((s, i) => (
            <li key={s.category} className="flex items-baseline justify-between gap-3 text-sm">
              <span className="flex min-w-0 items-baseline gap-2">
                <span className="text-xs font-bold opacity-60">{i + 1}.</span>
                <span className="truncate">{s.category}</span>
              </span>
              <span className={`shrink-0 font-bold ${accentText}`}>
                {Math.round(s.accuracy * 100)}%
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

function ExamRow({ prob }: { prob: ExamPassProbability }) {
  const inPassZone = prob.passProbability >= 60 && prob.answered >= 60;
  return (
    <Link
      href={`/quiz?mode=random&exam=${prob.exam}`}
      className="group flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white p-3 transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-700"
    >
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{examLabel(prob.exam)}</div>
        <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
          <span>{prob.answered}問 解答済</span>
          {prob.questionsToPassZone > 0 && (
            <span className="text-amber-600 dark:text-amber-400">
              あと{prob.questionsToPassZone}問で合格圏判定
            </span>
          )}
          {inPassZone && <span className="text-emerald-600 dark:text-emerald-400">合格圏</span>}
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className={`h-full transition-all ${
              prob.passProbability >= 70
                ? "bg-emerald-500"
                : prob.passProbability >= 40
                  ? "bg-amber-500"
                  : "bg-zinc-400"
            }`}
            style={{ width: `${prob.passProbability}%` }}
          />
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1 text-right">
        <span className="text-base font-bold tabular-nums">{prob.passProbability}%</span>
        <ArrowRight className="h-3.5 w-3.5 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-sky-500" />
      </div>
    </Link>
  );
}
