import { describe, expect, it } from "vitest";
import { ZOEN1_QUESTIONS } from "@/data/questions/zoen1";
import supplement from "@/data/questions/zoen1/2026-september-supplement10.json";

describe("Zoen1 technical supplement ten", () => {
  it("retains all official answer mappings and four reasons", () => {
    const items = supplement.papers.flatMap((paper) => paper.questions.map((item) => ({ paper, item })));
    expect(items.map(({ paper, item }) => `${paper.session}:${item.number}`)).toEqual([
      "mondai-a:29", "mondai-a:35", "mondai-b:17", "mondai-b:18",
      "mondai-b:20", "mondai-b:21", "mondai-b:22", "mondai-b:23",
    ]);
    expect(items.map(({ item }) => item.officialAnswerNumbers)).toEqual([[1], [3], [3], [3], [2], [4], [2], [1]]);
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
  it("preserves squared units and excludes the following shared instructions", () => {
    const building = ZOEN1_QUESTIONS.find((q) => q.session === "mondai-b" && q.qNumber === 20)!;
    expect(building.choices?.ウ).toContain("100 m²");
    const labour = ZOEN1_QUESTIONS.find((q) => q.session === "mondai-b" && q.qNumber === 23)!;
    expect(labour.choices?.エ).not.toContain("問題24");
    expect(labour.choiceExplanations?.ア).toContain("7日以内");
    const inspection = ZOEN1_QUESTIONS.find((q) => q.session === "mondai-b" && q.qNumber === 22)!;
    expect(inspection.choiceExplanations?.イ).toContain("20日以内");
    const ledger = ZOEN1_QUESTIONS.find((q) => q.session === "mondai-a" && q.qNumber === 35)!;
    expect(ledger.choiceExplanations?.ウ).toContain("工事現場ごと");
    expect(new Set(ZOEN1_QUESTIONS.map((q) => q.id)).size).toBe(ZOEN1_QUESTIONS.length);
  });
});
