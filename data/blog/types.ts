import type { ExamCode } from "@/lib/questions/types";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  exam?: ExamCode;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  body: string;
  relatedSlugs?: string[];
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  description: string;
  exam?: ExamCode;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
}

export function toSummary(p: BlogPost): BlogPostSummary {
  return {
    slug: p.slug,
    title: p.title,
    description: p.description,
    exam: p.exam,
    tags: p.tags,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt,
  };
}
