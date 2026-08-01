import { describe, expect, it } from "vitest";

import { getBlogPostBySlug } from "@/data/blog";

// ipa-goukaku-tsuchi-jiki の CBT 結果通知スケジュール節は、即時スコア表示・翌月
// 正式発表という CBT 通年区分の発表モデルを「IP・SG」だけに限定し、同じ CBT
// 通年区分の基本情報（FE）を欠いていた（s132/s133 で他記事に見つかった FE=CBT
// 取り残しと同型）。FE も令和3年度以降 CBT 通年で同じ発表モデルに属するため、
// CBT 区分の列挙へ FE を含める（s133）。

const SLUG = "ipa-goukaku-tsuchi-jiki";

describe("合格通知時期記事の CBT 区分に FE を含む", () => {
  it("記事が存在する", () => {
    expect(getBlogPostBySlug(SLUG), `${SLUG} が存在しない`).toBeDefined();
  });

  it("CBT 試験の区分列挙が FE を含む（FE を欠いた IP・SG 列挙を残さない）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).not.toContain("CBT 試験（IP・SG）");
    expect(body).toContain("CBT 試験（IP・SG・FE）");
  });

  it("CBT 通年区分の説明文が基本情報（FE）を含む", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("基本情報技術者（FE）は通年 CBT 方式");
  });
});
