import "./home-study.css";
import type { Metadata } from "next";
import { HomeDirectory } from "@/components/home/landing/HomeDirectory";
import { HomeScheduleLink } from "@/components/home/landing/HomeScheduleLink";
import { HomeNoteGuides, HomeTrust } from "@/components/home/landing/HomeGuidesAndTrust";
import { HomeHero } from "@/components/home/landing/HomeHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { buildOrgNode, buildWebsiteNode } from "@/lib/seo/structured-data";

const title = "IPA・安全衛生・FPの過去問を無料で学習 — 過去問AI";
const description = "IPA情報処理技術者試験、安全衛生、FP・電験三種・第二種電気工事士・宅建・2級土木/管工事施工管理の公式公開過去問を無料で学習。公式正答とAIを活用した学習用解説を確認し、1問ずつ演習と復習を進められます。";
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
      <HomeDirectory domains={domains} />
      <div className="study-context">
      <HomeScheduleLink />
      <HomeNoteGuides />
      <HomeTrust />
      </div>
    </main>
  );
}
