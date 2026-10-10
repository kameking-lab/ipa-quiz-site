import type { HomeDirectoryDomain } from "@/lib/home/home-directory";
import { HomeQualificationFinder } from "./HomeQualificationFinder";
import { HomeQuestionPreview } from "./HomeQuestionPreview";
import { HomeResume } from "./HomeResume";

export function HomeHero({ domains }: { domains: readonly HomeDirectoryDomain[] }) {
  return <section aria-label="資格を選んで学習を始める" className="study-opening">
    <HomeResume domains={domains} />
    <HomeQualificationFinder domains={domains} showHeading preview={<HomeQuestionPreview />} />
  </section>;
}