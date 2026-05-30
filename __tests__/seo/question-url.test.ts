import { describe, expect, it } from "vitest";

import type { Question } from "@/lib/questions/types";
import {
  findQuestionByRoute,
  parseQuestionRoute,
  questionPagePath,
} from "@/lib/seo/question-url";

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

// parseQuestionRoute は findQuestionByRoute 経由で間接的に踏まれるだけで、
// 直接の null 分岐・正規表現アンカー・round-trip 契約が未固定だった
// (部分カバレッジgap)。/q/* ルーティングの URL→構造化パラメータ変換の正。
describe("parseQuestionRoute (route → structured params)", () => {
  it("parses each valid season token and the qNumber", () => {
    for (const season of ["spring", "autumn", "cbt"] as const) {
      expect(
        parseQuestionRoute({
          exam: "ap",
          yearSeason: `2023-${season}`,
          section: "am",
          qnum: "q7",
        }),
      ).toEqual({
        exam: "ap",
        year: 2023,
        season,
        session: "am",
        qNumber: 7,
      });
    }
  });

  it("round-trips with questionPagePath", () => {
    const item = q({
      exam: "sc",
      year: 2022,
      season: "autumn",
      session: "am2",
      qNumber: 13,
    });
    const path = questionPagePath(item); // /q/{exam}/{year}-{season}/{session}/q{n}
    const [, , exam, yearSeason, section, qnum] = path.split("/");
    expect(parseQuestionRoute({ exam, yearSeason, section, qnum })).toEqual({
      exam: item.exam,
      year: item.year,
      season: item.season,
      session: item.session,
      qNumber: item.qNumber,
    });
  });

  it("returns null for a yearSeason that fails the ^(\\d{4})-(spring|autumn|cbt)$ anchor", () => {
    for (const yearSeason of [
      "2023-winter", // 未対応シーズン
      "23-spring", // 4桁でない
      "2023spring", // ハイフン欠落
      "12023-spring", // 5桁
      "2023-spring-extra", // 末尾余剰
      "not-a-date",
    ]) {
      expect(
        parseQuestionRoute({ exam: "ap", yearSeason, section: "am", qnum: "q1" }),
      ).toBeNull();
    }
  });

  it("returns null for a qnum that fails the ^q(\\d+)$ anchor", () => {
    for (const qnum of ["5", "qabc", "", "q", "q1a", "Q1"]) {
      expect(
        parseQuestionRoute({
          exam: "ap",
          yearSeason: "2023-spring",
          section: "am",
          qnum,
        }),
      ).toBeNull();
    }
  });

  it("passes exam/section through verbatim without validating them", () => {
    // exam/section は型キャストのみで実在チェックはしない（呼び出し側の責務）。
    expect(
      parseQuestionRoute({
        exam: "unknown-exam",
        yearSeason: "2023-spring",
        section: "weird-section",
        qnum: "q1",
      }),
    ).toEqual({
      exam: "unknown-exam",
      year: 2023,
      season: "spring",
      session: "weird-section",
      qNumber: 1,
    });
  });
});
