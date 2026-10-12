import { EXAM_CODES } from "./exam-data";
import {
  buildFrequentTopicsPost,
  buildGeneralPosts,
  buildLastMonthPost,
  buildOverviewPost,
  buildPracticePost,
} from "./generators";
import type { BlogPost, BlogPostSummary } from "./types";
import { toSummary } from "./types";
import { BLOG_ARTICLE_ALIASES, canonicalBlogSlug } from "@/lib/blog/article-aliases";

function buildAllPosts(): BlogPost[] {
  const posts: BlogPost[] = [];
  EXAM_CODES.forEach((exam, i) => posts.push(buildOverviewPost(exam, i)));
  EXAM_CODES.forEach((exam, i) => posts.push(buildLastMonthPost(exam, i)));
  EXAM_CODES.forEach((exam, i) => posts.push(buildFrequentTopicsPost(exam, i)));
  EXAM_CODES.forEach((exam, i) => {
    if (!BLOG_ARTICLE_ALIASES[`${exam}-yoru-tokurensyu`]) posts.push(buildPracticePost(exam, i));
  });
  posts.push(...buildGeneralPosts());
  return posts.map(post => ({
    ...post,
    relatedSlugs: [...new Set(post.relatedSlugs?.map(canonicalBlogSlug))].filter(slug => slug !== post.slug),
    body: Object.entries(BLOG_ARTICLE_ALIASES).reduce(
      (body, [alias, canonical]) => body.replaceAll(`/blog/${alias}`, `/blog/${canonical}`), post.body,
    ),
  }));
}

const ALL_POSTS: BlogPost[] = buildAllPosts();
const BY_SLUG: Map<string, BlogPost> = new Map(ALL_POSTS.map((p) => [p.slug, p]));

export function getAllBlogPosts(): BlogPost[] {
  return ALL_POSTS;
}

export function getAllBlogSummaries(): BlogPostSummary[] {
  return ALL_POSTS.map(toSummary).sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BY_SLUG.get(slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPostSummary[] {
  const target = BY_SLUG.get(slug);
  if (!target) return [];
  const explicit: BlogPostSummary[] = [];
  if (target.relatedSlugs) {
    for (const s of target.relatedSlugs) {
      const p = BY_SLUG.get(s);
      if (p) explicit.push(toSummary(p));
      if (explicit.length >= limit) return explicit;
    }
  }
  if (explicit.length >= limit) return explicit;
  const remaining = ALL_POSTS.filter(
    (p) =>
      p.slug !== slug &&
      !explicit.some((e) => e.slug === p.slug) &&
      (p.exam === target.exam || p.tags.some((t) => target.tags.includes(t))),
  )
    .slice(0, limit - explicit.length)
    .map(toSummary);
  return [...explicit, ...remaining].slice(0, limit);
}

export function getBlogPostsByExam(exam: string): BlogPostSummary[] {
  return ALL_POSTS.filter((p) => p.exam === exam)
    .map(toSummary)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getAllBlogSlugs(): string[] {
  return ALL_POSTS.map((p) => p.slug);
}
