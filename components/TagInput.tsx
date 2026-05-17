"use client";

import * as React from "react";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  className?: string;
}

export function TagInput({ tags, onChange, maxTags = 5, className }: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("");

  function addTag() {
    const trimmed = inputValue.trim();
    if (!trimmed || tags.includes(trimmed) || tags.length >= maxTags) return;
    onChange([...tags, trimmed]);
    setInputValue("");
  }

  function removeTag(tag: string) {
    onChange(tags.filter((t) => t !== tag));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
    if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  }

  return (
    <div
      className={cn("flex flex-wrap items-center gap-1.5", className)}
      aria-label="タグ入力"
    >
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-200"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="ml-0.5 rounded-full p-0.5 hover:bg-blue-200 dark:hover:bg-blue-800"
            aria-label={`タグ「${tag}」を削除`}
          >
            <X className="h-2.5 w-2.5" />
          </button>
        </span>
      ))}
      {tags.length < maxTags && (
        <div className="flex items-center gap-1">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={addTag}
            placeholder={tags.length === 0 ? "タグを追加…" : "追加"}
            maxLength={20}
            className={cn(
              "w-24 rounded-md border border-zinc-300 bg-transparent px-2 py-0.5 text-xs",
              "outline-none focus:border-blue-400 dark:border-zinc-600 dark:focus:border-blue-500",
              "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
            )}
            aria-label="タグを入力"
          />
          <button
            type="button"
            onClick={addTag}
            disabled={!inputValue.trim() || tags.length >= maxTags}
            className="rounded-full p-0.5 text-zinc-500 hover:text-zinc-800 disabled:opacity-40 dark:text-zinc-400 dark:hover:text-zinc-200"
            aria-label="タグを追加"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      {tags.length >= maxTags && (
        <span className="text-[10px] text-zinc-400">最大{maxTags}個</span>
      )}
    </div>
  );
}
