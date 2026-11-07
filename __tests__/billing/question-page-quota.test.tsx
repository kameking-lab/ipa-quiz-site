import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QuestionPracticeGate } from "@/components/quiz/QuestionPracticeGate";
import { PurchaseStatus } from "@/app/billing/PurchaseStatus";
import { planStartHref, safeQuizReturn, saveQuizReturn } from "@/lib/billing/quiz-return";
import { resetFunnelEventsForTest } from "@/lib/billing/funnel-client";
import { buildQuestionJsonLd, withQuotaPaywall } from "@/lib/seo/question-jsonld";
import { ALL_QUESTIONS } from "@/data/questions";

const access = { kind: "guest", freeDaily: 10, remaining: 0, resetAt: "2026-11-07T15:00:00.000Z", retryAfter: null };
const beacon = vi.fn(() => true);
beforeEach(() => {
  window.history.replaceState({}, "", "/q/ap/2023-spring/am/1");
  resetFunnelEventsForTest();
  beacon.mockClear();
  Object.defineProperty(navigator, "sendBeacon", { configurable: true, value: beacon });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); sessionStorage.clear(); vi.restoreAllMocks(); });
const read = (blob: Blob) => new Promise<string>(resolve => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.readAsText(blob); });
const events = () => beacon.mock.calls.map(call => ({ text: () => read((call as unknown as [string, Blob])[1]) }));

describe("individual question pages count toward the shared daily free 10", () => {
  it("replaces the question with the limit screen past the quota and counts free_limit_reached", async () => {
    const fetcher = vi.fn(async () => Response.json({ error: "daily_limit", access }, { status: 429 }));
    vi.stubGlobal("fetch", fetcher);
    render(<QuestionPracticeGate id="ap-2023h-am-q1" enabled><p>問題文テキスト</p></QuestionPracticeGate>);
    expect(await screen.findByRole("heading", { name: "今日の無料10問はここまで" })).toBeTruthy();
    expect(screen.getByText("問題文テキスト").closest(".paywalled-question")).toHaveAttribute("hidden");
    expect(screen.getByRole("link", { name: "月額980円で続ける" })).toHaveAttribute("href", "/billing/start?returnTo=" + encodeURIComponent("/q/ap/2023-spring/am/1"));
    expect(fetcher).toHaveBeenCalledWith("/api/billing/question", expect.objectContaining({ method: "POST", body: JSON.stringify({ id: "ap-2023h-am-q1", shuffle: false }) }));
    expect(beacon).toHaveBeenCalledTimes(1);
    expect(await events()[0].text()).toBe(JSON.stringify({ event: "free_limit_reached" }));
  });
  it("leaves the page open while within the quota, for members, and on errors", async () => {
    for (const response of [
      Response.json({ question: { id: "q" }, access: { ...access, remaining: 3 } }),
      Response.json({ question: { id: "q" }, access: { ...access, kind: "pass", remaining: null } }),
      Response.json({ error: "billing_unavailable", access }, { status: 503 }),
      Response.json({ error: "not_found", access }, { status: 404 }),
    ]) {
      const fetcher = vi.fn(async () => response);
      vi.stubGlobal("fetch", fetcher);
      const view = render(<QuestionPracticeGate id="q" enabled><p>本文</p></QuestionPracticeGate>);
      await waitFor(() => expect(fetcher).toHaveBeenCalled());
      await act(async () => {});
      expect(screen.getByText("本文").closest(".paywalled-question")).not.toHaveAttribute("hidden");
      expect(screen.queryByRole("heading", { name: "今日の無料10問はここまで" })).toBeNull();
      view.unmount();
    }
  });
  it("gives crawlers the full page without counting, and does nothing while the gate is off", async () => {
    const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher);
    vi.spyOn(navigator, "userAgent", "get").mockReturnValue("Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)");
    render(<QuestionPracticeGate id="q" enabled><p>全文</p></QuestionPracticeGate>);
    vi.restoreAllMocks();
    render(<QuestionPracticeGate id="q2" enabled={false}><p>全文2</p></QuestionPracticeGate>);
    await act(async () => {});
    expect(fetcher).not.toHaveBeenCalled();
    expect(screen.getByText("全文")).toBeVisible();
    expect(screen.getByText("全文2")).toBeVisible();
  });
  it("declares the replaceable part as paywalled content (flexible sampling, not cloaking)", () => {
    const q = ALL_QUESTIONS.find(item => item.exam === "ap")!;
    const plain = buildQuestionJsonLd({ question: q, pageUrlAbs: "https://www.kakomon-ai.jp/q/x", title: "t" });
    const marked = withQuotaPaywall(plain) as unknown as { "@graph": { "@type": string; isAccessibleForFree?: boolean; hasPart?: unknown }[] };
    const resource = marked["@graph"].find(node => node["@type"] === "LearningResource")!;
    expect(resource.isAccessibleForFree).toBe(false);
    const original = plain["@graph"][0] as unknown as { isAccessibleForFree: boolean; hasPart: unknown };
    expect(resource.hasPart).toEqual([original.hasPart, { "@type": "WebPageElement", isAccessibleForFree: false, cssSelector: ".paywalled-question" }]);
    expect(original.isAccessibleForFree).toBe(true);
  });
});

describe("return path after purchase", () => {
  it("accepts question and quiz pages but never billing, sign-in, API or other origins", () => {
    expect(safeQuizReturn("/q/ap/2023-spring/am/1")).toBe("/q/ap/2023-spring/am/1");
    expect(safeQuizReturn("/quiz?mode=year&question=q1")).toBe("/quiz?mode=year&question=q1");
    expect(safeQuizReturn("/essay/pm/pm-2024-q1")).toBe("/essay/pm/pm-2024-q1");
    for (const bad of ["/quiz?mode=year", "/billing", "/billing/start?returnTo=/q/a", "/auth/signin", "/api/funnel", "//evil.example/q", "https://evil.example/q", "/q/a#x", "/q/\\evil"]) expect(safeQuizReturn(bad)).toBeNull();
    expect(planStartHref("/q/a")).toBe("/billing/start?returnTo=%2Fq%2Fa");
    expect(planStartHref("https://evil.example")).toBe("/billing/start");
  });
  it("goes straight back to the question once the purchase is confirmed, counting purchase_returned", async () => {
    saveQuizReturn(sessionStorage, "/q/ap/2023-spring/am/1", Date.now(), "order-1");
    const replace = vi.fn();
    vi.stubGlobal("location", { ...window.location, replace });
    vi.stubGlobal("fetch", vi.fn(async () => Response.json({ billingModel: "subscription", entitled: true, expiresAt: null, purchase: { id: "order-1", status: "paid", expiresAt: null } })));
    render(<PurchaseStatus order="order-1" testMode={false} />);
    await waitFor(() => expect(replace).toHaveBeenCalledWith("/q/ap/2023-spring/am/1"));
    expect(await events()[0].text()).toBe(JSON.stringify({ event: "purchase_returned" }));
  });
  it("counts a return from Checkout without paying", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => Response.json({ entitled: false, expiresAt: null, purchase: { id: "order-2", status: "pending", expiresAt: null } })));
    render(<PurchaseStatus order="order-2" canceled testMode={false} />);
    await waitFor(() => expect(beacon).toHaveBeenCalled());
    expect(await events()[0].text()).toBe(JSON.stringify({ event: "checkout_canceled" }));
  });
});
