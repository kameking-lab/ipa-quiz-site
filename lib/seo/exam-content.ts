import type { ExamCode } from "@/lib/questions/types";

/**
 * 試験区分ごとの深いコンテンツ。
 *  - leadParagraph: 試験の位置づけ・対象者・実施形式・キャリア接続を 200-300 字で示すリード文
 *  - mainTopics: 主要出題分野（5-10 項目）。シラバスと過去問頻出分野を参考に編集
 *  - relatedExams: 関連試験区分。受験前後で繋がるキャリアパスを内部リンク化
 *
 * 文章は IPA 公開情報と一般的な学習文献を参考に編集したオリジナル。
 * 外部 API 生成ではなく、教育貢献の体裁で過剰最適化を避ける。
 */
export interface ExamMainTopic {
  name: string;
  description: string;
}

export interface ExamRelatedLink {
  exam: ExamCode;
  reason: string;
}

export interface ExamDeepContent {
  leadParagraph: string;
  mainTopics: ExamMainTopic[];
  relatedExams: ExamRelatedLink[];
}

export const EXAM_DEEP_CONTENT: Record<ExamCode, ExamDeepContent> = {
  ip: {
    leadParagraph:
      "IT パスポート試験（IP）は、職種や業種を問わずすべての社会人・学生が IT を活用するうえで必要な基礎知識を測る、IPA の国家試験エントリーレベルです。出題はストラテジ系・マネジメント系・テクノロジ系の 3 領域からバランス良く構成され、CBT 方式で通年受験できます。社会人の DX 学習や就職活動でのアピール、上位試験への足がかりとして広く受験されています。",
    mainTopics: [
      { name: "ストラテジ系", description: "企業活動・経営戦略・システム戦略の基礎を問う領域。" },
      { name: "マネジメント系", description: "プロジェクト管理・サービスマネジメント・監査の入口。" },
      { name: "テクノロジ系", description: "コンピュータ構成・ネットワーク・データベースの全体像。" },
      { name: "情報セキュリティ", description: "脅威・対策・パスワード管理など基礎リテラシ。" },
      { name: "法務・コンプライアンス", description: "個人情報保護法・著作権法など IT 関連法規。" },
      { name: "AI・データ活用", description: "AI 倫理・データサイエンス・統計の入門知識。" },
    ],
    relatedExams: [
      { exam: "sg", reason: "セキュリティをもう一段深掘りしたい人の次のステップ。" },
      { exam: "fe", reason: "IT エンジニアを志すなら次に挑戦する登竜門。" },
    ],
  },
  sg: {
    leadParagraph:
      "情報セキュリティマネジメント試験（SG）は、組織内で情報セキュリティ対策を推進する立場の人材を認定する国家試験です。技術的詳細よりも、企業のセキュリティポリシー・リスクマネジメント・インシデント対応の組織運用を中心に問います。CBT で通年受験でき、情報システム部門以外の管理職や、現場担当者がセキュリティ教育の起点として受験するケースが増えています。",
    mainTopics: [
      { name: "情報セキュリティ全般", description: "脅威・脆弱性・リスクアセスメントの基本。" },
      { name: "ISMS・組織管理", description: "ISO/IEC 27001 に沿った情報セキュリティマネジメントシステム。" },
      { name: "個人情報保護", description: "個人情報保護法・GDPR・委託管理の実務。" },
      { name: "セキュリティ技術", description: "認証・暗号・アクセス制御の基礎知識。" },
      { name: "インシデント対応", description: "CSIRT 運用・事故対応・事業継続計画。" },
      { name: "関連法規・ガイドライン", description: "サイバーセキュリティ基本法・各種ガイドライン。" },
    ],
    relatedExams: [
      { exam: "ip", reason: "より基礎の IT 全般リテラシから順に学びたい人向け。" },
      { exam: "sc", reason: "技術寄りの上位試験。RISS 登録までの王道。" },
      { exam: "ap", reason: "セキュリティ含む IT 全分野を中堅レベルで証明する道。" },
    ],
  },
  fe: {
    leadParagraph:
      "基本情報技術者試験（FE）は、IT エンジニアの登竜門と位置づけられる国家試験で、ソフトウェア開発に従事する人が共通して持つべき基礎知識・基礎技能を測ります。2023 年度から CBT 通年実施へ移行し、科目 A（知識）と科目 B（擬似言語・情報セキュリティの長文）の二段構成。学生・新人エンジニアが最初に挑戦する目標として標準的に採用されています。",
    mainTopics: [
      { name: "アルゴリズムとプログラミング", description: "擬似言語によるトレース、データ構造、計算量。" },
      { name: "コンピュータ構成要素", description: "プロセッサ・メモリ・入出力の基本動作。" },
      { name: "システム構成要素", description: "クライアントサーバ・仮想化・性能設計。" },
      { name: "ネットワーク", description: "OSI 参照モデル・TCP/IP・無線通信の基本。" },
      { name: "データベース", description: "関係モデル・SQL・トランザクションの基本。" },
      { name: "情報セキュリティ", description: "暗号・認証・脆弱性対策・マルウェア対応。" },
      { name: "ソフトウェア開発", description: "開発プロセス・テスト技法・品質管理。" },
      { name: "マネジメント・ストラテジ", description: "プロジェクト管理・経営戦略・法務の基礎。" },
    ],
    relatedExams: [
      { exam: "ip", reason: "FE より前にまず IT 全般の基礎を固めたい人向け。" },
      { exam: "ap", reason: "FE 合格後の自然な次のステップ。中堅エンジニア証明。" },
      { exam: "sg", reason: "セキュリティ系で進みたい場合の並行受験候補。" },
    ],
  },
  ap: {
    leadParagraph:
      "応用情報技術者試験（AP）は、IT エンジニアとして数年の実務経験を持つ中堅層の知識・応用力を測る国家試験です。午前 80 問（多肢選択）と午後（記述）の二段構成で、テクノロジから経営戦略・プロジェクト管理まで幅広い分野を横断的に問います。合格すると一部の高度試験で午前 I が 2 年間免除され、高度試験挑戦への現実的な足がかりとなる位置づけです。",
    mainTopics: [
      { name: "テクノロジ系基礎", description: "ハードウェア・OS・ネットワーク・DB・セキュリティ。" },
      { name: "ソフトウェア開発", description: "開発手法・テスト・品質管理・モジュール設計。" },
      { name: "システム戦略・経営戦略", description: "IT 投資判断・事業戦略・マーケティング。" },
      { name: "プロジェクトマネジメント", description: "計画・進捗・コスト・リスク・調達管理。" },
      { name: "サービスマネジメント", description: "ITIL・SLA・インシデント・キャパシティ管理。" },
      { name: "システム監査", description: "監査計画・実施・報告・内部統制の基礎。" },
      { name: "情報セキュリティ", description: "脅威分析・暗号・認証・セキュアプログラミング。" },
      { name: "アルゴリズム・プログラミング", description: "計算量・データ構造・実装パターン。" },
    ],
    relatedExams: [
      { exam: "fe", reason: "AP の前提となる基礎レベル。順番に進むのが王道。" },
      { exam: "sc", reason: "AP 合格後の高度試験の中で最も人気の専門系。" },
      { exam: "nw", reason: "AP の次に進む高度試験の代表的選択肢。" },
      { exam: "pm", reason: "管理側にキャリアを伸ばすなら次の目標。" },
    ],
  },
  sc: {
    leadParagraph:
      "情報処理安全確保支援士試験（SC）は、サイバーセキュリティ分野唯一の登録制国家資格である情報処理安全確保支援士（登録セキスペ、英語名 RISS）の取得を目指す高度試験です。午前 I・II と午後の記述・長文問題を通じて、脅威・脆弱性管理から実践的なセキュリティ設計・運用、関連法規までを問います。年 2 回（春・秋）実施で、登録後は 3 年ごとの講習で資格を維持します。",
    mainTopics: [
      { name: "暗号・認証技術", description: "公開鍵暗号・電子署名・PKI・多要素認証。" },
      { name: "脆弱性管理", description: "OWASP Top 10・CVE・脆弱性診断・パッチ管理。" },
      { name: "ネットワークセキュリティ", description: "FW・IDS/IPS・VPN・ゼロトラスト・WAF。" },
      { name: "セキュアプログラミング", description: "入力検証・出力エンコード・セッション管理。" },
      { name: "インシデント対応", description: "CSIRT・SIEM・フォレンジック・脅威ハンティング。" },
      { name: "セキュリティ運用", description: "監査・ログ管理・特権 ID 管理・教育施策。" },
      { name: "セキュリティ関連法規", description: "個人情報保護法・サイバーセキュリティ基本法。" },
      { name: "クラウド・新領域", description: "クラウドセキュリティ・コンテナ・IoT/OT・AI。" },
    ],
    relatedExams: [
      { exam: "ap", reason: "SC の前提となる中堅レベルの知識。午前 I 免除のため先に取得する人多数。" },
      { exam: "sg", reason: "管理側の入門。SC へ進む前に体系を掴むのに適する。" },
      { exam: "nw", reason: "ネットワーク詳細を強化したい場合の併願。" },
      { exam: "au", reason: "セキュリティを評価する立場（監査）へ進む道。" },
    ],
  },
  nw: {
    leadParagraph:
      "ネットワークスペシャリスト試験（NW）は、ネットワーク分野の専門技術者として高度な設計・構築・運用能力を持つことを認定する高度試験です。午前 I・II と午後 I・II の四段構成で、TCP/IP の挙動・ルーティング・冗長・無線・セキュリティなど幅広いプロトコルと、要件に基づく方式設計の判断力を問います。春期年 1 回実施で、ベンダー資格と並んでネットワーク設計者のキャリア証明として高く評価されます。",
    mainTopics: [
      { name: "プロトコル基礎", description: "OSI/TCP-IP 階層・Ethernet・IP・TCP/UDP の挙動。" },
      { name: "ルーティング", description: "OSPF・BGP・経路制御・冗長化（VRRP・HSRP）。" },
      { name: "スイッチング・L2", description: "VLAN・STP・リンクアグリゲーション・QoS。" },
      { name: "無線・モバイル", description: "Wi-Fi 6/7・802.1X 認証・モバイル網接続。" },
      { name: "ネットワーク設計", description: "可用性・拡張性・性能・帯域設計・トラフィック解析。" },
      { name: "セキュリティ", description: "FW・IDS/IPS・VPN（IPsec/SSL）・ゼロトラスト。" },
      { name: "クラウド・SDN", description: "VPC・Direct Connect・SD-WAN・NFV。" },
      { name: "運用管理", description: "SNMP・syslog・障害対応・キャパシティ管理。" },
    ],
    relatedExams: [
      { exam: "ap", reason: "NW の前提となる中堅レベル。午前 I 免除目的でも先に取得が王道。" },
      { exam: "sc", reason: "セキュリティ詳細を強化したい場合の併願。" },
      { exam: "es", reason: "通信機器・組込みネットワーク領域に近接。" },
    ],
  },
  db: {
    leadParagraph:
      "データベーススペシャリスト試験（DB）は、データベースの設計・構築・運用・保守を担う専門技術者の能力を認定する高度試験です。午前 I・II と午後 I・II の四段構成で、概念・論理・物理設計、SQL 記述、性能チューニング、トランザクション管理を実務に近い長文記述で問います。秋期年 1 回実施で、データ基盤エンジニア・データアーキテクトの代表的なキャリア証明となります。",
    mainTopics: [
      { name: "概念設計（ER 図）", description: "業務要件のエンティティ抽出と関係定義。" },
      { name: "論理設計・正規化", description: "1NF〜BCNF・主キー/外部キー・スキーマ正規化。" },
      { name: "物理設計", description: "インデックス・パーティション・ストレージ設計。" },
      { name: "SQL", description: "結合・副問合せ・集約・ウィンドウ関数・SQL 性能。" },
      { name: "トランザクション管理", description: "ACID・ロック・分離レベル・MVCC。" },
      { name: "性能チューニング", description: "実行計画・統計情報・パラメタ調整。" },
      { name: "バックアップ・リカバリ", description: "ログ管理・ポイントインタイム復旧・レプリ。" },
      { name: "新興 DB", description: "NoSQL・分散 DB・クラウド DB（Aurora・Spanner 等）。" },
    ],
    relatedExams: [
      { exam: "ap", reason: "DB の前提となる中堅レベル。午前 I 免除目的でも先に取得が王道。" },
      { exam: "nw", reason: "分散 DB・レプリの背景にあるネットワーク知識を強化。" },
      { exam: "es", reason: "組込み・IoT データ取り扱い領域での接点。" },
    ],
  },
  st: {
    leadParagraph:
      "IT ストラテジスト試験（ST）は、経営戦略に基づき情報技術戦略を策定・実行する上位プロフェッショナル（CIO・DX 推進リーダー・IT コンサル）を認定する最高峰の高度試験です。午前 I・II と午後 I（記述）・午後 II（論文 2,200 字）の四段構成で、ビジネスモデル変革・IT 投資判断・全社業務改革の構想力を問います。春期年 1 回実施で、難関論文試験の代表格として位置づけられます。",
    mainTopics: [
      { name: "経営戦略", description: "全社戦略・事業戦略・競争戦略・成長戦略。" },
      { name: "IT 戦略・DX", description: "デジタル戦略・データ活用戦略・IT 投資判断。" },
      { name: "業務プロセス改革（BPR）", description: "業務分析・As-Is/To-Be・効果測定。" },
      { name: "情報システム戦略", description: "全体最適・標準化・SoR/SoE の使い分け。" },
      { name: "新規ビジネス企画", description: "プラットフォーム戦略・サービス設計。" },
      { name: "IT 投資マネジメント", description: "投資ポートフォリオ・ROI/NPV・効果検証。" },
      { name: "リスク・コンプライアンス", description: "経営リスク管理・内部統制・規制対応。" },
      { name: "論述力", description: "課題→施策→効果の論理展開と業務事例化。" },
    ],
    relatedExams: [
      { exam: "ap", reason: "ST の前提となる中堅レベル。午前 I 免除目的でも先に取得が王道。" },
      { exam: "sa", reason: "戦略を具体的なシステム設計に落とす隣接領域。" },
      { exam: "pm", reason: "戦略の遂行を担うプロジェクトマネジメントへの接続。" },
      { exam: "au", reason: "経営に対する独立評価の視点へ広げる選択肢。" },
    ],
  },
  sa: {
    leadParagraph:
      "システムアーキテクト試験（SA）は、情報システム全体のアーキテクチャ設計を統括する高度試験です。午前 I・II と午後 I（記述）・午後 II（論文）の四段構成で、要件定義・方式設計・移行計画・非機能要件の判断力を、業務事例の論述を通じて問います。春期年 1 回実施で、大規模システムの設計判断を担うリードアーキテクト・テックリードの代表的なキャリア証明として認知されています。",
    mainTopics: [
      { name: "要件定義", description: "業務要件分析・利害関係者調整・要件管理。" },
      { name: "システム方式設計", description: "アーキテクチャパターン・分散・連携方式。" },
      { name: "ソフトウェア設計", description: "モジュール構造・API・インターフェース設計。" },
      { name: "非機能要件", description: "性能・可用性・拡張性・運用性・セキュリティ。" },
      { name: "データ設計", description: "概念データモデル・データ連携・ETL。" },
      { name: "移行・運用設計", description: "移行戦略・並行稼働・運用引継ぎ。" },
      { name: "クラウド・モダンアーキ", description: "マイクロサービス・コンテナ・サーバレス。" },
      { name: "論述力", description: "業務事例から設計判断を構造化して書く力。" },
    ],
    relatedExams: [
      { exam: "ap", reason: "SA の前提となる中堅レベル。午前 I 免除目的でも先に取得が王道。" },
      { exam: "st", reason: "上位の戦略策定へ進むキャリアパス。" },
      { exam: "pm", reason: "設計を実行に移すプロジェクト管理側の選択肢。" },
      { exam: "nw", reason: "非機能要件のうち通信設計を深堀りしたい場合。" },
    ],
  },
  pm: {
    leadParagraph:
      "プロジェクトマネージャ試験（PM）は、情報システム開発プロジェクトを統括する PM の能力を認定する高度試験です。午前 I・II と午後 I（記述）・午後 II（論文）の四段構成で、PMBOK・PRINCE2 系の知識体系に加え、スコープ・コスト・スケジュール・品質・リスク・調達・ステークホルダーの統合管理力を業務事例論述で問います。秋期年 1 回実施で、IT 業界では PMO・部長候補の到達点としても扱われます。",
    mainTopics: [
      { name: "プロジェクト統合管理", description: "PMP/PMBOK・プロジェクト憲章・統合変更。" },
      { name: "スコープ管理", description: "WBS・要件管理・変更要求対応。" },
      { name: "スケジュール管理", description: "PERT・CPM・EVM・進捗報告。" },
      { name: "コスト・調達管理", description: "見積技法・契約形態・サプライヤ管理。" },
      { name: "品質管理", description: "品質計画・レビュー・テスト戦略・メトリクス。" },
      { name: "リスク管理", description: "リスク識別・定量分析・対応策・予備費。" },
      { name: "人的資源・コミュニケーション", description: "チーム編成・教育・利害関係者調整。" },
      { name: "論述力", description: "業務事例の課題→施策→効果を構造化する技能。" },
    ],
    relatedExams: [
      { exam: "ap", reason: "PM の前提となる中堅レベル。午前 I 免除目的でも先に取得が王道。" },
      { exam: "sm", reason: "プロジェクト後の運用フェーズ管理側へ接続。" },
      { exam: "st", reason: "戦略策定側へキャリアを伸ばす場合の選択肢。" },
      { exam: "au", reason: "PM 経験を生かして監査側へ進む道。" },
    ],
  },
  es: {
    leadParagraph:
      "エンベデッドシステムスペシャリスト試験（ES）は、組込みシステム・IoT デバイスの専門技術者を認定する高度試験です。午前 I・II と午後 I・II の四段構成で、RTOS・ハードウェア制御・タスクスケジューリング・組込み通信・機能安全といった、ハードウェアとソフトウェアの境界を扱う設計力を問います。秋期年 1 回実施で、製造業の組込みエンジニア・IoT 設計者の代表的なキャリア証明として位置づけられています。",
    mainTopics: [
      { name: "組込み OS・RTOS", description: "タスク・割込み・スケジューリング・同期排他。" },
      { name: "ハードウェア基礎", description: "プロセッサ・メモリ・バス・センサ・アクチュエータ。" },
      { name: "リアルタイム性能", description: "応答時間・優先度・WCET 解析・実時間保証。" },
      { name: "組込み通信", description: "CAN・LIN・Modbus・MQTT・BLE・LoRa。" },
      { name: "機能安全・信頼性", description: "FMEA・FTA・ISO 26262・IEC 61508。" },
      { name: "省電力・性能設計", description: "クロック制御・スリープ・低消費電力設計。" },
      { name: "テスト・デバッグ", description: "HILS・SILS・カバレッジ・トレース分析。" },
      { name: "IoT・クラウド連携", description: "エッジ処理・OTA・デバイス管理・セキュリティ。" },
    ],
    relatedExams: [
      { exam: "ap", reason: "ES の前提となる中堅レベル。午前 I 免除目的でも先に取得が王道。" },
      { exam: "nw", reason: "IoT 通信・無線設計を強化したい場合の併願。" },
      { exam: "db", reason: "IoT データ収集・蓄積基盤を扱う場合の接点。" },
    ],
  },
  sm: {
    leadParagraph:
      "IT サービスマネージャ試験（SM）は、IT サービスの安定運用とマネジメントを担うプロフェッショナルを認定する高度試験です。午前 I・II と午後 I（記述）・午後 II（論文）の四段構成で、ITIL/ISO 20000 系のサービスマネジメント体系に基づくインシデント・問題・変更・構成・キャパシティ・継続性の各管理を、業務事例論述で問います。春期年 1 回実施で、運用部門のリーダー・SRE マネージャの代表的キャリア証明です。",
    mainTopics: [
      { name: "サービス戦略", description: "サービスポートフォリオ・SLA 設計・需要管理。" },
      { name: "サービス設計", description: "可用性・キャパシティ・継続性・情報セキュリティ。" },
      { name: "サービス移行", description: "変更管理・リリース・構成管理・ナレッジ管理。" },
      { name: "サービス運用", description: "イベント・インシデント・問題管理・要求実現。" },
      { name: "継続的サービス改善", description: "メトリクス・CSI・KPI・改善活動。" },
      { name: "事業継続管理", description: "BCP・DR・RTO/RPO・訓練・復旧手順。" },
      { name: "コスト・要員管理", description: "サービスコスト・予算・SLM・スタッフ計画。" },
      { name: "論述力", description: "業務事例の改善活動を構造化して書く技能。" },
    ],
    relatedExams: [
      { exam: "ap", reason: "SM の前提となる中堅レベル。午前 I 免除目的でも先に取得が王道。" },
      { exam: "pm", reason: "開発側のプロジェクト管理から運用側への移行に位置。" },
      { exam: "au", reason: "サービス運用を評価する立場（監査）への接続。" },
      { exam: "sc", reason: "セキュリティインシデント対応の専門性を強化。" },
    ],
  },
  au: {
    leadParagraph:
      "システム監査技術者試験（AU）は、情報システムの信頼性・安全性・効率性を独立した立場から監査する監査人の能力を認定する高度試験です。午前 I・II と午後 I（記述）・午後 II（論文）の四段構成で、システム監査基準・管理基準・J-SOX・COBIT などを踏まえたリスクベースド監査の計画・実施・報告の判断力を、業務事例論述で問います。秋期年 1 回実施で、内部監査人・IT コンサルの最終ゴールとして位置づけられます。",
    mainTopics: [
      { name: "システム監査基準", description: "監査人の倫理・独立性・適格性・専門能力。" },
      { name: "システム管理基準", description: "IT ガバナンス・全社管理・個別管理基準。" },
      { name: "リスクアセスメント", description: "リスク識別・評価・統制設計・残余リスク。" },
      { name: "内部統制・J-SOX", description: "全社統制・業務処理統制・IT 全般統制。" },
      { name: "COBIT・標準フレーム", description: "COBIT 2019・COSO・ISO 19011 等。" },
      { name: "監査手続", description: "監査計画・予備調査・本調査・監査証拠。" },
      { name: "監査報告・指導", description: "監査調書・指摘事項・改善勧告・フォロー。" },
      { name: "論述力", description: "監査人視点の判断・根拠を構造化して書く技能。" },
    ],
    relatedExams: [
      { exam: "ap", reason: "AU の前提となる中堅レベル。午前 I 免除目的でも先に取得が王道。" },
      { exam: "sm", reason: "監査対象となるサービス運用の体系理解。" },
      { exam: "sc", reason: "監査対象となるセキュリティ統制の体系理解。" },
      { exam: "st", reason: "経営層対話のため戦略視点を強化する選択肢。" },
    ],
  },
};
