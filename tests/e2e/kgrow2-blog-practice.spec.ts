import { test, expect } from "@playwright/test";
test.use({ viewport: { width: 360, height: 800 }, reducedMotion: "reduce" });

test("the resume reference guide opens qualification choices without an unrelated practice", async ({ page }) => {
  await page.goto("/blog/it-shikaku-rirekisho-kakikata");
  await expect(page.locator("#article-practice")).toHaveCount(0);
  await page.locator('#article-body a[href="/fe"]').click();
  await expect(page).toHaveURL(/\/fe$/);
  await expect(page.getByRole("region", { name: "今すぐ解く" })).toBeVisible();
});

for (const slug of ["ipa-shiken-fukusuu-kubun-juken", "koudo-gozen1-taisaku", "nw-gogo-jikan-haibun"]) {
  test(`${slug}: answer in the article and continue with the mapped exam and session`, async ({ page }, testInfo) => {
    let aiCalls = 0;
    await page.route("**/api/copilot**", route => { aiCalls++; return route.abort(); });
    await page.goto(`/blog/${slug}`);
    const practice = page.getByRole("region", { name: "記事から1問チャレンジ" });
    await expect(practice).toBeVisible();
    await practice.getByRole("heading", { name: "記事から1問チャレンジ", exact: true }).scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath("article-360.png") });
    await expect(practice.getByRole("link", { name: "同じ分野の演習を続ける" })).toHaveCount(0);
    await practice.getByRole("radio").first().click();
    await expect(practice.getByRole("status")).toContainText("正解");
    await expect(practice.getByRole("status")).toBeInViewport();
    await page.screenshot({ path: testInfo.outputPath("answer-360.png") });
    await expect(practice.getByRole("link", { name: /原典PDF/ })).toHaveAttribute("href", /ipa\.go\.jp/);
    const continuation = practice.getByRole("link", { name: "同じ分野の演習を続ける" });
    const href = (await continuation.getAttribute("href"))!;
    const params = new URL(href, "http://local").searchParams;
    expect(params.get("exam")).toBe(slug.startsWith("it-shikaku") ? "ip" : "nw");
    expect(params.get("session")).toBe(slug.startsWith("it-shikaku") ? "am" : slug.startsWith("nw-gogo") ? "am2" : "am1");
    expect(params.get("category")).toBeTruthy();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await continuation.click();
    await expect(page).toHaveURL(new RegExp(`/quiz\\?${href.split("?")[1].replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));
    await expect(page.getByRole("radio").first()).toBeVisible();
    expect(aiCalls).toBe(0);
  });
}

test("the practice stays before the article and the existing ad review gate remains closed", async ({ page }) => {
  await page.route("**/pagead/**", route => route.abort());
  await page.goto("/blog/ip-hinnshutsu-ronten-toppu10");
  const practice = page.locator("#article-practice");
  // The inherited editorial review registry is empty: do not enable an ad just
  // to exercise its layout. The existing source/rendering tests protect the
  // gated content-end slot; here verify the real production gate and ordering.
  await expect(page.locator('aside[aria-label="広告"]')).toHaveCount(0);
  await expect(page.locator("ins.adsbygoogle")).toHaveCount(0);
  expect(await practice.evaluate(el => {
    const article = document.querySelector("#article-body")!;
    return el.getBoundingClientRect().bottom <= article.getBoundingClientRect().top;
  })).toBe(true);
});

test("390px: a six-choice worked example keeps all choices and its actual choice count", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/blog/fe-hinnshutsu-ronten-toppu10");
  const practice = page.getByRole("region", { name: "記事から1問チャレンジ" });
  await expect(practice.getByRole("radio")).toHaveCount(6);
  await expect(practice.getByText(/6択問題/)).toBeVisible();
  await practice.getByRole("radio").last().click();
  await expect(practice.getByRole("status")).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("answer-390.png") });
});

test("the study room returns to the qualification last answered on this device", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("ipa-quiz:last-question:v1", JSON.stringify({ exam: "sg", year: 2025, season: "cbt", session: "kamoku-a", qNumber: 5, answeredAt: Date.now() })));
  await page.goto("/");
  const link = page.getByRole("link", { name: "情報セキュリティマネジメントをもう1問", exact: true }).first();
  await expect(link).toHaveAttribute("href", "/quiz?mode=random&exam=sg");
  await link.click();
  await expect(page).toHaveURL(/exam=sg/);
  await expect(page.getByRole("radio").first()).toBeVisible();
});
