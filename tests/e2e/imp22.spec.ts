import { expect, test } from "@playwright/test";

test("the qualification referral opens a prefilled plan that can be exported", async ({ page }) => {
  await page.route("**/api/exam-schedule/fe", route => route.fulfill({ json: { exam: "fe", source: "manual", sessions: [] } }));
  const examDate = new Date(Date.now() + 120 * 86_400_000).toISOString().slice(0, 10);
  await page.goto("/?plan=fe&examDate=" + examDate + "&utm_source=tsugino");
  const sheet = page.getByRole("dialog", { name: "学習計画を作る" });
  await expect(sheet.getByLabel("受験日", { exact: true })).toHaveValue(examDate);
  await expect(sheet.getByRole("combobox", { name: "受ける資格" })).toHaveValue("fe");
  await sheet.getByRole("button", { name: "この計画で始める" }).click();
  await expect(page.getByText("学習計画を作りました")).toBeVisible();
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "カレンダーに追加（.ics）" }).click(),
  ]);
  expect(download.suggestedFilename()).toBe("kakomon-study-plan.ics");
  await page.getByRole("button", { name: "計画の確認・変更", exact: true }).click();
  await page.getByRole("dialog").getByRole("button", { name: "計画を変更", exact: true }).click();
  await expect(page.getByRole("dialog").getByRole("button", { name: "カレンダーに追加（.ics）" })).toBeVisible();
});

test("retired sitemap and legacy qualification URLs have the intended status", async ({ request }) => {
  const redirect = await request.get("/sc/2024/fall?utm_source=legacy", { maxRedirects: 0 });
  expect(redirect.status()).toBe(308);
  expect(redirect.headers().location).toMatch(/\/sc\/2024-autumn\?utm_source=legacy$/);
  const parent = await request.get("/chori", { maxRedirects: 0 });
  expect(parent.status()).toBe(308);
  expect(parent.headers().location).toContain("/qualifications/chori");
  expect((await request.get("/sitemap/essays.xml")).status()).toBe(410);
  expect((await request.get("/sc/2099/spring")).status()).toBe(410);
  const question = await request.get("/q/sc/2024/fall/am-i/08", { maxRedirects: 0 });
  expect(question.status()).toBe(308);
  expect(question.headers().location).toMatch(/\/q\/sc\/2024-autumn\/am1\/q8$/);
});

for (const exam of ["sc", "nw", "sa", "st", "kankoji2"]) {
  test("the " + exam + " hub links to a working archive and question", async ({ page }) => {
    await page.route("**/api/exam-schedule/**", route => route.fulfill({ json: { sessions: [] } }));
    const top = await page.goto("/" + exam);
    expect(top?.ok()).toBe(true);
    const edition = page.locator('main a[href^="/' + exam + '/"]');
    const path = (await edition.evaluateAll(links => links.map(link => link.getAttribute("href"))))
      .find(value => value && /\/\d{4}-[a-z0-9]+$/.test(value));
    expect(path).toBeTruthy();
    expect((await page.goto(path!))?.ok()).toBe(true);
    const question = page.locator('main a[href^="/q/' + exam + '/"]').first();
    const questionPath = await question.getAttribute("href");
    expect((await page.goto(questionPath!))?.ok()).toBe(true);
    await expect(page).toHaveTitle(/答えと解説/);
  });
}
for (const path of [
  ...[2023, 2024, 2025].flatMap(year => [1, 2, 3, 4].map(caseNo => `/chusho-secondary/${year}/case${caseNo}`)),
  "/denken1/2025-primary/theory", "/denken2/2025-primary/machine", "/denken3/2021-annual/theory",
]) {
  test(`serves the dedicated page ${path}`, async ({ request }) => {
    expect((await request.get(path, { maxRedirects: 0 })).status()).toBe(200);
  });
}
