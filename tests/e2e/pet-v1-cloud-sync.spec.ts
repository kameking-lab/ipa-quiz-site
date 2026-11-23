import { expect, test } from "@playwright/test";
import type { BrowserContext, Page, Route } from "@playwright/test";
import { getPetCloudProfile, PetCloudLimiter, putPetCloudProfile } from "../../lib/pet/server/cloud-profile";
import type { PetCloudDeps, PetCloudRow } from "../../lib/pet/server/cloud-profile";

// No database or real account: sessions are stubbed per browser and the pet
// API is answered in this test process by the real route handlers backed by
// an in-memory compare-and-set store. The browser sends its own Origin /
// Sec-Fetch-Site headers, so the same-origin guard is exercised as well.
const quiz = "/quiz?mode=year&exam=ap&year=2023&season=spring&session=am";
const guestKey = "ipa-quiz:pet-profiles:v1:guest";
const aliceKey = "ipa-quiz:pet-profiles:v1:user%3Aalice";
test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: "reduce" });

const rows = new Map<string, PetCloudRow>();
let writes = 0;
function deps(user: () => string | null): PetCloudDeps {
  return {
    userId: async () => user(), now: Date.now, limiter: new PetCloudLimiter(),
    repository: () => ({
      async findVersion(userId) { return rows.get(userId)?.version ?? null; },
      async find(userId) { const row = rows.get(userId); return row ? structuredClone(row) : null; },
      async create(userId, document) { if (rows.has(userId)) return false; rows.set(userId, { document, version: 1 }); writes++; return true; },
      async update(userId, expected, document) {
        if (rows.get(userId)?.version !== expected) return false;
        rows.set(userId, { document, version: expected + 1 }); writes++; return true;
      },
    }),
  };
}
async function signedIn(context: BrowserContext, user: () => string | null) {
  await context.route("**/api/auth/session", route => {
    const id = user();
    return route.fulfill({ json: id ? { user: { id, email: `${id}@example.invalid` }, expires: "2099-01-01T00:00:00.000Z" } : {} });
  });
  await context.route("**/api/pet/profile**", async (route: Route) => {
    const request = route.request(), headers = await request.allHeaders();
    const forwarded = new Request(request.url(), {
      method: request.method(),
      headers: Object.fromEntries(["origin", "sec-fetch-site", "content-type"].filter(name => headers[name]).map(name => [name, headers[name]])),
      body: request.method() === "PUT" ? request.postData() ?? "" : undefined,
    });
    const response = request.method() === "PUT" ? await putPetCloudProfile(forwarded, deps(user)) : await getPetCloudProfile(forwarded, deps(user));
    await route.fulfill({ status: response.status, contentType: "application/json", body: await response.text() });
  });
}
const apProfile = (page: Page, key: string) => page.evaluate(key => {
  const raw = localStorage.getItem(key);
  return raw ? (JSON.parse(raw).profiles as { qualificationId: string; growth: number; name: string }[]).find(p => p.qualificationId === "ap") ?? null : null;
}, key);
async function answerFirst(page: Page) {
  await page.goto(quiz);
  await page.waitForURL(url => url.searchParams.get("question") === "ap-2023h-am-q1");
  await page.getByRole("radio").first().tap();
  await expect(page.locator('[aria-label="解答結果"]')).toBeVisible();
}

test("guest study → sign-in → a different new browser signs in → the same chihuahua", async ({ browser, page, context }, testInfo) => {
  test.setTimeout(90_000);
  rows.clear(); writes = 0;
  // Phone: study as a guest and name the chihuahua.
  let phoneUser: string | null = null;
  await signedIn(context, () => phoneUser);
  const apiCalls: string[] = [];
  page.on("request", request => { if (request.url().includes("/api/pet/profile")) apiCalls.push(request.method()); });
  await answerFirst(page);
  await expect.poll(() => apProfile(page, guestKey).then(p => p?.growth), { timeout: 15_000 }).toBe(3);
  await page.evaluate(key => { const doc = JSON.parse(localStorage.getItem(key)!); doc.revision++; doc.profiles[0].name = "ポチ"; localStorage.setItem(key, JSON.stringify(doc)); }, guestKey);
  await page.waitForTimeout(1500);
  expect(apiCalls, "guests never call the cloud API").toEqual([]);

  // Sign in on the phone: the guest chihuahua moves to the account and is saved.
  phoneUser = "alice";
  await page.reload();
  await expect.poll(() => rows.get("alice")?.version ?? 0, { timeout: 30_000 }).toBeGreaterThanOrEqual(1);
  expect(await apProfile(page, aliceKey)).toMatchObject({ growth: 3, name: "ポチ" });
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key) ?? '{"profiles":[1]}').profiles.length, guestKey)).toBe(0);
  const stored = rows.get("alice")!.document as { document: { ownerScope: string; events?: unknown[]; profiles: { name: string; growth: number }[] } };
  expect(stored.document).toMatchObject({ ownerScope: "user:alice", profiles: [{ name: "ポチ", growth: 3 }] });
  expect(stored.document.events ?? []).toEqual([]);

  // PC: a completely new browser (no local data) signs in as the same account.
  const baseURL = testInfo.project.use.baseURL!;
  const pc = await browser.newContext({ viewport: { width: 1280, height: 900 },
    storageState: { cookies: [], origins: [{ origin: new URL(baseURL).origin, localStorage: [{ name: "ipa-quiz:onboarded:v1", value: "1" }] }] } });
  try {
    await signedIn(pc, () => "alice");
    const pcPage = await pc.newPage();
    await pcPage.goto(quiz);
    await expect.poll(() => apProfile(pcPage, aliceKey), { timeout: 30_000 }).toMatchObject({ growth: 3, name: "ポチ" });
    const view = (target: Page) => target.evaluate(key => {
      const doc = JSON.parse(localStorage.getItem(key)!);
      return doc.profiles.map((p: Record<string, unknown>) => ({ ...p, combo: null }));
    }, aliceKey);
    expect(await view(pcPage)).toEqual(await view(page));
    const care = pcPage.getByRole("button", { name: "育成を見る" });
    if (await care.isVisible().catch(() => false)) {
      await care.click();
      await pcPage.screenshot({ path: "test-results/pet-v1/cloud-sync-second-browser.png" });
    }
    // Opening the same state again writes nothing new.
    const before = writes;
    await pcPage.reload();
    await pcPage.waitForTimeout(3000);
    expect(writes).toBe(before);
  } finally { await pc.close(); }
});
