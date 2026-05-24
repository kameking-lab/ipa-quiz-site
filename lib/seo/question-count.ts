import { ALL_QUESTIONS } from "@/data/questions";

/**
 * Single source of truth for the site-wide question count. The Chrome agent
 * post-overhaul review flagged "14,402 / 12,573 / 2,398 / 2,374" inconsistencies
 * across the site (`/`, `/search`, `/quickstart`, `/topics`, ...) that hurt
 * trust. Every UI / metadata copy that mentions "X 問" should derive from one
 * of the constants below.
 */

/** Exact live count of questions in the bundle. */
export const TOTAL_QUESTIONS = ALL_QUESTIONS.length;

/**
 * Conservative floor rounded down to the nearest 1,000 so any copy that says
 * "X,000 問超" is always factually true even right after a data drop.
 */
export const APPROX_QUESTION_COUNT = Math.floor(TOTAL_QUESTIONS / 1000) * 1000;

/** Pre-formatted "X,XXX" string for the conservative floor. */
export const APPROX_QUESTION_COUNT_LABEL =
  APPROX_QUESTION_COUNT.toLocaleString("ja-JP");

/** Pre-formatted exact count ("X,XXX") for places that want today's number. */
export const TOTAL_QUESTIONS_LABEL = TOTAL_QUESTIONS.toLocaleString("ja-JP");
