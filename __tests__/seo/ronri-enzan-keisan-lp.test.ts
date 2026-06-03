import { describe, expect, it } from "vitest";

import { getKeywordPageBySlug } from "@/data/keywords";
import { getBlogPostBySlug } from "@/data/blog";

// 「論理演算 計算 解き方 / 真理値表 求め方 / ビットマスク」高ボリューム午前ロングテール
// 向けの新規 keyword LP (/keywords/ronri-enzan-keisan・indexable・sitemap収録)。既存の計算
// 問題克服記事 `ipa-shiken-keisan-mondai-kokuhuku` は論理演算を頻出7パターンの1項目として
// 名指しするのみで段階的解法の専用面が不在だった gap を埋める（稼働率 s119／スループット s120
// と同型の双方向リンク・追加subsectionは「7パターン」framingを変えないadditive）。
describe("論理演算計算 keyword LP (ronri-enzan-keisan)", () => {
  it("LP が存在し AP/FE 区分と論理演算の核を本文に持つ", () => {
    const page = getKeywordPageBySlug("ronri-enzan-keisan");
    expect(page).toBeDefined();
    expect(page!.exams).toEqual(expect.arrayContaining(["ap", "fe"]));
    const body = page!.body.join("\n");
    // 真理値表・AND/OR/XOR・ビットマスク・ド・モルガン の核が残っている（誇大でない事実ベース）。
    expect(body).toContain("真理値表");
    expect(body).toContain("XOR");
    expect(body).toContain("ビットマスク");
    expect(body).toContain("ド・モルガン");
  });

  it("親記事 keisan-mondai-kokuhuku の論理演算節から LP へ文脈内 inbound が張られている", () => {
    const post = getBlogPostBySlug("ipa-shiken-keisan-mondai-kokuhuku");
    expect(post).toBeDefined();
    expect(post!.body.includes("](/keywords/ronri-enzan-keisan)")).toBe(true);
  });

  it("LP から親記事への『さらに深く学ぶ』逆リンク(relatedBlogSlug)が設定されている", () => {
    const page = getKeywordPageBySlug("ronri-enzan-keisan");
    expect(page!.relatedBlogSlug).toBe("ipa-shiken-keisan-mondai-kokuhuku");
  });
});
