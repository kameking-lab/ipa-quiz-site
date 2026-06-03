import { describe, expect, it } from "vitest";

import { getBlogPostBySlug } from "@/data/blog";

// 全13区分の比較記事 ipa-shiken-zenkubun-hikaku は難易度・受験順序・キャリア接続は
// 扱うが「各区分の試験時間（長さ・分数）」の一覧が欠落していた（s129 lead）。
// 試験時間の "長さ" は CBT 移行後も不変（IPA「各試験時間に変更はありません」）= durable。
// コーパス検証済の SSOT 値を additive に集約した。この記事が
// (1) 試験時間（長さ）の節を持ち、
// (2) 各区分の検証済 duration を正しく述べ、
// (3) 長さは CBT 移行後も不変という durable framing を述べ、
// (4) FAQ で試験時間を答える、ことを pin する（崩れたら落ちる＝誤った分数を書くと落ちる）。

const SLUG = "ipa-shiken-zenkubun-hikaku";

describe("全区分比較 記事の試験時間（長さ）一覧", () => {
  it("記事が存在する", () => {
    expect(getBlogPostBySlug(SLUG), `${SLUG} が存在しない`).toBeDefined();
  });

  it("試験時間（長さ）の節を持つ", () => {
    expect(getBlogPostBySlug(SLUG)!.body).toContain("## 区分別の試験時間（長さ）");
  });

  it("各区分の検証済 duration を正しく述べている（SSOT 一致）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // IP / SG = 120分
    expect(body).toContain("120 分（100 問を通しで解答）");
    expect(body).toContain("120 分（科目 A＋科目 B 計 60 問）");
    // FE = 科目A 90分 + 科目B 100分
    expect(body).toContain("科目 A 90 分＋科目 B 100 分");
    // AP = 午前150 + 午後150
    expect(body).toContain("午前 150 分＋午後 150 分");
    // 高度 = 午前I50 / 午前II40 / 午後I90 / 午後II120
    expect(body).toContain("午前 I 50 分＋午前 II 40 分＋午後 I 90 分＋午後 II 120 分");
    // SC = 2023統合で午後150分
    expect(body).toContain("午前 I 50 分＋午前 II 40 分＋午後 150 分");
  });

  it("長さは CBT 移行後も不変という durable framing を述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("CBT 移行後も変わりません");
    expect(body).toContain("各試験時間に変更はありません");
  });

  it("FAQ で各区分の試験時間に答えている", () => {
    expect(getBlogPostBySlug(SLUG)!.body).toContain(
      "**Q5. 各区分の試験時間は何分ですか？**",
    );
  });
});
