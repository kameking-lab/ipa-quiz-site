import { test, expect } from "@playwright/test";

test("singleton category stays readable without JavaScript and points to an explained question", async ({ browser, request }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  const path = `/chintai/topic/${encodeURIComponent("重要事項説明書")}`;
  const response = await page.goto(path);
  expect(response?.status()).toBe(200);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://www.kakomon-ai.jp${path}`);
  const question = page.locator('main a[href^="/q/"]').first();
  await expect(question).toBeVisible();
  await question.click();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "index, follow");
  await expect(page.locator('#explanation > details')).toHaveAttribute("open", "");
  expect((await page.locator('#explanation').innerText()).length).toBeGreaterThan(30);
  expect(await page.getByRole("dialog").count()).toBe(0);
  const sitemap = await request.get("/sitemap/exams.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).not.toContain(`<loc>https://www.kakomon-ai.jp${path}</loc>`);
  await context.close();
});

test("search and mode selection are noindex across query variants", async ({ page, request }) => {
  await page.route("**/*", route => {
    const request = route.request();
    if (request.method() !== "GET" || /googlesyndication|doubleclick|generativelanguage/.test(request.url())) return route.abort();
    return route.continue();
  });
  for (const path of ["/search", "/search?q=TLS", "/modes/topic", "/modes/topic?exam=fe"]) {
    expect((await page.goto(path))?.status()).toBe(200);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, follow");
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.locator('script[src*="adsbygoogle"], ins.adsbygoogle')).toHaveCount(0);
  }
  const sitemap = await request.get("/sitemap/main.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml).not.toContain("<loc>https://www.kakomon-ai.jp/search</loc>");
  expect(xml).not.toContain("<loc>https://www.kakomon-ai.jp/modes/topic</loc>");
});

test("fresh visitors can read the problem, reasoning and privacy contact without a login or consent dialog", async ({ browser }, testInfo) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await context.route("**/*", route => {
    if (route.request().method() !== "GET" || !route.request().url().startsWith(testInfo.project.use.baseURL as string)) return route.abort();
    return route.continue();
  });
  const page = await context.newPage();
  expect((await page.goto("/q/fe/2025-cbt/kamoku-b/q1"))?.status()).toBe(200);
  await expect(page.locator("main h1")).toBeVisible();
  await expect(page.locator('#explanation > details')).toHaveAttribute("open", "");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await page.locator('#explanation').scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath("visible-explanation-mobile.png") });
  await page.goto("/privacy");
  await expect(page.getByRole("link", { name: "お問い合わせフォーム", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Google の広告設定", exact: true })).toHaveAttribute("href", "https://adssettings.google.com/");
  await context.close();
});
