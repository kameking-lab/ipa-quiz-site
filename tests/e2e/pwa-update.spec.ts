import { test, expect, type Page, type BrowserContext } from "@playwright/test";
import { createServer, type Server } from "node:http";
import { readFileSync } from "node:fs";
import { transpileModule, ScriptTarget, ModuleKind } from "typescript";
import { LS_KEYS } from "../../lib/storage/keys";

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
      <button>Purchase</button><button>Sign in</button><button>Show explanation</button>
      <p id="transaction"></p><section id="explanation" hidden>解答直後の解説</section>
      <script type="module">sessionStorage.loads = String(Number(sessionStorage.loads || 0) + 1);
      document.body.dataset.standalone = String(navigator.standalone === true || matchMedia('(display-mode: standalone)').matches);
      document.querySelectorAll('button').forEach(button => button.onclick = () => {
        if (button.textContent === 'Show explanation') document.querySelector('#explanation').hidden = false;
        else document.querySelector('#transaction').textContent = button.textContent + ' pending';
      });
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

// Sentinel values test byte-for-byte preservation, not authentication against a
// live account. Prefix entries include both guest and account-specific records.
const savedKeys = Object.entries(LS_KEYS).flatMap(([name, key]) => name.endsWith("Prefix")
  ? [key, `${key}guest`, `${key}user%3Ae2e`] : [key]);
async function seedUserData(page: Page, context: BrowserContext) {
  await context.addCookies([{ name: "authjs.session-token", value: "local-e2e-session-only", url: origin, httpOnly: true, sameSite: "Lax" }]);
  await page.evaluate(async keys => {
    for (const [i, key] of keys.entries()) {
      const value = JSON.stringify({ key, points: 980 + i, level: 7, outfit: "blue", history: ["q1"], entitled: true });
      localStorage.setItem(key, value);
      sessionStorage.setItem(key, `session:${value}`);
    }
    localStorage.setItem("kakomon:portable-study:owner:v2", JSON.stringify({ owner: "e2e" }));
    await new Promise<void>((resolve, reject) => {
      const open = indexedDB.open("pwa-preservation-e2e", 1);
      open.onupgradeneeded = () => open.result.createObjectStore("study");
      open.onerror = () => reject(open.error);
      open.onsuccess = () => {
        const db = open.result;
        const tx = db.transaction("study", "readwrite");
        tx.objectStore("study").put({ question: "/q/ip/visited", answer: "イ", entitled: true }, "saved");
        tx.oncomplete = () => { db.close(); resolve(); };
        tx.onerror = () => reject(tx.error);
      };
    });
  }, savedKeys);
  return snapshotUserData(page, context);
}
async function snapshotUserData(page: Page, context: BrowserContext) {
  const storage = await page.evaluate(async keys => {
    const idb = await new Promise<unknown>((resolve, reject) => {
      const open = indexedDB.open("pwa-preservation-e2e", 1);
      open.onerror = () => reject(open.error);
      open.onsuccess = () => {
        const db = open.result;
        if (!db.objectStoreNames.contains("study")) { db.close(); resolve(null); return; }
        const request = db.transaction("study").objectStore("study").get("saved");
        request.onsuccess = () => { db.close(); resolve(request.result); };
        request.onerror = () => reject(request.error);
      };
    });
    return {
      local: Object.fromEntries(Object.keys(localStorage).sort().map(key => [key, localStorage.getItem(key)])),
      session: Object.fromEntries(keys.map(key => [key, sessionStorage.getItem(key)])),
      idb,
    };
  }, savedKeys);
  return { ...storage, cookies: await context.cookies(origin) };
}

test("every LS_KEYS value, session value, IndexedDB record and HttpOnly session cookie survives automatic version reload", async ({ page, context }) => {
  await standalone(context);
  await page.goto(origin);
  await controlled(page);
  const before = await seedUserData(page, context);
  await page.evaluate(async () => { await caches.open("ipa-quiz-another-feature"); });
  deployment = "build-2";
  await foreground(page);
  await expect(page.locator("h1")).toHaveText("build-2");
  expect(await snapshotUserData(page, context)).toEqual(before);
  expect(await page.evaluate(() => caches.keys())).toContain("ipa-quiz-another-feature");
  // Both question deep links and qualification pages remain online-addressable.
  for (const path of ["/q/ip/visited", "/ip"]) {
    const response = await page.goto(`${origin}${path}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveText("build-2");
    expect(await snapshotUserData(page, context)).toEqual(before);
  }
});

for (const action of ["input", "Purchase", "Sign in", "Show explanation"]) {
  test(`${action} blocks automatic reload until the next navigation`, async ({ page, context }) => {
    await standalone(context);
    await page.goto(origin);
    await controlled(page);
    const before = await seedUserData(page, context);
    if (action === "input") {
      await page.getByRole("textbox").fill("入力途中");
      await page.getByRole("textbox").blur();
    } else {
      await page.getByRole("button", { name: action, exact: true }).click();
    }
    deployment = "build-2";
    await foreground(page);
    await activeVersion(page, "build-2");
    await page.waitForTimeout(1500); // exceeds the real reload polling interval
    await expect(page.locator("h1")).toHaveText("build-1");
    expect(await page.evaluate(() => sessionStorage.loads)).toBe("1");
    if (action === "input") await expect(page.getByRole("textbox")).toHaveValue("入力途中");
    else if (action === "Show explanation") await expect(page.locator("#explanation")).toBeVisible();
    else await expect(page.locator("#transaction")).toHaveText(`${action} pending`);
    expect(await snapshotUserData(page, context)).toEqual(before);
    await page.goto(`${origin}/about`);
    await expect(page.locator("h1")).toHaveText("build-2");
    expect(await snapshotUserData(page, context)).toEqual(before);
  });
}

test("native transition retains all user data and offline responses while a question is open", async ({ page, context }) => {
  deployment = "build-1";
  await page.goto(origin);
  await controlled(page);
  await page.goto(`${origin}/q/ip/visited`);
  const before = await seedUserData(page, context);
  await page.evaluate(async () => { await caches.open("native-signed-study"); await caches.open("ipa-quiz-another-feature"); });
  // A sentinel native bridge rejects any Preferences or purchases mutation.
  const nativeCalls: string[] = [];
  await context.exposeBinding("recordNativeCall", (_source, method: string) => { nativeCalls.push(method); });
  await context.addInitScript(() => {
    const record = (method: string) => (window as unknown as { recordNativeCall: (m: string) => Promise<void> }).recordNativeCall(method);
    Object.assign(window, { Capacitor: {
      isNativePlatform: () => true,
      Plugins: {
        Preferences: { clear: () => record("Preferences.clear"), remove: () => record("Preferences.remove"), set: () => record("Preferences.set") },
        Purchases: { logOut: () => record("Purchases.logOut"), logIn: () => record("Purchases.logIn") },
      },
    } });
  });
  deployment = "build-2";
  await page.reload();
  await expect.poll(() => page.evaluate(() => navigator.serviceWorker.getRegistrations().then(r => r.length))).toBe(0);
  await page.getByRole("textbox").fill("ネイティブで解答中");
  await foreground(page);
  await page.waitForTimeout(1500);
  await expect(page.getByRole("textbox")).toHaveValue("ネイティブで解答中");
  expect(await page.evaluate(() => sessionStorage.loads)).toBe("3");
  expect(await page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);
  networkDown = true;
  expect(await page.evaluate(() => fetch("/q/ip/visited").then(r => r.ok))).toBe(true);
  expect(await snapshotUserData(page, context)).toEqual(before);
  networkDown = false;
  await page.goto(origin);
  await page.waitForFunction(() => navigator.serviceWorker.controller === null);
  await expect.poll(() => page.evaluate(() => caches.keys())).toEqual(["native-signed-study", "ipa-quiz-another-feature"]);
  expect(await snapshotUserData(page, context)).toEqual(before);
  expect(nativeCalls).toEqual([]);
});
