import { LS_KEYS } from "./keys";

export interface NotificationPrefs {
  email: string;
  emailEnabled: boolean;
  pushEnabled: boolean;
  streakReminder: boolean;
  weeklyDigest: boolean;
  reminderHour: number; // 0-23 JST
}

const DEFAULT_PREFS: NotificationPrefs = {
  email: "",
  emailEnabled: false,
  pushEnabled: false,
  streakReminder: true,
  weeklyDigest: true,
  reminderHour: 21,
};

export function readNotificationPrefs(): NotificationPrefs {
  if (typeof window === "undefined") return DEFAULT_PREFS;
  try {
    const raw = window.localStorage.getItem(LS_KEYS.notificationPrefs);
    if (!raw) return DEFAULT_PREFS;
    const parsed = JSON.parse(raw) as Partial<NotificationPrefs>;
    return { ...DEFAULT_PREFS, ...parsed };
  } catch {
    return DEFAULT_PREFS;
  }
}

export function writeNotificationPrefs(prefs: NotificationPrefs): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.notificationPrefs, JSON.stringify(prefs));
  } catch {
    // ignore
  }
}
