import { describe, expect, it } from "vitest";

import type { Question } from "@/lib/questions/types";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";

function q(overrides: Partial<Question>): Question {
  return {
    id: "x",
    exam: "ap",
    session: "am",
    year: 2024,
    season: "spring",
    qNumber: 1,
    type: "multiple-choice",
    category: "基礎理論",
    topicTags: [],
    difficulty: 3,
    question: "q",
    answer: "ア",
    explanation: "e",
    hasImage: false,
    sourcePdfUrl: "https://example.com/x.pdf",
    license: "IPA-public",
    ...overrides,
  };
}

const pool: Question[] = [
  q({ id: "a", exam: "ap", year: 2024, season: "spring", session: "am", qNumber: 1 }),
  q({ id: "b", exam: "ap", year: 2024, season: "spring", session: "am", qNumber: 2 }),
  q({ id: "c", exam: "ip", year: 2023, season: "autumn", session: "am", qNumber: 5 }),
];

describe("findQuestionByRoute (indexed lookup)", () => {
  it("resolves a route to the exact question", () => {
    const found = findQuestionByRoute(pool, {
      exam: "ip",
      yearSeason: "2023-autumn",
      section: "am",
      qnum: "q5",
    });
    expect(found?.id).toBe("c");
  });

  it("round-trips with questionPagePath for every question in the pool", () => {
    for (const item of pool) {
      const path = questionPagePath(item); // /q/{exam}/{year}-{season}/{session}/q{n}
      const [, , exam, yearSeason, section, qnum] = path.split("/");
      expect(findQuestionByRoute(pool, { exam, yearSeason, section, qnum })?.id).toBe(
        item.id,
      );
    }
  });

  it("returns undefined for malformed or missing routes", () => {
    expect(
      findQuestionByRoute(pool, {
        exam: "ap",
        yearSeason: "not-a-date",
        section: "am",
        qnum: "q1",
      }),
    ).toBeUndefined();
    expect(
      findQuestionByRoute(pool, {
        exam: "ap",
        yearSeason: "2024-spring",
        section: "am",
        qnum: "q99",
      }),
    ).toBeUndefined();
  });
});
