import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import type { ExamCode, Season } from "@/lib/questions/types";
import { examLabel, formatYearSeason } from "@/lib/utils";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import {
  getAvailableExams,
  getQuestionsByExamStrict,
  groupByYearSeason,
} from "@/lib/seo/exam-meta";
import { questionPagePath } from "@/lib/seo/question-url";
import { isPlaceholderExplanation } from "@/lib/questions/filter";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamicParams = false;

interface RouteParams {
  exam: string;
  yearSeason: string;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  const out: RouteParams[] = [];
  for (const exam of getAvailableExams()) {
    const groups = groupByYearSeason(getQuestionsByExamStrict(exam));
    for (const g of groups) {
      out.push({ exam, yearSeason: g.key });
    }
  }
  return out;
}

function parseYearSeason(slug: string): { year: number; season: Season } | null {
  const m = /^(\d{4})-(spring|autumn|cbt)$/.exec(slug);
  if (!m) return null;
  return { year: Number(m[1]), season: m[2] as Season };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { exam, yearSeason } = await params;
  if (!getAvailableExams().includes(exam as ExamCode)) {
    return { title: "年度が見つかりません", robots: { index: false } };
  }
  const parsed = parseYearSeason(yearSeason);
  if (!parsed) return { title: "年度が見つかりません", robots: { index: false } };
  const label = formatYearSeason(parsed.year, parsed.season);
  const title = `${label} ${examLabel(exam as ExamCode)} 過去問一覧`;
  const description = `${label}に実施された${examLabel(exam as ExamCode)}試験の全問題を一覧で確認できます。AI解説付きで効率的に学習を進められます。`;
  return {
    title,
    description,
    alternates: { canonical: `/${exam}/${yearSeason}` },
    openGraph: {
      title,
      description,
      url: `/${exam}/${yearSeason}`,
      type: "website",
      siteName: SITE_NAME,
      locale: "ja_JP",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ExamYearSeasonPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { exam, yearSeason } = await params;
  if (!getAvailableExams().includes(exam as ExamCode)) notFound();
  const parsed = parseYearSeason(yearSeason);
  if (!parsed) notFound();

  const code = exam as ExamCode;
  const all = getQuestionsByExamStrict(code);
  const pool = all
    .filter((q) => q.year === parsed.year && q.season === parsed.season)
    .sort((a, b) => (a.session === b.session ? a.qNumber - b.qNumber : a.session.localeCompare(b.session)));
  if (pool.length === 0) notFound();

  const label = formatYearSeason(parsed.year, parsed.season);
  const absUrl = `${SITE_BASE_URL}/${exam}/${yearSeason}`;

  // Group by session for display (am / pm / etc.)
  const sessionGroups = new Map<string, typeof pool>();
  for (const q of pool) {
    if (!sessionGroups.has(q.session)) sessionGroups.set(q.session, []);
    sessionGroups.get(q.session)!.push(q);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${label} ${examLabel(code)} 過去問一覧`,
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
          { "@type": "ListItem", position: 3, name: label, item: absUrl },
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
            {label}
          </li>
        </ol>
      </nav>

      <header className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          {label} {examLabel(code)} 過去問一覧
        </h1>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <Badge variant="outline">{pool.length}問</Badge>
        </div>
      </header>

      <section aria-label="クイズを始める" className="mb-6">
        <Link
          href={`/quiz?mode=year&exam=${exam}&year=${parsed.year}&season=${parsed.season}`}
          className="block"
        >
          <Button variant="primary" size="lg" className="w-full font-semibold shadow-md">
            この年度でクイズを始める
            <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>

      {[...sessionGroups.entries()].map(([session, items]) => (
        <section key={session} aria-label={session} className="mb-6">
          <h2 className="mb-2 text-sm font-semibold text-zinc-700 dark:text-zinc-200">
            {session.toUpperCase()}
          </h2>
          <ul className="space-y-2">
            {items.map((q) => {
              const isPlaceholder = isPlaceholderExplanation(q);
              return (
                <li key={q.id}>
                  <Link
                    href={questionPagePath(q)}
                    className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-3 transition-colors hover:border-sky-400 hover:bg-sky-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-500 dark:hover:bg-zinc-900"
                  >
                    <span className="flex h-6 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-xs font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                      問{q.qNumber}
                    </span>
                    <span className="flex-1 space-y-1">
                      <span className="flex flex-wrap items-center gap-1.5 text-xs">
                        <Badge variant="default">{q.category}</Badge>
                        {q.isCalculation && <Badge variant="warn">計算</Badge>}
                        {isPlaceholder && (
                          <Badge variant="warn">解説準備中</Badge>
                        )}
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
        </section>
      ))}
    </main>
  );
}
