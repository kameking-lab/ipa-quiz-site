import { test, expect } from "@playwright/test";

// 教育貢献プロジェクト方針により /pricing は恒久削除済み。middleware の GONE_PATHS で
// 410 Gone を返す（404 より強い「もう辿らなくてよい」シグナルでクロール資産を回復）。
// 詳細は middleware.ts と smoke-routes.spec.ts を参照。
test.describe("/pricing は恒久削除（410 Gone）", () => {
  test("/pricing は 410 を返す", async ({ request }) => {
    const res = await request.get("/pricing");
    expect(res.status()).toBe(410);
  });

  test("/about の料金案内が無料範囲と月額プランを伝えている", async ({ page }) => {
    await page.goto("/about");
    const heading = page.getByRole("heading", { name: "料金について", exact: true });
    await expect(heading).toBeVisible();
    const section = heading.locator("+ section");
    await expect(section.getByText("教育貢献プロジェクト", { exact: true })).toBeVisible();
    await expect(section.getByText(/個別問題・原紙・保存済み履歴の閲覧と復習は無料です。/)).toBeVisible();
    await expect(section.getByText(/連続演習はログインなしでも1日10問まで無料で、日本時間0時に\s*更新されます。/)).toBeVisible();
    await expect(section.getByText(/履歴の同期などは無料ログインで利用できます。/)).toBeVisible();
    await expect(section.getByText(/月額プランは税込980円で毎月自動更新され/)).toBeVisible();
    await expect(section.getByRole("link", { name: "月額プランの案内" })).toHaveAttribute("href", "/billing");
  });

  test("Sitemap returns 200", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toMatch(/xml/);
  });
});
