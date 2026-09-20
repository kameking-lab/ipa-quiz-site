function idsFromEntries(entries: unknown): string[] {
  if (!Array.isArray(entries)) return [];
  return entries
    .map((entry) =>
      typeof entry === "object" && entry !== null && "id" in entry
        ? (entry as { id?: unknown }).id
        : undefined,
    )
    .filter((id): id is string => typeof id === "string" && id.length > 0);
}

/** Accept the current HistoryData shape and the legacy bare-entry array. */
export function extractRecentlyViewedIds(value: unknown): string[] {
  const entries = Array.isArray(value)
    ? value
    : typeof value === "object" && value !== null && "entries" in value
      ? (value as { entries?: unknown }).entries
      : [];
  return [...new Set(idsFromEntries(entries))];
}
