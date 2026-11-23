import { test, expect } from "@playwright/test";
import { AI_FREE_QUESTIONS_PER_DAY } from "../../lib/constants/ai-quota";
import { PLAN_OFFER } from "../../lib/billing/plan-offer";
import { AI_POLICY_VERSION } from "../../lib/ai/access-policy";

const problem = "/q/ap/2024-spring/am/q1";
const limit = AI_FREE_QUESTIONS_PER_DAY;
const checkoutLabel = `月額${PLAN_OFFER.priceYen.toLocaleString("ja-JP")}円（税込）で続ける`;
const draft = "この選択肢が違う理由を教えてください";

test.use({ viewport: { width: 390, height: 844 }, serviceWorkers: "block" });

test("shows retry guidance during an App Store renewal without showing a purchase offer", async ({ page }) => {
  let verified = false;
  const pending = {
    status: 503,
    headers: { "X-AI-Policy-Version": AI_POLICY_VERSION, "X-Error-Type": "ai_membership_check_pending" },
    json: { error: "ai_membership_check_pending" },
  };
  await page.route("**/api/ai/usage?feature=copilot", route =>
    route.fulfill(verified ? { json: { kind: "paid" } } : pending));
  await page.route("**/api/copilot", route => route.fulfill(pending));
  await page.goto(problem);
  await page.locator("summary").filter({ hasText: /^AIに質問$/ }).click();
  const panel = page.getByRole("region", { name: "この問題についてAIに質問" });
  await expect(panel.getByText(/月額会員の更新を確認中です/)).toBeVisible();
  const input = panel.getByRole("textbox");
  await input.fill(draft);
  await panel.getByRole("button", { name: "送信", exact: true }).click();
  await expect(input).toHaveValue(draft);
  await expect(panel.getByRole("link", { name: checkoutLabel })).toHaveCount(0);
  verified = true;
  await page.evaluate(() => window.dispatchEvent(new Event("focus")));
  await expect(panel.getByText("月額会員 · AI質問は回数制限なし")).toBeVisible();
});

test("shows the remaining quota, offers equal actions, and restores the draft on return", async ({ page }) => {
  let remaining = limit;
  let paid = false;
  const resetAt = Date.now() + 60_000;
  const quotaEvents: string[] = [];
  await page.route("**/api/activity", route => {
    const body = route.request().postDataJSON() as { events: { event: string }[] };
    quotaEvents.push(...body.events.map(item => item.event).filter(event => event.startsWith("ai_quota_")));
    return route.fulfill({ status: 204 });
  });
  await page.route("**/api/ai/usage?feature=copilot", route => route.fulfill({
    json: paid ? { kind: "paid" } : { kind: "free", remaining, resetAt },
  }));
  await page.route("**/api/copilot", async route => {
    remaining--;
    await route.fulfill({ body: "問題の条件を順に確認すると、正答が分かります。", contentType: "text/plain; charset=utf-8" });
  });

  const artifacts = process.env.AI_QUOTA_SCREENSHOT_DIR;
  const shot = async (name: string) => {
    if (!artifacts) return;
    await input.evaluate(element => element.scrollIntoView({ block: "center", behavior: "instant" }));
    await expect(input).toBeInViewport({ ratio: 1 });
    await page.screenshot({ path: `${artifacts}/${name}.png`, animations: "disabled" });
  };
  const open = () => page.locator("summary").filter({ hasText: /^AIに質問$/ }).click();
  const panel = page.getByRole("region", { name: "この問題についてAIに質問" });
  const input = panel.getByRole("textbox");
  const send = panel.getByRole("button", { name: "送信", exact: true });
  await page.goto(problem);
  await open();
  await expect(input).toBeVisible();
  await expect(panel.getByText(`今日の無料AI あと${limit}回`)).toHaveCount(0);
  for (let used = 1; used <= limit; used++) {
    await input.fill(`正答の理由を${used}点教えてください`);
    await send.click();
    if (used < limit) {
      await expect(panel.getByText(`今日の無料AI あと${limit - used}回`)).toBeVisible();
      if (used === 1) await shot("01-remaining-two");
    }
  }

  const heading = panel.getByText(`今日の無料のAI質問（${limit}回）はここまで`, { exact: true });
  const checkout = panel.getByRole("link", { name: checkoutLabel });
  const dismiss = panel.getByRole("button", { name: "今日はここまで" });
  await expect(heading).toBeVisible();
  await expect(panel.getByText(`明日0時（日本時間）に${limit}回に戻ります`)).toBeVisible();
  await input.fill(draft);
  const purchaseSize = await checkout.boundingBox();
  const dismissSize = await dismiss.boundingBox();
  expect(purchaseSize?.width).toBe(dismissSize?.width);
  expect(purchaseSize?.height).toBe(dismissSize?.height);
  await shot("02-daily-limit");
  await dismiss.click();
  await expect(heading).toBeHidden();
  await expect(input).toHaveValue(draft);
  await expect(input).toBeFocused();
  await expect.poll(() => quotaEvents).toEqual(["ai_quota_viewed", "ai_quota_dismissed"]);

  await page.reload();
  await open();
  await input.fill(draft);
  await expect(checkout).toHaveAttribute("href", `/billing/start?returnTo=${encodeURIComponent(problem)}`);
  await page.route(url => url.pathname === "/billing/start", route => {
    paid = true;
    const returnTo = new URL(route.request().url()).searchParams.get("returnTo")!;
    return route.fulfill({ status: 302, headers: { location: returnTo }, body: "" });
  });
  await checkout.click();
  await expect(page).toHaveURL(new RegExp(`${problem}$`));
  await expect(input).toHaveValue(draft);
  await expect(panel.getByText("月額会員 · AI質問は回数制限なし")).toBeVisible();
  await expect(heading).toBeHidden();
  await expect.poll(() => quotaEvents).toEqual(["ai_quota_viewed", "ai_quota_dismissed", "ai_quota_viewed", "ai_quota_plan_clicked"]);
  await shot("03-monthly-member");
});

test("keeps a question typed just before a server-side daily limit", async ({ page }) => {
  const resetAt = Date.now() + 60_000;
  await page.route("**/api/ai/usage?feature=copilot", route => route.fulfill({
    json: { kind: "free", remaining: 1, resetAt },
  }));
  await page.route("**/api/copilot", route => route.fulfill({
    status: 429,
    headers: { "X-AI-Policy-Version": AI_POLICY_VERSION },
    json: { error: "ai_daily_quota_exhausted", resetAt },
  }));
  await page.goto(problem);
  await page.locator("summary").filter({ hasText: /^AIに質問$/ }).click();
  const panel = page.getByRole("region", { name: "この問題についてAIに質問" });
  await expect(panel.getByText("今日の無料AI あと1回")).toBeVisible();
  const input = panel.getByRole("textbox");
  const send = panel.getByRole("button", { name: "送信", exact: true });
  const checkout = panel.getByRole("link", { name: checkoutLabel });
  await input.fill(draft);
  await send.click();
  await expect(checkout).toBeVisible();
  await expect(input).toHaveValue(draft);

  await panel.getByRole("button", { name: "今日はここまで" }).click();
  await expect(checkout).toBeHidden();
  await send.click();
  await expect(checkout).toBeVisible();
  await expect(input).toHaveValue(draft);
});
