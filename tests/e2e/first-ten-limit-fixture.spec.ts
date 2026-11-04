import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, storageState: { cookies: [], origins: [] }, serviceWorkers: "block" });
test.setTimeout(90_000);

test("quota UI fixture: ten uninterrupted answers, then free exits before the optional plan", async ({ page }, testInfo) => {
  await page.route("https://**", route => route.abort());
  // Local billing is deliberately dormant. Enable only the serialized client
  // prop in this response and stub grants below; no account, DB, quota policy,
  // deployment setting or product source is changed by this UI fixture.
  await page.route("**/quiz?**", async route => {
    if (route.request().resourceType() !== "document") return route.continue();
    const response = await route.fetch();
    const html = await response.text();
    const marker = 'billingGateEnabled\\":false';
    expect(html.split(marker)).toHaveLength(2);
    await route.fulfill({ response, body: html.replace(marker, marker.replace("false", "true")) });
  });
  const granted = new Set<string>();
  await page.route("**/api/billing/question", async route => {
    const { id } = route.request().postDataJSON() as { id: string };
    const access = { kind: "guest", freeDaily: 10, remaining: Math.max(0, 10 - granted.size), resetAt: "2026-11-05T15:00:00.000Z", retryAfter: null };
    if (!granted.has(id) && granted.size >= 10) return route.fulfill({ status: 429, json: { error: "daily_limit", access } });
    const response = await page.request.get(`/api/questions/next?id=${encodeURIComponent(id)}`);
    expect(response.status()).toBe(200);
    granted.add(id);
    await route.fulfill({ json: { question: await response.json(), access: { ...access, remaining: 10 - granted.size } } });
  });
  await page.goto("/quiz?mode=year&exam=ap&year=2023&season=spring&session=am");
  for (let index = 0; index < 10; index++) {
    const choice = page.getByRole("radio", { name: /^選択肢 / }).first();
    await expect(choice).toBeEnabled();
    await expect(page.locator('a[href^="/auth/signin"]:visible')).toHaveCount(0);
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await choice.tap();
    await expect(page.getByRole("region", { name: /^(正解|不正解)の解説$/ })).toBeInViewport();
    await page.getByRole("navigation", { name: "解答後の学習操作" }).getByRole("button", { name: "次の1問" }).tap();
  }
  await expect(page.getByRole("heading", { name: "今日の無料演習はここまで" })).toBeVisible();
  expect(granted.size).toBe(10);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("ipa-quiz:history:v1")!).entries.length)).toBe(10);
  const free = page.getByRole("link", { name: "保存済みの履歴を無料で復習する", exact: true });
  const plan = page.getByRole("link", { name: "月額プランの料金・条件を見る", exact: true });
  const top = (locator: typeof free) => locator.evaluate(el => el.getBoundingClientRect().top + scrollY);
  expect(await top(free)).toBeLessThan(await top(plan));
  await expect(plan).toHaveAttribute("href", /returnTo=/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await testInfo.attach("quota-wall-mobile", { body: await page.screenshot({ fullPage: true }), contentType: "image/png" });
  await free.tap();
  await expect(page).toHaveURL(/\/review$/);
});
