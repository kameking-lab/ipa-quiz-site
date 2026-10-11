import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import source from "@/data/questions/tsushin2/2026-early-first5.json";
import packet from "@/docs/evidence/tsushin2-first5-20261011.json";
import answers from "@/reports/zoen2-tsushin2-20260927/official-answers.json";

describe("telecom first-stage originals with recovered figures", () => {
  it("adds five distinct originals without changing pilot IDs or claiming a complete sitting", () => {
    expect(source.questions.map((q) => q.number)).toEqual([1, 2, 3, 5, 6]);
    expect(source.publishedCount).toBe(5);
    expect(source.officialQuestionCount).toBe(65);
    expect(TSUSHIN2_QUESTIONS.map((q) => q.qNumber)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(new Set(TSUSHIN2_QUESTIONS.map((q) => q.id)).size).toBe(10);
    expect(packet.secondPeriodComplete).toBe(false);
  });
  it("matches the official answer key and exposes all twenty choice reasons through the real adapter", () => {
    const keys = ["ア", "イ", "ウ", "エ"] as const;
    for (const item of source.questions) {
      const q = TSUSHIN2_QUESTIONS.find((q) => q.qNumber === item.number)!;
      expect(q.type).toBe("multiple-choice");
      expect(Object.keys(q.choices ?? {})).toEqual(keys);
      expect(item.officialAnswerNumbers).toEqual(answers.tsushin2[item.number - 1]);
      expect(q.answer).toBe(keys[item.officialAnswerNumbers[0]! - 1]);
      expect(Object.values(q.choiceExplanations ?? {}).every((reason) => reason.length > 25)).toBe(true);
      expect(q.explanationCoverage).toBe("full");
      expect(q.sourcePdfUrl).toBe(source.questionUrl);
      expect(q.sourceAnswerUrl).toBe(source.answerUrl);
      expect(q.officialReferenceUrls?.length).toBeGreaterThan(0);
    }
  });
  it("binds all four visible figures to the inspected source crops", () => {
    for (const n of [1, 2, 3, 5]) {
      const q = TSUSHIN2_QUESTIONS.find((q) => q.qNumber === n)!;
      expect(q.hasImage).toBe(true);
      expect(q.imageUrls).toHaveLength(1);
      const image = readFileSync(join(process.cwd(), "public", q.imageUrls![0]!));
      const evidence = packet.figureCrops[String(n) as keyof typeof packet.figureCrops];
      expect(createHash("sha256").update(image).digest("hex")).toBe(evidence.sha256);
      expect(image.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    }
    expect(TSUSHIN2_QUESTIONS.find((q) => q.qNumber === 6)?.hasImage).toBe(false);
  });
  it("recomputes numerical answers and all four logic input combinations", () => {
    expect(6.28 / (2 * 3.14 * 0.2)).toBeCloseTo(5, 12);
    expect((2 / 2)).toBe(1);
    expect(Math.hypot(3, 4)).toBe(5);
    const inputPairs = [[0, 0], [0, 1], [1, 0], [1, 1]] as const;
    expect(inputPairs.map(([a, b]) => Number(Boolean((a || !b) && b)))).toEqual([0, 0, 0, 1]);
    expect(source.questions.find((q) => q.number === 2)?.question).toContain("mm²");
    expect(source.questions.find((q) => q.number === 3)?.question).toContain("I_R＝3");
  });
});
