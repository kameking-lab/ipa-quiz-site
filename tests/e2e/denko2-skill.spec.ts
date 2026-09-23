import { expect, test } from "@playwright/test";

test("skill exam: date → question diagram and figure 2 → official answer → return", async ({ page }) => {
  const response = await page.goto("/denko2/skill");
  // The static catch-all can render the not-found shell with HTTP 200.
  if (response?.status() === 404 || await page.getByRole("heading", { name: "お探しのページが見つかりませんでした" }).isVisible()) {
    test.skip(true, "Second-class electrician release gate is still closed");
    return;
  }
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { name: "技能試験の公表問題" })).toBeVisible();
  await expect(page.getByRole("link", { name: /2024年上期・2024-07-20/ })).toBeVisible();

  await page.goto("/denko2/skill/denko2-2024-07-20-skill-03");
  await expect(page.getByRole("heading", { name: "技能試験 No.3" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "問題図" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "図2・端子台などの説明図" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "施工条件" })).toBeVisible();
  const answer = page.getByText("公式の解答・完成例を見る");
  await answer.click();
  await expect(page.getByRole("heading", { name: "概念図" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "複線図・結線" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "完成作品例" })).toBeVisible();
  await page.getByRole("link", { name: "← この試験日の一覧" }).click();
  await expect(page).toHaveURL(/\/denko2\/skill#date-2024-07-20$/);
});

test("skill exam: small-screen problem and answer images remain readable and zoomable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  const response = await page.goto("/denko2/skill/denko2-2025-07-20-skill-04");
  if (response?.status() === 404 || await page.getByRole("heading", { name: "お探しのページが見つかりませんでした" }).isVisible()) {
    test.skip(true, "Second-class electrician release gate is still closed");
    return;
  }
  expect(response?.status()).toBe(200);
  const diagrams = page.getByRole("link", { name: /を拡大して見る/ });
  await expect(diagrams).toHaveCount(2);
  await expect(diagrams.first().getByRole("img")).toBeVisible();
  await page.getByText("公式の解答・完成例を見る").click();
  await expect(page.getByRole("img", { name: /公式完成作品例/ })).toBeVisible();
  await expect(page.locator("body")).toHaveJSProperty("scrollWidth", 390);
});
