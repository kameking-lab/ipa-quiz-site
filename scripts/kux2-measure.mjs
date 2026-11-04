// Local production comparison. No credentials or external requests.
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const [phase, port, output] = process.argv.slice(2);
if (!['before', 'after'].includes(phase) || !/^\d+$/.test(port ?? '') || !output) throw new Error('phase port output required');
const out = path.resolve(output, phase);
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch();
const samples = [];
try {
  for (let run = 0; run < 3; run++) for (const exam of ['sc', 'nw', 'st', 'sa', 'ap']) {
    const base = `http://127.0.0.1:${port}`;
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, serviceWorkers: 'block', reducedMotion: 'reduce' });
    await context.route('**/*', route => new URL(route.request().url()).origin === base ? route.continue() : route.abort());
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    const errors = [], ai = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('request', r => { if (/\/api\/(copilot|essay|afternoon|ai)/.test(r.url())) ai.push(r.url()); });
    await page.addInitScript(() => {
      window.__lcp = null;
      new PerformanceObserver(list => { for (const entry of list.getEntries()) window.__lcp = entry.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
    });
    const response = await page.goto(`${base}/${exam}`, { waitUntil: 'networkidle' });
    const metrics = await page.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      const box = selector => { const e = document.querySelector(selector); if (!e) return null; const b = e.getBoundingClientRect(); return { y: b.y, height: b.height }; };
      return {
        ttfb: nav.responseStart - nav.requestStart,
        domContentLoaded: nav.domContentLoadedEventEnd,
        lcp: window.__lcp,
        scriptBytes: performance.getEntriesByType('resource').filter(r => r.initiatorType === 'script').reduce((s, r) => s + r.encodedBodySize, 0),
        overflow: document.documentElement.scrollWidth > innerWidth,
        start: box('section[aria-label="今すぐ解く"] a'),
        menu: box('nav[aria-label="学習メニュー"]'),
        afternoon: box('#afternoon'),
        oldAfternoon: box('section[aria-label="AI 午後問題対策"]'),
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content,
      };
    });
    if (run === 0) {
      await page.screenshot({ path: path.join(out, `${exam}-390.png`), fullPage: true });
      await page.screenshot({ path: path.join(out, `${exam}-390-viewport.png`) });
      for (const width of [320, 1440]) {
        await page.setViewportSize({ width, height: width === 1440 ? 900 : 844 });
        await page.screenshot({ path: path.join(out, `${exam}-${width}-viewport.png`) });
      }
    }
    samples.push({ exam, run, status: response.status(), errors, ai, ...metrics });
    await context.close();
  }
} finally { await browser.close(); }
await fs.writeFile(path.join(out, 'metrics.json'), JSON.stringify({ phase, port, viewport: '390x844', cpuSlowdown: 4, runs: 3, network: 'local; external blocked', samples }, null, 2));
console.log(JSON.stringify(samples.map(({ exam, run, status, lcp, scriptBytes, start, menu, overflow }) => ({ exam, run, status, lcp, scriptBytes, start, menu, overflow }))));
