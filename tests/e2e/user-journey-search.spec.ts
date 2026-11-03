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
  test("practice CTA carries the exact bounded result IDs and search return URL", async ({
    page,
    request,
  }) => {
    await suppressWelcomeModal(page);
    const api = await (
      await request.get("/api/search/questions?q=SQL&difficulty=3&limit=60")
    ).json();
    expect(api.hits.length).toBeGreaterThan(0);

    await page.goto("/search?q=SQL&difficulty=3");
    const cta = page.getByRole("link", { name: /件の検索結果を連続演習する/ });
    await expect(cta).toBeVisible({ timeout: 15000 });
    const href = await cta.getAttribute("href");
    const target = new URL(href!, "http://test");

    expect(target.searchParams.get("source")).toBe("search");
    expect(target.searchParams.get("ids")?.split(",")).toEqual(
      api.hits.map((hit: { id: string }) => hit.id),
    );
    expect(target.searchParams.get("search")).toBe("q=SQL&difficulty=3");
    expect(target.searchParams.get("returnTo")).toBe("/search?q=SQL&difficulty=3");

    await page.goto(href!);
    await expect(page.getByRole("button", { name: "検索結果に戻る" })).toBeVisible({
      timeout: 15000,
    });
    await expect(page.getByRole("progressbar")).toHaveAttribute(
      "aria-valuemax",
      String(api.hits.length),
    );
  });

  test("an empty result never offers a misleading all-question practice CTA", async ({ page }) => {
    await suppressWelcomeModal(page);
    await page.goto("/search?q=__definitely_no_such_question_9f31b__");
    await expect(page.getByText("該当する問題は見つかりませんでした。条件を変えてお試しください。")).toBeVisible({ timeout: 15000 });
    await expect(page.getByRole("link", { name: /検索結果を連続演習する/ })).toHaveCount(0);
  });

  test("practice CTA is hidden while results for a changed query are pending", async ({ page }) => {
    await suppressWelcomeModal(page);
    let releaseTcp: (() => void) | undefined;
    const tcpGate = new Promise<void>((resolve) => {
      releaseTcp = resolve;
    });
    await page.route("**/api/search/questions?*", async (route) => {
      const url = new URL(route.request().url());
      if (url.searchParams.get("q") === "TCP") await tcpGate;
      await route.continue();
    });

    await page.goto("/search?q=SQL");
    const cta = page.getByRole("link", { name: /件の検索結果を連続演習する/ });
    await expect(cta).toBeVisible({ timeout: 15000 });

    await page.locator("#search-input").fill("TCP");
    await expect(page).toHaveURL(/q=TCP/, { timeout: 5000 });
    await expect(cta).toHaveCount(0);

    releaseTcp?.();
    await expect(cta).toBeVisible({ timeout: 15000 });
  });

  test("recent-only selection survives the quiz round trip", async ({ page, request }) => {
    const api = await (await request.get("/api/search/questions?q=SQL&limit=60")).json();
    expect(api.hits.length).toBeGreaterThan(0);
    const recentId = api.hits[0].id as string;
    await page.addInitScript((id) => {
      localStorage.setItem("ipa-quiz:onboarded:v1", "1");
      localStorage.setItem(
        "ipa-quiz:history:v1",
        JSON.stringify({
          entries: [{ id, selected: "ア", correct: true, at: Date.now() }],
          starredIds: [],
        }),
      );
    }, recentId);

    await page.goto("/search?q=SQL&recent=1");
    const recentToggle = page.getByRole("button", { name: "最近見た問題のみ" });
    await expect(recentToggle).toHaveAttribute("aria-pressed", "true", { timeout: 15000 });
    const cta = page.getByRole("link", { name: /1件の検索結果を連続演習する/ });
    await expect(cta).toBeVisible();
    const href = await cta.getAttribute("href");
    const target = new URL(href!, "http://test");
    expect(target.searchParams.get("ids")).toBe(recentId);
    expect(target.searchParams.get("returnTo")).toBe("/search?q=SQL&recent=1");

    await page.goto(href!);
    await page.getByRole("button", { name: "検索結果に戻る" }).click();
    await expect(page).toHaveURL(/\/search\?q=SQL&recent=1$/);
    await expect(recentToggle).toHaveAttribute("aria-pressed", "true");
  });

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
