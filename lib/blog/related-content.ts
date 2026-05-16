import { getAllBlogPosts } from "@/data/blog";
import type { BlogPostSummary } from "@/data/blog/types";
import { toSummary } from "@/data/blog/types";

// Tags that identify cross-exam "hub" articles (no specific exam, broadly applicable)
const HUB_TAGS = new Set(["全区分", "横断学習", "学習法"]);

/**
 * Returns blog posts ranked by relevance to a given exam code.
 * Exam-specific posts (score=5) rank above hub articles (score=1).
 * Within the same score tier, posts are sorted newest-first.
 */
export function getRelatedBlogPosts(exam: string, limit = 3): BlogPostSummary[] {
  const all = getAllBlogPosts();
  const scored = all.flatMap((p) => {
    let score = 0;
    if (p.exam === exam) score = 5;
    else if (!p.exam && p.tags.some((t) => HUB_TAGS.has(t))) score = 1;
    return score > 0 ? [{ post: p, score }] : [];
  });
  scored.sort(
    (a, b) => b.score - a.score || b.post.publishedAt.localeCompare(a.post.publishedAt),
  );
  return scored.slice(0, limit).map(({ post }) => toSummary(post));
}
