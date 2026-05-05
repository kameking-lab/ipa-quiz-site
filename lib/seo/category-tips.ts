/**
 * 分野（category）ごとの汎用学習ポイント。
 * 個別問題ページに「関連知識を整理する」ためのコンテキストとして表示する。
 * 出典: IPA シラバス (https://www.ipa.go.jp/shiken/syllabus/) の主要キーワードを基に編集。
 */
export interface CategoryTip {
  /** 何を理解すれば得点できるか（1行） */
  whatMatters: string;
  /** 学習の進め方ヒント（1〜2行） */
  howToStudy: string;
  /** よく出る関連キーワード */
  relatedKeywords: string[];
}

const TIPS: Record<string, CategoryTip> = {
  基礎理論: {
    whatMatters:
      "2進数・論理演算・確率・統計など、IT全般の土台となる数学・離散構造の理解度。",
    howToStudy:
      "公式の暗記ではなく、ビット表現や真理値表を「手で書ける」状態を作る。例題を3パターン以上手で解いて感覚化する。",
    relatedKeywords: ["2進数", "論理演算", "シフト演算", "誤差", "確率", "情報量"],
  },
  アルゴリズムとプログラミング: {
    whatMatters:
      "計算量（O 記法）・基本データ構造・典型アルゴリズム（探索・整列）・再帰の挙動を読む力。",
    howToStudy:
      "擬似コードを実際にトレースして変数の遷移を表に書き出す習慣を付ける。スタック/キュー/木の図示が定着の鍵。",
    relatedKeywords: ["計算量", "二分探索", "クイックソート", "再帰", "スタック", "キュー", "木構造"],
  },
  コンピュータ構成要素: {
    whatMatters:
      "CPU・キャッシュ・パイプライン・割込みなど、ハードウェアと OS の境界の挙動の理解。",
    howToStudy:
      "MIPS / クロック / CPI などの計算式を手で再現できるようにする。キャッシュヒット率の計算は頻出。",
    relatedKeywords: ["CPU", "キャッシュ", "パイプライン", "MIPS", "命令実行", "割込み"],
  },
  システム構成要素: {
    whatMatters:
      "可用性・信頼性・性能（スループット/レスポンスタイム）・冗長構成の評価指標。",
    howToStudy:
      "RASIS と稼働率（直列・並列）の式は計算演習で固める。クラスタ／クラウドの典型構成を図で覚える。",
    relatedKeywords: ["稼働率", "MTBF", "MTTR", "RAID", "クラスタ", "負荷分散", "仮想化"],
  },
  ソフトウェア: {
    whatMatters:
      "OS の基本機能（プロセス・メモリ管理・ファイルシステム）と、開発を支えるミドルウェアの役割。",
    howToStudy:
      "プロセスとスレッドの違い、ページング/スワッピングの違いなど、似た用語を表で対比して覚える。",
    relatedKeywords: ["プロセス", "スレッド", "セマフォ", "デッドロック", "仮想メモリ", "ファイルシステム"],
  },
  ハードウェア: {
    whatMatters:
      "論理回路・順序回路・記憶素子・電源など、物理層に近いコンポーネントの挙動。",
    howToStudy:
      "真理値表と論理回路図を相互に変換できるよう演習する。フリップフロップの状態遷移は頻出。",
    relatedKeywords: ["論理回路", "フリップフロップ", "DRAM", "SRAM", "A/D変換"],
  },
  ヒューマンインタフェース: {
    whatMatters:
      "ユーザビリティ評価（ヒューリスティック/認知的ウォークスルー）・アクセシビリティ規格。",
    howToStudy:
      "JIS X 8341 などの規格名と、ニールセンの 10 原則の対応を整理しておく。",
    relatedKeywords: ["ユーザビリティ", "アクセシビリティ", "WCAG", "JIS X 8341", "認知的ウォークスルー"],
  },
  マルチメディア: {
    whatMatters:
      "画像・音声・動画の符号化方式と、それぞれの圧縮アルゴリズムの違い。",
    howToStudy:
      "可逆/非可逆、フレーム間/フレーム内の対比で整理する。CG の隠面消去・レンダリング技法も周辺知識として押さえる。",
    relatedKeywords: ["JPEG", "MPEG", "MP3", "可逆圧縮", "ハフマン符号", "ラスタ", "ベクタ"],
  },
  データベース: {
    whatMatters:
      "正規化・SQL・トランザクション特性（ACID）・同時実行制御・分散DBの基本。",
    howToStudy:
      "ER 図 ⇄ 関係スキーマ ⇄ SQL の3者を行き来できるよう演習。3NF までの正規化を手で実行できると強い。",
    relatedKeywords: ["正規化", "SQL", "ACID", "トランザクション", "ロック", "デッドロック", "ER図"],
  },
  ネットワーク: {
    whatMatters:
      "OSI/TCP-IP の各層の責務と、ルーティング・名前解決・暗号通信の代表的プロトコル挙動。",
    howToStudy:
      "サブネット計算は手で繰り返す。HTTP/TLS/DNS のメッセージシーケンスを図で覚えると応用が利く。",
    relatedKeywords: ["TCP/IP", "サブネット", "DNS", "HTTP", "TLS", "ルーティング", "VLAN"],
  },
  セキュリティ: {
    whatMatters:
      "脅威モデル・暗号方式（共通鍵/公開鍵/ハッシュ）・認証/認可・主要攻撃と対策の対応関係。",
    howToStudy:
      "OWASP Top 10 と各対策、CVE/CVSS、認証プロトコル（OAuth/OIDC/SAML）を表で整理しておく。",
    relatedKeywords: [
      "公開鍵暗号",
      "ハッシュ",
      "デジタル署名",
      "OAuth",
      "SQLインジェクション",
      "XSS",
      "CSRF",
      "OWASP",
    ],
  },
  システム開発技術: {
    whatMatters:
      "要件定義 → 設計 → 実装 → テストの開発工程モデルと、テスト技法の使い分け。",
    howToStudy:
      "ウォーターフォール・アジャイル・スパイラルの長短を比較表で。テスト技法はホワイトボックス/ブラックボックスの分岐網羅率がよく問われる。",
    relatedKeywords: [
      "ウォーターフォール",
      "アジャイル",
      "ユースケース",
      "UML",
      "ブラックボックス",
      "境界値分析",
    ],
  },
  ソフトウェア開発管理技術: {
    whatMatters:
      "構成管理・バージョン管理・ライセンス管理・開発プロセス成熟度モデルの位置付け。",
    howToStudy:
      "CMMI レベル、SLCP-JCF、OSS ライセンスの種類と派生条件を整理する。",
    relatedKeywords: ["CMMI", "SLCP", "OSS", "GPL", "MIT", "構成管理", "Git"],
  },
  プロジェクトマネジメント: {
    whatMatters:
      "PMBOK の 10 知識エリアと、スコープ／スケジュール／コスト／リスク管理の基本手法。",
    howToStudy:
      "EVM（PV/EV/AC/SV/CV）の計算は頻出。クリティカルパス法と PERT を手で計算できるようにする。",
    relatedKeywords: ["PMBOK", "EVM", "WBS", "クリティカルパス", "PERT", "リスク登録簿"],
  },
  サービスマネジメント: {
    whatMatters:
      "ITIL のサービスライフサイクル、SLA/OLA、インシデント／問題／変更の管理プロセスの違い。",
    howToStudy:
      "似た用語（インシデント vs 問題、変更 vs リリース）の対比を表で押さえる。CAB の役割も頻出。",
    relatedKeywords: ["ITIL", "SLA", "インシデント管理", "問題管理", "変更管理", "CAB"],
  },
  システム監査: {
    whatMatters:
      "監査の独立性・客観性、監査計画・実施・報告・フォローアップの一連プロセス、内部統制との関係。",
    howToStudy:
      "システム監査基準・システム管理基準の構成を一読し、COSO/COBIT との関係を整理する。",
    relatedKeywords: ["監査基準", "内部統制", "COSO", "COBIT", "監査証拠", "監査調書"],
  },
  システム戦略: {
    whatMatters:
      "経営戦略 → IT 戦略 → エンタープライズアーキテクチャ → 個別システム企画の連関。",
    howToStudy:
      "BSC・SWOT・3C・5フォース・バリューチェーンの典型フレームワークの使い分けを押さえる。",
    relatedKeywords: ["BSC", "SWOT", "5フォース", "EA", "BPR", "DX"],
  },
  システム企画: {
    whatMatters:
      "情報システム化計画・要件定義・調達計画 (RFI/RFP/RFQ) の流れと成果物。",
    howToStudy:
      "RFI/RFP/RFQ の違いと提案評価方法は頻出。ベンダ選定の判断基準を整理する。",
    relatedKeywords: ["RFI", "RFP", "RFQ", "ベンダ選定", "ROI", "TCO"],
  },
  経営戦略マネジメント: {
    whatMatters:
      "競争戦略・成長戦略・マーケティング戦略の理論枠組みと、代表事例への適用力。",
    howToStudy:
      "ポーターの3つの競争戦略（コストリーダーシップ/差別化/集中）とアンゾフの成長マトリクスは即答できるレベルにする。",
    relatedKeywords: ["ポーター", "アンゾフ", "PPM", "差別化戦略", "ブルーオーシャン"],
  },
  技術戦略マネジメント: {
    whatMatters:
      "技術ポートフォリオ・MOT・イノベーションのジレンマ・キャズム理論など、技術投資の意思決定。",
    howToStudy:
      "破壊的イノベーションと持続的イノベーションの対比、ロジャースの普及理論は頻出。",
    relatedKeywords: ["MOT", "キャズム", "破壊的イノベーション", "ロジャース", "デルファイ法"],
  },
  ビジネスインダストリ: {
    whatMatters:
      "EC・FinTech・IoT・ビッグデータ・AI など、産業 IT 適用領域の代表的なビジネスモデル。",
    howToStudy:
      "用語のスコープを混同しないよう、AI/IoT/RPA/ブロックチェーンなどの「何ができる/できない」で整理。",
    relatedKeywords: ["IoT", "FinTech", "EDI", "CRM", "SFA", "シェアリングエコノミー"],
  },
  企業活動: {
    whatMatters:
      "企業会計・財務指標・組織形態・OR/IE 手法（線形計画・在庫管理・QC七つ道具）。",
    howToStudy:
      "損益分岐点・ROI・在庫回転率は計算問題で頻出。QC七つ道具と新QC七つ道具の対比を覚える。",
    relatedKeywords: ["損益分岐点", "ROI", "在庫管理", "QC七つ道具", "ABC分析", "BPR"],
  },
  法務: {
    whatMatters:
      "知的財産権・労働関連法規・取引関連法規・セキュリティ関連法規の射程の整理。",
    howToStudy:
      "著作権・特許権・不正競争防止法のカバー範囲、労働者派遣法と請負契約の違いは頻出。",
    relatedKeywords: ["著作権", "特許権", "不正アクセス禁止法", "個人情報保護法", "労働者派遣法"],
  },
};

const FALLBACK_TIP: CategoryTip = {
  whatMatters: "本問の分野で問われる代表的な知識・用語の整理。",
  howToStudy:
    "正解／誤答の選択肢ごとに「なぜ正しい / なぜ違うのか」を1行ずつ言語化すると定着する。",
  relatedKeywords: [],
};

export function getCategoryTip(category: string): CategoryTip {
  return TIPS[category] ?? FALLBACK_TIP;
}
