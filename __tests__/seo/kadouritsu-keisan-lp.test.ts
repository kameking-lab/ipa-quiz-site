import { describe, expect, it } from "vitest";

import { getKeywordPageBySlug } from "@/data/keywords";
import { getBlogPostBySlug } from "@/data/blog";

// 「稼働率 計算 やり方」高ボリューム午前ロングテール向けの新規 keyword LP
// (/keywords/kadouritsu-keisan・indexable・sitemap収録)。既存の計算問題克服記事
// `ipa-shiken-keisan-mondai-kokuhuku` は稼働率を1行(公式)でしか扱わず、段階的な
// 解法(MTBF/MTTR導出・直列＝積・並列＝1-(1-p)^n・複合系)の専用面が不在だった gap を埋める。
// LP本文の核(公式)と、親記事との双方向リンク(s54-55/s57 パターン)が消えないよう pin する。
describe("稼働率計算 keyword LP (kadouritsu-keisan)", () => {
  it("LP が存在し AP/FE 区分と稼働率公式の核を本文に持つ", () => {
    const page = getKeywordPageBySlug("kadouritsu-keisan");
    expect(page).toBeDefined();
    expect(page!.exams).toEqual(expect.arrayContaining(["ap", "fe"]));
    const body = page!.body.join("\n");
    // MTBF/MTTR 導出・直列(積)・並列(1-(1-p)^n) の核が残っている（誇大でない事実ベース）。
    expect(body).toContain("MTBF");
    expect(body).toContain("MTTR");
    expect(body).toContain("1 −（1 − p）^n");
  });

  it("親記事 keisan-mondai-kokuhuku の稼働率節から LP へ文脈内 inbound が張られている", () => {
    const post = getBlogPostBySlug("ipa-shiken-keisan-mondai-kokuhuku");
    expect(post).toBeDefined();
    expect(post!.body.includes("](/keywords/kadouritsu-keisan)")).toBe(true);
  });

  it("LP から親記事への『さらに深く学ぶ』逆リンク(relatedBlogSlug)が設定されている", () => {
    const page = getKeywordPageBySlug("kadouritsu-keisan");
    expect(page!.relatedBlogSlug).toBe("ipa-shiken-keisan-mondai-kokuhuku");
  });
});
