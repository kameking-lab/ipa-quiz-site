import type { Metadata } from "next";
import Link from "next/link";
import { Hash, Tag } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { getAllTopics, getHubTopics } from "@/lib/seo/topics";

const OG_IMAGE = (() => {
  const params = new URLSearchParams({
    type: "topic",
    title: "トピック別過去問インデックス",
    subtitle: "試験区分横断のキーワード集約",
    body: "12,000+ 問題から共通テーマを抽出した横断検索ハブ。",
  });
  return `${SITE_BASE_URL}/api/og?${params.toString()}`;
})();

export function generateMetadata(): Metadata {
  const all = getAllTopics();
  const base: Metadata = {
    title: "トピック別過去問インデックス",
    description:
      "IPA 情報処理技術者試験の過去問をトピック（キーワード）軸で横断的に学習。試験区分をまたいで同じテーマの問題を一覧できます。",
    alternates: { canonical: "/topics" },
    openGraph: {
      title: "トピック別過去問インデックス | 過去問AI",
      description:
        "IPA 情報処理技術者試験をトピック軸で横断的に学習できるインデックス。",
      url: "/topics",
      type: "website",
      siteName: SITE_NAME,
      locale: "ja_JP",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "トピック別インデックス" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "トピック別過去問インデックス | 過去問AI",
      description:
        "IPA 情報処理技術者試験をトピック軸で横断的に学習できるインデックス。",
      images: [OG_IMAGE],
    },
  };
  if (all.length === 0) {
    base.robots = { index: false, follow: false };
  }
  return base;
}

export default function TopicsIndexPage() {
  const hubs = getHubTopics(80, 4);
  const all = getAllTopics();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "トピック別過去問インデックス",
        url: `${SITE_BASE_URL}/topics`,
        inLanguage: "ja",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          { "@type": "ListItem", position: 2, name: "トピック", item: `${SITE_BASE_URL}/topics` },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_BASE_URL}#website`,
        name: SITE_NAME,
        url: SITE_BASE_URL,
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <JsonLd data={jsonLd} />

      <nav aria-label="パンくずリスト" className="mb-4 text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-foreground hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            トピック
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <Badge variant="soft" className="mb-3">
          <Hash className="h-3 w-3" />
          トピック別
        </Badge>
        <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          トピック別 過去問インデックス
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          IPA 情報処理技術者試験の過去問を、キーワード（トピック）軸で横断検索。
          試験区分をまたいで同じテーマの問題を見つけられます。
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <Badge variant="outline">{all.length} トピック</Badge>
          <Badge variant="outline">主要 {hubs.length} 件をハブ化</Badge>
        </div>
      </header>

      <section aria-label="主要トピック">
        <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-foreground">
          <Tag className="h-4 w-4 text-muted-foreground" />
          主要トピック
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {hubs.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/topics/${encodeURIComponent(t.slug)}`}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <span className="font-medium text-foreground group-hover:text-primary">
                  #{t.tag}
                </span>
                <span className="text-xs text-muted-foreground">{t.count} 問</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {all.length > hubs.length && (
        <section aria-label="その他のトピック" className="mt-10">
          <h2 className="mb-3 text-sm font-semibold text-foreground">その他のトピック</h2>
          <ul className="flex flex-wrap gap-1.5">
            {all
              .filter((t) => !hubs.includes(t))
              .slice(0, 200)
              .map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/topics/${encodeURIComponent(t.slug)}`}
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                  >
                    #{t.tag}
                    <span className="text-[10px] opacity-60">{t.count}</span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      )}
    </main>
  );
}
