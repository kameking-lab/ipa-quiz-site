import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { SignOutButton } from "./SignOutButton";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "ログアウト",
  robots: { index: false, follow: false },
};

export default async function SignOutPage() {
  const session = await auth();

  return (
    <main className="relative flex flex-1 items-center justify-center px-4 py-12 sm:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-radial-spotlight"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-grid opacity-30 [mask-image:radial-gradient(60%_50%_at_50%_0%,#000_30%,transparent_70%)]"
      />

      <div className="relative w-full max-w-md">
        <div className="overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-lg sm:p-8">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-primary-soft-foreground">
            <LogOut className="h-7 w-7" />
          </div>
          <h1 className="text-balance text-center text-2xl font-bold tracking-tight text-foreground">
            {session?.user ? "ログアウトしますか？" : "ログアウト済みです"}
          </h1>

          {session?.user ? (
            <>
              <p className="mt-3 break-all text-center text-sm text-muted-foreground">
                {session.user.email ?? session.user.name ?? "ログイン中"}
              </p>
              <div className="mt-6">
                <SignOutButton />
              </div>
            </>
          ) : (
            <div className="mt-6">
              <Button asChild size="lg" className="w-full">
                <Link href="/">ホームに戻る</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
