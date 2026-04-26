"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const ERROR_MESSAGES: Record<string, string> = {
  stripe_not_configured: "決済サービスの準備中です。しばらく待ってからお試しください。",
  db_not_configured: "サーバー側の準備中です。しばらく待ってからお試しください。",
  price_not_configured: "価格設定の準備中です。少し時間を置いてください。",
  invalid_plan: "プランの指定が正しくありません。",
  user_not_found: "アカウント情報を取得できませんでした。再度ログインしてください。",
  already_on_plan: "現在ご利用中のプランです。",
  checkout_url_missing: "決済画面の作成に失敗しました。少し時間を置いて再度お試しください。",
};

function friendlyError(code: string | undefined, status: number): string {
  if (code && ERROR_MESSAGES[code]) return ERROR_MESSAGES[code];
  if (status >= 500) return "サーバーで問題が発生しました。少し時間を置いて再度お試しください。";
  return "リクエスト処理中に問題が発生しました。少し時間を置いて再度お試しください。";
}

export function PremiumCheckoutButton({ label }: { label: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: "premium" }),
      });

      if (res.status === 401) {
        const next = encodeURIComponent("/pricing#premium");
        window.location.href = `/auth/signin?callbackUrl=${next}`;
        return;
      }

      if (!res.ok) {
        const detail = (await res.json().catch(() => ({}))) as { error?: string };
        setError(friendlyError(detail.error, res.status));
        setLoading(false);
        return;
      }

      const { url } = (await res.json()) as { url?: string };
      if (!url) {
        setError("Checkout URL が取得できませんでした");
        setLoading(false);
        return;
      }
      window.location.href = url;
    } catch {
      setError("通信エラーが発生しました");
      setLoading(false);
    }
  }

  return (
    <div>
      <Button
        type="button"
        variant="gradient"
        size="lg"
        className="w-full"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "処理中..." : label}
      </Button>
      {error && (
        <p className="mt-2 text-center text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
