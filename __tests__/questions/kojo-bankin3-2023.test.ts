import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { KOJO_BANKIN3_QUESTIONS } from "@/data/questions/kojo-bankin3";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";

// 公式正答表の1〜30を問題JSONとは別に転記。
const answers = "×○×○○×○○○○○○○×○×○○○×○××○○××○○×".split("");
const questions = KOJO_BANKIN3_QUESTIONS.filter(q => q.year === 2023);
describe("工場板金3級2023年度前期", () => {
  it("30問の番号・公式正答・全肢解説を保持する", () => {
    expect(questions).toHaveLength(30);
    expect(new Set(questions.map(q => q.id)).size).toBe(30);
    questions.forEach((q, i) => {
      expect(q.id).toBe(`kojo-bankin3-2023-early-gakka-${String(i + 1).padStart(3, "0")}`);
      expect(q.qNumber).toBe(i + 1);
      expect(questionNumberLabel(q)).toBe(String(i + 1));
      expect(q.officialAnswerNumber).toBe(answers[i]);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(answers[i]);
      expect(questionSourceEdition(q)).toBe("2023年度前期");
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ"]);
      expect(EXAM_CONFIGS[q.exam].sessions[0].categories).toContain(q.category);
    });
  });
  it("原本のノギス図と寸法の解説を保持する", () => {
    expect(questions.filter(q => q.hasImage).map(q => q.qNumber)).toEqual([16]);
    const bytes = readFileSync(`public${questions[15].imageUrls?.[0]}`);
    expect(bytes.subarray(0, 4).toString()).toBe("RIFF");
    expect(bytes.subarray(8, 12).toString()).toBe("WEBP");
    expect(questions[15].explanation).toContain("25.20mm");
  });
  it("2025年度の既存30問を残してローダーに接続する", async () => {
    expect(KOJO_BANKIN3_QUESTIONS.filter(q => q.year === 2025)).toHaveLength(30);
    expect(await getQuestionsForExam("kojo-bankin3")).toEqual(KOJO_BANKIN3_QUESTIONS);
    expect(EXAM_CONFIGS["kojo-bankin3"].yearRange).toEqual({ start: 2023, end: 2025 });
  });
});
