"use client";

import { getAllBookmarks, mergeServerBookmarks } from "@/lib/storage/bookmarks";
import { postSync, type SyncStatus } from "./client";
import type { BookmarkSyncEntry } from "./types";

/**
 * Push local bookmarks to the server (opt-in, signed-in users only) and merge
 * the authoritative set back into LocalStorage. LocalStorage stays the source
 * of truth for signed-out users — this is a no-op (unauthenticated/unavailable)
 * for them.
 */
export async function syncBookmarks(): Promise<SyncStatus> {
  const local = getAllBookmarks();
  const entries: BookmarkSyncEntry[] = local.map((b) => ({
    questionId: b.questionId,
    tags: b.tags,
    questionSnippet: b.questionSnippet,
    exam: b.exam,
    year: b.year,
    season: b.season,
    qNumber: b.qNumber,
    category: b.category,
    bookmarkedAt: b.bookmarkedAt,
    // BookmarkEntry has no dedicated updatedAt; bookmarkedAt is the stable
    // per-item timestamp used for last-write-wins (v1: tag-only edits are not
    // separately timestamped).
    updatedAt: b.bookmarkedAt,
  }));

  const { status, entries: server } = await postSync<BookmarkSyncEntry>(
    "/api/account/bookmark-sync",
    entries,
  );

  if (status.state === "ok") {
    mergeServerBookmarks(server);
  }
  return status;
}
