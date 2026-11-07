// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { PurchaseStatus } from "@/app/billing/PurchaseStatus";
import { AutoCheckout } from "@/app/billing/start/AutoCheckout";
import { readQuizReturn } from "@/lib/billing/quiz-return";
afterEach(() => { cleanup(); vi.unstubAllGlobals(); sessionStorage.clear(); });
describe("monthly purchase copy and status", () => {
  it("opens Stripe Checkout once, without another tap, and remembers the question to return to", async () => {
    const fetchMock = vi.fn(async () => Response.json({ url: "https://checkout.stripe.com/c/pay/cs_test_fixture", orderId: "order-1" }));
    vi.stubGlobal("fetch", fetchMock);
    const replace = vi.fn();
    vi.stubGlobal("location", { ...window.location, replace });
    const view = render(<AutoCheckout terms={"a".repeat(64)} returnTo="/q/ap/2023-spring/am/1" fallback="/billing" />);
    view.rerender(<AutoCheckout terms={"a".repeat(64)} returnTo="/q/ap/2023-spring/am/1" fallback="/billing" />);
    await waitFor(() => expect(replace).toHaveBeenCalledWith("https://checkout.stripe.com/c/pay/cs_test_fixture"));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/billing/checkout", expect.objectContaining({ method: "POST", body: JSON.stringify({ terms: "a".repeat(64) }) }));
    expect(readQuizReturn(sessionStorage, Date.now(), "order-1")).toBe("/q/ap/2023-spring/am/1");
    expect(readQuizReturn(sessionStorage)).toBe("/q/ap/2023-spring/am/1");
  });
  it("shows one short error and a way to the plan page when checkout cannot open", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => Response.json({ error: "subscription_exists" }, { status: 409 })));
    render(<AutoCheckout terms={"a".repeat(64)} returnTo={null} fallback="/billing" />);
    expect(await screen.findByRole("alert")).toHaveTextContent("契約済みか、支払確認中の申込があります。");
    expect(screen.getByRole("link", { name: "料金・契約の画面へ" })).toHaveAttribute("href", "/billing");
  });
  it("shows period-end cancellation and management without claiming no auto-renewal", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => Response.json({ billingModel: "subscription", entitled: true, canManage: true,
      subscription: { status: "active", cancelAtPeriodEnd: true, periodEnd: "2026-02-28T00:00:00Z" },
      purchase: { id: "fixture", status: "paid", expiresAt: "2026-02-28T00:00:00Z" } })));
    render(<PurchaseStatus order="fixture" />);
    await waitFor(() => expect(screen.getByText("期間末の解約予約済みです。次回の自動更新は停止します。")).toBeTruthy());
    fireEvent.click(screen.getByText("注文・契約の詳細"));
    expect(screen.queryByText(/自動更新はありません/)).toBeNull();
    expect(screen.getByRole("button", { name: "契約管理・解約・支払方法の変更" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "購入が完了しました" })).toBeTruthy();
  });
});
