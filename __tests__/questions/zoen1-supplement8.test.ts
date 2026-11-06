import { describe, expect, it } from "vitest";
import { ZOEN1_QUESTIONS } from "@/data/questions/zoen1";
import supplement from "@/data/questions/zoen1/2026-september-supplement8.json";

describe("Zoen1 technical supplement eight", () => {
  it("retains the five official answers and all choice reasons", () => {
    const items = supplement.papers.flatMap((paper) => paper.questions.map((item) => ({ paper, item })));
    expect(items.map(({ paper, item }) => `${paper.session}:${item.number}`)).toEqual([
      "mondai-a:25", "mondai-a:26", "mondai-a:32", "mondai-a:33", "mondai-b:9",
    ]);
    expect(items.map(({ item }) => item.officialAnswerNumbers)).toEqual([[4], [2], [3], [4], [1]]);
    for (const { paper, item } of items) {
      const q = ZOEN1_QUESTIONS.find((q) => q.session === paper.session && q.qNumber === item.number)!;
      expect(q.answer).toBe(["ア", "イ", "ウ", "エ"][item.officialAnswerNumbers[0]! - 1]);
      expect(q.explanationCoverage).toBe("full");
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(q.officialReferenceUrls?.length).toBeGreaterThan(0);
    }
    expect(new Set(ZOEN1_QUESTIONS.map((q) => q.id)).size).toBe(ZOEN1_QUESTIONS.length);
  });
  it("retains the roof figure and the categories that distinguish the distractors", () => {
    const roof = ZOEN1_QUESTIONS.find((q) => q.session === "mondai-a" && q.qNumber === 26)!;
    expect(roof.hasImage).toBe(true);
    expect(roof.imageUrls).toHaveLength(1);
    expect(roof.imageAltTexts).toHaveLength(1);
    const garden = ZOEN1_QUESTIONS.find((q) => q.session === "mondai-a" && q.qNumber === 25)!;
    expect(garden.choiceExplanations?.エ).toContain("内露地");
    const plan = ZOEN1_QUESTIONS.find((q) => q.session === "mondai-a" && q.qNumber === 32)!;
    expect(plan.choiceExplanations?.ウ).toContain("労務計画");
    const stone = ZOEN1_QUESTIONS.find((q) => q.session === "mondai-b" && q.qNumber === 9)!;
    expect(stone.choiceExplanations?.ア).toContain("1.2倍");
    expect(stone.choiceExplanations?.ア).toContain("15cm");
  });
});
