import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import { JsonLd } from "@/components/seo/JsonLd";
import { ViewTracker } from "@/components/analytics/ViewTracker";
import { BlogScrollTracker } from "@/components/blog/BlogScrollTracker";
import { getExamQuestionCount } from "@/lib/constants/exam-question-counts";
import { TOTAL_QUESTIONS_PUBLISHED } from "@/lib/constants/question-counts";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blog";
import { getRelatedQuestionsForPost } from "@/lib/blog/related-questions";
import { questionPagePath } from "@/lib/seo/question-url";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { ORG_ID, SITE_LOGO_IMAGE, STUDENT_AUDIENCE } from "@/lib/seo/structured-data";
import { examLabel, formatYearSeason } from "@/lib/utils";

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) {
    return { title: "記事が見つかりません" };
  }
  const url = `/blog/${slug}`;
  const ogParams = new URLSearchParams({
    type: "blog",
    title: post.title,
    subtitle: post.exam ? `${examLabel(post.exam)} ブログ` : "ブログ",
    body: post.description,
  });
  const ogImageUrl = `${SITE_BASE_URL}/api/og?${ogParams.toString()}`;
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      siteName: SITE_NAME,
      locale: "ja_JP",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      tags: post.tags,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImageUrl],
    },
  };
}

function extractHowToSteps(body: string): Array<{ name: string; text: string }> {
  const steps: Array<{ name: string; text: string }> = [];
  const sections = body.split(/(?=^## )/m);
  for (const section of sections) {
    const match = section.match(/^## (ステップ\d+[：:].+)\n([\s\S]*)/);
    if (!match) continue;
    const name = match[1].trim();
    const text = match[2]
      .split("\n")
      .filter((l) => !l.startsWith("#"))
      .join(" ")
      .replace(/\*\*/g, "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 300);
    if (text) steps.push({ name, text });
  }
  return steps;
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_BASE_URL}/blog/${slug}`;
  const related = getRelatedPosts(slug, 4);
  const relatedQuestions = getRelatedQuestionsForPost(post.exam, post.tags, 3);
  const articleOgParams = new URLSearchParams({
    type: "blog",
    title: post.title,
    subtitle: post.exam ? `${examLabel(post.exam)} ブログ` : "ブログ",
    body: post.description,
  });
  const articleImage = `${SITE_BASE_URL}/api/og?${articleOgParams.toString()}`;

  const howToSteps = slug.endsWith("-yoru-tokurensyu")
    ? extractHowToSteps(post.body)
    : [];

  const graphNodes: object[] = [
    {
      "@type": "Article",
      "@id": `${url}#article`,
      headline: post.title,
      description: post.description,
      url,
      image: {
        "@type": "ImageObject",
        url: articleImage,
        width: 1200,
        height: 630,
      },
      datePublished: post.publishedAt,
      dateModified: post.updatedAt ?? post.publishedAt,
      inLanguage: "ja",
      keywords: post.tags.join(", "),
      author: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_BASE_URL,
      },
      publisher: {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        url: SITE_BASE_URL,
        logo: SITE_LOGO_IMAGE,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": url,
      },
    },
    {
      "@type": "LearningResource",
      "@id": `${url}#learning-resource`,
      name: post.title,
      description: post.description,
      inLanguage: "ja",
      learningResourceType: "Article",
      educationalLevel: "Professional",
      educationalUse: "Self-study",
      audience: STUDENT_AUDIENCE,
      teaches: post.exam
        ? `${examLabel(post.exam)} 試験対策`
        : "IPA情報処理技術者試験対策",
      keywords: post.tags.join(", "),
      isAccessibleForFree: true,
      publisher: {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        url: SITE_BASE_URL,
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
        {
          "@type": "ListItem",
          position: 2,
          name: "ブログ",
          item: `${SITE_BASE_URL}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: url,
        },
      ],
    },
  ];

  if (howToSteps.length > 0) {
    graphNodes.push({
      "@type": "HowTo",
      "@id": `${url}#howto`,
      name: post.title,
      description: post.description,
      inLanguage: "ja",
      step: howToSteps.map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    });
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": graphNodes,
  };

  const formattedDate = post.publishedAt.slice(0, 10);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-10">
      <ViewTracker event="blog_viewed" props={{ slug, exam: post.exam ?? null }} />
      <BlogScrollTracker slug={slug} exam={post.exam} />
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
          <li>
            <Link href="/blog" className="hover:underline">
              ブログ
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li
            aria-current="page"
            className="line-clamp-1 text-zinc-700 dark:text-zinc-300"
          >
            {post.title}
          </li>
        </ol>
      </nav>

      <header className="mb-6 border-b border-zinc-200 pb-5 dark:border-zinc-800">
        <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px]">
          {post.exam ? (
            <Link
              href={`/${post.exam}`}
              className="rounded-full bg-sky-100 px-2 py-0.5 font-semibold text-sky-700 hover:bg-sky-200 dark:bg-sky-950 dark:text-sky-300 dark:hover:bg-sky-900"
            >
              {examLabel(post.exam)}
            </Link>
          ) : null}
          {post.tags.map((t) => (
            <span
              key={t}
              className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {t}
            </span>
          ))}
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {post.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {post.description}
        </p>
        <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
          公開: <time dateTime={post.publishedAt}>{formattedDate}</time>
          {post.updatedAt ? (
            <>
              {" "}
              / 更新: <time dateTime={post.updatedAt}>{post.updatedAt.slice(0, 10)}</time>
            </>
          ) : null}
        </p>
      </header>

      <article>
        <BlogMarkdown>{post.body}</BlogMarkdown>
      </article>

      {post.exam ? (
        <section className="print:hidden mt-10 rounded-2xl border border-sky-200 bg-sky-50/60 p-5 text-sm text-zinc-700 dark:border-sky-800 dark:bg-sky-950/30 dark:text-zinc-300">
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            {examLabel(post.exam)} の過去問で実戦演習する
          </h2>
          <p className="mb-3 leading-relaxed">
            記事の内容を実戦で確認しましょう。AI コパイロット付きで分からない点はその場で解決できます。
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/quiz?mode=random&exam=${post.exam}`}
              aria-label={`この試験を演習する（${examLabel(post.exam)}・${getExamQuestionCount(post.exam)}問・無料）`}
              className="inline-flex min-h-[48px] items-center gap-1.5 rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              この試験を演習する（{getExamQuestionCount(post.exam).toLocaleString("ja-JP")}問）→
            </Link>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
              <span aria-hidden="true">✓</span>無料・登録不要
            </span>
            <Link
              href={`/${post.exam}`}
              className="inline-flex min-h-[48px] items-center rounded-full border border-sky-300 bg-white px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50 dark:border-sky-800 dark:bg-zinc-950 dark:text-sky-300 dark:hover:bg-sky-950/40"
            >
              {examLabel(post.exam)} 過去問一覧へ
            </Link>
            <Link
              href={`/recommended-books/${post.exam}`}
              className="inline-flex min-h-[48px] items-center rounded-full border border-amber-300 bg-white px-4 py-2 text-sm font-semibold text-amber-700 hover:bg-amber-50 dark:border-amber-800 dark:bg-zinc-950 dark:text-amber-300 dark:hover:bg-amber-950/40"
            >
              おすすめ書籍
            </Link>
          </div>
        </section>
      ) : (
        <section className="print:hidden mt-10 rounded-2xl border border-sky-200 bg-sky-50/60 p-5 text-sm text-zinc-700 dark:border-sky-800 dark:bg-sky-950/30 dark:text-zinc-300">
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            過去問AI で各試験区分の対策を始める
          </h2>
          <p className="mb-3 leading-relaxed">
            13 区分・{TOTAL_QUESTIONS_PUBLISHED.toLocaleString("ja-JP")} 問を AI コパイロット付きで学習できます。受験予定の試験区分から始めましょう。
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              aria-label="過去問演習を始める（13区分・無料登録不要）"
              className="inline-flex min-h-[48px] items-center gap-1.5 rounded-full bg-sky-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              過去問演習を始める →
            </Link>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
              <span aria-hidden="true">✓</span>無料・登録不要
            </span>
            <Link
              href="/blog"
              className="inline-flex min-h-[48px] items-center rounded-full border border-sky-300 bg-white px-4 py-2 text-sm font-semibold text-sky-700 hover:bg-sky-50 dark:border-sky-800 dark:bg-zinc-950 dark:text-sky-300 dark:hover:bg-sky-950/40"
            >
              他のブログ記事を読む
            </Link>
          </div>
        </section>
      )}

      {relatedQuestions.length > 0 && (
        <section
          aria-label="この記事に関連する過去問"
          className="print:hidden mt-10"
        >
          <h2 className="mb-3 text-base font-bold text-zinc-900 dark:text-zinc-50 sm:text-lg">
            この記事に関連する過去問
          </h2>
          <ul className="space-y-2">
            {relatedQuestions.map((rq) => (
              <li key={rq.id}>
                <Link
                  href={questionPagePath(rq)}
                  className="group block rounded-2xl border border-zinc-200 bg-white p-4 transition-colors hover:border-sky-300 hover:bg-sky-50/40 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-700 dark:hover:bg-sky-950/20"
                >
                  <div className="mb-1 flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-medium dark:bg-zinc-800">
                      {examLabel(rq.exam)}
                    </span>
                    <span>
                      {formatYearSeason(rq.year, rq.season)} 問{rq.qNumber}・{rq.category}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm leading-relaxed text-zinc-800 group-hover:text-sky-700 dark:text-zinc-100 dark:group-hover:text-sky-300">
                    {rq.question.slice(0, 120)}
                    {rq.question.length > 120 ? "…" : ""}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {related.length > 0 ? (
        <section
          aria-label="関連記事"
          className="print:hidden mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800"
        >
          <h2 className="mb-4 text-base font-bold text-zinc-900 dark:text-zinc-50 sm:text-lg">
            関連記事
          </h2>
          <ul className="space-y-3">
            {related.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="block rounded-2xl border border-zinc-200 bg-white p-4 transition-colors hover:border-sky-300 hover:bg-sky-50/40 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-700 dark:hover:bg-sky-950/20"
                >
                  <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                    {p.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">
                    {p.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-10 text-xs text-zinc-500 dark:text-zinc-500">
        <p>
          ※ 本記事は 過去問AI が独自にまとめた学習ガイドです。試験要項の最新情報は必ず{" "}
          <a
            href="https://www.ipa.go.jp/shiken/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            IPA 公式ページ
          </a>
          で確認してください。
        </p>
      </section>

      {/* Print-only attribution */}
      <div className="print-only hidden mt-8 border-t border-gray-300 pt-4 text-[10pt] text-gray-600">
        <p>過去問AI（https://www.kakomon-ai.jp/blog/{slug}）より印刷</p>
        <p className="mt-1">出典: IPA 情報処理技術者試験（https://www.ipa.go.jp/shiken/）</p>
      </div>
    </main>
  );
}
