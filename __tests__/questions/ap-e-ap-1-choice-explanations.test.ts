import { describe, expect, it } from "vitest";
import { AP_QUESTIONS } from "@/data/questions/ap";
import { AP_BY_YEAR_QUESTIONS } from "@/data/questions/ap/by-year";
import previousOverlay from "@/data/questions/ap/choice-explanations-cx-k3.json";
import overlay from "@/data/questions/ap/choice-explanations-e-ap-1.json";
import { applyIpaCorrections } from "@/data/questions/corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";

describe("AP e-ap-1 choice explanations", () => {
  it("adds complete reasons without altering any question, answer or previous explanation", () => {
    const before = applyChoiceExplanationOverlay(
      applyIpaCorrections("ap", AP_BY_YEAR_QUESTIONS), previousOverlay,
    );
    expect(AP_QUESTIONS).toHaveLength(before.length);
    for (const [index, question] of AP_QUESTIONS.entries()) {
      if (!(question.id in overlay)) {
        expect(question, question.id).toEqual(before[index]);
        continue;
      }
      const { choiceExplanations, ...rest } = question;
      expect(rest, question.id).toEqual(before[index]);
      expect(choiceExplanations, question.id).toEqual(overlay[question.id as keyof typeof overlay]);
      expect(Object.keys(choiceExplanations!).sort(), question.id).toEqual(Object.keys(question.choices!).sort());
      expect(new Set(Object.values(choiceExplanations!)).size, question.id).toBe(4);
      for (const [key, reason] of Object.entries(choiceExplanations!)) {
        expect(reason.startsWith(question.answer === key ? "正しいです。" : "誤りです。"), `${question.id}/${key}`).toBe(true);
        expect(reason.length, `${question.id}/${key}`).toBeGreaterThanOrEqual(60);
        expect(reason.length, `${question.id}/${key}`).toBeLessThanOrEqual(180);
      }
    }
  });

  it("retains the first reviewed batch of 50 questions", () => {
    const ids = Object.keys(overlay);
    expect(ids.filter(id => id.startsWith("ap-2016h-") && Number(id.split("q")[1]) <= 52)).toHaveLength(50);
    expect(ids.every(id => !(id in previousOverlay))).toBe(true);
  });
});
