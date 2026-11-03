import { describe, expect, it } from "vitest";
import { KHK_SETSUBISHI_QUESTIONS } from "@/data/questions/khk-setsubishi";
import keys from "@/data/questions/khk-setsubishi/official-answers.json";
import { QUESTIONS_BY_EXAM, ALL_QUESTIONS } from "@/data/questions";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { getRegisteredExamCodes, getQuestionsForExam } from "@/lib/questions/get-questions";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel } from "@/lib/questions/display";

describe("KHK LPG equipment written exam: official source and staging", () => {
  it("keeps both available 15-question law papers, every official answer and all five explanations", () => {
    expect(KHK_SETSUBISHI_QUESTIONS).toHaveLength(30);
    // The two unavailable LY papers remain missing; never fill them with generated questions.
    expect(KHK_SETSUBISHI_QUESTIONS.some(q => q.session === "gas-technology")).toBe(false);
    for (const year of [2025, 2024]) {
      for (const [code, session] of [["LX", "houki"]] as const) {
        const rows = KHK_SETSUBISHI_QUESTIONS.filter(q => q.year === year && q.session === session);
        expect(rows.map(q => q.qNumber)).toEqual(Array.from({ length: 15 }, (_, i) => i + 1));
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
    expect(EXAM_CONFIGS["khk-setsubishi"].urlSlug).toBe("khk-setsubishi");
    expect(isExamPublished("khk-setsubishi")).toBe(false);
    expect(choiceDisplayLabel("khk-setsubishi", "イ")).toBe("2");
    expect(QUESTIONS_BY_EXAM["khk-setsubishi"]).toBeUndefined();
    expect(ALL_QUESTIONS.some(q => q.exam === "khk-setsubishi")).toBe(false);
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("khk-setsubishi");
    expect(ALL_EXAM_CODES).not.toContain("khk-setsubishi");
    expect(getRegisteredExamCodes()).not.toContain("khk-setsubishi");
    expect(await getQuestionsForExam("khk-setsubishi")).toEqual([]);
  });
});
