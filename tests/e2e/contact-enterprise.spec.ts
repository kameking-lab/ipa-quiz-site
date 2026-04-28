import { test, expect } from "@playwright/test";

const PAID_MODE = process.env.NEXT_PUBLIC_PAID_MODE === "true";

test.describe("POST /api/contact/enterprise", () => {
  test.skip(!PAID_MODE, "PAID_MODE=false の教育貢献モードでは無効化されている");

  test("valid payload returns 200", async ({ request }) => {
    const res = await request.post("/api/contact/enterprise", {
      data: {
        company: "テスト株式会社",
        name: "テスト 太郎",
        email: "test@example.com",
        phone: "03-0000-0000",
        memberCount: "50名",
        targetExam: "応用情報技術者",
        message: "デモ希望",
      },
    });
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.ok).toBe(true);
  });

  test("missing required fields returns 400", async ({ request }) => {
    const res = await request.post("/api/contact/enterprise", {
      data: { company: "X" },
    });
    expect(res.status()).toBe(400);
  });

  test("invalid email returns 400", async ({ request }) => {
    const res = await request.post("/api/contact/enterprise", {
      data: { company: "X", name: "Y", email: "not-an-email" },
    });
    expect(res.status()).toBe(400);
  });
});

test.describe("/contact/enterprise GET page (PAID_MODE only)", () => {
  test.skip(!PAID_MODE, "PAID_MODE=false の教育貢献モードでは無効化されている");

  test("loads form page with 200", async ({ page }) => {
    const res = await page.goto("/contact/enterprise");
    expect(res?.status()).toBe(200);
    await expect(
      page.getByRole("heading", { name: "Team プランのお問い合わせ" }),
    ).toBeVisible();
  });

  test("/contact/enterprise/thanks loads with 200", async ({ page }) => {
    const res = await page.goto("/contact/enterprise/thanks");
    expect(res?.status()).toBe(200);
    await expect(page.getByText("お問い合わせありがとうございました")).toBeVisible();
  });
});

test.describe("/contact/enterprise GET page (educational contribution mode)", () => {
  test.skip(PAID_MODE, "PAID_MODE=true 時は別テストで検証する");

  test("returns 404 in educational contribution mode", async ({ page }) => {
    const res = await page.goto("/contact/enterprise");
    expect(res?.status()).toBe(404);
  });
});
