import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, BookOpen, ChevronLeft, Shield } from "lucide-react";

import { ViewTracker } from "@/components/analytics/ViewTracker";

import {
  ESSAY_EXAM_CODES,
  getEssayQuestionsByExam,
  isEssayExamCode,
  parseYearSeason,
} from "@/lib/essays/load";
import { examLabel } from "@/lib/utils";

import EssayIndustryTabs from "./_components/EssayIndustryTabs";

interface RouteParams {
  exam: string;
  yearSeason: string;
  section: string;
  qnum: string;
}

function resolveQuestion(params: RouteParams) {
  if (!isEssayExamCode(params.exam)) return null;
  if (params.section !== "pm2") return null;

  const parsed = parseYearSeason(params.yearSeason);
  if (!parsed) return null;

  const qNumMatch = params.qnum.match(/^q(\d+)$/);
  if (!qNumMatch) return null;
  const qNumber = parseInt(qNumMatch[1], 10);

  const question = getEssayQuestionsByExam(params.exam).find(
    (q) =>
      q.year === parsed.year &&
      q.season === parsed.season &&
      q.qNumber === qNumber
  );
  return question ?? null;
}

export function generateStaticParams(): RouteParams[] {
  const out: RouteParams[] = [];
  for (const exam of ESSAY_EXAM_CODES) {
    for (const q of getEssayQuestionsByExam(exam)) {
      out.push({
        exam,
        yearSeason: `${q.year}-${q.season}`,
        section: "pm2",
        qnum: `q${q.qNumber}`,
      });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const resolved = await params;
  const question = resolveQuestion(resolved);
  if (!question) {
    return { title: "ページが見つかりません", robots: { index: false } };
  }
  const seasonLabel = question.season === "spring" ? "春" : "秋";
  const canonical = `/essays/${resolved.exam}/${resolved.yearSeason}/${resolved.section}/${resolved.qnum}`;
  const title = `${question.theme} | ${examLabel(resolved.exam)} 午後II 業種別合格答案 ${question.year}年${seasonLabel}期`;
  const description = `${examLabel(resolved.exam)} ${question.year}年${seasonLabel}期 午後II 問${question.qNumber}「${question.theme}」の業種別合格答案サンプル。業種別の論述例（序論・本論・結論）を掲載。AI 生成の参考例（査読推奨）。`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function EssayPm2DetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const resolved = await params;
  const question = resolveQuestion(resolved);
  if (!question) notFound();

  const seasonLabel = question.season === "spring" ? "春" : "秋";

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-6 sm:px-6">
      <ViewTracker
        event="essay_viewed"
        props={{
          exam: resolved.exam,
          year: question.year,
          season: question.season,
          q_number: question.qNumber,
        }}
      />
      <Link
        href={`/essays/${resolved.exam}`}
        className="mb-4 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <ChevronLeft className="h-3 w-3" />
        {examLabel(resolved.exam)} 業種別合格答案
      </Link>

      <header className="mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-semibold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
            <Shield className="h-3 w-3" />
            {examLabel(resolved.exam)} 午後 II 問{question.qNumber}
          </span>
          <span className="text-xs text-zinc-500">
            {question.year}年{seasonLabel}期
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {question.theme}
        </h1>
      </header>

      <div
        role="note"
        className="mb-6 flex items-start gap-2 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100"
      >
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
        <p>
          <strong>本答案は AI 生成の参考例です。</strong>
          IPA 公式の合格答案ではなく、合格を保証するものではありません。
          論述の骨格・業種事例の参考としてご活用ください。
        </p>
      </div>

      <section className="mb-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
        <h2 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          <BookOpen className="h-3.5 w-3.5" />
          問題概要
        </h2>
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {question.context.split("\n")[0]}
        </p>
        <details className="mt-2">
          <summary className="cursor-pointer text-xs text-sky-600 hover:underline dark:text-sky-400">
            全文を表示
          </summary>
          <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {question.context}
          </div>
        </details>
      </section>

      <EssayIndustryTabs
        industries={question.industries}
        pdfUrl={question.pdfUrl}
      />

      <div className="mt-8 rounded-2xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-card to-card p-5 dark:border-violet-900/40 dark:from-violet-950/40">
        <h2 className="mb-2 text-base font-bold">自分の答案を AI で採点してみる</h2>
        <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
          上記の答案例を参考に論述を書いたら、AI 添削で「適合度・論理性・具体性・業種事例」の4軸でフィードバックを受けましょう。
        </p>
        <Link
          href="/essay"
          className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600"
        >
          AI 論述添削を試す →
        </Link>
      </div>
    </main>
  );
}
