import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { currentReferral, markReferralVisit, referralProps, isTsuginoReferral } from "@/lib/analytics/referral";
import type { PostHog } from "posthog-js";

beforeEach(() => {
  localStorage.clear(); sessionStorage.clear();
  window.history.replaceState({}, "", "/fp3?utm_source=tsugino_shikaku&utm_medium=referral&utm_campaign=kakomon_crosslink&utm_content=fp3.hero.fp3&email=private@example.invalid");
});
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe("referral attribution", () => {
  it("keeps all campaign dimensions across practice, sign-in and billing, omitting arbitrary queries", () => {
    const landing = currentReferral();
    markReferralVisit();
    expect(landing).toMatchObject({ first_visit: true, utm_source: "tsugino_shikaku", utm_content: "fp3.hero.fp3", landing_path: "/fp3" });
    for (const path of ["/quiz?mode=year&exam=fp3", "/auth/signin?callbackUrl=%2Fbilling", "/billing"]) {
      history.replaceState({}, "", path);
      expect(currentReferral()).toEqual(landing);
    }
    expect(JSON.stringify(referralProps())).not.toContain("private@example.invalid");
    expect(isTsuginoReferral(landing)).toBe(true);
  });

  it("replaces an explicit campaign, expires attribution after 24 hours and treats direct traffic as direct", () => {
    const first = currentReferral();
    markReferralVisit();
    history.replaceState({}, "", "/sc?utm_source=note&utm_content=new");
    const next = currentReferral();
    expect(next?.referral_id).not.toBe(first?.referral_id);
    expect(next).toMatchObject({ utm_source: "note", first_visit: false });
    expect(isTsuginoReferral(next)).toBe(false);
    history.replaceState({}, "", "/billing");
    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 24 * 60 * 60 * 1000 + 1);
    expect(currentReferral()).toBeNull();
    sessionStorage.clear(); expect(currentReferral()).toBeNull();
  });

  it("captures year, session and category without storing a callback URL", () => {
    history.replaceState({}, "", "/quiz?mode=year&exam=ap&year=2025&session=am&category=network&utm_source=tsugino&callbackUrl=secret");
    expect(currentReferral()?.landing_scope).toBe("exam=ap&year=2025&session=am&category=network");
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
    expect(() => markReferralVisit()).not.toThrow();
    expect(currentReferral()).toBeNull();
  });

  it("buffers early events with campaign snapshots, flushes landing first and deduplicates after reload", async () => {
    vi.resetModules(); vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "test-only");
    const ph = await import("@/lib/posthog");
    ph.posthogCapture("quiz_started", { exam: "fp3" });
    history.replaceState({}, "", "/billing");
    ph.posthogCapture("practice_free_limit_reached", { reset_at: "day1" });
    const capture = vi.fn();
    ph.setPostHogClient({ capture } as unknown as PostHog);
    expect(capture.mock.calls.map(call => call[0])).toEqual(["referral_landed", "quiz_started", "practice_free_limit_reached"]);
    expect(capture.mock.calls.every(call => call[1].utm_content === "fp3.hero.fp3")).toBe(true);
    ph.posthogCapture("practice_free_limit_reached", { reset_at: "day1" });
    expect(capture).toHaveBeenCalledTimes(3);
    vi.resetModules();
    const reload = await import("@/lib/posthog");
    reload.setPostHogClient({ capture } as unknown as PostHog);
    reload.posthogCapture("checkout_started", { test_mode: true });
    expect(capture.mock.calls.filter(call => call[0] === "referral_landed")).toHaveLength(1);
    expect(capture.mock.calls.at(-1)?.[1]).toMatchObject({ utm_source: "tsugino_shikaku", test_mode: true });
    ph.setPostHogClient(null); reload.setPostHogClient(null);
  });

  it("does not persist sent markers before SDK initialization, allowing a reload to recover landing and milestones", async () => {
    vi.resetModules(); vi.stubEnv("NEXT_PUBLIC_POSTHOG_KEY", "test-only");
    const beforeReload = await import("@/lib/posthog");
    beforeReload.posthogCapture("quiz_started");
    beforeReload.posthogCapture("practice_free_limit_reached", { reset_at: "day1" });
    beforeReload.posthogCapture("checkout_completed", { test_mode: true });
    vi.resetModules();
    const afterReload = await import("@/lib/posthog");
    const capture = vi.fn();
    afterReload.setPostHogClient({ capture } as unknown as PostHog);
    afterReload.posthogCapture("page_view");
    afterReload.posthogCapture("practice_free_limit_reached", { reset_at: "day1" });
    afterReload.posthogCapture("checkout_completed", { test_mode: true });
    expect(capture.mock.calls.map(call => call[0])).toEqual(["referral_landed", "page_view", "practice_free_limit_reached", "checkout_completed"]);
    afterReload.setPostHogClient(null);
  });
});
