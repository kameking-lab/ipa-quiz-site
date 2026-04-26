import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import type { ExamCode } from "@/lib/questions/types";
import { examLabel } from "@/lib/utils";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import {
  EXAM_DESCRIPTIONS,
  examMetaDescription,
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
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ChevronRight, FileEdit, Sparkles, Tags } from "lucide-react";
import { BeginnerGuide } from "@/components/quiz/BeginnerGuide";
import { getAfternoonQuestions } from "@/lib/afternoon/load";
import { getEssayQuestionsByExam } from "@/lib/essay/load";
import type { EssayExamCode } from "@/lib/essay/load";

const ADVANCED_EXAMS = new Set<ExamCode>([
  "st",
  "sa",
  "pm",
  "sm",
  "au",
  "sc",
  "db",
  "nw",
  "es",
]);
const ESSAY_EXAMS = new Set<ExamCode>(["st", "sa", "pm", "sm", "au"]);

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
  const description = examMetaDescription(code, count);
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

  const hasAm1 = questions.some((q) => q.session === "am1");
  const hasAm2 = questions.some((q) => q.session === "am2");
  const isHighLevel = hasAm1 && hasAm2;

  const isAdvanced = ADVANCED_EXAMS.has(code);
  const afternoonCount = isAdvanced ? getAfternoonQuestions(code).length : 0;
  const essayCount = ESSAY_EXAMS.has(code)
    ? getEssayQuestionsByExam(code as EssayExamCode).length
    : 0;

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
            <li aria-current="page" className="text-foreground">
              {examLabel(code)}
            </li>
          </ol>
        </nav>

        <header className="mb-8 animate-fade-in">
          <Badge variant="soft" className="mb-3">
            <Sparkles className="h-3 w-3" />
            {examLabel(code)}
          </Badge>
          <h1 className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            <span className="bg-gradient-to-r from-primary via-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
              {examLabel(code)}
            </span>
            {" "}過去問一覧
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            {EXAM_DESCRIPTIONS[code]}
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Badge variant="outline">収録 {questions.length} 問</Badge>
            <Badge variant="outline">{years.length} 期分</Badge>
            <Badge variant="outline">{categories.length} 分野</Badge>
          </div>
        </header>

        {/* Beginner guide */}
        <section aria-label="ここから始めよう" className="mb-8">
          <BeginnerGuide exam={code} />
        </section>

        {isAdvanced && (afternoonCount > 0 || essayCount > 0) && (
          <section
            aria-labelledby="advanced-coverage-heading"
            className="mb-8"
          >
            <Card className="border-violet-200 bg-violet-50/40 dark:border-violet-900/60 dark:bg-violet-950/20">
              <CardContent className="p-5">
                <h2
                  id="advanced-coverage-heading"
                  className="mb-1 text-sm font-semibold text-violet-900 dark:text-violet-100"
                >
                  高度試験フルカバー
                </h2>
                <p className="mb-4 text-xs leading-relaxed text-violet-800/80 dark:text-violet-200/80">
                  午前 II の四択だけでなく、午後の記述・論述まで AI 採点対応。
                  主要無料サイトでは未対応の高度試験範囲を網羅しています。
                </p>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-xl border border-violet-200 bg-white p-3 dark:border-violet-800/60 dark:bg-zinc-950">
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">午前 (四択)</div>
                    <div className="mt-0.5 text-2xl font-bold tabular-nums text-violet-700 dark:text-violet-300">
                      {questions.length.toLocaleString("ja-JP")}
                      <span className="ml-1 text-sm font-normal">問</span>
                    </div>
                  </div>
                  {afternoonCount > 0 && (
                    <div className="rounded-xl border border-violet-200 bg-white p-3 dark:border-violet-800/60 dark:bg-zinc-950">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">午後 I (記述)</div>
                      <div className="mt-0.5 text-2xl font-bold tabular-nums text-violet-700 dark:text-violet-300">
                        {afternoonCount.toLocaleString("ja-JP")}
                        <span className="ml-1 text-sm font-normal">問</span>
                      </div>
                    </div>
                  )}
                  {essayCount > 0 && (
                    <div className="rounded-xl border border-violet-200 bg-white p-3 dark:border-violet-800/60 dark:bg-zinc-950">
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">午後 II (論述)</div>
                      <div className="mt-0.5 text-2xl font-bold tabular-nums text-violet-700 dark:text-violet-300">
                        {essayCount.toLocaleString("ja-JP")}
                        <span className="ml-1 text-sm font-normal">設問</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {afternoonCount > 0 && (
                    <Button asChild variant="primary" size="sm">
                      <Link href={`/${exam}/afternoon`}>
                        <FileEdit className="h-3.5 w-3.5" />
                        午後 I を解く
                      </Link>
                    </Button>
                  )}
                  {essayCount > 0 && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/essay/${exam}`}>
                        <Sparkles className="h-3.5 w-3.5" />
                        午後 II 論述を AI 添削
                      </Link>
                    </Button>
                  )}
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/demo/afternoon">
                      採点デモを見る
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        )}

        {/* Random quiz CTA */}
        <section aria-label="クイズを始める" className="mb-10">
          {isHighLevel ? (
            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6">
              <h2 className="mb-1 text-sm font-semibold text-foreground">
                ランダム出題の範囲を選択
              </h2>
              <p className="mb-4 text-xs text-muted-foreground">
                高度試験は午前 I（共通知識）と午前 II（専門知識）に分かれます。
                通常は午前 II 中心で学習しますが、午前 I 免除取得前は午前 I も対策推奨。
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                <Button asChild variant="gradient" size="lg" className="font-semibold">
                  <Link href={`/quiz?mode=random&exam=${exam}&session=am2`}>
                    午前 II（推奨）
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/quiz?mode=random&exam=${exam}&session=am1`}>
                    午前 I
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href={`/quiz?mode=random&exam=${exam}`}>午前 I＋II</Link>
                </Button>
              </div>
            </div>
          ) : (
            <Button
              asChild
              variant="gradient"
              size="xl"
              className="w-full font-semibold shadow-md hover:shadow-lg"
            >
              <Link href={`/quiz?mode=random&exam=${exam}`}>
                ランダム出題でクイズを始める
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </section>

        {/* By year */}
        <section aria-label="年度別" className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-soft-foreground">
              <Calendar className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-foreground">年度別に学習</h2>
              <p className="text-xs text-muted-foreground">
                実施年度ごとに問題を絞り込み
              </p>
            </div>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {years.map((g) => (
              <li key={g.key}>
                <Link
                  href={`/${exam}/${g.key}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card p-3.5 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <span className="font-medium text-foreground">
                    {g.label}
                  </span>
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-muted px-2 py-0.5 font-semibold">
                      {g.count}問
                    </span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* By category */}
        <section aria-label="分野別" className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-soft-foreground">
              <Tags className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-foreground">分野別に学習</h2>
              <p className="text-xs text-muted-foreground">
                テーマ別に弱点を強化
              </p>
            </div>
          </div>
          <ul className="grid gap-2 sm:grid-cols-2">
            {categories.map((c) => (
              <li key={c.category}>
                <Link
                  href={`/${exam}/topic/${encodeURIComponent(c.category)}`}
                  className="group flex items-center justify-between rounded-xl border border-border bg-card p-3.5 text-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <span className="font-medium text-foreground">
                    {c.category}
                  </span>
                  <span className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded-full bg-muted px-2 py-0.5 font-semibold">
                      {c.count}問
                    </span>
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
