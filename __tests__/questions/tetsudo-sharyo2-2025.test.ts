import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { TETSUDO_SHARYO2_QUESTIONS as allQuestions } from "@/data/questions/tetsudo-sharyo2";
import sources from "@/data/questions/tetsudo-sharyo2/sources.json";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel, questionNumberLabel, usesNumberedChoices } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import type { ChoiceKey } from "@/lib/questions/types";

// 正答表の画像を5問の枠ごとに独立して照合（2025/09/07、機器ぎ装作業【2級】）。
const trueFalse = ["○×××○", "×××○×", "×○○○○", "×××○×", "×○○○×"].join("").split("");
const multipleChoice = ["ニニロロイ", "ハニハイニ", "イイハイニ", "ロロロニハ", "イイニハイ"].join("").split("");
const internalKeys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const printedLabels = ["イ", "ロ", "ハ", "ニ"];

const questions = allQuestions.filter(q => q.year === 2025 && q.season === "early");

describe("鉄道車両製造・整備技能士2級 機器ぎ装作業 2025年度前期", () => {
  it("公式正答50件・A/B群の番号・150肢の解説を保持する", () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map(q => q.id)).size).toBe(50);
    let choiceCount = 0;
    for (const [index, q] of questions.entries()) {
      const a = index < 25;
      const n = index % 25 + 1;
      const official = (a ? trueFalse : multipleChoice)[n - 1];
      expect(q.id).toBe(`tetsudo-sharyo2-2025-early-gakka-${a ? "a" : "b"}-${String(n).padStart(3, "0")}`);
      expect(q.qNumber, q.id).toBe(index + 1);
      expect(questionNumberLabel(q)).toBe(`${a ? "A" : "B"}群 ${n}`);
      expect(q.officialAnswerNumber, q.id).toBe(official);
      expect(q.answer, q.id).toBe(a ? (official === "○" ? "ア" : "イ") : internalKeys[printedLabels.indexOf(official)]);
      expect(Object.keys(q.choices ?? {})).toHaveLength(a ? 2 : 4);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(Object.keys(q.choices ?? {}));
      expect(Object.values(q.choiceExplanations ?? {}).every(reason => reason!.length > 20), q.id).toBe(true);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.sourcePdfUrl).toMatch(/kentei\.javada\.or\.jp\/pdf\/R07-1-B43-.*#page=[2-8]$/);
      expect(q.sourceAnswerUrl).toContain("%E6%AD%A3%E8%A7%A3%E8%A1%A8");
      expect(q.examDate).toBe("2025-09-07");
      expect(questionSourceEdition(q)).toBe("2025年度前期（2025年9月7日実施）");
      choiceCount += Object.keys(q.choices ?? {}).length;
    }
    expect(choiceCount).toBe(150);
  });

  it("B群のイロハニ表示と50問それぞれのURLから問題を復元する", () => {
    expect(internalKeys.map(key => choiceDisplayLabel("tetsudo-sharyo2", key))).toEqual(printedLabels);
    expect(usesNumberedChoices("tetsudo-sharyo2")).toBe(true);
    expect(questions[0].choices).toEqual({ ア: "正しい（○）", イ: "誤り（×）" });
    expect(new Set(questions.map(questionPagePath)).size).toBe(50);
    for (const q of questions) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(questions, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });

  it("資格一覧・同期/遅延ローダー・8分野を接続する", async () => {
    expect(QUESTIONS_BY_EXAM["tetsudo-sharyo2"]!.filter(q => q.year === 2025 && q.season === "early")).toEqual(questions);
    expect((await getQuestionsForExam("tetsudo-sharyo2")).filter(q => q.year === 2025 && q.season === "early")).toEqual(questions);
    expect(getQualificationByExamCode("tetsudo-sharyo2")?.status).toBe("live");
    const config = EXAM_CONFIGS["tetsudo-sharyo2"];
    expect(config.sessions[0].expectedQuestions).toBe(50);
    expect(config.seasons).toEqual(expect.arrayContaining(["early"]));
    expect(config.sessions[0].categories).toEqual(expect.arrayContaining([...new Set(questions.map(q => q.category))]));
  });

  it("原本図表5点を保存し、解答に必要な寸法線・記号と代替文を保持する", () => {
    const figures = questions.filter(q => q.hasImage);
    expect(figures.map(q => q.officialQuestionLabel)).toEqual(["A群 6", "A群 15", "B群 13", "B群 14", "B群 25"]);
    for (const q of figures) {
      expect(q.imageUrls).toHaveLength(1);
      expect(q.imageAltTexts).toHaveLength(1);
      const png = readFileSync(join(process.cwd(), "public", q.imageUrls![0]));
      expect(png.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
      expect(png.readUInt32BE(16)).toBeGreaterThan(200);
      expect(png.readUInt32BE(20)).toBeGreaterThan(100);
      expect(q.imageAltTexts![0]).not.toMatch(/正解|安全弁|真直度|パレート|特性要因図|圧縮応力/);
      const asset = Object.values(sources.figures).find(f => f.path === q.imageUrls![0]);
      expect(asset, q.id).toBeDefined();
      expect(createHash("sha256").update(png).digest("hex")).toBe(asset!.sha256);
    }
    expect(questions[33].choices?.ア).toBe("I＝V/R");
    expect(questions[38].choices?.ア).toBe("平面度　―");
    expect(questions[43].choices?.ア).toContain("再突出部");
    expect(questions[44].choices?.ウ).toBe("30 mm");
    expect(questions[48].answer).toBe("ウ");
  });
});
