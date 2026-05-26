import { describe, expect, it } from "vitest";

import { ALL_QUESTIONS } from "@/data/questions";
import {
  checkExplanationConsistency,
  detectAnswerDispute,
  detectStatedAnswerMismatch,
} from "@/lib/questions/explanation-consistency";
import type { Question } from "@/lib/questions/types";

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
    choices: { ア: "A", イ: "B", ウ: "C", エ: "D" },
    answer: "エ",
    explanation: "エが正解です。",
    hasImage: false,
    sourcePdfUrl: "https://example.com/x.pdf",
    license: "IPA-public",
    ...overrides,
  };
}

describe("detectAnswerDispute", () => {
  it("flags an explanation that admits then disputes the official answer", () => {
    expect(
      detectAnswerDispute(
        q({ explanation: "問題の指示によりエが正解とされていますが、真とはなりません。" }),
      ),
    ).not.toBeNull();
  });

  it("flags the おり variant and 'が正解とされているが' phrasing", () => {
    expect(
      detectAnswerDispute(q({ explanation: "エが正解とされておりますが、厳密には異なります。" })),
    ).not.toBeNull();
    expect(
      detectAnswerDispute(q({ explanation: "エが正解とされているが、実際にはそうではない。" })),
    ).not.toBeNull();
  });

  it("flags an explanation claiming the official answer is wrong", () => {
    expect(
      detectAnswerDispute(
        q({ explanation: "消去法ではエだが、公式解答とは異なる見解もある。" }),
      ),
    ).not.toBeNull();
  });

  it("does NOT flag a normal MC explanation that calls a wrong choice 誤り", () => {
    // This is the false-positive class that the broad pattern produced.
    expect(
      detectAnswerDispute(
        q({
          explanation:
            "イが正解です。アは不適切です。ウは一般的に高速な処理が可能となるため、小さいほど高速という記述は誤りです。",
        }),
      ),
    ).toBeNull();
  });
});

describe("detectStatedAnswerMismatch", () => {
  it("flags when the explanation states a different 正解 letter", () => {
    expect(
      detectStatedAnswerMismatch(q({ answer: "エ", explanation: "正解はウです。" })),
    ).not.toBeNull();
  });

  it("does not flag when the stated 正解 matches the key", () => {
    expect(
      detectStatedAnswerMismatch(q({ answer: "エ", explanation: "正解はエです。" })),
    ).toBeNull();
  });
});

describe("corpus is free of answer disputes (CI gate)", () => {
  it("has zero high-confidence dispute findings across all questions", () => {
    const disputes = ALL_QUESTIONS.flatMap((question) =>
      checkExplanationConsistency(question).filter((f) => f.kind === "dispute"),
    );
    expect(disputes.map((d) => d.id)).toEqual([]);
  });
});
