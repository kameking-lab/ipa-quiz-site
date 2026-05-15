import { test, expect } from "@playwright/test";

test.describe("/admin Basic Auth", () => {
  test("/admin/stats without credentials returns 401", async ({ request }) => {
    const res = await request.get("/admin/stats");
    expect(res.status()).toBe(401);
    expect(res.headers()["www-authenticate"]).toMatch(/Basic realm="Kakomon AI Admin"/);
  });

  test("/admin/metrics without credentials returns 401", async ({ request }) => {
    const res = await request.get("/admin/metrics");
    expect(res.status()).toBe(401);
  });

  test("/admin/stats with wrong credentials returns 401", async ({ request }) => {
    const res = await request.get("/admin/stats", {
      headers: { authorization: "Basic " + Buffer.from("wrong:wrong").toString("base64") },
    });
    expect(res.status()).toBe(401);
  });

  test("/admin/stats with valid credentials returns 200", async ({ request }) => {
    const user = process.env.ADMIN_BASIC_USER;
    const pass = process.env.ADMIN_BASIC_PASS;
    if (!user || !pass) {
      throw new Error("ADMIN_BASIC_USER and ADMIN_BASIC_PASS must be set to run this test");
    }
    const res = await request.get("/admin/stats", {
      headers: { authorization: "Basic " + Buffer.from(`${user}:${pass}`).toString("base64") },
    });
    expect(res.status()).toBe(200);
  });
});
