import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ExternalLink, Sparkles } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";

const PAGE_PATH = "/why-kakomon-ai";
const PAGE_TITLE = "過去問AI を選ぶ理由 ── IPA 試験対策サービス比較";
const PAGE_DESCRIPTION =
  "IPA 情報処理技術者試験の過去問対策サービスを比較。AI コパイロット・午後 AI 採点・PWA 対応など、過去問AI 独自の差別化機能を、競合の良さも公平に紹介しながら整理します。";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
  },
};

interface ComparisonRow {
  label: string;
  kakomonAi: string;
  doujou: string;
  yobikou: string;
  note?: string;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    label: "対応試験区分",
    kakomonAi: "全 13 区分（IP/SG/FE/AP/高度試験全 9 区分）",
    doujou: "区分ごとに別ドメインで提供。歴史が長く問題量も豊富",
    yobikou: "区分単位の有料講座。網羅性は教材次第",
  },
  {
    label: "問題解説",
    kakomonAi: "AI コパイロットによる対話形式 + 引用元カード",
    doujou: "ユーザー投稿による人力解説（10 年以上の蓄積で深い）",
    yobikou: "講師による解説動画・テキスト",
  },
  {
    label: "午後・論述対策",
    kakomonAi: "AI 採点（β）と業種別事例集を提供",
    doujou: "午前中心。午後は基本的に範囲外",
    yobikou: "添削サービスあり（数日サイクル・有料）",
    note: "予備校の添削は質が高い反面、フィードバックに時間がかかります。",
  },
  {
    label: "モバイル UX",
    kakomonAi: "PWA 対応・片手操作前提のゼロ遷移 UI",
    doujou: "PC 前提の UI が中心。モバイル最適化は限定的",
    yobikou: "教材種別ごとに対応状況が異なる",
  },
  {
    label: "学習履歴",
    kakomonAi: "localStorage 自動保存 + ログインでクラウド同期",
    doujou: "ブラウザ単位での履歴保存に対応",
    yobikou: "受講者管理画面で記録（サービス依存）",
  },
  {
    label: "料金",
    kakomonAi: "無料で全機能。AI コパイロットは 1 日 30 回まで無料",
    doujou: "基本無料（広告表示あり）",
    yobikou: "月数千円〜数万円の有料モデルが中心",
  },
  {
    label: "透明性",
    kakomonAi: "AI モデル・コスト上限・運営方針を /transparency で公開",
    doujou: "サイト運営情報は最小限の開示",
    yobikou: "講座カリキュラム単位での開示",
  },
];

const STRENGTH_CARDS = [
  {
    title: "AI コパイロットが常駐",
    body: "Google Gemini に IPA 公式問題・解答を入力し、引用元つきで回答。誤答理由の可視化・類題生成・用語解説をワンタップで呼び出せる。",
    href: "/features/copilot",
    label: "コパイロットの仕組み",
  },
  {
    title: "業種別 論述事例集",
    body: "ST/SA/PM/SM/AU 論文の『そもそも何を書くか』に悩まないよう、金融・製造・公共など業種別の業務事例を提供。",
    href: "/features/industry-essays",
    label: "事例集の使い方",
  },
  {
    title: "AI 午後採点（β）",
    body: "応用情報・高度試験の午後記述・論文を AI が即時添削。配点根拠と改善点を提示し、添削サイクルを 30 秒に短縮。",
    href: "/features/essay-grading",
    label: "AI 採点を試す",
  },
  {
    title: "本番想定の模試モード",
    body: "本番と同じ時間配分で 20 問・50 問・全問を演習。終了直後に分野別正答率と苦手分野ハイライトが見える。",
    href: "/features/mock-exam",
    label: "模試モードの詳細",
  },
  {
    title: "学習計画の自動生成",
    body: "受験日からの逆算で週次タスクを提案。模試結果や演習履歴を参照し、苦手分野へ時間を寄せた配分を提示する。",
    href: "/features/study-plan",
    label: "学習計画の使い方",
  },
  {
    title: "PWA とゼロ遷移 UI",
    body: "PWA としてインストール可能。問題から解説への画面遷移をゼロにし、モバイル片手操作で 1 問あたりの摩擦を最小化。",
    href: "/about",
    label: "プロジェクト紹介",
  },
];

const RESPECT_POINTS = [
  "過去問道場（siken.com 系）は 10 年以上にわたって IPA 受験者を支えてきた歴史があります。人力解説の蓄積は容易に再現できない財産です。",
  "予備校・通信講座は午後添削や講師フィードバックなど、AI ではまだ届かない深さを提供しています。学習目的によっては予備校の併用が最適です。",
  "過去問AI は、競合の良さを置き換えるのではなく、AI ネイティブな学習体験で『隙間時間 × 即時フィードバック』の新しい使い分けを提案します。",
];

const FAQS = [
  {
    q: "本当に無料で全機能使えますか？",
    a: "はい。教育貢献プロジェクトとして、AI コパイロット以外のすべての機能を無料で公開しています。AI コパイロットは API コスト管理のため 1 日 30 回までを無料枠としています。",
  },
  {
    q: "AI 解説の精度はどの程度信頼できますか？",
    a: "Google Gemini に IPA 公式問題・公式解答を入力に生成しているため、一般的には有用です。ただし稀に誤りを含む可能性があるため、各問題から IPA 公式 PDF へ 1 タップで遷移できる導線を用意しています。",
  },
  {
    q: "過去問道場との併用は可能ですか？",
    a: "もちろん可能です。過去問の網羅性は過去問道場、AI による深掘り対話は過去問AI、というように使い分けている学習者も多くいます。本サイトは競合の代替ではなく補完を目的としています。",
  },
  {
    q: "将来的に有料化されますか？",
    a: "無料枠は維持する方針です。プレミアム（月 300 円相当）は AI コパイロットの無制限利用・広告非表示を予定していますが、本実装はフェーズ 4 以降の検討で、現時点では未着手です。",
  },
];

export default function WhyKakomonAiPage() {
  const absUrl = `${SITE_BASE_URL}${PAGE_PATH}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        url: absUrl,
        inLanguage: "ja",
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_BASE_URL },
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          { "@type": "ListItem", position: 2, name: "過去問AI を選ぶ理由", item: absUrl },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:py-12">
      <JsonLd data={jsonLd} />

      <nav aria-label="パンくずリスト" className="mb-4 text-xs text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="inline-block py-1.5 hover:text-foreground hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            過去問AI を選ぶ理由
          </li>
        </ol>
      </nav>

      <header className="mb-8">
        <Badge variant="soft" className="mb-3">
          <Sparkles className="h-3 w-3" />
          サービス比較
        </Badge>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          過去問AI を選ぶ理由
        </h1>
        <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
          IPA 情報処理技術者試験の対策サービスはいくつかあります。本ページは『どれを選ぶべきか』ではなく『どう使い分けるか』の視点で、過去問AI の差別化点を公平に整理します。
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild variant="gradient" size="xl" className="font-semibold">
            <Link href="/ap">
              応用情報の過去問を試す
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="xl">
            <Link href="/features">機能特集を見る</Link>
          </Button>
        </div>
      </header>

      <section aria-label="差別化の柱" className="mb-12">
        <h2 className="mb-4 text-base font-bold tracking-tight text-foreground sm:text-lg">
          過去問AI 6 つの差別化点
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {STRENGTH_CARDS.map((c) => (
            <li
              key={c.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <h3 className="text-sm font-bold text-foreground">{c.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {c.body}
              </p>
              <Link
                href={c.href}
                className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                {c.label}
                <ArrowRight className="h-3 w-3" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="比較表" className="mb-12">
        <h2 className="mb-2 text-base font-bold tracking-tight text-foreground sm:text-lg">
          主要サービスとの比較
        </h2>
        <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
          各サービスはそれぞれ強みがあります。以下は 2026 年 5 月時点で公開情報をもとにまとめた比較で、内容は随時更新します。誤りに気付かれた場合は{" "}
          <Link href="/contact" className="text-primary hover:underline">
            お問い合わせ
          </Link>
          からお知らせください。
        </p>
        <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
          <table className="w-full min-w-[640px] text-xs">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-3 py-2.5 text-left font-semibold text-foreground">観点</th>
                <th className="px-3 py-2.5 text-left font-semibold text-primary">過去問AI</th>
                <th className="px-3 py-2.5 text-left font-semibold text-foreground">過去問道場系</th>
                <th className="px-3 py-2.5 text-left font-semibold text-foreground">予備校・通信講座</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.label}>
                  <td className="px-3 py-3 align-top font-medium text-foreground">{row.label}</td>
                  <td className="px-3 py-3 align-top text-muted-foreground">{row.kakomonAi}</td>
                  <td className="px-3 py-3 align-top text-muted-foreground">{row.doujou}</td>
                  <td className="px-3 py-3 align-top text-muted-foreground">{row.yobikou}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
          ※比較は公開情報に基づく独自整理であり、各サービスを批判・代替するものではありません。
        </p>
      </section>

      <section aria-label="競合サービスへの敬意" className="mb-12 rounded-2xl border border-border bg-muted/30 p-5 sm:p-6">
        <h2 className="mb-3 text-base font-bold tracking-tight text-foreground sm:text-lg">
          競合サービスへの敬意
        </h2>
        <ul className="space-y-2.5">
          {RESPECT_POINTS.map((p) => (
            <li key={p} className="flex gap-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="FAQ" className="mb-12">
        <h2 className="mb-4 text-base font-bold tracking-tight text-foreground sm:text-lg">
          よくある質問
        </h2>
        <ul className="space-y-3">
          {FAQS.map((f, i) => (
            <li key={i}>
              <details className="group rounded-2xl border border-border bg-card p-4 transition open:border-primary/40 open:shadow-md sm:p-5">
                <summary className="cursor-pointer text-sm font-semibold text-foreground">
                  {f.q}
                </summary>
                <p className="mt-2 border-t border-border pt-2 text-xs leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="関連リンク" className="mb-12">
        <h2 className="mb-4 text-base font-bold tracking-tight text-foreground sm:text-lg">
          関連リンク
        </h2>
        <ul className="space-y-2">
          <li>
            <Link
              href="/transparency"
              className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground group-hover:text-primary">
                  透明性レポート
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  AI モデル・コスト上限・運営方針の公開。
                </p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground group-hover:text-primary">
                  プロジェクトについて
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  教育貢献プロジェクトとしての方針と IPA 出典の扱い。
                </p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          </li>
          <li>
            <Link
              href="/blog/kakomon-ai-vs-doujou"
              className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground group-hover:text-primary">
                  過去問AI と過去問道場の違い（ブログ）
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  サービスの使い分けをより詳しく解説。
                </p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-primary/30 bg-primary-soft p-6 text-center shadow-sm">
        <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
          まずは 1 問だけ試してみる
        </h2>
        <p className="mt-1 text-xs text-muted-foreground">
          会員登録不要・無料。AI コパイロットの引用カードは初回 10 問まで体感できます。
        </p>
        <Button asChild variant="primary" size="lg" className="mt-4 font-semibold">
          <Link href="/ap">
            応用情報の過去問を試す
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </section>
    </main>
  );
}
