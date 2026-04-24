import { ALL_QUESTIONS } from "@/data/questions";

export const SITEMAP_CHUNK_SIZE = 10000;

export function getIndexableQuestions() {
  return ALL_QUESTIONS;
}

export function getSitemapChunkCount(): number {
  return Math.max(1, Math.ceil(getIndexableQuestions().length / SITEMAP_CHUNK_SIZE));
}
