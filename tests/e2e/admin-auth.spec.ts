import { test, expect } from "@playwright/test";

test.describe("/admin Basic Auth", () => {
  test("/admin/team without credentials returns 401", async ({ request }) => {
    const res = await request.get("/admin/team");
    expect(res.status()).toBe(401);
    expect(res.headers()["www-authenticate"]).toMatch(/Basic realm="Kakomon AI Admin"/);
  });

  test("/admin/stats without credentials returns 401", async ({ request }) => {
    const res = await request.get("/admin/stats");
    expect(res.status()).toBe(401);
  });

  test("/admin/team with wrong credentials returns 401", async ({ request }) => {
    const res = await request.get("/admin/team", {
      headers: { authorization: "Basic " + Buffer.from("wrong:wrong").toString("base64") },
    });
    expect(res.status()).toBe(401);
  });

  test("/admin/team with valid credentials returns 200", async ({ request }) => {
    const user = process.env.ADMIN_BASIC_USER ?? "kaneta";
    const pass = process.env.ADMIN_BASIC_PASS ?? "xK7mQ2wF9nR4pL8v";
    const res = await request.get("/admin/team", {
      headers: { authorization: "Basic " + Buffer.from(`${user}:${pass}`).toString("base64") },
    });
    expect(res.status()).toBe(200);
  });
});
