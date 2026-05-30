import { afterEach, describe, expect, it, vi } from "vitest";

import type { PostHog } from "posthog-js";

import {
  getPostHogClient,
  posthogCapture,
  setPostHogClient,
} from "@/lib/posthog";

// Characterization tests for the lightweight PostHog wrapper consumed by 10+
// client components (ContactForm / CopilotPanel / ViewTracker / FaqItem ...).
// The load-bearing contract is fail-soft analytics: posthogCapture must NEVER
// throw — neither when the client is uninitialised (key unset / SSR) nor when
// the underlying client.capture() itself throws. Breaking this would let an
// analytics hiccup take down the surrounding UI.

// A minimal fake PostHog client: only capture() is exercised by the wrapper.
function fakeClient(
  capture: (name: string, props?: unknown) => void,
): PostHog {
  return { capture } as unknown as PostHog;
}

afterEach(() => {
  // Reset the module-level singleton so tests don't leak the injected client.
  setPostHogClient(null);
  vi.restoreAllMocks();
});

describe("setPostHogClient / getPostHogClient", () => {
  it("round-trips the injected client", () => {
    const client = fakeClient(() => {});
    setPostHogClient(client);
    expect(getPostHogClient()).toBe(client);
  });

  it("resets to null", () => {
    setPostHogClient(fakeClient(() => {}));
    setPostHogClient(null);
    expect(getPostHogClient()).toBeNull();
  });
});

describe("posthogCapture (fail-soft contract)", () => {
  it("is a silent no-op when no client is initialised", () => {
    // client is null (afterEach reset). Must not throw and must not call out.
    expect(() => posthogCapture("page_view")).not.toThrow();
  });

  it("forwards the event name and props verbatim to client.capture", () => {
    const capture = vi.fn();
    setPostHogClient(fakeClient(capture));

    posthogCapture("question_answered", { exam: "ap", correct: true });

    expect(capture).toHaveBeenCalledTimes(1);
    expect(capture).toHaveBeenCalledWith("question_answered", {
      exam: "ap",
      correct: true,
    });
  });

  it("passes undefined props through when omitted", () => {
    const capture = vi.fn();
    setPostHogClient(fakeClient(capture));

    posthogCapture("quiz_started");

    expect(capture).toHaveBeenCalledWith("quiz_started", undefined);
  });

  it("swallows a throwing client.capture — analytics never breaks the UI", () => {
    setPostHogClient(
      fakeClient(() => {
        throw new Error("posthog exploded");
      }),
    );

    expect(() => posthogCapture("feedback_submitted")).not.toThrow();
  });
});

// Env-gated module-load constants: evaluated at import time, so we stub the
// env and re-import a fresh module instance (same idiom as current-year).
async function loadWithEnv(env: Record<string, string | undefined>) {
  vi.resetModules();
  for (const [key, value] of Object.entries(env)) {
    // Pass undefined to genuinely delete the var — the code falls back via `??`,
    // which only triggers on null/undefined, not on an empty string.
    vi.stubEnv(key, value);
  }
  const mod = await import("@/lib/posthog");
  vi.unstubAllEnvs();
  return mod;
}

describe("isPostHogConfigured / POSTHOG_CONFIG", () => {
  it("is configured only when NEXT_PUBLIC_POSTHOG_KEY is present", async () => {
    const on = await loadWithEnv({ NEXT_PUBLIC_POSTHOG_KEY: "phc_test_key" });
    expect(on.isPostHogConfigured).toBe(true);
    expect(on.POSTHOG_CONFIG.key).toBe("phc_test_key");

    const off = await loadWithEnv({ NEXT_PUBLIC_POSTHOG_KEY: undefined });
    expect(off.isPostHogConfigured).toBe(false);
  });

  it("falls back to the US cloud host when NEXT_PUBLIC_POSTHOG_HOST is unset", async () => {
    const mod = await loadWithEnv({
      NEXT_PUBLIC_POSTHOG_KEY: "phc_test_key",
      NEXT_PUBLIC_POSTHOG_HOST: undefined,
    });
    expect(mod.POSTHOG_CONFIG.host).toBe("https://us.i.posthog.com");
  });

  it("uses the configured host when provided", async () => {
    const mod = await loadWithEnv({
      NEXT_PUBLIC_POSTHOG_KEY: "phc_test_key",
      NEXT_PUBLIC_POSTHOG_HOST: "https://eu.i.posthog.com",
    });
    expect(mod.POSTHOG_CONFIG.host).toBe("https://eu.i.posthog.com");
  });
});
