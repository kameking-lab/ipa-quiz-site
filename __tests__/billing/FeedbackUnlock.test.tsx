import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
const capture = vi.hoisted(() => vi.fn());
vi.mock("@/lib/posthog", () => ({ posthogCapture: capture }));
import { FeedbackUnlock } from "@/components/quiz/FeedbackUnlock";
import { PracticeDailyLimit } from "@/components/quiz/PracticeTransition";
beforeEach(() => { window.history.replaceState({}, "", "/quiz"); vi.stubEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY", ""); vi.clearAllMocks(); sessionStorage.clear(); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });
it("puts the plan first and the feedback bonus second, accepts multiple choices, and resumes only after storage success", async () => {
  const resume = vi.fn();
  let finish: (r: Response) => void = () => {};
  const fetcher = vi.fn(async (url: string, init?: RequestInit) => url === "/api/funnel" ? new Response(null, { status: 204 }) : init?.method === "POST" ? new Promise<Response>(resolve => { finish = resolve; }) : Response.json({ eligible: true, submitted: false, remaining: 0 }));
  vi.stubGlobal("fetch", fetcher);
  render(<PracticeDailyLimit reset={null} resumeHref="/quiz?mode=year&question=q1" backHref="/" onUnlocked={resume} />);
  const button = await screen.findByRole("button", { name: "意見を送ってあと10問" });
  const purchase = screen.getByRole("link", { name: "月額980円で続ける" });
  expect(purchase).toHaveAttribute("href", "/billing/start?returnTo=" + encodeURIComponent("/quiz?mode=year&question=q1"));
  expect(purchase.compareDocumentPosition(button) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  expect(screen.getByRole("heading", { name: "今日の無料10問はここまで" })).toBeTruthy();
  expect(screen.getByText("明日また10問")).toBeTruthy();
  expect(purchase.classList.contains("bg-primary")).toBe(true);
  // Only the plan button and the one-line terms link; nothing else to tap.
  expect(screen.getAllByRole("link").map(link => link.textContent)).toEqual(["月額980円で続ける", "条件・返金"]);
  fireEvent.click(button);
  fireEvent.click(screen.getByLabelText("解説をもっと詳しく"));
  fireEvent.click(screen.getByLabelText("スマホでの使いやすさ"));
  fireEvent.click(screen.getByRole("button", { name: "意見を送信して10問追加" }));
  expect(resume).not.toHaveBeenCalled();
  const submitted = JSON.parse(fetcher.mock.calls.find(([url, init]) => url === "/api/feedback-unlock" && init?.method === "POST")![1]!.body as string);
  expect(submitted.choices).toEqual(["explanations", "mobile"]);
  await act(async () => finish(Response.json({ ok: true, remaining: 10 })));
  await waitFor(() => expect(resume).toHaveBeenCalledTimes(1));
  expect(capture).toHaveBeenCalledWith("practice_feedback_submitted", { choiceCount: 2, hasComment: false });
});
it("preserves the form and never grants a reward on failure", async () => {
  const resume = vi.fn();
  vi.stubGlobal("fetch", vi.fn(async (_url: string, init?: RequestInit) => init?.method === "POST" ? Response.json({ error: "feedback_unavailable" }, { status: 503 }) : Response.json({ eligible: true })));
  render(<FeedbackUnlock onUnlocked={resume} />);
  fireEvent.click(await screen.findByRole("button", { name: "意見を送ってあと10問" }));
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
  const link = await screen.findByRole("link", { name: "意見を送ってあと10問" });
  expect(link).toHaveAttribute("href", "/auth/signin?callbackUrl=" + encodeURIComponent("/quiz?question=q11#feedback-unlock"));
  expect(screen.queryByRole("button", { name: "意見を送ってあと10問" })).toBeNull();
});

it("opens the form after login without storage access, retaining the exact question", async () => {
  window.history.replaceState({}, "", "/quiz?mode=year&question=q11#feedback-unlock");
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ eligible: true, submitted: false, remaining: 0 })));
  render(<FeedbackUnlock onUnlocked={vi.fn()} />);
  expect(await screen.findByRole("textbox", { name: /自由記述/ })).toBeInTheDocument();
  expect(window.location.pathname + window.location.search + window.location.hash).toBe("/quiz?mode=year&question=q11");
  vi.restoreAllMocks();
});

it("never opens a form for a used account even with a forged return marker", async () => {
  window.history.replaceState({}, "", "/quiz?question=q11#feedback-unlock");
  const fetcher = vi.fn(async () => Response.json({ eligible: false, submitted: true, remaining: 0 }));
  vi.stubGlobal("fetch", fetcher);
  render(<FeedbackUnlock onUnlocked={vi.fn()} />);
  await waitFor(() => expect(fetcher).toHaveBeenCalled());
  await act(async () => {});
  // A used bonus disappears from the limit screen entirely.
  expect(screen.queryByRole("textbox")).toBeNull();
  expect(screen.queryByText(/10問/)).toBeNull();
});

it("preserves all inputs through 401, login navigation and remount, requiring a fresh submission", async () => {
  window.history.replaceState({}, "", "/quiz?mode=year&question=q11");
  const resume = vi.fn();
  const fetcher = vi.fn(async (_url: string, init?: RequestInit) => init?.method === "POST"
    ? Response.json({}, { status: 401 }) : Response.json({ eligible: true }));
  vi.stubGlobal("fetch", fetcher);
  const first = render(<FeedbackUnlock onUnlocked={resume} />);
  fireEvent.click(await screen.findByRole("button", { name: "意見を送ってあと10問" }));
  fireEvent.click(screen.getByLabelText("資格の数を増やしてほしい"));
  fireEvent.change(screen.getByRole("textbox", { name: /希望資格/ }), { target: { value: "行政書士" } });
  fireEvent.change(screen.getByRole("textbox", { name: /自由記述/ }), { target: { value: "入力を保つ" } });
  fireEvent.click(screen.getByRole("button", { name: "意見を送信して10問追加" }));
  const link = await screen.findByRole("link", { name: "意見を送ってあと10問" });
  expect(screen.getByRole("alert")).toHaveTextContent("有効期限");
  expect(screen.getByRole("button", { name: "意見を送信して10問追加" })).toBeDisabled();
  expect(link.getAttribute("href")).not.toContain("行政書士");
  // Prevent jsdom navigation while still exercising the component click handler.
  link.addEventListener("click", e => e.preventDefault());
  fireEvent.click(link);
  first.unmount();
  window.history.replaceState({}, "", "/quiz?mode=year&question=q11#feedback-unlock");
  render(<FeedbackUnlock onUnlocked={resume} />);
  expect(await screen.findByRole("textbox", { name: /自由記述/ })).toHaveValue("入力を保つ");
  expect(screen.getByRole("textbox", { name: /希望資格/ })).toHaveValue("行政書士");
  expect(screen.getByLabelText("資格の数を増やしてほしい")).toBeChecked();
  expect(sessionStorage.getItem("feedback-unlock-draft:v1")).toBeNull();
  expect(fetcher.mock.calls.filter(([, init]) => init?.method === "POST")).toHaveLength(1);
  fetcher.mockImplementation(async () => Response.json({ remaining: 10 }));
  fireEvent.click(screen.getByRole("button", { name: "意見を送信して10問追加" }));
  await waitFor(() => expect(resume).toHaveBeenCalledOnce());
});

it("keeps inputs when storage is blocked and can continue after login in another tab", async () => {
  const fetcher = vi.fn(async (_url: string, init?: RequestInit) => init?.method === "POST"
    ? Response.json({}, { status: 401 }) : Response.json({ eligible: true }));
  vi.stubGlobal("fetch", fetcher);
  render(<FeedbackUnlock onUnlocked={vi.fn()} />);
  fireEvent.click(await screen.findByRole("button", { name: "意見を送ってあと10問" }));
  fireEvent.change(screen.getByRole("textbox", { name: /自由記述/ }), { target: { value: "下書き" } });
  fireEvent.click(screen.getByRole("button", { name: "意見を送信して10問追加" }));
  const link = await screen.findByRole("link", { name: "意見を送ってあと10問" });
  const storage = vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
  fireEvent.click(link);
  expect(screen.getByRole("alert")).toHaveTextContent("別のタブ");
  expect(screen.getByRole("textbox", { name: /自由記述/ })).toHaveValue("下書き");
  fireEvent.click(screen.getByRole("button", { name: "別タブでログインした後に再確認" }));
  await waitFor(() => expect(screen.getByRole("button", { name: "意見を送信して10問追加" })).toBeEnabled());
  expect(screen.getByRole("textbox", { name: /自由記述/ })).toHaveValue("下書き");
  storage.mockRestore();
});

it.each(["expired", "other-question"])("discards a %s draft on return", async reason => {
  sessionStorage.setItem("feedback-unlock-draft:v1", JSON.stringify({
    path: reason === "other-question" ? "/quiz?question=other" : "/quiz",
    savedAt: Date.now() - (reason === "expired" ? 31 * 60 * 1000 : 0),
    choices: ["mobile"], qualifications: "", comment: "old draft",
  }));
  window.history.replaceState({}, "", "/quiz#feedback-unlock");
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ eligible: true })));
  render(<FeedbackUnlock onUnlocked={vi.fn()} />);
  expect(await screen.findByRole("textbox", { name: /自由記述/ })).toHaveValue("");
  expect(sessionStorage.getItem("feedback-unlock-draft:v1")).toBeNull();
});
it("offers only the plan once the feedback bonus is used", async () => {
  const fetcher = vi.fn(async () => Response.json({ eligible: false, submitted: true, remaining: 0 }));
  vi.stubGlobal("fetch", fetcher);
  render(<PracticeDailyLimit reset={null} resumeHref="/quiz?mode=year" backHref="/" onUnlocked={vi.fn()} />);
  await waitFor(() => expect(fetcher).toHaveBeenCalled());
  await act(async () => {});
  expect(screen.queryByText(/受け取り済み/)).toBeNull();
  expect(screen.getByRole("link", { name: "月額980円で続ける" }).getAttribute("href")).toMatch(/^\/billing/);
  expect(screen.queryByRole("button", { name: "意見を送ってあと10問" })).toBeNull();
});
