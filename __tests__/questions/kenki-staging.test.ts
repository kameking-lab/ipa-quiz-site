import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { KENKI1_QUESTIONS } from "@/data/questions/kenki1";
import answers from "@/data/qualification-staging/kenki/level1/official-answers.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsByExam } from "@/lib/questions/get-questions";
import { isExamPublished } from "@/lib/qualifications/catalog";

const keys = ["ア", "イ", "ウ", "エ"];
describe("kenki1 official two-year staging", () => {
  it("retains every original question and its official answer", () => {
    expect(KENKI1_QUESTIONS).toHaveLength(112);
    expect(new Set(KENKI1_QUESTIONS.map(q => q.id)).size).toBe(112);
    for (const year of [2025, 2026] as const) {
      const questions = KENKI1_QUESTIONS.filter(q => q.year === year);
      expect(questions.map(q => q.qNumber)).toEqual(Array.from({ length: 56 }, (_, i) => i + 1));
      for (const q of questions) {
        const official = answers[year][q.qNumber - 1];
        expect(q.officialAnswerNumber).toBe(String(official));
        expect(q.answer).toBe(keys[official - 1]);
        expect(Object.keys(q.choices ?? {})).toEqual(keys);
        expect(Object.values(q.choiceExplanations ?? {})).toHaveLength(4);
        for (const explanation of Object.values(q.choiceExplanations ?? {})) expect(explanation!.length).toBeGreaterThan(20);
        expect(q.sourcePdfUrl).toMatch(/^https:\/\/jcmanet-shiken.jp\/.*\.pdf#page=\d+$/);
        expect(q.sourceAnswerUrl).toMatch(/^https:\/\/jcmanet-shiken.jp\/.*\.pdf$/);
        expect([q.question, ...Object.values(q.choices ?? {})].join(" ")).not.toMatch(/\(cid:|方2法/);
      }
    }
  });
  it("keeps the complete figures and corrected units and symbols", () => {
    const figures = KENKI1_QUESTIONS.filter(q => q.hasImage);
    expect(figures).toHaveLength(3);
    for (const q of figures) {
      for (const url of q.imageUrls ?? []) expect(existsSync(join(process.cwd(), "public", url))).toBe(true);
    }
    const q52 = KENKI1_QUESTIONS.find(q => q.year === 2025 && q.qNumber === 52)!;
    expect(q52.choices?.ア).toContain("8時間");
    expect(q52.choices?.イ).toContain("8時間");
    expect(KENKI1_QUESTIONS.find(q => q.year === 2025 && q.qNumber === 34)?.choices?.ア).toBe("8日");
  });
  it("keeps both synchronous and lazy public loaders closed", async () => {
    expect(isExamPublished("kenki1")).toBe(false);
    expect(QUESTIONS_BY_EXAM.kenki1).toBeUndefined();
    expect(await getQuestionsByExam("kenki1")).toEqual([]);
  });
});
