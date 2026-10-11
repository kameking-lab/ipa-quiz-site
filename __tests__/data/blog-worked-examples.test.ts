import { describe, expect, it } from "vitest";
import { ALL_QUESTIONS } from "@/data/questions";
import { getAllBlogPosts, getAllBlogSlugs, getBlogPostBySlug } from "@/data/blog";
import { WORKED_EXAMPLE_GUIDES, workedExampleSource } from "@/data/blog/worked-examples";
import { BLOG_ARTICLE_ALIASES } from "@/lib/blog/article-aliases";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { questionPagePath } from "@/lib/seo/question-url";
import { renderBlogSitemapXml } from "@/lib/seo/sitemap-xml";
import { isBlogAdEligible } from "@/lib/blog/editorial";
import config from "../../next.config";

describe("worked guides and consolidated URLs", () => {
  it("all 26 worked examples resolve to usable questions with matching answers, papers and URLs", () => {
    const byId = new Map(ALL_QUESTIONS.map(q => [q.id, q]));
    const examples = Object.values(WORKED_EXAMPLE_GUIDES).flatMap(g => g.examples);
    expect(examples).toHaveLength(26);
    expect(new Set(examples.map(e => e.questionId)).size).toBe(26);
    for (const example of examples) {
      const q = byId.get(example.questionId);
      expect(q, example.questionId).toBeDefined();
      if (!q) continue;
      const source = workedExampleSource(example);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.answer, q.id).toBe(example.answer);
      expect(source.questionPath, q.id).toBe(questionPagePath(q));
      expect(source.questionPdf, q.id).toBe(q.sourcePdfUrl.split("#")[0]);
      expect(example.comparison).toContain("| ---");
      expect(example.checkAnswer.length).toBeGreaterThan(30);
    }
  });
  it("13 old analysis URLs redirect permanently to distinct worked guides and disappear from the sitemap", async () => {
    const redirects = await config.redirects!();
    const sitemap = renderBlogSitemapXml();
    expect(Object.keys(BLOG_ARTICLE_ALIASES)).toHaveLength(13);
    for (const [oldSlug, canonical] of Object.entries(BLOG_ARTICLE_ALIASES)) {
      expect(redirects).toContainEqual({ source: `/blog/${oldSlug}`, destination: `/blog/${canonical}`, statusCode: 301 });
      expect(getBlogPostBySlug(oldSlug)).toBeUndefined();
      expect(sitemap).not.toContain(`/blog/${oldSlug}<`);
      expect(sitemap).toContain(`/blog/${canonical}<`);
      const post = getBlogPostBySlug(canonical)!;
      expect(post.body).toContain("条件を変えて理解を確かめる");
      expect(isBlogAdEligible(post)).toBe(false);
    }
    expect(getAllBlogSlugs()).toHaveLength(181);
  });
  it("no article body or related rail retains a superseded analysis URL", () => {
    for (const post of getAllBlogPosts()) {
      for (const alias of Object.keys(BLOG_ARTICLE_ALIASES)) {
        expect(post.relatedSlugs).not.toContain(alias);
        expect(post.body).not.toContain(`/blog/${alias}`);
      }
    }
    expect(new Set(Object.values(WORKED_EXAMPLE_GUIDES).map(g => g.introduction)).size).toBe(13);
  });
});
