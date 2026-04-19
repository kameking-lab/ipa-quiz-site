"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <div className="flex flex-col gap-2">
      <Button onClick={() => signOut({ callbackUrl: "/" })} className="min-w-48">
        ログアウトする
      </Button>
      <Button variant="ghost" asChild className="min-w-48">
        <a href="/">キャンセル</a>
      </Button>
    </div>
  );
}
