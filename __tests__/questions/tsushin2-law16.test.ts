import { describe, expect, it } from "vitest";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import source from "@/data/questions/tsushin2/2026-early-law16.json";
import packet from "@/docs/evidence/tsushin2-law16-20261011.json";
import answers from "@/reports/zoen2-tsushin2-20260927/official-answers.json";

describe("telecom 2026 sixteen law originals with examination-date sources", () => {
  it("publishes only the sixteen reserved originals with the official answer key", () => {
    expect(source.questions.map((q) => q.number)).toEqual([41,42,43,44,45,46,47,48,49,50,51,52,56,61,62,65]);
    expect(source.publishedCount).toBe(16);
    expect(source.officialQuestionCount).toBe(65);
    const keys = ["ア", "イ", "ウ", "エ"] as const;
    for (const item of source.questions) {
      const q = TSUSHIN2_QUESTIONS.find((q) => q.year === 2026 && q.qNumber === item.number)!;
      expect(item.officialAnswerNumbers).toEqual(answers.tsushin2[item.number-1]);
      expect(q.answer).toBe(keys[item.officialAnswerNumbers[0]! - 1]);
      expect(Object.keys(q.choices ?? {})).toEqual(keys);
      expect(Object.values(q.choiceExplanations ?? {}).every((reason) => reason.length > 25)).toBe(true);
      expect(q.explanationCoverage).toBe("full");
      expect(q.sourcePdfUrl).toBe(source.questionUrl);
      expect(q.sourceAnswerUrl).toBe(source.answerUrl);
      expect(q.hasImage).toBe(false);
    }
    expect(new Set(TSUSHIN2_QUESTIONS.map((q) => q.id)).size).toBe(TSUSHIN2_QUESTIONS.length);
    expect(packet.newExplanations).toBe(16);
    expect(packet.choiceReasons).toBe(64);
  });
  it("pins each law to the examination date with a locally verified SHA and effective revision", () => {
    expect(packet.lawAsOf).toBe("2026-06-07");
    for (const [lawId, receipt] of Object.entries(packet.lawSources)) {
      expect(receipt.lawId).toBe(lawId);
      expect(receipt.sha256).toMatch(/^[a-f0-9]{64}$/);
      expect(receipt.url).toBe(`https://laws.e-gov.go.jp/api/2/law_data/${lawId}?asof=2026-06-07`);
      expect(receipt.revision.amendment_enforcement_date <= packet.lawAsOf).toBe(true);
    }
    expect(source.questions.every((q) => q.officialReferenceUrls.every((url) => url.endsWith("asof=2026-06-07")))).toBe(true);
    expect(packet.secondPeriodComplete).toBe(false);
  });
  it("preserves the statutory boundary and count-question distinctions", () => {
    const q62 = source.questions.find((q) => q.number === 62)!;
    expect(q62.choices).toEqual(["①③","①④","②③","②④"]);
    expect(q62.explanation).toContain("30 cm以下");
    expect(source.questions.find((q) => q.number === 49)!.question).toContain("［イ］");
    expect(source.questions.find((q) => q.number === 65)!.choices).toEqual(["1つ","2つ","3つ","4つ"]);
    expect(source.questions.find((q) => q.number === 65)!.explanation).toContain("正しいのは③だけ");
  });
});
