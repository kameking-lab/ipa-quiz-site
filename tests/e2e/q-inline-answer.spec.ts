import { test, expect, type APIRequestContext } from "@playwright/test";

/**
 * /q/* inline "solve in place" + SSR-preservation guard (致命傷⑤).
 *
 * The /q/* pages are the search-entry surface. Previously a visitor could only
 * read them and had to hop to /quiz to actually answer. This verifies:
 *   1. SEO assets are intact — the question choices and the QAPage JSON-LD ship
 *      in the server-rendered HTML (crawlable / readable with JS off).
 *   2. After hydration the visitor can answer in place: clicking a choice
 *      reveals correct/incorrect and surfaces the explanation, no navigation.
 */

/** Pick a real /q URL from the questions sitemap, preferring an SSG'd recent
 *  year so the page is prerendered (fast) rather than ISR-on-first-hit. */
async function pickQuestionUrl(request: APIRequestContext): Promise<string> {
  const xml = await (await request.get("/sitemap/questions/0.xml")).text();
  const locs = [...xml.matchAll(/<loc>([^<]+\/q\/[^<]+)<\/loc>/g)].map((m) => m[1]);
  expect(locs.length, "questions sitemap must list /q/ URLs").toBeGreaterThan(0);
  const recent = locs.find((u) => /\/q\/[^/]+\/(202[4-9]|20[3-9]\d)-/.test(u));
  const abs = recent ?? locs[0];
  return new URL(abs).pathname; // baseURL-relative
}

test.describe("/q inline answer", () => {
  test("server-rendered HTML keeps the choices + QAPage JSON-LD (SEO/no-JS)", async ({
    request,
  }) => {
    const path = await pickQuestionUrl(request);
    const res = await request.get(path);
    expect(res.status()).toBe(200);
    const html = await res.text();

    // QAPage structured data preserved.
    expect(html).toContain('"@type":"QAPage"');
    // Choices ship in SSR HTML as a radiogroup of radio buttons with text.
    expect(html).toMatch(/role="radiogroup"/);
    const radioCount = (html.match(/role="radio"/g) ?? []).length;
    expect(radioCount).toBeGreaterThanOrEqual(2);
    // The explanation anchor target is present.
    expect(html).toMatch(/id="explanation"/);
  });

  test("clicking a choice grades in place and reveals the explanation (no nav)", async ({
    page,
    request,
  }) => {
    const path = await pickQuestionUrl(request);
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
    request,
  }) => {
    const path = await pickQuestionUrl(request);
    await page.goto(path);
    const first = page.getByRole("radio").first();
    await first.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByText(/正解|不正解/).first()).toBeVisible();
  });
});
