import type { Metadata } from "next";
import { SignOutButton } from "./SignOutButton";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "ログアウト",
  robots: { index: false, follow: false },
};

export default async function SignOutPage() {
  const session = await auth();

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-4 py-12">
      <h1 className="mb-4 text-2xl font-bold">ログアウトしますか？</h1>
      {session?.user ? (
        <>
          <p className="mb-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
            {session.user.email ?? session.user.name ?? "ログイン中"}
          </p>
          <SignOutButton />
        </>
      ) : (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">現在ログインしていません。</p>
      )}
    </main>
  );
}
