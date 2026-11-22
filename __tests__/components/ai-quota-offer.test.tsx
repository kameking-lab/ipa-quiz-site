import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { ExamLibraryCopilot } from "@/components/exam-library/exam-copilot";
import { AiAccessNotice } from "@/components/ai/AiAccessNotice";
import { AI_POLICY_VERSION } from "@/lib/ai/access-policy";
import { captureActivity } from "@/lib/analytics/activity-client";

vi.mock("@/lib/analytics/activity-client", () => ({ captureActivity: vi.fn(), flushActivity: vi.fn() }));

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.clearAllMocks();
  window.history.replaceState(null, "", "/");
});

it("returns to the displayed library question and removes the offer on native membership confirmation", async () => {
  const transport = vi.fn<typeof fetch>()
    .mockResolvedValueOnce(Response.json({ kind: "free", remaining: 0, resetAt: Date.now() + 60_000 }))
    .mockResolvedValueOnce(Response.json({ kind: "paid" }));
  vi.stubGlobal("fetch", transport);
  window.history.replaceState(null, "", "/e-learning/exams/sample?question=old&view=results&from=practice");
  render(<ExamLibraryCopilot examId="sample" questionId="current" selectedChoice={2} />);
  fireEvent.click(screen.getByRole("button", { name: "この問題をAIに質問" }));
  const link = await screen.findByRole("link", { name: "月額980円（税込）で続ける" });
  const url = new URL(link.getAttribute("href")!, window.location.origin);
  expect(url.pathname).toBe("/billing/start");
  expect(url.searchParams.get("returnTo")).toBe("/e-learning/exams/sample?question=current&from=practice");
  await act(async () => { window.dispatchEvent(new Event("mobile:entitlement-changed")); });
  expect(await screen.findByText(/月額会員 · AI質問は回数制限なし/)).toBeVisible();
  expect(screen.queryByRole("link", { name: "月額980円（税込）で続ける" })).toBeNull();
});

it("keeps a confirmed purchase and the draft when an older submission returns a quota denial", async () => {
  const resetAt = Date.now() + 60_000;
  let finish!: (response: Response) => void;
  vi.stubGlobal("fetch", vi.fn<typeof fetch>()
    .mockResolvedValueOnce(Response.json({ kind: "free", remaining: 1, resetAt }))
    .mockImplementationOnce(() => new Promise<Response>(resolve => { finish = resolve; }))
    .mockResolvedValueOnce(Response.json({ kind: "paid" })));
  render(<ExamLibraryCopilot examId="sample" questionId="current" selectedChoice={2} />);
  fireEvent.click(screen.getByRole("button", { name: "この問題をAIに質問" }));
  expect(await screen.findByText("今日の無料AI あと1回")).toBeVisible();
  const field = screen.getByRole("textbox");
  fireEvent.change(field, { target: { value: "考え方を教えて" } });
  fireEvent.click(screen.getByRole("button", { name: "AIに聞く" }));
  await act(async () => { window.dispatchEvent(new Event("mobile:entitlement-changed")); });
  await act(async () => finish(Response.json({ error: "ai_daily_quota_exhausted", resetAt },
    { status: 429, headers: { "X-AI-Policy-Version": AI_POLICY_VERSION } })));
  expect(await screen.findByText(/月額会員 · AI質問は回数制限なし/)).toBeVisible();
  expect(field).toHaveValue("考え方を教えて");
  expect(screen.queryByRole("link", { name: "月額980円（税込）で続ける" })).toBeNull();
});

it("keeps the offer dismissed through a refresh and shows it once after a new denied submission", () => {
  const props = { quota: { kind: "free" as const, remaining: 0, resetAt: Date.now() + 60_000 },
    draft: "質問", draftId: "q1", returnTo: "/q/q1" };
  const view = render(<AiAccessNotice {...props} denials={0} />);
  fireEvent.click(screen.getByRole("button", { name: "今日はここまで" }));
  view.rerender(<AiAccessNotice {...props} denials={0} />);
  expect(screen.queryByRole("button", { name: "今日はここまで" })).toBeNull();
  view.rerender(<AiAccessNotice {...props} denials={1} />);
  expect(screen.getByRole("button", { name: "今日はここまで" })).toBeVisible();
  view.rerender(<AiAccessNotice {...props} denials={2} />);
  expect(vi.mocked(captureActivity).mock.calls.map(([name]) => name)).toEqual([
    "ai_quota_viewed", "ai_quota_dismissed", "ai_quota_viewed",
  ]);
});

it("keeps the library answer and its note when the output limit is reached", async () => {
  const text = "公式資料では、まず条件を確認します。\n\n[応答の途中終了] 出力上限に達したため、回答は途中までです。";
  const transport = vi.fn<typeof fetch>(async input => String(input).startsWith("/api/ai/usage")
    ? Response.json({ kind: "legacy" }) : new Response(text));
  vi.stubGlobal("fetch", transport);
  render(<ExamLibraryCopilot examId="sample" questionId="current" selectedChoice={2} />);
  fireEvent.click(screen.getByRole("button", { name: "この問題をAIに質問" }));
  const field = screen.getByRole("textbox");
  fireEvent.change(field, { target: { value: "考え方を教えて" } });
  fireEvent.click(screen.getByRole("button", { name: "AIに聞く" }));
  expect(await screen.findByText("公式資料では、まず条件を確認します。")).toBeVisible();
  expect(await screen.findByText(/回答は途中までです/)).toBeVisible();
  expect(screen.queryByRole("alert")).toBeNull();
  expect(field).toHaveValue("");
});
