import { describe, expect, it } from "vitest";

import { getKeywordPageBySlug } from "@/data/keywords";
import { getBlogPostBySlug } from "@/data/blog";

// 「スループット 計算 解き方 / 転送時間 求め方」高ボリューム午前ロングテール向けの
// 新規 keyword LP (/keywords/throughput-keisan・indexable・sitemap収録)。既存の計算問題
// 克服記事 `ipa-shiken-keisan-mondai-kokuhuku` はスループットを1行(公式)でしか扱わず、
// ビット／バイト変換・伝送効率・転送時間の段階的な解法の専用面が不在だった gap を埋める
// (稼働率 LP=s119 と同型の双方向リンク・s54-55/s57 パターン)。
describe("スループット計算 keyword LP (throughput-keisan)", () => {
  it("LP が存在し AP/FE 区分とスループット計算の核を本文に持つ", () => {
    const page = getKeywordPageBySlug("throughput-keisan");
    expect(page).toBeDefined();
    expect(page!.exams).toEqual(expect.arrayContaining(["ap", "fe"]));
    const body = page!.body.join("\n");
    // ビット／バイト変換(8)・伝送効率(実効速度)・転送時間 の核が残っている（誇大でない事実ベース）。
    expect(body).toContain("8 ビット");
    expect(body).toContain("伝送効率");
    expect(body).toContain("実効速度");
    expect(body).toContain("転送時間");
  });

  it("親記事 keisan-mondai-kokuhuku のスループット節から LP へ文脈内 inbound が張られている", () => {
    const post = getBlogPostBySlug("ipa-shiken-keisan-mondai-kokuhuku");
    expect(post).toBeDefined();
    expect(post!.body.includes("](/keywords/throughput-keisan)")).toBe(true);
  });

  it("LP から親記事への『さらに深く学ぶ』逆リンク(relatedBlogSlug)が設定されている", () => {
    const page = getKeywordPageBySlug("throughput-keisan");
    expect(page!.relatedBlogSlug).toBe("ipa-shiken-keisan-mondai-kokuhuku");
  });
});
