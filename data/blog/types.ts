import type { ExamCode } from "@/lib/questions/types";

export interface EditorialDates {
  firstPublishedAt: string | null;
  /** Actual editing date; never synthesized from sort order or current year. */
  lastEditedAt?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  exam?: ExamCode;
  tags: string[];
  /** Legacy sort key only; public publication dates come from editorialDates. */
  publishedAt: string;
  editorialDates?: EditorialDates;
  editorialKind?: "study-guide";
  sourceUrls?: string[];
  updatedAt?: string;
  body: string;
  relatedSlugs?: string[];
  /**
   * exam を持たない general 記事のうち、書籍CTAを単一区分の
   * /recommended-books/{exam} へ精密送客したい場合のみ明示指定する。
   * 複数区分を扱う記事は未指定（= /recommended-books 索引へ送る安全側）。
   */
  booksExam?: ExamCode;
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  description: string;
  exam?: ExamCode;
  tags: string[];
  /** Legacy sort key only; public publication dates come from editorialDates. */
  publishedAt: string;
  editorialDates?: EditorialDates;
  editorialKind?: "study-guide";
  sourceUrls?: string[];
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
    editorialDates: p.editorialDates,
    editorialKind: p.editorialKind,
    sourceUrls: p.sourceUrls,
    updatedAt: p.updatedAt,
  };
}
