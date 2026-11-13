import { describe, expect, it } from "vitest";
import { KIKINZOKU_SOSHIN2_QUESTIONS as questions } from "@/data/questions/kikinzoku-soshin2";
import sources from "@/data/questions/kikinzoku-soshin2/sources.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay, questionNumberLabel, usesNumberedChoices } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";

const exam = "kikinzoku-soshin2";
// 公式正解表（2025/08/31）を問題データとは別に5問ずつ転記。
const officialA = ["○○○××", "××○○○", "××○×○", "×○××○", "××○×○"].join("").split("");
const officialB = ["イニハハハ", "ニイニイイ", "ニハイロイ", "ロイハハハ", "ハロイハハ"].join("").split("");
const mapping: Record<string, string> = { イ: "ア", ロ: "イ", ハ: "ウ", ニ: "エ" };

describe("貴金属装身具製作技能士2級 2025年度前期", () => {
  it("公式正答50件・A/B群の原本番号・ページと全肢解説を保持する", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    expect(sources.officialAnswers).toEqual({ A: officialA, B: officialB });
    questions.forEach((q, i) => {
      const a = i < 25;
      const n = i % 25 + 1;
      const official = (a ? officialA : officialB)[n - 1];
      const page = a ? (n <= 17 ? 2 : 3) : n <= 6 ? 4 : n <= 12 ? 5 : n <= 18 ? 6 : n <= 24 ? 7 : 8;
      expect(q.id).toBe(`${exam}-2025-early-gakka-${a ? "a" : "b"}-${String(n).padStart(3, "0")}`);
      expect(q.qNumber).toBe(i + 1);
      expect(q.officialAnswerNumber).toBe(official);
      expect(q.answer).toBe(a ? (official === "○" ? "ア" : "イ") : mapping[official]);
      expect(Object.keys(q.choices ?? {})).toHaveLength(a ? 2 : 4);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(q.explanationCoverage).toBe("full");
      expect(q.sourcePdfUrl).toBe(`${sources.sourcePdfUrl}#page=${page}`);
      expect(q.sourceAnswerUrl).toBe(sources.sourceAnswerUrl);
      expect(questionNumberLabel(q)).toBe(`${a ? "A" : "B"}群 ${n}`);
      expect(formatQuestionAnswerForDisplay(q, q.answer)).toBe(official);
      expect(questionSourceEdition(q)).toBe("2025年度前期");
    });
    expect(questions.reduce((n, q) => n + Object.keys(q.choiceExplanations ?? {}).length, 0)).toBe(150);
  });

  it("表の単位・項目と紛らわしい原文を保持する", () => {
    expect(questions[3].question).toBe("おねじを切るには、タップを使用する。");
    expect(questions[3].officialAnswerNumber).toBe("×");
    expect(questions[27].choices?.ウ).toContain("低融点のろうから順次、高融点のろう");
    expect(questions[36].choices).toEqual({ ア: "銀970‰、銅30‰", イ: "銀950‰、銅50‰", ウ: "銀925‰、銅75‰", エ: "銀900‰、銅100‰" });
    expect(questions[38].choices?.イ).toBe("プラチナ：Pm");
    expect(questions[48].choices?.ウ).toBe("都市ガス／酸素");
    expect(sources.audit).toHaveLength(50);
    expect(questions.every(q => !q.hasImage)).toBe(true);
  });

  it("資格一覧・ローダー・原本どおりの表示へ接続する", async () => {
    expect(await getQuestionsForExam(exam)).toEqual(questions);
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(questions);
    expect(questions.filter(isPracticeReadyQuestion)).toHaveLength(50);
    expect(getQualificationByExamCode(exam)?.status).toBe("live");
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(50);
    expect(questions.every(q => EXAM_CONFIGS[exam].sessions[0].categories?.includes(q.category))).toBe(true);
    expect(usesNumberedChoices(exam)).toBe(true);
    expect(["ア", "イ", "ウ", "エ"].map(k => choiceDisplayLabel(exam, k as "ア"))).toEqual(["イ", "ロ", "ハ", "ニ"]);
  });
});
