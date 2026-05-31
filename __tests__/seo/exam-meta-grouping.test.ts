import { describe, it, expect } from "vitest";
import {
  groupByYearSeason,
  groupByCategory,
  examTopTitle,
  examTopDescription,
  examFullName,
} from "@/lib/seo/exam-meta";
import { formatYearSeason, examLabel } from "@/lib/utils";
import type { Question, Season } from "@/lib/questions/types";

function q(year: number, season: Season, category: string): Question {
  return {
    id: `ap-${year}-${season}-${category}-${Math.random().toString(36).slice(2, 6)}`,
    exam: "ap",
    session: "am",
    year,
    season,
    qNumber: 1,
    type: "multiple-choice",
    category,
    topicTags: [],
    difficulty: 3,
    question: "Q",
    choices: { ア: "a", イ: "b", ウ: "c", エ: "d" },
    answer: "ア",
    explanation: "解説",
    hasImage: false,
    sourcePdfUrl: "https://example.com/x.pdf",
    license: "IPA-public",
  };
}

describe("groupByYearSeason", () => {
  it("aggregates counts per year-season and stamps key/label", () => {
    const groups = groupByYearSeason([
      q(2024, "autumn", "テクノロジ"),
      q(2024, "autumn", "マネジメント"),
      q(2023, "spring", "ストラテジ"),
    ]);
    const autumn24 = groups.find((g) => g.key === "2024-autumn")!;
    expect(autumn24.count).toBe(2);
    expect(autumn24.year).toBe(2024);
    expect(autumn24.season).toBe("autumn");
    expect(autumn24.label).toBe(formatYearSeason(2024, "autumn"));
  });

  it("sorts newest year first, then season by localeCompare within a year", () => {
    const groups = groupByYearSeason([
      q(2023, "spring", "x"),
      q(2024, "spring", "x"),
      q(2024, "autumn", "x"),
    ]);
    // 2024 before 2023 (year desc); within 2024, autumn < spring (localeCompare).
    expect(groups.map((g) => g.key)).toEqual([
      "2024-autumn",
      "2024-spring",
      "2023-spring",
    ]);
  });

  it("returns an empty array for no questions", () => {
    expect(groupByYearSeason([])).toEqual([]);
  });
});

describe("groupByCategory", () => {
  it("aggregates counts and sorts by count descending", () => {
    const result = groupByCategory([
      q(2024, "autumn", "テクノロジ"),
      q(2024, "autumn", "テクノロジ"),
      q(2024, "autumn", "マネジメント"),
    ]);
    expect(result).toEqual([
      { category: "テクノロジ", count: 2 },
      { category: "マネジメント", count: 1 },
    ]);
  });

  it("returns an empty array for no questions", () => {
    expect(groupByCategory([])).toEqual([]);
  });
});

describe("title / description / full-name string contracts", () => {
  it("examTopTitle embeds the exam label", () => {
    expect(examTopTitle("ap")).toBe(`${examLabel("ap")} 過去問一覧・AI解説`);
  });

  it("examTopDescription includes the question count and exam label", () => {
    const desc = examTopDescription("ap", 1234);
    expect(desc).toContain("1234問");
    expect(desc).toContain(examLabel("ap"));
  });

  it("examFullName returns the formal exam name for every code", () => {
    expect(examFullName("ap")).toBe("応用情報技術者試験");
    expect(examFullName("ip")).toBe("ITパスポート試験");
  });
});
