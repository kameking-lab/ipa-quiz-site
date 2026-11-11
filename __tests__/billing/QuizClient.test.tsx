// @vitest-environment jsdom
import { act, fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, it, expect, vi } from "vitest";
vi.mock("@/components/quiz/QuizPlayer", () => ({ QuizPlayer: ({ question, onNext }: { question: { id: string } | null; onNext: () => void }) => <div><p>{question?.id ?? "loading"}</p><button onClick={onNext}>next</button></div> }));
vi.mock("@/lib/motivation/session", () => ({ startSession: vi.fn() }));
vi.mock("@/lib/storage/history", () => ({ createHistoryStore: () => ({ getAllEntries: () => [], getWrongIds: () => ["q1"], getStarredIds: () => [], getAnsweredIds: () => [] }) }));
vi.mock("next/link", () => ({ default: ({ children, ...props }: React.ComponentProps<"a">) => <a {...props}>{children}</a> }));
import { QuizClient } from "@/app/quiz/QuizClient";
import { billingConfig, gateReady } from "@/lib/billing/config";
const access = { kind: "trial", remaining: 9, freeDaily: 10, resetAt: "2026-10-30T15:00:00.000Z", retryAfter: null };
beforeEach(() => { window.history.replaceState({}, "", "/quiz?mode=year"); window.sessionStorage.clear(); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
describe("QuizClient authorization boundary", () => {
  it("off ignores malformed billing settings and keeps question GET/cache independent of billing", async () => {
    const c = billingConfig({ BILLING_MODE: "off", BILLING_ORIGIN: "%%%", BILLING_PRICE_YEN: "broken", BILLING_TRANSITION_STARTS_AT: "bad" });
    const fetcher = vi.fn(async (url: string) => {
      if (url === "/api/questions/related") return Response.json({ questions: [] });
      if (url.includes("billing")) throw new Error("billing outage");
      return Response.json({ id: url.includes("q1") ? "q1" : "q2" });
    }); vi.stubGlobal("fetch", fetcher);
    render(<QuizClient poolIds={["q1", "q2"]} mode="year" backHref="/" billingGateEnabled={gateReady(c)} />);
    await screen.findByText("q1"); await waitFor(() => expect(fetcher.mock.calls.filter(([url]) => url.startsWith("/api/questions/next?"))).toHaveLength(2));
    fireEvent.click(screen.getByText("next")); await screen.findByText("q2");
    expect(fetcher.mock.calls.filter(([url]) => url.startsWith("/api/questions/next?"))).toHaveLength(2);
    expect(fetcher.mock.calls.every(([url]) => url.startsWith("/api/questions/next?") || url === "/api/questions/related")).toBe(true);
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
      // q1 is the last free question (remaining 0), so q2 must wait for its own grant.
      return id === "q2" ? Response.json({ error: "daily_limit", access: { ...access, remaining: 0 } }, { status: 429 }) : Response.json({ question: { id }, access: { ...access, remaining: 0 } });
    });
    vi.stubGlobal("fetch", fetcher);
    render(<QuizClient billingGateEnabled poolIds={["q1", "q2"]} mode="year" backHref="/" />);
    await screen.findByText("q1"); expect(fetcher.mock.calls.some(([u, opts]) => u.includes("/api/questions/next?") && !opts?.method)).toBe(true);
    fireEvent.click(screen.getByText("next"));
    await screen.findByText("今日の無料10問はここまで"); expect(screen.queryByText("q2")).toBeNull();
    expect(document.activeElement).toHaveAttribute("aria-label", "本日の無料演習の終了");
    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({ block: "start", behavior: "instant" });
    expect(fetcher.mock.calls.some(([u, opts]) => u === "/api/billing/question" && JSON.parse(opts!.body as string).id === "q2")).toBe(true);
  });
  it("retains exact deep link through login, retry and refresh; history storage is untouched", async () => {
    window.localStorage.setItem("ipa-quiz:history:v1", "preserved");
    window.history.replaceState({}, "", "/quiz?mode=year&question=q2");
    vi.stubGlobal("fetch", vi.fn(async (_url: string, opts?: RequestInit) => opts?.method ? Response.json({ error: "sign_in_required" }, { status: 401 }) : Response.json({ id: "q3" })));
    render(<QuizClient billingGateEnabled poolIds={["q1", "q2", "q3"]} mode="year" backHref="/" initialQuestionId="q2" />);
    await screen.findByText("この端末の本日の演習枠はアカウントへの引継ぎが開始されています。続きは同じアカウントでログインして再試行してください。");
    const login = screen.getByText("この問題から再開するためにログイン");
    expect(decodeURIComponent(login.getAttribute("href")!)).toContain("question=q2");
    await act(async () => fireEvent.click(screen.getByText("再読み込み")));
    await waitFor(() => expect(window.location.search).toContain("question=q2"));
    expect(window.localStorage.getItem("ipa-quiz:history:v1")).toBe("preserved");
  });
  it("keeps focus at the stable host through delayed next loading and arrival, and ignores duplicate navigation", async () => {
    let finish: ((response: Response) => void) | undefined;
    const fetcher = vi.fn(async (url: string, options?: RequestInit) => {
      if (!options?.method) return Response.json({ id: new URL(url, window.location.origin).searchParams.get("id") });
      const { id } = JSON.parse(options.body as string);
      if (id === "q2") return new Promise<Response>((resolve) => { finish = resolve; });
      // No free question left after q1: the next one is not shown before its grant.
      return Response.json({ question: { id }, access: id === "q1" ? { ...access, remaining: 0 } : access });
    });
    vi.stubGlobal("fetch", fetcher);
    render(<QuizClient billingGateEnabled poolIds={["q1", "q2", "q3"]} mode="year" backHref="/" />);
    await screen.findByText("q1");
    const next = screen.getByRole("button", { name: "next" });
    act(() => { fireEvent.click(next); fireEvent.click(next); });
    await screen.findByText("loading");
    const host = screen.getByLabelText("2問目 / 3問");
    expect(host).toHaveFocus();
    expect(host).toHaveClass("min-h-[100dvh]", "scroll-mt-24");
    expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({ block: "start", behavior: "instant" });
    expect(new URL(window.location.href).searchParams.get("question")).toBe("q2");
    expect(screen.queryByText("q3")).toBeNull();
    expect(fetcher.mock.calls.filter(([, options]) => options?.method && JSON.parse(options.body as string).id === "q2")).toHaveLength(1);
    expect(finish).toBeDefined();
    await act(async () => { finish!(Response.json({ question: { id: "q2" }, access })); });
    await screen.findByText("q2");
    expect(screen.getByLabelText("2問目 / 3問")).toBe(host);
    expect(host).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "next" }));
    await screen.findByText("q3");
    expect(screen.getByLabelText("3問目 / 3問")).toHaveFocus();
  });
  it("shows the prefetched next question at once while its grant is confirmed, and withdraws it if denied", async () => {
    let finish: ((response: Response) => void) | undefined;
    const pass = { ...access, kind: "pass", remaining: null };
    const fetcher = vi.fn(async (url: string, options?: RequestInit) => {
      if (!options?.method) { const id = new URL(url, window.location.origin).searchParams.get("id"); return Response.json({ id, copy: "prefetch" }); }
      const { id } = JSON.parse(options.body as string);
      if (id === "q2") return new Promise<Response>((resolve) => { finish = resolve; });
      if (id === "q3") return Response.json({ error: "billing_unavailable", access: { ...access, kind: "unavailable", remaining: null } }, { status: 503 });
      return Response.json({ question: { id }, access: pass });
    });
    vi.stubGlobal("fetch", fetcher);
    render(<QuizClient billingGateEnabled poolIds={["q1", "q2", "q3"]} mode="year" backHref="/" />);
    await screen.findByText("q1");
    await waitFor(() => expect(fetcher.mock.calls.some(([u, o]) => String(u).includes("id=q2") && !o?.method)).toBe(true));
    fireEvent.click(screen.getByRole("button", { name: "next" }));
    // No loading screen between questions for a member: q2 is on screen before its grant returns.
    expect(await screen.findByText("q2")).toBeInTheDocument();
    expect(screen.queryByText("loading")).toBeNull();
    await act(async () => { finish!(Response.json({ question: { id: "q2" }, access: pass })); });
    expect(screen.getByText("q2")).toBeInTheDocument();
    // A denied grant still replaces the optimistic question with the failure screen.
    fireEvent.click(screen.getByRole("button", { name: "next" }));
    await screen.findByText("問題を読み込めませんでした。少し待ってからもう一度お試しください。");
    expect(screen.queryByText("q3")).toBeNull();
  });
});
