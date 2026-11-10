import { describe, expect, it } from "vitest";
import overlay from "@/data/questions/sc/choice-explanations-cx-k2.json";
import existingOverlay from "@/data/questions/sc/choice-explanations-2024-2025.json";
import { SC_QUESTIONS } from "@/data/questions/sc";
import { BY_YEAR_QUESTIONS } from "@/data/questions/sc/by-year";
import { applyIpaCorrections } from "@/data/questions/corrections";

const original = new Map(applyIpaCorrections("sc", BY_YEAR_QUESTIONS).map(q => [q.id, q]));
const published = new Map(SC_QUESTIONS.map(q => [q.id, q]));

describe("SC cx-k2 choice explanations", () => {
  it("adds four substantive reasons without replacing existing explanations or answers", () => {
    for (const [id, reasons] of Object.entries(overlay)) {
      const before = original.get(id)!;
      const after = published.get(id)!;
      expect(before, id).toBeDefined();
      expect(before.year, id).toBeGreaterThanOrEqual(2019);
      expect(before.year, id).toBeLessThanOrEqual(2025);
      expect(before.session, id).toBe("am2");
      expect(existingOverlay, id).not.toHaveProperty(id);
      expect(before.choiceExplanations, id).toBeUndefined();
      expect(after.answer, id).toEqual(before.answer);
      expect(after.question, id).toEqual(before.question);
      expect(after.choices, id).toEqual(before.choices);
      expect(after.explanation, id).toEqual(before.explanation);
      expect(Object.keys(reasons).sort(), id).toEqual(Object.keys(before.choices!).sort());
      expect(new Set(Object.values(reasons)).size, id).toBe(4);
      for (const [key, reason] of Object.entries(reasons)) {
        expect(reason.length, `${id}/${key}`).toBeGreaterThanOrEqual(60);
        expect(reason.length, `${id}/${key}`).toBeLessThanOrEqual(180);
        expect(reason.startsWith(key === after.answer ? "正しいです。" : "誤りです。"), `${id}/${key}`).toBe(true);
      }
      expect(after.choiceExplanations, id).toEqual(reasons);
    }
  });

  it("uses the already corrected CRL and OCSP answers", () => {
    expect(published.get("sc-2019h-am2-q1")?.choiceExplanations?.エ).toMatch(/^正しいです。/u);
    expect(published.get("sc-2019h-am2-q2")?.choiceExplanations?.ウ).toMatch(/^正しいです。/u);
  });
});
