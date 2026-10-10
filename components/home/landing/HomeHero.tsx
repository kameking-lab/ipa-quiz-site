import type { HomeDirectoryDomain } from "@/lib/home/home-directory";
import { HomeQualificationFinder } from "./HomeQualificationFinder";
import { HomeQuestionPreview } from "./HomeQuestionPreview";
import { HomeResume } from "./HomeResume";

export function HomeHero({ domains }: { domains: readonly HomeDirectoryDomain[] }) {
  const questions = domains.reduce((sum, domain) => sum + domain.totalQuestions, 0);
  const qualifications = domains.reduce((sum, domain) => sum + domain.qualificationCount, 0);

  return <section aria-label="資格を選んで学習を始める" className="study-opening">
    <HomeResume domains={domains} />
    <dl role="group" aria-label="公開収録数" className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
      <div className="flex items-baseline gap-1.5">
        <dt>公開中の問題数</dt>
        <dd className="font-semibold tabular-nums text-foreground">{questions.toLocaleString("ja-JP")}</dd>
      </div>
      <div className="flex items-baseline gap-1.5">
        <dt>資格・区分</dt>
        <dd className="font-semibold tabular-nums text-foreground">{qualifications.toLocaleString("ja-JP")}</dd>
      </div>
    </dl>
    <HomeQualificationFinder domains={domains} showHeading preview={<HomeQuestionPreview />} />
  </section>;
}
