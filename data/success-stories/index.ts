import type { ExamCode } from "@/lib/questions/types";
import { buildSuccessStory } from "./generators";
import { ALL_PERSONAS } from "./personas";
import type { SuccessStory, SuccessStorySummary } from "./types";
import { toSummary } from "./types";

const ALL_STORIES: SuccessStory[] = ALL_PERSONAS.map(buildSuccessStory);
const BY_SLUG: Map<string, SuccessStory> = new Map(
  ALL_STORIES.map((s) => [s.slug, s]),
);

export function getAllSuccessStories(): SuccessStory[] {
  return ALL_STORIES;
}

export function getAllSuccessStorySummaries(): SuccessStorySummary[] {
  return ALL_STORIES.map(toSummary).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getSuccessStoryBySlug(slug: string): SuccessStory | undefined {
  return BY_SLUG.get(slug);
}

export function getSuccessStoriesByExam(
  exam: ExamCode,
): SuccessStorySummary[] {
  return ALL_STORIES.filter((s) => s.exam === exam)
    .map(toSummary)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getAllSuccessStorySlugs(): { exam: ExamCode; slug: string }[] {
  return ALL_STORIES.map((s) => ({ exam: s.exam, slug: s.slug }));
}

export function getRelatedSuccessStories(
  slug: string,
  limit = 3,
): SuccessStorySummary[] {
  const target = BY_SLUG.get(slug);
  if (!target) return [];
  const sameExam = ALL_STORIES.filter(
    (s) => s.exam === target.exam && s.slug !== slug,
  )
    .map(toSummary)
    .slice(0, limit);
  if (sameExam.length >= limit) return sameExam;
  const others = ALL_STORIES.filter(
    (s) => s.exam !== target.exam && !sameExam.some((e) => e.slug === s.slug),
  )
    .map(toSummary)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, limit - sameExam.length);
  return [...sameExam, ...others];
}

export function getSuccessStoryExams(): ExamCode[] {
  const set = new Set<ExamCode>();
  for (const s of ALL_STORIES) set.add(s.exam);
  return Array.from(set);
}

export function getSuccessStoryCountByExam(): Map<ExamCode, number> {
  const counts = new Map<ExamCode, number>();
  for (const s of ALL_STORIES) {
    counts.set(s.exam, (counts.get(s.exam) ?? 0) + 1);
  }
  return counts;
}
