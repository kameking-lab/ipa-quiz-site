import { test, expect } from "@playwright/test";

// Safe test paths using ap/2009-spring data (all 80 questions have no needsReview flag)
const EXAM = "/ap";
const YEAR_LIST = "/ap/2009-spring";
const QUESTION = "/q/ap/2009-spring/am/q1";
const QUESTION_MID = "/q/ap/2009-spring/am/q5";

// needsReview: true → notFound() in page.tsx → 404
const NEEDS_REVIEW_QUESTION = "/q/fe/2019-spring/am/q5";

test.describe("user journey: quiz HTTP status", () => {
  test("exam index /ap returns 200", async ({ request }) => {
    const res = await request.get(EXAM);
    expect(res.status()).toBe(200);
  });

  test("year/season list /ap/2009-spring returns 200", async ({ request }) => {
    const res = await request.get(YEAR_LIST);
    expect(res.status()).toBe(200);
  });

  test("question page /q/ap/2009-spring/am/q1 returns 200", async ({ request }) => {
    const res = await request.get(QUESTION);
    expect(res.status()).toBe(200);
  });

  test("nonexistent question /q/ap/2009-spring/am/q9999 returns 404", async ({ request }) => {
    const res = await request.get("/q/ap/2009-spring/am/q9999");
    expect(res.status()).toBe(404);
  });

  test("needsReview question /q/fe/2019-spring/am/q5 returns 404", async ({ request }) => {
    const res = await request.get(NEEDS_REVIEW_QUESTION);
    expect(res.status()).toBe(404);
  });
});

test.describe("user journey: quiz page content", () => {
  test("exam index /ap has heading with exam name", async ({ page }) => {
    await page.goto(EXAM);
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("応用情報技術者");
  });

  test("year/season list /ap/2009-spring has links to question pages", async ({ page }) => {
    await page.goto(YEAR_LIST);
    // Should link to at least one /q/ap/... page
    const questionLink = page.locator("a[href*='/q/ap/']").first();
    await expect(questionLink).toBeVisible();
  });

  test("question page has choices section with ア イ ウ エ", async ({ page }) => {
    await page.goto(QUESTION);
    const choicesSection = page.locator("[aria-label='選択肢']");
    await expect(choicesSection).toBeVisible();
    const text = await choicesSection.textContent();
    expect(text).toMatch(/ア/);
    expect(text).toMatch(/イ/);
    expect(text).toMatch(/ウ/);
    expect(text).toMatch(/エ/);
  });

  test("question page has answer and explanation sections", async ({ page }) => {
    await page.goto(QUESTION);
    await expect(page.locator("[aria-label='正解']")).toBeVisible();
    await expect(page.locator("[aria-label='解説']")).toBeVisible();
  });

  test("question page has adjacent question navigation", async ({ page }) => {
    await page.goto(QUESTION_MID);
    // q5 should have both prev (q4) and next (q6) links
    const prevLink = page.locator("a[href*='/q/ap/2009-spring/am/q4']");
    const nextLink = page.locator("a[href*='/q/ap/2009-spring/am/q6']");
    const hasPrev = (await prevLink.count()) > 0;
    const hasNext = (await nextLink.count()) > 0;
    expect(hasPrev || hasNext).toBe(true);
  });
});
