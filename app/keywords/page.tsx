import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { KEYWORD_PAGES } from "@/data/keywords";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { examLabel } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";

export const metadata: Metadata = {
  title: "学習トピック特集記事一覧",
  description:
    "情報処理技術者試験の頻出論点に特化したロングテール解説記事一覧。サブネット計算・EVM・論文構成・直前対策など、検索ニーズに応じた特集を集約。",
  alternates: { canonical: "/keywords" },
  openGraph: {
    title: "学習トピック特集記事一覧 | 過去問AI",
    description: "頻出論点に特化したロングテール解説記事の一覧ページ。",
    url: "/keywords",
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
  },
};

export default function KeywordsIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "学習トピック特集記事",
        url: `${SITE_BASE_URL}/keywords`,
        inLanguage: "ja",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          { "@type": "ListItem", position: 2, name: "学習トピック", item: `${SITE_BASE_URL}/keywords` },
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
            <Link href="/" className="hover:text-foreground hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            学習トピック特集
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <Badge variant="soft" className="mb-3">
          <Search className="h-3 w-3" />
          特集
        </Badge>
        <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          学習トピック特集記事
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          頻出論点・直前対策・学習プランなど、検索ニーズに応じた特集記事を集約しています。
        </p>
      </header>

      <ul className="space-y-3">
        {KEYWORD_PAGES.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/keywords/${p.slug}`}
              className="group block rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <h2 className="text-base font-semibold text-foreground group-hover:text-primary sm:text-lg">
                {p.title}
              </h2>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.exams.map((e) => (
                  <Badge key={e} variant="outline" className="text-[10px]">
                    {examLabel(e as ExamCode)}
                  </Badge>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
