import * as React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getAvailableYears, getAvailableCategories } from "@/lib/questions/load";
import { getAfternoonQuestions } from "@/lib/afternoon/load";
import { Badge } from "@/components/ui/badge";
import { HistoryStats } from "@/components/HistoryStats";
import { StreakProfileCard } from "@/lib/streak/StreakProfileCard";
import { SessionSummaryGate } from "@/components/motivation/SessionSummaryGate";
import { HomeExamPicker } from "@/components/HomeExamPicker";
import { SiteLogo } from "@/components/SiteLogo";
import { ShareButtons } from "@/components/ShareButtons";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { CharacterGreeting } from "@/components/character/CharacterGreeting";
import { ReviewReminder } from "@/components/ReviewReminder";
import { ContinueFromHistory, PlayNowCard } from "@/components/ContinueFromHistory";
import type { ExamCode } from "@/lib/questions/types";

export const metadata: Metadata = {
  title: "IPA過去問×AI、無料で全機能 — 過去問AI",
  description:
    "IPA 情報処理技術者試験 全 13 区分・12,000問超を AI コパイロット付きで学べる無料サイト。登録不要・モバイル最適化。",
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
          IPA過去問×AI、
          <br />
          <span className="text-sky-600 dark:text-sky-400">無料で全機能</span>
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          全 13 試験区分・{total.toLocaleString("ja-JP")}問の過去問に AI コパイロットつき。
          登録不要、片手で快適に学べます。
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <Badge variant="success">全機能無料</Badge>
          <Badge variant="success">全13区分 {total.toLocaleString("ja-JP")}問収録</Badge>
          <Badge variant="outline">AI コパイロット</Badge>
          <Badge variant="outline">ゼロ遷移 UI</Badge>
        </div>

        <div className="mt-5">
          <Link
            href="/quiz?mode=random&exam=ap"
            className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-sky-700 hover:shadow-md"
          >
            いますぐ解く
          </Link>
        </div>
      </section>

      <CharacterGreeting />

      <ReviewReminder />

      <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <PlayNowCard />
        <ContinueFromHistory />
      </div>

      <div className="mb-3 mt-6">
        <StreakProfileCard />
      </div>

      <HistoryStats />

      <HomeExamPicker
        questionCounts={questionCounts}
        yearsByExam={yearsByExam}
        categoriesByExam={categoriesByExam}
        afternoonCounts={afternoonCounts}
      />

      <section
        aria-labelledby="recommended-books-banner"
        className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/60 p-5 dark:border-amber-900/60 dark:bg-amber-950/20"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3
              id="recommended-books-banner"
              className="mb-1 text-sm font-semibold text-amber-800 dark:text-amber-200"
            >
              試験別のおすすめ問題集をAIが厳選
            </h3>
            <p className="text-xs leading-relaxed text-amber-900/80 dark:text-amber-100/80">
              13区分すべての定番テキスト・問題集を、入門〜上級まで段階別にまとめました。
              書籍と過去問AIの組み合わせで合格まで最短ルートに。
            </p>
          </div>
          <Link
            href="/recommended-books"
            className="inline-flex shrink-0 items-center justify-center gap-1 rounded-lg bg-amber-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-amber-700 dark:bg-amber-700 dark:hover:bg-amber-600"
          >
            おすすめ問題集を見る →
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 dark:border-emerald-900/60 dark:bg-emerald-950/20">
        <h3 className="mb-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
          このプロジェクトをシェアして応援する
        </h3>
        <p className="mb-3 text-xs text-zinc-600 dark:text-zinc-400">
          全機能無料で運営しています。シェアが何よりの応援です。
        </p>
        <ShareButtons
          url="https://ipa-quiz-site.vercel.app/"
          text="IPA 試験対策が全機能無料で使える「過去問 AI」"
          hashtags={["過去問AI", "IPA試験", "応用情報"]}
          compact
        />
      </section>
    </main>
  );
}
