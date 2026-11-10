import { Children, isValidElement, type ReactNode } from "react";
import { describe, expect, it } from "vitest";
import BlogArticlePage, { generateMetadata, generateStaticParams } from "@/app/blog/[slug]/page";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBlogPostBySlug, getRelatedPosts } from "@/data/blog";
import { renderBlogSitemapXml } from "@/lib/seo/sitemap-xml";
import { SITE_BASE_URL } from "@/lib/seo/config";
import { getRelatedQuestionsForPost } from "@/lib/blog/related-questions";
import { questionPagePath } from "@/lib/seo/question-url";

const guides = [
  ["sc-access-rights-lifecycle", "sc", "sc-ronbun-taisaku"],
  ["db-join-sum-granularity", "db", "db-sql-taisaku"],
  ["fe-sql-join-column-reading", "fe", "fe-goukaku-benkyouhou"],
] as const;

function findJsonLd(node: ReactNode): unknown {
  for (const child of Children.toArray(node)) {
    if (!isValidElement<{ data?: unknown; children?: ReactNode }>(child)) continue;
    if (child.type === JsonLd) return child.props.data;
    const found = findJsonLd(child.props.children);
    if (found) return found;
  }
}

function hasHref(node: ReactNode, href: string): boolean {
  return Children.toArray(node).some(child => {
    if (!isValidElement<{ href?: string; children?: ReactNode }>(child)) return false;
    return child.props.href === href || hasHref(child.props.children, href);
  });
}

describe("focused guides link to practice on their subject", () => {
  const topics = [
    /権限.*(?:退職|付与)|退職.*権限/s,
    /LEFT OUTER JOIN|NOT EXISTS/,
    /FROM 社員,部門.*社員\.所属 = 部門\.部門名/s,
  ];
  for (const [index, [slug, exam]] of guides.entries()) {
    it(`${slug}: uses reviewed, playable questions rather than zero-match ranking`, async () => {
      const post = getBlogPostBySlug(slug)!;
      const questions = getRelatedQuestionsForPost(post.exam, post.tags, 3, post.relatedQuestionIds);
      expect(questions.length).toBeGreaterThan(0);
      expect(questions.map(q => q.id)).toEqual(post.relatedQuestionIds);
      const page = await BlogArticlePage({ params: Promise.resolve({ slug }) });
      for (const q of questions) {
        expect(q.exam).toBe(exam);
        expect(q.session).not.toBe("kamoku-b");
        expect(q.question).toMatch(topics[index]);
        expect(hasHref(page, questionPagePath(q))).toBe(true);
      }
    });
  }
});

describe("focused guides use the existing article publishing path", () => {
  for (const [slug, exam, parent] of guides) {
    it(`${slug}: emits metadata, Article JSON-LD and a sitemap URL with live internal links`, async () => {
      const post = getBlogPostBySlug(slug)!;
      const params = Promise.resolve({ slug });
      expect(await generateStaticParams()).toContainEqual({ slug });
      const metadata = await generateMetadata({ params });
      expect(metadata.description).toBe(post.description);
      expect(metadata.alternates?.canonical).toBe(`/blog/${slug}`);
      const graph = findJsonLd(await BlogArticlePage({ params })) as { "@graph": object[] };
      expect(graph["@graph"]).toContainEqual(expect.objectContaining({
        "@type": "Article", headline: post.title, description: post.description,
        url: `${SITE_BASE_URL}/blog/${slug}`, dateModified: "2026-11-11",
      }));
      expect(renderBlogSitemapXml()).toContain(`<loc>${SITE_BASE_URL}/blog/${slug}</loc>`);
      expect(post.body).toContain(`](/${exam})`);
      expect(post.body).toContain(`](/blog/${parent})`);
      expect(getBlogPostBySlug(parent)?.body).toContain(`](/blog/${slug})`);
      expect(getRelatedPosts(slug).some(p => p.slug === parent)).toBe(true);
      for (const [, linked] of post.body.matchAll(/\]\(\/blog\/([^)#?]+)\)/g)) {
        expect(getBlogPostBySlug(linked), `${slug} -> ${linked}`).toBeDefined();
      }
    });
  }
});
