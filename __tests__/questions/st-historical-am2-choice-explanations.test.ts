import { describe, expect, it } from "vitest";
import { ST_QUESTIONS } from "@/data/questions/st";
import { BY_YEAR_QUESTIONS } from "@/data/questions/st/by-year";
import existingOverlay from "@/data/questions/st/choice-explanations-2024-2025.json";
import type { ChoiceKey } from "@/lib/questions/types";

// The historical AM2 reasons are supplied by accepted399 after the legacy
// overlay. Checking only by-year files would incorrectly classify 149 as missing.
const originals = BY_YEAR_QUESTIONS.filter(q => q.session === "am2");
const historical = originals.filter(q => !(q.id in existingOverlay));
const publishedById = new Map(ST_QUESTIONS.map(q => [q.id, q]));
const imageDependentId = "st-2009a-am2-q23";

describe("ST historical AM2 explanation coverage", () => {
  it("accounts for every by-year AM2 question and the existing latest-year overlay", () => {
    expect(originals).toHaveLength(200);
    expect(historical).toHaveLength(150);
    expect(historical.filter(q => !publishedById.has(q.id)).map(q => q.id))
      .toEqual([imageDependentId]);
    const imageDependent = historical.find(q => q.id === imageDependentId)!;
    expect(imageDependent.hasImage).toBe(true);
    expect(imageDependent.question).toContain("図に示した管理図");
  });

  it("delivers a specific correct/wrong reason for all 596 historical published choices", () => {
    let choices = 0;
    for (const original of historical) {
      if (original.id === imageDependentId) continue;
      const question = publishedById.get(original.id)!;
      const keys = Object.keys(question.choices ?? {}) as ChoiceKey[];
      expect(keys, question.id).toHaveLength(4);
      expect(Object.keys(question.choiceExplanations ?? {}).sort(), question.id)
        .toEqual([...keys].sort());
      const reasons = keys.map(key => question.choiceExplanations![key]!);
      expect(new Set(reasons).size, question.id).toBe(4);
      for (const key of keys) {
        const reason = question.choiceExplanations![key]!;
        expect(reason.length, `${question.id}/${key}`).toBeGreaterThanOrEqual(40);
        expect(reason.startsWith(key === question.answer ? "正しいです。" : "誤りです。"),
          `${question.id}/${key}`).toBe(true);
        choices++;
      }
    }
    expect(choices).toBe(596);
  });
});
