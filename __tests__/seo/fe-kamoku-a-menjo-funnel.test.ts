import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 「基本情報 科目A免除 / 午前免除 / 認定講座 修了試験 / 科目Bだけ」は高インテント・競合薄だが、
// コーパスには専用ページが無く（午前I免除=高度試験 は別記事でカバー済）取り残しだった。
// 新記事 fe-kamoku-a-menjo を追加した。この記事が
// (1) 基本情報/科目A免除/制度 の記事として FE 区分で登録され、
// (2) 公式の核心事実（認定講座の修了試験合格で科目A免除・開始日から1年・本番は科目Bのみ・修了認定者管理番号が必要）を正しく述べ、
// (3) 土台=科目B（/fe・科目Bピラー・アルゴリズム分野プール）へ funnel し旗艦/essay の採点訴求はしない（FEは論文区分でない＝誇大回避）、
// (4) 高度試験の午前I免除とは別制度だと明示し混同を避ける、
// (5) 既存の関連記事から inbound を受け orphan 化せず、
// (6) FAQPage 化でき blog サイトマップに掲載される、ことを pin する。

const SLUG = "fe-kamoku-a-menjo";
const INBOUND_PARENTS = ["fe-goukaku-ten-irt", "fe-kamoku-b-taisaku"];

describe("基本情報 科目A免除制度 記事の事実性と funnel", () => {
  it("記事が存在し 基本情報/科目A免除/制度 の FE 記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.exam).toBe("fe");
    expect(post!.tags).toContain("科目A免除");
    expect(post!.tags).toContain("制度");
  });

  it("核心事実（認定講座の修了試験合格で科目A免除・開始日から1年・本番は科目Bのみ・修了認定者管理番号）を正しく述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 認定講座の修了試験合格が条件
    expect(body).toContain("修了試験");
    expect(body).toContain("認定");
    // 有効期間=開始日から1年間
    expect(body).toContain("開始日から1年間");
    // 本番は科目Bのみ
    expect(body).toContain("科目B のみ");
    // 申込時に修了認定者管理番号が必要
    expect(body).toContain("修了認定者管理番号");
    // 旧称=午前免除
    expect(body).toContain("午前免除");
  });

  it("土台=科目B へ funnel し、旗艦 /essay の採点訴求はしない（FEは論文区分でない＝誇大回避）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 科目Bピラー・つまずき切り分け・アルゴリズム分野プールへ funnel
    expect(body).toContain("/blog/fe-kamoku-b-taisaku");
    expect(body).toContain("/blog/fe-kamoku-b-wakaranai");
    expect(body).toContain("/fe/topic/");
    expect(body).toContain("](/fe");
    // FE は論文区分でないため旗艦 /essay の採点訴求はしない
    expect(body).not.toContain("](/essay");
  });

  it("高度試験の午前I免除とは別制度だと明示し混同を避けている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("午前I免除");
    expect(body).toContain("別の制度");
    // 午前I免除記事への参照（混同回避の導線）
    expect(body).toContain("/blog/ipa-gozen1-menjo-jouken");
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
