import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "@/data/questions";
import type { ChoiceKey, ExamCode } from "@/lib/questions/types";

const REQUIRED_YEARS: Partial<Record<ExamCode, number[]>> = {
  sc: [2024, 2025],
  nw: [2024, 2025],
  db: [2024, 2025],
  st: [2024, 2025],
  sa: [2024, 2025],
  pm: [2024, 2025],
  es: [2024, 2025],
  sm: [2024, 2025],
  au: [2024, 2025],
};

const EXPECTED_COUNTS: Partial<Record<ExamCode, number>> = {
  sc: 220,
  nw: 110,
  db: 110,
  st: 110,
  sa: 110,
  pm: 110,
  es: 110,
  sm: 110,
  au: 110,
};

describe("IPA latest two published years have an explanation for every choice", () => {
  for (const [exam, years] of Object.entries(REQUIRED_YEARS) as Array<[ExamCode, number[]]>) {
    it(`${exam} covers every objective question in ${years.join("/")}`, () => {
      const questions = ALL_QUESTIONS.filter((question) =>
        question.exam === exam
        && years.includes(question.year)
        && question.type === "multiple-choice"
        && question.choices);
      const expectedCount = EXPECTED_COUNTS[exam];
      if (expectedCount === undefined) throw new Error(`missing expected count: ${exam}`);
      expect(questions).toHaveLength(expectedCount);

      for (const question of questions) {
        const choiceKeys = Object.keys(question.choices ?? {}).sort() as ChoiceKey[];
        const explanationKeys = Object.keys(question.choiceExplanations ?? {}).sort() as ChoiceKey[];
        expect(explanationKeys, question.id).toEqual(choiceKeys);
        const correct = new Set(Array.isArray(question.answer) ? question.answer : [question.answer]);
        const reasons = choiceKeys.map((key) => question.choiceExplanations?.[key]?.trim() ?? "");
        expect(new Set(reasons).size, question.id).toBe(reasons.length);

        for (const [index, key] of choiceKeys.entries()) {
          const reason = reasons[index]!;
          expect(reason.length, `${question.id}/${key}`).toBeGreaterThanOrEqual(55);
          expect(reason, `${question.id}/${key}`).not.toMatch(/準備中|今後追加|正答ではないから/u);
          expect(reason.startsWith(correct.has(key) ? "正しいです。" : "誤りです。"), `${question.id}/${key}`).toBe(true);
        }
      }
    });
  }
});
