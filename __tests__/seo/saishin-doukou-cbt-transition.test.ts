import { describe, expect, it } from "vitest";

import { getBlogPostBySlug } from "@/data/blog";

// IPA は令和8年度（2026年度）から応用情報・高度試験・情報処理安全確保支援士を
// ペーパー方式から CBT 方式へ移行する予定を公表した（試験時間は変更なし・午前→科目A／
// 午後→科目B へ名称変更・春秋一斉実施を複数日の予約枠制へ）。この公式発表は
// 既に cbt-vs-pbt（s129）・cbt-goukaku-happyou-score-report・cbt-shiken-toujitsu-nagare
// で扱われているが、「最新動向2026」を謳う ipa-saishin-doukou のトレンド3 が
// 「IP・SG・FE は CBT 移行完了」までしか述べず、最大級の 2026 ニュースである
// 応用情報・高度・支援士の令和8年度移行を欠落していた stale gap を是正した。この記事が
// (1) 令和8年度の CBT 移行予定（対象＝応用情報・高度・支援士）を述べ、
// (2) IPA 公式の durable fact（試験時間は変更なし／科目A・科目B 名称）を正しく述べ、
// (3) 出典として IPA 公式の CBT 実施告知へリンクし、
// (4) cbt-vs-pbt 詳細記事へ内部リンクで funnel する、ことを pin する（崩れたら落ちる）。

const SLUG = "ipa-saishin-doukou";
const IPA_OFFICIAL = "https://www.ipa.go.jp/shiken/2026/ap_koudo_sc-cbt.html";

describe("最新動向2026 記事の応用情報・高度試験 CBT 移行 反映", () => {
  it("記事が存在する", () => {
    expect(getBlogPostBySlug(SLUG), `${SLUG} が存在しない`).toBeDefined();
  });

  it("令和8年度からの CBT 移行予定（対象＝応用情報・高度・支援士）を述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("令和8年度（2026年度）");
    expect(body).toContain("CBT方式へ移行する予定");
    // 「予定」段階であることを明示（断定回避）
    expect(body).toContain("「予定」段階");
  });

  it("IPA 公式の durable fact（試験時間は変更なし・科目A／科目B 名称）を述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("各試験の試験時間に変更はありません");
    expect(body).toContain("午前→科目A・午後→科目B");
  });

  it("出典として IPA 公式の CBT 実施告知へリンクしている", () => {
    expect(getBlogPostBySlug(SLUG)!.body).toContain(IPA_OFFICIAL);
  });

  it("詳細記事 cbt-vs-pbt へ内部リンクで funnel している", () => {
    expect(getBlogPostBySlug(SLUG)!.body).toContain(
      "/blog/ipa-shiken-cbt-vs-pbt",
    );
  });

  it("古い『CBT移行完了とその影響』の見出しを残していない", () => {
    expect(getBlogPostBySlug(SLUG)!.body).not.toContain(
      "## 最重要トレンド3：CBT移行完了とその影響",
    );
  });
});
