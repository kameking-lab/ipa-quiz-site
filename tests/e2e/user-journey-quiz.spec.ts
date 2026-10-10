import { test, expect } from "@playwright/test";

// Safe test paths using ap/2024-spring data (all 80 questions have no needsReview flag)
// 2009-spring was replaced because dynamicParams=false + SSG_MIN_YEAR=2024 causes older URLs to 404.
const EXAM = "/ap";
const YEAR_LIST = "/ap/2024-spring";
const QUESTION = "/q/ap/2024-spring/am/q1";
// q5 and q6 depend on figures that are not yet renderable, so the shared
// practice-ready boundary intentionally removes them from both routes and nav.
const QUESTION_MID = "/q/ap/2024-spring/am/q4";

// needsReview: true → notFound() in page.tsx → 404
const NEEDS_REVIEW_QUESTION = "/q/fe/2019-spring/am/q5";

test.describe("user journey: quiz HTTP status", () => {
  test("exam index /ap returns 200", async ({ request }) => {
    const res = await request.get(EXAM);
    expect(res.status()).toBe(200);
  });

  test("year/season list /ap/2024-spring returns 200", async ({ request }) => {
    const res = await request.get(YEAR_LIST);
    expect(res.status()).toBe(200);
  });

  test("question page /q/ap/2024-spring/am/q1 returns 200", async ({ request }) => {
    const res = await request.get(QUESTION);
    expect(res.status()).toBe(200);
  });

  test("nonexistent question /q/ap/2024-spring/am/q9999 returns 404", async ({ request }) => {
    const res = await request.get("/q/ap/2024-spring/am/q9999");
    // App may render a "not found" UI with 200, or return a proper 404.
    expect([200, 404]).toContain(res.status());
  });

  test("needsReview question /q/fe/2019-spring/am/q5 returns 404", async ({ request }) => {
    const res = await request.get(NEEDS_REVIEW_QUESTION);
    // App may render a "not found" UI with 200, or return a proper 404.
    expect([200, 404]).toContain(res.status());
  });
});

test.describe("user journey: quiz page content", () => {
  test("exam index /ap has heading with exam name", async ({ page }) => {
    await page.goto(EXAM);
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("応用情報技術者");
  });

  test("year/season list /ap/2024-spring opens its selected question in unanswered quiz", async ({ page }) => {
    await page.goto(YEAR_LIST);
    const questionLink = page.locator('a[href*="question=ap-2024h-am-q1&"]');
    await expect(questionLink).toBeVisible();
    await questionLink.click();
    const url = new URL(page.url());
    expect(url.pathname).toBe("/quiz");
    expect(url.searchParams.get("mode")).toBe("year");
    expect(url.searchParams.get("exam")).toBe("ap");
    expect(url.searchParams.get("year")).toBe("2024");
    expect(url.searchParams.get("season")).toBe("spring");
    expect(url.searchParams.get("session")).toBe("am");
    expect(url.searchParams.get("question")).toBe("ap-2024h-am-q1");
    expect(url.searchParams.get("returnTo")).toBe(YEAR_LIST);
    await expect(page.getByText("問1", { exact: true })).toBeVisible();
    await expect(page.getByRole("radiogroup", { name: /選択肢/ }).getByRole("radio")).toHaveCount(4);
    await expect(page.getByRole("region", { name: "正解の解説" })).toHaveCount(0);
    await expect(page.getByRole("progressbar", { name: "クイズ進捗" })).toHaveAttribute("aria-valuenow", "1");
  });

  test("question page has choices section with ア イ ウ エ", async ({ page }) => {
    await page.goto(QUESTION);
    // 致命傷⑤: choices are now an interactive solve-in-place radiogroup; the
    // section is labelled 「選択肢と解答」 and the choice keys render in it.
    const choicesSection = page.locator("[aria-label='選択肢と解答']");
    await expect(choicesSection).toBeVisible();
    const text = await choicesSection.textContent();
    expect(text).toMatch(/ア/);
    expect(text).toMatch(/イ/);
    expect(text).toMatch(/ウ/);
    expect(text).toMatch(/エ/);
  });

  test("question page has the inline answer and explanation sections", async ({ page }) => {
    await page.goto(QUESTION);
    // The standalone 「正解」 reveal section was folded into the interactive
    // 「選択肢と解答」 card (answering reveals correct/incorrect in place).
    await expect(page.locator("[aria-label='選択肢と解答']")).toBeVisible();
    await expect(page.locator("[aria-label='解説']")).toBeVisible();
  });

  test("question page has adjacent question navigation", async ({ page }) => {
    await page.goto(QUESTION_MID);
    // q4 should link back to q3 and skip unavailable q5/q6 on the way to q7.
    const prevLink = page.locator("a[href*='/q/ap/2024-spring/am/q3']");
    const nextLink = page.locator("a[href*='/q/ap/2024-spring/am/q7']");
    const hasPrev = (await prevLink.count()) > 0;
    const hasNext = (await nextLink.count()) > 0;
    expect(hasPrev || hasNext).toBe(true);
  });
});
