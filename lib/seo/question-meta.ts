import { examLabelAt } from "@/lib/exam-naming/history";
import type { Question } from "@/lib/questions/types";
import { sessionLabel } from "@/lib/seo/question-jsonld";
import { formatYearSeason } from "@/lib/utils";

const DESCRIPTION_MAX = 158;

/** Call-to-action tail shared by every /q/* description. */
const CTA = "AIが選択肢ごとの違いを無料で即解説。今すぐ演習できます。";

function truncate(s: string, n: number): string {
  // Cap at exactly n chars *including* the ellipsis, so the 158-char budget
  // is a hard ceiling rather than n+1.
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}

/** Page <title> for a single question. */
export function questionTitle(q: Question): string {
  return `${formatYearSeason(q.year, q.season)} ${examLabelAt(q.exam, q.year, q.season)} ${sessionLabel(q.session)} 問${q.qNumber} ${q.category} 解説`;
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
