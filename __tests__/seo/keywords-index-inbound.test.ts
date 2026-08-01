import { describe, expect, it } from "vitest";

import { getBlogPostBySlug } from "@/data/blog";

// /keywords 索引（学習トピック特集記事一覧）は blog 全本文から文脈内 inbound が
// ゼロの gap だった（footer/sitemap/breadcrumb のみ）。cross-exam ハブ記事
// ipa-kyoutsuu-juyou-theme のコアテーマ（サブネット計算・正規化・EVM・論文構成）は
// keyword LP と厳密一致＝最も自然な home として「横断学習の実践方法」節から
// /keywords へ送客した。この文脈内 inbound が消えない（orphan に戻らない）ことを pin する。

const HOME_SLUG = "ipa-kyoutsuu-juyou-theme";

describe("/keywords 索引への文脈内 inbound", () => {
  it("共通テーマ ハブ記事が /keywords 索引へ本文リンクしている", () => {
    const post = getBlogPostBySlug(HOME_SLUG);
    expect(post, `${HOME_SLUG} が存在しない`).toBeDefined();
    // markdown リンク形式で /keywords 索引（個別 LP ではなく索引そのもの）へ送客
    expect(
      post!.body.includes("](/keywords)"),
      "共通テーマ記事から /keywords 索引への文脈内リンクが無い",
    ).toBe(true);
  });
});
