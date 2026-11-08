import { describe, expect, it } from "vitest";
import { ZOEN1_QUESTIONS } from "@/data/questions/zoen1";
import supplement from "@/data/questions/zoen1/2026-september-supplement9.json";

describe("Zoen1 technical supplement nine", () => {
  it("retains all official answer mappings and four reasons", () => {
    const items = supplement.papers.flatMap((paper) => paper.questions.map((item) => ({ paper, item })));
    expect(items.map(({ paper, item }) => `${paper.session}:${item.number}`)).toEqual([
      "mondai-b:13", "mondai-b:14", "mondai-b:15", "mondai-b:16", "mondai-b:29",
    ]);
    expect(items.map(({ item }) => item.officialAnswerNumbers)).toEqual([[3], [4], [3], [3], [1, 4]]);
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
  it("distinguishes falling objects, special education and crane stops", () => {
    const q = (n: number) => ZOEN1_QUESTIONS.find((q) => q.session === "mondai-b" && q.qNumber === n)!;
    expect(q(13).choiceExplanations?.ウ).toContain("35cm以上50cm以下");
    expect(q(13).choiceExplanations?.イ).toContain("物体の落下");
    expect(q(15).choiceExplanations?.ウ).toContain("特別教育");
    expect(q(16).choiceExplanations?.ウ).toContain("誘導者");
    expect(q(29).answer).toEqual(["ア", "エ"]);
    expect(q(29).requiredSelections).toBe(2);
    expect(q(29).choiceExplanations?.ア).toContain("控除");
    expect(q(29).choiceExplanations?.エ).toContain("中止");
    expect(new Set(ZOEN1_QUESTIONS.map((q) => q.id)).size).toBe(ZOEN1_QUESTIONS.length);
  });
});
