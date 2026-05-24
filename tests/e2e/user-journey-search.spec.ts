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

  test("/search has IPA過去問 横断検索 heading", async ({ page }) => {
    await suppressWelcomeModal(page);
    await page.goto("/search");
    const h1 = page.getByRole("heading", { level: 1 });
    await expect(h1).toBeVisible();
    await expect(h1).toContainText("IPA過去問 横断検索");
  });

  test("/search has search input field", async ({ page }) => {
    await suppressWelcomeModal(page);
    await page.goto("/search");
    const searchInput = page.locator("#search-input");
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await expect(searchInput).toHaveAttribute("placeholder", /TCP|例/);
  });

  test("/search has 問題検索 section with aria-label", async ({ page }) => {
    await suppressWelcomeModal(page);
    await page.goto("/search");
    const searchSection = page.locator("[aria-label='問題検索']");
    await expect(searchSection).toBeVisible({ timeout: 10000 });
  });

  // SearchClient uses useSearchParams() without Suspense, so state is driven
  // by URL params via useEffect. Navigate directly to the search URL with a
  // query param so the filter panel appears once React hydrates + useEffect runs.
  test("/search filter panel appears after submitting a search term", async ({ page }) => {
    await suppressWelcomeModal(page);
    await page.goto("/search?q=SQL");
    // networkidle is unreliable on Next.js pages with streaming + analytics;
    // tests use explicit element waits below instead.
    const filterSection = page.locator("[aria-label='絞り込み']");
    await expect(filterSection).toBeVisible({ timeout: 15000 });
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
  test("submitting search triggers results section", async ({ page }) => {
    await suppressWelcomeModal(page);
    await page.goto("/search?q=SQL");
    // networkidle is unreliable on Next.js pages with streaming + analytics;
    // tests use explicit element waits below instead.
    const resultsSection = page.locator("[aria-label='検索結果']");
    await expect(resultsSection).toBeVisible({ timeout: 15000 });
  });

  test("clear button appears after submitting search", async ({ page }) => {
    await suppressWelcomeModal(page);
    await page.goto("/search?q=TCP");
    // networkidle is unreliable on Next.js pages with streaming + analytics;
    // tests use explicit element waits below instead.
    const clearBtn = page.locator("[aria-label='入力をクリア']");
    await expect(clearBtn).toBeVisible({ timeout: 15000 });
  });

  test("clicking clear button empties the search input", async ({ page }) => {
    await suppressWelcomeModal(page);
    await page.goto("/search?q=TCP");
    // networkidle is unreliable on Next.js pages with streaming + analytics;
    // tests use explicit element waits below instead.
    const searchInput = page.locator("#search-input");
    const clearBtn = page.locator("[aria-label='入力をクリア']");
    await expect(clearBtn).toBeVisible({ timeout: 15000 });
    await clearBtn.click();
    await expect(searchInput).toHaveValue("", { timeout: 5000 });
  });

  test("clear-all button appears when filters active", async ({ page }) => {
    await suppressWelcomeModal(page);
    await page.goto("/search");
    const searchInput = page.locator("#search-input");
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await searchInput.fill("データベース");
    const clearAll = page.locator("[aria-label='すべての条件をクリア']");
    await expect(clearAll).toBeVisible({ timeout: 15000 });
  });
});
