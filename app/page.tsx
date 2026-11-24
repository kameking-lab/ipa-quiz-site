import { randomInt } from "node:crypto";
import type { Metadata } from "next";
import { connection } from "next/server";
import { HomePace } from "@/components/home/pace/HomePace";
import { QualificationDirectory } from "@/components/home/pace/QualificationDirectory";
import { HomeStudyRoom } from "@/components/home/pace/HomeStudyRoom";
import { planCatalogKeys } from "@/lib/study-plan/catalog-keys";
import { JsonLd } from "@/components/seo/JsonLd";
import { japanDate } from "@/lib/home/featured-exams";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { CAFE_POSE_FILES } from "@/lib/home/study-room-cafe-mascots";
import { groupHomeDirectory } from "@/lib/home/grouped-directory";
import { buildOrgNode, buildWebsiteNode } from "@/lib/seo/structured-data";
import styles from "./HomePage.module.css";

const title = "資格の公開過去問と学習用解説 — 過去問AI";
const description = "IPA・FP・電気・医療・福祉・不動産・安全衛生等の資格の公開過去問を無料で学習。資格と実施回から問題を選び、公式出典・正答と学習用解説を確認して演習・復習を進められます。";
export const metadata: Metadata = {
  title, description,
  alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
  openGraph: { title, description, url: "/" },
  twitter: { title, description },
};

const goalVariants = [1, 4, 5] as const;

export default async function HomePage() {
  // Choose once per request and pass the same artwork to the hydrated home.
  await connection();
  const goalVariant = goalVariants[randomInt(goalVariants.length)];
  const domains = getHomeDirectory();

  return (
    <main className={`${styles.home} p3-page p3-home study-column flex-1`}>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [buildWebsiteNode(description), buildOrgNode()] }} />
      <HomePace domains={domains} planExamKeys={planCatalogKeys()} initialDate={japanDate(new Date())} goalVariant={goalVariant} directory={
        <details id="home-qualification-directory">
          <summary className="study-focus min-h-12 cursor-pointer py-3 text-sm underline underline-offset-4 hover:text-primary">資格・区分一覧</summary>
          <div className="mt-2">
            <QualificationDirectory domains={groupHomeDirectory(domains)} />
          </div>
        </details>
      }>
        <HomeStudyRoom poseFiles={CAFE_POSE_FILES} />
      </HomePace>
    </main>
  );
}
