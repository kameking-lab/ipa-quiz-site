// Windows capture of the existing WebView UI. Never installs or changes browsers.
import { webkit } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFile, mkdir, writeFile, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { checkImages } from './asc_image_check.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const config = JSON.parse(await readFile(path.join(root, 'asc/capture.json'), 'utf8'));
const output = path.resolve(process.argv[2] ?? path.join(root, 'build/asc/windows-capture'));
const local = 'http://127.0.0.1:5199'; // Serve the unchanged mobile/index.html with Vite.
const routes = ['/', '/ap', '/review', '/account/dashboard'];
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
await mkdir(output, { recursive: true });
if ((await readdir(output)).length) throw new Error('Capture destination must be empty');
const manifest = {
  git_commit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
  captured_at: new Date().toISOString(),
  capture_engine: 'Windows Playwright WebKit (not an iOS runtime)',
  capture_script_sha256: sha256(await readFile(fileURLToPath(import.meta.url))),
  authentication: 'anonymous',
  capture_plan: 'ASC4 quota-free alternative: qualifications, empty review/history, unset local reminder',
  quota_grants: 0,
  native_display: 'Production Capacitor nativeClient switch via CapacitorCustomPlatform=ios; official web plugin fallbacks. No entitlement/history injection.',
  fifth_screen: 'Unchanged mobile/index.html + src/main.tsx served by Vite; web platform; notification controls not used',
  limitations: 'Windows WebKit fonts/time controls/safe areas may differ from iOS. No OS chrome fabricated. No notification, purchase or offline-operation success claimed.',
  images: [],
};
manifest.local_source_sha256 = {};
for (const file of ['index.html', 'src/main.tsx', 'src/native.css', '../app/globals.css', 'asc/capture.json']) {
  manifest.local_source_sha256[file] = sha256(await readFile(path.join(root, file)));
}
const browser = await webkit.launch({ headless: true });
let currentPage;
try {
  for (const device of config.devices) {
    const context = await browser.newContext({
      viewport: { width: device.width / 3, height: device.height / 3 },
      deviceScaleFactor: 3, isMobile: true, hasTouch: true,
      locale: 'ja-JP', timezoneId: 'Asia/Tokyo', colorScheme: 'light',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
      serviceWorkers: 'block',
    });
    const blocked = [], errors = [], emptyReviewRequests = [];
    // Block before sending: no question/grant/AI/auth/checkout/download requests,
    // including Next link prefetches. Never fulfill with fabricated responses.
    await context.route('**/*', async route => {
      const request = route.request(), url = new URL(request.url());
      if (url.origin === config.origin) {
        let emptyReview = false;
        if (url.pathname === '/api/review/due' && request.method() === 'POST') {
          const body = request.postDataJSON();
          // This endpoint iterates historyIds to grant questions. The genuine
          // anonymous empty state has no IDs, so it cannot consume a grant.
          emptyReview = Array.isArray(body?.historyIds) && body.historyIds.length === 0
            && body.reviewStore && Object.keys(body.reviewStore).length === 0;
          if (emptyReview) emptyReviewRequests.push({ historyIds: 0, reviewStore: 0 });
        }
        const forbidden = /^\/(?:quiz|q|auth|billing|sign-in|sign-up)(?:\/|$)/.test(url.pathname)
          || /^\/api\/(?:billing|copilot|ai|auth|mobile\/(?:grant|question|download|packs))\b/.test(url.pathname)
          || (!['GET', 'HEAD'].includes(request.method()) && !emptyReview);
        if (forbidden) { blocked.push({ path: url.pathname, method: request.method() }); return route.abort(); }
      } else if (url.origin !== local && !['data:', 'blob:'].includes(url.protocol)) {
        // Matches the capture profile's disabled advertising and rejected consent.
        return route.abort();
      }
      return route.continue();
    });
    await context.addInitScript(() => {
      if (location.origin === 'https://www.kakomon-ai.jp') {
        // This is the application's existing native-only rendering switch.
        window.CapacitorCustomPlatform = { name: 'ios', plugins: {} };
        window.Capacitor = { isNativePlatform: () => true };
      }
    });
    const page = await context.newPage();
    currentPage = page;
    page.on('pageerror', error => errors.push(error.message));
    for (const [index, screen] of config.screens.entries()) {
      const reminder = index === 4;
      const url = reminder ? local : config.origin + routes[index];
      await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      if (reminder) await page.locator('main[data-mobile-ready=true]').waitFor();
      else await page.getByText('iPhone設定・会員・保存', { exact: true }).waitFor();
      if (index === 2) await page.getByText('復習キューはまだ空です', { exact: false }).waitFor();
      if (index === 3) {
        await page.getByText('総問題数', { exact: true }).waitFor();
        await page.getByText('まだ回答記録がありません', { exact: true }).waitFor();
      }
      // Use only real dismissal controls. Unknown dialogs fail the capture.
      for (const dialog of await page.locator('[role=dialog],dialog[open]').all()) {
        if (!await dialog.isVisible()) continue;
        const text = await dialog.innerText();
        const names = /cookie|クッキー|広告|プライバシー/i.test(text)
          ? /^(同意しない|すべて拒否|Reject all|Reject All)$/ : /^(スキップ|スキップして閉じる|あとで)$/;
        const button = dialog.getByRole('button', { name: names });
        if (await button.count() !== 1) throw new Error('Unknown dialog');
        await button.click();
      }
      let target;
      if (index === 0) {
        await page.getByRole('button', { name: 'IT・情報処理', exact: true }).click();
        await page.locator('#choose-qualification button[aria-pressed=true]').filter({ hasText: 'IT・情報処理' }).waitFor();
        await page.locator('#qualification-results a[href="/ap"]').waitFor();
        target = page.locator('#choose-qualification');
      } else if (reminder) target = page.locator('input[type=time]');
      else target = page.locator('main h1').first();
      await target.evaluate(element => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
      await page.evaluate(async () => { document.activeElement?.blur(); await document.fonts.ready; });
      await page.waitForFunction(() => [...document.images].filter(img => {
        const box = img.getBoundingClientRect(); return box.bottom > 0 && box.top < innerHeight;
      }).every(img => img.complete && img.naturalWidth > 0));
      const visibleText = await page.evaluate(() => [...document.querySelectorAll('h1,h2,h3,p,span,button')]
        .filter(e => { const r = e.getBoundingClientRect(); return r.width && r.height && r.bottom > 0 && r.top < innerHeight; })
        .map(e => e.textContent).join('\n'));
      if (/読み込み中|Loading[.…]|\uFFFD/.test(visibleText)) throw new Error('Loading or replacement character in view');
      if (index === 2 && !await page.getByText('復習キューはまだ空です', { exact: false }).count()) throw new Error('Not actual empty review');
      if (index === 3 && !await page.getByText('総問題数', { exact: true }).count()) throw new Error('Dashboard missing');
      const file = `${screen}-${device.slug}.jpg`, first = path.join(output, file);
      await page.waitForTimeout(2000);
      await page.screenshot({ path: first, type: 'jpeg', quality: 95, fullPage: false });
      await page.waitForTimeout(2000);
      const second = path.join(root, 'build/asc', `${screen}-${device.slug}-settled.jpg`);
      await page.screenshot({ path: second, type: 'jpeg', quality: 95, fullPage: false });
      const pixels = await checkImages(first, device.width, device.height, second);
      if (!pixels.accepted) throw new Error(`Blank or unstable image: ${file}`);
      if (errors.length) throw new Error(`Page errors: ${errors.join('; ')}`);
      manifest.images.push({ file, sha256: sha256(await readFile(first)),
        source: reminder ? 'mobile/index.html (unchanged local app)' : config.origin + routes[index],
        viewport: { width: device.width / 3, height: device.height / 3, deviceScaleFactor: 3 },
        pixel_check: pixels, visual_review: { status: 'pending' } });
      console.log(`Captured ${file}`);
    }
    manifest[`request_audit_${device.slug}`] = { granted: 0, blocked, empty_review_requests: emptyReviewRequests, page_errors: errors };
    await context.close();
  }
  await writeFile(path.join(output, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
} catch (error) {
  if (currentPage) {
    await currentPage.screenshot({ path: path.join(output, 'failure.jpg'), type: 'jpeg', quality: 90 }).catch(() => {});
    // Anonymous allowed pages only; never dump cookies, headers or environment.
    console.error((await currentPage.locator('main').innerText().catch(() => '')).slice(0, 2000));
  }
  throw error;
} finally { await browser.close(); }
