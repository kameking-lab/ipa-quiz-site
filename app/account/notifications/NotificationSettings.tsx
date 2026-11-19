"use client";
import * as React from "react";
import { Bell, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { readNotificationPrefs, writeNotificationPrefs } from "@/lib/storage/notifications";

export function NotificationSettings() {
  const [permission, setPermission] = React.useState<NotificationPermission | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [status, setStatus] = React.useState({ error: false, message: "" });
  React.useEffect(() => {
    if ("Notification" in window) setPermission(Notification.permission);
  }, []);
  async function allowNotifications() {
    if (busy || permission === null) return;
    setBusy(true); setStatus({ error: false, message: "通知の許可を確認中…" });
    try {
      const next = await Notification.requestPermission();
      setPermission(next);
      writeNotificationPrefs({ ...readNotificationPrefs(), pushEnabled: next === "granted" });
      setStatus({ error: next !== "granted", message: next === "granted" ? "このブラウザで通知を許可しました。" : "通知は許可されていません。" });
    } catch { setStatus({ error: true, message: "通知の許可を確認できませんでした。" }); }
    finally { setBusy(false); }
  }
  return <div className="space-y-4">
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Mail className="h-4 w-4" aria-hidden="true" />メール通知</CardTitle><CardDescription>定期メールの登録受付は終了しました。</CardDescription></CardHeader>
    </Card>
    <Card>
      <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Bell className="h-4 w-4" aria-hidden="true" />ブラウザ通知</CardTitle></CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        {permission === null ? <p>このブラウザは通知に対応していません。</p>
          : permission === "denied" ? <p>通知がブロックされています。ブラウザの設定から許可してください。</p>
          : permission === "granted" ? <p>このブラウザで通知を許可しています。</p>
          : <Button variant="outline" size="lg" disabled={busy} onClick={() => void allowNotifications()}>通知を許可</Button>}
      </CardContent>
    </Card>
    <p role="status" aria-live="polite" className={status.error ? "text-sm leading-relaxed text-destructive" : "text-sm leading-relaxed text-muted-foreground"}>{status.message}</p>
  </div>;
}
