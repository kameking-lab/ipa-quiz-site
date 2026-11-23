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
  test(`browse keeps qualification links and reaches regional exams at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/search");
    await expect(page.getByRole("heading", { name: "さがす", exact: true })).toBeVisible();
    const directory = page.locator("#home-directory-title");
    await expect(directory.locator('details[id^="domain-"]')).toHaveCount(9);
    await expect(directory.locator("details[open]")).toHaveCount(0);
    for (const href of ["/ip", "/sg", "/fe", "/ap", "/au", "/fp3", "/fp2", "/takken", "/denken3", "/denken2", "/denko2", "/denko1", "/civil1", "/civil2", "/kankoji2", "/zoen2", "/tsushin2", "/kaigo", "/shakai", "/seishin", "/qualifications/tohan", "/e-learning/exams/qualifications/dai-1-shu-eisei-kanrisha", "/ipa", "/e-learning/exams", "/qualifications"]) {
      await expect(directory.locator(`a[href="${href}"]`).first(), href).toBeAttached();
    }
    const welfare = directory.locator("#domain-welfare");
    await expect(welfare.locator('a[href="/qualifications/tohan"]')).toHaveCount(1);
    await expect(directory.locator('a[href="/tohan"], a[href^="/tohan-"]')).toHaveCount(0);
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

    const regionalQualifications = [
      { slug: "tohan", name: "登録販売者試験", region: "関西広域連合・東京都", href: "/tohan", heading: "登録販売者" },
      { slug: "junkango", name: "准看護師試験", region: "関西広域連合", href: "/junkango-kansai", heading: "准看護師" },
    ];
    for (const { slug, name, region, href, heading } of regionalQualifications) {
      await page.goto("/search");
      const parentHref = `/qualifications/${slug}`;
      const regions = directory.locator('details[data-domain="region"]');
      await regions.locator("summary").filter({ hasText: "地域から探す" }).click();
      const parent = regions.locator(`a[href="${parentHref}"]`);
      await expect(parent).toHaveCount(1);
      await parent.click();
      await expect(page).toHaveURL(parentHref);
      const regionalExam = page.getByRole("link", { name: region, exact: true });
      await expect(regionalExam).toHaveAttribute("href", href);
      await regionalExam.click();
      await expect(page).toHaveURL(href);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);

      await page.goto("/search");
      const input = page.getByRole("searchbox", { name: "資格名・略称で検索" });
      const results = page.getByRole("list", { name: "資格の検索結果" });
      await input.fill(name);
      await expect(results.locator(`a[href="${parentHref}"]`)).toHaveCount(1);
      await expect(results.locator(`a[href="${href}"]`)).toHaveCount(0);
      await input.fill(`${name} ${region}`);
      const hit = results.locator(`a[href="${href}"]`);
      await expect(hit).toBeVisible();
      await hit.click();
      await expect(page).toHaveURL(href);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(heading);
    }
  });
}
