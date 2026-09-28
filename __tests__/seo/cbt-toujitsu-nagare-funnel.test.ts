import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 「CBT 当日 流れ / 試験会場 何をする」は初受験者の高インテントクエリだが、
// 会場での当日の流れ（受付→本人確認→荷物預け→説明・入室→受験→終了）を順を追って
// 扱う専用記事が不在だった（cbt-vs-pbt に 4 ステップの要約があるのみ）。
// IP/SG/FEは通年CBTだが、確認票や会場貸与の筆記用具が区分で異なる。
// 2026年度のAP/高度/SCは期間制CBTで、通年区分の当日手順を流用できない。
// 制度=採点無関係ゆえ旗艦 /essay へは funnel しない（s27/s65 precedent）。
// これが (1) cross-区分 general 記事として登録され、(2) 検証済みの CBT 当日事実を含み、
// (3) /essay へ誤送客せず、(4) 2 記事から inbound を受け orphan 化せず、
// (5) FAQPage 化できる、ことを pin。

const SLUG = "cbt-shiken-toujitsu-nagare";
const INBOUND = ["ipa-shiken-cbt-vs-pbt", "ipa-shiken-moushikomi-nagare"];

describe("CBT 当日の流れ記事の事実性と funnel 規律", () => {
  it("記事が存在し cross-区分の制度 general 記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    // CBT 通年 3 区分（IP/SG/FE）横断のため単一 exam は持たない
    expect(post!.exam).toBeUndefined();
    expect(post!.booksExam).toBeUndefined();
    expect(post!.tags).toContain("CBT");
    expect(post!.tags).toContain("当日");
  });

  it("区分ごとの受付・本人確認・メモ・評価点を説明する", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("予約した区分の集合時刻");
    expect(body).toContain("本人確認");
    expect(body).toContain("ロッカー");
    expect(body).toContain("ITパスポートは「確認票」");
    expect(body).toContain("メモ用紙");
    expect(body).toContain("シャープペンシル");
    expect(body).toContain("ボールペン");
    expect(body).toContain("評価点");
    expect(body).toContain("2026年度の通常試験はAP・高度・SCもCBT");
    expect(body).toContain("科目A群とB群は別の期間");
  });

  it("制度記事ゆえ旗艦 /essay へは funnel せず、土台=入門区分へ送客する", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).not.toContain("](/essay)");
    // 土台=入門 CBT 3 区分のハブへ funnel（画面慣れ＝Web 演習）
    expect(body).toContain("](/ip)");
    expect(body).toContain("](/fe)");
    expect(body).toContain("](/sg)");
    // 受験後の結果確認は専用記事へ送る
    expect(body).toContain("/blog/cbt-goukaku-happyou-score-report");
  });

  it("2 つの関連記事から inbound リンクを受け orphan 化しない", () => {
    for (const slug of INBOUND) {
      const parent = getBlogPostBySlug(slug);
      expect(parent, `${slug} が存在しない`).toBeDefined();
      expect(
        parent!.body.includes(`/blog/${SLUG}`),
        `${slug} から新記事への inbound リンクが無い`,
      ).toBe(true);
    }
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
