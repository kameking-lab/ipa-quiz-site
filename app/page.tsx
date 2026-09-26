import type { Metadata } from "next";
import { HomeDirectory } from "@/components/home/landing/HomeDirectory";
import { HomeExamCountdown } from "@/components/home/landing/HomeExamCountdown";
import { HomeNoteGuides, HomeTrust } from "@/components/home/landing/HomeGuidesAndTrust";
import { HomeHero } from "@/components/home/landing/HomeHero";
import { HomeStudyModes } from "@/components/home/landing/HomeStudyModes";
import { TotalAnswerCounter } from "@/components/home/TotalAnswerCounter";
import { JsonLd } from "@/components/seo/JsonLd";
import { getUpcomingExamEvents } from "@/lib/home/exam-schedule";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { buildOrgNode, buildWebsiteNode } from "@/lib/seo/structured-data";

const title = "IPA・安全衛生・FPの過去問を無料で学習 — 過去問AI";
const description = "IPA情報処理技術者試験、安全衛生、FP・電験三種・第二種電気工事士・宅建・2級土木施工管理の公式公開過去問を無料で学習。公式正答とAIによる各選択肢の学習用解説を確認できます。";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: { title, description, url: "/" },
  twitter: { title, description },
};

// 「試験日が近い資格」のカウントダウンは JST の日付で変わるため、1時間ごとに再生成する。
export const revalidate = 3600;

export default function HomePage() {
  const domains = getHomeDirectory();
  const events = getUpcomingExamEvents(new Date());

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-12 pt-4 sm:px-6 sm:pt-8">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [buildWebsiteNode(description), buildOrgNode()] }} />
      <HomeHero domains={domains} />
      <HomeExamCountdown events={events} />
      <HomeDirectory domains={domains} />
      <div className="mt-6"><TotalAnswerCounter /></div>
      <HomeStudyModes />
      <HomeNoteGuides />
      <HomeTrust />
    </main>
  );
}
