import { test, expect } from "@playwright/test";

// sc is the only exam with essay data; 2025-spring/pm2/q1 has all 8 industries
const ESSAY_EXAM = "/essays/sc";
const ESSAY_QUESTION = "/essays/sc/2025-spring/pm2/q1";

// Industry tab IDs as rendered: essay-tab-{industryId}
// Order from EssayIndustryTabs: it, manufacturing, finance, retail, telecom, construction, healthcare, public
const INDUSTRY_TABS = ["it", "manufacturing", "finance", "retail", "telecom", "construction", "healthcare", "public"];

test.describe("user journey: essays HTTP status", () => {
  test("essays exam index /essays/sc returns 200", async ({ request }) => {
    const res = await request.get(ESSAY_EXAM);
    expect(res.status()).toBe(200);
  });

  test("essay question page /essays/sc/2025-spring/pm2/q1 returns 200", async ({ request }) => {
    const res = await request.get(ESSAY_QUESTION);
    expect(res.status()).toBe(200);
  });

  test("nonexistent essay /essays/sc/2025-spring/pm2/q99 returns 404", async ({ request }) => {
    const res = await request.get("/essays/sc/2025-spring/pm2/q99");
    expect(res.status()).toBe(404);
  });

  test("nonexistent year /essays/sc/1999-spring/pm2/q1 returns 404", async ({ request }) => {
    const res = await request.get("/essays/sc/1999-spring/pm2/q1");
    expect(res.status()).toBe(404);
  });
});

test.describe("user journey: essays industry tab UI", () => {
  test("essay question page has industry tablist", async ({ page }) => {
    await page.goto(ESSAY_QUESTION);
    const tablist = page.getByRole("tablist");
    await expect(tablist).toBeVisible();
  });

  test("essay question page has all 8 industry tabs", async ({ page }) => {
    await page.goto(ESSAY_QUESTION);
    for (const id of INDUSTRY_TABS) {
      const tab = page.locator(`[id="essay-tab-${id}"]`);
      await expect(tab).toBeVisible();
    }
  });

  test("first industry tab (it) is selected by default", async ({ page }) => {
    await page.goto(ESSAY_QUESTION);
    const firstTab = page.locator('[id="essay-tab-it"]');
    await expect(firstTab).toHaveAttribute("aria-selected", "true");
  });

  test("clicking manufacturing tab selects it and deselects it", async ({ page }) => {
    await page.goto(ESSAY_QUESTION);
    const mfgTab = page.locator('[id="essay-tab-manufacturing"]');
    await mfgTab.click();
    await expect(mfgTab).toHaveAttribute("aria-selected", "true");
    const itTab = page.locator('[id="essay-tab-it"]');
    await expect(itTab).toHaveAttribute("aria-selected", "false");
  });

  test("switching tabs changes the visible essay panel", async ({ page }) => {
    await page.goto(ESSAY_QUESTION);
    const itPanel = page.locator('[id="essay-panel-it"]');
    const mfgPanel = page.locator('[id="essay-panel-manufacturing"]');
    // Initially it panel is shown
    await expect(itPanel).toBeVisible();
    // Click manufacturing tab
    await page.locator('[id="essay-tab-manufacturing"]').click();
    await expect(mfgPanel).toBeVisible();
  });
});
