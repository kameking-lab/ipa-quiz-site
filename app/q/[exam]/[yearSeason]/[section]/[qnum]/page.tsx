import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

import { ALL_QUESTIONS } from "@/data/questions";
import { examLabelAt } from "@/lib/exam-naming/history";
import { isPlaceholderExplanation } from "@/lib/questions/filter";
import type { ChoiceKey, Question } from "@/lib/questions/types";
import { examLabel, formatYearSeason } from "@/lib/utils";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import {
  findQuestionByRoute,
  questionPagePath,
  type QuestionRouteParams,
} from "@/lib/seo/question-url";
import { AnswerReveal } from "@/components/seo/AnswerReveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { ShareButtons } from "@/components/seo/ShareButtons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const dynamicParams = true;
export const revalidate = 86400;

const SSG_MIN_YEAR = 2024;

export async function generateStaticParams(): Promise<QuestionRouteParams[]> {
  return ALL_QUESTIONS.filter((q) => q.year >= SSG_MIN_YEAR).map((q) => ({
    exam: q.exam,
    yearSeason: `${q.year}-${q.season}`,
    section: q.session,
    qnum: `q${q.qNumber}`,
  }));
}

function sessionLabel(session: string): string {
  const map: Record<string, string> = {
    am: "午前",
    am1: "午前I",
    am2: "午前II",
    pm: "午後",
    pm1: "午後I",
    pm2: "午後II",
    "kamoku-a": "科目A",
    "kamoku-b": "科目B",
  };
  return map[session] ?? session.toUpperCase();
}

function questionTitle(q: Question): string {
  return `${formatYearSeason(q.year, q.season)} ${examLabelAt(q.exam, q.year, q.season)} ${sessionLabel(q.session)} 問${q.qNumber} ${q.category} 解説`;
}

function truncate(s: string, n: number): string {
  return s.length > n ? `${s.slice(0, n)}…` : s;
}

function questionSnippet(q: Question): string {
  const examStr = examLabelAt(q.exam, q.year, q.season);
  const ys = formatYearSeason(q.year, q.season);
  const ss = sessionLabel(q.session);
  const prefix = `【${examStr} ${ys} ${ss} 問${q.qNumber}・${q.category}】`;
  const qPreview = truncate(q.question.replace(/\s+/g, " "), 60);
  const real = !isPlaceholderExplanation(q);
  const tail = real
    ? `正解と解説を掲載。${truncate(q.explanation.replace(/\s+/g, " "), 40)}`
    : "正解と AI コパイロットによる即時解説で理解を深められます。";
  return truncate(`${prefix}${qPreview} ${tail}`, 155);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<QuestionRouteParams>;
}): Promise<Metadata> {
  const p = await params;
  const q = findQuestionByRoute(ALL_QUESTIONS, p);
  if (!q) {
    return { title: "問題が見つかりません", robots: { index: false, follow: false } };
  }
  const title = questionTitle(q);
  const description = questionSnippet(q);
  const canonical = questionPagePath(q);
  const indexable = !isPlaceholderExplanation(q);

  return {
    title,
    description,
    alternates: { canonical },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      siteName: SITE_NAME,
      locale: "ja_JP",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<QuestionRouteParams>;
}) {
  const p = await params;
  const q = findQuestionByRoute(ALL_QUESTIONS, p);
  if (!q) notFound();

  const answerKey = Array.isArray(q.answer) ? q.answer[0] : q.answer;
  const answerText =
    q.choices && answerKey in q.choices
      ? q.choices[answerKey as ChoiceKey]
      : undefined;
  const showRealExplanation = !isPlaceholderExplanation(q);

  const sessionPool = ALL_QUESTIONS.filter(
    (x) =>
      x.exam === q.exam &&
      x.year === q.year &&
      x.season === q.season &&
      x.session === q.session,
  ).sort((a, b) => a.qNumber - b.qNumber);
  const idx = sessionPool.findIndex((x) => x.id === q.id);
  const prev = idx > 0 ? sessionPool[idx - 1] : null;
  const next = idx >= 0 && idx < sessionPool.length - 1 ? sessionPool[idx + 1] : null;

  const related = ALL_QUESTIONS.filter(
    (x) => x.id !== q.id && x.exam === q.exam && x.category === q.category,
  ).slice(0, 5);

  const pageUrlAbs = `${SITE_BASE_URL}${questionPagePath(q)}`;
  const examPath = `/${q.exam}`;
  const yearSeasonPath = `${examPath}/${q.year}-${q.season}`;
  const title = questionTitle(q);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Quiz",
        "@id": `${pageUrlAbs}#quiz`,
        name: `${formatYearSeason(q.year, q.season)} ${examLabelAt(q.exam, q.year, q.season)} ${sessionLabel(q.session)} 問${q.qNumber}`,
        about: examLabelAt(q.exam, q.year, q.season),
        educationalLevel: "professional",
        inLanguage: "ja",
        url: pageUrlAbs,
        hasPart: {
          "@type": "Question",
          "@id": `${pageUrlAbs}#question`,
          name: q.question.slice(0, 120),
          text: q.question,
          inLanguage: "ja",
          ...(answerText
            ? {
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `${answerKey}: ${answerText}`,
                },
              }
            : {
                acceptedAnswer: {
                  "@type": "Answer",
                  text: String(answerKey),
                },
              }),
          ...(q.choices
            ? {
                suggestedAnswer: Object.entries(q.choices).map(([key, text]) => ({
                  "@type": "Answer",
                  text: `${key}: ${text}`,
                })),
              }
            : {}),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: examLabel(q.exam),
            item: `${SITE_BASE_URL}${examPath}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: formatYearSeason(q.year, q.season),
            item: `${SITE_BASE_URL}${yearSeasonPath}`,
          },
          {
            "@type": "ListItem",
            position: 4,
            name: `問${q.qNumber}`,
            item: pageUrlAbs,
          },
        ],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_BASE_URL}#organization`,
        name: SITE_NAME,
        url: SITE_BASE_URL,
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-10">
      <JsonLd data={jsonLd} />

      {/* Breadcrumb */}
      <nav
        aria-label="パンくずリスト"
        className="mb-5 text-xs text-muted-foreground"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link
              href="/"
              className="transition hover:text-foreground hover:underline"
            >
              ホーム
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">
            /
          </li>
          <li>
            <Link
              href={examPath}
              className="transition hover:text-foreground hover:underline"
            >
              {examLabel(q.exam)}
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">
            /
          </li>
          <li>
            <Link
              href={yearSeasonPath}
              className="transition hover:text-foreground hover:underline"
            >
              {formatYearSeason(q.year, q.season)}
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">
            /
          </li>
          <li aria-current="page" className="font-medium text-foreground">
            問{q.qNumber}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-1.5 text-xs">
          <Badge variant="primary">
            {examLabelAt(q.exam, q.year, q.season)}
          </Badge>
          <Badge variant="soft">{formatYearSeason(q.year, q.season)}</Badge>
          <Badge variant="outline">{sessionLabel(q.session)}</Badge>
          <Badge variant="outline">問 {q.qNumber}</Badge>
          {q.isCalculation && <Badge variant="warn">計算</Badge>}
        </div>
        <h1 className="text-balance text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
          {formatYearSeason(q.year, q.season)} {examLabelAt(q.exam, q.year, q.season)}{" "}
          {sessionLabel(q.session)} 問{q.qNumber}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-sm font-medium text-muted-foreground">
            {q.category}
          </span>
          {q.topicTags.slice(0, 3).map((t) => (
            <Badge key={t} variant="outline" className="text-[10px]">
              #{t}
            </Badge>
          ))}
        </div>
      </header>

      {/* Question body */}
      <section
        aria-label="問題文"
        className="selectable-content rounded-2xl border border-border bg-card p-6 text-base leading-[1.85] text-card-foreground shadow-sm sm:p-7 sm:text-[17px]"
      >
        {q.question.split("\n").map((line, i) => (
          <p key={i} className="mb-3 last:mb-0">
            {line}
          </p>
        ))}
      </section>

      {/* Choices */}
      {q.choices && (
        <section
          aria-label="選択肢"
          className="mt-4 flex flex-col gap-2.5"
        >
          {(Object.entries(q.choices) as [ChoiceKey, string][]).map(([key, text]) => {
            const isAnswer = key === answerKey;
            return (
              <div
                key={key}
                data-answer={isAnswer || undefined}
                className="group relative flex items-start gap-3 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:px-5 sm:py-4"
              >
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-base font-bold text-primary-soft-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
                  {key}
                </span>
                <span className="flex-1 pt-1.5 text-sm leading-relaxed text-card-foreground sm:text-base">
                  {text}
                </span>
              </div>
            );
          })}
        </section>
      )}

      {/* Answer reveal */}
      <section aria-label="正解" className="mt-6">
        <AnswerReveal answer={String(answerKey)} answerText={answerText} />
      </section>

      {/* Explanation (collapsible) */}
      <section aria-label="解説" className="mt-6">
        <details
          open
          className="group overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
        >
          <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 text-base font-bold text-card-foreground [&::-webkit-details-marker]:hidden sm:px-6">
            <span className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary-soft text-primary-soft-foreground">
                <Sparkles className="h-3.5 w-3.5" />
              </span>
              解説
            </span>
            <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition group-open:rotate-180" />
          </summary>
          <div className="border-t border-border px-5 pb-5 pt-4 sm:px-6">
            {showRealExplanation ? (
              <div className="selectable-content text-sm leading-[1.85] text-card-foreground sm:text-base">
                {q.explanation.split("\n").map((line, i) => (
                  <p key={i} className="mb-3 last:mb-0">
                    {line}
                  </p>
                ))}
              </div>
            ) : (
              <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  解説は準備中です。AI コパイロットに詳しい解説を依頼してください。
                </span>
              </div>
            )}
            <div className="mt-5 flex flex-col gap-1.5 border-t border-border pt-3 text-[11px] leading-relaxed text-muted-foreground">
              <p>
                ※ AI 生成の解説は誤りを含む可能性があります。重要な判断は IPA 公式資料でご確認ください。
              </p>
              <a
                href={q.sourcePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1 underline decoration-border underline-offset-2 transition hover:text-foreground"
              >
                出典: IPA 公式 PDF <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </details>
      </section>

      {/* AI Copilot CTA — gradient panel */}
      <section
        aria-label="AI コパイロット"
        className="relative mt-6 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary-soft via-card to-card p-5 shadow-md sm:p-6"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/15 blur-2xl"
        />
        <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-2.5 py-0.5 text-[11px] font-semibold text-primary-soft-foreground">
              <Sparkles className="h-3 w-3" />
              AI コパイロット
            </div>
            <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
              この問題を AI と深掘りする
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              用語解説・選択肢分析・類題生成をその場で対話。クイズモードでは解答→解説がゼロ遷移。
            </p>
          </div>
          <Button asChild variant="gradient" size="lg" className="w-full shrink-0 sm:w-auto">
            <Link
              href={`/quiz?mode=year&exam=${q.exam}&year=${q.year}&season=${q.season}`}
            >
              クイズモードで開く
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Share */}
      <section aria-label="共有" className="mt-8">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          共有
        </h2>
        <ShareButtons url={pageUrlAbs} title={title} />
      </section>

      {/* Prev / Next */}
      <nav
        aria-label="前後の問題"
        className="mt-8 grid grid-cols-2 gap-2.5"
      >
        {prev ? (
          <Link href={questionPagePath(prev)} className="block">
            <Button variant="outline" size="lg" className="w-full justify-start gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span className="flex flex-col items-start leading-tight">
                <span className="text-[10px] font-normal text-muted-foreground">
                  前の問題
                </span>
                <span>問 {prev.qNumber}</span>
              </span>
            </Button>
          </Link>
        ) : (
          <span className="rounded-xl border border-dashed border-border px-4 py-3 text-center text-xs text-muted-foreground">
            最初の問題
          </span>
        )}
        {next ? (
          <Link href={questionPagePath(next)} className="block">
            <Button variant="outline" size="lg" className="w-full justify-end gap-2">
              <span className="flex flex-col items-end leading-tight">
                <span className="text-[10px] font-normal text-muted-foreground">
                  次の問題
                </span>
                <span>問 {next.qNumber}</span>
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <span className="rounded-xl border border-dashed border-border px-4 py-3 text-center text-xs text-muted-foreground">
            最後の問題
          </span>
        )}
      </nav>

      {/* Related */}
      {related.length > 0 && (
        <section aria-label="関連する問題" className="mt-12">
          <div className="mb-4 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                関連する問題
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {q.category} の他の問題
              </p>
            </div>
          </div>
          <ul className="flex flex-col gap-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  href={questionPagePath(r)}
                  className="group block rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="mb-1.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Badge variant="outline" className="text-[10px]">
                      {examLabelAt(r.exam, r.year, r.season)}
                    </Badge>
                    <span>
                      {formatYearSeason(r.year, r.season)} {sessionLabel(r.session)} 問{r.qNumber}
                    </span>
                  </div>
                  <div className="line-clamp-2 text-sm leading-relaxed text-card-foreground transition group-hover:text-primary">
                    {r.question.slice(0, 140)}
                    {r.question.length > 140 ? "…" : ""}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
