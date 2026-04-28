import { test, expect } from "@playwright/test";

const PAID_MODE = process.env.NEXT_PUBLIC_PAID_MODE === "true";

test.describe("POST /api/stripe/checkout (PAID_MODE only)", () => {
  test.skip(!PAID_MODE, "PAID_MODE=false の教育貢献モードでは課金 API は無効");

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

test.describe("POST /api/stripe/checkout (educational contribution mode)", () => {
  test.skip(PAID_MODE, "PAID_MODE=true 時は上のテストで検証する");

  test("returns 404 with paid_mode_disabled", async ({ request }) => {
    const res = await request.post("/api/stripe/checkout", {
      data: { plan: "premium" },
    });
    expect(res.status()).toBe(404);
    const body = await res.json();
    expect(body.error).toBe("paid_mode_disabled");
  });
});
