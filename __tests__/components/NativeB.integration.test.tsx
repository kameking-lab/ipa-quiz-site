import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn(), prefetch: vi.fn(), back: vi.fn() }) }));
import { QuizPlayer } from "@/components/quiz/QuizPlayer";
import { StreamQuizPlayer } from "@/components/quiz/stream/StreamQuizPlayer";
import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { NativeBAnswerInput } from "@/components/quiz/NativeBAnswer";
import { nativeBQuestion } from "@/__tests__/fixtures/native-b-question";
import { createHistoryStore } from "@/lib/storage/history";

beforeEach(() => { localStorage.clear(); vi.spyOn(window, "scrollTo").mockImplementation(() => {}); Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: vi.fn() }); });
afterEach(() => { cleanup(); vi.useRealTimers(); });
function chooseAll() { screen.getAllByRole("combobox").forEach((select, index) => fireEvent.change(select, { target: { value: String(index % 2 + 1) } })); }
for (const mode of ["binary", "shared-bank"] as const) describe(`native ${mode}`, () => {
  it("renders exact bank labels, five independent inputs, images, one submit; permits blanks", () => {
    const question = nativeBQuestion(mode); const onAnswer = vi.fn();
    question.nativeB!.bankImageUrls = ["/original-bank.png"]; question.nativeB!.bankImageAltTexts = ["ORIGINAL_BANK"];
    render(<NativeBAnswerInput data={question.nativeB!} disabled={false} onAnswer={onAnswer} />);
    const selects = screen.getAllByRole("combobox"); expect(selects).toHaveLength(5);
    expect(within(selects[0]!).getAllByRole("option")).toHaveLength((mode === "binary" ? 2 : 10) + 1);
    expect(screen.getByRole("img", { name: "ORIGINAL_BANK" })).toHaveAttribute("src", "/original-bank.png");
    fireEvent.change(selects[0]!, { target: { value: "1" } }); fireEvent.change(selects[2]!, { target: { value: "1" } });
    fireEvent.click(screen.getByRole("button", { name: "回答を採点する" }));
    fireEvent.click(screen.getByRole("button", { name: "回答を採点する" }));
    expect(onAnswer).toHaveBeenCalledTimes(1); expect(onAnswer).toHaveBeenCalledWith({ L1: "1", L3: "1" });
  });
  it("normal player preserves one original/history/result then resets next question", () => {
    const question = nativeBQuestion(mode); const next = vi.fn();
    const player = render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={next} />);
    const select = screen.getAllByRole("combobox")[0]!;
    for (const key of ["1", "2", "Enter", "ArrowRight"]) fireEvent.keyDown(select, { key });
    expect(createHistoryStore().getAllEntries()).toHaveLength(0); expect(next).not.toHaveBeenCalled();
    chooseAll(); fireEvent.click(screen.getByRole("button", { name: "回答を採点する" }));
    expect(screen.getByText("正答枠数 5/5（全枠正解）")).toBeInTheDocument();
    expect(screen.getByText(/公式配点情報: 満点 10点/)).toBeInTheDocument();
    expect(screen.getByText("SLOT_REASON_4")).toBeInTheDocument(); expect(screen.getByText("REASON_1")).toBeInTheDocument();
    expect(createHistoryStore().getAllEntries()).toMatchObject([{ id: question.id, correct: true, nativeBResult: { correctSlots: 5 } }]);
    fireEvent.click(screen.getByRole("button", { name: "次の問題へ" })); expect(next).toHaveBeenCalledTimes(1);
    player.rerender(<QuizPlayer question={{ ...question, id: "structural-next" }} index={1} total={2} mode="year" onNext={next} />);
    expect(screen.getAllByRole("combobox").every((select) => (select as HTMLSelectElement).value === "")).toBe(true);
    expect(screen.queryByText(/正答枠数/)).not.toBeInTheDocument();
  });
  it("individual page grades partial slots once and its reader path does not record", () => {
    const question = nativeBQuestion(mode);
    const props = { question, questionId: question.id, answerKey: question.answer, exam: question.exam, year: question.year, season: question.season, session: question.session, qNumber: question.qNumber };
    const page = render(<QuestionAnswerCard {...props} />);
    fireEvent.change(screen.getAllByRole("combobox")[0]!, { target: { value: "1" } });
    fireEvent.click(screen.getByRole("button", { name: "回答を採点する" }));
    expect(screen.getByText("正答枠数 1/5")).toBeInTheDocument();
    expect(createHistoryStore().getAllEntries()).toMatchObject([{ correct: false, nativeBResult: { correctSlots: 1, isCorrect: false } }]);
    page.unmount(); localStorage.clear(); render(<QuestionAnswerCard {...props} />);
    fireEvent.click(screen.getByRole("button", { name: "採点せずに答えだけ見る" }));
    expect(screen.getByText("各枠の正答と解説")).toBeInTheDocument(); expect(createHistoryStore().getAllEntries()).toHaveLength(0);
  });
  it("stream retains partial results in its previous-original review", () => {
    vi.useFakeTimers(); const question = nativeBQuestion(mode);
    render(<StreamQuizPlayer questions={[question, { ...question, id: "structural-next", question: "NEXT_TOKEN" }]} />);
    fireEvent.click(screen.getByRole("button", { name: "回答を採点する" }));
    expect(screen.getByText("正答枠数 0/5")).toBeInTheDocument();
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
    fireEvent.click(screen.getByRole("button", { name: "次の問題へ" })); act(() => vi.advanceTimersByTime(300));
    fireEvent.click(screen.getByRole("button", { name: "直前に解いた問題に戻る" }));
    const review = screen.getByRole("dialog"); expect(within(review).getByRole("status")).toHaveTextContent("正答枠数 0/5");
    expect(createHistoryStore().getAllEntries()).toHaveLength(1);
  });
});

it("does not repeat a bank crop already rendered as the original figure", () => {
  const question = nativeBQuestion(); question.qNumber = 21; question.nativeB!.officialLabel = "B1";
  question.hasImage = true; question.imageUrls = ["/one-original.png"]; question.imageAltTexts = ["ORIGINAL"];
  question.nativeB!.bankImageUrls = ["/one-original.png"];
  render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={vi.fn()} />);
  expect(screen.getByText("問B1")).toBeInTheDocument();
  expect(screen.getAllByRole("img").filter((image) => image.getAttribute("src") === "/one-original.png")).toHaveLength(1);
});


// New qualification consumers retain official past-question-only learning.
import { QUESTIONS_BY_EXAM } from "@/data/questions";
vi.mock("@/components/quiz/GenerateSimilar", () => ({ GenerateSimilar: () => <button data-testid="generated-variant-test-only">generated-variant-test-only</button> }));
for (const code of ["riku-tech1", "maritime4", "land-special1", "maritime3", "land-special2", "land-special3", "aviation-comm", "amateur1", "maritime-special1", "riku-tech2", "amateur2", "maritime-radar"] as const) {
  it(`${code}: answers a real MC original without offering generated questions`, () => {
    const question = (QUESTIONS_BY_EXAM[code] ?? []).find((q) => q.type === "multiple-choice")!;
    render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={vi.fn()} />);
    fireEvent.click(screen.getAllByRole("radio")[0]!);
    expect(screen.getByLabelText("解答結果")).toBeInTheDocument();
    expect(screen.queryByTestId("generated-variant-test-only")).not.toBeInTheDocument();
  });
}
it("preserves the existing generated-question entry for non-radio learning", () => {
  const question = (QUESTIONS_BY_EXAM.ap ?? []).find((q) => q.type === "multiple-choice")!;
  render(<QuizPlayer question={question} index={0} total={2} mode="year" onNext={vi.fn()} />);
  fireEvent.click(screen.getAllByRole("radio")[0]!);
  expect(screen.getByTestId("generated-variant-test-only")).toBeInTheDocument();
});
