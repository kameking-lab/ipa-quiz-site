import type { Metadata } from "next";
import { HomePace } from "@/components/home/pace/HomePace";
import { ALL_QUIZ_EXAM_CODES } from "@/lib/exam-config";
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
    <main className="mx-auto w-full max-w-[640px] flex-1 px-4 pb-6 pt-6 sm:px-6 sm:pt-10">
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [buildWebsiteNode(description), buildOrgNode()] }} />
      <HomePace domains={domains} planExamKeys={ALL_QUIZ_EXAM_CODES} />
    </main>
  );
}
