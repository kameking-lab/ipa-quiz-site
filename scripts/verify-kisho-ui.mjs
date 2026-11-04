import { chromium, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const base = process.argv[2] ?? 'http://127.0.0.1:48365';
const output = process.argv[3] ?? path.join(process.env.TEMP ?? '.', 'codex-work/qkishou-fix/browser');
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await context.newPage();
const failures = [];
const localInstrumentation404s = new Set();
page.on('response', r => {
  if (!r.url().startsWith(base) || r.status() < 400) return;
  const pathname = new URL(r.url()).pathname;
  if (r.status() === 404 && ['/_vercel/insights/script.js', '/_vercel/speed-insights/script.js'].includes(pathname)) {
    localInstrumentation404s.add(pathname);
  } else failures.push(`${r.status()} ${pathname}`);
});
page.on('pageerror', error => failures.push(error.message));
const result = {};
try {
  await page.goto(`${base}/qualifications`, { waitUntil: 'domcontentloaded', timeout: 120000 });
  await page.waitForLoadState('networkidle');
  await page.getByText('資格ごとの収録範囲・公式資料を見る', { exact: true }).click();
  const card = page.locator('article').filter({ hasText: '気象予報士' });
  await expect(card).toContainText('学科60問・実技18問');
  await card.getByRole('link', { name: '年度・科目を選ぶ' }).click();
  await expect(page.getByRole('heading', { name: '気象予報士 第65・66回', exact: true })).toBeVisible();
  await expect(page.locator('a[href^="/kisho/study/"]')).toHaveCount(78);
  result.directoryToKisho = 'PASS';
  await page.screenshot({ path: path.join(output, 'directory.png'), fullPage: true });

  const round65 = page.locator('main > section').filter({ has: page.getByRole('heading', { name: /^第65回/ }) });
  await round65.getByRole('link', { name: '通常の学科学習を始める' }).first().click();
  await expect(page.locator('[data-study-presence-exam="kisho"]')).toBeVisible({ timeout: 90000 });
  await expect(page.getByText(/第65回（2026年1月25日）/).first()).toBeVisible();
  await page.getByRole('radio', { name: /^選択肢 1:/ }).click();
  await expect(page.getByRole('region', { name: '不正解の解説' })).toBeVisible();
  await expect(page.getByRole('region', { name: '選択肢ごとの解説' })).toBeVisible();
  const images = page.locator('img[src^="/images/kisho/"]');
  await images.first().scrollIntoViewIfNeeded();
  await expect.poll(() => images.evaluateAll(imgs => imgs.every(img => img.complete && img.naturalWidth > 0))).toBe(true);
  result.normalAcademicWrongAnswerAndAllChoices = 'PASS';
  await page.screenshot({ path: path.join(output, 'academic.png'), fullPage: true });

  await page.goto(`${base}/kisho/study/kisho-65-pm1-q05`, { waitUntil: 'domcontentloaded', timeout: 90000 });
  await expect(page.locator('[data-study-ready="true"]')).toBeVisible({ timeout: 90000 });
  await expect(page.getByText(/記述答案は自動採点しません/)).toBeVisible();
  await page.getByRole('textbox').first().fill('北');
  const firstField = page.locator('[data-answer-field-id]').first();
  await firstField.getByText('例解と根拠を見る', { exact: true }).click();
  await expect(firstField.locator('img').first()).toBeVisible();
  await expect.poll(() => firstField.locator('img').evaluateAll(imgs => imgs.every(img => img.complete && img.naturalWidth > 0))).toBe(true);
  await firstField.getByRole('checkbox').check();
  await firstField.screenshot({ path: path.join(output, 'practical-diagram.png') });
  await page.getByRole('button', { name: '下書きを保存' }).click();
  await page.reload();
  await expect(page.getByRole('textbox').first()).toHaveValue('北');
  await expect(page.locator('[data-answer-field-id]').first().getByRole('checkbox')).toBeChecked();
  result.practicalManualComparisonAndDraftReload = 'PASS';
  await page.locator('[data-answer-field-id]').first().screenshot({ path: path.join(output, 'practical-field.png') });
  await page.screenshot({ path: path.join(output, 'practical.png'), fullPage: true });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/kisho/study/kisho-66-senmon-q07`, { waitUntil: 'domcontentloaded' });
  await page.getByText('原典問題・図表（拡大表示）', { exact: true }).click();
  await expect.poll(() => page.locator('img[src^="/images/kisho/"]').evaluateAll(imgs => imgs.length > 0 && imgs.every(img => img.complete && img.naturalWidth > 0))).toBe(true);
  result.mobileDocumentWidth = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: innerWidth }));
  if (result.mobileDocumentWidth.document > result.mobileDocumentWidth.viewport) throw new Error('Mobile viewport overflow');
  await page.screenshot({ path: path.join(output, 'mobile.png'), fullPage: true });
  if (failures.length) throw new Error(JSON.stringify(failures));
  result.localErrors = failures;
  result.localInstrumentation404s = [...localInstrumentation404s];
  result.status = 'PASS';
} finally {
  fs.writeFileSync(path.join(output, 'result.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result));
  await browser.close();
}
