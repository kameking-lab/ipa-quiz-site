import { expect, test, type Page } from "@playwright/test";
import { LS_KEYS } from "../../lib/storage/keys";
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

for (const [count, stage, name] of [[1, 0, "one"], [5, 0, "small"], [12, 1, "classroom"], [24, 2, "wide"], [48, 3, "large"], [120, 4, "hall"], [130, 4, "overflow"]] as const) {
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
    await expect(scene.locator(".study-mascot")).toHaveCount(Math.min(count, 120));
    await expect(page.getByTestId("study-room-seat")).toHaveCount(Math.min(count, 120));
    if (count > 120) await expect(page.getByLabel("ほか10人が勉強中")).toHaveText("+10");
    else await expect(page.getByText(/^\+/)).toHaveCount(0);
    // Visit every row so native lazy images can be decoded before the evidence capture.
    for (const image of await scene.locator(".study-mascot img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      expect(await image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBe(await image.getAttribute("src") === "/images/home/room-chihuahuas/home-cream-sheet.png" ? 1536 : 256);
    }
    const geometry = await scene.evaluate(element => {
      const box = element.getBoundingClientRect();
      const seats = [...element.querySelectorAll('[data-testid="study-room-seat"]')].map(seat => seat.getBoundingClientRect());
      return { fits: document.documentElement.scrollWidth <= innerWidth,
        seatsFit: seats.every(seat => seat.left >= box.left && seat.right <= box.right + 1 && seat.top >= box.top && seat.bottom <= box.bottom + 1),
        targets: seats.every(seat => seat.width >= 44 && seat.height >= 44) };
    });
    expect(geometry).toEqual({ fits: true, seatsFit: true, targets: true });
    await scene.screenshot({ path: `${evidence}/${name}-390.png` });
    if (count === 5) await page.locator("#study-room").screenshot({ path: `${evidence}/room-390.png` });
    expect(errors).toEqual([]);
  });
}

test("same qualification has exactly three dogs, cheers are throttled, and the only action opens learning", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(key => localStorage.setItem(key, JSON.stringify({ exam: "fe", year: 2023, season: "spring", session: "am", qNumber: 1, answeredAt: Date.now() })), LS_KEYS.lastQuestion);
  await page.goto("/study-room");
  await show(page, { count: 25, exams: [{ exam: "ip", count: 22 }, { exam: "fe", count: 3 }] });
  await page.getByRole("button", { name: "同じ資格", exact: true }).click();
  await expect(page.getByTestId("study-room-total")).toHaveText("いま3人");
  await expect(page.getByTestId("study-room-scene").locator(".study-mascot")).toHaveCount(3);
  const seat = page.getByRole("button", { name: /基本情報技術者のチワワを応援/ }).first();
  await seat.click(); await expect(page.getByLabel("応援", { exact: true })).toBeVisible();
  await expect(page.getByLabel("応援", { exact: true })).toHaveCount(0);
  await seat.click(); await expect(page.getByLabel("応援", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "みんな", exact: true }).click();
  await expect(page.getByTestId("study-room-seat")).toHaveCount(25);
  await page.getByRole("link", { name: "席について解く" }).click();
  await expect(page).toHaveURL(/\/quiz\?mode=random&exam=fe/);
  await expect(page.locator('[data-study-presence-exam="fe"]')).toBeVisible();
});

test("a tall hall reuses images and rests offscreen seats and reduced-motion images", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const requests: string[] = [];
  page.on("request", request => { if (request.url().includes("/study-room-mascots/")) requests.push(request.url()); });
  await page.goto("/study-room");
  await show(page, { count: 60, exams: [{ exam: "ip", count: 60 }] });
  const seats = page.getByTestId("study-room-seat");
  // Scattered DOM order has no spatial meaning. Exercise the two horizontal extremes.
  const extremes = await seats.evaluateAll(elements => {
    const sorted = elements.toSorted((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);
    return [sorted[0].getAttribute("data-seat-key"), sorted.at(-1)!.getAttribute("data-seat-key")];
  });
  const left = page.locator(`[data-seat-key="${extremes[0]}"]`), right = page.locator(`[data-seat-key="${extremes[1]}"]`);
  await left.scrollIntoViewIfNeeded();
  await expect(left).toHaveAttribute("data-animate", "true");
  await expect(right).toHaveAttribute("data-animate", "false");
  await expect(right.locator(".study-mascot")).toHaveCSS("animation-name", "none");
  await right.scrollIntoViewIfNeeded();
  await expect(left).toHaveAttribute("data-animate", "false");
  await expect(right).toHaveAttribute("data-animate", "true");
  expect(new Set(requests).size).toBeLessThanOrEqual(1); // one reused qualification play image, plus the shared ar-3 sheet
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(right.locator(".study-mascot")).toHaveCSS("animation-name", "none");
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
