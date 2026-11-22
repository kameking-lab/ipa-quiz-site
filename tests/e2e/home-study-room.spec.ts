import { expect, test, type Locator, type Page } from "@playwright/test";
import { createPacePlan } from "../../lib/study-plan/pace";
import { LS_KEYS } from "../../lib/storage/keys";
import type { StudyPresenceTodayCount } from "../../lib/study-presence";

const screenshotDir = process.env.SR_SCREENSHOTS;
const measuredAt = new Date("2026-11-21T08:50:00+09:00");
const catalog = Array.from({ length: 30 }, (_, i) => ({ id: `ip-2026h-am-q${i + 1}`, exam: "ip", year: 2026, season: "spring", session: "am", qNumber: i + 1 }));
const fixtures: StudyPresenceTodayCount[][] = [
  [],
  [{ exam: "ip", count: 2, activeCount: 1 }, { exam: "fe", count: 1, activeCount: 1 }],
  [{ exam: "ip", count: 5, activeCount: 0 }],
  [{ exam: "civil1", count: 10, activeCount: 2 }, { exam: "civil2", count: 2, activeCount: 1 }],
  ([["civil1", 15, 4], ["civil2", 10, 2], ["ip", 5, 1], ["fp2", 5, 0], ["sc", 4, 0], ["fe", 3, 0], ["ap", 2, 0], ["fp3", 1, 0]] as const)
    .map(([exam, count, activeCount]) => ({ exam, count, activeCount })),
];

const homeStates = ["new", "returning", "planned", "post-exam"] as const;
type State = typeof homeStates[number] | "room";

test.use({ viewport: { width: 390, height: 844 }, serviceWorkers: "block", reducedMotion: "reduce", locale: "ja-JP",
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36" });

async function setup(page: Page, state: State, exams: StudyPresenceTodayCount[]) {
  const count = exams.reduce((n, row) => n + row.count, 0);
  const activeCount = exams.reduce((n, row) => n + row.activeCount, 0);
  const plan = state === "planned" || state === "post-exam" ? createPacePlan({ id: "sr-1", exam: "ip", sessionId: null,
    examDate: state === "planned" ? "2026-11-30" : "2026-11-20", startDate: "2026-11-10" }, catalog, "2026-11-10T00:00:00+09:00") : null;
  await page.clock.setFixedTime(measuredAt);
  await page.addInitScript(({ keys, plan, returning, answeredAt }) => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
    if (plan) localStorage.setItem(keys.pacePlans, JSON.stringify([plan]));
    if (returning) localStorage.setItem(keys.lastQuestion, JSON.stringify({ exam: "ip", year: 2026, season: "spring", session: "am", qNumber: 1, answeredAt }));
  }, { keys: LS_KEYS, plan, returning: state === "returning", answeredAt: measuredAt.getTime() - 3_600_000 });
  await page.route("**/api/auth/session", route => route.fulfill({ json: null }));
  await page.route("**/api/billing/status", route => route.fulfill({ json: { entitled: false } }));
  await page.route("**/api/study-plan/catalog/ip", route => route.fulfill({ json: { questions: catalog } }));
  await page.route("**/api/home/resume?**", route => route.fulfill({ json: { exam: "ip", name: "ITパスポート", href: "/quiz?mode=random&exam=ip", caption: "2026年度 · 問1" } }));
  const presenceRequests: string[] = [];
  await page.route("**/api/stats/study-presence", async route => {
    presenceRequests.push(route.request().method());
    await route.fulfill({ json: { status: "measured", count: activeCount, total: activeCount,
      exams: exams.filter(row => row.activeCount > 0).map(row => ({ exam: row.exam, count: row.activeCount })),
      today: { count, activeCount, exams }, measuredAt: measuredAt.toISOString(),
      validUntil: new Date(measuredAt.getTime() + 90_000).toISOString(), windowSeconds: 300 } });
  });
  return { count, activeCount, presenceRequests };
}

async function capture(page: Page, card: Locator, name: string) {
  await card.scrollIntoViewIfNeeded();
  await card.evaluate(el => {
    const nav = document.querySelector(".mobile-bottom-nav");
    const bottom = (nav?.getBoundingClientRect().top ?? innerHeight) - 8;
    const covered = el.getBoundingClientRect().bottom - bottom;
    if (covered > 0) window.scrollBy({ top: Math.ceil(covered), behavior: "instant" });
    for (const img of el.querySelectorAll("img")) img.loading = "eager";
  });
  await expect.poll(() => card.locator("img").evaluateAll((images: HTMLImageElement[]) =>
    images.length > 0 && images.every(img => img.complete && img.naturalWidth > 0)), { timeout: 15_000 }).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  if (screenshotDir) {
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    await page.screenshot({ path: `${screenshotDir}/${name}-390x844.png`, animations: "disabled", style: "nextjs-portal { display: none !important; }" });
  }
}

for (const state of [...homeStates, "room"] as const) {
  for (const exams of fixtures) {
    const total = exams.reduce((n, row) => n + row.count, 0);
    test(`${state}: ${total} learners at 390px`, async ({ page }) => {
      const { count, activeCount, presenceRequests } = await setup(page, state, exams);
      const home = state !== "room";
      await page.goto(home ? "/" : "/study-room", { waitUntil: "domcontentloaded" });
      const room = page.getByTestId(home ? "home-study-room" : "study-room-scene");
      const attendance = home ? room : page.getByTestId("study-room-total");
      if (home) await expect(page.locator(`[data-home-state="${state}"]`)).toBeVisible();
      if (count > 0) {
        const total = `今日 ${count}人が勉強`;
        const expected = activeCount > 0 ? `${total}（うち${activeCount}人がいま勉強中）` : total;
        await expect(attendance).toContainText(expected);
        if (activeCount === 0) await expect(attendance).not.toContainText("うち");
      }
      await expect(room.getByTestId(home ? "home-study-room-seat" : "study-room-seat")).toHaveCount(Math.min(count, 12));
      await expect(room.locator('[data-studying-now="true"]')).toHaveCount(activeCount);
      if (count === 0) {
        await expect(room.getByText("まだ誰もいません。一番乗りしよう")).toBeVisible();
        if (home) await expect(room).not.toContainText("0人");
        await expect(room.locator('img[src$="/sleep-empty.webp"]')).toHaveCount(1);
      }
      if (home) {
        expect((await room.boundingBox())!.height).toBeLessThanOrEqual(300);
        if (count === 12) {
          const chips = room.getByRole("list", { name: "自習室の資格" }).getByRole("listitem");
          await expect(chips).toHaveText(["1級土木施工管理10人", "2級土木施工管理2人"]);
          await expect(room.locator('[data-exam="civil1"]')).toHaveCount(10);
          await expect(room.locator('[data-exam="civil2"]')).toHaveCount(2);
        }
        if (count === 45) {
          await expect(room.getByText("＋33人")).toBeVisible();
          await expect(room.getByText("ほか2資格")).toBeVisible();
        }
      }
      await capture(page, home ? room : page.locator("#study-room"), `${state}-${count}`);
      if (state === "returning" && count === 12) {
        await room.click();
        await expect(page).toHaveURL(/\/study-room$/);
        await expect(page.getByTestId("study-room-seat")).toHaveCount(12);
      }
      expect(presenceRequests).toEqual(["GET"]);
    });
  }
}

test("long qualification names still fit the mobile home card", async ({ page }) => {
  const exams = ["reito-seko1", "reito-seko2", "reito-seko3", "naiso-carpet1", "cfp-3", "hiseshoku-jokyo1", "ip"]
    .map((exam, index) => ({ exam, count: 8 - index, activeCount: 1 }));
  await setup(page, "new", exams);
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const room = page.getByTestId("home-study-room");
  const chips = room.getByRole("listitem");
  await expect(chips).toHaveCount(7);
  await expect(chips.last()).toHaveText("ほか1資格");
  expect((await room.boundingBox())!.height).toBeLessThanOrEqual(270);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
});

test("the daily room shows 12 of 130 learners, including all three recent answers", async ({ page }) => {
  await setup(page, "room", [{ exam: "civil1", count: 128, activeCount: 1 }, { exam: "civil2", count: 2, activeCount: 2 }]);
  await page.goto("/study-room", { waitUntil: "domcontentloaded" });
  const scene = page.getByTestId("study-room-scene");
  await expect(page.getByTestId("study-room-total")).toContainText(/今日\s*130人/);
  await expect(scene.getByTestId("study-room-seat")).toHaveCount(12);
  await expect(scene.locator('[data-studying-now="true"]')).toHaveCount(3);
  await expect(page.getByText("＋118人", { exact: true })).toBeVisible();
});
