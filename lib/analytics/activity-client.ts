import { ACTIVITY_EVENTS, activityPage, activityQualification, type ActivityEvent, type ActivityEventName } from "./activity-contract";

let pending: ActivityEvent[] = [];
let timer: ReturnType<typeof setTimeout> | undefined;

export function captureActivity(event: string, props?: Record<string, unknown>): void {
  if (typeof window === "undefined" || /^\/(admin|api|auth)(\/|$)/.test(location.pathname) || !(ACTIVITY_EVENTS as readonly string[]).includes(event)) return;
  try {
    pending.push({ event: event as ActivityEventName, qualification: activityQualification(location.pathname, location.search, props), page: activityPage(location.pathname) });
    if (pending.length >= 32) flushActivity();
    else timer ??= setTimeout(flushActivity, 2000);
  } catch { /* Measurement must not affect learning. */ }
}

/** No retry after acceptance: the aggregate has no identifier for deduplication. */
export function flushActivity(): void {
  if (timer) clearTimeout(timer);
  timer = undefined;
  if (!pending.length) return;
  const events = pending;
  pending = [];
  try {
    const body = JSON.stringify({ events });
    if (typeof navigator.sendBeacon === "function" && navigator.sendBeacon("/api/activity", new Blob([body], { type: "text/plain;charset=UTF-8" }))) return;
    void fetch("/api/activity", { method: "POST", body, credentials: "omit", keepalive: true, headers: { "Content-Type": "text/plain;charset=UTF-8" } }).catch(() => {});
  } catch { /* Unsent counts are omitted, never retried as possible duplicates. */ }
}
