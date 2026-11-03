import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "@/data/questions";
import { hasUnrenderableContent } from "@/lib/questions/content-quality";

describe("source-restored blank-choice IPA records", () => {
  const expected = { "fe-2019h-am-q5": "イ", "sc-2009a-am1-q19": "エ", "nw-2017h-am1-q16": "ア", "pm-2018a-am1-q20": "イ", "sm-2009a-am2-q10": "ウ" };
  for (const [id, answer] of Object.entries(expected)) {
    it(`makes ${id} answerable with all four original options`, () => {
      const q = ALL_QUESTIONS.find(q => q.id === id)!;
      expect(q).toBeDefined();
      expect(q.answer).toBe(answer);
      expect(Object.values(q.choices ?? {}).every(c => c.trim().length > 0)).toBe(true);
      expect(new Set(Object.values(q.choices ?? {})).size).toBe(4);
      expect(q.needsReview).toBe(false);
      expect(hasUnrenderableContent(q)).toBe(false);
      expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.ipa\.go\.jp\//);
    });
  }
  it("retains the full binary-tree edges and the opposite distractor trends", () => {
    const find = (id: string) => ALL_QUESTIONS.find(q => q.id === id)!;
    expect(find("fe-2019h-am-q5").choices?.ウ).toContain("6：（4、5）");
    expect(find("nw-2017h-am1-q16").choices?.ア).toBe("人・犬・猫 → 哺乳類");
    expect(find("sm-2009a-am2-q10").choices?.ア).toContain("下がり");
    expect(find("sc-2009a-am1-q19").choices?.エ).toContain("大きくなる");
    expect(find("pm-2018a-am1-q20").question).toContain("事業のニーズを満たすかどうかをテスト");
  });
});
