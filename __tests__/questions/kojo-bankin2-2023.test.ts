import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { KOJO_BANKIN2_QUESTIONS } from "@/data/questions/kojo-bankin2";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
const questions = KOJO_BANKIN2_QUESTIONS.filter(q => q.year === 2023);
// 公式正解表を問題データとは別に転記。
const answers = ("×××○×○○○○○○××○×○○××○××××○" + "ロハハロイイイロイイハロニハロニニハハロニハハニニ").split("");
describe("工場板金2級2023年度前期の原本対応", () => {
  it("50問の公式正答と原本番号、全肢解説を保持する", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    questions.forEach((q, i) => {
      expect(q.officialAnswerNumber).toBe(answers[i]);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(answers[i]);
      expect(q.qNumber).toBe(i + 1);
      expect(questionNumberLabel(q)).toBe(`${i < 25 ? "A" : "B"}群 ${i % 25 + 1}`);
      expect(questionSourceEdition(q)).toBe("2023年度前期");
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(EXAM_CONFIGS[q.exam].sessions[0].categories).toContain(q.category);
    });
  });
  it("原図4点を参照し、既存年度と一緒に取得できる", async () => {
    expect(questions.filter(q => q.hasImage).map(q => q.qNumber)).toEqual([1, 4, 17, 18]);
    for (const q of questions) for (const image of q.imageUrls ?? []) {
      const bytes = readFileSync(`public${image}`);
      expect(bytes.subarray(0, 4).toString()).toBe("RIFF");
      expect(bytes.subarray(8, 12).toString()).toBe("WEBP");
    }
    expect(await getQuestionsForExam("kojo-bankin2")).toEqual(KOJO_BANKIN2_QUESTIONS);
    expect(EXAM_CONFIGS["kojo-bankin2"].yearRange).toEqual({ start: 2023, end: 2025 });
  });
});
