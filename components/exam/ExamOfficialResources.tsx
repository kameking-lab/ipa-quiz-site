import { ExternalLink, Landmark } from "lucide-react";

import type { ExamCode } from "@/lib/questions/types";
import { EXAM_OFFICIAL_LINKS } from "@/lib/seo/exam-resources";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";

export function ExamOfficialResources({ exam }: { exam: ExamCode }) {
  const links = EXAM_OFFICIAL_LINKS[exam];
  const qualification = getQualificationByExamCode(exam);
  if (!links && !qualification) return null;

  if (qualification) {
    const items = exam === "chusho-kigyo-shindanshi" ? [
      {
        label: "日本中小企業診断士協会連合会 第1次試験問題",
        href: qualification.officialQuestionsUrl,
      },
      {
        label: "2026年度（令和8年度）公式正答",
        href: "https://www.jf-cmca.jp/contents/010_c_/010_c_r08_shiken/R08_1ji_shiken_kaitou.html",
      },
      {
        label: "2025年度（令和7年度）公式正答",
        href: "https://www.jf-cmca.jp/contents/010_c_/010_c_r07_shiken/R07_1ji_shiken_kaitou.html",
      },
      {
        label: "2025年度 正解・配点の訂正通知",
        href: "https://www.jf-cmca.jp/attach/test/r07/seikai_teisei_20250902.pdf",
      },
    ] : exam === "fp1" ? [
      {
        label: "金融財政事情研究会 2026年5月学科・基礎編の公式問題",
        href: "https://www.kinzai.or.jp/fp/news-fp/50260.html",
      },
      {
        label: "金融財政事情研究会 2026年5月学科の模範解答",
        href: "https://www.kinzai.or.jp/fp/news-fp/50274.html",
      },
    ] : exam === "civil1" ? [
      {
        label: "全国建設研修センター 公式問題A",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/07/20260706d_mondaia.pdf",
      },
      {
        label: "全国建設研修センター 公式問題B",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/07/20260706d_mondaib.pdf",
      },
      {
        label: "全国建設研修センター 公式正答肢",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/07/20260706d_seitou.pdf",
      },
    ] : exam === "zoen1" ? [
      {
        label: "全国建設研修センター 公式問題A",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907z_mondaia.pdf",
      },
      {
        label: "全国建設研修センター 公式問題B",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907z_mondaib.pdf",
      },
      {
        label: "全国建設研修センター 公式正答肢",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907z_seitou.pdf",
      },
    ] : exam === "tsushin1" ? [
      {
        label: "全国建設研修センター 公式問題A",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907e_mondaia.pdf",
      },
      {
        label: "全国建設研修センター 公式問題B",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907e_mondaib.pdf",
      },
      {
        label: "全国建設研修センター 公式正答肢",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907e_seitou.pdf",
      },
    ] : exam === "denki1" ? [
      { label: "建設業振興基金 公式問題・正答（令和8年度）", href: "https://www.fcip-shiken.jp/pdf/r08_1dg_mondai.pdf" },
      { label: "建設業振興基金 公式問題・正答（令和7年度）", href: "https://www.fcip-shiken.jp/pdf/r07_1dg_mondai.pdf" },
    ] : exam === "denki2" ? [
      { label: "建設業振興基金 公式問題・正答（令和8年度前期）", href: "https://www.fcip-shiken.jp/pdf/r08_2dgz_mondai.pdf" },
      { label: "建設業振興基金 公式問題・正答（令和7年度後期）", href: "https://www.fcip-shiken.jp/pdf/r07_2dg_mondai.pdf" },
    ] : exam === "kankoji2" ? [
      {
        label: "全国建設研修センター 公式問題・正答肢（令和8年度前期）",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608k_mondai.pdf",
      },
      {
        label: "全国建設研修センター 公式問題（令和7年度後期）",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2025/11/20251117k_mondaia.pdf",
      },
      {
        label: "全国建設研修センター 試験問題/正答肢",
        href: "https://www.jctc.jp/mondai/",
      },
    ] : exam === "denko1" ? [
      {
        label: "電気技術者試験センター 公式問題（令和8年度上期学科・出題例）",
        href: "https://www.shiken.or.jp/construction/upload/20260401_co_first_q01.pdf",
      },
      {
        label: "電気技術者試験センター 公式解答",
        href: "https://www.shiken.or.jp/construction/upload/20260401_co_first_a01.pdf",
      },
      {
        label: "第一種電気工事士試験の問題と解答",
        href: "https://www.shiken.or.jp/construction/first/qa/",
      },
    ] : exam === "civil2" ? [
      {
        label: "全国建設研修センター 公式問題",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608d_mondai.pdf",
      },
      {
        label: "全国建設研修センター 公式正答",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608d_seitou.pdf",
      },
    ] : exam === "zoen2" ? [
      {
        label: "全国建設研修センター 公式問題（令和8年度前期）",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608z_mondaia.pdf",
      },
      {
        label: "全国建設研修センター 公式正答肢（令和8年度前期）",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608z_seitou.pdf",
      },
      {
        label: "全国建設研修センター 公式問題（令和7年度後期）",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2025/11/20251117z_mondaia.pdf",
      },
      {
        label: "全国建設研修センター 公式正答肢（令和7年度後期）",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2025/11/20251117z_seitou.pdf",
      },
    ] : exam === "tsushin2" ? [
      {
        label: "全国建設研修センター 公式問題（令和8年度前期）",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608e_mondai.pdf",
      },
      {
        label: "全国建設研修センター 公式正答肢（令和8年度前期）",
        href: "https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608e_seitou.pdf",
      },
    ] : exam === "denken1" ? [
      {
        label: `${qualification.administrator} 公式問題・正答`,
        href: qualification.officialQuestionsUrl,
      },
    ] : exam === "denken2" ? [
      {
        label: `${qualification.administrator} 公式問題・正答`,
        href: qualification.officialQuestionsUrl,
      },
    ] : exam === "shakai" ? [
      {
        label: "社会福祉振興・試験センター 過去の試験問題",
        href: "https://www.sssc.or.jp/shakai/past_exam/index.html",
      },
      {
        label: "第38回 合格基準・正答一覧",
        href: "https://www.sssc.or.jp/shakai/past_exam/pdf/no38/s_kijun_seitou.pdf",
      },
    ] : exam === "seishin" ? [
      {
        label: "社会福祉振興・試験センター 過去の試験問題",
        href: "https://www.sssc.or.jp/seishin/past_exam/index.html",
      },
      {
        label: "第28回 合格基準・正答一覧",
        href: "https://www.sssc.or.jp/seishin/past_exam/pdf/no28/se_kijun_seitou.pdf",
      },
      {
        label: "第27回 合格基準・正答一覧",
        href: "https://www.sssc.or.jp/seishin/past_exam/pdf/no27/se_kijun_seitou.pdf",
      },
    ] : exam === "kaigo" ? [
      {
        label: "社会福祉振興・試験センター 過去の試験問題",
        href: "https://www.sssc.or.jp/kaigo/past_exam/index.html",
      },
      {
        label: "第38回 合格基準・正答一覧",
        href: "https://www.sssc.or.jp/kaigo/past_exam/pdf/no38/k_kijun_seitou.pdf",
      },
    ] : exam === "rinsho-kensagishi" ? [
      {
        label: "厚生労働省 第72回臨床検査技師 午前の公式問題",
        href: "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-07a_01.pdf",
      },
      {
        label: "厚生労働省 第72回臨床検査技師 午後の公式問題",
        href: "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-07b_01.pdf",
      },
      {
        label: "厚生労働省 第72回臨床検査技師 公式正答",
        href: "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp260424-07seitou.pdf",
      },
      {
        label: "厚生労働省 第71回臨床検査技師 午前の公式問題",
        href: "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-07a_01.pdf",
      },
      {
        label: "厚生労働省 第71回臨床検査技師 午後の公式問題",
        href: "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-07b_01.pdf",
      },
      {
        label: "厚生労働省 第71回臨床検査技師 公式正答",
        href: "https://www.mhlw.go.jp/seisakunitsuite/bunya/kenkou_iryou/iryou/topics/dl/tp250428-07seitou.pdf",
      },
    ] : exam === "tohan" ? [
      {
        label: "関西広域連合 過去問題及び解答",
        href: qualification.officialQuestionsUrl,
      },
      {
        label: "厚生労働省 試験問題の作成に関する手引き（令和7年4月）",
        href: "https://www.mhlw.go.jp/content/001478036.pdf",
      },
    ] : [
      {
        label: `${qualification.administrator} 公式問題・正答`,
        href: qualification.officialQuestionsUrl,
      },
    ];
    return (
      <section aria-label="公式リソース" className="mb-8 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-3 flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400">
            <Landmark className="h-4 w-4" />
          </span>
          <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">公式リソース</h2>
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.href}>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block h-full rounded-xl border border-border bg-background p-3 text-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                <div className="flex items-center gap-1 font-medium text-foreground group-hover:text-primary">
                  {item.label}<ExternalLink className="h-3 w-3 opacity-60" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (!links) return null;

  const items: { label: string; href: string }[] = [
    {
      label: "IPA 公式 試験概要",
      href: links.overview,
    },
    {
      label: "シラバス（出題範囲）",
      href: links.syllabus,
    },
    {
      label: "過去問題の公開ページ",
      href: links.pastQuestions,
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
        <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
          IPA 公式リソース
        </h2>
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
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
