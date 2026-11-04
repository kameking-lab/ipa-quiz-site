// Local acceptance of the real app. No mocked routes, authentication or learning state.
import { chromium, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';

const base = process.env.QKENSETSU_BASE_URL || 'http://localhost:3137';
assert.match(base, /^http:\/\/(localhost|127\.0\.0\.1):\d+$/);
const out = path.resolve(process.argv[2] || 'reports/qkensetsu-20261103/browser-fix2');
fs.mkdirSync(out, { recursive: true });
const sourceDir = 'data/questions/kenchiku-setsubishi';
const materials = fs.readdirSync(sourceDir).filter(f => /^202[56]-(am1|am2|pm)\.json$/.test(f))
  .flatMap(f => JSON.parse(fs.readFileSync(path.join(sourceDir, f), 'utf8')));
const questions = materials.filter(q => q.assessmentMode !== 'reference-only');
const urlsFor = q => [...(q.imageUrls || []), ...Object.values(q.choiceImageUrls || {})];
const images = questions.filter(q => urlsFor(q).length);
const excludedId = 'kenchiku-setsubishi-2026-annual-am2-q18';
const detail = q => `/q/${q.exam}/${q.year}-${q.season}/${q.session}/q${q.qNumber}`;
const quiz = q => `/quiz?mode=year&exam=${q.exam}&year=${q.year}&season=${q.season}&session=${q.session}&question=${q.id}`;
const result = { base, artifactDirectory: out, sourceHead: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), startedAt: new Date().toISOString(),
  buildId: fs.readFileSync('.next/BUILD_ID', 'utf8').trim(),
  trackedDiffSha256: createHash('sha256').update(execFileSync('git', ['diff', 'HEAD', '--no-ext-diff'])).digest('hex'),
  reviewClientSha256: createHash('sha256').update(fs.readFileSync('app/review/ReviewClient.tsx')).digest('hex'),
  mocked: false, authenticated: false, checks: [], imageHttp: [], views: [], errors: [], httpErrors: [] };
const browser = await chromium.launch({ headless: true });
const save = () => fs.writeFileSync(path.join(out, 'results.json'), JSON.stringify(result, null, 2) + '\n', 'utf8');
async function shot(page, name) {
  await page.screenshot({ path: path.join(out, name + '.png'), fullPage: true });
  const widths = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
  assert.ok(widths.document <= widths.viewport, `${name}: horizontal page overflow`);
  return name + '.png';
}
try {
  assert.equal(questions.length, 209); assert.equal(images.length, 23);
  const http = await browser.newContext();
  for (const url of new Set(images.flatMap(urlsFor))) {
    const response = await http.request.get(base + url);
    assert.equal(response.status(), 200, url);
    const bytes = await response.body();
    const sha = b => createHash('sha256').update(b).digest('hex');
    assert.equal(sha(bytes), sha(fs.readFileSync('public' + url)), url);
    result.imageHttp.push({ url, status: response.status(), sha256: sha(bytes) });
  }
  assert.equal(result.imageHttp.length, 32);
  const excluded = materials.find(q => q.id === excludedId);
  const response = await http.request.get(base + detail(excluded));
  assert.equal(response.status(), 404);
  result.checks.push({ check: 'Q18 detail HTTP', status: 404, path: detail(excluded) });
  const hits = [];
  for (let offset = 0; offset < 209; offset += 60) {
    const response = await http.request.get(`${base}/api/search/questions?exam=kenchiku-setsubishi&limit=60&offset=${offset}`);
    assert.equal(response.status(), 200);
    const body = await response.json(); assert.equal(body.total, 209); hits.push(...body.hits);
  }
  assert.equal(new Set(hits.map(q => q.id)).size, 209);
  assert.ok(!hits.some(q => q.id === excludedId));
  result.checks.push({ check: 'Search API all public IDs, Q18 excluded', count: hits.length });
  await http.close(); save();
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.setDefaultTimeout(30000);
    page.on('pageerror', e => result.errors.push({ width, message: e.message }));
    page.on('response', r => {
      const url = new URL(r.url());
      if (url.origin === new URL(base).origin && r.status() >= 400 && url.pathname !== detail(excluded))
        result.httpErrors.push({ width, path: url.pathname, status: r.status() });
    });
    await page.goto(base + '/kenchiku-setsubishi', { waitUntil: 'networkidle' });
    await expect(page.locator('h1')).toContainText('建築設備士');
    for (const subject of ['建築一般知識', '建築法規', '建築設備']) await expect(page.getByRole('link', { name: subject, exact: true }).first()).toBeVisible();
    result.views.push({ width, page: 'qualification', screenshot: await shot(page, `${width}-top`) });
    await page.getByRole('link', { name: '建築一般知識', exact: true }).first().click();
    await expect(page.getByRole('radio')).toHaveCount(4);
    assert.ok(page.url().includes('mode=random'));
    result.checks.push({ check: 'Qualification subject link starts ordinary random practice', width });
    for (const year of [2025, 2026]) {
      await page.goto(`${base}/kenchiku-setsubishi/${year}-annual`, { waitUntil: 'networkidle' });
      const links = await page.locator('a[href^="/q/kenchiku-setsubishi/"]').evaluateAll(nodes => nodes.map(n => n.getAttribute('href')));
      const unique = [...new Set(links)];
      assert.equal(unique.length, year === 2025 ? 105 : 104);
      assert.ok(!unique.includes(detail(excluded)));
      result.views.push({ width, page: 'year-list', year, count: unique.length, screenshot: await shot(page, `${width}-list-${year}`) });
    }
    await page.goto(`${base}/search?exam=kenchiku-setsubishi`, { waitUntil: 'networkidle' });
    await expect(page.locator('a[href^="/q/kenchiku-setsubishi/"]').first()).toBeVisible();
    result.views.push({ width, page: 'search', screenshot: await shot(page, `${width}-search`) });
    await page.getByLabel('キーワード', { exact: true }).fill('ボイラー');
    const [keywordResponse] = await Promise.all([
      page.waitForResponse(r => r.url().includes('/api/search/questions?') && new URL(r.url()).searchParams.get('q') === 'ボイラー'),
      page.getByLabel('キーワード', { exact: true }).press('Enter'),
    ]);
    const keywordBody = await keywordResponse.json();
    assert.ok(keywordBody.total > 0); assert.ok(!keywordBody.hits.some(q => q.id === excludedId));
    await expect(page.locator('a[href^="/q/kenchiku-setsubishi/"]').first()).toBeVisible();
    result.views.push({ width, page: 'keyword-search', screenshot: await shot(page, `${width}-search-keyword`) });
    await page.locator('a[href^="/q/kenchiku-setsubishi/"]').first().click();
    await expect(page.locator('h1')).toContainText('建築設備士');
    result.checks.push({ check: 'Keyword search result opens real question detail', width, total: keywordBody.total });
    const chosen = [];
    for (const session of ['am1', 'am2', 'pm']) {
      for (const correct of [true, false]) {
        const q = questions.find(q => q.year === 2025 && q.session === session && q.qNumber === (correct ? 1 : 2));
        await page.goto(base + quiz(q), { waitUntil: 'networkidle' });
        await expect(page.getByRole('radio')).toHaveCount(4);
        const keys = Object.keys(q.choices);
        const selected = correct ? q.answer : keys.find(k => k !== q.answer);
        const labels = await page.getByRole('radio').evaluateAll(nodes => nodes.map(n => n.getAttribute('aria-label')));
        labels.forEach((label, i) => assert.ok(label.startsWith(`選択肢 ${i + 1}:`), label));
        await expect(page.getByRole('radio').nth(keys.indexOf(selected))).toContainText(q.choices[selected]);
        await page.getByRole('radio').nth(keys.indexOf(selected)).click();
        await expect(page.locator('[aria-label="解答結果"]')).toBeVisible();
        await expect(page.getByRole('radio').nth(keys.indexOf(q.answer))).toHaveAttribute('data-state', 'revealed-correct');
        if (!correct) await expect(page.getByRole('radio').nth(keys.indexOf(selected))).toHaveAttribute('data-state', 'wrong');
        for (const text of Object.values(q.choiceExplanations)) await expect(page.getByText(text, { exact: false }).first()).toBeVisible();
        await expect(page.getByText('1問、回答しました。', { exact: true })).toBeVisible();
        await expect.poll(() => page.locator('.reward-dog img').evaluate(i => i.complete && i.naturalWidth > 0)).toBe(true);
        const state = await page.evaluate(() => ({
          history: JSON.parse(localStorage.getItem('ipa-quiz:history:v1') || '{}'),
          srs: JSON.parse(localStorage.getItem('ipa-quiz:srs:v1') || '{}'),
          reward: JSON.parse(sessionStorage.getItem('ipa-quiz:study-reward:v1') || '{}'),
        }));
        assert.ok(state.history.entries.some(e => e.id === q.id && e.correct === correct));
        assert.ok(state.srs.cards[q.id]); assert.equal(state.reward.latest.questionId, q.id);
        assert.equal(state.reward.latest.theme, 'rest');
        chosen.push(q.id);
        result.views.push({ width, page: 'ordinary-quiz', subject: q.subject, correct, question: q.id,
          history: true, srs: true, reward: true, screenshot: await shot(page, `${width}-quiz-${session}-${correct}`) });
      }
    }
    // Read back real persisted history via the ordinary review screen after reload.
    const [reviewResponse] = await Promise.all([
      page.waitForResponse(r => r.url().endsWith('/api/review/due')),
      page.goto(base + '/review?exam=kenchiku-setsubishi', { waitUntil: 'networkidle' }),
    ]);
    const review = await reviewResponse.json();
    assert.equal(review.seenCount, 6); assert.equal(review.questions.length, 6);
    assert.deepEqual(review.questions.map(q => q.id).sort(), [...chosen].sort());
    await expect(page.getByText('1 / 6', { exact: true })).toBeVisible();
    result.views.push({ width, page: 'review', answeredIds: chosen, seenCount: review.seenCount,
      dueCount: review.questions.length, screenshot: await shot(page, `${width}-review`) });
    await page.goto(base + quiz(excluded), { waitUntil: 'networkidle' });
    await expect(page.getByText('指定した問題はこの問題一覧にありません。', { exact: true })).toBeVisible();
    await expect(page.getByRole('radio')).toHaveCount(0);
    const noExcludedState = await page.evaluate(id => {
      const history = JSON.parse(localStorage.getItem('ipa-quiz:history:v1') || '{}');
      const srs = JSON.parse(localStorage.getItem('ipa-quiz:srs:v1') || '{}');
      const reward = JSON.parse(sessionStorage.getItem('ipa-quiz:study-reward:v1') || '{}');
      return !history.entries.some(e => e.id === id) && !srs.cards[id] && reward.latest.questionId !== id;
    }, excludedId);
    assert.ok(noExcludedState);
    result.views.push({ width, page: 'excluded-quiz', noAssessmentWrite: true, screenshot: await shot(page, `${width}-q18-quiz`) });
    for (const q of images) {
      await page.goto(base + quiz(q), { waitUntil: 'networkidle' });
      await expect(page.getByRole('radio')).toHaveCount(4);
      const rendered = [];
      for (const url of urlsFor(q)) {
        const img = page.locator(`img[src="${url}"]`);
        await img.scrollIntoViewIfNeeded();
        await expect(img).toBeVisible();
        await expect.poll(() => img.evaluate(i => i.complete && i.naturalWidth > 0)).toBe(true);
        const dimensions = await img.evaluate(i => {
          const style = getComputedStyle(i); const rect = i.getBoundingClientRect();
          const px = key => parseFloat(style[key]) || 0;
          return { src: i.getAttribute('src'), naturalWidth: i.naturalWidth, naturalHeight: i.naturalHeight,
            width: rect.width - px('paddingLeft') - px('paddingRight') - px('borderLeftWidth') - px('borderRightWidth'),
            height: rect.height - px('paddingTop') - px('paddingBottom') - px('borderTopWidth') - px('borderBottomWidth') };
        });
        assert.ok(Math.abs(dimensions.width / dimensions.height - dimensions.naturalWidth / dimensions.naturalHeight) < .02);
        dimensions.screenshot = `${width}-figure-${path.basename(url, '.png')}.png`;
        await img.screenshot({ path: path.join(out, dimensions.screenshot) });
        if (q.imageUrls?.includes(url)) {
          const popupPromise = page.waitForEvent('popup');
          await img.locator('..').getByRole('link', { name: '図表を拡大して表示' }).click();
          const popup = await popupPromise; await popup.waitForLoadState();
          assert.equal(new URL(popup.url()).pathname, url); await popup.close();
          dimensions.enlargeLink = true;
        } else {
          const key = Object.keys(q.choiceImageUrls).find(key => q.choiceImageUrls[key] === url);
          await expect(page.getByRole('radio').nth(Object.keys(q.choices).indexOf(key))).toContainText(q.choices[key]);
          dimensions.choice = key;
        }
        rendered.push(dimensions);
      }
      result.views.push({ width, page: 'image-quiz', question: q.id, images: rendered,
        screenshot: await shot(page, `${width}-image-${q.year}-${q.session}-q${q.qNumber}`) });
      save();
    }
    await page.goto(base + detail(excluded), { waitUntil: 'networkidle' });
    await expect(page.locator('body')).toContainText('404');
    result.views.push({ width, page: 'excluded-404', screenshot: await shot(page, `${width}-q18-404`) });
    // Isolated ordinary session: a real answer creates the history used by review.
    const figureContext = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const figurePage = await figureContext.newPage();
    figurePage.on('pageerror', e => result.errors.push({ width, message: e.message }));
    const q = questions.find(q => q.year === 2025 && q.session === 'pm' && q.qNumber === 32);
    await figurePage.goto(base + quiz(q), { waitUntil: 'networkidle' });
    await expect(figurePage.getByRole('radio')).toHaveCount(4);
    await figurePage.getByRole('radio').nth(0).click();
    await expect(figurePage.locator('[aria-label="解答結果"]')).toBeVisible();
    const historyBefore = await figurePage.evaluate(() => localStorage.getItem('ipa-quiz:history:v1'));
    await figurePage.goto(base + '/review?exam=kenchiku-setsubishi', { waitUntil: 'networkidle' });
    await expect(figurePage.getByText('1 / 1', { exact: true })).toBeVisible();
    for (const [i, key] of Object.keys(q.choices).entries()) {
      const choice = figurePage.getByRole('button').filter({ has: figurePage.locator(`img[src="${q.choiceImageUrls[key]}"]`) });
      const img = choice.locator('img');
      await expect(choice.locator('span').first()).toHaveText(String(i + 1));
      await expect(choice).toContainText(q.choices[key]);
      await expect(img).toHaveAttribute('src', q.choiceImageUrls[key]);
      await img.scrollIntoViewIfNeeded();
      await expect.poll(() => img.evaluate(i => i.complete && i.naturalWidth > 0)).toBe(true);
    }
    const before = await shot(figurePage, `${width}-review-choice-figures`);
    await figurePage.getByRole('button').filter({ has: figurePage.locator(`img[src="${q.choiceImageUrls[Object.keys(q.choices)[0]]}"]`) }).click();
    await expect(figurePage.getByText('正解: 1', { exact: true })).toBeVisible();
    result.views.push({ width, page: 'review-choice-figures', question: q.id, before,
      screenshot: await shot(figurePage, `${width}-review-choice-answer`) });
    await figurePage.getByRole('button', { name: '✓ 正解した', exact: true }).click();
    await expect(figurePage.getByRole('button', { name: 'もう一度', exact: true })).toBeVisible();
    const reviewState = await figurePage.evaluate(id => ({
      history: localStorage.getItem('ipa-quiz:history:v1'),
      schedule: JSON.parse(localStorage.getItem('ipa-quiz:review:v1'))[id],
    }), q.id);
    assert.equal(reviewState.history, historyBefore); assert.ok(reviewState.schedule.nextReviewAt);
    result.views.push({ width, page: 'review-self-assessment', question: q.id, historyPreserved: true,
      nextReviewAt: reviewState.schedule.nextReviewAt, screenshot: await shot(figurePage, `${width}-review-scheduled`) });
    await figureContext.close();
    await context.close(); save();
    console.log(JSON.stringify({ width, views: result.views.length, stage: 'complete' }));
  }
  assert.equal(result.errors.length, 0, JSON.stringify(result.errors));
  // These two routes are supplied by Vercel hosting, not by next start.
  result.expectedLocalPlatform404 = result.httpErrors.filter(r => r.status === 404 &&
    ['/_vercel/insights/script.js', '/_vercel/speed-insights/script.js'].includes(r.path));
  const unexpected = result.httpErrors.filter(r => !result.expectedLocalPlatform404.includes(r));
  assert.equal(unexpected.length, 0, JSON.stringify(unexpected));
  result.status = 'PASS';
} catch (error) {
  result.status = 'FAIL'; result.failure = String(error); process.exitCode = 1;
} finally {
  result.finishedAt = new Date().toISOString(); save(); await browser.close();
  console.log(JSON.stringify({ status: result.status, views: result.views.length, images: result.imageHttp.length, failure: result.failure }));
}
