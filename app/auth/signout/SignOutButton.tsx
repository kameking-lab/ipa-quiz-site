"use client";

import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { nativeClient } from "@/mobile/shared/contracts";

export function SignOutButton() {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
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
      <Button variant="ghost" size="lg" asChild className="w-full">
        <Link href="/">キャンセル</Link>
      </Button>
    </div>
  );
}
