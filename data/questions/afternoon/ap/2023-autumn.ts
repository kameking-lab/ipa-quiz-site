// Mock data for development. 実データは scripts/parse-afternoon/parse-ap-afternoon.ts で生成する。
import type { AfternoonQuestion } from "@/lib/afternoon/types";

export const AP_AFTERNOON_2023_AUTUMN: AfternoonQuestion[] = [
  {
    id: "ap-2023a-pm-q2",
    exam: "ap",
    year: 2023,
    season: "autumn",
    qNumber: 2,
    type: "descriptive",
    category: "経営戦略",
    title: "中堅小売チェーンのEC強化に向けた施策（モック）",
    context: `B社は全国に200店舗を展開する中堅小売チェーンである。コロナ禍以降、店舗売上は緩やかに減少しており、ECサイトの強化が経営課題となっている。

現状の課題:
- ECサイトの直帰率が60%と高い
- リピート購入率が10%と低い
- 店舗在庫とEC在庫が連携されておらず、機会損失が発生している

C取締役は、これらの課題に対応するため、OMO（Online Merges with Offline）戦略の推進を検討している。`,
    subQuestions: [
      {
        label: "設問1",
        prompt:
          "ECサイトの直帰率を下げるために、ユーザー体験(UX)の観点から実施すべき施策を1つ挙げ、35字以内で述べよ。",
        type: "long-text",
        maxLength: 35,
        modelAnswer:
          "ファーストビューに人気商品やセール情報を配置し、回遊を促すデザインに変更する。",
        scoringRubric:
          "「ファーストビュー改善」「回遊性向上」「レコメンド」「検索性向上」のいずれかに言及していれば加点。具体的な施策名があるとより高得点。",
        points: 30,
      },
      {
        label: "設問2",
        prompt:
          "リピート購入率を上げるために、CRM観点から実施すべき施策を1つ挙げ、効果と合わせて40字以内で述べよ。",
        type: "long-text",
        maxLength: 40,
        modelAnswer:
          "購入履歴に基づくパーソナライズメールを配信し、再訪率と再購入率を向上させる。",
        scoringRubric:
          "「メールマーケティング」「ポイント/クーポン施策」「LINE/アプリPush」「パーソナライズ」のいずれかに言及。効果に「リピート率向上」「LTV向上」があると加点。",
        points: 35,
      },
      {
        label: "設問3",
        prompt:
          "店舗在庫とEC在庫を連携させることで実現できるOMO施策を1つ挙げ、35字以内で述べよ。",
        type: "long-text",
        maxLength: 35,
        modelAnswer:
          "ECで注文した商品を最寄り店舗で受け取れる「店舗受取」サービスを提供する。",
        scoringRubric:
          "「BOPIS（Buy Online Pickup In Store）/店舗受取」「店舗在庫の見える化」「店舗から発送」のいずれかに言及していれば加点。",
        points: 35,
      },
    ],
    pdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2023a05_1/2023a05a_ap_pm_qs.pdf",
    license: "IPA-public",
    totalTimeMinutes: 150,
  },
];
