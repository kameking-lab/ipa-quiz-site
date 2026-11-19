import type { Metadata } from "next";
import { practiceGateEnabled } from "@/lib/billing/practice-access";
import { TodayQuiz } from "./TodayQuiz";
export const metadata: Metadata = { title: "今日の問題", robots: { index: false, follow: true } };
export default async function TodayPage({ searchParams }: { searchParams: Promise<{ plan?: string }> }) {
  const { plan } = await searchParams;
  return <TodayQuiz planId={plan ?? ""} billingGateEnabled={practiceGateEnabled()} />;
}
