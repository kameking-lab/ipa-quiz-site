import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { examLabel } from "@/lib/utils";
import { isMockExamCode } from "@/lib/mock-exam/config";
import { MockExamLanding } from "./MockExamLanding";

interface SearchParams {
  exam?: string;
  returnTo?: string;
}

const DESCRIPTION =
  "IPA 情報処理技術者試験の本番形式で実力チェック。AP・FE・SC など全 13 区分対応、合格判定・分野別弱点分析・スコア履歴グラフ付き。登録不要・完全無料で今すぐ体験。";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const examCode = sp.exam;
  const unsupported = examCode !== undefined && !isMockExamCode(examCode);
  const examTitle = unsupported ? "この資格の模試は未対応です" : examCode ? `${examLabel(examCode)} 模試モード` : "模試モード";
  const description = unsupported ? "指定された資格の本番形式の模試は未対応です。資格ページの収録問題で演習できます。" : DESCRIPTION;
  const ogImageUrl = `${SITE_BASE_URL}/api/og?${new URLSearchParams({
    type: "mock-exam",
    title: examTitle,
    subtitle: unsupported ? "資格ページの演習をご利用ください" : "本番形式・制限時間付き",
    body: description,
  }).toString()}`;

  return {
    title: unsupported ? examTitle : "模試モード — 本番形式・制限時間付き",
    description,
    ...(unsupported ? { robots: { index: false, follow: true } } : {}),
    alternates: { canonical: "/mock-exam" },
    openGraph: {
      title: examTitle,
      description,
      url: `${SITE_BASE_URL}/mock-exam`,
      type: "website",
      siteName: SITE_NAME,
      locale: "ja_JP",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: examTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: examTitle,
      description,
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

export default async function MockExamPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  return (
    <>
      <JsonLd data={jsonLd} />
      <MockExamLanding examFromQuery={sp.exam} returnTo={sp.returnTo} />
    </>
  );
}
