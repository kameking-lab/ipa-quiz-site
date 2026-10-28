// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
vi.mock("@/components/quiz/QuizPlayer", () => ({ QuizPlayer: ({ question, onNext }: { question: { id: string } | null; onNext: () => void }) => <div><p>{question?.id ?? "loading"}</p><button onClick={onNext}>next</button></div> }));
vi.mock("@/lib/motivation/session", () => ({ startSession: vi.fn() }));
vi.mock("@/lib/storage/history", () => ({ createHistoryStore: () => ({ getAllEntries: () => [], getWrongIds: () => ["q1"], getStarredIds: () => [], getAnsweredIds: () => [] }) }));
vi.mock("next/link", () => ({ default: ({ children, ...props }: React.ComponentProps<"a">) => <a {...props}>{children}</a> }));
import { QuizClient } from "@/app/quiz/QuizClient";
import { billingConfig, gateReady } from "@/lib/billing/config";
beforeEach(() => { window.history.replaceState({}, "", "/quiz?mode=year"); window.sessionStorage.clear(); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
describe("QuizClient authorization boundary", () => {
  it("off ignores malformed billing settings and uses only original GET/cache even if billing is down", async () => {
    const c = billingConfig({ BILLING_MODE: "off", BILLING_ORIGIN: "%%%", BILLING_PRICE_YEN: "broken", BILLING_TRANSITION_STARTS_AT: "bad" });
    const fetcher = vi.fn(async (url: string) => {
      if (url.includes("billing")) throw new Error("billing outage");
      return Response.json({ id: url.includes("q1") ? "q1" : "q2" });
    }); vi.stubGlobal("fetch", fetcher);
    render(<QuizClient poolIds={["q1", "q2"]} mode="year" backHref="/" billingGateEnabled={gateReady(c)} />);
    await screen.findByText("q1"); await waitFor(() => expect(fetcher).toHaveBeenCalledTimes(2));
    fireEvent.click(screen.getByText("next")); await screen.findByText("q2");
    expect(fetcher).toHaveBeenCalledTimes(2); expect(fetcher.mock.calls.every(([url]) => url.startsWith("/api/questions/next?"))).toBe(true);
  });
  it("existing wrong-answer review remains free and makes no billing requests", async () => {
    const fetcher = vi.fn(async (url: string) => Response.json({ id: url.includes("q1") ? "q1" : "unexpected" })); vi.stubGlobal("fetch", fetcher);
    render(<QuizClient billingGateEnabled poolIds={["q1", "q2"]} mode="review" backHref="/review" />);
    await screen.findByText("q1");
    expect(fetcher.mock.calls.every(call => !String(call[0]).includes("billing"))).toBe(true);
  });
  it("prefetch is GET, current is POST; cached next is re-authorized and denied without rendering", async () => {
    const fetcher = vi.fn(async (url: string, opts?: RequestInit) => {
      if (!opts?.method) return Response.json({ id: "q2" });
      const { id } = JSON.parse(opts.body as string);
      return id === "q2" ? Response.json({ error: "daily_limit" }, { status: 429 }) : Response.json({ question: { id }, access: { kind: "trial" } });
    });
    vi.stubGlobal("fetch", fetcher);
    render(<QuizClient billingGateEnabled poolIds={["q1", "q2"]} mode="year" backHref="/" />);
    await screen.findByText("q1"); expect(fetcher.mock.calls.some(([u, opts]) => u.includes("/api/questions/next?") && !opts?.method)).toBe(true);
    fireEvent.click(screen.getByText("next"));
    await screen.findByText(/本日の無料連続演習枠/); expect(screen.queryByText("q2")).toBeNull();
    expect(fetcher.mock.calls.some(([u, opts]) => u === "/api/billing/question" && JSON.parse(opts!.body as string).id === "q2")).toBe(true);
  });
  it("retains exact deep link through login, retry and refresh; history storage is untouched", async () => {
    window.localStorage.setItem("ipa-quiz:history:v1", "preserved");
    window.history.replaceState({}, "", "/quiz?mode=year&question=q2");
    vi.stubGlobal("fetch", vi.fn(async (_url: string, opts?: RequestInit) => opts?.method ? Response.json({ error: "sign_in_required" }, { status: 401 }) : Response.json({ id: "q3" })));
    render(<QuizClient billingGateEnabled poolIds={["q1", "q2", "q3"]} mode="year" backHref="/" initialQuestionId="q2" />);
    await screen.findByText("続けるにはログインしてください。");
    const login = screen.getByText("この問題から再開するためにログイン");
    expect(decodeURIComponent(login.getAttribute("href")!)).toContain("question=q2");
    await act(async () => fireEvent.click(screen.getByText("再読み込み")));
    await waitFor(() => expect(window.location.search).toContain("question=q2"));
    expect(window.localStorage.getItem("ipa-quiz:history:v1")).toBe("preserved");
  });
});
