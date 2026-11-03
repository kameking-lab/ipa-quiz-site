import { describe, expect, it } from "vitest";

import { getBlogPostBySlug } from "@/data/blog";

// 2026年度のAP・高度・SCは通常試験を期間制CBTで実施する。
// 通年CBTと期間制CBTを区別し、在宅受験の可否を明確にする。

const SLUG = "ipa-zaitaku-remote-juken";

describe("在宅受験記事の CBT 移行 動向 追従", () => {
  it("記事が存在する", () => {
    expect(getBlogPostBySlug(SLUG), `${SLUG} が存在しない`).toBeDefined();
  });

  it("CBT 化済み区分の列挙に基本情報を含む", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("ITパスポート（IP）");
    expect(body).toContain("情報セキュリティマネジメント（SG）");
    expect(body).toContain("基本情報技術者（FE）");
  });

  it("2026年度の高度試験を期間制CBTとして説明する", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("AP・高度・SCも2026年度からCBT方式");
    expect(body).toContain("科目A群とB群を同時に予約");
    expect(body).not.toContain("CBT 化や、論述試験のオンライン採点化が議論");
    expect(body).not.toContain("PBT 試験（AP / 高度試験）");
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
    expect(body).toContain("SG）・基本情報技術者（FE）");
    expect(body).toContain("通常試験はCBT");
  });

  // 海外受験の事実性是正（s133）: タイ・ベトナム等で実施されるのは ITPEC の
  // 「アジア共通統一試験」(日本の試験をベースにした相当試験・英語中心・相互認証)で
  // あり、「IPA 試験の海外会場」ではない。日本の試験そのものは海外で実施されない。
  // また「IPA 公式ページの『海外受験』欄」は実在しない dead reference だった。
  it("海外受験を ITPEC アジア共通統一試験として正しく説明している", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 誤った framing「海外会場が（一部）設置」を残していない
    expect(body).not.toContain("海外会場が一部設置");
    expect(body).not.toContain("海外会場が設置されています");
    // 実在しない「海外受験」欄への dead reference を残していない
    expect(body).not.toContain("「海外受験」欄");
    // 正しい durable fact: ITPEC / アジア共通統一試験 / 相互認証
    expect(body).toContain("ITPEC");
    expect(body).toContain("アジア共通統一試験");
    expect(body).toContain("相互認証");
    // 日本の試験そのものは海外で実施されない旨を明示
    expect(body).toContain("日本の情報処理技術者試験そのもの");
    // 出典＝IPA 公式 アジア共通統一試験ページ（allowlist で 200/no-redirect 済）
    expect(body).toContain("https://www.ipa.go.jp/shiken/asia/itpe.html");
  });
});
