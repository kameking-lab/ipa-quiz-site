#!/usr/bin/env tsx
/**
 * Playwright で Sentry のエラー送信を検証するスクリプト
 * 使い方: tsx scripts/verify-sentry.ts
 * 環境変数:
 *   VERIFY_BASE_URL  対象 URL (デフォルト: https://ipa-quiz-site.vercel.app)
 */

import { chromium, firefox, webkit, type Browser, type BrowserContext, type ConsoleMessage, type Response, type Dialog } from "playwright";

const BASE_URL = process.env.VERIFY_BASE_URL ?? "https://ipa-quiz-site.vercel.app";
// Sentry uses tunnelRoute "/monitoring" (same-domain proxy) — watch both
const SENTRY_PATTERNS = ["ingest.us.sentry.io", "/monitoring"];
const TIMEOUT_MS = 20_000;

interface BrowserResult {
  name: string;
  pageLoaded: boolean;
  buttonClicked: boolean;
  alertText: string | null;
  networkRequestMade: boolean;
  networkStatus: number | null;
  consoleErrors: string[];
  cspViolations: string[];
  error?: string;
}

async function verifyInBrowser(
  browser: Browser,
  browserName: string
): Promise<BrowserResult> {
  const result: BrowserResult = {
    name: browserName,
    pageLoaded: false,
    buttonClicked: false,
    alertText: null,
    networkRequestMade: false,
    networkStatus: null,
    consoleErrors: [],
    cspViolations: [],
  };

  let context: BrowserContext | undefined;
  try {
    context = await browser.newContext();
    const page = await context.newPage();

    // Handle alert dialogs (SentryTestClient shows alert on captureMessage success)
    page.on("dialog", async (dialog: Dialog) => {
      result.alertText = dialog.message();
      await dialog.accept();
    });

    // Collect console errors
    page.on("console", (msg: ConsoleMessage) => {
      if (msg.type() === "error") {
        const text = msg.text();
        result.consoleErrors.push(text);
        if (text.includes("Content Security Policy") || text.includes("Content-Security-Policy")) {
          result.cspViolations.push(text);
        }
      }
    });

    // Watch for Sentry network requests (direct ingest or tunnelRoute /monitoring)
    page.on("response", async (res: Response) => {
      const url = res.url();
      if (SENTRY_PATTERNS.some((p) => url.includes(p))) {
        result.networkRequestMade = true;
        result.networkStatus = res.status();
      }
    });

    // Navigate
    await page.goto(`${BASE_URL}/test/sentry`, { waitUntil: "networkidle", timeout: TIMEOUT_MS });
    result.pageLoaded = true;

    // Dismiss any modal/dialog that may be blocking the UI (e.g. WelcomeModal)
    await page.keyboard.press("Escape");
    await page.waitForTimeout(500);
    const closeBtn = page.locator('[aria-label="Close"], [data-radix-dialog-close], button:has-text("閉じる"), button:has-text("×")').first();
    if (await closeBtn.isVisible().catch(() => false)) {
      await closeBtn.click({ timeout: 2000 }).catch(() => {});
      await page.waitForTimeout(300);
    }

    // Click "captureMessage を送信する" (preferred over throw since throw may crash the page)
    await page.click("button:has-text('captureMessage')", { timeout: 8000 });
    result.buttonClicked = true;

    // Wait for Sentry to flush (Sentry batches with a 5s default flush interval)
    await page.waitForTimeout(7000);

  } catch (err) {
    result.error = String(err);
  } finally {
    await context?.close();
  }

  return result;
}

async function main(): Promise<BrowserResult[]> {
  const browsers: Array<{ name: string; launch: () => Promise<Browser> }> = [
    { name: "chromium", launch: () => chromium.launch() },
    { name: "firefox", launch: () => firefox.launch() },
    { name: "webkit", launch: () => webkit.launch() },
  ];

  console.log(`\n=== Sentry 動作確認 ===`);
  console.log(`Target: ${BASE_URL}/test/sentry\n`);

  const results: BrowserResult[] = [];

  for (const { name, launch } of browsers) {
    console.log(`[${name}] テスト中...`);
    let browser: Browser | undefined;
    try {
      browser = await launch();
      const result = await verifyInBrowser(browser, name);
      results.push(result);

      const networkOk = result.networkRequestMade && (result.networkStatus === 200 || result.networkStatus === 204);
      const ok = result.pageLoaded && result.buttonClicked && (networkOk || result.alertText !== null);
      const icon = ok ? "✅" : "⚠️";
      console.log(`  ${result.pageLoaded ? "✅" : "❌"} ページ読み込み`);
      console.log(`  ${result.buttonClicked ? "✅" : "❌"} ボタンクリック`);
      console.log(`  ${result.alertText ? "✅" : "⚠️"} アラート: ${result.alertText ?? "(なし)"}`);
      console.log(`  ${networkOk ? "✅" : "⚠️"} Sentry リクエスト: ${result.networkRequestMade} (status: ${result.networkStatus ?? "n/a"})`);
      if (result.cspViolations.length > 0) {
        console.log(`  ❌ CSP 違反: ${result.cspViolations.length}件`);
        result.cspViolations.forEach((v) => console.log(`     - ${v.slice(0, 120)}`));
      } else {
        console.log(`  ✅ CSP 違反: なし`);
      }
      if (result.error) {
        console.log(`  ❌ エラー: ${result.error}`);
      }
      void icon;
    } finally {
      await browser?.close();
    }
    console.log();
  }

  return results;
}

main()
  .then((results) => {
    const allOk = results.every(
      (r) => r.pageLoaded && r.buttonClicked && (r.networkRequestMade || r.alertText !== null)
    );
    process.exit(allOk ? 0 : 1);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
