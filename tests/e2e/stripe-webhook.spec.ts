import { test, expect } from "@playwright/test";

test.describe("POST /api/webhooks/stripe", () => {
  test("missing stripe-signature returns 400 (not 503)", async ({ request }) => {
    const res = await request.post("/api/webhooks/stripe", {
      headers: { "content-type": "application/json" },
      data: {},
    });
    expect(res.status()).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("missing_signature");
  });

  test("invalid signature returns 400", async ({ request }) => {
    const res = await request.post("/api/webhooks/stripe", {
      headers: {
        "content-type": "application/json",
        "stripe-signature": "t=1,v1=invalid",
      },
      data: { type: "checkout.session.completed" },
    });
    // 400 (invalid_signature) or 503 (stripe_not_configured) acceptable.
    expect([400, 503]).toContain(res.status());
  });
});
