import { describe, expect, it } from "vitest";
import { FLOWER2_QUESTIONS as questions } from "@/data/questions/flower2";
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
// 令和7年度前期 フラワー装飾／フラワー装飾作業【2級】2025/09/07。
const trueFalse = ["○○××○", "○×××○", "○○○××", "××××○", "○×○××"].join("").split("");
const multipleChoice = ["ハニニハロ", "ニハニニハ", "ロニイイロ", "イロイロイ", "ハロハハハ"].join("").split("");
const internalKeys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const printedLabels = ["イ", "ロ", "ハ", "ニ"];

describe("フラワー装飾技能士2級 2025年度前期", () => {
  it("A・B群の全50問を公式正答で採点し、150肢の解説を持つ", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    let choiceCount = 0;
    questions.forEach((q, index) => {
      const a = index < 25;
      const number = index % 25 + 1;
      const official = (a ? trueFalse : multipleChoice)[number - 1];
      expect(q.qNumber, q.id).toBe(index + 1);
      expect(questionNumberLabel(q)).toBe(`${a ? "A" : "B"}群 ${number}`);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(a ? (official === "○" ? "ア" : "イ") : internalKeys[printedLabels.indexOf(official)]);
      expect(Object.keys(q.choices ?? {})).toHaveLength(a ? 2 : 4);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(Object.values(q.choiceExplanations ?? {}).every(reason => reason!.length > 20), q.id).toBe(true);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.hasImage, q.id).toBe(false);
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/R07-1-B92-.*#page=[2-8]$/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
      expect(questionSourceEdition(q)).toBe("2025年度前期（2025年9月7日実施）");
      choiceCount += Object.keys(q.choices ?? {}).length;
    });
    expect(choiceCount).toBe(150);
  });

  it("イロハニ表示と、A・B群で衝突しない50件の問題URLを維持する", () => {
    expect(internalKeys.map(key => choiceDisplayLabel("flower2", key))).toEqual(printedLabels);
    expect(questions[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
    expect(new Set(questions.map(questionPagePath)).size).toBe(50);
    for (const q of questions) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });

  it("同期・遅延ローダーが全50問を返し、資格設定が分野を漏らさない", async () => {
    expect(QUESTIONS_BY_EXAM.flower2).toEqual(questions);
    expect(await getQuestionsForExam("flower2")).toEqual(questions);
    expect(getQualificationByExamCode("flower2")?.status).toBe("live");
    const config = EXAM_CONFIGS.flower2;
    expect(config.sessions[0].expectedQuestions).toBe(50);
    expect(config.seasons).toEqual(["early"]);
    expect(new Set(config.sessions[0].categories)).toEqual(new Set(questions.map(q => q.category)));
  });

  it("否定設問・原産地の対応表・水揚げ方法を原本どおり保持する", () => {
    const table = questions[43]; // B19
    expect(table.choices).toEqual({ ア: "ユーカリ ― インド", イ: "センリョウ ― 日本", ウ: "バラ ― オーストラリア", エ: "ウメ ― 朝鮮半島" });
    expect(table.answer).toBe("イ");
    expect(questions[42].question).toContain("湿度が高く"); // B18
    expect(questions[37].question).toContain("適切でない"); // B13
    expect(questions[37].answer).toBe("ア");
    expect(questions[48].choices?.ウ).toBe("切り口を焼く。"); // B24
    expect(questions[48].answer).toBe("ウ");
    expect(questions[24].lawReferenceDate).toBe("2025-09-07");
    expect(questions[21].choiceExplanations?.イ).toContain("キンポウゲ科");
    expect(questions[49].answer).toBe("ウ");
    expect(questions[49].choices?.ウ).toBe("スイセン");
  });
});
