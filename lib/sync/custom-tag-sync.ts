"use client";

import { getAllBookmarks } from "@/lib/storage/bookmarks";
import {
  ensureCatalogForNames,
  mergeServerCustomTags,
} from "@/lib/storage/custom-tags";
import { postSync, type SyncStatus } from "./client";
import type { CustomTagSyncEntry } from "./types";

/**
 * Sync the tag catalog. The catalog is seeded from the distinct tag names used
 * across bookmarks (so it stays consistent with the inline tags) and merged
 * with the server's authoritative catalog. No-op for signed-out users.
 */
export async function syncCustomTags(): Promise<SyncStatus> {
  const names = [...new Set(getAllBookmarks().flatMap((b) => b.tags))];
  const catalog = ensureCatalogForNames(names);
  const entries: CustomTagSyncEntry[] = catalog.map((t) => ({
    name: t.name,
    color: t.color,
    sortOrder: t.sortOrder,
    updatedAt: t.updatedAt,
  }));

  const { status, entries: server } = await postSync<CustomTagSyncEntry>(
    "/api/account/custom-tag-sync",
    entries,
  );

  if (status.state === "ok") {
    mergeServerCustomTags(
      server.map((s) => ({
        name: s.name,
        color: s.color,
        sortOrder: s.sortOrder,
        updatedAt: s.updatedAt,
      })),
    );
  }
  return status;
}
