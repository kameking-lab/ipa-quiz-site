import parallelOverlay from "@/data/questions/ap/choice-explanations-cx-k4.json";
import { describe, expect, it } from "vitest";
import { AP_QUESTIONS } from "@/data/questions/ap";
import { AP_BY_YEAR_QUESTIONS } from "@/data/questions/ap/by-year";
import originalOverlay from "@/data/questions/ap/choice-explanations-cx-k3.json";
import firstOverlay from "@/data/questions/ap/choice-explanations-e-ap-1.json";
import secondOverlay from "@/data/questions/ap/choice-explanations-e-ap-2.json";
import thirdOverlay from "@/data/questions/ap/choice-explanations-e-ap-3.json";
import overlay from "@/data/questions/ap/choice-explanations-e-ap-4.json";
import { applyIpaCorrections } from "@/data/questions/corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import { getQuestionsForExam } from "@/lib/questions/get-questions";

describe("AP e-ap-4 choice explanations", () => {
  it("adds reviewed reasons while retaining all previous content and official answers", () => {
    const before = [parallelOverlay, originalOverlay, firstOverlay, secondOverlay, thirdOverlay].reduce(
      (questions, previous) => applyChoiceExplanationOverlay(questions, previous),
      applyIpaCorrections("ap", AP_BY_YEAR_QUESTIONS),
    );
    const loaded = new Map(AP_QUESTIONS.map(question => [question.id, question]));
    expect(AP_QUESTIONS).toHaveLength(before.length);
    expect(Object.keys(overlay)).toHaveLength(2);
    for (const oldQuestion of before) {
      const question = loaded.get(oldQuestion.id)!;
      if (!(question.id in overlay)) {
        expect(question, question.id).toEqual(oldQuestion);
        continue;
      }
      expect(oldQuestion.choiceExplanations, question.id).toBeUndefined();
      const { choiceExplanations, ...rest } = question;
      expect(rest, question.id).toEqual(oldQuestion);
      expect(choiceExplanations, question.id).toEqual(overlay[question.id as keyof typeof overlay]);
      expect(Object.keys(choiceExplanations!).sort(), question.id).toEqual(Object.keys(question.choices!).sort());
      expect(new Set(Object.values(choiceExplanations!)).size, question.id).toBe(4);
      for (const [key, reason] of Object.entries(choiceExplanations!)) {
        expect(reason.startsWith(key === question.answer ? "正しいです。" : "誤りです。"), `${question.id}/${key}`).toBe(true);
        expect(reason.length, `${question.id}/${key}`).toBeGreaterThanOrEqual(60);
        expect(reason.length, `${question.id}/${key}`).toBeLessThanOrEqual(180);
        expect(reason, `${question.id}/${key}`).not.toMatch(/準備中|TODO|未確認|\?\?\?/);
      }
    }
    expect(Object.keys(overlay).every(id => loaded.has(id))).toBe(true);
  });

  it("loads the same data through the lazy exam loader", async () => {
    expect(await getQuestionsForExam("ap")).toEqual(AP_QUESTIONS);
  });
});
