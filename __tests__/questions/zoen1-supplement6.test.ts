import { describe, expect, it } from "vitest";
import { ZOEN1_QUESTIONS } from "@/data/questions/zoen1";
import supplement from "@/data/questions/zoen1/2026-september-supplement6.json";

describe("Zoen1 technical supplement six", () => {
  it("retains all official answer mappings and four reasons", () => {
    const items = supplement.papers.flatMap((paper) => paper.questions.map((item) => ({ paper, item })));
    expect(items.map(({ paper, item }) => `${paper.session}:${item.number}`)).toEqual([
      "mondai-a:36", "mondai-b:2", "mondai-b:7", "mondai-b:11", "mondai-b:12", "mondai-b:28",
    ]);
    expect(items.map(({ item }) => item.officialAnswerNumbers)).toEqual([[2], [4], [4], [3], [2], [1, 2, 4]]);
    for (const { paper, item } of items) {
      const q = ZOEN1_QUESTIONS.find((q) => q.session === paper.session && q.qNumber === item.number)!;
      expect(q.explanationCoverage).toBe("full");
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(q.officialReferenceUrls?.length).toBeGreaterThan(0);
      const expected = item.officialAnswerNumbers.map((n) => ["ア", "イ", "ウ", "エ"][n - 1]);
      expect(q.answer).toEqual(expected.length === 1 ? expected[0] : expected);
      expect(q.requiredSelections).toBe(expected.length === 1 ? undefined : expected.length);
    }
  });
  it("preserves the network diagram and the specified three-stem rule", () => {
    const network = ZOEN1_QUESTIONS.find((q) => q.session === "mondai-a" && q.qNumber === 36)!;
    const trees = ZOEN1_QUESTIONS.find((q) => q.session === "mondai-b" && q.qNumber === 28)!;
    expect(network.hasImage).toBe(true);
    expect(network.imageUrls).toEqual(["/images/questions/zoen1/2026-september-a-q36-network.png"]);
    expect(network.imageAltTexts?.[0]).toContain("ダミーは2→3と4→5");
    expect(trees.answer).toEqual(["ア", "イ", "エ"]);
    expect(trees.requiredSelections).toBe(3);
    expect(trees.choiceExplanations?.エ).toContain("0.154m");
    expect(new Set(ZOEN1_QUESTIONS.map((q) => q.id)).size).toBe(35);
  });
});
