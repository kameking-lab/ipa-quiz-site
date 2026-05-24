import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { SuccessStoriesFilterableList } from "@/components/success-stories/SuccessStoriesFilterableList";
import {
  getAllSuccessStorySummaries,
  getSuccessStoryCountByExam,
} from "@/data/success-stories";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { examLabel } from "@/lib/utils";

const OG_IMAGE = `${SITE_BASE_URL}/api/og?${new URLSearchParams({
  type: "blog",
  title: "IPA試験 合格体験記",
  subtitle: "13区分の合格者ストーリー",
  body: "IPA情報処理技術者試験13区分の合格者リアル体験記。勉強法・つまずき・突破方法を実名職種別に紹介。",
}).toString()}`;

export const metadata: Metadata = {
  title: "IPA試験 合格体験記｜13区分の合格者ストーリー集",
  description:
    "IPA情報処理技術者試験13区分の合格者リアル体験記。営業・事務・エンジニア・主婦・学生など多様な職種・年齢の合格までの勉強法・つまずき・突破方法を生々しく紹介。",
  alternates: { canonical: "/success-stories" },
  openGraph: {
    title: "IPA試験 合格体験記 | 過去問AI",
    description:
      "13区分の合格者リアル体験記。職種・年齢・学習期間別に勉強法と突破方法を紹介。",
    url: `${SITE_BASE_URL}/success-stories`,
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "IPA試験 合格体験記" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IPA試験 合格体験記 | 過去問AI",
    description: "13区分の合格者リアル体験記。職種・年齢別の勉強法と突破方法。",
    images: [OG_IMAGE],
  },
};

const EXAM_ORDER = [
  "ip",
  "sg",
  "fe",
  "ap",
  "st",
  "sa",
  "pm",
  "nw",
  "db",
  "es",
  "sc",
  "sm",
  "au",
] as const;

export default function SuccessStoriesIndexPage() {
  const stories = getAllSuccessStorySummaries();
  const counts = getSuccessStoryCountByExam();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_BASE_URL}/success-stories#collection`,
        name: "IPA試験 合格体験記",
        description:
          "IPA情報処理技術者試験13区分の合格者リアル体験記コレクション。各記事はAI生成の架空ペルソナによる学習ガイドです。",
        url: `${SITE_BASE_URL}/success-stories`,
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_BASE_URL,
        },
        additionalProperty: {
          "@type": "PropertyValue",
          name: "contentGenerationMethod",
          value: "AI-generated fictional personas based on typical exam candidate patterns. Not based on real individuals.",
        },
        hasPart: stories.slice(0, 20).map((s) => ({
          "@type": "Article",
          headline: s.title,
          description: s.description,
          url: `${SITE_BASE_URL}/success-stories/${s.exam}/${s.slug}`,
          datePublished: s.publishedAt,
          dateModified: s.updatedAt ?? s.publishedAt,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "合格体験記",
            item: `${SITE_BASE_URL}/success-stories`,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-6 sm:py-10">
      <JsonLd data={jsonLd} />
      <nav
        aria-label="パンくずリスト"
        className="mb-4 text-xs text-zinc-500 dark:text-zinc-400"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-zinc-700 dark:text-zinc-300">
            合格体験記
          </li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          IPA試験 合格体験記
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
          IPA 情報処理技術者試験 13 区分の合格者リアル体験記コレクション。
          営業・事務・エンジニア・主婦・学生など多様な職種・年齢の合格までの勉強法・つまずき・突破方法を生々しく紹介します。
          現在 <strong>{stories.length} 本</strong> 公開中。
        </p>
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
          ※ 本記事群は実在モデルへの取材ではなく、過去問AI が学習者の典型像をもとに構成した合格者ペルソナです。学習法・スケジュールは実証されたパターンに基づきます。
        </p>
      </header>

      <section className="mb-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
        <h2 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
          試験区分から探す
        </h2>
        <div className="flex flex-wrap gap-2">
          {EXAM_ORDER.map((e) => {
            const c = counts.get(e) ?? 0;
            if (c === 0) return null;
            return (
              <Link
                key={e}
                href={`/success-stories/${e}`}
                className="rounded-full border border-sky-300 bg-white px-3 py-1 text-xs font-medium text-sky-700 hover:bg-sky-100 dark:border-sky-700 dark:bg-zinc-900 dark:text-sky-300 dark:hover:bg-sky-900/40"
              >
                {examLabel(e)}
                <span className="ml-1 text-zinc-500 dark:text-zinc-400">{c}本</span>
              </Link>
            );
          })}
        </div>
      </section>

      <SuccessStoriesFilterableList stories={stories} examOrder={EXAM_ORDER} />

      <section className="mt-12 rounded-2xl border border-sky-200 bg-sky-50/60 p-5 text-sm text-zinc-700 dark:border-sky-800 dark:bg-sky-950/30 dark:text-zinc-300">
        <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          自分も合格体験を作る
        </h2>
        <p className="leading-relaxed">
          体験記を読み終わったら、自分の挑戦を始めましょう。過去問AI は 13 区分・12,000 問超を AI コパイロット付きで学習できます。
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <Link
            href="/"
            className="inline-block rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          >
            試験区分を選ぶ →
          </Link>
          <Link
            href="/blog"
            className="inline-block rounded-full border border-sky-300 bg-white px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50 dark:border-sky-800 dark:bg-zinc-950 dark:text-sky-300 dark:hover:bg-sky-950/40"
          >
            学習ガイドブログを読む
          </Link>
        </div>
      </section>
    </main>
  );
}
