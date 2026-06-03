import { describe, expect, it } from "vitest";

import { getKeywordPageBySlug } from "@/data/keywords";
import { getBlogPostBySlug } from "@/data/blog";

// 「計算量 オーダ 求め方 / O記法 見積り / アルゴリズム 計算量」高ボリューム午前・科目B
// ロングテール向けの新規 keyword LP (/keywords/keisanryou-order・indexable・sitemap収録)。
// 既存の計算問題克服記事 `ipa-shiken-keisan-mondai-kokuhuku` はアルゴリズム計算量を頻出7
// パターンの1項目として名指しするのみで段階的解法の専用面が不在だった gap を埋める（稼働率
// s119／スループット s120／論理演算 s121／確率 と同型の双方向リンク・追加subsection は
// 「7パターン」framing を変えない additive）。
describe("計算量オーダ記法 keyword LP (keisanryou-order)", () => {
  it("LP が存在し AP/FE 区分とオーダ記法の核を本文に持つ", () => {
    const page = getKeywordPageBySlug("keisanryou-order");
    expect(page).toBeDefined();
    expect(page!.exams).toEqual(expect.arrayContaining(["ap", "fe"]));
    const body = page!.body.join("\n");
    // O記法・代表オーダ・二分探索・ループ見積り の核が残っている（誇大でない事実ベース）。
    expect(body).toContain("O 記法");
    expect(body).toContain("O(log n)");
    expect(body).toContain("O(n²)");
    expect(body).toContain("二分探索");
    expect(body).toContain("入れ子");
  });

  it("親記事 keisan-mondai-kokuhuku の計算量節から LP へ文脈内 inbound が張られている", () => {
    const post = getBlogPostBySlug("ipa-shiken-keisan-mondai-kokuhuku");
    expect(post).toBeDefined();
    expect(post!.body.includes("](/keywords/keisanryou-order)")).toBe(true);
  });

  it("LP から親記事への『さらに深く学ぶ』逆リンク(relatedBlogSlug)が設定されている", () => {
    const page = getKeywordPageBySlug("keisanryou-order");
    expect(page!.relatedBlogSlug).toBe("ipa-shiken-keisan-mondai-kokuhuku");
  });
});
