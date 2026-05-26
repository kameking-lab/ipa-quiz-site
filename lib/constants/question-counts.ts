import { ALL_QUESTIONS } from "@/data/questions";
import { getIndexableQuestions } from "@/lib/seo/sitemap-pagination";

/**
 * Single source of truth for question-count copy across the site.
 *
 * Phase 10 (致命傷④): the total was stated inconsistently across pages —
 * 14,402 (raw) on the home hero, "14,000問超" (raw floor) in metadata, and
 * "12,000問超" hardcoded in FAQ / features / success-stories. Four different
 * numbers for "how many questions" eroded trust. Everything user-facing now
 * derives from the constants below.
 */

/**
 * Raw internal count: every loaded question, including needsReview and
 * placeholder-explanation items that are NOT answerable or indexable.
 *
 * Reference only — DO NOT surface this to users. It overstates what is
 * actually usable (it currently exceeds the published count by ~1,750).
 */
export const TOTAL_QUESTIONS_RAW = ALL_QUESTIONS.length;

/**
 * Published / indexable questions: answerable, non-placeholder, listed in the
 * sitemap and searchable. This is the only total shown in user-facing copy,
 * and it shares its source (getIndexableQuestions) with the sitemap so the two
 * can never drift.
 */
export const TOTAL_QUESTIONS_PUBLISHED = getIndexableQuestions().length;

/**
 * Published total floored to the nearest 1,000, so "X,000問超" copy stays
 * factually true as the dataset grows.
 */
export const APPROX_QUESTION_COUNT =
  Math.floor(TOTAL_QUESTIONS_PUBLISHED / 1000) * 1000;

/** Localized "X,000" string for "X,000問超" copy. */
export const APPROX_QUESTION_COUNT_LABEL =
  APPROX_QUESTION_COUNT.toLocaleString("ja-JP");
