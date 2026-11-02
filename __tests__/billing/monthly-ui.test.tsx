// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { PurchaseStatus } from "@/app/billing/PurchaseStatus";
import { CheckoutButton } from "@/app/billing/CheckoutButton";
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
describe("monthly purchase copy and status", () => {
  it("keeps explicit consent and price next to the disabled purchase action", () => {
    const fetchMock = vi.fn(); vi.stubGlobal("fetch", fetchMock);
    render(<CheckoutButton recurring amount={980} terms={"a".repeat(64)} enabled={false} testMode={false} />);
    expect(screen.getByText("対象の演習と料金・毎月更新・解約・返金条件に同意して進みます。")).toBeTruthy();
    expect(screen.getByText("次の画面で月額980円（税込）の支払いを確定します。確定前に戻れます。")).toBeTruthy();
    const button = screen.getByRole("button", { name: "同意して決済へ進む" }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.getAttribute("aria-describedby")).toBe("purchase-consent checkout-next");
    fireEvent.click(button); expect(fetchMock).not.toHaveBeenCalled();
  });
  it("requires the explicit consent action and suppresses duplicate submission before response", async () => {
    let settle: ((response: Response) => void) | undefined;
    const fetchMock = vi.fn(() => new Promise<Response>(resolve => { settle = resolve; }));
    vi.stubGlobal("fetch", fetchMock);
    render(<CheckoutButton recurring amount={980} terms={"a".repeat(64)} enabled testMode={false} />);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByRole("checkbox")).toBeNull();
    const button = screen.getByRole("button", { name: "同意して決済へ進む" }) as HTMLButtonElement;
    fireEvent.click(button); fireEvent.click(button);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("/api/billing/checkout", expect.objectContaining({ method: "POST", body: JSON.stringify({ terms: "a".repeat(64) }) }));
    expect(button.disabled).toBe(true);
    settle!(Response.json({ error: "fixture_declined" }, { status: 503 }));
    await waitFor(() => expect(button.disabled).toBe(false));
    expect(screen.getByRole("alert")).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(1);
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
