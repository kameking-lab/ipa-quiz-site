import { test, expect } from "@playwright/test";

test.describe("POST /api/stripe/checkout", () => {
  test("unauthenticated request returns 401 not 503", async ({ request }) => {
    const res = await request.post("/api/stripe/checkout", {
      data: { plan: "premium" },
    });
    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.error).toBe("unauthorized");
  });

  test("unauthenticated request without body still returns 401", async ({ request }) => {
    const res = await request.post("/api/stripe/checkout", { data: {} });
    expect(res.status()).toBe(401);
  });
});
