import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { expect, test, type Page } from "@playwright/test";

// Anonymous visitor on an iPhone-sized screen: ten individual question pages
// are free, the eleventh shows the limit screen, and the plan button leads
// through sign-in and Checkout straight back to the same question.
//
// Needs a server whose free gate is on (local dummy billing env: see the PR
// description); skipped otherwise. The quota API, Google and Stripe are stubbed;
// the question pages, limit screen, /billing/start redirect, sign-in page,
// success page and return logic are the real ones.
const BASE = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000";
test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, serviceWorkers: "block",
  storageState: { cookies: [], origins: [{ origin: new URL(BASE).origin, localStorage: [{ name: "ipa-quiz:onboarded:v1", value: "1" }] }] } });
test.setTimeout(600_000);
test.skip(process.env.E2E_PAYWALL_GATE !== "1", "requires a local server with the free gate enabled (E2E_PAYWALL_GATE=1)");

const SHOTS = process.env.PAYWALL_SHOTS_DIR;
async function shot(page: Page, name: string) {
  if (!SHOTS) return;
  mkdirSync(SHOTS, { recursive: true });
  await page.screenshot({ path: join(SHOTS, name) });
}

test("/q pages share the free 10; plan → sign-in → Checkout → back to the same question", async ({ page }) => {
  const origin = new URL(BASE).origin;
  let signedIn = false, paid = false, startUrl = "";
  const granted = new Set<string>();
  const funnel: string[] = [];
  // No real external traffic; the Google and Stripe stubs below take precedence.
  await page.route(/^https:\/\//, route => route.abort());
  await page.route("**/api/billing/question", async route => {
    const { id } = route.request().postDataJSON() as { id: string };
    const access = { kind: paid ? "pass" : "guest", freeDaily: 10, remaining: paid ? null : Math.max(0, 10 - granted.size), resetAt: "2026-11-07T15:00:00.000Z", retryAfter: null };
    if (!paid && !granted.has(id) && granted.size >= 10) return route.fulfill({ status: 429, json: { error: "daily_limit", access: { ...access, remaining: 0 } } });
    if (!paid) granted.add(id);
    await route.fulfill({ json: { question: { id }, access } });
  });
  await page.route("**/api/feedback-unlock", route => route.fulfill({ json: { eligible: false, submitted: false, remaining: 0, requiresLogin: true } }));
  await page.route("**/api/funnel", async route => { funnel.push(String((JSON.parse(route.request().postData() ?? "{}") as { event?: string }).event)); await route.fulfill({ status: 204 }); });
  // Signed out, /billing/start is the real page (redirects to sign-in). Signed in, the
  // real page would create the Checkout session; here it goes to the Stripe stub.
  await page.route("**/billing/start?**", async route => {
    if (!signedIn) { startUrl = route.request().url(); return route.continue(); }
    // A script navigation (not an HTTP redirect) so the Stripe stub below intercepts it.
    await route.fulfill({ contentType: "text/html; charset=utf-8", body: `<!doctype html><script>location.replace("https://checkout.stripe.com/c/pay/cs_test_e2e")</script>` });
  });
  await page.route("https://accounts.google.com/**", route => route.fulfill({ contentType: "text/html; charset=utf-8",
    body: `<!doctype html><html lang="ja"><meta name="viewport" content="width=device-width"><body style="font-family:sans-serif;padding:32px"><h1>Google（スタブ）</h1><p>アカウントを選択</p><a id="account" href="${startUrl || origin}" style="display:block;padding:14px;border:1px solid #ccc;border-radius:12px;color:#111;text-decoration:none">e2e@example.com</a></body></html>` }));
  await page.route("https://checkout.stripe.com/**", route => route.fulfill({ contentType: "text/html; charset=utf-8",
    body: `<!doctype html><html lang="ja"><meta name="viewport" content="width=device-width"><body style="font-family:sans-serif;padding:32px"><h1>Stripe Checkout（スタブ）</h1><p>e2e@example.com</p><a id="pay" href="${origin}/billing/success?order=order-e2e" style="display:block;margin-top:24px;padding:14px;background:#0a2540;color:#fff;border-radius:8px;text-align:center;text-decoration:none">申し込む</a><p style="font-size:12px">月額980円（税込）・毎月自動更新・いつでも解約可（期間末まで利用可）。返金は条件のとおり。 利用条件</p></body></html>` }));
  await page.route("**/api/billing/status?**", route => route.fulfill({ json: paid
    ? { billingModel: "subscription", entitled: true, expiresAt: null, canManage: true, purchase: { id: "order-e2e", status: "paid", expiresAt: null } }
    : { billingModel: "subscription", entitled: false, expiresAt: null, purchase: { id: "order-e2e", status: "pending", expiresAt: null } } }));

  // Ten different question pages, following each page's rel=next link.
  let url = "/q/ap/2023-spring/am/q1";
  const visited: string[] = [];
  for (let n = 1; n <= 10; n++) {
    await page.goto(url);
    await expect(page.getByRole("region", { name: "問題文" })).toBeVisible();
    await expect.poll(() => granted.size, { timeout: 60_000 }).toBe(n);
    await expect(page.getByRole("heading", { name: "今日の無料10問はここまで" })).toHaveCount(0);
    await expect(page.locator('a[href^="/auth/signin"]:visible')).toHaveCount(0);
    if (n === 1) await shot(page, "01-q-page-free.png");
    visited.push(url);
    url = new URL((await page.locator('link[rel="next"]').getAttribute("href"))!).pathname;
  }
  // Revisiting a counted question the same day stays free.
  await page.goto(visited[3]);
  await expect(page.getByRole("region", { name: "問題文" })).toBeVisible();
  await page.waitForTimeout(1000);
  expect(granted.size).toBe(10);
  await expect(page.getByRole("heading", { name: "今日の無料10問はここまで" })).toHaveCount(0);

  // The 11th question: the limit screen replaces the question for a person.
  await page.goto(url);
  const plan = page.getByRole("link", { name: "月額980円で続ける" });
  await expect(page.getByRole("heading", { name: "今日の無料10問はここまで" })).toBeVisible({ timeout: 60_000 });
  await expect(page.getByRole("region", { name: "問題文" })).toBeHidden();
  await expect(plan).toHaveAttribute("href", `/billing/start?returnTo=${encodeURIComponent(url)}`);
  await expect(page.getByText("明日また10問", { exact: true })).toBeVisible();
  // Anonymous and the bonus unused: the second button goes to sign-in, then the feedback form.
  const bonus = page.getByRole("link", { name: "意見を送ってあと10問" });
  await expect(bonus).toBeVisible({ timeout: 60_000 });
  await expect(bonus).toHaveAttribute("href", `/auth/signin?callbackUrl=${encodeURIComponent(`${url}#feedback-unlock`)}`);
  await page.getByRole("heading", { name: "今日の無料10問はここまで" }).scrollIntoViewIfNeeded();
  await shot(page, "02-q-11th-limit.png");
  await expect.poll(() => funnel).toContain("free_limit_reached");

  // Tap 1: plan → (real /billing/start) → sign-in with the provider buttons only.
  await plan.tap();
  await page.waitForURL(/\/auth\/signin\?/, { timeout: 120_000 });
  expect(new URL(page.url()).searchParams.get("callbackUrl")).toBe(`/billing/start?returnTo=${encodeURIComponent(url)}`);
  const google = page.getByRole("button", { name: /Google でログイン/ });
  await expect(google).toBeVisible({ timeout: 60_000 });
  if (process.env.E2E_PAYWALL_APPLE === "1") await expect(page.getByRole("button", { name: "Appleでサインイン" })).toBeVisible();
  await expect(page.locator("footer.site-footer")).toBeHidden();
  await expect(page.locator(".mobile-bottom-nav")).toBeHidden();
  await expect(page.getByRole("heading", { name: "ログインして決済へ" })).toBeVisible();
  await expect(page.getByRole("textbox")).toHaveCount(0);
  await shot(page, "03-signin-providers-only.png");
  await expect.poll(() => funnel).toEqual(expect.arrayContaining(["paywall_plan_click", "purchase_signin_view"]));

  // Tap 2: Google, tap 3: the Google account → back to /billing/start → Checkout immediately.
  await google.tap();
  await page.waitForURL(/accounts\.google\.com/, { timeout: 60_000 });
  signedIn = true;
  await page.locator("#account").tap();
  await page.waitForURL(/checkout\.stripe\.com/);
  await shot(page, "04-stripe-checkout.png");

  // Tap 4: pay → success → straight back to the same question, now paid.
  paid = true;
  await page.locator("#pay").tap();
  await page.waitForURL(next => next.pathname === url, { timeout: 60_000 });
  await expect(page.getByRole("region", { name: "問題文" })).toBeVisible({ timeout: 60_000 });
  await page.waitForTimeout(1000);
  await expect(page.getByRole("heading", { name: "今日の無料10問はここまで" })).toHaveCount(0);
  await shot(page, "05-back-on-question-paid.png");
  await expect.poll(() => funnel).toContain("purchase_returned");
});
