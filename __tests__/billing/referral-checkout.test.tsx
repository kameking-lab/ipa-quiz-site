import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import type { PostHog } from "posthog-js";
import { setPostHogClient } from "@/lib/posthog";
import { CheckoutButton } from "@/app/billing/CheckoutButton";
import { PurchaseStatus } from "@/app/billing/PurchaseStatus";
vi.mock("@/app/billing/QuizResumeLinks", () => ({ QuizResumeLinks: () => null }));
vi.mock("@/app/billing/ManageSubscriptionButton", () => ({ ManageSubscriptionButton: () => null }));
const capture = vi.fn();
beforeEach(() => {
  localStorage.clear(); sessionStorage.clear(); capture.mockClear();
  history.replaceState({}, "", "/billing?utm_source=tsugino_shikaku&utm_content=fp3.hero");
  setPostHogClient({ capture } as unknown as PostHog);
});
afterEach(() => { cleanup(); setPostHogClient(null); vi.unstubAllGlobals(); });

it("records a confirmed checkout once, with UTM and test realm, without sending the order ID", async () => {
  const fetcher = vi.fn(async () => Response.json({ url: "#test-checkout", orderId: "private-order" }));
  vi.stubGlobal("fetch", fetcher);
  render(<CheckoutButton terms="test" amount={980} enabled recurring />);
  const button = screen.getByRole("button", { name: "同意してテスト決済へ" });
  fireEvent.click(button); fireEvent.click(button);
  await waitFor(() => expect(capture.mock.calls.some(call => call[0] === "checkout_started")).toBe(true));
  const events = capture.mock.calls.filter(call => call[0] === "checkout_started");
  expect(events).toHaveLength(1);
  expect(events[0][1]).toMatchObject({ plan: "monthly", test_mode: true, utm_content: "fp3.hero" });
  expect(JSON.stringify(events)).not.toContain("private-order");
  expect(fetcher).toHaveBeenCalledTimes(1);
});
it("does not count failed checkout or a disabled purchase button", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ error: "sign_in_required" }, { status: 401 })));
  const view = render(<CheckoutButton terms="test" amount={980} enabled />);
  fireEvent.click(screen.getByRole("button"));
  await screen.findByRole("alert");
  expect(capture.mock.calls.some(call => call[0] === "checkout_started")).toBe(false);
  view.rerender(<CheckoutButton terms="test" amount={980} enabled={false} />);
  expect(screen.getByRole("button")).toBeDisabled();
});
it.each(["pending", "failed", "refunded", "expired"])("does not count a %s status as a completed application", async status => {
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ entitled: false, expiresAt: null, purchase: { id: "private-order", status, expiresAt: null } })));
  render(<PurchaseStatus order="private-order" canceled testMode={false} />);
  await waitFor(() => expect(screen.getByRole("button", { name: "購入状況を再確認" })).toBeEnabled());
  expect(capture.mock.calls.some(call => call[0] === "checkout_completed")).toBe(false);
});
it("counts paid and entitled confirmation once across remounts, retaining attribution after sign-in", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ billingModel: "subscription", entitled: true, expiresAt: null,
    purchase: { id: "private-order", status: "paid", expiresAt: null } })));
  const view = render(<PurchaseStatus order="private-order" testMode={false} />);
  await screen.findByText("購入が完了しました");
  view.unmount(); render(<PurchaseStatus order="private-order" testMode={false} />);
  await screen.findByText("購入が完了しました");
  const events = capture.mock.calls.filter(call => call[0] === "checkout_completed");
  expect(events).toHaveLength(1);
  expect(events[0][1]).toMatchObject({ test_mode: false, plan: "monthly", utm_source: "tsugino_shikaku" });
  expect(JSON.stringify(events)).not.toContain("private-order");
});
