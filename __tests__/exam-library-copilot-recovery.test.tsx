import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ExamLibraryCopilot } from "@/components/exam-library/exam-copilot";

vi.mock("@/lib/posthog", () => ({ posthogCapture: vi.fn() }));
vi.mock("@/lib/exam-library-catalog", () => ({ findExamEntry: () => null }));
vi.mock("@/lib/exam-qualification-hubs", () => ({ qualificationHubForEntry: () => null }));
vi.mock("@/components/ui/markdown", () => ({ Markdown: ({ children }: { children: string }) => <div>{children}</div> }));

function openCopilot() {
  fireEvent.click(screen.getByRole("button", { name: "この問題をAIに質問" }));
}
function send(text: string) {
  fireEvent.change(screen.getByRole("textbox"), { target: { value: text } });
  fireEvent.click(screen.getByRole("button", { name: "AIに聞く" }));
}

afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });

describe("ExamLibraryCopilot recovery", () => {
  it("ends an unresponsive request after 45 seconds", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn().mockImplementation(() => new Promise<Response>(() => {}));
    vi.stubGlobal("fetch", fetchMock);
    render(<ExamLibraryCopilot examId="sample" questionId="q1" selectedChoice={null} />);
    openCopilot();
    send("待ち続けない");
    await act(async () => { await vi.advanceTimersByTimeAsync(45_000); });
    expect(fetchMock.mock.calls[0][1].signal.aborted).toBe(true);
    expect(screen.getByRole("button", { name: "再試行" })).toBeEnabled();
    expect(screen.getByRole("textbox")).toHaveValue("待ち続けない");
  });

  it("blocks unchanged input for a nonretryable failure and uses fixed network messages", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify({ error: "cost_capped" }), { status: 503 }))
      .mockRejectedValueOnce(new Error("private browser detail"));
    vi.stubGlobal("fetch", fetchMock);
    render(<ExamLibraryCopilot examId="sample" questionId="q1" selectedChoice={2} />);
    openCopilot();
    expect(screen.getByText("現在の選択：選択肢（2）")).toBeInTheDocument();
    send("同じ質問");
    await screen.findByRole("alert");
    expect(screen.getByRole("button", { name: "AIに聞く" })).toBeDisabled();
    send("変更した質問");
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("通信状況を確認"));
    expect(screen.queryByText("private browser detail")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent("掲載済みの解説は引き続き利用できます");
  });
  it("preserves the draft after an HTTP 200 failure and excludes failed turns from retry history", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response('\n\n[タイムアウト] AIの応答が間に合いませんでした。混雑時は再試行で改善することがあります。'))
      .mockResolvedValueOnce(new Response("正常な回答"));
    vi.stubGlobal("fetch", fetchMock);
    render(<ExamLibraryCopilot examId="sample" questionId="q1" selectedChoice={1} />);
    openCopilot();
    send("質問を保持");
    await screen.findByRole("alert");
    expect(screen.getByRole("textbox")).toHaveValue("質問を保持");
    fireEvent.click(screen.getByRole("button", { name: "再試行" }));
    await screen.findByText("正常な回答");
    expect(JSON.parse(fetchMock.mock.calls[1][1].body).messages).toEqual([{ role: "user", content: "質問を保持" }]);
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("stops an outstanding request and permits retry without waiting for fetch to settle", async () => {
    const fetchMock = vi.fn().mockImplementationOnce(() => new Promise<Response>(() => {})).mockResolvedValueOnce(new Response("再試行できた"));
    vi.stubGlobal("fetch", fetchMock);
    render(<ExamLibraryCopilot examId="sample" questionId="q1" selectedChoice={null} />);
    openCopilot();
    send("停止して再試行");
    fireEvent.click(screen.getByRole("button", { name: "回答を停止" }));
    expect(fetchMock.mock.calls[0][1].signal.aborted).toBe(true);
    expect(screen.getByRole("textbox")).toHaveValue("停止して再試行");
    fireEvent.click(screen.getByRole("button", { name: "再試行" }));
    await screen.findByText("再試行できた");
  });

  it("aborts an old question and ignores its response after navigation", async () => {
    let resolveOld!: (response: Response) => void;
    const fetchMock = vi.fn().mockImplementation(() => new Promise<Response>((resolve) => { resolveOld = resolve; }));
    vi.stubGlobal("fetch", fetchMock);
    const view = render(<ExamLibraryCopilot examId="sample" questionId="q1" selectedChoice={null} />);
    openCopilot();
    send("古い質問");
    view.rerender(<ExamLibraryCopilot examId="sample" questionId="q2" selectedChoice={null} />);
    expect(fetchMock.mock.calls[0][1].signal.aborted).toBe(true);
    openCopilot();
    await act(async () => { resolveOld(new Response("古い回答")); });
    expect(screen.queryByText("古い回答")).not.toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("");
  });

  it("bounds successful history to complete turns and API content limits", async () => {
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(new Response("回".repeat(3100))));
    vi.stubGlobal("fetch", fetchMock);
    render(<ExamLibraryCopilot examId="sample" questionId="q1" selectedChoice={1} />);
    openCopilot();
    for (let index = 0; index < 7; index += 1) {
      send(`質問${index}`);
      await waitFor(() => expect(screen.getByRole("textbox")).toHaveValue(""));
    }
    const sent = JSON.parse(fetchMock.mock.calls[6][1].body).messages as { role: string; content: string }[];
    expect(sent).toHaveLength(11);
    expect(sent[0].role).toBe("user");
    expect(sent.every((message) => message.content.length <= 3000)).toBe(true);
    expect(sent[1].content).toContain("[以前の回答の続きは省略]");
  });

  it("does not submit while Japanese input is composing", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    render(<ExamLibraryCopilot examId="sample" questionId="q1" selectedChoice={null} />);
    openCopilot();
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "変換中" } });
    fireEvent.compositionStart(screen.getByRole("textbox"));
    fireEvent.submit(screen.getByRole("textbox").closest("form")!);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
