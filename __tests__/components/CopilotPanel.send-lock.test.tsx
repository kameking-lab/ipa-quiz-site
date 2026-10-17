import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { Question } from "@/lib/questions/types";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }),
  usePathname: () => "/quiz",
}));

import { CopilotPanel } from "@/components/copilot/CopilotPanel";

const question: Question = {
  id: "ap-2024a-am-q1",
  exam: "ap",
  session: "am",
  year: 2024,
  season: "autumn",
  qNumber: 1,
  type: "multiple-choice",
  category: "technology",
  topicTags: [],
  difficulty: 3,
  question: "Test question",
  choices: { "ア": "A", "イ": "B", "ウ": "C", "エ": "D" },
  answer: "イ",
  explanation: "Explanation",
  hasImage: false,
  sourcePdfUrl: "https://example.com/q.pdf",
  license: "IPA-public",
};

const pending = () => {
  let resolve!: (response: Response) => void;
  let reject!: (error: Error) => void;
  const promise = new Promise<Response>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
};

beforeEach(() => {
  window.localStorage.clear();
  Element.prototype.scrollTo = vi.fn() as unknown as Element["scrollTo"];
});
afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("CopilotPanel synchronous send lock", () => {
  it("sends once for Enter and submit in the same render, then allows a new send after completion", async () => {
    const first = pending();
    const fetchMock = vi.fn().mockReturnValueOnce(first.promise).mockResolvedValue(new Response("second"));
    vi.stubGlobal("fetch", fetchMock);
    render(<CopilotPanel question={question} initialPrompt="Why?" />);
    const input = screen.getByRole("textbox", { name: /AIへの質問を入力/ });
    const form = input.closest("form");
    expect(form).not.toBeNull();

    act(() => {
      fireEvent.keyDown(input, { key: "Enter" });
      fireEvent.submit(form!);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    await act(async () => { first.resolve(new Response("first")); });
    await waitFor(() => expect(screen.getByText("first")).toBeTruthy());
    fireEvent.change(input, { target: { value: "Next?" } });
    fireEvent.submit(form!);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  });

  it("unlocks after a user abort so a later question can be sent", async () => {
    const fetchMock = vi.fn((_url: string, init: RequestInit) => new Promise<Response>((_resolve, reject) => {
      init.signal?.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")), { once: true });
    }));
    vi.stubGlobal("fetch", fetchMock);
    render(<CopilotPanel question={question} initialPrompt="Why?" />);
    const input = screen.getByRole("textbox", { name: /AIへの質問を入力/ });
    const form = input.closest("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form!);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole("button", { name: "生成を停止" }));
    await waitFor(() => expect(screen.getByText("(停止しました)")).toBeTruthy());
    fireEvent.change(input, { target: { value: "Again?" } });
    fireEvent.submit(form!);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
  });
});
