import { test, expect } from "@playwright/test";

for (const exam of ["ap", "sc", "fe"]) {
  test(`${exam} year cards separate coverage range from total count`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/${exam}`);
    await page.getByRole("tab", { name: "年度別", exact: true }).click();
    const text = await page.locator("main").innerText();

    // A card's range explanation and its right-side badge must not repeat the
    // same "NN問" token (for example, "67問 67問").
    expect(text).not.toMatch(/(\d+問)\s*\1/);
  });
}
