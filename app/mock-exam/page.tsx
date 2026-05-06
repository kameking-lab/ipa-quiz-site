import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { MockExamLanding } from "./MockExamLanding";

export const metadata: Metadata = {
  title: "模試モード — 本番形式・制限時間付き",
  description:
    "本番と同じ問題数・時間配分で模試。合格判定・分野別分析・履歴グラフを提供。",
  alternates: { canonical: "/mock-exam" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "模試モード — 本番形式で実力チェック",
  description:
    "IPA情報処理技術者試験の本番と同じ問題数・時間配分で模試を体験。合格判定・分野別分析・スコア履歴グラフを提供します。",
  url: `${SITE_BASE_URL}/mock-exam`,
  inLanguage: "ja",
  provider: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_BASE_URL,
  },
  educationalLevel: "intermediate",
  learningResourceType: "Quiz",
};

interface SearchParams {
  exam?: string;
}

export default async function MockExamPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  return (
    <>
      <JsonLd data={jsonLd} />
      <MockExamLanding examFromQuery={sp.exam} />
    </>
  );
}
