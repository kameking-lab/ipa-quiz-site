import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { canReloadForUpdate, startPwaUpdates } from "@/lib/pwa/updates";

let version: string;
let sw: EventTarget & { controller: unknown; register: ReturnType<typeof vi.fn>; getRegistrations: ReturnType<typeof vi.fn> };
let update: ReturnType<typeof vi.fn>;
let dispose: (() => void) | undefined;
const reload = vi.fn();
const tick = async () => { await Promise.resolve(); await Promise.resolve(); await Promise.resolve(); };

beforeEach(() => {
  vi.useFakeTimers();
  version = "build-1";
  reload.mockClear();
  sessionStorage.clear();
  window.history.replaceState({}, "", "/");
  document.body.innerHTML = "";
  Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
  Object.defineProperty(navigator, "onLine", { configurable: true, value: true });
  update = vi.fn(async () => {});
  sw = Object.assign(new EventTarget(), {
    controller: { postMessage: (_message: unknown, ports: { onmessage?: (event: unknown) => void }[]) => {
      ports[0].onmessage?.({ data: { version } });
    } },
    register: vi.fn(async () => ({ update })),
    getRegistrations: vi.fn(async () => []),
  });
  Object.defineProperty(navigator, "serviceWorker", { configurable: true, value: sw });
  vi.stubGlobal("MessageChannel", class {
    port1 = { onmessage: undefined, close: vi.fn() };
    port2 = this.port1;
  });
});
afterEach(() => {
  dispose?.();
  dispose = undefined;
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});
function start(native = false) {
  dispose = startPwaUpdates({ buildId: "build-1", native, reload });
}

describe("foreground PWA updates", () => {
  it("revalidates the original script at startup, foreground and reconnect; cleans listeners", async () => {
    start();
    await tick();
    expect(sw.register).toHaveBeenCalledWith("/sw.js", { scope: "/", updateViaCache: "none" });
    expect(update).toHaveBeenCalledTimes(1);
    document.dispatchEvent(new Event("visibilitychange"));
    await tick();
    expect(update).toHaveBeenCalledTimes(2);
    window.dispatchEvent(new Event("online"));
    await tick();
    expect(update).toHaveBeenCalledTimes(3);
    dispose?.();
    document.dispatchEvent(new Event("visibilitychange"));
    expect(update).toHaveBeenCalledTimes(3);
    expect(reload).not.toHaveBeenCalled();
  });

  it("reloads once for a different controlling build and guards across document mounts", async () => {
    start();
    await tick();
    version = "build-2";
    sw.dispatchEvent(new Event("controllerchange"));
    sw.dispatchEvent(new Event("controllerchange"));
    expect(reload).toHaveBeenCalledOnce();
    dispose?.();
    start();
    await tick();
    expect(reload).toHaveBeenCalledOnce();
    version = "build-3";
    sw.dispatchEvent(new Event("controllerchange"));
    expect(reload).toHaveBeenCalledTimes(2);
  });

  it.each(["/quiz", "/q/ip/2024/am/q1", "/essays/ap/2024/pm/q1", "/essay/ap/one", "/mock-exam", "/e-learning/exams/paper", "/contact"])("protects %s until return home", async path => {
    window.history.replaceState({}, "", path);
    start();
    await tick();
    version = "build-2";
    sw.dispatchEvent(new Event("controllerchange"));
    vi.advanceTimersByTime(2000);
    expect(reload).not.toHaveBeenCalled();
    window.history.replaceState({}, "", "/");
    vi.advanceTimersByTime(1000);
    expect(reload).toHaveBeenCalledOnce();
  });

  it("preserves input after blur and defers offline/hidden updates", async () => {
    start();
    await tick();
    document.body.innerHTML = '<input value="my answer">';
    const input = document.querySelector("input")!;
    input.focus();
    version = "build-2";
    sw.dispatchEvent(new Event("controllerchange"));
    expect(reload).not.toHaveBeenCalled();
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.blur();
    vi.advanceTimersByTime(1000);
    expect(reload).not.toHaveBeenCalled();
    expect(input.value).toBe("my answer");
    expect(canReloadForUpdate("/", false, document)).toBe(true);
  });

  it("waits until online and visible before reloading", async () => {
    start();
    await tick();
    Object.defineProperty(navigator, "onLine", { configurable: true, value: false });
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
    version = "build-2";
    sw.dispatchEvent(new Event("controllerchange"));
    expect(reload).not.toHaveBeenCalled();
    Object.defineProperty(navigator, "onLine", { configurable: true, value: true });
    window.dispatchEvent(new Event("online"));
    expect(reload).not.toHaveBeenCalled();
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
    document.dispatchEvent(new Event("visibilitychange"));
    expect(reload).toHaveBeenCalledOnce();
  });

  it("unregisters the native web worker and clears only PWA caches before safe reload", async () => {
    const unregister = vi.fn(async () => true);
    sw.getRegistrations.mockResolvedValue([{ unregister }]);
    const remove = vi.fn(async () => true);
    vi.stubGlobal("caches", { keys: async () => ["ipa-quiz-pages-old", "native-signed-study"], delete: remove });
    start(true);
    for (let i = 0; i < 10; i++) await tick();
    expect(sw.register).not.toHaveBeenCalled();
    expect(unregister).toHaveBeenCalledOnce();
    expect(remove).toHaveBeenCalledExactlyOnceWith("ipa-quiz-pages-old");
    expect(reload).toHaveBeenCalledOnce();
  });

  it("catches offline update errors and retries later", async () => {
    update.mockRejectedValue(new Error("offline"));
    start();
    await tick();
    document.dispatchEvent(new Event("visibilitychange"));
    await tick();
    expect(update).toHaveBeenCalledTimes(2);
  });
});
