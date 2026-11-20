import { expect, test, type Page } from "@playwright/test";
import type { StudyPresenceSnapshot } from "../../lib/study-presence";

const evidence = process.env.STUDY_ROOM_EVIDENCE_DIR ?? "test-results/study-room";
test.use({ serviceWorkers: "block", reducedMotion: "reduce" });
test.beforeEach(async ({ page }) => {
  await page.route("**/api/auth/session", route => route.fulfill({ json: {} }));
  await page.route("**/api/stats/study-presence", route => route.fulfill({ status: 503,
    json: { status: "unavailable", count: null, total: null, exams: null, measuredAt: null,
      validUntil: null, windowSeconds: 300, reason: "unavailable", retryAfterSeconds: 90 } }));
  await page.addInitScript(() => sessionStorage.setItem("study-room-mascot-visit:v1", "2"));
});

// Synthetic UI fixtures never record a learner, heartbeat, or production account.
async function show(page: Page, snapshot: StudyPresenceSnapshot) {
  await expect.poll(async () => {
    await page.evaluate(snapshot => {
      const now = Date.now();
      window.dispatchEvent(new CustomEvent("study-presence-state", { detail: { mode: "measured", previous: null,
        snapshot: { ...snapshot, status: "measured", total: snapshot.count, measuredAt: new Date(now).toISOString(),
          validUntil: new Date(now + 90_000).toISOString(), windowSeconds: 300 } } }));
    }, snapshot);
    // A sample sent before hydration is ignored. Keep polling so it can be
    // delivered after subscription instead of waiting on a still-absent label.
    return page.getByTestId("study-room-total").textContent({ timeout: 200 }).catch(() => "");
  }).toBe(`いま${snapshot.count}人`);
}

for (const [count, stage, name] of [[1, 0, "one"], [5, 0, "small"], [12, 1, "classroom"], [24, 2, "wide"], [48, 3, "large"], [120, 4, "hall"], [130, 5, "overflow"]] as const) {
  test(`${count} learners have matching chihuahuas and no horizontal scroll at 390px`, async ({ page }) => {
    const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/study-room");
    await show(page, { count, exams: [{ exam: "ip", count }] });
    const scene = page.getByTestId("study-room-scene");
    if (count === 12) {
      const action = await page.getByRole("link", { name: "席について解く" }).boundingBox();
      const nav = await page.locator(".mobile-bottom-nav").boundingBox();
      expect(action!.height).toBeGreaterThanOrEqual(44);
      expect(action!.y + action!.height).toBeLessThanOrEqual(nav!.y);
    }
    await expect(scene).toHaveAttribute("data-stage", String(stage));
    await expect(scene.locator(".study-mascot")).toHaveCount(count);
    await expect(page.getByTestId("study-room-seat")).toHaveCount(count);
    await expect(page.getByText(/^\+/)).toHaveCount(0);
    await scene.scrollIntoViewIfNeeded();
    await expect.poll(() => scene.locator(".study-mascot img").evaluateAll(images =>
      images.every(image => (image as HTMLImageElement).naturalWidth > 0),
    )).toBe(true);
    const geometry = await scene.evaluate(element => {
      const box = element.getBoundingClientRect();
      const seats = [...element.querySelectorAll('[data-testid="study-room-seat"]')].map(seat => seat.getBoundingClientRect());
      return { fits: document.documentElement.scrollWidth <= innerWidth,
        seatsFit: seats.every(seat => seat.left >= box.left && seat.right <= box.right + 1 && seat.top >= box.top && seat.bottom <= box.bottom + 1),
        minSeatWidth: Math.min(...seats.map(seat => seat.width)),
        minSeatHeight: Math.min(...seats.map(seat => seat.height)) };
    });
    expect(geometry.fits).toBe(true);
    expect(geometry.seatsFit).toBe(true);
    if (count <= 24) {
      expect(geometry.minSeatWidth).toBeGreaterThanOrEqual(44);
      expect(geometry.minSeatHeight).toBeGreaterThanOrEqual(44);
    }
    const seat = scene.getByRole("button", { name: /のチワワを見る$/ }).first();
    await seat.press("Enter");
    await expect(seat).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByTestId("study-room-inspected")).toContainText("ITパスポート");
    await seat.press("Enter");
    await expect(page.getByTestId("study-room-inspected")).toHaveCount(0);
    await scene.screenshot({ path: `${evidence}/${name}-390.png` });
    if (count === 5) await page.locator("#study-room").screenshot({ path: `${evidence}/room-390.png` });
    expect(errors).toEqual([]);
  });
}


test("the hall reuses images and only marks seats active while the scene is in view", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 430 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/study-room");
  await show(page, { count: 60, exams: [{ exam: "ip", count: 60 }] });
  const scene = page.getByTestId("study-room-scene");
  const seat = scene.getByTestId("study-room-seat").first();
  await seat.scrollIntoViewIfNeeded();
  await expect(seat).toHaveAttribute("data-animate", "true");
  const artCount = await scene.locator(".study-mascot img").evaluateAll(images =>
    new Set(images.map(image => image.getAttribute("src"))).size,
  );
  expect(artCount).toBeGreaterThan(0);
  expect(artCount).toBeLessThanOrEqual(11);
  await page.locator("footer summary").filter({ hasText: /^サイトマップ・運営情報$/ }).click();
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "instant" }));
  await expect(scene).not.toBeInViewport();
  await expect(seat).toHaveAttribute("data-animate", "false");
  await seat.scrollIntoViewIfNeeded();
  await expect(seat).toHaveAttribute("data-animate", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(seat.locator(".study-mascot")).toHaveCSS("animation-name", "none");
  await page.setViewportSize({ width: 1280, height: 900 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByTestId("study-room-scene").screenshot({ path: `${evidence}/hall-1280.png` });
  await page.locator("#study-room").screenshot({ path: `${evidence}/room-1280.png` });
});

test("unavailable data never creates dogs and automation sends no heartbeat", async ({ page }) => {
  let heartbeats = 0;
  page.on("request", request => { if (request.url().includes("/api/stats/study-presence") && request.method() === "POST") heartbeats++; });
  await page.goto("/study-room");
  await expect(page.getByRole("link", { name: "席について解く" })).toBeVisible();
  await expect(page.getByTestId("study-room-seat")).toHaveCount(0);
  await expect(page.getByTestId("study-room-total")).toHaveCount(0);
  await show(page, { count: 0, exams: [] });
  await expect(page.getByTestId("study-room-total")).toHaveText("いま0人");
  await page.goto("/quiz?mode=random&exam=fe");
  await expect(page.locator('[data-study-presence-exam="fe"]')).toBeVisible();
  expect(heartbeats).toBe(0);
});
