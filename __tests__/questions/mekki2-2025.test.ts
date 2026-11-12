import { describe, expect, it } from "vitest";
import { MEKKI2_QUESTIONS as questions } from "@/data/questions/mekki2";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, questionNumberLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答PDFの5問ずつの枠をデータとは独立して読み取ったもの。
// 令和7年度前期 めっき／電気めっき作業【2級】2025/08/31。
const trueFalse = ["×○××○", "○××○×", "××○○○", "○○○××", "×○○○○"].join("").split("");
const multipleChoice = ["ニイニイイ", "イハハハロ", "ロニニニハ", "ハロニイロ", "ニニニロハ"].join("").split("");
const internalKeys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const printedLabels = ["イ", "ロ", "ハ", "ニ"];

describe("めっき技能士2級 電気めっき 2025年度前期", () => {
  it("A・B両群の50問を公式正答で採点し、150肢の解説を持つ", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    let choiceCount = 0;
    questions.forEach((q, index) => {
      const a = index < 25;
      const originalNumber = index % 25 + 1;
      const official = (a ? trueFalse : multipleChoice)[originalNumber - 1];
      expect(q.qNumber, q.id).toBe(index + 1);
      expect(questionNumberLabel(q)).toBe(`${a ? "A" : "B"}群 ${originalNumber}`);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(a ? (official === "○" ? "ア" : "イ") : internalKeys[printedLabels.indexOf(official)]);
      expect(Object.keys(q.choices ?? {})).toHaveLength(a ? 2 : 4);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(Object.values(q.choiceExplanations ?? {}).every(reason => reason!.length > 20), q.id).toBe(true);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.hasImage, q.id).toBe(false);
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/R07-1-B28-.*#page=[2-8]$/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
      expect(questionSourceEdition(q)).toBe("2025年度前期（2025年8月31日実施）");
      choiceCount += Object.keys(q.choices ?? {}).length;
    });
    expect(choiceCount).toBe(150);
  });

  it("イロハニの表示と、A群・B群で衝突しない問題URLを維持する", () => {
    expect(internalKeys.map(key => choiceDisplayLabel("mekki2", key))).toEqual(printedLabels);
    expect(questions[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
    const paths = questions.map(questionPagePath);
    expect(new Set(paths).size).toBe(50);
    for (const q of questions) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });

  it("同期・遅延ローダーと資格設定が全50問を返し、分野を漏らさない", async () => {
    expect(QUESTIONS_BY_EXAM.mekki2).toEqual(questions);
    expect(await getQuestionsForExam("mekki2")).toEqual(questions);
    expect(getQualificationByExamCode("mekki2")?.status).toBe("live");
    const config = EXAM_CONFIGS.mekki2;
    expect(config.sessions[0].expectedQuestions).toBe(50);
    expect(config.seasons).toEqual(["early"]);
    expect(new Set(config.sessions[0].categories)).toEqual(new Set(questions.map(q => q.category)));
  });

  it("計算・数値の対応表・否定設問を原本どおりに保持する", () => {
    const concentration = questions[25];
    expect(concentration.answer).toBe("エ");
    expect(concentration.choices?.エ).toBe("20 mass%");
    expect(concentration.choiceExplanations?.エ).toContain("1250");
    const salt = questions[33]; // B9: ①濃度、②温度
    expect(salt.answer).toBe("ウ");
    expect(salt.choices?.ウ).toBe("①50　②35");
    expect(salt.explanation).toContain("50±5 g/L");
    expect(salt.explanation).toContain("35±2℃");
    const fire = questions[30]; // B6: 誤っているもの
    expect(fire.answer).toBe("ア");
    expect(fire.choiceExplanations?.ア).toContain("第四類");
    expect(fire.lawReferenceDate).toBe("2025-08-31");
    const anode = questions[49]; // B25: table pairs must not be swapped
    expect(anode.answer).toBe("ウ");
    expect(anode.choices?.ウ).toBe("銀めっき ― 銅");
    expect(anode.choices?.エ).toBe("ジンケート亜鉛めっき ― 鉄");
  });
});
