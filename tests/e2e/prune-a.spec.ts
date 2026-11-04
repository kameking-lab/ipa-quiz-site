import { test, expect } from "@playwright/test";

test.describe("prune batch A", () => {
  for (const [from, to] of [
    ["/referral", "/contact#legacy-benefits"],
    ["/student", "/contact#legacy-benefits"],
    ["/ranking", "/account/dashboard#mock-scores"],
    ["/success-stories", "/blog"],
    ["/success-stories/ap", "/ap"],
    ["/success-stories/ap/old-case", "/ap"],
    ["/success-stories/unknown/old-case", "/blog"],
    ["/testimonials", "/blog"],
    ["/admin/moderation", "/admin"],
    ["/admin/competitors", "/admin"],
  ]) {
    test(`${from} returns a single 301 to ${to}`, async ({ request }) => {
      const response = await request.get(from, { maxRedirects: 0 });
      expect(response.status()).toBe(301);
      expect(response.headers().location).toBe(to);
    });
  }

  test("retired character asset URLs return 410", async ({ request }) => {
    for (const asset of ["normal", "sweet", "spicy"]) {
      const response = await request.get(`/characters/${asset}.svg`);
      expect(response.status()).toBe(410);
      expect(await response.text()).toContain("恒久的に削除");
    }
  });

  test("weekly signup no longer accepts email addresses", async ({ request }) => {
    const response = await request.post("/api/email-list", { data: { email: "test@example.invalid" } });
    expect(response.status()).toBe(410);
    expect(await response.json()).toMatchObject({ contact: "/contact" });
  });

  test("old character preferences do not reintroduce the selector", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("ipa-quiz:character:v1", "zan");
      localStorage.setItem("ipa-quiz:character-enabled:v1", "true");
    });
    await page.goto("/settings#character");
    await expect(page.getByRole("heading", { name: "設定とプリファレンス" })).toBeVisible();
    await expect(page.getByRole("radiogroup", { name: "AI キャラクター選択" })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "AIキャラ", exact: true })).toHaveCount(0);
    expect(await page.evaluate(() => localStorage.getItem("ipa-quiz:character:v1"))).toBe("zan");
  });

  test("retained scores open from the legacy ranking link without a fabricated distribution", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem("ipa-quiz:mock-scores:v1", JSON.stringify({ scores: [
        { id: "saved-ap", exam: "ap", score: 16, total: 20, takenAt: 1700000000000 },
      ] }));
    });
    await page.goto("/ranking");
    await expect(page.getByRole("tab", { name: "模試記録", exact: true })).toHaveAttribute("aria-selected", "true");
    await expect(page.getByText("80%", { exact: true }).first()).toBeVisible();
    await expect(page.getByText(/仮の分布|分布デモ/)).toHaveCount(0);
  });

  test("contact preserves an explanation for previously promised benefits", async ({ page }) => {
    await page.goto("/student");
    await expect(page.getByRole("heading", { name: "以前に案内された特典について" })).toBeVisible();
    await expect(page.getByText(/学生証などの証明書類は送らない/)).toBeVisible();
    await expect(page.locator("form")).toBeVisible();
  });

  test("public learning pages have no note or article catalog CTA", async ({ page }) => {
    for (const path of ["/", "/ap", "/operator", "/e-learning/exams/qualifications/rodo-eisei-consultant"]) {
      await page.goto(path);
      await expect(page.locator('a[href*="tsugino-shikaku.jp/articles"], a[href*="note.com/"]')).toHaveCount(0);
      await expect(page.locator('a[href^="/success-stories"]')).toHaveCount(0);
    }
  });
});
