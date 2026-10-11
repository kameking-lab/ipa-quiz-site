import { describe, expect, it } from "vitest";
import { TSUSHIN2_QUESTIONS } from "@/data/questions/tsushin2";
import source from "@/data/questions/tsushin2/2026-early-tech10.json";
import packet from "@/docs/evidence/tsushin2-tech10-20261011.json";
import answers from "@/reports/zoen2-tsushin2-20260927/official-answers.json";
import { parseQuestionBlocks } from "@/components/quiz/QuestionBody";

describe("telecom first-stage technology originals", () => {
  it("adds the ten reserved IDs and preserves the original pilot without duplicates", () => {
    expect(source.questions.map((q) => q.number)).toEqual([21, 22, 23, 24, 25, 26, 27, 28, 30, 31]);
    expect(source.publishedCount).toBe(10);
    expect(source.officialQuestionCount).toBe(65);
    expect(new Set(TSUSHIN2_QUESTIONS.map((q) => q.id)).size).toBe(TSUSHIN2_QUESTIONS.length);
    for (const n of [4, 7, 8, 9, 10]) expect(TSUSHIN2_QUESTIONS.some((q) => q.qNumber === n)).toBe(true);
    expect(packet.secondPeriodComplete).toBe(false);
    expect(packet.officialSittingDates["2025-late"].date).toBe("2025-11-16");
  });
  it("matches official answer numbers and all forty reasons through the real adapter", () => {
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
  it("renders the recovered seven-layer OSI table and labels all three original blanks", () => {
    const q = source.questions.find((q) => q.number === 21)!;
    const tables = parseQuestionBlocks(q.question).filter((block) => block.kind === "table");
    expect(tables).toEqual([{ kind: "table", header: ["階層", "名称"], rows: [["第7層", "アプリケーション層"], ["第6層", "プレゼンテーション層"], ["第5層", "［ア］"], ["第4層", "［イ］"], ["第3層", "ネットワーク層"], ["第2層", "［ウ］"], ["第1層", "物理層"]] }]);
    expect(q.choices[1]).toBe("ア：セッション層／イ：トランスポート層／ウ：データリンク層");
  });
});
