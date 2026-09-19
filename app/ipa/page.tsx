import * as React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ALL_QUESTIONS } from "@/data/questions";
import { SessionSummaryGate } from "@/components/motivation/SessionSummaryGate";
import { HomeExamGrid } from "@/components/home/HomeExamGrid";
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
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL } from "@/lib/seo/config";
import { buildOrgNode, buildWebsiteNode } from "@/lib/seo/structured-data";
import { examLabel } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";
import { EXAM_QUESTION_COUNTS } from "@/lib/constants/exam-question-counts";
import { APPROX_QUESTION_COUNT_LABEL } from "@/lib/constants/question-counts";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

const HOME_TITLE = "IPA過去問×AI、無料で全機能 — 過去問AI";
// Snippet-optimised: front-load the value prop + count and drop the 13-code list
// （IP/SG/FE/…）— that list ate ~40 low-value chars of the visible SERP window and
// pushed Google toward synthesising a worse snippet from the page body. Kept
// under the ~150 full-width-char budget. (empirical review 致命傷⑦)
const HOME_DESCRIPTION = `情報処理技術者試験 全13区分の過去問を AI 解説付きで完全無料公開。ITパスポート・基本情報・応用情報から高度試験まで ${APPROX_QUESTION_COUNT_LABEL}問超を収録し、年度別・分野別・模試・苦手復習の6モードと学習履歴で効率学習。登録不要、スマホ片手で。`;

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: "/ipa",
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
    url: "/ipa",
  },
  twitter: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
};

export default function IpaPage() {
  const questionCounts = EXAM_QUESTION_COUNTS;

  const availableExamEntries = (
    Object.entries(questionCounts) as Array<[ExamCode, number]>
  )
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a);

  // Stable pool for the returning-user 'today's picks' carousel. The
  // client component picks 5 per calendar date from this server-prepared
  // list so we do not ship the full ALL_QUESTIONS payload to the bundle.
  const recommendationPool: RecommendationItem[] = ALL_QUESTIONS
    .filter((q) => isPracticeReadyQuestion(q) && q.choices && q.year >= 2020)
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
        `IPA 情報処理技術者試験 13 区分・${APPROX_QUESTION_COUNT_LABEL} 問超を AI コパイロット付きで学習できる無料の過去問サイト。`,
      ),
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

      <Link href="/" className="mb-4 inline-flex min-h-11 items-center text-sm text-muted-foreground hover:underline">← IPA・安全を選び直す</Link>
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">IPAの過去問</h1>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">資格を選んで、今すぐ解く。年度別・分野別からも問題を選べます。</p>
      </header>
      <section aria-labelledby="ipa-exam-select" className="mb-8">
        <h2 id="ipa-exam-select" className="mb-3 text-lg font-semibold">資格を選ぶ</h2>
        <HomeExamGrid questionCounts={questionCounts} />
      </section>
      <HomeReturningHeader recommendationPool={recommendationPool} />
      <TotalAnswerCounter />

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
