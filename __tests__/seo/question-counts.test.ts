import { describe, expect, it } from "vitest";

import { ALL_QUESTIONS } from "@/data/questions";
import { EXAM_QUESTION_COUNTS } from "@/lib/constants/exam-question-counts";
import {
  APPROX_QUESTION_COUNT,
  APPROX_QUESTION_COUNT_LABEL,
  TOTAL_QUESTIONS_PUBLISHED,
  TOTAL_QUESTIONS_RAW,
} from "@/lib/constants/question-counts";
import { getIndexableQuestions } from "@/lib/seo/sitemap-pagination";

describe("question-counts single source of truth", () => {
  it("RAW equals the full dataset length", () => {
    expect(TOTAL_QUESTIONS_RAW).toBe(ALL_QUESTIONS.length);
  });

  it("PUBLISHED equals the indexable (sitemap) set length", () => {
    expect(TOTAL_QUESTIONS_PUBLISHED).toBe(getIndexableQuestions().length);
  });

  it("PUBLISHED never exceeds RAW", () => {
    expect(TOTAL_QUESTIONS_PUBLISHED).toBeLessThanOrEqual(TOTAL_QUESTIONS_RAW);
  });

  it("APPROX label is the published total floored to 1,000 and never overstates", () => {
    expect(APPROX_QUESTION_COUNT).toBe(
      Math.floor(TOTAL_QUESTIONS_PUBLISHED / 1000) * 1000,
    );
    // "X,000問超" must be a true claim: the floor cannot exceed the real total.
    expect(APPROX_QUESTION_COUNT).toBeLessThanOrEqual(TOTAL_QUESTIONS_PUBLISHED);
    expect(APPROX_QUESTION_COUNT_LABEL).toBe(
      APPROX_QUESTION_COUNT.toLocaleString("ja-JP"),
    );
  });

  it("per-exam counts sum exactly to the published headline total", () => {
    // F-6: breakdowns must reconcile to the headline. Both derive from the
    // indexable set, so the sum is the published total — never the raw length.
    const sum = Object.values(EXAM_QUESTION_COUNTS).reduce(
      (acc, n) => acc + (n ?? 0),
      0,
    );
    expect(sum).toBe(TOTAL_QUESTIONS_PUBLISHED);
    expect(sum).toBeLessThan(TOTAL_QUESTIONS_RAW);
  });
});
