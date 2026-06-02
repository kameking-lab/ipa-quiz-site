import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { AfternoonEssayHint } from "@/components/quiz/AfternoonEssayHint";
import { KamokuBStudyHint } from "@/components/quiz/KamokuBStudyHint";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  KEYWORD_PAGES,
  getKeywordPageBySlug,
  getRelatedKeywordPages,
} from "@/data/keywords";
import { getBlogPostBySlug } from "@/data/blog";
import { ESSAY_EXAM_CODES } from "@/lib/essay/load";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { ORG_ID, SITE_LOGO_IMAGE } from "@/lib/seo/structured-data";
import { topicLinkHref } from "@/lib/seo/topics";
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

  // 旗艦＝午後II論述 AI 採点への送客は、明示オプトイン (strategicCta) かつ
  // 論文区分 (ESSAY_EXAM_CODES) を持つ記事に限定する（誇大回避）。
  const essayExam =
    page.strategicCta === "essay"
      ? (page.exams.find((e) =>
          (ESSAY_EXAM_CODES as readonly string[]).includes(e),
        ) as ExamCode | undefined)
      : undefined;

  // 薄い LP の dead-end 解消: 同一トピックを厚く論じる親ブログ記事へ
  // 「さらに深く学ぶ」逆方向リンクを張る（明示オプトイン relatedBlogSlug のみ）。
  // 実在しない slug を弾いて新規 404 を作らない（typo は描画しない）。
  const relatedBlog = page.relatedBlogSlug
    ? getBlogPostBySlug(page.relatedBlogSlug)
    : undefined;

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
        author: { "@type": "Organization", name: SITE_NAME, url: SITE_BASE_URL },
        publisher: {
          "@type": "Organization",
          "@id": ORG_ID,
          name: SITE_NAME,
          url: SITE_BASE_URL,
          logo: SITE_LOGO_IMAGE,
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": absUrl },
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
            <Link href="/" className="inline-block py-1.5 hover:text-foreground hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/keywords" className="inline-block py-1.5 hover:text-foreground hover:underline">
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

      {essayExam ? <AfternoonEssayHint exam={essayExam} /> : null}
      {page.strategicCta === "kamoku-b" ? (
        <KamokuBStudyHint exam="fe" session="kamoku-b" />
      ) : null}

      {relatedBlog ? (
        <section aria-label="さらに深く学ぶ" className="mt-8">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            さらに深く学ぶ
          </h2>
          <Link
            href={`/blog/${relatedBlog.slug}`}
            className="group block rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <p className="text-sm font-medium text-foreground group-hover:text-primary">
              {relatedBlog.title}
            </p>
            <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
              {relatedBlog.description}
            </p>
          </Link>
        </section>
      ) : null}

      <section aria-label="関連トピック" className="mt-8">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          関連トピック
        </h2>
        <ul className="flex flex-wrap gap-1.5">
          {page.relatedTopics.map((t) => (
            <li key={t}>
              <Link
                href={topicLinkHref(t)}
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
          {getRelatedKeywordPages(page.slug, 5).map((p) => (
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
