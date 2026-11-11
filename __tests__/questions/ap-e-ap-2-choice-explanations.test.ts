import { describe, expect, it } from "vitest";
import { AP_QUESTIONS } from "@/data/questions/ap";
import { AP_BY_YEAR_QUESTIONS } from "@/data/questions/ap/by-year";
import originalOverlay from "@/data/questions/ap/choice-explanations-cx-k3.json";
import previousOverlay from "@/data/questions/ap/choice-explanations-e-ap-1.json";
import overlay from "@/data/questions/ap/choice-explanations-e-ap-2.json";
import followingOverlay from "@/data/questions/ap/choice-explanations-e-ap-3.json";
import finalOverlay from "@/data/questions/ap/choice-explanations-e-ap-4.json";
import { applyIpaCorrections } from "@/data/questions/corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import { getQuestionsForExam } from "@/lib/questions/get-questions";

describe("AP e-ap-2 choice explanations", () => {
  it("adds four reviewed reasons while retaining every existing question and explanation", () => {
    const before = [originalOverlay, followingOverlay, previousOverlay, finalOverlay].reduce(
      (questions, previous) => applyChoiceExplanationOverlay(questions, previous),
      applyIpaCorrections("ap", AP_BY_YEAR_QUESTIONS),
    );
    expect(AP_QUESTIONS).toHaveLength(before.length);
    const loaded = new Map(AP_QUESTIONS.map(q => [q.id, q]));
    for (const oldQuestion of before) {
      const question = loaded.get(oldQuestion.id)!;
      if (!(question.id in overlay)) {
        expect(question, question.id).toEqual(oldQuestion);
        continue;
      }
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
  });

  it("retains complete batches without overlapping previously completed work", () => {
    const ids = Object.keys(overlay);
    expect(ids.length).toBeGreaterThanOrEqual(50);
    expect(ids.length % 50).toBe(0);
    expect(ids.every(id => !(id in originalOverlay) && !(id in previousOverlay))).toBe(true);
    const firstBatchNumbers = [
      1, 2, 3, 5, 6, 9, 10, 11, 12, 13, 15, 16, 17, 18, 21, 22, 23, 25, 26, 28, 29, 32, 33, 35, 36,
      37, 38, 40, 41, 43, 44, 45, 46, 47, 48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 63, 65, 67, 68,
    ];
    expect(firstBatchNumbers.every(number => `ap-2017h-am-q${number}` in overlay)).toBe(true);
  });

  it("loads the same data through the lazy exam loader", async () => {
    expect(await getQuestionsForExam("ap")).toEqual(AP_QUESTIONS);
  });
});
