import { describe, expect, it } from "vitest";

import type { Question } from "@/lib/questions/types";
import { questionSnippet, questionTitle } from "@/lib/seo/question-meta";

const baseQuestion: Question = {
  id: "ap-2024s-am-q1",
  exam: "ap",
  session: "am",
  year: 2024,
  season: "spring",
  qNumber: 1,
  type: "multiple-choice",
  category: "基礎理論",
  topicTags: ["情報量・符号化"],
  difficulty: 3,
  question: "可変長符号化に関する説明として、最も適切なものはどれか。",
  choices: { ア: "A", イ: "B", ウ: "C", エ: "D" },
  answer: "ウ",
  explanation: "正解はウ。可変長符号化は出現頻度の高いシンボルに短い符号を割り当てる。",
  hasImage: false,
  sourcePdfUrl: "https://www.ipa.go.jp/example.pdf",
  license: "IPA-public",
};

describe("questionSnippet", () => {
  it("does not reveal the answer (no 正解は / answer key front-load)", () => {
    const snippet = questionSnippet(baseQuestion);
    expect(snippet).not.toContain("正解は");
    // The bare answer key must not appear as the leading reveal.
    expect(snippet.startsWith("【")).toBe(true);
  });

  it("leads with exam context and the question stem", () => {
    const snippet = questionSnippet(baseQuestion);
    expect(snippet).toContain("基礎理論");
    expect(snippet).toContain("可変長符号化");
  });

  it("ends with the AI CTA and never exceeds 158 chars", () => {
    const snippet = questionSnippet(baseQuestion);
    expect(snippet).toContain("AI");
    expect(snippet.length).toBeLessThanOrEqual(158);
  });

  it("keeps the CTA even when the question stem is very long", () => {
    const long: Question = {
      ...baseQuestion,
      question: "あ".repeat(300),
    };
    const snippet = questionSnippet(long);
    expect(snippet.length).toBeLessThanOrEqual(158);
    expect(snippet).toContain("AI");
  });
});

describe("questionTitle", () => {
  it("includes year, exam, session, question number and category when within budget", () => {
    const title = questionTitle(baseQuestion);
    expect(title).toContain("問1");
    expect(title).toContain("基礎理論");
    expect(title).toContain("解説");
    expect(title.length).toBeLessThanOrEqual(40);
  });

  it("drops the supplementary category for an over-long title but keeps the question-number core and 解説", () => {
    // es 2024 spring → "エンベデッドシステムスペシャリスト試験" (long label); with a
    // long category the full title overflows the 40-char budget.
    const longExam: Question = {
      ...baseQuestion,
      id: "es-2024s-am1-q18",
      exam: "es",
      session: "am1",
      year: 2024,
      season: "spring",
      qNumber: 18,
      category: "プロジェクトマネジメント",
    };
    const title = questionTitle(longExam);
    expect(title).toContain("問18");
    expect(title.endsWith("解説")).toBe(true);
    // The supplementary category is dropped (it has its own badge/link + lives
    // in the description) so the identifying core survives in the SERP.
    expect(title).not.toContain("プロジェクトマネジメント");
  });
});
