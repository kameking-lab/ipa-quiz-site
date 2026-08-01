import { describe, expect, it } from "vitest";

import { getBlogPostBySlug } from "@/data/blog";

// ipa-moushikomi-mynumber は FE を一貫して PBT 区分として扱っていた事実誤り
// （申込手続の流れ見出しが「PBT 試験：AP / FE / 高度試験」、本人確認の節が
// 「CBT 試験（IP・SG）」と FE を欠く）。FE は令和3年度以降 CBT 通年で、申込も
// CBT 予約方式・本人確認も CBT 区分側に属する。FE を CBT 区分へ統一する（s133）。

const SLUG = "ipa-moushikomi-mynumber";

describe("マイナンバー申込記事の FE=CBT 区分 整合", () => {
  it("記事が存在する", () => {
    expect(getBlogPostBySlug(SLUG), `${SLUG} が存在しない`).toBeDefined();
  });

  it("FE を PBT 申込フローに列挙していない", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 「PBT 試験：AP / FE / 高度試験」のような FE を PBT 側に置く列挙を残さない
    expect(body).not.toContain("PBT 試験：AP / FE");
    expect(body).not.toContain("PBT 試験（FE");
  });

  it("CBT 区分の本人確認・当日説明が FE を含む", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // FE を欠いた「CBT 試験（IP・SG）」列挙を残さない
    expect(body).not.toContain("CBT 試験（IP・SG）");
    expect(body).toContain("CBT 試験（IP・SG・FE）");
  });
});
