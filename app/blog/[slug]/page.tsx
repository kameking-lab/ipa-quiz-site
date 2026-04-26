import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blog";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { examLabel } from "@/lib/utils";

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

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
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_BASE_URL}/blog/${slug}`;
  const related = getRelatedPosts(slug, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        url,
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
          name: SITE_NAME,
          url: SITE_BASE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_BASE_URL}/icon-512.svg`,
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": url,
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
    ],
  };

  const formattedDate = post.publishedAt.slice(0, 10);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-10">
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
        <section className="mt-10 rounded-2xl border border-sky-200 bg-sky-50/60 p-5 text-sm text-zinc-700 dark:border-sky-800 dark:bg-sky-950/30 dark:text-zinc-300">
          <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
            {examLabel(post.exam)} の過去問で実戦演習する
          </h2>
          <p className="mb-3 leading-relaxed">
            記事の内容を実戦で確認しましょう。AI コパイロット付きで分からない点はその場で解決できます。
          </p>
          <Link
            href={`/${post.exam}`}
            className="inline-block rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
          >
            {examLabel(post.exam)} 過去問一覧へ →
          </Link>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section
          aria-label="関連記事"
          className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800"
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
          ※ 本記事は IPA Quiz が独自にまとめた学習ガイドです。試験要項の最新情報は必ず{" "}
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
    </main>
  );
}
