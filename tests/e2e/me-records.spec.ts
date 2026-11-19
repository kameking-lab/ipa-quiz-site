import { expect, test, type Page } from "@playwright/test";
import { emptyPetProfiles, petProfileStorageKey, serializePetProfileDocument } from "../../lib/pet/v1/profile";
import { applyPetLearningFact } from "../../lib/pet/v1/learning";
import { LS_KEYS } from "../../lib/storage/keys";
import { jstDateString } from "../../lib/streak/core";

const evidence = process.env.ME_EVIDENCE_DIR ?? "test-results/me";
const key = petProfileStorageKey("guest");
test.use({ serviceWorkers: "block", reducedMotion: "reduce" });

function fixture() {
  const now = Date.now(), today = jstDateString(new Date(now));
  let doc = emptyPetProfiles("guest", "Asia/Tokyo");
  const entries = Array.from({ length: 30 }, (_, index) => {
    const exam = index < 20 ? "ap" : "fp2";
    const id = `${exam}-2023h-am-q${index % 20 + 1}`;
    const at = now - (30 - index) * 10000;
    doc = applyPetLearningFact(doc, { eventId: `me-${index}`, ownerScope: "guest", qualificationId: exam,
      canonicalQuestionId: id, contentVersion: "v1", sessionId: "me", attemptKind: "answer", grade: index % 2 ? "incorrect" : "correct",
      occurredAt: at, reviewCycleId: null, policyVersion: 1 }, 10).document;
    return { id, at, correct: index % 2 === 0, selected: "ア" };
  });
  doc.profiles[0].care.autoFeed = false;
  doc.profiles[0].care.meals[0].consumedAt = null;
  return { doc, entries, today };
}

async function setup(page: Page, paid = false) {
  await page.route("**/api/auth/session", route => route.fulfill({ json: {} }));
  await page.route("**/api/billing/status", route => route.fulfill({ json: { entitled: paid } }));
  const data = fixture();
  await page.addInitScript(({ data, key, keys }) => {
    if (localStorage.getItem(keys.history)) return;
    localStorage.setItem(keys.history, JSON.stringify({ entries: data.entries, starredIds: [] }));
    localStorage.setItem(key, data.raw);
    localStorage.setItem(keys.studyDays, JSON.stringify({ byDate: { [data.today]: 30 }, lastSeenAt: 0, lastEntryCount: 30 }));
    localStorage.setItem(keys.lastQuestion, JSON.stringify({ exam: "ap", year: 2023, season: "spring", session: "am", qNumber: 1, answeredAt: Date.now() }));
    localStorage.setItem(keys.studyPlans, JSON.stringify([{ input: { exam: "ap" }, result: "passed" }]));
  }, { data: { entries: data.entries, today: data.today, raw: serializePetProfileDocument(data.doc) }, key, keys: LS_KEYS });
  return data;
}

for (const width of [390, 1280]) test(`records, room and day review at ${width}px`, async ({ page }) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width, height: 900 });
  const data = await setup(page);
  const errors: string[] = []; page.on("pageerror", error => errors.push(error.message));
  await page.goto("/me");
  const room = page.getByRole("region", { name: "チワワの部屋" });
  await expect(room).toHaveAttribute("data-pet-stage", "expert");
  await expect(room.getByLabel("合格証")).toContainText("応用情報");
  const stats = page.locator('dl[aria-label="学習の数字"]');
  await expect(stats).toContainText("これまでの問題数30問");
  await expect(page.getByRole("button", { name: /^\d{4}-\d{2}-\d{2} \d+問$/ })).toHaveCount(84);
  const read = () => page.evaluate(key => localStorage.getItem(key), key);
  const before = await read();
  await room.getByRole("button", { name: "チワワをなでる" }).click();
  await expect(room.getByRole("status")).toHaveText("なでなで、うれしそう。"); expect(await read()).toBe(before);
  await page.screenshot({ path: `${evidence}/me-${width}.png`, fullPage: true, animations: "disabled" });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: `${data.today} 30問`, exact: true }).click();
  const review = page.getByRole("dialog", { name: /の記録$/ });
  await expect(review.getByRole("link")).toHaveCount(30);
  await expect(review.getByRole("link").first()).toHaveAttribute("href", /^\/me\/review\//);
  await page.keyboard.press("Escape");
  const today = page.getByRole("button", { name: `${data.today} 30問`, exact: true });
  await expect(today).toBeFocused();
  const target = await today.boundingBox();
  expect(target!.width).toBeGreaterThanOrEqual(44);
  expect(target!.height).toBeGreaterThanOrEqual(44);
  const recent = page.locator('section[aria-labelledby="me-recent"] button').first();
  await recent.click();
  await expect(review).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(recent).toBeFocused();
  await room.getByRole("button", { name: "ごはんをあげる" }).click();
  await expect(room.getByRole("button", { name: "ごはんをあげる" })).toHaveCount(0);
  await room.getByRole("button", { name: "チワワの設定", exact: true }).click();
  await page.getByRole("dialog", { name: "チワワの設定" }).getByRole("button", { name: "着がえ", exact: true }).click();
  const clothes = page.getByRole("dialog", { name: "着がえ", exact: true });
  await clothes.getByText("小物", { exact: true }).click();
  await clothes.getByText("服", { exact: true }).click();
  await expect(clothes.getByRole("button", { name: /金の晴れ着/ })).toBeDisabled();
  await clothes.getByRole("button", { name: "マフラー", exact: true }).click();
  await expect(clothes.getByRole("button", { name: "マフラー", exact: true })).toHaveAttribute("aria-pressed", "true");
  await clothes.getByLabel("資格の服").selectOption("fp2");
  await page.keyboard.press("Escape");
  await expect(room).toHaveAttribute("data-pet-stage", "expert");
  await expect(room.getByRole("button", { name: "チワワの設定", exact: true })).toBeFocused();
  expect(errors).toEqual([]);
});

test("settings keep name, motion, backup and guarded restore together", async ({ page }) => {
  test.setTimeout(90000);
  await page.setViewportSize({ width: 390, height: 844 }); await setup(page);
  await page.goto("/me");
  const room = page.getByRole("region", { name: "チワワの部屋" });
  await room.getByRole("button", { name: "チワワ", exact: true }).click();
  const sheet = page.getByRole("dialog", { name: "チワワの設定" });
  await sheet.getByLabel("名前", { exact: true }).fill("こむぎ"); await sheet.getByRole("button", { name: "名前を保存" }).click();
  await expect(sheet.getByRole("status")).toHaveText("保存しました。");
  await sheet.getByRole("checkbox", { name: "動き", exact: true }).uncheck();
  const download = page.waitForEvent("download"); await sheet.getByRole("button", { name: "バックアップを保存", exact: true }).click();
  const raw = await page.evaluate(key => localStorage.getItem(key)!, key);
  expect((await download).suggestedFilename()).toBe("chihuahua-backup.json");
  await sheet.getByLabel("名前", { exact: true }).fill("そら"); await sheet.getByRole("button", { name: "名前を保存" }).click();
  await expect(sheet.getByRole("status")).toHaveText("保存しました。");
  await sheet.getByLabel("バックアップを読み込む").setInputFiles({ name: "backup.json", mimeType: "application/json", buffer: Buffer.from(JSON.stringify({ format: "kakomon-pet-local", version: 1, document: JSON.parse(raw) })) });
  await expect(sheet.getByRole("button", { name: "確認したデータを復元" })).toBeDisabled();
  const safety = page.waitForEvent("download"); await sheet.getByRole("button", { name: "復元前のデータを保存", exact: true }).click(); await safety;
  await sheet.getByRole("checkbox", { name: "退避ファイルを保存したことを確認し、置き換えます" }).check();
  await sheet.getByRole("button", { name: "確認したデータを復元" }).click(); await expect(sheet.getByRole("status")).toHaveText("復元しました。");
  await expect(sheet.getByLabel("名前", { exact: true })).toHaveValue("こむぎ");
  await page.screenshot({ path: `${evidence}/me-settings-390.png`, animations: "disabled" });
  await page.keyboard.press("Escape"); await expect(room.getByRole("button", { name: "こむぎ", exact: true })).toBeFocused();
  await page.reload(); await expect(room.getByRole("button", { name: "こむぎ", exact: true })).toBeVisible();
});

test("paid clothes use the existing server entitlement and survive reload", async ({ page }) => {
  await setup(page, true); await page.goto("/me");
  await page.getByRole("button", { name: "チワワの設定", exact: true }).click();
  await page.getByRole("dialog", { name: "チワワの設定" }).getByRole("button", { name: "着がえ", exact: true }).click();
  const sheet = page.getByRole("dialog", { name: "着がえ", exact: true });
  await sheet.getByText("服", { exact: true }).click();
  await sheet.getByRole("button", { name: /金の晴れ着/ }).click();
  await expect(sheet.getByRole("button", { name: /金の晴れ着/ })).toHaveAttribute("aria-pressed", "true");
  await sheet.getByRole("button", { name: /星のブローチ/ }).click();
  await expect(sheet.getByRole("button", { name: /星のブローチ/ })).toHaveAttribute("aria-pressed", "true");
  await page.reload(); await page.getByRole("button", { name: "チワワの設定", exact: true }).click();
  await page.getByRole("dialog", { name: "チワワの設定" }).getByRole("button", { name: "着がえ", exact: true }).click();
  await expect(sheet.getByRole("button", { name: /金の晴れ着/ })).toHaveAttribute("aria-pressed", "true");
  await expect(sheet.getByRole("button", { name: /星のブローチ/ })).toHaveAttribute("aria-pressed", "true");
  await page.screenshot({ path: `${evidence}/me-paid-clothes.png`, animations: "disabled" });
  await page.keyboard.press("Escape");
  await page.screenshot({ path: `${evidence}/me-paid-room-390.png`, animations: "disabled" });
});

test("an empty first visit never creates a pet or fabricates a certificate", async ({ page }) => {
  await page.route("**/api/auth/session", route => route.fulfill({ json: {} }));
  await page.route("**/api/billing/status", route => route.fulfill({ json: { entitled: false } }));
  await page.goto("/me"); await expect(page.getByText("まだ記録がありません", { exact: true })).toBeVisible();
  await expect(page.getByLabel("合格証")).toHaveCount(0);
  expect(await page.evaluate(key => localStorage.getItem(key), key)).toBeNull();
});

test("a saved question opens its existing canonical question page", async ({ page }) => {
  test.setTimeout(90000); await setup(page);
  await page.goto("/me/review/ap-2023h-am-q1");
  await expect(page).toHaveURL(/\/q\/ap\/2023-spring\/am\/q1$/);
  await expect(page.locator("main")).toBeVisible();
});
