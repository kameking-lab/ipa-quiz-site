import { questionSourceEdition, questionSourceExam } from "@/lib/questions/source-label";
import type { Question } from "@/lib/questions/types";
import { sessionLabel } from "@/lib/seo/question-jsonld";
import { questionNumberLabel } from "@/lib/questions/display";
import { isSelfReviewedDescriptiveQuestion } from "@/lib/questions/descriptive";

const DESCRIPTION_MAX = 158;

/**
 * Soft ceiling for a source-first <title> (before layout appends
 * " | 過去問AI"). Only supplementary categories can be dropped. The source
 * edition, exam, paper field, session and printed question number are required
 * identifiers and survive even when the core exceeds this budget.
 * Short medical stem titles have a separate total limit in medicalStemTitle.
 */
const TITLE_MAX = 40;

/** Call-to-action tail shared by every /q/* description. */
const CTA = "正答と解説を確認できます。疑問はAIに質問できます。";

// These short medical stems are also searched verbatim. Keep their wording
// intact, with the source paper and question number following it.
const STEM_TITLE_EXAMS = new Set(["rigaku-ryohoshi", "sagyo-ryohoshi", "kangoshi"]);

function searchableStem(q: Question): string {
  return q.question.replace(/\s+/g, " ").trim();
}

function medicalStemTitle(q: Question): string | null {
  const stem = searchableStem(q);
  if (!STEM_TITLE_EXAMS.has(q.exam) || q.type !== "multiple-choice" || q.hasImage
    || stem.length > 48 || !/どれか[。？?]?(?: ?[2２] ?つ選べ[。？?]?)?$/.test(stem)
    || /[<>\[\]{}$|]|https?:|[図表次下]の|次に|以下|別冊/.test(stem)) return null;
  const edition = questionSourceEdition(q).replace(/^(第\d+回)（[^）]+）$/, "$1");
  const title = `${stem}｜${edition} ${questionSourceExam(q)} ${sessionLabel(q.session, q.exam)} 問${questionNumberLabel(q)} 解説`;
  return title.length <= 70 ? title : null;
}

function truncate(s: string, n: number): string {
  // Cap at exactly n chars *including* the ellipsis, so the 158-char budget
  // is a hard ceiling rather than n+1.
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

/** Source identity shared by the page heading and source-first title. */
export function questionHeading(q: Question): string {
  // The electrical and thermal papers reuse printed question/answer numbers.
  const field = q.exam === "energy-kanri"
    ? q.topicTags.find(tag => tag === "電気分野" || tag === "熱分野")
    : undefined;
  return [questionSourceEdition(q), questionSourceExam(q), field,
    sessionLabel(q.session, q.exam), `問${questionNumberLabel(q)}`].filter(Boolean).join(" ");
}

function supplementaryCategory(q: Question): string {
  return (q.category === "午前" || q.category === "午後") && q.category === sessionLabel(q.session, q.exam) ? "" : q.category;
}

/** Page <title> for a single question. */
export function questionTitle(q: Question): string {
  const stemTitle = medicalStemTitle(q);
  if (stemTitle) return stemTitle;
  const core = questionHeading(q);
  const withCategory = [core, supplementaryCategory(q), "解説"].filter(Boolean).join(" ");
  // Keep the category only while the whole title stays within budget; once it
  // would push the title past TITLE_MAX, drop it and fall back to the core.
  return withCategory.length <= TITLE_MAX ? withCategory : `${core} 解説`;
}

/**
 * meta description for a single question page.
 *
 * Phase 10 (review C-5): we no longer front-load "正解は{X}". Surfacing the
 * answer in the SERP snippet spoils the click. Lead with the searched stem,
 * then identify its source paper and the available explanation. The answer is
 * intentionally absent. Reserve the context and CTA within the 158-char cap.
 */
export function questionSnippet(q: Question): string {
  const examStr = questionSourceExam(q);
  const ys = questionSourceEdition(q);
  const ss = sessionLabel(q.session, q.exam);
  const category = supplementaryCategory(q);
  const context = `${examStr} ${ys} ${ss} 問${questionNumberLabel(q)}${category ? `・${category}` : ""}`;
  const cta = q.exam === "khk-reito-1" && isSelfReviewedDescriptiveQuestion(q)
    ? "公式解答例と独自解説で、記述・作図を自己確認できます。"
    : q.explanationCoverage === "official-summary" ? "公式正答と一般解説を確認し、無料で演習できます。" : CTA;
  // Very long source labels still leave room for the searched wording and CTA.
  const source = `【${truncate(context, DESCRIPTION_MAX - cta.length - 24)}】`;
  const budget = DESCRIPTION_MAX - source.length - cta.length - 2;
  const qPreview = truncate(searchableStem(q), budget);
  return `${qPreview} ${source}${cta}`;
}
