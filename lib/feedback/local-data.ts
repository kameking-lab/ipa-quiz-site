import type { LSKey } from "@/lib/storage/keys";

/** Read each generation independently so a corrupt legacy key cannot hide new receipts. */
export function readLocalFeedback(key: LSKey): unknown {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(window.localStorage.getItem(key) ?? "null"); }
  catch { return null; }
}
