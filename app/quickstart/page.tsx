import type { Metadata } from "next";
import Link from "next/link";
import { ALL_QUESTIONS, QUESTIONS_BY_EXAM } from "@/data/questions";
import { EXAM_LABELS } from "@/lib/utils";
import { QUICKSTART_EXAMS } from "@/lib/onboarding";
import { QuickstartAttributePicker } from "./QuickstartAttributePicker";
import type { ExamCode } from "@/lib/questions/types";

const TITLE = "3分でわかる過去問AIの始め方 — 過去問AI";
const DESCRIPTION =
  "IPA 情報処理技術者試験 13区分のうち、人気の4区分(IP/FE/AP/SC) を3分で体験できる導線。学習スタイル別に最適なルートをご案内します。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/quickstart" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/quickstart",
  },
  twitter: { title: TITLE, description: DESCRIPTION },
};

export default function QuickstartPage() {
  const totalQuestions = ALL_QUESTIONS.length.toLocaleString("ja-JP");

  const exams = QUICKSTART_EXAMS.map((code) => ({
    code,
    label: EXAM_LABELS[code],
    count: (QUESTIONS_BY_EXAM[code] ?? []).length,
  }));

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 sm:py-10">
      <header className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
          3分で過去問AIを体験
        </p>
        <h1 className="text-2xl font-bold leading-tight text-foreground sm:text-3xl">
          まずは自分の試験区分を選んで、3問だけ解いてみよう
        </h1>
        <p className="max-w-3xl text-sm text-muted-foreground">
          過去問AI は IPA 情報処理技術者試験 全13区分・約{totalQuestions}問を、AI コパイロット
          付きで誰でも無料で学べる教育貢献プロジェクトです。ログイン不要、履歴はあなたの
          ブラウザにのみ保存されます。
        </p>
      </header>

      <section
        aria-labelledby="quickstart-exams-heading"
        className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6"
      >
        <h2
          id="quickstart-exams-heading"
          className="text-lg font-semibold text-foreground"
        >
          人気の4区分から始める
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          まずはここから。3分で AI 解説の手触りを確認できます。
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {exams.map((e) => (
            <li key={e.code}>
              <Link
                href={`/quickstart/${e.code}`}
                className="group block h-full rounded-xl border border-border bg-background p-4 transition-colors hover:bg-muted"
              >
                <div className="text-xs font-bold uppercase text-muted-foreground">
                  {e.code}
                </div>
                <div className="mt-1 text-sm font-semibold text-foreground">
                  {e.label}
                </div>
                <div className="mt-2 text-[11px] text-muted-foreground">
                  収録 {e.count.toLocaleString("ja-JP")} 問
                </div>
                <div className="mt-3 text-xs font-medium text-primary group-hover:underline">
                  3分体験へ →
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="attribute-heading"
        className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6"
      >
        <h2
          id="attribute-heading"
          className="text-lg font-semibold text-foreground"
        >
          学習スタイル別の推奨ルート
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          あなたに合うルートを選ぶと、1日の進め方を 4 ステップに絞って提示します。
        </p>
        <QuickstartAttributePicker
          examOptions={(Object.keys(EXAM_LABELS) as ExamCode[]).map((code) => ({
            code,
            label: EXAM_LABELS[code],
          }))}
        />
      </section>

      <section
        aria-labelledby="full-list-heading"
        className="mt-8 rounded-2xl border border-border bg-card p-5 sm:p-6"
      >
        <h2
          id="full-list-heading"
          className="text-lg font-semibold text-foreground"
        >
          試験区分から探す
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          高度試験を含む 13 区分すべて利用できます。
        </p>
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {(Object.keys(EXAM_LABELS) as ExamCode[]).map((code) => {
            const count = (QUESTIONS_BY_EXAM[code] ?? []).length;
            return (
              <li key={code}>
                <Link
                  href={`/${code}`}
                  className="flex h-full items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5 text-xs hover:bg-muted"
                >
                  <span>
                    <span className="font-bold uppercase text-muted-foreground">
                      {code}
                    </span>
                    <span className="ml-1.5 text-foreground">{EXAM_LABELS[code]}</span>
                  </span>
                  <span className="text-[10px] text-muted-foreground">{count}問</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <p className="mt-8 text-center text-[11px] text-muted-foreground">
        出典: IPA 情報処理技術者試験 / 本サービスは IPA 非公式の学習支援サービスです。
      </p>
    </main>
  );
}
