import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
const capture = vi.hoisted(() => vi.fn());
vi.mock("@/lib/posthog", () => ({ posthogCapture: capture }));
import { PurchaseStatus } from "@/app/billing/PurchaseStatus";
const feedbackEvents = () => capture.mock.calls.filter(([event]) => event === "practice_feedback_customer_confirmation_viewed");
beforeEach(() => { capture.mockClear(); sessionStorage.clear(); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
it.each([true, false])("tracks confirmation views by customers with feedback history (%s), without claiming conversion", async submitted => {
  const fetcher = vi.fn(async () => Response.json({ entitled: true, feedbackSubmitted: submitted, purchase: { id: "order", status: "paid" } }));
  vi.stubGlobal("fetch", fetcher);
  const view = render(<PurchaseStatus order="order" />);
  await screen.findByRole("heading", { name: "購入が完了しました" });
  await waitFor(() => expect(feedbackEvents()).toHaveLength(submitted ? 1 : 0));
  expect(fetcher).toHaveBeenCalledTimes(1);
  expect(fetcher.mock.calls[0]).toEqual(["/api/billing/status?order=order", { cache: "no-store" }]);
  view.unmount();
  render(<PurchaseStatus order="order" />);
  await screen.findByRole("heading", { name: "購入が完了しました" });
  await waitFor(() => expect(feedbackEvents()).toHaveLength(submitted ? 1 : 0));
});

it("counts a view of a previously paid order after feedback and a new session as views only", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ entitled: true, feedbackSubmitted: true, purchase: { id: "old-order", status: "paid" } })));
  const first = render(<PurchaseStatus order="old-order" />);
  await screen.findByRole("heading", { name: "購入が完了しました" });
  await waitFor(() => expect(feedbackEvents().at(-1)).toEqual(["practice_feedback_customer_confirmation_viewed", { billingModel: "pass" }]));
  first.unmount(); sessionStorage.clear();
  render(<PurchaseStatus order="old-order" />);
  await screen.findByRole("heading", { name: "購入が完了しました" });
  await waitFor(() => expect(feedbackEvents()).toHaveLength(2));
  expect(feedbackEvents().every(([, properties]) => properties.billingModel === "pass")).toBe(true);
  expect(capture.mock.calls.filter(([event]) => event === "checkout_completed")).toHaveLength(2);
});
it.each([{ entitled: false, id: "order", status: "paid" }, { entitled: true, id: "other", status: "paid" }, { entitled: true, id: "order", status: "failed" }])("does not count an unconfirmed order: %j", async value => {
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ entitled: value.entitled, feedbackSubmitted: true, purchase: { id: value.id, status: value.status } })));
  render(<PurchaseStatus order="order" />);
  await screen.findByRole("heading", { name: "購入状況の確認" });
  expect(capture).not.toHaveBeenCalled();
});
