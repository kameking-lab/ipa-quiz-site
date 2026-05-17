import { LS_KEYS } from "./keys";
import type { Question } from "@/lib/questions/types";

export const MAX_TAGS_PER_BOOKMARK = 5;

export interface BookmarkEntry {
  questionId: string;
  tags: string[];
  bookmarkedAt: number;
  /** Denormalized for display without loading the full question dataset */
  questionSnippet: string;
  exam: string;
  year: number;
  season: string;
  qNumber: number;
  category: string;
}

export interface BookmarksData {
  entries: Record<string, BookmarkEntry>;
}

const EMPTY: BookmarksData = { entries: {} };

function readRaw(): BookmarksData {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(LS_KEYS.bookmarks);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as BookmarksData;
    return {
      entries:
        parsed.entries && typeof parsed.entries === "object" ? parsed.entries : {},
    };
  } catch {
    return EMPTY;
  }
}

function writeRaw(data: BookmarksData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.bookmarks, JSON.stringify(data));
  } catch {
    // ignore quota errors
  }
}

export function isBookmarked(questionId: string): boolean {
  return Boolean(readRaw().entries[questionId]);
}

/** Returns true if the question is now bookmarked, false if it was removed. */
export function toggleBookmark(question: Question): boolean {
  const data = readRaw();
  if (data.entries[question.id]) {
    delete data.entries[question.id];
    writeRaw(data);
    return false;
  }
  data.entries[question.id] = {
    questionId: question.id,
    tags: [],
    bookmarkedAt: Date.now(),
    questionSnippet: question.question.slice(0, 80),
    exam: question.exam,
    year: question.year,
    season: question.season,
    qNumber: question.qNumber,
    category: question.category,
  };
  writeRaw(data);
  return true;
}

export function updateBookmarkTags(questionId: string, tags: string[]): void {
  const data = readRaw();
  if (!data.entries[questionId]) return;
  data.entries[questionId].tags = tags.slice(0, MAX_TAGS_PER_BOOKMARK);
  writeRaw(data);
}

export function getBookmark(questionId: string): BookmarkEntry | undefined {
  return readRaw().entries[questionId];
}

/** Returns all bookmarks sorted newest-first. */
export function getAllBookmarks(): BookmarkEntry[] {
  return Object.values(readRaw().entries).sort(
    (a, b) => b.bookmarkedAt - a.bookmarkedAt,
  );
}

export function clearAllBookmarks(): void {
  writeRaw(EMPTY);
}

export function exportBookmarks(): string {
  return JSON.stringify(readRaw(), null, 2);
}

export function importBookmarks(json: string): boolean {
  try {
    const parsed = JSON.parse(json) as BookmarksData;
    if (!parsed.entries || typeof parsed.entries !== "object") return false;
    writeRaw({ entries: parsed.entries });
    return true;
  } catch {
    return false;
  }
}
