import { test, expect } from "@playwright/test";

test.beforeEach(async ({ baseURL }) => {
  expect(process.env.E2E_BASE_URL, "Use only the candidate CI server").toBeUndefined();
  expect(baseURL).toBe("http://127.0.0.1:3000");
});

test("purchase offer is one button with one line of terms, and the full conditions are one tap away at narrow width", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/billing");
  const offer = page.locator('section[aria-labelledby="monthly-price"]');
  await expect(offer.getByText(/月額980円（税込）・毎月自動更新・いつでも解約可（期間末まで利用可）・日割返金なし/)).toBeVisible();
  await expect(offer.getByText(/ご請求があれば遅滞なく開示します/)).toBeVisible();
  await expect(offer.getByText(/返信を受けて内容を確認してから|申込前に返信/)).toHaveCount(0);
  const terms = offer.getByRole("link", { name: "条件・特商法表示" });
  await expect(terms).toHaveAttribute("href", "/billing/terms");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await terms.click();
  await expect(page.getByRole("heading", { name: /特定商取引法に基づく表示/ })).toBeVisible();
  await expect(page.getByText(/法令上の権利は制限しません/)).toBeVisible();
  await expect(page.getByText(/日割返金はありません/)).toBeVisible();
});

test("difficulty FAQ does not assert unverified scoring sources", async ({ page }) => {
  await page.goto("/faq");
  const question = page.getByText("問題の難易度表示はどのように決まりますか？", { exact: true });
  await expect(question).toBeVisible();
  await question.click();
  await expect(page.getByText("難易度表示は、学習時の参考としてご覧ください。問題ごとの判定基準や出典は確認できていないため、数値だけで難しさを断定することはできません。", { exact: true })).toBeVisible();
  await expect(page.getByText(/受験者正答率（IPA 統計）/)).toHaveCount(0);
});

test("success and cancel without an order do not falsely claim a completed purchase or send billing requests", async ({ page }) => {
  const billingRequests: string[] = [];
  await page.route("**/api/billing/**", route => { billingRequests.push(route.request().url()); return route.abort(); });
  for (const path of ["/billing/success", "/billing/cancel"]) {
    await page.goto(path);
    await expect(page.getByRole("status").filter({ hasText: "注文番号を確認できません" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "購入が完了しました" })).toHaveCount(0);
  }
  expect(billingRequests).toEqual([]);
});
