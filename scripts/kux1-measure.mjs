// Fresh mobile visits, with the same inputs and reading pauses before/after.
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { chromium } from '@playwright/test';
import { assertListenerOwner } from './kperf1-local.mjs';

const [phase, root, port, selection] = process.argv.slice(2);
assert.match(phase ?? '', /^(before|after)-[a-z0-9-]+$/);
const base = `http://127.0.0.1:${Number(port)}`;
const server = JSON.parse(await fs.readFile(path.join(root, `.cache/kperf1/server-${Number(port)}.json`), 'utf8'));
assert.equal(server.base, base);
assert.equal(server.buildId, (await fs.readFile(path.join(root, '.next/BUILD_ID'), 'utf8')).trim());
assertListenerOwner(Number(port), server.pid);
const out = path.resolve(`.cache/kux1/${phase}`);
await fs.mkdir(out, { recursive: true });
const exams = ['sc', 'nw', 'st', 'sa', 'ap'];
const blogs = ['it-shikaku-rirekisho-kakikata', 'ipa-shiken-fukusuu-kubun-juken', 'koudo-gozen1-taisaku', 'nw-gogo-jikan-haibun'];
const practiceMap = JSON.parse(await fs.readFile(path.join(root, 'data/blog/practice-map.json'), 'utf8'));
const routes = [
  ...[false, true].flatMap(tsugino => [
    ...exams.map(exam => ({ name: `${tsugino ? 'tsugino' : 'search'}-${exam}`, url: `/${exam}${tsugino ? '?utm_source=tsugino&utm_medium=referral' : ''}`, exam })),
    ...blogs.map(slug => ({ name: `${tsugino ? 'tsugino' : 'search'}-${slug}`, url: `/blog/${slug}${tsugino ? '?utm_source=tsugino&utm_medium=referral' : ''}`, blog: true })),
    // The embedded question also permits scrolling straight to the choices:
    // zero start taps, one answer tap. Keep this distinct from the anchor path.
    ...blogs.map(slug => ({ name: `${tsugino ? 'tsugino' : 'search'}-${slug}-scroll`, url: `/blog/${slug}${tsugino ? '?utm_source=tsugino&utm_medium=referral' : ''}`, blog: true, direct: true })),
  ]),
  { name: 'tsugino-direct-quiz-ap', url: '/quiz?mode=random&exam=ap&utm_source=tsugino&utm_medium=referral', direct: true },
];
if (selection && !routes.some(route => route.name === selection)) throw new Error('Unknown route selection');
const browser = await chromium.launch();
const samples = [];
const provenance = { buildId: server.buildId, scriptSha256: createHash('sha256').update(await fs.readFile(import.meta.filename)).digest('hex'), browser: browser.version(), node: process.version, viewport: '390x844@1', cpuSlowdown: 4, runs: 3, selection: selection ?? 'all', readingPauseMs: 700, environment: server.environment, storage: 'empty; no onboarding flag', network: 'local unthrottled; external requests blocked', workload: 'fixed browser random seed per route; choice shuffle removed from measured API requests only; real question API and pools' };
try {
  for (let run = 0; run < 3; run++) for (const route of routes.filter(route => !selection || route.name === selection)) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, reducedMotion: 'reduce', serviceWorkers: 'block' });
    await context.route('**/*', r => new URL(r.request().url()).origin === base ? r.continue() : r.abort());
    await context.route('**/api/questions/next?**', r => {
      const url = new URL(r.request().url());
      url.searchParams.delete('shuffle');
      return r.continue({ url: url.href });
    });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    const dialogs = [], errors = [], ai = [], requests = [];
    let taps = 0, screenshotMs = 0;
    await page.exposeBinding('__kuxTap', () => { taps++; });
    const screenshot = async suffix => {
      if (run !== 0) return;
      const at = performance.now();
      await page.screenshot({ path: path.join(out, `${route.name}-${suffix}.png`) });
      screenshotMs += performance.now() - at;
    };
    page.on('dialog', async d => { dialogs.push(d.message()); await d.dismiss(); });
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', r => { const u = new URL(r.url()); if (/\/api\//.test(u.pathname)) requests.push(u.pathname); if (/\/api\/(copilot|essay|afternoon|ai)/.test(u.pathname)) ai.push(u.pathname); });
    const seed = createHash('sha256').update(route.name).digest().readUInt32LE(0);
    await page.addInitScript(seed => {
      // Stable input workload; never persisted and never used outside this lab.
      let state = seed;
      Math.random = () => {
        state = (Math.imul(1664525, state) + 1013904223) >>> 0;
        return state / 4294967296;
      };
      window.__kuxTaps = 0; window.__kuxOverlays = [];
      document.addEventListener('pointerdown', () => { window.__kuxTaps++; window.__kuxTap(); }, true);
      new MutationObserver(() => {
        for (const e of document.querySelectorAll('[role="dialog"], [aria-modal="true"], [role="alert"]')) {
          if (e.getBoundingClientRect().height && e.textContent?.trim()) {
            const text = e.textContent.trim(); if (!window.__kuxOverlays.includes(text)) window.__kuxOverlays.push(text);
          }
        }
      }).observe(document, { subtree: true, childList: true, attributes: true });
    }, seed);
    const started = performance.now();
    const response = await page.goto(base + route.url, { waitUntil: 'domcontentloaded' });
    assert.equal(response.status(), 200);
    await page.getByRole('heading', { level: 1 }).first().waitFor();
    let ctaY = null;
    if (!route.direct) {
      const cta = route.blog ? page.getByRole('link', { name: 'まず1問解く', exact: true }) :
        page.locator('section[aria-label="今すぐ解く"] a[href*="/quiz?"]').first();
      await cta.waitFor({ state: 'visible' });
      ctaY = await cta.evaluate(e => e.getBoundingClientRect().y);
      await screenshot('landing');
      await page.waitForTimeout(700);
      await cta.tap();
    }
    const choice = route.blog ? page.locator('#article-practice').getByRole('radio').first() : page.getByRole('radio', { name: /^選択肢 / }).first();
    await choice.waitFor({ state: 'visible', timeout: 30000 });
    await choice.scrollIntoViewIfNeeded();
    const readyMs = performance.now() - started - screenshotMs;
    // Hash the authored question, not asynchronously hydrated reading controls.
    const questionText = await page.locator('[data-study-presence-exam]').first().evaluate(el => {
      const copy = el.cloneNode(true);
      copy.querySelectorAll('button, input, select, [role="status"], [role="tooltip"]').forEach(control => control.remove());
      return copy.textContent.replace(/\s+/g, ' ').trim();
    });
    const choiceLabels = await (route.blog ? page.locator('#article-practice').getByRole('radio') : page.getByRole('radio', { name: /^選択肢 / })).evaluateAll(els => els.map(el => el.getAttribute('aria-label')));
    const questionUiSha256 = createHash('sha256').update(JSON.stringify([questionText, choiceLabels])).digest('hex');
    const beforeAnswer = await page.evaluate(() => ({ taps: window.__kuxTaps, scrollY, text: document.body.innerText, url: location.href }));
    const tapsToQuestion = taps;
    await screenshot('question');
    await page.waitForTimeout(700);
    const answerStarted = performance.now();
    await choice.tap();
    const answeredMs = performance.now() - started - screenshotMs;
    const result = route.blog ? page.getByLabel('チャレンジの解答結果') : page.locator('[aria-label="解答結果"]:not([aria-hidden="true"]) [aria-label$="解説"]').first();
    await result.waitFor({ state: 'visible' });
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    const explanationMs = performance.now() - answerStarted;
    const final = await page.evaluate(() => ({ taps: window.__kuxTaps, overlays: window.__kuxOverlays, url: location.href, overflow: document.documentElement.scrollWidth > innerWidth, visibleDialogs: [...document.querySelectorAll('[role="dialog"]')].filter(e => e.getBoundingClientRect().height).length, ads: document.querySelectorAll('ins.adsbygoogle').length, achievementToast: document.querySelector('[data-testid="achievement-toast"]')?.textContent ?? null }));
    assert.equal(final.url, beforeAnswer.url, 'Answer must reveal in place');
    assert.equal(final.visibleDialogs, 0);
    assert.deepEqual(ai, []);
    assert.deepEqual(errors, []);
    assert.equal(final.overflow, false);
    if (run === 0) await page.screenshot({ path: path.join(out, `${route.name}-explanation.png`) });
    assert.equal(taps, route.direct ? 1 : 2);
    const questionId = route.blog ? practiceMap[route.url.split('?')[0].slice('/blog/'.length)].questionId : new URL(beforeAnswer.url).searchParams.get('question');
    assert.ok(questionId);
    const prior = samples.find(sample => sample.route === route.name);
    if (prior) {
      assert.equal(questionId, prior.questionId, 'Question must repeat across runs');
      assert.equal(questionUiSha256, prior.questionUiSha256, 'Question and ordered choices must repeat');
    }
    samples.push({ route: route.name, url: route.url, seed, questionUrl: beforeAnswer.url, questionId, questionText, questionUiSha256, choiceLabels, selectedChoice: choiceLabels[0], run, readyMs, answeredMs, explanationMs, ctaY, tapsToQuestion, tapsToAnswer: taps, scrollBeforeAnswer: beforeAnswer.scrollY, overlays: final.overlays, dialogs, ads: final.ads, achievementToast: final.achievementToast, swipeHint: beforeAnswer.text.includes('左スワイプ'), errors, ai, requests, notices: beforeAnswer.text.split('\n').filter(t => /ログイン|無料|同意|Cookie|広告|登録/.test(t)).slice(0, 20) });
    await fs.writeFile(path.join(out, 'summary.json'), JSON.stringify({ phase, provenance, samples }, null, 2));
    console.log(`${route.name} ${run + 1}/3: ${final.taps} taps, ${(answeredMs / 1000).toFixed(2)}s`);
    await context.close();
  }
} finally { await browser.close(); }
