import { describe, expect, it } from "vitest";

import { getBlogPostBySlug } from "@/data/blog";

// cbt-goukaku-happyou-score-report（受験後の結果確認・合格発表）は「応用情報・高度試験は
// どうなる？」節で令和8年度の CBT 移行（予定）に触れているが、移行で何が変わるかを整理した
// canonical な解説記事 cbt-vs-pbt へは未リンクで、IPA 公式と申込フロー記事へしか送客して
// いなかった（s131 が ipa-saishin-doukou で塞いだのと同型の hub→spoke funnel gap）。
// cbt-vs-pbt は s129 で「試験時間は変更なし／午前→科目A・午後→科目B／予約枠制」の
// durable fact を反映済みなので、移行に触れる本記事から canonical 解説へ funnel するのが
// 読者の自然な次の一歩。この内部リンクが入っていることを pin する（崩れたら落ちる）。

const SLUG = "cbt-goukaku-happyou-score-report";

describe("結果確認記事の通年CBTとAP・高度・SCの日程の区別", () => {
  it("記事が存在する", () => {
    expect(getBlogPostBySlug(SLUG), `${SLUG} が存在しない`).toBeDefined();
  });

  it("AP・高度・SCの2026年度の結果照会を区別して案内する", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("AP・高度・支援士は別の日程");
    expect(body).toContain("AP・高度・SCの2026年度案内");
  });

  it("結果照会の日程を公式の実施案内へ直接つなぐ", () => {
    expect(getBlogPostBySlug(SLUG)!.body).toContain(
      "https://www.ipa.go.jp/shiken/2026/ap_koudo_sc_kikan.html",
    );
  });

  it("科目A群と科目B群の結果を区別し通年CBTの照会時期を当てはめない", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("科目A群の結果表示と科目B群の成績照会を分けています");
    expect(body).toContain("IP・SG・FEのスコアレポートの時期をそのまま当てはめず");
  });
});
