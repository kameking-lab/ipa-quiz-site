import { expect, test, type Page } from "@playwright/test";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { LS_KEYS } from "../../lib/storage/keys";
import { createPacePlan } from "../../lib/study-plan/pace";

test.use({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce", serviceWorkers: "block" });
const day = "2026-11-22";
const now = new Date(`${day}T12:00:00+09:00`);
const catalog = Array.from({ length: 3 }, (_, index) => ({
  id: `ip-2026h-am-q${index + 1}`, exam: "ip", year: 2026, season: "spring", session: "am", qNumber: index + 1,
}));
const questionPath = "/q/tohan/2025-kansai/gakka/q1";

async function seed(page: Page, flags: { streak?: number; postExam?: boolean; lap?: boolean; installedToday?: boolean; firstDay?: boolean } = {}) {
  await page.clock.setFixedTime(now);
  const plan = createPacePlan({ id: "grow22", exam: "ip", sessionId: null,
    examDate: flags.postExam ? "2026-11-21" : "2026-12-02", startDate: "2026-11-01" }, catalog, now.toISOString());
  await page.addInitScript(({ plan, catalog, flags, day, keys, at }) => {
    if (sessionStorage.getItem("grow22-seeded")) return;
    sessionStorage.setItem("grow22-seeded", "1");
    localStorage.setItem("ipa-quiz:onboarded:v1", "1");
    localStorage.setItem(keys.achievementFirstDay, flags.firstDay ? day : "2026-11-01");
    localStorage.setItem(keys.pacePlans, JSON.stringify([plan]));
    if (flags.streak) localStorage.setItem("ipa-quiz:streak:v1", JSON.stringify({
      currentStreak: flags.streak - 1, longestStreak: flags.streak - 1, lastStudyDate: "2026-11-21",
      todayCompleted: false, milestonesReached: [],
    }));
    if (flags.lap) localStorage.setItem(keys.history, JSON.stringify({
      entries: catalog.slice(1).map(q => ({ id: q.id, selected: "ア", correct: true, at: at - 86_400_000 })), starredIds: [],
    }));
    if (flags.installedToday) localStorage.setItem(keys.mobileInstallNudge, JSON.stringify({ shownDay: day }));
  }, { plan, catalog, flags, keys: LS_KEYS, day, at: now.getTime() });
  const fixture = { ...catalog[0], type: "multiple-choice", category: "テクノロジ系", difficulty: 1, topicTags: [],
    question: "データを保護する方法として適切なものはどれか。", choices: { ア: "アクセス権を設定する", イ: "全員に公開する", ウ: "記録を消す", エ: "設定を共有する" },
    answer: "ア", explanation: "必要な人だけがデータを扱えるよう、アクセス権を設定します。", sourcePdfUrl: "https://www.ipa.go.jp/shiken/" };
  await page.route("**/api/exam-schedule/ip", route => route.fulfill({ json: { sessions: [] } }));
  await page.route("**/api/study-plan/catalog/ip", route => route.fulfill({ json: { questions: catalog } }));
  await page.route("**/api/questions/next?**", route => route.fulfill({ json: fixture }));
  await page.route("**/api/billing/question", async route => {
    if (route.request().postDataJSON()?.id !== fixture.id) return route.continue();
    return route.fulfill({ json: { question: fixture, access: { kind: "guest", freeDaily: 10, remaining: 9 } } });
  });
}

async function completed(page: Page, choice = "アクセス権を設定する") {
  await page.goto("/quiz/today?plan=grow22");
  await page.getByRole("radio", { name: new RegExp(choice) }).click();
  await page.getByRole("button", { name: "結果を見る" }).click();
  await expect(page.getByRole("heading", { name: /1問中[01]問正解/ })).toBeVisible();
}

async function capture(page: Page, name: string) {
  const folder = process.env.GROW22_SCREENSHOTS;
  if (folder) await page.screenshot({ path: join(folder, name + ".png"), animations: "disabled" });
}

for (const [name, kind, flags] of [
  ["goal", "goal", {}],
  ["streak-3", "streak", { streak: 3 }],
  ["streak-7", "streak", { streak: 7 }],
  ["streak-14", "streak", { streak: 14 }],
  ["streak-30", "streak", { streak: 30 }],
  ["lap-priority", "lap", { streak: 7, lap: true }],
  ["passed", "passed", { streak: 7, lap: true, postExam: true }],
] as const) {
  test(`shares the ${name} card and lands at the qualification top`, async ({ page }) => {
    await seed(page, flags);
    if ("postExam" in flags) {
      await page.goto("/");
      await page.getByRole("button", { name: "合格", exact: true }).click();
    } else await completed(page);
    const card = page.locator(`[data-study-achievement="${kind}"]`);
    await expect(card).toHaveCount(1);
    await expect(page.locator("[data-install-nudge]")).toHaveCount(0);
    const img = card.getByRole("img");
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBe(1200);
    const imageUrl = new URL((await img.getAttribute("src"))!, page.url());
    const image = await page.request.get(imageUrl.href);
    expect(image.headers()["cache-control"]).not.toContain("s-maxage=3600");
    await capture(page, name);
    if (process.env.GROW22_SCREENSHOTS) await writeFile(join(process.env.GROW22_SCREENSHOTS, name + "-card.png"), await image.body());

    await card.getByRole("button", { name: "この結果を共有" }).click();
    const intent = new URL((await card.getByRole("link", { name: "X", exact: true }).getAttribute("href"))!);
    const landing = new URL(intent.searchParams.get("url")!);
    expect(landing.pathname).toBe("/ip");
    expect(landing.searchParams.get("utm_source")).toBe("share");
    expect(landing.searchParams.get("utm_medium")).toBe("card");
    expect((await page.goto(landing.pathname + landing.search))?.status()).toBe(200);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute("content", new RegExp(`card=${kind}&`));
  });
}

for (const [name, flags, choice] of [
  ["after an install prompt that day", { installedToday: true }, undefined],
  ["on the first day", { firstDay: true }, undefined],
  ["after a wrong answer", {}, "全員に公開する"],
] as const) {
  test(`suppresses the card ${name}`, async ({ page }) => {
    await seed(page, flags);
    await completed(page, choice);
    await expect(page.getByRole("button", { name: "この結果を共有" })).toHaveCount(0);
  });
}

test("an answered question shares its public path and spoiler-free OGP", async ({ page }) => {
  await page.goto(questionPath);
  await expect(page.getByRole("button", { name: "この問題を共有" })).toHaveCount(0);
  await page.getByRole("radiogroup").getByRole("radio").first().click();
  const share = page.getByRole("button", { name: "この問題を共有" });
  await expect(share).toHaveCount(1);
  await share.scrollIntoViewIfNeeded();
  await capture(page, "question");
  await share.click();
  const intent = new URL((await page.getByRole("link", { name: "X", exact: true }).getAttribute("href"))!);
  const landing = new URL(intent.searchParams.get("url")!);
  expect(landing.pathname).toBe(questionPath);
  expect(landing.search).toBe("?utm_source=share&utm_medium=question");
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /^.{8,}｜答えと解説$/);
  const socialImage = new URL((await page.locator('meta[property="og:image"]').getAttribute("content"))!);
  const image = await page.request.get(socialImage.pathname + socialImage.search);
  expect(image.headers()["content-type"]).toBe("image/png");
  if (process.env.GROW22_SCREENSHOTS) await writeFile(join(process.env.GROW22_SCREENSHOTS, "question-ogp.png"), await image.body());
  await expect(page.getByRole("link", { name: "LINE", exact: true })).toHaveAttribute("href", /social-plugins\.line\.me/);
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.getByRole("button", { name: "リンクをコピー" }).click();
  await expect(page.getByRole("status").filter({ hasText: "リンクをコピーしました" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(landing.href);
  expect((await page.goto(landing.pathname + landing.search))?.ok()).toBe(true);
  await expect(page.getByRole("radiogroup")).toBeVisible();
});

test("uses the Web Share API when available", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", { value: async (data: ShareData) => {
      const previous = JSON.parse(sessionStorage.getItem("shareCalls") ?? "[]");
      sessionStorage.setItem("shareCalls", JSON.stringify([...previous, data]));
    } });
  });
  await page.goto(questionPath);
  await page.getByRole("radiogroup").getByRole("radio").first().click();
  await page.getByRole("button", { name: "この問題を共有" }).click();
  const calls = await page.evaluate(() => JSON.parse(sessionStorage.getItem("shareCalls") ?? "[]"));
  expect(calls).toEqual([{ title: expect.stringMatching(/｜答えと解説$/), url: expect.stringContaining(questionPath + "?utm_source=share&utm_medium=question") }]);
  await expect(page.getByRole("link", { name: "LINE", exact: true })).toHaveCount(0);
});

test("rejects invalid card fields before rendering an image", async ({ request }) => {
  const response = await request.get("/api/og?type=study-card&exam=ip&card=goal&mastered=999&total=2&streak=3");
  expect(response.status()).toBe(400);
});
