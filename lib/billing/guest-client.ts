import type { Question } from "@/lib/questions/types";
import type { PracticeAccess } from "./practice-contract";

const LOCK_NAME = "kakomon-ai:practice-cookie:v1";
const REQUEST_TIMEOUT_MS = 20_000;
let requestQueue: Promise<void> = Promise.resolve();

export class PracticeRequestError extends Error {
  constructor(public readonly code: string, public readonly access: PracticeAccess | null) {
    super(code);
    this.name = "PracticeRequestError";
  }
}

function aborted() {
  return new DOMException("The question request was cancelled.", "AbortError");
}

function readAccess(value: unknown): PracticeAccess | null {
  if (!value || typeof value !== "object") return null;
  const access = value as Record<string, unknown>;
  if (!["free", "sample", "trial", "pass", "guest", "unavailable"].includes(String(access.kind)) ||
      !Number.isInteger(access.freeDaily) || (access.freeDaily as number) < 0 ||
      (access.remaining !== null && (!Number.isInteger(access.remaining) || (access.remaining as number) < 0)) ||
      typeof access.resetAt !== "string" || !Number.isFinite(Date.parse(access.resetAt)) ||
      (access.retryAfter !== null && (typeof access.retryAfter !== "number" || !Number.isFinite(access.retryAfter) || access.retryAfter < 0))) return null;
  return value as PracticeAccess;
}

async function postQuestion(id: string, shuffle: boolean) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch("/api/billing/question", {
      method: "POST", cache: "no-store", credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, shuffle }), signal: controller.signal,
    });
    const body: unknown = await response.json();
    const payload = body && typeof body === "object" ? body as Record<string, unknown> : {};
    return { response, payload, access: readAccess(payload.access) };
  } catch {
    throw new PracticeRequestError("billing_unavailable", null);
  } finally {
    clearTimeout(timeout);
  }
}

async function performRequest(id: string, shuffle: boolean, signal?: AbortSignal) {
  if (signal?.aborted) throw aborted();
  let result = await postQuestion(id, shuffle);
  if (signal?.aborted) throw aborted();
  // The first 428 only establishes the HttpOnly cookie; it grants no question.
  if (result.response.status === 428 && result.payload.error === "guest_cookie_required") {
    result = await postQuestion(id, shuffle);
    if (signal?.aborted) throw aborted();
  }
  const { response, payload, access } = result;
  if (!response.ok) {
    throw new PracticeRequestError(typeof payload.error === "string" ? payload.error : "billing_unavailable", access);
  }
  if (!access || !payload.question || typeof payload.question !== "object" ||
      typeof (payload.question as Record<string, unknown>).id !== "string") {
    throw new PracticeRequestError("billing_unavailable", access);
  }
  return { question: payload.question as Question, access };
}

/**
 * Serialize the initial POST and its one cookie-confirmation retry across this
 * tab and, where Web Locks is available, every tab on this origin. With no Web
 * Locks the queue still works within this tab; simultaneous first visits in
 * different tabs cannot be guaranteed to establish a single anonymous ID.
 */
export function fetchPracticeQuestion(id: string, shuffle: boolean, signal?: AbortSignal) {
  if (signal?.aborted) return Promise.reject(aborted());
  const pending = requestQueue.then(async () => {
    if (signal?.aborted) throw aborted();
    if (typeof navigator !== "undefined" && navigator.locks?.request) {
      return navigator.locks.request(LOCK_NAME, { mode: "exclusive" }, () => performRequest(id, shuffle, signal));
    }
    return performRequest(id, shuffle, signal);
  });
  requestQueue = pending.then(() => undefined, () => undefined);
  if (!signal) return pending;

  // Detach an unmounted consumer promptly, but drain in-flight HTTP before
  // releasing the lock: a delayed 428 may still set the shared browser cookie.
  // Only the bounded transport timeout aborts that HTTP request itself.
  return new Promise<Awaited<typeof pending>>((resolve, reject) => {
    const onAbort = () => reject(aborted());
    signal.addEventListener("abort", onAbort, { once: true });
    pending.then(resolve, reject).finally(() => signal.removeEventListener("abort", onAbort));
  });
}
