import { describe, expect, it } from "vitest";
import { RINSHO_KOGISHI_QUESTIONS } from "@/data/questions/rinsho-kogishi";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { getExamQuestionCount } from "@/lib/constants/exam-question-counts";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { questionSourceExam } from "@/lib/questions/source-label";

describe("clinical engineering partial source gate", () => {
  it("publishes only the 46 verified afternoon originals from rounds 39 and 38", () => {
    const qs = RINSHO_KOGISHI_QUESTIONS;
    expect(qs).toHaveLength(46);
    expect(getQuestionsByExamStrict("rinsho-kogishi")).toHaveLength(46);
    expect(getExamQuestionCount("rinsho-kogishi")).toBe(46);
    expect(qs.every((q) => q.session === "pm" && !q.hasImage && q.needsReview === false)).toBe(true);
    expect(new Set(qs.map((q) => q.id)).size).toBe(46);
    expect(qs.some((q) => q.id === "rinsho-kogishi-2024-annual-pm-q12")).toBe(false);
    expect(qs.some((q) => q.id === "rinsho-kogishi-2025-annual-pm-q11")).toBe(false);
    expect(new Set(qs.map((q) => q.year))).toEqual(new Set([2024, 2025]));
  });

  it("uses JAAME's official question and answer PDFs and numbered-choice caption", () => {
    for (const q of RINSHO_KOGISHI_QUESTIONS) {
      const round = q.year === 2025 ? 39 : 38;
      expect(q.sourcePdfUrl).toBe(`https://www.jaame.or.jp/ce/pdf/${round}pm.pdf`);
      expect(q.sourceAnswerUrl).toBe(`https://www.jaame.or.jp/ce/pdf/${round}ans.pdf`);
      expect(Object.values(q.choices ?? {})).toHaveLength(5);
      expect(Object.values(q.choiceExplanations ?? {})).toHaveLength(5);
      expect(questionSourceExam(q)).toBe("臨床工学技士");
    }
    expect(choiceDisplayLabel("rinsho-kogishi", "ア")).toBe("1");
  });
});
