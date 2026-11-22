import type { ActionPerformed, LocalNotificationSchema, ScheduleOptions } from "@capacitor/local-notifications";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { createPacePlan, type PacePlan } from "@/lib/study-plan/pace";
import {
  changeStudyReminder, clearStudyReminders, observeStudyReminderTap, readStudyReminder, refreshStudyReminders,
  startWebStudyReminders, supportsStudyReminders,
} from "../src/study-reminders";

const mocks = vi.hoisted(() => ({
  device: { isNativePlatform: vi.fn(), getPlatform: vi.fn(), isPluginAvailable: vi.fn() },
  app: { addListener: vi.fn() },
  plugin: { getPending: vi.fn(), cancel: vi.fn(), schedule: vi.fn(), checkPermissions: vi.fn(), requestPermissions: vi.fn(), addListener: vi.fn() },
  storage: { get: vi.fn(), set: vi.fn() }, plans: vi.fn(), attempts: vi.fn(),
}));
vi.mock("@capacitor/core", () => ({ Capacitor: mocks.device }));
vi.mock("@capacitor/app", () => ({ App: mocks.app }));
vi.mock("@capacitor/local-notifications", () => ({ LocalNotifications: mocks.plugin }));
vi.mock("@capacitor/preferences", () => ({ Preferences: mocks.storage }));
vi.mock("@/lib/study-plan/pace-storage", () => ({ listPacePlans: mocks.plans }));
vi.mock("@/lib/study-plan/client", () => ({ paceAttempts: mocks.attempts }));

const now = new Date(2026, 10, 23, 9);
const { plugin, storage } = mocks;
const legacy = { id: 11003, title: "既存の復習通知", body: "復習", schedule: { on: { hour: 20 }, repeats: true } };
const plan = createPacePlan({ id: "plan-a", exam: "ap", examDate: "2026-12-06", startDate: "2026-11-23", studyWeekdays: [1], sessionId: null },
  [{ id: "q1", exam: "ap", year: 2026 }, { id: "q2", exam: "ap", year: 2026 }], now.toISOString());
let store: string | null;
let pending: Map<number, LocalNotificationSchema>;

beforeEach(() => {
  vi.resetAllMocks();
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(now);
  vi.stubGlobal("window", Object.assign(new EventTarget(), { Capacitor: mocks.device }));
  mocks.device.isNativePlatform.mockReturnValue(true);
  mocks.device.getPlatform.mockReturnValue("ios");
  mocks.device.isPluginAvailable.mockReturnValue(true);
  mocks.plans.mockReturnValue([plan]);
  mocks.attempts.mockReturnValue([]);
  store = null;
  pending = new Map([[legacy.id, legacy]]);
  storage.get.mockImplementation(async () => ({ value: store }));
  storage.set.mockImplementation(async ({ value }: { value: string }) => { store = value; });
  plugin.getPending.mockImplementation(async () => ({ notifications: [...pending.values()] }));
  plugin.schedule.mockImplementation(async ({ notifications }: ScheduleOptions) => {
    for (const entry of notifications) pending.set(entry.id, entry);
    return { notifications: notifications.map(({ id }) => ({ id })) };
  });
  plugin.cancel.mockImplementation(async ({ notifications }: { notifications: { id: number }[] }) => {
    for (const { id } of notifications) pending.delete(id);
  });
  plugin.checkPermissions.mockResolvedValue({ display: "granted" });
});

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); });

it("only prompts when enabling and sends one-shot iOS payloads with exact IDs, times and text", async () => {
  plugin.checkPermissions.mockResolvedValue({ display: "prompt" });
  plugin.requestPermissions.mockImplementation(async () => {
    plugin.checkPermissions.mockResolvedValue({ display: "granted" });
    return { display: "granted" };
  });
  await refreshStudyReminders(true);
  expect(await readStudyReminder(plan.id)).toEqual({ enabled: false, time: "20:00", blocked: false });
  await changeStudyReminder(plan.id, "19:15");
  expect(plugin.requestPermissions).not.toHaveBeenCalled();
  expect(plugin.schedule).not.toHaveBeenCalled();
  await changeStudyReminder(plan.id, "19:15", true);
  expect(plugin.requestPermissions).toHaveBeenCalledOnce();
  expect(plugin.schedule).toHaveBeenCalledExactlyOnceWith({ notifications: [
    ["今日の目安 1問。チワワが待ってます", new Date(2026, 10, 23, 19, 15)], ["試験まであと7日。", new Date(2026, 10, 29, 19, 15)],
    ["今日の目安 1問。チワワが待ってます", new Date(2026, 10, 30, 19, 15)], ["明日は試験です。", new Date(2026, 11, 5, 19, 15)],
  ].map(([body, at], index) => ({ id: 12000 + index, title: "過去問AIの学習計画", body,
    schedule: { at, repeats: false }, extra: { kind: "study-plan", planId: plan.id } })) });
  await refreshStudyReminders(true);
  expect(plugin.schedule).toHaveBeenCalledOnce();
});

it("prunes old requests on edits and deletion, preserving the existing review reminder", async () => {
  await changeStudyReminder(plan.id, "20:00", true);
  mocks.plans.mockReturnValue([{ ...plan, examDate: "2026-12-18", studyWeekdays: [3] }]);
  await refreshStudyReminders(true);
  expect(plugin.cancel).toHaveBeenLastCalledWith({ notifications: [{ id: 12002 }, { id: 12003 }] });
  expect([...pending.values()].slice(1).map(item => item.schedule?.at)).toEqual([new Date(2026, 10, 25, 20), new Date(2026, 11, 2, 20)]);
  mocks.plans.mockReturnValue([]);
  await refreshStudyReminders(true);
  expect(plugin.cancel).toHaveBeenLastCalledWith({ notifications: [{ id: 12000 }, { id: 12001 }] });
  expect([...pending.values()]).toEqual([legacy]);
  expect(await readStudyReminder(plan.id)).toMatchObject({ enabled: false });
});

it("keeps the chosen time when switching off and clears pending requests on exam expiry", async () => {
  await changeStudyReminder(plan.id, "08:00", true);
  await changeStudyReminder(plan.id, "08:00", false);
  expect([...pending.values()]).toEqual([legacy]);
  expect(await readStudyReminder(plan.id)).toEqual({ enabled: false, time: "08:00", blocked: false });
  await changeStudyReminder(plan.id, "08:00", true);
  vi.setSystemTime(new Date(2026, 11, 7, 9));
  await refreshStudyReminders();
  expect([...pending.values()]).toEqual([legacy]);
  expect(await readStudyReminder(plan.id)).toMatchObject({ enabled: false });
});

it("handles refusal and OS-level disable without scheduling, prompting on open, or clearing other requests", async () => {
  plugin.checkPermissions.mockResolvedValueOnce({ display: "prompt" });
  plugin.requestPermissions.mockResolvedValueOnce({ display: "denied" });
  await expect(changeStudyReminder(plan.id, "20:00", true)).rejects.toThrow("通知を許可");
  expect(plugin.schedule).not.toHaveBeenCalled();
  await changeStudyReminder(plan.id, "20:00", true);
  plugin.checkPermissions.mockResolvedValue({ display: "denied" });
  await refreshStudyReminders(true);
  expect(plugin.requestPermissions).toHaveBeenCalledOnce();
  expect([...pending.values()]).toEqual([legacy]);
  expect(await readStudyReminder(plan.id)).toMatchObject({ enabled: true, blocked: true });
});

it("skips missing, undated and browser plans without asking for permission", async () => {
  mocks.plans.mockReturnValue([{ ...plan, examDate: null } satisfies PacePlan]);
  await changeStudyReminder(plan.id, "20:00", true);
  await changeStudyReminder("missing", "20:00", true);
  mocks.device.isNativePlatform.mockReturnValue(false);
  expect(supportsStudyReminders()).toBe(false);
  const calls = plugin.getPending.mock.calls.length;
  await refreshStudyReminders(true);
  expect(plugin.getPending.mock.calls.length).toBe(calls);
  expect(plugin.requestPermissions).not.toHaveBeenCalled();
  expect(plugin.schedule).not.toHaveBeenCalled();
});

it("renews locally on foreground and cancels on deletion while running off the home screen", async () => {
  const remove = vi.fn();
  let onStateChange!: (state: { isActive: boolean }) => void;
  mocks.app.addListener.mockImplementation(async (_event, listener) => { onStateChange = listener; return { remove }; });
  plugin.addListener.mockResolvedValue({ remove });
  mocks.plans.mockReturnValue([{ ...plan, examDate: "2026-12-31" }]);
  await changeStudyReminder(plan.id, "20:00", true);
  const stop = startWebStudyReminders(vi.fn(), vi.fn());
  await readStudyReminder(plan.id);
  vi.setSystemTime(new Date(2026, 10, 24, 9));
  onStateChange({ isActive: true });
  await readStudyReminder(plan.id);
  expect([...pending.values()].slice(1).map(item => item.schedule?.at)).toEqual([new Date(2026, 10, 30, 20), new Date(2026, 11, 7, 20)]);
  mocks.plans.mockReturnValue([]);
  window.dispatchEvent(new Event("study-plan:synced"));
  await readStudyReminder(plan.id);
  expect([...pending.values()]).toEqual([legacy]);
  stop();
  expect(remove).toHaveBeenCalledTimes(2);
});

it("forwards a plan notification tap to its quiz, and ignores stale taps after clearing data", async () => {
  await changeStudyReminder(plan.id, "20:00", true);
  let listener!: (event: ActionPerformed) => void;
  const remove = vi.fn();
  plugin.addListener.mockImplementation(async (_event, fn) => { listener = fn; return { remove }; });
  const open = vi.fn();
  const stop = await observeStudyReminderTap(open);
  expect(plugin.addListener).toHaveBeenCalledWith("localNotificationActionPerformed", expect.any(Function));
  const notification = pending.get(12000)!;
  listener({ actionId: "dismiss", notification });
  expect(open).not.toHaveBeenCalled();
  listener({ actionId: "tap", notification });
  await vi.waitFor(() => expect(open).toHaveBeenCalledExactlyOnceWith("/quiz/today?plan=plan-a"));
  await clearStudyReminders();
  listener({ actionId: "tap", notification });
  await Promise.resolve();
  await Promise.resolve();
  expect(open).toHaveBeenCalledOnce();
  expect([...pending.values()]).toEqual([legacy]);
  stop();
  expect(remove).toHaveBeenCalledOnce();
});
