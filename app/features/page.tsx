import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { FEATURE_LANDING_PAGES } from "@/data/features";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";

const FEATURES_TITLE = "機能特集 — AIコパイロット・午後採点・模試モード";
const FEATURES_DESCRIPTION =
  "AI コパイロットによる選択肢別解説、業種別の論述合格答案サンプル、AI 午後採点（β）、本番形式の模試モード、学習計画自動生成など、IPA 過去問学習を一段引き上げる過去問AI 独自機能をまとめた特集ページ。各機能の使い方と狙いをページ別に詳しく紹介します。";

// Page-specific OG card. The /api/og route reserves a "feature" type style for
// this page; without an explicit images entry the openGraph override would drop
// the site-wide default image, leaving this page with no social/SERP card.
const FEATURES_OG_URL = `${SITE_BASE_URL}/api/og?${new URLSearchParams({
  type: "feature",
  title: "機能特集",
  body: "AIコパイロット・午後採点・模試・学習計画など独自機能を一望。",
}).toString()}`;

export const metadata: Metadata = {
  title: FEATURES_TITLE,
  description: FEATURES_DESCRIPTION,
  alternates: { canonical: "/features" },
  openGraph: {
    title: FEATURES_TITLE,
    description: FEATURES_DESCRIPTION,
    url: "/features",
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
    images: [{ url: FEATURES_OG_URL, width: 1200, height: 630, alt: FEATURES_TITLE }],
  },
};

export default function FeaturesIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "機能特集",
        url: `${SITE_BASE_URL}/features`,
        inLanguage: "ja",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          { "@type": "ListItem", position: 2, name: "機能特集", item: `${SITE_BASE_URL}/features` },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <JsonLd data={jsonLd} />

      <nav aria-label="パンくずリスト" className="mb-4 text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="inline-block py-1.5 hover:text-foreground hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            機能特集
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <Badge variant="soft" className="mb-3">
          <Sparkles className="h-3 w-3" />
          差別化機能
        </Badge>
        <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          過去問AI の差別化機能
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          競合サービスにはない、AI ネイティブな学習体験を 3 つの機能で実現しています。
        </p>
      </header>

      <ul className="space-y-3">
        {FEATURE_LANDING_PAGES.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/features/${p.slug}`}
              className="group block rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <Badge variant="primary" className="mb-2 text-[10px]">
                {p.hero.badge}
              </Badge>
              <h2 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary">
                {p.hero.headline}
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {p.hero.subhead}
              </p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary">
                詳細を見る
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
