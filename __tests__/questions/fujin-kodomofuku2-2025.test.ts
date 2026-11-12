import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FUJIN_KODOMOFUKU2_QUESTIONS as questions } from "@/data/questions/fujin-kodomofuku2";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, questionNumberLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import type { ChoiceKey } from "@/lib/questions/types";

// 公式正答PDFの5問ずつの枠を、問題データとは別に読み取ったもの。
// 令和7年度前期 婦人子供服製造／婦人子供注文服製作作業【2級】2025/08/31。
const trueFalse = ["○○××○", "××○○×", "○○×○○", "○○×○×", "××○×○"].join("").split("");
const multipleChoice = ["イイハハハ", "イロロハロ", "ハニロロハ", "イイロハハ", "ハロハロイ"].join("").split("");
const internalKeys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const printedLabels = ["イ", "ロ", "ハ", "ニ"];

describe("婦人子供服製造技能士2級 2025年度前期", () => {
  it("公式正答50件と全150肢の解説を持ち、全問が練習対象になる", () => {
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
      expect(q.hasImage, q.id).toBe(index === 44);
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/R07-1-B49-.*#page=[2-8]$/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
      expect(questionSourceEdition(q)).toBe("2025年度前期（2025年8月31日実施）");
      choiceCount += Object.keys(q.choices ?? {}).length;
    });
    expect(choiceCount).toBe(150);
  });

  it("原本イロハニを表示し、A・B群の問番号が問題URLで衝突しない", () => {
    expect(internalKeys.map(key => choiceDisplayLabel("fujin-kodomofuku2", key))).toEqual(printedLabels);
    expect(questions[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
    expect(new Set(questions.map(questionPagePath)).size).toBe(50);
    for (const q of questions) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });

  it("同期・遅延ローダーと資格設定に50問・全8分野がつながる", async () => {
    expect(QUESTIONS_BY_EXAM["fujin-kodomofuku2"]).toEqual(questions);
    expect(await getQuestionsForExam("fujin-kodomofuku2")).toEqual(questions);
    expect(getQualificationByExamCode("fujin-kodomofuku2")?.status).toBe("live");
    const config = EXAM_CONFIGS["fujin-kodomofuku2"];
    expect(config.sessions[0].expectedQuestions).toBe(50);
    expect(config.seasons).toEqual(["early"]);
    expect(new Set(config.sessions[0].categories)).toEqual(new Set(questions.map(q => q.category)));
  });

  it("ダーツの原図4種類を保持し、図示選択肢のラベルで採点する", () => {
    const figures = questions.filter(q => q.hasImage);
    expect(figures.map(q => q.officialQuestionLabel)).toEqual(["B群 20"]);
    const q = figures[0];
    expect(q.imageUrls).toHaveLength(1);
    expect(q.imageAltTexts).toEqual(["前スカートのダーツの書き方4種類。左からイ、ロ、ハ、ニ。"]);
    const png = readFileSync(join(process.cwd(), "public", q.imageUrls![0]));
    expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(png.readUInt32BE(16)).toBeGreaterThan(1000);
    expect(png.readUInt32BE(20)).toBeGreaterThan(250);
    expect(q.choices).toEqual({ ア: "図中のイ", イ: "図中のロ", ウ: "図中のハ", エ: "図中のニ" });
    expect(q.answer).toBe("ウ");
  });

  it("原本の用語・否定設問・変遷表を保ち、肯定設問と取り違えない", () => {
    expect(questions[19].question).toContain("ズワーヴスカート");
    expect(questions[25].choices?.ア).toBe("ゴシック → ルネサンス → バロック");
    expect(questions[27].question).toContain("適切でない");
    expect(questions[27].choices?.ウ).toBe("シューズは、サンダルタイプのものを選ぶ。");
    expect(questions[29].question).toContain("適切でない");
    expect(questions[29].choices?.ウ).toBe("繊維の中で、最も軽い。");
    expect(questions[32].choices?.ウ).toBe("バンピース");
    expect(questions[37].choices?.イ).toBe("完成した製品を、工業用ボディに着せて修正する。");
    expect(questions[45].choices?.ウ).toContain("必ず左右対称");
    expect(questions[46].choices?.イ).toContain("運動量を必要としない");
    expect(questions[49].choices?.ア).toBe("まち針");
    expect(questions[49].answer).toBe("ア");
  });
});
