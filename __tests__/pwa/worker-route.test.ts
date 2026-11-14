// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";
import { GET } from "@/app/sw.js/route";

afterEach(() => vi.unstubAllEnvs());

it("serves a stable worker per build at the legacy URL with revalidation headers", async () => {
  vi.stubEnv("NEXT_PUBLIC_PWA_BUILD_ID", "deployment-a");
  const first = await GET();
  const source = await first.text();
  expect(first.headers.get("cache-control")).toBe("no-cache, max-age=0, must-revalidate");
  expect(first.headers.get("service-worker-allowed")).toBe("/");
  expect(first.headers.get("content-type")).toContain("application/javascript");
  expect(source).toContain("const CACHE_VERSION = 'deployment-a'");
  expect(source).not.toContain("__PWA_BUILD_ID__");
  expect(await (await GET()).text()).toBe(source);
  vi.stubEnv("NEXT_PUBLIC_PWA_BUILD_ID", "deployment-b");
  expect(await (await GET()).text()).toContain("const CACHE_VERSION = 'deployment-b'");
});
