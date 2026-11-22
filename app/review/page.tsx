import type { Metadata } from "next";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { planCatalogKeys } from "@/lib/study-plan/catalog-keys";
import { ReviewClient } from "./ReviewClient";
import { DueReview } from "./DueReview";

export const metadata: Metadata = {
  title: "復習・苦手リスト",
  robots: { index: false, follow: false },
  alternates: { canonical: "/review" },
};

export default async function ReviewPage({ searchParams }: { searchParams: Promise<{ mode?: string; exam?: string; returnTo?: string }> }) {
  const { mode, exam, returnTo } = await searchParams;
  const selected = typeof exam === "string" ? exam : undefined;
  if (mode !== "weak") return <main className="p3-page study-column mx-auto w-full max-w-2xl space-y-4 px-4 py-8">
    <h1 className="text-2xl font-bold tracking-tight">今日の復習</h1>
    <DueReview key={selected ?? ""} initialExam={selected ?? ""} returnTo={typeof returnTo === "string" ? returnTo : undefined} />
  </main>;
  const keys = new Set(planCatalogKeys());
  const items = getHomeDirectory().flatMap(domain => [...domain.featured, ...domain.compact])
    .filter(item => keys.has(item.key)).map(({ key, name, href }) => ({ key, name, href }));
  return <main className="p3-page study-column mx-auto w-full max-w-2xl space-y-4 px-4 py-8">
    <h1 className="text-2xl font-bold tracking-tight">苦手リスト</h1>
    <ReviewClient key={selected ?? ""} examFromQuery={selected} returnTo={typeof returnTo === "string" ? returnTo : undefined} items={items} />
  </main>;
}
