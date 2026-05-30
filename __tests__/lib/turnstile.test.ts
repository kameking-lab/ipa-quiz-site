import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { verifyTurnstileToken } from "@/lib/turnstile";

// Characterization tests for the Cloudflare Turnstile CAPTCHA verifier used by
// the public form APIs (contact/feedback). Security-relevant contract: when no
// secret is configured it FAILS OPEN (skipped:true, never calls the API) so the
// site keeps working without Turnstile; with a secret it round-trips the token
// to siteverify and maps the verdict + error codes.

function mockFetch(handler: (input: string | URL, init?: RequestInit) => Promise<Response>) {
  const fetchMock = vi.fn(handler);
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

beforeEach(() => {
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("verifyTurnstileToken", () => {
  it("fails open (skipped) when no secret is configured, without calling the API", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    const fetchMock = mockFetch(async () => new Response("{}", { status: 200 }));
    const r = await verifyTurnstileToken("any-token");
    expect(r).toEqual({ ok: true, skipped: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a missing/non-string token without calling the API (secret set)", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret");
    const fetchMock = mockFetch(async () => new Response("{}", { status: 200 }));
    const r = await verifyTurnstileToken(undefined);
    expect(r).toEqual({ ok: false, skipped: false, errorCodes: ["missing-input-response"] });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts secret/response/remoteip to siteverify and accepts success:true", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret");
    let sentUrl = "";
    let sentBody = new URLSearchParams();
    const fetchMock = mockFetch(async (input, init) => {
      sentUrl = typeof input === "string" ? input : input.toString();
      sentBody = new URLSearchParams(String(init?.body));
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    });

    const r = await verifyTurnstileToken("tok-123", "1.2.3.4");

    expect(r).toEqual({ ok: true, skipped: false });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(sentUrl).toBe("https://challenges.cloudflare.com/turnstile/v0/siteverify");
    expect(sentBody.get("secret")).toBe("test-secret");
    expect(sentBody.get("response")).toBe("tok-123");
    expect(sentBody.get("remoteip")).toBe("1.2.3.4");
  });

  it("propagates Cloudflare error-codes when success is false", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret");
    mockFetch(async () =>
      new Response(JSON.stringify({ success: false, "error-codes": ["invalid-input-response"] }), {
        status: 200,
      }),
    );
    const r = await verifyTurnstileToken("tok");
    expect(r).toEqual({ ok: false, skipped: false, errorCodes: ["invalid-input-response"] });
  });

  it("maps a non-OK HTTP status to an http-error verdict", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret");
    mockFetch(async () => new Response("nope", { status: 403 }));
    const r = await verifyTurnstileToken("tok");
    expect(r).toEqual({ ok: false, skipped: false, errorCodes: ["http-error"] });
  });

  it("maps a thrown fetch (network/timeout) to a network-error verdict", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "test-secret");
    mockFetch(async () => {
      throw new Error("aborted");
    });
    const r = await verifyTurnstileToken("tok");
    expect(r).toEqual({ ok: false, skipped: false, errorCodes: ["network-error"] });
  });
});
