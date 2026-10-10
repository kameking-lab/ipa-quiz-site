import { test, expect } from "@playwright/test";

test.setTimeout(120_000);
test.use({ serviceWorkers: "block" });
test.beforeEach(async ({ page }) => { await page.route("https://**", (route) => route.abort()); });

for (const width of [390, 1280]) {
  test(`home lets learners jump straight to a qualification at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    const finder = page.locator("#choose-qualification");
    await expect(finder.getByRole("searchbox", { name: "資格名・略称で検索" })).toBeInViewport();
    await expect(finder.getByRole("button", { name: /^ITパスポート/ })).toBeInViewport();
    const filters = finder.locator(".study-filters").getByRole("button", { pressed: false });
    expect(await filters.count()).toBe(6);

    // 各分野の資格カードと一覧ページへの導線。
    const main = page.locator("main");
    for (const href of ["/ip", "/sg", "/fe", "/ap", "/au", "/fp3", "/fp2", "/takken", "/denken3", "/denken2", "/denko2", "/denko1", "/civil1", "/civil2", "/kankoji2", "/zoen2", "/tsushin2", "/kaigo", "/shakai", "/seishin", "/tohan",
      "/e-learning/exams/qualifications/dai-1-shu-eisei-kanrisha", "/ipa", "/e-learning/exams", "/qualifications",
      "/operator"]) {
      await expect(main.locator(`a[href="${href}"]`).first(), href).toBeAttached();
    }
    // 問題数バッジは実数（0問のカードは出さない）。
    await expect(page.locator('#domain-it a[href="/ip"]')).toContainText(/[1-9][\d,]*問/);
    await expect(main.getByText(/^0問$/)).toHaveCount(0);

    // Genre links are visible on initial load without opening a disclosure.
    await expect(page.locator('#domain-it a[href="/ip"]')).toBeVisible();

    await main.locator('a[href="/ipa"]').first().click();
    await expect(page).toHaveURL(/\/ipa$/, { timeout: 30_000 });
    await expect(page.locator('main a[href="/ip"]').first()).toBeInViewport();
    await expect(page.getByRole("tablist")).toHaveCount(0);
    // Scrolling to the back link can leave the pointer over the sticky nav's
    // hover menu, which then covers the link in desktop Chromium.
    await page.mouse.move(5, 850);
    await page.getByRole("link", { name: "← IPA・安全を選び直す", exact: true }).click();
    await expect(page).toHaveURL(/\/$/, { timeout: 30_000 });

    await expect(page.locator('#domain-safety a[href="/e-learning/exams"]')).toBeVisible();
    await main.locator('a[href="/e-learning/exams"]').first().click();
    await expect(page).toHaveURL(/\/e-learning\/exams$/, { timeout: 30_000 });
    await expect(page.getByRole("link", { name: /^第一種衛生管理者/ })).toBeVisible();
    const safetyConsultant = page.getByRole("region", { name: "労働安全コンサルタント", exact: true });
    const healthConsultant = page.getByRole("region", { name: "労働衛生コンサルタント", exact: true });
    await expect(safetyConsultant.getByRole("link", { name: /^産業安全一般/ })).toHaveCount(1);
    await expect(healthConsultant.getByRole("link", { name: /^労働衛生一般/ })).toHaveCount(1);
    await page.mouse.move(5, 850);
    await page.getByRole("link", { name: "← IPA・安全を選び直す", exact: true }).click();
    await expect(finder).toBeVisible();

    await expect(page.locator('#domain-electrical a[href="/qualifications"]')).toBeVisible();
    await main.locator('a[href="/qualifications"]').first().click();
    await expect(page).toHaveURL(/\/qualifications$/, { timeout: 30_000 });
    await page.locator("#qualification-coverage > summary").click();
    const coverage = page.locator("#qualification-coverage");
    await expect(coverage.getByRole("heading", { name: "FP3級" })).toBeVisible();
    for (const href of ["/civil2", "/kankoji2", "/zoen2", "/tsushin2", "/kaigo", "/civil1", "/denko1", "/denken2", "/shakai", "/seishin", "/tohan"]) await expect(coverage.locator(`a[href="${href}"]`)).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await expect(finder.getByRole("searchbox", { name: "資格名・略称で検索" })).toBeEnabled();
    await expect(page.getByRole("group", { name: "公開収録数" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("home sends exam schedule questions to 次の資格", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("region", { name: "試験日が近い資格" })).toHaveCount(0);
  const schedules = page.getByRole("region", { name: "試験日と申込締切を確認" });
  await expect(schedules.getByRole("link", { name: "次の資格の日程カレンダーへ" }))
    .toHaveAttribute("href", "https://tsugino-shikaku.jp/calendar");
  await expect(schedules.getByRole("link", { name: "応用情報の日程" }))
    .toHaveAttribute("href", "https://tsugino-shikaku.jp/shikaku/ap");
});
