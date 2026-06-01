export interface GlossaryTerm {
  /** 用語名 */
  term: string;
  /** よみ（五十音順ソート用） */
  reading: string;
  /** 英語表記 */
  english?: string;
  /** 短い定義 */
  short: string;
  /** 詳細説明（2-4 文） */
  detail: string;
  /** 関連トピックタグ（/topics へリンク） */
  relatedTopics?: string[];
  /** カテゴリ */
  category:
    | "basics"
    | "algorithm"
    | "hardware"
    | "system"
    | "network"
    | "database"
    | "security"
    | "development"
    | "management"
    | "strategy"
    | "law";
}

export const GLOSSARY_CATEGORY_LABELS: Record<GlossaryTerm["category"], string> =
  {
    basics: "基礎理論",
    algorithm: "アルゴリズム",
    hardware: "ハードウェア",
    system: "システム構成",
    network: "ネットワーク",
    database: "データベース",
    security: "セキュリティ",
    development: "開発技術",
    management: "マネジメント",
    strategy: "戦略・経営",
    law: "法務",
  };

export const GLOSSARY: GlossaryTerm[] = [
  {
    term: "ACID",
    reading: "あしっど",
    english: "Atomicity, Consistency, Isolation, Durability",
    category: "database",
    short: "信頼できるトランザクションが満たすべき 4 性質。",
    detail:
      "原子性（Atomicity）/ 一貫性（Consistency）/ 独立性（Isolation）/ 永続性（Durability）の 4 つを指す。RDBMS の基本要件で、SC/DB 試験で頻出。BASE と対比される。",
    relatedTopics: ["トランザクション", "ロック"],
  },
  {
    term: "B木 / B+木",
    reading: "びーき",
    english: "B-tree / B+-tree",
    category: "database",
    short: "ディスクアクセスを最小化する平衡多分木索引構造。",
    detail:
      "RDBMS の索引（インデックス）として広く使われる。B+ 木は葉ノードが連結リストを構成し、範囲検索に強い。MySQL InnoDB や PostgreSQL の B-tree 索引はこの構造。",
    relatedTopics: ["インデックス", "正規化"],
  },
  {
    term: "CIDR",
    reading: "さいだー",
    english: "Classless Inter-Domain Routing",
    category: "network",
    short: "クラスフルアドレス制を廃したサブネット表記方式。",
    detail:
      "IP アドレスを `192.168.0.0/24` のようにプレフィックス長で表現する。サブネット計算が頻出問題。NW・SC 試験で必須知識。",
    relatedTopics: ["サブネット", "TCP/IP", "IPv4"],
  },
  {
    term: "DNS",
    reading: "でぃーえぬえす",
    english: "Domain Name System",
    category: "network",
    short: "ドメイン名と IP アドレスを変換する階層型分散システム。",
    detail:
      "再帰問合せ・反復問合せの違いや、A/AAAA/CNAME/MX/TXT などのレコード種類が頻出。DNSSEC・DoH/DoT などのセキュア化方式も近年の出題ポイント。",
    relatedTopics: ["TCP/IP", "セキュリティ"],
  },
  {
    term: "EVM",
    reading: "いーぶいえむ",
    english: "Earned Value Management",
    category: "management",
    short: "進捗・コスト・実績を統合的に管理する PM 手法。",
    detail:
      "PV (計画値) / EV (出来高) / AC (実コスト) と、SV/CV/SPI/CPI を計算する設問が PM 試験で頻出。差異分析と完成時総コスト予測に使う。",
    relatedTopics: ["PMBOK", "進捗管理"],
  },
  {
    term: "ITIL",
    reading: "あいてぃる",
    english: "Information Technology Infrastructure Library",
    category: "management",
    short: "IT サービスマネジメントのベストプラクティス集。",
    detail:
      "現行は ITIL 4。サービスバリューシステム（SVS）・34 のプラクティスを定義。SM 試験で必須、AU・SC 試験でも周辺知識として頻出。",
    relatedTopics: ["サービスマネジメント", "SLA"],
  },
  {
    term: "JIT (Just-In-Time)",
    reading: "じゃすといんたいむ",
    english: "Just-In-Time",
    category: "strategy",
    short: "必要な時に必要な量だけ生産・調達する手法。",
    detail:
      "トヨタ生産方式の中核概念。在庫を減らしリードタイムを短縮する。ストラテジ系・経営戦略マネジメントで出題されることがある。",
    relatedTopics: ["在庫管理"],
  },
  {
    term: "OAuth 2.0",
    reading: "おーおーす",
    english: "OAuth 2.0",
    category: "security",
    short: "アクセス権限を委譲するための業界標準プロトコル。",
    detail:
      "クライアントがリソースサーバーにアクセスする許可を、リソースオーナーから取得するための仕組み。SC・AP・SG 試験で頻出。Authorization Code Flow が中心。",
    relatedTopics: ["認証", "OAuth", "OIDC"],
  },
  {
    term: "OWASP Top 10",
    reading: "おわすぷとっぷてん",
    english: "OWASP Top 10",
    category: "security",
    short: "Web アプリで最重要の脆弱性 10 種を OWASP が公表するリスト。",
    detail:
      "SQL インジェクション・XSS・CSRF・認証不備などが含まれ、SC 試験の必須知識。最新版は 2025 年版（2026 年 1 月公開）で、数年ごとに更新される。",
    relatedTopics: ["XSS", "CSRF", "SQLインジェクション", "OWASP"],
  },
  {
    term: "PMBOK",
    reading: "ぴんぼっく",
    english: "Project Management Body of Knowledge",
    category: "management",
    short: "PM の知識体系標準。PMI が発行する。",
    detail:
      "現行は第 7 版で、原則ベースのアプローチに転換した。10 知識エリアと 5 プロセス群（旧版）の対応関係は PM 試験で頻出。",
    relatedTopics: ["PMBOK", "WBS", "EVM"],
  },
  {
    term: "RAID",
    reading: "れいど",
    english: "Redundant Array of Independent Disks",
    category: "system",
    short: "複数ディスクを束ねて性能・信頼性を高める方式。",
    detail:
      "RAID 0/1/5/6/10 の特徴と必要ディスク数・実効容量・耐故障数を覚える。AP・FE 試験で必須、NW・DB でも周辺知識として出る。",
    relatedTopics: ["可用性", "ストレージ"],
  },
  {
    term: "SLA",
    reading: "えすえるえー",
    english: "Service Level Agreement",
    category: "management",
    short: "サービス提供者と利用者の間で結ぶ品質保証契約。",
    detail:
      "稼働率・応答時間・サポート対応時間などを数値で合意する。SLO（社内目標）・OLA（社内合意）との違いに注意。SM・SC・AU 試験で頻出。",
    relatedTopics: ["サービスマネジメント"],
  },
  {
    term: "SQL インジェクション",
    reading: "えすきゅーえるいんじぇくしょん",
    english: "SQL Injection",
    category: "security",
    short: "入力値経由で意図しない SQL を実行させる攻撃。",
    detail:
      "対策はプリペアドステートメント（バインド機構）の使用が基本。入力エスケープのみは不完全。SC・SG・AP で頻出。",
    relatedTopics: ["SQLインジェクション", "OWASP", "XSS"],
  },
  {
    term: "TCP/IP",
    reading: "てぃーしーぴーあいぴー",
    english: "TCP/IP",
    category: "network",
    short: "インターネットの基本通信プロトコル群。",
    detail:
      "リンク層・インターネット層・トランスポート層・アプリケーション層の 4 層モデル。OSI 参照モデルとの対比が頻出。NW 試験で必須。",
    relatedTopics: ["TCP/IP", "OSI"],
  },
  {
    term: "WBS",
    reading: "だぶりゅびーえす",
    english: "Work Breakdown Structure",
    category: "management",
    short: "プロジェクトの作業を階層的に分解した構造図。",
    detail:
      "成果物指向（Deliverable-oriented）に分解するのが基本。最下層がワークパッケージ。PM 試験で必須。",
    relatedTopics: ["PMBOK", "WBS"],
  },
  {
    term: "XSS",
    reading: "くろすさいとすくりぷてぃんぐ",
    english: "Cross-Site Scripting",
    category: "security",
    short: "他サイトの利用者ブラウザに不正スクリプトを実行させる攻撃。",
    detail:
      "反射型・蓄積型・DOM 型の 3 種類。対策は出力エスケープと CSP（Content-Security-Policy）。SC・SG で頻出。",
    relatedTopics: ["XSS", "OWASP", "CSRF"],
  },
  {
    term: "アジャイル",
    reading: "あじゃいる",
    english: "Agile",
    category: "development",
    short: "短い反復で漸進的にソフトウェアを開発する手法群。",
    detail:
      "スクラム・XP・カンバンなどの実装。ウォーターフォールとの対比、アジャイル宣言の 4 つの価値・12 の原則が頻出。",
    relatedTopics: ["アジャイル", "スクラム"],
  },
  {
    term: "公開鍵暗号",
    reading: "こうかいかぎあんごう",
    english: "Public-key Cryptography",
    category: "security",
    short: "公開鍵と秘密鍵のペアで暗号化・署名を行う方式。",
    detail:
      "RSA・楕円曲線暗号（ECC）が代表。共通鍵暗号との速度比較・鍵配送問題の解決手段としての役割が頻出。",
    relatedTopics: ["公開鍵暗号", "ハッシュ", "デジタル署名"],
  },
  {
    term: "クラウドコンピューティング",
    reading: "くらうどこんぴゅーてぃんぐ",
    english: "Cloud Computing",
    category: "system",
    short: "ネットワーク経由でコンピューティング資源を利用する形態。",
    detail:
      "IaaS / PaaS / SaaS のサービスモデルと、パブリック / プライベート / ハイブリッドの配備モデルの組合せが頻出。",
    relatedTopics: ["仮想化", "IaaS", "PaaS", "SaaS"],
  },
  {
    term: "正規化",
    reading: "せいきか",
    english: "Normalization",
    category: "database",
    short: "データの冗長を除去するスキーマ整理手順。",
    detail:
      "1NF/2NF/3NF/BCNF/4NF/5NF の段階を理解する。3NF まで解けることが DB 試験合格の最低ラインとされる。",
    relatedTopics: ["正規化", "ER図"],
  },
  {
    term: "デジタル署名",
    reading: "でじたるしょめい",
    english: "Digital Signature",
    category: "security",
    short: "メッセージに対して送信者の本人性と完全性を保証する暗号技術。",
    detail:
      "送信者の秘密鍵で署名し、受信者は公開鍵で検証。ハッシュ関数と組合せて使う。否認防止に有効。",
    relatedTopics: ["公開鍵暗号", "ハッシュ", "デジタル署名"],
  },
  {
    term: "ハッシュ関数",
    reading: "はっしゅかんすう",
    english: "Hash Function",
    category: "security",
    short: "任意長入力から固定長の出力を計算する一方向関数。",
    detail:
      "SHA-256・SHA-3・MD5 など。MD5/SHA-1 は安全でないとされる。パスワード保存にはソルト + 反復ハッシュが必須。",
    relatedTopics: ["ハッシュ", "公開鍵暗号"],
  },
  {
    term: "プロセス",
    reading: "ぷろせす",
    english: "Process",
    category: "system",
    short: "実行中のプログラムを表す OS の管理単位。",
    detail:
      "プロセス間でアドレス空間が独立しており、スレッドは同一アドレス空間を共有する。コンテキストスイッチのコストが性能に影響する。",
    relatedTopics: ["プロセス", "スレッド"],
  },
  {
    term: "ベンチマーク",
    reading: "べんちまーく",
    english: "Benchmark",
    category: "system",
    short: "性能を評価するための標準化された試験。",
    detail:
      "TPC-C・SPEC・LINPACK などが代表。AP・FE で名前と対象（DB/CPU/HPC など）の対応が頻出。",
    relatedTopics: ["性能評価"],
  },
  {
    term: "マシン学習",
    reading: "ましんがくしゅう",
    english: "Machine Learning",
    category: "basics",
    short: "データから自動的にパターンを学習する技術分野。",
    detail:
      "教師あり / 教師なし / 強化学習に大別される。AI ブームで近年 IT パスポート・基本情報・応用情報での出題比率が増えている。",
    relatedTopics: ["AI", "ニューラルネットワーク"],
  },
  {
    term: "個人情報保護法",
    reading: "こじんじょうほうほごほう",
    english: "Act on the Protection of Personal Information",
    category: "law",
    short: "個人情報の取扱いを規定する日本の法律。",
    detail:
      "2022 年改正で漏えい時の報告義務化、仮名加工情報の創設などが加わった。SG・SC・IP で頻出。",
    relatedTopics: ["個人情報保護法", "コンプライアンス"],
  },
  {
    term: "著作権",
    reading: "ちょさくけん",
    english: "Copyright",
    category: "law",
    short: "創作物に対して著作者が持つ独占的権利。",
    detail:
      "プログラム・データベースは著作物として保護される。職務著作の要件、引用の要件は IP・SG・AP で頻出。",
    relatedTopics: ["著作権", "知的財産権"],
  },
  {
    term: "二分探索",
    reading: "にぶんたんさく",
    english: "Binary Search",
    category: "algorithm",
    short: "ソート済み配列で中央値と比較する探索アルゴリズム。",
    detail:
      "計算量は O(log n)。線形探索 O(n) と比較する設問が頻出。FE・AP で計算量比較が出る。",
    relatedTopics: ["計算量", "二分探索"],
  },
  {
    term: "計算量 (O 記法)",
    reading: "けいさんりょう",
    english: "Big-O Notation",
    category: "algorithm",
    short: "アルゴリズムの実行時間/空間を入力サイズの関数で表す記法。",
    detail:
      "O(1), O(log n), O(n), O(n log n), O(n^2), O(2^n) の比較が頻出。FE 科目 B でアルゴリズム解析に必須。",
    relatedTopics: ["計算量"],
  },
  {
    term: "プロジェクト憲章",
    reading: "ぷろじぇくとけんしょう",
    english: "Project Charter",
    category: "management",
    short: "プロジェクトを正式に承認し、PM の権限を文書化する文書。",
    detail:
      "立ち上げプロセスの主要成果物。PMBOK の中で最初に作成される。PM 試験で頻出。",
    relatedTopics: ["PMBOK"],
  },
];
