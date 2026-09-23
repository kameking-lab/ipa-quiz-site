import * as React from "react";
import type { Metadata } from "next";
import { ALL_QUESTIONS } from "@/data/questions";
import { SessionSummaryGate } from "@/components/motivation/SessionSummaryGate";
import { SiteLogo } from "@/components/SiteLogo";
import { HomeExamGrid } from "@/components/home/HomeExamGrid";
import { HomeHeroLede } from "@/components/home/HomeHeroLede";
import { HomeQuickTrialCta } from "@/components/home/HomeQuickTrialCta";
import { HomeFlagshipEssay } from "@/components/home/HomeFlagshipEssay";
import { HomeFoundationKamokuB } from "@/components/home/HomeFoundationKamokuB";
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
import { SITE_BASE_URL } from "@/lib/seo/config";
import { buildOrgNode, buildWebsiteNode } from "@/lib/seo/structured-data";
import { examLabel } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";
import { EXAM_QUESTION_COUNTS } from "@/lib/constants/exam-question-counts";
import {
  APPROX_QUESTION_COUNT_LABEL,
  TOTAL_QUESTIONS_PUBLISHED,
} from "@/lib/constants/question-counts";

const HOME_TITLE = "国家資格の過去問×AI、無料で全機能 — 過去問AI";
// Snippet-optimised: front-load the value prop + count and drop the 13-code list
// （IP/SG/FE/…）— that list ate ~40 low-value chars of the visible SERP window and
// pushed Google toward synthesising a worse snippet from the page body. Kept
// under the ~150 full-width-char budget. (empirical review 致命傷⑦)
const HOME_DESCRIPTION = `IPA情報処理技術者試験13区分と、FP3級・電験三種の公式公開過去問をAI解説付きで無料提供。${APPROX_QUESTION_COUNT_LABEL}問超を年度別・分野別・模試・復習モードで学べます。登録不要、スマホ対応。`;

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "/",
    // Feed readers / browser "subscribe" tools fetch the bare domain first and
    // look for autodiscovery in <head>; /blog and /blog/[slug] already declare
    // it, but the home page defines its own alternates which REPLACES (not
    // merges) the root layout's — so the most-checked surface emitted none.
    types: { "application/rss+xml": "/feed.xml" },
  },
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
  const questionCounts = EXAM_QUESTION_COUNTS;

  // Published (answerable/indexable) total — the only count shown to users.
  const totalQuestions = TOTAL_QUESTIONS_PUBLISHED;

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
      buildWebsiteNode(
        `IPA 13区分とFP3級・電験三種の公式公開過去問、計${APPROX_QUESTION_COUNT_LABEL}問超をAIコパイロット付きで学べる無料サイト。`,
      ),
      {
        ...buildOrgNode(),
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "資格試験対策コース一覧",
          url: SITE_BASE_URL,
        },
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_BASE_URL}/#exam-list`,
        name: "資格試験 過去問一覧",
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

      <section aria-label="試験を選んで学習を始める" className="mb-6">
        <HomeHeroLede totalQuestions={totalQuestions} />
        {/* CTA sits directly under the (SSR-stable) lede so its on-screen
            position never moves. HeroAiDemo and TotalAnswerCounter render null
            during SSR and pop in only after hydration / an async fetch; placing
            them ABOVE the CTA shoved it down ~200-290px post-load, so a real
            mouse/agent click computed on the first-paint position landed on the
            shifted-in content instead of the link (empirical review F-2). They
            now mount below the CTA, where their pop-in shifts only the exam
            grid. */}
        <HomeQuickTrialCta />
        <HeroAiDemo />
        <TotalAnswerCounter />
        <HomeExamGrid questionCounts={questionCounts} />
      </section>

      <HomeFlagshipEssay />

      <HomeFoundationKamokuB />

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
