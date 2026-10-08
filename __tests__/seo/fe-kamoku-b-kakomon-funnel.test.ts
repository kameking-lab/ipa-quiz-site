import { describe, expect, it } from "vitest";

import { getAllBlogSummaries, getBlogPostBySlug } from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// Keep distinct official partial publications, separate samples, useful practice
// links, and structured FAQ. Never pin the obsolete non-public-questions claim.

const SLUG = "fe-kamoku-b-kakomon-nai";
const PILLAR = "fe-kamoku-b-taisaku";

describe("FE 科目B『過去問がない』記事の事実性と土台 funnel", () => {
  it("記事が存在し FE の科目B 悩み系として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.exam).toBe("fe");
    expect(post!.tags).toContain("科目B");
  });

  it("公式の実出題部分と別のサンプルセットを区別している", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("2025年7月4日公開");
    expect(body).toContain("2026年7月1日公開");
    expect(body.match(/20問中6問/g)).toHaveLength(2);
    expect(body).toContain("2022年12月26日");
    expect(body).toContain("20問サンプル問題セット");
    expect(body).toContain("別資料");
    expect(body).not.toContain("CBT方式のため公開されていません");
    expect(getBlogPostBySlug(PILLAR)!.body).toContain("一部が公式公開されています");
    expect(getBlogPostBySlug(PILLAR)!.body).not.toContain("CBT方式のため公開されていません");
  });

  it("モック非依存の安全な土台導線へ funnel している", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 科目B ピラー
    expect(body).toContain("/blog/fe-kamoku-b-taisaku");
    // 擬似言語の読み方
    expect(body).toContain("/blog/fe-kamoku-b-pseudo-language");
    // 実データのアルゴリズム分野別プール（午後採点モックには送らない）
    expect(body).toContain("/fe/topic/");
    // 旗艦 /essay（論述採点）には送らない＝土台記事は土台導線のみ
    expect(body).not.toContain("](/essay");
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
    // 記事は noindex ではなく、blog サマリ（=サイトマップ対象）に含まれる
    const inSummaries = getAllBlogSummaries().some((p) => p.slug === SLUG);
    expect(inSummaries, "新記事が blog サマリ／サイトマップに無い").toBe(true);
  });
});
