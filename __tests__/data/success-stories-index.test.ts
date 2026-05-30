import { describe, expect, it } from "vitest";

import {
  getAllSuccessStories,
  getAllSuccessStorySlugs,
  getAllSuccessStorySummaries,
  getRelatedSuccessStories,
  getSimilarPersonaStories,
  getSuccessStoriesByExam,
  getSuccessStoryBySlug,
  getSuccessStoryCountByExam,
  getSuccessStoryExams,
} from "@/data/success-stories";

// Characterization tests for the success-story registry + persona matcher
// (consumed by the /success-stories routes). The matcher runs purely on static
// metadata so every visitor sees the same recommendations — we pin the lookup,
// related, aggregation, and two-pass similarity contracts against the real
// persona corpus, plus structural invariants (limit / self-exclusion / dedup).

const ALL = getAllSuccessStories();

// Re-implementations of the module's private bucketers, so a threshold drift in
// the source is caught by the union-relevance assertion below rather than
// silently tracked by the same (mutated) code.
function ageDecade(ageRange: string): string {
  const m = /(\d+)代/.exec(ageRange);
  return m ? `${m[1]}代` : ageRange;
}
function occupationBucket(occupation: string): string {
  const o = occupation.toLowerCase();
  if (o.includes("学生") || o.includes("大学院") || o.includes("院生") || o.includes("新卒")) {
    return "student";
  }
  if (o.includes("フリーランス") || o.includes("個人事業")) return "freelance";
  if (occupation.trim().length > 0) return "professional";
  return "other";
}
function studyMonthsBucket(m: number): string {
  if (m < 3) return "lt3";
  if (m <= 6) return "3to6";
  if (m <= 12) return "6to12";
  return "12plus";
}

describe("registry: getAllSuccessStories / slugs / summaries", () => {
  it("has a non-empty, slug-unique corpus", () => {
    expect(ALL.length).toBeGreaterThan(0);
    const slugs = ALL.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(getAllSuccessStorySlugs().length).toBe(ALL.length);
  });

  it("summaries are newest-first and drop the body", () => {
    const summaries = getAllSuccessStorySummaries();
    expect(summaries.length).toBe(ALL.length);
    for (let i = 1; i < summaries.length; i++) {
      expect(
        summaries[i - 1].publishedAt.localeCompare(summaries[i].publishedAt),
      ).toBeGreaterThanOrEqual(0);
    }
    expect(summaries[0]).not.toHaveProperty("body");
  });
});

describe("getSuccessStoryBySlug", () => {
  it("round-trips a real slug and is undefined for an unknown one", () => {
    expect(getSuccessStoryBySlug(ALL[0].slug)?.slug).toBe(ALL[0].slug);
    expect(getSuccessStoryBySlug("no-such-story")).toBeUndefined();
  });
});

describe("getSuccessStoriesByExam", () => {
  it("returns only that exam's stories, newest-first", () => {
    const exam = ALL[0].exam;
    const stories = getSuccessStoriesByExam(exam);
    expect(stories.length).toBeGreaterThan(0);
    expect(stories.every((s) => s.exam === exam)).toBe(true);
    for (let i = 1; i < stories.length; i++) {
      expect(
        stories[i - 1].publishedAt.localeCompare(stories[i].publishedAt),
      ).toBeGreaterThanOrEqual(0);
    }
  });
});

describe("getRelatedSuccessStories", () => {
  it("returns [] for an unknown slug", () => {
    expect(getRelatedSuccessStories("no-such-story")).toEqual([]);
  });

  it("respects the limit, excludes self, and has no duplicates", () => {
    for (const limit of [1, 3, 5]) {
      for (const target of ALL) {
        const related = getRelatedSuccessStories(target.slug, limit);
        expect(related.length).toBeLessThanOrEqual(limit);
        expect(related.some((r) => r.slug === target.slug)).toBe(false);
        expect(new Set(related.map((r) => r.slug)).size).toBe(related.length);
      }
    }
  });

  it("prioritises same-exam stories before filling with others", () => {
    for (const target of ALL) {
      const sameExamCount = ALL.filter(
        (s) => s.exam === target.exam && s.slug !== target.slug,
      ).length;
      const related = getRelatedSuccessStories(target.slug, 3);
      const expectedSameExam = Math.min(sameExamCount, 3);
      // The first expectedSameExam entries must all be the target's exam.
      for (let i = 0; i < expectedSameExam; i++) {
        expect(related[i].exam).toBe(target.exam);
      }
    }
  });
});

describe("getSimilarPersonaStories", () => {
  it("returns [] for an unknown slug", () => {
    expect(getSimilarPersonaStories("no-such-story")).toEqual([]);
  });

  it("respects the limit, excludes self, dedups, and annotates a reason", () => {
    for (const target of ALL) {
      const matches = getSimilarPersonaStories(target.slug, 4);
      expect(matches.length).toBeLessThanOrEqual(4);
      const slugs = matches.map((m) => m.story.slug);
      expect(slugs).not.toContain(target.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
      for (const m of matches) expect(m.reason.length).toBeGreaterThan(0);
    }
  });

  it("every match satisfies at least one of the two criteria", () => {
    for (const target of ALL) {
      const tStory = getSuccessStoryBySlug(target.slug)!;
      const tDecade = ageDecade(tStory.persona.ageRange);
      const tOcc = occupationBucket(tStory.persona.occupation);
      const tStudy = studyMonthsBucket(tStory.persona.studyMonths);
      for (const m of getSimilarPersonaStories(target.slug, 4)) {
        const s = getSuccessStoryBySlug(m.story.slug)!;
        const crit1 =
          ageDecade(s.persona.ageRange) === tDecade &&
          occupationBucket(s.persona.occupation) === tOcc;
        const crit2 =
          s.exam === target.exam &&
          studyMonthsBucket(s.persona.studyMonths) === tStudy;
        expect(crit1 || crit2).toBe(true);
      }
    }
  });

  it("orders pass-1 (decade+occupation) reasons before pass-2 (exam+study) reasons", () => {
    for (const target of ALL) {
      const matches = getSimilarPersonaStories(target.slug, 4);
      // pass-2 reasons contain the '・学習' separator; pass-1 reasons do not.
      const firstPass2 = matches.findIndex((m) => m.reason.includes("・学習"));
      if (firstPass2 === -1) continue;
      for (let i = firstPass2; i < matches.length; i++) {
        expect(matches[i].reason).toContain("・学習");
      }
    }
  });
});

describe("aggregation: getSuccessStoryExams / getSuccessStoryCountByExam", () => {
  it("lists exactly the distinct exams present", () => {
    const exams = getSuccessStoryExams();
    expect(new Set(exams).size).toBe(exams.length);
    expect(new Set(exams)).toEqual(new Set(ALL.map((s) => s.exam)));
  });

  it("per-exam counts sum to the corpus size and match the filtered counts", () => {
    const counts = getSuccessStoryCountByExam();
    let sum = 0;
    for (const [exam, n] of counts) {
      sum += n;
      expect(n).toBe(ALL.filter((s) => s.exam === exam).length);
    }
    expect(sum).toBe(ALL.length);
  });
});
