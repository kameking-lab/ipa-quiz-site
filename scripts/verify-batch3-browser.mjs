import { chromium } from "@playwright/test";
import { spawn } from "node:child_process";
import { createWriteStream, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const output = resolve(root, "reports/int7-20261105");
const origin = "http://127.0.0.1:3386";
mkdirSync(resolve(output, "screenshots"), { recursive: true });
const audit = JSON.parse(readFileSync(resolve(output, "runtime-audit.json"), "utf8"));
const log = createWriteStream(resolve(output, "visual-server.log"));
const server = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", "3386"], { cwd: root, env: process.env, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
server.stdout.pipe(log, { end: false }); server.stderr.pipe(log, { end: false });
let browser;
const receipts = [];
const errors = [];
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
try {
  let ready = false;
  for (let n = 0; n < 120; n++) {
    if (server.exitCode !== null) throw new Error(`Local server exited ${server.exitCode}`);
    try { const response = await fetch(origin); await response.arrayBuffer(); if (response.ok) { ready = true; break; } } catch { /* Wait for the owned local server. */ }
    await wait(500);
  }
  if (!ready) throw new Error("Owned local server did not start");
  const landings = spawn(process.execPath, ["scripts/verify-batch3-landings.mjs", origin], { env: process.env, windowsHide: true, stdio: ["ignore", "pipe", "pipe"] });
  const landingsLog = createWriteStream(resolve(output, "local-landings.log"));
  landings.stdout.pipe(landingsLog); landings.stderr.pipe(landingsLog);
  if (await new Promise(resolve => landings.once("exit", resolve)) !== 0) throw new Error("Local landing URL verification failed");
  browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true, serviceWorkers: "block" });
  await context.addInitScript(() => localStorage.setItem("ipa-quiz:onboarded:v1", "1"));
  await context.route("**/*", route => {
    const hostname = new URL(route.request().url()).hostname;
    return ["127.0.0.1", "localhost"].includes(hostname) ? route.continue() : route.abort();
  });
  const page = await context.newPage();
  page.on("pageerror", error => errors.push(String(error)));
  const screenshot = async (name, url, locator) => {
    const response = await page.goto(origin + url, { waitUntil: "networkidle" });
    if (response?.status() !== 200) throw new Error(`${url}: ${response?.status()}`);
    if (locator) await page.locator(locator).first().scrollIntoViewIfNeeded();
    const path = resolve(output, "screenshots", name + ".png");
    await page.screenshot({ path });
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
    if (overflow) throw new Error(`${url}: horizontal overflow at 390px`);
    receipts.push({ name, url, status: response.status(), width: 390, height: 844, overflow, screenshot: path });
  };
  for (const row of audit.rows) {
    await screenshot(row.code + "-hub", "/" + row.code);
    await screenshot(row.code + "-question", row.samples[0].url);
  }
  await screenshot("surveyor-afternoon-manual", "/q/sokuryoshi/2026-annual/pm/q1", 'section[aria-label="記述の独自解答例"]');
  await screenshot("nurse-alternate-answer", "/q/junkango-kansai/2026-annual/gakka/q139");
  await screenshot("contact-tsugino", "/contact?site=tsugino");
  await screenshot("gsc-sc", "/sc");
  await screenshot("gsc-blog", "/blog/it-shikaku-rirekisho-kakikata");
  if (errors.length) throw new Error(`Browser errors: ${errors.join("; ")}`);
  writeFileSync(resolve(output, "visual-receipt.json"), JSON.stringify({ origin, viewport: { width: 390, height: 844 }, receipts, pageErrors: errors, externalRequests: "blocked before leaving the local browser" }, null, 2) + "\n");
  console.log(JSON.stringify({ screenshots: receipts.length, pageErrors: errors.length, overflow: false }));
} finally {
  await browser?.close();
  server.kill(); log.end();
}
