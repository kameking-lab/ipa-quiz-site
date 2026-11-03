import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 「情報処理技術者試験 同時受験 / 併願 / 複数区分 / 2つ 受けられる」は高インテントだが
// 既存記事では「複数区分」が "時間をかけて複数取る" 文脈でしか触れられておらず、
// 「同じ試験日に同時受験できるか」を正面から扱う専用ページが無かった。新記事
// ipa-shiken-fukusuu-kubun-juken を追加した。この記事が
// (1) 複数区分/制度の記事として登録され、
// (2) 公式の核心事実（AP・高度・SCは各期1回・1区分、通年CBTは別日程で受験可能）を正しく述べ、
// (3) ロードマップ/申込フロー/各ハブへ funnel し（誇大な採点訴求はしない）、
// (4) 既存の関連記事から inbound を受け orphan 化せず、
// (5) FAQPage 化でき blog サイトマップに掲載される、ことを pin する。

const SLUG = "ipa-shiken-fukusuu-kubun-juken";
const INBOUND_PARENTS = [
  "ipa-shiken-moushikomi-nagare",
  "it-shikaku-nendaibetsu-roadmap",
];

describe("複数区分 同時受験の可否記事の事実性と funnel", () => {
  it("記事が存在し 複数区分/制度の記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.tags).toContain("複数区分");
    expect(post!.tags).toContain("制度");
  });

  it("核心事実（各期1回・1区分、通年CBTは別日程で受験可能）を正しく述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // AP・高度・SCは同じ期に複数区分を申し込めない。
    expect(body).toContain("同じ試験日に複数の区分を同時受験することはできません");
    expect(body).toContain("申込みは1回のみ");
    expect(body).toContain("同じ期に複数の試験区分は申し込めません");
    // 通年CBTと期間制CBTは別の申込制度。
    expect(body).toContain("通年CBT");
    expect(body).toContain("期間制CBT");
    // 時期をずらせば年に複数可能
    expect(body).toContain("時期を分ければ、複数資格を狙えます");
    expect(body).toContain("前期にNW、後期にDB");
  });

  // 2026年度は同日衝突ではなく各期1区分の申込制限。
  it("2026年度の同じ期にAPとNWを併願できない例がある", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("前期にAPとNWを両方申し込むことはできません");
    expect(body).toContain("科目A群と科目B群の実施日が離れていても");
    expect(body).not.toContain("同じ秋期に NW");
    expect(body).not.toContain("同じ春期に AP と PM");
  });

  it("ロードマップ/申込フロー/試験ハブへ funnel し、誇大な採点訴求をしない", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("/blog/it-shikaku-nendaibetsu-roadmap");
    expect(body).toContain("/blog/ipa-shiken-moushikomi-nagare");
    expect(body).toContain("](/ap");
    expect(body).toContain("](/fe");
    // 制度（スケジュール）記事なので旗艦 /essay の採点訴求はしない（誇大回避）
    expect(body).not.toContain("](/essay");
  });

  it("既存の関連記事から inbound リンクがあり orphan 化しない", () => {
    for (const parentSlug of INBOUND_PARENTS) {
      const parent = getBlogPostBySlug(parentSlug);
      expect(parent, `${parentSlug} が存在しない`).toBeDefined();
      expect(
        parent!.body.includes(`/blog/${SLUG}`),
        `${parentSlug} から ${SLUG} への inbound リンクが無い`,
      ).toBe(true);
    }
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
