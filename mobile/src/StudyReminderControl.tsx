"use client";

import { useEffect, useState } from "react";
import { isStudyReminderTime } from "../shared/study-reminder-plan";
import { changeStudyReminder, NOTIFICATION_SETTINGS_MESSAGE, readStudyReminder, STUDY_REMINDER_CHANGED, supportsStudyReminders } from "./study-reminders";

export function StudyReminderControl({ planId }: { planId: string }) {
  const [setting, setSetting] = useState<Awaited<ReturnType<typeof readStudyReminder>>>();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!supportsStudyReminders()) return;
    let active = true;
    const update = () => void readStudyReminder(planId).then(value => {
      if (active) setSetting(value);
    }).catch(() => {
      if (active) setMessage("通知の設定を読み込めませんでした。");
    });
    update();
    window.addEventListener(STUDY_REMINDER_CHANGED, update);
    return () => { active = false; window.removeEventListener(STUDY_REMINDER_CHANGED, update); };
  }, [planId]);

  async function change(time: string, enabled?: boolean) {
    if (!isStudyReminderTime(time)) return;
    setBusy(true);
    setMessage("");
    try {
      await changeStudyReminder(planId, time, enabled);
      setSetting(await readStudyReminder(planId));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "通知の設定を更新できませんでした。");
    } finally {
      setBusy(false);
    }
  }

  if (!setting) return message ? <p role="status" className="mt-2 text-sm">{message}</p> : null;
  return <div className="mt-3 border-t border-border pt-1 text-sm">
    <div className="flex flex-wrap items-center justify-between gap-x-3">
      <label className="flex min-h-11 items-center gap-2">
        <input type="checkbox" role="switch" className="size-5 accent-primary" checked={setting.enabled} disabled={busy}
          onChange={event => void change(setting.time, event.currentTarget.checked)} />
        勉強する日に通知する
      </label>
      <input type="time" aria-label="通知時刻" className="min-h-11 rounded-lg border border-border bg-background px-2 text-foreground"
        value={setting.time} disabled={busy} required onChange={event => void change(event.currentTarget.value)} />
    </div>
    {(message || setting.blocked) && <p role="status" className="mt-1 text-muted-foreground">
      {message || NOTIFICATION_SETTINGS_MESSAGE}
    </p>}
  </div>;
}
