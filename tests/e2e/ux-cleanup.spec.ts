import { expect, test } from "@playwright/test";
import path from "node:path";

test.use({ viewport: { width: 390, height: 844 }, serviceWorkers: "block" });
test.setTimeout(240_000);
const images = process.env.UX_SCREENSHOT_DIR;

test("home, question, result, personal records and settings remain connected", async ({ page }, testInfo) => {
  const dialogs: string[] = [];
  const aiRequests: string[] = [];
  page.on("dialog", async dialog => { dialogs.push(dialog.message()); await dialog.dismiss(); });
  await page.route("https://**", route => route.abort());
  await page.route("**/api/**", route => new URL(route.request().url()).pathname === "/api/questions/next"
    ? route.fallback() : route.fulfill({ status: 503, json: { error: "unavailable" } }));
  await page.route("**/api/auth/session", route => route.fulfill({ json: { user: { id: "ux-cleanup", name: "表示確認" }, expires: "2099-01-01T00:00:00Z" } }));
  await page.route("**/api/copilot", route => {
    aiRequests.push(route.request().postData() ?? "");
    return route.fulfill({ status: 503, json: { error: "unavailable" } });
  });
  async function shot(name: string) {
    await page.screenshot({ path: images ? path.join(images, `after-${name}.png`) : testInfo.outputPath(`${name}.png`), fullPage: true, caret: "initial", animations: "disabled" });
  }
  await page.goto("/");
  await expect(page.getByRole("searchbox", { name: "資格名・略称で検索" })).toBeVisible();
  await shot("home");
  await page.goto("/quiz?mode=year&exam=ip&year=2011&season=autumn&session=am&limit=1&order=1");
  await expect(page.getByRole("radio").first()).toBeVisible({ timeout: 120_000 });
  await shot("question");
  await page.getByRole("radio").first().click();
  await expect(page.locator('[aria-label="解答結果"][aria-hidden="false"]')).toBeVisible();
  await shot("answer");
  await page.locator("summary").filter({ hasText: /^AIに質問$/ }).click();
  const input = page.getByRole("textbox", { name: /AIへの質問を入力/ });
  await expect(input).toBeVisible();
  await expect(page.getByText(/Google Geminiで処理します/).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "プライバシーポリシー", exact: true }).first()).toHaveAttribute("href", "/privacy#2");
  await input.fill("選択肢の違いを教えてください");
  await page.getByRole("button", { name: "送信", exact: true }).click();
  await expect.poll(() => aiRequests.length).toBe(1);
  expect(dialogs).toEqual([]);
  await page.getByRole("button", { name: "結果を見る", exact: true }).click();
  await expect(page.getByRole("heading", { name: "クイズ完了！" })).toBeVisible();
  await shot("result");
  await page.getByRole("navigation", { name: "グローバルナビゲーション" }).getByRole("link", { name: "メニュー", exact: true }).click();
  await expect(page.getByRole("heading", { name: "わたしの記録", exact: true })).toBeVisible();
  await shot("records");
  await page.getByRole("link", { name: "設定", exact: true }).click();
  await expect(page.getByRole("heading", { name: "設定", exact: true })).toBeVisible();
  await shot("settings");
});

test("retired entry URLs redirect permanently and preserve exam context", async ({ request }) => {
  for (const [source, target] of [
    ["/account/study-plan", "/study-plan"],
    ["/quiz/review", "/review"],
    ["/demo/afternoon", "/demo/essay-grading"],
    ["/features/ai-explanation", "/features/copilot"],
  ]) {
    const query = "?exam=ip&returnTo=%2Fip";
    const response = await request.get(source + query, { maxRedirects: 0 });
    expect(response.status()).toBe(301);
    const destination = new URL(response.headers().location, response.url());
    expect(destination.pathname).toBe(target);
    expect(destination.searchParams.get("exam")).toBe("ip");
    expect(destination.searchParams.get("returnTo")).toBe("/ip");
  }
});
