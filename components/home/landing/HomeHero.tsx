import type { ReactNode } from "react";
import Link from "next/link";
import type { HomeDirectoryDomain } from "@/lib/home/home-directory";
import { HomeHeroImage } from "./HomeHeroImage";
import { ArrowDown, ArrowRight } from "lucide-react";
import { HomeQualificationFinder } from "./HomeQualificationFinder";
import { HomeQuestionPreview } from "./HomeQuestionPreview";
import { HomeResume } from "./HomeResume";

export function HomeHero({ domains, image }: { domains: readonly HomeDirectoryDomain[]; image?: ReactNode }) {
  const questions = domains.reduce((sum, domain) => sum + domain.totalQuestions, 0);
  const qualifications = domains.reduce((sum, domain) => sum + domain.qualificationCount, 0);

  return <section aria-label="資格を選んで学習を始める" className="study-opening">
    <div className="study-welcome">
      <div className="study-welcome-copy">
        <p className="study-eyebrow">チワワと、こつこつ。資格の学びを。</p>
        <h1>過去問の勉強を、<br />ここひとつで。</h1>
        <p className="study-welcome-description">目標はそれぞれ。学ぶ時間は、ちょっと楽しく。<br />あなたの資格の勉強に、小さな相棒を。</p>
        <div className="study-welcome-actions">
          <Link href="/quiz?mode=random&exam=ip" className="study-primary w-full sm:w-auto">ログインなしで10問を始める<ArrowRight aria-hidden="true" className="h-4 w-4" /></Link>
          <a href="#choose-qualification" className="study-primary w-full sm:w-auto">資格を選んで始める<ArrowRight aria-hidden="true" className="h-4 w-4" /></a>
        </div>
        <div className="mt-4 rounded-lg border border-border px-3 py-2">
          <p className="text-xs text-muted-foreground">学習の合間に</p>
          <a href="#study-room" className="study-text-link w-full justify-between">自習室をのぞく<ArrowDown aria-hidden="true" className="h-4 w-4" /></a>
        </div>
        <p className="study-welcome-trust">公開過去問 · 学習用の解説 · 公式出典</p>
      </div>
      <div className="study-welcome-art">
        {image ?? <HomeHeroImage />}
        <div className="study-paper-note">今日も、あなたのペースで。<span>ONE LITTLE STEP AT A TIME.</span></div>
      </div>
    </div>
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
    <HomeQualificationFinder domains={domains} preview={<HomeQuestionPreview />} />
  </section>;
}
