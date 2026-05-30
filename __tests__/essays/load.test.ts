import { describe, it, expect } from "vitest";
import {
  ESSAY_EXAM_CODES,
  isEssayExamCode,
  getEssayQuestionsByExam,
  getSCpm2Questions,
  findEssayQuestion,
  findSCpm2Question,
  getEssayQuestionByYearSeason,
  getSCpm2QuestionByYearSeason,
  getIndustryEssay,
  parseYearSeason,
  questionToUrlParts,
} from "@/lib/essays/load";
import type { SCpm2Question } from "@/lib/essays/types";

// 論述（午後II/論文）コンテンツのアクセサ純関数の特性化テスト。
// 期待値はライブデータ（getSCpm2Questions）から導出し、ハードコードを避ける。

describe("isEssayExamCode / ESSAY_EXAM_CODES", () => {
  it("accepts exactly the six essay exam codes", () => {
    expect([...ESSAY_EXAM_CODES].sort()).toEqual(
      ["au", "pm", "sa", "sc", "sm", "st"].sort(),
    );
    for (const code of ESSAY_EXAM_CODES) {
      expect(isEssayExamCode(code)).toBe(true);
    }
  });

  it("rejects non-essay exam codes and junk", () => {
    expect(isEssayExamCode("ap")).toBe(false);
    expect(isEssayExamCode("nw")).toBe(false); // 論述形式でない＝対象外
    expect(isEssayExamCode("")).toBe(false);
    expect(isEssayExamCode("SC")).toBe(false); // 大文字は別物
  });
});

describe("getEssayQuestionsByExam('sc') / getSCpm2Questions", () => {
  it("returns the curated SC corpus (non-empty, identical via both accessors)", () => {
    const a = getEssayQuestionsByExam("sc");
    const b = getSCpm2Questions();
    expect(a.length).toBeGreaterThan(0);
    expect(b).toEqual(a);
  });

  it("every SC question has a spring/autumn season, unique id, and at least one industry", () => {
    const qs = getSCpm2Questions();
    const ids = qs.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length); // id 重複なし
    for (const q of qs) {
      expect(["spring", "autumn"]).toContain(q.season);
      expect(q.industries.length).toBeGreaterThan(0);
    }
  });
});

describe("findEssayQuestion / findSCpm2Question", () => {
  const sample = getSCpm2Questions()[0];

  it("finds an SC question by its id", () => {
    expect(findEssayQuestion("sc", sample.id)?.id).toBe(sample.id);
    expect(findSCpm2Question(sample.id)?.id).toBe(sample.id);
  });

  it("returns undefined for an unknown id", () => {
    expect(findEssayQuestion("sc", "sc-9999z-pm2-q9")).toBeUndefined();
    expect(findSCpm2Question("does-not-exist")).toBeUndefined();
  });
});

describe("getEssayQuestionByYearSeason / getSCpm2QuestionByYearSeason", () => {
  const sample = getSCpm2Questions()[0];

  it("matches on year + season + qNumber together", () => {
    const hit = getEssayQuestionByYearSeason(
      "sc",
      sample.year,
      sample.season,
      sample.qNumber,
    );
    expect(hit?.id).toBe(sample.id);
    expect(
      getSCpm2QuestionByYearSeason(sample.year, sample.season, sample.qNumber)?.id,
    ).toBe(sample.id);
  });

  it("returns undefined when any of the three keys disagrees", () => {
    expect(
      getEssayQuestionByYearSeason("sc", sample.year + 100, sample.season, sample.qNumber),
    ).toBeUndefined();
    const otherSeason = sample.season === "spring" ? "autumn" : "spring";
    expect(
      getEssayQuestionByYearSeason("sc", sample.year, otherSeason, sample.qNumber),
    ).toBeUndefined();
    expect(
      getEssayQuestionByYearSeason("sc", sample.year, sample.season, sample.qNumber + 999),
    ).toBeUndefined();
  });
});

describe("getIndustryEssay", () => {
  const sample = getSCpm2Questions()[0];

  it("returns the industry answer matching the given industryId", () => {
    const first = sample.industries[0];
    expect(getIndustryEssay(sample, first.industryId)?.industryId).toBe(
      first.industryId,
    );
  });

  it("returns undefined when the question has no answer for that industry", () => {
    const present = new Set(sample.industries.map((e) => e.industryId));
    const missing = (["it", "finance", "telecom", "public"] as const).find(
      (id) => !present.has(id),
    );
    // SC 問題は全業種を備えるため合成オブジェクトで「不在」契約を固定する。
    const synthetic: SCpm2Question = { ...sample, industries: [] };
    expect(getIndustryEssay(synthetic, missing ?? "it")).toBeUndefined();
  });
});

describe("parseYearSeason", () => {
  it("parses a well-formed year-season string", () => {
    expect(parseYearSeason("2024-spring")).toEqual({ year: 2024, season: "spring" });
    expect(parseYearSeason("2025-autumn")).toEqual({ year: 2025, season: "autumn" });
  });

  it("rejects malformed input (anchored, season-restricted)", () => {
    expect(parseYearSeason("2024-winter")).toBeNull(); // 季節は spring/autumn のみ
    expect(parseYearSeason("24-spring")).toBeNull(); // 4桁年のみ
    expect(parseYearSeason("2024-spring-extra")).toBeNull(); // 末尾アンカー
    expect(parseYearSeason("x2024-spring")).toBeNull(); // 先頭アンカー
    expect(parseYearSeason("")).toBeNull();
  });
});

describe("questionToUrlParts", () => {
  it("builds the URL segment parts for an SC question", () => {
    const q = getSCpm2Questions()[0];
    expect(questionToUrlParts(q, "sc")).toEqual({
      exam: "sc",
      yearSeason: `${q.year}-${q.season}`,
      section: "pm2",
      qnum: `q${q.qNumber}`,
    });
  });
});
