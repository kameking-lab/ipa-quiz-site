import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 「○○ 合格発表 いつ / スコアレポート 見方」は高インテントの受験後クエリだが、
// 合格発表・結果確認を正面から扱う専用記事が不在だった（moushikomi-nagare に
// 合否発表が 2 行あるのみ）。CBT 通年区分（IP/SG/FE=土台の入口区分）は発表の仕組みが
// durable（試験終了直後の評価点表示＋翌月中旬の正式発表）なため専用記事化できる。
// 一方 AP/高度は令和8年度から CBT 移行中で発表時期が流動的＝staleness を避けるため
// 本記事は CBT 通年区分にスコープし、AP/高度は IPA 公式へ hedge する。
// 制度=採点無関係ゆえ旗艦 /essay へは funnel しない（s27/s65 precedent）。
// これが (1) cross-区分 general 記事として登録され、(2) 検証済みの CBT 事実
// （翌月中旬・即時評価点・スコアレポート・簡易書留）を含み、(3) /essay へ誤送客せず、
// (4) moushikomi-nagare から inbound を受け orphan 化せず、(5) FAQPage 化できる、ことを pin。

const SLUG = "cbt-goukaku-happyou-score-report";
const PARENT = "ipa-shiken-moushikomi-nagare";

describe("CBT 合格発表/スコアレポート記事の事実性と funnel 規律", () => {
  it("記事が存在し cross-区分の制度 general 記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    // CBT 通年 3 区分（IP/SG/FE）横断のため単一 exam は持たない
    expect(post!.exam).toBeUndefined();
    expect(post!.booksExam).toBeUndefined();
    expect(post!.tags).toContain("合格発表");
    expect(post!.tags).toContain("CBT");
  });

  it("検証済みの CBT 事実（即時評価点・翌月中旬・スコアレポート・簡易書留）を含む", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 試験終了直後にその場で評価点が表示される
    expect(body).toContain("試験終了直後");
    expect(body).toContain("評価点");
    // 正式発表は受験月の翌月中旬
    expect(body).toContain("翌月中旬");
    // スコアレポートをマイページで照会
    expect(body).toContain("スコアレポート");
    // 合格証書は発表の約1ヶ月後・簡易書留
    expect(body).toContain("合格証書");
    expect(body).toContain("簡易書留");
    // AP/高度は CBT 移行中で hedge（staleness 回避）
    expect(body).toContain("令和8年度");
  });

  it("制度記事ゆえ旗艦 /essay へは funnel しない（採点無関係・誤送客回避）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).not.toContain("](/essay)");
    // 各区分の合格基準記事へは funnel する（評価点が合格圏かを判断させる）
    expect(body).toContain("/blog/fe-goukaku-ten-irt");
    expect(body).toContain("/blog/sg-goukaku-ten-irt");
    expect(body).toContain("/blog/ip-goukaku-ten-bunyabetsu");
  });

  it("2 つの関連記事から inbound リンクを受け orphan 化しない（s82/s83 precedent）", () => {
    // (1) 親=申込フロー記事の合否発表節から
    const parent = getBlogPostBySlug(PARENT);
    expect(parent).toBeDefined();
    expect(
      parent!.body.includes(`/blog/${SLUG}`),
      "moushikomi-nagare から新記事への inbound リンクが無い",
    ).toBe(true);
    // (2) FE 合格点記事の「試験当日：仮スコア／正式合否」節からの 2 本目（reciprocal）
    const feScore = getBlogPostBySlug("fe-goukaku-ten-irt");
    expect(feScore).toBeDefined();
    expect(
      feScore!.body.includes(`/blog/${SLUG}`),
      "fe-goukaku-ten-irt から新記事への inbound リンクが無い",
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
