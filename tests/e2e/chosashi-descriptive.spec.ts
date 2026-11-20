import { test, expect } from "@playwright/test";

test("土地家屋調査士の問題詳細で公式問題と独自解答例を確認できる", async ({ page }) => {
  await page.goto("/q/chosashi/2025-autumn/am/q11");
  const model = page.getByRole("region", { name: "記述の独自解答例" });
  await expect(model.getByText(/法務省の公式解答ではありません/)).toBeVisible();
  await expect(model.getByText(/自動採点を行いません/)).toBeVisible();
  await expect(model.locator('img[src$=".svg"]')).toHaveCount(1);
  await expect(model.getByRole("link", { name: /^公式問題PDF/ })).toHaveAttribute("href", "https://www.moj.go.jp/content/001450010.pdf");
  await model.getByText("独自解答例と作図例を確認する", { exact: true }).click();
  await expect(model.locator('img[src$=".svg"]')).toBeVisible();
  await expect(page.getByRole("radiogroup")).toHaveCount(0);
});

test("土地家屋調査士の建物記述に計算図と公式出題趣旨を表示する", async ({ page }) => {
  await page.goto("/q/chosashi/2024-autumn/pm/q22");
  const model = page.getByRole("region", { name: "記述の独自解答例" });
  await expect(model.locator('img[src$=".svg"]')).toHaveCount(2);
  await model.getByText("出典の詳細", { exact: true }).click();
  await expect(model.getByRole("link", { name: "公式出題の趣旨（公式解答ではありません）" })).toHaveAttribute("href", "https://www.moj.go.jp/content/001429852.pdf");
  await model.getByText("独自解答例と作図例を確認する", { exact: true }).click();
  await expect(model.getByRole("heading", { name: "自己確認の観点（独自作成）" })).toBeVisible();
});
