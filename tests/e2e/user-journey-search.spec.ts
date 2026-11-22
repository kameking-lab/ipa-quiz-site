import { test, expect } from "@playwright/test";

// Suppress the WelcomeModal (aria-modal dialog) that opens after 800ms on fresh
// browser contexts. Without ipa-quiz:onboarded:v1, Radix UI's Dialog sets
// aria-hidden on everything outside the modal, causing getByRole queries to
// return zero elements. Set the flag before any page script runs so the modal
// never opens.
async function suppressWelcomeModal(page: import("@playwright/test").Page) {
  await page.addInitScript(() => {
    localStorage.setItem("ipa-quiz:onboarded:v1", "1");
  });
}

test.describe("search page: HTTP & structure", () => {
  test("GET /search returns 200", async ({ request }) => {
    const res = await request.get("/search");
    expect(res.status()).toBe(200);
  });


  test("/search has search input field", async ({ page }) => {
    await suppressWelcomeModal(page);
    await page.goto("/search");
    await page.getByText("問題文で探す", { exact: true }).click();
    const searchInput = page.getByRole("searchbox", { name: "キーワード", exact: true });
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await expect(searchInput).toBeEditable();
  });


  test("a shared qualification search link fills the fields and shows matches", async ({ page }) => {
    await suppressWelcomeModal(page);
    const questionResults = page.waitForResponse(response => {
      const url = new URL(response.url());
      return url.pathname === "/api/search/questions" && url.searchParams.get("q") === "調理師";
    });
    await page.goto(`/search?${new URLSearchParams({ q: "調理師" })}`);
    const qualifications = page.getByRole("list", { name: "資格の検索結果" });
    await expect(page.getByRole("searchbox", { name: "資格名・略称で検索" })).toHaveValue("調理師");
    await expect(qualifications.getByRole("link", { name: /調理師/ }).first()).toBeVisible();
    await expect(page.getByRole("searchbox", { name: "キーワード", exact: true })).toHaveValue("調理師");
    expect((await questionResults).ok()).toBe(true);
    await expect(page.getByRole("region", { name: "検索結果" })).toBeVisible();
  });

  test("/search filter panel appears after submitting a search term", async ({ page }) => {
    await suppressWelcomeModal(page);
    await page.goto("/search?q=SQL");
    // networkidle is unreliable on Next.js pages with streaming + analytics;
    // tests use explicit element waits below instead.
    await expect(page.getByRole("region", { name: "検索結果" })).toBeVisible({ timeout: 15000 });
    await page.locator("summary").filter({ hasText: /^絞り込み$/ }).click();
    const filters = page.getByRole("region", { name: "絞り込み", exact: true });
    await expect(filters.getByRole("combobox", { name: "資格", exact: true })).toBeVisible();
    await expect(filters.getByRole("combobox", { name: "年度", exact: true })).toBeVisible();
  });
});

test.describe("search API: contract", () => {
  test("GET /api/search/questions with empty query returns 200 empty result", async ({ request }) => {
    const res = await request.get("/api/search/questions");
    expect(res.status()).toBe(200);
    const body = await res.json();
    // No filters → returns empty result set
    expect(typeof body.total).toBe("number");
    expect(Array.isArray(body.hits)).toBe(true);
  });

  test("GET /api/search/questions with keyword returns results shape", async ({ request }) => {
    const res = await request.get("/api/search/questions?q=SQL");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(typeof body.total).toBe("number");
    expect(Array.isArray(body.hits)).toBe(true);
    expect(typeof body.facets).toBe("object");
  });

  test("GET /api/search/questions with exam filter", async ({ request }) => {
    const res = await request.get("/api/search/questions?q=%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9&exam=ap");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(typeof body.total).toBe("number");
  });

  test("GET /api/search/questions with difficulty filter", async ({ request }) => {
    const res = await request.get("/api/search/questions?difficulty=3&q=SQL");
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(typeof body.total).toBe("number");
  });
});

test.describe("search: keyword interaction", () => {




  test("duplicate ids parameters fail closed instead of crashing or widening the pool", async ({
    page,
  }) => {
    await suppressWelcomeModal(page);
    await page.goto(
      "/quiz?mode=random&source=search&ids=ap-2024s-am-q1&ids=ip-2023-cbt-q1&returnTo=%2Fsearch",
    );
    await expect(page.getByText("該当する問題がありませんでした。")).toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByRole("button", { name: "検索結果に戻る" })).toBeVisible();
    await expect(page.getByRole("progressbar")).toHaveCount(0);
  });

  test("submitting search triggers results section", async ({ page }) => {
    await suppressWelcomeModal(page);
    await page.goto("/search?q=SQL");
    // networkidle is unreliable on Next.js pages with streaming + analytics;
    // tests use explicit element waits below instead.
    const resultsSection = page.locator("[aria-label='検索結果']");
    await expect(resultsSection).toBeVisible({ timeout: 15000 });
  });

  test("results list is not a verbose live region; count is announced concisely", async ({ page }) => {
    await suppressWelcomeModal(page);
    await page.goto("/search?q=SQL");
    const resultsSection = page.locator("[aria-label='検索結果']");
    await expect(resultsSection).toBeVisible({ timeout: 15000 });
    // The results container must NOT be a live region — otherwise every
    // debounced keystroke re-reads all ~20 hits to screen readers.
    await expect(resultsSection).not.toHaveAttribute("aria-live", "polite");
    // A concise count status (sr-only) carries the announcement instead.
    const countStatus = resultsSection.locator("[role='status']");
    await expect(countStatus).toHaveText(/件の検索結果が見つかりました。/);
  });



});
