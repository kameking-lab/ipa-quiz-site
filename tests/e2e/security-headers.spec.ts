import { test, expect } from "@playwright/test";

// Empirical review A-8: production leaked `Server: Vercel`. We override the
// Server header at the app layer (next.config headers). This verifies the
// override is applied by the running app and that we never advertise "Vercel".
//
// CAVEAT: on Vercel the `Server` header is injected by the platform edge and may
// override this app-level value. That cannot be verified from CI (which runs
// `next start`, not the Vercel edge) — it must be confirmed on the live
// deployment. Low impact (fingerprinting only).
test.describe("security response headers", () => {
  test("Server header is the app override, never the platform name", async ({ request }) => {
    const res = await request.get("/about");
    const server = res.headers()["server"] ?? "";
    expect(server).not.toBe("Vercel");
    expect(server).toBe("kakomon-ai");
  });

  test("X-Powered-By is suppressed", async ({ request }) => {
    const res = await request.get("/about");
    expect(res.headers()["x-powered-by"]).toBeUndefined();
  });

  test("core security headers are present", async ({ request }) => {
    const res = await request.get("/about");
    const h = res.headers();
    expect(h["x-content-type-options"]).toBe("nosniff");
    expect(h["x-frame-options"]).toBe("DENY");
    expect(h["content-security-policy"]).toContain("default-src 'self'");
  });
});
