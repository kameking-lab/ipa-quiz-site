import { describe, expect, it } from "vitest";

import { KEYWORD_PAGES, getKeywordPageBySlug } from "@/data/keywords";
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
