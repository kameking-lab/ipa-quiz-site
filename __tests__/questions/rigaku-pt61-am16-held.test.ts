import { describe, expect, it } from "vitest";
import candidate from "@/data/questions/rigaku-ryohoshi/2026-am16-held-candidate.json";
import manifest from "@/data/questions/rigaku-ryohoshi/2026-am16-held-manifest.json";
import { RIGAKU_RYOHOUSHI_QUESTIONS } from "@/data/questions/rigaku-ryohoshi";
import { isAcceptedAnswer, isCompleteSelectionCorrect } from "@/lib/questions/answers";
import type { ChoiceKey, Question } from "@/lib/questions/types";

const expected = [24, 42, 58, 60, 61, 62, 63, 64, 66, 67, 68, 77, 78, 79, 80, 98];
const choiceKeys = ["ア", "イ", "ウ", "エ", "オ"];
const rows = candidate as unknown as Question[];

describe("PT第61回午前16問の隔離候補", () => {
  it("preserves all 16 exact IDs, five choices and 80 individual reasons", () => {
    expect(rows).toHaveLength(16);
    expect(rows.map((question) => question.qNumber)).toEqual(expected);
    expect(new Set(rows.map((question) => question.id)).size).toBe(16);
    expect(manifest.questionCount).toBe(16);
    expect(manifest.choiceExplanationCount).toBe(80);
    for (const q of rows) {
      expect(q.id).toBe(`rigaku-ryohoshi-2026-annual-am-q${q.qNumber}`);
      expect([q.exam, q.year, q.season, q.session]).toEqual(["rigaku-ryohoshi", 2026, "annual", "am"]);
      expect(Object.keys(q.choices ?? {})).toEqual(choiceKeys);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(choiceKeys);
      expect(q.explanation.trim().length).toBeGreaterThan(0);
      for (const reason of Object.values(q.choiceExplanations ?? {})) expect(reason?.trim().length).toBeGreaterThan(0);
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
      expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
      expect(q.license).toBe("MHLW-attributed");
    }
    expect(rows.reduce((total, q) => total + Object.keys(q.choiceExplanations ?? {}).length, 0)).toBe(80);
  });

  it("keeps every draft and diagram out of the live registry", () => {
    expect(manifest.publicGo).toBe(false);
    expect(manifest.siteAdopted).toBe(false);
    expect(rows.every((q) => q.needsReview === true)).toBe(true);
    const live = new Set(RIGAKU_RYOHOUSHI_QUESTIONS.map((q) => q.id));
    for (const q of rows) expect(live.has(q.id), q.id).toBe(false);
    const figure = rows.find((q) => q.qNumber === 58);
    expect(figure?.hasImage).toBe(true);
    expect(figure?.imageUrls).toBeUndefined();
    expect(rows.filter((q) => q.hasImage)).toHaveLength(1);
    expect(manifest.explicitHolds.map((hold) => hold.questionNumber)).toEqual([42, 66]);
    expect(manifest.receipts["rigaku-ryohoshi-2026-annual-am-q42"].reviewStatus).toBe("HOLD_SOURCE_EVIDENCE");
    expect(manifest.reviewCaveat.questionNumber).toBe(24);
    expect(manifest.independentReview.reviewedQuestionNumbers).toHaveLength(14);
    expect(manifest.independentReview.reviewedWithEvidenceLimit).toEqual([24]);
    expect(manifest.independentReview.heldQuestionNumbers).toEqual([42, 66]);
    expect(manifest.independentReview.candidateNeedsReviewCount).toBe(16);
    expect(manifest.independentReview.publicAdded).toBe(0);
    expect(manifest.independentReview.registryConnected).toBe(false);
  });

  it("models official alternatives with the original required selection count", () => {
    const q42 = rows.find((q) => q.qNumber === 42)!;
    const q60 = rows.find((q) => q.qNumber === 60)!;
    const q98 = rows.find((q) => q.qNumber === 98)!;
    expect([q42.answer, q42.requiredSelections, q42.officialAnswerNumber]).toEqual([["ア", "イ", "ウ"], 2, "12/13/23"]);
    expect([q60.answer, q60.requiredSelections, q60.officialAnswerNumber]).toEqual([["ウ", "エ"], 1, "3/4"]);
    expect([q98.answer, q98.requiredSelections, q98.officialAnswerNumber]).toEqual([["ア", "ウ"], 1, "1/3"]);
    for (const pair of [["ア", "イ"], ["ア", "ウ"], ["イ", "ウ"]]) {
      expect(isCompleteSelectionCorrect(q42.answer, pair, q42.requiredSelections)).toBe(true);
    }
    expect(isCompleteSelectionCorrect(q42.answer, ["ア", "エ"], 2)).toBe(false);
    for (const [q, accepted, rejected] of [
      [q60, ["ウ", "エ"], "ア"],
      [q98, ["ア", "ウ"], "イ"],
    ] as Array<[Question, ChoiceKey[], ChoiceKey]>) {
      for (const key of accepted) expect(isAcceptedAnswer(q.answer, key)).toBe(true);
      expect(isAcceptedAnswer(q.answer, rejected)).toBe(false);
    }
  });
});
