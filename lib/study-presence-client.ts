import { nativeClient } from "@/mobile/shared/contracts";
import { LS_KEYS } from "@/lib/storage/keys";
import { canonicalPresenceExam, isPresenceBot, PRESENCE_POLL_MS, PRESENCE_VISITOR_ID, PRESENCE_WINDOW_MS } from "@/lib/study-presence";
import { presenceRetryAfterMs } from "@/lib/study-presence-contract";

const storageKey = LS_KEYS.studyPresenceVisitor;

function browserIdentifier(canRotate: boolean) {
  const day = new Date().toISOString().slice(0, 10);
  const saved = localStorage.getItem(storageKey)?.split("|");
  const validId = (value?: string): value is string => Boolean(value && PRESENCE_VISITOR_ID.test(value));
  if (saved?.[0] === day && validId(saved[1])) {
    return { id: saved[1], previousVisitorId: validId(saved[2]) ? saved[2] : undefined, stored: saved.join("|") };
  }
  // First use and daily rotation are serialized across tabs when supported.
  if (!canRotate) return null;
  const id = crypto.randomUUID();
  const previousVisitorId = validId(saved?.[1]) ? saved[1] : undefined;
  const stored = [day, id, ...(previousVisitorId ? [previousVisitorId] : [])].join("|");
  localStorage.setItem(storageKey, stored);
  return { id, previousVisitorId, stored };
}

let pending: { exam: string; answeredAt: number } | undefined;
let timer: ReturnType<typeof setTimeout> | undefined;
let nextSendAt = 0;
let retryAt = 0;
let sending = false;
let listening = false;

function schedule() {
  clearTimeout(timer);
  if (pending && !sending) {
    timer = setTimeout(flush, Math.max(0, Math.max(nextSendAt, retryAt) - Date.now()));
  }
}

function flush() {
  const answer = pending;
  if (!answer || sending || Date.now() < retryAt) return;
  clearTimeout(timer);
  pending = undefined;
  sending = true;
  nextSendAt = Date.now() + PRESENCE_POLL_MS;
  void sendAnswer(answer).catch(() => { /* Presence is best-effort. */ }).finally(() => {
    sending = false;
    if (document.visibilityState === "hidden" && Date.now() >= retryAt) flush();
    else schedule();
  });
}

async function sendAnswer(answer: { exam: string; answeredAt: number }) {
  const locks = navigator.locks;
  const signal = AbortSignal.timeout(8_000);
  const send = async () => {
    const answeredAgoMs = Math.max(0, Date.now() - answer.answeredAt);
    if (answeredAgoMs >= PRESENCE_WINDOW_MS || signal.aborted) return;
    const identifier = browserIdentifier(Boolean(locks));
    if (!identifier) return;
    const response = await fetch("/api/stats/study-presence", {
      method: "POST", headers: { "Content-Type": "application/json" }, credentials: "omit", keepalive: true, signal,
      body: JSON.stringify({ visitorId: identifier.id, previousVisitorId: identifier.previousVisitorId, exam: answer.exam, answeredAgoMs }),
    });
    retryAt = Date.now() + presenceRetryAfterMs(response.headers.get("Retry-After"));
    if (response.status === 204 && identifier.previousVisitorId && localStorage.getItem(storageKey) === identifier.stored) {
      localStorage.setItem(storageKey, identifier.stored.split("|").slice(0, 2).join("|"));
    }
  };
  if (locks) await locks.request(storageKey, { signal }, send);
  else await send();
}

/** Called by existing answer handlers. Only the latest answer in a burst needs a write. */
export function reportStudyAnswer(exam: string | null | undefined): void {
  if (!exam || typeof window === "undefined" || nativeClient() || navigator.webdriver ||
      isPresenceBot(navigator.userAgent) || document.visibilityState !== "visible") return;
  const canonical = canonicalPresenceExam(exam);
  if (!canonical) return;
  pending = { exam: canonical, answeredAt: Date.now() };
  if (!listening) {
    listening = true;
    window.addEventListener("pagehide", flush);
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") flush(); });
  }
  if (Date.now() >= Math.max(nextSendAt, retryAt)) flush();
  else schedule();
}
