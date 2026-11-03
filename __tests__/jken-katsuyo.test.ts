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

import { JKEN_KATSUYO2_QUESTIONS } from "@/data/questions/jken-katsuyo2";
import secondManifest from "@/data/exam-library/source-packs/jken-katsuyo/grade2/manifest.json";

import { JKEN_KATSUYO3_QUESTIONS } from "@/data/questions/jken-katsuyo3";
import thirdManifest from "@/data/exam-library/source-packs/jken-katsuyo/grade3/manifest.json";

import { questionNumberLabel } from "@/lib/questions/display";

import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";

import { questionSourceEdition } from "@/lib/questions/source-label";

const pools: { questions: Question[]; manifest: typeof firstManifest }[] = [
  { questions: JKEN_KATSUYO1_QUESTIONS, manifest: firstManifest },
  { questions: JKEN_KATSUYO2_QUESTIONS, manifest: secondManifest },
  { questions: JKEN_KATSUYO3_QUESTIONS, manifest: thirdManifest },
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
          expect(questionNumberLabel(q)).toBe(`問題${row.problem}(${row.slot})`);
          expect(q.question.length).toBeGreaterThan(100);
          expect(q.choices).toBeDefined();
          expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
          expect(Object.values(q.choiceExplanations!).every(v => v!.length > 12)).toBe(true);
          expect(questionSourceEdition(q)).toContain(sitting.date === "260621" ? "令和8年度前期" : "令和7年度後期");
          expect(q.sourceAnswerUrl).toContain(`${sitting.date}_kaitojk`);
          expect(q.sourcePdfUrl).toContain(`${sitting.date}_mondaijk`);
          expect(isPracticeReadyQuestion(q)).toBe(true);
          expect(q.hasImage).toBe(Boolean(q.imageUrls?.length));
          for (const url of q.imageUrls ?? []) expect(existsSync(`${process.cwd()}/public${url}`)).toBe(true);
        }
      }
    });
    it(`${code}: attributes source authorship to SGEC`, () => {
      const ld = buildQuestionJsonLd({ question: questions[0]!, pageUrlAbs: "https://example.com/source", title: "J検" });
      expect(ld["@graph"][0]).toMatchObject({ creator: { name: "一般財団法人職業教育・キャリア教育財団" } });
      expect(ld["@graph"][0]).not.toHaveProperty("license");
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
