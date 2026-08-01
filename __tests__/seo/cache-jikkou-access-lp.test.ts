import { describe, expect, it } from "vitest";

import {
  getKeywordPageBySlug,
  getRelatedKeywordPages,
} from "@/data/keywords";

// 「キャッシュ 実効アクセス時間 求め方 / ヒット率 計算 / 重み付き平均」高ボリューム午前
// ロングテール向けの新規 keyword LP (/keywords/cache-jikkou-access・indexable・sitemap収録)。
// corpus 実測で 実効アクセス時間/ヒット率/キャッシュメモリ を含む問題ファイルは180本＝計算 LP
// vein で最大ボリュームの gap（専用解法面も blog 言及も不在）。
//
// 親記事「頻出7パターン」list 外のため HD-16 path(c) の framing-neutral 経路で配線:
// blog 非接触＋LP→blog 逆リンク＋`/keywords` 索引＋sitemap＋`getRelatedKeywordPages` レール。
// 本 LP は honest なトピック（記憶階層/性能設計/コンピュータ構成）で gaming せず、共有「性能設計」
// で 待ち行列 LP とクラスタ化する。「崩れたら落ちる」核はレール経由の被リンク（orphan 化しない）。
describe("キャッシュ実効アクセス時間 keyword LP (cache-jikkou-access)", () => {
  it("LP が存在し AP/FE 区分と実効アクセス時間の核を本文に持つ", () => {
    const page = getKeywordPageBySlug("cache-jikkou-access");
    expect(page).toBeDefined();
    expect(page!.exams).toEqual(expect.arrayContaining(["ap", "fe"]));
    const body = page!.body.join("\n");
    // ヒット率/ミス率・実効アクセス時間の公式・重み付き平均 の核が残っている（事実ベース）。
    expect(body).toContain("ヒット率");
    expect(body).toContain("ミス率");
    expect(body).toContain("実効アクセス時間");
    expect(body).toContain("重み付き平均");
  });

  it("LP から親記事への『さらに深く学ぶ』逆リンク(relatedBlogSlug)が設定されている", () => {
    const page = getKeywordPageBySlug("cache-jikkou-access");
    expect(page!.relatedBlogSlug).toBe("ipa-shiken-keisan-mondai-kokuhuku");
  });

  it("計算 LP クラスタのレール（他の特集記事）から相互に被リンクされ orphan 化しない", () => {
    // 「性能設計」トピックを共有する 待ち行列 LP のレールに本 LP が surface する
    // ＝レール経由の被リンクが入る（共有 ap/fe ×10 ＋ 共有トピック「性能設計」で score 21）。
    const fromMachi = getRelatedKeywordPages("machi-gyoretsu-keisan", 5).map(
      (p) => p.slug,
    );
    expect(fromMachi).toContain("cache-jikkou-access");
    // 逆向きも: 本 LP のレールに兄弟計算 LP が並ぶ（相互クラスタ＝dead-end でない）。
    const fromSelf = getRelatedKeywordPages("cache-jikkou-access", 5).map(
      (p) => p.slug,
    );
    expect(fromSelf).toContain("machi-gyoretsu-keisan");
  });
});
