import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_LABELS, examLabel } from "@/lib/utils";
import { QUICKSTART_EXAMS } from "@/lib/onboarding";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";
import { ORG_ID, STUDENT_AUDIENCE } from "@/lib/seo/structured-data";
import { AI_QUOTA_COPY } from "@/lib/constants/ai-quota";
import type { ExamCode, Question } from "@/lib/questions/types";
import { ArrowRight, Bot, BookOpen, Play } from "lucide-react";

interface PageProps {
  params: Promise<{ exam: string }>;
}

export function generateStaticParams() {
  return QUICKSTART_EXAMS.map((exam) => ({ exam }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { exam } = await params;
  if (!QUICKSTART_EXAMS.includes(exam as ExamCode)) {
    return {
      title: "クイックスタート — 過去問AI",
      description: "3分で過去問AIを体験する導線",
    };
  }
  const label = examLabel(exam);
  const title = `${label}を3分で体験 — 過去問AI`;
  const description = `${label}の代表的な問題3問でAIコパイロットの解説を試したあと、本格演習に進める導線。登録不要・無料。`;
  return {
    title,
    description,
    alternates: { canonical: `/quickstart/${exam}` },
    openGraph: {
      title,
      description,
      url: `/quickstart/${exam}`,
    },
    twitter: { title, description },
  };
}

function pickRepresentativeQuestions(exam: ExamCode): Question[] {
  const pool = (QUESTIONS_BY_EXAM[exam] ?? []).filter(
    (q) => !q.needsReview && !q.hasImage && q.type === "multiple-choice",
  );
  // Prefer recent year, mid difficulty (3), distinct categories.
  const sorted = [...pool].sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    const da = Math.abs((a.difficulty ?? 3) - 3);
    const db = Math.abs((b.difficulty ?? 3) - 3);
    return da - db;
  });
  const picks: Question[] = [];
  const usedCategories = new Set<string>();
  for (const q of sorted) {
    if (usedCategories.has(q.category)) continue;
    picks.push(q);
    usedCategories.add(q.category);
    if (picks.length === 3) break;
  }
  // Pad if not enough distinct categories.
  if (picks.length < 3) {
    for (const q of sorted) {
      if (picks.find((p) => p.id === q.id)) continue;
      picks.push(q);
      if (picks.length === 3) break;
    }
  }
  return picks;
}

export default async function QuickstartExamPage({ params }: PageProps) {
  const { exam } = await params;
  if (!QUICKSTART_EXAMS.includes(exam as ExamCode)) {
    notFound();
  }
  const examCode = exam as ExamCode;
  const label = EXAM_LABELS[examCode];
  const samples = pickRepresentativeQuestions(examCode);
  const totalCount = (QUESTIONS_BY_EXAM[examCode] ?? []).length;
  const pageUrl = `${SITE_BASE_URL}/quickstart/${examCode}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        "@id": `${pageUrl}#howto`,
        name: `${label}の過去問演習を3分で始める手順`,
        description: `${label}の代表問題でAIコパイロットの解説を試したあと、無料の本格演習に進む3ステップ。登録不要。`,
        inLanguage: "ja",
        totalTime: "PT3M",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "代表3問を解く",
            text: "直近年度・分野バラエティから自動選定した3問を90秒目安で解きます。",
            url: `${pageUrl}#step-1`,
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "AI コパイロットの解説を読む",
            text: "選択肢ごとに「なぜ違うか」まで解説。分からない用語はその場で質問できます。",
            url: `${pageUrl}#step-2`,
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "本格演習に進む",
            text: "ランダム出題・分野別・年度別・模試の4モードから好きな進め方を選びます。",
            url: `${pageUrl}#step-3`,
          },
        ],
      },
      {
        "@type": "LearningResource",
        "@id": `${pageUrl}#learning-resource`,
        name: `${label}を3分で体験 — 過去問AI`,
        inLanguage: "ja",
        learningResourceType: "Interactive tutorial",
        educationalLevel: "Professional",
        educationalUse: "Self-study",
        audience: STUDENT_AUDIENCE,
        teaches: `${label} 試験対策`,
        isAccessibleForFree: true,
        publisher: { "@type": "Organization", "@id": ORG_ID, name: SITE_NAME, url: SITE_BASE_URL },
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { name: "ホーム", href: "/" },
          { name: "3分体験", href: "/quickstart" },
          { name: label, href: `/quickstart/${examCode}` },
        ]}
      />
      <header className="space-y-2">
        <Link
          href="/quickstart"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          ← 区分を選び直す
        </Link>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          {examCode.toUpperCase()} の 3 分体験
        </p>
        <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          {label}を3分でつかむ
        </h1>
        <p className="text-sm text-muted-foreground">
          代表的な問題3問でAIコパイロットの手触りを確認したあと、無料で本格演習に進めます。
          所要時間は約3分、登録不要です。
        </p>
      </header>

      <section
        aria-labelledby="quickstart-flow-heading"
        className="mt-6 rounded-2xl border border-border bg-card p-5"
      >
        <h2 id="quickstart-flow-heading" className="text-base font-semibold text-foreground">
          3 ステップ
        </h2>
        <ol className="mt-3 space-y-3">
          <li id="step-1" className="flex items-start gap-3 scroll-mt-20">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              1
            </span>
            <div>
              <div className="text-sm font-semibold text-foreground">代表3問を解く</div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                直近年度・分野バラエティから自動選定。3 問を 90 秒目安で解いてみる。
              </p>
            </div>
          </li>
          <li id="step-2" className="flex items-start gap-3 scroll-mt-20">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              2
            </span>
            <div>
              <div className="text-sm font-semibold text-foreground">
                AI コパイロットの解説を読む
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                選択肢ごとに「なぜ違うか」まで解説。分からない用語はその場で質問できる。
              </p>
            </div>
          </li>
          <li id="step-3" className="flex items-start gap-3 scroll-mt-20">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
              3
            </span>
            <div>
              <div className="text-sm font-semibold text-foreground">本格演習に進む</div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                ランダム出題・分野別・年度別・模試の 4 モードから好きな進め方を選ぶ。
              </p>
            </div>
          </li>
        </ol>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href={`/quiz?mode=random&exam=${examCode}&limit=3`}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover"
          >
            <Play className="h-4 w-4" aria-hidden="true" />
            3 問だけ体験する
          </Link>
          <Link
            href={`/${examCode}`}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            分野別・年度別から選ぶ
          </Link>
        </div>
      </section>

      {samples.length > 0 && (
        <section
          aria-labelledby="sample-questions-heading"
          className="mt-6 rounded-2xl border border-border bg-card p-5"
        >
          <h2
            id="sample-questions-heading"
            className="text-base font-semibold text-foreground"
          >
            体験できる代表問題（{samples.length}問）
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            直近年度から、出題分野が重複しないように自動選定しています。
          </p>
          <ul className="mt-3 space-y-2">
            {samples.map((q) => (
              <li
                key={q.id}
                className="rounded-xl border border-border bg-background p-3"
              >
                <div className="flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
                  <span className="rounded bg-muted px-1.5 py-0.5 font-semibold uppercase">
                    {examCode}
                  </span>
                  <span>{q.year}年度</span>
                  <span>·</span>
                  <span>{q.category}</span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-sm text-foreground">
                  {q.question.slice(0, 120)}
                  {q.question.length > 120 ? "…" : ""}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section
        aria-labelledby="copilot-tips-heading"
        className="mt-6 rounded-2xl border border-border bg-card p-5"
      >
        <h2
          id="copilot-tips-heading"
          className="flex items-center gap-2 text-base font-semibold text-foreground"
        >
          <Bot className="h-4 w-4 text-primary" aria-hidden="true" />
          AI コパイロットに聞いてみる質問例
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-foreground">
          <li className="rounded-lg border border-border bg-background px-3 py-2">
            「アの選択肢がなぜ正解で、イ・ウ・エが違うのかをもう少しやさしく説明して」
          </li>
          <li className="rounded-lg border border-border bg-background px-3 py-2">
            「この問題に出てくる用語を、初めての人向けに1行で要約して」
          </li>
          <li className="rounded-lg border border-border bg-background px-3 py-2">
            「この論点で似たような過去問はある？傾向だけ短く教えて」
          </li>
        </ul>
        <p className="mt-3 text-[11px] text-muted-foreground">
          {AI_QUOTA_COPY}
        </p>
      </section>

      <section
        aria-labelledby="exam-stats-heading"
        className="mt-6 grid gap-3 sm:grid-cols-3"
      >
        <h2 id="exam-stats-heading" className="sr-only">
          {label} の収録状況
        </h2>
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <div className="text-[11px] text-muted-foreground">収録問題数</div>
          <div className="mt-1 text-lg font-bold text-foreground">
            {totalCount.toLocaleString("ja-JP")}
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <div className="text-[11px] text-muted-foreground">利用料金</div>
          <div className="mt-1 text-lg font-bold text-foreground">完全無料</div>
        </div>
        <div className="rounded-xl border border-border bg-card p-3 text-center">
          <div className="text-[11px] text-muted-foreground">登録</div>
          <div className="mt-1 text-lg font-bold text-foreground">不要</div>
        </div>
      </section>

      <div className="mt-8 flex justify-center">
        <Link
          href={`/quiz?mode=random&exam=${examCode}&limit=3`}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover"
        >
          いま {examCode.toUpperCase()} を 3 問体験する
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>

      <p className="mt-8 text-center text-[11px] text-muted-foreground">
        出典: IPA 情報処理技術者試験 / 本サービスは IPA 非公式の学習支援サービスです。
      </p>
    </main>
  );
}
