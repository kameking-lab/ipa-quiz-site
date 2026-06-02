import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 科目B の発展パターン trace vein（s81 線形探索・s82 二分探索・s83 選択ソート＋再帰）は
// すべて「アルゴリズム」を扱っていたが、頻出パターンとして名前は挙がる（fe-kamoku-b-wakaranai
// の「頻出パターン7つ」item4 = スタック・キューの操作）のに、データ構造そのものの操作を
// 擬似言語で 1 つずつトレースして実演する記事は不在だった。その gap を埋める 5 本目として
// fe-kamoku-b-stack-queue（スタック=LIFO／キュー=FIFO の操作トレース実演）を追加した。
// これが
// (1) 擬似言語タグの FE 科目B 記事として登録され、
// (2) スタック/キューの核心（LIFO/FIFO・プッシュ/ポップ/エンキュー/デキュー・同じ入力でも取り出し順が逆・読んでからポインタを動かす）を正しく述べ、
// (3) モック非依存の安全な土台導線へ funnel し、旗艦 /essay には送らず、
// (4) /fe/topic を「科目A 相当・科目B そのものの形式ではない」と正確に framing し、
// (5) 親記事 fe-kamoku-b-saiki-trace と fe-kamoku-b-wakaranai から inbound を受ける、ことを pin する。

const SLUG = "fe-kamoku-b-stack-queue";
const INBOUND_PARENTS = ["fe-kamoku-b-saiki-trace", "fe-kamoku-b-wakaranai"];

describe("FE 科目B スタック・キュー トレース記事の事実性と土台 funnel", () => {
  it("記事が存在し FE の科目B 擬似言語記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.exam).toBe("fe");
    expect(post!.tags).toContain("擬似言語");
  });

  it("スタック/キューの核心（LIFO/FIFO・各操作名・取り出し順の逆転・読んでから動かす）を正しく述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 代入は ← （= ではない）
    expect(body).toContain("←");
    expect(body).toContain("代入");
    // 2 つのデータ構造
    expect(body).toContain("スタック");
    expect(body).toContain("キュー");
    // 出し方のルール（正反対）
    expect(body).toContain("LIFO");
    expect(body).toContain("FIFO");
    expect(body).toContain("後入れ先出し");
    expect(body).toContain("先入れ先出し");
    // 操作名 4 種
    expect(body).toContain("プッシュ");
    expect(body).toContain("ポップ");
    expect(body).toContain("エンキュー");
    expect(body).toContain("デキュー");
    // トレース表（GFM テーブル）を含む
    expect(body).toContain("| 操作 | 頂点（操作後） | スタックの中身（底→上） | 戻り値 |");
    expect(body).toContain("残っている要素（先頭→末尾）");
    // 同じ入力でも取り出し順が逆になる（手トレース結果）。スタック=1→9→7／キュー=3→7→1
    expect(body).toContain("1 → 9 → 7");
    expect(body).toContain("3 → 7 → 1");
  });

  it("モック非依存の安全な土台導線へ funnel し、旗艦には送らない", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("/blog/fe-kamoku-b-saiki-trace");
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

  it("親記事（再帰トレース・科目Bがわからない人へ）から inbound リンクがあり orphan 化しない", () => {
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
    expect(railSlugs).toContain("fe-kamoku-b-saiki-trace");
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
