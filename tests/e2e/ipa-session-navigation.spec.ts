import { test, expect } from "@playwright/test";

test.setTimeout(120_000);

test("specialist practice defaults to morning II and switches explicitly", async ({ page }) => {
  await page.goto("/quiz?mode=random&exam=st&limit=3");
  const sessions = page.getByRole("navigation", { name: "試験科目を選択" });
  await expect(sessions.getByRole("link", { name: "午前II（専門）" })).toHaveAttribute("aria-current", "page");
  await expect(page.getByRole("radio").first()).toBeVisible({ timeout: 60_000 });
  await sessions.getByRole("link", { name: "午前I（共通）" }).click();
  await expect(page).toHaveURL(/session=am1/);
  await expect(sessions.getByRole("link", { name: "午前I（共通）" })).toHaveAttribute("aria-current", "page");
  await page.getByRole("button", { name: "モード選択に戻る" }).click();
  await expect(page).toHaveURL(/\/st$/);
});

test("annual page keeps selected session and return target across learning modes", async ({ page }) => {
  await page.goto("/st/2025-spring");
  await page.getByRole("link", { name: "午前I（共通）を解く", exact: true }).click();
  await expect(page).toHaveURL(/session=am1/);
  await expect(page.getByRole("radio").first()).toBeVisible({ timeout: 60_000 });
  await page.getByRole("link", { name: "ストリーム", exact: true }).click();
  await expect(page).toHaveURL(/session=am1/);
  const back = page.locator('a[href="/st/2025-spring"]');
  await expect(back.first()).toBeVisible();
  await back.first().click();
  await expect(page).toHaveURL(/\/st\/2025-spring$/);
});

test("question detail quiz returns to the same question", async ({ page }) => {
  await page.goto("/q/st/2025-spring/am2/q1");
  await page.getByRole("link", { name: /クイズモードで開く/ }).first().click();
  await expect(page).toHaveURL(/session=am2/);
  await expect(page.getByRole("radio").first()).toBeVisible({ timeout: 60_000 });
  await page.getByRole("button", { name: "モード選択に戻る" }).click();
  await expect(page).toHaveURL(/\/q\/st\/2025-spring\/am2\/q1$/);
});
