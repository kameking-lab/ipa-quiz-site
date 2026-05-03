import * as React from "react";
import type { Metadata } from "next";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { SessionSummaryGate } from "@/components/motivation/SessionSummaryGate";
import { SiteLogo } from "@/components/SiteLogo";
import { HomeExamGrid } from "@/components/home/HomeExamGrid";
import { LearningCalendar } from "@/components/home/LearningCalendar";
import { HomeAuxSection } from "@/components/home/HomeAuxSection";
import { ContinueFromLast } from "@/components/ContinueFromLast";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import type { ExamCode } from "@/lib/questions/types";

export const metadata: Metadata = {
  title: "IPA過去問×AI、無料で全機能 — 過去問AI",
  description:
    "IPA 情報処理技術者試験 全 13 区分・12,000問超を AI コパイロット付きで学べる無料サイト。登録不要・モバイル最適化。",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const questionCounts = Object.fromEntries(
    (Object.entries(QUESTIONS_BY_EXAM) as Array<[ExamCode, typeof ALL_QUESTIONS]>).map(
      ([code, qs]) => [code, qs?.length ?? 0],
    ),
  ) as Partial<Record<ExamCode, number>>;

  const totalQuestions = ALL_QUESTIONS.length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_BASE_URL}/#website`,
        url: SITE_BASE_URL,
        name: SITE_NAME,
        inLanguage: "ja-JP",
        description:
          "IPA 情報処理技術者試験 13 区分・12,000 問超を AI コパイロット付きで学習できる無料の過去問サイト。",
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_BASE_URL}/quiz?mode=random&exam={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_BASE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_BASE_URL,
        logo: `${SITE_BASE_URL}/icon-512.svg`,
        sameAs: ["https://x.com/kakomon_ai_jp", "https://note.com/kakomon_ai"],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-10 pt-6 sm:px-6 sm:pt-8">
      <JsonLd data={jsonLd} />
      <React.Suspense fallback={null}>
        <SessionSummaryGate />
      </React.Suspense>

      <div className="mb-6">
        <SiteLogo />
      </div>

      <section aria-labelledby="exam-picker-heading" className="mb-6">
        <h1
          id="exam-picker-heading"
          className="mb-3 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
        >
          どの試験を受けますか?
        </h1>
        <ul
          aria-label="サービスの特徴"
          className="mb-3 flex flex-wrap gap-x-3 gap-y-1.5 text-xs sm:text-sm"
        >
          <li className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            <span aria-hidden="true">✓</span>全機能無料
          </li>
          <li className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            <span aria-hidden="true">✓</span>会員登録不要
          </li>
          <li className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 font-medium text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
            <span aria-hidden="true">✓</span>13区分 {totalQuestions.toLocaleString("ja-JP")}問
          </li>
        </ul>
        <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          IPA試験対策の過去問をAI解説付きで完全無料公開。ボランティア有志による教育貢献プロジェクトです。
        </p>
        <HomeExamGrid questionCounts={questionCounts} />
      </section>

      <section className="mb-6" aria-label="続きから">
        <ContinueFromLast />
      </section>

      <section className="mb-6">
        <LearningCalendar />
      </section>

      <HomeAuxSection />
    </main>
  );
}
