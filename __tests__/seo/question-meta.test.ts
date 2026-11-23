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
  it.each([baseQuestion.question, "あ".repeat(300), "次はどれか。"])("leads with the stem and explains what the page includes", question => {
    const snippet = questionSnippet({ ...baseQuestion, question });
    expect(snippet.startsWith(question.slice(0, 7))).toBe(true);
    expect(snippet).toContain("答えと解説");
    expect(snippet).toContain("問1");
    expect(snippet).not.toContain("正解はウ");
    expect(snippet.length).toBeGreaterThanOrEqual(80);
    expect(snippet.length).toBeLessThanOrEqual(110);
  });
});

describe("questionTitle", () => {
  it.each([baseQuestion.question, "図の説明で正しいのはどれか。", "あ".repeat(80)])("leads with the stem and identifies the source question", question => {
    const title = questionTitle({ ...baseQuestion, question });
    expect(title.startsWith(question.slice(0, 6))).toBe(true);
    expect(title).toContain("｜答えと解説｜");
    expect(title).toContain("問1");
    expect(title).toContain("春期");
    expect(title.length).toBeLessThanOrEqual(42);
  });

  it("identifies AM1 as a common paper", () => {
    const title = questionTitle({ ...baseQuestion, exam: "es", session: "am1" });
    expect(title).toContain("高度試験共通");
    expect(title).toContain("午前I");
    expect(title).not.toContain("エンベデッド");
  });
});
