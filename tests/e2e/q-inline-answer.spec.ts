import { test, expect } from "@playwright/test";

/**
 * /q/* inline "solve in place" + SSR-preservation guard (致命傷⑤).
 *
 * The /q/* pages are the search-entry surface. Previously a visitor could only
 * read them and had to hop to /quiz to actually answer. This verifies:
 *   1. SEO assets are intact — the question choices and LearningResource JSON-LD ship
 *      in the server-rendered HTML (crawlable / readable with JS off).
 *   2. After hydration the visitor can answer in place: clicking a choice
 *      reveals correct/incorrect and surfaces the explanation, no navigation.
 */

// Keep the single-choice contract independent of sitemap ordering. New exams
// can put multi-select, numeric or ordering questions at the start of a chunk.
const singleChoicePath = "/q/ap/2023-spring/am/q1";

test.describe("/q inline answer", () => {
  test("server-rendered HTML keeps the choices + honest JSON-LD (SEO/no-JS)", async ({
    request,
  }) => {
    const path = singleChoicePath;
    const res = await request.get(path);
    expect(res.status()).toBe(200);
    const html = await res.text();

    expect(html).toContain('"@type":"LearningResource"');
    expect(html).toContain('"@type":"Question"');
    expect(html).not.toContain('"@type":"QAPage"');
    // Choices ship in SSR HTML as a radiogroup of radio buttons with text.
    expect(html).toMatch(/role="radiogroup"/);
    const radioCount = (html.match(/role="radio"/g) ?? []).length;
    expect(radioCount).toBeGreaterThanOrEqual(2);
    // The explanation anchor target is present.
    expect(html).toMatch(/id="explanation"/);
  });

  test("clicking a choice grades in place and reveals the explanation (no nav)", async ({
    page,
  }) => {
    const path = singleChoicePath;
    await page.goto(path);

    const urlBefore = page.url();
    const radios = page.getByRole("radio");
    await expect(radios.first()).toBeVisible();
    await radios.first().click();

    // A result banner appears (正解 / 不正解), the explanation link shows, and we
    // did NOT navigate away.
    await expect(page.getByText(/正解|不正解/).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /解説を読む/ })).toBeVisible();
    expect(page.url()).toBe(urlBefore);

    // The explanation section is present on the page.
    await expect(page.locator("#explanation")).toHaveCount(1);
  });

  test("a choice is keyboard-operable (role=radio, Enter activates)", async ({
    page,
  }) => {
    const path = singleChoicePath;
    await page.goto(path);
    const first = page.getByRole("radio").first();
    await first.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByText(/正解|不正解/).first()).toBeVisible();
  });

  test("a multi-select image question keeps checkboxes in SSR and requires both choices before grading", async ({ page, request }) => {
    const path = "/q/unko-kanrisha-ryokaku/2024-cbt/gakka/q1";
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain('"@type":"LearningResource"');
    expect(html).toContain('role="group"');
    expect((html.match(/role="checkbox"/g) ?? []).length).toBe(4);
    expect(html).toContain("/images/questions/unko-kanrisha-ryokaku/2024-page-01.png");
    await page.goto(path);
    const choices = page.getByRole("checkbox");
    await expect(choices).toHaveCount(4);
    const confirm = page.getByRole("button", { name: "回答を確定", exact: true });
    await choices.nth(1).click();
    await expect(confirm).toBeDisabled();
    await choices.nth(2).click();
    await expect(confirm).toBeEnabled();
    await confirm.click();
    await expect(page.getByRole("status").filter({ hasText: "正解です。下に解説があります。" })).toBeAttached();
    expect(new URL(page.url()).pathname).toBe(path);
  });

  test("an anonymous learner can prepare and manually send an inline AI question about a wrong answer without navigation", async ({ page }) => {
    const sent: Array<{
      question?: { id?: string }; selectedChoice?: string; isCorrect?: boolean;
      messages?: Array<{ role: string; content: string }>;
    }> = [];
    // Test the browser request contract only: never contact a provider or consume AI quota.
    await page.route("**/api/copilot", async (route) => {
      sent.push(route.request().postDataJSON());
      await route.fulfill({ status: 401, contentType: "application/json", body: JSON.stringify({ error: "sign_in_required" }) });
    });
    await page.goto("/q/tohan/2025-kansai/gakka/q1");
    const urlBefore = page.url();
    const inline = page.getByRole("region", { name: "この問題についてAIに質問", exact: true });
    await expect(inline).toHaveCount(1);
    await expect(inline).toBeVisible();
    const input = inline.getByRole("textbox", { name: /AIへの質問を入力/ });
    await expect(input).toBeVisible();
    await expect(input).toHaveValue("");

    await page.getByRole("radio").first().click();
    const wrongAnswerAction = page.getByRole("button", { name: "誤答をAIに質問", exact: true });
    await wrongAnswerAction.click();
    await expect(page.getByRole("dialog", { name: "AI コパイロット" })).toHaveCount(0);
    const wrongPrompt = "私が選んだ答えがなぜ違うのか、正解との違いをこの問題に沿って説明してください。";
    await expect(input).toHaveValue(wrongPrompt);
    await expect(input).toBeFocused();
    expect(page.url()).toBe(urlBefore);
    expect(sent).toHaveLength(0);

    const draft = `${wrongPrompt} 選んだ選択肢と正解の違いを確認したいです。`;
    await input.fill(draft);
    await wrongAnswerAction.click();
    await expect(input).toHaveValue(draft); // A repeat focus request must not overwrite the learner's draft.
    await expect(input).toBeFocused();
    await expect(inline).toHaveCount(1);
    expect(sent).toHaveLength(0); // Answering/focusing/editing are not automatic sends.
    page.once("dialog", async dialog => {
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toContain("Google Gemini");
      await dialog.dismiss();
    });
    await inline.getByRole("button", { name: "送信", exact: true }).click();
    await expect(input).toHaveValue(draft);
    expect(sent).toHaveLength(0); // Refusing AI consent must not send the draft.
    page.once("dialog", async dialog => {
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toContain("Google Gemini");
      await dialog.accept();
    });
    await inline.getByRole("button", { name: "送信", exact: true }).click();
    await expect.poll(() => sent.length).toBe(1);
    expect(sent[0]).toMatchObject({ question: { id: "tohan-2025-kansai-gakka-q1" }, selectedChoice: "ア", isCorrect: false });
    expect(sent[0].messages?.at(-1)).toEqual({ role: "user", content: draft });
    await expect(input).toHaveValue(draft); // The intercepted login denial must retain editable input.
    expect(page.url()).toBe(urlBefore);
    expect(sent).toHaveLength(1);
  });
});
