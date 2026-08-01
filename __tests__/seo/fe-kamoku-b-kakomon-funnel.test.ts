import { describe, expect, it } from "vitest";

import { getAllBlogSummaries, getBlogPostBySlug } from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 土台（基本情報 科目B）クラスタに「過去問がない／サンプル問題だけ」という
// post-CBT の悩み系ロングテール記事 fe-kamoku-b-kakomon-nai を追加した。
// この記事は (1) IPA 公式の事実（CBT 本試験問題は非公開・公開サンプルは科目B 20問）
// を正しく述べ、(2) モックに依存しない安全な土台導線（科目B ピラー／擬似言語記事／
// アルゴリズム分野別プール）へ funnel し、(3) ピラー fe-kamoku-b-taisaku から
// inbound リンクを受けて orphan 化しない、ことを pin する。
// 文言や導線が崩れたらここで落ちる（「崩れたら落ちる」）。

const SLUG = "fe-kamoku-b-kakomon-nai";
const PILLAR = "fe-kamoku-b-taisaku";

describe("FE 科目B『過去問がない』記事の事実性と土台 funnel", () => {
  it("記事が存在し FE の科目B 悩み系として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.exam).toBe("fe");
    expect(post!.tags).toContain("科目B");
  });

  it("CBT 非公開・公式サンプル問題という事実を本文で述べている（誇大回避）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 本試験問題が非公開であること（IPA 明記の事実）
    expect(body).toContain("非公開");
    // 唯一の公式素材＝公開サンプル問題（20問）に言及
    expect(body).toContain("サンプル問題");
    expect(body).toContain("20 問");
    // CBT 方式に言及（過去問が無い理由）
    expect(body).toContain("CBT");
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
