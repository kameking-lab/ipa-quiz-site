import { ALL_QUESTIONS } from "@/data/questions";
import { isPlaceholderExplanation } from "@/lib/questions/filter";

export const SITEMAP_CHUNK_SIZE = 10000;

// Only emit URLs we actually want indexed. The /q/* page sets robots: noindex
// for placeholder explanations, so listing those URLs in the sitemap creates
// Search Console "Submitted URL marked 'noindex'" warnings and wastes crawl
// budget. As of 2026-05-26 ~1,742 questions carry placeholder explanations
// (noindex), so this filter is load-bearing, not theoretical.
// needsReview questions 404 at /q/* (see app/q/.../page.tsx), so exclude them
// here too — otherwise the sitemap advertises URLs that resolve to 404.
export function getIndexableQuestions() {
  return ALL_QUESTIONS.filter((q) => !isPlaceholderExplanation(q) && !q.needsReview);
}

export function getSitemapChunkCount(): number {
  return Math.max(1, Math.ceil(getIndexableQuestions().length / SITEMAP_CHUNK_SIZE));
}
