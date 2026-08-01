import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 再帰は既存の科目B 記事群で「頻出パターン（線形探索・二分探索・ソート・再帰）」として
// 名前は挙がるものの、擬似言語で 1 段ずつトレースして実演する記事は不在だった。
// s81 trace-renshu（線形）・s82 nibun-tansaku（二分探索）・s83 sort-trace（選択ソート）に
// 続く「発展パターン」の 4 本目として fe-kamoku-b-saiki-trace（再帰のトレース実演）を追加した。
// コールスタックという新概念（呼び出しの下り・戻り値の上り・LIFO）を扱う。これが
// (1) 擬似言語タグの FE 科目B 記事として登録され、
// (2) 再帰の核心（基底条件・コールスタック・戻り値が深いところから巻き戻る・各 n は独立）を正しく述べ、
// (3) モック非依存の安全な土台導線へ funnel し、旗艦 /essay には送らず、
// (4) /fe/topic を「科目A 相当・科目B そのものの形式ではない」と正確に framing し、
// (5) 親記事 fe-kamoku-b-sort-trace から inbound を受ける、ことを pin する。

const SLUG = "fe-kamoku-b-saiki-trace";
const PARENT = "fe-kamoku-b-sort-trace";

describe("FE 科目B 再帰トレース記事の事実性と土台 funnel", () => {
  it("記事が存在し FE の科目B 擬似言語記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.exam).toBe("fe");
    expect(post!.tags).toContain("擬似言語");
  });

  it("再帰の核心（基底条件・コールスタック・LIFO で巻き戻る・各 n は独立）を正しく述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 代入は ← （= ではない）
    expect(body).toContain("←");
    expect(body).toContain("代入");
    // 再帰そのもの
    expect(body).toContain("再帰");
    // 止まる条件＝基底条件（最大の落とし穴）
    expect(body).toContain("基底条件");
    // 呼び出しの積み重なり＝コールスタック
    expect(body).toContain("コールスタック");
    // 戻り値は後入れ先出しで巻き戻る
    expect(body).toContain("LIFO");
    expect(body).toContain("巻き戻");
    // 階乗の検算結果（手計算: 4! = 24）が本文に現れる
    expect(body).toContain("24");
    // 各呼び出しの変数は独立（上書きされない）
    expect(body).toContain("独立");
    // トレース表（GFM テーブル）を含む
    expect(body).toContain("| 段 | 呼び出し |");
  });

  it("モック非依存の安全な土台導線へ funnel し、旗艦には送らない", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("/blog/fe-kamoku-b-sort-trace");
    expect(body).toContain("/blog/fe-kamoku-b-nibun-tansaku");
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

  it("親記事（ソートトレース）から inbound リンクがあり orphan 化しない", () => {
    const parent = getBlogPostBySlug(PARENT);
    expect(parent).toBeDefined();
    expect(
      parent!.body.includes(`/blog/${SLUG}`),
      "fe-kamoku-b-sort-trace から新記事への inbound リンクが無い",
    ).toBe(true);
  });

  it("関連レール(route limit=3)が全て FE 科目B on-topic で off-topic 記事を含まない", () => {
    const railSlugs = getRelatedPosts(SLUG, 3).map((r) => r.slug);
    expect(railSlugs).toContain("fe-kamoku-b-sort-trace");
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
