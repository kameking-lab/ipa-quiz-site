import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ChevronLeft } from "lucide-react";

import {
  findEssayQuestion,
  getAllEssayQuestions,
  ESSAY_EXAM_CODES,
} from "@/lib/essay/load";
import type { EssayExamCode } from "@/lib/essay/load";
import { examLabel, formatYearSeason } from "@/lib/utils";
import { EssayEditor } from "@/components/essay/EssayEditor";
import { InlineBookHint } from "@/components/quiz/InlineBookHint";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { ORG_ID, SITE_LOGO_IMAGE, STUDENT_AUDIENCE } from "@/lib/seo/structured-data";

interface RouteParams {
  exam: string;
  questionId: string;
}

// Prerender only the real essay questions and 404 everything else. Without this
// the route is fully dynamic, so an invalid /essay/{exam}/{id} (stale/external
// link) renders notFound() as a SOFT-404 (HTTP 200) instead of a clean 404 —
// wasted crawl budget. Mirrors the proven /blog/[slug] pattern in this repo.
export function generateStaticParams(): RouteParams[] {
  return getAllEssayQuestions().map((q) => ({
    exam: q.exam,
    questionId: q.id,
  }));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { questionId } = await params;
  const q = findEssayQuestion(questionId);
  if (!q) return { title: "論述問題が見つかりません", robots: { index: false } };
  const title = `${examLabel(q.exam)} ${formatYearSeason(q.year, q.season)} 問${q.qNumber} | AI 論述添削`;
  const description = `${q.title} — IPA 元採点者プロンプトで AI が論述を採点します。`;
  const canonical = `/essay/${q.exam}/${q.id}`;
  const ogImage = `${SITE_BASE_URL}/api/og?${new URLSearchParams({
    type: "essay",
    title: `${examLabel(q.exam)} 午後II 問${q.qNumber}`,
    body: q.title,
  }).toString()}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      siteName: SITE_NAME,
      locale: "ja_JP",
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
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

  const url = `${SITE_BASE_URL}/essay/${question.exam}/${question.id}`;
  const label = examLabel(question.exam);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LearningResource",
        "@id": `${url}#learning-resource`,
        name: `${label} 午後II 論述 ${formatYearSeason(question.year, question.season)} 問${question.qNumber} ── ${question.title}`,
        url,
        inLanguage: "ja",
        description: `${question.title} — IPA 元採点者プロンプトで AI が論述を採点（参考評価）。`,
        learningResourceType: "AI 採点・添削",
        educationalLevel: "Professional",
        educationalUse: "Self-assessment",
        audience: STUDENT_AUDIENCE,
        teaches: `${label} の午後II論述対策`,
        isBasedOn: question.pdfUrl,
        publisher: {
          "@type": "Organization",
          "@id": ORG_ID,
          name: SITE_NAME,
          url: SITE_BASE_URL,
          logo: SITE_LOGO_IMAGE,
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "AI 論述添削（午後II）",
            item: `${SITE_BASE_URL}/essay`,
          },
          { "@type": "ListItem", position: 3, name: question.title, item: url },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-6 sm:px-6">
      <JsonLd data={jsonLd} />
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

      <InlineBookHint exam={question.exam} category="論文" />

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
