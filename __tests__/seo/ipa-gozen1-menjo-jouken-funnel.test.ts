import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 制度・試験形式の事実確認を維持し、論述導線はIPA公式資料へ案内する。

const SLUG = "ipa-gozen1-menjo-jouken";
const INBOUND_PARENTS = ["ipa-koudo-9kubun-chigai", "13-shikaku-osusume-jyun"];

describe("午前I免除の条件記事の事実性と funnel", () => {
  it("記事が存在し 午前I免除の記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.tags).toContain("午前I免除");
    expect(post!.tags).toContain("高度試験");
  });

  it("IPA 公式の核心事実（3 条件・2 年間・申請必須）を正しく述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 3 つの免除ルート
    expect(body).toContain("応用情報技術者試験（AP）に合格");
    expect(body).toContain("いずれかの高度試験");
    expect(body).toContain("午前Iで基準点以上");
    // 有効期間 2 年間
    expect(body).toContain("2 年間");
    expect(body).toContain("同時期試験");
    // 申請が必須（自動ではない）= 最大の落とし穴
    expect(body).toContain("一部免除申請番号");
    expect(body).toContain("自動ではない");
  });

  it("論文区分は旗艦 /essay へ funnel しつつ「参考評価」を明記している（誇大回避）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("](/essay");
    expect(body).toContain("IPA 公式の午後II過去問・解答例・採点講評");
    expect(body).not.toContain("[午後論述 AI 採点](/essay)");
    // 高度試験ハブへも導線
    expect(body).toContain("](/ap");
  });

  it("既存の免除言及記事から inbound リンクがあり orphan 化しない", () => {
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
