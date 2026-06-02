import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 「情報セキュリティマネジメント 科目B / 事例問題 / 長文 苦手 / 解き方」は CBT 通年の入門区分(SG)の
// 高インテント・競合薄クエリだが、コーパスには SG 科目B 専用ページが無く（SG は sg-shiken-meritto-imi-aru
// だけ・科目B対策は未カバー）取り残しだった。新記事 sg-kamoku-b-jirei-mondai を追加した。この記事が
// (1) SG / 科目B / 事例問題 の記事として登録され、
// (2) 公式の核心事実（科目A 48問＋科目B 12問＝計60問・120分／総合600点・IRT／科目B はアルゴリズムでなく長文事例）を正しく述べ、
// (3) 土台=SG ハブ(/sg)・FE 科目Bピラーへ funnel し、旗艦/essay の採点訴求はしない
//     （科目B は多肢選択の事例問題＝論文でない＝誇大回避・HD-6/s27 precedent）、
// (4) 既存の関連記事から inbound を受け orphan 化せず、
// (5) FAQPage 化でき blog サイトマップに掲載される、ことを pin する。

const SLUG = "sg-kamoku-b-jirei-mondai";
const INBOUND_PARENTS = ["sg-shiken-meritto-imi-aru", "ipa-shiken-zenkubun-hikaku"];

describe("SG 科目B 事例問題 記事の事実性と funnel", () => {
  it("記事が存在し SG / 科目B / 事例問題 の記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.exam).toBe("sg");
    expect(post!.tags).toContain("科目B");
    expect(post!.tags).toContain("事例問題");
  });

  it("核心事実（科目A48問＋科目B12問・60問120分・総合600点IRT・科目Bはアルゴリズム非出題）を正しく述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("48 問");
    expect(body).toContain("12 問");
    expect(body).toContain("60 問");
    expect(body).toContain("120 分");
    expect(body).toContain("600 点");
    expect(body).toContain("IRT");
    // 科目B はアルゴリズム（擬似言語）が出ない＝FE 科目B との取り違え防止
    expect(body).toContain("アルゴリズム（擬似言語）は出ません");
  });

  it("土台=SG ハブ・FE 科目Bピラーへ funnel し、旗艦 /essay の採点訴求はしない（事例問題＝誇大回避）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    // SG ハブへ funnel（AI コパイロット導線）
    expect(body).toContain("](/sg");
    // FE 科目Bピラー（同名「科目B」の取り違え整理）へ cross-ref
    expect(body).toContain("/blog/fe-kamoku-b-taisaku");
    // 多肢選択の事例問題＝論文でないため旗艦 /essay の採点訴求はしない（footer chrome は body には出ない）
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
