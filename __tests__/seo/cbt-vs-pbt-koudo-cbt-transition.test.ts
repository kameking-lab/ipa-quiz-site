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
    expect(body).toContain("2026年度後期");
    expect(body).toContain("CBTは会場のパソコンで問題を読み");
    expect(body).toContain("申込期間と科目別の実施期間");
  });

  it("出題形式の継続と区分別の科目A／科目B名称を述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("知識・技能の範囲と、出題形式・出題数等は移行によって変わりません");
    expect(body).toContain("APは科目A・B");
    expect(body).toContain("高度は科目A-1・A-2と科目B-1・B-2");
    expect(body).toContain("SCは科目A-1・A-2と科目B");
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
