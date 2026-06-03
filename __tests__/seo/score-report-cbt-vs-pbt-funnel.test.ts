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

describe("結果確認記事の CBT 移行 → cbt-vs-pbt funnel", () => {
  it("記事が存在する", () => {
    expect(getBlogPostBySlug(SLUG), `${SLUG} が存在しない`).toBeDefined();
  });

  it("令和8年度の CBT 移行（予定）に触れている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("令和8年度（2026年度）");
    expect(body).toContain("CBT 方式への移行");
  });

  it("canonical 解説 cbt-vs-pbt へ内部リンクで funnel している", () => {
    expect(getBlogPostBySlug(SLUG)!.body).toContain(
      "/blog/ipa-shiken-cbt-vs-pbt",
    );
  });

  it("移行内容の durable fact（時間変更なし・科目A／科目B 名称）を断定せず述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("各試験時間に変更はなく");
    expect(body).toContain("午前→科目A・午後→科目B");
  });
});
