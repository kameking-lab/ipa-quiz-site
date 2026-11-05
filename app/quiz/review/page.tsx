import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "復習モード（エビングハウス曲線）",
  description:
    "間違えた問題と忘却曲線に沿った復習タイミングの問題のみを出題。短時間で記憶定着を狙えます。",
  alternates: { canonical: "/review" },
  robots: { index: false, follow: false },
};

export default async function ReviewQuizPage({ searchParams }: { searchParams: Promise<{ exam?: string; returnTo?: string }> }) {
  const params = await searchParams;
  const query = new URLSearchParams();
  if (params.exam) query.set("exam", params.exam);
  if (params.returnTo) query.set("returnTo", params.returnTo);
  redirect(`/review${query.size ? `?${query}` : ""}`);
}
