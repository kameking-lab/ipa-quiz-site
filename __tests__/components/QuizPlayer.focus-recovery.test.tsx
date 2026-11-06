import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render } from "@testing-library/react";
import type { Question } from "@/lib/questions/types";
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }) }));
import { QuizPlayer } from "@/components/quiz/QuizPlayer";

const q: Question = { id: "ap-2023h-am-q1", exam: "ap", session: "am", year: 2023, season: "spring",
  qNumber: 1, type: "multiple-choice", category: "test", topicTags: [], difficulty: 1,
  question: "選んでください", choices: { ア: "一つ目", イ: "二つ目", ウ: "三つ目", エ: "四つ目" },
  answer: "ア", explanation: "説明です", hasImage: false, sourcePdfUrl: "https://example.test/q.pdf", license: "IPA-public" };
let nextId = 0;
const frames = new Map<number, FrameRequestCallback>();
beforeEach(() => {
  localStorage.clear(); frames.clear(); nextId = 0;
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => { frames.set(++nextId, callback); return nextId; });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => { frames.delete(id); });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });
function frame() {
  act(() => { const current = [...frames.entries()]; for (const [id, callback] of current) { frames.delete(id); callback(0); } });
}
function answer() {
  const view = render(<QuizPlayer question={q} index={0} total={10} mode="year" onNext={() => {}} />);
  fireEvent.click(view.getAllByRole("radio")[0]);
  const result = view.getByLabelText("解答結果");
  const nativeFocus = result.focus.bind(result);
  const focus = vi.spyOn(result, "focus").mockImplementationOnce(() => {}).mockImplementation(nativeFocus);
  return { view, result, focus };
}
it("recovers a dropped initial result focus after paint without another answer/history write", () => {
  const { result, focus } = answer();
  frame(); expect(document.activeElement).toBe(document.body);
  frame(); expect(result).toHaveFocus(); expect(focus).toHaveBeenCalledTimes(2);
  expect(JSON.parse(localStorage.getItem("ipa-quiz:history:v1")!).entries).toHaveLength(1);
});
it("preserves focus when the learner has already selected another action", () => {
  const { view, result, focus } = answer(); frame();
  const action = view.getByRole("button", { name: "この問題をAIに質問" }); action.focus();
  frame(); expect(action).toHaveFocus(); expect(result).not.toHaveFocus(); expect(focus).toHaveBeenCalledTimes(1);
});
it("cancels a pending retry on unmount", () => {
  const { view, focus } = answer(); frame(); view.unmount(); frame();
  expect(focus).toHaveBeenCalledTimes(1);
});
it("retries across delayed visibility frames and stops when a learner selects an action", () => {
  const { view, result, focus } = answer();
  focus.mockImplementation(() => {});
  frame(); frame(); frame();
  expect(document.activeElement).toBe(document.body);
  const action = view.getByRole("button", { name: "この問題をAIに質問" }); action.focus();
  const count = focus.mock.calls.length; frame(); frame();
  expect(action).toHaveFocus(); expect(focus).toHaveBeenCalledTimes(count);
  expect(result).not.toHaveFocus();
});
it("bounds unsuccessful focus attempts", () => {
  const { focus } = answer(); focus.mockImplementation(() => {});
  for (let i = 0; i < 20; i++) frame();
  expect(focus).toHaveBeenCalledTimes(9); // initial answer + at most eight recovery frames
});
