"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { nativeClient } from "@/mobile/shared/contracts";

export function SignOutButton() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  function cancel() {
    // Reload the native shell too: failed cleanup has stopped its membership refreshes.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.assign("/account");
  }
  async function logout() {
    if (busy) return;
    setBusy(true);
    setError(false);
    try {
      if (nativeClient()) await (await import("@/mobile/src/sign-out")).signOutDevice();
      await signOut({ callbackUrl: "/" });
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="flex flex-col gap-2">
      {error && <p role="alert" className="text-sm text-destructive">ログアウトできませんでした。もう一度お試しください。</p>}
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        disabled={busy}
        onClick={() => void logout()}
      >
        ログアウトする
      </Button>
      <Button variant="ghost" size="lg" disabled={busy} className="w-full" onClick={cancel}>
        キャンセル
      </Button>
    </div>
  );
}
