// 評価用 ground truth セット（50 件）。
// 各エントリは「ユーザー発話」と「正解として top-K に含まれてほしい doc ID 集合」を持つ。
// - expectedIds が非空: knowledge query。Recall@K の分子になる。
// - expectedIds が空: 雑談・モチベ系。citation を返さないことが正解（false-positive 計測用）。
//
// doc ID は lib/copilot/corpus.ts のスキーマ:
//   - 用語集:  `g:<term>`  （例: `g:ACID`）
//   - 過去問:  `q:<question.id>`  （例: `q:ap-2023a-am-q1`）

export interface GroundTruthEntry {
  query: string;
  expectedIds: string[];
  /** 用途タグ（分析用）。 */
  tag: "glossary" | "concept" | "chitchat";
  /** 閲覧中問題の category／topicTags をシミュレートしたいときに使う。 */
  currentCategory?: string;
  currentTopicTags?: string[];
}

export const GROUND_TRUTH: GroundTruthEntry[] = [
  // ── 用語集ピンポイント（25件） ─────────────────────────────
  { query: "ACID 特性について教えて", expectedIds: ["g:ACID"], tag: "glossary" },
  { query: "B+木 と B木 の違いは？", expectedIds: ["g:B木 / B+木"], tag: "glossary" },
  { query: "CIDR 表記がよく分からない", expectedIds: ["g:CIDR"], tag: "glossary" },
  { query: "DNS の仕組みを簡単に", expectedIds: ["g:DNS"], tag: "glossary" },
  { query: "EVM の SV と CV って何？", expectedIds: ["g:EVM"], tag: "glossary" },
  { query: "ITIL のプラクティスとは", expectedIds: ["g:ITIL"], tag: "glossary" },
  { query: "JIT コンパイル方式", expectedIds: ["g:JIT (Just-In-Time)"], tag: "glossary" },
  { query: "OAuth 2.0 のフロー教えて", expectedIds: ["g:OAuth 2.0"], tag: "glossary" },
  { query: "OWASP Top 10 の最新版", expectedIds: ["g:OWASP Top 10"], tag: "glossary" },
  { query: "PMBOK の 10 知識エリア", expectedIds: ["g:PMBOK"], tag: "glossary" },
  { query: "RAID 5 と RAID 6 の違い", expectedIds: ["g:RAID"], tag: "glossary" },
  { query: "SLA の例とペナルティ条項", expectedIds: ["g:SLA"], tag: "glossary" },
  { query: "SQL インジェクション対策", expectedIds: ["g:SQL インジェクション"], tag: "glossary" },
  { query: "TCP/IP の階層モデル", expectedIds: ["g:TCP/IP"], tag: "glossary" },
  { query: "WBS の作り方", expectedIds: ["g:WBS"], tag: "glossary" },
  { query: "XSS の種類と対策", expectedIds: ["g:XSS"], tag: "glossary" },
  { query: "アジャイル開発のスクラム", expectedIds: ["g:アジャイル"], tag: "glossary" },
  { query: "公開鍵暗号方式とは？", expectedIds: ["g:公開鍵暗号"], tag: "glossary" },
  { query: "クラウドコンピューティングの IaaS PaaS SaaS", expectedIds: ["g:クラウドコンピューティング"], tag: "glossary" },
  { query: "データベース正規化 第3正規形", expectedIds: ["g:正規化"], tag: "glossary" },
  { query: "デジタル署名の仕組みを教えて", expectedIds: ["g:デジタル署名"], tag: "glossary" },
  { query: "ハッシュ関数の衝突耐性", expectedIds: ["g:ハッシュ関数"], tag: "glossary" },
  { query: "プロセスとスレッドの違い", expectedIds: ["g:プロセス"], tag: "glossary" },
  { query: "機械学習の教師あり学習", expectedIds: ["g:マシン学習"], tag: "glossary" },
  { query: "個人情報保護法の改正ポイント", expectedIds: ["g:個人情報保護法"], tag: "glossary" },

  // ── 概念クエリ（15件・複合）───────────────────────────────
  // 用語集ヒットを期待するが、関連する問題が top-5 に混ざってもよい
  { query: "RSA 暗号の鍵長と安全性", expectedIds: ["g:公開鍵暗号"], tag: "concept" },
  { query: "二相コミット 2PC の流れ", expectedIds: ["g:ACID"], tag: "concept" },
  { query: "ハッシュ衝突を起こす攻撃", expectedIds: ["g:ハッシュ関数"], tag: "concept" },
  { query: "サブネットマスク /24 のホスト数", expectedIds: ["g:CIDR"], tag: "concept" },
  { query: "DNS キャッシュポイズニング攻撃", expectedIds: ["g:DNS"], tag: "concept" },
  { query: "クロスサイトスクリプティングの反射型", expectedIds: ["g:XSS"], tag: "concept" },
  { query: "二分探索の計算量", expectedIds: ["g:二分探索", "g:計算量 (O 記法)"], tag: "concept" },
  { query: "O(log n) のアルゴリズム例", expectedIds: ["g:計算量 (O 記法)", "g:二分探索"], tag: "concept" },
  { query: "プロジェクト憲章の目的", expectedIds: ["g:プロジェクト憲章", "g:PMBOK"], tag: "concept" },
  { query: "著作権法の保護期間", expectedIds: ["g:著作権"], tag: "concept" },
  { query: "ベンチマークテストの注意点", expectedIds: ["g:ベンチマーク"], tag: "concept" },
  { query: "アジャイルとウォーターフォールの比較", expectedIds: ["g:アジャイル"], tag: "concept" },
  { query: "SQL インジェクションの対策に prepared statement", expectedIds: ["g:SQL インジェクション"], tag: "concept" },
  { query: "ACID の永続性 Durability", expectedIds: ["g:ACID"], tag: "concept" },
  { query: "OAuth 2.0 認可コードフロー", expectedIds: ["g:OAuth 2.0"], tag: "concept" },

  // ── 雑談・モチベ系（10件・citation 期待なし）──────────────
  // expectedIds = [] は「retrieval が走ってもしきい値で抑制される」ことを期待
  { query: "勉強のやる気が出ません", expectedIds: [], tag: "chitchat" },
  { query: "今日は集中できない", expectedIds: [], tag: "chitchat" },
  { query: "受験まで 2 ヶ月でどう勉強すればいい？", expectedIds: [], tag: "chitchat" },
  { query: "緊張で当日眠れなかったらどうする", expectedIds: [], tag: "chitchat" },
  { query: "資格を取って何が変わる？", expectedIds: [], tag: "chitchat" },
  { query: "履歴書にどう書けばいい？", expectedIds: [], tag: "chitchat" },
  { query: "おすすめの参考書ある？", expectedIds: [], tag: "chitchat" },
  { query: "他のサイトと比べてどう？", expectedIds: [], tag: "chitchat" },
  { query: "AI って便利だね", expectedIds: [], tag: "chitchat" },
  { query: "ありがとう、わかりやすかった", expectedIds: [], tag: "chitchat" },
];
