import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LS_KEYS } from "@/lib/storage/keys";
import { createPacePlan } from "@/lib/study-plan/pace";
import { getLearningActions, listPacePlans, recordLearningAction, savePacePlan } from "@/lib/study-plan/pace-storage";
import { syncPacePlans, startPaceAutoSync } from "@/lib/study-plan/pace-sync";

const mocks = vi.hoisted(() => ({ session: vi.fn(), ownership: vi.fn() }));
vi.mock("@/lib/sync/ownership", () => ({ readSyncAccount: mocks.session, readOwnership: mocks.ownership }));
const plan = createPacePlan({ id: "pace-1", exam: "ap", sessionId: "next", startDate: "2026-11-17", examDate: "2026-12-17" }, [], "2026-11-17T12:00:00+09:00");
beforeEach(() => {
  localStorage.clear(); mocks.session.mockReset(); mocks.ownership.mockReset();
  mocks.session.mockResolvedValue({ id: "A" }); mocks.ownership.mockReturnValue("unknown");
});
afterEach(() => { vi.unstubAllGlobals(); vi.useRealTimers(); });
describe("automatic StudyPlan-only sync", () => {
  it("leaves guests local and makes no cloud request", async () => {
    savePacePlan(plan); mocks.session.mockResolvedValue(null);
    const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher);
    expect(await syncPacePlans()).toBe("local-only"); expect(fetcher).not.toHaveBeenCalled();
    expect(listPacePlans()).toEqual([plan]);
  });
  it("auto-imports this feature without enabling legacy data sync", async () => {
    savePacePlan(plan);
    const fetcher = vi.fn().mockImplementation(async () => Response.json({ entries: [], merged: 0, total: 0 })); vi.stubGlobal("fetch", fetcher);
    expect(await syncPacePlans()).toBe("ok");
    const bodies = fetcher.mock.calls.map(call => JSON.parse(call[1].body));
    expect(bodies[0]).toEqual({ entries: [], expectedUserId: "A", includePace: true });
    expect(bodies[1].entries[0].payload).toEqual(plan);
    expect(localStorage.getItem(LS_KEYS.syncLocalOwner)).toBeNull();
    expect(localStorage.getItem(LS_KEYS.paceSyncOwner)).toBe("A");
  });
  it.each(["pace", "legacy"])("never uploads another %s owner's data", async type => {
    if (type === "pace") localStorage.setItem(LS_KEYS.paceSyncOwner, "B");
    else mocks.ownership.mockReturnValue("different");
    savePacePlan(plan); const fetcher = vi.fn(); vi.stubGlobal("fetch", fetcher);
    expect(await syncPacePlans()).toBe("local-only"); expect(fetcher).not.toHaveBeenCalled();
  });
  it("rejects a late response after the login account changes", async () => {
    mocks.session.mockResolvedValueOnce({ id: "A" }).mockResolvedValue({ id: "B" });
    const fetcher = vi.fn().mockResolvedValue(Response.json({ entries: [{ id: plan.id, payload: plan, updatedAt: Date.parse(plan.updatedAt) }] }));
    vi.stubGlobal("fetch", fetcher);
    expect(await syncPacePlans()).toBe("local-only"); expect(listPacePlans()).toEqual([]);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });
  it("unions server activity before sending, retaining answers made while waiting", async () => {
    const action = { id: "local", questionId: "q", exam: "ap", at: Date.now(), kind: "answer" as const, activeMs: 6000, correct: true };
    recordLearningAction(action);
    const remote = { id: "remote", payload: { kind: "study-activity-v1" }, updatedAt: Date.now(), progress: {
      kind: "study-activity-v1", id: "remote", updatedAt: new Date().toISOString(), actions: [{ ...action, id: "remote" }],
    } };
    const fetcher = vi.fn().mockImplementation(async (_url, options) => {
      const body = JSON.parse(options.body);
      if (!body.entries.length) recordLearningAction({ ...action, id: "during" });
      return Response.json({ entries: [remote] });
    });
    vi.stubGlobal("fetch", fetcher);
    expect(await syncPacePlans()).toBe("ok");
    expect(getLearningActions()).toHaveLength(3);
    expect(JSON.parse(fetcher.mock.calls[1][1].body).entries[0].progress.actions).toHaveLength(3);
  });
  it.each([401, 409, 503])("keeps all local data after HTTP %i", async status => {
    savePacePlan(plan); vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status })));
    expect(await syncPacePlans()).toBe("retry"); expect(listPacePlans()).toEqual([plan]);
  });
  it("debounces changes and cancels listeners/timers on cleanup", async () => {
    vi.useFakeTimers(); mocks.session.mockResolvedValue(null);
    const stop = startPaceAutoSync();
    savePacePlan(plan); window.dispatchEvent(new Event("study-plan:changed"));
    await vi.advanceTimersByTimeAsync(1999); expect(mocks.session).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1); expect(mocks.session).toHaveBeenCalledTimes(1);
    window.dispatchEvent(new Event("online")); stop();
    await vi.advanceTimersByTimeAsync(3000); expect(mocks.session).toHaveBeenCalledTimes(1);
  });
});
