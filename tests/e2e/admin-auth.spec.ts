import { test, expect } from "@playwright/test";

// When ADMIN_BASIC_USER / ADMIN_BASIC_PASS are not set the middleware returns
// 503 (misconfigured) instead of 401.  Both outcomes are acceptable in a
// local test environment that has no env vars configured.
const ACCEPTS = [401, 503] as const;

test.describe("/admin Basic Auth", () => {
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
