import type { ExamCode } from "@/lib/questions/types";

/**
 * 公開情報に基づく試験統計の概算値。
 * 出典: IPA 公式統計（https://www.ipa.go.jp/shiken/）の各回合格率を年度ごとに集計。
 * 値はおおよそのレンジで記載し、確定的な数値ではないことを UI 側で明示する。
 */
export interface ExamStats {
  /** 直近の合格率レンジ (%)。例: "20-25" */
  passRateRecent: string;
  /** 合格率の傾向トレンド説明 */
  passRateTrend: string;
  /** 推奨学習時間の目安 (時間) */
  studyHoursLow: number;
  studyHoursHigh: number;
  /** 主要な出題分野コメント */
  topicTrend: string;
}

export const EXAM_STATS: Record<ExamCode, ExamStats> = {
  ip: {
    passRateRecent: "50-55",
    passRateTrend: "CBT 通年実施で比較的安定。受験経験の有無で大きく差が出る。",
    studyHoursLow: 100,
    studyHoursHigh: 180,
    topicTrend: "テクノロジ系の出題が最も多く、ストラテジ系・マネジメント系が続く3分野構成。",
  },
  sg: {
    passRateRecent: "50-55",
    passRateTrend: "情報セキュリティマネジメント全般が安定的に出題。",
    studyHoursLow: 150,
    studyHoursHigh: 220,
    topicTrend: "情報セキュリティ関連法・組織のセキュリティ管理・内部統制が中心。",
  },
  fe: {
    passRateRecent: "30-50",
    passRateTrend: "新試験制度（科目A/B）移行後は合格率がやや上昇傾向。",
    studyHoursLow: 200,
    studyHoursHigh: 350,
    topicTrend: "テクノロジ系比重が大きく、新形式では擬似言語・アルゴリズムが要。",
  },
  ap: {
    passRateRecent: "20-25",
    passRateTrend: "午前は安定して 60% 弱、午後の記述で合否が分かれる傾向。",
    studyHoursLow: 300,
    studyHoursHigh: 500,
    topicTrend: "テクノロジ・マネジメント・ストラテジが満遍なく出題。午後選択11問中5問。",
  },
  st: {
    passRateRecent: "14-16",
    passRateTrend: "高度試験のなかでも論文の難度が高く合格率は低位安定。",
    studyHoursLow: 200,
    studyHoursHigh: 400,
    topicTrend: "経営戦略・IT戦略・システム企画。論述事例の積み込みが鍵。",
  },
  sa: {
    passRateRecent: "13-15",
    passRateTrend: "午後IIの論述で要件定義・方式設計の力量が問われる。",
    studyHoursLow: 200,
    studyHoursHigh: 400,
    topicTrend: "システムアーキテクチャ設計・要件定義・移行設計が中心。",
  },
  pm: {
    passRateRecent: "13-15",
    passRateTrend: "PMBOK 整理と IPA 特有の出題パターンの両立が必要。",
    studyHoursLow: 200,
    studyHoursHigh: 400,
    topicTrend: "進捗・コスト・品質・リスク管理など PM プロセスを横断的に出題。",
  },
  nw: {
    passRateRecent: "13-16",
    passRateTrend: "高度試験最難関級。プロトコル挙動の本質理解が問われる。",
    studyHoursLow: 250,
    studyHoursHigh: 500,
    topicTrend: "TCP/IP・ルーティング・セキュリティ・DNS/HTTP などインフラ全般。",
  },
  db: {
    passRateRecent: "14-18",
    passRateTrend: "実務直結度が高く、SQL/ER 図設計力が合否を分ける。",
    studyHoursLow: 200,
    studyHoursHigh: 400,
    topicTrend: "概念データモデル設計・物理設計・SQL・トランザクション制御。",
  },
  es: {
    passRateRecent: "16-20",
    passRateTrend: "教材数が少なく独学の難度が高め。安定した受験者層。",
    studyHoursLow: 200,
    studyHoursHigh: 400,
    topicTrend: "組込みシステム設計・リアルタイム制御・ハードウェア知識。",
  },
  sc: {
    passRateRecent: "18-22",
    passRateTrend: "登録制への移行で受験者層が安定。午後の事例読解が要。",
    studyHoursLow: 200,
    studyHoursHigh: 400,
    topicTrend: "暗号・認証・脆弱性・インシデント対応・法制度を横断的に出題。",
  },
  sm: {
    passRateRecent: "13-16",
    passRateTrend: "ITIL 系運用知識と論文構成力の両方が必要。",
    studyHoursLow: 200,
    studyHoursHigh: 400,
    topicTrend: "インシデント管理・問題管理・変更管理・サービスレベル管理。",
  },
  au: {
    passRateRecent: "14-17",
    passRateTrend: "監査人視点の一貫性ある論述ができるかが鍵。",
    studyHoursLow: 200,
    studyHoursHigh: 400,
    topicTrend: "システム監査基準・監査手続・監査報告・統制評価。",
  },
};
