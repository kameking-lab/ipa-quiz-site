import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { Question } from "@/lib/questions/types";
import { nurseNumericQuestion } from "@/__tests__/fixtures/nurse-numeric-question";

const { historyStore } = vi.hoisted(() => ({ historyStore: {
  getAllEntries: vi.fn(() => []), getWrongIds: vi.fn((): string[] => []),
  getStarredIds: vi.fn((): string[] => []), getAnsweredIds: vi.fn((): string[] => []),
} }));
vi.mock("@/lib/storage/history", () => ({ createHistoryStore: () => historyStore }));
vi.mock("@/lib/motivation/session", () => ({ startSession: vi.fn() }));
vi.mock("@/lib/learning/spaced-repetition", () => ({ orderByPriority: (ids: string[]) => [...ids].reverse() }));
vi.mock("@/components/quiz/QuizPlayer", () => ({
  QuizPlayer: ({ question, index, total, onNext }: { question: Question | null; index: number; total: number; onNext: () => void }) => (
    <div><output data-testid="position">{index + 1}/{total}</output>
      <output data-testid="question">{question?.id ?? "loading"}</output>
      <button onClick={onNext}>next</button></div>
  ),
}));
import { QuizClient } from "@/app/quiz/QuizClient";

const fullPool = Array.from({ length: 120 }, (_, i) => `kangoshi-2025-annual-am-q${i + 1}`);
const partialPool = fullPool.filter((id) => ![32, 79, 92, 99, 103, 109].includes(Number(id.split("-q")[1])));
const baseUrl = "/quiz?exam=kangoshi&mode=year&year=2025&season=annual&session=am&order=1";
const sessionKey = (base: string) => `ipa-quiz:active-pool:v1:${base}`;
const mountYear = (poolIds = fullPool, initialQuestionId?: string) => render(
  <QuizClient poolIds={poolIds} initialQuestionId={initialQuestionId} mode="year" exam="kangoshi" backHref="/kangoshi/2025-annual" />,
);
async function expectQuestion(id: string, position: string) {
  await waitFor(() => expect(screen.getByTestId("question")).toHaveTextContent(id));
  expect(screen.getByTestId("position")).toHaveTextContent(position);
  expect(new URL(window.location.href).searchParams.get("question")).toBe(id);
}

beforeEach(() => {
  sessionStorage.clear();
  window.history.replaceState(null, "", baseUrl);
  historyStore.getWrongIds.mockReturnValue([]);
  historyStore.getStarredIds.mockReturnValue([]);
  historyStore.getAnsweredIds.mockReturnValue([]);
  vi.stubGlobal("fetch", vi.fn(async (url: string) => {
    const id = new URL(url, window.location.origin).searchParams.get("id")!;
    return { ok: true, json: async () => ({ ...nurseNumericQuestion, id }) };
  }));
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe("annual original session completeness", () => {
  it.each([{ pool: fullPool }, { pool: partialPool }])("opens Q107 at its original ordered position in a complete annual pool", async ({ pool }) => {
    mountYear(pool, fullPool[106]);
    await expectQuestion(fullPool[106], `${pool.indexOf(fullPool[106]) + 1}/${pool.length}`);
    expect(JSON.parse(sessionStorage.getItem(sessionKey(baseUrl))!)).toEqual(pool);
    fireEvent.click(screen.getByRole("button", { name: "next" }));
    const nextId = pool[pool.indexOf(fullPool[106]) + 1];
    await expectQuestion(nextId, `${pool.indexOf(nextId) + 1}/${pool.length}`);
  });

  it("traverses all 120 originals without the previous cutoff at 80", async () => {
    mountYear();
    for (let i = 0; i < fullPool.length; i++) {
      await expectQuestion(fullPool[i], `${i + 1}/120`);
      if (i < fullPool.length - 1) fireEvent.click(screen.getByRole("button", { name: "next" }));
    }
    expect(JSON.parse(sessionStorage.getItem(sessionKey(baseUrl))!)).toEqual(fullPool);
  });

  it("reloads Q108 in a saved 120-original session at the same position", async () => {
    const player = mountYear(fullPool, fullPool[106]);
    await expectQuestion(fullPool[106], "107/120");
    fireEvent.click(screen.getByRole("button", { name: "next" }));
    await expectQuestion(fullPool[107], "108/120");
    player.unmount();
    mountYear();
    await expectQuestion(fullPool[107], "108/120");
    expect(JSON.parse(sessionStorage.getItem(sessionKey(baseUrl))!)).toEqual(fullPool);
  });

  it("replaces a legacy 80-original pool with the latest ordered 114 originals", async () => {
    const legacy = [fullPool[106], ...partialPool.filter((id) => id !== fullPool[106])].slice(0, 80);
    sessionStorage.setItem(sessionKey(baseUrl), JSON.stringify(legacy));
    mountYear(partialPool, fullPool[106]);
    await expectQuestion(fullPool[106], `${partialPool.indexOf(fullPool[106]) + 1}/114`);
    expect(JSON.parse(sessionStorage.getItem(sessionKey(baseUrl))!)).toEqual(partialPool);
  });

  it("expands a previously complete saved pool after new originals are added", async () => {
    sessionStorage.setItem(sessionKey(baseUrl), JSON.stringify(partialPool));
    mountYear(fullPool, fullPool[54]);
    await expectQuestion(fullPool[54], "55/120");
    expect(JSON.parse(sessionStorage.getItem(sessionKey(baseUrl))!)).toEqual(fullPool);
  });

  it("rejects a reordered full saved annual pool and retains source order", async () => {
    sessionStorage.setItem(sessionKey(baseUrl), JSON.stringify([...fullPool].reverse()));
    mountYear(fullPool, fullPool[106]);
    await expectQuestion(fullPool[106], "107/120");
    expect(JSON.parse(sessionStorage.getItem(sessionKey(baseUrl))!)).toEqual(fullPool);
  });

  it("retains all annual originals and the exact question with unavailable storage", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
    mountYear(fullPool, fullPool[106]);
    await expectQuestion(fullPool[106], "107/120");
  });

  it("keeps the existing 80-original random pool and restores its saved order", async () => {
    const base = "/quiz?exam=kangoshi&mode=random";
    window.history.replaceState(null, "", `${base}&question=${fullPool[118]}`);
    const saved = [...fullPool].reverse().slice(0, 80);
    sessionStorage.setItem(sessionKey(base), JSON.stringify(saved));
    render(<QuizClient poolIds={fullPool} mode="random" exam="kangoshi" backHref="/kangoshi" />);
    await expectQuestion(fullPool[118], "2/80");
    expect(JSON.parse(sessionStorage.getItem(sessionKey(base))!)).toEqual(saved);
  });

  it("preserves review filtering, priority order, and the existing shorter limit", async () => {
    historyStore.getWrongIds.mockReturnValue(fullPool.slice(10));
    window.history.replaceState(null, "", "/quiz?exam=kangoshi&mode=review");
    render(<QuizClient poolIds={fullPool} mode="review" exam="kangoshi" backHref="/kangoshi" />);
    await expectQuestion(fullPool[119], "1/80");
    expect(JSON.parse(sessionStorage.getItem(sessionKey("/quiz?exam=kangoshi&mode=review"))!)).toEqual(fullPool.slice(10).reverse().slice(0, 80));
  });
});
