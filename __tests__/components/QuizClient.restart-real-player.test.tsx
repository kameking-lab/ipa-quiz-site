import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QuizClient } from "@/app/quiz/QuizClient";
import { readQuizResume } from "@/lib/storage/quiz-resume";
import type { Question } from "@/lib/questions/types";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

const first: Question = {
  id: "ap-2024a-am-q1", exam: "ap", session: "am", year: 2024,
  season: "autumn", qNumber: 1, type: "multiple-choice", category: "テクノロジ",
  topicTags: [], difficulty: 3, question: "再開始の一問目",
  choices: { ア: "一", イ: "二", ウ: "三", エ: "四" }, answer: "イ",
  explanation: "イが正解です。", hasImage: false,
  sourcePdfUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/2024r06.html", license: "IPA-public",
};
const second: Question = { ...first, id: "ap-2024a-am-q2", qNumber: 2, question: "再開始の二問目" };
const questions = new Map([first, second].map((question) => [question.id, question]));
const props = { poolIds: [first.id, second.id], mode: "year" as const, backHref: "/ap", exam: "ap" };

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  window.history.replaceState(null, "", "/quiz?mode=year&exam=ap");
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  vi.stubGlobal("fetch", vi.fn(async (input: string) => {
    const id = new URL(input, window.location.origin).searchParams.get("id");
    const question = id ? questions.get(id) : undefined;
    return question ? new Response(JSON.stringify(question), { status: 200 }) : new Response("", { status: 404 });
  }));
});
afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("QuizClient with the real QuizPlayer", () => {
  it("resets answer statistics, completion state, and elapsed time only for a new session", async () => {
    render(<QuizClient {...props} />);
    await screen.findByText(first.question);
    await waitFor(() => expect(screen.queryByText("0:00")).not.toBeInTheDocument(), { timeout: 2500 });
    fireEvent.click(screen.getByRole("radio", { name: /^選択肢 イ:/ }));
    fireEvent.keyDown(window, { key: "ArrowRight" });
    await screen.findByText(second.question);
    fireEvent.click(screen.getByRole("link", { name: "最初から" }));
    await screen.findByText(first.question);
    expect(screen.getByText("0:00")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /後回し（未回答のまま次へ/ }));
    await screen.findByText(second.question);
    fireEvent.click(screen.getByRole("button", { name: /後回し（未回答のまま次へ/ }));
    expect(screen.getByText("0/0")).toBeInTheDocument();
  });

  it("consumes new=1 and reloads the saved position after advancing with empty sessionStorage", async () => {
    const firstView = render(<QuizClient {...props} />);
    await screen.findByText(first.question);
    fireEvent.click(screen.getByRole("button", { name: /後回し（未回答のまま次へ/ }));
    await screen.findByText(second.question);
    firstView.unmount();

    window.history.replaceState(null, "", "/quiz?mode=year&exam=ap&new=1");
    const restarted = render(<QuizClient {...props} />);
    await screen.findByText(first.question);
    expect(new URL(window.location.href).searchParams.has("new")).toBe(false);
    fireEvent.click(screen.getByRole("button", { name: /後回し（未回答のまま次へ/ }));
    await screen.findByText(second.question);
    await waitFor(() => expect(readQuizResume()?.index).toBe(1));
    restarted.unmount();

    sessionStorage.clear();
    const reloadUrl = `${window.location.pathname}${window.location.search}`;
    window.history.replaceState(null, "", reloadUrl);
    render(<QuizClient {...props} initialQuestionId={second.id} />);
    await screen.findByText(second.question);
    expect(readQuizResume()?.deferredIds).toEqual([first.id]);
    expect(new URL(window.location.href).searchParams.has("new")).toBe(false);
  });

  it("still answers and advances when every storage write exceeds quota, without claiming resume was saved", async () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new DOMException("storage full", "QuotaExceededError");
    });
    render(<QuizClient {...props} />);
    await screen.findByText(first.question);
    expect(screen.queryByText(/直近の演習は、このブラウザで続きから再開できます/)).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("radio", { name: /^選択肢 イ:/ }));
    fireEvent.keyDown(window, { key: "ArrowRight" });
    await screen.findByText(second.question);
    expect(readQuizResume()).toBeNull();
    expect(screen.queryByText(/直近の演習は、このブラウザで続きから再開できます/)).not.toBeInTheDocument();
  });
});
