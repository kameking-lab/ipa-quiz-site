import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 「応用情報 勉強時間 / 何時間 / 学習時間」は高ボリューム・競合薄だが、
// 基本情報には専用ページ（fe-benkyou-jikan-meyasu）があるのに応用情報には無く
// 非対称だった取り残しを解消する新記事 ap-benkyou-jikan-meyasu を追加した。この記事が
// (1) 応用情報/勉強時間/学習計画 の記事として AP 区分で登録され、
// (2) SSOT と一致する核心事実（午前80問・午後記述5問・各100点満点60点基準・午前未達なら午後不採点・
//     「500時間」は初学者基準の平均値・午前4:午後6 配分）を正しく述べ、
// (3) 土台/AP 導線（/ap・AP午後選択/時間配分/合格基準記事）へ funnel し、
//     旗艦 /essay の採点訴求はしない（AP午後採点はモック=HD-4・AP は論文区分でない＝誇大回避）、
// (4) 既存記事（hatarakinagara-goukaku の「500時間神話」節）から inbound を受け orphan 化せず、
// (5) FAQPage 化でき blog サイトマップに掲載される、ことを pin する。

const SLUG = "ap-benkyou-jikan-meyasu";
const INBOUND_PARENTS = ["hatarakinagara-goukaku"];

describe("応用情報 勉強時間の目安 記事の事実性と funnel", () => {
  it("記事が存在し 応用情報/勉強時間/学習計画 の AP 記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.exam).toBe("ap");
    expect(post!.tags).toContain("応用情報");
    expect(post!.tags).toContain("勉強時間");
  });

  it("SSOT と一致する核心事実（午前80問・午後記述5問・各60点基準・午前未達なら午後不採点・500時間=平均値・午前4:午後6）を述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("80 問");
    expect(body).toContain("記述式 5 問");
    expect(body).toContain("60 点以上");
    expect(body).toContain("午後は採点されない");
    expect(body).toContain("500 時間");
    expect(body).toContain("午前 4：午後 6");
  });

  it("AP/土台導線へ funnel し、旗艦 /essay の採点訴求はしない（AP午後採点=モック=HD-4・誇大回避）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("](/ap)");
    expect(body).toContain("/blog/ap-gogo-sentaku");
    expect(body).toContain("/blog/ap-goukaku-ten-border");
    expect(body).toContain("/blog/ap-gogo-jikan-haibun");
    // AP は論文区分でなく午後採点はモック（HD-4）のため旗艦 /essay の採点訴求はしない
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
