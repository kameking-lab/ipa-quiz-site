import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { PracticeAccess } from "@/lib/billing/practice-contract";

const access: PracticeAccess = { kind: "guest", remaining: 9, freeDaily: 10, resetAt: "2026-10-30T15:00:00.000Z", retryAfter: null };
const cookieRequired = () => Response.json({ error: "guest_cookie_required", access }, { status: 428 });
const granted = (id: string) => Response.json({ question: { id }, access });
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>(done => { resolve = done; });
  return { promise, resolve };
}
function webLocks() {
  let queue = Promise.resolve();
  return { request: vi.fn((_name: string, _options: LockOptions, run: (lock: Lock) => Promise<unknown>) => {
    const pending = queue.then(() => run({} as Lock));
    queue = pending.then(() => undefined, () => undefined);
    return pending;
  }) };
}
beforeEach(() => {
  vi.resetModules();
  Object.defineProperty(navigator, "locks", { configurable: true, value: undefined });
});
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });

describe("anonymous cookie bootstrap", () => {
  it("holds one origin lock across the initial POST and retry for independent tab queues", async () => {
    const locks = webLocks();
    Object.defineProperty(navigator, "locks", { configurable: true, value: locks });
    const first = deferred<Response>();
    let cookie = false;
    const fetcher = vi.fn(async (_url: string, options: RequestInit) => {
      const { id } = JSON.parse(options.body as string);
      if (!cookie) {
        const response = await first.promise;
        cookie = true;
        return response;
      }
      return granted(id);
    });
    vi.stubGlobal("fetch", fetcher);
    const tabA = await import("@/lib/billing/guest-client");
    vi.resetModules();
    const tabB = await import("@/lib/billing/guest-client");
    const a = tabA.fetchPracticeQuestion("ordinary-a", false);
    const b = tabB.fetchPracticeQuestion("ordinary-b", true);
    await vi.waitFor(() => expect(locks.request).toHaveBeenCalledTimes(2));
    expect(fetcher).toHaveBeenCalledTimes(1);
    first.resolve(cookieRequired());
    await expect(a).resolves.toMatchObject({ question: { id: "ordinary-a" }, access });
    await expect(b).resolves.toMatchObject({ question: { id: "ordinary-b" }, access });
    expect(fetcher).toHaveBeenCalledTimes(3);
    expect(fetcher.mock.calls.map(([, options]) => JSON.parse(options.body as string).id)).toEqual(["ordinary-a", "ordinary-a", "ordinary-b"]);
    expect(fetcher.mock.calls.every(([, options]) => options.credentials === "same-origin")).toBe(true);
  });

  it("serializes the same tab without Web Locks and stops after the second 428", async () => {
    const fetcher = vi.fn(async () => cookieRequired());
    vi.stubGlobal("fetch", fetcher);
    const { fetchPracticeQuestion } = await import("@/lib/billing/guest-client");
    const a = fetchPracticeQuestion("a", false);
    const b = fetchPracticeQuestion("b", false);
    const results = await Promise.allSettled([a, b]);
    expect(results.every(result => result.status === "rejected" && result.reason.code === "guest_cookie_required")).toBe(true);
    expect(results[0]).toMatchObject({ reason: { access } });
    expect(fetcher).toHaveBeenCalledTimes(4);
    expect(fetcher.mock.calls.map(call => JSON.parse((call as unknown as [string, RequestInit])[1].body as string).id)).toEqual(["a", "a", "b", "b"]);
  });

  it("detaches an aborted consumer but drains a delayed 428 before another request starts", async () => {
    const response = deferred<Response>();
    const fetcher = vi.fn(async (_url: string, options: RequestInit) => {
      const { id } = JSON.parse(options.body as string);
      return id === "cancelled" ? response.promise : granted(id);
    });
    vi.stubGlobal("fetch", fetcher);
    const { fetchPracticeQuestion } = await import("@/lib/billing/guest-client");
    const controller = new AbortController();
    const first = fetchPracticeQuestion("cancelled", false, controller.signal);
    const cancelled = expect(first).rejects.toMatchObject({ name: "AbortError" });
    await vi.waitFor(() => expect(fetcher).toHaveBeenCalledTimes(1));
    controller.abort();
    await cancelled;
    expect(fetcher.mock.calls[0][1].signal?.aborted).toBe(false);
    const next = fetchPracticeQuestion("current", false);
    await Promise.resolve();
    expect(fetcher).toHaveBeenCalledTimes(1);
    response.resolve(cookieRequired());
    await expect(next).resolves.toMatchObject({ question: { id: "current" } });
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it("does not send queued work cancelled by a duplicate effect", async () => {
    const fetcher = vi.fn(async () => granted("only-current"));
    vi.stubGlobal("fetch", fetcher);
    const { fetchPracticeQuestion } = await import("@/lib/billing/guest-client");
    const controller = new AbortController();
    const stale = fetchPracticeQuestion("stale", false, controller.signal);
    controller.abort();
    await expect(stale).rejects.toMatchObject({ name: "AbortError" });
    await fetchPracticeQuestion("only-current", false);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it.each([
    [429, "daily_limit", { ...access, remaining: 0 }],
    [429, "guest_rate_limited", { ...access, retryAfter: 60 }],
    [503, "billing_unavailable", { ...access, kind: "unavailable", remaining: null }],
  ])("preserves metadata for %s %s without automatic retries", async (status, code, metadata) => {
    const fetcher = vi.fn(async () => Response.json({ error: code, access: metadata }, { status: status as number }));
    vi.stubGlobal("fetch", fetcher);
    const { fetchPracticeQuestion } = await import("@/lib/billing/guest-client");
    await expect(fetchPracticeQuestion("ordinary", false)).rejects.toMatchObject({ code, access: metadata });
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("bounds HTTP waiting and lets the queue recover after a transport timeout", async () => {
    vi.useFakeTimers();
    vi.stubGlobal("fetch", vi.fn((_url: string, options: RequestInit) => new Promise<Response>((_resolve, reject) => {
      options.signal?.addEventListener("abort", () => reject(new DOMException("timed out", "AbortError")), { once: true });
    })));
    const { fetchPracticeQuestion } = await import("@/lib/billing/guest-client");
    const pending = fetchPracticeQuestion("timeout", false);
    const failed = expect(pending).rejects.toMatchObject({ code: "billing_unavailable", access: null });
    await vi.advanceTimersByTimeAsync(20_000);
    await failed;
    vi.stubGlobal("fetch", vi.fn(async () => granted("recovered")));
    await expect(fetchPracticeQuestion("recovered", false)).resolves.toMatchObject({ question: { id: "recovered" } });
  });
});
