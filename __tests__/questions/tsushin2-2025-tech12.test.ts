import { describe, expect, it } from "vitest";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import { toJctcFirstQuestions, type JctcFirstSource } from "@/data/questions/jctc-first-2026";
import source from "@/data/questions/tsushin2/2025-late-tech12.json";
import packet from "@/docs/evidence/tsushin2-2025-tech12-20261011.json";

describe("telecom 2025 late twelve technical originals", () => {
  it("publishes the twelve reserved originals once with the official answers and all reasons", () => {
    const keys = ["ア", "イ", "ウ", "エ"] as const;
    const questions = TSUSHIN2_QUESTIONS.filter((q) => q.year === 2025);
    expect(questions.map((q) => q.qNumber)).toEqual(Array.from({ length: 12 }, (_, i) => i + 1));
    expect(source.officialQuestionCount).toBe(65);
    expect(source.publishedCount).toBe(12);
    expect(new Set(TSUSHIN2_QUESTIONS.map((q) => q.id)).size).toBe(TSUSHIN2_QUESTIONS.length);
    for (const q of questions) {
      expect(q.answer).toBe(keys[packet.officialAnswers[q.qNumber - 1]! - 1]);
      expect(Object.keys(q.choices ?? {})).toEqual(keys);
      expect(Object.values(q.choiceExplanations ?? {}).every((s) => s.length > 25)).toBe(true);
      expect(q.explanationCoverage).toBe("full");
      expect(q.sourcePdfUrl).toBe(source.questionUrl);
      expect(q.sourceAnswerUrl).toBe(source.answerUrl);
    }
    expect(packet.newExplanations).toBe(12);
    expect(packet.choiceReasons).toBe(48);
    expect(packet.secondPeriodComplete).toBe(false);
  });
  it("records the locally verified official PDF hashes and verifies all six original figure hashes", () => {
    expect(source.questionSha256).toBe("b657b18d52bfca9c33bf14774319680f03ae0690f4e7e6aa5a6696d8f6e4ba7f");
    expect(source.answerSha256).toBe("98cb318c09fc9f673964ba87032011f0c38cd791bfc05d37de9bcc12904f1201");
    expect(packet.questionSha256).toBe(source.questionSha256);
    expect(packet.answerSha256).toBe(source.answerSha256);
    for (const [number, crop] of Object.entries(packet.figureCrops)) {
      expect(crop.visualVerified).toBe(true);
      const png = readFileSync(`public/images/questions/tsushin2/2025-late-gakka-q${number}.png`);
      expect(createHash("sha256").update(png).digest("hex")).toBe(crop.sha256);
    }
    expect(source.questions[1]!.question).toContain("2秒間");
    expect(source.questions[3]!.question).toContain("10011111101");
    expect(source.questions[4]!.choices.every((choice) => choice.includes("|入力 A|入力 B|出力 F|"))).toBe(true);
  });
  it("supports only the two completed periods and rejects invalid source counts", () => {
    expect(toJctcFirstQuestions(source as JctcFirstSource)).toHaveLength(12);
    expect(() => toJctcFirstQuestions({ ...source, season: "early" } as JctcFirstSource)).toThrow("Only 2025 late");
    expect(() => toJctcFirstQuestions({ ...source, year: 2026 } as JctcFirstSource)).toThrow("Only 2026 early");
    expect(() => toJctcFirstQuestions({ ...source, publishedCount: 11 } as JctcFirstSource)).toThrow("published count mismatch");
  });
});
