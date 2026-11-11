import { expect, test, type Page } from "@playwright/test";
import type { PresenceViewState } from "../../lib/study-presence-contract";
import type { StudyPresenceSnapshot } from "../../lib/study-presence";

// Explicit synthetic UI fixtures: no heartbeat or production learner is recorded.
type MeasuredState = Extract<PresenceViewState, { mode: "measured" }>;
test.use({ serviceWorkers: "block" });
test.beforeEach(async ({ page }) => {
  await page.route("**/api/stats/study-presence", route => route.fulfill({
    status: 503,
    json: { status: "unavailable", count: null, total: null, exams: null, measuredAt: null,
      validUntil: null, windowSeconds: 300, reason: "unavailable", retryAfterSeconds: 90 },
  }));
});

test("VIS3C qualification mascots stay fixed, bounded and lazy on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  // Studying seats rotate through idle moments over time; reduced motion keeps the room still,
  // so this test pins that re-renders, refreshes and clicks never swap a picture.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => sessionStorage.setItem("study-room-mascot-visit:v1", "0"));
  const requested = new Set<string>();
  let atlasRequests = 0;
  page.on("request", request => {
    const pathname = new URL(request.url()).pathname;
    if (pathname.endsWith("/study-mascots-atlas.webp")) atlasRequests++;
    if (pathname.includes("/study-room-mascots/")) requested.add(pathname);
  });
  await page.goto("/");
  const state = await measured(page, { count: 12, exams: ["ip", "ap", "civil2", "fp3", "takken", "yakuzaishi"].map(exam => ({ exam, count: 2 })) });
  await show(page, state);
  const scene = page.locator(".study-room-scene");
  await scene.scrollIntoViewIfNeeded();
  const images = scene.locator("img");
  await expect(images).toHaveCount(12);
  const stable = () => images.evaluateAll(elements => elements.map(el => ({ src: el.getAttribute("src"), alt: el.getAttribute("alt"), direction: el.parentElement?.getAttribute("data-mirrored") })));
  const initial = await stable();
  for (const image of await images.all()) {
    await expect(image).toHaveAttribute("loading", "lazy");
    await expect(image).toHaveAttribute("decoding", "async");
    await expect(image).toHaveAttribute("alt", /のチワワ（(?:勉強中|あるある：.+|ひと休み：.+)）/);
    // Its own seat pair, or an idle moment of the same character.
    await expect(image).toHaveAttribute("src", /\/(?:(?:ip|ap|civil2|fp3|takken|pharmacy)-(?:study|break)|idle\/(?:ip|ap|civil2|fp3|takken|yakuzaishi)-[a-z]+)\.webp$/);
    await expect(image).toHaveCSS("background-image", "none");
  }
  expect(await scene.locator('[data-mascot-state="break"]').count()).toBeGreaterThanOrEqual(1);
  expect(await scene.locator('[data-mascot-state="break"]').count()).toBeLessThanOrEqual(2);
  await expect(scene.locator(".study-room-away")).toHaveCount(0);
  expect(initial.some(item => item.direction === "true")).toBe(true);
  expect(initial.some(item => item.direction === "false")).toBe(true);
  // Scroll the room itself so every potentially visible tile is decoded.
  await page.locator(".study-room-scroll").evaluate(el => { el.scrollLeft = el.scrollWidth; });
  await expect.poll(() => images.evaluateAll(elements => elements.every(el => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth === 256))).toBe(true);
  await page.locator(".study-room-scroll").evaluate(el => { el.scrollLeft = 0; });
  requested.clear();
  await show(page, { ...state, snapshot: { ...state.snapshot } });
  await page.getByRole("group", { name: "自習室の席を選ぶ" }).getByRole("button").first().click();
  expect(await stable()).toEqual(initial);
  expect(requested.size).toBe(0);
  expect(atlasRequests).toBe(0);
  await expectBounded(page);
  await page.locator("#study-room").screenshot({ path: "test-results/vis3c-mobile-390.png" });
  await page.setViewportSize({ width: 320, height: 800 });
  await expectBounded(page);
  expect(await stable()).toEqual(initial);
  await page.locator("#study-room").screenshot({ path: "test-results/vis3c-mobile-320.png" });
  await page.reload();
  await show(page, state);
  expect(await stable()).toEqual(initial);
  requested.clear();
  await show(page, await measured(page, { count: 0, exams: [] }));
  await expect(scene.locator("img")).toHaveCount(0);
  expect(requested.size).toBe(0);
});

async function measured(page: Page, value: StudyPresenceSnapshot): Promise<MeasuredState> {
  const now = await page.evaluate(() => Date.now());
  return { mode: "measured", previous: null, snapshot: { ...value, status: "measured", total: value.count,
    measuredAt: new Date(now).toISOString(), validUntil: new Date(now + 90_000).toISOString(), windowSeconds: 300 } };
}

test("VIS3E away dog occupies clear floor with an empty desk, stays fixed and respects reduced motion", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => sessionStorage.setItem("study-room-mascot-visit:v1", "2"));
  await page.goto("/");
  const state = await measured(page, { count: 12, exams: [{ exam: "ip", count: 12 }] });
  await show(page, state);
  const scene = page.locator(".study-room-scene");
  await scene.scrollIntoViewIfNeeded();
  const away = scene.locator(".study-room-away");
  const vacant = scene.locator('[data-mascot-state="vacant"]');
  await expect(away).toHaveCount(1);
  await expect(vacant).toHaveCount(1);
  await expect(away).toHaveAttribute("data-origin-seat", "0");
  await expect(away.locator("img")).toHaveAttribute("alt", /席を立って遊んでいる/);
  await expect(vacant.locator("img")).toHaveAttribute("alt", /空席（椅子と机、開いたままの本）/);
  await expect(scene.locator(".study-mascot")).toHaveCount(12);
  await expect(scene.locator("img")).toHaveCount(13);
  const stable = () => scene.locator("img").evaluateAll(images => images.map(img => ({ src: img.getAttribute("src"), alt: img.getAttribute("alt"), mirrored: img.parentElement?.getAttribute("data-mirrored") })));
  const initial = await stable();
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    await expectBounded(page);
    await page.locator(".study-room-scroll").evaluate(el => { el.scrollLeft = el.scrollWidth; });
    await expect.poll(() => scene.locator("img").evaluateAll(images => images.every(img => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth === 256))).toBe(true);
    // The playing dog is drawn at front-row size: its feet stand on the floor in front of every
    // desk, it is layered in front of them, and its head never reaches the back rows.
    const geometry = await scene.evaluate(el => {
      const dog = el.querySelector(".study-room-away")!;
      const box = dog.getBoundingClientRect();
      const desks = [...el.querySelectorAll(".study-room-seat")];
      const front = desks.filter(desk => /(?:^|\s)study-seat-(?:1|2)(?:\s|$)/.test(desk.className)).map(desk => desk.getBoundingClientRect());
      return { top: box.top, bottom: box.bottom, sceneBottom: el.getBoundingClientRect().bottom,
        deskBottom: Math.max(...desks.map(desk => desk.getBoundingClientRect().bottom)),
        frontTop: Math.min(...front.map(desk => desk.top)),
        dogZ: Number(getComputedStyle(dog).zIndex), deskZ: Math.max(...desks.map(desk => Number(getComputedStyle(desk).zIndex) || 0)) };
    });
    expect(geometry.bottom).toBeGreaterThan(geometry.deskBottom);
    expect(geometry.bottom).toBeLessThan(geometry.sceneBottom);
    expect(geometry.top).toBeGreaterThan(geometry.frontTop);
    expect(geometry.dogZ).toBeGreaterThan(geometry.deskZ);
    expect(await stable()).toEqual(initial);
    await page.locator(".study-room-scroll").evaluate(el => { el.scrollLeft = 0; });
    await page.locator("#study-room").screenshot({ path: `test-results/vis3e-mobile-${width}.png` });
    await scene.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `test-results/vis3e-viewport-${width}.png` });
  }
  await page.getByRole("group", { name: "自習室の席を選ぶ" }).getByRole("button").first().click();
  await expect(away).toHaveAttribute("data-selected", "true");
  await scene.screenshot({ path: "test-results/vis3e-away-selected.png" });
  await show(page, { ...state, snapshot: { ...state.snapshot } });
  expect(await stable()).toEqual(initial);
  await page.reload();
  await show(page, state);
  expect(await stable()).toEqual(initial);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(away.locator("img")).toHaveCSS("animation-name", "none");
  await show(page, await measured(page, { count: 49, exams: [{ exam: "ip", count: 49 }] }));
  await expect(away).toHaveCount(1);
  expect(await stable()).toEqual(initial);
  // A quiet room (1-3 learners) shows everyone studying: no playing dog, no empty desk.
  await show(page, await measured(page, { count: 1, exams: [{ exam: "ip", count: 1 }] }));
  await expect(away).toHaveCount(0);
  await expect(vacant).toHaveCount(0);
  await expect(scene.locator('[data-mascot-state="study"] img')).toHaveAttribute("alt", "ITパスポートのチワワ（勉強中）");
  await show(page, await measured(page, { count: 4, exams: [{ exam: "ip", count: 4 }] }));
  await expect(away).toHaveCount(1);
  await expect(vacant).toHaveCount(1);
  await show(page, await measured(page, { count: 0, exams: [] }));
  await expect(scene.locator("img")).toHaveCount(0);
});
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
  // Without a measurement, qualifications are discovered through the seat selector.
  // The directory list is shown only after a real measurement with zero learners.
  await expect(guidance.locator(".study-room-summary")).toHaveCount(0);
  await expect(guidance.getByRole("link", { name: "ほかの資格を探す", exact: true })).toHaveCount(0);
  const seats = guidance.getByRole("group", { name: "自習室の席を選ぶ", exact: true }).getByRole("button");
  await expect(seats).toHaveCount(6);
  await seats.first().click();
  const selection = guidance.locator("#study-room-selection");
  await expect(selection.getByRole("heading")).toBeVisible();
  await expect(selection.getByRole("link", { name: /の問題を見る$/ })).toHaveAttribute("href", /^\/(?!\/)/);
  await selection.getByRole("button", { name: "選択を戻す", exact: true }).click();
  await expect(seats.first()).toBeFocused();
  await expect(seats.first()).toHaveAttribute("aria-pressed", "false");
  await expect(selection.getByRole("link")).toHaveCount(0);
  await expect(guidance.getByRole("link", { name: "資格を選んで1問始める", exact: true })).toHaveCount(1);
  for (const link of await guidance.getByRole("link", { name: "資格を選んで1問始める", exact: true }).all()) await expect(link).toHaveAttribute("href", "/#choose-qualification");
  await expect(guidance.getByRole("link")).toHaveCount(1);
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
      "基本情報技術者 3人", "第二種電気工事士 1人",
    ]);
    await expect(region.locator(".study-room-total")).toHaveText("4人");
    await expect(region.locator("time")).toHaveAttribute("datetime", fresh.snapshot.measuredAt);
    const seats = region.getByRole("group", { name: "自習室の席を選ぶ", exact: true }).getByRole("button");
    await expect(seats).toHaveCount(4);
    for (const [index, name] of ["基本情報技術者", "基本情報技術者", "基本情報技術者", "第二種電気工事士"].entries()) {
      await expect(seats.nth(index)).toHaveAccessibleName(`${index + 1} ${name}`);
      await expect(seats.nth(index)).toHaveAttribute("aria-controls", "study-room-selection");
    }
    const scene = region.getByRole("group", { name: "前回取得時点の集計に基づくチワワの自習室", exact: true });
    await expect(scene.getByRole("button")).toHaveCount(0);
    await expect(scene.locator('.study-room-seat:has(img[alt])')).toHaveCount(4);
    await expect(region.getByRole("link", { name: "ほかの資格を探す", exact: true })).toHaveCount(0);
    await expect(region.getByText(/直近2分/)).toHaveCount(0);
    await expectBounded(page);

    await show(page, await measured(page, { count: 0, exams: [] }));
    await expect(region.locator(".study-room-total")).toHaveText("0人");
    const emptyRoom = region.getByRole("group", { name: "前回取得時点の集計に基づくチワワの自習室", exact: true });
    await expect(emptyRoom).toBeVisible();
    await expect(emptyRoom.getByRole("button")).toHaveCount(0);
    await expect(emptyRoom.locator(".study-mascot")).toHaveCount(0);
    await expect(region.getByRole("group", { name: "自習室の席を選ぶ", exact: true })).toHaveCount(0);
    await expect(region.getByRole("region", { name: "あなたの席", exact: true }).getByRole("button", { name: "チワワのひと休みを閉じる", exact: true })).toBeVisible();
    await expect(region.getByRole("link", { name: "ほかの資格を探す", exact: true })).toHaveCount(0);
    await expect(region.getByRole("link", { name: "資格から問題を探す", exact: true })).toBeVisible();
    await expect(region.getByRole("link", { name: "資格から問題を探す", exact: true })).toHaveAttribute("href", "#home-directory-title");
    await expect(page.locator("#home-directory-title")).toHaveCount(1);
    const suggestions = region.locator(".study-room-guidance li a");
    await expect(suggestions).toHaveCount(6);
    for (const link of await suggestions.all()) await expect(link).toHaveAttribute("href", /^\/(?!\/)/);
    await expect(region.getByRole("link", { name: "資格を選んで1問始める", exact: true })).toHaveCount(1);
    await expect(region.getByRole("link")).toHaveCount(8);
    await expectBounded(page);

    await show(page, { mode: "stale", snapshot: null, previous: fresh.snapshot, reason: "unavailable" });
    await expect(region.locator(".study-room-total")).toHaveText("4人");
    await expect(region.locator("time")).toHaveAttribute("datetime", fresh.snapshot.measuredAt);
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
    `${row.name} 1人`));
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
  await expect(scene.locator('.study-room-seat:has(img[alt])')).toHaveCount(12);
  await expect(scene).toHaveAttribute("data-stage", "2");
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
  await expect(scene).toHaveAttribute("data-motion-visible", "true", { timeout: 10_000 }).catch(async error => {
    // Record why the room thinks it is off screen (CI-only failure investigation).
    console.log("study-room visibility", JSON.stringify(await scene.evaluate(el => {
      const r = el.getBoundingClientRect(), scroll = el.closest(".study-room-scroll")!.getBoundingClientRect();
      return { hidden: document.hidden, visibility: document.visibilityState, inner: [innerWidth, innerHeight], scene: [r.left, r.top, r.width, r.height], scroll: [scroll.left, scroll.top, scroll.width, scroll.height], scrollY };
    })));
    throw error;
  });
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
