import { ALL_QUESTIONS } from "@/data/questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

export const SITEMAP_CHUNK_SIZE = 10000;

// Match the direct question route exactly. Any question that cannot be
// practised is a 404 there, so it must not be advertised to crawlers.
export function getIndexableQuestions() {
  return ALL_QUESTIONS.filter(isPracticeReadyQuestion);
}

export function getSitemapChunkCount(): number {
  return Math.max(1, Math.ceil(getIndexableQuestions().length / SITEMAP_CHUNK_SIZE));
}
