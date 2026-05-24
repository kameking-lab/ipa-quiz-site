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
import { ArrowRight } from "lucide-react";
import { LS_KEYS } from "@/lib/storage/keys";
import { examLabel } from "@/lib/utils";
import {
  computeCategoryStats,
  computeExamProbabilities,
  radarSlots,
  type CategoryStat,
  type ExamPassProbability,
  type QuestionMeta,
} from "@/lib/dashboard/analytics";
import type { HistoryEntry } from "@/lib/storage/history";

interface ProgressData {
  totalAnswered: number;
  correctCount: number;
  uniqueAnswered: number;
  categoryStats: CategoryStat[];
  examProbs: ExamPassProbability[];
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

export function DashboardProgress() {
  const [data, setData] = React.useState<ProgressData | null>(null);

  React.useEffect(() => {
    const entries = loadHistoryEntries();
    const uniqueIds = [...new Set(entries.map((e) => e.id))];

    void fetchQuestionMeta(uniqueIds).then((meta) => {
      const categoryStats = computeCategoryStats(entries, meta);
      const examProbs = computeExamProbabilities(entries, meta);
      setData({
        totalAnswered: entries.length,
        correctCount: entries.filter((e) => e.correct).length,
        uniqueAnswered: uniqueIds.length,
        categoryStats,
        examProbs,
      });
    });
  }, []);

  if (!data) {
    return <div className="h-64 animate-pulse rounded-2xl bg-zinc-100 dark:bg-zinc-900" />;
  }

  const overallAccuracy = data.totalAnswered > 0
    ? Math.round((data.correctCount / data.totalAnswered) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
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
              まだ学習履歴がありません。問題を解くと表示されます。
            </p>
          )}
        </div>

        <div className="space-y-3">
          <SummaryCard label="累計回答" value={data.totalAnswered.toLocaleString("ja-JP")} unit="問" />
          <SummaryCard label="ユニーク問題" value={data.uniqueAnswered.toLocaleString("ja-JP")} unit="問" />
          <SummaryCard label="通算正答率" value={`${overallAccuracy}%`} accent />
        </div>
      </section>

      <section className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
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
          ※ 10問未満は「—（計測中）」表示。60%以上の正答率と60問以上のサンプルを「合格圏」目安として算出（参考値）。
        </p>
      </section>
    </div>
  );
}

function SummaryCard({ label, value, unit, accent }: { label: string; value: string; unit?: string; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className={`text-2xl font-bold ${accent ? "text-sky-700 dark:text-sky-300" : ""}`}>
          {value}
        </span>
        {unit && <span className="text-xs text-zinc-500">{unit}</span>}
      </div>
    </div>
  );
}

function ExamRow({ prob }: { prob: ExamPassProbability }) {
  const inPassZone = prob.passProbability >= 60 && prob.answered >= 60;
  const measuring = !prob.enoughSample;
  return (
    <Link
      href={`/quiz?mode=random&exam=${prob.exam}`}
      className="group flex items-center justify-between gap-3 rounded-xl border border-zinc-200 bg-white p-3 transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-700"
    >
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold">{examLabel(prob.exam)}</div>
        <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
          <span>{prob.answered}問 解答済</span>
          {measuring && prob.answersUntilSample > 0 && (
            <span className="text-zinc-600 dark:text-zinc-300">
              あと{prob.answersUntilSample}問で計測開始
            </span>
          )}
          {!measuring && prob.questionsToPassZone > 0 && (
            <span className="text-amber-600 dark:text-amber-400">
              あと{prob.questionsToPassZone}問で合格圏判定
            </span>
          )}
          {!measuring && inPassZone && (
            <span className="text-emerald-600 dark:text-emerald-400">合格圏</span>
          )}
        </div>
        <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <div
            className={`h-full transition-all ${
              measuring
                ? "bg-zinc-300 dark:bg-zinc-700"
                : prob.passProbability >= 70
                  ? "bg-emerald-500"
                  : prob.passProbability >= 40
                    ? "bg-amber-500"
                    : "bg-zinc-400"
            }`}
            style={{ width: measuring ? "0%" : `${prob.passProbability}%` }}
          />
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-1 text-right">
        <span className="text-base font-bold tabular-nums">
          {measuring ? "—" : `${prob.passProbability}%`}
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-zinc-400 transition group-hover:translate-x-0.5 group-hover:text-sky-500" />
      </div>
    </Link>
  );
}
