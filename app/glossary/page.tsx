import type { Metadata } from "next";
import Link from "next/link";
import { BookA } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { GLOSSARY, GLOSSARY_CATEGORY_LABELS } from "@/data/glossary";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { topicTagToSlug } from "@/lib/seo/topics";

const OG_IMAGE = (() => {
  const params = new URLSearchParams({
    type: "glossary",
    title: "IT 用語集",
    subtitle: "情報処理技術者試験 頻出用語",
    body: "30+ 用語を定義・関連トピック・出題傾向とともに整理。",
  });
  return `${SITE_BASE_URL}/api/og?${params.toString()}`;
})();

export const metadata: Metadata = {
  title: "IT 用語集 — 情報処理技術者試験で頻出のキーワード",
  description:
    "IPA 情報処理技術者試験で頻出する IT 用語を、定義・関連トピック・出題傾向と合わせて整理。学習中に分からない用語をすぐ確認できる用語集。",
  alternates: { canonical: "/glossary" },
  openGraph: {
    title: "IT 用語集 | 過去問AI",
    description:
      "情報処理技術者試験で頻出する IT 用語の定義と関連トピックを掲載した用語集。",
    url: "/glossary",
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "IT 用語集" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT 用語集 | 過去問AI",
    description:
      "情報処理技術者試験で頻出する IT 用語の定義と関連トピックを掲載した用語集。",
    images: [OG_IMAGE],
  },
};

export default function GlossaryPage() {
  const sorted = [...GLOSSARY].sort((a, b) =>
    a.reading.localeCompare(b.reading, "ja"),
  );

  const grouped = new Map<string, typeof sorted>();
  for (const t of sorted) {
    const arr = grouped.get(t.category) ?? [];
    arr.push(t);
    grouped.set(t.category, arr);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTermSet",
        "@id": `${SITE_BASE_URL}/glossary#termset`,
        name: "情報処理技術者試験 IT 用語集",
        url: `${SITE_BASE_URL}/glossary`,
        inLanguage: "ja",
        hasDefinedTerm: sorted.map((t) => ({
          "@type": "DefinedTerm",
          name: t.term,
          description: t.short,
          inDefinedTermSet: { "@id": `${SITE_BASE_URL}/glossary#termset` },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          { "@type": "ListItem", position: 2, name: "用語集", item: `${SITE_BASE_URL}/glossary` },
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
            用語集
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <Badge variant="soft" className="mb-3">
          <BookA className="h-3 w-3" />
          用語集
        </Badge>
        <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          IPA 情報処理技術者試験 用語集
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          試験で頻出する {sorted.length} の IT 用語を、定義・関連トピック・出題傾向とともに整理しました。各用語から関連トピックハブへ辿れます。
        </p>
      </header>

      <div className="space-y-10">
        {[...grouped.entries()].map(([cat, items]) => (
          <section key={cat} aria-label={GLOSSARY_CATEGORY_LABELS[cat as keyof typeof GLOSSARY_CATEGORY_LABELS]} id={`g-${cat}`}>
            <h2 className="mb-3 text-base font-bold tracking-tight text-foreground sm:text-lg">
              {GLOSSARY_CATEGORY_LABELS[cat as keyof typeof GLOSSARY_CATEGORY_LABELS]}
            </h2>
            <dl className="space-y-3">
              {items.map((t) => (
                <div
                  key={t.term}
                  id={`term-${encodeURIComponent(t.term)}`}
                  className="rounded-2xl border border-border bg-card p-4 sm:p-5"
                >
                  <dt className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                    <span className="text-base font-bold text-foreground">
                      {t.term}
                    </span>
                    {t.english && (
                      <span className="text-[11px] text-muted-foreground">
                        {t.english}
                      </span>
                    )}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-card-foreground">
                    {t.short}
                  </dd>
                  <dd className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {t.detail}
                  </dd>
                  {t.relatedTopics && t.relatedTopics.length > 0 && (
                    <dd className="mt-2 flex flex-wrap gap-1.5">
                      {t.relatedTopics.map((r) => (
                        <Link
                          key={r}
                          href={`/topics/${encodeURIComponent(topicTagToSlug(r))}`}
                          className="inline-flex items-center rounded-full border border-border bg-background px-2 py-0.5 text-[10px] text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                        >
                          #{r}
                        </Link>
                      ))}
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </main>
  );
}
