import type { Metadata } from "next";
import { ALL_QUESTIONS } from "@/data/questions";
import { MyProgressClient } from "./MyProgressClient";

export const metadata: Metadata = {
  title: "マイ進捗 | 過去問AI",
  description:
    "回答履歴から正答率・試験区分別成績・苦手分野を確認。データはブラウザにのみ保存されます。",
  alternates: { canonical: "/my-progress" },
  robots: { index: false, follow: false },
};

export default function MyProgressPage() {
  const questions = ALL_QUESTIONS.map((q) => ({
    id: q.id,
    category: q.category,
    exam: q.exam,
  }));
  return <MyProgressClient questions={questions} />;
}
