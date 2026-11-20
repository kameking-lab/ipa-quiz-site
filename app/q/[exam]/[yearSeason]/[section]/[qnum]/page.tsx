import { isReferenceOnlyQuestionId } from "@/lib/questions/assessment";
import { isSelfReviewedDescriptiveQuestion } from "@/lib/questions/descriptive";
import { strictContentGateEnabled } from "@/lib/billing/content-policy";
import { practiceGateEnabled } from "@/lib/billing/practice-access";
import { QuestionPracticeGate } from "@/components/quiz/QuestionPracticeGate";
import { ContentPage } from "@/mobile/server/ContentPage";
import { displayQuestionExplanation } from "@/lib/questions/explanation-display";
import { questionSourceEdition, questionSourceExam } from "@/lib/questions/source-label";
import { QuestionFigures } from "@/components/quiz/QuestionFigures";
import { hasUnrenderableContent } from "@/lib/questions/content-quality";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
} from "lucide-react";

import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { getRelatedBlogPosts } from "@/lib/blog/related-content";
import { isPlaceholderExplanation, isPracticeReadyQuestion } from "@/lib/questions/filter";
import {
  getCrossExamRelatedQuestions,
  getSameExamOtherYears,
  getSameExamRelatedQuestions,
  getSessionNeighbors,
} from "@/lib/questions/related";
import {
  getRecordedLastUpdatedISO,
} from "@/lib/questions/last-updated";
import type { ChoiceKey, Question } from "@/lib/questions/types";
import { choiceDisplayLabel, questionNumberLabel } from "@/lib/questions/display";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import {
  findQuestionByRoute,
  parseQuestionNumberSegment,
  questionPagePath,
  type QuestionRouteParams,
} from "@/lib/seo/question-url";
import { examTopicPageExists } from "@/lib/seo/exam-meta";
import { buildQuestionJsonLd, questionBreadcrumbItems, sessionLabel, withQuotaPaywall } from "@/lib/seo/question-jsonld";
import { questionHeading, questionSnippet, questionTitle } from "@/lib/seo/question-meta";
import { practiceCategoryLabel } from "@/lib/questions/practice-session";
import { CurrentLearningLinks } from "@/components/term-relations/CurrentLearningLinks";
import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { DescriptiveAnswerCard } from "@/components/quiz/DescriptiveAnswerCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { ExplanationLayers } from "@/components/quiz/ExplanationLayers";
import { QuestionBody, QuestionInlineText } from "@/components/quiz/QuestionBody";
import { QuestionSourcePresentation } from "@/components/quiz/QuestionSourcePresentation";
import { AiTransparencyDisclaimer } from "@/components/quiz/AiTransparencyDisclaimer";
import { AfternoonEssayHint } from "@/components/quiz/AfternoonEssayHint";
import { KamokuBStudyHint } from "@/components/quiz/KamokuBStudyHint";
import { CategoryStudyTip } from "@/components/quiz/CategoryStudyTip";
import { topicTagToSlug } from "@/lib/seo/topics";
import { getQuestionCanonicalRepresentative } from "@/lib/seo/question-canonical";

// Every question page renders on its first request and is then cached (ISR)
// until the next deployment / revalidate window. dynamicParams=true lets the
// route resolve params that were not prerendered; the page handler validates
// them and falls back to notFound() for genuinely bad URLs, so the reachable
// set is still exactly "questions that exist". The sitemap advertises every
// indexable question independently of this list (lib/seo/sitemap-pagination).
//
// Build time: prerendering ~10k question pages at build took ~4-5 min of the
// 17-23 min Vercel build (plus the output/upload of every generated file).
// Rendering on demand moves that work to the first visit (a few hundred ms).
export const dynamicParams = true;
export const revalidate = 604800; // 7 days; question content changes with deployments.

export async function generateStaticParams(): Promise<QuestionRouteParams[]> {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<QuestionRouteParams>;
}): Promise<Metadata> {
  if(strictContentGateEnabled())return {title:"問題・教材の演習",description:"ログインしてウェブ・アプリ共通の無料1日10問、または有料会員の演習を利用できます。",robots:{index:false,follow:true}};
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
  const yearSeasonMatch = /^(\d{4})-(spring|autumn|cbt|published|first|second|round1|round2|early|may|september|january|october|late|annual|july|primary|kansai|march)$/.exec(p.yearSeason);
  if (!yearSeasonMatch) return undefined;
  const year = Number(yearSeasonMatch[1]);
  const segment = parseQuestionNumberSegment(p.exam, p.qnum);
  if (!segment) return undefined;

  return ALL_QUESTIONS.find(
    (q) =>
      q.exam === p.exam &&
      q.year === year &&
      q.season === yearSeasonMatch[2] &&
      q.session === p.section &&
      q.qNumber === segment.qNumber &&
      q.part === segment.part,
  );
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<QuestionRouteParams>;
}) {
  if (strictContentGateEnabled()) { const gatedParams=await params; return <ContentPage path={`/q/${gatedParams.exam}/${gatedParams.yearSeason}/${gatedParams.section}/${gatedParams.qnum}`}/>; }

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
  if (!isPracticeReadyQuestion(q) && !(isReferenceOnlyQuestionId(q.id) && !q.needsReview && !hasUnrenderableContent(q))) notFound();

  const answerKeys = Array.isArray(q.answer) ? q.answer : [q.answer];
  const answerText = q.type === "ordering" ? undefined :
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
  const categoryLabel = practiceCategoryLabel(q.category, q.exam);

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

  const relatedBlogPosts = getRelatedBlogPosts(q.exam, 4, [q.category, ...q.topicTags]);

  // Structured-data identities follow rel=canonical. The visible page, links,
  // breadcrumbs and quiz return target continue to use q, preserving the exam
  // context in which the visitor opened this shared morning-I question.
  const canonicalQuestion = getQuestionCanonicalRepresentative(ALL_QUESTIONS, q);
  const canonicalPageUrlAbs = `${SITE_BASE_URL}${questionPagePath(canonicalQuestion)}`;
  const requestedPageUrlAbs = `${SITE_BASE_URL}${questionPagePath(q)}`;
  const title = questionTitle(q);
  const lastUpdatedISO = getRecordedLastUpdatedISO(q);

  const breadcrumbItems = questionBreadcrumbItems(q, requestedPageUrlAbs);
  let gateEnabled = false;
  try { gateEnabled = practiceGateEnabled(); } catch { /* Billing misconfigured: the page stays fully open. */ }
  const jsonLd = buildQuestionJsonLd({
    question: q,
    pageUrlAbs: canonicalPageUrlAbs,
    requestedPageUrlAbs,
    breadcrumbItems,
    title,
    // Alias explanations retain requested context; do not date a canonical entity from an alias.
    lastUpdatedISO: canonicalQuestion.id === q.id ? lastUpdatedISO : undefined,
  });

  const explanation = (
    <section id="explanation" aria-label="解説" className="mt-6 scroll-mt-20">
      <h2 className="mb-3 flex items-center gap-2.5 text-base font-bold sm:text-lg">
        <BookOpenCheck aria-hidden="true" className="h-5 w-5 text-primary" />
        解説
      </h2>
      {showRealExplanation ? (
        <>
          <ExplanationLayers explanation={displayQuestionExplanation(q.exam, q.explanation)} />
          {q.choiceExplanations && q.choices && (
            <div className="mt-4 rounded-2xl border border-border bg-card p-4 sm:p-5">
              <h3 className="mb-3 text-sm font-bold text-foreground">各選択肢の解説</h3>
              <dl className="space-y-3 text-sm leading-relaxed">
                {Object.entries(q.choices).map(([key, choice]) => (
                  <div key={key} className="grid grid-cols-[2rem_1fr] gap-2">
                    <dt className="font-bold text-primary">{choiceDisplayLabel(q.exam, key as ChoiceKey)}</dt>
                    <dd>
                      <div className="font-medium text-foreground"><QuestionBody text={choice} /></div>
                      <p className="mt-1 text-muted-foreground">
                        <QuestionInlineText text={displayQuestionExplanation(q.exam, q.choiceExplanations?.[key as ChoiceKey])} linkReferences />
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

      <QuestionSourcePresentation question={q} phase="after" />
    </section>
  );
  const selfReviewed = isSelfReviewedDescriptiveQuestion(q);
  const source = !selfReviewed && <AiTransparencyDisclaimer question={q} />;
  const hasAnswerCard = (q.type === "native-b" || q.type === "numeric" || q.choices) && !hasUnrenderableContent(q);

  return (
    <>
      {prev && (
        <link rel="prev" href={`${SITE_BASE_URL}${questionPagePath(prev)}`} />
      )}
      {next && (
        <link rel="next" href={`${SITE_BASE_URL}${questionPagePath(next)}`} />
      )}
    <main data-study-presence-exam={q.exam} className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-10">
      <JsonLd data={gateEnabled ? withQuotaPaywall(jsonLd) : jsonLd} />

      {/* Breadcrumb — no viewport prefetch: rarely clicked, and each prefetch
          downloads another page's RSC payload on every question view. */}
      <nav
        aria-label="パンくずリスト"
        className="mb-4 text-xs text-muted-foreground"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link
              href={breadcrumbItems[0].href}
              prefetch={false}
              className="inline-flex min-h-11 min-w-11 items-center underline underline-offset-4 transition hover:text-foreground"
            >
              {breadcrumbItems[0].name}
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">
            /
          </li>
          <li>
            <Link
              href={breadcrumbItems[1].href}
              prefetch={false}
              className="inline-flex min-h-11 min-w-11 items-center underline underline-offset-4 transition hover:text-foreground"
            >
              {breadcrumbItems[1].name}
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">
            /
          </li>
          <li>
            <Link
              href={breadcrumbItems[2].href}
              prefetch={false}
              className="inline-flex min-h-11 min-w-11 items-center underline underline-offset-4 transition hover:text-foreground"
            >
              {breadcrumbItems[2].name}
            </Link>
          </li>
          <li aria-hidden="true" className="text-border">
            /
          </li>
          <li aria-current="page" className="font-medium text-foreground">
            {breadcrumbItems[3].name}
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-4">
        {(q.explanationCoverage === "official-summary" || q.isCalculation) && (
          <div className="mb-3 flex flex-wrap gap-2 text-xs">
            {q.explanationCoverage === "official-summary" && <Badge variant="outline">公式正答と一般解説</Badge>}
            {q.isCalculation && <Badge variant="warn">計算</Badge>}
          </div>
        )}
        <h1 className="text-balance text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
          {questionHeading(q)}
        </h1>
        <p className="mt-2 text-sm font-medium text-muted-foreground">{categoryLabel}</p>
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
            <a href="#question-source" className="inline-flex min-h-11 items-center font-semibold underline">原典で図表を見る</a>
          </div>
        </aside>
      )}

      {/* Question, answer and explanation: past the shared daily free 10 a person
          sees the limit screen here instead (crawlers keep the full text; the
          part is declared paywalled in JSON-LD — flexible sampling). */}
      <QuestionPracticeGate id={q.id} enabled={gateEnabled}>
      <section
        aria-label="問題文"
        className="selectable-content rounded-2xl border border-border bg-card p-5 text-base leading-[1.85] text-card-foreground shadow-sm sm:p-6 sm:text-[17px]"
      >
        {q.lawReferenceDate && (
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            法令基準日: {q.lawReferenceDate}（この日の制度で解答）
          </p>
        )}
        <QuestionSourcePresentation question={q} phase="before" />
        <QuestionBody text={q.question} />
        <QuestionFigures question={q} />
      </section>

      {/* Choices + solve-in-place. The choice text ships in the prerendered
          HTML via ChoiceButton (crawlable / readable with JS off); hydration
          adds the grading interaction so a search visitor can answer right here
          instead of hopping to /quiz (致命傷⑤). */}
      {hasAnswerCard && (
        <section aria-label={q.type === "native-b" ? "五つの空欄と解答" : q.type === "numeric" ? "数値記入と解答" : "選択肢と解答"} className="mt-4">
          <h2 className="sr-only">{q.type === "native-b" ? "五つの空欄" : q.type === "numeric" ? "数値記入" : "選択肢"}</h2>
          <QuestionAnswerCard
            key={q.id}
            question={q}
            questionId={q.id}
            choices={q.choices}
            choiceImageUrls={q.choiceImageUrls}
            answerKey={q.answer}
            answerText={answerText}
            exam={q.exam}
            year={q.year}
            season={q.season}
            session={q.session}
            qNumber={q.qNumber}
            part={q.part}
            explanation={explanation}
            source={source}
            requiredSelections={q.requiredSelections}
          />
        </section>
      )}

      {selfReviewed && (
        <div className="mt-5">
          <DescriptiveAnswerCard question={q} />
        </div>
      )}

      {!hasAnswerCard && <>{explanation}{source}</>}
      </QuestionPracticeGate>

      <nav aria-label="解説のあとに学ぶ" className="my-5 print:hidden">
        <Link
          href={next ? questionPagePath(next) : breadcrumbItems[2].href}
          prefetch={false}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
        >
          {next ? "次の問題へ" : "年度の問題一覧へ戻る"}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </nav>

      <details className="my-6 rounded-xl border border-border px-4 print:hidden">
        <summary className="min-h-11 cursor-pointer py-3 font-semibold">関連資料</summary>
        <div className="space-y-5 pb-4 text-sm">
          <ul className="space-y-2">
            {topicPageExists && <li><Link href={'/' + q.exam + '/topic/' + encodeURIComponent(q.category)} prefetch={false} className="underline">{categoryLabel}</Link></li>}
            {q.topicTags.slice(0, 3).map((tag) => (
              <li key={tag}><Link href={'/topics/' + encodeURIComponent(topicTagToSlug(tag))} prefetch={false} className="underline">#{tag}</Link></li>
            ))}
          </ul>
          <CategoryStudyTip category={q.category} exam={q.exam} topicTags={q.topicTags} hasTopicPage={topicPageExists} />
          <AfternoonEssayHint exam={q.exam} />
          <KamokuBStudyHint exam={q.exam} session={q.session} />
          <CurrentLearningLinks origin={{kind: "question", id: q.id}} headingId="question-learning-links" />
          {[
            { title: "関連する問題", questions: related },
            { title: crossExamMode === "topic" ? "他試験の同テーマ問題" : "他試験区分の同分野問題", questions: crossExamByTopic },
            { title: '他年度の「' + categoryLabel + '」問題', questions: otherYearsSameCategory },
          ].map(({ title, questions }) => questions.length > 0 && (
            <section key={title}>
              <h3 className="mb-2 font-semibold">{title}</h3>
              <ul className="space-y-2">
                {questions.map((r) => (
                  <li key={r.id}>
                    <Link href={questionPagePath(r)} prefetch={false} className="underline underline-offset-4">
                      {questionSourceExam(r)} {questionSourceEdition(r)} {sessionLabel(r.session, r.exam)} 問{questionNumberLabel(r)} {questionSnippet(r)}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          {relatedBlogPosts.length > 0 && (
            <section>
              <h3 className="mb-2 font-semibold">{questionSourceExam(q)} の学習ガイド</h3>
              <ul className="space-y-2">
                {relatedBlogPosts.map((post) => (
                  <li key={post.slug}><Link href={'/blog/' + post.slug} prefetch={false} className="underline underline-offset-4">{post.title}</Link></li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </details>

      {/* Print-only attribution */}
      <div className="print-only hidden mt-10 border-t border-gray-300 pt-4 text-[10pt] text-gray-600">
        <p>過去問AI（https://www.kakomon-ai.jp{questionPagePath(q)}）より印刷</p>
        <p className="mt-1">{q.sourceAttribution ?? "出典: IPA 情報処理技術者試験"}</p>
      </div>

    </main>
    </>
  );
}
