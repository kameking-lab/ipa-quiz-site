import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 制度・試験形式の事実確認を維持し、論述導線はIPA公式資料へ案内する。

const SLUG = "koudo-ronbun-jikan-haibun";
const PARENT = "koudo-ronjutsu-kakikata-kotsu";

describe("論文(午後II)時間配分記事の事実性と旗艦 funnel", () => {
  it("記事が存在し cross-区分の論文記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    // 5 区分横断のため単一 exam は持たない（= /recommended-books 索引へ送る安全側）
    expect(post!.exam).toBeUndefined();
    expect(post!.booksExam).toBeUndefined();
    expect(post!.tags).toContain("時間配分");
    expect(post!.tags).toContain("午後II");
  });

  it("SSOT の字数・時間（120分・設問ア〜ウ・合計3,000字前後）と一致している", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 試験時間
    expect(body).toContain("120分");
    // 設問構成（3段）
    expect(body).toContain("設問ア");
    expect(body).toContain("設問イ");
    expect(body).toContain("設問ウ");
    // 字数の目安（コーパス SSOT と一致: ア600〜800/イ1,600/ウ600〜800・合計3,000字前後）
    expect(body).toContain("600〜800字");
    expect(body).toContain("1,600字前後");
    expect(body).toContain("3,000字前後");
    // 配分の核（選択10分・骨子20分・執筆80分・見直し10分）
    expect(body).toContain("選択10分・骨子20分・執筆80分・見直し10分");
  });

  it("IPA公式資料 /essay へを明記して funnel している", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("](/essay)");
    // 誇大回避: 採点は参考評価（IPA 採点基準は非公開）であることを明記
    expect(body).toContain("IPA 公式の午後II過去問・解答例・採点講評");
    expect(body).toContain("非公開");
    // 採点制度（評価ランク）記事へも導線
    expect(body).toContain("/blog/koudo-ronbun-hyouka-rank");
  });

  it("2 つの関連記事から inbound リンクを受け orphan 化しない", () => {
    // s82/s83 precedent: 新記事は 2 つの inbound 面を持たせ orphan-fragility を避ける。
    const parent = getBlogPostBySlug(PARENT);
    expect(parent).toBeDefined();
    expect(
      parent!.body.includes(`/blog/${SLUG}`),
      "koudo-ronjutsu-kakikata-kotsu から新記事への inbound リンクが無い",
    ).toBe(true);
    // 評価ランク記事の「字数不足＝時間切れ」文脈からの 2 本目の inbound
    const rankPost = getBlogPostBySlug("koudo-ronbun-hyouka-rank");
    expect(rankPost).toBeDefined();
    expect(
      rankPost!.body.includes(`/blog/${SLUG}`),
      "koudo-ronbun-hyouka-rank から新記事への inbound リンクが無い",
    ).toBe(true);
  });

  it("関連レール(route limit=3)が全て論文/午後 on-topic で off-topic を含まない", () => {
    const railSlugs = getRelatedPosts(SLUG, 3).map((r) => r.slug);
    expect(railSlugs).toContain("koudo-ronjutsu-kakikata-kotsu");
    // 論述/午後の関連記事のみ（科目B 等の土台記事や無関係記事を含まない）
    expect(
      railSlugs.every((s) => s.startsWith("koudo-") || s.startsWith("pm-")),
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
  });
});
