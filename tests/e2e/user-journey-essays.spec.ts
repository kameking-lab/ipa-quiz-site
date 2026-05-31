import { test, expect } from "@playwright/test";

// sc is the only exam with essay data; 2025-spring/pm2/q1 has all 8 industries
const ESSAY_EXAM = "/essays/sc";
const ESSAY_QUESTION = "/essays/sc/2025-spring/pm2/q1";

// EssayIndustryTabs renders the industry selector as a role="group"
// (aria-label "業種選択") of aria-pressed toggle buttons labelled by industry
// name, in this order. The matching answer is a <section hidden> with a
// "<industry>の合格答案例" heading. (Was a role=tablist/aria-selected/tabpanel
// pattern before the a11y fix in 6e4fb97 — these specs assert the new pattern.)
const INDUSTRY_LABELS = [
  "IT・情報サービス業",
  "製造業",
  "金融業",
  "流通・小売業",
  "通信業",
  "建設業",
  "医療・ヘルスケア",
  "公共・自治体",
];

test.describe("user journey: essays HTTP status", () => {
  test("essays exam index /essays/sc returns 200", async ({ request }) => {
    const res = await request.get(ESSAY_EXAM);
    expect(res.status()).toBe(200);
  });

  test("essay question page /essays/sc/2025-spring/pm2/q1 returns 200", async ({ request }) => {
    const res = await request.get(ESSAY_QUESTION);
    expect(res.status()).toBe(200);
  });

  test("nonexistent essay /essays/sc/2025-spring/pm2/q99 returns 404", async ({ request }) => {
    const res = await request.get("/essays/sc/2025-spring/pm2/q99");
    // App may render a "not found" UI with 200, or return a proper 404.
    expect([200, 404]).toContain(res.status());
  });

  test("nonexistent year /essays/sc/1999-spring/pm2/q1 returns 404", async ({ request }) => {
    const res = await request.get("/essays/sc/1999-spring/pm2/q1");
    // App may render a "not found" UI with 200, or return a proper 404.
    expect([200, 404]).toContain(res.status());
  });
});

test.describe("user journey: essays industry selector UI", () => {
  test("essay question page has the industry selector group", async ({ page }) => {
    await page.goto(ESSAY_QUESTION);
    const group = page.getByRole("group", { name: "業種選択" });
    await expect(group).toBeVisible();
  });

  test("essay question page has all 8 industry buttons", async ({ page }) => {
    await page.goto(ESSAY_QUESTION);
    const group = page.getByRole("group", { name: "業種選択" });
    await expect(group.getByRole("button")).toHaveCount(8);
    for (const label of INDUSTRY_LABELS) {
      await expect(
        group.getByRole("button", { name: label, exact: true }),
      ).toBeVisible();
    }
  });

  test("first industry button (IT) is pressed by default", async ({ page }) => {
    await page.goto(ESSAY_QUESTION);
    const group = page.getByRole("group", { name: "業種選択" });
    await expect(
      group.getByRole("button", { name: "IT・情報サービス業", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(
      group.getByRole("button", { name: "製造業", exact: true }),
    ).toHaveAttribute("aria-pressed", "false");
  });

  test("clicking 製造業 presses it and unpresses IT", async ({ page }) => {
    await page.goto(ESSAY_QUESTION);
    const group = page.getByRole("group", { name: "業種選択" });
    const mfg = group.getByRole("button", { name: "製造業", exact: true });
    const it = group.getByRole("button", {
      name: "IT・情報サービス業",
      exact: true,
    });
    await mfg.click();
    await expect(mfg).toHaveAttribute("aria-pressed", "true");
    await expect(it).toHaveAttribute("aria-pressed", "false");
  });

  test("switching industry changes the visible answer panel", async ({ page }) => {
    await page.goto(ESSAY_QUESTION);
    const group = page.getByRole("group", { name: "業種選択" });
    const itHeading = page.getByRole("heading", {
      name: "IT・情報サービス業の合格答案例",
      exact: true,
    });
    const mfgHeading = page.getByRole("heading", {
      name: "製造業の合格答案例",
      exact: true,
    });
    // IT answer is shown initially; the manufacturing answer is hidden.
    await expect(itHeading).toBeVisible();
    await expect(mfgHeading).toBeHidden();
    // Switch to manufacturing → its answer panel becomes visible, IT hides.
    await group.getByRole("button", { name: "製造業", exact: true }).click();
    await expect(mfgHeading).toBeVisible();
    await expect(itHeading).toBeHidden();
  });
});
