import { test, expect } from "@playwright/test";

test.describe("POST /api/contact/enterprise", () => {
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

test.describe("/contact/enterprise GET page", () => {
  test("loads form page with 200", async ({ page }) => {
    const res = await page.goto("/contact/enterprise");
    expect(res?.status()).toBe(200);
    await expect(page.getByText("お問い合わせ")).toBeVisible();
  });

  test("/contact/enterprise/thanks loads with 200", async ({ page }) => {
    const res = await page.goto("/contact/enterprise/thanks");
    expect(res?.status()).toBe(200);
    await expect(page.getByText("お問い合わせありがとうございました")).toBeVisible();
  });
});
