// @vitest-environment node
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { describe, expect, it, vi } from "vitest";

const origin = "https://pwa.test";
const source = readFileSync("lib/pwa/sw.js", "utf8");

function worker(version = "build-2") {
  const listeners: Record<string, (event: unknown) => void> = {};
  const stores = new Map<string, Map<string, Response>>();
  const url = (request: Request | string) => new URL(typeof request === "string" ? request : request.url, origin).href;
  const caches = {
    keys: async () => [...stores.keys()],
    delete: vi.fn(async (name: string) => stores.delete(name)),
    open: async (name: string) => {
      if (!stores.has(name)) stores.set(name, new Map());
      const entries = stores.get(name)!;
      return {
        keys: async () => [...entries.keys()].map(key => new Request(key)),
        match: async (request: Request | string) => entries.get(url(request))?.clone(),
        put: async (request: Request | string, response: Response) => { entries.set(url(request), response.clone()); },
        delete: async (request: Request | string) => entries.delete(url(request)),
      };
    },
  };
  const fetch = vi.fn(async () => new Response("new HTML"));
  const self = {
    addEventListener: (name: string, listener: (event: unknown) => void) => { listeners[name] = listener; },
    skipWaiting: vi.fn(), location: { origin }, clients: { claim: vi.fn() },
  };
  runInNewContext(source.replace("__PWA_BUILD_ID__", version), { self, caches, fetch, Response, URL });
  async function lifecycle(name: string) {
    const waits: Promise<unknown>[] = [];
    listeners[name]({ waitUntil: (promise: Promise<unknown>) => waits.push(promise) });
    await Promise.all(waits);
  }
  async function request(path: string, mode = "navigate", headers?: HeadersInit) {
    const waits: Promise<unknown>[] = [];
    let result: Promise<Response> | undefined;
    listeners.fetch({
      request: { url: `${origin}${path}`, method: "GET", mode, headers: new Headers(headers) },
      waitUntil: (promise: Promise<unknown>) => waits.push(promise),
      respondWith: (response: Promise<Response>) => { result = response; },
    });
    const response = await result;
    await Promise.all(waits);
    return response;
  }
  return { caches, stores, fetch, self, listeners, lifecycle, request };
}

describe("build-versioned service worker", () => {
  it("installs immediately and migrates visited pages/chunks before deleting only its own old caches", async () => {
    const w = worker();
    for (const [cache, path] of [["content", "/q/ip/visited"], ["static", "/_next/static/old.js"], ["pages", "/old-page"]]) {
      await (await w.caches.open(`ipa-quiz-${cache}-legacy`)).put(path, new Response("visited"));
    }
    await w.caches.open("another-app");
    await w.lifecycle("install");
    expect(w.self.skipWaiting).toHaveBeenCalledOnce();
    await w.lifecycle("activate");
    expect(w.self.clients.claim).toHaveBeenCalledOnce();
    expect(await w.caches.keys()).toEqual(expect.arrayContaining(["another-app", "ipa-quiz-content-build-2"]));
    expect((await w.caches.keys()).some(name => name.endsWith("legacy"))).toBe(false);
    w.fetch.mockRejectedValue(new Error("offline"));
    expect(await (await w.request("/q/ip/visited"))?.text()).toBe("visited");
    expect(await (await w.request("/_next/static/old.js", "cors"))?.text()).toBe("visited");
    expect(await (await w.request("/not-visited"))?.text()).toBe("new HTML"); // /offline
  });

  it.each(["/", "/q/ip/one", "/essays/ap/one", "/blog/article", "/q/ip/one?_rsc=v2"])("revalidates %s online and uses its saved response offline", async path => {
    const w = worker();
    const mode = path.includes("_rsc") ? "cors" : "navigate";
    expect(await (await w.request(path, mode))?.text()).toBe("new HTML");
    w.fetch.mockResolvedValue(new Response("new deployment"));
    expect(await (await w.request(path, mode))?.text()).toBe("new deployment");
    expect(w.fetch).toHaveBeenLastCalledWith(expect.anything(), { cache: "no-cache" });
    w.fetch.mockRejectedValue(new Error("offline"));
    expect(await (await w.request(path, mode))?.text()).toBe("new deployment");
  });

  it("keeps HTTP errors online, never substitutes an offline HTML shell for RSC and bypasses API/SW", async () => {
    const w = worker();
    w.fetch.mockResolvedValue(new Response("unavailable", { status: 503 }));
    expect((await w.request("/"))?.status).toBe(503);
    w.fetch.mockRejectedValue(new Error("offline"));
    expect((await w.request("/q/ip/one?_rsc=new", "cors"))?.type).toBe("error");
    expect(await w.request("/api/auth/session")).toBeUndefined();
    expect(await w.request("/sw.js")).toBeUndefined();
    expect(await w.request("/manifest.webmanifest")).toBeUndefined();
  });

  it("does not lose a successful network response when storage is full", async () => {
    const w = worker();
    vi.spyOn(w.caches, "open").mockRejectedValue(new Error("quota"));
    expect(await (await w.request("/"))?.text()).toBe("new HTML");
  });

  it("answers with the build version, stable across worker restarts", () => {
    const reply = vi.fn();
    worker().listeners.message({ data: { type: "GET_VERSION" }, ports: [{ postMessage: reply }] });
    expect(reply).toHaveBeenCalledWith({ version: "build-2" });
    worker("build-3").listeners.message({ data: { type: "GET_VERSION" }, ports: [{ postMessage: reply }] });
    expect(reply).toHaveBeenLastCalledWith({ version: "build-3" });
  });
});
