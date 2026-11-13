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
    await page.locator("#choose-qualification").getByRole("link", { name: "収録している全資格・区分を見る" }).click();
    await expect(page).toHaveURL(/\/qualifications$/);
    await expect(coverage).toHaveAttribute("open", "");
    await expect(summary).toBeFocused();
    await expect(summary).toBeInViewport();
    await expect.poll(async () => {
      const headerBottom = await page.locator("header.sticky").first().evaluate((header) => header.getBoundingClientRect().bottom);
      const summaryTop = await summary.evaluate((element) => element.getBoundingClientRect().top);
      return summaryTop - headerBottom;
    }).toBeGreaterThanOrEqual(8);
  });
}

for (const width of [390, 1280]) {
  test(`home lets learners jump straight to a qualification at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const finder = page.locator("#choose-qualification");
    await finder.getByRole("searchbox", { name: "資格名・略称で検索" }).scrollIntoViewIfNeeded();
    await expect(finder.getByRole("searchbox", { name: "資格名・略称で検索" })).toBeInViewport();
    const filter = finder.getByRole("combobox", { name: "資格の分野で絞り込む" });
    await expect(filter).toHaveValue("");
    await expect(filter.getByRole("option")).toHaveText([
      "全分野", "IT・情報処理", "お金・ビジネス", "不動産", "法律・労務",
      "電気・無線", "建設・技術", "安全衛生", "医療・福祉・生活", "自動車整備",
    ]);
    const domains = finder.locator("details.study-domain");
    await expect(domains).toHaveCount(9);
    await expect(finder.locator("details.study-domain[open]")).toHaveCount(0);
    await expect(finder.getByRole("region", { name: "試験が近い資格", exact: true }).getByRole("link")).toHaveCount(3);
    await expect(finder.getByRole("region", { name: "あなたの資格", exact: true })).toHaveCount(0);

    // 各分野の資格カードと一覧ページへの導線。
    const main = page.locator("main");
    for (const href of ["/ip", "/sg", "/fe", "/ap", "/au", "/fp3", "/fp2", "/takken", "/denken3", "/denken2", "/denko2", "/denko1", "/civil1", "/civil2", "/kankoji2", "/zoen2", "/tsushin2", "/kaigo", "/shakai", "/seishin", "/tohan",
      "/e-learning/exams/qualifications/dai-1-shu-eisei-kanrisha", "/ipa", "/e-learning/exams", "/qualifications"]) {
      await expect(main.locator(`a[href="${href}"]`).first(), href).toBeAttached();
    }
    // Operator information stays reachable from the shared footer.
    await expect(page.locator('footer a[href="/operator"]').first()).toBeAttached();
    // 問題数バッジは実数（0問のカードは出さない）。
    await expect(page.locator('#domain-it a[href="/ip"]')).toContainText(/[1-9][\d,]*問/);
    await expect(main.getByText(/^0問$/)).toHaveCount(0);

    // Every domain starts collapsed; its links become usable by opening it.
    await expect(page.locator('#domain-it a[href="/ip"]')).not.toBeVisible();
    await page.locator("#domain-it > summary").click();
    await expect(page.locator("#domain-it")).toHaveAttribute("open", "");
    await expect(page.locator('#domain-it a[href="/ip"]')).toBeVisible();

    await page.locator('#domain-it a[href="/ipa"]').click();
    await expect(page).toHaveURL(/\/ipa$/, { timeout: 30_000 });
    await expect(page.locator('main a[href="/ip"]').first()).toBeInViewport();
    await expect(page.getByRole("tablist")).toHaveCount(0);
    // Scrolling to the back link can leave the pointer over the sticky nav's
    // hover menu, which then covers the link in desktop Chromium.
    await page.mouse.move(5, 850);
    await page.getByRole("link", { name: "← IPA・安全を選び直す", exact: true }).click();
    await expect(page).toHaveURL(/\/$/, { timeout: 30_000 });

    await page.locator("#domain-safety > summary").click();
    await expect(page.locator('#domain-safety a[href="/e-learning/exams"]')).toBeVisible();
    await page.locator('#domain-safety a[href="/e-learning/exams"]').click();
    await expect(page).toHaveURL(/\/e-learning\/exams$/, { timeout: 30_000 });
    await expect(page.getByRole("link", { name: /^第一種衛生管理者/ })).toBeVisible();
    const safetyConsultant = page.getByRole("region", { name: "労働安全コンサルタント", exact: true });
    const healthConsultant = page.getByRole("region", { name: "労働衛生コンサルタント", exact: true });
    await expect(safetyConsultant.getByRole("link", { name: /^産業安全一般/ })).toHaveCount(1);
    await expect(healthConsultant.getByRole("link", { name: /^労働衛生一般/ })).toHaveCount(1);
    await page.mouse.move(5, 850);
    await page.getByRole("link", { name: "← IPA・安全を選び直す", exact: true }).click();
    await expect(finder).toBeVisible();

    await page.locator("#domain-electrical > summary").click();
    await expect(page.locator('#domain-electrical a[href="/qualifications"]')).toBeVisible();
    await page.locator('#domain-electrical a[href="/qualifications"]').click();
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
