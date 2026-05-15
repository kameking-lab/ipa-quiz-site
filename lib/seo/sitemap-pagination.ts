import { ALL_QUESTIONS } from "@/data/questions";
import { isPlaceholderExplanation } from "@/lib/questions/filter";

export const SITEMAP_CHUNK_SIZE = 10000;

// Only emit URLs we actually want indexed. The /q/* page sets robots: noindex
// for placeholder explanations, so listing those URLs in the sitemap creates
// Search Console "Submitted URL marked 'noindex'" warnings and wastes crawl
// budget. Today the placeholder set is empty, but keeping the filter here
// means a future content regeneration that reintroduces them stays consistent.
export function getIndexableQuestions() {
  return ALL_QUESTIONS.filter((q) => !isPlaceholderExplanation(q));
}

export function getSitemapChunkCount(): number {
  return Math.max(1, Math.ceil(getIndexableQuestions().length / SITEMAP_CHUNK_SIZE));
}
