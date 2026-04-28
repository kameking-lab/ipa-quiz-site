import type { CommunityQuestionSeed } from "./types";

export const COMMUNITY_QUESTIONS_SEED: CommunityQuestionSeed[] = [
  {
    id: "cq-001",
    exam: "ap",
    title: "応用情報の午後、戦略系を捨てて技術寄り 5 題に固定するのは安全ですか？",
    body:
      "情報セキュリティ必須＋選択 4 題で、データベース・ネットワーク・組み込み・プロマネ・システム監査の中から 4 つを当日選ぶつもりですが、年度によって難易度差が大きいと聞きます。最低限保険として用意しておくべき分野はどれでしょうか。",
    authorName: "とんかつ定食",
    authorYearsExp: "実務 3 年（インフラ）",
    tags: ["午後選択", "戦略", "セキュリティ"],
    status: "answered",
    answerCount: 4,
    topAnswerSnippet:
      "DB/NW/組込のうち 2 つに絞り、保険としてプロマネかシステム監査の文章系を 1 つ入れると当日の事故が減ります。",
    createdAt: "2026-04-19T08:14:00+09:00",
  },
  {
    id: "cq-002",
    exam: "fe",
    title: "基本情報の科目 B、アルゴリズムが伸びません。プログラム経験ゼロです。",
    body:
      "科目 B の擬似言語が読めず、配列・連結リスト・木のあたりで詰まります。Python もまだ書けません。1 ヶ月で間に合わせるルートはありますか？",
    authorName: "新人さん",
    tags: ["科目B", "アルゴリズム", "未経験"],
    status: "answered",
    answerCount: 6,
    topAnswerSnippet:
      "擬似言語のトレース表（変数の値を 1 行ずつ書く）を 10 問やるだけで読み方が変わります。Python は後回しでOK。",
    createdAt: "2026-04-18T22:32:00+09:00",
  },
  {
    id: "cq-003",
    exam: "ip",
    title: "IT パスポート、文系大学生でも 200 時間必要ですか？",
    body:
      "学校で受けろと言われています。簿記 2 級は持っていますがITは未経験。最短ルートを知りたいです。",
    authorName: "経済学部4年",
    tags: ["勉強時間", "未経験", "ストラテジ"],
    status: "resolved",
    answerCount: 8,
    topAnswerSnippet:
      "簿記持ちならストラテジ・マネジメントは半減できます。テクノロジ系だけ 80 時間でも十分間に合います。",
    createdAt: "2026-04-17T19:05:00+09:00",
  },
  {
    id: "cq-004",
    exam: "sg",
    title: "情報セキュリティマネジメント、科目 B の事例問題で時間が足りない",
    body:
      "1 設問あたり 5 分以上かかってしまい、最後まで届きません。読み飛ばすコツはありますか？",
    authorName: "総務リーダー",
    authorYearsExp: "事務 8 年",
    tags: ["科目B", "時間配分", "事例問題"],
    status: "answered",
    answerCount: 3,
    topAnswerSnippet:
      "登場人物・役割・違反内容を最初に箇条書きでマージン余白に書き出すと、設問ごとに本文を読み返さずに済みます。",
    createdAt: "2026-04-17T11:48:00+09:00",
  },
  {
    id: "cq-005",
    exam: "nw",
    title: "ネスペ午後 II の構成図、何を最初に確認すべき？",
    body:
      "毎回構成図を読むのに 10 分以上使ってしまいます。優先順位の付け方を知りたいです。",
    authorName: "オンプレ脱出組",
    authorYearsExp: "NW 設計 5 年",
    tags: ["午後II", "構成図", "時間配分"],
    status: "answered",
    answerCount: 5,
    topAnswerSnippet:
      "①セグメント分割と VLAN ②冗長プロトコル（HSRP/STP）③外部接続点の順で見ると設問の意図がわかります。",
    createdAt: "2026-04-16T20:11:00+09:00",
  },
  {
    id: "cq-006",
    exam: "db",
    title: "DB スペシャリスト、論理設計と物理設計の力配分は？",
    body:
      "午後 II で論理設計を選ぶか物理設計を選ぶか毎年迷います。実務がアプリ寄りで設計はあまりやっていません。",
    authorName: "アプリ屋",
    authorYearsExp: "アプリ 6 年",
    tags: ["午後II", "論理設計", "物理設計"],
    status: "open",
    answerCount: 2,
    topAnswerSnippet: "アプリ寄りなら正規化・主キー設計が出る論理設計が安定して取りやすいです。",
    createdAt: "2026-04-16T07:42:00+09:00",
  },
  {
    id: "cq-007",
    exam: "sc",
    title: "情報処理安全確保支援士、午後の文章量に圧倒される",
    body:
      "1 題 8 ページ前後の文章にひるんでしまいます。読解の型を持っている人がいたら教えてください。",
    authorName: "SOCアナリスト",
    authorYearsExp: "セキュリティ 4 年",
    tags: ["午後", "読解", "長文"],
    status: "answered",
    answerCount: 4,
    topAnswerSnippet:
      "設問を先に読み「答えに必要な単語」を 3 つだけ抜き出し、本文をその単語ハイライトで 1 周するのが安定します。",
    createdAt: "2026-04-15T13:20:00+09:00",
  },
  {
    id: "cq-008",
    exam: "pm",
    title: "プロマネ午後 II、論文 3000 字を 90 分で書ききれません",
    body:
      "毎回設問アで時間を使いすぎて、ウが薄くなります。骨子の作り方を共有してほしいです。",
    authorName: "受託 PM",
    authorYearsExp: "PM 7 年",
    tags: ["論文", "午後II", "骨子"],
    status: "answered",
    answerCount: 6,
    topAnswerSnippet:
      "ア 600・イ 1200・ウ 1200 を最初に骨子で配分。設問ごとに 5 分の骨子→残りで本文の二段構成が安全です。",
    createdAt: "2026-04-14T22:55:00+09:00",
  },
  {
    id: "cq-009",
    exam: "st",
    title: "ST 論文、業種知識がないとやはり厳しいですか？",
    body:
      "SIer で複数業種を浅く扱っています。1 業種に絞り込んだ方がいいでしょうか。",
    authorName: "業種ジプシー",
    authorYearsExp: "コンサル 5 年",
    tags: ["論文", "業種事例"],
    status: "open",
    answerCount: 1,
    topAnswerSnippet:
      "本番では絞らず、案件で深く関わった業種を「主」にして他業種を比較で軽く触れる構成がおすすめ。",
    createdAt: "2026-04-14T10:08:00+09:00",
  },
  {
    id: "cq-010",
    exam: "sa",
    title: "システムアーキテクト、午後 I の選び方が分かりません",
    body:
      "業務系・組込系・移行系のどれを選ぶか毎年迷子です。実務はアプリ開発寄りです。",
    authorName: "業務SE",
    authorYearsExp: "SE 8 年",
    tags: ["午後I", "選択戦略"],
    status: "resolved",
    answerCount: 3,
    topAnswerSnippet:
      "業務系×移行系の 2 軸が安定。組込系は問題文が極端に固いことが多く、業務系経験者には不利です。",
    createdAt: "2026-04-13T16:45:00+09:00",
  },
  {
    id: "cq-011",
    exam: "es",
    title: "エンベデッド、ハードを触ったことがなくても合格できる？",
    body:
      "Web エンジニアですが趣味で組込を勉強しています。実機経験ゼロです。",
    authorName: "電子工作初心者",
    tags: ["未経験", "ハードウェア"],
    status: "answered",
    answerCount: 2,
    topAnswerSnippet:
      "ハード経験がなくても合格者は多数。タイミングチャート・割込・状態遷移の頻出論点だけで 7 割狙えます。",
    createdAt: "2026-04-12T09:33:00+09:00",
  },
  {
    id: "cq-012",
    exam: "sm",
    title: "サービスマネージャ、ITIL の用語暗記はどこまで？",
    body:
      "ITIL4 の各プラクティスをどこまで覚えるか迷います。試験で問われる粒度感を知りたいです。",
    authorName: "運用リーダー",
    authorYearsExp: "運用 9 年",
    tags: ["ITIL", "用語"],
    status: "answered",
    answerCount: 3,
    topAnswerSnippet:
      "プラクティス名・目的・主要な KPI（MTBF/MTTR/可用性目標）が言えれば午前は十分です。",
    createdAt: "2026-04-11T20:14:00+09:00",
  },
  {
    id: "cq-013",
    exam: "au",
    title: "システム監査、論文の業種は監査対象を書く？それとも自社？",
    body:
      "実務では複数顧客を監査しています。論文の業種設定をどうすべきか毎回ブレます。",
    authorName: "外部監査人",
    authorYearsExp: "監査 11 年",
    tags: ["論文", "業種", "監査"],
    status: "open",
    answerCount: 1,
    topAnswerSnippet:
      "監査対象企業の業種で書くのが一般的。設問アに「監査対象部署と業種」を必ず明記しましょう。",
    createdAt: "2026-04-11T12:02:00+09:00",
  },
  {
    id: "cq-014",
    exam: "ap",
    title: "応用情報、午前は何点取れば午後を採点してもらえますか？",
    body:
      "60 点ぴったりだと午後の採点はされない、と聞きました。本当でしょうか？",
    authorName: "初受験",
    tags: ["午前", "採点", "ボーダー"],
    status: "resolved",
    answerCount: 5,
    topAnswerSnippet:
      "60 点ちょうどで採点されます。IPA の公式回答も「60 点以上で午後採点対象」と明記されています。",
    createdAt: "2026-04-10T18:27:00+09:00",
  },
  {
    id: "cq-015",
    exam: "fe",
    title: "基本情報、CBT 化で過去問繰り返しはまだ通用する？",
    body:
      "公式が過去問を公開しなくなったと聞きました。過去問道場で解いた科目 A は無意味でしょうか？",
    authorName: "情報科 高校生",
    tags: ["CBT", "過去問", "科目A"],
    status: "answered",
    answerCount: 4,
    topAnswerSnippet:
      "科目 A は過去問の流用率が体感 60% 残っています。直近 5 年分を 3 周すれば十分対応可能です。",
    createdAt: "2026-04-10T07:18:00+09:00",
  },
  {
    id: "cq-016",
    exam: "ip",
    title: "IT パスポート、ストラテジ系の暗記がまったく頭に入りません",
    body:
      "BSC、SWOT、PPM…全部混ざって困っています。覚え方の工夫があれば教えてください。",
    authorName: "営業出身",
    tags: ["ストラテジ", "暗記法"],
    status: "answered",
    answerCount: 7,
    topAnswerSnippet:
      "「縦軸×横軸の二次元マトリクス」系は手で書いて図解するのが最速。BSC は 4 視点を語呂で覚えると一発です。",
    createdAt: "2026-04-09T22:11:00+09:00",
  },
  {
    id: "cq-017",
    exam: "sg",
    title: "情報セキュリティマネジメント、過去問だけで合格できますか？",
    body:
      "過去問道場 5 年分を 3 周しました。これで本番に挑んでよいでしょうか。",
    authorName: "総務 7 年目",
    tags: ["過去問", "勉強法"],
    status: "resolved",
    answerCount: 5,
    topAnswerSnippet:
      "科目 A はほぼ突破できます。科目 B の事例問題だけ別途 10 題解いておくと安心です。",
    createdAt: "2026-04-09T11:38:00+09:00",
  },
  {
    id: "cq-018",
    exam: "nw",
    title: "ネスペ、参考書は『マスタリング TCP/IP』だけで足りますか？",
    body:
      "実務はオンプレからクラウド移行中。手元の参考書はマスタリング TCP/IP 入門編のみです。",
    authorName: "クラウド移行担当",
    authorYearsExp: "NW 3 年",
    tags: ["参考書", "TCP/IP"],
    status: "answered",
    answerCount: 4,
    topAnswerSnippet:
      "入門編＋ネスペ午後対策本（左門至峰本）を併用するのが定番ルート。AWS VPC は別途まとめサイトで補強を。",
    createdAt: "2026-04-08T20:50:00+09:00",
  },
  {
    id: "cq-019",
    exam: "db",
    title: "DB スペシャリスト、SQL のチューニング問題はどこまで深く？",
    body:
      "EXPLAIN 結果からインデックスを提案する問題がよく出ますが、どこまでパターンを覚えれば実戦投入できますか？",
    authorName: "DBA 見習い",
    authorYearsExp: "DBA 2 年",
    tags: ["SQL", "チューニング", "EXPLAIN"],
    status: "open",
    answerCount: 2,
    topAnswerSnippet:
      "①Seq Scan→Index Scan ②Hash Join→Nested Loop の選択基準 ③カバリングインデックス ④統計情報の鮮度。この 4 つで多くの設問はカバーできます。",
    createdAt: "2026-04-08T09:24:00+09:00",
  },
  {
    id: "cq-020",
    exam: "sc",
    title: "情報処理安全確保支援士、合格後の登録費用は払う価値ある？",
    body:
      "合格しても登録に約 18 万円＋年 4 万円かかると聞きました。実際に登録している方の所感が知りたいです。",
    authorName: "セキュ部勉強中",
    tags: ["登録費用", "キャリア"],
    status: "answered",
    answerCount: 6,
    topAnswerSnippet:
      "官公庁案件・大手 SIer の入札条件で「登録セキスペ」を求められるケースは増加傾向。年収換算で +30 万なら回収可能です。",
    createdAt: "2026-04-07T18:00:00+09:00",
  },
];
