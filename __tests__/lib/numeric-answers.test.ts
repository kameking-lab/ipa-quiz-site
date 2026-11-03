import { beforeEach, describe, expect, it } from "vitest";
import { nurseNumericQuestion as question } from "@/__tests__/fixtures/nurse-numeric-question";
import { formatNumericAnswer, isNumericAnswerCorrect, normalizeNumericAnswer, numericQuestionIssue } from "@/lib/questions/numeric";
import { filterQuestions, isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { createHistoryStore } from "@/lib/storage/history";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import type { Question } from "@/lib/questions/types";

beforeEach(() => localStorage.clear());

describe("original-format numeric answers", () => {
  it.each(["42", "４２", " 42 ", "　４２　", "0042", "４2"])("normalizes %j and grades the official value", (value) => {
    expect(normalizeNumericAnswer(value)).toBe("42");
    expect(isNumericAnswerCorrect(question, value)).toBe(true);
  });

  it.each(["", "　 ", "42foo", "42滴/分", "42.0", "41.67", "4 2", "+42", "-42", "4.2e1", "0x2a", "4,2", "㊷"])("rejects %j instead of partially parsing it", (value) => {
    expect(normalizeNumericAnswer(value)).toBeUndefined();
    expect(isNumericAnswerCorrect(question, value)).toBe(false);
  });

  it("keeps valid wrong answers and large integers distinct without floating-point rounding", () => {
    expect(normalizeNumericAnswer("０")).toBe("0");
    expect(isNumericAnswerCorrect(question, "41")).toBe(false);
    expect(normalizeNumericAnswer("9007199254740993")).toBe("9007199254740993");
    expect(formatNumericAnswer(question)).toBe("42 滴/分");
  });

  it.each([
    { answer: ["42"] }, { answer: "４２" }, { answer: "42foo" },
    { numericAnswer: undefined }, { numericAnswer: { format: "integer", unit: " " } },
    { numericAnswer: { format: "integer" } }, { choices: { ア: "42" } },
    { choiceExplanations: {} }, { requiredSelections: 2 },
  ])("fails closed on inconsistent metadata %j", (changes) => {
    const invalid = { ...question, ...changes } as Question;
    expect(numericQuestionIssue(invalid)).toBeTruthy();
    expect(isPracticeReadyQuestion(invalid)).toBe(false);
    expect(isNumericAnswerCorrect(invalid, "42")).toBe(false);
  });

  it("serves numeric questions through year/random/review/unanswered pools and leaves the original unchanged", () => {
    const history = createHistoryStore();
    expect(numericQuestionIssue(question)).toBeUndefined();
    expect(shuffleChoices(question)).toBe(question);
    for (const mode of ["year", "random", "unanswered"] as const) {
      expect(filterQuestions([question], { mode, exam: "kangoshi", year: 2025 }, history)).toEqual([question]);
    }
    history.record({ id: question.id, selected: "41", correct: false, at: 1 });
    expect(filterQuestions([question], { mode: "review", exam: "kangoshi" }, history)).toEqual([question]);
    expect(filterQuestions([question], { mode: "unanswered", exam: "kangoshi" }, history)).toEqual([]);
    history.record({ id: question.id, selected: "42", correct: true, at: 2 });
    expect(filterQuestions([question], { mode: "review", exam: "kangoshi" }, history)).toEqual([]);
  });

  it("includes the official unit in the structured answer", () => {
    const data = buildQuestionJsonLd({ question, pageUrlAbs: "https://www.kakomon-ai.jp/q/kangoshi/2025-annual/am/q90", title: "看護師 問90", lastUpdatedISO: "2026-10-10" });
    expect(JSON.stringify(data)).toContain('"text":"42 滴/分"');
  });
});
