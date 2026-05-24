import { test, expect } from "@playwright/test";

// /my-progress was consolidated into /account/dashboard. The old URL now
// returns a 301 to keep historical bookmarks alive. These specs verify the
// redirect contract and that the dashboard target page itself loads.

test.describe("/my-progress legacy redirect", () => {
  test("GET /my-progress returns 308 (Next.js permanent redirect)", async ({ request }) => {
    const res = await request.get("/my-progress", { maxRedirects: 0 });
    // Next.js emits 308 for permanent: true redirects (or 301 depending on
    // adapter). Accept either to keep this test stable across deploy targets.
    expect([301, 308]).toContain(res.status());
    const loc = res.headers()["location"] ?? "";
    expect(loc).toContain("/account/dashboard");
  });

  test("Following /my-progress lands on the dashboard page", async ({ page }) => {
    await page.goto("/my-progress");
    expect(page.url()).toContain("/account/dashboard");
    const heading = page.getByRole("heading").first();
    await expect(heading).toBeVisible();
  });
});
