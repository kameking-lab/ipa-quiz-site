import { describe, expect, it } from "vitest";

import { getAllBlogSummaries, getBlogPostBySlug } from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 土台（基本情報 科目B）クラスタの既存7記事はすべて アルゴリズム/擬似言語 に
// 偏っていたが、科目B は IPA 公式で「情報セキュリティ」と「データ構造及び
// アルゴリズム」の二分野を中心とする。未カバーだった情報セキュリティ分野の
// 得点戦略記事 fe-kamoku-b-security を追加した。この記事が
// (1) 二分野構成の事実を正しく述べ、
// (2) モック非依存の安全な土台導線へ funnel し、
// (3) /fe/topic/セキュリティ を「科目A 相当の知識土台」と正確に framing し
//     （科目B 形式そのものではないと明記）、
// (4) ピラー fe-kamoku-b-taisaku から inbound を受ける、ことを pin する。

const SLUG = "fe-kamoku-b-security";
const PILLAR = "fe-kamoku-b-taisaku";

describe("FE 科目B 情報セキュリティ得点戦略記事の事実性と土台 funnel", () => {
  it("記事が存在し FE の科目B 情報セキュリティ記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.exam).toBe("fe");
    expect(post!.tags).toContain("情報セキュリティ");
  });

  it("科目B=情報セキュリティ＋アルゴリズムの二分野構成という事実を述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("情報セキュリティ");
    expect(body).toContain("データ構造及びアルゴリズム");
    // 出題の中心はアルゴリズムである点も明示（誇大にセキュリティを過大評価しない）
    expect(body).toContain("出題の中心はアルゴリズム");
  });

  it("モック非依存の安全な土台導線へ funnel し、旗艦には送らない", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("/blog/fe-kamoku-b-taisaku");
    expect(body).toContain("/blog/fe-kamoku-b-kakomon-nai");
    // セキュリティ分野別プール（実データ）
    expect(body).toContain("/fe/topic/");
    // 土台記事は旗艦 /essay へは送らない
    expect(body).not.toContain("](/essay");
  });

  it("/fe/topic/セキュリティ を科目A 相当の知識土台と正確に framing している", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 科目B 形式そのものではない、という誇大回避の but がある
    expect(body).toContain("科目B そのものの形式ではない");
    expect(body).toContain("科目A");
  });

  it("ピラー記事から inbound リンクがあり orphan 化しない", () => {
    const pillar = getBlogPostBySlug(PILLAR);
    expect(pillar).toBeDefined();
    expect(
      pillar!.body.includes(`/blog/${SLUG}`),
      "ピラー fe-kamoku-b-taisaku から新記事への inbound リンクが無い",
    ).toBe(true);
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
