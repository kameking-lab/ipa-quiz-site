import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { KEYWORD_PAGES, getKeywordPageBySlug } from "@/data/keywords";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { topicTagToSlug } from "@/lib/seo/topics";
import { examLabel } from "@/lib/utils";
import type { ExamCode } from "@/lib/questions/types";

export const dynamicParams = false;

interface RouteParams {
  keyword: string;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  return KEYWORD_PAGES.map((p) => ({ keyword: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { keyword } = await params;
  const page = getKeywordPageBySlug(keyword);
  if (!page) return { title: "ページが見つかりません", robots: { index: false } };
  const ogParams = new URLSearchParams({
    type: "keyword",
    title: page.title,
    subtitle: "学習トピック特集",
    body: page.description,
  });
  const ogImageUrl = `${SITE_BASE_URL}/api/og?${ogParams.toString()}`;
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/keywords/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `/keywords/${page.slug}`,
      type: "article",
      siteName: SITE_NAME,
      locale: "ja_JP",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [ogImageUrl],
    },
  };
}

export default async function KeywordPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { keyword } = await params;
  const page = getKeywordPageBySlug(keyword);
  if (!page) notFound();

  const absUrl = `${SITE_BASE_URL}/keywords/${page.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: page.title,
        description: page.description,
        url: absUrl,
        inLanguage: "ja",
        articleSection: "学習トピック",
        keywords: page.relatedTopics.join(", "),
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_BASE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          { "@type": "ListItem", position: 2, name: "学習トピック", item: `${SITE_BASE_URL}/keywords` },
          { "@type": "ListItem", position: 3, name: page.title, item: absUrl },
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
          <li>
            <Link href="/keywords" className="hover:text-foreground hover:underline">
              学習トピック
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {page.title}
          </li>
        </ol>
      </nav>

      <header className="mb-6">
        <Badge variant="soft" className="mb-3">
          <BookOpen className="h-3 w-3" />
          学習トピック特集
        </Badge>
        <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {page.title}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {page.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {page.exams.map((e) => (
            <Link
              key={e}
              href={`/${e}`}
              className="inline-flex items-center rounded-full border border-primary/30 bg-primary-soft px-2.5 py-0.5 text-[11px] font-medium text-primary-soft-foreground transition hover:border-primary"
            >
              {examLabel(e as ExamCode)}
            </Link>
          ))}
        </div>
      </header>

      <article className="prose prose-sm max-w-none space-y-4 text-card-foreground">
        {page.body.map((p, i) => (
          <p key={i} className="text-sm leading-[1.85]">
            {p}
          </p>
        ))}
      </article>

      <section aria-label="関連トピック" className="mt-8">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          関連トピック
        </h2>
        <ul className="flex flex-wrap gap-1.5">
          {page.relatedTopics.map((t) => (
            <li key={t}>
              <Link
                href={`/topics/${encodeURIComponent(topicTagToSlug(t))}`}
                className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-xs text-muted-foreground transition hover:border-primary/40 hover:text-primary"
              >
                #{t}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 rounded-2xl border border-primary/30 bg-primary-soft p-5 text-sm">
        <p className="font-medium text-foreground">
          このトピックの過去問でアウトプットしましょう
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          AI コパイロットに『このトピックの典型問題を 1 問つくって』と頼むと、その場で類題演習ができます。
        </p>
        <Button asChild variant="primary" size="md" className="mt-3">
          <Link href={`/${page.exams[0]}`}>
            関連試験のページを開く
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>

      <section aria-label="他の特集記事" className="mt-10">
        <h2 className="mb-3 text-base font-bold tracking-tight text-foreground">
          他の特集記事
        </h2>
        <ul className="space-y-2">
          {KEYWORD_PAGES.filter((p) => p.slug !== page.slug)
            .slice(0, 5)
            .map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/keywords/${p.slug}`}
                  className="group block rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <p className="text-sm font-medium text-foreground group-hover:text-primary">
                    {p.title}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                    {p.description}
                  </p>
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
}
