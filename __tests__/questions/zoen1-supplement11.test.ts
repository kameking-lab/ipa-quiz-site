import { describe, expect, it } from "vitest";
import { ZOEN1_QUESTIONS } from "@/data/questions/zoen1";
import supplement from "@/data/questions/zoen1/2026-september-supplement11.json";

const KEYS = ["ア", "イ", "ウ", "エ"] as const;
const toKeys = (numbers: readonly number[]) => numbers.map((n) => KEYS[n - 1]);

// 公式正答肢 20260907z_seitou.pdf（SHA256 6faa5bee…）を原本画像で読み取った全65問。
const OFFICIAL_A = [4, 2, 2, 2, 1, 3, 2, 4, 1, 2, 3, 4, 2, 4, 4, 3, 3, 1, 1, 2, 2, 3, 2, 2, 4, 2, 2, 1, 1, 3, 1, 3, 4, 3, 3, 2];
const OFFICIAL_B: readonly (readonly number[])[] = [
  [1], [4], [1], [3], [3], [1], [4], [1], [1], [2], [3], [2], [3], [4], [3], [3], [3], [3], [2], [2], [4], [2], [1],
  [1, 3], [1, 2, 4], [1, 3, 4], [2], [1, 2, 4], [1, 4],
];

describe("1級造園 令和8年度第一次検定 補充11（残り7問で全65問）", () => {
  it("補充11の7問と公式正答", () => {
    const items = supplement.papers.flatMap((paper) => paper.questions.map((item) => ({ paper, item })));
    expect(items.map(({ paper, item }) => `${paper.session}:${item.number}`)).toEqual([
      "mondai-a:11", "mondai-a:16", "mondai-a:20", "mondai-a:27", "mondai-a:28", "mondai-b:19", "mondai-b:27",
    ]);
    for (const { item } of items) {
      expect(item.choices).toHaveLength(4);
      expect(item.choiceExplanations).toHaveLength(4);
      expect(item.choiceExplanations.every((text) => text.length >= 30)).toBe(true);
    }
  });

  it("問題A36問・問題B29問がそろい、全問が公式正答肢と一致する", () => {
    const a = ZOEN1_QUESTIONS.filter((q) => q.session === "mondai-a").map((q) => q.qNumber);
    const b = ZOEN1_QUESTIONS.filter((q) => q.session === "mondai-b").map((q) => q.qNumber);
    expect(a).toEqual(Array.from({ length: 36 }, (_, i) => i + 1));
    expect(b).toEqual(Array.from({ length: 29 }, (_, i) => i + 1));
    for (const q of ZOEN1_QUESTIONS) {
      const official = q.session === "mondai-a" ? [OFFICIAL_A[q.qNumber - 1]!] : OFFICIAL_B[q.qNumber - 1]!;
      const expected = toKeys(official);
      expect(q.answer, q.id).toEqual(expected.length === 1 ? expected[0] : expected);
      expect(q.requiredSelections, q.id).toBe(expected.length === 1 ? undefined : expected.length);
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual([...KEYS]);
    }
  });

  it("問題B No.27は「全て選べ」形式だが公式正答は(2)のみ", () => {
    const q = ZOEN1_QUESTIONS.find((item) => item.session === "mondai-b" && item.qNumber === 27)!;
    expect(q.answer).toBe("イ");
    expect(q.explanation).toContain("正答肢は1つ");
  });
});
