import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 制度・試験形式の事実確認を維持し、論述導線はIPA公式資料へ案内する。

const SLUG = "koudo-gozen1-taisaku";
const INBOUND_PARENTS = ["ipa-gozen1-menjo-jouken", "koudo-goukaku-ten-ashikiri"];

describe("高度試験 午前I対策 記事の事実性と funnel", () => {
  it("記事が存在し 高度試験/午前I/勉強法 の cross-区分記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.tags).toContain("高度試験");
    expect(post!.tags).toContain("午前I");
    // cross-区分（単一区分でない）ため exam / booksExam は未設定（索引送客）
    expect(post!.exam).toBeUndefined();
    expect(post!.booksExam).toBeUndefined();
  });

  it("核心事実（30問・50分・四択・基準点60点・応用情報と同範囲・多段階選抜）を正しく述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("30 問");
    expect(body).toContain("50 分");
    expect(body).toContain("四肢択一");
    expect(body).toContain("60 点");
    // 30問中18問で6割
    expect(body).toContain("18 問");
    // 出題範囲=応用情報の午前と同じ
    expect(body).toContain("応用情報");
    // 多段階選抜（足切り）の文脈
    expect(body).toContain("多段階選抜");
    // 全区分共通の問題
    expect(body).toContain("共通");
  });

  it("午前対策の土台へ funnel する（応用情報午前/ap・免除判断・足切り基準）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // 出題範囲が同じ応用情報の午前過去問へ
    expect(body).toContain("](/ap");
    // 免除という選択肢の判断記事
    expect(body).toContain("/blog/ipa-gozen1-menjo-jouken");
    // 足切り/合格基準の仕組み記事
    expect(body).toContain("/blog/koudo-goukaku-ten-ashikiri");
  });

  it("午後の公式資料へ論述区分のみ案内する", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("](/essay");
    expect(body).toContain("IPA 公式の午後II過去問・解答例・採点講評");
    expect(body).not.toContain("[午後論述 AI 採点](/essay)");
    // 論述系区分に限定した文脈であること（ST/SA/PM/SM/AU の言及）
    expect(body).toContain("論述系区分");
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
      // FAQ 回答には markdown リンクを含めない（JSON-LD leak 回避）
      expect(f.answer).not.toMatch(/\]\(/);
    }
    const inSummaries = getAllBlogSummaries().some((p) => p.slug === SLUG);
    expect(inSummaries, "新記事が blog サマリ／サイトマップに無い").toBe(true);
  });
});
