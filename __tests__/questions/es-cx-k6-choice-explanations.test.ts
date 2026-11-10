import { describe, expect, it } from "vitest";
import { ES_QUESTIONS } from "@/data/questions/es";
import { BY_YEAR_QUESTIONS } from "@/data/questions/es/by-year";
import { applyIpaCorrections } from "@/data/questions/corrections";
import overlay from "@/data/questions/es/choice-explanations-cx-k6.json";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";

describe("ES cx-k6 choice explanations", () => {
  it("keeps the corrected questions and official answers intact", () => {
    const baseline = applyIpaCorrections("es", BY_YEAR_QUESTIONS);
    expect(ES_QUESTIONS.map(({ choiceExplanations: _reasons, ...q }) => q))
      .toEqual(baseline.map(({ choiceExplanations: _reasons, ...q }) => q));
  });

  it("covers all four displayed choices and labels only the official answer correct", () => {
    const ids = new Set(Object.keys(overlay));
    expect(ids.size).toBeGreaterThanOrEqual(50);
    for (const question of ES_QUESTIONS.filter(q => ids.has(q.id))) {
      expect(question.session, question.id).toBe("am2");
      expect(Object.keys(question.choices ?? {}), question.id).toHaveLength(4);
      expect(Object.keys(question.choiceExplanations ?? {}).sort(), question.id)
        .toEqual(Object.keys(question.choices ?? {}).sort());
      const correct = new Set(Array.isArray(question.answer) ? question.answer : [question.answer]);
      const reasons = Object.entries(question.choiceExplanations ?? {});
      expect(new Set(reasons.map(([, text]) => text)).size, question.id).toBe(4);
      for (const [key, text] of reasons) {
        expect(text!.length, `${question.id}/${key}`).toBeGreaterThanOrEqual(60);
        expect(text!.length, `${question.id}/${key}`).toBeLessThanOrEqual(180);
        expect(text!.startsWith(correct.has(key) ? "正しいです。" : "誤りです。"), `${question.id}/${key}`).toBe(true);
      }
    }
  });

  it("rejects orphan ids and missing choices instead of publishing incomplete reasons", () => {
    expect(() => applyChoiceExplanationOverlay(ES_QUESTIONS, { missing: {} })).toThrow("orphan");
    const question = ES_QUESTIONS.find(q => Object.hasOwn(overlay, q.id))!;
    expect(() => applyChoiceExplanationOverlay([question], { [question.id]: { ア: "理由" } }))
      .toThrow("keys differ");
  });
});
