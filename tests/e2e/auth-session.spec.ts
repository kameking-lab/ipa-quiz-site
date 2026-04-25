import { test, expect } from "@playwright/test";

test.describe("/api/auth/session", () => {
  test("returns 200 with JSON body even without AUTH_SECRET", async ({ request }) => {
    const res = await request.get("/api/auth/session");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(typeof body).toBe("object");
  });
});
