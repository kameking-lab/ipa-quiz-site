import { describe, expect, it } from "vitest";
import { ES_QUESTIONS } from "@/data/questions/es";
import { BY_YEAR_QUESTIONS } from "@/data/questions/es/by-year";
import { applyIpaCorrections } from "@/data/questions/corrections";
import overlay from "@/data/questions/es/choice-explanations-cx-k6.json";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";

describe("ES cx-k6 choice explanations", () => {
  it("keeps the corrected questions and official answers intact", () => {
    const baseline = applyIpaCorrections("es", BY_YEAR_QUESTIONS);
    const withoutReasons = (question: (typeof baseline)[number]) => {
      const copy = { ...question };
      delete copy.choiceExplanations;
      return copy;
    };
    expect(ES_QUESTIONS.map(withoutReasons)).toEqual(baseline.map(withoutReasons));
  });

  it("covers all four displayed choices and labels only the official answer correct", () => {
    const ids = new Set(Object.keys(overlay));
    expect(ids.size).toBe(187);
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

  it("accounts for every morning-II question and leaves incomplete inputs unannotated", () => {
    // Diagram details (10), missing textual conditions (2), ambiguous choice text (1).
    const skipped = [
      "es-2010h-am2-q5", "es-2010h-am2-q12", "es-2010h-am2-q17", "es-2010h-am2-q22",
      "es-2020a-am2-q8", "es-2021a-am2-q9",
      "es-2023a-am2-q6", "es-2023a-am2-q11", "es-2023a-am2-q16",
      "es-2023a-am2-q17", "es-2023a-am2-q19", "es-2024a-am2-q9", "es-2025a-am2-q6",
    ];
    const morningII = ES_QUESTIONS.filter(q => q.session === "am2");
    expect(morningII).toHaveLength(200);
    expect(morningII.filter(q => !Object.hasOwn(overlay, q.id)).map(q => q.id).sort())
      .toEqual(skipped.sort());
    for (const q of morningII.filter(q => skipped.includes(q.id))) {
      expect(q.choiceExplanations, q.id).toBeUndefined();
    }
  });

  it("preserves historical scope for legal, institutional and version-dependent questions", () => {
    const ids = [
      "es-2009h-am2-q6", "es-2010h-am2-q11", "es-2020a-am2-q18", "es-2020a-am2-q25",
      "es-2021a-am2-q23", "es-2022a-am2-q3", "es-2022a-am2-q16", "es-2022a-am2-q17",
      "es-2022a-am2-q23", "es-2023a-am2-q15", "es-2023a-am2-q25", "es-2024a-am2-q20",
      "es-2024a-am2-q21", "es-2025a-am2-q12",
    ];
    for (const id of ids) {
      for (const text of Object.values(ES_QUESTIONS.find(q => q.id === id)!.choiceExplanations!)) {
        expect(text, id).toContain("出題当時の");
        expect(text, id).toMatch(/に基づく解説です。$/u);
      }
    }
  });

  it("exposes the overlay in both eager and lazy exam loaders", async () => {
    const [{ ALL_QUESTIONS }, { getQuestionsForExam }] = await Promise.all([
      import("@/data/questions"), import("@/lib/questions/get-questions"),
    ]);
    const lazy = await getQuestionsForExam("es");
    for (const questions of [ALL_QUESTIONS, lazy]) {
      const reasons = Object.fromEntries(questions.filter(q => Object.hasOwn(overlay, q.id))
        .map(q => [q.id, q.choiceExplanations]));
      expect(reasons).toEqual(overlay);
    }
  });

  it("rejects orphan ids and missing choices instead of publishing incomplete reasons", () => {
    expect(() => applyChoiceExplanationOverlay(ES_QUESTIONS, { missing: {} })).toThrow("orphan");
    const question = ES_QUESTIONS.find(q => Object.hasOwn(overlay, q.id))!;
    expect(() => applyChoiceExplanationOverlay([question], { [question.id]: { ア: "理由" } }))
      .toThrow("keys differ");
  });
});
