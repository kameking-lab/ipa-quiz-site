import { test, expect } from "@playwright/test";

// /admin is gated by Basic Auth in middleware.ts:
//   401 → auth IS configured; request lacks/has-wrong credentials.
//   503 → auth is NOT configured (ADMIN_BASIC_USER/PASS unset/blank) — fail-closed.
// The previous version of this spec accepted [401, 503] for every case, so it
// could not tell "auth working" from "auth broken" — which is exactly how a
// production regression to 503 (empirical review 致命傷②) went unnoticed.
//
// We now run against a local webServer whose admin creds are seeded in
// playwright.config.ts, so the *configured* path is asserted strictly (401 /
// 200, never 503). Branch-level coverage of the 503 fail-closed path lives in
// the deterministic unit test __tests__/middleware.test.ts.
const REMOTE = Boolean(process.env.E2E_BASE_URL);
const E2E_USER = process.env.E2E_ADMIN_USER;
const E2E_PASS = process.env.E2E_ADMIN_PASS;

function basic(user: string, pass: string): string {
  return "Basic " + Buffer.from(`${user}:${pass}`, "utf-8").toString("base64");
}

test.describe("/admin Basic Auth", () => {
  // Empirical review A-4/F-1 reported bare /admin "hanging" 10s+. At the HTTP
  // layer the middleware answers immediately — assert it never times out.
  test("bare /admin answers fast with an auth-gate status (no hang)", async ({ request }) => {
    const started = Date.now();
    const res = await request.get("/admin", { maxRedirects: 0, timeout: 8000 });
    const elapsed = Date.now() - started;
    expect([401, 503]).toContain(res.status());
    expect(elapsed).toBeLessThan(5000);
  });

  test("bare /admin/ (trailing slash) resolves to the auth gate (no hang)", async ({ request }) => {
    const res = await request.get("/admin/", { timeout: 8000 });
    expect([401, 503]).toContain(res.status());
  });

  // Strict configured-path assertions — only when we own the server (local
  // webServer with seeded creds). Against a remote E2E_BASE_URL we cannot know
  // its admin config, so these are skipped there.
  test.describe("configured admin auth (local webServer)", () => {
    test.skip(REMOTE || !E2E_USER || !E2E_PASS, "needs the local webServer with seeded admin creds");

    test("no credentials → 401 with a Basic challenge (configured, NOT 503)", async ({ request }) => {
      const res = await request.get("/admin", { maxRedirects: 0 });
      expect(res.status()).toBe(401);
      expect(res.headers()["www-authenticate"]).toBe('Basic realm="Kakomon AI Admin"');
    });

    test("nested admin route without credentials → 401 (not 503)", async ({ request }) => {
      const res = await request.get("/admin/stats", { maxRedirects: 0 });
      expect(res.status()).toBe(401);
    });

    test("wrong credentials → 401", async ({ request }) => {
      const res = await request.get("/admin/stats", {
        headers: { authorization: basic("nope", "nope") },
        maxRedirects: 0,
      });
      expect(res.status()).toBe(401);
    });

    test("valid credentials → 200 (full configured path through real middleware)", async ({
      request,
    }) => {
      const res = await request.get("/admin/stats", {
        headers: { authorization: basic(E2E_USER!, E2E_PASS!) },
      });
      expect(res.status()).toBe(200);
    });
  });
});
