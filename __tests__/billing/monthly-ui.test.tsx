// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { PurchaseStatus } from "@/app/billing/PurchaseStatus";
import { CheckoutButton } from "@/app/billing/CheckoutButton";
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
describe("monthly purchase copy and status", () => {
  it("explicitly asks for consent to monthly renewal and period-end cancellation", () => {
    render(<CheckoutButton recurring amount={980} terms={"a".repeat(64)} enabled={false} />);
    expect(screen.getByText("対象の演習、税込月額、毎月の自動更新、期間末解約、返金条件を確認しました。")).toBeTruthy();
    expect(screen.getByRole("button").textContent).toContain("月額980円");
  });
  it("shows period-end cancellation and management without claiming no auto-renewal", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => Response.json({ billingModel: "subscription", entitled: true, canManage: true,
      subscription: { status: "active", cancelAtPeriodEnd: true, periodEnd: "2026-02-28T00:00:00Z" },
      purchase: { id: "fixture", status: "paid", expiresAt: "2026-02-28T00:00:00Z" } })));
    render(<PurchaseStatus order="fixture" />);
    await waitFor(() => expect(screen.getByText("期間末の解約を予約しています。次回の自動更新は停止します。")).toBeTruthy());
    expect(screen.queryByText(/自動更新はありません/)).toBeNull(); expect(screen.getByRole("button", { name: "契約管理・解約・支払方法の変更" })).toBeTruthy();
  });
});
