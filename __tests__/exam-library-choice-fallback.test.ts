import { createHash } from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.doUnmock("@/data/exam-library/choice-explanations.json");
  vi.resetModules();
});

describe("structured choice explanation loader fallback", () => {
  it("keeps the original question and plain explanation when an authored overlay is stale", async () => {
    const { loadExamPaper } = await import("@/lib/exam-library-papers");
    const original = loadExamPaper("cskohyo-CS20251901")![0]!;
    expect(original.explanation).toBeTruthy();
    vi.resetModules();
    vi.doMock("@/data/exam-library/choice-explanations.json", () => ({
      default: {
        [original.id]: {
          sourceHash: "0".repeat(64),
          correctChoice: original.correctChoice,
          summary: "現在の原文と一致しない、以前の設問に対して作成された構造化解説です。",
          choices: [1, 2, 3, 4, 5].map((number) => ({
            number,
            verdict: number === original.correctChoice ? "correct" : "incorrect",
            reason: `選択肢${number}の具体的な説明ですが、原文の変更前の条件に基づく内容のため表示せず既存解説に戻す必要があります。`,
          })),
          sources: [{ title: "労働安全衛生法", url: "https://laws.e-gov.go.jp/law/347AC0000000057" }],
        },
      },
    }));
    const { loadExamPaper: loadWithStaleOverlay } = await import("@/lib/exam-library-papers");
    const fallback = loadWithStaleOverlay("cskohyo-CS20251901")![0]!;
    expect(fallback.choiceExplanation).toBeUndefined();
    expect(fallback.text).toBe(original.text);
    expect(fallback.correctChoice).toBe(original.correctChoice);
    expect(fallback.explanation).toBe(original.explanation);
  });

  it("does not partially attach an overlay when one of five choice reasons is missing", async () => {
    const { loadExamPaper } = await import("@/lib/exam-library-papers");
    const original = loadExamPaper("cskohyo-CS20251901")![0]!;
    const sourceHash = createHash("sha256").update(original.text).digest("hex");
    vi.resetModules();
    vi.doMock("@/data/exam-library/choice-explanations.json", () => ({
      default: {
        [original.id]: {
          sourceHash,
          correctChoice: original.correctChoice,
          summary: "現行の問題文に対応していますが、五つの理由がそろっていない不完全な構造化解説です。",
          choices: [1, 2, 3, 4].map((number) => ({
            number,
            verdict: number === original.correctChoice ? "correct" : "incorrect",
            reason: `選択肢${number}の理由だけが登録されており、選択肢5の説明が欠けているため全体を表示してはいけません。`,
          })),
          sources: [{ title: "労働安全衛生法", url: "https://laws.e-gov.go.jp/law/347AC0000000057" }],
        },
      },
    }));
    const { loadExamPaper: loadWithIncompleteOverlay } = await import("@/lib/exam-library-papers");
    const fallback = loadWithIncompleteOverlay("cskohyo-CS20251901")![0]!;
    expect(fallback.choiceExplanation).toBeUndefined();
    expect(fallback.explanation).toBe(original.explanation);
  });
});
