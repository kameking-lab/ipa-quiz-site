import { describe, it, expect } from "vitest";
import { selectMockExamQuestions } from "@/lib/mock-exam/selection";
import type { Question } from "@/lib/questions/types";

function q(id: string, category: string): Question {
  return {
    id,
    exam: "ap",
    session: "am",
    year: 2024,
    season: "spring",
    qNumber: 1,
    type: "multiple-choice",
    category,
    topicTags: [],
    difficulty: 3,
    question: "問題文",
    choices: { ア: "a", イ: "b", ウ: "c", エ: "d" },
    answer: "ア",
    explanation: "解説",
    hasImage: false,
    sourcePdfUrl: "https://example.com/x.pdf",
    license: "IPA-public",
  };
}

function pool(spec: Record<string, number>): Question[] {
  const out: Question[] = [];
  for (const [cat, n] of Object.entries(spec)) {
    for (let i = 0; i < n; i++) out.push(q(`${cat}-${i}`, cat));
  }
  return out;
}

function countByCategory(qs: Question[]): Record<string, number> {
  const m: Record<string, number> = {};
  for (const x of qs) m[x.category] = (m[x.category] ?? 0) + 1;
  return m;
}

describe("selectMockExamQuestions", () => {
  it("returns an empty array for an empty pool", () => {
    expect(selectMockExamQuestions({ pool: [], target: 10 })).toEqual([]);
  });

  it("returns the whole pool (no dups) when the pool is at or below target", () => {
    const p = pool({ A: 3, B: 2 }); // 5 items
    const picked = selectMockExamQuestions({ pool: p, target: 10 });
    expect(picked).toHaveLength(5);
    expect(new Set(picked.map((x) => x.id)).size).toBe(5);
    expect(picked.map((x) => x.id).sort()).toEqual(p.map((x) => x.id).sort());
  });

  it("random mode returns exactly target distinct questions from the pool", () => {
    const p = pool({ A: 20 });
    const ids = new Set(p.map((x) => x.id));
    const picked = selectMockExamQuestions({ pool: p, target: 7, mode: "random" });
    expect(picked).toHaveLength(7);
    expect(new Set(picked.map((x) => x.id)).size).toBe(7);
    for (const x of picked) expect(ids.has(x.id)).toBe(true);
  });

  it("balanced mode allocates seats by Hamilton's method (largest remainder)", () => {
    // A:5 B:3 C:2 (10 items), target 4
    //   quotas A=2.0 B=1.2 C=0.8 → floors 2/1/0 (sum 3), one leftover seat → C (frac .8)
    //   expected allocation A=2 B=1 C=1
    const p = pool({ A: 5, B: 3, C: 2 });
    const picked = selectMockExamQuestions({ pool: p, target: 4, mode: "balanced" });
    expect(picked).toHaveLength(4);
    expect(new Set(picked.map((x) => x.id)).size).toBe(4);
    expect(countByCategory(picked)).toEqual({ A: 2, B: 1, C: 1 });
  });

  it("balanced mode always totals target and stays within the pool", () => {
    const p = pool({ A: 11, B: 7, C: 5, D: 2 }); // 25 items
    const ids = new Set(p.map((x) => x.id));
    const picked = selectMockExamQuestions({ pool: p, target: 10, mode: "balanced" });
    expect(picked).toHaveLength(10);
    expect(new Set(picked.map((x) => x.id)).size).toBe(10); // no duplicates
    for (const x of picked) expect(ids.has(x.id)).toBe(true);
  });

  it("defaults to balanced when mode is omitted", () => {
    const p = pool({ A: 5, B: 3, C: 2 });
    const picked = selectMockExamQuestions({ pool: p, target: 4 });
    expect(countByCategory(picked)).toEqual({ A: 2, B: 1, C: 1 });
  });
});
