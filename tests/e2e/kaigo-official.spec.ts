import { test, expect } from "@playwright/test";

test.describe("介護福祉士 第38回", () => {
  test("exam hub and year page show 125 official questions with the independence notice", async ({ page }) => {
    await page.goto("/kaigo");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("介護福祉士");
    await expect(page.getByText("収録 125 問")).toBeVisible();
    await expect(page.getByText(/同センターとは関係ありません/).filter({ visible: true }).first()).toBeVisible();
    await page.goto("/kaigo/2025-annual");
    await expect(page.getByText("125 問", { exact: true })).toBeVisible();
    await expect(page.getByText(/総合問題 問題114〜125/).first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });

  test("question page keeps ruby, numbers choices 1-5, and grades in place", async ({ page }) => {
    await page.goto("/q/kaigo/2025-annual/gakka/q120");
    await expect(page.locator("ruby").first()).toContainText("粥状");
    await expect(page.locator("rt").first()).toHaveText("じゅくじょう");
    const choices = page.getByRole("radio");
    await expect(choices).toHaveCount(5);
    await expect(choices.first()).toHaveAccessibleName(/^選択肢 1:/);
    await choices.nth(4).click();
    await expect(page.getByText("正解！").first()).toBeVisible();
    await expect(page.getByText(/正答は 5/).first()).toBeVisible();
    await expect(page.getByText(/社会福祉振興・試験センターとは関係ありません/).filter({ visible: true }).first()).toBeVisible();
  });

  test("figure-only choices of question 49 render the cropped official figures", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/q/kaigo/2025-annual/gakka/q49");
    const figures = page.getByRole("img", { name: /選択肢[1-5]の図（公式問題PDFより）/ });
    await expect(figures).toHaveCount(5);
    await expect(figures.first()).toBeVisible();
    expect(await figures.first().evaluate((img: HTMLImageElement) => img.naturalWidth)).toBeGreaterThan(100);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
});
