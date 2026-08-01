import { describe, expect, it } from "vitest";

import {
  getKeywordPageBySlug,
  getRelatedKeywordPages,
} from "@/data/keywords";

// 「情報量 計算 / エントロピー 求め方 / ハフマン符号 平均符号長 / log2 ビット」高ボリューム午前
// ロングテール向けの新規 keyword LP (/keywords/johoryo-huffman-keisan・indexable・sitemap収録)。
// corpus 実測で 情報量/エントロピー/ハフマン を含む問題ファイルは約27本＝計算 LP vein の
// honest かつ高 pain な gap（log₂・重み付き平均が genuine な午前つまずき点・mechanical 飽和でない）。
//
// 親記事「頻出7パターン」list 外のため HD-16 path(c) の framing-neutral 経路で配線:
// blog 非接触＋LP→blog 逆リンク＋`/keywords` 索引＋sitemap＋`getRelatedKeywordPages` レール。
// 本 LP は honest なトピック（情報理論/符号化/基礎理論）で gaming せず、共有「基礎理論」で
// 論理演算 LP 等とクラスタ化する。「崩れたら落ちる」核はレール経由の被リンク（orphan 化しない）。
describe("情報量・ハフマン符号の計算 keyword LP (johoryo-huffman-keisan)", () => {
  it("LP が存在し AP/FE 区分と情報量計算の核を本文に持つ", () => {
    const page = getKeywordPageBySlug("johoryo-huffman-keisan");
    expect(page).toBeDefined();
    expect(page!.exams).toEqual(expect.arrayContaining(["ap", "fe"]));
    const body = page!.body.join("\n");
    // log₂・平均情報量(エントロピー)・ハフマン符号の平均符号長 の核が残っている（事実ベース）。
    expect(body).toContain("log₂");
    expect(body).toContain("エントロピー");
    expect(body).toContain("ハフマン");
    expect(body).toContain("平均符号長");
  });

  it("LP から親記事への『さらに深く学ぶ』逆リンク(relatedBlogSlug)が設定されている", () => {
    const page = getKeywordPageBySlug("johoryo-huffman-keisan");
    expect(page!.relatedBlogSlug).toBe("ipa-shiken-keisan-mondai-kokuhuku");
  });

  it("計算 LP クラスタのレール（他の特集記事）から相互に被リンクされ orphan 化しない", () => {
    // 「基礎理論」トピックを共有する 論理演算 LP のレールに本 LP が surface する
    // ＝レール経由の被リンクが入る（共有 ap/fe ×10 ＋ 共有トピック「基礎理論」で score 21）。
    const fromRonri = getRelatedKeywordPages("ronri-enzan-keisan", 5).map(
      (p) => p.slug,
    );
    expect(fromRonri).toContain("johoryo-huffman-keisan");
    // 逆向きも: 本 LP のレールに兄弟計算 LP が並ぶ（相互クラスタ＝dead-end でない）。
    const fromSelf = getRelatedKeywordPages("johoryo-huffman-keisan", 5).map(
      (p) => p.slug,
    );
    expect(fromSelf).toContain("ronri-enzan-keisan");
  });
});
