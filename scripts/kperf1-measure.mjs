// Local production build only. Tools: pnpm deps + npm install --prefix .cache/perf-tools lighthouse@12.8.2
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { assertListenerOwner } from './kperf1-local.mjs';
import { chromium } from '@playwright/test';
const toolRoot = path.resolve('.cache/perf-tools/node_modules');
const { default: puppeteer } = await import(pathToFileURL(path.join(toolRoot, 'puppeteer-core/lib/esm/puppeteer/puppeteer-core.js')).href);
const { startFlow } = await import(pathToFileURL(path.join(toolRoot, 'lighthouse/core/index.js')).href);
const phase = process.argv[2] ?? 'before';
const base = process.env.KPERF_BASE_URL ?? 'http://127.0.0.1:3107';
const baseUrl = new URL(base);
if (baseUrl.hostname !== '127.0.0.1' || baseUrl.username || baseUrl.password || baseUrl.search || baseUrl.hash || baseUrl.pathname !== '/' || baseUrl.protocol !== 'http:') throw new Error('Bare local HTTP origin required');
if (!/^[a-z0-9-]+$/.test(phase)) throw new Error('Invalid phase name');
const buildId = (await fs.readFile('.next/BUILD_ID', 'utf8')).trim();
const server = JSON.parse(await fs.readFile(`.cache/kperf1/server-${baseUrl.port}.json`, 'utf8'));
assert.equal(server.buildId, buildId, 'Restart isolated production server for this build');
assert.equal(server.base, base);
process.kill(server.pid, 0);
assertListenerOwner(baseUrl.port, server.pid);
const hash = async file => createHash('sha256').update(await fs.readFile(file)).digest('hex');
assert.equal(server.launcherSha256, await hash('scripts/kperf1-server.mjs'));
assert.equal(server.localHelperSha256, await hash('scripts/kperf1-local.mjs'));
const versionBrowser = await chromium.launch();
const browserVersion = versionBrowser.version();
await versionBrowser.close();
const lighthouseVersion = JSON.parse(await fs.readFile(path.join(toolRoot, 'lighthouse/package.json'), 'utf8')).version;
assert.equal(lighthouseVersion, '12.8.2', 'Pinned measurement tool required');
const provenance = { buildId, serverEnvironment: server.environment, launcherSha256: server.launcherSha256, localHelperSha256: server.localHelperSha256, scriptSha256: await hash(import.meta.filename), browserVersion, node: process.version, mobile: '390x844@1', lighthouse: lighthouseVersion, historySize: 2000, runs: 3, cpuInteraction: 4 };
function redactUrls(value) {
  if (typeof value === 'string') return value.replace(/https?:\/\/[^\s"<>]+/g, raw => {
    try { const url = new URL(raw); url.username = ''; url.password = ''; for (const key of [...url.searchParams.keys()]) if (/token|key|secret|password|email|auth/i.test(key)) url.searchParams.set(key, 'REDACTED'); return url.href; } catch { return raw; }
  });
  if (Array.isArray(value)) return value.map(redactUrls);
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, redactUrls(item)]));
  return value;
}
const out = path.resolve(`.cache/kperf1/${phase}`);
await fs.mkdir(out, { recursive: true });
const questionId = 'ap-2023h-am-q1';
const quizUrl = '/quiz?mode=year&exam=ap&year=2023&season=spring&session=am';
const routes = [
  { name: 'home', url: '/' },
  { name: 'qualification', url: '/ap' },
  { name: 'question', url: quizUrl },
  { name: 'explanation', url: quizUrl, answer: true },
  { name: 'review', url: '/quiz?mode=review&exam=ap&scope=exam' },
  { name: 'blog-practice', url: '/blog/it-shikaku-rirekisho-kakikata' },
];
function seed({ count, questionId }) {
  localStorage.setItem('ipa-quiz:onboarded:v1', '1');
  localStorage.setItem('ipa-quiz:swipe-hint-shown:v1', 'true');
  localStorage.setItem('ipa-quiz:history:v1', JSON.stringify({ entries: Array.from({ length: count }, (_, i) => ({ id: questionId, selected: 'ア', correct: false, at: 1700000000000 + i })), starredIds: [questionId] }));
}
const results = await fs.readFile(path.join(out, 'summary.json'), 'utf8').then(JSON.parse).catch(error => { if (error.code !== 'ENOENT') throw error; return { phase, base, timestamp: new Date().toISOString(), provenance, runs: 3, lighthouseResults: [], interactions: [] }; });
assert.deepEqual(results.provenance, provenance, 'Use a fresh phase: build, browser or harness changed');
results.screenInteractions ??= [];
const save = () => fs.writeFile(path.join(out, 'summary.json'), JSON.stringify(redactUrls(results), null, 2));
if (!process.env.KPERF_INTERACTIONS_ONLY) {
  for (const route of routes) {
    for (let run = 1; run <= 3; run++) {
      if (results.lighthouseResults.some(row => row.page === route.name && row.run === run)) continue;
      const browser = await puppeteer.launch({ executablePath: chromium.executablePath(), headless: true, args: ['--no-sandbox'] });
      try {
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', request => new URL(request.url()).origin === base || request.url().startsWith('data:') ? request.continue() : request.abort());
        await page.evaluateOnNewDocument(seed, { count: 2000, questionId });
        const flow = await startFlow(page, { flags: { onlyCategories: ['performance'], formFactor: 'mobile', screenEmulation: { mobile: true, width: 390, height: 844, deviceScaleFactor: 1, disabled: false }, throttlingMethod: 'simulate', disableStorageReset: true } });
        await flow.navigate(async () => {
          await page.goto(base + route.url, { waitUntil: 'networkidle0' });
          if (route.answer) {
            await page.waitForSelector('[role="radio"]');
            await page.click('[role="radio"]');
            await page.waitForSelector('[aria-label="解答結果"]:not([aria-hidden="true"]) [aria-label$="解説"]');
          }
        }, { name: route.name });
        const report = await flow.createFlowResult();
        const lhr = report.steps[0].lhr;
        if (lhr.runtimeError) throw new Error(JSON.stringify(lhr.runtimeError));
        assert.equal(new URL(page.url()).origin, base, 'Local navigation only');
        await fs.writeFile(path.join(out, `${route.name}-${run}.json`), JSON.stringify(redactUrls(lhr)));
        const audits = lhr.audits;
        const num = id => audits[id]?.numericValue ?? null;
        const resources = audits['network-requests']?.details?.items ?? [];
        const entry = { page: route.name, run, url: route.url, score: lhr.categories.performance.score * 100, lcp: num('largest-contentful-paint'), cls: num('cumulative-layout-shift'), tbt: num('total-blocking-time'), interactive: num('interactive'), jsTransfer: resources.filter(r => r.resourceType === 'Script').reduce((n, r) => n + (r.transferSize ?? 0), 0), jsDecoded: resources.filter(r => r.resourceType === 'Script').reduce((n, r) => n + (r.resourceSize ?? 0), 0), fonts: resources.filter(r => r.resourceType === 'Font').length, images: resources.filter(r => r.resourceType === 'Image').length, error: lhr.runtimeError ?? null };
        results.lighthouseResults.push(entry);
        entry.scripts = resources.filter(r => r.resourceType === 'Script').map(r => ({ url: r.url.replace(base, ''), transfer: r.transferSize, decoded: r.resourceSize })).sort((a, b) => b.decoded - a.decoded);
        entry.thirdPartyHosts = [...new Set(resources.map(r => new URL(r.url).hostname).filter(host => !['127.0.0.1', 'localhost'].includes(host)))];
        await save();
        console.log(JSON.stringify(redactUrls({ ...entry, scripts: undefined })));
      } finally { await browser.close(); }
    }
  }
}
if (process.env.KPERF_LIGHTHOUSE_ONLY) process.exit(0);
const browser = await chromium.launch();
try {
  for (const historySize of [0, 2000]) for (const kind of ['quiz', 'blog']) {
    for (let run = 1; run <= 10; run++) {
      if (results.interactions.some(row => row.kind === kind && row.historySize === historySize && row.run === run)) continue;
      const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, serviceWorkers: 'block' });
      await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
      await context.addInitScript(seed, { count: historySize, questionId });
      await context.addInitScript(() => {
        window.__perf = { events: [], tap: null, paint: null };
        new PerformanceObserver(list => { for (const e of list.getEntries()) if (e.interactionId) window.__perf.events.push({ name: e.name, duration: e.duration, startTime: e.startTime, processingStart: e.processingStart, interactionId: e.interactionId }); }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
        document.addEventListener('pointerdown', e => { if (e.target.closest('[role="radio"]')) { window.__perf.tap = e.timeStamp; window.__perf.tapHandlerAt = performance.now(); } }, true);
        const observer = new MutationObserver(() => {
          if (window.__perf.tap === null || window.__perf.paint !== null) return;
          const result = document.querySelector('[aria-label="解答結果"]:not([aria-hidden="true"]) [aria-label$="解説"], [aria-label="チャレンジの解答結果"]');
          if (result) requestAnimationFrame(() => requestAnimationFrame(() => { window.__perf.paint ??= performance.now(); }));
        });
        observer.observe(document, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-hidden'] });
      });
      const page = await context.newPage();
      const cdp = await context.newCDPSession(page);
      await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
      const requests = [];
      page.on('request', r => requests.push(r.url()));
      await page.goto(base + (kind === 'quiz' ? quizUrl : routes.at(-1).url));
      const choice = page.getByRole('radio').first();
      await choice.waitFor();
      await choice.scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      const url = page.url();
      requests.length = 0;
      await choice.tap();
      await page.waitForFunction(() => window.__perf.paint !== null);
      await page.waitForTimeout(150);
      const data = await page.evaluate(() => {
        const rect = document.querySelector('[aria-label="解答結果"]:not([aria-hidden="true"]) [aria-label$="解説"], [aria-label="チャレンジの解答結果"]').getBoundingClientRect();
        return { ...window.__perf, resultVisible: rect.top < innerHeight && rect.bottom > 0, history: JSON.parse(localStorage.getItem('ipa-quiz:history:v1') ?? '{}').entries?.length, noOverflow: document.documentElement.scrollWidth <= innerWidth };
      });
      const events = data.events.filter(e => e.startTime >= data.tap - 8);
      const entry = { kind, historySize, run, tapToPaint: data.paint - data.tap, pointerInputDelay: data.tapHandlerAt - data.tap, eventTimingMax: events.length ? Math.max(...events.map(e => e.duration)) : null, events, urlUnchanged: page.url() === url, answerApiCalls: requests.filter(u => /\/api\/(copilot|questions\/next|practice\/)/.test(u)).length, historyAfter: data.history, noOverflow: data.noOverflow, resultVisible: data.resultVisible };
      entry.apiPaths = requests.filter(u => new URL(u).pathname.startsWith('/api/')).map(u => new URL(u).pathname);
      assert.equal(new URL(page.url()).origin, base);
      assert.equal(entry.urlUnchanged, true);
      assert.equal(entry.answerApiCalls, 0);
      assert.equal(entry.apiPaths.some(p => /copilot|generate|essay|grade|\/ai\//.test(p)), false, 'No AI during static answer');
      assert.equal(entry.historyAfter, Math.min(historySize + 1, 2000));
      assert.equal(entry.noOverflow, true);
      assert.equal(entry.resultVisible, true);
      results.interactions.push(entry);
      if (run === 1) await page.screenshot({ path: path.join(out, `${kind}-${historySize}.png`), fullPage: false });
      await save();
      console.log(JSON.stringify(entry));
      await context.close();
    }
  }
  // Navigation Lighthouse cannot supply field INP. Define one visible local
  // action per remaining screen and collect Event Timing independently.
  for (const screen of ['home', 'qualification', 'explanation', 'review']) for (let run = 1; run <= 10; run++) {
    if (results.screenInteractions.some(row => row.screen === screen && row.run === run)) continue;
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 1, serviceWorkers: 'block' });
    await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
    await context.addInitScript(seed, { count: 2000, questionId });
    await context.addInitScript(() => {
      window.__screenEvents = [];
      new PerformanceObserver(list => { for (const e of list.getEntries()) if (e.interactionId) window.__screenEvents.push({ name: e.name, duration: e.duration, startTime: e.startTime, processingStart: e.processingStart, interactionId: e.interactionId }); }).observe({ type: 'event', buffered: true, durationThreshold: 16 });
      document.addEventListener('pointerdown', e => { if (e.target.closest('button')) window.__screenTap = { at: e.timeStamp, handledAt: performance.now() }; }, true);
    });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    const requests = [];
    page.on('request', r => requests.push(r.url()));
    const route = routes.find(route => route.name === screen);
    await page.goto(base + route.url);
    const explanationSelector = '[aria-label="解答結果"]:not([aria-hidden="true"]) [aria-label$="解説"]';
    let action;
    let target;
    if (screen === 'home' || screen === 'qualification') {
      action = 'open-mobile-menu';
      target = page.getByRole('button', { name: 'メニューを開く', exact: true }).first();
    } else if (screen === 'review') {
      action = 'answer-review-question';
      target = page.getByRole('radio').first();
    } else {
      const choice = page.getByRole('radio').first();
      await choice.waitFor();
      await choice.scrollIntoViewIfNeeded();
      await page.waitForTimeout(700);
      await choice.tap();
      await page.locator(explanationSelector).waitFor({ state: 'visible' });
      action = 'toggle-review-registration';
      target = page.getByRole('navigation', { name: '解答後の学習操作' }).locator('button[aria-pressed]');
    }
    await target.waitFor();
    await target.scrollIntoViewIfNeeded();
    await page.waitForTimeout(700);
    const beforePressed = await target.getAttribute('aria-pressed');
    const url = page.url();
    await page.evaluate(() => { window.__screenEvents = []; window.__screenTap = null; });
    requests.length = 0;
    await target.tap();
    if (action === 'open-mobile-menu') await page.getByRole('dialog').waitFor({ state: 'visible' });
    else if (action === 'answer-review-question') await page.locator(explanationSelector).waitFor({ state: 'visible' });
    else assert.notEqual(await target.getAttribute('aria-pressed'), beforePressed);
    await page.waitForTimeout(250);
    const data = await page.evaluate(() => ({ tap: window.__screenTap, events: window.__screenEvents }));
    assert.ok(data.tap && Number.isFinite(data.tap.at));
    const events = data.events.filter(e => e.startTime >= data.tap.at - 8);
    const entry = { screen, action, run, historySize: 2000, eventTimingMax: events.length ? Math.max(...events.map(e => e.duration)) : null, pointerInputDelay: data.tap.handledAt - data.tap.at, events, urlUnchanged: page.url() === url, apiPaths: requests.filter(u => new URL(u).pathname.startsWith('/api/')).map(u => new URL(u).pathname) };
    assert.equal(entry.urlUnchanged, true);
    assert.equal(entry.apiPaths.some(p => /copilot|generate|essay|grade|\/ai\//.test(p)), false);
    results.screenInteractions.push(entry);
    await save();
    console.log(JSON.stringify(entry));
    await context.close();
  }
} finally { await browser.close(); }
