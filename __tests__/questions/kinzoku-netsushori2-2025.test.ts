import { describe, expect, it } from "vitest";
import { KINZOKU_NETSUSHORI2_QUESTIONS as allQuestions } from "@/data/questions/kinzoku-netsushori2";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, questionNumberLabel } from "@/lib/questions/display";
import { displayQuestionExplanation } from "@/lib/questions/explanation-display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import type { ChoiceKey } from "@/lib/questions/types";

// Official answer PDF: 金属熱処理／一般熱処理作業【2級】2025/08/24.
// Read from its printed five-question blocks independently of the content file.
const trueFalse = ["○○×××", "○×○○○", "×○×○○", "××××○", "○○○×○"].join("").split("");
const multipleChoice = ["ハイハニニ", "ロロニニニ", "ロハハイイ", "イニイイハ", "ニロニニハ"].join("").split("");
const internalKeys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const printedLabels = ["イ", "ロ", "ハ", "ニ"];

const questions = allQuestions.filter(q => q.year === 2025 && q.season === "early");

describe("金属熱処理技能士2級 一般熱処理 2025年度前期", () => {
  it("原本の両群50問と公式正答を欠かさず、採点キーへ対応させる", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
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
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/R07-1-B05-/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
      expect(questionSourceEdition(q)).toBe("2025年度前期（2025年8月24日実施）");
    });
  });

  it("択一のイロハニと真偽の○×を区別し、群の問番号がURLで衝突しない", () => {
    expect(internalKeys.map(key => choiceDisplayLabel("kinzoku-netsushori2", key))).toEqual(printedLabels);
    expect(questions[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
    expect(questions[25].choices?.ウ).toBe("Ac₁");
    expect(questions[25].answer).toBe("ウ");
    const paths = questions.map(questionPagePath);
    expect(new Set(paths).size).toBe(50);
    for (const q of questions) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });

  it("同期・遅延ロードと資格設定が同じ50問を返し、全分野を扱える", async () => {
    expect(QUESTIONS_BY_EXAM["kinzoku-netsushori2"]!.filter(q => q.year === 2025 && q.season === "early")).toEqual(questions);
    expect((await getQuestionsForExam("kinzoku-netsushori2")).filter(q => q.year === 2025 && q.season === "early")).toEqual(questions);
    expect(getQualificationByExamCode("kinzoku-netsushori2")?.status).toBe("live");
    const config = EXAM_CONFIGS["kinzoku-netsushori2"];
    expect(config.sessions[0].expectedQuestions).toBe(50);
    expect(config.seasons).toEqual(expect.arrayContaining(["early"]));
    expect(config.sessions[0].categories).toEqual(expect.arrayContaining([...new Set(questions.map(q => q.category))]));
  });

  it("B群の総合解説が画面のイロハニと同じ順番で各肢を説明する", () => {
    for (const q of questions.slice(25)) {
      const text = displayQuestionExplanation(q.exam, q.explanation);
      const labels = [...text.matchAll(/([アイウエロハニ])：/g)].map(match => match[1]);
      expect(labels, q.id).toEqual(internalKeys.map(key => choiceDisplayLabel(q.exam, key)));
    }
    const transformation = questions[25];
    expect(choiceDisplayLabel(transformation.exam, transformation.answer as ChoiceKey)).toBe("ハ");
    expect(displayQuestionExplanation(transformation.exam, transformation.explanation)).toContain(
      "ハ：Ac₁が加熱時にオーステナイトの生成が始まる温度です。",
    );
  });

  it("否定設問でも公式正答を維持し、法令の根拠と数値を取り違えない", () => {
    const grinder = questions[42]; // B群18
    expect(grinder.answer).toBe("ア");
    expect(grinder.choices?.ア).toBe("50 mm");
    expect(grinder.officialReferenceUrls?.[0]).toContain("mhlw.go.jp");
    expect(grinder.lawReferenceDate).toBe("2025-08-24");
    const rockwell = questions[49]; // B群25: incorrect statement is the answer
    expect(rockwell.answer).toBe("ウ");
    expect(rockwell.choiceExplanations?.ウ).toContain("球圧子ではありません");
    expect(rockwell.choiceExplanations?.ア).toContain("98.07N");
  });
});
