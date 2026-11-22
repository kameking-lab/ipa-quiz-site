import { afterEach, expect, it, vi } from "vitest";
import { track } from "@vercel/analytics";
import { trackDailyFunnel } from "@/lib/analytics/daily-funnel-client";

vi.mock("@vercel/analytics", () => ({ track: vi.fn() }));
afterEach(() => { vi.useRealTimers(); localStorage.clear(); vi.clearAllMocks(); });

it("sends each milestone once per JST day with no event properties", async () => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-11-22T14:59:59Z"));
  await Promise.all([trackDailyFunnel("first_answer"), trackDailyFunnel("first_answer"), trackDailyFunnel("monthly_offer_viewed")]);
  expect(track).toHaveBeenCalledTimes(2);
  expect(track).toHaveBeenNthCalledWith(1, "first_answer");
  expect(track).toHaveBeenNthCalledWith(2, "monthly_offer_viewed");
  vi.setSystemTime(new Date("2026-11-22T15:00:00Z"));
  await trackDailyFunnel("first_answer");
  expect(track).toHaveBeenCalledTimes(3);
});
