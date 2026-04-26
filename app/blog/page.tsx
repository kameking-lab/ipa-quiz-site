import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/seo/JsonLd";
import { getAllBlogSummaries } from "@/data/blog";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { examLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "IPA試験ブログ｜全13区分の合格戦略・勉強法・出題傾向",
  description:
    "IPA情報処理技術者試験13区分の合格戦略・勉強法・直前対策・頻出論点を網羅。AI解説付きの過去問演習サイトIPA Quizが運営する学習ブログ。",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "IPA試験ブログ | IPA Quiz",
    description:
      "IPA情報処理技術者試験13区分の合格戦略・勉強法・出題傾向を網羅した学習ブログ。",
    url: "/blog",
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: "IPA試験ブログ | IPA Quiz",
    description: "IPA試験13区分の合格戦略・勉強法・出題傾向を網羅した学習ブログ。",
  },
};

export default function BlogIndexPage() {
  const posts = getAllBlogSummaries();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_BASE_URL}/blog#blog`,
        name: "IPA試験ブログ",
        description:
          "IPA情報処理技術者試験13区分の合格戦略・勉強法・出題傾向を網羅した学習ブログ。",
        url: `${SITE_BASE_URL}/blog`,
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_BASE_URL,
        },
        blogPost: posts.slice(0, 20).map((p) => ({
          "@type": "BlogPosting",
          headline: p.title,
          description: p.description,
          url: `${SITE_BASE_URL}/blog/${p.slug}`,
          datePublished: p.publishedAt,
          dateModified: p.updatedAt ?? p.publishedAt,
        })),
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
        ],
      },
    ],
  };

  const grouped = new Map<string, typeof posts>();
  for (const p of posts) {
    const key = p.exam ?? "general";
    const arr = grouped.get(key) ?? [];
    arr.push(p);
    grouped.set(key, arr);
  }
  const examOrder = [
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
    "general",
  ];

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
            ブログ
          </li>
        </ol>
      </nav>

      <header className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          IPA試験ブログ
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 sm:text-base">
          IPA 情報処理技術者試験 13 区分の合格戦略・勉強法・出題傾向・直前対策を網羅。
          AI コパイロット付き過去問演習サイト IPA Quiz が運営する学習ブログです。
          記事数は <strong>{posts.length} 本</strong> 公開中。
        </p>
      </header>

      <div className="space-y-12">
        {examOrder.map((examKey) => {
          const items = grouped.get(examKey);
          if (!items || items.length === 0) return null;
          const heading =
            examKey === "general" ? "横断・キャリア・学習法" : examLabel(examKey);
          return (
            <section key={examKey} aria-labelledby={`section-${examKey}`}>
              <h2
                id={`section-${examKey}`}
                className="mb-4 border-l-4 border-sky-500 pl-3 text-lg font-bold text-zinc-900 dark:text-zinc-50 sm:text-xl"
              >
                {heading}
                <span className="ml-2 text-xs font-normal text-zinc-500 dark:text-zinc-400">
                  {items.length} 本
                </span>
              </h2>
              <ul className="space-y-3">
                {items.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="block rounded-2xl border border-zinc-200 bg-white p-4 transition-colors hover:border-sky-300 hover:bg-sky-50/40 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-700 dark:hover:bg-sky-950/20"
                    >
                      <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[11px]">
                        {p.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="rounded bg-zinc-100 px-1.5 py-0.5 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 sm:text-base">
                        {p.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-sm">
                        {p.description}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <section className="mt-12 rounded-2xl border border-sky-200 bg-sky-50/60 p-5 text-sm text-zinc-700 dark:border-sky-800 dark:bg-sky-950/30 dark:text-zinc-300">
        <h2 className="mb-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
          過去問演習はこちら
        </h2>
        <p className="leading-relaxed">
          記事を読み終わったら、IPA Quiz の AI コパイロット付き過去問で学習を始めましょう。
          年度別・分野別・復習モードで効率的に演習できます。
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {["ap", "fe", "sc", "nw", "db", "pm", "ip", "sg"].map((e) => (
            <Link
              key={e}
              href={`/${e}`}
              className="rounded-full border border-sky-300 bg-white px-3 py-1 text-xs font-medium text-sky-700 hover:bg-sky-100 dark:border-sky-700 dark:bg-zinc-900 dark:text-sky-300 dark:hover:bg-sky-900/40"
            >
              {examLabel(e)}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
