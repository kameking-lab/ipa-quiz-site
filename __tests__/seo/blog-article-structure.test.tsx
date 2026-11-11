import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { BlogMarkdown } from "@/components/blog/BlogMarkdown";
import BlogArticlePage from "@/app/blog/[slug]/page";
import { getAllBlogPosts, getBlogPostBySlug, getRelatedPosts } from "@/data/blog";
import { FOCUSED_GUIDE_INCOMING_LINKS } from "@/data/blog/focused-study-guides";

describe("existing article search and reading structure", () => {
  it("renders article sections as H2 without repeating the page title", () => {
    for (const post of getAllBlogPosts()) {
      const html = renderToStaticMarkup(<BlogMarkdown>{post.body}</BlogMarkdown>);
      const document = new DOMParser().parseFromString(html, "text/html");
      const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")];
      expect(document.querySelectorAll("h1"), post.slug).toHaveLength(0);
      expect(headings[0]?.tagName, post.slug).toBe("H2");
      if (post.body.trimStart().startsWith("# ")) {
        const title = post.body.trimStart().split("\n")[0].slice(2).trim();
        expect(headings[0]?.textContent, post.slug).not.toBe(title);
      }
    }
  });

  it("offers the three focused guides from relevant existing articles", () => {
    const destinations = new Set<string>();
    for (const [slug, details] of Object.entries(FOCUSED_GUIDE_INCOMING_LINKS)) {
      const renderedLinks = getRelatedPosts(slug, 4).map(post => post.slug);
      for (const detail of details) {
        expect(getBlogPostBySlug(detail), `${slug} -> ${detail}`).toBeDefined();
        expect(renderedLinks).toContain(detail);
        destinations.add(detail);
      }
    }
    for (const slug of ["sc-access-rights-lifecycle", "db-join-sum-granularity", "fe-sql-join-column-reading"]) {
      expect(destinations.has(slug)).toBe(true);
    }
  });

  it("keeps source citations and print attribution specific to the qualification", async () => {
    const slug = "kangoshi-free-past-questions-review";
    const post = getBlogPostBySlug(slug)!;
    const html = renderToStaticMarkup(await BlogArticlePage({ params: Promise.resolve({ slug }) }));
    const document = new DOMParser().parseFromString(html, "text/html");
    const graph = JSON.parse(document.querySelector('script[type="application/ld+json"]')!.textContent!)["@graph"];
    expect(graph.find((node: { "@type": string }) => node["@type"] === "Article").citation).toEqual(post.sourceUrls);
    expect(document.querySelector(".print-only")?.textContent).toContain(post.sourceUrls![0]);
    expect(document.querySelector("main")?.textContent).not.toContain("IPA 公式ページ");
    expect(document.querySelector(".print-only")?.textContent).not.toContain("IPA 情報処理技術者試験");
  });

  it("retains IPA guidance for IPA articles", async () => {
    const html = renderToStaticMarkup(await BlogArticlePage({ params: Promise.resolve({ slug: "sc-access-rights-lifecycle" }) }));
    expect(html).toContain("IPA 公式ページ");
  });
});
