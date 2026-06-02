import { examLabelAt } from "@/lib/exam-naming/history";
import type { Question } from "@/lib/questions/types";
import { sessionLabel } from "@/lib/seo/question-jsonld";
import { formatYearSeason } from "@/lib/utils";

const DESCRIPTION_MAX = 158;

/**
 * Soft ceiling for the page-specific <title> (before layout appends
 * " | 過去問AI"). Measured across the corpus, every /q/* title truncated in the
 * SERP and 46% ran past 45 chars — the supplementary `category` word piled on
 * top of an already-long "{year} {exam} {session} 問N 解説" core. We trim only
 * the egregious cases: `category` is the safe drop because the visible <h1>
 * renders just the core (category has its own badge/link below it) and the meta
 * description still carries the category, so no identifying info is lost. The
 * core (year/exam/session/問N/解説) is never truncated — we never cut 問N or 解説.
 */
const TITLE_MAX = 40;

/** Call-to-action tail shared by every /q/* description. */
const CTA = "AIが選択肢ごとの違いを無料で即解説。今すぐ演習できます。";

function truncate(s: string, n: number): string {
  // Cap at exactly n chars *including* the ellipsis, so the 158-char budget
  // is a hard ceiling rather than n+1.
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

/** Page <title> for a single question. */
export function questionTitle(q: Question): string {
  const core = `${formatYearSeason(q.year, q.season)} ${examLabelAt(q.exam, q.year, q.season)} ${sessionLabel(q.session)} 問${q.qNumber}`;
  const withCategory = `${core} ${q.category} 解説`;
  // Keep the category only while the whole title stays within budget; once it
  // would push the title past TITLE_MAX, drop it and fall back to the core.
  return withCategory.length <= TITLE_MAX ? withCategory : `${core} 解説`;
}

/**
 * meta description for a single question page.
 *
 * Phase 10 (review C-5): we no longer front-load "正解は{X}". Surfacing the
 * answer in the SERP snippet spoils the click — a user who already sees the
 * answer key has no reason to open the page. Lead with the exam/year context
 * and the question stem, then close with an AI-explainer CTA. The answer is
 * intentionally absent from the description. Capped at 158 chars, with the CTA
 * reserved so it always survives truncation.
 */
export function questionSnippet(q: Question): string {
  const examStr = examLabelAt(q.exam, q.year, q.season);
  const ys = formatYearSeason(q.year, q.season);
  const ss = sessionLabel(q.session);
  const prefix = `【${examStr} ${ys} ${ss} 問${q.qNumber}・${q.category}】`;
  const budget = DESCRIPTION_MAX - prefix.length - CTA.length - 1;
  const qPreview = truncate(q.question.replace(/\s+/g, " "), Math.max(20, budget));
  return truncate(`${prefix}${qPreview} ${CTA}`, DESCRIPTION_MAX);
}
