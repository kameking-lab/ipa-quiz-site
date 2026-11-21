"use client";

import { WeakMark } from "@/components/quiz/WeakMark";
import * as React from "react";
import Link from "next/link";
import { Bookmark, X } from "lucide-react";
import {
  getAllBookmarks,
  toggleBookmark,
  type BookmarkEntry,
} from "@/lib/storage/bookmarks";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { examLabel, formatYearSeason } from "@/lib/utils";
import type { Question, Season, Session } from "@/lib/questions/types";

/**
 * BookmarkEntry stores only the display fields, not session ("am" / "am1" / etc).
 * Parse it back out of the question id so we can build the canonical /q/* path.
 * Falls back to "am" for any non-conforming id.
 */
function sessionFromId(id: string): Session {
  const scoped = /^(?:kaikeishi-\d{4}-(?:I|II)-(kigyo|kanri|kansa|zaimu)|kanteishi-\d{4}-(gyosei|riron))-q\d+$/.exec(id);
  if (scoped) return (scoped[1] ?? scoped[2]) as Session;
  const match = /^[a-z]+-\d{4}[a-z]-(am\d?|pm\d?)-q\d+$/.exec(id);
  return (match?.[1] ?? "am") as Session;
}

function questionUrl(entry: BookmarkEntry): string {
  return `/q/${entry.exam}/${entry.year}-${entry.season as Season}/${sessionFromId(entry.questionId)}/q${entry.qNumber}`;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = React.useState<BookmarkEntry[]>([]);
  React.useEffect(() => {
    setBookmarks(getAllBookmarks());
  }, []);

  function handleRemoveBookmark(entry: BookmarkEntry) {
    // Build a minimal Question-shaped object to satisfy toggleBookmark
    const stub = {
      id: entry.questionId,
      question: entry.questionSnippet,
      exam: entry.exam,
      year: entry.year,
      season: entry.season,
      qNumber: entry.qNumber,
      category: entry.category,
    } as unknown as Question;
    toggleBookmark(stub);
    setBookmarks(getAllBookmarks());
  }

  return (
    <main className="container mx-auto max-w-2xl px-4 py-8">
      <Breadcrumbs
          className="[&_a]:inline-flex [&_a]:min-h-11 [&_a]:min-w-11 [&_a]:items-center"
        items={[
          { name: "ホーム", href: "/" },
          { name: "ブックマーク", href: "/bookmarks" },
        ]}
      />
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="flex items-center gap-2 text-2xl font-bold leading-snug text-zinc-900 dark:text-zinc-50">
          <Bookmark
            aria-hidden="true"
            className="h-5 w-5 text-blue-600 dark:text-blue-400"
            fill="currentColor"
          />
          ブックマーク
          <span className="text-sm font-normal text-zinc-500">
            ({bookmarks.length}件)
          </span>
        </h1>
      </div>

      {/* Empty state */}
      {bookmarks.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Bookmark className="h-10 w-10 text-zinc-300 dark:text-zinc-600" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            ブックマークがありません
          </p>
          <Link
            href="/search"
            className="mt-2 inline-flex min-h-11 items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            資格を選ぶ
          </Link>
        </div>
      )}

      {/* Bookmark list */}
      {bookmarks.length > 0 && (
        <div className="space-y-3">
          {bookmarks.map((entry) => (
            <BookmarkCard
              key={entry.questionId}
              entry={entry}
              onRemove={() => handleRemoveBookmark(entry)}
            />
          ))}
        </div>
      )}

      <p className="mt-8 text-center text-xs text-zinc-400 dark:text-zinc-600">
        出典: IPA 情報処理技術者試験
      </p>
    </main>
  );
}

interface BookmarkCardProps {
  entry: BookmarkEntry;
  onRemove: () => void;
}

function BookmarkCard({ entry, onRemove }: BookmarkCardProps) {
  const date = new Date(entry.bookmarkedAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="mb-2 flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="rounded-full bg-zinc-100 px-2 py-0.5 font-medium dark:bg-zinc-800">
            {examLabel(entry.exam)}
          </span>
          <span>{formatYearSeason(entry.year, entry.season)}</span>
          <span>問{entry.qNumber}</span>
          {entry.category && (
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 dark:bg-zinc-800">
              {entry.category}
            </span>
          )}
          <span className="ml-auto text-xs text-zinc-500 dark:text-zinc-400">{date}</span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          aria-label="ブックマークから外す"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <Link href={questionUrl(entry)} prefetch={false} className="block min-h-11 py-2 text-sm leading-relaxed underline underline-offset-4">
        {entry.questionSnippet || ("問" + entry.qNumber)}
      </Link>
      <WeakMark id={entry.questionId} />
    </div>
  );
}
