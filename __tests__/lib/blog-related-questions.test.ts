import { describe, expect, it } from "vitest";
import { getRelatedQuestionsForPost } from "@/lib/blog/related-questions";
import { isPlaceholderExplanation } from "@/lib/questions/filter";
import { ALL_QUESTIONS } from "@/data/questions";

// "ap" always has a populated question pool in the bundled data.
const EXAM = "ap" as const;

// Independently rebuild the linkable pool so ordering assertions don't rely on
// the function's own output to decide what "correct" looks like.
const LINKABLE_AP = ALL_QUESTIONS.filter(
  (q) =>
    q.exam === EXAM &&
    !q.needsReview &&
    !!q.choices &&
    !isPlaceholderExplanation(q),
);

describe("getRelatedQuestionsForPost (blog → /q internal-link network)", () => {
  it("returns [] when the post has no exam", () => {
    expect(getRelatedQuestionsForPost(undefined, ["any"])).toEqual([]);
  });

  it("caps the result at `limit` (default 3)", () => {
    expect(getRelatedQuestionsForPost(EXAM, []).length).toBeLessThanOrEqual(3);
    expect(getRelatedQuestionsForPost(EXAM, [], 5).length).toBeLessThanOrEqual(5);
  });

  it("only surfaces linkable questions of the post's exam", () => {
    // Linkable = same exam, has choices, not needs-review, not a placeholder
    // explanation — these all become live /q/* landing pages.
    for (const q of getRelatedQuestionsForPost(EXAM, [], 50)) {
      expect(q.exam).toBe(EXAM);
      expect(q.needsReview).not.toBe(true);
      expect(q.choices).toBeTruthy();
      expect(isPlaceholderExplanation(q)).toBe(false);
    }
  });

  it("is deterministic: ties break by year desc then qNumber asc", () => {
    // With no overlapping tags every candidate scores 0, so the order is the
    // pure tiebreak — the property that keeps SSG output stable.
    const result = getRelatedQuestionsForPost(EXAM, [], 50);
    expect(result.length).toBeGreaterThan(1);
    for (let i = 1; i < result.length; i++) {
      const prev = result[i - 1];
      const cur = result[i];
      if (prev.year === cur.year) {
        expect(prev.qNumber).toBeLessThanOrEqual(cur.qNumber);
      } else {
        expect(prev.year).toBeGreaterThan(cur.year);
      }
    }
  });

  it("leads with the newest year then the lowest qNumber (year-desc head)", () => {
    // Computed from the pool independently — catches a flipped year tiebreak
    // even when the top slice happens to fall inside a single year.
    const maxYear = Math.max(...LINKABLE_AP.map((q) => q.year));
    const minQInMaxYear = Math.min(
      ...LINKABLE_AP.filter((q) => q.year === maxYear).map((q) => q.qNumber),
    );
    const head = getRelatedQuestionsForPost(EXAM, [], 1)[0];
    expect(head.year).toBe(maxYear);
    expect(head.qNumber).toBe(minQInMaxYear);
  });

  it("ranks a category/tag-overlapping question to the top", () => {
    // Derive a real category from the pool, then feed it as a tag: matching
    // questions gain score (+2 category / +1 per topic tag) and must lead.
    const sample = getRelatedQuestionsForPost(EXAM, [], 50);
    const cat = sample[0].category;
    const top = getRelatedQuestionsForPost(EXAM, [cat], 5);
    expect(top.length).toBeGreaterThan(0);
    // The lead question must be one that actually scored on the tag.
    expect(top[0].category === cat || top[0].topicTags.includes(cat)).toBe(true);
  });

  it("returns the same result for identical inputs (stable for SSG)", () => {
    const a = getRelatedQuestionsForPost(EXAM, [], 3).map((q) => q.id);
    const b = getRelatedQuestionsForPost(EXAM, [], 3).map((q) => q.id);
    expect(a).toEqual(b);
  });
});
