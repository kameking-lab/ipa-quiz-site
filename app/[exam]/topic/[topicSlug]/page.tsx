import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import type { ExamCode } from "@/lib/questions/types";
import { examLabel, formatYearSeason } from "@/lib/utils";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import {
  getAvailableExams,
  getQuestionsByExamStrict,
  groupByCategory,
} from "@/lib/seo/exam-meta";
import { questionPagePath } from "@/lib/seo/question-url";
import { isPlaceholderExplanation } from "@/lib/questions/filter";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamicParams = false;

interface RouteParams {
  exam: string;
  topicSlug: string;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  const out: RouteParams[] = [];
  for (const exam of getAvailableExams()) {
    const cats = groupByCategory(getQuestionsByExamStrict(exam));
    for (const c of cats) {
      out.push({ exam, topicSlug: c.category });
    }
  }
  return out;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { exam, topicSlug } = await params;
  if (!getAvailableExams().includes(exam as ExamCode)) {
    return { title: "分野が見つかりません", robots: { index: false } };
  }
  const category = decodeURIComponent(topicSlug);
  const title = `${examLabel(exam as ExamCode)} ${category} 過去問・解説`;
  const description = `${examLabel(exam as ExamCode)}試験の「${category}」分野の過去問をまとめて確認できます。AI解説付きで理解を深められます。`;
  return {
    title,
    description,
    alternates: { canonical: `/${exam}/topic/${encodeURIComponent(category)}` },
    openGraph: {
      title,
      description,
      url: `/${exam}/topic/${encodeURIComponent(category)}`,
      type: "website",
      siteName: SITE_NAME,
      locale: "ja_JP",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ExamTopicPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { exam, topicSlug } = await params;
  if (!getAvailableExams().includes(exam as ExamCode)) notFound();
  const category = decodeURIComponent(topicSlug);
  const code = exam as ExamCode;
  const pool = getQuestionsByExamStrict(code)
    .filter((q) => q.category === category)
    .sort((a, b) => (b.year !== a.year ? b.year - a.year : a.qNumber - b.qNumber));
  if (pool.length === 0) notFound();

  const absUrl = `${SITE_BASE_URL}/${exam}/topic/${encodeURIComponent(category)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${examLabel(code)} ${category} 過去問`,
        url: absUrl,
        inLanguage: "ja",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: examLabel(code),
            item: `${SITE_BASE_URL}/${exam}`,
          },
          { "@type": "ListItem", position: 3, name: category, item: absUrl },
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
          <li>
            <Link href={`/${exam}`} className="hover:underline">
              {examLabel(code)}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-zinc-700 dark:text-zinc-300">
            {category}
          </li>
        </ol>
      </nav>

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {examLabel(code)} {category}
        </h1>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <Badge variant="outline">{pool.length}問</Badge>
        </div>
      </header>

      <section aria-label="クイズを始める" className="mb-6">
        <Link
          href={`/quiz?mode=topic&exam=${exam}&category=${encodeURIComponent(category)}`}
          className="block"
        >
          <Button variant="primary" size="lg" className="w-full font-semibold shadow-md">
            この分野でクイズを始める
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>

      <ul className="space-y-2">
        {pool.map((q) => {
          const isPlaceholder = isPlaceholderExplanation(q);
          return (
            <li key={q.id}>
              <Link
                href={questionPagePath(q)}
                className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-3 transition-colors hover:border-sky-400 hover:bg-sky-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-500 dark:hover:bg-zinc-900"
              >
                <span className="flex h-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 px-2 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                  {q.qNumber}
                </span>
                <span className="flex-1 space-y-1">
                  <span className="flex flex-wrap items-center gap-1.5 text-xs">
                    <Badge variant="outline">
                      {formatYearSeason(q.year, q.season)}
                    </Badge>
                    {q.isCalculation && <Badge variant="warn">計算</Badge>}
                    {isPlaceholder && <Badge variant="warn">解説準備中</Badge>}
                  </span>
                  <span className="line-clamp-2 block text-sm text-zinc-800 dark:text-zinc-100">
                    {q.question.slice(0, 140)}
                    {q.question.length > 140 ? "…" : ""}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
