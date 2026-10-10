import { describe, expect, it } from "vitest";
import { RIGAKU_RYOHOUSHI_QUESTIONS } from "@/data/questions/rigaku-ryohoshi";
import manifest from "@/data/questions/rigaku-ryohoshi/source-manifest.json";
import previous2026 from "@/data/questions/rigaku-ryohoshi/2026-annual.json";
import previous2025 from "@/data/questions/rigaku-ryohoshi/2025-annual.json";
const original29 = [...previous2026, ...previous2025];
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { choiceDisplayLabel } from "@/lib/questions/display";

const choices = ["ア", "イ", "ウ", "エ", "オ"] as const;

describe("理学療法士の部分収録", () => {
  it("保存した29原問のみを公開母集団へ入れ、保留35原問を混入させない", async () => {
    const loaded = await getQuestionsForExam("rigaku-ryohoshi");
    expect(loaded).toEqual(RIGAKU_RYOHOUSHI_QUESTIONS);
    expect(loaded).toHaveLength(179);
    expect(original29).toHaveLength(29);
    for (const original of original29) expect(loaded.find((q) => q.id === original.id)).toEqual(original);
    expect(new Set(loaded.map((question) => question.id)).size).toBe(179);
    expect(loaded.map((question) => question.session)).toEqual(expect.arrayContaining(["am", "pm"]));
    expect(original29.filter((question) => question.year === 2026 && question.session === "am")).toHaveLength(7);
    expect(original29.filter((question) => question.year === 2026 && question.session === "pm")).toHaveLength(6);
    expect(original29.filter((question) => question.year === 2025 && question.session === "am")).toHaveLength(12);
    expect(original29.filter((question) => question.year === 2025 && question.session === "pm")).toHaveLength(4);
    expect(manifest.heldIdentities).toHaveLength(35);
    expect(manifest.officialLatestTwoRoundOriginals).toBe(400);
    expect(manifest.latestTwoRoundsComplete).toBe(false);
    expect(manifest.localReadyOriginals + manifest.heldWithinNewScope).toBe(manifest.newSourceScopeIncludingUnwrittenAlternativeCells);
  });

  it("全問で公式キー・5肢・全肢理由を持ち、図と代替採点の保留問を除外する", () => {
    const held = new Set(manifest.heldIdentities);
    let twoSelection = 0;
    for (const question of original29) {
      const receipt = manifest.sourceReceipts[question.id as keyof typeof manifest.sourceReceipts];
      expect(receipt, question.id).toBeDefined();
      expect(held.has(receipt.identity), question.id).toBe(false);
      expect(question.officialAnswerNumber, question.id).toBe(receipt.officialKeyCellLiteral);
      expect(question.needsReview, question.id).toBe(false);
      expect(question.hasImage, question.id).toBe(false);
      expect(question.sourcePdfUrl, question.id).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
      expect(question.sourceAnswerUrl, question.id).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
      expect(question.choices && Object.keys(question.choices), question.id).toEqual(choices);
      expect(question.choiceExplanations && Object.keys(question.choiceExplanations), question.id).toEqual(choices);
      for (const key of choices) {
        expect(question.choices?.[key]?.trim().length, question.id).toBeGreaterThan(0);
        expect(question.choiceExplanations?.[key]?.trim().length, question.id).toBeGreaterThan(0);
      }
      const answer = Array.isArray(question.answer) ? question.answer : [question.answer];
      expect(answer.length, question.id).toBe(question.requiredSelections);
      if (answer.length === 2) twoSelection++;
    }
    expect(twoSelection).toBe(2);
    expect(manifest.localReadyChoices).toBe(145);
    expect(manifest.heldIdentities).toEqual(expect.arrayContaining(["rigaku-61-pm-26", "rigaku-61-pm-30", "rigaku-60-pm-31", "rigaku-61-pm-34"]));
    expect(choiceDisplayLabel("rigaku-ryohoshi", "ア")).toBe("1");
    expect(choiceDisplayLabel("rigaku-ryohoshi", "オ")).toBe("5");
  });
});
