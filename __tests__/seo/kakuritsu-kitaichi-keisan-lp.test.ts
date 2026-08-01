import { describe, expect, it } from "vitest";

import { getKeywordPageBySlug } from "@/data/keywords";
import { getBlogPostBySlug } from "@/data/blog";

// 「確率 計算 解き方 / 期待値 求め方 / 順列 組合せ / 条件付き確率」高ボリューム午前
// ロングテール向けの新規 keyword LP (/keywords/kakuritsu-kitaichi-keisan・indexable・sitemap
// 収録)。既存の計算問題克服記事 `ipa-shiken-keisan-mondai-kokuhuku` は確率・組合せを頻出7
// パターンの1項目として名指しするのみで段階的解法の専用面が不在だった gap を埋める（稼働率
// s119／スループット s120／論理演算 s121 と同型の双方向リンク・追加subsectionは「7パターン」
// framingを変えないadditive）。
describe("確率・期待値計算 keyword LP (kakuritsu-kitaichi-keisan)", () => {
  it("LP が存在し AP/FE 区分と確率・期待値の核を本文に持つ", () => {
    const page = getKeywordPageBySlug("kakuritsu-kitaichi-keisan");
    expect(page).toBeDefined();
    expect(page!.exams).toEqual(expect.arrayContaining(["ap", "fe"]));
    const body = page!.body.join("\n");
    // 順列/組合せ・期待値・条件付き確率（ベイズ）の核が残っている（誇大でない事実ベース）。
    expect(body).toContain("順列");
    expect(body).toContain("組合せ");
    expect(body).toContain("期待値");
    expect(body).toContain("条件付き確率");
    expect(body).toContain("ベイズ");
  });

  it("親記事 keisan-mondai-kokuhuku の確率・組合せ節から LP へ文脈内 inbound が張られている", () => {
    const post = getBlogPostBySlug("ipa-shiken-keisan-mondai-kokuhuku");
    expect(post).toBeDefined();
    expect(post!.body.includes("](/keywords/kakuritsu-kitaichi-keisan)")).toBe(true);
  });

  it("LP から親記事への『さらに深く学ぶ』逆リンク(relatedBlogSlug)が設定されている", () => {
    const page = getKeywordPageBySlug("kakuritsu-kitaichi-keisan");
    expect(page!.relatedBlogSlug).toBe("ipa-shiken-keisan-mondai-kokuhuku");
  });
});
