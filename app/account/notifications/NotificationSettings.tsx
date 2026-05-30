"use client";

import * as React from "react";
import { Bell, BellOff, Mail, Send, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  readNotificationPrefs,
  writeNotificationPrefs,
  type NotificationPrefs,
} from "@/lib/storage/notifications";

type Status =
  | { kind: "idle" }
  | { kind: "loading"; message: string }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function NotificationSettings() {
  const [prefs, setPrefs] = React.useState<NotificationPrefs | null>(null);
  const [status, setStatus] = React.useState<Status>({ kind: "idle" });
  const [pushSupported, setPushSupported] = React.useState(false);
  const [pushPermission, setPushPermission] = React.useState<NotificationPermission>("default");

  React.useEffect(() => {
     
    setPrefs(readNotificationPrefs());
    if (typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator) {
      setPushSupported(true);
      setPushPermission(Notification.permission);
    }
  }, []);

  const update = React.useCallback((patch: Partial<NotificationPrefs>) => {
    setPrefs((current) => {
      if (!current) return current;
      const next = { ...current, ...patch };
      writeNotificationPrefs(next);
      return next;
    });
  }, []);

  async function handleEnablePush() {
    if (!pushSupported || !prefs) return;
    setStatus({ kind: "loading", message: "通知権限を要求中..." });
    try {
      const permission = await Notification.requestPermission();
      setPushPermission(permission);
      if (permission !== "granted") {
        setStatus({ kind: "error", message: "通知が拒否されました。ブラウザの設定で許可してください。" });
        return;
      }
      const registration = await navigator.serviceWorker.ready;
      // Push subscription requires VAPID keys; for now we just track UI state.
      void registration;
      update({ pushEnabled: true });
      setStatus({ kind: "success", message: "プッシュ通知を有効化しました" });
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "プッシュ通知の有効化に失敗しました",
      });
    }
  }

  function handleDisablePush() {
    update({ pushEnabled: false });
    setStatus({ kind: "success", message: "プッシュ通知を無効化しました" });
  }

  async function sendTestEmail() {
    if (!prefs?.email) {
      setStatus({ kind: "error", message: "メールアドレスを入力してください" });
      return;
    }
    setStatus({ kind: "loading", message: "テストメール送信中..." });
    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: prefs.email,
          subject: "【過去問AI】通知のテスト送信",
          text:
            "このメールは過去問AI の通知設定テストです。\n\n" +
            "学習リマインダーや週次ダイジェストはここから配信されます。\n",
          type: "test",
        }),
      });
      const data = (await res.json()) as { ok?: boolean; mocked?: boolean; error?: string };
      if (!res.ok) {
        setStatus({ kind: "error", message: data.error ?? "送信に失敗しました" });
        return;
      }
      if (data.mocked) {
        setStatus({
          kind: "success",
          message: "モック送信成功（RESEND_API_KEY 未設定のためサーバーログに出力されました）",
        });
      } else {
        setStatus({ kind: "success", message: `テストメールを送信しました: ${prefs.email}` });
      }
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "送信に失敗しました",
      });
    }
  }

  if (!prefs) {
    return <div className="h-32 animate-pulse rounded-2xl border border-border bg-muted/40" />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            メール通知
          </CardTitle>
          <CardDescription>
            学習リマインダーや週次ダイジェストをメールでお届けします。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="email">
              メールアドレス
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={prefs.email}
              onChange={(e) => update({ email: e.target.value })}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">メール通知を有効化</p>
              <p className="text-xs text-muted-foreground">下の設定に応じてメールを送信します</p>
            </div>
            <Switch
              aria-label="メール通知を有効化"
              checked={prefs.emailEnabled}
              onCheckedChange={(checked) => update({ emailEnabled: checked })}
            />
          </div>

          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-medium text-sm">学習継続リマインダー</p>
              <p className="text-xs text-muted-foreground">毎日設定時刻に学習を促します</p>
            </div>
            <Switch
              aria-label="学習継続リマインダー"
              checked={prefs.streakReminder}
              onCheckedChange={(checked) => update({ streakReminder: checked })}
              disabled={!prefs.emailEnabled}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">週次ダイジェスト</p>
              <p className="text-xs text-muted-foreground">毎週日曜日に学習サマリーをお届け</p>
            </div>
            <Switch
              aria-label="週次ダイジェスト"
              checked={prefs.weeklyDigest}
              onCheckedChange={(checked) => update({ weeklyDigest: checked })}
              disabled={!prefs.emailEnabled}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="hour">
              リマインダー時刻 (JST)
            </label>
            <select
              id="hour"
              value={prefs.reminderHour}
              onChange={(e) => update({ reminderHour: Number(e.target.value) })}
              disabled={!prefs.emailEnabled || !prefs.streakReminder}
              className="rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50"
            >
              {Array.from({ length: 24 }, (_, h) => (
                <option key={h} value={h}>
                  {h.toString().padStart(2, "0")}:00
                </option>
              ))}
            </select>
          </div>

          <Button
            onClick={sendTestEmail}
            disabled={!prefs.email || status.kind === "loading"}
            variant="outline"
            size="sm"
          >
            <Send className="mr-2 h-4 w-4" />
            テストメールを送信
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {prefs.pushEnabled ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
            プッシュ通知 (PWA)
          </CardTitle>
          <CardDescription>
            ブラウザのプッシュ通知でデイリーチャレンジや連続学習を通知します。
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {!pushSupported ? (
            <p className="text-sm text-muted-foreground">
              このブラウザはプッシュ通知に対応していません。
            </p>
          ) : pushPermission === "denied" ? (
            <p className="text-sm text-destructive">
              通知がブロックされています。ブラウザの設定から許可してください。
            </p>
          ) : prefs.pushEnabled ? (
            <Button onClick={handleDisablePush} variant="outline" size="sm">
              <BellOff className="mr-2 h-4 w-4" />
              プッシュ通知を無効化
            </Button>
          ) : (
            <Button onClick={handleEnablePush} variant="primary" size="sm">
              <Bell className="mr-2 h-4 w-4" />
              プッシュ通知を有効化
            </Button>
          )}
        </CardContent>
      </Card>

      {status.kind !== "idle" && (
        <div
          role="status"
          aria-live="polite"
          className={
            "flex items-start gap-2 rounded-xl border p-3 text-sm " +
            (status.kind === "error"
              ? "border-destructive/40 bg-destructive/10 text-destructive"
              : status.kind === "success"
              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
              : "border-border bg-muted text-foreground")
          }
        >
          {status.kind === "error" ? (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          ) : status.kind === "success" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          ) : null}
          <span>{status.message}</span>
        </div>
      )}
    </div>
  );
}
