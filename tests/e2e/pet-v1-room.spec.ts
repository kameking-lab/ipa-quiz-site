import { expect, test } from "@playwright/test";
import { emptyPetProfiles, newPetProfile, serializePetProfileDocument } from "../../lib/pet/v1/profile";
import { allowLoopbackWebKit } from "./helpers/local-webkit";
import { petPortraitFor } from "../../lib/pet/v1/art";
import { openPetGrowth, roomPet, seedRoomPet } from "./helpers/pet-ui";
const key = "ipa-quiz:pet-profiles:v1:guest";
function seed() {
  const doc = emptyPetProfiles("guest", "Asia/Tokyo"), pet = newPetProfile("guest", "ap");
  pet.name = "こむぎ"; pet.unlockedStages.push("partner"); pet.selectedStage = "partner";
  pet.unlockedPaths.push("memory"); pet.selectedPath = "memory";
  pet.roomEvents.push({ scene: "first-meeting", day: "2026-11-05", occurredAt: Date.parse("2026-11-05T12:00:00+09:00") }); doc.profiles.push(pet);
  return serializePetProfileDocument(doc);
}
test.use({ isMobile: true, hasTouch: true, viewport: { width: 390, height: 844 }, reducedMotion: "reduce", serviceWorkers: "block" });
test.beforeEach(async({page,browserName})=>allowLoopbackWebKit(page,browserName));
for (const width of [320, 390]) test(`pet growth and album survive reload in the private room (${width}px)`, async ({ page, context, browserName }, testInfo) => {
  await page.setViewportSize({ width, height: 844 });
  await context.route("**/api/auth/session", route => route.fulfill({ json: {} }));
  await seedRoomPet(page, key, seed());
  await page.goto("/me");
  const room = roomPet(page);
  await expect(room.getByText("こむぎ", { exact: true })).toBeVisible();
  const before = await page.evaluate(key => localStorage.getItem(key), key);
  const image = room.getByRole("img", { name: /のチワワ（くつろぎ）/ });
  await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  await page.screenshot({ path: testInfo.outputPath(`private-room-${width}.png`) });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.reload();
  await expect(room.getByText("こむぎ", { exact: true })).toBeVisible();
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBe(before);
  const sheet = await openPetGrowth(page);
  const portrait = sheet.locator("[data-pet-pose] img").first();
  await expect(portrait).toHaveAttribute("src", petPortraitFor("ap", "partner", "study"));
  await sheet.locator("summary").filter({ hasText: /^姿$/ }).tap();
  await sheet.getByRole("button", { name: /^こいぬ/ }).tap();
  await expect(sheet.getByRole("button", { name: /^こいぬ/ })).toHaveAttribute("aria-pressed", "true");
  await expect(portrait).toHaveAttribute("src", petPortraitFor("ap", "puppy", "correct"));

  const other = await context.newPage();
  await allowLoopbackWebKit(other, browserName);
  await other.goto("/me");
  const reopened = await openPetGrowth(other);
  await expect(reopened.locator("[data-pet-pose] img").first()).toHaveAttribute("src", petPortraitFor("ap", "puppy", "study"));
  await reopened.locator("summary").filter({ hasText: /^思い出$/ }).click();
  await expect(reopened.getByRole("heading", { name: "自習室のアルバム" })).toBeVisible();
  await expect(reopened.getByText("いつもの机", { exact: true })).toBeVisible();
  await other.close();
});
