// 編集者キュレーション。実問題は scripts/parse-afternoon/parse-ap-afternoon.ts で抽出する。
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
    title: "中堅小売チェーンのEC強化に向けたOMO戦略",
    context: `B社は全国に200店舗を展開する中堅小売チェーンである。コロナ禍以降、店舗売上は緩やかに減少しており、ECサイトの強化が経営課題となっている。

[現状の課題]
- ECサイトの直帰率が60%と高い（業界平均40%）
- リピート購入率が10%と低い（業界平均25%）
- 店舗在庫とEC在庫が連携されておらず、欠品による機会損失が月平均2,000万円発生
- 顧客IDが店舗（ポイントカード）とECで分断されており、購買履歴を統合分析できない

C取締役は、これらの課題に対応するため、OMO（Online Merges with Offline）戦略の推進を検討している。具体的には、(a)顧客ID統合、(b)在庫連携、(c)パーソナライゼーション の3軸で施策を立案する方針である。`,
    subQuestions: [
      {
        label: "設問1",
        prompt:
          "ECサイトの直帰率を下げるために、ユーザー体験(UX)の観点から実施すべき施策を1つ挙げ、施策と期待される効果を40字以内で述べよ。",
        type: "long-text",
        maxLength: 40,
        modelAnswer:
          "閲覧履歴に基づくレコメンドを上部に配置し、関連商品への回遊を促進する。",
        scoringRubric:
          "【満点】具体的な施策名（レコメンド／ファーストビュー改善／検索性向上／サイト内導線改善のいずれか）＋効果（回遊性向上／滞在時間延長／関連商品の発見）を両方含む。\n【部分点】施策と効果のいずれか一方のみ。\n【0点】「広告を出す」「価格を下げる」など UX 観点から外れた集客施策。\n注意: 直帰率の問題はサイト内行動の問題であり、流入施策ではないことに注意。",
        points: 20,
      },
      {
        label: "設問2",
        prompt:
          "リピート購入率を上げるためのCRM施策を1つ挙げ、施策の内容と効果を50字以内で述べよ。",
        type: "long-text",
        maxLength: 50,
        modelAnswer:
          "購買履歴に基づくパーソナライズメールを定期配信し、再訪と再購入を促してLTVを向上させる。",
        scoringRubric:
          "【満点】CRM施策（メール／LINE／アプリPush／クーポン／ポイント／会員ランク）＋パーソナライズ／セグメント要素＋効果（リピート率／LTV／再訪）を含む。\n【部分点】施策のみで効果が一般的すぎる／パーソナライズ要素が欠落。\n【0点】CRM施策ではなく集客施策（SEO・広告）／値引きのみで顧客関係構築に触れない。",
        points: 30,
      },
      {
        label: "設問3",
        prompt:
          "店舗在庫とEC在庫を連携させることで実現できる代表的なOMO施策を1つ挙げ、その仕組みと顧客メリットを40字以内で述べよ。",
        type: "long-text",
        maxLength: 40,
        modelAnswer:
          "ECで注文した商品を最寄り店舗で受け取れる店舗受取サービスにより、送料負担と待ち時間を削減する。",
        scoringRubric:
          "【満点】施策名（BOPIS／店舗受取／取り置き／店舗在庫見える化／店舗から発送）＋顧客メリット（送料／待ち時間／確実な入手）を含む。\n【部分点】施策名のみ／メリットが店舗側視点に偏る。\n【0点】在庫連携と関係ない施策（ポイント施策など）／OMO の概念に該当しない。",
        points: 30,
      },
      {
        label: "設問4",
        prompt:
          "顧客IDの店舗・EC統合を進める際に、個人情報保護の観点から実施すべき措置を30字以内で述べよ。",
        type: "long-text",
        maxLength: 30,
        modelAnswer:
          "ID統合と購買履歴の二次利用に関する利用目的を明示し、本人同意を取得する。",
        scoringRubric:
          "【満点】「利用目的の明示」＋「本人同意の取得」を含む。\n【部分点】片方のみ／プライバシーポリシー改定のみで同意取得に触れない。\n【0点】暗号化・アクセス制御など技術的対策のみで個人情報保護法上の手続きに触れない。",
        points: 20,
      },
    ],
    pdfUrl:
      "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2023a05_1/2023a05a_ap_pm_qs.pdf",
    license: "IPA-public",
    totalTimeMinutes: 150,
  },
];
