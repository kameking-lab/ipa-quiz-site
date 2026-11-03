import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ReviewClient } from "@/app/review/ReviewClient";
import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { createHistoryStore } from "@/lib/storage/history";
import { writeLastQuestion } from "@/lib/storage/last-question";
import { LS_KEYS } from "@/lib/storage/keys";
import { POST } from "@/app/api/review/due/route";
import { IP_QUESTIONS } from "@/data/questions/ip";
import type { ChoiceKey } from "@/lib/questions/types";

beforeEach(() => { cleanup(); localStorage.clear(); });
afterEach(() => { vi.unstubAllGlobals(); cleanup(); });
function useRealReadApi() {
  const fetchMock = vi.fn(async (_url: string, init?: RequestInit) => POST(new Request("http://localhost/api/review/due", init)));
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}
const q = IP_QUESTIONS.find((q) => q.id === "ip-2009a-am-q1")!;
describe("existing answer history → real review lookup", () => {
  it("offers the question just answered incorrectly, without rewriting history or stars", async () => {
    const fetchMock = useRealReadApi();
    const history = createHistoryStore(); history.toggleStar(q.id);
    const { unmount } = render(<QuestionAnswerCard questionId={q.id} choices={q.choices!} answerKey={q.answer as ChoiceKey} exam={q.exam} year={q.year} season={q.season} session={q.session} qNumber={q.qNumber} />);
    fireEvent.click(screen.getByRole("radio", { name: /選択肢 ア/ }));
    const before = localStorage.getItem(LS_KEYS.history);
    expect(history.getAllEntries()[0]).toMatchObject({ id: q.id, correct: false });
    unmount(); render(<ReviewClient />);
    await screen.findByText(q.question);
    expect(screen.queryByText("復習キューはまだ空です")).not.toBeInTheDocument();
    const payload = JSON.parse(fetchMock.mock.calls[0]![1]!.body as string);
    expect(payload.historyIds).toEqual([q.id]);
    expect(localStorage.getItem(LS_KEYS.history)).toBe(before);
    expect(history.getStarredIds()).toEqual([q.id]);
  });
  it("distinguishes a future scheduled question from a first-time empty queue", async () => {
    useRealReadApi(); createHistoryStore().record({ id: q.id, selected: "ウ", correct: true, at: Date.now() });
    writeLastQuestion({ exam: "ip", year: 2009, season: "autumn", session: "am", qNumber: 1, answeredAt: Date.now() });
    localStorage.setItem("ipa-quiz:review:v1", JSON.stringify({ [q.id]: { questionId: q.id, level: 1, correctStreak: 1, nextReviewAt: "2099-01-01" } }));
    render(<ReviewClient />);
    await screen.findByText("今日の復習は完了です");
    expect(screen.getByText(/次回復習予定:/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ITパスポートの問題を解く" })).toHaveAttribute("href", "/ip");
    expect(screen.queryByText("復習キューはまだ空です")).not.toBeInTheDocument();
  });
  it("can read intact history even if the separate review schedule is malformed", async () => {
    useRealReadApi(); createHistoryStore().record({ id: q.id, selected: "ア", correct: false, at: Date.now() });
    localStorage.setItem("ipa-quiz:review:v1", "invalid-json");
    render(<ReviewClient />); await screen.findByText(q.question);
    expect(localStorage.getItem("ipa-quiz:review:v1")).toBe("invalid-json");
  });
  it("does not pretend a failed lookup is zero history", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("", { status: 503 })));
    render(<ReviewClient />); await screen.findByRole("alert");
    expect(screen.queryByText("復習キューはまだ空です")).not.toBeInTheDocument();
  });
  it("a genuinely new user gets qualification selection, without being assigned AP", async () => {
    useRealReadApi(); render(<ReviewClient />);
    await screen.findByText("復習キューはまだ空です");
    expect(screen.getByRole("link", { name: "問題を解き始める" })).toHaveAttribute("href", "/#choose-qualification");
  });
  it("deduplicates repeated answers through the store API, preserving the original entries", async () => {
    const fetchMock = useRealReadApi(); const history = createHistoryStore();
    history.record({ id: q.id, selected: "ア", correct: false, at: 1 }); history.record({ id: q.id, selected: "ウ", correct: true, at: 2 });
    render(<ReviewClient />); await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const payload = JSON.parse(fetchMock.mock.calls[0]![1]!.body as string);
    expect(payload.historyIds).toEqual([q.id]); expect(history.getAllEntries()).toHaveLength(2);
  });
});
