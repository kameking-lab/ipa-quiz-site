import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { CONVERSION_METRICS } from "@/lib/billing/conversion-contract";
const read = vi.hoisted(() => vi.fn());
vi.mock("@/lib/billing/conversion", () => ({ readConversions: read }));
import ConversionPage from "@/app/admin/conversion/page";
afterEach(cleanup);
it("shows daily values, channel separation and mixed-unit ratios without hiding values above 100%", async () => {
  const counts = { ...Object.fromEntries(CONVERSION_METRICS.map(m => [m, 0])), guest_answered: 10, guest_limited: 2, offer_viewed: 3, plan_clicked: 1, checkout_created: 1, payment_completed: 1 };
  read.mockResolvedValue({ available: true, rows: [
    { day: "2026-11-17", channel: "web", counts, measured: true },
    { day: "2026-11-17", channel: "ios", counts, measured: false },
  ] });
  render(await ConversionPage());
  expect(read).toHaveBeenCalledWith(14);
  const web = screen.getByRole("table", { name: "Webの日別件数と段階ごとの割合" });
  expect(within(web).getByText("20.0%")).toBeInTheDocument(); expect(within(web).getByText("150.0%")).toBeInTheDocument();
  expect(screen.getByText(/同じ人の追跡ではありません/)).toBeInTheDocument();
  expect(screen.getByText(/App Store決済は⑥⑦に含みません/)).toBeInTheDocument();
});
it("reports KV outage instead of presenting invented zero counts", async () => {
  read.mockResolvedValue({ available: false, rows: [] });
  render(await ConversionPage());
  expect(screen.getByRole("status")).toHaveTextContent("集計を取得できません");
  expect(screen.queryByRole("table")).not.toBeInTheDocument();
});
