import { describe, expect, it } from "vitest";
import { KHK_HANBAI_QUESTIONS } from "@/data/questions/khk-hanbai";
import keys from "@/data/questions/khk-hanbai/official-answers.json";
import { QUESTIONS_BY_EXAM, ALL_QUESTIONS } from "@/data/questions";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { getRegisteredExamCodes, getQuestionsForExam } from "@/lib/questions/get-questions";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel } from "@/lib/questions/display";

describe("KHK first sales: official source and staging", () => {
  it("keeps both 40-question annual sittings, every official answer and all five explanations", () => {
    expect(KHK_HANBAI_QUESTIONS).toHaveLength(80);
    for (const year of [2025, 2024]) {
      for (const [code, session] of [["JX", "houki"], ["JY", "gas-technology"]] as const) {
        const rows = KHK_HANBAI_QUESTIONS.filter(q => q.year === year && q.session === session);
        expect(rows.map(q => q.qNumber)).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
        expect(rows.map(q => "アイウエオ".indexOf(q.answer as string) + 1).join("")).toBe(keys[`${year}-${code}` as keyof typeof keys]);
        for (const q of rows) {
          expect(Object.keys(q.choices!)).toEqual(["ア", "イ", "ウ", "エ", "オ"]);
          expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
          expect(q.question).not.toMatch(/cid:|\.indd|J J/);
          expect(q.sourcePdfUrl).toContain(`R${year - 2018}AC${code}-W.pdf`);
          expect(q.sourceAnswerUrl).toContain(`R${year - 2018}fy_kaitou.pdf`);
          if (session === "houki") expect(q.lawReferenceDate).toBe(`${year}-04-01`);
        }
      }
    }
  });
  it("registers the route configuration while excluding the pilot from every public question registry", async () => {
    expect(EXAM_CONFIGS["khk-hanbai"].urlSlug).toBe("khk-hanbai");
    expect(isExamPublished("khk-hanbai")).toBe(false);
    expect(choiceDisplayLabel("khk-hanbai", "イ")).toBe("2");
    expect(QUESTIONS_BY_EXAM["khk-hanbai"]).toBeUndefined();
    expect(ALL_QUESTIONS.some(q => q.exam === "khk-hanbai")).toBe(false);
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("khk-hanbai");
    expect(ALL_EXAM_CODES).not.toContain("khk-hanbai");
    expect(getRegisteredExamCodes()).not.toContain("khk-hanbai");
    expect(await getQuestionsForExam("khk-hanbai")).toEqual([]);
  });
});
