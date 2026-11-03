import { describe, expect, it } from "vitest";

import { KEYWORD_PAGES, getKeywordPageBySlug, getRelatedKeywordPages } from "@/data/keywords";

// C034 is withheld from this release. This does not certify a repaired article,
// and does not remove a separately registered /blog resource with the same slug.
describe("cache-jikkou-access release hold", () => {
  it("is absent from the keyword registry and resolver used by static routes", () => {
    expect(KEYWORD_PAGES.length).toBeGreaterThan(0);
    expect(KEYWORD_PAGES.map((page) => page.slug)).not.toContain("cache-jikkou-access");
    expect(getKeywordPageBySlug("cache-jikkou-access")).toBeUndefined();
    expect(getRelatedKeywordPages("cache-jikkou-access", 5)).toEqual([]);
  });

  it("keeps the retained calculation article and its parent-blog destination", () => {
    const retained = getKeywordPageBySlug("cpu-seinou-keisan");
    expect(retained).toBeDefined();
    expect(retained!.relatedBlogSlug).toBe("ipa-shiken-keisan-mondai-kokuhuku");
  });

  it("keeps live calculation rails resolvable without linking the withheld article", () => {
    for (const slug of ["machi-gyoretsu-keisan", "cpu-seinou-keisan"]) {
      expect(getKeywordPageBySlug(slug)).toBeDefined();
      const related = getRelatedKeywordPages(slug, 5);
      expect(related).toHaveLength(5);
      expect(related.map((page) => page.slug)).not.toContain("cache-jikkou-access");
      for (const page of related) expect(getKeywordPageBySlug(page.slug)).toBe(page);
    }
  });
});
