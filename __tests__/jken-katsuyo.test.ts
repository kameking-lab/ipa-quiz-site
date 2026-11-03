import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { JKEN_KATSUYO1_QUESTIONS } from "@/data/questions/jken-katsuyo1";
import firstManifest from "@/data/exam-library/source-packs/jken-katsuyo/grade1/manifest.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { ALL_EXAM_CODES } from "@/lib/exam-config";
import type { Question } from "@/lib/questions/types";

const pools: { questions: Question[]; manifest: typeof firstManifest }[] = [
  { questions: JKEN_KATSUYO1_QUESTIONS, manifest: firstManifest },
];
describe("J検 official past questions in unpublished staging", () => {
  for (const { questions, manifest } of pools) {
    const code = questions[0]!.exam;
    it(`${code}: reconciles every official gap and keeps text, all option reasons and figures`, () => {
      expect(new Set(questions.map(q => q.id)).size).toBe(questions.length);
      for (const sitting of manifest.sittings) {
        const qs = questions.filter(q => q.id.includes(sitting.date));
        expect(qs).toHaveLength(sitting.count);
        for (const row of sitting.answers) {
          const q = qs.find(q => q.qNumber === row.problem * 100 + row.slot)!;
          expect(q.answer).toEqual(row.answer);
          expect(q.question).toContain(`問題${row.problem}`);
          expect(q.question.length).toBeGreaterThan(100);
          expect(q.choices).toBeDefined();
          expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
          expect(Object.values(q.choiceExplanations!).every(v => v!.length > 12)).toBe(true);
          expect(q.sourceAnswerUrl).toContain(`${sitting.date}_kaitojk`);
          expect(q.sourcePdfUrl).toContain(`${sitting.date}_mondaijk`);
          expect(isPracticeReadyQuestion(q)).toBe(true);
          expect(q.hasImage).toBe(Boolean(q.imageUrls?.length));
          for (const url of q.imageUrls ?? []) expect(existsSync(`${process.cwd()}/public${url}`)).toBe(true);
        }
      }
    });
    it(`${code}: blocks public routes, registries and IPA tools`, async () => {
      expect(isExamPublished(code)).toBe(false);
      expect(QUESTIONS_BY_EXAM[code]).toBeUndefined();
      expect(await getQuestionsForExam(code)).toEqual([]);
      expect(getRegisteredExamCodes()).not.toContain(code);
      expect(ALL_EXAM_CODES).not.toContain(code);
    });
  }
  it("accepts both officially corrected options of 2026 problem 6(1)", () => {
    expect(JKEN_KATSUYO1_QUESTIONS.find(q => q.id.endsWith("260621-m6-s1"))!.answer).toEqual(["イ", "ウ"]);
  });
});
