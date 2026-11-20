import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Question } from "@/lib/questions/types";
import { createHistoryStore } from "@/lib/storage/history";
import { LS_KEYS } from "@/lib/storage/keys";

const { granted } = vi.hoisted(() => ({ granted: vi.fn() }));
vi.mock("@/lib/billing/guest-client", async (original) => ({ ...await original<object>(), fetchPracticeQuestion: granted }));
vi.mock("@/components/quiz/QuizPlayer", () => ({ QuizPlayer: ({ question, onNext }: {
  question: Question | null; onNext: () => void;
}) => <div><p>{question?.id ?? "loading"}</p><button onClick={onNext}>next</button></div> }));
import { QuizClient } from "@/app/quiz/QuizClient";

const questions = [1, 2, 3].map((n) => ({ id: `ap-2025h-am-q${n}`, exam: "ap", session: "am", year: 2025,
  season: "spring", qNumber: n, difficulty: 2, explanation: "DNSの名前解決を確認します。", hasImage: false,
  sourcePdfUrl: "https://www.ipa.go.jp/shiken/", license: "IPA-public",
  type: "multiple-choice", category: "ネットワーク", topicTags: [], question: `question ${n}`, answer: "ア", choices: { ア: "A", イ: "B" } } satisfies Question));
const ids = questions.map((q) => q.id);
const props = { poolIds: ids, mode: "year" as const, exam: "ap", backHref: "/ap" };

beforeEach(() => {
  localStorage.clear(); sessionStorage.clear(); window.history.replaceState(null, "", "/quiz?mode=year&exam=ap");
  granted.mockReset().mockImplementation(async (id: string) => ({ question: questions.find((q) => q.id === id), access: null }));
  vi.stubGlobal("fetch", vi.fn(async (url: string) => {
    const id = new URL(url, window.location.origin).searchParams.get("id");
    return Response.json(questions.find((q) => q.id === id));
  }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("practice queue continuity", () => {
  it("resumes an annual queue saved by the previous related-question flow", async () => {
    const storageKey = `${LS_KEYS.activeQuizPool}/quiz?mode=year&exam=ap`;
    const saved = JSON.stringify([ids[0], ids[2], ids[1]]);
    sessionStorage.setItem(storageKey, saved);
    sessionStorage.setItem(`${storageKey}:related-order`, saved);
    window.history.replaceState(null, "", `/quiz?mode=year&exam=ap&question=${ids[2]}`);
    render(<QuizClient {...props} />);
    await screen.findByText(ids[2]);
    fireEvent.click(screen.getByRole("button", { name: "next" }));
    await screen.findByText(ids[1]);
  });
  it("runs the practice grant when advancing to the prefetched next question", async () => {
    render(<QuizClient {...props} billingGateEnabled />);
    await screen.findByText(ids[0]);
    expect(granted.mock.calls.map((call) => call[0])).toEqual([ids[0]]);
    fireEvent.click(screen.getByRole("button", { name: "next" }));
    await screen.findByText(ids[1]);
    expect(granted.mock.calls.map((call) => call[0])).toEqual([ids[0], ids[1]]);
  });
  it("limits the free review queue to eligible questions in the learner’s history", async () => {
    createHistoryStore().record({ id: ids[0], selected: "イ", correct: false, at: 1 });
    createHistoryStore().record({ id: ids[1], selected: "イ", correct: false, at: 2 });
    window.history.replaceState(null, "", `/quiz?mode=review&exam=ap&question=${ids[0]}`);
    render(<QuizClient {...props} mode="review" billingGateEnabled />);
    await screen.findByText(ids[0]);
    expect(screen.getByLabelText("1問目 / 2問")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "next" }));
    await screen.findByText(ids[1]);
    expect(fetch).not.toHaveBeenCalledWith(expect.stringContaining(ids[2]), expect.anything());
    await waitFor(() => expect(granted).not.toHaveBeenCalled());
  });
});
