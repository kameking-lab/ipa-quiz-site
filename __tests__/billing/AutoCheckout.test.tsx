import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { AutoCheckout } from "@/app/billing/start/AutoCheckout";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

it.each(["purchase_email_unverified", "duplicate_purchase_google", "duplicate_purchase"])("offers account sign-in for %s and preserves the quiz return path", async code => {
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ error: code }, { status: 409 })));
  const returnTo = "/q/ap/2023-spring/am/q12";
  render(<AutoCheckout terms="terms" returnTo={returnTo} fallback="/billing" today="2026-11-19" />);
  fireEvent.click(screen.getByRole("radio", { name: "自動で終わらせない" }));
  fireEvent.click(screen.getByRole("button", { name: "決済へ進む" }));
  expect(await screen.findByRole("alert")).toHaveTextContent(/ログイン/);
  const link = await screen.findByRole("link", { name: "ログインし直す" });
  const href = new URL(link.getAttribute("href")!, window.location.origin);
  expect(href.pathname).toBe("/auth/signin");
  expect(href.searchParams.get("switchAccount")).toBe("1");
  expect(href.searchParams.get("callbackUrl")).toBe(`/billing/start?returnTo=${encodeURIComponent(returnTo)}`);
});

it("keeps the plan fallback for a checkout service error", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ error: "purchase_check_unavailable" }, { status: 503 })));
  render(<AutoCheckout terms="terms" returnTo={null} fallback="/billing" today="2026-11-19" />);
  fireEvent.click(screen.getByRole("radio", { name: "自動で終わらせない" }));
  fireEvent.click(screen.getByRole("button", { name: "決済へ進む" }));
  expect(await screen.findByRole("link", { name: "料金・契約の画面へ" })).toHaveAttribute("href", "/billing");
  expect(screen.queryByRole("link", { name: "ログインし直す" })).toBeNull();
});

it("refreshes the earliest exam date if checkout crosses the booking cutoff", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ error: "invalid_exam_date", firstExamDate: "2026-11-20" }, { status: 400 })));
  render(<AutoCheckout terms="terms" returnTo={null} fallback="/billing" today="2026-11-19" />);
  expect(screen.getByRole("radio", { name: "試験日の翌日に自動で終わる" })).toBeChecked();
  const date = await screen.findByLabelText("受験日");
  expect(date).toHaveAttribute("min", "2026-11-19");
  fireEvent.change(date, { target: { value: "2026-11-19" } });
  fireEvent.click(screen.getByRole("button", { name: "決済へ進む" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("11月19日を受験日とする申込受付は終了しました");
  expect(await screen.findByLabelText("受験日")).toHaveAttribute("min", "2026-11-20");
});
