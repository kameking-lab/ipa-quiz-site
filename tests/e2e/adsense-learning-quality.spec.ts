import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  // Static learning only: these flows never need an external AI provider call.
  await page.route("**/api/copilot**", route => route.abort());
});

test("FP3 question has a readable explanation and links to the next original", async ({ page }) => {
  await page.goto("/q/fp3/2026-published/gakka/q11");
  const explanation = page.getByRole("region", { name: "解説", exact: true });
  await expect(explanation).toContainText("売りオペ");
  const next = page.getByRole("navigation", { name: "解説のあとに学ぶ" }).getByRole("link", { name: "次の問題へ" });
  await expect(next).toHaveAttribute("href", "/q/fp3/2026-published/gakka/q12");
  await next.click();
  await expect(page).toHaveURL("/q/fp3/2026-published/gakka/q12");
});

for (const paper of [
  { path: "/fp3/2026-published", first: "/q/fp3/2026-published/gakka/q1" },
  { path: "/shika-ishi/2026-annual", first: "/q/shika-ishi/2026-annual/mondai-a/q5" },
  { path: "/chosashi/2025-autumn", first: "/q/chosashi/2025-autumn/am/q11" },
]) {
  test(`${paper.path} exposes static explanation links without JavaScript`, async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    const response = await page.goto(paper.path);
    expect(response?.status()).toBe(200);
    const explanations = page.locator("details").filter({ has: page.getByText("問題別の解説", { exact: true }) });
    await explanations.locator("summary").click();
    const link = explanations.locator(`a[href="${paper.first}"]`);
    await expect(link).toBeVisible();
    await link.press("Enter");
    await expect(page).toHaveURL(paper.first);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.kakomon-ai.jp${paper.first}`);
    await context.close();
  });
}

test("worked guide contains its problem, comparison, and check and the old URL is a 301", async ({ page, request }, testInfo) => {
  const redirect = await request.get("/blog/fe-jisseki-mondai-bunseki", { maxRedirects: 0 });
  expect(redirect.status()).toBe(301);
  expect(redirect.headers().location).toBe("/blog/fe-hinnshutsu-ronten-toppu10");
  await page.goto("/blog/fe-hinnshutsu-ronten-toppu10");
  await expect(page.locator("main h1")).toHaveCount(1);
  await expect(page.getByRole("heading", { name: /4の倍数/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /科目B 問1の問題/ })).toHaveAttribute("href", "/q/fe/2025-cbt/kamoku-b/q1");
  expect(await page.locator("table").count()).toBeGreaterThanOrEqual(2);
  expect(await page.locator("ins.adsbygoogle").count()).toBe(0);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
  await page.screenshot({ path: testInfo.outputPath("worked-guide-mobile.png"), fullPage: true });
  await page.screenshot({ path: testInfo.outputPath("worked-guide-viewport.png") });
});

test("dental and land-surveyor pages distinguish originals and independent explanations", async ({ page }) => {
  await page.goto("/q/chosashi/2025-autumn/am/q11");
  const source = page.getByRole("group", { name: "出典", exact: true });
  await source.getByText("出典の詳細", { exact: true }).click();
  await expect(source.getByRole("link", { name: "公式答案用紙", exact: true }).first()).toBeVisible();
  await expect(source.getByRole("link", { name: /公式出題の趣旨/ }).first()).toBeVisible();
  await expect(page.locator("main")).not.toContainText("IPAシラバス");
  await page.goto("/q/shika-ishi/2026-annual/mondai-a/q5");
  expect(await page.locator('main img[src*="shika-ishi"]').count()).toBeGreaterThan(0);
  await expect(page.locator('footer details a[href="/transparency#static-explanations"]')).toHaveCount(1);
  const related = page.locator("main details").filter({ has: page.locator("summary", { hasText: /^関連資料$/ }) });
  await expect(related).not.toContainText("歯科医師・第119回");
});

for (const source of [
  { exam: "fp3", path: "/q/fp3/2026-published/gakka/q11" },
  { exam: "shika-ishi", path: "/q/shika-ishi/2026-annual/mondai-a/q5" },
  { exam: "chosashi", path: "/q/chosashi/2025-autumn/am/q11" },
]) {
  test(`${source.exam} enters the same records menu from a question`, async ({ page }) => {
    await page.goto(source.path);
    const header = page.getByRole("navigation", { name: "グローバルナビゲーション" });
    await expect(header.getByRole("link", { name: "メニュー", exact: true })).toHaveAttribute("href", "/me");
  });
}

test("excluded learning, navigation and error routes never initialize Google ads for free users", async ({ page }) => {
  const adRequests: string[] = [];
  await page.route("**/api/billing/status", route => route.fulfill({ json: { entitled: false } }));
  await page.route("https://pagead2.googlesyndication.com/**", route => route.fulfill({ contentType: "text/javascript", body: "" }));
  page.on("request", request => {
    if (/googlesyndication\.com|doubleclick\.net|fundingchoicesmessages\.google\.com/.test(request.url())) adRequests.push(request.url());
  });
  for (const path of ["/search", "/modes/topic?exam=fe", "/quiz?mode=random&exam=fp3&session=gakka", "/missing-qualification-quality-page"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(path.startsWith("/missing-") ? 404 : 200);
    await page.evaluate(() => new Promise<void>(resolve => requestIdleCallback(() => resolve())));
    await expect(page.locator("ins.adsbygoogle")).toHaveCount(0);
    await expect(page.locator('script[src*="googlesyndication"], script[src*="fundingchoices"]')).toHaveCount(0);
  }
  expect(adRequests).toEqual([]);
});
