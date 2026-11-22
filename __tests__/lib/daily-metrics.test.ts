import { describe, expect, it, vi } from "vitest";
import { readDailyMetrics } from "@/lib/admin/metrics/daily";
import { readConversions } from "@/lib/billing/conversion";
import { readFunnel } from "@/lib/billing/funnel";
import { fetchFunnelData } from "@/lib/admin/funnel/posthog";
import { fetchMetrics } from "@/lib/admin/metrics/posthog";

vi.mock("@/lib/billing/conversion", () => ({ readConversions: vi.fn() }));
vi.mock("@/lib/billing/funnel", () => ({ readFunnel: vi.fn() }));
vi.mock("@/lib/admin/funnel/posthog", () => ({ fetchFunnelData: vi.fn() }));
vi.mock("@/lib/admin/metrics/posthog", () => ({ fetchMetrics: vi.fn() }));

describe("daily metrics", () => {
  it("reads the previous JST day and logs totals without per-qualification or user identifiers", async () => {
    vi.mocked(readConversions).mockResolvedValue({ available: false, rows: [] });
    vi.mocked(readFunnel).mockRejectedValue(new Error("unavailable"));
    vi.mocked(fetchFunnelData).mockResolvedValue({ configured: true, range_days: 1, funnels: [],
      cachedAt: "2026-11-22T00:00:00Z", event_counts: { question_answered: 5 } });
    vi.mocked(fetchMetrics).mockImplementation(async meta => ({
      meta, source: "kv", generatedAt: "2026-11-22T00:00:00Z",
      activity: { available: true, rows: [
        { day: "2026-11-21", page: "quiz", qualification: "fe", event: "question_answered", count: 2 },
        { day: "2026-11-21", page: "quiz", qualification: "ap", event: "question_answered", count: 3 },
      ] },
    }));
    const now = Date.parse("2026-11-21T15:01:00Z");
    const metrics = await readDailyMetrics(now);
    expect(readConversions).toHaveBeenCalledWith(1, now - 86_400_000);
    expect(fetchFunnelData).toHaveBeenCalledWith(1, new Date("2026-11-20T15:00:00Z"));
    expect(metrics).toMatchObject({ date: "2026-11-21", conversion: null, billing: null,
      posthog: { question_answered: 5 }, activity: { question_answered: 5 } });
    expect(JSON.stringify(metrics)).not.toContain('"qualification"');
  });
});
