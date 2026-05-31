"use client";

import { LS_KEYS } from "./keys";

/**
 * Lightweight tag-catalog store. The app's bookmark tags are inline free text;
 * this catalog holds optional per-tag metadata (color, sort order) so the
 * /bookmarks chips can be coloured and so the catalog can be cloud-synced as a
 * first-class data type. Catalog absence degrades gracefully (chips stay grey).
 */
export interface CustomTagMeta {
  name: string;
  color: string;
  sortOrder: number;
  updatedAt: number;
}

interface CatalogData {
  tags: Record<string, CustomTagMeta>;
}

function emptyData(): CatalogData {
  return { tags: {} };
}

function readRaw(): CatalogData {
  if (typeof window === "undefined") return emptyData();
  try {
    const raw = window.localStorage.getItem(LS_KEYS.customTags);
    if (!raw) return emptyData();
    const parsed = JSON.parse(raw) as CatalogData;
    return { tags: parsed.tags && typeof parsed.tags === "object" ? parsed.tags : {} };
  } catch {
    return emptyData();
  }
}

function writeRaw(data: CatalogData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.customTags, JSON.stringify(data));
  } catch {
    /* ignore quota */
  }
}

export function getCustomTags(): CustomTagMeta[] {
  return Object.values(readRaw().tags).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getCustomTagColor(name: string): string | undefined {
  return readRaw().tags[name]?.color;
}

/**
 * Ensure every tag name currently used on bookmarks exists in the catalog
 * (default colour). Returns the full catalog. Lets the catalog stay in sync
 * with the inline tags without a separate management UI.
 */
export function ensureCatalogForNames(names: string[]): CustomTagMeta[] {
  const data = readRaw();
  let changed = false;
  let maxOrder = Object.values(data.tags).reduce((m, t) => Math.max(m, t.sortOrder), -1);
  for (const name of names) {
    if (!name || data.tags[name]) continue;
    maxOrder += 1;
    data.tags[name] = { name, color: "zinc", sortOrder: maxOrder, updatedAt: Date.now() };
    changed = true;
  }
  if (changed) writeRaw(data);
  return Object.values(data.tags).sort((a, b) => a.sortOrder - b.sortOrder);
}

/** Merge an authoritative server catalog (cloud sync), last-write-wins. */
export function mergeServerCustomTags(serverTags: CustomTagMeta[]): void {
  const data = readRaw();
  for (const s of serverTags) {
    const existing = data.tags[s.name];
    if (existing && existing.updatedAt >= s.updatedAt) continue;
    data.tags[s.name] = {
      name: s.name,
      color: s.color || "zinc",
      sortOrder: Number.isFinite(s.sortOrder) ? s.sortOrder : 0,
      updatedAt: s.updatedAt || Date.now(),
    };
  }
  writeRaw(data);
}
