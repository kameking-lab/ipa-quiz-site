import { describe, expect, it } from "vitest";

import { getBlogPostBySlug } from "@/data/blog";

// ipa-zaitaku-remote-juken の「オンライン化の動向」節は、高度試験の CBT 化を
// 「議論されています」と forward-looking な未確定 framing で述べ、かつ CBT 区分の
// 列挙から基本情報（FE）を欠いていた stale claim だった（s129 が cbt-vs-pbt で
// 是正したのと同型）。IPA は令和8年度（2026年度）から応用情報・高度・支援士を
// CBT へ移行する予定を公表済みなので、確定済みの durable fact へ追従しつつ
// canonical 解説 cbt-vs-pbt へ funnel する。「予定」段階の明示で断定回避。

const SLUG = "ipa-zaitaku-remote-juken";

describe("在宅受験記事の CBT 移行 動向 追従", () => {
  it("記事が存在する", () => {
    expect(getBlogPostBySlug(SLUG), `${SLUG} が存在しない`).toBeDefined();
  });

  it("CBT 化済み区分の列挙に基本情報を含む", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain(
      "ITパスポート・情報セキュリティマネジメント・基本情報",
    );
  });

  it("高度試験の CBT 化を確定済みの令和8年度移行予定として述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("令和8年度（2026年度）");
    expect(body).toContain("CBT 方式へ移行する予定");
    // 「議論されています」という未確定 framing を残していない
    expect(body).not.toContain("CBT 化や、論述試験のオンライン採点化が議論");
  });

  it("canonical 解説 cbt-vs-pbt へ内部リンクで funnel している", () => {
    expect(getBlogPostBySlug(SLUG)!.body).toContain(
      "/blog/ipa-shiken-cbt-vs-pbt",
    );
  });

  it("基本情報を PBT でなく CBT 区分として扱っている（FE 一部 PBT の stale 表記なし）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // FE はCBT通年（令和3年度以降）で PBT ではない。会場説明の内部矛盾を防ぐ。
    expect(body).not.toContain("FE 一部");
    expect(body).toContain("PBT 試験（AP / 高度試験）");
    expect(body).toContain("CBT 試験（IP・SG・FE）");
  });
});
