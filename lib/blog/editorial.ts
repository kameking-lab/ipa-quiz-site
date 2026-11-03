import { createHash } from "node:crypto";
import type { BlogPost, BlogPostSummary } from "@/data/blog/types";

export interface ArticleReviewEvidence {
  slug: string;
  bodySha256: string;
  sourceUrls: string[];
  contentComplete: true;
  claimsVerified: true;
  reviewedAt: string;
  reviewReceipt: string;
}
// No article-level completed review records were established in the bounded audit.
// Template correction and source-link addition do not qualify as a complete review.
export const ARTICLE_REVIEW_EVIDENCE: Readonly<Record<string, ArticleReviewEvidence>> = {};
export function isBlogAdEligible(post: BlogPost, evidence = ARTICLE_REVIEW_EVIDENCE[post.slug]): boolean {
  return !!evidence && evidence.slug === post.slug
    && evidence.contentComplete === true && evidence.claimsVerified === true
    && evidence.sourceUrls.length > 0 && evidence.sourceUrls.every((url) => /^https:\/\/[^\s]+$/.test(url))
    && !!evidence.reviewReceipt.trim() && Number.isFinite(Date.parse(evidence.reviewedAt))
    && evidence.bodySha256 === createHash("sha256").update(post.body).digest("hex");
}
export function publicBlogDates(post: Pick<BlogPost | BlogPostSummary, "editorialDates">): {published?: string; modified?: string} {
  const valid = (value?: string | null) => value && /^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(value)
    && Number.isFinite(Date.parse(value)) ? value : undefined;
  return {published: valid(post.editorialDates?.firstPublishedAt), modified: valid(post.editorialDates?.lastEditedAt)};
}
