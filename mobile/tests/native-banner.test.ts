import { describe, expect, it, vi } from "vitest";
import { isBannerPage, loadFreeBanner, type NativeBannerBridge } from "../src/native-banner";

const free = { entitled: false, source: "free" } as const;
function fixture() {
  const bridge = {
    config: vi.fn<NativeBannerBridge["config"]>().mockResolvedValue({ enabled: true, privacyOptionsRequired: false }),
    prepareBanner: vi.fn<NativeBannerBridge["prepareBanner"]>().mockResolvedValue({ consent: true, tracking: "authorized" }),
    showBanner: vi.fn<NativeBannerBridge["showBanner"]>().mockResolvedValue(undefined),
    hideBanner: vi.fn<NativeBannerBridge["hideBanner"]>(),
    privacyOptions: vi.fn<NativeBannerBridge["privacyOptions"]>(),
  };
  return { bridge, verify: vi.fn().mockResolvedValue(true) };
}

describe("iOS banner requests", () => {
  it.each([null, { entitled: true, source: "web" }, { entitled: true, source: "app-store" }] as const)(
    "skips the ad bridge for unknown or paid access (%j)", async access => {
      const { bridge, verify } = fixture();
      await loadFreeBanner(bridge, access, "product", () => true, verify);
      expect(bridge.config).not.toHaveBeenCalled();
      expect(bridge.prepareBanner).not.toHaveBeenCalled();
      expect(bridge.showBanner).not.toHaveBeenCalled();
    },
  );

  it("skips consent and initialization when the build has no valid IDs", async () => {
    const { bridge, verify } = fixture();
    bridge.config.mockResolvedValue({ enabled: false, privacyOptionsRequired: false });
    await loadFreeBanner(bridge, free, "product", () => true, verify);
    expect(verify).not.toHaveBeenCalled();
    expect(bridge.prepareBanner).not.toHaveBeenCalled();
    expect(bridge.showBanner).not.toHaveBeenCalled();
  });

  it("stops when the fresh check cannot confirm free access", async () => {
    const { bridge, verify } = fixture();
    verify.mockResolvedValue(false);
    await loadFreeBanner(bridge, free, "product", () => true, verify);
    expect(bridge.prepareBanner).not.toHaveBeenCalled();
    expect(bridge.showBanner).not.toHaveBeenCalled();
  });

  it.each([
    [true, "authorized", "personalized"],
    [true, "denied", "nonPersonalized"],
    [true, "restricted", undefined],
    [true, "notDetermined", undefined],
    [false, "denied", undefined],
    [false, "authorized", undefined],
  ] as const)("applies UMP and ATT together (%s, %s)", async (consent, tracking, mode) => {
    const { bridge, verify } = fixture();
    bridge.prepareBanner.mockResolvedValue({ consent, tracking });
    await loadFreeBanner(bridge, free, "product", () => true, verify);
    if (mode) expect(bridge.showBanner).toHaveBeenCalledExactlyOnceWith({ mode });
    else expect(bridge.showBanner).not.toHaveBeenCalled();
  });

  it("does not start ads when a purchase or route change invalidates the pending privacy check", async () => {
    const { bridge, verify } = fixture();
    let active = true;
    bridge.prepareBanner.mockImplementation(async () => {
      active = false;
      return { consent: true, tracking: "authorized" };
    });
    await loadFreeBanner(bridge, free, "product", () => active, verify);
    expect(bridge.showBanner).not.toHaveBeenCalled();
  });

  it("keeps exercise, account, payment, and help routes free of banners", () => {
    for (const path of ["/", "/ap", "/blog/article", "/qualifications/takken", "/e-learning/exams/qualifications/takken"]) {
      expect(isBannerPage(path), path).toBe(true);
    }
    for (const path of ["/quiz", "/q/ap/2020-spring/am/q1", "/ap/2020-spring", "/review", "/billing", "/account", "/privacy", "/contact"]) {
      expect(isBannerPage(path), path).toBe(false);
    }
  });
});
