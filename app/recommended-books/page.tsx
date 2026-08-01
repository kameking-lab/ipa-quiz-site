import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/JsonLd";
import { RECOMMENDED_BOOKS } from "@/data/recommended-books";
import { EXAM_LABELS } from "@/lib/utils";
import { SITE_BASE_URL } from "@/lib/seo/config";
import type { ExamCode } from "@/lib/questions/types";

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

// Page-specific OG card. The /api/og route reserves a "books" type style for
// this page; without an explicit images entry the openGraph override would drop
// the site-wide default image, leaving this page with no social/SERP card.
const BOOKS_OG_URL = `${SITE_BASE_URL}/api/og?${new URLSearchParams({
  type: "books",
  title: "おすすめ問題集・参考書",
  body: "IPA 全13区分の定番問題集・参考書を試験別に厳選。",
}).toString()}`;

export const metadata: Metadata = {
  title: "IPA試験 おすすめ問題集・参考書",
  description:
    "ITパスポートから高度試験まで、IPA情報処理技術者試験13区分の定番問題集・参考書をAIが厳選。書籍と過去問AIの組み合わせ学習で合格まで最短距離。",
  alternates: { canonical: "/recommended-books" },
  openGraph: {
    title: "IPA試験 おすすめ問題集・参考書 | 過去問AI",
    description:
      "IPA情報処理技術者試験13区分の定番問題集を試験別にまとめた、AI推薦の参考書ガイド。",
    type: "website",
    url: `${SITE_BASE_URL}/recommended-books`,
    images: [{ url: BOOKS_OG_URL, width: 1200, height: 630, alt: "IPA試験 おすすめ問題集・参考書" }],
  },
};

export default function RecommendedBooksIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: "IPA試験別 おすすめ問題集",
        itemListElement: EXAM_ORDER.map((exam, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: `${EXAM_LABELS[exam]} おすすめ問題集`,
          url: `${SITE_BASE_URL}/recommended-books/${exam}`,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "おすすめ問題集",
            item: `${SITE_BASE_URL}/recommended-books`,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-12 pt-6 sm:px-6">
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
            おすすめ問題集
          </li>
        </ol>
      </nav>

      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>

      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-lg bg-amber-100 p-2 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
            <BookOpen className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            過去問AI推薦の問題集
          </h1>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          IPA情報処理技術者試験 全13区分の定番テキスト・問題集を、初学者向けから上級者向けまで厳選してまとめました。
          書籍で全体像を押さえ、本サイトの過去問AIで弱点を狙い撃ちするのがおすすめの学習スタイルです。
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <Badge variant="success">13試験区分対応</Badge>
          <Badge variant="outline">入門〜上級まで段階別</Badge>
          <Badge variant="outline">AI解説と併用推奨</Badge>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          試験区分を選んでください
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {EXAM_ORDER.map((exam) => {
            const books = RECOMMENDED_BOOKS[exam] ?? [];
            const label = EXAM_LABELS[exam];
            return (
              <Link
                key={exam}
                href={`/recommended-books/${exam}`}
                className="group flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-300 hover:shadow dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-amber-700"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-lg bg-sky-600 px-2 py-0.5 text-sm font-bold text-white">
                    {exam.toUpperCase()}
                  </span>
                  <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    {books.length}冊掲載
                  </span>
                </div>
                <p className="text-base font-semibold">{label}</p>
                <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {books[0]?.title ?? "情報を準備中"}
                  {books.length > 1 ? ` ほか ${books.length - 1} 冊` : ""}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
        <p className="font-semibold">アフィリエイトに関する表示</p>
        <p className="mt-1">
          本ページのリンクにはAmazon/楽天のアフィリエイトリンクが含まれます。
          ご購入いただいた場合、当サービス運営費の一部として収益が発生します。
          価格・在庫はリンク先の表示が最新です。
        </p>
      </section>
    </main>
  );
}
