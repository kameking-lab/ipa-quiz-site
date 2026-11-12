import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { TOSO2_QUESTIONS as questions } from "@/data/questions/toso2";
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
// 令和7年度前期 塗装／建築塗装作業【2級】2025/08/24。
const trueFalse = ["○○○×○", "×○○○×", "○○×○×", "×○××○", "×○××○"].join("").split("");
const multipleChoice = ["ハハイロイ", "ニハロロニ", "ハロハイロ", "ニニイイニ", "ロハイイロ"].join("").split("");
const internalKeys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const printedLabels = ["イ", "ロ", "ハ", "ニ"];

describe("塗装技能士2級 2025年度前期", () => {
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
      expect(q.hasImage, q.id).toBe(!a && [7, 24].includes(number));
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/R07-1-B87-.*#page=[2-8]$/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
      expect(questionSourceEdition(q)).toBe("2025年度前期（2025年8月24日実施）");
      choiceCount += Object.keys(q.choices ?? {}).length;
    });
    expect(choiceCount).toBe(150);
  });

  it("イロハニ表示と、A・B群で衝突しない50件の問題URLを維持する", () => {
    expect(internalKeys.map(key => choiceDisplayLabel("toso2", key))).toEqual(printedLabels);
    expect(questions[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
    expect(new Set(questions.map(questionPagePath)).size).toBe(50);
    for (const q of questions) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });

  it("同期・遅延ローダーが全50問を返し、資格設定が分野を漏らさない", async () => {
    expect(QUESTIONS_BY_EXAM.toso2).toEqual(questions);
    expect(await getQuestionsForExam("toso2")).toEqual(questions);
    expect(getQualificationByExamCode("toso2")?.status).toBe("live");
    const config = EXAM_CONFIGS.toso2;
    expect(config.sessions[0].expectedQuestions).toBe(50);
    expect(config.seasons).toEqual(["early"]);
    expect(new Set(config.sessions[0].categories)).toEqual(new Set(questions.map(q => q.category)));
  });

  it("図2点の原本ラベルと実ファイルを保持する", () => {
    const figures = questions.filter(q => q.hasImage);
    expect(figures.map(q => q.officialQuestionLabel)).toEqual(["B群 7", "B群 24"]);
    for (const q of figures) {
      expect(q.imageUrls).toHaveLength(1);
      expect(q.imageAltTexts).toHaveLength(1);
      const png = readFileSync(join(process.cwd(), "public", q.imageUrls![0]));
      expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(png.readUInt32BE(16)).toBeGreaterThan(200);
      expect(png.readUInt32BE(20)).toBeGreaterThan(300);
      // 代替文で正解名称や正答の矢印を先に示さない。
      expect(q.imageAltTexts![0]).not.toMatch(/筋かい|ニードル|イが/);
    }
    expect(questions[31].choices?.ウ).toBe("筋かいばけ");
    expect(questions[48].choices).toEqual({ ア: "図中のイ", イ: "図中のロ", ウ: "図中のハ", エ: "図中のニ" });
    expect(questions[48].answer).toBe("ア");
  });

  it("否定設問・対応表・塗付け量の単位を原本どおり保持する", () => {
    expect(questions[25].question).toContain("適切でない");
    expect(questions[25].choices?.ウ).toBe("ホットスプレー塗り ― 希釈用シンナーを多量に使用する。");
    expect(questions[38].question).toContain("誤っている");
    expect(questions[38].choices?.ア).toContain("くみ上げない");
    expect(questions[44].choices).toEqual({ ア: "① 透明塗装　② パテかい", イ: "① 透明塗装　② 節止め", ウ: "① 不透明塗装　② パテかい", エ: "① 不透明塗装　② 節止め" });
    expect(questions[44].answer).toBe("エ");
    expect(questions[47].question).toContain("1m²当たり");
    expect(questions[47].choices?.ア).toBe("0.08kg");
    expect(questions[15].lawReferenceDate).toBe("2025-08-24");
    expect(questions[39].choiceExplanations?.イ).toContain("第二種");
  });
});
