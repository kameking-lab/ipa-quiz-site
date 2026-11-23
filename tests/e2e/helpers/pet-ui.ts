import { expect, type Page } from "@playwright/test";
import { LS_KEYS } from "../../../lib/storage/keys";

export const answerPet = (page: Page) => page.locator('section[data-pet-compact="true"]');
export const roomPet = (page: Page) => page.getByRole("region", { name: "チワワの部屋", exact: true });
export const careButton = (page: Page) => roomPet(page).getByRole("button", { name: "チワワの設定", exact: true });

export async function seedRoomPet(page: Page, key: string, raw: string) {
  const lastQuestion = { exam: "ap", year: 2023, season: "spring", session: "am", qNumber: 1, answeredAt: Date.now() };
  await page.addInitScript(({ key, raw, lastQuestionKey, lastQuestion }) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, raw);
    if (!localStorage.getItem(lastQuestionKey)) localStorage.setItem(lastQuestionKey, JSON.stringify(lastQuestion));
  }, { key, raw, lastQuestionKey: LS_KEYS.lastQuestion, lastQuestion });
}

export async function openPetGrowth(page: Page) {
  await careButton(page).click();
  const sheet = page.getByRole("dialog", { name: "チワワの設定" });
  await sheet.getByRole("button", { name: "育成の記録", exact: true }).click();
  const growth = page.getByRole("dialog", { name: "チワワの育成" });
  await expect(growth).toBeVisible();
  return growth;
}
