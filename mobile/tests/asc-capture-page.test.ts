import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { expect, it, vi } from "vitest";

const controller = readFileSync(new URL("../ios-assets/QualificationBridgeViewController.swift", import.meta.url), "utf8");
const script = controller.match(/static let pageScript = #"""\n([\s\S]*?)\n"""#/)![1];

function fixture(route = "/review") {
  let now = 0;
  const element = (textContent = "") => ({
    textContent, innerText: textContent, disabled: false,
    getClientRects: () => [1], getBoundingClientRect: () => ({ top: 10, bottom: 100 }),
    scrollIntoView: vi.fn(), click: vi.fn(), getAttribute: vi.fn(() => "true"),
  });
  const target = element();
  const filter = element("IT・情報処理");
  const main = element("復習キューはまだ空です 総問題数 0");
  const selectors: Record<string, unknown> = {
    'main h1': target, main, '#choose-qualification': target,
    '[aria-label="iPhoneの学習機能"]': element(),
    '#qualification-results a[href="/ap"]': element(),
    'input[type=time]': target, 'main[data-mobile-ready=true]': main,
  };
  const dialogs: ReturnType<typeof element>[] = [];
  const context = {
    location: { origin: route === "reminder" ? "capacitor://localhost" : "https://www.kakomon-ai.jp", pathname: route },
    document: {
      readyState: "complete", fonts: { status: "loaded" },
      body: { innerText: "actual anonymous UI", scrollHeight: 900 },
      images: [] as { complete: boolean; naturalWidth: number; getBoundingClientRect: () => { top: number; bottom: number } }[],
      activeElement: { blur: vi.fn() },
      querySelector: (selector: string) => selectors[selector],
      querySelectorAll: (selector: string) => selector === '#choose-qualification button' ? [filter] : dialogs,
    },
    window: {}, Date: { now: () => now }, scrollY: 100, innerHeight: 800, captureRequest: { route },
  };
  return { context, selectors, dialogs, element, filter, main, target,
    tick: (time = 0) => { now = time; return runInNewContext(`(() => {${script}\n})()`, context); } };
}

it("requires exact trusted origin, route, document completion and native tools", () => {
  const f = fixture();
  f.context.location.origin = "https://evil.invalid";
  expect(f.tick()).toBe("waiting for expected URL");
  f.context.location.origin = "https://www.kakomon-ai.jp";
  f.context.location.pathname = "/auth/signin";
  expect(f.tick()).toBe("waiting for expected URL");
  f.context.location.pathname = "/review";
  f.context.document.readyState = "loading";
  expect(f.tick()).toBe("waiting for document");
  f.context.document.readyState = "complete";
  delete f.selectors['[aria-label="iPhoneの学習機能"]'];
  expect(f.tick()).toBe("waiting for native online tools");
});

it("waits for review's actual empty response and dashboard data instead of their headings", () => {
  for (const route of ["/review", "/account/dashboard"]) {
    const f = fixture(route);
    f.main.innerText = "読み込み中...";
    expect(f.tick()).toMatch(/waiting for actual/);
    expect(f.tick(5000)).toMatch(/waiting for actual/);
    f.main.innerText = "復習キューはまだ空です 総問題数 0";
    expect(f.tick(6000)).toBe("waiting for stable layout");
    expect(f.tick(8000)).toBe("ready");
  }
});

it("waits for visible images, fonts, and two seconds of settled content", () => {
  const f = fixture();
  f.context.document.fonts.status = "loading";
  expect(f.tick()).toBe("waiting for fonts");
  f.context.document.fonts.status = "loaded";
  const image = { complete: false, naturalWidth: 0, getBoundingClientRect: () => ({ top: 20, bottom: 50 }) };
  f.context.document.images.push(image);
  expect(f.tick(1000)).toBe("waiting for visible images");
  image.complete = true; image.naturalWidth = 100;
  expect(f.tick(2000)).toBe("waiting for stable layout");
  f.context.document.body.innerText = "late hydration update";
  expect(f.tick(3500)).toBe("waiting for stable layout");
  expect(f.tick(5000)).toBe("waiting for stable layout");
  expect(f.tick(5500)).toBe("ready");
  expect(f.target.scrollIntoView).toHaveBeenCalledWith({ block: "start", behavior: "instant" });
});

it("applies the real IT filter and waits for its React state and result", () => {
  const f = fixture("/");
  f.filter.getAttribute.mockReturnValue("false");
  expect(f.tick()).toBe("selecting IT filter");
  expect(f.filter.click).toHaveBeenCalledOnce();
  f.filter.getAttribute.mockReturnValue("true");
  delete f.selectors['#qualification-results a[href="/ap"]'];
  expect(f.tick()).toBe("waiting for qualifications");
  f.selectors['#qualification-results a[href="/ap"]'] = f.target;
  expect(f.tick(1000)).toBe("waiting for stable layout");
  expect(f.tick(3000)).toBe("ready");
});

it("only rejects privacy consent or skips onboarding; unknown dialogs block capture", () => {
  const f = fixture();
  const reject = f.element("同意しない"), accept = f.element("同意する"), skip = f.element("スキップして閉じる");
  const dialog = Object.assign(f.element("Cookie consent"), { querySelectorAll: () => [accept, reject] });
  f.dialogs.push(dialog);
  expect(f.tick()).toBe("dismissing dialog");
  expect(reject.click).toHaveBeenCalledOnce();
  expect(accept.click).not.toHaveBeenCalled();
  dialog.innerText = "目標の試験区分を選ぶ";
  dialog.querySelectorAll = () => [skip];
  expect(f.tick()).toBe("dismissing dialog");
  expect(skip.click).toHaveBeenCalledOnce();
  dialog.querySelectorAll = () => [accept];
  expect(f.tick(10000)).toBe("blocked by unknown dialog");
  expect(accept.click).not.toHaveBeenCalled();
});

it("captures the existing reminder UI without clicking its notification controls", () => {
  const f = fixture("reminder");
  expect(f.tick()).toBe("waiting for stable layout");
  expect(f.tick(2000)).toBe("ready");
  expect(f.target.click).not.toHaveBeenCalled();
  delete f.selectors['main[data-mobile-ready=true]'];
  expect(f.tick(3000)).toBe("waiting for screen");
});

it("keeps all launch parsing and automation inside the dedicated simulator compilation guard", () => {
  const helper = controller.slice(controller.indexOf("#if ASC_CAPTURE && DEBUG && targetEnvironment(simulator)\nprivate final class ASCCapture"), controller.indexOf("@objc(QualificationBridgePlugin)"));
  expect(helper).toContain('ProcessInfo.processInfo.arguments');
  expect(helper).toContain('UUID(uuidString: token)');
  expect(helper).toContain('static let routes = ["/", "/ap", "/review", "/account/dashboard", "reminder"]');
  expect(helper.trimEnd()).toMatch(/#endif$/);
  const gate = controller.slice(controller.indexOf("enum ASCCaptureGate"), controller.indexOf("private final class ASCCapture"));
  expect(gate).toContain("#else\n        return false\n        #endif");
  for (const forbidden of ['fetch(', 'XMLHttpRequest', 'setItem(', 'requestPermission', 'requestPermissions', '/api/', '/q/', '/quiz']) expect(script).not.toContain(forbidden);
});
