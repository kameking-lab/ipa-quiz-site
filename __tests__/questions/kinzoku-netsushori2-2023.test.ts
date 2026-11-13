import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { KINZOKU_NETSUSHORI2_QUESTIONS } from "@/data/questions/kinzoku-netsushori2";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";

// 公式正答表の左右の各5問ブロックを、問題JSONとは独立に転記。
const answers = ["○×○×○", "○××○×", "○○×○×", "×○○××", "×○×○○", "ニハニハニ", "ロハニハニ", "イニイハロ", "ロイイニロ", "ニイハイハ"].join("").split("");
const questions = KINZOKU_NETSUSHORI2_QUESTIONS.filter(q => q.year === 2023);
describe("金属熱処理2級2023年度前期", () => {
  it("両群50問の公式正答・群番号・全肢解説を保持する", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    questions.forEach((q, i) => {
      expect(q.id).toBe(`kinzoku-netsushori2-2023-early-gakka-${i < 25 ? "a" : "b"}-${String(i % 25 + 1).padStart(3, "0")}`);
      expect(q.qNumber).toBe(i + 1);
      expect(questionNumberLabel(q)).toBe(`${i < 25 ? "A" : "B"}群 ${i % 25 + 1}`);
      expect(q.officialAnswerNumber).toBe(answers[i]);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(answers[i]);
      expect(questionSourceEdition(q)).toBe("2023年度前期");
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(EXAM_CONFIGS[q.exam].sessions[0].categories).toContain(q.category);
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id).toBe(q.id);
    });
  });
  it("原図1点とロックウェル硬さの二つの試験力を保持する", () => {
    expect(questions.filter(q => q.hasImage).map(q => q.qNumber)).toEqual([42]);
    const bytes = readFileSync(`public${questions[41].imageUrls?.[0]}`);
    expect(bytes.subarray(0, 4).toString()).toBe("RIFF");
    expect(bytes.subarray(8, 12).toString()).toBe("WEBP");
    expect(questions[48].choices?.ア).toContain("29.42N");
    expect(questions[48].explanation).toContain("98.07N");
  });
  it("2024・2025年度と併せて150問を取得できる", async () => {
    expect(KINZOKU_NETSUSHORI2_QUESTIONS).toHaveLength(150);
    expect(new Set(KINZOKU_NETSUSHORI2_QUESTIONS.map(questionPagePath)).size).toBe(150);
    expect(await getQuestionsForExam("kinzoku-netsushori2")).toEqual(KINZOKU_NETSUSHORI2_QUESTIONS);
    expect(EXAM_CONFIGS["kinzoku-netsushori2"].yearRange).toEqual({ start: 2023, end: 2025 });
  });
});
