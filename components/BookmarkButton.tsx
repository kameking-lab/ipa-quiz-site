"use client";

import * as React from "react";
import { Bookmark } from "lucide-react";
import type { Question } from "@/lib/questions/types";
import { cn } from "@/lib/utils";
import {
  isBookmarked,
  toggleBookmark,
  updateBookmarkTags,
  getBookmark,
} from "@/lib/storage/bookmarks";
import { TagInput } from "@/components/TagInput";

interface BookmarkButtonProps {
  question: Question;
  className?: string;
}

export function BookmarkButton({ question, className }: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = React.useState(() =>
    isBookmarked(question.id),
  );
  const [showTags, setShowTags] = React.useState(false);
  const [tags, setTags] = React.useState<string[]>(
    () => getBookmark(question.id)?.tags ?? [],
  );

  function handleToggle() {
    const next = toggleBookmark(question);
    setBookmarked(next);
    if (next) {
      setShowTags(true);
    } else {
      setShowTags(false);
      setTags([]);
    }
  }

  function handleTagsChange(newTags: string[]) {
    setTags(newTags);
    updateBookmarkTags(question.id, newTags);
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <button
        type="button"
        onClick={handleToggle}
        aria-pressed={bookmarked}
        className={cn(
          "rounded-full p-2 transition-colors",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:focus-visible:ring-blue-300",
          bookmarked
            ? "bg-blue-200 text-blue-900 dark:bg-blue-900/60 dark:text-blue-200"
            : "bg-zinc-200 text-zinc-700 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700",
        )}
        aria-label={bookmarked ? "ブックマークから外す" : "ブックマークに追加"}
        title="ブックマーク"
      >
        <Bookmark
          aria-hidden="true"
          className="h-4 w-4"
          fill={bookmarked ? "currentColor" : "none"}
        />
      </button>

      {bookmarked && showTags && (
        <TagInput
          tags={tags}
          onChange={handleTagsChange}
          className="max-w-[200px]"
        />
      )}
    </div>
  );
}
