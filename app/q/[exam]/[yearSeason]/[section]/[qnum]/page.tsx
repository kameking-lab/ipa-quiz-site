import { questionSourceEdition, questionSourceExam } from "@/lib/questions/source-label";
import { QuestionFigures } from "@/components/quiz/QuestionFigures";
import { hasUnrenderableContent } from "@/lib/questions/content-quality";
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

import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getRelatedBlogPosts } from "@/lib/blog/related-content";
import { getOfficialAnswerPdfUrl, getSafePdfUrl, ipaSourceLabel } from "@/lib/exam-config";
import { isPlaceholderExplanation, isPracticeReadyQuestion } from "@/lib/questions/filter";
import {
  getCrossExamRelatedQuestions,
  getSameExamOtherYears,
  getSameExamRelatedQuestions,
  getSessionNeighbors,
} from "@/lib/questions/related";
import {
  formatLastUpdatedJa,
  getLastUpdatedISO,
} from "@/lib/questions/last-updated";
import type { ChoiceKey, Question } from "@/lib/questions/types";
import { choiceDisplayLabel, questionNumberLabel } from "@/lib/questions/display";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import {
  findQuestionByRoute,
  questionPagePath,
  type QuestionRouteParams,
} from "@/lib/seo/question-url";
import { examTopicPageExists } from "@/lib/seo/exam-meta";
import { buildQuestionJsonLd, sessionLabel } from "@/lib/seo/question-jsonld";
import { questionSnippet, questionTitle } from "@/lib/seo/question-meta";
import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { ShareButtons } from "@/components/ShareButtons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExplanationLayers } from "@/components/quiz/ExplanationLayers";
import { QuestionBody } from "@/components/quiz/QuestionBody";
import { AiTransparencyDisclaimer } from "@/components/quiz/AiTransparencyDisclaimer";
import { AfternoonEssayHint } from "@/components/quiz/AfternoonEssayHint";
import { KamokuBStudyHint } from "@/components/quiz/KamokuBStudyHint";
import { CategoryStudyTip } from "@/components/quiz/CategoryStudyTip";
import { DifficultyMeter } from "@/components/quiz/DifficultyMeter";
import { InlineBookHint } from "@/components/quiz/InlineBookHint";
import { QuestionFeedback } from "@/components/quiz/QuestionFeedback";
import { topicTagToSlug } from "@/lib/seo/topics";
import { getQuestionCanonicalRepresentative } from "@/lib/seo/question-canonical";

// SSG only the most recent years to keep build time tractable; let older
// years render on-demand with ISR caching. dynamicParams=true is what lets
// the route resolve unlisted params instead of returning 404 at the router
// layer — the page handler then validates the params and falls back to
// notFound() for genuinely bad URLs. See logs/sitemap-coverage-2026-05-23.md
// for the SEO motivation: the sitemap advertises every indexable question
// (~14k), but with dynamicParams=false anything before SSG_MIN_YEAR 404'd.
export const dynamicParams = true;
export const revalidate = 86400;

const SSG_MIN_YEAR = 2024;

export async function generateStaticParams(): Promise<QuestionRouteParams[]> {
  return ALL_QUESTIONS.filter((q) => q.year >= SSG_MIN_YEAR && isPracticeReadyQuestion(q)).map((q) => ({
    exam: q.exam,
    yearSeason: `${q.year}-${q.season}`,
    section: q.session,
    qnum: `q${q.qNumber}${q.part ?? ""}`,
  }));
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
  const canonical = questionPagePath(
    getQuestionCanonicalRepresentative(ALL_QUESTIONS, q),
  );
  const indexable = isPracticeReadyQuestion(q);
  const ogImageUrl = `${SITE_BASE_URL}/api/og?${new URLSearchParams({ type: "question", title: title.slice(0, 80) }).toString()}`;

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

function findFallbackQuestion(p: QuestionRouteParams): Question | undefined {
  const yearSeasonMatch = /^(\d{4})-(spring|autumn|cbt|published|first|second|early|may|september|january|october|late|july)$/.exec(p.yearSeason);
  if (!yearSeasonMatch) return undefined;
  const year = Number(yearSeasonMatch[1]);
  const qMatch = /^q(\d+)([ab])?$/.exec(p.qnum);
  if (!qMatch) return undefined;
  const qNumber = Number(qMatch[1]);

  return ALL_QUESTIONS.find(
    (q) =>
      q.exam === p.exam &&
      q.year === year &&
      q.season === yearSeasonMatch[2] &&
      q.session === p.section &&
      q.qNumber === qNumber &&
      q.part === qMatch[2],
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
  // Keep detail pages, paper listings and the interactive player on the same
  // quality boundary. A listed question must also be readable and playable.
  if (!isPracticeReadyQuestion(q)) notFound();

  const answerKeys = Array.isArray(q.answer) ? q.answer : [q.answer];
  const answerText =
    q.choices
      ? answerKeys.map(key => q.choices?.[key as ChoiceKey]).filter(Boolean).join(" ／ ")
      : undefined;
  const showRealExplanation = !isPlaceholderExplanation(q);

  // Same-exam lists iterate the pre-grouped exam pool (~hundreds–few-thousand)
  // instead of re-scanning all ~14k questions per render. Results are identical
  // — every filter below already required x.exam === q.exam. (perf: TTFB)
  const examPool = QUESTIONS_BY_EXAM[q.exam] ?? [];

  // 分野見出しリンクは /[exam]/topic/[category] へ張るが、そのページは
  // dynamicParams=false かつ strict プール(=needsReview とプレースホルダ解説を
  // 除外)が空なら notFound() する。本問が「その分野で唯一の問題」かつ
  // プレースホルダ/needsReview の場合、リンク先は 404 になる（例:
  // ap-2013a-am-q75 の「品質管理」）。strict プールに同分野の問題が一つも
  // 無ければリンクを張らずプレーンテキスト表示にして死リンクを防ぐ。
  const topicPageExists = examTopicPageExists(q.exam, q.category);

  // Sequential prev/next nav skips needsReview questions: their pages
  // notFound() (404), so keeping them in the sequence would ship dead links
  // (~18 corpus-wide). Placeholder questions stay navigable (real 200 page).
  // See getSessionNeighbors in related.ts.
  const { prev, next } = getSessionNeighbors(q, examPool);

  // Related-question link trails are computed here in the Server Component and
  // rendered as plain <Link>s below, so they ship inside the prerendered HTML
  // (SSG for recent years, ISR otherwise) and crawlers see the internal links.
  // Do NOT move these lists into a "use client" island — that would hide the
  // links behind hydration and forfeit the internal-link equity (C-4: ~29%
  // index rate on /q/* pages).
  // Same-category rails link to linkable targets only — never to needsReview
  // (which notFound()s → 404) or placeholder (noindex) questions. Without this
  // filter the「関連する問題」rail shipped 106 dead 404 links corpus-wide. The
  // sibling cross-exam rail below already enforces the same isLinkableTarget
  // contract; getSameExam* keep all three rails consistent (see related.ts).
  const related = getSameExamRelatedQuestions(q, examPool, 5);

  // Same exam + same category but from OTHER years — one representative per
  // year, newest first. Builds a year-spanning internal-link trail so each
  // /q/* page seeds links into older years' equivalents (phase 7 task ②-2).
  // Exclude questions already shown in the「関連する問題」rail above: the same
  // question landing in both rails ships a duplicate link on 346 pages corpus-
  // wide (639 links). Excluding refills the year with a distinct question, so
  // the page seeds more unique internal links.
  const otherYearsSameCategory = getSameExamOtherYears(
    q,
    examPool,
    5,
    new Set(related.map((r) => r.id)),
  );

  // Cross-exam discovery trail. With topicTags populated this ranks by shared
  // tags; while tags are unset corpus-wide it falls back to the IPA common-skill
  // category groups (AP/FE/IP/SG shared curriculum) so the rail still seeds
  // cross-exam internal links from /q instead of staying empty. Indexable
  // targets only — never links to needsReview (404) or placeholder pages.
  const { questions: crossExamByTopic, mode: crossExamMode } =
    getCrossExamRelatedQuestions(q, ALL_QUESTIONS, 5);

  const relatedBlogPosts = getRelatedBlogPosts(q.exam, 4, [q.category, ...q.topicTags])
    .filter((post) => (q.exam !== "civil2" && q.exam !== "kankoji2" && q.exam !== "civil1") || post.exam === q.exam);

  // Structured-data identities follow rel=canonical. The visible page, links,
  // breadcrumbs and quiz return target continue to use q, preserving the exam
  // context in which the visitor opened this shared morning-I question.
  const canonicalQuestion = getQuestionCanonicalRepresentative(ALL_QUESTIONS, q);
  const canonicalPageUrlAbs = `${SITE_BASE_URL}${questionPagePath(canonicalQuestion)}`;
  const requestedPageUrlAbs = `${SITE_BASE_URL}${questionPagePath(q)}`;
  const examPath = `/${q.exam}`;
  const yearSeasonPath = `${examPath}/${q.year}-${q.season}`;
  const title = questionTitle(q);
  const lastUpdatedISO = getLastUpdatedISO(q);
  const lastUpdatedJa = formatLastUpdatedJa(lastUpdatedISO);

  const jsonLd = buildQuestionJsonLd({
    question: q,
    pageUrlAbs: canonicalPageUrlAbs,
    title,
    lastUpdatedISO,
  });

  return (
    <>
      {prev && (
        <link rel="prev" href={`${SITE_BASE_URL}${questionPagePath(prev)}`} />
      )}
      {next && (
        <link rel="next" href={`${SITE_BASE_URL}${questionPagePath(next)}`} />
      )}
    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-10">
      <JsonLd data={jsonLd} />

      {/* Breadcrumb */}
      <nav
        aria-label="パンくずリスト"
        className="mb-4 text-xs text-muted-foreground"
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
              {questionSourceExam(q)}
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
              {questionSourceEdition(q)}
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">
            /
          </li>
          <li aria-current="page" className="font-medium text-foreground">
            問{questionNumberLabel(q)}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-4">
        <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <Badge variant="primary">
              {questionSourceExam(q)}
            </Badge>
            <Badge variant="soft">{questionSourceEdition(q)}</Badge>
            <Badge variant="outline">{sessionLabel(q.session)}</Badge>
            <Badge variant="outline">問 {questionNumberLabel(q)}</Badge>
            {q.explanationCoverage === "official-summary" && <Badge variant="outline">公式正答と一般解説</Badge>}
            {q.isCalculation && <Badge variant="warn">計算</Badge>}
          </div>
          <div className="print:hidden">
            <ShareButtons url={requestedPageUrlAbs} text={title} compact />
          </div>
        </div>
        <h1 className="text-balance text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
          {questionSourceEdition(q)} {questionSourceExam(q)}{" "}
          {sessionLabel(q.session)} 問{questionNumberLabel(q)}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {topicPageExists ? (
            <Link
              href={`/${q.exam}/topic/${encodeURIComponent(q.category)}`}
              className="text-sm font-medium text-muted-foreground transition hover:text-primary hover:underline"
            >
              {q.category}
            </Link>
          ) : (
            <span className="text-sm font-medium text-muted-foreground">
              {q.category}
            </span>
          )}
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
        <div className="mt-2">
          <DifficultyMeter difficulty={q.difficulty} />
        </div>
      </header>

      {/* Figure-bearing notice — text-only fallback hint */}
      {hasUnrenderableContent(q) && (
        <aside
          aria-label="図表に関する注釈"
          className="mb-3 flex items-start gap-2.5 rounded-xl border border-amber-300/70 bg-amber-50 p-3.5 text-[13px] leading-relaxed text-amber-900 dark:border-amber-700/60 dark:bg-amber-950/40 dark:text-amber-100"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <div className="space-y-1">
            <p>
              この問題の図表は原典との照合が必要です。図表の確認が終わるまで、
              演習への出題とこのページでの採点を停止しています。出典から問題をご確認ください。
            </p>
            <a
              href={getSafePdfUrl(q.sourcePdfUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold underline decoration-amber-400 underline-offset-4 hover:text-amber-700 dark:hover:text-amber-200"
            >
              {ipaSourceLabel(getSafePdfUrl(q.sourcePdfUrl), "question")}で図表を見る
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </aside>
      )}

      {/* Question body */}
      <section
        aria-label="問題文"
        className="selectable-content rounded-2xl border border-border bg-card p-5 text-base leading-[1.85] text-card-foreground shadow-sm sm:p-6 sm:text-[17px]"
      >
        {q.lawReferenceDate && (
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            法令基準日: {q.lawReferenceDate}（この日の制度で解答）
          </p>
        )}
        <QuestionBody text={q.question} />
        <QuestionFigures question={q} />
      </section>

      {/* Choices + solve-in-place. The choice text ships in the prerendered
          HTML via ChoiceButton (crawlable / readable with JS off); hydration
          adds the grading interaction so a search visitor can answer right here
          instead of hopping to /quiz (致命傷⑤). */}
      {q.choices && !hasUnrenderableContent(q) && (
        <section aria-label="選択肢と解答" className="mt-4">
          <h2 className="sr-only">選択肢</h2>
          <QuestionAnswerCard
            questionId={q.id}
            choices={q.choices}
            choiceImageUrls={q.choiceImageUrls}
            answerKey={answerKeys as ChoiceKey[]}
            answerText={answerText}
            exam={q.exam}
            year={q.year}
            season={q.season}
            session={q.session}
            qNumber={q.qNumber}
            part={q.part}
            nextHref={next ? questionPagePath(next) : undefined}
            requiredSelections={q.requiredSelections}
          />
        </section>
      )}

      {/* Explanation — 3-layer structured */}
      <section id="explanation" aria-label="解説" className="mt-8 scroll-mt-20">
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
            <>
              <ExplanationLayers explanation={q.explanation} />
              {q.choiceExplanations && q.choices && (
                <div className="mt-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
                  <h3 className="mb-3 text-sm font-bold text-foreground">各選択肢の解説</h3>
                  <dl className="space-y-3 text-sm leading-relaxed">
                    {Object.entries(q.choices).map(([key, choice]) => (
                      <div key={key} className="grid grid-cols-[2rem_1fr] gap-2">
                        <dt className="font-bold text-primary">{choiceDisplayLabel(q.exam, key as ChoiceKey)}</dt>
                        <dd>
                          <p className="font-medium text-foreground">{choice}</p>
                          <p className="mt-1 text-muted-foreground">
                            {q.choiceExplanations?.[key as ChoiceKey]}
                          </p>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </>
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

          {q.officialReferenceUrls && q.officialReferenceUrls.length > 0 && (
            <nav aria-label="解説の公式根拠" className="mt-4 text-sm">
              <h3 className="font-semibold">解説の公式根拠</h3>
              <ul className="mt-2 list-inside list-disc space-y-2">
                {q.officialReferenceUrls.map((url, index) => (
                  <li key={url}><a href={url} target="_blank" rel="noopener noreferrer" className="underline">公式資料 {index + 1}（{new URL(url).hostname}）</a></li>
                ))}
              </ul>
            </nav>
          )}
          <AiTransparencyDisclaimer
            lastUpdatedISO={lastUpdatedISO}
            lastUpdatedJa={lastUpdatedJa}
            sourcePdfUrl={getSafePdfUrl(q.sourcePdfUrl)}
            answerPdfUrl={getOfficialAnswerPdfUrl(q.sourcePdfUrl, q.sourceAnswerUrl)}
            sourceAttribution={q.sourceAttribution}
          />
        </details>
      </section>

      {/* Category-level study guidance */}
      <div className="print:hidden">
        <CategoryStudyTip
          category={q.category}
          exam={q.exam}
          topicTags={q.topicTags}
          hasTopicPage={topicPageExists}
        />
      </div>

      {/* Inline book recommendation tied to the category */}
      <div className="print:hidden">
        <InlineBookHint exam={q.exam} category={q.category} />
      </div>

      {/* 旗艦＝午後II論述AI採点への導線（論述区分 ST/SA/PM/SM/AU のみ自己ゲート） */}
      <div className="print:hidden">
        <AfternoonEssayHint exam={q.exam} />
      </div>

      {/* 土台＝基本情報 科目B（擬似言語）完全対策への導線（FE科目Bのみ自己ゲート） */}
      <div className="print:hidden">
        <KamokuBStudyHint exam={q.exam} session={q.session} />
      </div>

      {/* AI Copilot CTA — gradient panel */}
      <section
        aria-label="AI コパイロット"
        className="print:hidden relative mt-6 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary-soft via-card to-card p-5 shadow-md sm:p-6"
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
              href={`/quiz?mode=year&exam=${q.exam}&year=${q.year}&season=${q.season}&session=${q.session}&returnTo=${encodeURIComponent(questionPagePath(q))}`}
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
                  href={`/quiz?mode=year&exam=${q.exam}&year=${q.year}&season=${q.season}&session=${q.session}&returnTo=${encodeURIComponent(questionPagePath(q))}#q${q.qNumber}`}
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

      {/* Bottom share section removed: the question header already exposes */}
      {/* a compact 𝕏 / LINE / Copy cluster (PR #338), so the duplicate */}
      {/* full-text block at the page tail was visual noise. */}

      {/* Prev / Next — desktop & tablet inline, mobile sticky */}
      <nav
        aria-label="前後の問題"
        className="print:hidden mt-8 hidden grid-cols-2 gap-3 sm:grid"
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
                      <span className="truncate">問 {questionNumberLabel(prev)}</span>
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
                      <span className="truncate">問 {questionNumberLabel(next)}</span>
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
        <section aria-label="関連する問題" className="print:hidden mt-12">
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
                      {questionSourceExam(r)}
                    </Badge>
                    <span>
                      {questionSourceEdition(r)} {sessionLabel(r.session)} 問{questionNumberLabel(r)}
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
        <section aria-label="他試験区分の関連問題" className="print:hidden mt-10">
          <div className="mb-4">
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              {crossExamMode === "topic"
                ? "他試験の同テーマ問題"
                : "他試験区分の同分野問題"}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {crossExamMode === "topic"
                ? `トピック「${q.topicTags.slice(0, 2).join("・")}」を扱う他試験区分の過去問`
                : `${questionSourceExam(q)} と共通カリキュラムの他区分で「${q.category}」分野を演習する`}
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
                      {questionSourceExam(r)}
                    </Badge>
                    <span>
                      {questionSourceEdition(r)} {sessionLabel(r.session)} 問{questionNumberLabel(r)}
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

      {/* Same exam + category across other years — year-spanning link trail */}
      {otherYearsSameCategory.length > 0 && (
        <section aria-label="他年度の同分野問題" className="print:hidden mt-10">
          <div className="mb-4">
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              他年度の「{q.category}」問題
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {questionSourceExam(q)} の同じ分野を年度をまたいで演習する
            </p>
          </div>
          <ul className="flex flex-col gap-2">
            {otherYearsSameCategory.map((r) => (
              <li key={r.id}>
                <Link
                  href={questionPagePath(r)}
                  className="group block rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="mb-1.5 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    <Badge variant="outline" className="text-[10px]">
                      {questionSourceEdition(r)}
                    </Badge>
                    <span>
                      {questionSourceExam(r)} {sessionLabel(r.session)} 問{questionNumberLabel(r)}
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

      {relatedBlogPosts.length > 0 && (
        <section aria-label="この試験区分の学習ガイド" className="print:hidden mt-10">
          <h2 className="mb-3 text-base font-bold tracking-tight text-foreground">
            {questionSourceExam(q)} の学習ガイド
          </h2>
          <ul className="flex flex-col gap-2">
            {relatedBlogPosts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex items-start justify-between gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary">
                      {p.title}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                      {p.description}
                    </p>
                  </div>
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Print-only attribution */}
      <div className="print-only hidden mt-10 border-t border-gray-300 pt-4 text-[10pt] text-gray-600">
        <p>過去問AI（https://www.kakomon-ai.jp{questionPagePath(q)}）より印刷</p>
        <p className="mt-1">{q.sourceAttribution ?? "出典: IPA 情報処理技術者試験"}</p>
      </div>

      {/* Spacer so sticky bottom nav doesn't cover the related list on mobile */}
      <div aria-hidden="true" className="print:hidden h-20 sm:hidden" />

      {/* Mobile sticky bottom nav — prev/next */}
      <nav
        aria-label="前後の問題（モバイル）"
        className="print:hidden surface-glass fixed inset-x-0 bottom-0 z-30 border-t border-border px-3 pb-safe pt-2 sm:hidden"
      >
        <div className="grid grid-cols-2 gap-2">
          {prev ? (
            <Link href={questionPagePath(prev)} className="block">
              <Button variant="outline" size="md" className="w-full">
                <ChevronLeft className="h-4 w-4" />
                <span className="text-xs">問 {questionNumberLabel(prev)}</span>
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
                <span className="text-xs">問 {questionNumberLabel(next)}</span>
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
    </>
  );
}
