import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { KAGU2_QUESTIONS as allQuestions } from "@/data/questions/kagu2";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, questionNumberLabel, usesNumberedChoices } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答PDF（2025/08/31、家具製作／家具手加工作業【2級】）の各5問の枠から転記。
const trueFalse = ["○×○×○", "×○○××", "×○×○○", "○××○○", "○×○○×"].join("").split("");
const multipleChoice = ["ニハロイハ", "イハハイニ", "ハロニロイ", "イロハニハ", "ロニハロニ"].join("").split("");
const internalKeys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const printedLabels = ["イ", "ロ", "ハ", "ニ"];

const questions = allQuestions.filter(q => q.year === 2025 && q.season === "early");

describe("家具製作技能士2級 家具手加工作業 2025年度前期", () => {
  it("公式50正答の群別番号と内部キーを対応させ、全150肢を学習できる", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    let choiceCount = 0;
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
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/R07-1-B51-.*#page=[2-7]$/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
      expect(questionSourceEdition(q)).toBe("2025年度前期（2025年8月31日実施）");
      choiceCount += Object.keys(q.choices ?? {}).length;
    }
    expect(choiceCount).toBe(150);
  });

  it("原本のイロハニ表示と50件のURLで正しい問題を復元できる", () => {
    expect(internalKeys.map(key => choiceDisplayLabel("kagu2", key))).toEqual(printedLabels);
    expect(usesNumberedChoices("kagu2")).toBe(true);
    expect(questions[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
    expect(new Set(questions.map(questionPagePath)).size).toBe(50);
    for (const q of questions) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });

  it("資格一覧・同期ローダー・遅延ローダーと9分野を接続する", async () => {
    expect(QUESTIONS_BY_EXAM.kagu2!.filter(q => q.year === 2025 && q.season === "early")).toEqual(questions);
    expect((await getQuestionsForExam("kagu2")).filter(q => q.year === 2025 && q.season === "early")).toEqual(questions);
    expect(getQualificationByExamCode("kagu2")?.status).toBe("live");
    const config = EXAM_CONFIGS.kagu2;
    expect(config.sessions[0].expectedQuestions).toBe(50);
    expect(config.seasons).toEqual(expect.arrayContaining(["early"]));
    expect(config.sessions[0].categories).toEqual(expect.arrayContaining([...new Set(questions.map(q => q.category))]));
  });

  it("材料構造表示記号を原図で保持し、口板の選択肢を原本どおり収録する", () => {
    const figures = questions.filter(q => q.hasImage);
    expect(figures.map(q => q.officialQuestionLabel)).toEqual(["B群 4"]);
    const q = figures[0];
    expect(q.imageUrls).toHaveLength(1);
    expect(q.imageAltTexts).toHaveLength(1);
    const png = readFileSync(join(process.cwd(), "public", q.imageUrls![0]));
    expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(png.readUInt32BE(16)).toBeGreaterThan(1000);
    expect(png.readUInt32BE(20)).toBeGreaterThan(200);
    expect(q.imageAltTexts![0]).not.toMatch(/対角線|正解|構造材は/);
    expect(questions[40].choices?.イ).toBe("口板は、丸のこ刃やカッタの厚みに合わせて使い分ける。");
  });
});
