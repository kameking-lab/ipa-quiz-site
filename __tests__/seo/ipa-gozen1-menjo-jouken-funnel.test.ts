import { describe, expect, it } from "vitest";

import {
  getAllBlogSummaries,
  getBlogPostBySlug,
} from "@/data/blog";
import { extractFaq } from "@/lib/blog/faq";

// x1 updates the exemption article for the specific 2026 late CBT sitting.
// Keep its verified eligible periods and practice links, rather than restoring
// the older generic two-year wording or unrelated essay-grading funnel.

const SLUG = "ipa-gozen1-menjo-jouken";
const INBOUND_PARENTS = ["ipa-koudo-9kubun-chigai", "13-shikaku-osusume-jyun"];

describe("午前I免除の条件記事の事実性と funnel", () => {
  it("記事が存在し 午前I免除の記事として登録されている", () => {
    const post = getBlogPostBySlug(SLUG);
    expect(post, `${SLUG} が存在しない`).toBeDefined();
    expect(post!.tags).toContain("午前I免除");
    expect(post!.tags).toContain("高度試験");
  });

  it("後期CBTの対象回と科目A-1・A-2の免除を区別する", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    expect(body).toContain("2024年度秋期・2025年度春期・2025年度秋期・2026年度前期のAP、高度、SCの合格");
    expect(body).toContain("2026年度前期の高度、SCの科目A-1通過");
    expect(body).toContain("2024年度春期は、この後期の対象一覧には含まれていません");
    expect(body).toContain("免除の適用が確定するのは合格者の受験番号の官報公示日");
    expect(body).toContain("AP合格を理由に科目A-2も省けると判断しない");
    expect(body).toContain("https://www.ipa.go.jp/shiken/2026/ap_koudo_sc_kikan.html");
  });

  it("対象区分の過去問へ進み、免除手順から論文採点へ誤誘導しない", () => {
    const body = getBlogPostBySlug(SLUG)!.body;
    for (const exam of ["pm", "db", "es", "au", "sc"]) expect(body).toContain(`](/${exam}/2025-autumn)`);
    expect(body).not.toContain("](/essay");
  });

  it("既存の免除言及記事から inbound リンクがあり orphan 化しない", () => {
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
    expect(faqs.map(faq => faq.question)).toEqual([
      "APの科目Aを通過すれば免除できますか？",
      "2024年度春期の合格は後期の対象ですか？",
    ]);
    for (const f of faqs) {
      expect(f.question).not.toContain("**");
      expect(f.answer).not.toMatch(/\]\(/);
    }
    const inSummaries = getAllBlogSummaries().some((p) => p.slug === SLUG);
    expect(inSummaries, "新記事が blog サマリ／サイトマップに無い").toBe(true);
  });
});
