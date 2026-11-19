import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchClient } from "@/components/search/SearchClient";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { BrowseQualifications } from "@/components/home/pace/BrowseQualifications";
export async function generateMetadata({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }): Promise<Metadata> {
  await searchParams;
  return { title: "さがす", alternates: { canonical: "/search" }, robots: { index: false, follow: true } };
}
export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const hasQuery = ["q", "exam", "year", "season", "category", "difficulty", "calc", "sort", "recent"].some((key) => Boolean(params[key]));
  return <main className="mx-auto w-full max-w-[640px] flex-1 px-4 py-6 sm:px-6">
    <h1 className="mb-6 text-2xl font-bold">さがす</h1>
    <BrowseQualifications domains={getHomeDirectory()} />
    <details open={hasQuery || undefined} className="mt-8 rounded-2xl border border-border px-4">
      <summary className="min-h-11 cursor-pointer py-3 text-sm font-semibold">問題文で探す</summary>
      <div className="pb-4">
        <Suspense fallback={<p role="status">検索を準備中…</p>}><SearchClient /></Suspense>
      </div>
    </details>
  </main>;
}
