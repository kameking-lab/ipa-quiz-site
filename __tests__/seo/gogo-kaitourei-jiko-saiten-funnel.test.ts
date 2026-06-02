import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 「応用情報 午後 解答例 / IPA 採点講評 / 午後 自己採点」は高インテント・競合薄
// （道場はAP午後を採点しない）。既存の午後記事は「書き方／部分点／時間配分」を扱うが、
// IPA公式の解答例・採点講評を「どこで入手し、どう自己採点に使うか」という access/discovery
// インテントの専用ページが不在だった。新記事 gogo-kaitourei-jiko-saiten を追加した。
// この記事が
// (1) 午後対策/自己採点/解答例の記事として登録され、
// (2) 核心（IPAが問題・配点割合・解答例・採点講評を無料公開・解答例は一例・部分点内訳は非公開）
//     を述べ、公式入手先 ipa.go.jp へリンクし、
// (3) 記述式区分（AP/NW/DB/SC/ES）はハブ＋AIコパイロットへ、論文区分（ST/SA/PM/SM/AU）は
//     旗艦 /essay（参考評価）へ scope を分けて funnel し（誇大回避＝採点基準非公開を明記）、
// (4) 既存 gogo-kijutsu-buhanten から inbound を受け orphan 化せず、
// (5) FAQPage 化でき blog サイトマップに掲載される、ことを pin する。

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
    // 公式入手先（許諾・使用料不要）への出典リンク
    expect(body).toContain("ipa.go.jp/shiken/mondai-kaiotu");
    expect(body).toContain("許諾");
  });

  it("記述式区分（AP/NW/DB/SC/ES）のハブへ funnel する", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    for (const hub of ["](/ap", "](/nw", "](/db", "](/sc", "](/es"]) {
      expect(body, `${hub} へのリンクが無い`).toContain(hub);
    }
  });

  it("論文区分は旗艦 /essay（参考評価）へ送客し、採点基準が非公開である旨を明記する（誇大回避）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 論文区分の自己採点は旗艦 /essay（AI採点）へ
    expect(body).toContain("](/essay");
    // 参考評価＝断定しない／採点基準は IPA 非公開
    expect(body).toContain("参考");
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
