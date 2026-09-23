import { describe, expect, it } from "vitest";
import { applyChoiceExplanationOverlay } from "@/lib/questions/apply-choice-explanations";
import type { Question } from "@/lib/questions/types";

const question: Question = {
  id: "ap-2025a-am-q1",
  exam: "ap",
  session: "am",
  year: 2025,
  season: "autumn",
  qNumber: 1,
  type: "multiple-choice",
  category: "基礎理論",
  topicTags: [],
  difficulty: 3,
  question: "問題文",
  choices: { ア: "選択肢A", イ: "選択肢B", ウ: "選択肢C", エ: "選択肢D" },
  answer: "ウ",
  explanation: "正答全体の解説です。",
  hasImage: false,
  sourcePdfUrl: "https://www.ipa.go.jp/shiken/",
  license: "IPA-public",
};

const complete = {
  ア: "誤りです。この選択肢は設問で求める条件とは異なる対象を説明しているため、結論に当てはまりません。",
  イ: "誤りです。この選択肢の前提では必要な条件が一つ不足し、設問の結果を導くことができません。",
  ウ: "正しいです。この選択肢だけが設問に示された全条件を満たし、公式正答の結論と一致します。",
  エ: "誤りです。この選択肢は処理の順序を逆にしており、設問に示された結果とは一致しません。",
};

describe("applyChoiceExplanationOverlay", () => {
  it("attaches one substantive reason to every displayed choice", () => {
    const [result] = applyChoiceExplanationOverlay([question], { [question.id]: complete });
    expect(result.choiceExplanations).toEqual(complete);
    expect(question.choiceExplanations).toBeUndefined();
  });

  it("rejects a partial overlay instead of silently publishing it", () => {
    expect(() => applyChoiceExplanationOverlay([question], {
      [question.id]: { ...complete, エ: undefined },
    })).toThrow(/short choice explanation|keys differ/);
  });

  it("rejects stale question ids", () => {
    expect(() => applyChoiceExplanationOverlay([question], { unknown: complete }))
      .toThrow(/orphan choice explanation/);
  });
});
