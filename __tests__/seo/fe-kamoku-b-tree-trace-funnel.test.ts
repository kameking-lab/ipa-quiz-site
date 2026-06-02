import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 科目B の発展トレース vein の総仕上げ。fe-kamoku-b-wakaranai「頻出パターン7つ」item6 =
// 木構造の探索（DFS/BFS）は、各ノードが left・right の 2 本の参照を持つため
// クラス・参照・未定義の記法を要し、s102 で記法早見表に基盤を確立してから着手した。
// 連結リスト（参照1本）→ 木（参照2本）、再帰（コールスタック）→ 深さ優先、
// キュー（FIFO）→ 幅優先、という前3記事の集大成として、二分木（二分木）のトレース記事を新設した。これが
// (1) 擬似言語タグの FE 科目B 記事として登録され、
// (2) 木構造の核心（左右2本の参照・未定義=葉・深さ優先/幅優先・4巡回順の手トレース結果）を正しく述べ、
// (3) モック非依存の安全な土台導線へ funnel し、旗艦 /essay には送らず、
// (4) /fe/topic を「科目A 相当・科目B そのものの形式ではない」と正確に framing し、
// (5) 親記事 fe-kamoku-b-renketsu-list と fe-kamoku-b-wakaranai から inbound を受け、
// (6) 記法基盤の記法早見表（クラス・参照節）へ inbound する、ことを pin する。

const SLUG = "fe-kamoku-b-tree-trace";
const INBOUND_PARENTS = ["fe-kamoku-b-renketsu-list", "fe-kamoku-b-wakaranai"];

describe("FE 科目B 木構造 トレース記事の事実性と土台 funnel", () => {
  it("記事が存在し FE の科目B 擬似言語記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.exam).toBe("fe");
    expect(post!.tags).toContain("擬似言語");
  });

  it("木構造の核心（左右2本の参照・クラス・メンバ.・未定義・深さ優先/幅優先・4巡回順の手トレース結果）を正しく述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 代入は ←
    expect(body).toContain("←");
    // record/参照型の記法（記法早見表で確立した記法基盤）
    expect(body).toContain("木構造");
    expect(body).toContain("二分木");
    expect(body).toContain("クラス");
    expect(body).toContain("メンバ変数");
    expect(body).toContain("参照");
    expect(body).toContain("未定義");
    // 左右2本のドット参照（メンバアクセス）
    expect(body).toContain(".left");
    expect(body).toContain(".right");
    expect(body).toContain(".val");
    // 大域変数で根を保持
    expect(body).toContain("大域");
    // 深さ優先と幅優先の2系統
    expect(body).toContain("深さ優先");
    expect(body).toContain("幅優先");
    // 4 つの巡回順（手トレースで検算した結果）
    expect(body).toContain("1 → 2 → 4 → 5 → 3"); // 行きがけ(preorder)
    expect(body).toContain("4 → 2 → 5 → 1 → 3"); // 通りがけ(inorder)
    expect(body).toContain("4 → 5 → 2 → 3 → 1"); // 帰りがけ(postorder)
    expect(body).toContain("1 → 2 → 3 → 4 → 5"); // レベル順(BFS)
  });

  it("モック非依存の安全な土台導線へ funnel し、旗艦には送らない", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("/blog/fe-kamoku-b-renketsu-list");
    expect(body).toContain("/blog/fe-kamoku-b-stack-queue");
    expect(body).toContain("/blog/fe-kamoku-b-saiki-trace");
    expect(body).toContain("/blog/fe-kamoku-b-trace-renshu");
    expect(body).toContain("/blog/fe-kamoku-b-nibun-tansaku");
    expect(body).toContain("/blog/fe-kamoku-b-sort-trace");
    expect(body).toContain("/blog/fe-kamoku-b-pseudo-language");
    expect(body).toContain("/blog/fe-kamoku-b-taisaku");
    expect(body).toContain("/blog/fe-kamoku-b-wakaranai");
    // 記法基盤の記法早見表へ inbound
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

  it("親記事（連結リスト／科目Bがわからない人へ）から inbound リンクがあり orphan 化しない", () => {
    for (const parentSlug of INBOUND_PARENTS) {
      const parent = getBlogPostBySlug(parentSlug);
      expect(parent, `${parentSlug} が存在しない`).toBeDefined();
      expect(
        parent!.body.includes(`/blog/${SLUG}`),
        `${parentSlug} から新記事への inbound リンクが無い`,
      ).toBe(true);
    }
  });

  it("関連レール(route limit=3)が全て FE 科目B on-topic で off-topic 記事を含まない", () => {
    const railSlugs = getRelatedPosts(SLUG, 3).map((r) => r.slug);
    expect(railSlugs).toContain("fe-kamoku-b-renketsu-list");
    expect(railSlugs.every((s) => s.startsWith("fe-"))).toBe(true);
  });

  it("FAQPage 化できる Q&A を持ち、blog サイトマップに掲載される", () => {
    const post = getBlogPostBySlug(SLUG)!;
    const faqs = extractFaq(post.body);
    expect(faqs.length).toBeGreaterThanOrEqual(3);
    for (const f of faqs) {
      expect(f.question).not.toContain("**");
      expect(f.answer).not.toMatch(/\]\(/);
    }
    const inSummaries = getAllBlogSummaries().some((p) => p.slug === SLUG);
    expect(inSummaries, "新記事が blog サマリ／サイトマップに無い").toBe(true);
  });
});
