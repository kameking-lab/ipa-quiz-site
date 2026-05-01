import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ChevronLeft } from "lucide-react";

import { findEssayQuestion, ESSAY_EXAM_CODES } from "@/lib/essay/load";
import type { EssayExamCode } from "@/lib/essay/load";
import { examLabel, formatYearSeason } from "@/lib/utils";
import { EssayEditor } from "@/components/essay/EssayEditor";

interface RouteParams {
  exam: string;
  questionId: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { questionId } = await params;
  const q = findEssayQuestion(questionId);
  if (!q) return { title: "論述問題が見つかりません", robots: { index: false } };
  return {
    title: `${examLabel(q.exam)} ${formatYearSeason(q.year, q.season)} 問${q.qNumber} | AI 論述添削`,
    description: `${q.title} — IPA 元採点者プロンプトで AI が論述を採点します。`,
    alternates: { canonical: `/essay/${q.exam}/${q.id}` },
  };
}

export default async function EssayEditorPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { exam, questionId } = await params;
  if (!ESSAY_EXAM_CODES.includes(exam as EssayExamCode)) notFound();

  const question = findEssayQuestion(questionId);
  if (!question || question.exam !== exam) notFound();

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-6 sm:px-6">
      <Link
        href="/essay"
        className="mb-4 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <ChevronLeft className="h-3 w-3" /> AI 論述添削トップ
      </Link>

      <header className="mb-6">
        <p className="mb-2 text-xs font-medium tracking-wide text-sky-600 dark:text-sky-400">
          {examLabel(question.exam)} 午後II ──{" "}
          {formatYearSeason(question.year, question.season)} 問{question.qNumber}
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {question.title}
        </h1>
      </header>

      <div
        role="note"
        className="mb-6 flex items-start gap-2 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100"
      >
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
        <p>
          <strong>本機能は AI（Gemini Flash-Lite）による参考評価です。</strong>
          IPA 公式の採点基準とは異なる場合があります。合否判定の根拠としてはご利用にならず、
          学習の参考としてご活用ください。
        </p>
      </div>

      <section className="mb-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm leading-relaxed text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          問題本文
        </h2>
        <div className="whitespace-pre-wrap">{question.context}</div>
      </section>

      <EssayEditor question={question} />

      <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
        出典:{" "}
        <a
          href={question.pdfUrl}
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-zinc-900 dark:hover:text-zinc-100"
        >
          IPA 情報処理技術者試験 公式
        </a>
      </p>
    </main>
  );
}
