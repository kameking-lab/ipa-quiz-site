"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

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
        setError(detail.error ?? `エラー (${res.status})`);
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
        variant="primary"
        className="w-full"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? "処理中..." : label}
      </Button>
      {error && (
        <p className="mt-2 text-center text-xs text-rose-600 dark:text-rose-400">{error}</p>
      )}
    </div>
  );
}
