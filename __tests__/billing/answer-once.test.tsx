import { StrictMode } from "react";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { QuizClient } from "@/app/quiz/QuizClient";
import { TodayQuiz } from "@/app/quiz/today/TodayQuiz";
// Transform the real lazy paper module during test discovery, outside DOM interaction timeouts.
import "@/app/quiz/today/TodayLibrary";
import { QuestionAnswerCard } from "@/components/quiz/QuestionAnswerCard";
import { QuestionPracticeGate } from "@/components/quiz/QuestionPracticeGate";
import { StreamQuizPlayer } from "@/components/quiz/stream/StreamQuizPlayer";
import type { PracticeAccess } from "@/lib/billing/practice-contract";
import type { ExamQuestion } from "@/lib/exam-library-model";
import type { Question } from "@/lib/questions/types";
import { createHistoryStore } from "@/lib/storage/history";
import type { CatalogQuestion } from "@/lib/study-plan/client";
import { createPacePlan } from "@/lib/study-plan/pace";
import { getLearningActions, savePacePlan } from "@/lib/study-plan/pace-storage";
import * as studyReward from "@/lib/study-reward";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

const single: Question = {
  id: "answer-once-single", exam: "ip", year: 2026, season: "spring", session: "am", qNumber: 1,
  type: "multiple-choice", question: "単一選択のテスト問題", choices: { ア: "A", イ: "B", ウ: "C" },
  answer: "ア", category: "test", topicTags: [], difficulty: 1, explanation: "単一選択の解説",
  hasImage: false, sourcePdfUrl: "https://example.test/questions.pdf", license: "IPA-public",
};
const multiple: Question = {
  ...single, id: "answer-once-multiple", question: "二つとも答えるテスト問題",
  answer: ["ア", "イ"], requiredSelections: 2,
};
const ordering: Question = {
  ...single, id: "answer-once-ordering", question: "並べ替えのテスト問題", type: "ordering",
  answer: ["ウ", "ア", "イ"],
};
const access: PracticeAccess = {
  kind: "guest", remaining: 9, freeDaily: 10, resetAt: "2026-11-17T15:00:00.000Z", retryAfter: null,
};

// Allow the async quiz render to complete on constrained test workers.
const todayQuizWait = { timeout: 10_000 };

function mockPractice(...questions: { id: string }[]) {
  const grant = vi.fn((id: string) => Response.json({ question: questions.find(q => q.id === id), access }));
  vi.stubGlobal("fetch", vi.fn(async (url: string, options?: RequestInit) => {
    if (url === "/api/billing/question") return grant(JSON.parse(options!.body as string).id);
    if (url === "/api/billing/status") return Response.json({ entitled: false });
    if (url.startsWith("/api/study-plan/catalog/")) return Response.json({ questions });
    if (url.startsWith("/api/questions/next?")) {
      const id = new URL(url, location.origin).searchParams.get("id");
      return Response.json(questions.find(q => q.id === id));
    }
    if (url === "/api/questions/related") return Response.json({ questions: [] });
    if (url === "/api/auth/session") return Response.json({});
    return new Response(null, { status: 204 });
  }));
  return grant;
}

function openInline(question: Question) {
  render(<StrictMode><QuestionPracticeGate id={question.id} enabled>
    <QuestionAnswerCard
      question={question} questionId={question.id} choices={question.choices} answerKey={question.answer}
      exam={question.exam} year={question.year} season={question.season} session={question.session}
      qNumber={question.qNumber} requiredSelections={question.requiredSelections}
    />
  </QuestionPracticeGate></StrictMode>);
}

function answerBeforeRender(first: HTMLElement, competing: HTMLElement, key: string) {
  act(() => {
    fireEvent.click(first);
    fireEvent.keyDown(competing, { key });
  });
}

function expectHistory(question: Question, selected: string) {
  expect(createHistoryStore().getAllEntries()).toMatchObject([{ id: question.id, selected, correct: true }]);
}

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  window.history.replaceState({}, "", "/quiz?mode=year&exam=ip");
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("one graded answer per question visit", () => {
  it("records one answer and one quota grant on /q when a click and shortcut overlap", async () => {
    window.history.replaceState({}, "", "/q/ip/2026-spring/am/q1");
    const grant = mockPractice(single);
    openInline(single);
    await waitFor(() => expect(grant.mock.calls).toEqual([[single.id]]));
    const [first, second] = screen.getAllByRole("radio");
    answerBeforeRender(first, second, "2");
    expectHistory(single, "ア");
    expect(first).toBeChecked();
    expect(grant.mock.calls).toEqual([[single.id]]);
  });

  it("records history, reward and quota once in continuous practice and accepts the next question", async () => {
    const next = { ...single, id: "answer-once-next", qNumber: 2 };
    const grant = mockPractice(single, next);
    const reward = vi.spyOn(studyReward, "recordStudyReward");
    render(<StrictMode><QuizClient billingGateEnabled poolIds={[single.id, next.id]} mode="year" exam="ip" backHref="/ip" /></StrictMode>);
    const [first, second] = await screen.findAllByRole("radio");
    answerBeforeRender(first, second, "2");
    expectHistory(single, "ア");
    expect(first).toBeChecked();
    expect(getLearningActions().map(action => action.questionId)).toEqual([single.id]);
    expect(reward).toHaveBeenCalledTimes(1);
    expect(grant.mock.calls).toEqual([[single.id]]);

    fireEvent.click(screen.getByRole("button", { name: "次の問題へ" }));
    await waitFor(() => expect(grant.mock.calls).toEqual([[single.id], [next.id]]));
    const [nextChoice] = await screen.findAllByRole("radio");
    await waitFor(() => expect(nextChoice).toBeEnabled());
    fireEvent.click(nextChoice);
    expect(createHistoryStore().getAllEntries().map(entry => entry.id)).toEqual([single.id, next.id]);
    expect(reward).toHaveBeenCalledTimes(2);
    expect(grant.mock.calls).toEqual([[single.id], [next.id]]);
  });

  it("records one history entry, learning action and quota grant in today's quiz", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-11-17T12:00:00+09:00"));
    window.history.replaceState({}, "", "/quiz/today?plan=answer-once");
    savePacePlan(createPacePlan({ id: "answer-once", exam: "ip", sessionId: null, examDate: "2026-11-20", startDate: "2026-11-01" }, [single], "2026-11-01T00:00:00+09:00"));
    const grant = mockPractice(single);
    render(<StrictMode><TodayQuiz planId="answer-once" billingGateEnabled /></StrictMode>);
    expect(await screen.findByRole("heading", { name: "計画の問題 · 1問" }, todayQuizWait)).toBeInTheDocument();
    const [first, second] = await screen.findAllByRole("radio", {}, todayQuizWait);
    answerBeforeRender(first, second, "2");
    await waitFor(() => {
      expectHistory(single, "ア");
      expect(getLearningActions().map(action => action.questionId)).toEqual([single.id]);
      expect(grant.mock.calls).toEqual([[single.id]]);
    }, todayQuizWait);
  });

  it("records one history entry in the stream when the practice gate is off", () => {
    const grant = mockPractice(single);
    render(<StrictMode><StreamQuizPlayer questions={[single]} /></StrictMode>);
    const first = screen.getByRole("button", { name: /^ア A/ });
    answerBeforeRender(first, first, "2");
    expectHistory(single, "ア");
    expect(getLearningActions().map(action => action.questionId)).toEqual([single.id]);
    expect(grant).not.toHaveBeenCalled();
  });

  it("continues a fixed batch at the first ungraded question and restores its final score", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-11-17T12:00:00+09:00"));
    const next = { ...single, id: "answer-once-next", qNumber: 2 };
    const catalog = [single, next];
    savePacePlan(createPacePlan({ id: "resume", exam: "ip", sessionId: null, examDate: "2026-11-18", startDate: "2026-11-17" }, catalog, new Date().toISOString()));
    window.history.replaceState({}, "", "/quiz/today?plan=resume");
    const grants = mockPractice(...catalog);
    const open = () => render(<TodayQuiz planId="resume" billingGateEnabled />);
    const first = open();
    fireEvent.click((await screen.findAllByRole("radio", {}, todayQuizWait))[0]);
    first.unmount();
    const second = open();
    fireEvent.click((await screen.findAllByRole("radio", {}, todayQuizWait))[1]);
    second.unmount();
    open();
    expect(await screen.findByRole("heading", { name: "2問中1問正解" }, todayQuizWait)).toBeVisible();
    expect(grants.mock.calls).toEqual([[single.id], [next.id]]);
    expect(createHistoryStore().getAllEntries().map(entry => entry.id)).toEqual([single.id, next.id]);
  });

  it("saves the first grade, one reward and one paper grant in today's library practice", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-11-17T12:00:00+09:00"));
    window.history.replaceState({}, "", "/quiz/today?plan=library-once");
    const paperQuestion: CatalogQuestion & ExamQuestion = {
      id: "lckohyo-TEST-q1", exam: "dai-1-shu-eisei-kanrisha", year: 2026, season: "published", session: "test", qNumber: 1,
      paperId: "lckohyo-TEST", paperTitle: "テスト回", number: 1, choiceCount: 3, answerAuthority: "official", scorable: true,
      text: "公表問題形式のテスト問題", images: [], correctChoice: 1, explanation: "公表問題形式の解説",
      pdfUrl: "https://example.test/questions.pdf", indexUrl: "https://example.test/index",
    };
    savePacePlan(createPacePlan({ id: "library-once", exam: paperQuestion.exam, sessionId: null, examDate: "2026-11-20", startDate: "2026-11-01" }, [paperQuestion], "2026-11-01T00:00:00+09:00"));
    const grant = mockPractice(paperQuestion);
    const reward = vi.spyOn(studyReward, "recordStudyReward");
    render(<StrictMode><TodayQuiz planId="library-once" billingGateEnabled /></StrictMode>);
    await screen.findByText(paperQuestion.text, {}, { timeout: 5000 });
    const [first, second] = screen.getAllByRole("radio");
    answerBeforeRender(first, second, "2");
    expect(first).toBeChecked();
    await waitFor(() => {
      expect(getLearningActions()).toMatchObject([{ questionId: paperQuestion.id, kind: "answer", correct: true }]);
      expect(reward).toHaveBeenCalledTimes(1);
      expect(grant.mock.calls).toEqual([[paperQuestion.id]]);
    }, { timeout: 5000 });
  });

  it("records one history entry and quota grant only when both choices are selected", async () => {
    const grant = mockPractice(multiple);
    openInline(multiple);
    await waitFor(() => expect(grant.mock.calls).toEqual([[multiple.id]]));
    const [first, second, third] = screen.getAllByRole("checkbox");
    fireEvent.click(first);
    expect(createHistoryStore().getAllEntries()).toHaveLength(0);
    answerBeforeRender(second, third, "3");
    expectHistory(multiple, "ア・イ");
    expect(second).toBeChecked();
    expect(third).not.toBeChecked();
    expect(grant.mock.calls).toEqual([[multiple.id]]);
  });

  it("records one history entry and quota grant when an ordering form submits twice", async () => {
    const grant = mockPractice(ordering);
    render(<StrictMode><QuizClient billingGateEnabled poolIds={[ordering.id]} mode="year" exam="ip" backHref="/ip" /></StrictMode>);
    const form = await screen.findByRole("form", { name: "順序を並べる" });
    const slots = screen.getAllByRole("combobox");
    ["ウ", "ア", "イ"].forEach((value, i) => fireEvent.change(slots[i], { target: { value } }));
    act(() => {
      fireEvent.submit(form);
      fireEvent.submit(form);
    });
    expectHistory(ordering, "ウ→ア→イ");
    expect(getLearningActions().map(action => action.questionId)).toEqual([ordering.id]);
    expect(grant.mock.calls).toEqual([[ordering.id]]);
  });
});
