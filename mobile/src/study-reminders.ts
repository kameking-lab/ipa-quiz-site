import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";
import { Preferences } from "@capacitor/preferences";
import { z } from "zod";
import { paceAttempts } from "@/lib/study-plan/client";
import { latestAnswers } from "@/lib/study-plan/pace";
import { isStudyWeekdays } from "@/lib/study-plan/pace-compat";
import { listPacePlans } from "@/lib/study-plan/pace-storage";
import { nativeClient } from "../shared/contracts";
import {
  canRemindForPlan, DEFAULT_STUDY_REMINDER_TIME, isStudyReminderId, isStudyReminderTime, studyReminderNotifications,
  studyReminderPlan, studyReminderTap, type StudyReminderSetting,
} from "../shared/study-reminder-plan";

const KEY = "kakomon:study-reminders:v1";
export const STUDY_REMINDER_CHANGED = "mobile:study-reminder-changed";
export const NOTIFICATION_SETTINGS_MESSAGE = "iPhoneの「設定」で過去問AIの通知を許可してください。";
const settingsSchema = z.array(z.object({
  id: z.string().min(1), time: z.string().refine(isStudyReminderTime),
  plan: z.object({ id: z.string().min(1), examDate: z.string(), startDate: z.string(),
    weekdays: z.custom<number[]>(isStudyWeekdays), remaining: z.number().int().nonnegative() }).nullable(),
})).max(20);

let operations: Promise<unknown> = Promise.resolve();
function serialize<T>(operation: () => Promise<T>) {
  const task = operations.then(operation);
  operations = task.catch(() => {});
  return task;
}

export function supportsStudyReminders() {
  return nativeClient() && Capacitor.getPlatform() === "ios" && Capacitor.isPluginAvailable("LocalNotifications");
}

async function readSettings(): Promise<StudyReminderSetting[]> {
  const { value } = await Preferences.get({ key: KEY });
  if (!value) return [];
  try { return settingsSchema.safeParse(JSON.parse(value)).data ?? []; }
  catch { return []; }
}

async function applySettings(next: readonly StudyReminderSetting[], now: Date) {
  const { notifications: pending } = await LocalNotifications.getPending();
  const enabled = next.some(setting => setting.plan);
  const granted = enabled && (await LocalNotifications.checkPermissions()).display === "granted";
  const otherPending = pending.filter(({ id }) => !isStudyReminderId(id)).length;
  const wanted = granted ? studyReminderNotifications(next, now, otherPending) : [];
  const wantedIds = new Set(wanted.map(({ id }) => id));
  const cancel = pending.filter(({ id }) => isStudyReminderId(id) && !wantedIds.has(id)).map(({ id }) => ({ id }));
  if (cancel.length) await LocalNotifications.cancel({ notifications: cancel });
  // Same IDs replace existing pending requests on iOS. Do not churn entries
  // whose time, message and destination are already current.
  const byId = new Map(pending.map(item => [item.id, item]));
  const schedule = wanted.filter(item => {
    const current = byId.get(item.id);
    if (!current || current.title !== item.title || current.body !== item.body) return true;
    const at = current.schedule?.at;
    return !at || new Date(at).getTime() !== item.schedule.at.getTime() ||
      current.schedule?.repeats !== false || studyReminderTap("tap", current)?.planId !== item.extra.planId;
  });
  if (schedule.length) await LocalNotifications.schedule({ notifications: schedule });
}

function currentWebSettings(settings: readonly StudyReminderSetting[], now: Date) {
  if (!settings.length) return [];
  const plans = new Map(listPacePlans().map(plan => [plan.id, plan]));
  const answers = latestAnswers(settings.some(setting => setting.plan) ? paceAttempts() : [], now.getTime());
  return settings.flatMap(setting => {
    const plan = plans.get(setting.id);
    if (!plan || !canRemindForPlan(plan, now)) return [];
    return [{ ...setting, plan: setting.plan ? studyReminderPlan(plan, answers, now) : null }];
  });
}

async function saveAndApply(previous: readonly StudyReminderSetting[], next: readonly StudyReminderSetting[], now: Date) {
  if (JSON.stringify(previous) !== JSON.stringify(next)) await Preferences.set({ key: KEY, value: JSON.stringify(next) });
  try { await applySettings(next, now); }
  finally { window.dispatchEvent(new Event(STUDY_REMINDER_CHANGED)); }
}

export function refreshStudyReminders(fromWeb = false) {
  return serialize(async () => {
    if (!supportsStudyReminders()) return;
    const settings = await readSettings();
    const now = new Date();
    const next = fromWeb ? currentWebSettings(settings, now) : settings.filter(({ plan }) =>
      !plan || canRemindForPlan({ examDate: plan.examDate }, now));
    await saveAndApply(settings, next, now);
  });
}

export function clearStudyReminders() {
  return serialize(async () => {
    if (!supportsStudyReminders()) return;
    await saveAndApply(await readSettings(), [], new Date());
  });
}

export async function readStudyReminder(id: string) {
  await operations;
  const setting = (await readSettings()).find(item => item.id === id);
  const blocked = (await LocalNotifications.checkPermissions()).display === "denied";
  return { enabled: Boolean(setting?.plan), time: setting?.time ?? DEFAULT_STUDY_REMINDER_TIME, blocked };
}

export function changeStudyReminder(id: string, time: string, enabled?: boolean) {
  return serialize(async () => {
    if (!supportsStudyReminders() || !isStudyReminderTime(time)) return;
    const settings = await readSettings();
    const now = new Date();
    const plan = listPacePlans().find(item => item.id === id);
    if (!plan || !canRemindForPlan(plan, now)) {
      await saveAndApply(settings, currentWebSettings(settings, now), now);
      return;
    }
    const current = settings.find(item => item.id === id);
    if (enabled === true && !current?.plan) {
      let { display } = await LocalNotifications.checkPermissions();
      if (display === "prompt" || display === "prompt-with-rationale") {
        ({ display } = await LocalNotifications.requestPermissions());
      }
      if (display !== "granted") throw new Error(NOTIFICATION_SETTINGS_MESSAGE);
    }
    // iOS may keep the permission sheet open while a newer plan arrives via sync.
    const reminder = { id, time, plan: (enabled ?? Boolean(current?.plan)) ? studyReminderPlan(plan, new Map(), now) : null };
    const refreshedAt = new Date();
    const next = currentWebSettings([...settings.filter(item => item.id !== id), reminder], refreshedAt);
    await saveAndApply(settings, next, refreshedAt);
  });
}

export async function observeStudyReminderTap(open: (path: string) => void) {
  if (!supportsStudyReminders()) return () => {};
  let stopped = false;
  const listener = await LocalNotifications.addListener("localNotificationActionPerformed", ({ actionId, notification }) => {
    const tap = studyReminderTap(actionId, notification);
    if (!tap) return;
    void operations.then(readSettings).then(settings => {
      const plan = settings.find(setting => setting.id === tap.planId)?.plan;
      if (!stopped && plan && canRemindForPlan({ examDate: plan.examDate })) open(tap.path);
    }).catch(() => {});
  });
  return () => { stopped = true; void listener.remove(); };
}

export function startWebStudyReminders(href: (path: string) => void, report: (error: unknown) => void) {
  if (!supportsStudyReminders()) return () => {};
  let stopped = false;
  const disposers: Array<() => void> = [];
  const keep = (dispose: () => void) => { if (stopped) dispose(); else disposers.push(dispose); };
  const refresh = () => { void refreshStudyReminders(true).catch(report); };
  const clear = () => { void clearStudyReminders().catch(report); };
  refresh();
  void App.addListener("appStateChange", state => { if (state.isActive) refresh(); })
    .then(listener => keep(() => { void listener.remove(); })).catch(report);
  void observeStudyReminderTap(href).then(keep).catch(report);
  const events = ["study-plan:changed", "study-plan:synced", "study-activity:synced", "storage"];
  for (const event of events) window.addEventListener(event, refresh);
  window.addEventListener("mobile:account-deleted", clear);
  return () => {
    stopped = true;
    for (const dispose of disposers) dispose();
    for (const event of events) window.removeEventListener(event, refresh);
    window.removeEventListener("mobile:account-deleted", clear);
  };
}
