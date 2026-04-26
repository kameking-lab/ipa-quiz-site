"use client";

import { useState } from "react";
import { CreditCard, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics/events";

export function BillingActions({ plan = "premium" }: { plan?: string } = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function openPortal() {
    setError(null);
    setLoading(true);
    trackEvent({ name: "billing_portal_opened", plan });
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      if (!res.ok) {
        setError(`ポータル起動失敗 (${res.status})`);
        return;
      }
      const data = (await res.json()) as { url?: string };
      if (data.url) window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "unknown_error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full flex-col items-stretch gap-1.5 sm:items-end">
      <Button
        variant="outline"
        size="lg"
        onClick={openPortal}
        disabled={loading}
        className="w-full sm:w-auto"
      >
        <CreditCard className="h-4 w-4" />
        {loading ? "起動中..." : "プラン・支払い管理"}
      </Button>
      {error && (
        <span className="inline-flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="h-3 w-3" />
          {error}
        </span>
      )}
    </div>
  );
}
