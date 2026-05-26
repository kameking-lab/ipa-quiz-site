import { getAllBlogPosts } from "@/data/blog";
import type { BlogPostSummary } from "@/data/blog/types";
import { toSummary } from "@/data/blog/types";

// Tags that identify cross-exam "hub" articles (no specific exam, broadly applicable)
const HUB_TAGS = new Set(["全区分", "横断学習", "学習法"]);

/**
 * Returns blog posts ranked by relevance to a given exam code.
 * Exam-specific posts (score=5) rank above hub articles (score=1).
 * When `fieldTags` (e.g. a question's category + topicTags) are supplied,
 * posts whose tags overlap the field are lifted within their tier so the most
 * on-topic guide surfaces first — mirroring the reverse ranking in
 * related-questions.ts. Within the same score, posts are sorted newest-first.
 * Returns fewer than `limit` when fewer relevant posts exist.
 */
export function getRelatedBlogPosts(
  exam: string,
  limit = 3,
  fieldTags: string[] = [],
): BlogPostSummary[] {
  const all = getAllBlogPosts();
  const fieldSet = new Set(fieldTags);
  const scored = all.flatMap((p) => {
    let score = 0;
    if (p.exam === exam) score = 5;
    else if (!p.exam && p.tags.some((t) => HUB_TAGS.has(t))) score = 1;
    if (score === 0) return [];
    const overlap = p.tags.filter((t) => fieldSet.has(t)).length;
    return [{ post: p, score: score + overlap }];
  });
  scored.sort(
    (a, b) => b.score - a.score || b.post.publishedAt.localeCompare(a.post.publishedAt),
  );
  return scored.slice(0, limit).map(({ post }) => toSummary(post));
}
