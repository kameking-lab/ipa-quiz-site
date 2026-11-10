import { describe, expect, it } from "vitest";
import overlay from "@/data/questions/sm/choice-explanations-cx-k8sm.json";
import { SM_QUESTIONS } from "@/data/questions/sm";
import { BY_YEAR_QUESTIONS } from "@/data/questions/sm/by-year";
import { applyIpaCorrections } from "@/data/questions/corrections";
import type { ChoiceKey } from "@/lib/questions/types";

describe("SM morning II choice explanations", () => {
  const baseline = applyIpaCorrections("sm", BY_YEAR_QUESTIONS);
  it("preserves every official corrected answer and existing explanation", () => {
    expect(SM_QUESTIONS.map(q => [q.id, q.answer, q.explanation])).toEqual(
      baseline.map(q => [q.id, q.answer, q.explanation]),
    );
    for (const question of baseline.filter(q => q.choiceExplanations)) {
      expect(SM_QUESTIONS.find(q => q.id === question.id)?.choiceExplanations).toEqual(question.choiceExplanations);
      expect(Object.keys(overlay)).not.toContain(question.id);
    }
  });

  it("loads all four reasons with a single correct label matching the corrected answer", () => {
    for (const id of Object.keys(overlay)) {
      const q = SM_QUESTIONS.find(q => q.id === id)!;
      expect(q.session, id).toBe("am2");
      expect(q.type, id).toBe("multiple-choice");
      const keys = Object.keys(q.choices ?? {}) as ChoiceKey[];
      expect(keys, id).toHaveLength(4);
      expect(Object.keys(q.choiceExplanations ?? {}).sort(), id).toEqual(keys.sort());
      const reasons = keys.map(key => q.choiceExplanations?.[key] ?? "");
      expect(new Set(reasons).size, id).toBe(4);
      for (const [i, key] of keys.entries()) {
        expect(reasons[i].length, `${id}/${key}`).toBeGreaterThanOrEqual(60);
        expect(reasons[i].length, `${id}/${key}`).toBeLessThanOrEqual(180);
        expect(reasons[i].startsWith(key === q.answer ? "正しいです。" : "誤りです。"), `${id}/${key}`).toBe(true);
      }
    }
  });
});
