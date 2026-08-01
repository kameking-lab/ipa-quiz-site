import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
  getRelatedPosts,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// ソート（整列）は既存の科目B 記事群で「頻出パターン（線形探索・二分探索・ソート・再帰）」
// として名前は挙がるものの、擬似言語で 1 行ずつトレースして実演する記事は不在だった。
// s81 fe-kamoku-b-trace-renshu（線形探索ほか）・s82 fe-kamoku-b-nibun-tansaku（二分探索）
// に続く「発展パターン」の 3 本目として fe-kamoku-b-sort-trace（選択ソートのトレース実演）
// を追加した。二重ループ（外側 i・内側 j）という新しい難所を扱う。これが
// (1) 擬似言語タグの FE 科目B 記事として登録され、
// (2) 選択ソートの核心（min は位置・tmp を使う交換・内側ループは i+1 から）を正しく述べ、
// (3) モック非依存の安全な土台導線へ funnel し、旗艦 /essay には送らず、
// (4) /fe/topic を「科目A 相当・科目B そのものの形式ではない」と正確に framing し、
// (5) 親記事 fe-kamoku-b-nibun-tansaku から inbound を受ける、ことを pin する。

const SLUG = "fe-kamoku-b-sort-trace";
const PARENT = "fe-kamoku-b-nibun-tansaku";

describe("FE 科目B ソートトレース記事の事実性と土台 funnel", () => {
  it("記事が存在し FE の科目B 擬似言語記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.exam).toBe("fe");
    expect(post!.tags).toContain("擬似言語");
  });

  it("選択ソートの核心（min は位置・tmp を使う交換・二重ループ・i+1 開始）を正しく述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 代入は ← （= ではない）
    expect(body).toContain("←");
    expect(body).toContain("代入");
    // ソート＝整列であることを明示
    expect(body).toContain("整列");
    // min は値でなく位置（添字）を覚える（最大の落とし穴）
    expect(body).toContain("位置（添字）");
    expect(body).toContain("A[min]");
    // 交換は tmp を経由する 3 行
    expect(body).toContain("tmp");
    // 二重ループ（外側 i・内側 j）
    expect(body).toContain("二重ループ");
    // 内側ループは i + 1 から
    expect(body).toContain("i + 1 から");
    // 配列は 1 始まり（誇大回避の核心事実）
    expect(body).toContain("要素番号は 1 から始まる");
    // トレース表（GFM テーブル）を含む
    expect(body).toContain("| j | A[j] |");
  });

  it("モック非依存の安全な土台導線へ funnel し、旗艦には送らない", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
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

  it("親記事（二分探索）から inbound リンクがあり orphan 化しない", () => {
    const parent = getBlogPostBySlug(PARENT);
    expect(parent).toBeDefined();
    expect(
      parent!.body.includes(`/blog/${SLUG}`),
      "fe-kamoku-b-nibun-tansaku から新記事への inbound リンクが無い",
    ).toBe(true);
  });

  it("関連レール(route limit=3)が全て FE 科目B on-topic で off-topic 記事を含まない", () => {
    const railSlugs = getRelatedPosts(SLUG, 3).map((r) => r.slug);
    expect(railSlugs).toContain("fe-kamoku-b-nibun-tansaku");
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
