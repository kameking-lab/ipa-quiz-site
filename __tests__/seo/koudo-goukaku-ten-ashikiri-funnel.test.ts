import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 制度・試験形式の事実確認を維持し、論述導線はIPA公式資料へ案内する。

const SLUG = "koudo-goukaku-ten-ashikiri";
const INBOUND_PARENTS = [
  "ipa-koudo-9kubun-chigai",
  "ipa-gozen1-menjo-jouken",
  "ap-goukaku-ten-border",
];

describe("高度試験の合格基準記事の事実性と funnel", () => {
  it("記事が存在し 高度試験/合格基準の記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.tags).toContain("高度試験");
    expect(post!.tags).toContain("合格基準");
  });

  it("核心事実（4段階・各60点・多段階選抜・SC午後統合で3段階）を正しく述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 4 段階構成と各段階の基準点
    expect(body).toContain("午前I・午前II・午後I・午後II");
    expect(body).toContain("基準点 60 点");
    // 多段階選抜 = 前段階が基準点未満なら先は採点されない
    expect(body).toContain("多段階選抜");
    expect(body).toContain("採点されず");
    // SC は午後統合で 3 段階
    expect(body).toContain("午後I と午後II が午後試験 1 つに統合");
    expect(body).toContain("3 段階");
  });

  it("論述区分は旗艦 /essay へ funnel しつつ「参考評価」を明記し、記述区分は各ハブへ送客する（誇大回避）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("](/essay");
    expect(body).toContain("IPA 公式の午後II過去問・解答例・採点講評");
    expect(body).not.toContain("[午後論述 AI 採点](/essay)");
    // 記述区分ハブ + 取得土台
    expect(body).toContain("](/nw");
    expect(body).toContain("](/sc");
    expect(body).toContain("](/ap");
  });

  it("既存の高度試験/免除/AP合格基準記事から inbound リンクがあり orphan 化しない", () => {
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
