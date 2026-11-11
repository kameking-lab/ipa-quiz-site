import { describe, expect, it } from "vitest";
import { DB_QUESTIONS } from "@/data/questions/db";
import { BY_YEAR_QUESTIONS } from "@/data/questions/db/by-year";
import { applyIpaCorrections } from "@/data/questions/corrections";
import overlay from "@/data/questions/db/choice-explanations-cx-k5db.json";
import type { ChoiceKey } from "@/lib/questions/types";

// Deliberately withheld: missing figures/tables/SQL, lost notation, or ambiguous text.
// Details and source URLs are recorded in the lane report.
const withheld = [
  "2009h/4", "2009h/5",
  "2010h/3", "2010h/5", "2010h/9", "2010h/12", "2010h/23",
  "2020a/5", "2020a/8",
  "2021a/4", "2021a/6", "2021a/8", "2021a/10",
  "2022a/2",
  "2023a/5", "2023a/7", "2023a/8", "2023a/10",
  "2024a/3", "2024a/6", "2024a/8", "2024a/9", "2024a/10", "2024a/14",
  "2025a/3", "2025a/4", "2025a/6", "2025a/12", "2025a/20", "2025a/23",
].map((entry) => {
  const [paper, number] = entry.split("/");
  return `db-${paper}-am2-q${number}`;
});
const baseline = applyIpaCorrections("db", BY_YEAR_QUESTIONS);
const publishedById = new Map(DB_QUESTIONS.map((question) => [question.id, question]));
const reasonsById: Record<string, Partial<Record<ChoiceKey, string>>> = overlay;
const negativeQuestionIds = new Set([
  "db-2009h-am2-q1", "db-2024a-am2-q2", "db-2025a-am2-q24",
]);

describe("DB morning II lane explanations", () => {
  it("accounts for all 200 questions and keeps withheld questions out of the overlay", () => {
    const targets = BY_YEAR_QUESTIONS.filter((q) => q.session === "am2");
    expect(targets).toHaveLength(200);
    expect(Object.keys(overlay)).toHaveLength(170);
    expect(withheld).toHaveLength(30);
    expect(new Set(withheld).size).toBe(withheld.length);
    expect(new Set([...Object.keys(overlay), ...withheld])).toEqual(new Set(targets.map((q) => q.id)));
    for (const id of withheld) expect(reasonsById[id], id).toBeUndefined();
  });

  it("covers every choice, follows the corrected answer, and stays within the requested length", () => {
    for (const [id, reasons] of Object.entries(reasonsById)) {
      const question = publishedById.get(id)!;
      expect(question.session, id).toBe("am2");
      expect(question.type, id).toBe("multiple-choice");
      expect(Object.keys(reasons).sort(), id).toEqual(Object.keys(question.choices ?? {}).sort());
      expect(question.choiceExplanations, id).toEqual(reasons);
      expect(new Set(Object.values(reasons)).size, id).toBe(4);
      for (const [key, reason] of Object.entries(reasons)) {
        const prefix = negativeQuestionIds.has(id)
          ? (key === question.answer ? "解答としては正解です。" : "解答としては不正解です。")
          : (key === question.answer ? "正しいです。" : "誤りです。");
        expect(reason!.startsWith(prefix), `${id}/${key}`).toBe(true);
        expect(reason!.length, `${id}/${key}`).toBeGreaterThanOrEqual(60);
        expect(reason!.length, `${id}/${key}`).toBeLessThanOrEqual(180);
      }
    }
  });

  it("uses the official sales values for both repeated AVG questions", () => {
    // IPA 2022/2024 DB morning II question 7, booklet page 7.
    const amounts = [50, 250, 350, 450];
    const aRankAmounts = amounts.slice(0, 2);
    const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;
    for (const id of ["db-2022a-am2-q7", "db-2024a-am2-q7"]) {
      const reasons = reasonsById[id]!;
      expect(reasons["ウ"], id).toContain(`(${aRankAmounts.join("＋")})÷2＝${mean(aRankAmounts)}`);
      expect(reasons["ウ"], id).not.toContain("900");
      expect(reasons["エ"], id).toContain(`(${amounts.join("＋")})÷4＝${mean(amounts)}`);
    }
    expect(reasonsById["db-2022a-am2-q7"]!["エ"]).toContain("ランク条件とグループ化をともに外した");
  });

  it("preserves corrected answers, source text, narrative explanations, and all morning I records", () => {
    expect(DB_QUESTIONS).toHaveLength(baseline.length);
    for (const before of baseline) {
      const after = publishedById.get(before.id);
      expect(after, before.id).toEqual(reasonsById[before.id]
        ? { ...before, choiceExplanations: reasonsById[before.id] }
        : before);
    }
  });

  it("pins explanations to existing audit corrections instead of the stale raw answer", () => {
    const correctedAnswers = {
      "db-2009h-am2-q11": "エ", "db-2009h-am2-q12": "イ",
      "db-2009h-am2-q15": "イ", "db-2009h-am2-q21": "エ",
      "db-2010h-am2-q11": "エ", "db-2020a-am2-q11": "エ",
      "db-2021a-am2-q1": "エ", "db-2022a-am2-q7": "イ",
      "db-2023a-am2-q1": "エ", "db-2023a-am2-q12": "エ",
      "db-2024a-am2-q7": "イ", "db-2024a-am2-q12": "エ",
      "db-2025a-am2-q2": "エ",
    };
    for (const [id, answer] of Object.entries(correctedAnswers)) {
      expect(publishedById.get(id)?.answer, id).toBe(answer);
      expect(reasonsById[id]?.[answer as ChoiceKey], id).toMatch(/^正しいです。/u);
    }
  });

  it("labels the historical source for edition-specific standards and procedures", () => {
    for (const id of ["db-2010h-am2-q22", "db-2010h-am2-q24", "db-2021a-am2-q19", "db-2022a-am2-q19", "db-2023a-am2-q20"]) {
      for (const reason of Object.values(reasonsById[id]!)) expect(reason, id).toContain("出題当時");
    }
  });
});
