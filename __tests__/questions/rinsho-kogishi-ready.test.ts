import { describe, expect, it } from "vitest";
import { RINSHO_KOGISHI_QUESTIONS } from "@/data/questions/rinsho-kogishi";
import firstReady from "@/data/questions/rinsho-kogishi/pm01-24-ready.json";
import earlierFollowup from "@/data/questions/rinsho-kogishi/source-clean-followup.json";
import footerOnly from "@/data/questions/rinsho-kogishi/footer-only-followup.json";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { getExamQuestionCount } from "@/lib/constants/exam-question-counts";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { questionSourceExam } from "@/lib/questions/source-label";

describe("clinical engineering source gate", () => {
  it("preserves all 220 reviewed originals including the 63 page-footer recoveries", () => {
    const qs = RINSHO_KOGISHI_QUESTIONS;
    expect(firstReady).toHaveLength(46);
    expect(footerOnly).toHaveLength(63);
    expect(earlierFollowup).toHaveLength(111);
    const reviewed = [...firstReady, ...earlierFollowup, ...footerOnly];
    expect(new Set(reviewed.map((q) => q.id)).size).toBe(220);
    const publicById = new Map(qs.map((q) => [q.id, q]));
    for (const reviewedQuestion of reviewed) {
      expect(publicById.get(reviewedQuestion.id), reviewedQuestion.id).toEqual(reviewedQuestion);
      expect(reviewedQuestion.hasImage, reviewedQuestion.id).toBe(false);
    }
    expect(publicById.size).toBe(qs.length);
    expect(getQuestionsByExamStrict("rinsho-kogishi").map((q) => q.id).toSorted()).toEqual([...publicById.keys()].sort());
    expect(getExamQuestionCount("rinsho-kogishi")).toBe(qs.length);
    expect(footerOnly.filter((q) => q.year === 2025 && q.session === "am")).toHaveLength(16);
    expect(footerOnly.filter((q) => q.year === 2025 && q.session === "pm")).toHaveLength(14);
    expect(footerOnly.filter((q) => q.year === 2024 && q.session === "am")).toHaveLength(20);
    expect(footerOnly.filter((q) => q.year === 2024 && q.session === "pm")).toHaveLength(13);
    expect(new Set(qs.map((q) => q.year))).toEqual(new Set([2021, 2022, 2023, 2024, 2025]));
    for (const year of [2021, 2022, 2023, 2024, 2025]) {
      for (const session of ["am", "pm"]) {
        expect(qs.filter((q) => q.year === year && q.session === session).map((q) => q.qNumber)).toEqual(
          Array.from({ length: 90 }, (_, index) => index + 1),
        );
      }
    }
  });

  it("uses JAAME's official sources and preserves the exact seven summary-only explanations", () => {
    const summaryKeys = new Map([
      [23, "1,2,3,4,5"], [42, "2"], [43, "4"], [65, "4"], [66, "3"], [71, "2"], [72, "3"],
    ]);
    const summaries = RINSHO_KOGISHI_QUESTIONS.filter(q => q.explanationCoverage === "official-summary");
    expect(summaries.map(q => [q.year, q.session, q.qNumber, q.officialAnswerNumber])).toEqual(
      [...summaryKeys].map(([number, key]) => [2024, "am", number, key]),
    );
    for (const q of RINSHO_KOGISHI_QUESTIONS) {
      const round = q.year - 1986;
      expect(q.sourcePdfUrl?.split("#")[0]).toBe(`https://www.jaame.or.jp/ce/pdf/${round}${q.session}.pdf`);
      expect(q.sourceAnswerUrl?.split("#")[0]).toBe(`https://www.jaame.or.jp/ce/pdf/${round}ans.pdf`);
      expect(Object.values(q.choices ?? {})).toHaveLength(5);
      expect(Object.values(q.choiceExplanations ?? {}), q.id).toHaveLength(q.explanationCoverage === "official-summary" ? 0 : 5);
      expect(q.explanation.trim().length, q.id).toBeGreaterThan(10);
      expect(questionSourceExam(q)).toBe("臨床工学技士");
    }
    expect(choiceDisplayLabel("rinsho-kogishi", "ア")).toBe("1");
  });

  it.each([
    [2024, 12, "3", "ウ"],
    [2025, 11, "1・2・3・4・5", ["ア", "イ", "ウ", "エ", "オ"]],
    [2025, 88, 5, "オ"],
  ] as const)("retains the JAAME answer for the restored %i PM Q%i", (year, number, key, answer) => {
    const question = RINSHO_KOGISHI_QUESTIONS.find(q => q.year === year && q.session === "pm" && q.qNumber === number);
    expect(question?.officialAnswerNumber).toBe(key);
    expect(question?.answer).toEqual(answer);
  });
});
