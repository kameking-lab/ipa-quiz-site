import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Sparkles } from "lucide-react";

import type { ExamCode, Season } from "@/lib/questions/types";
import { examLabelAt } from "@/lib/exam-naming/history";
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
import {
  QuestionListWithFilter,
  type SessionGroup,
} from "./QuestionListWithFilter";

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
  const histLabel = examLabelAt(exam as ExamCode, parsed.year, parsed.season);
  const title = `${label} ${histLabel} 過去問一覧`;
  const description = `${label}に実施された${histLabel}試験の全問題を一覧で確認できます。AI解説付きで効率的に学習を進められます。`;
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
  const histLabel = examLabelAt(code, parsed.year, parsed.season);
  const absUrl = `${SITE_BASE_URL}/${exam}/${yearSeason}`;

  const sessionMap = new Map<string, typeof pool>();
  for (const q of pool) {
    if (!sessionMap.has(q.session)) sessionMap.set(q.session, []);
    sessionMap.get(q.session)!.push(q);
  }
  const sessionGroups: SessionGroup[] = [...sessionMap.entries()].map(
    ([session, items]) => ({
      session,
      items: items.map((q) => ({
        id: q.id,
        qNumber: q.qNumber,
        category: q.category,
        isCalculation: !!q.isCalculation,
        isPlaceholder: isPlaceholderExplanation(q),
        questionPreview:
          q.question.length > 140
            ? `${q.question.slice(0, 140)}…`
            : q.question,
        href: questionPagePath(q),
      })),
    }),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${label} ${histLabel} 過去問一覧`,
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
    <main className="relative flex-1">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-spotlight"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-grid opacity-30 [mask-image:radial-gradient(60%_50%_at_50%_0%,#000_30%,transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-3xl px-4 pb-20 pt-6 sm:px-6 sm:pt-10">
        <JsonLd data={jsonLd} />

        <nav
          aria-label="パンくずリスト"
          className="mb-4 text-xs text-muted-foreground"
        >
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-foreground hover:underline">
                ホーム
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href={`/${exam}`}
                className="hover:text-foreground hover:underline"
              >
                {examLabel(code)}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-foreground">
              {label}
            </li>
          </ol>
        </nav>

        <header className="mb-8 animate-fade-in">
          <Badge variant="soft" className="mb-3">
            <Sparkles className="h-3 w-3" />
            {histLabel}
          </Badge>
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {label}
            </span>{" "}
            {histLabel}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            過去問一覧 — AI 解説付きで効率的に学習を進められます。
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Badge variant="outline">{pool.length} 問</Badge>
          </div>
        </header>

        <section aria-label="クイズを始める" className="mb-8">
          <Button
            asChild
            variant="gradient"
            size="xl"
            className="w-full font-semibold shadow-md hover:shadow-lg"
          >
            <Link
              href={`/quiz?mode=year&exam=${exam}&year=${parsed.year}&season=${parsed.season}`}
            >
              この年度でクイズを始める
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>

        <QuestionListWithFilter groups={sessionGroups} />
      </div>
    </main>
  );
}
