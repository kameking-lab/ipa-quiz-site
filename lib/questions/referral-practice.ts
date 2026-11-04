import type { Question } from "./types";
import { isPracticeReadyQuestion } from "./filter";

/** Start with the first published question of the latest matching paper.
 * The caller supplies its already scoped corpus (exam/year/category). */
export function referralPracticeHref(questions: readonly Question[], returnTo: string, category?: string): string | null {
  const first = questions.filter(isPracticeReadyQuestion).sort((a, b) =>
    b.year - a.year || b.season.localeCompare(a.season) || a.session.localeCompare(b.session) || a.qNumber - b.qNumber,
  )[0];
  if (!first) return null;
  return `/quiz?${new URLSearchParams({ mode: "year", exam: first.exam, year: String(first.year),
    season: first.season, session: first.session, order: "1", question: first.id, returnTo, ...(category ? { category } : {}) }).toString()}`;
}
