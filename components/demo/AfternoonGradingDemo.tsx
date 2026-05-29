"use client";

import * as React from "react";
import { CheckCircle2, FileText, Loader2, Wand2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type DemoExamCode = "sc" | "st" | "sa" | "pm" | "sm" | "au";

interface DemoSample {
  exam: DemoExamCode;
  examLabel: string;
  category: string;
  prompt: string;
  modelAnswerSnippet: string;
  sampleAnswer: string;
  axes: { name: string; score: number; comment: string }[];
  totalScore: number;
  rank: "A" | "B" | "C";
  goodPoints: string[];
  improvements: string[];
  overallComment: string;
}

const SAMPLES: Record<DemoExamCode, DemoSample> = {
  sc: {
    exam: "sc",
    examLabel: "情報処理安全確保支援士 (SC)",
    category: "Web セキュリティ / SQL インジェクション対策",
    prompt:
      "Web アプリケーション X において、ログイン処理の SQL 文を文字列連結で組み立てている。攻撃者が入力欄に細工した文字列を入力した場合に発生する脆弱性の名称と、その具体的な影響を 60 字以内で述べよ。",
    modelAnswerSnippet:
      "脆弱性名: SQL インジェクション。影響: 認証回避により他ユーザーとしてログイン、またはユーザー情報を含むテーブルの不正取得が可能となる。",
    sampleAnswer:
      "SQL インジェクション。攻撃者が ' OR '1'='1 のような文字列を入力欄に入れることで、SQL 文の論理条件を改ざんでき、本来通らない認証を突破して他ユーザーとしてログインしたり、データベースを覗いたりできてしまう。",
    axes: [
      { name: "適合度", score: 92, comment: "脆弱性名と影響の両方に正しく言及できている。" },
      { name: "具体性", score: 88, comment: "攻撃文字列の例まで挙げており、採点者に意図が伝わる。" },
      { name: "簡潔性", score: 70, comment: "60 字制限を超過している。本番では採点減点対象。" },
      { name: "技術正確性", score: 90, comment: "認証回避と情報取得の二側面に触れており妥当。" },
    ],
    totalScore: 85,
    rank: "B",
    goodPoints: [
      "脆弱性名（SQL インジェクション）を明示している",
      "認証回避と情報漏洩の 2 つの影響に言及できている",
    ],
    improvements: [
      "字数制限（60 字）を超過している。本試験では「認証回避と情報の不正取得」程度に圧縮する練習を",
      "「データベースを覗いたり」は口語的。「情報の不正取得」など答案表現に統一",
    ],
    overallComment:
      "技術的な理解は十分。あとは字数制限内に収める要約力。本番形式では 50〜60 字に圧縮する練習を繰り返すと A 評価が安定します。",
  },
  st: {
    exam: "st",
    examLabel: "IT ストラテジスト (ST)",
    category: "事業戦略 / DX 推進",
    prompt:
      "あなたが携わった、データを活用した新規事業創出について、設問ア〜ウに従って論述せよ。ア: 事業概要と着想の経緯。",
    modelAnswerSnippet:
      "中堅製造業 X 社では、生産ラインの IoT 化により得られる稼働データの活用が課題であった。私は IT ストラテジストとして、稼働データを外販する B2B サブスクリプション事業を着想した……（以下省略）",
    sampleAnswer:
      "私が携わった製造業 X 社では、IoT 工場のデータを社内分析にしか使っていなかった。これを外販すれば新規事業になると考え、稼働分析 SaaS を立ち上げる構想を IT ストラテジストとして提案した。経営陣からは収益性とデータ提供同意の懸念があったが、3 社のヒアリングで需要を裏付け、PoC 提案にこぎつけた。",
    axes: [
      { name: "設問適合度", score: 80, comment: "事業概要と着想経緯の両方に触れている。" },
      { name: "論理性", score: 78, comment: "課題→着想→検証の流れは明確だが、因果が一部弱い。" },
      { name: "具体性", score: 75, comment: "業界・規模感はあるが、データ種別や顧客像の具体度を増やす余地。" },
      { name: "業種事例適合", score: 85, comment: "製造業 IoT という設定は ST 設問の典型に合致。" },
    ],
    totalScore: 79,
    rank: "B",
    goodPoints: [
      "着想の出発点（社内のみ活用）が明確で、新規事業性の説明と接続している",
      "PoC に至る検証ステップ（ヒアリング 3 社）が記述されており、戦略の妥当性が示せている",
    ],
    improvements: [
      "「稼働データ」が具体的に何（OEE / 異常検知ログ / 段取り時間 など）かを 1〜2 行明記",
      "顧客セグメント（同業他社か、装置メーカーか）を特定すると差別化が伝わる",
      "字数が設問ア下限に届いていない可能性。背景・課題の章立てを 1 段落追加",
    ],
    overallComment:
      "STの設問アでは「事業の着想」を、なぜ自分がこのテーマを選んだのかという必然性とともに示すことが重要。 IoT 稼働データの種類と顧客像を具体化すれば A ランクに届きます。",
  },
  sa: {
    exam: "sa",
    examLabel: "システムアーキテクト (SA)",
    category: "システム設計 / 非機能要件",
    prompt:
      "業務システムの非機能要件のうち、可用性要件をどのように決定し、設計に反映したかを論述せよ。設問ア: 業務システムの概要と可用性要件決定の前提。",
    modelAnswerSnippet:
      "対象は中堅小売 Y 社の基幹販売システム。営業時間中の停止は機会損失に直結するため、稼働率 99.95%（月次計画停止 30 分以内）を目標として合意した……",
    sampleAnswer:
      "私が担当した小売 Y 社の販売システムは、店舗 50 店から日次 1 万件の取引を処理する。営業時間中の停止は売上損失に繋がるため、可用性要件は重要だった。ステークホルダーと議論し、稼働率 99.9% を要件として合意した。",
    axes: [
      { name: "設問適合度", score: 75, comment: "概要と前提に触れているが、可用性要件決定プロセスの記述がやや薄い。" },
      { name: "論理性", score: 72, comment: "業務影響→数値要件の流れは妥当だが、根拠データが弱い。" },
      { name: "具体性", score: 68, comment: "数値要件はあるが、機会損失の試算など定量的根拠が欲しい。" },
      { name: "業種事例適合", score: 80, comment: "小売×店舗数×取引量の設定は SA 設問の典型に合致。" },
    ],
    totalScore: 74,
    rank: "B",
    goodPoints: [
      "対象システムの規模感（50 店、1 万件 / 日）が定量的",
      "稼働率を数値で定義しており、後続の設計議論につなげやすい",
    ],
    improvements: [
      "稼働率 99.9% を要件としたなぜ：機会損失試算（例: 1 時間停止で売上 X 円）を 1 行追加",
      "ステークホルダー（経営 / 店舗 / IT）ごとに異なる要望をどう調整したかの記述があると論理性が増す",
      "計画停止時間・MTTR・MTBF など補助指標への言及で具体性が上がる",
    ],
    overallComment:
      "SA 設問アでは「数値の根拠」が重要。99.9% を選んだ理由を機会損失で裏付けると論理性 / 具体性ともに底上げされます。",
  },
  pm: {
    exam: "pm",
    examLabel: "プロジェクトマネージャ (PM)",
    category: "プロジェクト計画 / リスクマネジメント",
    prompt:
      "プロジェクト計画段階におけるリスク特定とその対応について、設問アで概要を、設問イで対応の詳細を述べよ。",
    modelAnswerSnippet:
      "金融 Z 社の勘定系刷新プロジェクトでは、移行期間中の二重運用が最大リスク……",
    sampleAnswer:
      "私は金融 Z 社の勘定系刷新で PM を担当した。リスクとして「移行期間中の二重運用負荷」「ベンダ依存」「規制変更」の 3 つを特定した。中でも二重運用は人員ピーク逼迫が予想されたため、業務量試算を行い、ピーク 2 ヶ月分の追加要員を予算化した。",
    axes: [
      { name: "設問適合度", score: 82, comment: "リスク特定と対応の両方に触れている。" },
      { name: "論理性", score: 78, comment: "識別→評価→対応の流れは見えるが、評価軸（影響度・発生確率）が暗黙的。" },
      { name: "具体性", score: 80, comment: "業務量試算と追加要員予算化が具体的。" },
      { name: "業種事例適合", score: 85, comment: "金融勘定系刷新は PM 設問の典型業種・典型課題。" },
    ],
    totalScore: 81,
    rank: "A",
    goodPoints: [
      "リスクを 3 件挙げ、優先順位を付けて 1 件深掘りしている（PM 論述の王道構成）",
      "対応策が「業務量試算 → 予算化」と定量プロセスで記述されている",
    ],
    improvements: [
      "影響度 × 発生確率のリスクマトリクス言及があると、評価プロセスがより明確に",
      "二重運用以外の 2 リスク（ベンダ / 規制）への対応も簡潔に触れると網羅性が増す",
    ],
    overallComment:
      "PM の論述としては高水準。リスク評価軸を明示するだけで A 評価が安定します。本番でも「特定 → 評価 → 対応」の三段構成を意識してください。",
  },
  sm: {
    exam: "sm",
    examLabel: "IT サービスマネージャ (SM)",
    category: "インシデント管理 / 問題管理",
    prompt:
      "重大インシデント発生時の対応と、再発防止のための問題管理プロセスについて論述せよ。",
    modelAnswerSnippet:
      "通信業 W 社の課金システムで発生した障害では、初動 15 分で対策本部を立ち上げ……",
    sampleAnswer:
      "通信業 W 社の課金システムで月次バッチ障害が発生した。私は SM として 15 分以内に対策本部を立ち上げ、暫定復旧（前日断面からの再実行）を 90 分以内に完了させた。問題管理として根本原因分析（5 Whys）を行い、設定変更レビュー漏れが原因と特定。リリース管理プロセスにレビュー必須項目を追加した。",
    axes: [
      { name: "設問適合度", score: 88, comment: "インシデント対応と問題管理の両方を記述。" },
      { name: "論理性", score: 84, comment: "暫定対応 → 根本原因 → 恒久対策の流れが明確。" },
      { name: "具体性", score: 82, comment: "数値（15 分 / 90 分）と手法（5 Whys）に具体性。" },
      { name: "業種事例適合", score: 80, comment: "通信業課金システムは SM 設問の典型。" },
    ],
    totalScore: 84,
    rank: "A",
    goodPoints: [
      "暫定対応と恒久対策を明確に分離しており、SM 論述の構造として理想的",
      "再発防止策がプロセス変更（リリースレビュー）に踏み込んでいる",
    ],
    improvements: [
      "影響範囲（顧客数 / 課金停止額）に触れると重大度が伝わる",
      "5 Whys の各層（なぜ設定変更レビューが漏れたのか）まで掘ると論理性がさらに上がる",
    ],
    overallComment:
      "SM のお手本に近い構成。影響範囲の数値化を加えれば、より説得力が増し A 評価が安定します。",
  },
  au: {
    exam: "au",
    examLabel: "システム監査技術者 (AU)",
    category: "情報システム監査 / 内部統制",
    prompt:
      "情報システムの開発プロジェクトに対する監査計画と、その実施手続について論述せよ。",
    modelAnswerSnippet:
      "公共 V 機関の住民サービス刷新プロジェクトに対し、監査人として開発統制の整備状況を監査した……",
    sampleAnswer:
      "私はシステム監査人として、公共 V 機関の住民サービスシステム刷新プロジェクトの開発統制を監査した。監査計画ではリスク評価マトリクスを作成し、要件凍結プロセス・変更管理・テスト網羅性の 3 領域を重点項目とした。実施手続として、要件凍結会議の議事録 100% レビュー、変更管理票のサンプリング監査（30 件）、UAT 結果の網羅性チェックを実施した。",
    axes: [
      { name: "設問適合度", score: 85, comment: "監査計画と実施手続の両方を網羅。" },
      { name: "論理性", score: 80, comment: "リスク評価 → 重点領域選定 → 手続の流れが妥当。" },
      { name: "具体性", score: 82, comment: "サンプリング件数（30 件）など具体的。" },
      { name: "業種事例適合", score: 78, comment: "公共系は AU の典型業種。さらに法令面（行政手続オンライン化法）に触れると望ましい。" },
    ],
    totalScore: 81,
    rank: "A",
    goodPoints: [
      "リスクベースで重点領域を 3 つに絞り込んでおり、監査計画として妥当",
      "サンプリング件数の具体化（30 件）で実施手続のリアリティがある",
    ],
    improvements: [
      "「30 件」のサンプリング根拠（母集団数・許容誤謬率）を 1 行追加すると統計的妥当性が示せる",
      "公共特有の法令統制（個人情報保護条例・行政手続オンライン化法）への言及で業種適合度がさらに上がる",
    ],
    overallComment:
      "監査人視点でリスクベース監査の構造が明確。サンプリング根拠と業界法令を補足すれば、より高評価が期待できます。",
  },
};

const EXAM_LIST: DemoExamCode[] = ["sc", "st", "sa", "pm", "sm", "au"];

export function AfternoonGradingDemo() {
  const [exam, setExam] = React.useState<DemoExamCode>("sc");
  const [answer, setAnswer] = React.useState<string>("");
  const [grading, setGrading] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);

  const sample = SAMPLES[exam];

  React.useEffect(() => {
    setAnswer("");
    setShowResult(false);
  }, [exam]);

  function handleFillSample() {
    setAnswer(sample.sampleAnswer);
    setShowResult(false);
  }

  function handleGrade() {
    setGrading(true);
    setShowResult(false);
    setTimeout(() => {
      setGrading(false);
      setShowResult(true);
    }, 1200);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">① 試験区分を選ぶ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {EXAM_LIST.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setExam(code)}
                className={
                  exam === code
                    ? "rounded-full border border-sky-500 bg-sky-500 px-3 py-1 text-xs font-semibold text-white shadow-sm"
                    : "rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs text-zinc-700 hover:border-sky-300 hover:bg-sky-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300 dark:hover:border-sky-700 dark:hover:bg-sky-950/30"
                }
              >
                {SAMPLES[code].examLabel}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base">② 設問を読む</CardTitle>
            <Badge variant="outline">{sample.category}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-200">
            <FileText className="mr-1 inline h-4 w-4 text-zinc-500" />
            {sample.prompt}
          </div>
          <details className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3 text-sm dark:border-emerald-900/60 dark:bg-emerald-950/20">
            <summary className="cursor-pointer font-semibold text-emerald-800 dark:text-emerald-300">
              模範解答（IPA 公式・編集者作成に基づく要点）を見る
            </summary>
            <p className="mt-2 leading-relaxed text-zinc-700 dark:text-zinc-300">
              {sample.modelAnswerSnippet}
            </p>
          </details>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <CardTitle className="text-base">③ 解答を入力</CardTitle>
            <Button variant="outline" size="sm" onClick={handleFillSample}>
              <Wand2 className="h-3.5 w-3.5" />
              サンプル答案を流し込む
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <textarea
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setShowResult(false);
            }}
            rows={8}
            aria-label="解答を入力"
            placeholder="ここに記述・論述を入力（任意の長さで OK）..."
            className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-sm leading-relaxed text-zinc-900 placeholder:text-zinc-400 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-300 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100"
          />
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
            <span>{answer.length} 字</span>
            <Button
              variant="primary"
              size="sm"
              onClick={handleGrade}
              disabled={!answer.trim() || grading}
            >
              {grading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  AI 採点中...
                </>
              ) : (
                <>
                  <Wand2 className="h-3.5 w-3.5" />
                  AI 採点を実行（デモ）
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {showResult && <DemoResult sample={sample} />}
    </div>
  );
}

function DemoResult({ sample }: { sample: DemoSample }) {
  return (
    <Card className="border-sky-300 bg-sky-50/30 dark:border-sky-800 dark:bg-sky-950/20">
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <CardTitle className="text-base">④ AI 採点結果（モック）</CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="success">
              総合 {sample.totalScore} / 100
            </Badge>
            <Badge variant={sample.rank === "A" ? "success" : "default"}>
              ランク {sample.rank}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 text-sm">
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            観点別スコア
          </h3>
          <div className="grid gap-2 sm:grid-cols-2">
            {sample.axes.map((axis) => (
              <div
                key={axis.name}
                className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    {axis.name}
                  </span>
                  <span className="font-bold tabular-nums text-sky-600 dark:text-sky-400">
                    {axis.score}
                  </span>
                </div>
                <div className="mt-1 h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className="h-1.5 rounded-full bg-sky-500"
                    style={{ width: `${axis.score}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {axis.comment}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            良かった点
          </h3>
          <ul className="space-y-1">
            {sample.goodPoints.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span className="leading-relaxed text-zinc-700 dark:text-zinc-300">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-700 dark:text-amber-400">
            改善点
          </h3>
          <ul className="space-y-1">
            {sample.improvements.map((p) => (
              <li key={p} className="flex items-start gap-2">
                <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span className="leading-relaxed text-zinc-700 dark:text-zinc-300">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-950">
          <h3 className="mb-1 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            全体講評
          </h3>
          <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
            {sample.overallComment}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
