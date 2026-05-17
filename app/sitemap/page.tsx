import type { Metadata } from "next";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/data/blog";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import type { ExamCode } from "@/lib/questions/types";
import { examLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "サイトマップ",
  description:
    "過去問AIの全ページを階層構造で一覧表示。各試験区分・年度別・分野別問題ページ、ブログ記事、おすすめ書籍などへの直接リンクを提供します。",
  alternates: { canonical: "/sitemap" },
};

const EXAM_ORDER: ExamCode[] = [
  "ip",
  "sg",
  "fe",
  "ap",
  "sc",
  "nw",
  "db",
  "es",
  "st",
  "sa",
  "pm",
  "sm",
  "au",
];

export default function HtmlSitemapPage() {
  const examEntries = EXAM_ORDER.map((code) => ({
    code,
    count: QUESTIONS_BY_EXAM[code]?.length ?? 0,
  })).filter((e) => e.count > 0);

  const blogPosts = getAllBlogSlugs()
    .map((slug) => getBlogPostBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "サイトマップ",
        item: `${SITE_BASE_URL}/sitemap`,
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-6 sm:px-6 sm:pt-10">
      <JsonLd data={jsonLd} />
      <nav aria-label="パンくずリスト" className="mb-4 text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            サイトマップ
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          サイトマップ
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {SITE_NAME} の主要ページを階層構造で一覧表示しています。各試験区分の問題ページや関連ブログへ直接アクセスできます。
        </p>
      </header>

      <section aria-label="主要ページ" className="mb-10">
        <h2 className="mb-3 text-lg font-bold text-foreground">主要ページ</h2>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-3">
          {[
            { href: "/", label: "ホーム" },
            { href: "/search", label: "問題検索" },
            { href: "/modes/year", label: "年度別一覧" },
            { href: "/modes/topic", label: "分野別一覧" },
            { href: "/topics", label: "トピック一覧" },
            { href: "/glossary", label: "用語集" },
            { href: "/keywords", label: "学習トピック" },
            { href: "/features", label: "機能特集" },
            { href: "/mock-exam", label: "模試モード" },
            { href: "/quiz/stream", label: "ストリーム学習" },
            { href: "/study-plan", label: "AI学習スケジュール" },
            { href: "/challenge", label: "今日の1問" },
            { href: "/essay", label: "AI 論述添削" },
            { href: "/ranking", label: "ランキング" },
            { href: "/stats", label: "公開ダッシュボード" },
            { href: "/blog", label: "ブログ一覧" },
            { href: "/recommended-books", label: "おすすめ書籍" },
            { href: "/student", label: "学割プラン" },
            { href: "/referral", label: "友達紹介" },
            { href: "/about", label: "プロジェクトについて" },
            { href: "/transparency", label: "透明性レポート" },
            { href: "/operator", label: "運営者情報" },
            { href: "/updates", label: "更新履歴" },
            { href: "/faq", label: "FAQ" },
            { href: "/contact", label: "お問い合わせ" },
            { href: "/community-guidelines", label: "コミュニティガイドライン" },
            { href: "/terms", label: "利用規約" },
            { href: "/privacy", label: "プライバシー" },
            { href: "/license", label: "コンテンツ利用方針" },
            { href: "/sitemap.xml", label: "XML サイトマップ" },
          ].map((p) => (
            <li key={p.href}>
              <Link
                href={p.href}
                className="text-sky-600 hover:underline dark:text-sky-400"
              >
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="試験区分別ページ" className="mb-10">
        <h2 className="mb-3 text-lg font-bold text-foreground">試験区分別ページ</h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {examEntries.map(({ code, count }) => (
            <li
              key={code}
              className="rounded-2xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="mb-2 flex items-center justify-between">
                <Link
                  href={`/${code}`}
                  className="text-base font-semibold text-foreground hover:text-sky-600 hover:underline dark:hover:text-sky-400"
                >
                  {examLabel(code)}
                </Link>
                <Badge variant="outline" className="text-[10px]">
                  {count.toLocaleString("ja-JP")}問
                </Badge>
              </div>
              <ul className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs">
                <li>
                  <Link
                    href={`/quiz?mode=random&exam=${code}`}
                    className="text-sky-600 hover:underline dark:text-sky-400"
                  >
                    ランダム出題
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${code}#years`}
                    className="text-sky-600 hover:underline dark:text-sky-400"
                  >
                    年度別一覧
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${code}#topics`}
                    className="text-sky-600 hover:underline dark:text-sky-400"
                  >
                    分野別一覧
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/recommended-books/${code}`}
                    className="text-sky-600 hover:underline dark:text-sky-400"
                  >
                    おすすめ書籍
                  </Link>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </section>

      {blogPosts.length > 0 && (
        <section aria-label="ブログ記事" className="mb-10">
          <h2 className="mb-3 text-lg font-bold text-foreground">ブログ記事</h2>
          <ul className="grid gap-1 text-sm sm:grid-cols-2">
            {blogPosts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="block py-1 text-sky-600 hover:underline dark:text-sky-400"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-label="追加情報" className="mb-2">
        <p className="text-xs text-muted-foreground">
          各問題ページへの完全な URL リストは {" "}
          <Link href="/sitemap.xml" className="underline hover:text-foreground">
            XML サイトマップ
          </Link>
          {" "} を参照してください。
        </p>
      </section>
    </main>
  );
}
