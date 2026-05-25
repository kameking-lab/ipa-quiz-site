import * as React from "react";
import type { Metadata } from "next";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { SessionSummaryGate } from "@/components/motivation/SessionSummaryGate";
import { SiteLogo } from "@/components/SiteLogo";
import { HomeExamGrid } from "@/components/home/HomeExamGrid";
import { HomeQuickTrialCta } from "@/components/home/HomeQuickTrialCta";
import { HomeTopicGrid } from "@/components/home/HomeTopicGrid";
import {
  HomeReturningHeader,
  type RecommendationItem,
} from "@/components/home/HomeReturningHeader";
import { LearningCalendar } from "@/components/home/LearningCalendar";
import { HomeAuxSection } from "@/components/home/HomeAuxSection";
import { ContinueFromLast } from "@/components/ContinueFromLast";
import { TotalAnswerCounter } from "@/components/home/TotalAnswerCounter";
import { HeroAiDemo } from "@/components/home/HeroAiDemo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { SITE_ID, buildOrgNode } from "@/lib/seo/structured-data";
import { examLabel } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";

// Round the live count down to the nearest 1,000 so SERP/social copy can say
// "X,000問超" without ever overstating. Drives a single source of truth for
// the home title/description, WebSite JSON-LD description, and ItemList counts.
const APPROX_QUESTION_COUNT = Math.floor(ALL_QUESTIONS.length / 1000) * 1000;
const APPROX_QUESTION_COUNT_LABEL = APPROX_QUESTION_COUNT.toLocaleString("ja-JP");

const HOME_TITLE = "IPA過去問×AI、無料で全機能 — 過去問AI";
const HOME_DESCRIPTION = `IPA 情報処理技術者試験 全 13 区分（IP/SG/FE/AP/SC/NW/DB/ES/ST/SA/PM/SM/AU）の過去問 ${APPROX_QUESTION_COUNT_LABEL}問超を AI コパイロット付きで学べる完全無料サイト。登録不要・広告控えめ・モバイル片手操作対応。年度別・分野別・模試・苦手復習の6モードで効率学習。`;

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: { canonical: "/" },
  // Override the root-layout openGraph/twitter so social shares of the
  // landing page get the same keyword-rich title/description users see in
  // SERPs, not the generic site-wide fallback.
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: "/",
  },
  twitter: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export default function HomePage() {
  const questionCounts = Object.fromEntries(
    (Object.entries(QUESTIONS_BY_EXAM) as Array<[ExamCode, typeof ALL_QUESTIONS]>).map(
      ([code, qs]) => [code, qs?.length ?? 0],
    ),
  ) as Partial<Record<ExamCode, number>>;

  const totalQuestions = ALL_QUESTIONS.length;

  const availableExamEntries = (
    Object.entries(questionCounts) as Array<[ExamCode, number]>
  )
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a);

  // Stable pool for the returning-user 'today's picks' carousel. The
  // client component picks 5 per calendar date from this server-prepared
  // list so we do not ship the full ALL_QUESTIONS payload to the bundle.
  const recommendationPool: RecommendationItem[] = ALL_QUESTIONS
    .filter((q) => !q.needsReview && q.choices && q.year >= 2020)
    .slice(0, 200)
    .map((q) => ({
      id: q.id,
      exam: q.exam,
      year: q.year,
      season: q.season,
      session: q.session,
      qNumber: q.qNumber,
      category: q.category,
    }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": SITE_ID,
        url: SITE_BASE_URL,
        name: SITE_NAME,
        inLanguage: "ja-JP",
        description: `IPA 情報処理技術者試験 13 区分・${APPROX_QUESTION_COUNT_LABEL} 問超を AI コパイロット付きで学習できる無料の過去問サイト。`,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_BASE_URL}/quiz?mode=random&exam={exam_code}`,
          },
          "query-input": "required name=exam_code",
        },
      },
      {
        ...buildOrgNode(),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "IPA 試験対策コース一覧",
          url: SITE_BASE_URL,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_BASE_URL}/#exam-list`,
        name: "IPA 情報処理技術者試験 区分一覧",
        numberOfItems: availableExamEntries.length,
        itemListElement: availableExamEntries.map(([code, count], idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          url: `${SITE_BASE_URL}/${code}`,
          name: `${examLabel(code)}（${count.toLocaleString("ja-JP")}問）`,
        })),
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

      <HomeReturningHeader recommendationPool={recommendationPool} />

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
        <HeroAiDemo />
        <TotalAnswerCounter />
        <HomeQuickTrialCta />
        <HomeExamGrid questionCounts={questionCounts} />
      </section>

      <HomeTopicGrid />

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
