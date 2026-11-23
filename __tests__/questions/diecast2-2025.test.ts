import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { DIECAST2_QUESTIONS as allQuestions } from "@/data/questions/diecast2";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, questionNumberLabel, usesNumberedChoices } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答PDF（2025/08/31、ダイカスト／ホットチャンバダイカスト作業【2級】）を5問枠ごとに転記。
const trueFalse = ["○××○○", "××××○", "○×○○×", "×××○○", "××○○○"].join("").split("");
const multipleChoice = ["ニイハロロ", "ロロイハハ", "ロニニハイ", "ハロニイイ", "ロハニロロ"].join("").split("");
const internalKeys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const printedLabels = ["イ", "ロ", "ハ", "ニ"];

const questions = allQuestions.filter(q => q.year === 2025 && q.season === "early");

describe("ダイカスト技能士2級 ホットチャンバダイカスト作業 2025年度前期", () => {
  it("公式正答50件・群ごとの番号・150肢の解説を原本の記号に対応させる", () => {
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
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/R07-1-B34-.*#page=[2-8]$/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
      expect(questionSourceEdition(q)).toBe("2025年度前期（2025年8月31日実施）");
      choiceCount += Object.keys(q.choices ?? {}).length;
    }
    expect(choiceCount).toBe(150);
  });

  it("原本のイロハニ表示と50件のURLを使って各問題を復元する", () => {
    expect(internalKeys.map(key => choiceDisplayLabel("diecast2", key))).toEqual(printedLabels);
    expect(usesNumberedChoices("diecast2")).toBe(true);
    expect(questions[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
    expect(new Set(questions.map(questionPagePath)).size).toBe(50);
    for (const q of questions) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });

  it("資格一覧・同期/遅延ローダー・9分野を接続し、共通冊子を1回だけ収録する", async () => {
    expect(QUESTIONS_BY_EXAM.diecast2!.filter(q => q.year === 2025 && q.season === "early")).toEqual(questions);
    expect((await getQuestionsForExam("diecast2")).filter(q => q.year === 2025 && q.season === "early")).toEqual(questions);
    expect(getQualificationByExamCode("diecast2")?.status).toBe("live");
    const config = EXAM_CONFIGS.diecast2;
    expect(config.sessions[0].expectedQuestions).toBe(50);
    expect(config.seasons).toEqual(expect.arrayContaining(["early"]));
    expect(config.sessions[0].categories).toEqual(expect.arrayContaining([...new Set(questions.map(q => q.category))]));
  });

  it("方案図と寸法表を原図で保存し、最大しめしろの計算と選択肢を維持する", () => {
    const figures = questions.filter(q => q.hasImage);
    expect(figures.map(q => q.officialQuestionLabel)).toEqual(["B群 5", "B群 24"]);
    for (const q of figures) {
      expect(q.imageUrls).toHaveLength(1);
      expect(q.imageAltTexts).toHaveLength(1);
      const png = readFileSync(join(process.cwd(), "public", q.imageUrls![0]));
      expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(png.readUInt32BE(16)).toBeGreaterThan(500);
      expect(png.readUInt32BE(20)).toBeGreaterThan(250);
      expect(q.imageAltTexts![0]).not.toMatch(/正解|0\.011|しめしろ/);
    }
    expect(questions[48].choices?.イ).toBe("0.011 mm");
    expect(38.011 - 38.000).toBeCloseTo(0.011, 8);
    expect(questions[27].choices?.ウ).toBe("クロメル－アルメル熱電対の補償導線の被覆色は黒である。");
  });
});
