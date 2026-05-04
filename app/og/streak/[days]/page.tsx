import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

const ALLOWED_DAYS = new Set(["7", "30", "100"]);

interface PageProps {
  params: Promise<{ days: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { days } = await params;
  const safeDays = ALLOWED_DAYS.has(days) ? days : "7";
  const title = `${safeDays}日連続学習達成 — 過去問AI`;
  const description = `IPA 過去問 AI で ${safeDays} 日連続学習を達成しました。あなたも一緒に始めませんか?`;
  return {
    title,
    description,
    openGraph: { title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function StreakSharePage({ params }: PageProps) {
  const { days } = await params;
  if (!ALLOWED_DAYS.has(days)) redirect("/");

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-12 pt-10 text-center sm:px-6">
      <div className="mb-4 text-5xl">🔥</div>
      <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {days}日連続学習達成
      </h1>
      <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        IPA 過去問 AI は誰でも完全無料で使える教育貢献プロジェクトです。
        あなたも今日から一緒に始めてみませんか?
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
      >
        ホームで始める
      </Link>
    </main>
  );
}
