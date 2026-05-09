import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { examLabel } from "@/lib/utils";
import { MockExamLanding } from "./MockExamLanding";

const DESCRIPTION =
  "本番と同じ問題数・時間配分で模試。合格判定・分野別分析・履歴グラフを提供。";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ exam?: string }>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const exam = sp.exam;
  const examName = exam ? examLabel(exam) : null;
  const title = examName
    ? `${examName} 模試モード — 本番形式・制限時間付き`
    : "模試モード — 本番形式・制限時間付き";
  const ogTitle = examName ? `${examName} 模試モード` : "模試モード";
  const ogSubtitle = examName ? `${examName} 本番形式` : "本番形式・制限時間付き";

  const ogParams = new URLSearchParams({
    type: "mock-exam",
    title: ogTitle,
    subtitle: ogSubtitle,
  });
  const ogImageUrl = `${SITE_BASE_URL}/api/og?${ogParams.toString()}`;

  return {
    title,
    description: DESCRIPTION,
    alternates: { canonical: "/mock-exam" },
    openGraph: {
      title,
      description: DESCRIPTION,
      url: "/mock-exam",
      siteName: SITE_NAME,
      locale: "ja_JP",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: DESCRIPTION,
      images: [ogImageUrl],
    },
  };
}

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
