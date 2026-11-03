import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
const capture = vi.hoisted(() => vi.fn());
vi.mock("@/lib/posthog", () => ({ posthogCapture: capture }));
import { FeedbackUnlock } from "@/components/quiz/FeedbackUnlock";
import { PracticeDailyLimit } from "@/components/quiz/PracticeTransition";
beforeEach(() => { vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", ""); vi.clearAllMocks(); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
it("keeps purchase primary, accepts multiple choices, and resumes only after storage success", async () => {
  const resume = vi.fn();
  let finish: (r: Response) => void = () => {};
  const fetcher = vi.fn(async (_url: string, init?: RequestInit) => init?.method === "POST" ? new Promise<Response>(resolve => { finish = resolve; }) : Response.json({ eligible: true, submitted: false, remaining: 0 }));
  vi.stubGlobal("fetch", fetcher);
  render(<PracticeDailyLimit reset={null} resumeHref="/quiz?mode=year" backHref="/" onUnlocked={resume} />);
  const button = await screen.findByRole("button", { name: "意見を送って、さらに10問無料で解く" });
  const purchase = screen.getByRole("link", { name: "有料にして続きを解く" });
  expect(purchase.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  fireEvent.click(button);
  fireEvent.click(screen.getByLabelText("解説をもっと詳しく"));
  fireEvent.click(screen.getByLabelText("スマホでの使いやすさ"));
  fireEvent.click(screen.getByRole("button", { name: "意見を送信して10問追加" }));
  expect(resume).not.toHaveBeenCalled();
  const submitted = JSON.parse(fetcher.mock.calls.find(([, init]) => init?.method === "POST")![1]!.body as string);
  expect(submitted.choices).toEqual(["explanations", "mobile"]);
  await act(async () => finish(Response.json({ ok: true, remaining: 10 })));
  await waitFor(() => expect(resume).toHaveBeenCalledTimes(1));
  expect(capture).toHaveBeenCalledWith("practice_feedback_submitted", { choiceCount: 2, hasComment: false });
});
it("preserves the form and never grants a reward on failure", async () => {
  const resume = vi.fn();
  vi.stubGlobal("fetch", vi.fn(async (_url: string, init?: RequestInit) => init?.method === "POST" ? Response.json({ error: "feedback_unavailable" }, { status: 503 }) : Response.json({ eligible: true })));
  render(<FeedbackUnlock onUnlocked={resume} />);
  fireEvent.click(await screen.findByRole("button", { name: "意見を送って、さらに10問無料で解く" }));
  fireEvent.change(screen.getByRole("textbox", { name: /自由記述/ }), { target: { value: "資格を増やしてほしい" } });
  fireEvent.click(screen.getByRole("button", { name: "意見を送信して10問追加" }));
  await screen.findByRole("alert");
  expect(screen.getByRole("textbox", { name: /自由記述/ })).toHaveValue("資格を増やしてほしい");
  expect(resume).not.toHaveBeenCalled(); expect(capture).not.toHaveBeenCalled();
});

it("offers login with the current question as return URL and hides anonymous submission", async () => {
  window.history.replaceState({}, "", "/quiz?question=q11");
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ eligible: false, requiresLogin: true })));
  render(<FeedbackUnlock onUnlocked={vi.fn()} />);
  const link = await screen.findByRole("link", { name: "無料ログインして、意見を送りさらに10問" });
  expect(link).toHaveAttribute("href", "/auth/signin?callbackUrl=" + encodeURIComponent("/quiz?question=q11"));
  expect(screen.queryByRole("button", { name: "意見を送って、さらに10問無料で解く" })).toBeNull();
});
