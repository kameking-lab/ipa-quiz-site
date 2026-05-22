import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { FEATURE_LANDING_PAGES } from "@/data/features";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";

export const metadata: Metadata = {
  title: "機能特集",
  description:
    "AI 解説・業種別論述事例・AI 論述添削など、過去問AI の差別化機能をまとめた特集ページ。",
  alternates: { canonical: "/features" },
  openGraph: {
    title: "機能特集 | 過去問AI",
    description:
      "AI 解説・業種別論述事例・AI 論述添削など、過去問AI の差別化機能をまとめた特集ページ。",
    url: "/features",
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
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
