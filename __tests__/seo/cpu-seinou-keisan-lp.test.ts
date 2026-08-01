import { describe, expect, it } from "vitest";

import {
  getKeywordPageBySlug,
  getRelatedKeywordPages,
} from "@/data/keywords";

// 「CPU 性能 計算 / クロック周波数 CPI / MIPS 求め方 / 命令実行時間」高ボリューム午前
// ロングテール向けの新規 keyword LP (/keywords/cpu-seinou-keisan・indexable・sitemap収録)。
// corpus 実測で MIPS/クロック周波数/CPI/命令実行時間 を含む問題ファイルは約88本＝計算 LP
// vein の高ボリュームな gap（専用解法面も blog 言及も不在・基数変換のように mechanical 飽和でない）。
//
// 親記事「頻出7パターン」list 外のため HD-16 path(c) の framing-neutral 経路で配線:
// blog 非接触＋LP→blog 逆リンク＋`/keywords` 索引＋sitemap＋`getRelatedKeywordPages` レール。
// 本 LP は honest なトピック（コンピュータ構成/性能設計/基礎理論）で gaming せず、共有「性能設計」
// で キャッシュ／待ち行列 LP とクラスタ化する。「崩れたら落ちる」核はレール経由の被リンク（orphan 化しない）。
describe("CPU 性能の計算 keyword LP (cpu-seinou-keisan)", () => {
  it("LP が存在し AP/FE 区分と CPU 性能計算の核を本文に持つ", () => {
    const page = getKeywordPageBySlug("cpu-seinou-keisan");
    expect(page).toBeDefined();
    expect(page!.exams).toEqual(expect.arrayContaining(["ap", "fe"]));
    const body = page!.body.join("\n");
    // クロック周波数/クロック周期・CPI・命令実行時間・MIPS の核が残っている（事実ベース）。
    expect(body).toContain("クロック周波数");
    expect(body).toContain("クロック周期");
    expect(body).toContain("CPI");
    expect(body).toContain("MIPS");
  });

  it("LP から親記事への『さらに深く学ぶ』逆リンク(relatedBlogSlug)が設定されている", () => {
    const page = getKeywordPageBySlug("cpu-seinou-keisan");
    expect(page!.relatedBlogSlug).toBe("ipa-shiken-keisan-mondai-kokuhuku");
  });

  it("計算 LP クラスタのレール（他の特集記事）から相互に被リンクされ orphan 化しない", () => {
    // 「性能設計」トピックを共有する キャッシュ LP のレールに本 LP が surface する
    // ＝レール経由の被リンクが入る（共有 ap/fe ×10 ＋ 共有トピック「性能設計」で score 21）。
    const fromCache = getRelatedKeywordPages("cache-jikkou-access", 5).map(
      (p) => p.slug,
    );
    expect(fromCache).toContain("cpu-seinou-keisan");
    // 逆向きも: 本 LP のレールに兄弟計算 LP が並ぶ（相互クラスタ＝dead-end でない）。
    const fromSelf = getRelatedKeywordPages("cpu-seinou-keisan", 5).map(
      (p) => p.slug,
    );
    expect(fromSelf).toContain("cache-jikkou-access");
  });
});
