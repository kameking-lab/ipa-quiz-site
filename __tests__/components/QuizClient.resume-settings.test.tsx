import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { QuizClient } from "@/app/quiz/QuizClient";
import { createHistoryStore } from "@/lib/storage/history";
import { LS_KEYS } from "@/lib/storage/keys";
import { clearQuizResume, readQuizResume } from "@/lib/storage/quiz-resume";

vi.mock("@/components/quiz/QuizPlayer", () => ({
  QuizPlayer: ({ question, index, total, deferredQuestionCount, onNext, onDeferQuestion, onResumeDeferred, onComplete }: {
    question: { id: string } | null; index: number; total: number; deferredQuestionCount?: number;
    onNext: () => void; onDeferQuestion?: (id: string) => void; onResumeDeferred?: () => void; onComplete?: () => void;
  }) => <div>
    <output data-testid="position">{question?.id ?? "none"}:{index}/{total}:{deferredQuestionCount ?? 0}</output>
    <button onClick={onNext}>next</button>
    <button onClick={() => question && onDeferQuestion?.(question.id)}>defer</button>
    <button onClick={onResumeDeferred}>resume deferred</button>
    <button onClick={onComplete}>complete</button>
  </div>,
}));

const ids = ["ap-q1", "ap-q2", "ap-q3"];
const question = (id: string) => ({ id, exam: "ap", session: "am", year: 2024, season: "autumn", qNumber: 1 });
const props = { poolIds: ids, mode: "year" as const, backHref: "/ap", exam: "ap" };

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  window.history.replaceState(null, "", "/quiz?mode=year&exam=ap");
  vi.stubGlobal("fetch", vi.fn(async (input: string) => {
    const id = new URL(input, window.location.origin).searchParams.get("id");
    return new Response(JSON.stringify(question(id ?? "")), { status: 200 });
  }));
});

describe("durable quiz resume", () => {
  it("restores the same year pool and deferred queue with history recording off", async () => {
    localStorage.setItem(LS_KEYS.settings, JSON.stringify({ recordHistory: false }));
    const first = render(<QuizClient {...props} />);
    await screen.findByText("ap-q1:0/3:0");
    fireEvent.click(screen.getByRole("button", { name: "defer" }));
    await screen.findByText("ap-q2:1/3:1");
    await waitFor(() => expect(readQuizResume()?.deferredIds).toEqual(["ap-q1"]));
    first.unmount();

    window.history.replaceState(null, "", "/quiz?mode=year&exam=ap");
    sessionStorage.clear(); // A fresh tab has only the durable snapshot.
    render(<QuizClient {...props} />);
    await screen.findByText("ap-q2:1/3:1");
    expect(screen.getByText(/直近の演習は、このブラウザで続きから再開できます/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "最初から" })).toHaveAttribute("href", "/quiz?mode=year&exam=ap&new=1");
    expect(screen.queryByRole("link", { name: "続きから再開" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "next" }));
    await screen.findByText("ap-q3:2/3:1");
    fireEvent.click(screen.getByRole("button", { name: "defer" }));
    await screen.findByText("none:3/3:2");
    fireEvent.click(screen.getByRole("button", { name: "resume deferred" }));
    await screen.findByText("ap-q1:0/2:0");
    expect(readQuizResume()?.phase).toBe("deferred");
    expect(createHistoryStore().getAllEntries()).toEqual([]);
  });

  it("rejects a saved pool from a different qualification and clears it explicitly", async () => {
    const first = render(<QuizClient {...props} />);
    await screen.findByText("ap-q1:0/3:0");
    expect(readQuizResume()?.ids).toEqual(ids);
    first.unmount();
    window.history.replaceState(null, "", "/quiz?mode=year&exam=fe");
    render(<QuizClient {...props} poolIds={["fe-q1"]} exam="fe" />);
    await screen.findByText("fe-q1:0/1:0");
    expect(screen.queryByText("ap-q1:0/3:0")).not.toBeInTheDocument();
    expect(readQuizResume()?.route).toBe("/quiz?mode=year&exam=fe");
    clearQuizResume();
    expect(readQuizResume()).toBeNull();
  });

  it("ignores a stale same-route pool and starts from the current originals", async () => {
    localStorage.setItem(LS_KEYS.quizResume, JSON.stringify({
      version: 1, route: "/quiz?mode=year&exam=ap", ids: ["ap-q1", "removed-q"],
      index: 1, deferredIds: [], phase: "primary", updatedAt: Date.now(),
    }));
    render(<QuizClient {...props} />);
    await screen.findByText("ap-q1:0/3:0");
    expect(screen.queryByText("removed-q:1/2:0")).not.toBeInTheDocument();
    expect(readQuizResume()?.ids).toEqual(ids);
  });

  it("continues normally without resume copy when durable storage rejects the write", async () => {
    const originalSetItem = Storage.prototype.setItem;
    const write = vi.spyOn(Storage.prototype, "setItem").mockImplementation(function (this: Storage, key, value) {
      if (key === LS_KEYS.quizResume) throw new Error("storage unavailable");
      return originalSetItem.call(this, key, value);
    });
    render(<QuizClient {...props} />);
    await screen.findByText("ap-q1:0/3:0");
    expect(screen.queryByText(/直近の演習は、このブラウザで続きから再開できます/)).not.toBeInTheDocument();
    expect(readQuizResume()).toBeNull();
    write.mockRestore();
  });

  it("resumes at the deferred action after the final answered question", async () => {
    const first = render(<QuizClient {...props} />);
    await screen.findByText("ap-q1:0/3:0");
    fireEvent.click(screen.getByRole("button", { name: "defer" }));
    await screen.findByText("ap-q2:1/3:1");
    fireEvent.click(screen.getByRole("button", { name: "next" }));
    await screen.findByText("ap-q3:2/3:1");
    fireEvent.click(screen.getByRole("button", { name: "complete" }));
    await waitFor(() => expect(readQuizResume()?.index).toBe(3));
    first.unmount();
    sessionStorage.clear();
    window.history.replaceState(null, "", "/quiz?mode=year&exam=ap");
    render(<QuizClient {...props} />);
    await screen.findByText("none:3/3:1");
    fireEvent.click(screen.getByRole("button", { name: "resume deferred" }));
    await screen.findByText("ap-q1:0/1:0");
    fireEvent.click(screen.getByRole("button", { name: "complete" }));
    expect(readQuizResume()).toBeNull();
  });

  it("restores from its own question URL, but honors a different explicit question link", async () => {
    const first = render(<QuizClient {...props} />);
    await screen.findByText("ap-q1:0/3:0");
    fireEvent.click(screen.getByRole("button", { name: "defer" }));
    await screen.findByText("ap-q2:1/3:1");
    const currentUrl = `${window.location.pathname}${window.location.search}`;
    first.unmount();
    sessionStorage.clear();

    window.history.replaceState(null, "", currentUrl);
    const resumed = render(<QuizClient {...props} initialQuestionId="ap-q2" />);
    await screen.findByText("ap-q2:1/3:1");
    resumed.unmount();

    window.history.replaceState(null, "", "/quiz?mode=year&exam=ap&question=ap-q3");
    render(<QuizClient {...props} initialQuestionId="ap-q3" />);
    await screen.findByText("ap-q3:2/3:0");
  });

  it("keeps the existing three-question cap when returning to a random trial", async () => {
    vi.spyOn(Math, "random").mockReturnValue(0.999);
    window.history.replaceState(null, "", "/quiz?mode=random&exam=ap&limit=3");
    const first = render(<QuizClient {...props} poolIds={[...ids, "ap-q4"]} mode="random" maxQuestions={3} />);
    await screen.findByText("ap-q1:0/3:0");
    fireEvent.click(screen.getByRole("button", { name: "next" }));
    await screen.findByText("ap-q2:1/3:0");
    first.unmount();
    sessionStorage.clear();
    window.history.replaceState(null, "", "/quiz?mode=random&exam=ap&limit=3");
    render(<QuizClient {...props} poolIds={[...ids, "ap-q4"]} mode="random" maxQuestions={3} />);
    await screen.findByText("ap-q2:1/3:0");
    expect(readQuizResume()?.ids).toHaveLength(3);
    vi.restoreAllMocks();
  });

  it("starts a new session only when the optional restart link is chosen", async () => {
    const first = render(<QuizClient {...props} />);
    await screen.findByText("ap-q1:0/3:0");
    fireEvent.click(screen.getByRole("button", { name: "next" }));
    await screen.findByText("ap-q2:1/3:0");
    first.unmount();
    sessionStorage.clear();
    window.history.replaceState(null, "", "/quiz?mode=year&exam=ap&new=1");
    render(<QuizClient {...props} />);
    await screen.findByText("ap-q1:0/3:0");
    expect(readQuizResume()?.index).toBe(0);
    expect(new URL(window.location.href).searchParams.has("new")).toBe(false);
  });

  it("consumes an explicit resume flag after restoring the durable position", async () => {
    localStorage.setItem(LS_KEYS.quizResume, JSON.stringify({
      version: 1, route: "/quiz?mode=year&exam=ap", ids, index: 1,
      deferredIds: [ids[0]], phase: "primary", updatedAt: Date.now(),
    }));
    window.history.replaceState(null, "", "/quiz?mode=year&exam=ap&resume=1");
    render(<QuizClient {...props} />);
    await screen.findByText("ap-q2:1/3:1");
    expect(new URL(window.location.href).searchParams.has("resume")).toBe(false);
  });
});

describe("random practice settings", () => {
  it("filters calculation and the last 40 answers before applying the trial cap, then shuffles choices only when enabled", async () => {
    localStorage.setItem(LS_KEYS.settings, JSON.stringify({
      calculationOnly: true, excludeRecent: true, randomizeChoices: true, recordHistory: false,
    }));
    createHistoryStore().record({ id: "ap-q2", selected: "ア", correct: true, at: Date.now() });
    window.history.replaceState(null, "", "/quiz?mode=random&exam=ap&limit=3");
    render(<QuizClient {...props} mode="random" maxQuestions={3} randomSettingsEnabled calculationIds={["ap-q2", "ap-q3"]} />);
    await screen.findByText("ap-q3:0/1:0");
    const calls = vi.mocked(fetch).mock.calls.map(([input]) => String(input));
    expect(calls.some((url) => url.includes("id=ap-q3") && url.includes("shuffle=1"))).toBe(true);
  });

  it("does not apply random settings to a search-origin random pool", async () => {
    localStorage.setItem(LS_KEYS.settings, JSON.stringify({
      calculationOnly: true, excludeRecent: true, randomizeChoices: true, recordHistory: false,
    }));
    vi.spyOn(Math, "random").mockReturnValue(0.999);
    window.history.replaceState(null, "", "/quiz?mode=random&exam=ap&source=search");
    render(<QuizClient {...props} mode="random" randomSettingsEnabled={false} calculationIds={[]} />);
    await screen.findByText("ap-q1:0/3:0");
    expect(vi.mocked(fetch).mock.calls.every(([input]) => !String(input).includes("shuffle=1"))).toBe(true);
    vi.restoreAllMocks();
  });
});
