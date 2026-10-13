import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";

import published2026 from "@/data/questions/fp3/academic-2026-05.json";
import { FP3_QUESTIONS } from "@/data/questions/fp3";
import { filterQuestions } from "@/lib/questions/filter";
import { questionPagePath } from "@/lib/seo/question-url";

const questionId = "fp3-2026-published-gakka-q31";

describe("FP3 published 2026 question 31 category correction", () => {
  it("preserves every paper field except question 31 category and topicTags", () => {
    const protectedPaper = published2026.map((question) => question.id === questionId
      ? Object.fromEntries(Object.entries(question).filter(([key]) => !["category", "topicTags"].includes(key)))
      : question);
    expect(createHash("sha256").update(JSON.stringify(protectedPaper)).digest("hex"))
      .toBe("c5a0db2294a3a0eefb295b2dbf693f49d2ffa92cb75b5bd8b30293a5592bfa06");
  });

  it("places the cash-flow question in life planning in both topic selectors", () => {
    const base = { mode: "topic", exam: "fp3", session: "gakka", year: 2026, season: "published" } as const;
    for (const selector of ["category", "topicTag"] as const) {
      expect(filterQuestions(FP3_QUESTIONS, { ...base, [selector]: "ライフプランニングと資金計画" }).map((question) => question.id)).toContain(questionId);
      expect(filterQuestions(FP3_QUESTIONS, { ...base, [selector]: "タックスプランニング" }).map((question) => question.id)).not.toContain(questionId);
    }
  });

  it("keeps the official answer, source and static question route", () => {
    const question = FP3_QUESTIONS.find((entry) => entry.id === questionId);
    expect(question).toMatchObject({
      category: "ライフプランニングと資金計画",
      topicTags: ["ライフプランニングと資金計画"],
      answer: "ア",
      sourcePdfUrl: "https://www.jafp.or.jp/exam/mohan/files/g3_202605_qa.pdf",
      lawReferenceDate: "2025-04-01",
      needsReview: false,
    });
    expect(questionPagePath(question!)).toBe("/q/fp3/2026-published/gakka/q31");
  });
});
