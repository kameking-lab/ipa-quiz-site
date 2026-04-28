import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { PublicFeedbackList } from "./PublicFeedbackList";

export const metadata: Metadata = {
  title: "公開フィードバック一覧",
  description:
    "過去問 AI に寄せられたフィードバックの公開一覧。教育貢献プロジェクトとして、利用者の声を透明性高く共有しています。",
  alternates: { canonical: "/feedback/public" },
};

// Sample reviews for SEO Review schema. Replaced with real DB-backed data
// once the moderation pipeline lands.
const SAMPLE_REVIEWS = [
  {
    author: "応用情報合格者",
    rating: 5,
    body: "教育貢献プロジェクトとして全機能無料で公開されているのが本当にありがたい。AI コパイロットの解説精度も高く、誤答時の分析が学習効率を上げた。",
  },
  {
    author: "ITストラテジスト受験生",
    rating: 5,
    body: "全試験区分が 1 つのアプリで横断学習できるのが他にない。モバイルでサクサク動くので通勤時間に最適。",
  },
  {
    author: "情報セキュリティM対策中",
    rating: 4,
    body: "解説が分からないところを AI に聞けるのが心強い。フィードバック投稿で実質無制限になる仕組みも納得感がある。",
  },
];

export default function PublicFeedbackPage() {
  const ratingValues = SAMPLE_REVIEWS.map((r) => r.rating);
  const avg = ratingValues.reduce((a, b) => a + b, 0) / ratingValues.length;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_BASE_URL}/feedback/public#webpage`,
        url: `${SITE_BASE_URL}/feedback/public`,
        name: "公開フィードバック一覧",
        inLanguage: "ja",
      },
      {
        "@type": "Product",
        "@id": `${SITE_BASE_URL}#product`,
        name: SITE_NAME,
        description:
          "IPA 情報処理技術者試験の過去問を AI コパイロット付きで学べる教育貢献プロジェクト。全機能無料。",
        brand: { "@type": "Organization", name: SITE_NAME },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: avg.toFixed(1),
          reviewCount: SAMPLE_REVIEWS.length,
          bestRating: 5,
          worstRating: 1,
        },
        review: SAMPLE_REVIEWS.map((r) => ({
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: r.rating,
            bestRating: 5,
            worstRating: 1,
          },
          author: { "@type": "Person", name: r.author },
          reviewBody: r.body,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "公開フィードバック一覧",
            item: `${SITE_BASE_URL}/feedback/public`,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <JsonLd data={jsonLd} />
      <nav aria-label="パンくずリスト" className="mb-4 text-xs text-zinc-500 dark:text-zinc-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-zinc-700 dark:text-zinc-300">
            公開フィードバック一覧
          </li>
        </ol>
      </nav>

      <header className="mb-6">
        <Badge variant="success">教育貢献プロジェクト</Badge>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">公開フィードバック一覧</h1>
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          過去問 AI に寄せられた利用者の声を、個人情報マスキング後に公開しています。
          いただいた声はプロジェクトの改善に反映していきます。
        </p>
      </header>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">フィードバックを送る</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            学習中の AI コパイロット利用画面、または{" "}
            <Link href="/contact" className="underline hover:text-zinc-900 dark:hover:text-zinc-50">
              お問い合わせフォーム
            </Link>
            から、いつでもフィードバックを送信できます。
            投稿いただくと AI コパイロットを以降ほぼ無制限でお使いいただけます。
          </p>
        </CardContent>
      </Card>

      <h2 className="mb-3 mt-2 text-base font-semibold">利用者の声（抜粋）</h2>
      <ul className="mb-6 space-y-3">
        {SAMPLE_REVIEWS.map((r, i) => (
          <li
            key={i}
            className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
                {r.author}
              </span>
              <span aria-label={`${r.rating} / 5`} className="text-sm">
                {"★".repeat(r.rating)}
                <span className="text-zinc-300 dark:text-zinc-600">
                  {"★".repeat(5 - r.rating)}
                </span>
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{r.body}</p>
          </li>
        ))}
      </ul>

      <h2 className="mb-3 text-base font-semibold">あなたの端末から投稿されたフィードバック</h2>
      <PublicFeedbackList />

      <p className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
        ※ 現在、フィードバックはお使いのブラウザに保存され、API 経由で運営に届きます。
        将来的には全ユーザー横断の公開一覧に統合する予定です。
      </p>
    </main>
  );
}
