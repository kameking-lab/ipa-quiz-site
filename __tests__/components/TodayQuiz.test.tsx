import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { TodayQuiz } from "@/app/quiz/today/TodayQuiz";
import { createPacePlan } from "@/lib/study-plan/pace";
import { savePacePlan } from "@/lib/study-plan/pace-storage";
import { LS_KEYS } from "@/lib/storage/keys";
import type { CatalogQuestion } from "@/lib/study-plan/client";

const catalog: CatalogQuestion[] = Array.from({ length: 200 }, (_, i) => ({ id: `ip-2026h-am-q${i + 1}`, exam: "ip", year: 2026, season: "spring", session: "am", qNumber: i + 1 }));
const captured = vi.hoisted(() => ({ props: null as { poolIds: string[]; mode: string; billingGateEnabled: boolean } | null }));
vi.mock("@/app/quiz/QuizClient", () => ({ QuizClient: (props: typeof captured.props) => { captured.props = props; return <div>player</div>; } }));
vi.mock("@/lib/study-plan/client", async () => {
  const actual = await vi.importActual<typeof import("@/lib/study-plan/client")>("@/lib/study-plan/client");
  return { ...actual, loadPlanCatalog: async () => catalog };
});
beforeEach(() => {
  localStorage.clear(); sessionStorage.clear(); captured.props = null;
  window.history.replaceState({}, "", "/quiz/today?plan=p");
  vi.useFakeTimers({ toFake: ["Date"] }); vi.setSystemTime(new Date("2026-11-17T12:00:00+09:00"));
  vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ entitled: false }))));
  savePacePlan(createPacePlan({ id: "p", exam: "ip", sessionId: null, examDate: "2026-11-20", startDate: "2026-11-01" }, catalog, "2026-11-01T00:00:00+09:00"));
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });
it("keeps due→resume→new→confirmation order and the existing access gate", async () => {
  localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: [{ id: catalog[0].id, correct: true, at: 1 }, { id: catalog[6].id, correct: false, at: 2 }], starredIds: [] }));
  localStorage.setItem(LS_KEYS.lastQuestion, JSON.stringify({ exam: "ip", year: 2026, season: "spring", session: "am", qNumber: 3, answeredAt: 3 }));
  localStorage.setItem(LS_KEYS.spacedRepetition, JSON.stringify({ cards: { [catalog[6].id]: { id: catalog[6].id, dueAt: 2 } } }));
  render(<TodayQuiz planId="p" billingGateEnabled />);
  await screen.findByText("player");
  expect(captured.props?.poolIds).toHaveLength(10);
  expect(captured.props?.poolIds.slice(0, 2)).toEqual([catalog[6].id, catalog[3].id]);
  expect(captured.props?.poolIds[9]).toBe(catalog[0].id);
  expect(captured.props).toMatchObject({ mode: "year", billingGateEnabled: true });
});
it("deducts answers in other qualifications from the free day's allowance", async () => {
  localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: Array.from({ length: 7 }, (_, i) => ({ id: `ap-q${i}`, correct: false, at: Date.now() + i * 1000 })), starredIds: [] }));
  render(<TodayQuiz planId="p" billingGateEnabled />);
  await screen.findByText("player"); expect(captured.props?.poolIds).toHaveLength(3);
});
it("uses the confirmed paid entitlement for the full target", async () => {
  vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ entitled: true }))));
  render(<TodayQuiz planId="p" billingGateEnabled />);
  await screen.findByText("player"); expect(captured.props?.poolIds).toHaveLength(67);
});
it("does not start another question after the free day's allowance", async () => {
  localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: Array.from({ length: 10 }, (_, i) => ({ id: `ap-q${i}`, correct: false, at: Date.now() + i * 1000 })), starredIds: [] }));
  render(<TodayQuiz planId="p" billingGateEnabled />);
  await screen.findByRole("heading", { name: "今日も、おつかれさまでした" });
  expect(captured.props).toBeNull();
});
it("reports a missing plan without starting a fallback qualification", async () => {
  render(<TodayQuiz planId="missing" billingGateEnabled />);
  await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("学習計画が見つかりませんでした"));
  expect(captured.props).toBeNull();
});
it("keeps the selected pool after reload even when its current question became correct", async () => {
  window.history.replaceState({}, "", `/quiz/today?plan=p&question=${catalog[0].id}`);
  sessionStorage.setItem(LS_KEYS.paceBatchPrefix + "p", JSON.stringify({ day: "2026-11-17", ids: [catalog[0].id, catalog[7].id, catalog[4].id] }));
  localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: [{ id: catalog[0].id, correct: true, at: Date.now() }], starredIds: [] }));
  render(<TodayQuiz planId="p" billingGateEnabled />);
  await screen.findByText("player");
  expect(captured.props?.poolIds).toEqual([catalog[0].id, catalog[7].id, catalog[4].id]);
});
