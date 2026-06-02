import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 「基本情報 科目Aだけ合格 次回 / 応用情報 午前だけ合格 免除」は高インテントの再挑戦クエリだが、
// 既存記事（fe-goukaku-ten-irt 等）は「その回の中で全科目に合格が要る」までで、
// 「前回受かった科目を次回に持ち越せるか（＝科目合格・部分合格の有無）」を正面から
// 扱う専用記事が不在だった。IPA に科目合格制度はなく（WebSearch で裏取り済）、
// 唯一の "持ち越し" は別根拠による午前I免除（2年）・科目A免除（認定講座）で別物。
// 制度=採点無関係ゆえ旗艦 /essay へは funnel しない（s27/s65/s87 precedent）。
// これが (1) cross-区分 general 記事として登録され、(2) 検証済みの制度事実
// （科目合格なし・持ち越し不可・午前I免除/科目A免除は別物）を含み、(3) /essay へ誤送客せず、
// (4) 2 面から inbound を受け orphan 化せず、(5) FAQPage 化できる、ことを pin。

const SLUG = "ipa-kamoku-goukaku-nai";

describe("「科目合格はない」制度記事の事実性と funnel 規律", () => {
  it("記事が存在し cross-区分の制度 general 記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    // FE/AP/高度 横断のため単一 exam・booksExam は持たない（索引送客）
    expect(post!.exam).toBeUndefined();
    expect(post!.booksExam).toBeUndefined();
    expect(post!.tags).toContain("制度");
  });

  it("検証済みの制度事実（科目合格なし・持ち越し不可・免除は別物）を含む", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("科目合格");
    expect(body).toContain("持ち越");
    // FE は科目A・科目B両方を同じ回で／AP は午前・午後を同じ回で
    expect(body).toContain("科目A");
    expect(body).toContain("午前");
    // 例外に見える 2 制度との区別
    expect(body).toContain("午前I免除");
    expect(body).toContain("科目A免除");
  });

  it("制度記事ゆえ旗艦 /essay へは funnel しない（採点無関係・誤送客回避）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).not.toContain("](/essay)");
    // 合格基準・免除・土台=科目B へは funnel する
    expect(body).toContain("/blog/fe-goukaku-ten-irt");
    expect(body).toContain("/blog/ap-goukaku-ten-border");
    expect(body).toContain("/blog/ipa-gozen1-menjo-jouken");
    expect(body).toContain("/blog/fe-kamoku-a-menjo");
    expect(body).toContain("/blog/fe-kamoku-b-taisaku");
  });

  it("2 つの関連記事から inbound リンクを受け orphan 化しない（s82/s83 precedent）", () => {
    // (1) FE 合格点記事の「科目別判定」節から
    const feScore = getBlogPostBySlug("fe-goukaku-ten-irt");
    expect(feScore).toBeDefined();
    expect(
      feScore!.body.includes(`/blog/${SLUG}`),
      "fe-goukaku-ten-irt から新記事への inbound リンクが無い",
    ).toBe(true);
    // (2) 不合格リカバリー記事（高インテントの "落ちた後"）の原因分析節から
    const recovery = getBlogPostBySlug("ipa-shiken-fugoukaku-kara-no-recovery");
    expect(recovery).toBeDefined();
    expect(
      recovery!.body.includes(`/blog/${SLUG}`),
      "fugoukaku-recovery から新記事への inbound リンクが無い",
    ).toBe(true);
  });

  it("FAQPage 化できる Q&A を持ち、blog サイトマップに掲載される", () => {
    const post = getBlogPostBySlug(SLUG)!;
    const faqs = extractFaq(post.body);
    expect(faqs.length).toBeGreaterThanOrEqual(4);
    for (const f of faqs) {
      expect(f.question).not.toContain("**");
      // FAQPage JSON-LD に markdown リンク記法が漏れない（extractFaq が除去）
      expect(f.answer).not.toMatch(/\]\(/);
    }
    const inSummaries = getAllBlogSummaries().some((p) => p.slug === SLUG);
    expect(inSummaries, "新記事が blog サマリ／サイトマップに無い").toBe(true);
    // 関連レールが解決する（typo slug で新規 404 を作らない）
    const rail = getRelatedPosts(SLUG, 3);
    expect(rail.length).toBeGreaterThan(0);
  });
});
