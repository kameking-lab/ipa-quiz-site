// @vitest-environment node
import { afterEach, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

it("loads the actual patched Sentry SDK and existing instrumentation without starting a client", async () => {
  vi.stubEnv("SENTRY_DSN", "");
  vi.stubEnv("NEXT_PUBLIC_SENTRY_DSN", "");
  vi.stubEnv("NEXT_RUNTIME", "nodejs");
  vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("No Sentry service access in tests")));
  const sdk = await import("@sentry/nextjs");
  const instrumentation = await import("@/instrumentation");
  await instrumentation.register();

  expect(typeof sdk.init).toBe("function");
  expect(typeof sdk.withSentryConfig).toBe("function");
  expect(instrumentation.captureRequestError).toBe(sdk.captureRequestError);
  expect(sdk.getClient()).toBeUndefined();
  expect(fetch).not.toHaveBeenCalled();
}, 30_000);
