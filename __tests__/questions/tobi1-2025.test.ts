import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { TOBI1_QUESTIONS as allQuestions } from "@/data/questions/tobi1";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, questionNumberLabel, usesNumberedChoices } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import type { ChoiceKey } from "@/lib/questions/types";

// Official answer sheet, 2025/08/24, とび／とび作業【1級】.
// Independently recorded in the printed groups, rather than inferred from the explanations.
const trueFalse = "○×××○○×○○○×○×○○×○××○○○×○○".split("");
const multipleChoice = "ロニイイニニロハイロロハハロハイハロハハニハニロロ".split("");
const keys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const printedLabels = ["イ", "ロ", "ハ", "ニ"];

const TOBI1_QUESTIONS = allQuestions.filter(q => q.year === 2025 && q.season === "early");

describe("とび技能士1級 2025年度前期 原本50問", () => {
  it("A群・B群の問番号と公式正答を保ち、内部採点キーへ正しく対応する", () => {
    expect(TOBI1_QUESTIONS).toHaveLength(50);
    expect(new Set(TOBI1_QUESTIONS.map(q => q.id)).size).toBe(50);
    expect(trueFalse).toHaveLength(25);
    expect(multipleChoice).toHaveLength(25);
    TOBI1_QUESTIONS.forEach((q, index) => {
      const a = index < 25;
      const originalNumber = index % 25 + 1;
      const originalAnswer = (a ? trueFalse : multipleChoice)[originalNumber - 1];
      expect(q.qNumber).toBe(index + 1);
      expect(q.officialQuestionLabel).toBe(`${a ? "A" : "B"}群 ${originalNumber}`);
      expect(questionNumberLabel(q)).toBe(q.officialQuestionLabel);
      expect(q.officialAnswerNumber, q.id).toBe(originalAnswer);
      expect(q.answer, q.id).toBe(a ? (originalAnswer === "○" ? "ア" : "イ") : keys[printedLabels.indexOf(originalAnswer)]);
      expect(Object.keys(q.choices ?? {})).toHaveLength(a ? 2 : 4);
      expect(q.choiceExplanations && Object.keys(q.choiceExplanations).sort()).toEqual(Object.keys(q.choices ?? {}).sort());
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.sourcePdfUrl).toContain("www.kentei.javada.or.jp/pdf/R07%2D1%2DB62");
      expect(q.sourcePdfUrl).toMatch(/#page=[2-8]$/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
    });
  });

  it("B群のイロハニと、A群の○×を原本に対応づけて表示する", () => {
    expect(keys.map(key => choiceDisplayLabel("tobi1", key))).toEqual(printedLabels);
    expect(usesNumberedChoices("tobi1")).toBe(true);
    expect(TOBI1_QUESTIONS[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
    const b13 = TOBI1_QUESTIONS[37];
    expect(b13.choices?.ウ).toBe("根太");
    expect(b13.answer).toBe("ウ");
    expect(b13.choiceExplanations?.イ).toContain("幅木との組合せは適切");
    expect(b13.choiceExplanations?.ウ).toContain("根太との組合せが不適切");
  });

  it("必要な原図5点が実ファイルに結び付き、記号・部材・滑車の図を欠かさない", () => {
    const figures = TOBI1_QUESTIONS.filter(q => q.hasImage);
    expect(figures.map(q => q.officialQuestionLabel)).toEqual(["A群 11", "B群 4", "B群 11", "B群 12", "B群 13"]);
    for (const q of figures) {
      expect(q.imageAltTexts).toHaveLength(1);
      expect(q.imageAltTexts?.[0].length).toBeGreaterThan(10);
      expect(q.imageUrls).toHaveLength(1);
      const path = join(process.cwd(), "public", q.imageUrls![0]);
      expect(existsSync(path), path).toBe(true);
      const header = readFileSync(path).subarray(0, 12).toString("ascii");
      expect(header.slice(0, 4)).toBe("RIFF");
      expect(header.slice(8)).toBe("WEBP");
    }
    expect(TOBI1_QUESTIONS[36].explanation).toContain("6P＝W");
  });

  it("同期・遅延ローダーと公開カタログが同じ50問を返す", async () => {
    expect(QUESTIONS_BY_EXAM.tobi1!.filter(q => q.year === 2025 && q.season === "early")).toEqual(TOBI1_QUESTIONS);
    expect((await getQuestionsForExam("tobi1")).filter(q => q.year === 2025 && q.season === "early")).toEqual(TOBI1_QUESTIONS);
    expect(getQualificationByExamCode("tobi1")?.status).toBe("live");
    expect(EXAM_CONFIGS.tobi1.sessions[0].expectedQuestions).toBe(50);
    expect(EXAM_CONFIGS.tobi1.seasons).toEqual(expect.arrayContaining(["early"]));
    expect(TOBI1_QUESTIONS.every(q => EXAM_CONFIGS.tobi1.sessions[0].categories.includes(q.category))).toBe(true);
  });
});
