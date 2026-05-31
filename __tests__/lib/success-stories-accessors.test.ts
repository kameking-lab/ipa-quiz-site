import { describe, expect, it } from "vitest";
import {
  getAllSuccessStories,
  getAllSuccessStorySlugs,
  getRelatedSuccessStories,
  getSimilarPersonaStories,
  getSuccessStoriesByExam,
  getSuccessStoryBySlug,
  getSuccessStoryCountByExam,
  getSuccessStoryExams,
} from "@/data/success-stories";

// Pick an exam that has enough stories to fill a same-exam related list
// (target itself + at least `limit` others), derived from real data so the
// test stays valid as personas are added.
function examWithAtLeast(n: number): string {
  for (const [exam, count] of getSuccessStoryCountByExam()) {
    if (count >= n) return exam;
  }
  throw new Error("no exam with enough stories");
}

describe("success-stories accessors (indexable /success-stories pages)", () => {
  it("getSuccessStoryExams dedups and only lists exams present in the data", () => {
    const exams = getSuccessStoryExams();
    expect(new Set(exams).size).toBe(exams.length);
    const present = new Set(getAllSuccessStories().map((s) => s.exam));
    for (const e of exams) expect(present.has(e)).toBe(true);
    expect(exams.length).toBe(present.size);
  });

  it("getSuccessStoryCountByExam sums to the total story count, all positive", () => {
    const counts = getSuccessStoryCountByExam();
    let sum = 0;
    for (const c of counts.values()) {
      expect(c).toBeGreaterThan(0);
      sum += c;
    }
    expect(sum).toBe(getAllSuccessStories().length);
  });

  it("getSuccessStoriesByExam returns only that exam, newest-first, as summaries", () => {
    const exam = examWithAtLeast(2);
    const list = getSuccessStoriesByExam(exam as never);
    expect(list.length).toBeGreaterThan(0);
    for (const s of list) {
      expect(s.exam).toBe(exam);
      expect(s).not.toHaveProperty("body");
    }
    for (let i = 1; i < list.length; i++) {
      expect(
        list[i - 1].publishedAt.localeCompare(list[i].publishedAt),
      ).toBeGreaterThanOrEqual(0);
    }
  });

  it("getSuccessStoryBySlug round-trips a known slug and rejects unknown", () => {
    const { slug } = getAllSuccessStorySlugs()[0];
    expect(getSuccessStoryBySlug(slug)?.slug).toBe(slug);
    expect(getSuccessStoryBySlug("__nope__")).toBeUndefined();
  });

  describe("getRelatedSuccessStories", () => {
    it("returns [] for an unknown slug", () => {
      expect(getRelatedSuccessStories("__nope__")).toEqual([]);
    });

    it("excludes the target, dedups, and caps at limit", () => {
      const { slug } = getAllSuccessStorySlugs()[0];
      const related = getRelatedSuccessStories(slug, 3);
      expect(related.length).toBeLessThanOrEqual(3);
      expect(related.some((s) => s.slug === slug)).toBe(false);
      expect(new Set(related.map((s) => s.slug)).size).toBe(related.length);
    });

    it("prefers same-exam stories before falling back to others", () => {
      const exam = examWithAtLeast(4); // target + >=3 same-exam others
      const target = getAllSuccessStorySlugs().find((s) => s.exam === exam)!;
      const related = getRelatedSuccessStories(target.slug, 3);
      expect(related.length).toBe(3);
      // With >=3 same-exam others available, every slot is same-exam.
      for (const s of related) expect(s.exam).toBe(exam);
    });
  });

  describe("getSimilarPersonaStories", () => {
    it("returns [] for an unknown slug", () => {
      expect(getSimilarPersonaStories("__nope__")).toEqual([]);
    });

    it("never includes the target, dedups, caps at limit (default 4)", () => {
      const { slug } = getAllSuccessStorySlugs()[0];
      const matches = getSimilarPersonaStories(slug);
      expect(matches.length).toBeLessThanOrEqual(4);
      expect(matches.some((m) => m.story.slug === slug)).toBe(false);
      expect(new Set(matches.map((m) => m.story.slug)).size).toBe(matches.length);
    });

    it("annotates every match with a non-empty reason string", () => {
      // Scan all stories so we exercise both matching passes across the data.
      for (const { slug } of getAllSuccessStorySlugs()) {
        for (const m of getSimilarPersonaStories(slug)) {
          expect(typeof m.reason).toBe("string");
          expect(m.reason.startsWith("同じ")).toBe(true);
          expect(m.story).not.toHaveProperty("body");
        }
      }
    });
  });
});
