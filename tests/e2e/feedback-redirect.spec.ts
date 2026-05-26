import { test, expect } from "@playwright/test";

// 実機レビュー A-1: 旧「誤りを報告」リンクが GET /feedback を叩き 404 だった。
// /feedback は統一問い合わせフォーム /contact?type=error へリダイレクトする。
test.describe("/feedback redirect (no 404)", () => {
  test("GET /feedback redirects to /contact (not 404)", async ({ request }) => {
    const res = await request.get("/feedback", { maxRedirects: 0 });
    expect([301, 308]).toContain(res.status());
    expect(res.headers()["location"]).toContain("/contact");
  });

  test("following /feedback lands on the contact page with 200", async ({ page }) => {
    const resp = await page.goto("/feedback");
    expect(resp?.status()).toBe(200);
    expect(page.url()).toContain("/contact");
  });
});
