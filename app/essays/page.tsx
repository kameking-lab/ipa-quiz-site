import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ArrowRight, Shield } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { ESSAY_EXAM_CODES, getEssayQuestionsByExam } from "@/lib/essays/load";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { examLabel } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "業種別合格答案サンプル",
  description:
    "IPA高度情報処理技術者試験（SC/ST/SA/PM/SM/AU）午後II 論述問題の業種別合格答案サンプル集。AI生成の参考例として、論述構成の骨格づくりにご活用ください。",
  alternates: { canonical: "/essays" },
};

export default function EssaysIndexPage() {
  const examStats = ESSAY_EXAM_CODES.map((exam) => ({
    exam,
    label: examLabel(exam),
    count: getEssayQuestionsByExam(exam).length,
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_BASE_URL}/essays#collection`,
        name: "業種別合格答案サンプル",
        description:
          "IPA高度情報処理技術者試験 午後II 論述問題の業種別合格答案サンプル集。AI生成の参考例。",
        url: `${SITE_BASE_URL}/essays`,
        inLanguage: "ja",
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_BASE_URL },
        additionalProperty: {
          "@type": "PropertyValue",
          name: "contentGenerationMethod",
          value: "AI-generated sample answers for educational reference. Not official IPA passing answers.",
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "業種別合格答案サンプル",
            item: `${SITE_BASE_URL}/essays`,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-8 sm:px-6">
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
            業種別合格答案サンプル
          </li>
        </ol>
      </nav>

      <div
        role="note"
        className="mb-6 flex items-start gap-2 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100"
      >
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
        <p>
          <strong>本答案は AI 生成の参考例です。</strong>
          IPA 公式の合格答案ではなく、合格を保証するものではありません。
          業種別シナリオは論述構成を学ぶための<strong>架空の事例</strong>であり、
          各業界の専門的助言・実務指南を提供するものではありません。
          論述構成・業種事例の参考としてご活用ください。
        </p>
      </div>

      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <Shield className="h-6 w-6 text-sky-600 dark:text-sky-400" />
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            業種別{" "}
            <span className="text-sky-600 dark:text-sky-400">合格答案サンプル</span>
          </h1>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          IPA 高度情報処理技術者試験（SC / ST / SA / PM / SM / AU）午後 II 論述問題の
          業種別参考答案です。製造・金融・公共など自分の業務経験に近い業種を選んで、
          論述の骨格づくりにお役立てください。
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {examStats.map(({ exam, label, count }) => (
          <Card key={exam} className="flex flex-col">
            <CardHeader className="pb-2">
              <div className="mb-1">
                <Badge variant="soft" className="text-xs">
                  {label}
                </Badge>
              </div>
              <CardTitle className="text-base leading-snug">
                {label} 午後II 論述
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between">
              <p className="mb-4 text-xs text-zinc-500 dark:text-zinc-400">
                {count} 問の業種別サンプル答案を掲載中
              </p>
              <Button asChild variant="primary" size="md" className="w-full">
                <Link href={`/essays/${exam}`}>
                  答案サンプルを見る
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
