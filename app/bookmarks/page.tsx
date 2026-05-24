"use client";

import * as React from "react";
import Link from "next/link";
import { Bookmark, Download, Upload, Trash2, X, ArrowRight } from "lucide-react";
import {
  getAllBookmarks,
  clearAllBookmarks,
  exportBookmarks,
  importBookmarks,
  updateBookmarkTags,
  toggleBookmark,
  type BookmarkEntry,
} from "@/lib/storage/bookmarks";
import { TagInput } from "@/components/TagInput";
import { examLabel, formatYearSeason } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Question, Season, Session } from "@/lib/questions/types";

/**
 * BookmarkEntry stores only the display fields, not session ("am" / "am1" / etc).
 * Parse it back out of the question id so we can build the canonical /q/* path.
 * Falls back to "am" for any non-conforming id.
 */
function sessionFromId(id: string): Session {
  const match = /^[a-z]+-\d{4}[a-z]-(am\d?|pm\d?)-q\d+$/.exec(id);
  return (match?.[1] ?? "am") as Session;
}

function questionUrl(entry: BookmarkEntry): string {
  return `/q/${entry.exam}/${entry.year}-${entry.season as Season}/${sessionFromId(entry.questionId)}/q${entry.qNumber}`;
}

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = React.useState<BookmarkEntry[]>([]);
  const [activeTag, setActiveTag] = React.useState<string | null>(null);
  const importRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    setBookmarks(getAllBookmarks());
  }, []);

  const allTags = [...new Set(bookmarks.flatMap((b) => b.tags))].sort();
  const filtered = activeTag
    ? bookmarks.filter((b) => b.tags.includes(activeTag))
    : bookmarks;

  function handleExport() {
    const json = exportBookmarks();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ipa-bookmarks-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const ok = importBookmarks(ev.target?.result as string);
      if (ok) {
        setBookmarks(getAllBookmarks());
      } else {
        alert("ファイルの読み込みに失敗しました。正しいJSONファイルか確認してください。");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  }

  function handleTagsChange(questionId: string, tags: string[]) {
    updateBookmarkTags(questionId, tags);
    setBookmarks(getAllBookmarks());
  }

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

  function handleClearAll() {
    if (!confirm("全てのブックマークを削除しますか？この操作は元に戻せません。")) return;
    clearAllBookmarks();
    setBookmarks([]);
    setActiveTag(null);
  }

  return (
    <main className="container mx-auto max-w-2xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-xl font-bold text-zinc-900 dark:text-zinc-50">
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
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            disabled={bookmarks.length === 0}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            title="JSONでエクスポート"
          >
            <Download className="h-3.5 w-3.5" />
            エクスポート
          </button>
          <label
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            title="JSONからインポート"
          >
            <Upload className="h-3.5 w-3.5" />
            インポート
            <input
              ref={importRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="sr-only"
            />
          </label>
          {bookmarks.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:bg-zinc-800 dark:text-red-400 dark:hover:bg-red-950/30"
              title="全て削除"
            >
              <Trash2 className="h-3.5 w-3.5" />
              全て削除
            </button>
          )}
        </div>
      </div>

      {/* Tag filter chips */}
      {allTags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition",
              !activeTag
                ? "bg-blue-600 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700",
            )}
          >
            すべて ({bookmarks.length})
          </button>
          {allTags.map((tag) => {
            const count = bookmarks.filter((b) => b.tags.includes(tag)).length;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition",
                  activeTag === tag
                    ? "bg-blue-600 text-white"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700",
                )}
              >
                {tag} ({count})
              </button>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-3 py-16 text-center">
          <Bookmark className="h-10 w-10 text-zinc-300 dark:text-zinc-600" />
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {activeTag
              ? `「${activeTag}」タグのブックマークはありません`
              : "ブックマークがありません"}
          </p>
          <Link
            href="/"
            className="mt-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            問題を解く
          </Link>
        </div>
      )}

      {/* Bookmark list */}
      {filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((entry) => (
            <BookmarkCard
              key={entry.questionId}
              entry={entry}
              onTagsChange={(tags) => handleTagsChange(entry.questionId, tags)}
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
  onTagsChange: (tags: string[]) => void;
  onRemove: () => void;
}

function BookmarkCard({ entry, onTagsChange, onRemove }: BookmarkCardProps) {
  const date = new Date(entry.bookmarkedAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
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
          <span className="ml-auto text-[10px] text-zinc-400">{date}</span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="shrink-0 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          aria-label="ブックマークから外す"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      <p className="mb-3 text-sm leading-relaxed text-zinc-800 dark:text-zinc-100 line-clamp-2">
        {entry.questionSnippet}
        {entry.questionSnippet.length >= 80 && "…"}
      </p>

      <TagInput tags={entry.tags} onChange={onTagsChange} />

      <div className="mt-3 flex justify-end">
        <Link
          href={questionUrl(entry)}
          prefetch={false}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:bg-blue-500 dark:hover:bg-blue-400"
          aria-label={`${examLabel(entry.exam)} ${formatYearSeason(entry.year, entry.season)} 問${entry.qNumber}を解く`}
        >
          この問題を解く
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
