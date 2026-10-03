import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import QuestionPage from "@/app/q/[exam]/[yearSeason]/[section]/[qnum]/page";
import { getAllBlogPosts } from "@/data/blog";
import { getRelatedBlogPosts } from "@/lib/blog/related-content";

describe("question page study-guide promises", () => {
  it("omits the kanri guide section when the catalog contains only IPA hub fallbacks", async () => {
    expect(getAllBlogPosts().filter((post) => post.exam === "kanri")).toHaveLength(0);
    const fallbacks = getRelatedBlogPosts("kanri", 4);
    expect(fallbacks).toHaveLength(4);
    expect(fallbacks.every((post) => !post.exam)).toBe(true);
    const page = await QuestionPage({ params: Promise.resolve({ exam: "kanri", yearSeason: "2025-annual", section: "gakka", qnum: "q1" }) });
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(page), "text/html");
    expect(doc.querySelector('section[aria-label="この試験区分の学習ガイド"]')).toBeNull();
    for (const post of fallbacks) expect(doc.querySelector(`a[href="/blog/${post.slug}"]`)).toBeNull();
    expect(doc.querySelector("h1")?.textContent).toContain("管理業務主任者");
    expect(doc.querySelector('a[href="/kanri"]')).not.toBeNull();
  });

  it("keeps existing IPA guides available on an IPA question page", async () => {
    const page = await QuestionPage({ params: Promise.resolve({ exam: "ap", yearSeason: "2025-spring", section: "am", qnum: "q1" }) });
    const doc = new DOMParser().parseFromString(renderToStaticMarkup(page), "text/html");
    const section = doc.querySelector('section[aria-label="この試験区分の学習ガイド"]');
    expect(section).not.toBeNull();
    expect(section?.querySelectorAll('a[href^="/blog/"]').length).toBeGreaterThan(0);
    expect(section?.textContent).toContain("応用情報");
  });
});
