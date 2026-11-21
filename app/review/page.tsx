import type { Metadata } from "next";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { planCatalogKeys } from "@/lib/study-plan/catalog-keys";
import { ReviewClient } from "./ReviewClient";

export const metadata: Metadata = {
  title: "苦手リスト",
  robots: { index: false, follow: false },
  alternates: { canonical: "/review" },
};

export default async function ReviewPage({ searchParams }: { searchParams: Promise<{ exam?: string; returnTo?: string }> }) {
  const { exam, returnTo } = await searchParams;
  const keys = new Set(planCatalogKeys());
  const items = getHomeDirectory().flatMap(domain => [...domain.featured, ...domain.compact])
    .filter(item => keys.has(item.key)).map(({ key, name, href }) => ({ key, name, href }));
  const selected = typeof exam === "string" ? exam : undefined;
  return <main className="p3-page study-column mx-auto w-full max-w-2xl space-y-4 px-4 py-8">
    <h1 className="text-2xl font-bold tracking-tight">苦手リスト</h1>
    <ReviewClient key={selected ?? ""} examFromQuery={selected} returnTo={typeof returnTo === "string" ? returnTo : undefined} items={items} />
  </main>;
}
