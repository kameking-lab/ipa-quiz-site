import { describe, expect, it } from "vitest";
import { AP_QUESTIONS } from "@/data/questions/ap";
import { AP_BY_YEAR_QUESTIONS } from "@/data/questions/ap/by-year";
import previousOverlay from "@/data/questions/ap/choice-explanations-cx-k3.json";
import overlay from "@/data/questions/ap/choice-explanations-e-ap-1.json";
import followingOverlay from "@/data/questions/ap/choice-explanations-e-ap-2.json";
import latestOverlay from "@/data/questions/ap/choice-explanations-e-ap-3.json";
import finalOverlay from "@/data/questions/ap/choice-explanations-e-ap-4.json";
import { applyIpaCorrections } from "@/data/questions/corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import { getQuestionsForExam } from "@/lib/questions/get-questions";

describe("AP e-ap-1 choice explanations", () => {
  it("adds complete reasons without altering any question, answer or previous explanation", () => {
    const before = [previousOverlay, latestOverlay, followingOverlay, finalOverlay].reduce(
      (questions, previous) => applyChoiceExplanationOverlay(questions, previous),
      applyIpaCorrections("ap", AP_BY_YEAR_QUESTIONS),
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
    expect(ids).toHaveLength(250);
    expect(ids.filter(id => id.startsWith("ap-2016h-") && Number(id.split("q")[1]) <= 52)).toHaveLength(50);
    expect(ids.every(id => !(id in previousOverlay))).toBe(true);
  });

  it("serves the same explanations through the lazy exam loader", async () => {
    expect(await getQuestionsForExam("ap")).toEqual(AP_QUESTIONS);
  });
});
