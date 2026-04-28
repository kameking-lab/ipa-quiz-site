import type { Metadata } from "next";
import { DiagnosisFlow } from "@/components/diagnosis/DiagnosisFlow";

export const metadata: Metadata = {
  title: "試験区分診断 — あなたに最適なIPA試験を7問で",
  description:
    "職業・経験年数・目的を答えるだけで、IPA情報処理技術者試験13区分から最適な試験区分とおすすめ学習プランをAIネイティブに提案します。",
  alternates: { canonical: "/diagnosis" },
  openGraph: {
    title: "試験区分診断 — あなたに最適なIPA試験を7問で",
    description:
      "7問のアンケートに答えるだけで、13試験区分からあなたに最適な区分・想定学習期間・推奨プランを提案。",
    url: "/diagnosis",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "試験区分診断 — IPA Quiz",
    description: "7問のアンケートで最適なIPA試験区分を診断します。",
  },
};

export default function DiagnosisPage() {
  return <DiagnosisFlow />;
}
