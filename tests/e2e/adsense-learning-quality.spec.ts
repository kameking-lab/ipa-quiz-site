import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  // Static learning only: these flows never need an external AI provider call.
  await page.route("**/api/copilot**", route => route.abort());
  await page.route("**/api/generate-question**", route => route.abort());
});

test("FP3 question survives the static-page CTA and normal-mode switch", async ({ page }) => {
  await page.goto("/q/fp3/2026-published/gakka/q11");
  const start = page.getByRole("link", { name: "クイズモードで開く", exact: true });
  await expect(start).toHaveAttribute("href", /question=fp3-2026-published-gakka-q11/);
  await start.click();
  await expect(page).toHaveURL(/question=fp3-2026-published-gakka-q11/);
  const modeNav = page.getByRole("navigation", { name: "クイズモード切替" });
  await modeNav.getByText("学習モード：").click();
  const normal = modeNav.getByRole("link", { name: "通常クイズ", exact: true }).filter({ visible: true });
  await normal.click();
  await expect(page).toHaveURL(/mode=random/);
  await expect(page).toHaveURL(/question=fp3-2026-published-gakka-q11/);
  await expect(page.getByText(/売りオペ/).first()).toBeVisible();
  await expect(modeNav.getByRole("link", { name: "模試", exact: true })).toHaveCount(0);
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
    const links = page.locator(`a[href="${paper.first}#explanation"]`);
    expect(await links.count()).toBeGreaterThan(0);
    await links.last().click();
    await expect(page).toHaveURL(`${paper.first}#explanation`);
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
  await expect(page.getByRole("link", { name: "公式答案用紙", exact: true }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: /公式出題の趣旨/ }).first()).toBeVisible();
  await expect(page.locator("main")).not.toContainText("IPAシラバス");
  await page.goto("/q/shika-ishi/2026-annual/mondai-a/q5#explanation");
  expect(await page.locator('main img[src*="shika-ishi"]').count()).toBeGreaterThan(0);
  await expect(page.getByRole("link", { name: "静的解説の確認方針" }).first()).toHaveAttribute("href", "/transparency#static-explanations");
  const related = page.getByRole("region", { name: "他試験区分の関連問題" });
  await expect(related).not.toContainText("歯科医師・第119回");
});

for (const source of [
  { exam: "fp3", path: "/q/fp3/2026-published/gakka/q11" },
  { exam: "shika-ishi", path: "/q/shika-ishi/2026-annual/mondai-a/q5" },
  { exam: "chosashi", path: "/q/chosashi/2025-autumn/am/q11" },
]) {
  for (const layout of ["desktop", "mobile"] as const) {
    test(`${source.exam} header keeps the qualification in every learning mode on ${layout}`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width: layout === "desktop" ? 1280 : 390, height: 844 });
      for (const [name, mode] of [["通常クイズ", "random"], ["復習モード", "review"], ["弱点克服", "weakness"]]) {
        await page.goto(source.path);
        const header = page.locator("header");
        if (layout === "desktop") await header.getByRole("button", { name: "問題を解く" }).hover();
        else await header.getByRole("button", { name: "メニューを開く" }).click();
        const menu = layout === "desktop"
          ? header.getByRole("list", { name: "問題を解くメニュー" })
          : page.getByRole("navigation", { name: "モバイルナビゲーション" });
        const link = menu.getByRole("link", { name, exact: true });
        const href = await link.getAttribute("href");
        expect(new URL(href!, "https://local.invalid").searchParams.get("exam")).toBe(source.exam);
        await expect(header.getByRole("link", { name: "模試", exact: true })).toHaveCount(0);
        if (layout === "mobile") await expect(menu.getByRole("link", { name: "模試", exact: true })).toHaveCount(0);
        if (source.exam === "shika-ishi") await expect(menu.getByRole("link", { name: "ストリームモード", exact: true })).toHaveCount(0);
        if (mode === "random") await page.screenshot({ path: testInfo.outputPath("qualification-header.png"), animations: "disabled" });
        await link.click();
        await expect(page).toHaveURL(new RegExp(`exam=${source.exam}(?:&|$)`));
        await expect(page).toHaveURL(new RegExp(`mode=${mode}(?:&|$)`));
        expect(new URL(page.url()).searchParams.get("returnTo")).toBe(source.path);
      }
    });
  }
}

test("unapproved learning, navigation and error routes never initialize Google ads", async ({ page }) => {
  const adRequests: string[] = [];
  page.on("request", request => {
    if (/googlesyndication\.com|doubleclick\.net|fundingchoicesmessages\.google\.com/.test(request.url())) adRequests.push(request.url());
  });
  for (const path of ["/", "/fp3", "/q/fp3/2026-published/gakka/q11", "/blog/fe-hinnshutsu-ronten-toppu10", "/quiz?mode=random&exam=fp3&session=gakka", "/missing-qualification-quality-page"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(path.startsWith("/missing-") ? 404 : 200);
    await expect(page.locator("ins.adsbygoogle")).toHaveCount(0);
    await expect(page.locator('script[src*="googlesyndication"], script[src*="fundingchoices"]')).toHaveCount(0);
  }
  expect(adRequests).toEqual([]);
});
