// Actual local production pages, anonymous isolated browser state, no service writes.
import { chromium, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const base = new URL(process.argv[2] ?? 'http://127.0.0.1:3051');
assert.equal(base.hostname, '127.0.0.1');
assert.equal(base.protocol, 'http:');
const out = path.resolve('reports/int1b-20261104/browser');
fs.mkdirSync(out, { recursive: true });
const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const audit = read('reports/int1b-20261104/count-audit.json');
const projection = code => read(`data/questions/batch1/${code}.json`);
const detail = q => `/q/${q.exam}/${q.year}-${q.season}/${q.session}/q${q.qNumber}`;
const samples = [
  ...['chintai', 'kyusui', 'biru-kan', 'gijutsushi1-kikai', 'hoshasen-1', 'hoshasen-2', 'khk-kikai-otsu'].map(code => ({ code, question: projection(code)[0] })),
  { code: 'khk-kikai-kou', question: projection('khk-kikai-kou').find(q => q.type === 'descriptive' && q.answerImageUrls?.length) },
  { code: 'energy-kanri', label: 'sixteen-choices', question: projection('energy-kanri').find(q => Object.keys(q.choices ?? {}).length === 16 && q.answer === 'タ') },
  { code: 'energy-kanri', label: 'scientific', question: projection('energy-kanri').find(q => q.numericAnswer?.format === 'scientific') },
  { code: 'energy-kanri', label: 'decimal', question: projection('energy-kanri').find(q => q.numericAnswer?.format === 'decimal') },
  { code: 'energy-kanri', label: 'unordered-pair', question: projection('energy-kanri').find(q => q.requiredSelections === 2) },
  ...['keiryoshi', 'shihoshoshi', 'denki1', 'kankoji1', 'jken-system', 'jken-katsuyo1', 'shohi-sodan', 'reform-mgr', 'khk-reito-1', 'chizai2', 'shuwa', 'iji-shuzen'].map(code => ({ code })),
];
for (const sample of samples) {
  sample.url = sample.question ? detail(sample.question) : audit.rows.find(row => row.code === sample.code)?.firstUrl;
  assert.ok(sample.url, `Missing sample for ${sample.code}/${sample.label ?? ''}`);
}
const result = { status: 'RUNNING', base: base.href, sourceHead: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  buildId: fs.readFileSync('.next/BUILD_ID', 'utf8').trim(), startedAt: new Date().toISOString(),
  scope: 'Real built local app, anonymous isolated history. External requests, all non-GET requests and AI routes blocked. No route responses mocked.',
  views: [], assets: [], search: [], native: [], blocked: [], errors: [] };
const save = () => fs.writeFileSync(path.join(out, 'receipt.json'), JSON.stringify(result, null, 2) + '\n');
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
async function contextFor(width) {
  const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
  await context.addInitScript(() => localStorage.setItem('ipa-quiz:onboarded:v1', '1'));
  await context.route('**/*', route => {
    const request = route.request(), url = new URL(request.url());
    if (url.origin !== base.origin || request.method() !== 'GET' || /^\/api\/(copilot|scoring|essay-grade|mobile|tts)(\/|$)/.test(url.pathname)) {
      result.blocked.push({ origin: url.origin === base.origin ? 'local' : 'external', path: url.pathname, method: request.method() });
      return route.abort();
    }
    return route.continue();
  });
  return context;
}
async function screenshot(page, name, target) {
  if (target) await target.scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(out, `${name}.png`), animations: 'disabled' });
  const sizes = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
  assert.ok(sizes.document <= sizes.viewport + 1, `${name}: horizontal overflow ${JSON.stringify(sizes)}`);
  return { file: `${name}.png`, sha256: createHash('sha256').update(fs.readFileSync(path.join(out, `${name}.png`))).digest('hex') };
}
try {
  // All generated question/answer image bytes must actually be served unchanged.
  const http = await browser.newContext();
  for (const row of audit.rows) {
    const response = await http.request.get(new URL(`/api/search/questions?exam=${row.code}&limit=1`, base).href, { timeout: 120000 });
    assert.equal(response.status(), 200, row.code);
    const body = await response.json();
    assert.equal(body.total, row.practiceCount, `${row.code}: actual HTTP search pool`);
    result.search.push({ code: row.code, expected: row.practiceCount, actual: body.total, status: response.status() });
  }
  for (const file of fs.readdirSync('public/images/questions/batch1')) {
    const url = `/images/questions/batch1/${file}`;
    const response = await http.request.get(new URL(url, base).href);
    assert.equal(response.status(), 200, url);
    const bytes = await response.body();
    assert.deepEqual(bytes, fs.readFileSync(`public${url}`), url);
    result.assets.push({ url, sha256: createHash('sha256').update(bytes).digest('hex'), status: response.status() });
  }
  await http.close();
  for (const [index, sample] of samples.entries()) {
    const width = index % 2 ? 390 : 1280;
    const context = await contextFor(width), page = await context.newPage();
    page.setDefaultTimeout(30000);
    page.on('pageerror', error => result.errors.push({ sample: sample.code, message: error.message }));
    const name = `${sample.code}-${sample.label ?? 'ordinary'}-${width}`;
    const listing = await page.goto(new URL('/qualifications', base).href, { waitUntil: 'networkidle' });
    assert.equal(listing.status(), 200);
    await page.locator('#qualification-coverage > summary').click();
    const entry = page.locator(`#qualification-coverage a[href="/${sample.code}"]`).first();
    await expect(entry).toBeVisible();
    await entry.click();
    await expect(page).toHaveURL(new URL(`/${sample.code}`, base).href);
    await expect(page.locator('h1')).toBeVisible();
    const hub = await screenshot(page, `${name}-qualification`, page.locator('h1'));
    const period = sample.url.split('/')[3];
    await page.locator(`a[href="/${sample.code}/${period}"]`).first().click();
    await expect(page).toHaveURL(new URL(`/${sample.code}/${period}`, base).href);
    const questionLink = page.locator(`a[href="${sample.url}"]`).first();
    await expect(questionLink).toBeAttached();
    await questionLink.click();
    await expect(page).toHaveURL(new URL(sample.url, base).href);
    await expect(page.locator('h1')).toBeVisible();
    const q = sample.question;
    if (q) {
      const squash = text => text.replace(/\s/g, '');
      assert.ok(squash(await page.locator('body').innerText()).includes(squash(q.question.slice(0, 80))), `${name}: stem`);
      await expect(page.locator(`a[href="${q.sourcePdfUrl}"]`).first()).toBeAttached();
      for (const src of q.imageUrls ?? []) {
        const image = page.locator(`img[src="${src}"]`).first();
        await image.scrollIntoViewIfNeeded();
        await expect(image).toBeVisible();
        await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
      }
    }
    const before = await screenshot(page, `${name}-question`, page.locator('h1'));
    const radios = page.getByRole('radio'), checkboxes = page.getByRole('checkbox');
    const numeric = page.getByRole('form', { name: '数値記入の解答' });
    const extraScreenshots = [];
    let answerMode, expectedCorrect;
    if (q?.type === 'descriptive' || (!(await radios.count()) && !(await checkboxes.count()) && !(await numeric.count()))) {
      answerMode = 'self-assessment';
      await expect(page.getByText('この画面では記述答案の自動採点を行いません。', { exact: false })).toBeVisible();
      const summary = page.locator('summary').filter({ hasText: /独自解答例と作図例|公式正解例を確認/ }).first();
      await expect(summary).toBeVisible();
      if (!(await summary.locator('..').getAttribute('open') !== null)) await summary.click();
      if (q?.answerImageUrls) for (const src of q.answerImageUrls) {
        const image = page.locator(`img[src="${src}"]`).first();
        await image.scrollIntoViewIfNeeded();
        await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
        extraScreenshots.push(await screenshot(page, `${name}-answer-figure-${q.answerImageUrls.indexOf(src)}`, image));
      }
      const history = await page.evaluate(() => JSON.parse(localStorage.getItem('ipa-quiz:history:v1') ?? '{"entries":[]}').entries);
      assert.equal(history.length, 0, `${name}: self-assessment must not auto-score`);
    } else {
      if (await numeric.count()) {
        answerMode = 'numeric'; assert.ok(q, `${name}: numeric answer fixture required`);
        extraScreenshots.push(await screenshot(page, `${name}-input`, numeric));
        await numeric.getByRole('textbox').fill(String(q.answer));
        await numeric.getByRole('button', { name: '採点する', exact: true }).click(); expectedCorrect = true;
      } else if (await checkboxes.count()) {
        answerMode = 'multiple-selection';
        const keys = Object.keys(q.choices), selected = q.answer.slice(0, q.requiredSelections);
        for (const key of selected) await checkboxes.nth(keys.indexOf(key)).click();
        const confirm = page.getByRole('button', { name: '採点する', exact: true });
        if (await confirm.count()) await confirm.click();
        expectedCorrect = true;
      } else {
        answerMode = 'single-choice';
        if (q) {
          const keys = Object.keys(q.choices); assert.equal(await radios.count(), keys.length);
          const answer = Array.isArray(q.answer) ? q.answer[0] : q.answer;
          await radios.nth(keys.indexOf(answer)).click(); expectedCorrect = true;
        } else await radios.first().click();
      }
      await expect(page.getByRole('status').filter({ hasText: /^(正解です|不正解です)/ }).first()).toBeAttached();
      const history = await page.evaluate(() => JSON.parse(localStorage.getItem('ipa-quiz:history:v1') ?? '{}').entries);
      assert.equal(history.length, 1, `${name}: one actual answer history entry`);
      if (q) { assert.equal(history[0].id, q.id); assert.equal(history[0].correct, expectedCorrect); }
    }
    await expect(page.locator('#explanation')).toBeVisible();
    assert.ok((await page.locator('#explanation').innerText()).length > 80, `${name}: explanation`);
    const after = await screenshot(page, `${name}-explanation`, page.locator('#explanation'));
    result.views.push({ code: sample.code, label: sample.label, width, path: sample.url,
      flow: 'qualification listing → qualification → period list → question → answer → explanation', answerMode,
      expectedCorrect, screenshots: [hub, before, after, ...extraScreenshots] });
    await context.close(); save();
    console.log(`PASS ${name} ${answerMode}`);
  }
  for (const paperId of ['pe-first-biotechnology-2024', 'pe-first-information-2025']) {
    const context = await contextFor(390), page = await context.newPage();
    page.on('pageerror', error => result.errors.push({ sample: paperId, message: error.message }));
    const catalog = [...read('data/exam-library/pe-first/catalog.json'), ...read('data/exam-library/pe-first/catalog-lq3d.json')];
    const entry = catalog.find(item => item.id === paperId);
    const q = read(`data/exam-library/pe-first/${paperId}.json`)[0];
    await page.goto(new URL(`/e-learning/exams?group=pe-first&subject=${encodeURIComponent(entry.subject)}`, base).href, { waitUntil: 'networkidle' });
    await page.locator(`a[href="/e-learning/exams/${paperId}"]`).first().click();
    await expect(page.getByRole('radio')).toHaveCount(q.choiceCount);
    await expect(page.locator('section[aria-labelledby="exam-question-heading"]')).toContainText(q.presentation?.prompt ?? q.text);
    // Archive page images are replaced by the accepted full transcription when
    // presentation.figures is empty. Validate the actual rendered figures.
    for (const src of (q.presentation?.figures ?? []).map(figure => figure.src)) {
      const image = page.locator(`img[src="${src}"]`).first();
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
    }
    const before = await screenshot(page, `${paperId}-question`, page.locator('h1'));
    await page.getByRole('radio').nth(q.correctChoice - 1).click();
    await expect(page.locator('[data-answer-state="correct"]')).toBeVisible();
    await expect(page.locator('[data-answer-state="correct"]')).toContainText(q.explanation);
    const after = await screenshot(page, `${paperId}-explanation`, page.locator('[data-answer-state="correct"]'));
    result.native.push({ id: paperId, questionId: q.id, correct: true, screenshots: [before, after] });
    await context.close(); save();
  }
  assert.ok(new Set(result.views.map(view => view.code)).size >= 10);
  assert.deepEqual(result.errors, []);
  result.status = 'PASS';
} catch (error) {
  result.status = 'FAIL'; result.failure = String(error); process.exitCode = 1;
} finally {
  result.finishedAt = new Date().toISOString(); save(); await browser.close();
  console.log(JSON.stringify({ status: result.status, qualifications: new Set(result.views.map(view => view.code)).size,
    flows: result.views.length, assets: result.assets.length, failure: result.failure }));
}
