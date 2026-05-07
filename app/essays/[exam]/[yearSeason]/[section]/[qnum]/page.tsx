"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, AlertTriangle, BookOpen, Shield } from "lucide-react";

import { getSCpm2Questions, parseYearSeason } from "@/lib/essays/load";
import type { SCpm2Question, SCEssayAnswer, EssayIndustryId } from "@/lib/essays/types";
import { ESSAY_INDUSTRY_LABELS } from "@/lib/essays/types";
import { examLabel } from "@/lib/utils";

const INDUSTRY_ORDER: EssayIndustryId[] = [
  "it",
  "finance",
  "construction",
  "healthcare",
  "public",
];

export default function SCpm2EssayPage() {
  const params = useParams<{
    exam: string;
    yearSeason: string;
    section: string;
    qnum: string;
  }>();

  const [question, setQuestion] = useState<SCpm2Question | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<EssayIndustryId>("it");
  const [essay, setEssay] = useState<SCEssayAnswer | null>(null);

  useEffect(() => {
    const parsed = parseYearSeason(params.yearSeason);
    if (!parsed) return;

    const qNumMatch = params.qnum.match(/^q(\d+)$/);
    if (!qNumMatch) return;

    const qNumber = parseInt(qNumMatch[1], 10);
    const questions = getSCpm2Questions();
    const found = questions.find(
      (q) => q.year === parsed.year && q.season === parsed.season && q.qNumber === qNumber
    );
    if (found) {
      setQuestion(found);
      const firstIndustry = INDUSTRY_ORDER.find((id) =>
        found.industries.some((e) => e.industryId === id)
      );
      if (firstIndustry) setSelectedIndustry(firstIndustry);
    }
  }, [params.yearSeason, params.qnum]);

  useEffect(() => {
    if (!question) return;
    const found = question.industries.find((e) => e.industryId === selectedIndustry);
    setEssay(found ?? null);
  }, [question, selectedIndustry]);

  if (!question) {
    return (
      <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-8 sm:px-6">
        <p className="text-sm text-zinc-500">読み込み中…</p>
      </main>
    );
  }

  const charCount = essay
    ? (essay.intro + essay.body + essay.conclusion).replace(/\s/g, "").length
    : 0;

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-6 sm:px-6">
      <Link
        href={`/essays/${params.exam}`}
        className="mb-4 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <ChevronLeft className="h-3 w-3" />
        {examLabel(params.exam)} 業種別合格答案
      </Link>

      <header className="mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-semibold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
            <Shield className="h-3 w-3" />
            {examLabel(params.exam)} 午後 II 問{question.qNumber}
          </span>
          <span className="text-xs text-zinc-500">
            {question.year}年{question.season === "spring" ? "春" : "秋"}期
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {question.theme}
        </h1>
      </header>

      {/* 警告バナー */}
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

      {/* 問題本文 */}
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

      {/* 業種タブ */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          業種を選択してください
        </p>
        <div className="flex flex-wrap gap-2">
          {INDUSTRY_ORDER.filter((id) =>
            question.industries.some((e) => e.industryId === id)
          ).map((id) => (
            <button
              key={id}
              onClick={() => setSelectedIndustry(id)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                selectedIndustry === id
                  ? "bg-sky-600 text-white dark:bg-sky-500"
                  : "border border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              {ESSAY_INDUSTRY_LABELS[id]}
            </button>
          ))}
        </div>
      </div>

      {/* 答案本文 */}
      {essay && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-50">
              {essay.industryName}の合格答案例
            </h2>
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
              約 {charCount.toLocaleString()} 字
            </span>
          </div>

          {/* 序論 */}
          <section className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-900/40 dark:bg-emerald-950/20">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
              序論（設問ア）
            </h3>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {essay.intro}
            </p>
          </section>

          {/* 本論 */}
          <section className="rounded-2xl border border-sky-200 bg-sky-50/50 p-5 dark:border-sky-900/40 dark:bg-sky-950/20">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-400">
              本論（設問イ）
            </h3>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {essay.body}
            </p>
          </section>

          {/* 結論 */}
          <section className="rounded-2xl border border-violet-200 bg-violet-50/50 p-5 dark:border-violet-900/40 dark:bg-violet-950/20">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-400">
              結論（設問ウ）
            </h3>
            <p className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {essay.conclusion}
            </p>
          </section>

          {/* IPA出典 */}
          <p className="text-right text-xs text-zinc-400 dark:text-zinc-500">
            出題参考:{" "}
            <a
              href={question.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              IPA 情報処理技術者試験
            </a>
          </p>
        </div>
      )}

      {/* AI添削CTA */}
      <div className="mt-8 rounded-2xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-card to-card p-5 dark:border-violet-900/40 dark:from-violet-950/40">
        <h2 className="mb-2 text-base font-bold">自分の答案を AI で採点してみる</h2>
        <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
          上記の答案例を参考に論述を書いたら、AI 添削で「適合度・論理性・具体性・業種事例」の4軸でフィードバックを受けましょう。
        </p>
        <Link
          href="/essay/sc"
          className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600"
        >
          AI 論述添削を試す →
        </Link>
      </div>
    </main>
  );
}
