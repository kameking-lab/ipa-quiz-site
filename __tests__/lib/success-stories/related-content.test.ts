import { describe, it, expect } from "vitest";
import { getRelatedSuccessStoriesByExam } from "@/lib/success-stories/related-content";
import { getSuccessStoriesByExam } from "@/data/success-stories";
import type { ExamCode } from "@/lib/questions/types";

// `ap` carries the most success stories (8 at time of writing), so it exercises
// the limit cap meaningfully; `nw` carries few (2), exercising the "fewer than
// limit" path. The expectations are derived from getSuccessStoriesByExam so the
// test stays correct as the persona corpus grows.
const MANY_EXAM: ExamCode = "ap";
const FEW_EXAM: ExamCode = "nw";

describe("getRelatedSuccessStoriesByExam", () => {
  it("defaults to at most 3 stories", () => {
    const result = getRelatedSuccessStoriesByExam(MANY_EXAM);
    const full = getSuccessStoriesByExam(MANY_EXAM);
    expect(full.length).toBeGreaterThan(3); // guard: the cap is observable
    expect(result).toHaveLength(3);
  });

  it("returns the newest-first prefix of the exam's stories", () => {
    const result = getRelatedSuccessStoriesByExam(MANY_EXAM);
    const expected = getSuccessStoriesByExam(MANY_EXAM).slice(0, 3);
    expect(result).toEqual(expected);
  });

  it("only returns stories for the requested exam", () => {
    for (const s of getRelatedSuccessStoriesByExam(MANY_EXAM)) {
      expect(s.exam).toBe(MANY_EXAM);
    }
  });

  it("honours a custom limit", () => {
    const result = getRelatedSuccessStoriesByExam(MANY_EXAM, 5);
    expect(result).toEqual(getSuccessStoriesByExam(MANY_EXAM).slice(0, 5));
    expect(result).toHaveLength(5);
  });

  it("returns all available stories when the limit exceeds the count (no padding)", () => {
    const full = getSuccessStoriesByExam(FEW_EXAM);
    const result = getRelatedSuccessStoriesByExam(FEW_EXAM, 100);
    expect(result).toEqual(full);
    expect(result.length).toBe(full.length);
  });

  it("returns an empty array for a limit of 0", () => {
    expect(getRelatedSuccessStoriesByExam(MANY_EXAM, 0)).toEqual([]);
  });

  it("returns an empty array for an exam with no stories", () => {
    // `it` (IT パスポート) is a valid ExamCode label form; there are no
    // success stories under a bogus code, so the filter yields nothing.
    expect(
      getRelatedSuccessStoriesByExam("__no_such_exam__" as ExamCode),
    ).toEqual([]);
  });
});
