import { describe, it, expect } from "vitest";
import {
  buildExtractionPrompt,
  buildAnswerExtractionPrompt,
  buildExplanationPrompt,
  type ExamConfig,
  type SessionConfig,
} from "@/lib/exam-config";

// PDF 抽出/解説生成スクリプト(scripts/parse-pdf-to-json.ts)が LLM に渡す
// プロンプト文字列ビルダの特性化テスト。崩れると抽出が静かに破綻するため
// 主要な補間契約（年度/季節ラベル/設問数/カテゴリ採番/JSON-only 指示）を固定する。

const sessionCfg: SessionConfig = {
  session: "am",
  urlSlug: "am",
  expectedQuestions: 80,
  label: "午前",
  categories: ["テクノロジ系", "マネジメント系", "ストラテジ系"],
};

const examCfg: ExamConfig = {
  code: "ap",
  nameFull: "応用情報技術者試験",
  urlSlug: "ap",
  level: "advanced",
  sessions: [sessionCfg],
  seasons: ["spring", "autumn"],
  yearRange: { start: 2009, end: 2025 },
};

describe("buildExtractionPrompt", () => {
  it("interpolates exam name, year, label and expected question count", () => {
    const p = buildExtractionPrompt(examCfg, 2024, "autumn", sessionCfg);
    expect(p).toContain("応用情報技術者試験");
    expect(p).toContain("午前");
    expect(p).toContain("2024年度");
    // expectedQuestions が件数指示に反映される
    expect(p).toContain("Extract ALL 80 multiple-choice questions");
  });

  it("maps the season to its Japanese label", () => {
    expect(buildExtractionPrompt(examCfg, 2024, "spring", sessionCfg)).toContain("春期");
    expect(buildExtractionPrompt(examCfg, 2024, "autumn", sessionCfg)).toContain("秋期");
    expect(buildExtractionPrompt(examCfg, 2024, "cbt", sessionCfg)).toContain("CBT");
  });

  it("renders the category list as a 1-indexed newline-joined list", () => {
    const p = buildExtractionPrompt(examCfg, 2024, "spring", sessionCfg);
    expect(p).toContain("1. テクノロジ系\n2. マネジメント系\n3. ストラテジ系");
  });

  it("demands a JSON-only array response with the four choice labels", () => {
    const p = buildExtractionPrompt(examCfg, 2024, "spring", sessionCfg);
    expect(p).toContain("Return ONLY a valid JSON array");
    expect(p).toContain("ア, イ, ウ, エ");
  });
});

describe("buildAnswerExtractionPrompt", () => {
  it("interpolates the label and expected count and demands a JSON object", () => {
    const p = buildAnswerExtractionPrompt(sessionCfg);
    expect(p).toContain("午前");
    expect(p).toContain("80 questions");
    expect(p).toContain("Extract all 80 answers");
    expect(p).toContain("Return ONLY a valid JSON object");
    expect(p).toContain("ア, イ, ウ, エ");
  });
});

describe("buildExplanationPrompt", () => {
  it("interpolates exam name, label and appends the question list", () => {
    const qList = "問1: ...\n問2: ...";
    const p = buildExplanationPrompt(examCfg, sessionCfg, qList);
    expect(p).toContain("応用情報技術者試験");
    expect(p).toContain("午前");
    expect(p).toContain("JSONのみ");
    // qList は末尾に付与される
    expect(p.endsWith(qList)).toBe(true);
  });
});
