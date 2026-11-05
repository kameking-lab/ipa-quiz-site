import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { chromium, expect } from '@playwright/test';

const base = 'http://127.0.0.1:3188';
const out = path.resolve('reports/int8-20261105/screenshots');
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch();
const receipts = [];
try {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, reducedMotion: 'reduce', serviceWorkers: 'block' });
  await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
  await context.addInitScript(() => localStorage.setItem('ipa-quiz:onboarded:v1', '1'));
  const page = await context.newPage();
  let errors = [], ai = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('request', r => { if (/\/api\/(copilot|scoring|essay-grade)/.test(r.url())) ai.push(r.url()); });
  async function capture(name) {
    await page.screenshot({ path: path.join(out, name + '.png') });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
    receipts.push({ name, url: page.url(), viewport: page.viewportSize(), overflow, errors: [...errors], ai: [...ai] });
    assert.equal(overflow, false, name + ' overflow');
    assert.deepEqual(errors, [], name + ' browser errors');
    assert.deepEqual(ai, [], name + ' unwanted AI requests');
    errors = []; ai = [];
  }
  for (const exam of ['sc', 'nw', 'st', 'sa', 'ap']) {
    await page.goto(`${base}/${exam}`, { waitUntil: 'networkidle' });
    await expect(page.getByRole('navigation', { name: '学習メニュー' })).toBeInViewport({ ratio: 1 });
    await capture(exam + '-390');
    await page.setViewportSize({ width: 320, height: 844 });
    await capture(exam + '-320');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#topics').scrollIntoViewIfNeeded();
    await capture(exam + '-topics-390');
    await page.locator('#afternoon').scrollIntoViewIfNeeded();
    await capture(exam + '-afternoon-390');
  }
  await page.goto(`${base}/blog/it-shikaku-rirekisho-kakikata`, { waitUntil: 'networkidle' });
  const practice = page.getByRole('region', { name: '記事から1問チャレンジ' });
  await practice.scrollIntoViewIfNeeded();
  await capture('blog-practice-before-390');
  await practice.getByRole('radio').first().tap();
  await expect(practice.getByRole('status')).toBeInViewport();
  await capture('blog-practice-answer-390');
  await practice.getByRole('link', { name: '同じ分野の演習を続ける' }).tap();
  await expect(page.getByRole('radio').first()).toBeEnabled();
  await capture('blog-continue-quiz-390');
  await page.getByRole('radio').first().tap();
  await expect(page.getByRole('region', { name: /^(正解|不正解)の解説$/ })).toBeInViewport();
  await capture('quiz-answer-390');
  for (const route of ['/benrishi', '/sokuryoshi', '/contact?site=tsugino']) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await capture(route.split('?')[0].slice(1) + '-390');
  }
  await context.close();
} finally {
  await browser.close();
  await fs.writeFile('reports/int8-20261105/visual-receipt.json', JSON.stringify({ base, externalNetwork: 'blocked', screenshots: receipts }, null, 2) + '\n');
}
console.log(`Captured ${receipts.length} mobile screens; no overflow, browser errors or AI requests.`);
