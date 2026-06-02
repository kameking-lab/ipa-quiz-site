import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 既存の科目B 記事は全て「メタ」（勉強法・時間配分・記法早見表・つまずき切り分け）で、
// 具体的なアルゴリズムを擬似言語で 1 行ずつトレースして見せる「解き方の実演」記事が
// 不在だった。記法早見表 fe-kamoku-b-gijigengo-kihou は「記法を覚えたら手を動かす」と
// 述べるのにその実演先が無く、訓練法 fe-kamoku-b-pseudo-language は「3ステップ訓練法」
// という方法論で、具体例での実演ではなかった。この橋渡しを埋める新記事
// fe-kamoku-b-trace-renshu（合計・最大値・線形探索のトレース実演）を追加した。これが
// (1) 擬似言語タグの FE 科目B 記事として登録され、
// (2) トレースの核心（← 代入・配列1始まり・3つの基本アルゴリズム）を正しく述べ、
// (3) モック非依存の安全な土台導線へ funnel し、旗艦 /essay には送らず、
// (4) /fe/topic を「科目A 相当・科目B そのものの形式ではない」と正確に framing し、
// (5) 記法早見表 fe-kamoku-b-gijigengo-kihou から inbound を受ける、ことを pin する。

const SLUG = "fe-kamoku-b-trace-renshu";
const PARENT = "fe-kamoku-b-gijigengo-kihou";

describe("FE 科目B 擬似言語トレース練習記事の事実性と土台 funnel", () => {
  it("記事が存在し FE の科目B 擬似言語記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.exam).toBe("fe");
    expect(post!.tags).toContain("擬似言語");
  });

  it("トレースの核心（代入・配列1始まり・3つの基本アルゴリズム）を正しく述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 代入は ← （= ではない）
    expect(body).toContain("←");
    expect(body).toContain("代入");
    // 配列は 1 始まり（誇大回避の核心事実）
    expect(body).toContain("要素番号は 1 から始まる");
    // 3つの題材アルゴリズム
    expect(body).toContain("合計");
    expect(body).toContain("最大値");
    expect(body).toContain("線形探索");
    // トレース表（GFM テーブル）を含む
    expect(body).toContain("| ループ回 |");
  });

  it("モック非依存の安全な土台導線へ funnel し、旗艦には送らない", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
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

  it("記法早見表記事から inbound リンクがあり orphan 化しない", () => {
    const parent = getBlogPostBySlug(PARENT);
    expect(parent).toBeDefined();
    expect(
      parent!.body.includes(`/blog/${SLUG}`),
      "fe-kamoku-b-gijigengo-kihou から新記事への inbound リンクが無い",
    ).toBe(true);
  });

  it("関連レール(route limit=3)が全て科目B on-topic で off-topic 記事を含まない", () => {
    const railSlugs = getRelatedPosts(SLUG, 3).map((r) => r.slug);
    expect(railSlugs).toContain("fe-kamoku-b-gijigengo-kihou");
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
