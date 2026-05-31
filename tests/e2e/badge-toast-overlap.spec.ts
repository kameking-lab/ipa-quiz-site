import { test, expect } from "@playwright/test";

/**
 * Badge toast must not cover the post-answer controls (致命傷⑧).
 *
 * Answering the first-ever question unlocks the 「はじめの一歩」 badge, which shows
 * an AchievementToast. Previously the toast was bottom-center (bottom-4, z-70)
 * and covered the answer action icons (AIに聞く/星/ブックマーク/共有) and the
 * 「次の問題へ」 CTA, blocking interaction. It is now anchored to the top, clear of
 * every bottom/mid control. Run on a mobile viewport (the reported context).
 *
 * NOTE: assertions target the toast itself (its placement / non-overlap), not a
 * raw click on the very-bottom CTA — that bottom CTA is independently overlapped
 * by the global MobileBottomNav (a separate pre-existing issue, see the log),
 * which would confound a toast-specific regression test.
 */
test.use({ viewport: { width: 375, height: 667 } });

async function answerFirst(page: import("@playwright/test").Page) {
  await page.goto("/quiz?mode=random&exam=ap");
  const firstChoice = page.getByRole("radio").first();
  await expect(firstChoice).toBeVisible();
  await firstChoice.click();
}

test.describe("badge toast / post-answer controls", () => {
  test("the badge toast is anchored at the top, clear of the controls below", async ({ page }) => {
    await answerFirst(page);
    const toast = page.getByTestId("achievement-toast");
    await expect(toast, "first answer should unlock 「はじめの一歩」").toBeVisible();

    const vp = page.viewportSize()!;
    const box = (await toast.boundingBox())!;
    expect(box).not.toBeNull();
    // Anchored near the top…
    expect(box.y).toBeLessThan(200);
    // …and entirely within the upper half — so it cannot overlap the mid/bottom
    // answer controls (the bug was a bottom-anchored toast).
    expect(box.y + box.height).toBeLessThan(vp.height * 0.5);
  });

  test("the toast does not overlap the next-question CTA bar", async ({ page }) => {
    await answerFirst(page);
    const toast = page.getByTestId("achievement-toast");
    await expect(toast).toBeVisible();
    // DOM-last 次の問題へ button = the fixed bottom bar (vs the in-card one).
    const nextCta = page.getByRole("button", { name: "次の問題へ" }).last();
    await expect(nextCta).toBeVisible();

    const t = (await toast.boundingBox())!;
    const c = (await nextCta.boundingBox())!;
    expect(t).not.toBeNull();
    expect(c).not.toBeNull();
    expect(t.y + t.height).toBeLessThan(c.y); // toast ends above the CTA bar
  });

  test("auto-dismisses after ~5s with no interaction (does not linger over controls)", async ({
    page,
  }) => {
    await answerFirst(page);
    const toast = page.getByTestId("achievement-toast");
    await expect(toast).toBeVisible();
    // Must NOT dismiss prematurely: still present well inside the 5s window.
    // (The pointer rests on the answered choice, not the top-anchored toast, so
    // the hover-pause path is not engaged.)
    await page.waitForTimeout(3000);
    await expect(toast, "toast must stay visible during its 5s window").toBeVisible();
    // …and the AUTO_DISMISS_MS=5000 timer must actually fire, removing it so it
    // never keeps covering the post-answer area indefinitely (致命傷⑧ follow-up).
    await expect(toast, "toast must auto-dismiss after ~5s").toBeHidden({ timeout: 6000 });
  });

  test("a cited action icon (復習) stays clickable after the badge unlocks", async ({ page }) => {
    await answerFirst(page);
    await expect(page.getByTestId("achievement-toast")).toBeVisible();
    // The star / 復習 toggle is one of the icons the review reported as covered;
    // it sits in the ExplanationCard (mid-content), so it is clear of the bottom
    // MobileBottomNav. trial:true throws if the toast (or anything) overlays it.
    const reviewToggle = page.getByRole("button", { name: /復習に追加|復習から外す/ });
    await expect(reviewToggle).toBeVisible();
    await reviewToggle.click({ trial: true });
  });
});
