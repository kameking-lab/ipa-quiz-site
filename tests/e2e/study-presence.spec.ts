import { expect, test, type Page } from "@playwright/test";

// Explicit synthetic UI fixtures: no heartbeat or production learner is recorded.
async function show(page: Page, data: unknown) {
  await expect.poll(async () => {
    await page.evaluate(value => window.dispatchEvent(new CustomEvent("study-presence-count", { detail: value })), data);
    return page.getByRole("region", { name: "今学んでいる仲間" }).count();
  }).toBe(1);
}
test("qualification presence is compact on desktop and mobile and distinguishes zero/failure", async ({ page }) => {
  await page.goto("/");
  const data = { count: 4, exams: [{ exam: "fe", count: 3 }, { exam: "denko2", count: 1 }] };
  for (const width of [1280, 390, 320]) {
    await page.setViewportSize({ width, height: 800 });
    await show(page, data);
    const region = page.getByRole("region", { name: "今学んでいる仲間" });
    await expect(region.getByRole("listitem")).toHaveText(["今3人が基本情報技術者を学んでいます。", "今1人が第二種電気工事士を学んでいます。"]);
    await expect(region.getByText("一緒に頑張りましょう！")).toBeVisible();
    await expect(region).toHaveAttribute("aria-live", "off");
    expect(await region.evaluate(el => el.scrollWidth <= el.clientWidth)).toBe(true);
  }
  await show(page, { count: 0, exams: [] });
  await expect(page.getByText("学習中の資格はまだありません。")).toBeVisible();
  await page.evaluate(() => window.dispatchEvent(new CustomEvent("study-presence-count", { detail: null })));
  await expect(page.getByRole("region", { name: "今学んでいる仲間" })).toHaveCount(0);
});
test("many qualifications stay within a keyboard-scrollable small list", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 }); await page.goto("/");
  const codes = ["ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au", "denko2", "denken3"];
  await show(page, { count: codes.length, exams: codes.map(exam => ({ exam, count: 1 })) });
  const list = page.getByRole("list", { name: "資格別の学習人数" });
  expect((await list.boundingBox())?.height).toBeLessThanOrEqual(112);
  await expect(list).toHaveAttribute("tabindex", "0");
  expect(await list.evaluate(el => el.scrollHeight > el.clientHeight)).toBe(true);
});
test("a loaded quiz publishes only its real question qualification and automation sends no heartbeat", async ({ page }) => {
  let heartbeats = 0;
  page.on("request", request => { if (request.url().includes("/api/stats/study-presence") && request.method() === "POST") heartbeats++; });
  await page.goto("/quiz?mode=random&exam=fe");
  await expect(page.locator('[data-study-presence-exam="fe"]')).toBeVisible();
  expect(heartbeats).toBe(0);
});
