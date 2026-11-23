import type { Metadata } from "next";
import { practiceGateEnabled } from "@/lib/billing/practice-access";
import { TodayQuiz } from "./TodayQuiz";
export const metadata: Metadata = { title: "学習演習", robots: { index: false, follow: true } };
export default async function TodayPage({ searchParams }: { searchParams: Promise<{ plan?: string; list?: string; exam?: string }> }) {
  const { plan, list, exam } = await searchParams;
  return <TodayQuiz planId={typeof plan === "string" ? plan : ""} weakExam={list === "weak" && typeof exam === "string" && exam ? exam : undefined} billingGateEnabled={practiceGateEnabled()} />;
}
