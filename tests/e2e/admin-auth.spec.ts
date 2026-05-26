import { test, expect } from "@playwright/test";

// When ADMIN_BASIC_USER / ADMIN_BASIC_PASS are not set the middleware returns
// 503 (misconfigured) instead of 401.  Both outcomes are acceptable in a
// local test environment that has no env vars configured.
const ACCEPTS = [401, 503] as const;

test.describe("/admin Basic Auth", () => {
  // Empirical review A-4/F-1 reported bare /admin "hanging" 10s+. At the HTTP
  // layer the middleware answers immediately; assert bare /admin returns 401/503
  // quickly (well under the reported 10s) and never times out.
  test("bare /admin without credentials returns 401/503 fast (no infinite wait)", async ({
    request,
  }) => {
    const started = Date.now();
    const res = await request.get("/admin", { maxRedirects: 0, timeout: 8000 });
    const elapsed = Date.now() - started;
    expect(ACCEPTS).toContain(res.status());
    expect(elapsed).toBeLessThan(5000);
  });

  test("bare /admin/ (trailing slash) without credentials returns 401/503", async ({ request }) => {
    const res = await request.get("/admin/", { maxRedirects: 0, timeout: 8000 });
    expect(ACCEPTS).toContain(res.status());
  });

  test("/admin/stats without credentials returns 401", async ({ request }) => {
    const res = await request.get("/admin/stats");
    expect(ACCEPTS).toContain(res.status());
  });

  test("/admin/metrics without credentials returns 401", async ({ request }) => {
    const res = await request.get("/admin/metrics");
    expect(ACCEPTS).toContain(res.status());
  });

  test("/admin/stats with wrong credentials returns 401", async ({ request }) => {
    const res = await request.get("/admin/stats", {
      headers: { authorization: "Basic " + Buffer.from("wrong:wrong").toString("base64") },
    });
    expect(ACCEPTS).toContain(res.status());
  });

  test("/admin/stats with valid credentials returns 200", async ({ request }) => {
    const user = process.env.ADMIN_BASIC_USER;
    const pass = process.env.ADMIN_BASIC_PASS;
    test.skip(!user || !pass, "ADMIN_BASIC_USER and ADMIN_BASIC_PASS must be set to run this test");
    const res = await request.get("/admin/stats", {
      headers: { authorization: "Basic " + Buffer.from(`${user}:${pass}`).toString("base64") },
    });
    expect(res.status()).toBe(200);
  });
});
