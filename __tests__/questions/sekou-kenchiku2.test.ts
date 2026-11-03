import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { SEKOU_KENCHIKU2_QUESTIONS as questions } from "@/data/questions/sekou-kenchiku2";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { ALL_EXAM_CODES, ALL_QUIZ_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { isExamPublished, getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { shuffleChoices } from "@/lib/questions/filter";
import { hasUnrenderableContent } from "@/lib/questions/content-quality";

// Transcribed separately from the rendered official answer tables (R8 p26 / R7 p25).
const officialKeys: Record<number, number[]> = {
  2026: [1,3,2,4, 4,3,4,4,3,4,1,2,3,2, 3,4,1, 2,1,2,3,1,3,4,1,3,2, 2,4,3,3,2,4,2,3,1,4, 5,2,3,5,5, 1,4,3,3,3,2,4,2],
  2025: [3,2,1,4, 2,1,1,4,2,2,1,2,2,3, 4,3,1, 4,1,2,4,3,4,2,1,3,4, 2,1,3,4,1,4,4,4,3,3, 4,1,3,1,1, 3,3,3,1,3,4,2,1],
};
const keys = ["ア", "イ", "ウ", "エ", "オ"];

describe("2級建築施工管理第一次検定 official latest two sittings", () => {
  it("contains each of the 50 printed questions in both sittings, including optional questions", () => {
    expect(questions).toHaveLength(100);
    expect(new Set(questions.map(q => q.id)).size).toBe(100);
    for (const year of [2026, 2025]) {
      expect(questions.filter(q => q.year === year).map(q => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
    }
    expect(questions.reduce((n, q) => n + Object.keys(q.choices!).length, 0)).toBe(410);
    expect(EXAM_CONFIGS["sekou-kenchiku2"].sessions[0].expectedQuestions).toBe(50);
  });

  it.each(questions)("$id matches its official key and retains usable original content", q => {
    const official = officialKeys[q.year][q.qNumber - 1];
    expect(q.officialAnswerNumber).toBe(String(official));
    expect(q.answer).toBe(keys[official - 1]);
    const count = q.qNumber >= 38 && q.qNumber <= 42 ? 5 : 4;
    expect(Object.keys(q.choices!)).toEqual(keys.slice(0, count));
    expect(Object.keys(q.choiceExplanations!)).toEqual(keys.slice(0, count));
    for (const text of Object.values(q.choiceExplanations!)) expect(text!.length).toBeGreaterThan(15);
    expect(q.explanationCoverage).toBe("full");
    expect(q.question).not.toMatch(/\(cid:|�|C―|DA-I|全問題を解答/);
    expect(hasUnrenderableContent(q)).toBe(false);
    expect(q.sourcePdfUrl).toBe(`https://www.fcip-shiken.jp/pdf/${q.year === 2026 ? "r08_2kgz_mondai.pdf" : "r07_2kg_mondai.pdf"}`);
    expect(q.sourceAnswerUrl).toBe(q.sourcePdfUrl);
    expect(q.sourceAttribution).toContain(`No.${q.qNumber}`);
    if (q.qNumber >= 43 || [36,37].includes(q.qNumber)) {
      expect(q.questionNotice).toContain("出題時点");
      expect(q.explanation).toContain("出題時点");
      expect(q.lawReferenceDate).toBe(q.examDate);
    }
  });

  it("retains all required diagrams, with readable text alongside them", () => {
    expect(questions.filter(q => q.hasImage).map(q => `${q.year}-${q.qNumber}`))
      .toEqual(["2026-3", "2026-11", "2026-16", "2025-3", "2025-11"]);
    for (const q of questions.filter(q => q.hasImage)) {
      expect(q.imageAltTexts?.[0]).toBeTruthy();
      for (const path of q.imageUrls!) expect(existsSync(join(process.cwd(), "public", path))).toBe(true);
    }
    const steel = questions.find(q => q.year === 2026 && q.qNumber === 12)!;
    expect(steel.choices!.ア).toContain("10⁵N/mm²");
    expect(steel.choices!.イ).toContain("g/cm³");
    const glass = questions.find(q => q.year === 2026 && q.qNumber === 26)!;
    expect(glass.question).toMatch(/どれか。$/);
    expect(glass.choices!.ア).toContain("1/4");
    expect(glass.choices!.ア).toContain("防錆");
    expect(questions.find(q => q.year === 2025 && q.qNumber === 32)!.question).toContain("［イ］");
  });

  it("preserves the fifth answer and its explanation when choices are shuffled", () => {
    const q = questions.find(q => q.year === 2026 && q.qNumber === 38)!;
    const shuffled = shuffleChoices(q);
    expect(shuffled.choices![shuffled.answer as keyof typeof shuffled.choices]).toBe(q.choices!.オ);
    expect(shuffled.choiceExplanations![shuffled.answer as keyof typeof shuffled.choiceExplanations]).toBe(q.choiceExplanations!.オ);
  });

  it("keeps both public registries, lazy loading and qualification listings closed before release", async () => {
    expect(getQualificationByExamCode("sekou-kenchiku2")?.status).toBe("ready-to-ingest");
    expect(isExamPublished("sekou-kenchiku2")).toBe(false);
    expect(QUESTIONS_BY_EXAM["sekou-kenchiku2"]).toBeUndefined();
    expect(ALL_QUESTIONS.some(q => q.exam === "sekou-kenchiku2")).toBe(false);
    expect(await getQuestionsForExam("sekou-kenchiku2")).toEqual([]);
    expect(getRegisteredExamCodes()).not.toContain("sekou-kenchiku2");
    expect(ALL_QUIZ_EXAM_CODES).not.toContain("sekou-kenchiku2");
    expect(ALL_EXAM_CODES).not.toContain("sekou-kenchiku2");
  });
});
