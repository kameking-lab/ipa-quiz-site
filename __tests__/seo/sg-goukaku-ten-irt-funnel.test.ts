import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// 「セキュマネ 合格点 / 何点で合格 / 配点 / IRT」は高インテント・競合薄だが、
// IP（ip-goukaku-ten-bunyabetsu）・FE（fe-goukaku-ten-irt）・AP（ap-goukaku-ten-border）・
// 高度（koudo-goukaku-ten-ashikiri）には専用の合格点ページがあるのに、SG だけ専用ページが無い
// 区分間 非対称だった取り残しを解消する新記事 sg-goukaku-ten-irt を追加した。この記事が
// (1) 情報セキュリティマネジメント/合格基準/科目B の記事として SG 区分で登録され、
// (2) IPA 公表・SSOT（sg-kamoku-b-jirei-mondai）と一致する核心事実
//     （科目A 48問・科目B 12問・60問120分・総合評価点1000点満点600点・IRT採点・
//      FE と違い科目別足切り無し＝総合点で判定）を正しく述べ、
// (3) 土台/SG 導線（/sg・SG科目B事例記事・SG意味記事・IP合格点記事・FE合格点記事）へ funnel し、
//     旗艦 /essay の採点訴求はしない（SG は論文区分でなく科目Bも多肢選択＝記述/論述ではない＝誇大回避）、
// (4) 既存記事（sg-kamoku-b-jirei-mondai の採点説明段落）から inbound を受け orphan 化せず、
// (5) FAQPage 化でき blog サイトマップに掲載される、ことを pin する。

const SLUG = "sg-goukaku-ten-irt";
const INBOUND_PARENTS = [
  "sg-kamoku-b-jirei-mondai",
  "sg-shiken-meritto-imi-aru",
  "fe-goukaku-ten-irt",
];

describe("情報セキュリティマネジメント 合格点 記事の事実性と funnel", () => {
  it("記事が存在し 情報セキュリティマネジメント/合格基準/科目B の SG 記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.exam).toBe("sg");
    expect(post!.tags).toContain("情報セキュリティマネジメント");
    expect(post!.tags).toContain("合格基準");
  });

  it("IPA公表・SSOT と一致する核心事実（48問/12問・60問120分・総合1000点満点600点・IRT・科目別足切り無し）を述べている", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("48問");
    expect(body).toContain("12問");
    expect(body).toContain("60問・120分");
    expect(body).toContain("1000点満点");
    expect(body).toContain("600点以上");
    expect(body).toContain("IRT");
    // FE との最重要差分：科目別の足切りが無く総合評価点で判定する
    expect(body).toContain("総合評価点");
    expect(body).toContain("足切り");
  });

  it("SG/土台導線へ funnel し、旗艦 /essay の採点訴求はしない（SG は論文区分でない＝誇大回避）", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("](/sg)");
    expect(body).toContain("/blog/sg-kamoku-b-jirei-mondai");
    expect(body).toContain("/blog/fe-goukaku-ten-irt");
    expect(body).toContain("/blog/ip-goukaku-ten-bunyabetsu");
    // SG は論文区分でなく科目Bも多肢選択（記述/論述ではない）ため旗艦 /essay の採点訴求はしない
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
