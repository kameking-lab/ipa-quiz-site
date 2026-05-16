import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Shield, FileText, AlertTriangle, ArrowRight, BookOpen } from "lucide-react";

import { getRelatedBlogPosts } from "@/lib/blog/related-content";

import {
  ESSAY_EXAM_CODES,
  getEssayQuestionsByExam,
  isEssayExamCode,
  questionToUrlParts,
} from "@/lib/essays/load";
import { ESSAY_INDUSTRY_LABELS } from "@/lib/essays/types";
import { examLabel } from "@/lib/utils";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RouteParams {
  exam: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { exam } = await params;
  if (!isEssayExamCode(exam)) {
    return { title: "試験区分が見つかりません", robots: { index: false } };
  }
  const label = examLabel(exam);
  return {
    title: `${label} 業種別合格答案サンプル | 午後II 論述`,
    description: `${label} 午後II 論述問題の業種別合格答案サンプル。製造業・建設業・金融業・流通業・通信業・公共など、業種別の論述例（序論・本論・結論）を掲載。AI 生成の参考例（査読推奨）。`,
    alternates: { canonical: `/essays/${exam}` },
  };
}

export async function generateStaticParams() {
  return ESSAY_EXAM_CODES.map((exam) => ({ exam }));
}

export default async function EssayExamPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { exam } = await params;
  if (!isEssayExamCode(exam)) notFound();

  const questions = getEssayQuestionsByExam(exam);
  if (questions.length === 0) notFound();

  const presentIndustryIds = new Set<string>();
  for (const q of questions) {
    for (const ind of q.industries) presentIndustryIds.add(ind.industryId);
  }
  const industries = (
    Object.entries(ESSAY_INDUSTRY_LABELS) as [
      keyof typeof ESSAY_INDUSTRY_LABELS,
      string
    ][]
  ).filter(([id]) => presentIndustryIds.has(id));

  const label = examLabel(exam);
  const pageUrl = `${SITE_BASE_URL}/essays/${exam}`;
  const relatedPosts = getRelatedBlogPosts(exam, 3);
  const description = `${label} 午後II 論述問題の業種別合格答案サンプル。製造業・建設業・金融業・流通業・通信業・公共など、業種別の論述例（序論・本論・結論）を掲載。AI 生成の参考例（査読推奨）。`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#collection`,
        name: `${label} 業種別合格答案サンプル`,
        description,
        url: pageUrl,
        inLanguage: "ja",
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_BASE_URL },
        numberOfItems: questions.length,
      },
      {
        "@type": "LearningResource",
        "@id": `${pageUrl}#learning-resource`,
        name: `${label} 業種別合格答案サンプル`,
        description,
        inLanguage: "ja",
        learningResourceType: "Sample response",
        educationalUse: "Self-study",
        teaches: `${label} 午後II 論述試験`,
        isAccessibleForFree: true,
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_BASE_URL,
        },
        creator: {
          "@type": "Organization",
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
            name: `${label} 業種別合格答案`,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-16 pt-8 sm:px-6">
      <JsonLd data={jsonLd} />
      <div
        role="note"
        className="mb-6 flex items-start gap-2 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100"
      >
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
        <p>
          <strong>本答案は AI 生成の参考例です。</strong>
          IPA 公式の合格答案ではなく、合格を保証するものではありません。
          論述構成・業種事例の参考としてご活用ください。
        </p>
      </div>

      <section className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <Shield className="h-6 w-6 text-sky-600 dark:text-sky-400" />
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            {examLabel(exam)}{" "}
            <span className="text-sky-600 dark:text-sky-400">業種別合格答案サンプル</span>
          </h1>
        </div>
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          午後 II 論述問題を業種別の具体的シナリオで解説した参考答案です。
          自分の業務経験に近い業種を選んで、論述構成の骨格づくりにお役立てください。
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {industries.map(([id, label]) => (
            <Badge key={id} variant="outline" className="text-xs">
              {label}
            </Badge>
          ))}
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {questions.map((q) => {
          const { yearSeason, section, qnum } = questionToUrlParts(q, exam);
          return (
            <Card key={q.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="mb-1 flex items-center gap-2">
                  <Badge variant="soft" className="text-xs">
                    {q.year}
                    {q.season === "spring" ? "春" : "秋"}期
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    午後 II 問{q.qNumber}
                  </Badge>
                </div>
                <CardTitle className="text-base leading-snug">{q.theme}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between">
                <ul className="mb-4 space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {q.industries.map((ind) => (
                    <li key={ind.industryId} className="flex items-center gap-1">
                      <FileText className="h-3 w-3 flex-shrink-0" />
                      {ind.industryName}
                    </li>
                  ))}
                </ul>
                <Button asChild variant="primary" size="md" className="w-full">
                  <Link
                    href={`/essays/${exam}/${yearSeason}/${section}/${qnum}`}
                  >
                    業種別答案を見る
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-sm dark:border-zinc-800 dark:bg-zinc-900/50">
        <h2 className="mb-2 text-base font-semibold">活用方法</h2>
        <ol className="list-decimal space-y-1 pl-5 text-zinc-600 dark:text-zinc-400">
          <li>自分の業種に近い答案を選んで全文を読む</li>
          <li>序論・本論・結論の構成とキーワードを把握する</li>
          <li>自分の業務経験に照らして固有名詞・数値を置き換える</li>
          <li>AI 論述添削機能で自分の答案をフィードバック</li>
        </ol>
        <div className="mt-4">
          <Link
            href="/essay"
            className="text-xs text-sky-600 underline hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-200"
          >
            → AI 論述添削（午後 II）へ
          </Link>
        </div>
      </section>

      {relatedPosts.length > 0 && (
        <section aria-label="関連学習ガイド" className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-zinc-800 dark:text-zinc-100">
            <BookOpen className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            {label} の学習ガイド
          </h2>
          <ul className="space-y-2">
            {relatedPosts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card p-3.5 text-sm transition-all hover:-translate-y-0.5 hover:border-sky-300/60 hover:shadow-md"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-foreground group-hover:text-sky-600 dark:group-hover:text-sky-400">
                      {p.title}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                      {p.description}
                    </p>
                  </div>
                  <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-sky-600 dark:group-hover:text-sky-400" />
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 text-right">
            <Link
              href="/blog"
              className="text-xs text-sky-600 hover:underline dark:text-sky-400"
            >
              学習ガイド一覧を見る →
            </Link>
          </div>
        </section>
      )}
    </main>
  );
}
