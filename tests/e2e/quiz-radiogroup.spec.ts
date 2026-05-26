import { test, expect } from "@playwright/test";

// Empirical review F-2: the quiz choices were plain <button>s with no
// role=radio / role=radiogroup / aria-checked and no arrow-key roving. This
// verifies the radiogroup semantics + roving focus + Space-to-select.
test.describe("quiz answer radiogroup", () => {
  test("renders a radiogroup of 4 radios with roving arrow keys and Space select", async ({
    page,
  }) => {
    await page.goto("/quiz?mode=random&exam=ap");

    const group = page.locator('[role="radiogroup"]');
    await expect(group).toBeVisible({ timeout: 15000 });

    const radios = group.getByRole("radio");
    await expect(radios).toHaveCount(4);

    // Single Tab stop: exactly one radio is tabbable before any selection.
    const tabbable = group.locator('[role="radio"][tabindex="0"]');
    await expect(tabbable).toHaveCount(1);

    // Focus the first radio, ArrowDown should move focus to the second.
    const first = radios.nth(0);
    await first.focus();
    await expect(first).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(radios.nth(1)).toBeFocused();

    // Arrow alone must NOT commit (answer not revealed yet): still unchecked.
    await expect(radios.nth(1)).toHaveAttribute("aria-checked", "false");

    // Space commits the focused choice → aria-checked flips to true.
    await page.keyboard.press(" ");
    await expect(radios.nth(1)).toHaveAttribute("aria-checked", "true");
  });
});
