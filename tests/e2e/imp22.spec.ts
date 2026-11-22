import { expect, test } from "@playwright/test";

test("the qualification referral opens a prefilled plan that can be exported", async ({ page }) => {
  await page.route("**/api/exam-schedule/fe", route => route.fulfill({ json: { exam: "fe", source: "manual", sessions: [] } }));
  const examDate = new Date(Date.now() + 120 * 86_400_000).toISOString().slice(0, 10);
  await page.goto("/?plan=fe&examDate=" + examDate + "&utm_source=tsugino");
  const sheet = page.getByRole("dialog", { name: "学習計画を作る" });
  await expect(sheet.getByLabel("受験日", { exact: true })).toHaveValue(examDate);
  await expect(sheet.getByText("基本情報技術者", { exact: false }).first()).toBeVisible();
  await sheet.getByRole("button", { name: "この計画で始める" }).click();
  await expect(page.getByText("学習計画を作りました")).toBeVisible();
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("button", { name: "カレンダーに追加（.ics）" }).click(),
  ]);
  expect(download.suggestedFilename()).toBe("kakomon-study-plan.ics");
  await page.getByRole("button", { name: "計画を変更" }).click();
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
});

for (const exam of ["sc", "nw", "sa", "st", "kankoji2"]) {
  test("the " + exam + " hub links to a working archive and question", async ({ page }) => {
    const top = await page.goto("/" + exam);
    expect(top?.ok()).toBe(true);
    const edition = page.locator('main a[href^="/' + exam + '/"]').filter({ visible: true });
    const path = (await edition.evaluateAll(links => links.map(link => link.getAttribute("href"))))
      .find(value => value && /\/\d{4}-[a-z0-9]+$/.test(value));
    expect(path).toBeTruthy();
    expect((await page.goto(path!))?.ok()).toBe(true);
    const question = page.locator('main a[href^="/q/' + exam + '/"]').first();
    const questionPath = await question.getAttribute("href");
    expect((await page.goto(questionPath!))?.ok()).toBe(true);
  });
}
