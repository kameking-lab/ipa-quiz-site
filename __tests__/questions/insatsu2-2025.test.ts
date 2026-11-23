import { describe, expect, it } from "vitest";
import { INSATSU2_QUESTIONS as allQuestions } from "@/data/questions/insatsu2";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, questionNumberLabel, usesNumberedChoices } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答表（2025/08/31、印刷／オフセット印刷作業【2級】）の各5問の枠を独立に照合。
const trueFalse = ["○×××○", "○○○○○", "×○×○○", "○×××○", "×○○○○"].join("").split("");
const multipleChoice = ["ニイハハロ", "イロロニロ", "ハニニイロ", "イロイイイ", "ロニロロハ"].join("").split("");
const internalKeys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const printedLabels = ["イ", "ロ", "ハ", "ニ"];

const questions = allQuestions.filter(q => q.year === 2025 && q.season === "early");

describe("印刷技能士2級 オフセット印刷作業 2025年度前期", () => {
  it("公式正答50件を原本の群別番号・内部採点キーへ対応させる", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    let count = 0;
    for (const [index, q] of questions.entries()) {
      const a = index < 25;
      const n = index % 25 + 1;
      const official = (a ? trueFalse : multipleChoice)[n - 1];
      expect(q.qNumber, q.id).toBe(index + 1);
      expect(questionNumberLabel(q)).toBe(`${a ? "A" : "B"}群 ${n}`);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(a ? (official === "○" ? "ア" : "イ") : internalKeys[printedLabels.indexOf(official)]);
      expect(Object.keys(q.choices ?? {})).toHaveLength(a ? 2 : 4);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(Object.values(q.choiceExplanations ?? {}).every(reason => reason!.length > 20), q.id).toBe(true);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/R07-1-B55-.*#page=[2-8]$/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
      expect(questionSourceEdition(q)).toBe("2025年度前期（2025年8月31日実施）");
      count += Object.keys(q.choices ?? {}).length;
    }
    expect(count).toBe(150);
  });

  it("B群のイロハニ表示とA/B群各25問のURLを復元する", () => {
    expect(internalKeys.map(key => choiceDisplayLabel("insatsu2", key))).toEqual(printedLabels);
    expect(usesNumberedChoices("insatsu2")).toBe(true);
    expect(questions[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
    expect(new Set(questions.map(questionPagePath)).size).toBe(50);
    for (const q of questions) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });

  it("資格一覧・同期/遅延ローダー・分野を接続する", async () => {
    expect(QUESTIONS_BY_EXAM.insatsu2!.filter(q => q.year === 2025 && q.season === "early")).toEqual(questions);
    expect((await getQuestionsForExam("insatsu2")).filter(q => q.year === 2025 && q.season === "early")).toEqual(questions);
    expect(getQualificationByExamCode("insatsu2")?.status).toBe("live");
    const config = EXAM_CONFIGS.insatsu2;
    expect(config.sessions[0].expectedQuestions).toBe(50);
    expect(config.seasons).toEqual(expect.arrayContaining(["early"]));
    expect(config.sessions[0].categories).toEqual(expect.arrayContaining([...new Set(questions.map(q => q.category))]));
  });

  it("原本の平方根・面積単位・まぎらわしい専門用語と正答を維持する", () => {
    expect(questions.every(q => !q.hasImage)).toBe(true);
    expect(questions[30].choices).toEqual({ ア: "1：√2", イ: "1：√3", ウ: "1：2", エ: "1：3" });
    expect(questions[39].choices?.ア).toContain("1m²");
    expect(questions[39].choices?.イ).toBe("規定寸法に仕上げた板紙1000枚を、一連とする。");
    expect(questions[17].question).toContain("マッチングダウン");
    expect(questions[17].explanation).toContain("ローリングダウン");
    expect(questions[7].officialAnswerNumber).toBe("○");
    expect(questions[7].question).toContain("使用される水なし版");
    expect(questions[7].officialReferenceUrls).toContain("https://www.waterless.jp/support/");
    expect(questions[28].choices?.エ).toContain("FMスクリーン方式");
    expect(questions[31].question).toContain("背に対向する部分");
    expect(questions[42].officialAnswerNumber).toBe("イ");
    expect(questions[42].choices?.ア).toBe("青");
  });
});
