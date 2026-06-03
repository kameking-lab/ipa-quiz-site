import { describe, expect, it } from "vitest";

import { getBlogPostBySlug } from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// コーパスで「合格証明書交付申請／700円／シー・ビー・ティ」がゼロカバレッジ
// だった盲点を解消する新記事。既存 ipa-goukaku-tsuchi-jiki は自動郵送される
// 「合格証書」(大臣交付・再発行不可) を扱うが、申請制で再発行・英字氏名にも
// 対応する「合格証明書」(IPA 交付) の交付申請は未カバーだった。IPA 公式
// 「合格証明書の交付手続き」を裏取りし整理した。この記事が
// (1) 合格証明書/制度タグの記事として存在し、
// (2) IPA 公式の durable fact(証書=大臣交付・再発行不可／証明書=IPA交付・1通700円／オンライン申請／英字表記可)を正しく述べ、
// (3) 制度＝採点無関係ゆえ旗艦 /essay へは送らず既存ページへのみ内部リンクし(新規404なし)、
// (4) 出典として IPA 公式「合格証明書の交付手続き」へリンクし、
// (5) 親記事 合格証書(ipa-goukaku-tsuchi-jiki)から inbound を受ける、ことを pin する(崩れたら落ちる)。

const SLUG = "ipa-goukaku-shoumeisho-koufu";
const PARENT = "ipa-goukaku-tsuchi-jiki";
const IPA_OFFICIAL = "https://www.ipa.go.jp/shiken/goukaku/shinsei_01.html";

describe("合格証明書交付申請記事の事実性と funnel 規律", () => {
  it("記事が存在し合格証明書／制度の記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.tags).toContain("合格証明書");
    expect(post!.tags).toContain("制度");
  });

  it("IPA 公式の durable fact を正しく述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 合格証書は経済産業大臣交付・再発行不可
    expect(body).toContain("経済産業大臣");
    expect(body).toContain("再発行はできません");
    // 合格証明書は IPA 交付・申請制・1 通 700 円
    expect(body).toContain("情報処理推進機構");
    expect(body).toContain("700 円");
    // 申請はオンライン・英字氏名表記が可能
    expect(body).toContain("オンライン");
    expect(body).toContain("英字表記");
  });

  it("制度記事ゆえ旗艦 /essay へは送らず、既存ページへのみ内部リンクする（新規404なし）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).not.toContain("/essay");
    expect(body).toContain("/blog/ipa-goukaku-tsuchi-jiki");
    expect(body).toContain("/blog/cbt-goukaku-happyou-score-report");
    expect(body).toContain("/blog/it-shikaku-rirekisho-kakikata");
  });

  it("出典として IPA 公式「合格証明書の交付手続き」ページへリンクしている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain(IPA_OFFICIAL);
  });

  it("FAQ が 4 問あり FAQPage として抽出できる", () => {
    const faqs = extractFaq(getBlogPostBySlug(SLUG)!.body);
    expect(faqs).toHaveLength(4);
    for (const f of faqs) {
      expect(f.question.startsWith("Q")).toBe(false);
      expect(f.question).not.toContain("**");
      expect(f.answer.length).toBeGreaterThan(0);
    }
  });

  it("親記事 合格証書 から inbound リンクを受ける（orphan回避）", () => {
    const parent = getBlogPostBySlug(PARENT);
    expect(parent, `${PARENT} が存在しない`).toBeDefined();
    expect(parent!.body).toContain(`/blog/${SLUG}`);
  });
});
