// @vitest-environment node
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { ST_QUESTIONS } from "@/data/questions/st";
import reasons from "@/data/questions/st/choice-explanations-all-years.json";
import repairs from "@/data/questions/st/explanation-repairs-all-years.json";
import evidence from "@/docs/evidence/st-all-choice-explanations-20261011/coverage.json";
import keys from "@/docs/evidence/st-all-choice-explanations-20261011/official-keys.json";
import holds from "@/docs/evidence/st-all-choice-explanations-20261011/unresolved.json";
import type { ChoiceKey } from "@/lib/questions/types";

describe("ST all recorded multiple-choice papers", () => {
  it("preserves all 680 question texts, choices and answers", () => {
    const anchors = ST_QUESTIONS.map(({ id, type, question, choices, answer }) => ({ id, type, question, choices, answer }));
    expect(ST_QUESTIONS).toHaveLength(680);
    expect(new Set(ST_QUESTIONS.map(q => q.id)).size).toBe(680);
    expect(createHash("sha256").update(JSON.stringify(anchors)).digest("hex"))
      .toBe("467a15e17b5eb444e8b210ce7429030edc0b345cdea41d771c961c1a255fabc7");
    expect(ST_QUESTIONS.every(q => q.type === "multiple-choice")).toBe(true);
  });

  it("matches the independently extracted 680 official answers across 24 papers", () => {
    expect(Object.keys(keys)).toHaveLength(24);
    expect(new Set(ST_QUESTIONS.map(q => `${q.year}/${q.season}`)).size).toBe(16);
    for (const [paper, source] of Object.entries(keys)) {
      const questions = ST_QUESTIONS.filter(q => `${q.year}/${q.season}/${q.session}` === paper).sort((a, b) => a.qNumber - b.qNumber);
      expect(questions.map(q => q.answer).join(""), paper).toBe(source.answers);
      expect(questions).toHaveLength(paper.endsWith("am1") ? 30 : 25);
      expect(source.answerPdfSha256).toMatch(/^[0-9a-f]{64}$/u);
    }
  });

  it("covers all four distinct choices for 669 questions and holds exactly eleven", () => {
    const missing = ST_QUESTIONS.filter(q => !q.choiceExplanations).map(q => q.id).sort();
    expect(missing).toEqual(holds.map(h => h.id).sort());
    expect(missing).toHaveLength(11);
    const covered = ST_QUESTIONS.filter(q => q.choiceExplanations);
    expect(covered).toHaveLength(669);
    expect(evidence.covered).toBe(669);
    expect(Object.keys(reasons)).toHaveLength(559);
    for (const q of covered) {
      const choiceKeys = Object.keys(q.choices ?? {}).sort() as ChoiceKey[];
      expect(choiceKeys, q.id).toHaveLength(4);
      expect(Object.keys(q.choiceExplanations ?? {}).sort(), q.id).toEqual(choiceKeys);
      const values = choiceKeys.map(k => q.choiceExplanations?.[k]?.trim() ?? "");
      expect(new Set(values).size, q.id).toBe(4);
      for (const [index, key] of choiceKeys.entries()) {
        expect(values[index].length, `${q.id}/${key}`).toBeGreaterThanOrEqual(40);
        expect(values[index].startsWith(key === q.answer ? "正しいです。" : "誤りです。"), `${q.id}/${key}`).toBe(true);
      }
    }
    expect(covered.reduce((n, q) => n + Object.keys(q.choiceExplanations ?? {}).length, 0)).toBe(2676);
  });

  it("applies narrative repairs only to explained canonical ST questions", () => {
    const indexed = new Map(ST_QUESTIONS.map(q => [q.id, q]));
    for (const [id, narrative] of Object.entries(repairs)) {
      expect(indexed.get(id)?.explanation, id).toBe(narrative);
      expect(reasons, id).toHaveProperty(id);
      expect(holds.some(h => h.id === id), id).toBe(false);
    }
  });

  it("retains the previously reviewed latest two years in full", () => {
    const latest = ST_QUESTIONS.filter(q => q.year === 2024 || q.year === 2025);
    expect(latest).toHaveLength(110);
    expect(latest.filter(q => q.choiceExplanations)).toHaveLength(110);
    expect(latest.every(q => !(q.id in reasons))).toBe(true);
  });
});
