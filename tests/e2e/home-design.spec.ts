import { expect, test, type Page } from "@playwright/test";
import { createPacePlan, type PacePlan } from "../../lib/study-plan/pace";
import { LS_KEYS } from "../../lib/storage/keys";

// Authentication, dates and answers here are fixtures; never use a real account.
const catalog = Array.from({ length: 200 }, (_, i) => ({ id: `ip-fixture-${i}`, exam: "ip", year: 2026 }));
const plan = () => createPacePlan({ id: "home-design", exam: "ip", sessionId: null,
  startDate: "2026-10-11", examDate: "2027-02-09" }, catalog, "2026-10-11T00:00:00+09:00");

async function fixture(page: Page, state: "guest" | "member" | "paid", saved?: PacePlan) {
  await page.clock.setFixedTime(new Date("2026-11-17T12:00:00+09:00"));
  await page.route("https://**", route => route.abort());
  await page.route("**/api/**", route => {
    const pathname = new URL(route.request().url()).pathname;
    if (pathname === "/api/auth/session") return route.fulfill({ json: state === "guest" ? null : {
      user: { id: "home-design-fixture", name: "テスト会員" }, expires: "2099-01-01T00:00:00Z",
    } });
    if (pathname === "/api/billing/status") return route.fulfill({ json: { entitled: state === "paid" } });
    if (pathname.startsWith("/api/study-plan/catalog/")) return route.fulfill({ json: { questions: saved?.exam === "tsushin1" ? catalog.map(q => ({ ...q, id: "tsushin1-" + q.id, exam: "tsushin1" })) : catalog } });
    return route.fulfill({ json: {} });
  });
  await page.addInitScript(({ keys, state, saved, catalog }) => {
    localStorage.setItem("ipa-quiz:onboarded:v1", "1");
    if (state !== "guest") {
      localStorage.setItem(keys.pacePlans, JSON.stringify([saved]));
      localStorage.setItem(keys.history, JSON.stringify({ entries: catalog.slice(0, 62).map(q => ({
        id: q.id, selected: "ア", correct: true, at: Date.parse("2026-11-16T12:00:00+09:00"),
      })), starredIds: [] }));
    }
  }, { keys: LS_KEYS, state, saved: saved ?? plan(), catalog });
}

for (const width of [390, 1280]) for (const colorScheme of ["light", "dark"] as const) {
  test.describe(`design ${width} ${colorScheme}`, () => {
    test.use({ viewport: { width, height: width === 390 ? 844 : 800 }, colorScheme,
      reducedMotion: "reduce", serviceWorkers: "block" });
    for (const state of ["guest", "member", "paid"] as const) {
      test(`${state}: one primary action fits with the source and navigation`, async ({ page }) => {
        await fixture(page, state);
        await page.goto("/");
        const card = page.getByRole("region", { name: "今日の学習" });
        await expect(card).toHaveAttribute("aria-busy", "false");
        const primary = state === "guest" ? card.getByRole("searchbox", { name: "資格名・略称で検索" })
          : card.getByRole("link", { name: "計画の問題を解く" });
        await expect(primary).toBeInViewport({ ratio: 1 });
        expect(await primary.evaluate(el => el.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
        const input = card.getByRole("searchbox", { name: "資格名・略称で検索" });
        const field = input.locator("..");
        await expect(field).toHaveCSS("border-top-color", colorScheme === "dark" ? "rgb(146, 146, 125)" : "rgb(128, 119, 99)");
        await input.focus();
        await expect(field).toHaveCSS("outline-width", "2px");
        await input.blur();
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(width);
        const source = page.getByRole("link", { name: "著作権・出典", exact: true });
        await source.scrollIntoViewIfNeeded();
        await expect(source).toBeInViewport({ ratio: 1 });
        const sourceBox = await source.boundingBox();
        expect(sourceBox!.height).toBeGreaterThanOrEqual(44);
        if (state === "guest") {
          const createPlan = card.getByRole("button", { name: "学習計画を作る" });
          await expect(createPlan).toBeInViewport({ ratio: 1 });
          await expect(createPlan.locator('svg[aria-label^="チワワがスタートで待機中"]')).toBeVisible();
        }
        const nav = page.getByRole("navigation", { name: "モバイル底タブ" });
        if (width === 390) {
          await expect(nav.getByRole("link")).toHaveCount(3);
          expect(sourceBox!.y + sourceBox!.height).toBeLessThanOrEqual((await nav.boundingBox())!.y);
        }
        if (state !== "guest") {
          const switcher = card.getByRole("button", { name: "資格を切り替える" });
          await switcher.click();
          await expect(page.getByRole("dialog", { name: "受ける資格" })).toBeVisible();
          const close = page.getByRole("button", { name: "閉じる", exact: true });
          const rect = await close.boundingBox();
          expect(rect!.width).toBeGreaterThanOrEqual(44);
          expect(rect!.height).toBeGreaterThanOrEqual(44);
          await page.keyboard.press("Escape");
          await expect(page.getByRole("dialog")).toHaveCount(0);
        }
      });
    }
  });
}

test("search accepts surrounding spaces and announces matching results", async ({ page }) => {
  await fixture(page, "guest");
  await page.goto("/");
  const search = page.getByRole("searchbox", { name: "資格名・略称で検索" });
  await search.fill("　ITパスポート　");
  await expect(page.getByRole("status")).toHaveText("検索結果 1件");
  await expect(page.locator("#home-qualification-results").getByRole("link")).toHaveCount(1);
  await search.fill("　　");
  await expect(page.getByRole("heading", { name: "試験が近い資格" })).toBeVisible();
  await expect(page.locator("#home-qualification-results").getByRole("link")).toHaveCount(3);
});

test("long qualification and no appointment fit at 320px without an invented date", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 844 });
  const longPlan = createPacePlan({ id: "long-name", exam: "tsushin1", sessionId: null,
    startDate: "2026-10-11", examDate: null }, catalog.map(q => ({ ...q, id: `tsushin1-${q.id}`, exam: "tsushin1" })),
  "2026-10-11T00:00:00+09:00");
  await fixture(page, "member", longPlan);
  await page.goto("/");
  await expect(page.getByRole("button", { name: "資格を切り替える" })).toContainText("1級電気通信工事施工管理");
  await expect(page.getByRole("img", { name: "正解済み 0 / 200問" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(320);
  await expect(page.getByRole("button", { name: "受験日を設定" })).toBeVisible();
});

for (const state of ["member", "paid"] as const) {
  test(`${state}: a late plan only offers the monthly plan to a free member`, async ({ page }) => {
    await fixture(page, state, { ...plan(), examDate: "2026-11-18" });
    await page.goto("/");
    await expect(page.getByText("1回の目安　138問正解")).toBeVisible();
    await expect(page.getByRole("link", { name: /月額プランなら回数無制限で追いつけます/ })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "計画の問題を解く" })).toHaveCount(1);
  });
}
