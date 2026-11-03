import { describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { JUDO_SEIFUKUSHI_QUESTIONS } from "@/data/questions/judo-seifukushi";
import officialKeys from "@/docs/evidence/judo-seifukushi-latest-two-20261011/official-keys.json";
import assets from "@/docs/evidence/judo-seifukushi-latest-two-20261011/assets.json";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { isCompleteSelectionCorrect, requiredSelectionCount } from "@/lib/questions/answers";
import { EXAM_CONFIGS, ALL_EXAM_CODES } from "@/lib/exam-config";
import type { ChoiceKey } from "@/lib/questions/types";

const choiceKeys: ChoiceKey[] = ["ア", "イ", "ウ", "エ"];
const questions = JUDO_SEIFUKUSHI_QUESTIONS;
const byId = new Map(questions.map(q => [q.id, q]));

describe("柔道整復師 第34・33回の全原問", () => {
  it("各回の午前128・午後122、必修50・一般200が欠番・重複なくある", () => {
    expect(questions).toHaveLength(500);
    expect(byId.size).toBe(500);
    expect(questions.filter(isPracticeReadyQuestion)).toHaveLength(500);
    for (const year of [2025, 2024]) {
      const edition = questions.filter(q => q.year === year);
      expect(edition).toHaveLength(250);
      expect(edition.filter(q => q.subject === "必修問題")).toHaveLength(50);
      expect(edition.filter(q => q.subject === "一般問題")).toHaveLength(200);
      for (const [session, count] of [["am", 128], ["pm", 122]] as const) {
        const paper = edition.filter(q => q.session === session);
        expect(paper.map(q => q.qNumber)).toEqual(Array.from({ length: count }, (_, i) => i + 1));
        expect(paper.every(q => q.id === `judo-seifukushi-${year}-annual-${session}-q${q.qNumber}`)).toBe(true);
      }
    }
  });

  it("公式最終正答500件と四肢の順番・選択数が一致し、全肢を説明できる", () => {
    expect(officialKeys).toHaveLength(500);
    let explanationCount = 0;
    for (const key of officialKeys) {
      const q = byId.get(key.id)!;
      expect(q, key.id).toBeDefined();
      expect(q.exam).toBe("judo-seifukushi");
      expect(q.year).toBe(key.schemaYear);
      expect(q.examDate).toBe(key.examDate);
      expect(q.officialAnswerNumber).toBe(key.literalOfficialKey);
      expect(q.sourceAnswerUrl).toBe(key.officialAnswerUrl);
      expect(q.requiredSelections).toBe(key.requiredSelections);
      const expected = key.acceptedNumbers.map(n => choiceKeys[n - 1]);
      expect(Array.isArray(q.answer) ? q.answer : [q.answer]).toEqual(expected);
      expect(Object.keys(q.choices ?? {})).toEqual(choiceKeys);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(choiceKeys);
      expect(q.explanationCoverage).toBe("full");
      expect(q.explanation.trim().length).toBeGreaterThan(10);
      expect(q.needsReview).toBe(false);
      expect(q.license).toBe("ZAIJUSEI-attributed");
      expect(q.sourceAttribution).toContain("公益財団法人柔道整復研修試験財団");
      expect(q.sourceAttribution).toContain("厚生労働省");
      for (const choice of choiceKeys) {
        expect(q.choices?.[choice]?.trim().length, q.id).toBeGreaterThan(0);
        expect(q.choiceExplanations?.[choice]?.trim().length, q.id).toBeGreaterThanOrEqual(10);
        explanationCount++;
      }
    }
    expect(explanationCount).toBe(2000);
  });

  it("公式の『又は』2問では一肢を受理し、二つ選択12問では両肢を要求する", () => {
    const eitherCases = [
      ["judo-seifukushi-2025-annual-am-q67", ["イ", "エ"]],
      ["judo-seifukushi-2024-annual-am-q39", ["ウ", "エ"]],
    ] as const;
    for (const [id, answer] of eitherCases) {
      const q = byId.get(id)!;
      expect(q.answer).toEqual(answer);
      expect(requiredSelectionCount(q)).toBe(1);
      for (const choice of answer) expect(isCompleteSelectionCorrect(q.answer, [choice], q.requiredSelections)).toBe(true);
      expect(isCompleteSelectionCorrect(q.answer, answer, q.requiredSelections)).toBe(false);
      expect(isCompleteSelectionCorrect(q.answer, ["ア"], q.requiredSelections)).toBe(false);
    }
    const bothCases = [
      [2025, "pm", 51, ["ア", "ウ"]], [2025, "pm", 53, ["ア", "ウ"]],
      [2025, "pm", 101, ["ウ", "エ"]], [2025, "pm", 121, ["イ", "ウ"]],
      [2024, "am", 118, ["ア", "イ"]], [2024, "pm", 12, ["ウ", "エ"]],
      [2024, "pm", 17, ["イ", "エ"]], [2024, "pm", 52, ["ア", "イ"]],
      [2024, "pm", 94, ["ウ", "エ"]], [2024, "pm", 96, ["ア", "ウ"]],
      [2024, "pm", 103, ["ア", "イ"]], [2024, "pm", 117, ["イ", "エ"]],
    ] as const;
    expect(questions.filter(q => q.requiredSelections === 2)).toHaveLength(12);
    for (const [year, session, number, answer] of bothCases) {
      const q = byId.get(`judo-seifukushi-${year}-annual-${session}-q${number}`)!;
      expect(q.answer).toEqual(answer);
      expect(requiredSelectionCount(q)).toBe(2);
      expect(isCompleteSelectionCorrect(q.answer, [...answer].reverse(), q.requiredSelections)).toBe(true);
      expect(isCompleteSelectionCorrect(q.answer, [answer[0]], q.requiredSelections)).toBe(false);
      expect(isCompleteSelectionCorrect(q.answer, [answer[0], answer[0]], q.requiredSelections)).toBe(false);
    }
  });

  it("実施年と年度を混同せず、原本の番号と回次で表示する", () => {
    expect(choiceKeys.map(key => choiceDisplayLabel("judo-seifukushi", key))).toEqual(["1", "2", "3", "4"]);
    for (const q of questions) {
      expect(questionSourceEdition(q)).toBe(q.year === 2025
        ? "第34回（令和7年度・2026年実施）" : "第33回（令和6年度・2025年実施）");
    }
    expect(EXAM_CONFIGS["judo-seifukushi"].sessions.map(s => s.expectedQuestions)).toEqual([128, 122]);
    expect(ALL_EXAM_CODES).not.toContain("judo-seifukushi");
  });

  it("必要図16点が質問と一対一で結びつき、原本・画像のSHAを保持する", () => {
    expect(assets).toHaveLength(16);
    expect(questions.filter(q => q.hasImage)).toHaveLength(16);
    for (const asset of assets) {
      const q = byId.get(asset.questionId)!;
      expect(q.imageUrls).toContain(asset.assetUrl);
      expect(q.imageAltTexts?.length).toBe(q.imageUrls?.length);
      expect(asset.sourcePdfSha256).toMatch(/^[a-f0-9]{64}$/);
      expect(asset.sourcePdfPage).toBeGreaterThan(0);
      const bytes = readFileSync(join(process.cwd(), "public", asset.assetUrl));
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(asset.assetSha256);
    }
    const wronglyNamedAppendix = assets.filter(a => a.sourcePdfUrl.endsWith("2025_33_gozen_bessatsu.pdf"));
    expect(wronglyNamedAppendix).toHaveLength(8);
    expect(wronglyNamedAppendix.every(a => a.questionId.includes("-pm-"))).toBe(true);
  });

  it.each(["judo-seifukushi-2025-annual-am-q83", "judo-seifukushi-2025-annual-pm-q19"])(
    "keeps official answer numbers consistent with explanation prose when shuffling %s",
    (id) => {
      const random = vi.spyOn(Math, "random").mockReturnValue(0);
      try {
        const original = byId.get(id)!;
        const shuffled = shuffleChoices(original);
        expect(shuffled.officialAnswerNumber).toBe("2");
        expect(choiceDisplayLabel(shuffled.exam, shuffled.answer as ChoiceKey)).toBe(shuffled.officialAnswerNumber);
        expect(shuffled.choices).toEqual(original.choices);
        expect(shuffled.choiceExplanations).toEqual(original.choiceExplanations);
        expect(shuffled.explanation).toBe(original.explanation);
        expect(shuffled.imageUrls).toEqual(original.imageUrls);
      } finally {
        random.mockRestore();
      }
    },
  );

  it("登録と遅延ローダが500件を提供する", async () => {
    expect(getRegisteredExamCodes()).toContain("judo-seifukushi");
    const lazy = await getQuestionsForExam("judo-seifukushi");
    expect(lazy.map(q => q.id)).toEqual(questions.map(q => q.id));
  });
});
