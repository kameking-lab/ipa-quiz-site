import { describe, expect, it } from "vitest";
import { TSUKANSHI_QUESTIONS, TSUKANSHI_NONE_KEY } from "@/data/questions/tsukanshi";
import { KIKAI_HOZEN_QUESTIONS } from "@/data/questions/kikai-hozen";
import { KIKAI_HOZEN_STAGED_QUESTIONS } from "@/data/qualification-staging/kikai-hozen";
import { choiceDisplayLabel, formatQuestionAnswerForDisplay } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";
import type { ChoiceKey } from "@/lib/questions/types";

describe("通関士 第59回: 択一式の「該当なし＝0」", () => {
  const nonePrompts = TSUKANSHI_QUESTIONS.filter((q) => !q.part && q.choices?.[TSUKANSHI_NONE_KEY] !== undefined);
  it("publishes all 105 answer units and keeps every unit practice-ready", () => {
    expect(TSUKANSHI_QUESTIONS).toHaveLength(105);
    expect(TSUKANSHI_QUESTIONS.filter(isPracticeReadyQuestion)).toHaveLength(105);
  });
  it("moves the 0 option of the 30 single/multi-choice prompts to タ and labels it 0", () => {
    expect(nonePrompts).toHaveLength(30);
    for (const q of nonePrompts) {
      expect(q.choices?.カ, q.id).toBeUndefined();
      expect(q.choices?.[TSUKANSHI_NONE_KEY], q.id).toMatch(/^０/);
      expect(q.choiceExplanations?.[TSUKANSHI_NONE_KEY], q.id).toBeTruthy();
    }
    expect(choiceDisplayLabel("tsukanshi", "タ")).toBe("0");
    expect(choiceDisplayLabel("tsukanshi", "ア")).toBe("1");
    expect(choiceDisplayLabel("tsukanshi", "オ")).toBe("5");
  });
  it("shows the official answer 0 where 0 is correct", () => {
    const q18 = TSUKANSHI_QUESTIONS.find((q) => q.id === "tsukanshi-2025-annual-tsukan-law-q18")!;
    expect(q18.answer).toBe(TSUKANSHI_NONE_KEY);
    expect(formatQuestionAnswerForDisplay(q18, q18.answer as ChoiceKey)).toBe("0");
  });
  it("keeps word-bank blanks numbered 1〜15 (カ stays 6)", () => {
    const bank = TSUKANSHI_QUESTIONS.find((q) => q.part && q.choices?.ソ !== undefined)!;
    expect(bank.choices?.カ).toBeDefined();
    expect(choiceDisplayLabel("tsukanshi", "カ")).toBe("6");
    expect(choiceDisplayLabel("tsukanshi", "ソ")).toBe("15");
  });
  it("resolves every answer-unit URL", () => {
    for (const q of TSUKANSHI_QUESTIONS) {
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(TSUKANSHI_QUESTIONS, { exam, yearSeason, section, qnum })?.id, q.id).toBe(q.id);
    }
  });
});

describe("機械保全 2級: 真偽法の2択表示", () => {
  it("publishes 150 questions with the official answers", () => {
    expect(KIKAI_HOZEN_QUESTIONS).toHaveLength(150);
    expect(KIKAI_HOZEN_QUESTIONS.filter(isPracticeReadyQuestion)).toHaveLength(150);
    for (const [index, staged] of KIKAI_HOZEN_STAGED_QUESTIONS.entries()) {
      const q = KIKAI_HOZEN_QUESTIONS[index]!;
      const expected = staged.answerFormat === "true-false" ? ({ "〇": "ア", "×": "イ" } as const)[staged.officialAnswer as "〇" | "×"] : staged.officialAnswer;
      expect(q.answer, q.id).toBe(expected);
      expect(Object.keys(q.choiceExplanations ?? {}).sort(), q.id).toEqual(Object.keys(q.choices ?? {}).sort());
    }
  });
  it("labels true/false choices with the original 〇・× symbols", () => {
    const tf = KIKAI_HOZEN_QUESTIONS.filter((q) => q.qNumber <= 25);
    expect(tf).toHaveLength(75);
    for (const q of tf) expect(q.choices, q.id).toEqual({ ア: "正しい（〇）", イ: "誤り（×）" });
  });
  it("serves every figure from public/images", () => {
    const withImages = KIKAI_HOZEN_QUESTIONS.filter((q) => q.hasImage);
    expect(withImages).toHaveLength(15);
    for (const q of withImages) expect(q.imageUrls?.[0], q.id).toMatch(/^\/images\/questions\/kikai-hozen\/\d{4}-q\d{2}\.webp$/);
  });
});
