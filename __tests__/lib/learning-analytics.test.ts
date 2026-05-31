import { describe, it, expect } from "vitest";
import type { HistoryEntry } from "@/lib/storage/history";
import type { ExamCode } from "@/lib/questions/types";
import {
  aggregateByCategory,
  aggregateByExam,
  estimatePassProbability,
  estimateRequiredPractice,
  dailyTargetQuestions,
} from "@/lib/learning/analytics";

// 学習プラン/弱点分析の純関数群。ユーザーに見える合格可能性・必要演習量・1日の目標数を
// 駆動するがテスト皆無だった（daysUntil のみ別ファイルでテスト済）。係数・境界・集計の
// 契約を回帰固定する（source 無変更）。

function entry(id: string, correct: boolean): HistoryEntry {
  return { id, selected: "ア", correct, at: 1 };
}

describe("aggregateByCategory", () => {
  it("groups by category, computes accuracy, sorts by attempts desc", () => {
    const lookup = new Map([
      ["a", { category: "ネットワーク" }],
      ["b", { category: "ネットワーク" }],
      ["c", { category: "データベース" }],
    ]);
    const stats = aggregateByCategory(
      [entry("a", true), entry("b", false), entry("c", true)],
      lookup,
    );
    expect(stats[0]).toEqual({
      category: "ネットワーク",
      attempts: 2,
      correct: 1,
      accuracy: 0.5,
    });
    expect(stats[1].category).toBe("データベース");
  });

  it("skips entries with no matching question metadata", () => {
    expect(aggregateByCategory([entry("ghost", true)], new Map())).toEqual([]);
  });
});

describe("aggregateByExam", () => {
  it("dedupes uniqueAnswered while counting every attempt", () => {
    const lookup = new Map<string, { exam: ExamCode }>([
      ["q1", { exam: "ap" }],
      ["q2", { exam: "ap" }],
    ]);
    const stats = aggregateByExam(
      [entry("q1", true), entry("q1", false), entry("q2", true)],
      lookup,
    );
    const ap = stats.find((s) => s.exam === "ap")!;
    expect(ap.attempts).toBe(3);
    expect(ap.uniqueAnswered).toBe(2);
    expect(ap.correct).toBe(2);
    expect(ap.accuracy).toBeCloseTo(2 / 3, 5);
  });
});

describe("estimatePassProbability", () => {
  it("uses a damped estimate below 10 attempts", () => {
    expect(estimatePassProbability(0.8, 5)).toBeCloseTo(0.32, 5);
    expect(estimatePassProbability(0, 0)).toBe(0);
  });

  it("anchors 0.6 accuracy at full confidence to 0.5 probability", () => {
    expect(estimatePassProbability(0.6, 200)).toBeCloseTo(0.5, 5);
  });

  it("rises with accuracy and stays within [0,1]", () => {
    const low = estimatePassProbability(0.4, 200);
    const high = estimatePassProbability(0.9, 200);
    expect(high).toBeGreaterThan(low);
    expect(high).toBeLessThanOrEqual(1);
    expect(low).toBeGreaterThanOrEqual(0);
  });
});

describe("estimateRequiredPractice", () => {
  it("caps at 100 / remaining pool once the target is met", () => {
    expect(estimateRequiredPractice(0.75, 790)).toEqual({
      questionsNeeded: 10,
      hoursNeeded: 0.5,
    });
    // remaining pool larger than 100 → capped at 100
    expect(estimateRequiredPractice(0.9, 0).questionsNeeded).toBe(100);
  });

  it("floors remaining at 0 when more unique questions answered than the assumed pool", () => {
    // 既存テストは remaining=10 と 800 のみで、プール枯渇(uniqueAnswered>examPoolSize)を
    // 踏んでいなかった。大区分で実問題数が既定 examPoolSize(800)を超えると到達する枝。
    // `Math.max(0, …)` の床が外れると questionsNeeded が負(「−50問」)になりユーザー可視で壊れる。
    expect(estimateRequiredPractice(0.8, 850)).toEqual({
      questionsNeeded: 0,
      hoursNeeded: 0,
    });
  });

  it("scales by 50 questions per accuracy point below target", () => {
    // gap 0.2 → 0.2 * 100 * 50 = 1000
    expect(estimateRequiredPractice(0.5, 100)).toEqual({
      questionsNeeded: 1000,
      hoursNeeded: 50,
    });
  });
});

describe("dailyTargetQuestions", () => {
  it("spreads remaining over days, clamped to [5,80]", () => {
    expect(dailyTargetQuestions(100, 10)).toBe(10);
    expect(dailyTargetQuestions(100, 100)).toBe(5); // raw 1 → floor 5
    expect(dailyTargetQuestions(1000, 5)).toBe(80); // raw 200 → ceil 80
  });

  it("returns all remaining when no days are left", () => {
    expect(dailyTargetQuestions(42, 0)).toBe(42);
    expect(dailyTargetQuestions(42, -3)).toBe(42);
  });
});
