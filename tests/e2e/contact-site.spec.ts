import { expect, test } from "@playwright/test";

test("次の資格を初期選択し、任意項目を空のまま既存APIへ送信できる", async ({ page }) => {
  // Browser runs may target configured deployments. Never forward a synthetic
  // support request; isolated API tests cover validation and Slack delivery.
  await page.route("**/api/contact", route => route.fulfill({ json: { ok: true, delivery: "delivered", receiptId: "KG-contact-site-e2e" } }));
  await page.goto("/contact?site=tsugino");
  await expect(page.getByRole("radio", { name: "次の資格について" })).toBeChecked();
  await expect(page.locator("main")).toContainText("同じ kameking-lab");
  await page.getByLabel("お問い合わせ内容").fill("次の資格の掲載日程の訂正依頼です（ローカル検証）");
  const posted = page.waitForRequest(r => r.url().endsWith("/api/contact") && r.method() === "POST");
  await page.getByRole("button", { name: "送信する", exact: true }).click();
  expect((await posted).postDataJSON()).toMatchObject({ kind: "contact", category: "tsugino", name: "", email: "" });
  await expect(page.getByRole("status").filter({ hasText: "お問い合わせを受け付けました" })).toBeVisible();
  await expect(page.getByRole("status").filter({ hasText: "KG-contact-site-e2e" })).toBeVisible();
});

for (const query of ["", "?site=unknown", "?site=tsugino&site=unknown"]) {
  test(`通常・未対応・重複queryは従来の初期種別 ${query}`, async ({ page }) => {
    await page.goto(`/contact${query}`);
    await expect(page.getByRole("radio", { name: "改善提案" })).toBeChecked();
    await page.getByText("次の資格について", { exact: true }).click();
    await expect(page.getByRole("radio", { name: "次の資格について" })).toBeChecked();
  });
}

test("種別を変更でき、短すぎる本文では送信しない", async ({ page }) => {
  await page.goto("/contact?site=tsugino");
  await page.getByText("質問", { exact: true }).click();
  await expect(page.getByRole("radio", { name: "質問", exact: true })).toBeChecked();
  const posts: string[] = [];
  page.on("request", r => { if (r.url().endsWith("/api/contact")) posts.push(r.method()); });
  await page.getByLabel("お問い合わせ内容").fill("短い");
  await page.getByRole("button", { name: "送信する", exact: true }).click();
  await expect(page.locator("#contact-error")).toContainText("5 文字以上");
  expect(posts).toEqual([]);
});

test("390pxでもフォームは画面幅に収まり、プライバシーに転送先を説明する", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/contact?site=tsugino");
  await expect(page.getByRole("radio", { name: "次の資格について" })).toBeChecked();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto("/privacy#5");
  await expect(page.locator('[id="5"]')).toContainText("Slack");
  await expect(page.locator('[id="5"]')).toContainText("次の資格");
});
