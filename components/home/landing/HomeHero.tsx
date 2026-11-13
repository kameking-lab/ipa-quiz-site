import type { ReactNode } from "react";
import Link from "next/link";
import type { HomeDirectoryDomain } from "@/lib/home/home-directory";
import { ArrowDown, ArrowRight } from "lucide-react";
import { HomeQualificationFinder } from "./HomeQualificationFinder";
import { HomeResume } from "./HomeResume";
import { HomeDirectory } from "./HomeDirectory";
import { buttonVariants } from "@/components/ui/button";

export function HomeHero({ domains, image }: { domains: readonly HomeDirectoryDomain[]; image?: ReactNode }) {
  const questions = domains.reduce((sum, domain) => sum + domain.totalQuestions, 0);
  const qualifications = domains.reduce((sum, domain) => sum + domain.qualificationCount, 0);

  return <section aria-label="資格を選んで学習を始める" className="study-opening study-opening-compact">
    <div className="study-welcome">
      <div className="study-welcome-copy">
        <p className="study-eyebrow">チワワと、こつこつ。資格の学びを。</p>
        <h1>今日も、ひと問ずつ。</h1>
        <div className="study-welcome-actions">
          <Link href="/quiz?mode=random&exam=ip" className={buttonVariants({ className: "study-primary w-full sm:w-auto", size: "lg" })}>ログインなしで10問を始める<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
        </div>
      </div>
      {image && <div className="study-welcome-art">{image}</div>}
    </div>
    <dl role="group" aria-label="公開収録数" className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
      <div className="flex items-baseline gap-1.5">
        <dt>公開中の問題数</dt>
        <dd className="font-semibold tabular-nums text-[var(--study-ink)]">{questions.toLocaleString("ja-JP")}</dd>
      </div>
      <div className="flex items-baseline gap-1.5">
        <dt>資格・区分</dt>
        <dd className="font-semibold tabular-nums text-[var(--study-ink)]">{qualifications.toLocaleString("ja-JP")}</dd>
      </div>
    </dl>
    <HomeResume domains={domains} />
    <HomeQualificationFinder domains={domains} homeDirectory={<HomeDirectory domains={domains} />} />
    <a href="#study-room" className="study-text-link study-room-entry">自習室をのぞく<ArrowDown aria-hidden="true" className="h-4 w-4" /></a>
  </section>;
}
