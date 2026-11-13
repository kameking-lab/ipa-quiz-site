import { describe, expect, it } from "vitest";
import { AP_QUESTIONS } from "@/data/questions/ap";
import { AP_BY_YEAR_QUESTIONS } from "@/data/questions/ap/by-year";
import { applyIpaCorrections } from "@/data/questions/corrections";
import overlay from "@/data/questions/ap/choice-explanations-cx-k4.json";

const original = applyIpaCorrections("ap", AP_BY_YEAR_QUESTIONS);

describe("AP cx-k4 choice explanation overlay", () => {
  it("preserves every corrected question and official answer", () => {
    expect(AP_QUESTIONS).toHaveLength(original.length);
    for (const [index, question] of AP_QUESTIONS.entries()) {
      expect({ ...question, choiceExplanations: undefined }, question.id).toEqual({
        ...original[index]!, choiceExplanations: undefined,
      });
    }
  });

  it("loads four distinct reasons with the correct verdict and requested length", () => {
    const questions = new Map(AP_QUESTIONS.map(q => [q.id, q]));
    for (const [id, reasons] of Object.entries(overlay)) {
      const question = questions.get(id)!;
      expect(question, id).toBeDefined();
      expect(question.exam).toBe("ap");
      expect(question.session).toBe("am");
      expect(question.year).toBeGreaterThanOrEqual(2009);
      expect(question.year).toBeLessThanOrEqual(2018);
      expect(question.type).toBe("multiple-choice");
      expect(Object.keys(reasons).sort()).toEqual(Object.keys(question.choices!).sort());
      expect(Object.keys(reasons)).toHaveLength(4);
      expect(new Set(Object.values(reasons)).size).toBe(4);
      expect(question.choiceExplanations, id).toEqual(reasons);
      for (const [key, reason] of Object.entries(reasons)) {
        expect(reason.startsWith(key === question.answer ? "正しいです。" : "誤りです。"), `${id}/${key}`).toBe(true);
        expect(reason.length, `${id}/${key}`).toBeGreaterThanOrEqual(60);
        expect(reason.length, `${id}/${key}`).toBeLessThanOrEqual(180);
      }
    }
  });
});
