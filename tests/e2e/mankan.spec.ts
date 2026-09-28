import { test, expect } from "@playwright/test";

test.describe("マンション管理士試験", () => {
  test("the exam top names the source, the law reference dates and the independence notice", async ({ page }) => {
    await page.goto("/mankan");
    await expect(page.getByText(/令和6年度・令和7年度のマンション管理士試験/).first()).toBeVisible();
    await expect(page.getByText(/マンション管理センターとは関係ありません/).first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });

  test("a question page grades the official answer and shows the attribution", async ({ page }) => {
    // 令和7年度 問1 の公式正答は2（イ）。
    await page.goto("/q/mankan/2025-annual/gakka/q1");
    await expect(page.getByText(/規約共用部分/).first()).toBeVisible();
    const choices = page.getByRole("radio");
    await expect(choices).toHaveCount(4);
    await choices.nth(1).click();
    await expect(page.getByText("正解！").first()).toBeVisible();
    await expect(page.getByText(/出典：令和7年度 マンション管理士試験 問1/).filter({ visible: true }).first()).toBeVisible();
  });
});
