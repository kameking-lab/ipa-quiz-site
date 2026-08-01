import { describe, expect, it } from "vitest";

import {
  getKeywordPageBySlug,
  getRelatedKeywordPages,
} from "@/data/keywords";

// 「2の補数 求め方 / 負数 表現 / オーバーフロー 判定」高ボリューム午前ロングテール向けの
// 新規 keyword LP (/keywords/hosuu-keisan・indexable・sitemap収録)。corpus 実測で補数/負数/
// オーバーフロー/符号付き を含む問題ファイルは40本・全区分に分布＝高ボリューム実需。
//
// 既存5本の計算 LP（稼働率/スループット/論理演算/確率/計算量）と異なり、本 LP は親記事
// `ipa-shiken-keisan-mondai-kokuhuku` の「頻出7パターン」list 外（2の補数は named pattern で
// ない）のため、HD-16 path(c) の framing-neutral 経路で配線する: blog は一切触らず（「7パターン」
// framing 不変）、LP→blog 逆リンク(relatedBlogSlug)＋ `/keywords` 索引＋sitemap＋
// `getRelatedKeywordPages` の「他の特集記事」レール（共有 ap/fe で score 20）のみで discoverable に
// する。よって本テストの「崩れたら落ちる」核は blog inbound ではなく、レール経由の被リンク
// （orphan 化しないこと）。exams を ap/fe から外す等の回帰でレール被リンクが切れたら fail する。
describe("2の補数 keyword LP (hosuu-keisan)", () => {
  it("LP が存在し AP/FE 区分と2の補数の核を本文に持つ", () => {
    const page = getKeywordPageBySlug("hosuu-keisan");
    expect(page).toBeDefined();
    expect(page!.exams).toEqual(expect.arrayContaining(["ap", "fe"]));
    const body = page!.body.join("\n");
    // 負数の作り方・表現範囲・オーバーフローの核が残っている（誇大でない事実ベース）。
    expect(body).toContain("反転");
    expect(body).toContain("符号ビット");
    expect(body).toContain("オーバーフロー");
    expect(body).toContain("−128");
  });

  it("LP から親記事への『さらに深く学ぶ』逆リンク(relatedBlogSlug)が設定されている", () => {
    const page = getKeywordPageBySlug("hosuu-keisan");
    expect(page!.relatedBlogSlug).toBe("ipa-shiken-keisan-mondai-kokuhuku");
  });

  it("計算 LP クラスタのレール（他の特集記事）から相互に被リンクされ orphan 化しない", () => {
    // 「基礎理論」トピックを共有する兄弟計算 LP（論理演算 LP）のレールに本 LP が surface する
    // ＝レール経由の被リンクが入る（共有 ap/fe ×10 ＋ 共有トピック「基礎理論」で score 21）。
    const fromRonri = getRelatedKeywordPages("ronri-enzan-keisan", 5).map(
      (p) => p.slug,
    );
    expect(fromRonri).toContain("hosuu-keisan");
    // 逆向きも: 本 LP のレールに兄弟計算 LP が並ぶ（相互クラスタ＝dead-end でない）。
    const fromSelf = getRelatedKeywordPages("hosuu-keisan", 5).map((p) => p.slug);
    expect(fromSelf).toEqual(
      expect.arrayContaining(["ronri-enzan-keisan", "kakuritsu-kitaichi-keisan"]),
    );
  });
});
