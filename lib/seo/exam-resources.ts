import type { ExamCode } from "@/lib/questions/types";

/**
 * 各試験区分の IPA 公式リソース。
 * 出典: IPA 情報処理技術者試験 公式ページ（https://www.ipa.go.jp/shiken/）。
 * 公式情報を直接掲載することで E-E-A-T（権威性）を補強する。
 */
export interface ExamOfficialLinks {
  /** IPA 公式の試験概要ページ */
  overview: string;
  /** シラバス（出題範囲） PDF / ページ */
  syllabus: string;
  /** 過去問題の公開ページ */
  pastQuestions: string;
}

const IPA_BASE = "https://www.ipa.go.jp/shiken";

export const EXAM_OFFICIAL_LINKS: Record<ExamCode, ExamOfficialLinks> = {
  ip: {
    overview: `${IPA_BASE}/cbt/ip.html`,
    syllabus: `${IPA_BASE}/syllabus/index.html#section_ip`,
    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,
  },
  sg: {
    overview: `${IPA_BASE}/cbt/sg.html`,
    syllabus: `${IPA_BASE}/syllabus/index.html#section_sg`,
    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,
  },
  fe: {
    overview: `${IPA_BASE}/cbt/fe.html`,
    syllabus: `${IPA_BASE}/syllabus/index.html#section_fe`,
    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,
  },
  ap: {
    overview: `${IPA_BASE}/kubun/ap.html`,
    syllabus: `${IPA_BASE}/syllabus/index.html#section_ap`,
    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,
  },
  st: {
    overview: `${IPA_BASE}/kubun/st.html`,
    syllabus: `${IPA_BASE}/syllabus/index.html#section_st`,
    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,
  },
  sa: {
    overview: `${IPA_BASE}/kubun/sa.html`,
    syllabus: `${IPA_BASE}/syllabus/index.html#section_sa`,
    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,
  },
  pm: {
    overview: `${IPA_BASE}/kubun/pm.html`,
    syllabus: `${IPA_BASE}/syllabus/index.html#section_pm`,
    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,
  },
  nw: {
    overview: `${IPA_BASE}/kubun/nw.html`,
    syllabus: `${IPA_BASE}/syllabus/index.html#section_nw`,
    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,
  },
  db: {
    overview: `${IPA_BASE}/kubun/db.html`,
    syllabus: `${IPA_BASE}/syllabus/index.html#section_db`,
    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,
  },
  es: {
    overview: `${IPA_BASE}/kubun/es.html`,
    syllabus: `${IPA_BASE}/syllabus/index.html#section_es`,
    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,
  },
  sc: {
    overview: `${IPA_BASE}/cbt/sc.html`,
    syllabus: `${IPA_BASE}/syllabus/index.html#section_sc`,
    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,
  },
  sm: {
    overview: `${IPA_BASE}/kubun/sm.html`,
    syllabus: `${IPA_BASE}/syllabus/index.html#section_sm`,
    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,
  },
  au: {
    overview: `${IPA_BASE}/kubun/au.html`,
    syllabus: `${IPA_BASE}/syllabus/index.html#section_au`,
    pastQuestions: `${IPA_BASE}/mondai-kaiotu/index.html`,
  },
};

export interface RoadmapStep {
  /** 開始時点（試験まで N ヶ月前） */
  monthsBefore: number;
  /** ステップ名 */
  title: string;
  /** ステップでやること */
  body: string;
}

/**
 * 試験区分ごとの学習ロードマップ。
 * 期間と進捗の目安は IPA 統計の合格者像と一般的な学習ペースから推定。
 */
export const EXAM_ROADMAP: Record<ExamCode, RoadmapStep[]> = {
  ip: [
    { monthsBefore: 3, title: "基礎用語の網羅", body: "テクノロジ・マネジメント・ストラテジ各分野の用語をひととおり眺める。" },
    { monthsBefore: 2, title: "過去問演習スタート", body: "1日 30 問ペースで過去問を解き、誤答ノートを作る。" },
    { monthsBefore: 1, title: "弱点分野の集中対策", body: "正答率の低い分野に絞って 3 周。CBT 模試で本番形式に慣れる。" },
    { monthsBefore: 0, title: "総仕上げ", body: "直近 3 期分を通しで解いて時間配分を確定。" },
  ],
  sg: [
    { monthsBefore: 3, title: "情報セキュリティ全体像", body: "暗号・認証・組織のセキュリティ管理の基礎用語を体系化。" },
    { monthsBefore: 2, title: "科目 A 過去問演習", body: "知識問題を1日 20 問ペースで反復し、用語の抜けを潰す。" },
    { monthsBefore: 1, title: "科目 B 事例演習", body: "セキュリティ事故事例の長文問題に慣れ、設問パターンを掴む。" },
    { monthsBefore: 0, title: "総仕上げ", body: "通しで模試を 2-3 回解き、本番のペース配分を確認。" },
  ],
  fe: [
    { monthsBefore: 6, title: "テクノロジ系基礎固め", body: "アルゴリズム・データ構造・ネットワーク・DB の基礎を教科書で一巡。" },
    { monthsBefore: 4, title: "科目 A 演習", body: "過去問道場相当の量を解き、頻出分野を可視化。" },
    { monthsBefore: 2, title: "科目 B 擬似言語対策", body: "擬似言語のトレースを毎日継続。情報セキュリティの長文問題も並行。" },
    { monthsBefore: 1, title: "総仕上げ", body: "本番形式の模試を 2-3 回。時間配分とミスパターンを確定。" },
  ],
  ap: [
    { monthsBefore: 6, title: "全分野インプット", body: "教科書を 1 周し、各分野のキーワードを索引化。" },
    { monthsBefore: 4, title: "午前過去問 5 期分", body: "午前を 5 期分解き、正答率を分野別に記録。" },
    { monthsBefore: 2, title: "午後選択分野の絞り込み", body: "選択 5 問を 7 分野程度に絞り込み記述演習。" },
    { monthsBefore: 1, title: "午後通し演習", body: "150 分通しで午後を解く。時間配分・記述量の感覚を作る。" },
    { monthsBefore: 0, title: "弱点補強と直近年度", body: "直近 2 期分を通しで解き、誤答ノートを最終確認。" },
  ],
  st: [
    { monthsBefore: 6, title: "経営戦略・IT 戦略の体系", body: "BSC・SWOT・5 フォースなど主要フレームワークを整理。" },
    { monthsBefore: 4, title: "午前 II 演習", body: "高度共通午前 I と午前 II 過去問を反復。" },
    { monthsBefore: 2, title: "論述事例の蓄積", body: "業務事例 5-10 件を「課題→施策→効果」の形でストック。" },
    { monthsBefore: 1, title: "論文添削", body: "本番想定で 2,200 字を 120 分以内に書く訓練を週 1 回。" },
    { monthsBefore: 0, title: "総仕上げ", body: "直近の論述問題を 2-3 本書き上げ、構成パターンを完成。" },
  ],
  sa: [
    { monthsBefore: 6, title: "アーキ設計の基礎", body: "システム要件・方式設計・移行設計の論点を整理。" },
    { monthsBefore: 4, title: "午前 II 演習", body: "高度共通午前 I と午前 II 過去問を反復。" },
    { monthsBefore: 2, title: "午後 I の記述演習", body: "200-300 字の解答を粒度別に書き分ける訓練。" },
    { monthsBefore: 1, title: "午後 II 論文", body: "業務事例を中心に 2,200 字論文の構成パターンを確立。" },
    { monthsBefore: 0, title: "総仕上げ", body: "直近 2 期分を通しで解き、論文骨子を最終調整。" },
  ],
  pm: [
    { monthsBefore: 6, title: "PMBOK と IPA 用語の対応", body: "10 知識エリアと IPA 出題用語の対応表を作る。" },
    { monthsBefore: 4, title: "午前 II 演習", body: "計算問題（EVM・PERT・スケジューリング）を中心に反復。" },
    { monthsBefore: 2, title: "午後 I 記述", body: "リスク・進捗・品質管理のテーマで設問パターンに慣れる。" },
    { monthsBefore: 1, title: "午後 II 論文", body: "PJ ごとの課題と対応のセットを 5 件以上作成。" },
    { monthsBefore: 0, title: "総仕上げ", body: "直近の論文問題を 2 本仕上げ、業務事例の差し替え方を訓練。" },
  ],
  nw: [
    { monthsBefore: 6, title: "TCP/IP と主要プロトコル", body: "L2-L7 までの代表プロトコルの挙動を本で深掘り。" },
    { monthsBefore: 4, title: "午前 II 演習", body: "サブネット計算・ルーティング・DNS など計算系を徹底反復。" },
    { monthsBefore: 2, title: "午後 I パケット演習", body: "Wireshark などで実機キャプチャを読みながら過去問を解く。" },
    { monthsBefore: 1, title: "午後 II 設計問題", body: "VLAN/冗長/セキュリティの設計問題を 5 期分解き構成パターンを記憶。" },
    { monthsBefore: 0, title: "総仕上げ", body: "直近 2 期分を通しで解き、出題傾向の最新動向を確認。" },
  ],
  db: [
    { monthsBefore: 6, title: "正規化と SQL 基礎", body: "3NF までの正規化と SQL 基本操作を反復。" },
    { monthsBefore: 4, title: "午前 II 演習", body: "ロック・トランザクション・分散 DB の論点を厚めに。" },
    { monthsBefore: 2, title: "午後 I の SQL 記述", body: "SQL 記述問題を毎日 2-3 問解く。" },
    { monthsBefore: 1, title: "午後 II 設計問題", body: "概念-論理-物理設計を一気通貫で記述する練習。" },
    { monthsBefore: 0, title: "総仕上げ", body: "直近 2 期分を通しで解き、ER 図・SQL の出力速度を上げる。" },
  ],
  es: [
    { monthsBefore: 6, title: "組込み基礎", body: "RTOS・割込み・タスクスケジューリングの基礎を整理。" },
    { monthsBefore: 4, title: "午前 II 演習", body: "計測・制御・通信の出題を反復。" },
    { monthsBefore: 2, title: "午後 I 記述", body: "状態遷移図・タイミング図の読み書きを徹底。" },
    { monthsBefore: 1, title: "午後 II 設計問題", body: "システム設計・性能設計の長文に慣れる。" },
    { monthsBefore: 0, title: "総仕上げ", body: "直近 2 期分を通しで解き出題傾向を確認。" },
  ],
  sc: [
    { monthsBefore: 4, title: "セキュリティ全体像", body: "脅威・脆弱性・対策技術の体系を整理。" },
    { monthsBefore: 3, title: "午前 II 演習", body: "暗号・認証・脆弱性管理を反復。" },
    { monthsBefore: 2, title: "午後 記述演習（基礎）", body: "インシデント対応・脆弱性診断のシナリオ問題に慣れる。" },
    { monthsBefore: 1, title: "午後 記述演習（実践）", body: "システム構築 / 運用での具体的な対策設計の長文記述問題に取組む。" },
    { monthsBefore: 0, title: "総仕上げ", body: "最新の脅威動向（OWASP Top 10 など）と直近年度を確認。" },
  ],
  sm: [
    { monthsBefore: 4, title: "ITIL 基礎", body: "ITIL 4 のサービスバリューシステムと 34 プラクティスを概観。" },
    { monthsBefore: 3, title: "午前 II 演習", body: "サービス継続・キャパシティ・セキュリティ管理を反復。" },
    { monthsBefore: 2, title: "午後 I 記述", body: "インシデント・問題・変更管理の事例問題に慣れる。" },
    { monthsBefore: 1, title: "午後 II 論文", body: "ITSM 改善活動の業務事例を 5 件以上作成。" },
    { monthsBefore: 0, title: "総仕上げ", body: "直近 2 期分の論文を仕上げ、構成パターンを確定。" },
  ],
  au: [
    { monthsBefore: 4, title: "監査基準と内部統制", body: "システム監査基準・管理基準・COSO/COBIT を整理。" },
    { monthsBefore: 3, title: "午前 II 演習", body: "監査手続・監査証拠・監査調書の出題を反復。" },
    { monthsBefore: 2, title: "午後 I 記述", body: "監査対象システムごとの事例問題に慣れる。" },
    { monthsBefore: 1, title: "午後 II 論文", body: "監査計画-実施-報告の論文骨子を複数パターン用意。" },
    { monthsBefore: 0, title: "総仕上げ", body: "直近 2 期分の論文を仕上げ、監査人視点の表現を磨く。" },
  ],
};
