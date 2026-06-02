import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 「高度試験 論文 評価ランク」「午後II 論文 A評価 合格」「論文 B評価 不合格」は
// 高インテント・競合薄（道場は午後論文を採点しない）だが、論文が点数ではなく
// 評価ランク A/B/C/D で判定され A のみ合格、という採点の仕組みを扱う専用ページが
// 不在だった（既存の論述記事は「書き方のコツ」止まり）。新記事
// koudo-ronbun-hyouka-rank を追加した。この記事が
// (1) 高度試験/論述/評価ランクの記事として登録され、
// (2) 核心事実（午後II論文は評価ランクA/B/C/D・Aのみ合格・IPA公式の評価の視点・
//     多段階選抜で午後IIに至る前に足切り）を述べ、
// (3) 旗艦 /essay へ「参考評価」明記で funnel し（誇大回避）、
// (4) 既存の高度論述/合格基準記事から inbound を受け orphan 化せず、
// (5) FAQPage 化でき blog サイトマップに掲載される、ことを pin する。

const SLUG = "koudo-ronbun-hyouka-rank";
const INBOUND_PARENTS = [
  "koudo-goukaku-ten-ashikiri",
  "koudo-ronjutsu-kakikata-kotsu",
];

describe("高度試験 論文評価ランク記事の事実性と funnel", () => {
  it("記事が存在し 高度試験/論述/評価ランクの記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.tags).toContain("高度試験");
    expect(post!.tags).toContain("評価ランク");
  });

  it("核心事実（午後II論文は評価ランクA/B/C/D・Aのみ合格・評価の視点・多段階選抜の足切り）を正しく述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 評価ランク A/B/C/D・A のみ合格
    expect(body).toContain("評価ランク");
    expect(body).toMatch(/A・B・C・D|A\/B\/C\/D/);
    expect(body).toContain("A の場合のみ合格");
    // IPA 公式の評価の視点
    expect(body).toContain("設問で要求した項目の充足度");
    expect(body).toContain("論理の一貫性");
    // 指示違反は内容に関わらず減点
    expect(body).toContain("解答に当たっての指示");
    // 多段階選抜で午後IIに至る前に足切り
    expect(body).toContain("多段階選抜");
    expect(body).toContain("採点されず");
    // B/C/D の細かな基準は非公開（誇大/誤記回避）
    expect(body).toContain("公表していない");
  });

  it("旗艦 /essay へ funnel しつつ「参考評価」「採点基準は非公開」を明記する（誇大回避）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("](/essay");
    expect(body).toContain("参考評価");
    expect(body).toContain("採点基準は非公開");
  });

  it("既存の高度論述/合格基準記事から inbound リンクがあり orphan 化しない", () => {
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
