import type { Page } from "@playwright/test";

export const answerPet = (page: Page) => page.locator('section[data-pet-compact="true"]');
export const roomPet = (page: Page) => page.getByRole("region", { name: "あなたの席", exact: true }).locator('section[data-pet-id]');
export const careButton = (page: Page) => roomPet(page).getByRole("button", { name: /^(育成を見る|学習の相棒の姿を見る|その道のチワワの姿を見る)/ });
