import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Characterization tests for captureException (lib/monitoring/sentry.ts) — the
 * fail-soft server-side error-capture bridge. Untested before: the only test
 * that imports the module (copilot/streaming) mocks it away, so the real
 * implementation has no coverage. Load-bearing contracts:
 *   1. observability floor: always console.error regardless of DSN config;
 *   2. env-gate: no SENTRY_DSN → isSentryConfigured false and fetch is NEVER
 *      called (no spurious network in environments without Sentry);
 *   3. unparseable SENTRY_DSN → treated as unconfigured (no fetch);
 *   4. valid DSN → POSTs a Sentry Envelope to https://{host}/api/{projectId}/store/
 *      with an X-Sentry-Auth header carrying sentry_key, and a body whose
 *      exception value/type mirror the thrown Error and transaction === route;
 *   5. captureException NEVER throws — not when fetch rejects, not for
 *      non-Error inputs (string / null).
 * DSN is parsed at module import time, so each test re-imports after stubbing env
 * (same idiom as ai/cost-guard.test).
 */

const VALID_DSN = "https://pubkey123@o123.ingest.sentry.test/456";

beforeEach(() => {
  vi.resetModules();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("captureException (sentry bridge)", () => {
  it("no DSN: isSentryConfigured false, fetch never called, still console.error", async () => {
    vi.stubEnv("SENTRY_DSN", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const mod = await import("@/lib/monitoring/sentry");
    expect(mod.isSentryConfigured).toBe(false);

    await expect(
      mod.captureException(new Error("boom"), { route: "/api/x" }),
    ).resolves.toBeUndefined();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(errSpy).toHaveBeenCalled();
  });

  it("unparseable DSN is treated as unconfigured (no fetch)", async () => {
    vi.stubEnv("SENTRY_DSN", "not-a-valid-url");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});

    const mod = await import("@/lib/monitoring/sentry");
    expect(mod.isSentryConfigured).toBe(false);
    await mod.captureException(new Error("boom"), { route: "/api/x" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("valid DSN: POSTs a Sentry envelope mirroring the Error and route", async () => {
    vi.stubEnv("SENTRY_DSN", VALID_DSN);
    const fetchMock = vi.fn().mockResolvedValue(new Response("ok", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});

    const mod = await import("@/lib/monitoring/sentry");
    expect(mod.isSentryConfigured).toBe(true);

    await mod.captureException(new TypeError("bad thing"), {
      route: "/api/foo",
      userId: "u1",
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://o123.ingest.sentry.test/api/456/store/");
    expect(init.method).toBe("POST");
    const headers = init.headers as Record<string, string>;
    expect(headers["X-Sentry-Auth"]).toContain("sentry_key=pubkey123");

    const body = JSON.parse(String(init.body));
    expect(body.level).toBe("error");
    expect(body.transaction).toBe("/api/foo");
    expect(body.user).toEqual({ id: "u1" });
    expect(body.exception.values[0].value).toBe("bad thing");
    expect(body.exception.values[0].type).toBe("TypeError");
  });

  it("fetch rejection is swallowed (never throws)", async () => {
    vi.stubEnv("SENTRY_DSN", VALID_DSN);
    const fetchMock = vi.fn().mockRejectedValue(new Error("network down"));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});

    const mod = await import("@/lib/monitoring/sentry");
    await expect(
      mod.captureException(new Error("boom"), { route: "/r" }),
    ).resolves.toBeUndefined();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("non-Error inputs (string / null) report with type 'Error' and never throw", async () => {
    vi.stubEnv("SENTRY_DSN", VALID_DSN);
    const fetchMock = vi.fn().mockResolvedValue(new Response("ok", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});

    const mod = await import("@/lib/monitoring/sentry");

    await expect(mod.captureException("plain string")).resolves.toBeUndefined();
    await expect(mod.captureException(null)).resolves.toBeUndefined();

    const firstBody = JSON.parse(String((fetchMock.mock.calls[0] as [string, RequestInit])[1].body));
    expect(firstBody.exception.values[0].value).toBe("plain string");
    expect(firstBody.exception.values[0].type).toBe("Error");
  });
});
