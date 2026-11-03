import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));
import { StreamQuizPlayer } from "@/components/quiz/stream/StreamQuizPlayer";
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { createHistoryStore } from "@/lib/storage/history";
import type { Question } from "@/lib/questions/types";

const question: Question = {
  id: "chosashi-2025-am-q11", exam: "chosashi", session: "am", year: 2025,
  season: "autumn", qNumber: 11, type: "descriptive", category: "測量記述",
  topicTags: [], difficulty: 5, question: "座標と図面を記載しなさい。",
  answer: "独自解答例", modelAnswer: "計算過程", explanation: "座標法。",
  hasImage: false, sourcePdfUrl: "https://www.moj.go.jp/content/001450010.pdf",
  license: "MOJ-attributed",
};
beforeEach(() => { cleanup(); window.localStorage.clear(); createHistoryStore().reset(); });
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe("記述問題の操作", () => {
  it("解答例の開閉時にEnter/Spaceが次問へ進んだり成績を記録したりしない", () => {
    const onNext = vi.fn();
    const { container } = render(<QuizPlayer question={question} index={0} total={2} mode="random" onNext={onNext} />);
    const details = container.querySelector("details")!;
    details.open = true;
    fireEvent(details, new Event("toggle"));
    const summary = details.querySelector("summary")!;
    summary.focus();
    fireEvent.keyDown(summary, { key: "Enter" });
    fireEvent.keyDown(summary, { key: " " });
    fireEvent.keyDown(window, { key: "1" });
    expect(onNext).not.toHaveBeenCalled();
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
  });
  it("次問ボタンが親の遷移処理へ委譲し、記述の正誤を記録しない", () => {
    const onNext = vi.fn();
    render(<QuizPlayer question={question} index={0} total={2} mode="random" onNext={onNext} />);
    fireEvent.click(screen.getByRole("button", { name: "次の問題へ" }));
    expect(onNext).toHaveBeenCalledOnce();
    // Focus through loading and arrival is owned and verified by QuizClient.test.tsx.
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
  });
});

it("ストリームでも独自解答例を表示し、次へ進んでも記述の正誤を記録しない", () => {
  vi.useFakeTimers();
  try {
    const { container } = render(<StreamQuizPlayer questions={[question, { ...question, id: "next-descriptive", question: "次の記述問題" }]} />);
    expect(screen.getByText(/法務省の公式解答ではありません/)).toBeTruthy();
    const summary = container.querySelector("summary")!;
    summary.focus();
    fireEvent.keyDown(summary, { key: "Enter" });
    expect(screen.queryByText("次の記述問題")).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "次の問題へ" }));
    act(() => vi.advanceTimersByTime(300));
    expect(screen.getByText("次の記述問題")).toBeTruthy();
    expect(document.activeElement?.getAttribute("tabindex")).toBe("-1");
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
  } finally { cleanup(); vi.useRealTimers(); }
});

it("記述だけを完了しても0点の成績を表示しない", () => {
  render(<QuizPlayer question={question} index={0} total={1} mode="random" onNext={() => {}} />);
  fireEvent.click(screen.getByRole("button", { name: "結果を見る" }));
  expect(screen.getByRole("heading", { name: "記述の確認を終えました" })).toBeTruthy();
  expect(createHistoryStore().getAllEntries()).toHaveLength(0);
});
it("ストリームの記述だけを完了しても択一の0/1成績へ変換しない", () => {
  vi.useFakeTimers();
  try {
    render(<StreamQuizPlayer questions={[question]} />);
    fireEvent.click(screen.getByRole("button", { name: "次の問題へ" }));
    act(() => vi.advanceTimersByTime(300));
    expect(screen.getByRole("heading", { name: "記述の確認を終えました" })).toBeTruthy();
    expect(screen.queryByText("Stream Summary")).toBeNull();
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
  } finally { cleanup(); vi.useRealTimers(); }
});

const apQuestion: Question = { ...question, id: "ap-2025a-pm-q1", exam: "ap", session: "pm", license: "IPA-public", modelAnswer: "設問１ a ク", sourcePdfUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/nl10bi0000009lh8-att/2025r07a_ap_pm_qs.pdf" };
it.each(["normal", "stream"])("AP午後を%sでも公式解答例で自己確認し，自動採点しない", mode => {
  if (mode === "normal") render(<QuizPlayer question={apQuestion} index={0} total={2} mode="random" onNext={() => {}} />);
  else render(<StreamQuizPlayer questions={[apQuestion]} />);
  expect(screen.getByText("IPA公式解答例")).toBeTruthy();
  expect(screen.queryByRole("radiogroup")).toBeNull();
  fireEvent.keyDown(window, { key: "1" });
  expect(createHistoryStore().getAllEntries()).toHaveLength(0);
});
