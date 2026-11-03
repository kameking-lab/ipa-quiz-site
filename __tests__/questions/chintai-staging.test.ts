import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "@/data/questions";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { CHINTAI_STAGING_QUESTIONS, ChintaiStagingQuestionSchema, validateChintaiStaging } from "../../scripts/lib/chintai-staging";

describe("chintai unpublished staging", () => {
  it("contains exactly both official 50-question sets with all choice and inner-statement explanations", () => {
    expect(validateChintaiStaging()).toBe(100);
  });
  it("keeps all-answer credit separate from multiple-selection scoring", () => {
    const q = CHINTAI_STAGING_QUESTIONS.find((q) => q.year === 2025 && q.qNumber === 9)!;
    expect(q.officialAnswerNumber).toBeNull();
    expect(q.acceptedAnswerNumbers).toEqual([1, 2, 3, 4]);
    expect(ChintaiStagingQuestionSchema.safeParse({ ...q, scoring: "single-choice", officialAnswerNumber: 1 }).success).toBe(false);
  });
  it("rejects missing choices, inner explanations, wrong source years, and incorrect law dates", () => {
    const ordinary = CHINTAI_STAGING_QUESTIONS[0];
    for (const change of [
      { choices: { "1": "one", "2": "two" } },
      { choiceExplanations: {} },
      { sourceAnswerUrl: ordinary.sourceAnswerUrl.replace("2024", "2025") },
      { lawAsOf: "2026-04-01" },
      { officialAnswerNumber: 2, acceptedAnswerNumbers: [2] },
      { question: ordinary.question.replace("適切なもの", "誤っているもの") },
    ]) expect(ChintaiStagingQuestionSchema.safeParse({ ...ordinary, ...change }).success).toBe(false);
    const inner = CHINTAI_STAGING_QUESTIONS.find((q) => "statementExplanations" in q)!;
    expect(ChintaiStagingQuestionSchema.safeParse({ ...inner, statementExplanations: {} }).success).toBe(false);
  });
  it("does not expose staging through the public registry or a live qualification entry", () => {
    expect(ALL_QUESTIONS.some((q) => (q.exam as string) === "chintai" || q.id.startsWith("chintai-"))).toBe(false);
    const entry = QUALIFICATION_CATALOG.find((q) => q.slug === "chintai")!;
    expect(entry.status).toBe("ready-to-ingest");
    expect(entry.examCode).toBeUndefined();
  });
});
