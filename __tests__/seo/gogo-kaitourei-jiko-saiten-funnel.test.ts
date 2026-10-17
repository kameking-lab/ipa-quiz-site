import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 制度・試験形式の事実確認を維持し、論述導線はIPA公式資料へ案内する。

const SLUG = "gogo-kaitourei-jiko-saiten";

describe("午後 解答例・自己採点記事の事実性と funnel", () => {
  it("記事が存在し 午後対策/自己採点/解答例 の記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.tags).toContain("自己採点");
    expect(post!.tags).toContain("解答例");
    // 単一区分への精密書籍送客はしない（複数区分横断記事＝索引が正解）
    expect(post!.booksExam, "複数区分記事に booksExam を付けない").toBeUndefined();
    expect(post!.exam, "複数区分記事に exam を付けない").toBeUndefined();
  });

  it("核心（IPA公開素材・解答例は一例・部分点内訳は非公開）を述べ、公式入手先へリンクする", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("解答例");
    expect(body).toContain("採点講評");
    expect(body).toContain("配点割合");
    // 解答例は「一例」＝丸暗記照合の誤解を解く
    expect(body).toContain("一例");
    // 部分点の内訳は非公開＝1点単位の自己採点はできない（誇大回避）
    expect(body).toContain("非公開");
    // 公式入手先と、2026年度の実施問題が非公開である旨
    expect(body).toContain("ipa.go.jp/shiken/mondai-kaiotu");
    expect(body).toContain("2026年度のAP・高度・SC");
    expect(body).toContain("当年度の試験問題は非公開");
  });

  it("記述式区分（AP/NW/DB/SC/ES）のハブへ funnel する", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    for (const hub of ["](/ap", "](/nw", "](/db", "](/sc", "](/es"]) {
      expect(body, `${hub} へのリンクが無い`).toContain(hub);
    }
  });

  it("論文区分はIPA公式資料 /essayへ送客し、採点基準が非公開である旨を明記する（誇大回避）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 論文区分の自己採点は旗艦 /essay（AI採点）へ
    expect(body).toContain("](/essay");
    // 参考評価＝断定しない／採点基準は IPA 非公開
    expect(body).toContain("IPA 公式の午後II過去問・解答例・採点講評");
    // 論文区分ハブも案内
    for (const hub of ["](/st", "](/sa", "](/pm", "](/sm", "](/au"]) {
      expect(body, `${hub} へのリンクが無い`).toContain(hub);
    }
  });

  it("gogo-kijutsu-buhanten から inbound リンクがあり orphan 化しない", () => {
    const parent = getBlogPostBySlug("gogo-kijutsu-buhanten");
    expect(parent, "gogo-kijutsu-buhanten が存在しない").toBeDefined();
    expect(
      parent!.body.includes(`/blog/${SLUG}`),
      `gogo-kijutsu-buhanten から ${SLUG} への inbound リンクが無い`,
    ).toBe(true);
  });

  it("FAQPage 化できる Q&A を持ち、blog サイトマップに掲載される", () => {
    const post = getBlogPostBySlug(SLUG)!;
    const faqs = extractFaq(post.body);
    expect(faqs.length).toBeGreaterThanOrEqual(4);
    for (const f of faqs) {
      expect(f.question).not.toContain("**");
      // extractFaq がリンク記法を剥がすため JSON-LD テキストに `](` は残らない
      expect(f.answer).not.toMatch(/\]\(/);
    }
    const inSummaries = getAllBlogSummaries().some((p) => p.slug === SLUG);
    expect(inSummaries, "新記事が blog サマリ／サイトマップに無い").toBe(true);
  });
});
