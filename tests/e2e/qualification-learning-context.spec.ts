import { test, expect } from "@playwright/test";

for (const viewport of [{ name: "desktop", width: 1280, height: 900 }, { name: "mobile", width: 390, height: 844 }]) {
  test.describe(`qualification learning context (${viewport.name})`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });
    test("denko2 offers practice instead of an unrelated mock", async ({ page }) => {
      await page.goto("/denko2");
      await page.getByRole("tab", { name: "演習" }).click();
      await expect(page.getByRole("link", { name: /ランダム短時間演習/ })).toHaveAttribute("href", "/quiz?mode=random&exam=denko2");
      await expect(page.getByRole("link", { name: /本番想定 模試/ })).toHaveCount(0);
      await expect(page.getByRole("navigation", { name: "モバイル底タブ" }).getByRole("link", { name: "模試" })).toHaveCount(0);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /2024〜2026年度.*250問・5期分/);
    });
    test("unsupported and unknown query cannot silently start AP, and back/repeat stays denko2", async ({ page }) => {
      await page.goto("/mock-exam?exam=denko2");
      await expect(page.getByRole("heading", { level: 1 })).toContainText("未対応");
      await expect(page.getByRole("button", { name: "模試を開始する" })).toHaveCount(0);
      await page.getByRole("link", { name: "第二種電気工事士に戻る" }).click();
      await expect(page).toHaveURL(/\/denko2$/);
      await page.goBack();
      await expect(page.getByRole("heading", { level: 1 })).toContainText("未対応");
      await page.reload();
      await expect(page.getByRole("link", { name: "第二種電気工事士に戻る" })).toHaveAttribute("href", "/denko2");
      for (const exam of ["unknown", "constructor"]) {
        await page.goto(`/mock-exam?exam=${exam}`);
        await expect(page.getByRole("heading", { level: 1 })).toContainText("未対応");
        await expect(page.getByRole("button", { name: "模試を開始する" })).toHaveCount(0);
        await expect(page.getByRole("link", { name: "資格を選ぶ", exact: true })).toHaveAttribute("href", "/#choose-qualification");
      }
    });
    test("supported query uses IP settings and the original return page", async ({ page }) => {
      await page.goto("/mock-exam?exam=ip&returnTo=%2Fip%2F2024-cbt");
      await expect(page.getByRole("heading", { name: "ITパスポート 模試", exact: true })).toBeVisible();
      await expect(page.getByText("100問", { exact: true })).toBeVisible();
      await expect(page.getByText("120分", { exact: true })).toBeVisible();
      await expect(page.getByRole("link", { name: "← 試験ページに戻る" })).toHaveAttribute("href", "/ip/2024-cbt");
      if (viewport.name === "mobile") await expect(page.getByRole("combobox", { name: "模試の試験区分" })).toHaveValue("ip");
    });
  });
}
