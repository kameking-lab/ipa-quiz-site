import { describe, expect, it } from "vitest";
import CategoryPage, { generateMetadata as categoryMetadata } from "@/app/[exam]/topic/[topicSlug]/page";
import { generateMetadata as searchMetadata } from "@/app/search/page";
import { generateMetadata as modeMetadata } from "@/app/modes/topic/page";
import { getAvailableExams, getQuestionsByExamStrict, groupByCategory } from "@/lib/seo/exam-meta";
import { renderExamsSitemapXml, renderMainSitemapXml } from "@/lib/seo/sitemap-xml";
import { SITE_BASE_URL } from "@/lib/seo/config";

describe("ADK collection search boundaries", () => {
  it("keeps every category usable but advertises only collections of multiple explained questions", async () => {
    const sitemap = renderExamsSitemapXml();
    let singletonCount = 0;
    let collectionCount = 0;
    for (const exam of getAvailableExams()) {
      for (const { category, count } of groupByCategory(getQuestionsByExamStrict(exam))) {
        const path = `/${exam}/topic/${encodeURIComponent(category)}`;
        const metadata = await categoryMetadata({ params: Promise.resolve({ exam, topicSlug: category }) });
        expect(metadata.alternates?.canonical, path).toBe(path);
        expect(metadata.robots, path).toEqual({ index: count > 1, follow: true });
        expect(sitemap.includes(`<loc>${SITE_BASE_URL}${path}</loc>`), path).toBe(count > 1);
        if (count === 1) singletonCount++;
        else collectionCount++;
      }
    }
    expect(singletonCount).toBeGreaterThan(0);
    expect(collectionCount).toBeGreaterThan(0);
  });

  it("renders listed categories on demand and 404s everything else", async () => {
    // The route renders on first request (dynamicParams=true), so the page
    // itself must keep the reachable set to the listed (exam, category) pairs.
    for (const exam of getAvailableExams()) {
      for (const { category } of groupByCategory(getQuestionsByExamStrict(exam))) {
        await expect(CategoryPage({ params: Promise.resolve({ exam, topicSlug: category }) }), `${exam}/${category}`)
          .resolves.toBeTruthy();
      }
    }
    const exam = getAvailableExams()[0]!;
    for (const params of [
      { exam: "not-an-exam", topicSlug: groupByCategory(getQuestionsByExamStrict(exam))[0]!.category },
      { exam, topicSlug: "存在しない分野" },
      { exam, topicSlug: "%zz" },
    ]) {
      await expect(CategoryPage({ params: Promise.resolve(params) }), JSON.stringify(params)).rejects.toThrow();
    }
  });

  it("keeps empty and parameterized search and mode pages crawlable with noindex", async () => {
    for (const params of [{}, { q: "TLS" }, { q: ["TLS", "DNS"] }]) {
      expect((await searchMetadata({ searchParams: Promise.resolve(params) })).robots)
        .toEqual({ index: false, follow: true });
    }
    for (const params of [{}, { exam: "fe" }, { exam: "fp3", session: "gakka" }]) {
      expect((await modeMetadata({ searchParams: Promise.resolve(params) })).robots)
        .toEqual({ index: false, follow: true });
    }
    const sitemap = renderMainSitemapXml();
    expect(sitemap).not.toContain(`<loc>${SITE_BASE_URL}/search</loc>`);
    expect(sitemap).not.toContain(`<loc>${SITE_BASE_URL}/modes/topic</loc>`);
  });
});
