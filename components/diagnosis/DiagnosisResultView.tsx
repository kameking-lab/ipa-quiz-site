"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Share2, RotateCcw, Sparkles, Trophy, Clock, Target } from "lucide-react";
import { examLabel } from "@/lib/utils";
import type { DiagnosisAnswers, DiagnosisResult } from "@/lib/diagnosis/engine";

const PLAN_COPY = {
  free: {
    label: "FREEプランで十分",
    desc: "全試験・全問題が無料で開放されています。AIコパイロットも1日30回まで使えます。",
  },
  premium: {
    label: "PREMIUMプラン推奨",
    desc: "AIコパイロット無制限・上位モデル切替・広告なし。月300円で長期戦に最適です。",
  },
} as const;

export function DiagnosisResultView({
  result,
  answers,
  onRetake,
}: {
  result: DiagnosisResult;
  answers: DiagnosisAnswers;
  onRetake: () => void;
}) {
  void answers;
  const startHref = `/quiz?mode=random&exam=${result.primary}`;

  const shareText = `IPA Quiz の試験診断であなたのおすすめ試験は「${examLabel(
    result.primary,
  )}」でした！想定学習期間 ${result.studyWeeks.min}〜${result.studyWeeks.max}週間。\n#IPA過去問 #IPAQuiz`;
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/diagnosis`
      : "https://ipa-quiz-site.vercel.app/diagnosis";
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText,
  )}&url=${encodeURIComponent(shareUrl)}`;
  const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
    shareUrl,
  )}&text=${encodeURIComponent(shareText)}`;

  const plan = PLAN_COPY[result.recommendedPlan];

  return (
    <main className="mx-auto w-full max-w-2xl px-4 py-10">
      <div className="mb-2 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
        <Sparkles className="h-3 w-3" /> 診断結果
      </div>
      <h1 className="mb-1 text-center text-3xl font-bold tracking-tight">
        あなたにおすすめの試験は
      </h1>
      <div className="mb-2 text-center">
        <span className="inline-block rounded-2xl bg-gradient-to-r from-sky-500 via-violet-500 to-fuchsia-500 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
          {examLabel(result.primary)}
        </span>
      </div>
      <p className="mb-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
        です
      </p>

      <section className="mb-6 grid grid-cols-3 gap-3">
        <KpiCard
          icon={<Trophy className="h-4 w-4" />}
          label="マッチ度"
          value={`${Math.min(99, Math.max(60, 60 + (result.scores[result.primary] ?? 0) * 2))}%`}
        />
        <KpiCard
          icon={<Clock className="h-4 w-4" />}
          label="学習期間"
          value={`${result.studyWeeks.min}〜${result.studyWeeks.max}週`}
        />
        <KpiCard
          icon={<Target className="h-4 w-4" />}
          label="プラン"
          value={result.recommendedPlan === "premium" ? "PRE" : "FREE"}
        />
      </section>

      <section className="mb-6 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          推奨理由
        </h2>
        <ol className="space-y-2.5 text-sm text-zinc-700 dark:text-zinc-200">
          {result.reasons.map((r, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                {i + 1}
              </span>
              <span className="pt-0.5 leading-relaxed">{r}</span>
            </li>
          ))}
        </ol>
      </section>

      {result.alternates.length > 0 && (
        <section className="mb-6 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            次点候補
          </h2>
          <div className="flex flex-wrap gap-2">
            {result.alternates.map((code) => (
              <Link
                key={code}
                href={`/quiz?mode=random&exam=${code}`}
                className="rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-700 hover:border-sky-400 hover:bg-sky-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-sky-600 dark:hover:bg-sky-950/40"
              >
                {examLabel(code)}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mb-8 rounded-2xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-900 dark:bg-sky-950/40">
        <h2 className="mb-1 text-sm font-semibold text-sky-800 dark:text-sky-200">
          {plan.label}
        </h2>
        <p className="text-sm leading-relaxed text-sky-900 dark:text-sky-100">
          {plan.desc}
        </p>
      </section>

      <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Link
          href={startHref}
          className="flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-5 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-sky-700"
        >
          この試験で始める <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/quiz/stream"
          className="flex items-center justify-center gap-2 rounded-2xl border border-zinc-300 bg-white px-5 py-4 text-base font-semibold text-zinc-900 transition hover:-translate-y-0.5 hover:shadow dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
        >
          ストリームで体験
        </Link>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-3">
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          <Share2 className="h-4 w-4" /> Xでシェア
        </a>
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-600"
        >
          <Share2 className="h-4 w-4" /> LINEでシェア
        </a>
      </div>

      <button
        onClick={onRetake}
        className="mx-auto mt-2 flex items-center gap-2 text-xs text-zinc-500 underline-offset-4 hover:underline dark:text-zinc-400"
      >
        <RotateCcw className="h-3 w-3" /> 診断をやり直す
      </button>
    </main>
  );
}

function KpiCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-3 text-center dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mb-1 flex items-center justify-center gap-1 text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {icon}
        {label}
      </div>
      <div className="text-base font-bold sm:text-lg">{value}</div>
    </div>
  );
}
