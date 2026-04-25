"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignOutButton() {
  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        ログアウトする
      </Button>
      <Button variant="ghost" size="lg" asChild className="w-full">
        <a href="/">キャンセル</a>
      </Button>
    </div>
  );
}
