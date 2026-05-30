import { describe, it, expect, beforeEach } from "vitest";
import {
  readNotificationPrefs,
  writeNotificationPrefs,
  type NotificationPrefs,
} from "@/lib/storage/notifications";

/**
 * notifications.ts は学習リマインダー等の通知設定の永続化 SSOT。
 * readNotificationPrefs は欠落フィールドを既定で補完し、streakReminder /
 * weeklyDigest は既定 true（オプトアウト）、reminderHour=21（JST 21時）という
 * 契約に依存する。破損すると通知の既定挙動が静かに変わる。
 */
const KEY = "ipa-quiz:notification-prefs:v1";

beforeEach(() => {
  window.localStorage.clear();
});

describe("readNotificationPrefs", () => {
  it("未保存なら既定値（streakReminder/weeklyDigest=true・reminderHour=21）", () => {
    expect(readNotificationPrefs()).toEqual<NotificationPrefs>({
      email: "",
      emailEnabled: false,
      pushEnabled: false,
      streakReminder: true,
      weeklyDigest: true,
      reminderHour: 21,
    });
  });

  it("破損 JSON は既定値にフォールバック", () => {
    window.localStorage.setItem(KEY, "{broken");
    const prefs = readNotificationPrefs();
    expect(prefs.streakReminder).toBe(true);
    expect(prefs.reminderHour).toBe(21);
  });

  it("部分保存は欠落フィールドのみ既定で補完する", () => {
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ email: "a@example.com", emailEnabled: true }),
    );
    expect(readNotificationPrefs()).toEqual<NotificationPrefs>({
      email: "a@example.com",
      emailEnabled: true,
      pushEnabled: false,
      streakReminder: true,
      weeklyDigest: true,
      reminderHour: 21,
    });
  });

  it("weeklyDigest:false を明示保存すれば既定 true で上書きされない", () => {
    window.localStorage.setItem(KEY, JSON.stringify({ weeklyDigest: false }));
    expect(readNotificationPrefs().weeklyDigest).toBe(false);
  });
});

describe("writeNotificationPrefs → readNotificationPrefs 往復", () => {
  it("保存した全フィールドがそのまま読み戻せる", () => {
    const prefs: NotificationPrefs = {
      email: "user@example.com",
      emailEnabled: true,
      pushEnabled: true,
      streakReminder: false,
      weeklyDigest: false,
      reminderHour: 8,
    };
    writeNotificationPrefs(prefs);
    expect(readNotificationPrefs()).toEqual(prefs);
  });
});
