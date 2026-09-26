import { ExternalLink, Landmark } from "lucide-react";

import type { ExamCode } from "@/lib/questions/types";
import { EXAM_OFFICIAL_LINKS } from "@/lib/seo/exam-resources";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";

export function ExamOfficialResources({ exam }: { exam: ExamCode }) {
  const links = EXAM_OFFICIAL_LINKS[exam];
  const qualification = getQualificationByExamCode(exam);
  if (!links && !qualification) return null;

  if (qualification) {
    const items = exam === "kankoji2" ? [
      {
        label: "全国建設研修センター 公式問題・正答肢（令和8年度前期）",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608k_mondai.pdf",
        description: "2級管工事施工管理技術検定 第一次検定（前期）の問題PDF。正答肢は同じページの「正答肢」PDF。",
      },
      {
        label: "全国建設研修センター 公式問題（令和7年度後期）",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2025/11/20251117k_mondaia.pdf",
        description: "第一次検定（後期）の問題PDF。No.16の正答訂正を含む正答肢PDFは試験問題/正答肢ページから確認できます。",
      },
      {
        label: "全国建設研修センター 試験問題/正答肢",
        href: "https://www.jctc.jp/mondai/",
        description: "各試験回の問題・正答肢PDFの一覧。",
      },
    ] : exam === "civil2" ? [
      {
        label: "全国建設研修センター 公式問題",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608d_mondai.pdf",
        description: "令和8年度前期・第一次検定（土木）の問題PDF。",
      },
      {
        label: "全国建設研修センター 公式正答",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608d_seitou.pdf",
        description: "同じ試験回の正答肢PDF。",
      },
    ] : exam === "denken2" ? [
      {
        label: `${qualification.administrator} 公式問題・正答`,
        href: qualification.officialQuestionsUrl,
        description: "第二種電気主任技術者試験の問題と公式解答の一次情報。",
      },
    ] : exam === "kaigo" ? [
      {
        label: "社会福祉振興・試験センター 過去の試験問題",
        href: "https://www.sssc.or.jp/kaigo/past_exam/index.html",
        description: "第38回の科目別問題PDF・音声読み上げ用問題の掲載ページ。",
      },
      {
        label: "第38回 合格基準・正答一覧",
        href: "https://www.sssc.or.jp/kaigo/past_exam/pdf/no38/k_kijun_seitou.pdf",
        description: "全125問の公式正答。本サイトの正答はこのPDFと全問照合済み。",
      },
    ] : [
      {
        label: `${qualification.administrator} 公式問題・正答`,
        href: qualification.officialQuestionsUrl,
        description: "問題と公式正答の一次情報。公開範囲や基準日も確認できます。",
      },
      {
        label: "過去問題の利用条件",
        href: qualification.officialReuseTermsUrl,
        description: qualification.reuseSummary,
      },
    ];
    return (
      <section aria-label="公式リソース" className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
            <Landmark className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">公式リソース</h2>
            <p className="text-[11px] text-muted-foreground">問題・正答・利用条件の一次情報</p>
          </div>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block h-full rounded-xl border border-border bg-background p-3 text-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <div className="flex items-center gap-1 font-medium text-foreground group-hover:text-primary">
                  {item.label}<ExternalLink className="h-3 w-3 opacity-60" />
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{item.description}</p>
              </a>
            </li>
          ))}
        </ul>
      </section>
    );
  }

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
