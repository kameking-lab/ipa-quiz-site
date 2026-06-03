import { describe, expect, it } from "vitest";

import {
  getKeywordPageBySlug,
  getRelatedKeywordPages,
} from "@/data/keywords";

// 「浮動小数点 誤差 / 桁落ち 情報落ち 違い / 丸め誤差 打切り誤差 見分け方」午前ロングテール
// 向けの新規 keyword LP (/keywords/fukushousuten-gosa-keisan・indexable・sitemap収録)。
// corpus 実測で 浮動小数点/桁落ち/情報落ち を含む AP/FE 午前問題ファイルは約16本＝計算 LP vein の
// honest かつ高 pain な gap（桁落ち⇔情報落ち の取り違えが頻発・概念見分け型で web 飽和でない）。
//
// 親記事「頻出7パターン」list 外のため HD-16 path(c) の framing-neutral 経路で配線:
// blog 非接触＋LP→blog 逆リンク＋`/keywords` 索引＋sitemap＋`getRelatedKeywordPages` レール。
// 本 LP は honest なトピック（浮動小数点/データ表現/基礎理論）で gaming せず、共有「データ表現／基礎理論」
// で 2の補数 LP とクラスタ化する。「崩れたら落ちる」核はレール経由の被リンク（orphan 化しない）。
describe("浮動小数点の誤差 keyword LP (fukushousuten-gosa-keisan)", () => {
  it("LP が存在し AP/FE 区分と4誤差の核を本文に持つ", () => {
    const page = getKeywordPageBySlug("fukushousuten-gosa-keisan");
    expect(page).toBeDefined();
    expect(page!.exams).toEqual(expect.arrayContaining(["ap", "fe"]));
    const body = page!.body.join("\n");
    // 丸め誤差・打切り誤差・桁落ち・情報落ち の4誤差の核が残っている（事実ベース）。
    expect(body).toContain("丸め誤差");
    expect(body).toContain("打切り誤差");
    expect(body).toContain("桁落ち");
    expect(body).toContain("情報落ち");
  });

  it("LP から親記事への『さらに深く学ぶ』逆リンク(relatedBlogSlug)が設定されている", () => {
    const page = getKeywordPageBySlug("fukushousuten-gosa-keisan");
    expect(page!.relatedBlogSlug).toBe("ipa-shiken-keisan-mondai-kokuhuku");
  });

  it("計算 LP クラスタのレール（他の特集記事）から相互に被リンクされ orphan 化しない", () => {
    // 「データ表現／基礎理論」を共有する 2の補数 LP のレールに本 LP が surface する
    // ＝レール経由の被リンクが入る（共有 ap/fe ×10 ＋ 共有トピック2つで score 22）。
    const fromHosuu = getRelatedKeywordPages("hosuu-keisan", 5).map(
      (p) => p.slug,
    );
    expect(fromHosuu).toContain("fukushousuten-gosa-keisan");
    // 逆向きも: 本 LP のレールに兄弟計算 LP が並ぶ（相互クラスタ＝dead-end でない）。
    const fromSelf = getRelatedKeywordPages("fukushousuten-gosa-keisan", 5).map(
      (p) => p.slug,
    );
    expect(fromSelf).toContain("hosuu-keisan");
  });
});
