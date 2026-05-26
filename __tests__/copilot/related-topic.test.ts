import { describe, expect, it } from "vitest";

import {
  sharesTopicOrCategory,
  topicRelevanceMultiplier,
} from "@/lib/copilot/related";

const current = {
  category: "基礎理論",
  topicTags: ["情報量・符号化", "オートマトン"],
};

describe("sharesTopicOrCategory", () => {
  it("is true when the category matches", () => {
    expect(
      sharesTopicOrCategory(
        { category: "基礎理論", topicTags: ["別タグ"] },
        current.category,
        current.topicTags,
      ),
    ).toBe(true);
  });

  it("is true when at least one topic tag overlaps", () => {
    expect(
      sharesTopicOrCategory(
        { category: "ネットワーク", topicTags: ["情報量・符号化"] },
        current.category,
        current.topicTags,
      ),
    ).toBe(true);
  });

  it("is false for a different subfield (e.g. 音声サンプリング vs 可変長符号化)", () => {
    expect(
      sharesTopicOrCategory(
        { category: "コンピュータシステム", topicTags: ["音声・画像処理"] },
        current.category,
        current.topicTags,
      ),
    ).toBe(false);
  });

  it("is false when there is no viewing context", () => {
    expect(
      sharesTopicOrCategory({ category: "基礎理論", topicTags: ["x"] }, undefined, undefined),
    ).toBe(false);
  });
});

describe("topicRelevanceMultiplier", () => {
  it("lifts same-category candidates", () => {
    expect(
      topicRelevanceMultiplier(
        { category: "基礎理論", topicTags: [] },
        current.category,
        [],
      ),
    ).toBeCloseTo(1.5);
  });

  it("compounds with topic-tag overlap", () => {
    const m = topicRelevanceMultiplier(
      { category: "基礎理論", topicTags: ["情報量・符号化", "オートマトン"] },
      current.category,
      current.topicTags,
    );
    // 1.5 (category) * (1 + 0.2*2) = 1.5 * 1.4
    expect(m).toBeCloseTo(2.1);
  });

  it("is neutral (1) for an unrelated candidate", () => {
    expect(
      topicRelevanceMultiplier(
        { category: "ネットワーク", topicTags: ["ルーティング"] },
        current.category,
        current.topicTags,
      ),
    ).toBe(1);
  });
});
