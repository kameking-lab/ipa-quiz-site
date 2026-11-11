import { describe, expect, it } from "vitest";
import { NW_QUESTIONS } from "@/data/questions/nw";
import { BY_YEAR_QUESTIONS } from "@/data/questions/nw/by-year";
import { applyIpaCorrections } from "@/data/questions/corrections";
import overlay from "@/data/questions/nw/choice-explanations-cx-k8.json";
import type { ChoiceKey } from "@/lib/questions/types";

const skipped = new Set([
  "nw-2009a-am2-q4", "nw-2009a-am2-q6", "nw-2009a-am2-q9",
  "nw-2010a-am2-q2", "nw-2011a-am2-q5", "nw-2011a-am2-q9",
  "nw-2021h-am2-q4", "nw-2021h-am2-q7", "nw-2021h-am2-q10", "nw-2021h-am2-q22",
  "nw-2023h-am2-q5", "nw-2024h-am2-q22", "nw-2025h-am2-q8",
]);
const corrected = applyIpaCorrections("nw", BY_YEAR_QUESTIONS);

describe("NW CX k8 morning II explanations", () => {
  it("covers every reviewed question and leaves the documented exclusions intact", () => {
    const morningII = NW_QUESTIONS.filter((q) => q.session === "am2");
    expect(morningII).toHaveLength(200);
    expect(Object.keys(overlay)).toHaveLength(187);
    expect(morningII.filter((q) => !q.choiceExplanations).map((q) => q.id).sort())
      .toEqual([...skipped].sort());
  });

  it("has readable Japanese reasons for all four choices with the effective answer marked correct", () => {
    for (const q of NW_QUESTIONS.filter((q) => Object.hasOwn(overlay, q.id))) {
      const keys = Object.keys(q.choices ?? {}) as ChoiceKey[];
      expect(keys, q.id).toHaveLength(4);
      expect(Object.keys(q.choiceExplanations ?? {}).sort(), q.id).toEqual(keys.sort());
      const reasons = keys.map((key) => q.choiceExplanations?.[key] ?? "");
      expect(new Set(reasons).size, q.id).toBe(4);
      for (const key of keys) {
        const reason = q.choiceExplanations?.[key] ?? "";
        expect(reason.startsWith(key === q.answer ? "正しいです。" : "誤りです。"), `${q.id}/${key}`).toBe(true);
        expect(reason.length, `${q.id}/${key}`).toBeGreaterThanOrEqual(60);
        expect(reason.length, `${q.id}/${key}`).toBeLessThanOrEqual(180);
        expect(reason, `${q.id}/${key}`).not.toMatch(/[?\uFFFD]/u);
        expect(reason.slice(reason.indexOf("。") + 1), `${q.id}/${key}`).toMatch(/[\p{Script=Han}\p{Script=Hiragana}]{2}/u);
      }
    }
  });

  it("preserves corrected answers, narratives, diagrams, choices and all non-target questions", () => {
    const withoutReasons = (question: (typeof NW_QUESTIONS)[number]) => {
      const originalFields = { ...question };
      delete originalFields.choiceExplanations;
      return originalFields;
    };
    expect(NW_QUESTIONS.map(withoutReasons)).toEqual(corrected.map(withoutReasons));
    for (const q of NW_QUESTIONS.filter((q) => q.session !== "am2")) {
      expect(q).toEqual(corrected.find((original) => original.id === q.id));
    }
  });
});
