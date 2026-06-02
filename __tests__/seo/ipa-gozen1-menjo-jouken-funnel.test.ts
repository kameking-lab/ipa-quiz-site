import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 午前I免除は高インテントの検索意図（「午前1 免除 条件 / 期間 / 申請」）だが、
// 既存記事は全て「応用情報に合格すれば免除」とだけ述べ、IPA 公式の 3 ルート
// （①応用情報合格 ②高度・支援士いずれか合格 ③午前I 基準点以上）と
// 「申請が必須（自動ではない）」を網羅した専用ページが無かった。新記事
// ipa-gozen1-menjo-jouken を追加した。この記事が
// (1) 高度試験/午前I免除の記事として登録され、
// (2) IPA 公式の核心事実（3 条件・2 年間・申請必須）を正しく述べ、
// (3) 高度試験ハブ + 論文区分は旗艦 /essay へ「参考評価」明記で funnel し、
// (4) 既存の免除言及記事から inbound を受け orphan 化せず、
// (5) FAQPage 化でき blog サイトマップに掲載される、ことを pin する。

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
    expect(body).toContain("参考評価");
    expect(body).toContain("採点基準は非公開");
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
