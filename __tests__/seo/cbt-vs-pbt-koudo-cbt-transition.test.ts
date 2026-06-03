import { describe, expect, it } from "vitest";

import { getBlogPostBySlug } from "@/data/blog";

// IPA は令和8年度（2026年度）から応用情報・高度試験・情報処理安全確保支援士を
// ペーパー方式から CBT 方式へ移行する予定を公表した（試験時間は変更なし・午前→科目A／
// 午後→科目B へ名称変更・春秋一斉実施を複数日の予約枠制へ）。既存
// ipa-shiken-cbt-vs-pbt は「応用情報・高度試験は現時点で PBT／将来的な移行も検討」と
// 古い framing のままだったため、公式発表どおりに是正した。この記事が
// (1) 令和8年度の CBT 移行予定を述べ、
// (2) IPA 公式の durable fact（試験時間は変更なし／科目A・科目B 名称）を正しく述べ、
// (3) 出典として IPA 公式の CBT 実施告知へリンクし、
// (4) 古い「現時点で PBT」「移行も検討」framing を残さない、ことを pin する（崩れたら落ちる）。

const SLUG = "ipa-shiken-cbt-vs-pbt";
const IPA_OFFICIAL =
  "https://www.ipa.go.jp/shiken/2026/ap_koudo_sc-cbt.html";

describe("CBT/PBT 記事の応用情報・高度試験 CBT 移行 是正", () => {
  it("記事が存在する", () => {
    expect(getBlogPostBySlug(SLUG), `${SLUG} が存在しない`).toBeDefined();
  });

  it("令和8年度からの CBT 移行予定を述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("令和 8 年度（2026 年度）");
    expect(body).toContain("CBT 方式へ移行する予定");
  });

  it("IPA 公式の durable fact（試験時間は変更なし・科目A／科目B 名称）を述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("各試験時間に変更はありません");
    expect(body).toContain("科目 A 試験");
    expect(body).toContain("科目 B 試験");
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
