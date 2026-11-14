import { test, expect } from "@playwright/test";

test("a previously visited real question remains readable offline in standalone", async ({ page, context }) => {
  await context.addInitScript(() => {
    Object.defineProperty(navigator, "standalone", { value: true });
  });
  await page.goto("/");
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  const path = "/q/ap/2023-spring/am/q1";
  await page.goto(path);
  const choices = page.getByRole("radiogroup");
  await expect(choices).toBeVisible();
  const onlineText = await choices.innerText();
  await expect.poll(() => page.evaluate(async questionPath => {
    const names = (await caches.keys()).filter(name => name.startsWith("ipa-quiz-content-"));
    for (const name of names) if (await (await caches.open(name)).match(questionPath)) return true;
    return false;
  }, path)).toBe(true);
  await page.goto("/");
  await context.setOffline(true);
  await page.goto(path);
  await expect(choices).toBeVisible();
  expect(await choices.innerText()).toBe(onlineText);
  await expect(page.locator("#explanation")).toHaveCount(1);
});
