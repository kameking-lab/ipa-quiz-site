import { describe, expect, it } from "vitest";
import overlay from "@/data/questions/sc/choice-explanations-cx-k7.json";
import existingOverlay from "@/data/questions/sc/choice-explanations-2024-2025.json";
import { SC_QUESTIONS } from "@/data/questions/sc";
import { BY_YEAR_QUESTIONS } from "@/data/questions/sc/by-year";
import { applyIpaCorrections } from "@/data/questions/corrections";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";

const skipped = [
  "sc-2019h-am1-q7", "sc-2019h-am1-q11", "sc-2019h-am1-q19",
  "sc-2019a-am1-q1", "sc-2019a-am1-q19",
  "sc-2021h-am1-q19", "sc-2021h-am1-q26",
  "sc-2022h-am1-q16", "sc-2023h-am1-q2", "sc-2023h-am1-q6",
];
const target = SC_QUESTIONS.filter(q => q.year >= 2019 && q.year <= 2025 && q.session === "am1");

describe("SC cx-k7 morning I choice explanations", () => {
  it("covers all 390 target questions with 120 existing, 260 additions and 10 documented skips", () => {
    expect(target).toHaveLength(390);
    expect(Object.keys(overlay)).toHaveLength(260);
    expect(target.filter(q => q.choiceExplanations)).toHaveLength(380);
    expect(target.filter(q => !q.choiceExplanations).map(q => q.id).sort()).toEqual(skipped.sort());
    expect(Object.keys(overlay).filter(id => id in existingOverlay)).toEqual([]);
  });

  it("adds four specific reasons matching the corrected official answer and the displayed choices", () => {
    const byId = new Map(target.map(q => [q.id, q]));
    for (const [id, reasons] of Object.entries(overlay)) {
      const question = byId.get(id)!;
      expect(question, id).toBeDefined();
      expect(question.year, id).toBeLessThanOrEqual(2023);
      expect(question.type, id).toBe("multiple-choice");
      expect(Object.keys(reasons).sort(), id).toEqual(Object.keys(question.choices!).sort());
      expect(new Set(Object.values(reasons)).size, id).toBe(4);
      for (const [key, reason] of Object.entries(reasons)) {
        expect(reason.length, `${id}/${key}`).toBeGreaterThanOrEqual(60);
        expect(reason.length, `${id}/${key}`).toBeLessThanOrEqual(180);
        expect(reason.startsWith(key === question.answer ? "正しいです。" : "誤りです。"), `${id}/${key}`).toBe(true);
      }
      expect(question.choiceExplanations, id).toEqual(reasons);
    }
  });

  it("keeps all existing question fields and overlays unchanged when applying the new layer", () => {
    const baseline = applyChoiceExplanationOverlay(applyIpaCorrections("sc", BY_YEAR_QUESTIONS), existingOverlay);
    const expected = applyChoiceExplanationOverlay(baseline, overlay);
    expect(SC_QUESTIONS).toEqual(expected);
    for (const [index, question] of SC_QUESTIONS.entries()) {
      const { choiceExplanations: added, ...actualFields } = question;
      const { choiceExplanations: before, ...originalFields } = baseline[index]!;
      expect(actualFields, question.id).toEqual(originalFields);
      if (!(question.id in overlay)) expect(added, question.id).toEqual(before);
    }
  });

  it("qualifies all four choices in questions that use historical laws, standards or institutions", () => {
    for (const [id, reasons] of Object.entries(overlay)) {
      if (Object.values(reasons).some(reason => reason.includes("出題当時"))) {
        for (const reason of Object.values(reasons)) expect(reason, id).toContain("出題当時");
      }
    }
  });
});
