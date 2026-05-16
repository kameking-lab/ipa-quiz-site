import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpenCheck, CheckCircle2, Lightbulb, Sparkles, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "AI 論述添削 品質サンプル — 採点根拠を全公開",
  description:
    "AI による論述添削の品質を実際のサンプルでご確認いただけます。架空の受験生答案 (PM 午後II) に対する観点別スコア、採点根拠、改善箇所を詳細に提示。",
  alternates: { canonical: "/demo/essay-grading" },
  robots: { index: false, follow: true },
};

const SAMPLE = {
  examLabel: "プロジェクトマネージャ (PM) 午後II 論述",
  year: 2024,
  season: "spring" as const,
  questionTitle:
    "問1 プロジェクトの計画段階におけるリスクの特定と対応について",
  prompt:
    "あなたが携わったプロジェクトについて、計画段階でのリスク特定とリスク対応計画について、設問ア〜ウに従って論述せよ。",
  industry: "金融業（地方銀行 勘定系 PM 経験）",
  totalChars: 2840,
  rank: "B",
  passProb: 62,
  axes: [
    { name: "設問適合度", score: 78, comment: "ア・イ・ウの 3 段で求められた論点に対し、概ね回答できている。" },
    { name: "論理性", score: 72, comment: "リスク識別 → 対応の流れは明確だが、対応案を選んだ「理由付け」が薄い。" },
    { name: "具体性", score: 68, comment: "金額 / 工数 / 期間など定量的な記述は一部のみ。設問ウで特に薄い。" },
    { name: "業種適合性", score: 80, comment: "金融業勘定系という前提が活きており、PM 設問の典型業種に合致。" },
  ],
};

const ESSAY_BLOCKS = [
  {
    key: "ア" as const,
    title: "設問ア — プロジェクト概要とリスク特定の前提",
    chars: 820,
    answer:
      "私は地方銀行 X 行の勘定系システム部分刷新プロジェクトに、PM として参画した。本プロジェクトは現行ホストの預金・融資サブシステムをオープン系基盤に再構築するもので、開発期間は 18 ヶ月、開発費用は約 12 億円、ステークホルダーは経営企画部、業務統括部、システム部に加え、開発委託先ベンダ A 社・B 社の 2 社共同体制であった。\n\n計画段階で識別したリスクは大きく 3 つある。第一は移行期間中の二重運用負荷で、現行と新環境を 2 ヶ月並行稼働させる必要があり、業務部門の人員が逼迫する可能性があった。第二はベンダ間の責任境界曖昧化で、勘定系コアと周辺サブシステムを別ベンダが担当するため、結合テスト工程での障害切り分けが課題であった。第三は規制変更リスクで、開発期間中に金融庁モニタリング指針の改訂が予定されており、新指針への対応が後付けで必要になる可能性があった。\n\n本論では、最も影響度の大きい二重運用負荷リスクを対象に、特定プロセスと対応計画について述べる。",
    feedback: {
      good: [
        "プロジェクト規模感（18 ヶ月・12 億円・2 ベンダ共同）が定量的で、PM 論述の冒頭として理想的",
        "リスクを 3 件特定し、優先順位を付けて 1 件に絞り込んでいる（PM 設問の典型構成）",
      ],
      improve: [
        "「最も影響度の大きい」と判断した根拠（影響度・発生確率の評価軸）を 1 文で示すと論理性が増す",
        "現行ホスト → オープン系という技術的前提に 1 行触れると、後続の二重運用議論が読みやすくなる",
      ],
      missing: ["影響度 × 発生確率のリスクマトリクス言及"],
    },
  },
  {
    key: "イ" as const,
    title: "設問イ — リスク対応計画とその実施詳細",
    chars: 1240,
    answer:
      "二重運用負荷リスクへの対応として、私は以下 3 点を計画段階に組み込んだ。\n\n第一に、業務量の事前試算である。業務統括部と協働で、並行稼働 2 ヶ月の業務トランザクション量を日次・時間帯別に算出し、現行人員の処理能力との差分を可視化した。試算の結果、預金窓口業務でピーク時 1.6 倍、融資審査で 1.3 倍の負荷増が見込まれることが判明した。\n\n第二に、追加要員の事前予算化である。試算結果に基づき、ピーク 2 ヶ月分の派遣スタッフ 12 名分の予算（約 4,800 万円）をプロジェクト予備費から充当する案を経営会議に上申し、承認を得た。これにより、並行稼働開始時に人員不足で業務停滞が発生することを防いだ。\n\n第三に、業務優先順位ルールの事前合意である。並行稼働期間中に対応が遅延した場合に備え、「現行系を最優先で確実に処理し、新系は翌営業日にリトライ」という業務ルールを業務部門と合意の上、運用手順書に明文化した。これにより、現場での判断ブレと顧客影響を最小化した。\n\n以上 3 点の対応により、並行稼働 2 ヶ月期間中の重大インシデント（顧客影響を伴う処理遅延）はゼロで完了することができた。",
    feedback: {
      good: [
        "対応 3 点が「事前試算 → 予算化 → 業務ルール合意」と段階的・論理的に整理されている",
        "金額（4,800 万円）・人数（12 名）・倍率（1.6 倍 / 1.3 倍）が定量的で説得力がある",
        "経営会議承認という意思決定プロセスを明示しており、PM の上位調整力が伝わる",
      ],
      improve: [
        "業務優先順位ルールについて「業務部門と合意」までは良いが、合意形成にどのくらい工数を要したかの記述があると現実味が増す",
        "ベンダ A 社 / B 社が二重運用にどう関与したかの記述が薄い。マルチベンダ前提を活かすと差別化",
      ],
      missing: [],
    },
  },
  {
    key: "ウ" as const,
    title: "設問ウ — 評価と今後の改善点",
    chars: 780,
    answer:
      "本対応の評価として、まず重大インシデントゼロという結果は所期の目的を達成した。一方で、振り返りの中で 2 点の改善余地を認識した。\n\n第一は、業務量試算の精度である。実際のピーク時負荷は試算より 10% 程度高く出ており、派遣スタッフの稼働率が想定より高くなった。今後は過去類似プロジェクトの実績データを参照する仕組みを整備し、試算精度を高めたい。\n\n第二は、ベンダ間の責任境界に関するリスク（特定はしたが本論で深掘りしなかった項目）の早期顕在化である。結合テストでベンダ A 社・B 社の障害切り分けに想定以上の時間を要した経験から、計画段階で RACI マトリクスをより詳細に作り込むべきであった。\n\n以上の経験を踏まえ、今後同種のマルチベンダ案件においては、リスク特定段階で「業務量」「責任境界」「規制変更」の 3 軸を必ず明文化し、それぞれに定量的指標を設定する標準プロセスを部内で展開していきたい。",
    feedback: {
      good: [
        "達成（インシデントゼロ）と改善余地（試算精度・責任境界）を両面で記述しており、自己評価として誠実",
        "今後の改善を「標準プロセスの展開」という組織的アクションに昇華しており、PM の上位視点が出ている",
      ],
      improve: [
        "「10% 程度高く」という数字に対して、なぜ誤差が出たかの仮説（季節要因 / 顧客行動変化など）を添えると分析の深さが伝わる",
        "RACI 言及はあるが、具体的にどの境界（例: 障害切り分け責任 / 性能劣化検知責任）が曖昧だったかを 1 行示すと改善案の説得力が上がる",
      ],
      missing: ["定量指標の設定例（KPI レベル）への言及"],
    },
  },
];

const STRENGTHS_OVERALL = [
  "リスク特定 → 対応 → 振り返りの三段論法が PM 論述の王道に沿っている",
  "金額・人数・倍率など定量データが各ブロックに配置されており、抽象論で終わっていない",
  "経営会議上申・業務部門合意など、PM の調整プロセスが具体的に描かれている",
];

const NEXT_STEPS = [
  "影響度 × 発生確率のリスクマトリクスを設問アで明示する → 論理性 +5 点見込み",
  "ベンダ間 RACI を設問イ後半に組み込む → 業種適合性・具体性同時に向上",
  "業務量試算誤差の原因仮説を設問ウに 1 文追加 → 設問ウの薄さが解消",
];

const RUBRIC = [
  {
    axis: "設問適合度",
    description: "ア・イ・ウで問われている論点（概要・対応詳細・評価）に過不足なく回答できているか",
    weight: "30%",
  },
  {
    axis: "論理性",
    description: "課題 → 施策 → 結果の因果関係が破綻なく、対応案を選んだ理由が示されているか",
    weight: "25%",
  },
  {
    axis: "具体性",
    description: "金額・人数・期間・倍率・KPI など定量データで施策を裏付けているか",
    weight: "25%",
  },
  {
    axis: "業種適合性",
    description: "受験生の業務経験（業種・規模・役割）が論述内容と整合しているか",
    weight: "20%",
  },
];

export default function EssayGradingDemoPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>

      <header className="mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="success">
            <Sparkles className="h-3 w-3" /> 添削品質サンプル
          </Badge>
          <Badge variant="outline">採点根拠を全公開</Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          論述添削品質サンプル
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          AI 論述添削の品質を、架空の受験生答案に対する実際の採点結果を通してご確認いただけます。
          観点別スコアの内訳、ブロック単位での採点根拠、改善箇所の特定までを完全公開し、
          稟議資料 / 教材選定の判断材料としてご活用ください。
        </p>
      </header>

      <Card className="mb-6 border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
        <CardContent className="p-4 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          <strong>サンプルの位置付け:</strong>{" "}
          本ページの受験生答案・採点結果は説明用に編集者が作成した架空のものです。実利用では IPA
          公表の出題趣旨・採点講評・解答例に基づき AI が採点を行います。スコアはあくまで学習補助で、
          実試験の合否を保証するものではありません。
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base">対象設問</CardTitle>
            <Badge variant="outline">
              {SAMPLE.year}
              {SAMPLE.season === "spring" ? "春" : "秋"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">{SAMPLE.examLabel}</p>
          <p className="font-semibold text-zinc-900 dark:text-zinc-100">{SAMPLE.questionTitle}</p>
          <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">{SAMPLE.prompt}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Badge variant="default">業種: {SAMPLE.industry}</Badge>
            <Badge variant="outline">総文字数 {SAMPLE.totalChars} 字</Badge>
          </div>
        </CardContent>
      </Card>

      <section className="mb-8">
        <Card className="border-sky-300 bg-sky-50/40 dark:border-sky-800 dark:bg-sky-950/20">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle className="text-base">採点サマリ</CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="default">ランク {SAMPLE.rank}</Badge>
                <Badge variant="success">合格率予測 {SAMPLE.passProb}%</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 sm:grid-cols-2">
              {SAMPLE.axes.map((axis) => (
                <div
                  key={axis.name}
                  className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      {axis.name}
                    </span>
                    <span className="text-base font-bold tabular-nums text-sky-600 dark:text-sky-400">
                      {axis.score}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-sky-500 to-violet-500"
                      style={{ width: `${axis.score}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {axis.comment}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          設問ブロック別の採点詳細
        </h2>
        <div className="space-y-4">
          {ESSAY_BLOCKS.map((block) => (
            <Card key={block.key}>
              <CardHeader className="pb-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardTitle className="text-base">
                    <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700 dark:bg-sky-900/40 dark:text-sky-300">
                      {block.key}
                    </span>
                    {block.title}
                  </CardTitle>
                  <Badge variant="outline">{block.chars} 字</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <details className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50" open>
                  <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    受験生の答案を表示
                  </summary>
                  <p className="mt-2 whitespace-pre-line leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {block.answer}
                  </p>
                </details>

                <div>
                  <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                    良かった点
                  </h4>
                  <ul className="space-y-1">
                    {block.feedback.good.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <span className="leading-relaxed text-zinc-700 dark:text-zinc-300">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
                    改善点
                  </h4>
                  <ul className="space-y-1">
                    {block.feedback.improve.map((p) => (
                      <li key={p} className="flex items-start gap-2">
                        <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                        <span className="leading-relaxed text-zinc-700 dark:text-zinc-300">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {block.feedback.missing.length > 0 && (
                  <div>
                    <h4 className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-rose-700 dark:text-rose-400">
                      不足要素
                    </h4>
                    <ul className="space-y-1">
                      {block.feedback.missing.map((p) => (
                        <li key={p} className="flex items-start gap-2">
                          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
                          <span className="leading-relaxed text-zinc-700 dark:text-zinc-300">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-10 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">
              <BookOpenCheck className="mr-1 inline h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              全体としての強み
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {STRENGTHS_OVERALL.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span className="leading-relaxed text-zinc-700 dark:text-zinc-300">{s}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">
              <Lightbulb className="mr-1 inline h-4 w-4 text-amber-600 dark:text-amber-400" />
              次に取り組むべき改善（優先度順）
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm">
              {NEXT_STEPS.map((s, i) => (
                <li key={s} className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-800 dark:bg-amber-900/40 dark:text-amber-200">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed text-zinc-700 dark:text-zinc-300">{s}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          採点ルーブリック（全 4 観点）
        </h2>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] text-sm">
                <thead>
                  <tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                    <th className="px-4 py-2.5">観点</th>
                    <th className="px-4 py-2.5">採点基準</th>
                    <th className="px-4 py-2.5 text-right">配点</th>
                  </tr>
                </thead>
                <tbody>
                  {RUBRIC.map((r) => (
                    <tr key={r.axis} className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-900">
                      <td className="px-4 py-2.5 font-medium text-zinc-900 dark:text-zinc-100">
                        {r.axis}
                      </td>
                      <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300">
                        {r.description}
                      </td>
                      <td className="px-4 py-2.5 text-right tabular-nums text-zinc-600 dark:text-zinc-400">
                        {r.weight}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-10">
        <Card className="border-violet-200 bg-violet-50/40 dark:border-violet-900/60 dark:bg-violet-950/20">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <div className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-50">
                自分の論述で試す
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                ST/SA/PM/SM/AU の過去問に対して、業種選択 → 設問ア・イ・ウ記述 → AI 採点までを実環境でご利用いただけます。
              </p>
            </div>
            <Button asChild variant="primary">
              <Link href="/essay">
                論述添削を始める
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <p className="mt-8 text-center text-xs text-zinc-500 dark:text-zinc-400">
        出典: IPA 情報処理技術者試験
      </p>
    </main>
  );
}
