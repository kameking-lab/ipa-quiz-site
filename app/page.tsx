import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getAvailableYears, getAvailableCategories } from "@/lib/questions/load";
import { getAfternoonQuestions } from "@/lib/afternoon/load";
import { Badge } from "@/components/ui/badge";
import { HistoryStats } from "@/components/HistoryStats";
import { StreakProfileCard } from "@/lib/streak/StreakProfileCard";
import { LearningHeatmap } from "@/components/motivation/LearningHeatmap";
import { SessionSummaryGate } from "@/components/motivation/SessionSummaryGate";
import { BadgeStrip } from "@/components/motivation/BadgeStrip";
import { StreakCouponCard } from "@/components/motivation/StreakCouponCard";
import { HomeExamPicker } from "@/components/HomeExamPicker";
import { HeroDemoAnimation } from "@/components/HeroDemoAnimation";
import { SiteLogo } from "@/components/SiteLogo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import type { ExamCode } from "@/lib/questions/types";

export const metadata: Metadata = {
  title: "過去問AI — AIネイティブ過去問学習",
  description:
    "IPA 情報処理技術者試験 IP/SG/FE/AP/高度区分の 13 試験・12,000問超をゼロ遷移UIとAIコパイロットで高速学習。ランダム・年度別・分野別・復習モード対応。α公開中・全機能無料。",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const total = ALL_QUESTIONS.length;

  const questionCounts = Object.fromEntries(
    (Object.entries(QUESTIONS_BY_EXAM) as Array<[ExamCode, typeof ALL_QUESTIONS]>).map(
      ([code, qs]) => [code, qs?.length ?? 0],
    ),
  ) as Partial<Record<ExamCode, number>>;

  const yearsByExam = Object.fromEntries(
    (Object.entries(QUESTIONS_BY_EXAM) as Array<[ExamCode, typeof ALL_QUESTIONS]>)
      .filter(([, qs]) => (qs?.length ?? 0) > 0)
      .map(([code]) => [code, getAvailableYears(code)]),
  ) as Partial<Record<ExamCode, number[]>>;

  const categoriesByExam = Object.fromEntries(
    (Object.entries(QUESTIONS_BY_EXAM) as Array<[ExamCode, typeof ALL_QUESTIONS]>)
      .filter(([, qs]) => (qs?.length ?? 0) > 0)
      .map(([code]) => [code, getAvailableCategories(code)]),
  ) as Partial<Record<ExamCode, string[]>>;

  const AFTERNOON_EXAMS: ExamCode[] = [
    "ap",
    "st",
    "fe",
    "db",
    "nw",
    "sc",
    "es",
    "pm",
    "sa",
    "au",
    "sm",
  ];
  const afternoonCounts = Object.fromEntries(
    AFTERNOON_EXAMS.map((code) => [code, getAfternoonQuestions(code).length]),
  ) as Partial<Record<ExamCode, number>>;

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
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-10 pt-8 sm:px-6">
      <JsonLd data={jsonLd} />
      <React.Suspense fallback={null}>
        <SessionSummaryGate />
      </React.Suspense>
      <section className="mb-8">
        <div className="mb-3">
          <SiteLogo />
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          IPA 過去問を、AI と一緒に。
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          解答・解説がゼロ遷移で表示。分からないところは AI コパイロットにその場で質問できます。
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <Badge variant="success">α公開中・全機能無料</Badge>
          <Badge variant="success">全13試験区分 合計{total.toLocaleString("ja-JP")}問収録</Badge>
          <Badge variant="outline">ゼロ遷移 UI</Badge>
          <Badge variant="outline">AI コパイロット</Badge>
          <Badge variant="outline">モバイル最適化</Badge>
        </div>
        <HeroDemoAnimation />
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-400">
          最新情報・アップデートは{" "}
          <a
            href="https://x.com/kakomon_ai_jp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
          >
            公式X (@kakomon_ai_jp)
          </a>
          {" "}と{" "}
          <a
            href="https://note.com/kakomon_ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
          >
            note
          </a>
          {" "}でお届けしています。
        </p>
      </section>

      <div className="mb-3">
        <StreakProfileCard />
      </div>

      <HistoryStats />

      <div className="mt-3">
        <LearningHeatmap days={365} />
        <div className="mt-1 text-right">
          <Link
            href="/account/heatmap"
            className="text-xs text-sky-600 hover:underline dark:text-sky-400"
          >
            詳細を見る →
          </Link>
        </div>
      </div>

      <div className="mt-3">
        <BadgeStrip />
      </div>

      <div className="mt-3">
        <StreakCouponCard variant="compact" />
      </div>

      <HomeExamPicker
        questionCounts={questionCounts}
        yearsByExam={yearsByExam}
        categoriesByExam={categoriesByExam}
        afternoonCounts={afternoonCounts}
      />

      <section aria-labelledby="premium-features" className="mt-10">
        <h2
          id="premium-features"
          className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300"
        >
          Premium 機能（β中は全ユーザー無料公開）
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Link
            href="/premium/heatmap"
            className="group block rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-violet-700"
          >
            <div className="mb-1.5 text-base font-semibold">弱点ヒートマップ</div>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              全試験区分×全分野の正答率を可視化。苦手分野を一目で特定。
            </p>
          </Link>
          <Link
            href="/premium/simulator"
            className="group block rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-violet-700"
          >
            <div className="mb-1.5 text-base font-semibold">合格判定シミュレータ</div>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              試験日と志望区分から合格確率と1日の目標問題数を算出。
            </p>
          </Link>
          <Link
            href="/premium/essay"
            className="group block rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-300 hover:shadow dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-violet-700"
          >
            <div className="mb-1.5 text-base font-semibold">AI 論述添削 (β)</div>
            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
              ST/SA/PM/SM/AU の午後II 論述を AI が観点別に採点・添削。
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}

