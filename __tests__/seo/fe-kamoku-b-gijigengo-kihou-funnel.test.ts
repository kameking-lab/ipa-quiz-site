import { describe, expect, it } from "vitest";

import { getAllBlogSummaries, getBlogPostBySlug } from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 既存の科目B 擬似言語記事 fe-kamoku-b-pseudo-language は「読解の3ステップ訓練法」
// （= 速度を上げる方法）であり、記法そのもの（← / if-elseif-endif / while-do-for /
// 配列の番号）を一覧で引ける reference が無かった。lookup 系ロングテール
// （「擬似言語 記法 / ← 意味 / 配列 番号」）を埋める新記事 fe-kamoku-b-gijigengo-kihou
// を追加した。この記事が
// (1) 擬似言語タグの FE 科目B 記事として登録され、
// (2) IPA 記法の核心（代入←・選択 endif・繰返し・配列1始まり）を正しく述べ、
// (3) モック非依存の安全な土台導線へ funnel し、旗艦 /essay には送らず、
// (4) /fe/topic を「科目A 相当の知識土台」と正確に framing し、
// (5) 訓練法記事 fe-kamoku-b-pseudo-language から inbound を受ける、ことを pin する。

const SLUG = "fe-kamoku-b-gijigengo-kihou";
const PARENT = "fe-kamoku-b-pseudo-language";

describe("FE 科目B 擬似言語 記法早見表記事の事実性と土台 funnel", () => {
  it("記事が存在し FE の科目B 擬似言語記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.exam).toBe("fe");
    expect(post!.tags).toContain("擬似言語");
  });

  it("IPA 擬似言語の記法（代入・選択・繰返し・配列1始まり）を正しく述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 代入は ← （= ではない）
    expect(body).toContain("←");
    expect(body).toContain("代入");
    // 選択処理の終端 endif
    expect(body).toContain("elseif");
    expect(body).toContain("endif");
    // 繰返しの3形
    expect(body).toContain("while");
    expect(body).toContain("for");
    expect(body).toContain("後判定");
    // 配列は 1 始まり（0 始まりの言語と混同しない、が誇大回避の核心事実）
    expect(body).toContain("要素番号は 1 から始まる");
  });

  it("モック非依存の安全な土台導線へ funnel し、旗艦には送らない", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("/blog/fe-kamoku-b-pseudo-language");
    expect(body).toContain("/blog/fe-kamoku-b-taisaku");
    // 分野別プール（実データ）
    expect(body).toContain("/fe/topic/");
    // 土台記事は旗艦 /essay へは送らない
    expect(body).not.toContain("](/essay");
  });

  it("/fe/topic を科目A 相当の知識土台と正確に framing している（誇大回避）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("科目A");
    expect(body).toContain("科目B そのものの形式ではない");
  });

  it("訓練法記事から inbound リンクがあり orphan 化しない", () => {
    const parent = getBlogPostBySlug(PARENT);
    expect(parent).toBeDefined();
    expect(
      parent!.body.includes(`/blog/${SLUG}`),
      "fe-kamoku-b-pseudo-language から新記事への inbound リンクが無い",
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
