import { expect, test, type Page } from "@playwright/test";
import type { PresenceViewState } from "../../lib/study-presence-contract";
import type { StudyPresenceSnapshot } from "../../lib/study-presence";

// Explicit synthetic UI fixtures: no heartbeat or production learner is recorded.
const fallbackLabel = "資格紹介";
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
async function show(page: Page, state: PresenceViewState, expectedLabel = state.mode === "promotion" ? "学習のご案内" : "前回取得時点の学習状況") {
  const viewer = page.locator("[data-study-presence-viewer]");
  await expect(viewer).toHaveCount(1);
  await expect.poll(async () => {
    await page.evaluate(value => window.dispatchEvent(new CustomEvent("study-presence-state", { detail: value })), state);
    return viewer.getAttribute("aria-label");
  }).toBe(expectedLabel);
}
async function expectBounded(page: Page) {
  const viewer = page.locator("[data-study-presence-viewer]");
  await expect(viewer).toHaveAttribute("aria-live", "off");
  expect(await viewer.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
}
async function expectGuidance(page: Page) {
  const guidance = page.getByRole("region", { name: "学習のご案内" });
  await expect(guidance.getByText(fallbackLabel, { exact: true })).toBeVisible();
  await expect(guidance.getByRole("link", { name: "ほかの資格を探す", exact: true })).toHaveAttribute("href", "#choose-qualification");
  const suggestions = guidance.locator(".study-room-guidance li a");
  await expect(suggestions).toHaveCount(6);
  for (const link of await suggestions.all()) await expect(link).toHaveAttribute("href", /^\/(?!\/)/);
  await expect(guidance.getByRole("link", { name: "資格を選んで1問始める", exact: true })).toHaveCount(2);
  for (const link of await guidance.getByRole("link", { name: "資格を選んで1問始める", exact: true }).all()) await expect(link).toHaveAttribute("href", "/#choose-qualification");
  await expect(guidance.getByRole("link")).toHaveCount(9);
  await expect(guidance.getByText(/実際の学習人数では|利用者個人や実際の行動/)).toHaveCount(0);
  await expect(guidance.getByRole("list", { name: "資格別の学習人数" })).toHaveCount(0);
  await expect(guidance.locator("time")).toHaveCount(0);
  await expect(guidance.getByText(/人が.*を学習しました|学習人数は0人|直近2分|全\d+人|この部屋.*人/)).toHaveCount(0);
  await expect(guidance.getByRole("navigation", { name: "自習室の部屋を選ぶ" })).toHaveCount(0);
  await expectBounded(page);
}
test("qualification presence is compact on desktop and mobile and distinguishes zero/failure", async ({ page }) => {
  await page.clock.install();
  await page.goto("/");
  await expectGuidance(page);
  const data = { count: 4, exams: [{ exam: "fe", count: 3 }, { exam: "denko2", count: 1 }] };
  for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 800 });
    const fresh = await measured(page, data);
    await show(page, fresh);
    const region = page.getByRole("region", { name: "前回取得時点の学習状況" });
    await expect(region.getByRole("list", { name: "資格別の学習人数" }).getByRole("listitem")).toHaveText([
      "前回取得時点の直近5分に3人が基本情報技術者を学習しました。", "前回取得時点の直近5分に1人が第二種電気工事士を学習しました。",
    ]);
    await expect(region.locator(".study-room-total")).toHaveText("4人");
    await expect(region.locator("time")).toHaveAttribute("datetime", fresh.snapshot.measuredAt);
    await expect(region.getByText("学習者数は1時間ごとに取得します。リアルタイム表示ではありません。席と人数は前回取得時点の集計です。", { exact: true })).toBeVisible();
    const seats = region.getByRole("group", { name: "自習室の席を選ぶ", exact: true }).getByRole("button");
    await expect(seats).toHaveCount(4);
    for (const [index, name] of ["基本情報技術者", "基本情報技術者", "基本情報技術者", "第二種電気工事士"].entries()) {
      await expect(seats.nth(index)).toHaveAccessibleName(`${index + 1} ${name}`);
      await expect(seats.nth(index)).toHaveAttribute("aria-controls", "study-room-selection");
    }
    const scene = region.getByRole("group", { name: "前回取得時点の集計に基づくチワワの自習室", exact: true });
    await expect(scene.getByRole("button")).toHaveCount(0);
    await expect(scene.locator('.study-room-seat[aria-hidden="true"]')).toHaveCount(4);
    await expect(region.getByText("同じブラウザは1人として集計", { exact: true })).toBeVisible();
    await expect(region.getByText(fallbackLabel, { exact: true })).toHaveCount(0);
    await expect(region.getByText(/直近2分/)).toHaveCount(0);
    await expectBounded(page);

    await show(page, await measured(page, { count: 0, exams: [] }));
    await expect(region.getByText("前回取得時点の直近5分の学習人数は0人です。", { exact: true })).toBeVisible();
    await expect(region.locator(".study-room-total")).toHaveText("0人");
    const emptyRoom = region.getByRole("group", { name: "前回取得時点の集計に基づくチワワの自習室", exact: true });
    await expect(emptyRoom).toBeVisible();
    await expect(emptyRoom.getByRole("button")).toHaveCount(0);
    await expect(emptyRoom.locator(".study-mascot")).toHaveCount(0);
    await expect(region.getByRole("group", { name: "自習室の席を選ぶ", exact: true })).toHaveCount(0);
    await expect(region.getByRole("region", { name: "チワワと、ひと休み。", exact: true }).getByRole("button", { name: "チワワのひと休みを閉じる", exact: true })).toBeVisible();
    await expect(region.getByText(fallbackLabel, { exact: true })).toHaveCount(0);
    await expect(region.getByRole("link", { name: "資格から問題を探す", exact: true })).toBeVisible();
    await expect(region.getByRole("link", { name: "資格を選んで1問始める", exact: true })).toHaveCount(2);
    await expect(region.getByRole("link")).toHaveCount(9);
    await expectBounded(page);

    await show(page, { mode: "stale", snapshot: null, previous: fresh.snapshot, reason: "unavailable" });
    await expect(region.locator(".study-room-total")).toHaveText("4人");
    await expect(region.locator("time")).toHaveAttribute("datetime", fresh.snapshot.measuredAt);
    await expect(region.getByText("学習者数は1時間ごとに取得します。リアルタイム表示ではありません。席と人数は前回取得時点の集計です。", { exact: true })).toBeVisible();
    await expectBounded(page);
    await show(page, { mode: "promotion", snapshot: null, previous: null, reason: "unavailable" });
    await expectGuidance(page);
  }

  // Replaying a cached sample does not refresh its timestamp; it remains historical after expiry.
  const cached = await measured(page, data);
  await show(page, cached);
  await page.clock.fastForward(45_000);
  await show(page, cached);
  await expect(page.locator("[data-study-presence-viewer] time")).toHaveAttribute("datetime", cached.snapshot.measuredAt);
  await page.clock.fastForward(45_001);
  const historical = page.getByRole("region", { name: "前回取得時点の学習状況" });
  await expect(historical.locator(".study-room-total")).toHaveText("4人");
  await expect(historical.locator("time")).toHaveAttribute("datetime", cached.snapshot.measuredAt);
  await expect(historical.getByText("学習者数は1時間ごとに取得します。リアルタイム表示ではありません。席と人数は前回取得時点の集計です。", { exact: true })).toBeVisible();
  await show(page, { mode: "stale", snapshot: null, previous: cached.snapshot, reason: "expired" });
  await expect(historical.locator("time")).toHaveAttribute("datetime", cached.snapshot.measuredAt);
  await expect(historical.locator(".study-room-total")).toHaveText("4人");
  const invalidPrevious = { ...cached.snapshot, validUntil: new Date(Date.parse(cached.snapshot.measuredAt) + 3_600_000).toISOString() };
  await show(page, { mode: "stale", snapshot: null, previous: invalidPrevious, reason: "unavailable" }, "学習のご案内");
  await expectGuidance(page);
});
test("many qualifications stay within a keyboard-scrollable small list", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 }); await page.goto("/");
  const codes = ["ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au", "denko2", "denken3"];
  // parseStudyPresence orders by count descending, then canonical code in English locale.
  // All fixture counts are one: this explicit oracle must not depend on the unsorted input order.
  const expectedOrder = [
    { exam: "ap", name: "応用情報技術者" },
    { exam: "au", name: "システム監査技術者" },
    { exam: "db", name: "データベーススペシャリスト" },
    { exam: "denken3", name: "電験三種" },
    { exam: "denko2", name: "第二種電気工事士" },
    { exam: "es", name: "エンベデッドシステムスペシャリスト" },
    { exam: "fe", name: "基本情報技術者" },
    { exam: "ip", name: "ITパスポート" },
    { exam: "nw", name: "ネットワークスペシャリスト" },
    { exam: "pm", name: "プロジェクトマネージャ" },
    { exam: "sa", name: "システムアーキテクト" },
    { exam: "sc", name: "情報処理安全確保支援士" },
    { exam: "sg", name: "情報セキュリティマネジメント" },
    { exam: "sm", name: "ITサービスマネージャ" },
    { exam: "st", name: "ITストラテジスト" },
  ];
  expect(expectedOrder.map(row => row.exam).sort()).toEqual([...codes].sort());
  await show(page, await measured(page, { count: codes.length, exams: codes.map(exam => ({ exam, count: 1 })) }));
  const region = page.getByRole("region", { name: "前回取得時点の学習状況" });
  const list = page.getByRole("list", { name: "資格別の学習人数" });
  await expect(list.getByRole("listitem")).toHaveCount(codes.length);
  await expect(list.getByRole("listitem")).toHaveText(expectedOrder.map(row =>
    `前回取得時点の直近5分に1人が${row.name}を学習しました。`));
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

  // The accepted room expands in place. Numbered controls are separate from the decorative scene.
  const scene = region.getByRole("group", { name: "前回取得時点の集計に基づくチワワの自習室", exact: true });
  const seats = region.getByRole("group", { name: "自習室の席を選ぶ", exact: true }).getByRole("button");
  const expectSeatOrder = async () => {
    await expect(seats).toHaveCount(12);
    for (const [index, row] of expectedOrder.slice(0, 12).entries()) {
      await expect(seats.nth(index)).toHaveAccessibleName(`${index + 1} ${row.name}`);
      await expect(seats.nth(index)).toHaveAttribute("aria-controls", "study-room-selection");
    }
  };
  await expectSeatOrder();
  await expect(scene.getByRole("button")).toHaveCount(0);
  await expect(scene.locator('.study-room-seat[aria-hidden="true"]')).toHaveCount(12);
  await expect(scene).toHaveAttribute("data-stage", "2");
  await expect(region.getByText("イラスト 12体・ほか 3人", { exact: true })).toBeVisible();
  await expect(region.getByText("全15人の集計を一部イラストで表示", { exact: true })).toBeVisible();
  await expect(region.getByRole("navigation", { name: "自習室の部屋を選ぶ" })).toHaveCount(0);
  await expect(region.getByRole("button", { name: "次の部屋", exact: true })).toHaveCount(0);
  const scroll = region.getByLabel("広がる自習室。横にスクロールできます", { exact: true });
  expect(await scroll.evaluate(el => el.scrollWidth > el.clientWidth)).toBe(true);
  await scroll.focus();
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => scroll.evaluate(el => el.scrollLeft)).toBeGreaterThan(0);

  const seat = seats.first();
  await seat.focus();
  await page.keyboard.press("Enter");
  await expect(seat).toHaveAttribute("aria-pressed", "true");
  const selectedQualification = region.locator("#study-room-selection").getByRole("heading", { name: expectedOrder[0].name, exact: true });
  await expect(selectedQualification).toBeVisible();
  const refreshed = await measured(page, { count: codes.length, exams: codes.map(exam => ({ exam, count: 1 })) });
  await show(page, { mode: "stale", snapshot: null, previous: refreshed.snapshot, reason: "unavailable" });
  await expectSeatOrder();
  await expect(selectedQualification).toBeVisible();
  await expect(seat).toHaveAttribute("aria-pressed", "true");
  await expect(seat).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(seat).toHaveAttribute("aria-pressed", "false");
  await page.keyboard.press("Enter");
  await expect(seat).toHaveAttribute("aria-pressed", "true");
  await region.getByRole("button", { name: "選択を戻す", exact: true }).click();
  await expect(seat).toBeFocused();
  await expect(seat).toHaveAttribute("aria-pressed", "false");
  // Independent reward controls may exist; the room scene itself has no motion toggle.
  await expect(scene.getByRole("button", { name: /動き/ })).toHaveCount(0);
  await expect(region.getByText("静止表示", { exact: true })).toHaveCount(0);
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-motion-visible", "true");
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
