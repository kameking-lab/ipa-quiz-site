import { describe, expect, it } from "vitest";

import { KEYWORD_PAGES, getKeywordPageBySlug } from "@/data/keywords";
import { ESSAY_EXAM_CODES } from "@/lib/essay/load";
import { ALL_EXAM_CODES } from "@/lib/exam-config";

// Characterization tests for data/keywords.ts — the long-tail SEO keyword
// landing pages. KEYWORD_PAGES.map(p => ({ keyword: p.slug })) feeds
// generateStaticParams for /keywords/[keyword]; getKeywordPageBySlug resolves
// the page. The page renders one /<exam> pill per entry in `exams` and a CTA
// button linking to `/${page.exams[0]}`, so an exams[] holding an unknown code
// (or being empty) produces a 404 link / blank label on a page whose entire
// purpose is to capture and forward inbound search traffic.

const EXAM_CODE_SET = new Set<string>(ALL_EXAM_CODES);

describe("KEYWORD_PAGES registry", () => {
  it("is non-empty with unique slugs (no SSG slug collisions)", () => {
    expect(KEYWORD_PAGES.length).toBeGreaterThan(0);
    const slugs = KEYWORD_PAGES.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every page has the title/description/body the route renders", () => {
    for (const page of KEYWORD_PAGES) {
      expect(page.slug.length).toBeGreaterThan(0);
      expect(page.title.length).toBeGreaterThan(0);
      expect(page.description.length).toBeGreaterThan(0);
      expect(page.body.length).toBeGreaterThan(0);
    }
  });

  it("every exams[] entry is a real exam code (the /<exam> pills + CTA must not 404)", () => {
    for (const page of KEYWORD_PAGES) {
      // exams[0] backs the "関連試験のページを開く" CTA — it must exist.
      expect(page.exams.length).toBeGreaterThan(0);
      for (const code of page.exams) {
        expect(EXAM_CODE_SET.has(code)).toBe(true);
      }
    }
  });
});

describe("getKeywordPageBySlug", () => {
  it("resolves every registered slug back to its own page (round-trip)", () => {
    for (const page of KEYWORD_PAGES) {
      expect(getKeywordPageBySlug(page.slug)?.slug).toBe(page.slug);
    }
  });

  it("returns undefined for an unknown slug (drives the route's notFound)", () => {
    expect(getKeywordPageBySlug("no-such-keyword")).toBeUndefined();
    expect(getKeywordPageBySlug("")).toBeUndefined();
  });
});

// SC(情報処理安全確保支援士)午後は 2023年4月改定で午後I・午後IIが単一の午後(記述式)へ
// 統合済(IPA 公式 kubun/sc.html)。sc-incident-response は /keywords/sc-incident-response
// (indexable・sitemap収録)の title/description/body に廃止済みの「午後 II」を使っていた。
// session20(sc-shikaku-merit)/cycle3(SCロードマップ)と同じ事実の取り残し。
// 統合後の「午後」フレーミングを pin し、廃止構造への regression を防ぐ。
describe("KEYWORD_PAGES — SC 午後 framing は2023統合後（午後Iの/IIの別建てにしない）", () => {
  it("sc-incident-response は廃止済み 午後 II を使わない", () => {
    const page = getKeywordPageBySlug("sc-incident-response");
    expect(page).toBeDefined();
    expect(page!.title).not.toContain("午後 II");
    expect(page!.description).not.toContain("午後 II");
    const fullBody = page!.body.join("\n");
    expect(fullBody).not.toContain("午後 II");
    // 統合後の「午後」フレーミングが残っている（non-vacuous）。
    expect(page!.title.includes("午後") || fullBody.includes("午後")).toBe(true);
  });
});

// 旗艦＝午後II論述 AI 採点 /essay への送客ゲート。app/keywords/[keyword]/page.tsx は
// strategicCta==="essay" かつ exams[] に論文区分(ESSAY_EXAM_CODES)を含むときだけ
// AfternoonEssayHint を描画する。論文区分でない記事(SC=記述・AP/FE=非論述)へ旗艦CTAが
// 漏れると誇大表現になるため、ゲートの drift を pin する。
const ESSAY_CODE_SET = new Set<string>(ESSAY_EXAM_CODES);

describe("KEYWORD_PAGES — 旗艦 /essay 送客ゲート(誇大回避)", () => {
  it("strategicCta:'essay' の記事は必ず論文区分(ST/SA/PM/SM/AU)を持つ", () => {
    const flagged = KEYWORD_PAGES.filter((p) => p.strategicCta === "essay");
    expect(flagged.length).toBeGreaterThan(0); // non-vacuous
    for (const page of flagged) {
      expect(page.exams.some((e) => ESSAY_CODE_SET.has(e))).toBe(true);
    }
  });

  it("論述テーマの st-essay-structure-pattern が旗艦へ送客する", () => {
    expect(getKeywordPageBySlug("st-essay-structure-pattern")?.strategicCta).toBe(
      "essay",
    );
  });

  it("SC(記述・非論文)の sc-incident-response は旗艦 essay CTA を出さない", () => {
    expect(
      getKeywordPageBySlug("sc-incident-response")?.strategicCta,
    ).not.toBe("essay");
  });
});

// 土台＝基本情報 科目B 完全対策ピラーへの送客ゲート。app/keywords/[keyword]/page.tsx は
// strategicCta==="kamoku-b" のとき KamokuBStudyHint(/blog/fe-kamoku-b-taisaku)を描画する。
// 科目B擬似言語テーマ(FE)以外へ漏らさない（off-topic回避）。
describe("KEYWORD_PAGES — 土台 科目B ピラー送客ゲート", () => {
  it("strategicCta:'kamoku-b' の記事は FE のみ（科目B＝擬似言語の実データ区分）", () => {
    const flagged = KEYWORD_PAGES.filter((p) => p.strategicCta === "kamoku-b");
    expect(flagged.length).toBeGreaterThan(0); // non-vacuous
    for (const page of flagged) {
      expect(page.exams).toContain("fe");
    }
  });

  it("擬似言語テーマの fe-kamoku-b-pseudo-language が土台ピラーへ送客する", () => {
    expect(
      getKeywordPageBySlug("fe-kamoku-b-pseudo-language")?.strategicCta,
    ).toBe("kamoku-b");
  });
});
