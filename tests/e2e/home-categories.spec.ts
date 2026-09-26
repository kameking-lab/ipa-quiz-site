import { test, expect } from "@playwright/test";

for (const width of [390, 1280]) {
  test(`home lets learners jump straight to a qualification at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("img", { name: "一緒に学ぶチワワ" })).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    // 分野ジャンプ（ヒーロー内）はファーストビューに収まる。
    const domains = page.getByRole("navigation", { name: "分野から選ぶ" });
    const domainLinks = domains.getByRole("link");
    await expect(domainLinks).toHaveCount(6);
    for (const name of [/^IT・情報処理/, /^安全衛生/, /^電気/, /^建設・施工管理/, /^お金・不動産/, /^福祉・介護/]) {
      await expect(domains.getByRole("link", { name })).toBeInViewport();
    }

    // 各分野の資格カードと一覧ページへの導線。
    const main = page.locator("main");
    for (const href of ["/ip", "/sg", "/fe", "/ap", "/au", "/fp3", "/fp2", "/takken", "/denken3", "/denko2", "/civil1", "/civil2", "/kankoji2", "/kaigo",
      "/e-learning/exams/qualifications/dai-1-shu-eisei-kanrisha", "/ipa", "/e-learning/exams", "/qualifications",
      "/challenge", "/mock-exam", "/operator"]) {
      await expect(main.locator(`a[href="${href}"]`).first(), href).toBeAttached();
    }
    // 問題数バッジは実数（0問のカードは出さない）。
    await expect(page.locator('#domain-it a[href="/ip"]')).toContainText(/[1-9][\d,]*問/);
    await expect(main.getByText(/^0問$/)).toHaveCount(0);

    // 分野ジャンプ → IPA → 資格選択。
    await domains.getByRole("link", { name: /^安全衛生/ }).click();
    await expect(page).toHaveURL(/#domain-safety$/);
    await expect(page.locator("#domain-safety").getByRole("heading", { name: "安全衛生" })).toBeInViewport();

    await main.locator('a[href="/ipa"]').first().click();
    await expect(page).toHaveURL(/\/ipa$/);
    await expect(page.locator('main a[href="/ip"]').first()).toBeInViewport();
    await expect(page.getByRole("tablist")).toHaveCount(0);
    await page.getByRole("link", { name: "← IPA・安全を選び直す", exact: true }).click();
    await expect(page).toHaveURL(/\/$/);

    await main.locator('a[href="/e-learning/exams"]').first().click();
    await expect(page).toHaveURL(/\/e-learning\/exams$/);
    await expect(page.getByRole("link", { name: /^第一種衛生管理者/ })).toBeVisible();
    const safetyConsultant = page.getByRole("region", { name: "労働安全コンサルタント", exact: true });
    const healthConsultant = page.getByRole("region", { name: "労働衛生コンサルタント", exact: true });
    await expect(safetyConsultant.getByRole("link", { name: /^産業安全一般/ })).toHaveCount(1);
    await expect(healthConsultant.getByRole("link", { name: /^労働衛生一般/ })).toHaveCount(1);
    await page.getByRole("link", { name: "← IPA・安全を選び直す", exact: true }).click();
    await expect(domains).toBeVisible();

    await main.locator('a[href="/qualifications"]').first().click();
    await expect(page).toHaveURL(/\/qualifications$/);
    await expect(page.getByRole("heading", { name: "FP3級" })).toBeVisible();
    await expect(page.locator('a[href="/civil2"]')).toBeVisible();
    await expect(page.locator('a[href="/kankoji2"]')).toBeVisible();
    await expect(page.locator('a[href="/kaigo"]')).toBeVisible();
    await expect(page.locator('a[href="/civil1"]')).toBeVisible();
    await page.goBack();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

test("home countdown only shows dated events with an official source", async ({ page }) => {
  await page.goto("/");
  const countdown = page.getByRole("region", { name: "試験日が近い資格" });
  // 公式確認済みの日程がすべて過ぎた後は帯ごと出ない。出ている場合は出典リンク付き。
  if (await countdown.count()) {
    const items = countdown.getByRole("listitem");
    const n = await items.count();
    expect(n).toBeGreaterThan(0);
    for (let i = 0; i < n; i += 1) {
      await expect(items.nth(i)).toContainText(/あと\s*\d+\s*日|実施中/);
      await expect(items.nth(i).locator('a[target="_blank"][href^="https://www."]')).toHaveCount(1);
    }
  }
});
