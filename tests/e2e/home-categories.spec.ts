import { test, expect } from "@playwright/test";

for (const width of [390, 1280]) {
  test(`home starts with two categories at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const choices = page.getByRole("navigation", { name: "IPAか安全を選ぶ" });
    await expect(choices.getByRole("link")).toHaveCount(2);
    await expect(page.getByRole("img", { name: "一緒に学ぶチワワ" })).toBeVisible();
    const ipa = choices.getByRole("link", { name: /^IPA/ });
    const safety = choices.getByRole("link", { name: /^安全/ });
    await expect(ipa).toBeInViewport();
    await expect(safety).toBeInViewport();
    await expect(page.locator("main").getByRole("link")).toHaveCount(2);
    await ipa.click();
    await expect(page).toHaveURL(/\/ipa$/);
    await expect(page.locator('main a[href="/ip"]').first()).toBeInViewport();
    await expect(page.getByRole("link", { name: /3問で試す/ })).toHaveCount(0);
    await expect(page.getByRole("tablist")).toHaveCount(0);
    await page.getByRole("link", { name: "← IPA・安全を選び直す", exact: true }).click();
    await safety.click();
    await expect(page).toHaveURL(/\/e-learning\/exams$/);
    await expect(page.getByRole("link", { name: /^第一種衛生管理者/ })).toBeVisible();
    await expect(page.getByRole("tablist")).toHaveCount(0);
    const safetyConsultant = page.getByRole("region", { name: "労働安全コンサルタント", exact: true });
    const healthConsultant = page.getByRole("region", { name: "労働衛生コンサルタント", exact: true });
    await expect(safetyConsultant.getByRole("link", { name: /^産業安全一般/ })).toHaveCount(1);
    await expect(safetyConsultant.getByRole("link", { name: /^労働衛生一般/ })).toHaveCount(0);
    await expect(healthConsultant.getByRole("link", { name: /^労働衛生一般/ })).toHaveCount(1);
    await page.getByRole("link", { name: "← IPA・安全を選び直す", exact: true }).click();
    await expect(choices).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
