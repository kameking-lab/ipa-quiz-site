import { questionSourceEdition, questionSourceExam } from "@/lib/questions/source-label";
import type { Question } from "@/lib/questions/types";
import { sessionLabel } from "@/lib/seo/question-jsonld";
import { questionNumberLabel } from "@/lib/questions/display";
import { isSelfReviewedDescriptiveQuestion } from "@/lib/questions/descriptive";

const DESCRIPTION_MAX = 158;

/**
 * Soft ceiling for a source-first <title> (before layout appends
 * " | 過去問AI"). Measured across the corpus, every /q/* title truncated in the
 * SERP and 46% ran past 45 chars — the supplementary `category` word piled on
 * top of an already-long "{year} {exam} {session} 問N 解説" core. We trim only
 * the egregious cases: `category` is the safe drop because the visible <h1>
 * renders just the core (category has its own badge/link below it) and the meta
 * description still carries the category, so no identifying info is lost. The
 * core (year/exam/session/問N/解説) is never truncated — we never cut 問N or 解説.
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

/** Page <title> for a single question. */
export function questionTitle(q: Question): string {
  const stemTitle = medicalStemTitle(q);
  if (stemTitle) return stemTitle;
  const core = `${questionSourceEdition(q)} ${questionSourceExam(q)} ${sessionLabel(q.session, q.exam)} 問${questionNumberLabel(q)}`;
  const withCategory = `${core} ${q.category} 解説`;
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
  const context = `${examStr} ${ys} ${ss} 問${questionNumberLabel(q)}・${q.category}`;
  const cta = q.exam === "khk-reito-1" && isSelfReviewedDescriptiveQuestion(q)
    ? "公式解答例と独自解説で、記述・作図を自己確認できます。"
    : q.explanationCoverage === "official-summary" ? "公式正答と一般解説を確認し、無料で演習できます。" : CTA;
  // Very long source labels still leave room for the searched wording and CTA.
  const source = `【${truncate(context, DESCRIPTION_MAX - cta.length - 24)}】`;
  const budget = DESCRIPTION_MAX - source.length - cta.length - 2;
  const qPreview = truncate(searchableStem(q), budget);
  return `${qPreview} ${source}${cta}`;
}
