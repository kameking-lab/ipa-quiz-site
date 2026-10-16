// @vitest-environment node
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { ST_QUESTIONS } from "@/data/questions/st";
import originalReasons from "@/data/questions/st/choice-explanations-all-years.json";
import latestReasons from "@/data/questions/st/choice-explanations-2024-2025.json";
import residualReasons from "@/data/questions/st/choice-explanations-residual-20261011.json";
import corrections from "@/data/questions/st/residual-source-corrections-20261011.json";
import receipts from "@/docs/evidence/st-residual11-20261011/source-corrections.json";
import conflicts from "@/docs/evidence/st-residual11-20261011/unresolved.json";
import coverage from "@/docs/evidence/st-residual11-20261011/coverage.json";

const byId = new Map(ST_QUESTIONS.map(q => [q.id, q]));
const oldReasons: Record<string, Record<string, string>> = { ...originalReasons, ...latestReasons };

describe("ST residual source corrections", () => {
  it("adds only the eight previously unexplained source-corrected questions", () => {
    const ids = Object.keys(residualReasons).sort();
    expect(ids).toHaveLength(8);
    expect(ids).toEqual(Object.keys(corrections).sort());
    expect(ids).toEqual(receipts.map(row => row.id).sort());
    for (const id of ids) {
      expect(oldReasons[id], id).toBeUndefined();
      expect(conflicts.some(row => row.id === id), id).toBe(false);
    }
    for (const [id, reasons] of Object.entries(oldReasons)) {
      expect(byId.get(id)?.choiceExplanations, id).toEqual(reasons);
    }
    expect(ST_QUESTIONS.filter(q => q.choiceExplanations)).toHaveLength(coverage.explainedQuestions);
    expect(coverage.explainedQuestions).toBe(677);
    expect(coverage.missingWrongChoices).toBe(9);
  });

  it("binds corrections and legible crops to official problem and answer digests", () => {
    for (const row of receipts) {
      const q = byId.get(row.id);
      expect(q?.answer, row.id).toBe(row.officialAnswer);
      expect(row.questionUrl).toMatch(/^https:\/\/www\.ipa\.go\.jp\//u);
      expect(row.answerUrl).toMatch(/^https:\/\/www\.ipa\.go\.jp\//u);
      expect(row.questionPdfSha256).toMatch(/^[0-9a-f]{64}$/u);
      expect(row.answerPdfSha256).toMatch(/^[0-9a-f]{64}$/u);
      expect(row.sourcePage).toBeGreaterThan(0);
      expect(q?.explanation).toBe(row.after.explanation);
      expect(q?.imageUrls).toEqual(row.after.imageUrls);
      const imagePath = row.after.imageUrls[0];
      if (!imagePath) throw new Error(`missing crop path: ${row.id}`);
      const path = join(process.cwd(), "public", imagePath);
      expect(createHash("sha256").update(readFileSync(path)).digest("hex"), row.id).toBe(row.cropSha256);
    }
  });

  it("distinguishes all four official majority circuit diagrams", () => {
    const inputs = Array.from({ length: 8 }, (_, n) => [Boolean(n & 4), Boolean(n & 2), Boolean(n & 1)]);
    const table = inputs.map(([a, b, c]) => ({
      ア: (a && b) || (b && c) || (a && c),
      イ: (a !== b) || (b !== c) || (a !== c),
      ウ: !((a || b) && (b || c) && (a || c)),
      エ: !((a !== b) && (b !== c) && (a !== c)),
    }));
    expect(table.map(row => Number(row.ア))).toEqual([0, 0, 0, 1, 0, 1, 1, 1]);
    expect(table[1]?.イ).toBe(true);
    expect(table[0]?.ウ).toBe(true);
    expect(table.every(row => row.エ)).toBe(true);
    expect(byId.get("st-2015h-am1-q7")?.choices?.エ).toContain("NOT((A XOR B)");
  });

  it("restores critical symbols without changing official keys", () => {
    expect(byId.get("st-2009a-am1-q3")?.question).toContain("g(n)/f(n)");
    expect(byId.get("st-2010a-am2-q6")?.choices?.イ).toContain("100/0.025^5");
    expect(byId.get("st-2014h-am1-q7")?.choices?.ウ).toContain("NOT(X・Y)");
    expect(byId.get("st-2014h-am1-q7")?.choices?.エ).toContain("NOT(X+Y)");
    expect(byId.get("st-2021h-am1-q26")?.choices?.ウ).toBe("a:市場成長率 b:市場占有率");
    expect(byId.get("st-2021h-am2-q17")?.choices?.イ).toBe("S8+S9+S10+S11-I7");
  });

  it("keeps the three unresolved primary-source conflicts visible", () => {
    expect(conflicts.map(row => row.id).sort()).toEqual([
      "st-2009a-am2-q23", "st-2011a-am1-q29", "st-2013h-am1-q29",
    ]);
    for (const row of conflicts) {
      const q = byId.get(row.id);
      expect(q?.choiceExplanations).toBeUndefined();
      expect(q?.explanationCoverage).toBe("official-summary");
      expect(q?.explanation).toContain("公式正答");
      expect(q?.explanation).toContain("保留");
    }
  });
});
