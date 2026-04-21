import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles } from "lucide-react";

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

function questionSnippet(q: Question, maxLen = 150): string {
  const head = q.question.replace(/\s+/g, " ").slice(0, maxLen);
  const real = !isPlaceholderExplanation(q);
  const tail = real
    ? q.explanation.replace(/\s+/g, " ").slice(0, 80)
    : "AIコパイロットで詳細な解説を確認できます。";
  return `${head}… ${tail}`.slice(0, 155);
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

      <nav aria-label="パンくずリスト" className="mb-4 text-xs text-zinc-500 dark:text-zinc-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={examPath} className="hover:underline">
              {examLabel(q.exam)}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href={yearSeasonPath} className="hover:underline">
              {formatYearSeason(q.year, q.season)}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-zinc-700 dark:text-zinc-300">
            問{q.qNumber}
          </li>
        </ol>
      </nav>

      <header className="mb-4">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
          <Badge variant="outline">
            {examLabelAt(q.exam, q.year, q.season)} {formatYearSeason(q.year, q.season)}
          </Badge>
          <Badge variant="default">{sessionLabel(q.session)}</Badge>
          <Badge variant="default">問{q.qNumber}</Badge>
          <Badge variant="default">{q.category}</Badge>
          {q.topicTags.slice(0, 3).map((t) => (
            <Badge key={t} variant="outline">
              #{t}
            </Badge>
          ))}
          {q.isCalculation && <Badge variant="warn">計算</Badge>}
        </div>
        <h1 className="text-xl font-bold leading-snug text-zinc-900 dark:text-zinc-50 sm:text-2xl">
          {formatYearSeason(q.year, q.season)} {examLabelAt(q.exam, q.year, q.season)} {sessionLabel(q.session)} 問{q.qNumber}
          <span className="ml-2 text-base font-medium text-zinc-500 dark:text-zinc-400 sm:text-lg">
            {q.category}
          </span>
        </h1>
      </header>

      <section aria-label="問題文" className="selectable-content rounded-2xl border border-zinc-200 bg-white p-5 text-base leading-relaxed text-zinc-900 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50">
        {q.question.split("\n").map((line, i) => (
          <p key={i} className="mb-2 last:mb-0">
            {line}
          </p>
        ))}
      </section>

      {q.choices && (
        <section aria-label="選択肢" className="mt-4 space-y-2">
          {(Object.entries(q.choices) as [ChoiceKey, string][]).map(([key, text]) => (
            <div
              key={key}
              className="flex items-start gap-3 rounded-2xl border-2 border-zinc-200 bg-white px-4 py-4 dark:border-zinc-700 dark:bg-zinc-900"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-sm font-bold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
                {key}
              </span>
              <span className="flex-1 pt-1 text-sm leading-relaxed text-zinc-800 dark:text-zinc-100 sm:text-base">
                {text}
              </span>
            </div>
          ))}
        </section>
      )}

      <section aria-label="正解" className="mt-6">
        <AnswerReveal answer={String(answerKey)} answerText={answerText} />
      </section>

      <section
        aria-label="解説"
        className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
      >
        <h2 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">解説</h2>
        {showRealExplanation ? (
          <div className="selectable-content text-sm leading-relaxed text-zinc-800 dark:text-zinc-100">
            {q.explanation.split("\n").map((line, i) => (
              <p key={i} className="mb-2 last:mb-0">
                {line}
              </p>
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
            解説は準備中です。AI コパイロットに詳しい解説を依頼してください。
          </div>
        )}
        <div className="mt-4 space-y-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
          <p>
            ※ AI生成の解説は誤りを含む可能性があります。重要な判断はIPA公式資料でご確認ください。
          </p>
          <a
            href={q.sourcePdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 underline decoration-zinc-300 underline-offset-2 hover:text-zinc-700 dark:decoration-zinc-700 dark:hover:text-zinc-200"
          >
            出典: IPA 公式 PDF <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </section>

      <section aria-label="AIコパイロット" className="mt-6">
        <Link
          href={`/quiz?mode=year&exam=${q.exam}&year=${q.year}&season=${q.season}`}
          className="block"
        >
          <Button variant="primary" size="lg" className="w-full font-semibold shadow-md">
            <Sparkles className="h-4 w-4" />
            AIに聞く（{formatYearSeason(q.year, q.season)} をクイズモードで開く）
          </Button>
        </Link>
      </section>

      <section aria-label="共有" className="mt-6">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          共有
        </h2>
        <ShareButtons url={pageUrlAbs} title={title} />
      </section>

      <nav aria-label="前後の問題" className="mt-8 grid grid-cols-2 gap-2">
        {prev ? (
          <Link href={questionPagePath(prev)} className="block">
            <Button variant="outline" size="lg" className="w-full">
              <ChevronLeft className="h-4 w-4" />
              問{prev.qNumber}
            </Button>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={questionPagePath(next)} className="block">
            <Button variant="outline" size="lg" className="w-full">
              問{next.qNumber}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <span />
        )}
      </nav>

      {related.length > 0 && (
        <section aria-label="関連する問題" className="mt-10">
          <h2 className="mb-3 text-lg font-bold text-zinc-900 dark:text-zinc-50">
            関連する問題（{q.category}）
          </h2>
          <ul className="space-y-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  href={questionPagePath(r)}
                  className="block rounded-xl border border-zinc-200 bg-white p-3 transition-colors hover:border-sky-400 hover:bg-sky-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-sky-500 dark:hover:bg-zinc-900"
                >
                  <div className="mb-1 text-xs text-zinc-500 dark:text-zinc-400">
                    {examLabelAt(r.exam, r.year, r.season)} {formatYearSeason(r.year, r.season)}{" "}
                    {sessionLabel(r.session)} 問{r.qNumber}
                  </div>
                  <div className="line-clamp-2 text-sm text-zinc-800 dark:text-zinc-100">
                    {r.question.slice(0, 120)}
                    {r.question.length > 120 ? "…" : ""}
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
