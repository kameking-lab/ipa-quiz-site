import { beforeEach, expect, it, vi } from "vitest";

const bridge = vi.hoisted(() => ({
  getPlatform: vi.fn(),
  isPluginAvailable: vi.fn(),
  requestReview: vi.fn(),
}));
vi.mock("@capacitor/core", () => ({
  Capacitor: bridge,
  registerPlugin: () => ({ requestReview: bridge.requestReview }),
}));

import { rememberStudyReviewPurchase, requestStudyReview } from "@/mobile/src/study-review";

beforeEach(() => {
  sessionStorage.clear();
  vi.resetAllMocks();
  bridge.getPlatform.mockReturnValue("ios");
  bridge.isPluginAvailable.mockReturnValue(true);
});

it("leaves web and older iOS builds without a review prompt", async () => {
  bridge.getPlatform.mockReturnValueOnce("web");
  expect(await requestStudyReview()).toBe(false);
  bridge.isPluginAvailable.mockReturnValueOnce(false);
  expect(await requestStudyReview()).toBe(false);
  expect(bridge.requestReview).not.toHaveBeenCalled();
});

it("treats the native guard's decision as authoritative", async () => {
  bridge.requestReview.mockResolvedValueOnce({ requested: true }).mockResolvedValueOnce({ requested: false });
  expect(await requestStudyReview()).toBe(true);
  expect(await requestStudyReview()).toBe(false);
});

it("suppresses review requests immediately following a purchase", async () => {
  rememberStudyReviewPurchase();
  expect(await requestStudyReview()).toBe(false);
  expect(bridge.requestReview).not.toHaveBeenCalled();
});
