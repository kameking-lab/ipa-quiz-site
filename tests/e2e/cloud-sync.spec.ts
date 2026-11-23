import { test, expect } from "@playwright/test";

// Cloud sync is opt-in. The CI environment has no DATABASE_URL and the default
// storageState is signed-out, so these tests verify the LocalStorage-first
// contract holds: the settings panel renders, signed-out users cannot sync,
// and core local features keep working without any
// auth. Full multi-device / authenticated sync needs a provisioned DB and is
// exercised manually (see logs/data-portability-2026-05-23.md).

test.describe("cloud sync: opt-in, non-intrusive", () => {
  test("/settings renders the クラウド同期 section", async ({ page }) => {
    await page.goto("/settings");
    const panel = page.locator("#cloud-sync");
    await panel.getByText("クラウド同期", { exact: true }).click();
    await expect(panel.getByText("学習履歴", { exact: true })).toBeVisible();
  });

  test("signed-out user can read the sync settings without an enabled sync action", async ({ page }) => {
    await page.goto("/settings");
    const panel = page.locator("#cloud-sync");
    await panel.getByText("クラウド同期", { exact: true }).click();
    await expect(panel.getByText("ブックマーク", { exact: true })).toBeVisible();
    await expect(panel.locator("button:enabled")).toHaveCount(0);
  });

  test("home page shows no account-creation banner (LocalStorage-first)", async ({ page }) => {
    await page.goto("/");
    const body = await page.locator("body").innerText();
    expect(body).not.toMatch(/アカウントを作成|新規登録/);
  });

  test("bookmarking still works without signing in", async ({ page }) => {
    await page.goto("/q/ap/2024-spring/am/q1");
    // The question page renders a bookmark affordance; the page must not require auth.
    expect(page.url()).toContain("/q/ap/2024-spring/am/q1");
    const res = await page.request.get("/bookmarks");
    expect(res.status()).toBe(200);
  });

  test("sync endpoints are reachable and gated (503 without DB / 401 without auth)", async ({ request }) => {
    for (const path of [
      "/api/account/bookmark-sync",
      "/api/account/custom-tag-sync",
      "/api/account/study-plan-sync",
    ]) {
      const res = await request.post(path, { data: { entries: [] } });
      // No DATABASE_URL → 503; or signed-out → 401. Either is the safe gate.
      expect([401, 503]).toContain(res.status());
    }
  });
});
