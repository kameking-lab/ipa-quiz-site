import { test, expect } from "@playwright/test";

test.setTimeout(120_000);
test.use({ serviceWorkers: "block" });
test.beforeEach(async ({ page }) => { await page.route("https://**", (route) => route.abort()); });

for (const width of [400, 1280]) {
  test(`qualification coverage opens below the sticky header at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/qualifications");
    const coverage = page.locator("#qualification-coverage");
    const summary = coverage.locator("summary");
    await expect(coverage).not.toHaveAttribute("open", "");
    await summary.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/qualifications$/);
    await expect(coverage).toHaveAttribute("open", "");
    await expect(summary).toBeFocused();
    await expect(summary).toBeInViewport();
    await expect.poll(async () => {
      const headerBottom = await page.locator("header.sticky").first().evaluate((header) => header.getBoundingClientRect().bottom);
      const summaryTop = await summary.evaluate((element) => element.getBoundingClientRect().top);
      return summaryTop - headerBottom;
    }).toBeGreaterThanOrEqual(0);
  });
}

for (const width of [390, 1280]) {
  test(`browse retains all qualification links at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/search");
    await expect(page.getByRole("heading", { name: "さがす", exact: true })).toBeVisible();
    const directory = page.locator("#home-directory-title");
    await expect(directory.locator("details")).toHaveCount(9);
    await expect(directory.locator("details[open]")).toHaveCount(0);
    for (const href of ["/ip", "/sg", "/fe", "/ap", "/au", "/fp3", "/fp2", "/takken", "/denken3", "/denken2", "/denko2", "/denko1", "/civil1", "/civil2", "/kankoji2", "/zoen2", "/tsushin2", "/kaigo", "/shakai", "/seishin", "/tohan", "/e-learning/exams/qualifications/dai-1-shu-eisei-kanrisha", "/ipa", "/e-learning/exams", "/qualifications"]) {
      await expect(directory.locator(`a[href="${href}"]`).first(), href).toBeAttached();
    }
    await expect(page.locator('#domain-it a[href="/ip"]')).not.toBeVisible();
    await page.locator("#domain-it > summary").click();
    await expect(page.locator('#domain-it a[href="/ip"]')).toBeVisible();
    await expect(page.locator('#domain-it a[href="/ip"]')).toContainText(/[1-9][\d,]*問/);
    await page.locator('#domain-it a[href="/ip"]').click();
    await expect(page).toHaveURL(/\/ip$/);
    await page.goBack();
    await expect(page).toHaveURL(/\/search$/);
    await expect(page.getByRole("heading", { name: "分野から探す" })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}
