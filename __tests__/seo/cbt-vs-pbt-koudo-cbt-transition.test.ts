import { describe, expect, it } from "vitest";

import { getBlogPostBySlug } from "@/data/blog";

// 2026年度のAP・高度・SCは前期・後期に期間制CBTとして実施される。
// 試験時間と出題形式は維持し、午前・午後は科目A・Bへ改称。
// 実施期間と名称の誤案内が戻らないよう確認する。

const SLUG = "ipa-shiken-cbt-vs-pbt";
const IPA_OFFICIAL =
  "https://www.ipa.go.jp/shiken/2026/ap_koudo_sc_kikan.html";

describe("CBT/PBT 記事の応用情報・高度試験 CBT 移行 是正", () => {
  it("記事が存在する", () => {
    expect(getBlogPostBySlug(SLUG), `${SLUG} が存在しない`).toBeDefined();
  });

  it("2026年度の期間制CBT実施を述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("2026年度前期・後期にCBT方式で実施");
    expect(body).toContain("申込受付と科目群ごとの実施期間");
  });

  it("IPA 公式の durable fact（試験時間は変更なし・科目A／科目B 名称）を述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("各試験時間に変更はありません");
    expect(body).toContain("科目A試験");
    expect(body).toContain("科目B試験");
  });

  it("出典として IPA 公式の CBT 実施告知へリンクしている", () => {
    expect(getBlogPostBySlug(SLUG)!.body).toContain(IPA_OFFICIAL);
  });

  it("古い『現時点で PBT』『移行も検討』framing を残していない", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).not.toContain("応用情報・高度試験は現時点で PBT");
    expect(body).not.toContain("将来的な CBT 移行も検討");
  });
});
