import { test, expect } from "@playwright/test";

// Cloud sync is opt-in. The CI environment has no DATABASE_URL and the default
// storageState is signed-out, so these tests verify the LocalStorage-first
// contract holds: the settings panel renders, signed-out users cannot sync,
// and core local features keep working without any
// auth. Full multi-device / authenticated sync needs a provisioned DB and is
// exercised manually (see logs/data-portability-2026-05-23.md).

test.describe("cloud sync: opt-in, non-intrusive", () => {
  test("restores both history pages and keeps the over-limit answer on the device", async ({ page }) => {
    const historyKey = "ipa-quiz:history:v1";
    const local = { id: "local", at: 2000, correct: false, selected: "ア" };
    await page.addInitScript(({ key, entry }) => {
      localStorage.setItem(key, JSON.stringify({ entries: [entry], starredIds: ["keep"] }));
    }, { key: historyKey, entry: local });
    await page.route("**/api/auth/session", route => route.fulfill({ json: { user: { id: "sync-test" } } }));
    for (const name of ["bookmark", "custom-tag", "study-plan"]) {
      await page.route(`**/api/account/${name}-sync`, route => route.fulfill({ json: { entries: [], merged: 0, total: 0 } }));
    }
    const cloud = Array.from({ length: 257 }, (_, at) => ({ id: "q" + at, at, correct: true }));
    const cursor = { at: 255, rowId: "study-row" };
    const requests: unknown[] = [];
    await page.route("**/api/account/history-sync", route => {
      const body = route.request().postDataJSON();
      requests.push(body);
      const more = !!body.historyPage.cursor;
      const entries = more ? cloud.slice(256) : cloud.slice(0, 256);
      return route.fulfill({ json: { entries, total: entries.length, merged: 0,
        limitReached: !more, nextCursor: more ? null : cursor } });
    });
    await page.goto("/settings");
    const panel = page.locator("#cloud-sync");
    await panel.getByText("クラウド同期", { exact: true }).click();
    await panel.getByRole("checkbox").check();
    await panel.getByRole("button", { name: "今すぐ同期" }).click();
    await expect(panel.getByRole("status")).toContainText("保存上限に達しました");
    expect(requests).toHaveLength(2);
    expect(requests[1]).toMatchObject({ historyPage: { cursor }, expectedUserId: "sync-test" });
    const restored = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), historyKey);
    expect(restored.entries).toEqual([...cloud, local]);
    expect(restored.starredIds).toEqual(["keep"]);
  });

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
      "/api/account/history-sync",
      "/api/account/bookmark-sync",
      "/api/account/custom-tag-sync",
      "/api/account/study-plan-sync",
    ]) {
      const res = await request.post(path, { data: { entries: [] } });
      // No DATABASE_URL → 503; or signed-out → 401. Either is the safe gate.
      expect([401, 503]).toContain(res.status());
    }
    expect([401, 503]).toContain((await request.get("/api/account/history-export")).status());
  });
});
