import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";

import published2026 from "@/data/questions/fp3/academic-2026-05.json";
import { FP3_QUESTIONS } from "@/data/questions/fp3";
import { filterQuestions } from "@/lib/questions/filter";
import { questionPagePath } from "@/lib/seo/question-url";

const questionId = "fp3-2026-published-gakka-q11";

describe("FP3 published 2026 question 11 category correction", () => {
  it("preserves the entire paper apart from the three authorized metadata fields on question 11", () => {
    const protectedPaper = published2026.map((question) => question.id === questionId
      ? Object.fromEntries(Object.entries(question).filter(([key]) => !["category", "topicTags", "lastUpdated"].includes(key)))
      : question);
    expect(createHash("sha256").update(JSON.stringify(protectedPaper)).digest("hex"))
      .toBe("33da85c52bafda706bddae0e8dc3b41ea8da97b6a8374cf0d670df1247abaa6c");
  });

  it("includes monetary policy in the financial category and topic pools, and excludes it from risk management", () => {
    const base = { mode: "topic", exam: "fp3", session: "gakka", year: 2026, season: "published" } as const;
    for (const selector of ["category", "topicTag"] as const) {
      expect(filterQuestions(FP3_QUESTIONS, { ...base, [selector]: "金融資産運用" }).map((question) => question.id)).toContain(questionId);
      expect(filterQuestions(FP3_QUESTIONS, { ...base, [selector]: "リスク管理" }).map((question) => question.id)).not.toContain(questionId);
    }
  });

  it("retains all 60 ready questions, the exact year and ID, the official answer, and the static question URL", () => {
    const pool = filterQuestions(FP3_QUESTIONS, { mode: "year", exam: "fp3", session: "gakka", year: 2026, season: "published", inOrder: true });
    expect(pool).toHaveLength(60);
    const question = pool.find((entry) => entry.id === questionId);
    expect(question).toMatchObject({ category: "金融資産運用", topicTags: ["金融資産運用"], lastUpdated: "2026-10-11", year: 2026, qNumber: 11, answer: "イ", needsReview: false });
    expect(question).toBeDefined();
    expect(questionPagePath(question!)).toBe("/q/fp3/2026-published/gakka/q11");
  });
});
