import { describe, it, expect } from "vitest";

import {
  EXAM_DESCRIPTIONS,
  getAvailableExams,
  examMetaDescription,
  countByExam,
  getQuestionsByExamStrict,
} from "@/lib/seo/exam-meta";
import { ALL_EXAM_CODES } from "@/lib/exam-config";
import { QUESTIONS_BY_EXAM } from "@/data/questions";

/**
 * Characterization tests for the four exam-meta exports that
 * exam-meta-grouping.test.ts leaves uncovered (partial-coverage gap):
 * EXAM_DESCRIPTIONS / getAvailableExams / examMetaDescription / countByExam.
 * These drive the per-exam hub <meta description> and the published exam list,
 * so the load-bearing contracts are: full exam coverage, counts that reconcile
 * to the strict (indexable) basis, and mode-specific copy.
 */

describe("EXAM_DESCRIPTIONS", () => {
  it("covers every exam code with a non-empty description", () => {
    for (const exam of ALL_EXAM_CODES) {
      const desc = EXAM_DESCRIPTIONS[exam];
      expect(desc, `missing description for ${exam}`).toBeTruthy();
      expect((desc ?? "").length).toBeGreaterThan(10);
    }
  });
});

describe("getAvailableExams", () => {
  it("returns only exams that actually have questions", () => {
    const available = getAvailableExams();
    expect(available.length).toBeGreaterThan(0);
    for (const exam of available) {
      expect((QUESTIONS_BY_EXAM[exam]?.length ?? 0)).toBeGreaterThan(0);
    }
  });

  it("excludes exams whose pool is empty", () => {
    const available = new Set(getAvailableExams());
    for (const exam of ALL_EXAM_CODES) {
      const hasQuestions = (QUESTIONS_BY_EXAM[exam]?.length ?? 0) > 0;
      expect(available.has(exam)).toBe(hasQuestions);
    }
  });

  it("includes ap (always populated in the corpus)", () => {
    expect(getAvailableExams()).toContain("ap");
  });
});

describe("countByExam", () => {
  it("equals the strict (indexable) pool length", () => {
    for (const exam of ALL_EXAM_CODES) {
      expect(countByExam(exam)).toBe(getQuestionsByExamStrict(exam).length);
    }
  });

  it("is strictly below the raw module length (needsReview / placeholder excluded)", () => {
    // 現コーパスでは全区分が needsReview / placeholder 説明の問題を含むため、
    // 公開カウントは生の収録数より必ず小さい。strict フィルタが外れて生の長さを
    // 返すと、この厳密不等号が崩れて検出できる(load-bearing なゲート)。
    for (const exam of ALL_EXAM_CODES) {
      const raw = QUESTIONS_BY_EXAM[exam]?.length ?? 0;
      expect(countByExam(exam)).toBeLessThan(raw);
    }
  });

  it("is positive for ap", () => {
    expect(countByExam("ap")).toBeGreaterThan(0);
  });
});

describe("examMetaDescription", () => {
  it("year mode advertises the year-first framing, count and free-access copy", () => {
    const desc = examMetaDescription("ap", 1234, "year");
    expect(desc).toContain("年度別");
    expect(desc).toContain("1,234"); // toLocaleString("ja-JP") の桁区切り
    expect(desc).toContain("会員登録不要");
    expect(desc).toContain("応用情報技術者試験");
  });

  it("topic mode advertises the topic-first framing", () => {
    const desc = examMetaDescription("ap", 1234, "topic");
    expect(desc).toContain("分野別");
    expect(desc).toContain("1,234");
    expect(desc).toContain("会員登録不要");
  });

  it("default mode uses the diverse per-exam copy and embeds the formatted count", () => {
    const year = examMetaDescription("ap", 1234, "year");
    const fallback = examMetaDescription("ap", 1234);
    expect(fallback).toContain("1,234");
    expect(fallback.length).toBeGreaterThan(0);
    // diverse copy is distinct from the year/topic templated copy.
    expect(fallback).not.toBe(year);
  });

  it("produces a description for every exam in all three modes without throwing", () => {
    for (const exam of ALL_EXAM_CODES) {
      for (const mode of [undefined, "year", "topic"] as const) {
        const desc = examMetaDescription(exam, 100, mode);
        expect(desc.length).toBeGreaterThan(0);
      }
    }
  });
});
