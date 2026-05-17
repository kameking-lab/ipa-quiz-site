import { test, expect } from "@playwright/test";

const BASE_URL = process.env.E2E_BASE_URL ?? "http://127.0.0.1:3000";

const PLAN_ID = "test-plan-001";

const MOCK_PLAN = {
  id: PLAN_ID,
  createdAt: new Date().toISOString(),
  input: {
    exam: "ap",
    examDate: "2026-10-01",
    level: "beginner",
    dailyMinutes: 30,
  },
  summary: {
    daysRemaining: 90,
  },
  daily: [
    { tasks: [{ key: "ap-week1-day1-task1" }, { key: "ap-week1-day1-task2" }] },
  ],
};

const MOCK_PLANS_VALUE = JSON.stringify([MOCK_PLAN]);

test.describe("study plan: HTTP & structure", () => {
  test("GET /study-plan returns 200", async ({ request }) => {
    const res = await request.get("/study-plan");
    expect(res.status()).toBe(200);
  });

  test("/study-plan has AI学習スケジュール作成 heading", async ({ page }) => {
    await page.goto("/study-plan");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("AI 学習スケジュール作成");
  });

  test("/study-plan shows new-plan creation section", async ({ page }) => {
    await page.goto("/study-plan");
    const newPlanSection = page.locator("[aria-labelledby='new-plan']");
    await expect(newPlanSection).toBeVisible();
  });

  test("/study-plan shows new-plan section (always rendered)", async ({ page }) => {
    await page.goto("/study-plan");
    // The new-plan section is always present (not conditional on localStorage)
    const newPlanSection = page.locator("[aria-labelledby='new-plan']");
    await expect(newPlanSection).toBeVisible({ timeout: 15000 });
  });
});

test.describe("study plan: result page", () => {
  test("GET /study-plan/result/nonexistent returns 200 or 404", async ({ request }) => {
    const res = await request.get("/study-plan/result/nonexistent-id");
    // Either 200 (shows not-found UI) or 404 are valid
    expect([200, 404]).toContain(res.status());
  });

  test("/study-plan/result/[id] renders when plan in localStorage", async ({ browser }) => {
    const context = await browser.newContext({
      baseURL: BASE_URL,
      storageState: {
        cookies: [],
        origins: [
          {
            origin: BASE_URL,
            localStorage: [
              { name: "ipa-quiz:study-plans:v1", value: MOCK_PLANS_VALUE },
            ],
          },
        ],
      },
    });
    const page = await context.newPage();
    await page.goto(`/study-plan/result/${PLAN_ID}`);
    // Page should load without crashing
    const content = await page.content();
    expect(content).toMatch(/学習|スケジュール|プラン/);
    await context.close();
  });
});

test.describe("study plan: empty state", () => {
  test("/study-plan with no plans shows creation form", async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.removeItem("ipa-quiz:study-plans:v1");
    });
    await page.goto("/study-plan");
    // Should show the new plan creation section
    const newPlanSection = page.locator("[aria-labelledby='new-plan']");
    await expect(newPlanSection).toBeVisible();
  });
});

test.describe("study plan: existing plans in localStorage", () => {
  test("/study-plan shows stored plan with delete button", async ({ page }) => {
    // addInitScript runs before any page script, so localStorage is populated
    // before React initializes and the StudyPlanLanding useEffect reads it.
    await page.addInitScript((value) => {
      localStorage.setItem("ipa-quiz:study-plans:v1", value);
    }, MOCK_PLANS_VALUE);
    await page.goto("/study-plan");
    await page.waitForLoadState("networkidle");

    const deleteBtn = page.locator("[aria-label='削除']");
    await expect(deleteBtn).toBeVisible({ timeout: 15000 });
  });

  test("/study-plan shows link to plan result from stored plan", async ({ page }) => {
    await page.addInitScript((value) => {
      localStorage.setItem("ipa-quiz:study-plans:v1", value);
    }, MOCK_PLANS_VALUE);
    await page.goto("/study-plan");
    await page.waitForLoadState("networkidle");

    const planLink = page.locator(`a[href*='/study-plan/result/']`);
    await expect(planLink).toBeVisible({ timeout: 15000 });
  });
});
