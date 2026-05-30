import { describe, it, expect } from "vitest";
import type { HistoryEntry } from "@/lib/storage/history";
import {
  computeCategoryStats,
  topWeakCategories,
  topStrongCategories,
  computeExamProbabilities,
  estimateStudyMinutes,
  radarSlots,
  PROB_MIN_SAMPLE,
  type QuestionMeta,
  type CategoryStat,
} from "@/lib/dashboard/analytics";

// /account ダッシュボードの習熟度・合格可能性・弱点/得意分野を駆動する純関数群。
// ユーザーに見える数値（合格可能性%・弱点分野）を出すがテスト皆無だったため、
// 係数・境界・並び順・クランプの契約を回帰固定する（source 無変更）。

function entry(id: string, correct: boolean): HistoryEntry {
  return { id, selected: "ア", correct, at: 1 };
}

const QS: QuestionMeta[] = [
  { id: "q-net-1", category: "ネットワーク", exam: "ap" },
  { id: "q-net-2", category: "ネットワーク", exam: "ap" },
  { id: "q-net-3", category: "ネットワーク", exam: "ap" },
  { id: "q-db-1", category: "データベース", exam: "ap" },
  { id: "q-db-2", category: "データベース", exam: "ap" },
  { id: "q-sec-1", category: "セキュリティ", exam: "fe" },
];

describe("computeCategoryStats", () => {
  it("aggregates per category and computes accuracy, sorted by answered desc", () => {
    const entries = [
      entry("q-net-1", true),
      entry("q-net-2", false),
      entry("q-net-3", true),
      entry("q-db-1", true),
    ];
    const stats = computeCategoryStats(entries, QS);
    expect(stats[0]).toEqual({
      category: "ネットワーク",
      answered: 3,
      correct: 2,
      accuracy: 2 / 3,
    });
    expect(stats[1]).toEqual({
      category: "データベース",
      answered: 1,
      correct: 1,
      accuracy: 1,
    });
  });

  it("skips entries whose question id is unknown", () => {
    const stats = computeCategoryStats([entry("ghost", true)], QS);
    expect(stats).toEqual([]);
  });

  it("honours the exam filter", () => {
    const entries = [entry("q-net-1", true), entry("q-sec-1", true)];
    const stats = computeCategoryStats(entries, QS, "fe");
    expect(stats.map((s) => s.category)).toEqual(["セキュリティ"]);
  });

  it("returns empty for no entries", () => {
    expect(computeCategoryStats([], QS)).toEqual([]);
  });
});

describe("topWeakCategories / topStrongCategories", () => {
  const stats: CategoryStat[] = [
    { category: "強い", answered: 10, correct: 9, accuracy: 0.9 },
    { category: "弱い", answered: 10, correct: 3, accuracy: 0.3 },
    { category: "中間", answered: 10, correct: 6, accuracy: 0.6 },
    { category: "少数", answered: 2, correct: 0, accuracy: 0 },
  ];

  it("topWeak filters by minAnswered and sorts by ascending accuracy", () => {
    const weak = topWeakCategories(stats, 2);
    expect(weak.map((s) => s.category)).toEqual(["弱い", "中間"]);
  });

  it("topStrong sorts by descending accuracy", () => {
    const strong = topStrongCategories(stats, 2);
    expect(strong.map((s) => s.category)).toEqual(["強い", "中間"]);
  });

  it("excludes categories below minAnswered (default 3)", () => {
    const weak = topWeakCategories(stats, 5);
    expect(weak.map((s) => s.category)).not.toContain("少数");
  });

  it("breaks accuracy ties by larger answered count", () => {
    const tied: CategoryStat[] = [
      { category: "A", answered: 5, correct: 3, accuracy: 0.6 },
      { category: "B", answered: 9, correct: 5.4, accuracy: 0.6 },
    ];
    expect(topWeakCategories(tied, 2)[0].category).toBe("B");
    expect(topStrongCategories(tied, 2)[0].category).toBe("B");
  });
});

describe("computeExamProbabilities", () => {
  it("returns a row for all 13 exam codes", () => {
    const rows = computeExamProbabilities([], QS);
    expect(rows).toHaveLength(13);
    expect(rows.map((r) => r.exam)).toContain("ap");
  });

  it("yields a zeroed, not-enough-sample row for an unanswered exam", () => {
    const ip = computeExamProbabilities([], QS).find((r) => r.exam === "ip")!;
    expect(ip).toMatchObject({
      answered: 0,
      accuracy: 0,
      passProbability: 0,
      questionsToPassZone: 60,
      enoughSample: false,
      answersUntilSample: PROB_MIN_SAMPLE,
    });
  });

  it("pins the pass-probability formula (75% accuracy at full sample → 72)", () => {
    const qs: QuestionMeta[] = Array.from({ length: 60 }, (_, i) => ({
      id: `ap-${i}`,
      category: "c",
      exam: "ap" as const,
    }));
    const entries = qs.map((q, i) => entry(q.id, i < 45)); // 45/60 correct
    const ap = computeExamProbabilities(entries, qs).find((r) => r.exam === "ap")!;
    expect(ap.accuracy).toBeCloseTo(0.75, 5);
    expect(ap.passProbability).toBe(72);
    expect(ap.enoughSample).toBe(true);
    expect(ap.questionsToPassZone).toBe(0);
  });

  it("caps the pass probability at 95 even at 100% accuracy", () => {
    const qs: QuestionMeta[] = Array.from({ length: 60 }, (_, i) => ({
      id: `fe-${i}`,
      category: "c",
      exam: "fe" as const,
    }));
    const entries = qs.map((q) => entry(q.id, true));
    const fe = computeExamProbabilities(entries, qs).find((r) => r.exam === "fe")!;
    expect(fe.passProbability).toBe(95);
  });

  it("crosses enoughSample exactly at PROB_MIN_SAMPLE answers", () => {
    const qs: QuestionMeta[] = Array.from({ length: PROB_MIN_SAMPLE }, (_, i) => ({
      id: `db-${i}`,
      category: "c",
      exam: "db" as const,
    }));
    const entries = qs.map((q) => entry(q.id, true));
    const db = computeExamProbabilities(entries, qs).find((r) => r.exam === "db")!;
    expect(db.enoughSample).toBe(true);
    expect(db.answersUntilSample).toBe(0);
  });
});

describe("estimateStudyMinutes", () => {
  it("scales by 1.25 minutes per answered question and rounds", () => {
    expect(estimateStudyMinutes(0)).toBe(0);
    expect(estimateStudyMinutes(10)).toBe(13); // 12.5 → 13
    expect(estimateStudyMinutes(100)).toBe(125);
  });
});

describe("radarSlots", () => {
  it("pads with placeholder slots when fewer categories than slots", () => {
    const stats: CategoryStat[] = [
      { category: "A", answered: 5, correct: 4, accuracy: 0.8 },
    ];
    const slots = radarSlots(stats, 3);
    expect(slots).toHaveLength(3);
    expect(slots[0].category).toBe("A");
    expect(slots[1].answered).toBe(0);
    expect(slots[2].category).toContain("未回答");
  });

  it("truncates to the slot count, keeping the most-answered first", () => {
    const stats: CategoryStat[] = [
      { category: "A", answered: 1, correct: 1, accuracy: 1 },
      { category: "B", answered: 9, correct: 5, accuracy: 0.55 },
      { category: "C", answered: 4, correct: 2, accuracy: 0.5 },
    ];
    const slots = radarSlots(stats, 2);
    expect(slots.map((s) => s.category)).toEqual(["B", "C"]);
  });
});
