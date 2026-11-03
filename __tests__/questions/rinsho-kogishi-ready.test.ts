import { describe, expect, it } from "vitest";
import { RINSHO_KOGISHI_QUESTIONS } from "@/data/questions/rinsho-kogishi";
import firstReady from "@/data/questions/rinsho-kogishi/pm01-24-ready.json";
import footerOnly from "@/data/questions/rinsho-kogishi/footer-only-followup.json";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { getExamQuestionCount } from "@/lib/constants/exam-question-counts";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { questionSourceExam } from "@/lib/questions/source-label";

describe("clinical engineering partial source gate", () => {
  it("preserves the first 157 and adds only 63 proven page-footer originals", () => {
    const qs = RINSHO_KOGISHI_QUESTIONS;
    expect(firstReady).toHaveLength(46);
    expect(footerOnly).toHaveLength(63);
    expect(qs).toHaveLength(220);
    expect(getQuestionsByExamStrict("rinsho-kogishi")).toHaveLength(220);
    expect(getExamQuestionCount("rinsho-kogishi")).toBe(220);
    expect(qs.every((q) => ["am", "pm"].includes(q.session) && !q.hasImage && q.needsReview === false)).toBe(true);
    expect(new Set(qs.map((q) => q.id)).size).toBe(220);
    expect(footerOnly.filter((q) => q.year === 2025 && q.session === "am")).toHaveLength(16);
    expect(footerOnly.filter((q) => q.year === 2025 && q.session === "pm")).toHaveLength(14);
    expect(footerOnly.filter((q) => q.year === 2024 && q.session === "am")).toHaveLength(20);
    expect(footerOnly.filter((q) => q.year === 2024 && q.session === "pm")).toHaveLength(13);
    expect(qs.some((q) => q.id === "rinsho-kogishi-2024-annual-pm-q12")).toBe(false);
    expect(qs.some((q) => q.id === "rinsho-kogishi-2025-annual-pm-q11")).toBe(false);
    expect(qs.some((q) => q.id === "rinsho-kogishi-2025-annual-pm-q88")).toBe(false);
    expect(new Set(qs.map((q) => q.year))).toEqual(new Set([2024, 2025]));
  });

  it("uses JAAME's official question and answer PDFs and numbered-choice caption", () => {
    for (const q of RINSHO_KOGISHI_QUESTIONS) {
      const round = q.year === 2025 ? 39 : 38;
      expect(q.sourcePdfUrl).toBe(`https://www.jaame.or.jp/ce/pdf/${round}${q.session}.pdf`);
      expect(q.sourceAnswerUrl).toBe(`https://www.jaame.or.jp/ce/pdf/${round}ans.pdf`);
      expect(Object.values(q.choices ?? {})).toHaveLength(5);
      expect(Object.values(q.choiceExplanations ?? {})).toHaveLength(5);
      expect(questionSourceExam(q)).toBe("臨床工学技士");
    }
    expect(choiceDisplayLabel("rinsho-kogishi", "ア")).toBe("1");
  });
});
