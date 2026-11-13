import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { KOJO_BANKIN1_QUESTIONS as allQuestions } from "@/data/questions/kojo-bankin1";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, questionNumberLabel, usesNumberedChoices } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
// 公式正解表を問題データとは独立に転記。
const answers = ("○××○×○○××××○×××○○×○○××○○×" + "ニイロイニハロイイニハニロハハハハハハロイハロイイ").split("");
const questions = allQuestions.filter(q => q.year === 2025 && q.season === "early");
describe("工場板金1級2025年度前期", () => {
  it("50問の公式番号、公式正答、全肢解説を保持する", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    questions.forEach((q, i) => {
      expect(q.officialAnswerNumber).toBe(answers[i]);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(answers[i]);
      expect(q.qNumber).toBe(i + 1);
      expect(questionNumberLabel(q)).toBe(`${i < 25 ? "A" : "B"}群 ${i % 25 + 1}`);
      expect(questionSourceEdition(q)).toBe("2025年度前期");
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(EXAM_CONFIGS[q.exam].sessions[0].categories).toContain(q.category);
    });
  });
  it("原図3点と板取り計算・ローラレベラの公式正答を保持する", () => {
    expect(questions.filter(q => q.hasImage).map(q => q.qNumber)).toEqual([17, 28, 34]);
    for (const q of questions) for (const image of q.imageUrls ?? []) {
      const bytes = readFileSync(`public${image}`);
      expect(bytes.subarray(0, 4).toString()).toBe("RIFF");
      expect(bytes.subarray(8, 12).toString()).toBe("WEBP");
    }
    expect(questions[27].choices?.[questions[27].answer as "イ"]).toBe("297.68mm");
    expect(questions[43].choices?.[questions[43].answer as "ウ"]).toBe("ローラレベラ");
  });
  it("ローダー、資格一覧、原本のイロハニ表示に接続する", async () => {
    expect(await getQuestionsForExam("kojo-bankin1")).toEqual(allQuestions);
    expect(getQualificationByExamCode("kojo-bankin1")?.status).toBe("live");
    expect(EXAM_CONFIGS["kojo-bankin1"].sessions[0].expectedQuestions).toBe(50);
    const jsonLd = buildQuestionJsonLd({ question: questions[0], pageUrlAbs: "https://www.kakomon-ai.jp/q/kojo-bankin1/2025-early/gakka/q1", title: "工場板金1級", lastUpdatedISO: "2026-11-13" });
    expect(JSON.stringify(jsonLd)).toContain("中央職業能力開発協会");
    expect(usesNumberedChoices("kojo-bankin1")).toBe(true);
    expect(["ア", "イ", "ウ", "エ"].map(k => choiceDisplayLabel("kojo-bankin1", k as "ア"))).toEqual(["イ", "ロ", "ハ", "ニ"]);
  });
});
