import { ALL_QUESTIONS } from "@/data/questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { isQuestionCanonicalRepresentative } from "@/lib/seo/question-canonical";

export const SITEMAP_CHUNK_SIZE = 10000;

// Match the direct question route exactly. This is also the published/usable
// count source; the canonical-only sitemap subset is derived separately below.
export function getIndexableQuestions() {
  return ALL_QUESTIONS.filter(isPracticeReadyQuestion);
}

/**
 * Sitemap URLs are canonical destinations only. Morning-I alias pages remain
 * playable and keep their exam-specific UI, but exact source duplicates point
 * at one representative and therefore must not be advertised independently.
 */
export function getSitemapQuestions() {
  return getIndexableQuestions().filter((q) =>
    isQuestionCanonicalRepresentative(ALL_QUESTIONS, q),
  );
}

export function getSitemapChunkCount(): number {
  return Math.max(1, Math.ceil(getSitemapQuestions().length / SITEMAP_CHUNK_SIZE));
}
