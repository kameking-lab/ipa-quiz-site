import { expect, test } from "@playwright/test";
import { answerPet } from "./helpers/pet-ui";
const quiz = "/quiz?mode=year&exam=ap&year=2023&season=spring&session=am";
const key = "ipa-quiz:pet-profiles:v1:guest";

test.use({ isMobile: true, hasTouch: true, viewport: { width: 390, height: 844 }, serviceWorkers: "block" });

for (const width of [320, 390]) {
  test(`answer growth stays compact and the room retains care at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 844 });
    await page.route("**/api/auth/session", route => route.fulfill({ json: {} }));
    await page.goto(quiz);
    await page.getByRole("radio").first().tap();
    const corner = answerPet(page);
    await expect(corner).toHaveAttribute("data-pet-id", '["guest","ap"]');
    await expect(corner.getByRole("button")).toHaveCount(0);
    const box = await corner.boundingBox();
    expect(box!.x).toBeGreaterThanOrEqual(0);
    expect(box!.x + box!.width).toBeLessThanOrEqual(width);
    const before = await page.evaluate(key => localStorage.getItem(key), key);
    await page.screenshot({ path: testInfo.outputPath(`answer-pet-${width}.png`) });
    await page.goto("/me");
    const room = page.getByRole("region", { name: "チワワの部屋" });
    await room.getByRole("button", { name: "チワワをなでる" }).tap();
    await expect(room.getByRole("status")).toContainText("なでなで");
    expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(before);
  });
}
