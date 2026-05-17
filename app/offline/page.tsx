import type { Metadata } from "next";
import { OfflineHome } from "@/components/offline/OfflineHome";

export const metadata: Metadata = {
  title: "オフラインモード",
  description:
    "ネットワーク接続がない状態で、ブックマーク済み・最近閲覧した問題を演習できます。",
  robots: { index: false, follow: false },
  alternates: { canonical: "/offline" },
};

// Static so it gets precached by the service worker.
export const dynamic = "force-static";

export default function OfflinePage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-10 pt-6 sm:px-6 sm:pt-8">
      <OfflineHome />
    </main>
  );
}
