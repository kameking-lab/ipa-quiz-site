import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Question } from "@/lib/questions/types";
import { createHistoryStore } from "@/lib/storage/history";

const { granted } = vi.hoisted(() => ({ granted: vi.fn() }));
vi.mock("@/lib/billing/guest-client", async (original) => ({ ...await original<object>(), fetchPracticeQuestion: granted }));
vi.mock("@/components/quiz/QuizPlayer", () => ({ QuizPlayer: ({ question, relatedQuestions, onRelated, onNext }: {
  question: Question | null; relatedQuestions?: Question[]; onRelated: (q: Question) => void; onNext: () => void;
}) => <div><p>{question?.id ?? "loading"}</p>{relatedQuestions?.map((q) => <button key={q.id} onClick={() => onRelated(q)}>related {q.id}</button>)}<button onClick={onNext}>next</button></div> }));
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
  vi.stubGlobal("fetch", vi.fn(async (url: string, init?: RequestInit) => {
    if (url === "/api/questions/related") {
      const body = JSON.parse(init?.body as string) as { id: string; ids: string[] };
      return Response.json({ questions: [...questions].reverse().filter((q) => body.ids.includes(q.id)) });
    }
    const id = new URL(url, window.location.origin).searchParams.get("id");
    return Response.json(questions.find((q) => q.id === id));
  }));
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("related question queue continuity", () => {
  it("resumes a reordered annual queue after reload, preserving the remaining question", async () => {
    const view = render(<QuizClient {...props} />);
    fireEvent.click(await screen.findByRole("button", { name: `related ${ids[2]}` }));
    await screen.findByText(ids[2]);
    view.unmount();
    render(<QuizClient {...props} />);
    await screen.findByText(ids[2]);
    fireEvent.click(screen.getByRole("button", { name: "next" }));
    await screen.findByText(ids[1]);
  });
  it("runs the normal practice grant when activating prefetched related content", async () => {
    render(<QuizClient {...props} billingGateEnabled />);
    fireEvent.click(await screen.findByRole("button", { name: `related ${ids[2]}` }));
    await screen.findByText(ids[2]);
    expect(granted.mock.calls.map((call) => call[0])).toEqual([ids[0], ids[2]]);
  });
  it("limits review suggestions to eligible review questions", async () => {
    createHistoryStore().record({ id: ids[0], selected: "イ", correct: false, at: 1 });
    createHistoryStore().record({ id: ids[1], selected: "イ", correct: false, at: 2 });
    window.history.replaceState(null, "", `/quiz?mode=review&exam=ap&question=${ids[0]}`);
    render(<QuizClient {...props} mode="review" billingGateEnabled />);
    await screen.findByRole("button", { name: `related ${ids[1]}` });
    expect(screen.queryByRole("button", { name: `related ${ids[2]}` })).not.toBeInTheDocument();
    await waitFor(() => expect(granted).not.toHaveBeenCalled());
  });
});
