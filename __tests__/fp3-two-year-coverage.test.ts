import { describe, expect, it } from "vitest";

import { FP3_QUESTIONS } from "@/data/questions/fp3";
import practical from "@/data/questions/fp3/practical-2024-2025.json";
import figures from "@/data/questions/fp3/practical-figures-2024-2025.json";
import { getChoiceKeys } from "@/lib/questions/answers";

describe("FP3 2024–2025 complete official sets", () => {
  it("contains every published academic question for both years", () => {
    expect(FP3_QUESTIONS.filter((question) => question.year === 2024 || question.year === 2025)).toHaveLength(120);
    for (const year of [2024, 2025]) {
      const rows = FP3_QUESTIONS.filter((question) => question.year === year);
      expect(rows).toHaveLength(60);
      expect(rows.map((question) => question.qNumber)).toEqual(Array.from({ length: 60 }, (_, index) => index + 1));
    }
  });

  it("keeps the official true/false and three-choice formats with all-choice explanations", () => {
    for (const question of FP3_QUESTIONS) {
      const keys = getChoiceKeys(question.choices);
      expect(keys).toHaveLength(question.qNumber <= 30 ? 2 : 3);
      expect(Object.keys(question.choiceExplanations ?? {}).sort()).toEqual([...keys].sort());
      expect(keys).toContain(question.answer);
      expect(question.needsReview).toBe(false);
      expect(question.sourcePdfUrl).toMatch(/^https:\/\/www\.jafp\.or\.jp\/exam\/mohan\/files\/g3_/);
      expect((question.officialReferenceUrls ?? []).every((url) => /^(?:https:\/\/laws\.e-gov\.go\.jp\/law\/|https:\/\/[^/]+\.(?:mhlw|fsa|nta|mlit)\.go\.jp\/|https:\/\/www\.jfc\.go\.jp\/)/.test(url))).toBe(true);
    }
    expect(FP3_QUESTIONS.filter((question) => (question.officialReferenceUrls ?? []).length > 0).length).toBeGreaterThanOrEqual(70);
    expect(FP3_QUESTIONS.find((question) => question.year === 2024 && question.qNumber === 2)?.officialReferenceUrls)
      .toEqual([expect.stringContaining("349AC0000000116")]);
    expect(FP3_QUESTIONS.find((question) => question.year === 2024 && question.qNumber === 3)?.officialReferenceUrls)
      .toEqual([expect.stringContaining("334AC0000000141")]);
  });

  it("contains both complete practical sets and readable explanations for every choice", () => {
    expect(Object.keys(practical).sort()).toEqual(["202405", "202505"]);
    for (const edition of Object.keys(practical) as Array<keyof typeof practical>) {
      const rows = practical[edition].questions;
      expect(rows).toHaveLength(20);
      expect(rows.map((question) => question.number)).toEqual(Array.from({ length: 20 }, (_, index) => index + 1));
      for (const question of rows) {
        expect(question.choices).toHaveLength(3);
        expect(question.answer).toBeGreaterThanOrEqual(1);
        expect(question.answer).toBeLessThanOrEqual(3);
        expect(Object.keys(question.choiceExplanations).sort()).toEqual(["ア", "イ", "ウ"]);
        expect(question.needsReview).toBe(false);
      }
      expect(Object.keys(figures[edition])).toHaveLength(20);
    }
  });
});
