import { describe, expect, it } from "vitest";
import { BOILER_SPECIAL_QUESTIONS } from "@/data/questions/boiler-special";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { existsSync } from "node:fs";

describe("special boiler complete official publications staging", () => {
  it("preserves 24 questions per publication and all four subjects", () => {
    expect(BOILER_SPECIAL_QUESTIONS).toHaveLength(48);
    expect(new Set(BOILER_SPECIAL_QUESTIONS.map(q => q.id)).size).toBe(48);
    for (const year of [2025, 2026]) {
      const qs = BOILER_SPECIAL_QUESTIONS.filter(q => q.year === year);
      expect(qs.map(q => q.qNumber)).toEqual(Array.from({length: 24}, (_, i) => i + 1));
      for (const category of ["構造", "取扱い", "燃料及び燃焼", "関係法令"]) expect(qs.filter(q => q.category === category)).toHaveLength(6);
      for (const q of qs) {
        expect(q.question.length).toBeGreaterThan(20);
        expect(q.modelAnswer).toBe(q.answer);
        expect(q.sourceAnswerUrl).toMatch(/#page=\d+$/);
        expect(q.explanation).toContain("法令は出題時点");
        expect(q.hasImage).toBe(Boolean(q.imageUrls?.length));
        for (const url of q.imageUrls ?? []) expect(existsSync(`public${url}`), url).toBe(true);
      }
    }
  });
  it("matches the official answer examples, including multiple response questions", () => {
    const find = (y: number, n: number) => BOILER_SPECIAL_QUESTIONS.find(q => q.year === y && q.qNumber === n)!;
    expect(find(2026, 1).modelAnswer).toContain("6978");
    expect(find(2025, 1).modelAnswer).toContain("20725");
    expect(find(2026, 6).modelAnswer).toMatch(/B\s+D/);
    expect(find(2025, 6).modelAnswer).toMatch(/C\s+D/);
    expect(find(2026, 24).modelAnswer).toMatch(/D\s+E/);
    expect(find(2025, 24).modelAnswer).toMatch(/C\s+E/);
  });
  it("stays unpublished in the public loader", async () => {
    expect(isExamPublished("boiler-special")).toBe(false);
    expect(await getQuestionsForExam("boiler-special")).toEqual([]);
  });
});
