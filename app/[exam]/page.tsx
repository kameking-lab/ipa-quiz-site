import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { ExamCode } from "@/lib/questions/types";
import { examLabel } from "@/lib/utils";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import {
  EXAM_DESCRIPTIONS,
  examTopDescription,
  examTopTitle,
  getAvailableExams,
  getQuestionsByExamStrict,
  groupByCategory,
  groupByYearSeason,
} from "@/lib/seo/exam-meta";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export const dynamicParams = false;

interface RouteParams {
  exam: string;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  return getAvailableExams().map((exam) => ({ exam }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { exam } = await params;
  if (!getAvailableExams().includes(exam as ExamCode)) {
    return { title: "試験区分が見つかりません", robots: { index: false } };
  }
  const code = exam as ExamCode;
  const count = getQuestionsByExamStrict(code).length;
  const title = examTopTitle(code);
  const description = examTopDescription(code, count);
  return {
    title,
    description,
    alternates: { canonical: `/${exam}` },
    openGraph: {
      title,
      description,
      url: `/${exam}`,
      type: "website",
      siteName: SITE_NAME,
      locale: "ja_JP",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ExamTopPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { exam } = await params;
  if (!getAvailableExams().includes(exam as ExamCode)) notFound();
  const code = exam as ExamCode;
  const questions = getQuestionsByExamStrict(code);
  const years = groupByYearSeason(questions);
  const categories = groupByCategory(questions);
  const absUrl = `${SITE_BASE_URL}/${exam}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${absUrl}#collection`,
        name: examTopTitle(code),
        description: examTopDescription(code, questions.length),
        url: absUrl,
        inLanguage: "ja",
        about: examLabel(code),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: examLabel(code),
            item: absUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-10">
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
            {examLabel(code)}
          </li>
        </ol>
      </nav>

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {examLabel(code)} 過去問一覧
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {EXAM_DESCRIPTIONS[code]}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <Badge variant="outline">収録 {questions.length} 問</Badge>
          <Badge variant="outline">{years.length} 期分</Badge>
          <Badge variant="outline">{categories.length} 分野</Badge>
        </div>
      </header>

      <section aria-label="年度別" className="mb-8">
        <h2 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">
          年度別に学習
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {years.map((g) => (
            <li key={g.key}>
              <Link
                href={`/${exam}/${g.key}`}
                className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-3 text-sm transition-colors hover:border-sky-400 hover:bg-sky-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-500 dark:hover:bg-zinc-900"
              >
                <span className="font-medium text-zinc-900 dark:text-zinc-50">
                  {g.label}
                </span>
                <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {g.count}問
                  <ChevronRight className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="分野別" className="mb-8">
        <h2 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">
          分野別に学習
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {categories.map((c) => (
            <li key={c.category}>
              <Link
                href={`/${exam}/topic/${encodeURIComponent(c.category)}`}
                className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white p-3 text-sm transition-colors hover:border-sky-400 hover:bg-sky-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-500 dark:hover:bg-zinc-900"
              >
                <span className="font-medium text-zinc-900 dark:text-zinc-50">
                  {c.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {c.count}問
                  <ChevronRight className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {(() => {
        const hasAm1 = questions.some((q) => q.session === "am1");
        const hasAm2 = questions.some((q) => q.session === "am2");
        const isHighLevel = hasAm1 && hasAm2;

        if (isHighLevel) {
          return (
            <section aria-label="クイズを始める" className="mt-10">
              <h2 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                ランダム出題の範囲を選択
              </h2>
              <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
                高度試験は午前I（共通知識）と午前II（専門知識）に分かれます。
                通常は午前II中心で学習しますが、午前I免除取得前は午前Iも対策推奨。
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                <Link href={`/quiz?mode=random&exam=${exam}&session=am2`} className="block">
                  <Button variant="primary" size="lg" className="w-full font-semibold shadow-md">
                    午前II（推奨）
                  </Button>
                </Link>
                <Link href={`/quiz?mode=random&exam=${exam}&session=am1`} className="block">
                  <Button variant="outline" size="lg" className="w-full">
                    午前I
                  </Button>
                </Link>
                <Link href={`/quiz?mode=random&exam=${exam}`} className="block">
                  <Button variant="outline" size="lg" className="w-full">
                    午前I＋II（両方）
                  </Button>
                </Link>
              </div>
            </section>
          );
        }

        return (
          <section aria-label="クイズを始める" className="mt-10">
            <Link href={`/quiz?mode=random&exam=${exam}`} className="block">
              <Button variant="primary" size="lg" className="w-full font-semibold shadow-md">
                ランダム出題でクイズを始める
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </section>
        );
      })()}
    </main>
  );
}
