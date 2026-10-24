import { expect, test, type Page } from "@playwright/test";
import type { PresenceViewState } from "../../lib/study-presence-contract";
import type { StudyPresenceSnapshot } from "../../lib/study-presence";

// Explicit synthetic UI fixtures: no heartbeat or production learner is recorded.
const fallbackLabel = "資格紹介 実際の学習人数ではありません";
type MeasuredState = Extract<PresenceViewState, { mode: "measured" }>;
test.use({ serviceWorkers: "block" });
test.beforeEach(async ({ page }) => {
  await page.route("**/api/stats/study-presence", route => route.fulfill({
    status: 503,
    json: { status: "unavailable", count: null, total: null, exams: null, measuredAt: null,
      validUntil: null, windowSeconds: 300, reason: "unavailable", retryAfterSeconds: 90 },
  }));
});

async function measured(page: Page, value: StudyPresenceSnapshot): Promise<MeasuredState> {
  const now = await page.evaluate(() => Date.now());
  return { mode: "measured", previous: null, snapshot: { ...value, status: "measured", total: value.count,
    measuredAt: new Date(now).toISOString(), validUntil: new Date(now + 90_000).toISOString(), windowSeconds: 300 } };
}
async function show(page: Page, state: PresenceViewState) {
  const viewer = page.locator("[data-study-presence-viewer]");
  await expect(viewer).toHaveCount(1);
  await expect.poll(async () => {
    await page.evaluate(value => window.dispatchEvent(new CustomEvent("study-presence-state", { detail: value })), state);
    return viewer.getAttribute("aria-label");
  }).toBe(state.mode === "measured" ? "今学んでいる仲間" : "学習のご案内");
}
async function expectBounded(page: Page) {
  const viewer = page.locator("[data-study-presence-viewer]");
  await expect(viewer).toHaveAttribute("aria-live", "off");
  expect(await viewer.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}
async function expectGuidance(page: Page, stale: boolean) {
  const guidance = page.getByRole("region", { name: "学習のご案内" });
  await expect(guidance.locator(".study-room-state")).toBeVisible();
  await expect(guidance.locator(".study-room-state")).toContainText(fallbackLabel);
  await expect(guidance.getByRole("link", { name: "資格から問題を探す", exact: true })).toHaveAttribute("href", "#home-directory-title");
  const suggestions = guidance.locator(".study-room-guidance li a");
  await expect(suggestions).toHaveCount(6);
  for (const link of await suggestions.all()) await expect(link).toHaveAttribute("href", /^\/(?!\/)/);
  await expect(guidance.getByRole("link")).toHaveCount(7);
  await expect(guidance.getByText("学習状況の更新を待っています。", { exact: true })).toHaveCount(stale ? 1 : 0);
  await expect(guidance.getByRole("list", { name: "資格別の学習人数" })).toHaveCount(0);
  await expect(guidance.locator("time")).toHaveCount(0);
  await expect(guidance.getByText(/人が.*を学習しました|学習人数は0人|直近2分|全\d+人|この部屋.*人/)).toHaveCount(0);
  await expect(guidance.getByRole("navigation", { name: "自習室の部屋を選ぶ" })).toHaveCount(0);
  await expectBounded(page);
}
test("qualification presence is compact on desktop and mobile and distinguishes zero/failure", async ({ page }) => {
  await page.clock.install();
  await page.goto("/");
  await expectGuidance(page, false);
  const data = { count: 4, exams: [{ exam: "fe", count: 3 }, { exam: "denko2", count: 1 }] };
  for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 800 });
    const fresh = await measured(page, data);
    await show(page, fresh);
    const region = page.getByRole("region", { name: "今学んでいる仲間" });
    await expect(region.getByRole("list", { name: "資格別の学習人数" }).getByRole("listitem")).toHaveText([
      "直近5分に3人が基本情報技術者を学習しました。", "直近5分に1人が第二種電気工事士を学習しました。",
    ]);
    await expect(region.locator(".study-room-total")).toHaveText("4人");
    await expect(region.locator("time")).toHaveAttribute("datetime", fresh.snapshot.measuredAt);
    await expect(region.getByRole("button", { name: /チワワ（集計人数のイメージ）/ })).toHaveCount(4);
    await expect(region.getByText("直近5分の学習状況・同じブラウザは1人", { exact: true })).toBeVisible();
    await expect(region.getByText(fallbackLabel, { exact: true })).toHaveCount(0);
    await expect(region.getByText(/直近2分/)).toHaveCount(0);
    await expectBounded(page);

    await show(page, await measured(page, { count: 0, exams: [] }));
    await expect(region.getByText("直近5分の学習人数は0人です。", { exact: true })).toBeVisible();
    await expect(region.locator(".study-room-total")).toHaveText("0人");
    await expect(region.getByRole("button", { name: /チワワ/ })).toHaveCount(0);
    await expect(region.getByText(fallbackLabel, { exact: true })).toHaveCount(0);
    await expect(region.getByRole("link", { name: "資格から問題を探す", exact: true })).toBeVisible();
    await expect(region.getByRole("link")).toHaveCount(7);
    await expectBounded(page);

    await show(page, { mode: "stale", snapshot: null, previous: fresh.snapshot, reason: "unavailable" });
    await expectGuidance(page, true);
    await show(page, { mode: "promotion", snapshot: null, previous: null, reason: "unavailable" });
    await expectGuidance(page, false);
  }

  // Replaying cached data retains its original deadline rather than refreshing it.
  const cached = await measured(page, data);
  await show(page, cached);
  await page.clock.fastForward(45_000);
  await show(page, cached);
  await expect(page.locator("[data-study-presence-viewer] time")).toHaveAttribute("datetime", cached.snapshot.measuredAt);
  await page.clock.fastForward(45_001);
  await expectGuidance(page, true);
});
test("many qualifications stay within a keyboard-scrollable small list", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 }); await page.goto("/");
  const codes = ["ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au", "denko2", "denken3"];
  await show(page, await measured(page, { count: codes.length, exams: codes.map(exam => ({ exam, count: 1 })) }));
  const region = page.getByRole("region", { name: "今学んでいる仲間" });
  const list = page.getByRole("list", { name: "資格別の学習人数" });
  await expect(list.getByRole("listitem")).toHaveCount(codes.length);
  await expect(region.locator(".study-room-total")).toHaveText("15人");
  expect((await list.boundingBox())?.height).toBeLessThanOrEqual(220);
  await expect(list).toHaveAttribute("tabindex", "0");
  expect(await list.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
  expect(await list.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  await list.focus();
  await expect(list).toBeFocused();
  await page.keyboard.press("End");
  await expect.poll(() => list.evaluate(el => el.scrollTop)).toBeGreaterThan(0);
  await page.keyboard.press("Home");
  await expect.poll(() => list.evaluate(el => el.scrollTop)).toBe(0);

  const seats = region.getByRole("button", { name: /チワワ（集計人数のイメージ）/ });
  const rooms = region.getByRole("navigation", { name: "自習室の部屋を選ぶ" });
  await expect(seats).toHaveCount(12);
  await expect(rooms.getByRole("button", { name: "前の部屋" })).toBeDisabled();
  await rooms.getByRole("button", { name: "次の部屋" }).focus();
  await page.keyboard.press("Enter");
  await expect(rooms.getByText("部屋 2 / 2", { exact: true })).toBeVisible();
  await expect(seats).toHaveCount(3);
  await expect(rooms.getByRole("button", { name: "次の部屋" })).toBeDisabled();
  await rooms.getByRole("button", { name: "前の部屋" }).focus();
  await page.keyboard.press("Enter");
  await expect(seats).toHaveCount(12);

  const seat = seats.first();
  await seat.focus();
  await page.keyboard.press("Enter");
  await expect(seat).toHaveAttribute("aria-pressed", "true");
  await page.keyboard.press("Enter");
  await expect(seat).toHaveAttribute("aria-pressed", "false");
  await region.getByRole("button", { name: "動きを止める" }).click();
  await expect(region.getByRole("button", { name: "動きを再開" })).toHaveAttribute("aria-pressed", "true");
  expect(await region.locator(".study-room-scene .study-mascot").evaluateAll(elements => elements.every(el => getComputedStyle(el).animationName === "none"))).toBe(true);
  await region.getByRole("button", { name: "動きを再開" }).click();
  await expect(region.getByRole("button", { name: "動きを止める" })).toHaveAttribute("aria-pressed", "false");
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await region.locator(".study-room-scene .study-mascot").evaluateAll(elements => elements.every(el => getComputedStyle(el).animationName === "none"))).toBe(true);
  await expectBounded(page);
});
test("a loaded quiz publishes only its real question qualification and automation sends no heartbeat", async ({ page }) => {
  let heartbeats = 0;
  page.on("request", request => { if (request.url().includes("/api/stats/study-presence") && request.method() === "POST") heartbeats++; });
  await page.goto("/quiz?mode=random&exam=fe");
  await expect(page.locator('[data-study-presence-exam="fe"]')).toBeVisible();
  expect(heartbeats).toBe(0);
});
