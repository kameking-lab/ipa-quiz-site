import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, ChevronLeft, Shield } from "lucide-react";

import { AiContentNotice } from "@/components/AiContentNotice";

import { getRelatedBlogPosts } from "@/lib/blog/related-content";

import { ViewTracker } from "@/components/analytics/ViewTracker";
import { JsonLd } from "@/components/seo/JsonLd";

import {
  ESSAY_EXAM_CODES,
  getEssayQuestionsByExam,
  isEssayExamCode,
  parseYearSeason,
} from "@/lib/essays/load";
import { examLabel } from "@/lib/utils";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";

import EssayIndustryTabs from "./_components/EssayIndustryTabs";

interface RouteParams {
  exam: string;
  yearSeason: string;
  section: string;
  qnum: string;
}

function resolveQuestion(params: RouteParams) {
  if (!isEssayExamCode(params.exam)) return null;
  if (params.section !== "pm2") return null;

  const parsed = parseYearSeason(params.yearSeason);
  if (!parsed) return null;

  const qNumMatch = params.qnum.match(/^q(\d+)$/);
  if (!qNumMatch) return null;
  const qNumber = parseInt(qNumMatch[1], 10);

  const question = getEssayQuestionsByExam(params.exam).find(
    (q) =>
      q.year === parsed.year &&
      q.season === parsed.season &&
      q.qNumber === qNumber
  );
  return question ?? null;
}

export function generateStaticParams(): RouteParams[] {
  const out: RouteParams[] = [];
  for (const exam of ESSAY_EXAM_CODES) {
    for (const q of getEssayQuestionsByExam(exam)) {
      out.push({
        exam,
        yearSeason: `${q.year}-${q.season}`,
        section: "pm2",
        qnum: `q${q.qNumber}`,
      });
    }
  }
  return out;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const resolved = await params;
  const question = resolveQuestion(resolved);
  if (!question) {
    return { title: "ページが見つかりません", robots: { index: false } };
  }
  const seasonLabel = question.season === "spring" ? "春" : "秋";
  const canonical = `/essays/${resolved.exam}/${resolved.yearSeason}/${resolved.section}/${resolved.qnum}`;
  const title = `${question.theme} | ${examLabel(resolved.exam)} 午後II 業種別合格答案 ${question.year}年${seasonLabel}期`;
  const description = `${examLabel(resolved.exam)} ${question.year}年${seasonLabel}期 午後II 問${question.qNumber}「${question.theme}」の業種別合格答案サンプル。業種別の論述例（序論・本論・結論）を掲載。AI 生成の参考例（査読推奨）。`;
  const ogImageUrl = `${SITE_BASE_URL}/api/og?${new URLSearchParams({ type: "essay", title: title.slice(0, 80) }).toString()}`;
  return {
    title,
    description,
    alternates: { canonical },
    // 致命傷③: AI生成の架空の参考答案なので検索インデックス対象外。
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      siteName: SITE_NAME,
      locale: "ja_JP",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function EssayPm2DetailPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const resolved = await params;
  const question = resolveQuestion(resolved);
  if (!question) notFound();

  const seasonLabel = question.season === "spring" ? "春" : "秋";
  const canonical = `/essays/${resolved.exam}/${resolved.yearSeason}/${resolved.section}/${resolved.qnum}`;
  const pageUrl = `${SITE_BASE_URL}${canonical}`;
  const examName = examLabel(resolved.exam);
  const relatedPosts = getRelatedBlogPosts(resolved.exam, 2);
  const title = `${question.theme} | ${examName} 午後II 業種別合格答案 ${question.year}年${seasonLabel}期`;
  const description = `${examName} ${question.year}年${seasonLabel}期 午後II 問${question.qNumber}「${question.theme}」の業種別合格答案サンプル。業種別の論述例（序論・本論・結論）を掲載。AI 生成の参考例（査読推奨）。`;
  const datePublished = `${question.year}-${question.season === "spring" ? "04" : "10"}-01`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: title,
        description,
        url: pageUrl,
        inLanguage: "ja",
        datePublished,
        dateModified: datePublished,
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
        mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
        about: `${examName} 午後II 問${question.qNumber} ${question.theme}`,
      },
      {
        "@type": "LearningResource",
        "@id": `${pageUrl}#learning-resource`,
        name: title,
        description,
        inLanguage: "ja",
        learningResourceType: "Sample response",
        educationalUse: "Self-study",
        teaches: `${examName} 午後II 論述試験 ${question.theme}`,
        isAccessibleForFree: true,
        publisher: {
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
            name: `${examName} 業種別合格答案`,
            item: `${SITE_BASE_URL}/essays/${resolved.exam}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${question.year}年${seasonLabel}期 問${question.qNumber}`,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-6 sm:px-6">
      <JsonLd data={jsonLd} />
      <ViewTracker
        event="essay_viewed"
        props={{
          exam: resolved.exam,
          year: question.year,
          season: question.season,
          q_number: question.qNumber,
        }}
      />
      <Link
        href={`/essays/${resolved.exam}`}
        className="print:hidden mb-4 inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        <ChevronLeft className="h-3 w-3" />
        {examLabel(resolved.exam)} 業種別合格答案
      </Link>

      <header className="mb-6">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] font-semibold text-sky-700 dark:bg-sky-950 dark:text-sky-300">
            <Shield className="h-3 w-3" />
            {examLabel(resolved.exam)} 午後 II 問{question.qNumber}
          </span>
          <span className="text-xs text-zinc-500">
            {question.year}年{seasonLabel}期
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {question.theme}
        </h1>
      </header>

      <AiContentNotice
        className="mb-6"
        headline="AI生成の参考答案（架空）"
        body="IPA公式の合格答案ではありません。論述構成を学ぶために過去問AIが生成した架空の参考例で、合格を保証するものではありません。論述の骨格・業種事例の参考としてご活用ください。"
      />

      <section className="mb-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
        <h2 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          <BookOpen className="h-3.5 w-3.5" />
          問題概要
        </h2>
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {question.context.split("\n")[0]}
        </p>
        <details className="mt-2">
          <summary className="cursor-pointer text-xs text-sky-600 hover:underline dark:text-sky-400">
            全文を表示
          </summary>
          <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {question.context}
          </div>
        </details>
      </section>

      <EssayIndustryTabs
        industries={question.industries}
        pdfUrl={question.pdfUrl}
      />

      <div className="print:hidden mt-8 rounded-2xl border border-violet-200/70 bg-gradient-to-br from-violet-50 via-card to-card p-5 dark:border-violet-900/40 dark:from-violet-950/40">
        <h2 className="mb-2 text-base font-bold">自分の答案を AI で採点してみる</h2>
        <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
          上記の答案例を参考に論述を書いたら、AI 添削で「適合度・論理性・具体性・業種事例」の4軸でフィードバックを受けましょう。
        </p>
        <Link
          href="/essay"
          className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600"
        >
          AI 論述添削を試す →
        </Link>
      </div>

      {relatedPosts.length > 0 && (
        <section aria-label="関連学習ガイド" className="print:hidden mt-8">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            <BookOpen className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            {examName} の学習ガイド
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
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                      {p.description}
                    </p>
                  </div>
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-sky-600 dark:group-hover:text-sky-400" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Print-only attribution */}
      <div className="print-only hidden mt-8 border-t border-gray-300 pt-4 text-[10pt] text-gray-600">
        <p>過去問AI（https://www.kakomon-ai.jp{canonical}）より印刷</p>
        <p className="mt-1">出典: IPA 情報処理技術者試験（https://www.ipa.go.jp/shiken/） IPA の過去問は IPA が著作権を保有し、非商用・教育目的での利用が認められています。</p>
      </div>
    </main>
  );
}
