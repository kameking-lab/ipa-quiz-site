import { expect, test } from "@playwright/test";

const key = "ipa-quiz:pet-profiles:v1:guest";
const legacyKey = "ipa-quiz:pet-learning:v1";
const quiz = "/quiz?mode=year&exam=ap&year=2023&season=spring&session=am";
test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });
test.beforeEach(async ({ page }) => {
  // Auth truth is explicitly controlled; no external account or pet API.
  await page.route("**/api/auth/session", route => route.fulfill({ json: {} }));
});
for (const width of [320, 390]) test(`local learning preserves legacy, persists once and does not reward reload (${width}px)`, async ({ page }) => {
  await page.setViewportSize({ width, height: 844 });
  const legacy = JSON.stringify({ version: 1, ownership: "device-guest", answers: [JSON.stringify(["takken", "old-question"])], food: 1, meals: 0, outfit: "bandana" });
  await page.addInitScript(({ legacy, legacyKey }) => {
    if (!localStorage.getItem(legacyKey)) localStorage.setItem(legacyKey, legacy);
  }, { legacy, legacyKey });
  const ai: string[] = [], petApis: string[] = [];
  page.on("request", request => {
    if (/\/api\/(copilot|generate|essay-grade)/.test(request.url())) ai.push(request.url());
    if (/\/api\/pet/.test(request.url())) petApis.push(request.url());
  });
  await page.goto(quiz);
  await page.waitForURL(url => url.searchParams.get("question") === "ap-2023h-am-q1");
  await expect(page.locator('[aria-label="解答結果"][inert]')).toBeAttached();
  const url = page.url();
  await page.getByRole("radio").first().tap();
  await expect(page.locator('[aria-label="解答結果"]')).toBeFocused();
  expect(page.url()).toBe(url);
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key) ?? '{"events":[]}').events.length, key), { timeout: 15000 }).toBe(1);
  const profile = () => page.evaluate(key => JSON.parse(localStorage.getItem(key)!).profiles.find((p: { qualificationId: string }) => p.qualificationId === "ap"), key);
  expect((await profile()).growth).toBe(3);
  expect(await page.evaluate(legacyKey => localStorage.getItem(legacyKey), legacyKey)).toBe(legacy);
  const next = page.getByRole("button", { name: /^(次の問題へ|結果を見る)/ }).first();
  expect((await next.boundingBox())!.height).toBeGreaterThanOrEqual(44);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: `test-results/pet-v1/${process.env.PET_EVIDENCE_PHASE ?? "regression"}-answer-${width}.png`, fullPage: false });
  await page.reload();
  await expect(page.locator('[aria-label="解答結果"][inert]')).toBeAttached();
  await page.getByRole("radio").first().tap();
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key)!).events.length, key), { timeout: 15000 }).toBe(2);
  expect((await profile()).growth).toBe(3);
  expect(ai).toEqual([]); expect(petApis).toEqual([]);
});
test("reveal and a subsequent correct retry remain reading without growth or study history on reveal", async ({ page }) => {
  await page.goto("/q/ap/2023-spring/am/q1");
  await page.getByRole("button", { name: "採点せずに答えだけ見る" }).tap();
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key) ?? '{"events":[]}').events.length, key), { timeout: 15000 }).toBe(1);
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!).profiles[0].growth, key)).toBe(0);
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("ipa-quiz:history:v1") ?? '{"entries":[]}').entries.length)).toBe(0);
  await page.goto(quiz);
  await page.waitForURL(url => url.searchParams.get("question") === "ap-2023h-am-q1");
  await page.getByRole("radio").first().tap();
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key)!).events.length, key), { timeout: 15000 }).toBe(2);
  expect(await page.evaluate(key => JSON.parse(localStorage.getItem(key)!).profiles[0].growth, key)).toBe(0);
});
test("an unavailable session does not silently write to the guest pet", async ({ page }) => {
  await page.unroute("**/api/auth/session");
  await page.route("**/api/auth/session", route => route.fulfill({ status: 503, json: { error: "unavailable" } }));
  await page.goto(quiz);
  await page.waitForURL(url => url.searchParams.get("question") === "ap-2023h-am-q1");
  await page.getByRole("radio").first().tap();
  await expect(page.locator('[aria-label="解答結果"]')).toBeVisible();
  await page.waitForTimeout(1500);
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBeNull();
});
