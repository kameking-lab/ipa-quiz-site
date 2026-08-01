import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 「情報処理技術者試験 受験資格 / 年齢制限 / 何歳から / 学歴 / 国籍 / 誰でも受けられる」は
// 高インテント・競合薄だが、コーパスには専用ページが無く（受験資格への言及は他記事の1文のみ）取り残しだった。
// 新記事 ipa-juken-shikaku-nenrei を追加した。この記事が
// (1) 受験資格/制度 の記事として登録され、
// (2) 公式の核心事実（受験・応募資格の制限なし＝年齢・学歴・国籍・実務経験 不問／外国籍は受験可だが試験は日本語）を正しく述べ、
// (3) 土台=入門区分(/ip・/fe)・科目B・申込フローへ funnel し、旗艦/essay の採点訴求はしない（制度＝採点無関係＝誇大回避・s27/s65 precedent）、
// (4) 既存の関連記事から inbound を受け orphan 化せず、
// (5) FAQPage 化でき blog サイトマップに掲載される、ことを pin する。

const SLUG = "ipa-juken-shikaku-nenrei";
const INBOUND_PARENTS = ["ipa-shiken-moushikomi-nagare", "13-shikaku-osusume-jyun"];

describe("情報処理技術者試験 受験資格 記事の事実性と funnel", () => {
  it("記事が存在し 受験資格/制度 の記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.tags).toContain("受験資格");
    expect(post!.tags).toContain("制度");
  });

  it("核心事実（受験資格の制限なし＝年齢・学歴・国籍・実務経験 不問／外国籍は日本語）を正しく述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 受験・応募資格の制限はない
    expect(body).toContain("受験・応募資格の制限はありません");
    // 年齢・学歴・国籍・実務経験の各観点
    expect(body).toContain("年齢制限なし");
    expect(body).toContain("学歴");
    expect(body).toContain("国籍");
    expect(body).toContain("実務経験");
    // 外国籍は受験可だが試験は日本語
    expect(body).toContain("日本語");
  });

  it("土台=入門区分・科目B・申込フローへ funnel し、旗艦 /essay の採点訴求はしない（制度＝誇大回避）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 入門区分（IP・FE）へ funnel
    expect(body).toContain("](/ip");
    expect(body).toContain("](/fe");
    // 土台=科目Bピラー・申込フローへ funnel
    expect(body).toContain("/blog/fe-kamoku-b-taisaku");
    expect(body).toContain("/blog/ipa-shiken-moushikomi-nagare");
    // 制度記事ゆえ旗艦 /essay の採点訴求はしない（footer chrome は body には出ない）
    expect(body).not.toContain("](/essay");
  });

  it("既存の関連記事から inbound リンクがあり orphan 化しない", () => {
    for (const parentSlug of INBOUND_PARENTS) {
      const parent = getBlogPostBySlug(parentSlug);
      expect(parent, `${parentSlug} が存在しない`).toBeDefined();
      expect(
        parent!.body.includes(`/blog/${SLUG}`),
        `${parentSlug} から ${SLUG} への inbound リンクが無い`,
      ).toBe(true);
    }
  });

  it("FAQPage 化できる Q&A を持ち、blog サイトマップに掲載される", () => {
    const post = getBlogPostBySlug(SLUG)!;
    const faqs = extractFaq(post.body);
    expect(faqs.length).toBeGreaterThanOrEqual(4);
    for (const f of faqs) {
      expect(f.question).not.toContain("**");
      expect(f.answer).not.toMatch(/\]\(/);
    }
    const inSummaries = getAllBlogSummaries().some((p) => p.slug === SLUG);
    expect(inSummaries, "新記事が blog サマリ／サイトマップに無い").toBe(true);
  });
});
