import type { Metadata } from "next";
import { MeClient } from "@/components/me/MeClient";

export const metadata: Metadata = {
  title: "わたしの記録",
  robots: { index: false, follow: false },
  alternates: { canonical: "/me" },
};

export default function MePage() {
  return <main className="mx-auto w-full max-w-2xl px-4 py-6 sm:py-10"><h1 className="mb-5 text-xl font-bold tracking-tight">わたしの記録</h1><MeClient /></main>;
}
