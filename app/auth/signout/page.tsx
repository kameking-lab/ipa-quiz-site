import type { Metadata } from "next";
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
            ログアウトしますか？
          </h1>

          {session?.user ? (
            <>
              <p className="mt-3 text-center text-sm text-muted-foreground">
                {session.user.email ?? session.user.name ?? "ログイン中"}
              </p>
              <div className="mt-6">
                <SignOutButton />
              </div>
            </>
          ) : (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              現在ログインしていません。
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
