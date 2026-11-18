import type { Metadata } from "next";
import Link from "next/link";
import { Settings } from "lucide-react";
import { MeClient } from "@/components/me/MeClient";

export const metadata: Metadata = {
  title: "わたしの記録",
  robots: { index: false, follow: false },
  alternates: { canonical: "/me" },
};

export default function MePage() {
  return <main className="mx-auto w-full max-w-[640px] px-4 pb-6 sm:px-6">
    <header className="flex min-h-14 items-center justify-between gap-2">
      <h1 className="text-xl font-bold">わたしの記録</h1>
      <Link href="/settings" aria-label="設定" className="grid size-11 place-items-center rounded-lg hover:bg-muted"><Settings aria-hidden="true" className="size-5" /></Link>
    </header>
    <MeClient />
  </main>;
}
