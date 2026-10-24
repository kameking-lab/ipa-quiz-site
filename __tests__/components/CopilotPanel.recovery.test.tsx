import { act, cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CopilotPanel, CopilotDesktopFloating } from "@/components/copilot/CopilotPanel";
import { encodeCopilotStreamError } from "@/lib/copilot/errors";
import type { ReactNode } from "react";
import type { Question } from "@/lib/questions/types";

// Keep the real panel, controls, request construction and recovery parser.
vi.mock("next/dynamic", () => ({ default: () => ({ children }: { children: ReactNode }) => <div>{children}</div> }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }), usePathname: () => "/quiz" }));
vi.mock("@/lib/posthog", () => ({ posthogCapture: vi.fn() }));
vi.mock("@/hooks/useChatSession", () => ({ useChatSession: () => ({ sessionId: "test-session", createdAt: 1 }) }));
vi.mock("@/lib/ai/learner-profile-client", () => ({ buildLearnerProfileFromHistory: () => undefined }));
vi.mock("@/lib/storage/character", () => ({ readCharacterState: () => ({ id: "default", enabled: false }) }));

const question: Question = {
  id: "ap-2024a-am-q1", exam: "ap", session: "am", year: 2024, season: "autumn", qNumber: 1,
  type: "multiple-choice", category: "テクノロジ", topicTags: [], difficulty: 3,
  question: "テスト問題", choices: { ア: "選択肢A", イ: "選択肢B", ウ: "選択肢C", エ: "選択肢D" },
  answer: "イ", explanation: "解説", hasImage: false, sourcePdfUrl: "https://example.com/q.pdf", license: "IPA-public",
};
interface RequestBody { question: { id: string }; selectedChoice?: string; isCorrect?: boolean; messages: { role: string; content: string }[] }
function requestBody(fetchMock: ReturnType<typeof vi.fn>, index: number): RequestBody {
  return JSON.parse((fetchMock.mock.calls[index][1] as RequestInit).body as string) as RequestBody;
}
function input() { return screen.getByRole("textbox"); }
function send(text: string) {
  fireEvent.change(input(), { target: { value: text } });
  fireEvent.click(screen.getByRole("button", { name: "送信" }));
}
function controlledResponse() {
  let controller!: ReadableStreamDefaultController<Uint8Array>;
  const response = new Response(new ReadableStream<Uint8Array>({ start(value) { controller = value; } }));
  return { response, push: (text: string) => controller.enqueue(new TextEncoder().encode(text)), close: () => controller.close() };
}
const originalScrollTo = Object.getOwnPropertyDescriptor(Element.prototype, "scrollTo");
beforeEach(() => {
  window.localStorage.clear();
  Object.defineProperty(Element.prototype, "scrollTo", { configurable: true, writable: true, value: vi.fn() });
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  if (originalScrollTo) Object.defineProperty(Element.prototype, "scrollTo", originalScrollTo);
  else Reflect.deleteProperty(Element.prototype, "scrollTo");
});

describe("CopilotPanel recovery interactions", () => {
  it("retains conversation and draft on close, but aborts unfinished work", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response("再開する回答"))
      .mockImplementationOnce(() => new Promise<Response>(() => {}));
    vi.stubGlobal("fetch", fetchMock);
    render(<CopilotDesktopFloating question={question} defaultOpen />);
    send("再開する質問");
    await screen.findByText("再開する回答");
    fireEvent.change(input(), { target: { value: "保持する下書き" } });
    fireEvent.click(screen.getByRole("button", { name: "閉じる" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "AI コパイロットを開く" }));
    expect(screen.getByText("再開する回答")).toBeVisible();
    expect(input()).toHaveValue("保持する下書き");
    send("閉じて中止する質問");
    fireEvent.click(screen.getByRole("button", { name: "閉じる" }));
    expect((fetchMock.mock.calls[1][1] as RequestInit).signal?.aborted).toBe(true);
    fireEvent.click(screen.getByRole("button", { name: "AI コパイロットを開く" }));
    expect(input()).toHaveValue("閉じて中止する質問");
    expect(screen.queryByRole("button", { name: "生成を停止" })).not.toBeInTheDocument();
  });

  it("suppresses Japanese IME confirmation and Shift+Enter, then sends ordinary Enter", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("回答"));
    vi.stubGlobal("fetch", fetchMock);
    render(<CopilotPanel question={question} />);
    fireEvent.change(input(), { target: { value: "変換中" } });
    fireEvent.keyDown(input(), { key: "Enter", isComposing: true });
    fireEvent.keyDown(input(), { key: "Enter", keyCode: 229 });
    fireEvent.keyDown(input(), { key: "Enter", shiftKey: true });
    expect(fetchMock).not.toHaveBeenCalled();
    fireEvent.keyDown(input(), { key: "Enter", keyCode: 13 });
    await screen.findByText("回答");
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("allows only one request for repeated submissions in the same render", () => {
    const fetchMock = vi.fn().mockImplementation(() => new Promise<Response>(() => {}));
    vi.stubGlobal("fetch", fetchMock);
    render(<CopilotPanel question={question} />);
    fireEvent.change(input(), { target: { value: "同じ質問" } });
    const form = input().closest("form")!;
    act(() => {
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it("releases a stopped request immediately and excludes it from the next request", async () => {
    const fetchMock = vi.fn().mockImplementationOnce(() => new Promise<Response>(() => {})).mockResolvedValueOnce(new Response("再送成功"));
    vi.stubGlobal("fetch", fetchMock);
    render(<CopilotPanel question={question} />);
    send("停止する質問");
    expect(fireEvent.click(screen.getByRole("button", { name: "生成を停止" }))).toBe(false);
    expect((fetchMock.mock.calls[0][1] as RequestInit).signal?.aborted).toBe(true);
    expect(input()).toHaveValue("停止する質問");
    send("再送する質問");
    await screen.findByText("再送成功");
    expect(requestBody(fetchMock, 1).messages).toEqual([{ role: "user", content: "再送する質問" }]);
  });

  it("ignores an old response after the question changes while the new request completes", async () => {
    let resolveOld!: (value: Response) => void;
    const fetchMock = vi.fn().mockImplementationOnce(() => new Promise<Response>((resolve) => { resolveOld = resolve; })).mockResolvedValueOnce(new Response("新しい問題の回答"));
    vi.stubGlobal("fetch", fetchMock);
    const view = render(<CopilotPanel question={question} />);
    send("古い質問");
    const nextQuestion = { ...question, id: "ap-2024a-am-q2", qNumber: 2 };
    view.rerender(<CopilotPanel question={nextQuestion} />);
    expect((fetchMock.mock.calls[0][1] as RequestInit).signal?.aborted).toBe(true);
    send("新しい質問");
    await screen.findByText("新しい問題の回答");
    await act(async () => { resolveOld(new Response("混入してはいけない古い回答")); });
    expect(screen.queryByText("混入してはいけない古い回答")).not.toBeInTheDocument();
    expect(requestBody(fetchMock, 1)).toMatchObject({ question: { id: nextQuestion.id }, messages: [{ role: "user", content: "新しい質問" }] });
  });

  it("retains a draft on an HTTP 200 error and retries without duplicating the failed turn", async () => {
    const stream = controlledResponse();
    const fetchMock = vi.fn().mockResolvedValueOnce(stream.response).mockResolvedValueOnce(new Response("復帰した回答"));
    vi.stubGlobal("fetch", fetchMock);
    render(<CopilotPanel question={question} />);
    send("最初の質問");
    fireEvent.change(input(), { target: { value: "編集中の下書き" } });
    await act(async () => { stream.push("\n\n[エラー] AI応答の取得に失敗しました。少し時間を置いて再度お試しください。" + encodeCopilotStreamError({ code: "temporary" })); stream.close(); });
    await screen.findByRole("alert");
    expect(input()).toHaveValue("編集中の下書き");
    expect(screen.queryByText(/AI応答の取得に失敗しました。少し時間/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "再試行" }));
    await screen.findByText("復帰した回答");
    expect(input()).toHaveValue("編集中の下書き");
    expect(requestBody(fetchMock, 1).messages).toEqual([{ role: "user", content: "最初の質問" }]);
    expect(within(screen.getByRole("log")).getAllByText("最初の質問")).toHaveLength(1);
  });

  it("blocks ordinary Enter resubmission of unchanged input after a typed configuration error", async () => {
    const fetchMock = vi.fn().mockResolvedValueOnce(new Response(encodeCopilotStreamError({ code: "provider_config" })));
    vi.stubGlobal("fetch", fetchMock);
    render(<CopilotPanel question={question} />);
    send("設定エラーになる質問");
    await screen.findByRole("alert");
    expect(input()).toHaveValue("設定エラーになる質問");
    expect(screen.getByRole("button", { name: "送信" })).toBeDisabled();
    fireEvent.keyDown(input(), { key: "Enter", keyCode: 13 });
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(input()).toHaveValue("設定エラーになる質問");
  });

  it("rejects input over 4000 characters and accepts the boundary", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("境界の回答"));
    vi.stubGlobal("fetch", fetchMock);
    render(<CopilotPanel question={question} />);
    expect(input()).toHaveAttribute("maxlength", "4000");
    fireEvent.change(input(), { target: { value: "問".repeat(4001) } });
    fireEvent.submit(input().closest("form")!);
    expect(fetchMock).not.toHaveBeenCalled();
    send("問".repeat(4000));
    await screen.findByText("境界の回答");
    expect(requestBody(fetchMock, 0).messages[0].content).toHaveLength(4000);
  });

  it("bounds long assistant context and retains complete conversation pairs", async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(new Response("長".repeat(4100))));
    vi.stubGlobal("fetch", fetchMock);
    render(<CopilotPanel question={question} />);
    for (let index = 0; index < 11; index += 1) {
      send(`質問${index}`);
      await waitFor(() => expect(screen.getByRole("button", { name: "送信" })).toBeInTheDocument());
    }
    const history = requestBody(fetchMock, 10).messages;
    expect(history).toHaveLength(19);
    expect(history[0]).toEqual({ role: "user", content: "質問1" });
    expect(history.at(-1)).toEqual({ role: "user", content: "質問10" });
    expect(history.every((message, index) => message.role === (index % 2 ? "assistant" : "user") && message.content.length <= 4000)).toBe(true);
    expect(history[1].content.length).toBeLessThan(4100);
  });

  it("preserves the reading position until the learner jumps to new output", async () => {
    const stream = controlledResponse();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(stream.response));
    render(<CopilotPanel question={question} />);
    send("長い回答を読む");
    await act(async () => { stream.push("回答の前半"); });
    const log = screen.getByRole("log");
    Object.defineProperties(log, { scrollHeight: { configurable: true, value: 1000 }, clientHeight: { configurable: true, value: 200 }, scrollTop: { configurable: true, writable: true, value: 100 } });
    fireEvent.scroll(log);
    const scrollTo = vi.mocked(Element.prototype.scrollTo);
    scrollTo.mockClear();
    await act(async () => { stream.push("回答の後半"); });
    expect(scrollTo).not.toHaveBeenCalled();
    expect(log.scrollTop).toBe(100);
    fireEvent.click(await screen.findByRole("button", { name: /新しい回答へ移動/ }));
    expect(scrollTo).toHaveBeenCalledWith({ top: 1000, behavior: "auto" });
    await act(async () => { stream.close(); });
  });

  it("uses the latest choice and correctness metadata on the next request", async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(new Response("選択肢の回答")));
    vi.stubGlobal("fetch", fetchMock);
    const view = render(<CopilotPanel question={question} selectedChoice="ア" isCorrect={false} />);
    send("この選択肢は？");
    await waitFor(() => expect(screen.getByRole("button", { name: "送信" })).toBeInTheDocument());
    view.rerender(<CopilotPanel question={question} selectedChoice="イ" isCorrect />);
    send("選び直しました");
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(requestBody(fetchMock, 0)).toMatchObject({ selectedChoice: "ア", isCorrect: false });
    expect(requestBody(fetchMock, 1)).toMatchObject({ selectedChoice: "イ", isCorrect: true });
    await waitFor(() => expect(screen.getByRole("button", { name: "送信" })).toBeInTheDocument());
  });
});
