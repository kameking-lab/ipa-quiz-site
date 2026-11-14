import { test, expect, type Page, type BrowserContext } from "@playwright/test";
import { createServer, type Server } from "node:http";
import { readFileSync } from "node:fs";
import { transpileModule, ScriptTarget, ModuleKind } from "typescript";

// Use the real worker and the real client update module; only the HTTP origin
// and deployment's HTML/build ID are fixtures. No browser routing mocks SW fetch.
const workerSource = readFileSync("lib/pwa/sw.js", "utf8");
const legacySource = readFileSync("tests/e2e/fixtures/pwa-legacy-sw.js", "utf8");
const updateSource = transpileModule(readFileSync("lib/pwa/updates.ts", "utf8"), {
  compilerOptions: { target: ScriptTarget.ES2022, module: ModuleKind.ESNext },
}).outputText.replace(/^export /gm, "");
let server: Server;
let origin: string;
let deployment: "legacy" | "build-1" | "build-2";
let networkDown = false;

test.beforeAll(async () => {
  server = createServer((req, res) => {
    if (networkDown) { res.destroy(); return; }
    if (req.url === "/sw.js") {
      res.writeHead(200, { "Content-Type": "application/javascript", "Cache-Control": "no-cache, max-age=0, must-revalidate", "Service-Worker-Allowed": "/" });
      res.end(deployment === "legacy" ? legacySource : workerSource.replace("__PWA_BUILD_ID__", deployment));
      return;
    }
    if (req.url?.includes("_rsc=")) {
      res.writeHead(200, { "Content-Type": "text/x-component", Vary: "RSC", "Cache-Control": "no-cache" });
      res.end(`RSC ${deployment}`);
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html", "Cache-Control": "no-cache" });
    const bootstrap = deployment === "legacy"
      ? 'navigator.serviceWorker.register("/sw.js");'
      : `${updateSource}\nstartPwaUpdates({ buildId: ${JSON.stringify(deployment)}, native: !!window.Capacitor });`;
    res.end(`<!doctype html><html><head><title>PWA update</title></head><body>
      <h1>${deployment}</h1><input aria-label="answer"><a href="/">Home</a>
      <script type="module">sessionStorage.loads = String(Number(sessionStorage.loads || 0) + 1);
      document.body.dataset.standalone = String(navigator.standalone === true || matchMedia('(display-mode: standalone)').matches);
      ${bootstrap}</script></body></html>`);
  });
  await new Promise<void>(resolve => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("missing fixture port");
  origin = `http://127.0.0.1:${address.port}`;
});
test.afterAll(async () => { await new Promise<void>((resolve, reject) => server.close(error => error ? reject(error) : resolve())); });
test.beforeEach(() => { deployment = "build-1"; networkDown = false; });

async function standalone(context: BrowserContext) {
  await context.addInitScript(() => {
    // Playwright cannot install an OS home-screen icon. Exercise the identical
    // web lifecycle with both the iOS standalone flag and display-mode signal.
    Object.defineProperty(navigator, "standalone", { value: true });
    const media = window.matchMedia.bind(window);
    window.matchMedia = query => query === "(display-mode: standalone)"
      ? Object.assign(media(query), { matches: true }) : media(query);
  });
}
async function controlled(page: Page) {
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
}
async function activeVersion(page: Page, version: string) {
  await expect.poll(() => page.evaluate(async () => {
    const channel = new MessageChannel();
    return new Promise<string>(resolve => {
      const timeout = setTimeout(() => { channel.port1.close(); resolve("no version yet"); }, 300);
      channel.port1.onmessage = event => { clearTimeout(timeout); channel.port1.close(); resolve(event.data.version); };
      navigator.serviceWorker.controller?.postMessage({ type: "GET_VERSION" }, [channel.port2]);
    });
  })).toBe(version);
}
async function foreground(page: Page) {
  await page.evaluate(() => document.dispatchEvent(new Event("visibilitychange")));
}

test("standalone foreground activates the deployment and reloads new HTML exactly once", async ({ page, context }) => {
  await standalone(context);
  await page.goto(origin);
  await controlled(page);
  await expect(page.locator("body")).toHaveAttribute("data-standalone", "true");
  await expect(page.locator("h1")).toHaveText("build-1");
  deployment = "build-2";
  await foreground(page);
  await expect(page.locator("h1")).toHaveText("build-2");
  await activeVersion(page, "build-2");
  await foreground(page);
  await expect.poll(() => page.evaluate(() => sessionStorage.loads)).toBe("2");
});

test("quiz input survives activation; returning home gets the new deployment", async ({ page, context }) => {
  await standalone(context);
  await page.goto(`${origin}/q/ip/visited`);
  await controlled(page);
  await page.getByRole("textbox").fill("途中の解答");
  deployment = "build-2";
  await foreground(page);
  await activeVersion(page, "build-2");
  await expect(page.locator("h1")).toHaveText("build-1");
  await expect(page.getByRole("textbox")).toHaveValue("途中の解答");
  expect(await page.evaluate(() => sessionStorage.loads)).toBe("1");
  await page.getByRole("link", { name: "Home" }).click();
  await expect(page.locator("h1")).toHaveText("build-2");
});

test("online HTML/RSC bypass stale responses and visited questions survive an offline deployment migration", async ({ page, context }) => {
  await standalone(context);
  await page.goto(origin);
  await controlled(page);
  await page.goto(`${origin}/q/ip/visited`);
  await expect.poll(() => page.evaluate(async () => {
    const cache = await caches.open("ipa-quiz-content-build-1");
    return !!await cache.match("/q/ip/visited");
  })).toBe(true);
  await page.goto(origin);
  expect(await page.evaluate(() => fetch('/q/ip/visited?_rsc=same', { headers: { RSC: '1' } }).then(r => r.text()))).toBe("RSC build-1");
  deployment = "build-2";
  // Network-first must fetch new RSC even before the worker itself updates.
  expect(await page.evaluate(() => fetch('/q/ip/visited?_rsc=same', { headers: { RSC: '1' } }).then(r => r.text()))).toBe("RSC build-2");
  await foreground(page);
  await expect(page.locator("h1")).toHaveText("build-2");
  await expect.poll(() => page.evaluate(() => caches.keys())).not.toContain("ipa-quiz-content-build-1");
  networkDown = true;
  await page.goto(`${origin}/q/ip/visited`);
  await expect(page.locator("h1")).toHaveText("build-1");
  await expect(page.getByRole("textbox")).toBeVisible();
  networkDown = false;
  await page.reload();
  await expect(page.locator("h1")).toHaveText("build-2");
});

test("legacy v6 worker updates at the original URL and reopening standalone shows fresh HTML", async ({ page, context }) => {
  await standalone(context);
  deployment = "legacy";
  await page.goto(origin);
  await controlled(page);
  await page.goto(`${origin}/q/ip/legacy-visited`);
  await page.goto(origin);
  deployment = "build-2";
  // Browser-native update request is outside the old SW fetch handler. This
  // intentionally uses the old registration, with no new client code required.
  await page.evaluate(async () => { await (await navigator.serviceWorker.getRegistration())!.update(); });
  await activeVersion(page, "build-2");
  await page.close();
  const reopened = await context.newPage();
  await reopened.goto(origin);
  await expect(reopened.locator("h1")).toHaveText("build-2");
  networkDown = true;
  await reopened.goto(`${origin}/q/ip/legacy-visited`);
  await expect(reopened.locator("h1")).toHaveText("legacy");
});

test("native web view removes a legacy PWA controller while preserving its signed study store", async ({ page, context }) => {
  deployment = "legacy";
  await page.goto(origin);
  await controlled(page);
  await page.evaluate(async () => { await caches.open("native-signed-study"); });
  await context.addInitScript(() => { Object.assign(window, { Capacitor: { isNativePlatform: () => true } }); });
  deployment = "build-2";
  await page.reload();
  await page.waitForFunction(() => navigator.serviceWorker.controller === null);
  await expect.poll(() => page.evaluate(() => caches.keys())).toEqual(["native-signed-study"]);
  expect(await page.evaluate(() => navigator.serviceWorker.getRegistrations().then(r => r.length))).toBe(0);
});
