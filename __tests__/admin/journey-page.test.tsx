import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
const mocks = vi.hoisted(() => ({ journey: vi.fn(), funnel: vi.fn() }));
vi.mock("@/lib/billing/journey", () => ({ readJourney: mocks.journey }));
vi.mock("@/lib/billing/funnel", () => ({ readFunnel: mocks.funnel }));
import JourneyPage from "@/app/admin/funnel/journey/page";
beforeEach(() => { mocks.funnel.mockResolvedValue({ available: true, days: [{ counts: { checkout_completed: 3 } }] }); });
afterEach(cleanup);
describe("owner journey view", () => {
  it("shows purchase and unconfirmed averages with explicit session units", async () => {
    mocks.journey.mockResolvedValue({ available: true, consistent: true, rows: [
      { day: "2026-11-11", qualification: "ap", outcome: "purchased", page: "billing_success", offer: "question", stage: "purchased", sessions: 2, answers: 15 },
      { day: "2026-11-11", qualification: "ap", outcome: "unconfirmed", page: "quiz", offer: "quiz", stage: "offer", sessions: 3, answers: 27 },
    ] });
    render(await JourneyPage({ searchParams: Promise.resolve({ days: "7" }) }));
    expect(screen.getByText("7.5")).toBeInTheDocument(); expect(screen.getByText("9.0")).toBeInTheDocument();
    expect(screen.getByText("個別問題")).toBeInTheDocument();
    expect(screen.getByText(/既契約者/)).toBeInTheDocument();
    expect(mocks.journey).toHaveBeenLastCalledWith(7);
  });
  it.each([
    [{ available: false, consistent: true, rows: [] }, "KV集計を取得できません。未設定または通信失敗です。"],
    [{ available: true, consistent: false, rows: [] }, "集計の差分が整合していません。通信欠落の可能性があるため平均・内訳を表示していません。"],
    [{ available: true, consistent: true, rows: [] }, "この期間の新しい計測データはまだありません。"],
  ])("distinguishes missing data and inconsistent counters", async (data, label) => {
    mocks.journey.mockResolvedValue(data);
    render(await JourneyPage({ searchParams: Promise.resolve({ days: "999" }) }));
    expect(screen.getByText(label)).toBeInTheDocument(); expect(mocks.journey).toHaveBeenLastCalledWith(14);
  });
});
