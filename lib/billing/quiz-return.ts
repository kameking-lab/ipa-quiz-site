// UI navigation only. Never authorizes practice or changes billing/history data.
const KEY = "ipa-quiz:billing-return:v1";
const TTL = 48 * 60 * 60 * 1000;
type Store = Pick<Storage, "getItem" | "setItem">;

export function safeQuizReturn(value: unknown): string | null {
  if (typeof value !== "string" || value.length > 8192 || !value.startsWith("/quiz?") || /[\\\u0000-\u0020]/.test(value)) return null;
  try {
    const url = new URL(value, "https://quiz.invalid");
    if (url.origin !== "https://quiz.invalid" || url.pathname !== "/quiz" || url.hash || !url.searchParams.get("question")) return null;
    return url.pathname + url.search;
  } catch { return null; }
}

function key(order?: string): string | null {
  if (order === undefined) return KEY;
  return /^[a-zA-Z0-9_-]{1,160}$/.test(order) ? `${KEY}:order:${order}` : null;
}

export function saveQuizReturn(store: Store, value: unknown, now = Date.now(), order?: string): boolean {
  const href = safeQuizReturn(value), target = key(order);
  if (!href || !target) return false;
  try { store.setItem(target, JSON.stringify({ href, expiresAt: now + TTL })); return true; } catch { return false; }
}

export function readQuizReturn(store: Store, now = Date.now(), order?: string): string | null {
  const target = key(order);
  if (!target) return null;
  try {
    const item = JSON.parse(store.getItem(target) ?? "null");
    if (!item || !Number.isFinite(item.expiresAt) || item.expiresAt <= now || item.expiresAt > now + TTL) return null;
    return safeQuizReturn(item.href);
  } catch { return null; }
}

export function billingHref(href: string): string {
  const safe = safeQuizReturn(href);
  return safe ? `/billing?returnTo=${encodeURIComponent(safe)}` : "/billing";
}
