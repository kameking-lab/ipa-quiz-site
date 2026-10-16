import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { isAcceptedAnswer, isCompleteSelectionCorrect, requiredSelectionCount } from "@/lib/questions/answers";
import type { ChoiceKey } from "@/lib/questions/types";

describe("PT第61回午前の公式別解と原本図の保持", () => {
  it("Q42 accepts exactly two from choices 1, 2, 3", () => {
    const answer: ChoiceKey[] = ["ア", "イ", "ウ"];
    const requiredSelections = requiredSelectionCount({ requiredSelections: 2 });
    expect(requiredSelections).toBe(2);
    for (const pair of [["ア", "イ"], ["ア", "ウ"], ["イ", "ウ"]]) {
      expect(isCompleteSelectionCorrect(answer, pair, requiredSelections)).toBe(true);
    }
    for (const pair of [["ア"], ["ア", "エ"], ["ア", "イ", "ウ"], ["ア", "ア"]]) {
      expect(isCompleteSelectionCorrect(answer, pair, requiredSelections)).toBe(false);
    }
  });

  it("Q60 and Q98 accept alternatives as single selections", () => {
    const cases: Array<{ answer: ChoiceKey[]; accepted: ChoiceKey[]; rejected: ChoiceKey }> = [
      { answer: ["ウ", "エ"], accepted: ["ウ", "エ"], rejected: "ア" },
      { answer: ["ア", "ウ"], accepted: ["ア", "ウ"], rejected: "イ" },
    ];
    for (const { answer, accepted, rejected } of cases) {
      const count = requiredSelectionCount({ requiredSelections: 1 });
      expect(count).toBe(1);
      for (const key of accepted) expect(isAcceptedAnswer(answer, key)).toBe(true);
      expect(isAcceptedAnswer(answer, rejected)).toBe(false);
      expect(isCompleteSelectionCorrect(answer, accepted, count)).toBe(false);
    }
  });

  it("keeps Q58's original diagram outside public until review", () => {
    const original = readFileSync(resolve(process.cwd(), "data/questions/rigaku-ryohoshi/held-figures/2026-am-q58-original.png"));
    expect(createHash("sha256").update(original).digest("hex")).toBe(
      "d6762a79ecbd8cd4cfb8bb565fe1b41df271b2b1ccfa4673a470284bfc63eaca",
    );
  });
});
