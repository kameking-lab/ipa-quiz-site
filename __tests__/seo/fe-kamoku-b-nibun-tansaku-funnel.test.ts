import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 二分探索（バイナリサーチ）は既存の科目B 記事群で「頻出パターン」として 5 箇所以上
// 名前は挙がるものの、擬似言語で 1 行ずつトレースして実演する記事は不在だった。
// s81 の fe-kamoku-b-trace-renshu は合計・最大値・線形探索を扱ったが、より難しく
// 同じく頻出の二分探索は未実演だった。この「発展パターン」の最初の 1 本として
// fe-kamoku-b-nibun-tansaku（二分探索のトレース実演）を追加した。これが
// (1) 擬似言語タグの FE 科目B 記事として登録され、
// (2) 二分探索の核心（ソート済み前提・mid 整数除算切り捨て・lo/hi/mid・lo>hi で未発見）を正しく述べ、
// (3) モック非依存の安全な土台導線へ funnel し、旗艦 /essay には送らず、
// (4) /fe/topic を「科目A 相当・科目B そのものの形式ではない」と正確に framing し、
// (5) 親記事 fe-kamoku-b-trace-renshu から inbound を受ける、ことを pin する。

const SLUG = "fe-kamoku-b-nibun-tansaku";
const PARENT = "fe-kamoku-b-trace-renshu";

describe("FE 科目B 二分探索トレース記事の事実性と土台 funnel", () => {
  it("記事が存在し FE の科目B 擬似言語記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.exam).toBe("fe");
    expect(post!.tags).toContain("擬似言語");
  });

  it("二分探索の核心（ソート済み前提・整数除算切り捨て・lo>hi で未発見）を正しく述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 代入は ← （= ではない）
    expect(body).toContain("←");
    expect(body).toContain("代入");
    // 二分探索の絶対前提＝ソート済み
    expect(body).toContain("ソート済み");
    // mid は整数除算で切り捨て（最大の落とし穴）
    expect(body).toContain("切り捨て");
    // 範囲枯渇で未発見＝lo > hi
    expect(body).toContain("lo > hi");
    // 配列は 1 始まり（誇大回避の核心事実）
    expect(body).toContain("要素番号は 1 から始まる");
    // トレース表（GFM テーブル）を含む
    expect(body).toContain("| ループ回 |");
  });

  it("モック非依存の安全な土台導線へ funnel し、旗艦には送らない", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("/blog/fe-kamoku-b-trace-renshu");
    expect(body).toContain("/blog/fe-kamoku-b-pseudo-language");
    expect(body).toContain("/blog/fe-kamoku-b-taisaku");
    expect(body).toContain("/blog/fe-kamoku-b-gijigengo-kihou");
    // 分野別プール（実データ）
    expect(body).toContain("/fe/topic/");
    // 土台記事は旗艦 /essay へは送らない
    expect(body).not.toContain("](/essay");
  });

  it("/fe/topic を科目A 相当の知識土台と正確に framing している（誇大回避）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("科目A");
    expect(body).toContain("科目B そのものの形式ではない");
  });

  it("親記事（トレース練習）から inbound リンクがあり orphan 化しない", () => {
    const parent = getBlogPostBySlug(PARENT);
    expect(parent).toBeDefined();
    expect(
      parent!.body.includes(`/blog/${SLUG}`),
      "fe-kamoku-b-trace-renshu から新記事への inbound リンクが無い",
    ).toBe(true);
  });

  it("関連レール(route limit=3)が全て FE 科目B on-topic で off-topic 記事を含まない", () => {
    const railSlugs = getRelatedPosts(SLUG, 3).map((r) => r.slug);
    expect(railSlugs).toContain("fe-kamoku-b-trace-renshu");
    expect(railSlugs.every((s) => s.startsWith("fe-"))).toBe(true);
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
