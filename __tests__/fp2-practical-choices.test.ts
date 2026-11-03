import { describe, expect, it } from "vitest";
import corpus from "@/data/questions/fp2/practical-2024-2025.json";
import { splitPracticalChoices } from "@/lib/fp2/practical-choices";

describe("FP2 practical choice layout", () => {
  it("separates all four official 1–4 answer sets from the question paragraph", () => {
    for (const edition of Object.values(corpus)) {
      for (const q of edition.questions) {
        if (!/^[1-4]$/.test(q.modelAnswer)) continue;
        const split = splitPracticalChoices(q.body, q.modelAnswer);
        expect(split, `${q.number}: ${q.body.slice(-100)}`).not.toBeNull();
        expect(split?.choices.map((choice) => choice.number)).toEqual([1, 2, 3, 4]);
        expect(split?.questionText.length).toBeGreaterThan(10);
      }
    }
  });

  it("leaves calculation and multi-blank questions in their original text format", () => {
    const q = corpus["202501"].questions[39]!;
    expect(splitPracticalChoices(q.body, q.modelAnswer)).toBeNull();
  });
});
