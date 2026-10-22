import "./home-study.css";
import type { Metadata } from "next";
import { TotalAnswerCounter } from "@/components/home/TotalAnswerCounter";
import { HomeDirectory } from "@/components/home/landing/HomeDirectory";
import { HomeScheduleLink } from "@/components/home/landing/HomeScheduleLink";
import { HomeNoteGuides, HomeTrust } from "@/components/home/landing/HomeGuidesAndTrust";
import { HomeHero } from "@/components/home/landing/HomeHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { buildOrgNode, buildWebsiteNode } from "@/lib/seo/structured-data";

const title = "資格の公開過去問と学習用解説 — 過去問AI";
const description = "IPA・FP・電気・医療・福祉・不動産・安全衛生等の資格の公開過去問を無料で学習。資格と実施回から問題を選び、公式出典・正答とAI支援で編集した学習用解説を確認して演習・復習を進められます。";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: { title, description, url: "/" },
  twitter: { title, description },
};

export default function HomePage() {
  const domains = getHomeDirectory();

  return (
    <main className="study-home mx-auto w-full max-w-6xl flex-1 px-5 pb-12 pt-6 sm:px-10 sm:pt-12">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [buildWebsiteNode(description), buildOrgNode()] }} />
      <HomeHero domains={domains} />
      <TotalAnswerCounter suggestions={domains.flatMap(domain => domain.featured)
        .filter(item => item.questionCount > 0).slice(0, 3)
        .map(({ name, href }) => ({ name, href }))} />
      <HomeDirectory domains={domains} />
      <div className="study-context">
      <HomeScheduleLink />
      <HomeNoteGuides />
      <HomeTrust />
      </div>
    </main>
  );
}
