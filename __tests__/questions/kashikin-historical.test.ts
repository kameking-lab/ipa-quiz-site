import { describe, expect, it } from "vitest";
import { KASHIKIN_QUESTIONS } from "@/data/questions/kashikin";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

// 日本貸金業協会の各回正答PDFを問題番号順に転記。
const officialAnswers: Record<number, string> = {
  2019: "22234143331122144111342343413243432213143244332412",
};

describe("貸金業務取扱主任者の追加年度", () => {
  for (const [yearText, answers] of Object.entries(officialAnswers)) {
    const year = Number(yearText);
    const questions = KASHIKIN_QUESTIONS.filter((q) => q.year === year);
    it(`${year}年度の50問が公式正答と一致し、演習に含まれる`, () => {
      expect(answers).toHaveLength(50);
      expect(questions.map((q) => q.qNumber)).toEqual(Array.from({ length: 50 }, (_, i) => i + 1));
      for (const q of questions) {
        const answer = Number(answers[q.qNumber - 1]);
        expect(q.officialAnswerNumber, q.id).toBe(String(answer));
        expect(q.answer, q.id).toBe(["ア", "イ", "ウ", "エ"][answer - 1]);
        expect(q.sourcePdfUrl).toContain(`exam_paper_${year - 2005}th.pdf`);
        expect(q.sourceAnswerUrl).toContain(`${year - 2005}th_answer.pdf`);
        expect(q.lawReferenceDate).toBe(`${year}-04-01`);
        expect(isPracticeReadyQuestion(q), q.id).toBe(true);
        expect(Object.keys(q.choices ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
        expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
        const text = q.question + Object.values(q.choices ?? {}).join("");
        expect(text, q.id).not.toMatch(/\/c\d|\(cid:\d|[\x00-\x08\x0b-\x1f]/);
      }
    });
  }
  it("追加年度を含めて問題IDが重複しない", () => {
    expect(new Set(KASHIKIN_QUESTIONS.map((q) => q.id)).size).toBe(KASHIKIN_QUESTIONS.length);
  });
});
