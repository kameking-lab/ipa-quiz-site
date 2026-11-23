import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { KOJO_BANKIN3_QUESTIONS } from "@/data/questions/kojo-bankin3";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, questionNumberLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
// 公式正解表を問題データとは独立に転記。
const answers = "×○○○○×○○○×○○×○××××○○××○××○×○○×".split("");
const questions = KOJO_BANKIN3_QUESTIONS.filter(q => q.year === 2025);
describe("工場板金3級2025年度前期", () => {
  it("30問の公式番号・公式正答・全肢解説と○×表示を保持する", () => {
    expect(questions).toHaveLength(30);
    expect(new Set(questions.map(q => q.id)).size).toBe(30);
    questions.forEach((q, i) => {
      expect(q.id).toBe(`kojo-bankin3-2025-early-gakka-${String(i + 1).padStart(3, "0")}`);
      expect(q.officialAnswerNumber).toBe(answers[i]);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(answers[i]);
      expect(q.qNumber).toBe(i + 1);
      expect(questionNumberLabel(q)).toBe(String(i + 1));
      expect(questionSourceEdition(q)).toBe("2025年度前期");
      expect(Object.keys(q.choices ?? {})).toEqual(["ア", "イ"]);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ"]);
      expect(EXAM_CONFIGS[q.exam].sessions[0].categories).toContain(q.category);
    });
    expect(choiceDisplayLabel("kojo-bankin3", "ア")).toBe("○");
    expect(choiceDisplayLabel("kojo-bankin3", "イ")).toBe("×");
  });
  it("図記号1点を参照し、板取り計算と絞り率の解説を保持する", () => {
    expect(questions.filter(q => q.hasImage).map(q => q.qNumber)).toEqual([19]);
    const bytes = readFileSync(`public${questions[18].imageUrls?.[0]}`);
    expect(bytes.subarray(0, 4).toString()).toBe("RIFF");
    expect(bytes.subarray(8, 12).toString()).toBe("WEBP");
    expect(questions[9].explanation).toContain("307.72");
    expect(questions[28].explanation).toContain("製品径をブランク径で割った値");
  });
  it("ローダー、資格一覧、公式出典の構造化データに接続する", async () => {
    expect(await getQuestionsForExam("kojo-bankin3")).toEqual(KOJO_BANKIN3_QUESTIONS);
    expect(getQualificationByExamCode("kojo-bankin3")?.status).toBe("live");
    expect(EXAM_CONFIGS["kojo-bankin3"].sessions[0].expectedQuestions).toBe(30);
    const jsonLd = buildQuestionJsonLd({ question: questions[0], pageUrlAbs: "https://www.kakomon-ai.jp/q/kojo-bankin3/2025-early/gakka/q1", title: "工場板金3級", lastUpdatedISO: "2026-11-13" });
    expect(JSON.stringify(jsonLd)).toContain("中央職業能力開発協会");
  });
});
