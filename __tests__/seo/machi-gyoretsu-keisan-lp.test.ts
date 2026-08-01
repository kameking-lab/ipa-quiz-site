import { describe, expect, it } from "vitest";

import {
  getKeywordPageBySlug,
  getRelatedKeywordPages,
} from "@/data/keywords";

// 「待ち行列 求め方 / M/M/1 計算 / 利用率 平均待ち時間」高ボリューム午前ロングテール向けの
// 新規 keyword LP (/keywords/machi-gyoretsu-keisan・indexable・sitemap収録)。corpus 実測で
// 待ち行列/M/M/1/平均待ち時間/到着率 を含む問題ファイルは62本・全区分に分布＝高ボリューム実需
// だが専用解法面・blog 言及ともに不在だった gap を埋める。
//
// 2の補数 LP (hosuu-keisan) と同じく、親記事 `ipa-shiken-keisan-mondai-kokuhuku` の「頻出7
// パターン」list 外（待ち行列は named pattern でない）のため、HD-16 path(c) の framing-neutral
// 経路で配線する: blog は一切触らず（「7パターン」framing 不変）、LP→blog 逆リンク
// (relatedBlogSlug)＋`/keywords` 索引＋sitemap＋`getRelatedKeywordPages` レール（共有「基礎理論」
// トピックで論理演算/確率/2の補数 LP から被リンク）のみで discoverable にする。よって本テストの
// 「崩れたら落ちる」核は blog inbound ではなくレール経由の被リンク（orphan 化しないこと）。
describe("待ち行列(M/M/1) keyword LP (machi-gyoretsu-keisan)", () => {
  it("LP が存在し AP/FE 区分と待ち行列の核を本文に持つ", () => {
    const page = getKeywordPageBySlug("machi-gyoretsu-keisan");
    expect(page).toBeDefined();
    expect(page!.exams).toEqual(expect.arrayContaining(["ap", "fe"]));
    const body = page!.body.join("\n");
    // 利用率・平均待ち時間の公式・平均応答時間・利用率の非線形性 の核が残っている（事実ベース）。
    expect(body).toContain("利用率");
    expect(body).toContain("平均待ち時間");
    expect(body).toContain("平均応答時間");
    expect(body).toContain("到着率");
  });

  it("LP から親記事への『さらに深く学ぶ』逆リンク(relatedBlogSlug)が設定されている", () => {
    const page = getKeywordPageBySlug("machi-gyoretsu-keisan");
    expect(page!.relatedBlogSlug).toBe("ipa-shiken-keisan-mondai-kokuhuku");
  });

  it("計算 LP クラスタのレール（他の特集記事）から相互に被リンクされ orphan 化しない", () => {
    // 「基礎理論」トピックを共有する兄弟計算 LP（論理演算 LP）のレールに本 LP が surface する
    // ＝レール経由の被リンクが入る（共有 ap/fe ×10 ＋ 共有トピック「基礎理論」で score 21）。
    const fromRonri = getRelatedKeywordPages("ronri-enzan-keisan", 5).map(
      (p) => p.slug,
    );
    expect(fromRonri).toContain("machi-gyoretsu-keisan");
    // 逆向きも: 本 LP のレールに兄弟計算 LP が並ぶ（相互クラスタ＝dead-end でない）。
    const fromSelf = getRelatedKeywordPages("machi-gyoretsu-keisan", 5).map(
      (p) => p.slug,
    );
    expect(fromSelf).toEqual(
      expect.arrayContaining(["ronri-enzan-keisan", "kakuritsu-kitaichi-keisan"]),
    );
  });
});
