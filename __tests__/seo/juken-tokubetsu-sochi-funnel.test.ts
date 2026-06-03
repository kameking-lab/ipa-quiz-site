import { describe, expect, it } from "vitest";

import { getBlogPostBySlug } from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// コーパスで「特別措置／車椅子／弱視／点字／バリアフリー」がゼロカバレッジ
// だった盲点を解消する新記事。IPA 公式「障害をお持ちの方へ」を裏取りし、
// 身体の不自由がある方の受験特別措置（対象・申請タイミング・区分別窓口）を
// 教育貢献ミッション（誰でも受験できる）と整合する形で整理した。
// この記事が
// (1) 制度タグの記事として存在し、
// (2) IPA 公式に明記された durable fact（対象＝目や耳・肢体／CBT不可時は筆記の特別措置試験／申請は受験申込の前）を正しく述べ、
// (3) 制度＝採点無関係ゆえ旗艦 /essay へは送らず、既存ページへのみ内部リンクし（新規404なし）、
// (4) 出典として IPA 公式ページへリンクし、
// (5) 親記事 受験資格（ipa-juken-shikaku-nenrei）から inbound を受ける、ことを pin する（崩れたら落ちる）。

const SLUG = "ipa-shiken-juken-tokubetsu-sochi";
const PARENT = "ipa-juken-shikaku-nenrei";
const IPA_OFFICIAL = "https://www.ipa.go.jp/shiken/jitecinquiry_handicapped.html";

describe("受験特別措置記事の事実性と funnel 規律", () => {
  it("記事が存在し制度／特別措置の記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.tags).toContain("特別措置");
    expect(post!.tags).toContain("制度");
  });

  it("IPA 公式の durable fact を正しく述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 対象＝目や耳・肢体など身体の不自由な方
    expect(body).toContain("目や耳・肢体");
    // CBT で受験できない場合は筆記による特別措置試験
    expect(body).toContain("筆記による");
    expect(body).toContain("特別措置試験");
    // 申請は受験申込の「前」（最重要の手続き事実）
    expect(body).toContain("受験申込の前");
  });

  it("制度記事ゆえ旗艦 /essay へは送らず、既存ページへのみ内部リンクする（新規404なし）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).not.toContain("/essay");
    expect(body).toContain("/blog/ipa-juken-shikaku-nenrei");
    expect(body).toContain("/blog/ipa-shiken-moushikomi-nagare");
    expect(body).toContain("/blog/ipa-shiken-cbt-vs-pbt");
  });

  it("出典として IPA 公式「障害をお持ちの方へ」ページへリンクしている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain(IPA_OFFICIAL);
  });

  it("FAQ が 4 問あり FAQPage として抽出できる", () => {
    const faqs = extractFaq(getBlogPostBySlug(SLUG)!.body);
    expect(faqs).toHaveLength(4);
    for (const f of faqs) {
      expect(f.question.startsWith("Q")).toBe(false);
      expect(f.question).not.toContain("**");
      expect(f.answer).not.toMatch(/\]\(/);
      expect(f.answer.length).toBeGreaterThan(0);
    }
  });

  it("親記事 受験資格 から inbound リンクを受ける（orphan回避）", () => {
    const parent = getBlogPostBySlug(PARENT);
    expect(parent, `${PARENT} が存在しない`).toBeDefined();
    expect(parent!.body).toContain(`/blog/${SLUG}`);
  });
});
