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
    expect(snippet.startsWith(baseQuestion.question)).toBe(true);
  });

  it("leads with the searched stem and retains exam context", () => {
    const snippet = questionSnippet(baseQuestion);
    expect(snippet).toContain("基礎理論");
    expect(snippet).toContain("可変長符号化");
    expect(snippet.indexOf("可変長符号化")).toBeLessThan(snippet.indexOf("基礎理論"));
    expect(snippet).not.toMatch(/無料で即|AIが.*無料/);
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

  it("keeps source context and the CTA within budget for a long category", () => {
    const snippet = questionSnippet({ ...baseQuestion, category: "あ".repeat(200) });
    expect(snippet.length).toBeLessThanOrEqual(158);
    expect(snippet.startsWith("可変長符号化")).toBe(true);
    expect(snippet.endsWith("疑問はAIに質問できます。")).toBe(true);
  });
});

describe("questionTitle", () => {
  it("leads with a short medical stem and identifies the source question", () => {
    const title = questionTitle({ ...baseQuestion, exam: "kangoshi", question: "痛みの伝導で正しいのはどれか。" });
    expect(title.startsWith("痛みの伝導で正しいのはどれか。｜")).toBe(true);
    expect(title).toContain("看護師");
    expect(title).toContain("問1");
    expect(title).toContain("解説");
  });

  it("preserves the instruction to select two answers", () => {
    const question = "疼痛を伝達する神経線維はどれか。2 つ選べ。";
    expect(questionTitle({ ...baseQuestion, exam: "rigaku-ryohoshi", question }).startsWith(`${question}｜`)).toBe(true);
  });

  it.each([
    { question: "痛みの伝導で正しいのはどれか。", hasImage: true },
    { question: "図の説明で正しいのはどれか。" },
    { question: "次の説明で正しいのはどれか。" },
    { question: "あ".repeat(80) + "どれか。" },
  ])("keeps the source-first title when the stem needs context: %s", overrides => {
    const q: Question = { ...baseQuestion, exam: "kangoshi", ...overrides };
    expect(questionTitle(q).startsWith("令和6年度 春期")).toBe(true);
    expect(questionTitle(q)).toContain("問1");
  });
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
      id: "es-2024a-am2-q18",
      exam: "es",
      session: "am2",
      year: 2024,
      season: "autumn",
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

  it("identifies AM1 as a common paper rather than attributing it to the study filter", () => {
    const title = questionTitle({ ...baseQuestion, exam: "es", session: "am1" });
    expect(title).toContain("高度試験共通 午前I");
    expect(title).not.toContain("エンベデッド");
  });
});
