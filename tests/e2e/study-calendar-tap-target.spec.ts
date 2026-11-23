import { test, expect } from "@playwright/test";
import { LS_KEYS } from "../../lib/storage/keys";

test("daily learning cells are informational and recent records supply the review controls", async ({ page }) => {
  await page.addInitScript((key) => localStorage.setItem(key, JSON.stringify({
    entries: [{ id: "ap-2023h-am-q1", at: Date.now(), selected: "ア", correct: true }], starredIds: [],
  })), LS_KEYS.history);
  await page.goto("/me");
  const heatmap = page.getByRole("region", { name: "日別の学習量" });
  await expect(heatmap.locator('[aria-current="date"]')).toHaveAttribute("aria-label", /1問$/);
  await expect(heatmap.getByRole("button")).toHaveCount(0);
  const review = page.getByRole("region", { name: "最近の記録" }).getByRole("button", { name: /応用情報技術者.*1問/ });
  await expect(review).toBeVisible();
  const box = await review.boundingBox();
  expect(box!.width).toBeGreaterThanOrEqual(24);
  expect(box!.height).toBeGreaterThanOrEqual(24);
});
