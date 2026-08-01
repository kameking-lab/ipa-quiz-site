import Link from "next/link";
import { BookOpen, ExternalLink } from "lucide-react";

import {
  RECOMMENDED_BOOKS,
  buildAmazonUrl,
  isAsinFilled,
  type RecommendedBook,
} from "@/data/recommended-books";
import type { ExamCode } from "@/lib/questions/types";

function pickBookForCategory(
  exam: ExamCode,
  category: string,
): RecommendedBook | null {
  const list = RECOMMENDED_BOOKS[exam] ?? [];
  if (list.length === 0) return null;

  const lower = category.toLowerCase();
  const tagged = list.find((b) =>
    b.tags.some((t) => t.toLowerCase().includes(lower)),
  );
  if (tagged) return tagged;

  const beginner = list.find((b) => b.difficulty === "beginner");
  return beginner ?? list[0];
}

export function InlineBookHint({
  exam,
  category,
}: {
  exam: ExamCode;
  category: string;
}) {
  const book = pickBookForCategory(exam, category);
  if (!book) return null;

  const allBooksHref = `/recommended-books/${exam}`;
  // Deep-link straight at this book's full card (Amazon + 楽天 + 使い分け表).
  // The card carries id={book.id}; see app/recommended-books/[exam]/page.tsx.
  const bookDetailHref = `${allBooksHref}#${book.id}`;
  const linkable = isAsinFilled(book.asin);
  const externalHref = linkable ? buildAmazonUrl(book.asin) : null;

  return (
    <aside
      aria-label={`${exam.toUpperCase()} 分野の参考書`}
      className="mt-4 flex items-start gap-3 rounded-2xl border border-border bg-muted/30 p-4 sm:p-5"
    >
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-soft-foreground">
        <BookOpen className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          この分野を体系的に学べる参考書
        </p>
        <p className="mt-1 text-sm font-medium text-foreground">
          <Link href={bookDetailHref} className="hover:underline">
            {book.title}
          </Link>
        </p>
        <p className="text-xs text-muted-foreground">
          {book.author} / {book.publisher}
        </p>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {book.description}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <Link
            href={allBooksHref}
            className="font-medium text-primary hover:underline"
          >
            この試験の推薦書一覧
          </Link>
          {externalHref && (
            <a
              href={externalHref}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground hover:underline"
            >
              <span className="text-[9px] opacity-60">[PR]</span>
              Amazon で見る
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </aside>
  );
}
