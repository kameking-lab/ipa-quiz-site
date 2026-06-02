import type { ExamCode } from "@/lib/questions/types";

export interface ExamProfile {
  code: ExamCode;
  label: string;
  shortLabel: string;
  level: "skill1" | "skill2" | "skill3" | "skill4";
  passRate: string;
  studyHours: string;
  targetAudience: string;
  topics: string[];
  morningStrategy: string;
  afternoonStrategy: string;
  hardSpots: string[];
  exampleSubjects: string[];
  career: string;
}

export const EXAM_PROFILES: Record<ExamCode, ExamProfile> = {
  ip: {
    code: "ip",
    label: "ITパスポート試験",
    shortLabel: "ITパスポート",
    level: "skill1",
    passRate: "おおむね 50% 前後（年度により変動）",
    studyHours: "100〜180 時間",
    targetAudience: "IT を活用する全社会人・全学生",
    topics: ["ストラテジ系", "マネジメント系", "テクノロジ系"],
    morningStrategy:
      "100 問 / 120 分の長丁場。1 問あたり 60〜70 秒の判断速度を作るため、過去問の繰り返しが最短ルートになる。",
    afternoonStrategy: "午後試験は無く、CBT 形式で午前相当の四択のみ。",
    hardSpots: ["AI / DX 関連の新出用語", "経営戦略・マーケティング", "セキュリティの最新ガイドライン"],
    exampleSubjects: ["ストラテジ系", "マネジメント系", "テクノロジ系"],
    career: "IT 部門以外の社会人や学生にとって IT リテラシーの公的証明として機能する。",
  },
  sg: {
    code: "sg",
    label: "情報セキュリティマネジメント試験",
    shortLabel: "情報セキュリティマネジメント",
    level: "skill2",
    passRate: "おおむね 50〜70%",
    studyHours: "150〜250 時間",
    targetAudience: "社内の情報セキュリティ対策を推進する事務系・管理系職員",
    topics: ["情報セキュリティ", "サービスマネジメント", "システム監査", "経営戦略", "法務"],
    morningStrategy: "用語と統制プロセスの理解度勝負。CBT 化以降、長文設問が増えている点に注意。",
    afternoonStrategy: "現行制度では午後固有の試験は無く、長文・事例ベース設問が午前相当に統合されている。",
    hardSpots: ["NIST CSF / ISO27001 などの枠組み比較", "個人情報保護法と関連ガイドライン", "クラウド固有の統制"],
    exampleSubjects: ["情報セキュリティマネジメント", "リスク評価", "事業継続管理"],
    career: "情報システム部門以外の管理職・事業部門の責任者がセキュリティ統制を担う際の資格として機能する。",
  },
  fe: {
    code: "fe",
    label: "基本情報技術者試験",
    shortLabel: "基本情報",
    level: "skill2",
    passRate: "おおむね 35〜45%",
    studyHours: "200 時間（IT 未経験は 300 時間目安）",
    targetAudience: "ITエンジニア入門者・新人エンジニア",
    topics: ["基礎理論", "アルゴリズム", "プログラミング", "データベース", "ネットワーク", "情報セキュリティ", "プロジェクトマネジメント"],
    morningStrategy:
      "科目 A は 60 問 / 90 分の四択。テクノロジ系 9 割を底上げするのが定石。",
    afternoonStrategy:
      "科目 B はアルゴリズムと擬似言語、情報セキュリティ短文事例。1 問あたり 5〜8 分の処理速度が要求される。",
    hardSpots: ["擬似言語のトレース", "再帰関数とスタック挙動", "SQL の結合・サブクエリ"],
    exampleSubjects: ["アルゴリズムとプログラミング", "データベース", "ネットワーク"],
    career: "新卒 SE のスタートラインとして広く活用される国家資格。",
  },
  ap: {
    code: "ap",
    label: "応用情報技術者試験",
    shortLabel: "応用情報",
    level: "skill3",
    passRate: "おおむね 22〜26%",
    studyHours: "300〜500 時間",
    targetAudience: "中堅エンジニア・技術スペシャリスト志望",
    topics: [
      "テクノロジ系全般",
      "マネジメント系",
      "ストラテジ系",
      "プロジェクトマネジメント",
      "サービスマネジメント",
      "システム監査",
    ],
    morningStrategy:
      "午前 80 問 / 150 分の四択。基礎理論・アルゴリズム・データベース・ネットワーク・セキュリティで 6 割を確保し、残りを得意分野で上乗せ。",
    afternoonStrategy:
      "午後 11 問中 5 問選択 / 150 分。情報セキュリティが必答で、残り 4 問を得意分野で固定するのが鉄則。",
    hardSpots: [
      "ネットワーク・セキュリティの長文記述",
      "プロジェクトマネジメントの計算（EVM・クリティカルパス）",
      "ストラテジ系の経営指標",
    ],
    exampleSubjects: ["情報セキュリティ", "データベース", "ネットワーク", "システムアーキテクチャ"],
    career: "上位区分（高度試験）への登竜門であり、午前 I 免除の権利を 2 年間取得できる。",
  },
  st: {
    code: "st",
    label: "ITストラテジスト試験",
    shortLabel: "ITストラテジスト",
    level: "skill4",
    passRate: "おおむね 14〜16%",
    studyHours: "300〜500 時間（実務経験前提）",
    targetAudience: "経営戦略 / DX 推進を担うシニア人材",
    topics: ["経営戦略", "事業戦略", "IT 戦略", "プロジェクトマネジメント", "システム監査"],
    morningStrategy:
      "午前 II 25 問は基本、過去 3 年分を 95% 以上で固める。午前 I は応用情報合格者は免除。",
    afternoonStrategy:
      "午後 I は事例 3 問中 2 問記述、午後 II は論文 2 問中 1 問選択 2 時間。論文は『題意 → 論述骨子 → 章構成 → 経験裏付け』の流れを反復練習する。",
    hardSpots: ["論文の章立て設計", "経営課題の数値根拠付け", "IT 投資の評価指標"],
    exampleSubjects: ["事業戦略", "IT 投資マネジメント", "DX とビジネスモデル"],
    career: "情報処理技術者試験の最高難度に位置付けられ、CIO / CDO 系キャリアと相性が良い。",
  },
  sa: {
    code: "sa",
    label: "システムアーキテクト試験",
    shortLabel: "システムアーキテクト",
    level: "skill4",
    passRate: "おおむね 14〜16%",
    studyHours: "350〜500 時間",
    targetAudience: "上級 SE・テクニカルアーキテクト",
    topics: ["システム要件定義", "システム方式設計", "アーキテクチャ", "データベース", "ネットワーク"],
    morningStrategy: "午前 II は応用情報の延長線で対応可能。直近 3 期の頻出論点を完全暗記する。",
    afternoonStrategy:
      "午後 I は要件定義・方式設計の事例記述、午後 II は論文。再利用性・拡張性・性能要件の三点を必ず触れる構成が定石。",
    hardSpots: ["非機能要件の定量評価", "ハイブリッドクラウド設計", "マイクロサービス分割の妥当性"],
    exampleSubjects: ["業務システム設計", "アーキテクチャ評価", "データモデル設計"],
    career: "アプリケーションアーキテクト・エンタープライズアーキテクトの実力証明として機能する。",
  },
  pm: {
    code: "pm",
    label: "プロジェクトマネージャ試験",
    shortLabel: "プロジェクトマネージャ",
    level: "skill4",
    passRate: "おおむね 13〜15%",
    studyHours: "300〜500 時間",
    targetAudience: "PM / PMO・上級 SE",
    topics: ["プロジェクト統合", "スコープ", "スケジュール", "コスト", "品質", "リスク", "調達", "ステークホルダー"],
    morningStrategy:
      "PMBOK と JIS Q 21500 の知識領域を一通り押さえれば午前 II は安定する。",
    afternoonStrategy:
      "午後 I はトラブル事例の記述、午後 II は論文。問題解決の構図（前提・課題・施策・効果）を 2400 字に圧縮する練習が必須。",
    hardSpots: ["EVM・クリティカルチェーン", "リスク定量分析", "ベンダー調達契約"],
    exampleSubjects: ["プロジェクト計画", "進捗管理", "ステークホルダー対応"],
    career: "情報システム開発の実務責任を担う管理職への登竜門として機能する。",
  },
  nw: {
    code: "nw",
    label: "ネットワークスペシャリスト試験",
    shortLabel: "ネットワーク",
    level: "skill4",
    passRate: "おおむね 13〜15%",
    studyHours: "300〜500 時間",
    targetAudience: "ネットワーク技術者・インフラエンジニア",
    topics: ["TCP/IP", "ルーティング", "L2/L3 スイッチ", "セキュリティ", "クラウドネットワーク", "DNS"],
    morningStrategy:
      "午前 II はプロトコル仕様と RFC 出典の用語が中心。直近 3 年の出題は丸暗記で乗り切れる。",
    afternoonStrategy:
      "午後 I・午後 II は構成図と要件文を読み解く長文記述。サブネット計算・DNS 設計・冗長化の三点を必ず復習する。",
    hardSpots: ["BGP / OSPF の経路選択", "TLS / IPsec の鍵交換", "SD-WAN / SASE の概念"],
    exampleSubjects: ["LAN 設計", "WAN 設計", "ネットワーク運用"],
    career: "ネットワーク領域の専門資格として転職市場で高い評価を得ている。",
  },
  db: {
    code: "db",
    label: "データベーススペシャリスト試験",
    shortLabel: "データベース",
    level: "skill4",
    passRate: "おおむね 16〜18%",
    studyHours: "300〜500 時間",
    targetAudience: "DB エンジニア・データアーキテクト",
    topics: ["データモデル", "正規化", "SQL", "性能設計", "障害復旧", "分散 DB"],
    morningStrategy:
      "午前 II は SQL と関係モデルの用語が頻出。トランザクション分離レベルは必ず暗記。",
    afternoonStrategy:
      "午後 I は概念設計・論理設計、午後 II は物理設計＋性能改善。E-R 図とテーブル定義の往復訓練が必須。",
    hardSpots: ["関係正規化（第 3 〜BCNF）", "SQL のサブクエリ・ウィンドウ関数", "ロック・インデックス設計"],
    exampleSubjects: ["DB 設計", "性能チューニング", "障害復旧"],
    career: "データ基盤技術者・データアーキテクトの専門証明として機能する。",
  },
  es: {
    code: "es",
    label: "エンベデッドシステムスペシャリスト試験",
    shortLabel: "エンベデッド",
    level: "skill4",
    passRate: "おおむね 16〜19%",
    studyHours: "300〜450 時間",
    targetAudience: "組込みシステム開発者",
    topics: ["MCU アーキテクチャ", "RTOS", "ハードウェア設計", "リアルタイム制御", "車載 / IoT"],
    morningStrategy:
      "ハードウェア寄りの計算問題（消費電力・タイミング）が多い。午前 II は計算ドリルで底上げ。",
    afternoonStrategy:
      "午後 I は組込み事例の記述、午後 II は本格的な設計問題。タスクスケジューリングと割込み処理を完全に図示できる状態を作る。",
    hardSpots: ["RTOS タスク優先度", "DMA / バスアービトレーション", "セーフティ規格（ISO 26262 等）"],
    exampleSubjects: ["組込み制御設計", "車載 / IoT", "FPGA 設計"],
    career: "車載・産業機器・IoT デバイスの開発者にとって専門能力の証明として機能する。",
  },
  sc: {
    code: "sc",
    label: "情報処理安全確保支援士試験",
    shortLabel: "情報処理安全確保支援士",
    level: "skill4",
    passRate: "おおむね 19〜21%",
    studyHours: "300〜500 時間",
    targetAudience: "セキュリティ専任エンジニア / コンサルタント",
    topics: ["脅威分析", "暗号", "認証", "ネットワークセキュリティ", "Web セキュリティ", "セキュアコーディング", "監査"],
    morningStrategy:
      "午前 II は CVE / NIST / IPA テクニカルレポートからの新出用語が増加傾向。最新 1 年の出題傾向を必ずレビュー。",
    afternoonStrategy:
      "午後はインシデント対応・脆弱性診断・運用設計の長文記述。各シナリオで対策を 3 段階（予防・検知・対応）で書き分ける訓練が有効。",
    hardSpots: ["TLS 1.3 / OAuth 2.1", "Active Directory 攻撃手法", "クラウド IAM / SaaS セキュリティ"],
    exampleSubjects: ["インシデントレスポンス", "脆弱性診断", "セキュリティ統制"],
    career: "登録セキスペ（RISS）として 3 年ごとの更新で維持する、セキュリティ分野の名称独占資格（業務独占ではない）。",
  },
  sm: {
    code: "sm",
    label: "ITサービスマネージャ試験",
    shortLabel: "ITサービスマネージャ",
    level: "skill4",
    passRate: "おおむね 14〜16%",
    studyHours: "300〜450 時間",
    targetAudience: "IT 運用責任者・サービスマネージャ",
    topics: ["インシデント管理", "問題管理", "変更管理", "可用性管理", "キャパシティ管理", "事業継続"],
    morningStrategy: "ITIL 4 と JIS Q 20000 の知識領域がほぼ全範囲。略語暗記が最短。",
    afternoonStrategy:
      "午後 I はサービス運用事例の記述、午後 II は論文。SLA 違反 / インシデント / キャパシティ計画の 3 テーマを軸に書ける状態を作る。",
    hardSpots: ["RTO / RPO の根拠付け", "DR テストの妥当性", "SLA / SLO 設計"],
    exampleSubjects: ["インシデント管理", "問題管理", "サービス継続"],
    career: "IT 運用部門の管理職や MSP（マネージドサービス提供者）の責任者向けの資格。",
  },
  au: {
    code: "au",
    label: "システム監査技術者試験",
    shortLabel: "システム監査",
    level: "skill4",
    passRate: "おおむね 14〜16%",
    studyHours: "300〜450 時間",
    targetAudience: "情報システム監査人 / 内部統制責任者",
    topics: ["システム監査基準", "リスク評価", "コントロール評価", "情報セキュリティ監査", "業務監査"],
    morningStrategy: "午前 II は監査基準・準則・JIS Q シリーズの用語が中心。最新の改訂に注意。",
    afternoonStrategy:
      "午後 I は監査事例の記述、午後 II は論文。監査計画 → 統制評価 → 改善提案の三段階で書く形式を体に叩き込む。",
    hardSpots: ["内部統制報告制度（J-SOX）", "クラウド監査", "サイバーセキュリティ監査"],
    exampleSubjects: ["業務監査", "情報セキュリティ監査", "システム開発監査"],
    career: "公認システム監査人・公認情報システム監査人の補完として活用される。",
  },
};

export const EXAM_CODES: ExamCode[] = [
  "ip",
  "sg",
  "fe",
  "ap",
  "st",
  "sa",
  "pm",
  "nw",
  "db",
  "es",
  "sc",
  "sm",
  "au",
];
