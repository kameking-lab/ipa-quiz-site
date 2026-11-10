import { describe, expect, it } from "vitest";
import { AP_QUESTIONS } from "@/data/questions/ap";
import { AP_BY_YEAR_QUESTIONS } from "@/data/questions/ap/by-year";
import overlay from "@/data/questions/ap/choice-explanations-cx-k3.json";
import type { ChoiceKey } from "@/lib/questions/types";

describe("AP 2022–2025 cx-k3 choice explanations", () => {
  it("retains the reviewed coverage of all eight papers", () => {
    const counts: Record<string, number> = {};
    for (const question of AP_QUESTIONS) {
      if (!(question.id in overlay)) continue;
      const paper = `${question.year}/${question.season}`;
      counts[paper] = (counts[paper] ?? 0) + 1;
    }
    expect(Object.keys(overlay)).toHaveLength(552);
    expect(counts).toEqual({
      "2022/spring": 74, "2022/autumn": 68,
      "2023/spring": 70, "2023/autumn": 72,
      "2024/spring": 68, "2024/autumn": 70,
      "2025/spring": 62, "2025/autumn": 68,
    });
  });

  it("loads all overlay entries without changing official answers", () => {
    const originals = new Map(AP_BY_YEAR_QUESTIONS.map(q => [q.id, q]));
    const loaded = new Map(AP_QUESTIONS.map(q => [q.id, q]));
    for (const [id, reasons] of Object.entries(overlay)) {
      const question = loaded.get(id)!;
      expect(question, id).toBeDefined();
      expect(question.year, id).toBeGreaterThanOrEqual(2022);
      expect(question.year, id).toBeLessThanOrEqual(2025);
      expect(question.answer, id).toEqual(originals.get(id)?.answer);
      expect(question.choiceExplanations, id).toEqual(reasons);
      expect(Object.keys(reasons).sort(), id).toEqual(Object.keys(question.choices!).sort());
      expect(new Set(Object.values(reasons)).size, id).toBe(4);
      for (const [key, reason] of Object.entries(reasons)) {
        expect(reason.startsWith(question.answer === key ? "正しいです。" : "誤りです。"), `${id}/${key}`).toBe(true);
        expect(reason.length, `${id}/${key}`).toBeGreaterThanOrEqual(60);
        expect(reason.length, `${id}/${key}`).toBeLessThanOrEqual(180);
        expect(question.choices?.[key as ChoiceKey], `${id}/${key}`).toBeTruthy();
      }
    }
  });
});
