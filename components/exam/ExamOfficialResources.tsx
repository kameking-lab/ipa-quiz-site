import { ExternalLink, Landmark } from "lucide-react";

import type { ExamCode } from "@/lib/questions/types";
import { EXAM_OFFICIAL_LINKS } from "@/lib/seo/exam-resources";

export function ExamOfficialResources({ exam }: { exam: ExamCode }) {
  const links = EXAM_OFFICIAL_LINKS[exam];
  if (!links) return null;

  const items: { label: string; href: string; description: string }[] = [
    {
      label: "IPA 公式 試験概要",
      href: links.overview,
      description: "受験資格・試験時間・出題形式・合格基準などの一次情報。",
    },
    {
      label: "シラバス（出題範囲）",
      href: links.syllabus,
      description: "IPA が公開する公式シラバス。学習計画の根拠資料。",
    },
    {
      label: "過去問題の公開ページ",
      href: links.pastQuestions,
      description: "IPA 公式が掲載する過去問 PDF と解答例の一覧。",
    },
  ];

  return (
    <section
      aria-label="IPA 公式リソース"
      className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-sm"
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
          <Landmark className="h-4 w-4" />
        </span>
        <div className="leading-tight">
          <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
            IPA 公式リソース
          </h2>
          <p className="text-[11px] text-muted-foreground">
            受験前に確認したい一次情報（外部リンク）
          </p>
        </div>
      </div>
      <ul className="grid gap-2 sm:grid-cols-3">
        {items.map((it) => (
          <li key={it.href}>
            <a
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full rounded-xl border border-border bg-background p-3 text-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="flex items-center gap-1 font-medium text-foreground group-hover:text-primary">
                {it.label}
                <ExternalLink className="h-3 w-3 opacity-60" />
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                {it.description}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
