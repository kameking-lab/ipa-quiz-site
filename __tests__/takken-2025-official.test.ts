import { describe, expect, it } from "vitest";
import { TAKKEN_2025_QUESTIONS } from "@/data/questions/takken/2025";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";

// RETIO 2025 answer table (same official PDF, final page), checked against the
// source PDF before ingestion. This prevents a later data edit from silently
// changing an answer without updating the source review.
const officialAnswers = [
  3, 3, 3, 4, 4, 1, 1, 2, 1, 3,
  3, 3, 3, 1, 4, 4, 2, 2, 2, 4,
  4, 4, 1, 2, 1, 4, 1, 2, 2, 3,
  4, 2, 3, 3, 1, 4, 4, 3, 4, 3,
  1, 2, 4, 2, 4, 2, 3, 2, 1, 1,
];

describe("RETIO 2025 takken paper", () => {
  it("publishes one complete official 50-question paper with every answer mapped correctly", () => {
    expect(QUALIFICATION_CATALOG.find((entry) => entry.examCode === "takken")?.status).toBe("live");
    expect(TAKKEN_2025_QUESTIONS).toHaveLength(50);
    expect(getQuestionsByExamStrict("takken")).toHaveLength(100);
    expect(TAKKEN_2025_QUESTIONS.map((question) => question.qNumber)).toEqual(
      Array.from({ length: 50 }, (_, index) => index + 1),
    );
    expect(TAKKEN_2025_QUESTIONS.map((question) => Number(question.officialAnswerNumber))).toEqual(officialAnswers);
    expect(TAKKEN_2025_QUESTIONS.map((question) => question.answer)).toEqual(
      officialAnswers.map((number) => "アイウエ"[number - 1]),
    );
  });

  it("provides each original four-option problem, individual reasons and primary sources", () => {
    for (const question of TAKKEN_2025_QUESTIONS) {
      expect(question.year).toBe(2025);
      expect(question.season).toBe("october");
      expect(question.lawReferenceDate).toBe("2025-04-01");
      expect(question.question.length).toBeGreaterThan(10);
      expect(Object.keys(question.choices ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(Object.keys(question.choiceExplanations ?? {})).toEqual(["ア", "イ", "ウ", "エ"]);
      expect(question.explanationCoverage).toBe("full");
      expect(question.needsReview).toBe(false);
      expect(question.sourcePdfUrl).toBe("https://www.retio.or.jp/wp-content/uploads/2025/12/R7_question_answer.pdf");
      expect((question.officialReferenceUrls ?? []).some((url) =>
        url.startsWith("https://laws.e-gov.go.jp/") || url.startsWith("https://www.mlit.go.jp/") || url.startsWith("https://www.mof.go.jp/"),
      )).toBe(true);
    }
  });

  it("keeps the 2024 calendar-year housing statistics distinct from fiscal-year data", () => {
    const question = TAKKEN_2025_QUESTIONS[47];
    expect(question?.qNumber).toBe(48);
    expect(question?.answer).toBe("イ");
    expect(question?.choiceExplanations?.イ).toContain("218,175戸");
    expect(question?.choiceExplanations?.イ).toContain("225,315戸");
    expect(question?.officialReferenceUrls).toContain("https://www.mlit.go.jp/report/press/content/kencha24.pdf");
  });
});
