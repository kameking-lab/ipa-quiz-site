import { beforeEach, describe, expect, it, vi } from "vitest";
import { LS_KEYS } from "@/lib/storage/keys";
import { createPacePlan, latestAnswers } from "@/lib/study-plan/pace";
import { dailyLearningPoints } from "@/lib/study-plan/activity";
import { deletePacePlan, getLearningActions, getPaceAttempts, getPaceSyncEntries, listPacePlans, mergePaceSyncEntries, recordLearningAction, savePacePlan } from "@/lib/study-plan/pace-storage";

const plan = () => createPacePlan({ id: "p", exam: "new-exam", sessionId: null, startDate: "2026-11-17", examDate: null }, [], "2026-11-17T12:00:00+09:00");
beforeEach(() => { localStorage.clear(); vi.restoreAllMocks(); });
describe("guest persistence and JSON StudyPlan sync", () => {
  it("saves a manual/on-demand plan locally without login", () => {
    expect(savePacePlan(plan())).toBe(true);
    expect(listPacePlans()).toEqual([plan()]);
    expect(getPaceSyncEntries()[0]).toMatchObject({ id: "p", payload: plan() });
  });
  it("keeps repeat attempts for mastery without awarding repeat points on reload", () => {
    const answer = { questionId: "ip-q1", exam: "ip", kind: "answer" as const, activeMs: 6000,
      at: Date.parse("2026-11-17T12:00:00+09:00"), correct: true };
    recordLearningAction({ ...answer, id: "first" });
    recordLearningAction({ ...answer, id: "after-reload", at: answer.at + 60000 });
    expect(latestAnswers(getPaceAttempts(), Infinity).get("ip-q1")?.correct).toBe(true);
    expect(dailyLearningPoints(getLearningActions())[0]).toMatchObject({ minutes: 3, answers: 1 });
    recordLearningAction({ ...answer, id: "failed-confirmation", correct: false, at: answer.at + 120000 });
    expect(latestAnswers(getPaceAttempts(), Infinity).get("ip-q1")?.correct).toBe(false);
    expect(dailyLearningPoints(getLearningActions())[0]).toMatchObject({ minutes: 3, answers: 1 });
    expect(getLearningActions()).toHaveLength(3);
  });
  it("uses updatedAt instead of createdAt for plan edits", () => {
    savePacePlan(plan());
    const edited = { ...plan(), examDate: "2026-12-17", updatedAt: "2026-11-18T00:00:00Z" };
    savePacePlan(edited);
    expect(getPaceSyncEntries()).toHaveLength(1);
    expect(getPaceSyncEntries()[0].updatedAt).toBe(Date.parse(edited.updatedAt));
  });
  it("round-trips exam date provenance and accepts plans saved before it was recorded", () => {
    const legacy = { ...plan(), examDate: "2026-12-17" };
    expect(savePacePlan(legacy)).toBe(true);
    expect(listPacePlans()[0]).toEqual(legacy);
    const tentative = { ...legacy, examDateSource: "tentative" as const, updatedAt: "2026-11-18T00:00:00Z" };
    expect(savePacePlan(tentative)).toBe(true);
    const entries = getPaceSyncEntries();
    localStorage.clear();
    mergePaceSyncEntries(entries);
    expect(listPacePlans()).toEqual([tentative]);
  });
  it("retains tombstones and does not resurrect a deleted cloud plan", () => {
    savePacePlan(plan()); deletePacePlan("p");
    mergePaceSyncEntries([{ id: "p", payload: plan(), updatedAt: Date.now() + 1000 }]);
    expect(listPacePlans()).toEqual([]);
    expect(getPaceSyncEntries()[0].payload).toEqual({ kind: "deleted-exam-pace-v1" });
  });
  it("merges newer plans but never imports a malformed/wrong-id payload", () => {
    const newer = { ...plan(), updatedAt: "2026-11-19T00:00:00Z", examDate: "2026-12-17" };
    savePacePlan(plan());
    mergePaceSyncEntries([{ id: "p", payload: newer, updatedAt: Date.parse(newer.updatedAt) },
      { id: "bad", payload: { ...newer, examDate: "2026-02-30" }, updatedAt: Date.now() },
      { id: "wrong", payload: newer, updatedAt: Date.now() }]);
    expect(listPacePlans()).toEqual([newer]);
  });
  it("keeps the chosen weekdays on a later old-device update", () => {
    const legacy = plan();
    const raw = JSON.stringify([legacy]);
    localStorage.setItem(LS_KEYS.pacePlans, raw);
    expect(listPacePlans()[0].studyWeekdays).toBeUndefined();
    expect(localStorage.getItem(LS_KEYS.pacePlans)).toBe(raw);
    expect(savePacePlan({ ...legacy, studyWeekdays: [1, 3, 5] })).toBe(true);
    for (const invalid of [[], [1, 1], [7], [1.5]]) expect(savePacePlan({ ...legacy, studyWeekdays: invalid })).toBe(false);
    const updatedAt = "2026-11-18T00:00:00Z";
    mergePaceSyncEntries([{ id: legacy.id, updatedAt: Date.parse(updatedAt), payload: { ...legacy, updatedAt, examDate: "2026-12-17" } }]);
    expect(listPacePlans()).toMatchObject([{ id: legacy.id, updatedAt, examDate: "2026-12-17", studyWeekdays: [1, 3, 5] }]);
  });
  it("unions actions from multiple devices with no duplicate minutes", () => {
    const action = { id: "a", questionId: "ap-1", exam: "ap", at: 1794870000000, kind: "answer" as const, activeMs: 5000, correct: true };
    recordLearningAction(action);
    const state = { kind: "study-activity-v1", id: "remote", updatedAt: "2026-11-18T00:00:00Z", actions: [action, { ...action, id: "b", questionId: "ap-2", correct: false }] };
    mergePaceSyncEntries([{ id: "remote", payload: { kind: "study-activity-v1" }, progress: state, updatedAt: Date.now() }]);
    mergePaceSyncEntries([{ id: "remote", payload: { kind: "study-activity-v1" }, progress: state, updatedAt: Date.now() }]);
    expect(getLearningActions()).toHaveLength(2);
    expect(getPaceAttempts()).toHaveLength(2);
    expect(dailyLearningPoints(getLearningActions())[0].minutes).toBe(6);
    expect(JSON.parse(localStorage.getItem(LS_KEYS.learningPoints)!)[0].minutes).toBe(6);
    expect(getPaceSyncEntries().filter(entry => entry.progress)).toHaveLength(1);
  });
  it("ignores corrupted local JSON and malformed actions", () => {
    localStorage.setItem(LS_KEYS.pacePlans, "{}"); localStorage.setItem(LS_KEYS.learningActivity, "[broken");
    expect(listPacePlans()).toEqual([]); expect(getLearningActions()).toEqual([]);
    expect(recordLearningAction({ id: "bad", questionId: "q", exam: "ap", at: NaN, kind: "answer" })).toBe(false);
  });
  it("returns an explicit persistence failure when storage is unavailable", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("quota"); });
    expect(savePacePlan(plan())).toBe(false);
  });
  it("does not trigger another automatic sync on cloud merge", () => {
    const listener = vi.fn(); window.addEventListener("study-plan:changed", listener);
    mergePaceSyncEntries([]);
    expect(listener).not.toHaveBeenCalled();
    savePacePlan(plan()); expect(listener).toHaveBeenCalledTimes(1);
    window.removeEventListener("study-plan:changed", listener);
  });
});
