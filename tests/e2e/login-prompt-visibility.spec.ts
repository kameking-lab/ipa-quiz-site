import { expect, test, type Page } from "@playwright/test";

test.use({ viewport: { width: 390, height: 844 }, serviceWorkers: "block" });
test.setTimeout(240_000);

test.beforeEach(async ({ page }) => {
  await page.route("https://**", route => route.abort());
  await page.route("**/api/**", route => new URL(route.request().url()).pathname === "/api/questions/next"
    ? route.fallback()
    : route.fulfill({ status: 503, json: { error: "unavailable" } }));
  // These UI checks do not need analytics writes or the popularity service.
  await page.route("**/api/activity", route => route.fulfill({ status: 204 }));
  await page.route("**/api/home/popular**", route => route.fulfill({ json: { exams: [] } }));
  await page.addInitScript(() => localStorage.setItem("ipa-quiz:onboarded:v1", "1"));
});

async function noLoginPrompts(page: Page) {
  await expect(page.locator('a[href*="/auth/signin"]')).toHaveCount(0);
  await expect(page.getByRole("button", { name: /ログイン|サインイン/ })).toHaveCount(0);
  await expect(page.getByText(/ログインしてください|ログインして.*問|無料ログインで/)).toHaveCount(0);
}

// Session responses are fixtures: no real credentials, database or payment is used.
test("authenticated home, question, answer and completion have no login prompts", async ({ page }, testInfo) => {
  await page.route("**/api/auth/session", route => route.fulfill({ json: { user: { id: "ux-session", name: "表示確認" }, expires: "2099-01-01T00:00:00.000Z" } }));
  await page.goto("/");
  await expect(page.getByRole("link", { name: "10問を始める", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "メニューを開く" }).first().click();
  await expect(page.getByRole("dialog").getByRole("link", { name: "アカウント", exact: true })).toBeVisible();
  await noLoginPrompts(page);
  await page.keyboard.press("Escape");
  await page.screenshot({ path: testInfo.outputPath("authenticated-home.png"), fullPage: true });

  await page.goto("/quiz?mode=year&exam=ip&year=2011&season=autumn&session=am&limit=1&order=1");
  await expect(page.getByRole("radio").first()).toBeVisible({ timeout: 90_000 });
  await noLoginPrompts(page);
  await page.screenshot({ path: testInfo.outputPath("authenticated-question.png"), fullPage: true });
  await page.getByRole("radio").first().click();
  await expect(page.locator('[aria-label="解答結果"][aria-hidden="false"]')).toBeVisible();
  await noLoginPrompts(page);
  await page.screenshot({ path: testInfo.outputPath("authenticated-answer.png"), fullPage: true });
  await page.getByRole("button", { name: "結果を見る", exact: true }).click();
  await expect(page.getByRole("heading", { name: "クイズ完了！" })).toBeVisible();
  await noLoginPrompts(page);
  await page.screenshot({ path: testInfo.outputPath("authenticated-completion.png"), fullPage: true });
});

test("loading home has no guest login flash", async ({ page }) => {
  let finish!: () => void;
  const pending = new Promise<void>(resolve => { finish = resolve; });
  await page.route("**/api/auth/session", async route => { await pending; await route.fulfill({ json: { user: { id: "ux-session" } } }); });
  await page.goto("/");
  await expect(page.getByRole("link", { name: "10問を始める", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "メニューを開く" }).first().click();
  await noLoginPrompts(page);
  finish();
  await expect(page.getByRole("dialog").getByRole("link", { name: "アカウント", exact: true })).toBeVisible();
  await noLoginPrompts(page);
});

test("signed-out home retains the login entry", async ({ page }) => {
  await page.route("**/api/auth/session", route => route.fulfill({ json: null }));
  await page.goto("/");
  await page.getByRole("button", { name: "メニューを開く" }).first().click();
  await expect(page.getByRole("dialog").getByRole("link", { name: "ログイン", exact: true })).toBeVisible();
});
