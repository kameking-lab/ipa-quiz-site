import { test, expect } from "@playwright/test";

test.use({ serviceWorkers: "block" });
test.beforeEach(async ({ page }) => { await page.route("https://**", (route) => route.abort()); });

test.setTimeout(90_000);
for (const width of [390, 1280]) {
  test(`search selects one qualification before starting at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    const finder = page.locator("#choose-qualification");
    await expect(finder.getByRole("searchbox")).toBeInViewport();
    await expect(page.locator('main a[href="/challenge"]')).toHaveCount(0);
    if (width < 768) await expect(page.locator('nav[aria-label="モバイルタブ"] a[href="/mock-exam"]:visible')).toHaveCount(0);
    await expect(page.locator(".study-resume-empty")).toBeVisible();
    await finder.getByRole("searchbox").fill("ｆｅ");
    const row = finder.getByRole("button", { name: /^基本情報技術者/ });
    await row.focus();
    await page.keyboard.press("Enter");
    await expect(row).toHaveAttribute("aria-expanded", "true");
    await expect(finder.locator('a[href="/fe"]:visible')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await page.screenshot({ path: `reports/home-redesign/selected-${width}.png`, fullPage: true });
    await finder.locator('a[href="/fe"]:visible').click();
    await expect(page).toHaveURL(/\/fe$/, { timeout: 30_000 });
  });
}

test("real saved question and wrong answers stay within the selected exam", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("ipa-quiz:last-question:v1", JSON.stringify({ exam: "ip", year: 2011, season: "autumn", session: "am", qNumber: 1, answeredAt: Date.now() }));
    localStorage.setItem("ipa-quiz:history:v1", JSON.stringify({ entries: [{ id: "ip-2011a-am-q1", selected: "ア", correct: false, at: Date.now() }, { id: "ap-2024a-am-q1", selected: "ア", correct: false, at: Date.now() }], starredIds: [] }));
  });
  await page.goto("/");
  await expect(page.getByRole("link", { name: "続きを開く" })).toHaveAttribute("href", "/quiz?mode=year&exam=ip&year=2011&season=autumn&session=am&question=ip-2011a-am-q1", { timeout: 30_000 });
  await expect(page.getByRole("link", { name: "間違えた 1問を復習" })).toHaveAttribute("href", "/quiz?mode=review&scope=exam&reviewKind=wrong&exam=ip");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "reports/home-redesign/returning-390.png", fullPage: true });
  await page.getByRole("link", { name: "別の資格を選ぶ" }).click();
  await expect(page.getByRole("searchbox")).toBeFocused();
  await page.locator(".study-resume .study-primary").click();
  await expect(page.getByRole("radio").first()).toBeVisible({ timeout: 30_000 });
  expect(new URL(page.url()).searchParams.get("question")).toBe("ip-2011a-am-q1");
});

test("invalid saved coordinates produce no invented progress", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("ipa-quiz:last-question:v1", JSON.stringify({ exam: "ip", year: 2099, season: "autumn", session: "am", qNumber: 999, answeredAt: Date.now() })));
  await page.goto("/");
  await expect(page.locator(".study-resume-empty")).toBeVisible();
  await expect(page.getByRole("link", { name: "続きを開く" })).toHaveCount(0);
});

test("challenge direct access requires a qualification", async ({ page }) => {
  await page.goto("/challenge");
  await expect(page.getByRole("searchbox")).toBeVisible();
  await expect(page.getByRole("radio")).toHaveCount(0);
  await page.goto("/challenge?exam=ip");
  await expect(page).toHaveURL(/\/quiz\?mode=random&exam=ip&limit=5/, { timeout: 30_000 });
  await expect(page.getByRole("radio").first()).toBeVisible({ timeout: 30_000 });
});

test("answer actions keep focus and next question survives reload on a short phone", async ({ page }) => {
  await page.setViewportSize({ width: 400, height: 606 });
  await page.route("**/api/copilot**", (route) => route.fulfill({ status: 200, body: "", contentType: "text/plain" }));
  await page.goto("/quiz?mode=year&exam=ip&year=2011&season=autumn&session=am&order=1");
  await expect(page.getByRole("radio").first()).toBeVisible({ timeout: 30_000 });
  const original = new URL(page.url()).searchParams.get("question");
  await page.getByRole("radio").first().click();
  await expect(page.locator('[aria-label="解答結果"]')).toBeFocused();
  await expect(page.locator('[aria-label="解答結果"]')).toBeInViewport();
  await expect(page.getByRole("button", { name: "次の問題へ", exact: true }).first()).toBeInViewport();
  await page.screenshot({ path: "reports/home-redesign/quiz-result-400x606.png" });
  const ask = page.getByRole("button", { name: /AIに質問|この解説|AIに聞く/ }).first();
  await ask.focus();
  await page.keyboard.press("Enter");
  expect(new URL(page.url()).searchParams.get("question")).toBe(original);
  const input = page.getByRole("dialog", { name: "AI コパイロット", exact: true }).getByRole("textbox").first();
  await expect(input).toBeVisible();
  const inputBox = await input.boundingBox();
  expect(inputBox!.y + inputBox!.height).toBeLessThanOrEqual(606);
  await page.screenshot({ path: "reports/home-redesign/quiz-ai-400x606.png" });
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "次の問題へ", exact: true }).first().click();
  await expect.poll(() => new URL(page.url()).searchParams.get("question")).not.toBe(original);
  const next = new URL(page.url()).searchParams.get("question");
  await expect(page.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "2");
  await expect(page.getByRole("radio").first()).toBeVisible();
  await page.waitForLoadState("networkidle");
  await page.reload();
  await expect(page.getByRole("radio").first()).toBeVisible({ timeout: 30_000 });
  expect(new URL(page.url()).searchParams.get("question")).toBe(next);
});
test("safety paper resumes its real saved question without a guessed score", async ({ page, request }) => {
  const paper = "lckohyo-LC20260401-2";
  const question = `${paper}-q1`;
  const checked = await request.get(`/api/home/resume?paper=${paper}&question=${question}`);
  expect(checked.ok()).toBe(true);
  const meta = await checked.json();
  await page.addInitScript(({ paper, question, total }) => {
    const summary = { examId: paper, examTitle: "二級ボイラー技士", lastQuestionId: question, updatedAt: new Date().toISOString(), total, answered: 1, correct: 0, incorrect: 0, unscored: 1, scorable: 0 };
    sessionStorage.setItem(`ipa-quiz:exam-library-session:v1:${paper}`, JSON.stringify({ progress: { version: 1, examId: paper, lastQuestionId: question, updatedAt: summary.updatedAt, answers: { [question]: { choice: null, memo: "検証用", submitted: true } } }, summary }));
  }, { paper, question, total: meta.total });
  await page.goto("/");
  await expect(page.getByRole("link", { name: "続きを開く" })).toHaveAttribute("href", `/e-learning/exams/${paper}?question=${question}`);
  await expect(page.getByRole("heading", { name: meta.name, exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: /間違えた/ })).toHaveCount(0);
});