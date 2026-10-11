import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import source from "@/data/questions/tsushin2/2026-early-next5.json";
import packet from "@/docs/evidence/tsushin2-next5-20261011.json";
import answers from "@/reports/zoen2-tsushin2-20260927/official-answers.json";

describe("telecom first-stage additive primary-source batch", () => {
  it("preserves the pilot and adds exactly the reserved originals with unique IDs", () => {
    expect(source.questions.map((q) => q.number)).toEqual([11, 14, 16, 17, 18]);
    expect(source.publishedCount).toBe(5);
    expect(source.officialQuestionCount).toBe(65);
    expect(new Set(TSUSHIN2_QUESTIONS.map((q) => q.id)).size).toBe(TSUSHIN2_QUESTIONS.length);
    for (const n of [4, 7, 8, 9, 10]) expect(TSUSHIN2_QUESTIONS.some((q) => q.qNumber === n)).toBe(true);
    expect(packet.secondPeriodComplete).toBe(false);
    expect(packet.latestTwoOriginalTargets).toEqual({ "2026-early": 65, "2025-late": 65 });
  });
  it("uses the official answer key and all twenty authored choice reasons through the adapter", () => {
    const keys = ["ア", "イ", "ウ", "エ"] as const;
    for (const item of source.questions) {
      const q = TSUSHIN2_QUESTIONS.find((q) => q.qNumber === item.number)!;
      expect(item.officialAnswerNumbers).toEqual(answers.tsushin2[item.number - 1]);
      expect(q.answer).toBe(keys[item.officialAnswerNumbers[0]! - 1]);
      expect(Object.keys(q.choices ?? {})).toEqual(keys);
      expect(Object.values(q.choiceExplanations ?? {}).every((reason) => reason.length > 25)).toBe(true);
      expect(q.explanationCoverage).toBe("full");
      expect(q.sourcePdfUrl).toBe(source.questionUrl);
      expect(q.sourceAnswerUrl).toBe(source.answerUrl);
      expect(q.officialReferenceUrls?.length).toBeGreaterThan(0);
    }
  });
  it("binds the inverting amplifier diagram to its reviewed original crop", () => {
    const q = TSUSHIN2_QUESTIONS.find((q) => q.qNumber === 11)!;
    expect(q.hasImage).toBe(true);
    expect(q.imageUrls).toEqual(["/images/tsushin2/2026-early/q11-figure.png"]);
    const bytes = readFileSync(join(process.cwd(), "public", q.imageUrls![0]!));
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(packet.figureCrops["11"].sha256);
    expect(bytes.subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    expect(source.questions.find((q) => q.number === 11)?.choices[3]).toContain("R₂");
    expect(source.questions.find((q) => q.number === 14)?.question).toContain("［ア］");
    expect(source.questions.find((q) => q.number === 18)?.question).toContain("［イ］");
  });
});
