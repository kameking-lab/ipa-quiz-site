import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
} from "lucide-react";

import { ALL_QUESTIONS } from "@/data/questions";
import { getOfficialAnswerPdfUrl } from "@/lib/exam-config";
import { examLabelAt } from "@/lib/exam-naming/history";
import { isPlaceholderExplanation } from "@/lib/questions/filter";
import {
  formatLastUpdatedJa,
  getLastUpdatedISO,
} from "@/lib/questions/last-updated";
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
import { QuestionVideoButton } from "@/components/motivation/QuestionVideoButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExplanationLayers } from "@/components/quiz/ExplanationLayers";
import { QuestionBody } from "@/components/quiz/QuestionBody";
import { AiTransparencyDisclaimer } from "@/components/quiz/AiTransparencyDisclaimer";
import { CategoryStudyTip } from "@/components/quiz/CategoryStudyTip";
import { DifficultyMeter } from "@/components/quiz/DifficultyMeter";
import { InlineBookHint } from "@/components/quiz/InlineBookHint";
import { QuestionFeedback } from "@/components/quiz/QuestionFeedback";
import { getCategoryTip } from "@/lib/seo/category-tips";
import { topicTagToSlug } from "@/lib/seo/topics";

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

function findFallbackQuestion(p: QuestionRouteParams): Question | undefined {
  const yearSeasonMatch = /^(\d{4})-(spring|autumn|cbt)$/.exec(p.yearSeason);
  if (!yearSeasonMatch) return undefined;
  const year = Number(yearSeasonMatch[1]);
  const qMatch = /^q(\d+)$/.exec(p.qnum);
  if (!qMatch) return undefined;
  const qNumber = Number(qMatch[1]);

  return ALL_QUESTIONS.find(
    (q) =>
      q.exam === p.exam &&
      q.year === year &&
      q.session === p.section &&
      q.qNumber === qNumber,
  );
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<QuestionRouteParams>;
}) {
  const p = await params;
  const q = findQuestionByRoute(ALL_QUESTIONS, p);
  if (!q) {
    const fallback = findFallbackQuestion(p);
    if (fallback) redirect(questionPagePath(fallback));
    // No question and no fallback: this URL points at nothing real.
    // Return a real 404 so search engines drop the URL instead of treating
    // the 200-with-"準備中" shell as a near-duplicate of the homepage.
    notFound();
  }

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

  const tagSet = new Set(q.topicTags);
  const crossExamByTopic =
    q.topicTags.length > 0
      ? ALL_QUESTIONS.filter(
          (x) =>
            x.id !== q.id &&
            x.exam !== q.exam &&
            x.topicTags.some((t) => tagSet.has(t)),
        ).slice(0, 5)
      : [];

  const pageUrlAbs = `${SITE_BASE_URL}${questionPagePath(q)}`;
  const examPath = `/${q.exam}`;
  const yearSeasonPath = `${examPath}/${q.year}-${q.season}`;
  const title = questionTitle(q);
  const lastUpdatedISO = getLastUpdatedISO(q);
  const lastUpdatedJa = formatLastUpdatedJa(lastUpdatedISO);

  const questionEntity = {
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
  };

  const tip = getCategoryTip(q.category);

  const faqEntries = [
    {
      q: `${formatYearSeason(q.year, q.season)} ${examLabelAt(q.exam, q.year, q.season)} ${sessionLabel(q.session)} 問${q.qNumber} の正解は？`,
      a: answerText
        ? `正解は「${answerKey}: ${answerText}」です。`
        : `正解は「${answerKey}」です。`,
    },
    {
      q: `この問題はどの分野から出題されていますか？`,
      a: `${examLabelAt(q.exam, q.year, q.season)} の「${q.category}」分野から出題されています。${
        q.topicTags.length > 0
          ? `関連キーワード: ${q.topicTags.slice(0, 5).join("・")}。`
          : ""
      }`,
    },
    {
      q: `「${q.category}」分野を効率的に学ぶには？`,
      a: tip.howToStudy,
    },
  ];
  if (showRealExplanation) {
    faqEntries.push({
      q: `この問題の解説を要約すると？`,
      a: truncate(q.explanation.replace(/\s+/g, " "), 200),
    });
  }

  const learningResource = {
    "@type": "LearningResource",
    "@id": `${pageUrlAbs}#learning-resource`,
    name: title,
    inLanguage: "ja",
    learningResourceType: "Practice problem",
    educationalLevel: "Professional",
    educationalUse: "Self-study",
    teaches: q.category,
    keywords: [
      examLabel(q.exam),
      examLabelAt(q.exam, q.year, q.season),
      q.category,
      ...q.topicTags,
    ].join(", "),
    isAccessibleForFree: true,
    license: "https://www.ipa.go.jp/shiken/mondai-kaiotu.html",
    creator: {
      "@type": "Organization",
      name: "情報処理推進機構 (IPA)",
      url: "https://www.ipa.go.jp/",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${SITE_BASE_URL}#organization`,
    },
  };

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${pageUrlAbs}#faq`,
    mainEntity: faqEntries.map((entry) => ({
      "@type": "Question",
      name: entry.q,
      acceptedAnswer: { "@type": "Answer", text: entry.a },
    })),
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "QAPage",
        "@id": `${pageUrlAbs}#qapage`,
        url: pageUrlAbs,
        inLanguage: "ja",
        mainEntity: questionEntity,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${SITE_BASE_URL}#website`,
          name: SITE_NAME,
          url: SITE_BASE_URL,
        },
      },
      {
        "@type": "Quiz",
        "@id": `${pageUrlAbs}#quiz`,
        name: `${formatYearSeason(q.year, q.season)} ${examLabelAt(q.exam, q.year, q.season)} ${sessionLabel(q.session)} 問${q.qNumber}`,
        about: examLabelAt(q.exam, q.year, q.season),
        educationalLevel: "professional",
        inLanguage: "ja",
        url: pageUrlAbs,
        dateModified: lastUpdatedISO,
        hasPart: questionEntity,
      },
      learningResource,
      faqPage,
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
        "@type": "EducationalOrganization",
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
          <Link
            href={`/${q.exam}/topic/${encodeURIComponent(q.category)}`}
            className="text-sm font-medium text-muted-foreground transition hover:text-primary hover:underline"
          >
            {q.category}
          </Link>
          {q.topicTags.slice(0, 3).map((t) => (
            <Link
              key={t}
              href={`/topics/${encodeURIComponent(topicTagToSlug(t))}`}
              className="inline-flex items-center rounded-full border border-border bg-card px-2 py-0.5 text-[10px] text-muted-foreground transition hover:border-primary/40 hover:text-primary"
            >
              #{t}
            </Link>
          ))}
        </div>
        <div className="mt-3">
          <DifficultyMeter difficulty={q.difficulty} />
        </div>
      </header>

      {/* Figure-bearing notice — text-only fallback hint */}
      {q.hasImage && (
        <aside
          aria-label="図表に関する注釈"
          className="mb-3 flex items-start gap-2.5 rounded-xl border border-amber-300/70 bg-amber-50 p-3.5 text-[13px] leading-relaxed text-amber-900 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-100"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <div className="space-y-1">
            <p>
              この問題には図表が含まれます。図表は権利上の都合で本サイトには
              掲載していません。下のリンクから IPA 公式 PDF でご確認ください。
            </p>
            <a
              href={q.sourcePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold underline decoration-amber-400 underline-offset-4 hover:text-amber-700 dark:hover:text-amber-200"
            >
              IPA 公式 PDF で図表を見る
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </aside>
      )}

      {/* Question body */}
      <section
        aria-label="問題文"
        className="selectable-content rounded-2xl border border-border bg-card p-6 text-base leading-[1.85] text-card-foreground shadow-sm sm:p-7 sm:text-[17px]"
      >
        <QuestionBody text={q.question} />
      </section>

      {/* Choices */}
      {q.choices && (
        <section aria-label="選択肢" className="mt-5 flex flex-col gap-3">
          <h2 className="sr-only">選択肢</h2>
          {(Object.entries(q.choices) as [ChoiceKey, string][]).map(([key, text]) => {
            const isAnswer = key === answerKey;
            return (
              <div
                key={key}
                data-answer={isAnswer || undefined}
                className="group relative flex items-start gap-4 rounded-2xl border border-border bg-card px-4 py-5 shadow-sm transition duration-150 ease-out hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-md active:translate-y-0 sm:px-5"
              >
                <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-lg font-bold text-primary-soft-foreground transition group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground sm:h-11 sm:w-11">
                  {key}
                </span>
                <span className="flex-1 pt-1 text-[15px] leading-[1.7] text-card-foreground sm:text-base sm:leading-[1.75]">
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

      {/* Explanation — 3-layer structured */}
      <section aria-label="解説" className="mt-8">
        <details open className="group">
          <summary className="mb-3 flex cursor-pointer items-center justify-between gap-4 [&::-webkit-details-marker]:hidden">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-violet-500 text-primary-foreground shadow-sm">
                <BookOpenCheck className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                  解説
                </h2>
                {showRealExplanation && (
                  <p className="text-[11px] text-muted-foreground">
                    結論 → 詳細 → 補足 の 3 層構成
                  </p>
                )}
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition group-open:bg-muted">
              <ChevronDown className="h-3.5 w-3.5 transition group-open:rotate-180" />
              <span className="group-open:hidden">展開</span>
              <span className="hidden group-open:inline">閉じる</span>
            </span>
          </summary>

          {showRealExplanation ? (
            <ExplanationLayers explanation={q.explanation} />
          ) : (
            <div className="flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                解説は準備中です。AI コパイロットに詳しい解説を依頼してください。
              </span>
            </div>
          )}

          {showRealExplanation && (
            <div className="mt-4">
              <QuestionFeedback questionId={q.id} />
            </div>
          )}

          <AiTransparencyDisclaimer />

          <div className="mt-4 flex flex-col gap-1.5 rounded-xl border border-dashed border-border bg-muted/30 p-3 text-[11px] leading-relaxed text-muted-foreground">
            <p>
              ※ AI 生成の解説は誤りを含む可能性があります。重要な判断は IPA 公式資料でご確認ください。
            </p>
            <p>
              最終更新:{" "}
              <time dateTime={lastUpdatedISO} className="font-medium text-foreground">
                {lastUpdatedJa}
              </time>
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <a
                href={q.sourcePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 transition hover:decoration-primary"
              >
                出典: IPA 問題 PDF
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href={getOfficialAnswerPdfUrl(q.sourcePdfUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-1 font-medium text-foreground underline decoration-border underline-offset-4 transition hover:decoration-primary"
              >
                IPA 公式解答 PDF
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </details>
      </section>

      {/* Category-level study guidance */}
      <CategoryStudyTip
        category={q.category}
        exam={q.exam}
        topicTags={q.topicTags}
      />

      {/* Inline book recommendation tied to the category */}
      <InlineBookHint exam={q.exam} category={q.category} />

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
        <div className="relative mt-4 border-t border-primary/15 pt-3">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            AIに質問できる例
          </p>
          <ul aria-label="AIへの質問例" className="flex flex-wrap gap-1.5">
            {[
              "この選択肢の違いは？",
              "用語をやさしく解説して",
              `${q.category}の前提知識を整理して`,
              "実例で教えて",
              "類題を1問つくって",
              "覚え方を教えて",
            ].map((label) => (
              <li key={label}>
                <Link
                  href={`/quiz?mode=year&exam=${q.exam}&year=${q.year}&season=${q.season}#q${q.qNumber}`}
                  className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-card px-2.5 py-1 text-xs text-foreground transition hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary-soft"
                >
                  <Sparkles className="h-3 w-3 text-primary" aria-hidden="true" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Share */}
      <section aria-label="共有" className="mt-8">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          共有
        </h2>
        <ShareButtons url={pageUrlAbs} title={title} />
      </section>

      {/* Short-form video */}
      <section aria-label="ショート動画" className="mt-6">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          ショート動画
        </h2>
        <QuestionVideoButton
          examLabel={examLabelAt(q.exam, q.year, q.season)}
          yearSeason={formatYearSeason(q.year, q.season)}
          questionText={q.question}
          answerText={
            answerText
              ? `${answerKey}：${answerText}`
              : String(answerKey)
          }
          explanationSummary={
            showRealExplanation
              ? q.explanation
              : "解説は準備中。クイズモードでAIに質問できます。"
          }
          filename={`ipa-quiz-${q.exam}-${q.year}${q.season}-q${q.qNumber}.webm`}
        />
      </section>

      {/* Prev / Next — desktop & tablet inline, mobile sticky */}
      <nav
        aria-label="前後の問題"
        className="mt-8 hidden grid-cols-2 gap-3 sm:grid"
      >
        {prev ? (
          <Link href={questionPagePath(prev)} className="block">
            <Button
              variant="outline"
              size="lg"
              className="h-auto w-full justify-start gap-3 py-3 text-left"
            >
              <ChevronLeft className="h-4 w-4 shrink-0" />
              <span className="flex min-w-0 flex-col items-start leading-tight">
                <span className="text-[10px] font-normal uppercase tracking-wider text-muted-foreground">
                  前の問題
                </span>
                <span className="truncate">問 {prev.qNumber}</span>
              </span>
            </Button>
          </Link>
        ) : (
          <span className="flex flex-col items-start gap-0.5 rounded-xl border border-dashed border-border px-4 py-3 text-left">
            <span className="text-[10px] font-normal uppercase tracking-wider text-muted-foreground">
              前の問題
            </span>
            <span className="text-xs text-muted-foreground">最初の問題です</span>
          </span>
        )}
        {next ? (
          <Link href={questionPagePath(next)} className="block">
            <Button
              variant="outline"
              size="lg"
              className="h-auto w-full justify-end gap-3 py-3 text-right"
            >
              <span className="flex min-w-0 flex-col items-end leading-tight">
                <span className="text-[10px] font-normal uppercase tracking-wider text-muted-foreground">
                  次の問題
                </span>
                <span className="truncate">問 {next.qNumber}</span>
              </span>
              <ChevronRight className="h-4 w-4 shrink-0" />
            </Button>
          </Link>
        ) : (
          <span className="flex flex-col items-end gap-0.5 rounded-xl border border-dashed border-border px-4 py-3 text-right">
            <span className="text-[10px] font-normal uppercase tracking-wider text-muted-foreground">
              次の問題
            </span>
            <span className="text-xs text-muted-foreground">最後の問題です</span>
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

      {/* Cross-exam related — by shared topicTags */}
      {crossExamByTopic.length > 0 && (
        <section aria-label="他試験の同テーマ問題" className="mt-10">
          <div className="mb-4">
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              他試験の同テーマ問題
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              トピック「{q.topicTags.slice(0, 2).join("・")}」を扱う他試験区分の過去問
            </p>
          </div>
          <ul className="flex flex-col gap-2">
            {crossExamByTopic.map((r) => (
              <li key={r.id}>
                <Link
                  href={questionPagePath(r)}
                  className="group block rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="mb-1.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Badge variant="primary" className="text-[10px]">
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

      {/* Spacer so sticky bottom nav doesn't cover the related list on mobile */}
      <div aria-hidden="true" className="h-20 sm:hidden" />

      {/* Mobile sticky bottom nav — prev/next */}
      <nav
        aria-label="前後の問題（モバイル）"
        className="surface-glass fixed inset-x-0 bottom-0 z-30 border-t border-border px-3 pb-safe pt-2 sm:hidden"
      >
        <div className="grid grid-cols-2 gap-2">
          {prev ? (
            <Link href={questionPagePath(prev)} className="block">
              <Button variant="outline" size="md" className="w-full">
                <ChevronLeft className="h-4 w-4" />
                <span className="text-xs">問 {prev.qNumber}</span>
              </Button>
            </Link>
          ) : (
            <span className="flex h-10 items-center justify-center rounded-xl border border-dashed border-border text-[11px] text-muted-foreground">
              最初の問題
            </span>
          )}
          {next ? (
            <Link href={questionPagePath(next)} className="block">
              <Button variant="primary" size="md" className="w-full">
                <span className="text-xs">問 {next.qNumber}</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <span className="flex h-10 items-center justify-center rounded-xl border border-dashed border-border text-[11px] text-muted-foreground">
              最後の問題
            </span>
          )}
        </div>
      </nav>
    </main>
  );
}
