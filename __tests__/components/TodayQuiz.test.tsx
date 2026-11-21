import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { TodayQuiz } from "@/app/quiz/today/TodayQuiz";
import { createPacePlan } from "@/lib/study-plan/pace";
import { savePacePlan } from "@/lib/study-plan/pace-storage";
import { createHistoryStore } from "@/lib/storage/history";
import { LS_KEYS } from "@/lib/storage/keys";

const captured = vi.hoisted(() => ({ ids: [] as string[], gated: false }));
vi.mock("@/app/quiz/QuizClient", () => ({
  QuizClient: ({ poolIds, billingGateEnabled }: { poolIds: string[]; billingGateEnabled: boolean }) => {
    captured.ids = poolIds; captured.gated = billingGateEnabled;
    return <p>player</p>;
  },
}));
const catalog = Array.from({ length: 200 }, (_, n) => ({ id: "ip-q" + n, exam: "ip", year: 2026, season: "autumn", session: "am", qNumber: n + 1 }));
const now = Date.parse("2026-11-17T10:00:00+09:00");
const plan = createPacePlan({ id: "p", exam: "ip", sessionId: null, examDate: "2026-11-20", startDate: "2026-11-01" }, catalog, "2026-11-01T00:00:00Z");
const answer = (i: number, correct: boolean) => createHistoryStore().record({ id: catalog[i].id, correct, at: now, selected: "ア" });

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] }); vi.setSystemTime(now);
  localStorage.clear(); sessionStorage.clear(); captured.ids = []; captured.gated = false;
  window.history.replaceState({}, "", "/quiz/today?plan=p");
  savePacePlan(plan);
  vi.stubGlobal("fetch", vi.fn(async () => Response.json({ questions: catalog })));
});
afterEach(() => { cleanup(); vi.useRealTimers(); vi.unstubAllGlobals(); });
it.each([false, true])("takes the common target independent of the billing gate (%s)", async gated => {
  for (let i = 0; i < 10; i++) answer(i, true);
  answer(90, false);
  render(<TodayQuiz planId="p" billingGateEnabled={gated} />);
  await screen.findByText("player");
  expect(captured.ids).toEqual([catalog[90].id, ...catalog.slice(10, 73).map(q => q.id)]);
  expect(captured.gated).toBe(gated);
  expect(vi.mocked(fetch).mock.calls).toHaveLength(1);
});
it("uses one ID per wrong or starred question, without a plan or paid allowance", async () => {
  localStorage.removeItem(LS_KEYS.pacePlans);
  answer(5, false); answer(10, true); createHistoryStore().toggleStar(catalog[5].id); createHistoryStore().toggleStar(catalog[10].id);
  render(<TodayQuiz planId="" weakExam="ip" billingGateEnabled />);
  await screen.findByText("player");
  expect(captured.ids).toEqual([catalog[5].id, catalog[10].id]);
});
it("shows empty rather than refilling with correct questions", async () => {
  localStorage.setItem(LS_KEYS.history, JSON.stringify({ entries: catalog.map(q => ({ id: q.id, correct: true, at: now })), starredIds: [] }));
  render(<TodayQuiz planId="p" billingGateEnabled />);
  await screen.findByRole("heading", { name: "この計画で解く問題はありません" });
  expect(captured.ids).toEqual([]);
});
it("reports missing plans and retries an unavailable catalog", async () => {
  const missing = render(<TodayQuiz planId="missing" billingGateEnabled />);
  expect(await screen.findByRole("alert")).toHaveTextContent("学習計画が見つかりませんでした");
  missing.unmount();
  vi.mocked(fetch).mockRejectedValueOnce(new Error("offline"));
  render(<TodayQuiz planId="p" billingGateEnabled />);
  expect(await screen.findByRole("alert")).toHaveTextContent("offline");
  expect(screen.getByRole("button", { name: "再読み込み" })).toBeVisible();
});
it("resumes the frozen list even when its current question became correct", async () => {
  window.history.replaceState({}, "", "/quiz/today?list=weak&exam=ip&question=" + catalog[0].id);
  const scope = JSON.stringify(["ip", "", true, null]);
  const ids = [catalog[0].id, catalog[7].id, catalog[4].id];
  sessionStorage.setItem(LS_KEYS.paceBatchPrefix + "weak:ip", JSON.stringify({ scope, day: "2026-11-17", ids }));
  answer(0, true); answer(7, false); answer(4, false);
  render(<TodayQuiz planId="" weakExam="ip" billingGateEnabled />);
  await screen.findByText("player");
  expect(captured.ids).toEqual(ids);
});
it("discards a resume from a different range", async () => {
  window.history.replaceState({}, "", "/quiz/today?plan=p&question=" + catalog[0].id);
  sessionStorage.setItem(LS_KEYS.paceBatchPrefix + "p",
    JSON.stringify({ scope: JSON.stringify(["ip", "p", false, 2025]), day: "2026-11-17", ids: [catalog[0].id] }));
  answer(0, true);
  render(<TodayQuiz planId="p" billingGateEnabled />);
  await screen.findByText("player");
  expect(captured.ids).not.toContain(catalog[0].id);
  expect(location.search).not.toContain("question=");
});
