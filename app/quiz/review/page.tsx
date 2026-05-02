import type { Metadata } from "next";
import { ReviewQuizClient } from "./ReviewQuizClient";

export const metadata: Metadata = {
  title: "復習モード（エビングハウス曲線）",
  description:
    "間違えた問題と忘却曲線に沿った復習タイミングの問題のみを出題。短時間で記憶定着を狙えます。",
  alternates: { canonical: "/quiz/review" },
  robots: { index: false, follow: false },
};

export default function ReviewQuizPage() {
  return <ReviewQuizClient />;
}
