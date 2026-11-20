// IPA公式冊子から転記。原典・照合記録: ../2015-autumn-am2-sources.json
import type { Question } from "@/lib/questions/types";

export const SA_QUESTIONS_2015_AUTUMN_AM2: Question[] = [
  {
    "id": "sa-2015a-am2-q1",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "システム方式設計",
    "topicTags": [
      "システム方式設計"
    ],
    "difficulty": 3,
    "question": "ソフトウェアライフサイクルプロセスのシステム方式設計で行うものはどれか。",
    "choices": {
      "ア": "ソフトウェア構成品目の明確化",
      "イ": "ソフトウェアコンポーネントの構成の明確化",
      "ウ": "ソフトウェアのインタフェース仕様の決定",
      "エ": "ソフトウェアのユニットごとのテスト要求事項の定義"
    },
    "answer": "ア",
    "explanation": "正解はア。システム方式設計では，システムをハードウェアやソフトウェアなどの構成品目に分け，要求を割り当てる。個々のソフトウェア内部のコンポーネント構成やインタフェース，ユニットの詳細は，その後のソフトウェア設計で具体化する。",
    "choiceExplanations": {
      "ア": "システムを実現するソフトウェア構成品目を明らかにする作業で，システム全体の方式を決める段階に当たる。",
      "イ": "構成品目の内部をどのコンポーネントで組み立てるかを定めるもので，ソフトウェアの方式設計で扱う。",
      "ウ": "ソフトウェアの内部・外部との接続仕様を具体化する作業で，システムの構成品目を明らかにする作業より詳細である。",
      "エ": "個々のユニットについて検証すべき事項を定めるもので，ユニットを具体化するソフトウェア詳細設計で扱う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2015a-am2-q2",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "UML",
    "topicTags": [
      "UML"
    ],
    "difficulty": 3,
    "question": "UMLを使って図のクラスPを定義した。このクラスの操作のうち，公開可視性（public）をもつものはどれか。",
    "choices": {
      "ア": "全ての操作",
      "イ": "操作A",
      "ウ": "操作B",
      "エ": "操作C"
    },
    "answer": "イ",
    "explanation": "正解はイ。UMLの可視性は，＋がpublic，−がprivate，＃がprotectedを表す。図で＋が付いている操作Aだけが公開可視性をもつ。クラスに並べて記載されていても，各操作の可視性は記号ごとに判断する。",
    "choiceExplanations": {
      "ア": "各操作には異なる可視性の記号が付いており，クラス内に記載された全操作が公開されるわけではない。",
      "イ": "操作Aの前の＋はpublicを表し，この操作がクラス外に公開されることを示している。",
      "ウ": "操作Bの前の−はprivateを表すため，問題で尋ねる公開可視性には該当しない。",
      "エ": "操作Cの前の＃はprotectedを表し，＋で示す公開可視性とは区別される。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/sa/2015-autumn-am2-q2.png"
    ],
    "imageAltTexts": [
      "クラスPの操作：＋操作A，−操作B，＃操作C"
    ]
  },
  {
    "id": "sa-2015a-am2-q3",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "オブジェクト指向分析",
    "topicTags": [
      "オブジェクト指向分析"
    ],
    "difficulty": 3,
    "question": "オブジェクト指向分析における分析モデルによって，ユースケース内のオブジェクトを分類するとき，境界オブジェクトに該当するものはどれか。",
    "choices": {
      "ア": "オブジェクト間の相互作用を制御するためのオブジェクト",
      "イ": "画面操作や画面表示などのGUIオブジェクト",
      "ウ": "システムの中核となるデータとその操作のオブジェクト",
      "エ": "データモデルにおけるエンティティに相当するオブジェクト"
    },
    "answer": "イ",
    "explanation": "正解はイ。境界オブジェクトは，利用者や外部システムと対象システムとの接点を受け持つ。入力画面や表示画面がその例である。処理の進行を調整する制御オブジェクトや，業務データを表す実体オブジェクトと役割を分けて考える。",
    "choiceExplanations": {
      "ア": "オブジェクト同士の連携やユースケースの進行を調整する役割なので，制御オブジェクトに当たる。",
      "イ": "画面は利用者とシステムの境目で入出力を受け持つため，境界オブジェクトに分類できる。",
      "ウ": "業務の中心となるデータと振る舞いを保持する役割であり，境界ではなく実体オブジェクトに当たる。",
      "エ": "データモデルのエンティティに対応するものは実体オブジェクトであり，外部との接点ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2015a-am2-q4",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "オブジェクト指向設計",
    "topicTags": [
      "オブジェクト指向設計"
    ],
    "difficulty": 3,
    "question": "オブジェクト指向設計における設計原則のうち，開放・閉鎖原則はどれか。",
    "choices": {
      "ア": "クラスにもたせる役割は一つだけにするべきであり，複数の役割が存在する場合にはクラスを分割する。",
      "イ": "クラスを利用するクライアントごとに異なるメソッドが必要な場合は，インタフェースを分ける。",
      "ウ": "上位のモジュールは，下位のモジュールに依存してはならない。",
      "エ": "モジュールの機能には，追加や変更が可能であり，その影響が他のモジュールに及ばないようにする。"
    },
    "answer": "エ",
    "explanation": "正解はエ。開放・閉鎖原則では，機能の拡張に対しては開き，既存部分の修正に対しては閉じた設計を目指す。抽象化や差替え可能な実装を使えば，新しい機能を加えるときに，既存の利用側へ修正を広げずに済む。",
    "choiceExplanations": {
      "ア": "一つのクラスの責務を絞る単一責任原則の説明であり，拡張と既存部分の修正の関係を述べていない。",
      "イ": "利用側が不要な操作に依存しないようにするインタフェース分離原則に対応する説明である。",
      "ウ": "上位と下位の直接依存を避け，抽象に依存させる依存性逆転原則に対応する説明である。",
      "エ": "拡張を受け入れつつ変更の影響を既存の他モジュールに広げないという，開放・閉鎖原則の狙いを示す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2015a-am2-q5",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "デザインパターン",
    "topicTags": [
      "デザインパターン"
    ],
    "difficulty": 3,
    "question": "デザインパターンの中のストラテジパターンを用いて，帳票出力のクラスを図のとおりに設計した。適切な説明はどれか。",
    "choices": {
      "ア": "クライアントは，使用したいフォーマットに対応する，帳票出力ストラテジクラスのサブクラスを意識せずに利用できる。",
      "イ": "新規フォーマット用のアルゴリズムの追加が容易である。",
      "ウ": "帳票出力ストラテジクラスの中で，どのフォーマットで帳票を出力するかの振分けを行っている。",
      "エ": "帳票出力のアルゴリズムは，コンテキストクラスの中に記述する。"
    },
    "answer": "イ",
    "explanation": "正解はイ。ストラテジパターンは，帳票出力のアルゴリズムを共通の操作をもつ別クラスに分離する。図ではPDF用とHTML用が具体的なストラテジである。新しい形式のクラスを追加すれば，同じ帳票出力の呼出し方を使って処理を差し替えられる。",
    "choiceExplanations": {
      "ア": "共通操作を通じて使えても，図だけでクライアントが具体的な形式の選択や設定を一切意識しないとはいえない。",
      "イ": "新しい形式に対応する具体的なストラテジを追加でき，既存の各出力アルゴリズムとの分離を保ちやすい。",
      "ウ": "形式ごとの実装はサブクラスへ分離されている。共通クラス内の条件分岐で全形式を振り分ける設計ではない。",
      "エ": "コンテキストはストラテジへ出力処理を委ねる。形式ごとのアルゴリズム本体は具体的なストラテジに置く。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/sa/2015-autumn-am2-q5.png"
    ],
    "imageAltTexts": [
      "コンテキストが帳票出力ストラテジを参照し，PDF帳票出力ストラテジとHTML帳票出力ストラテジが継承するクラス図"
    ]
  },
  {
    "id": "sa-2015a-am2-q6",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "分散処理",
    "topicTags": [
      "分散処理"
    ],
    "difficulty": 3,
    "question": "大量のデータを並列に処理するために，入力データから中間キーと値の組みを生成する処理と，同じ中間キーをもつ値を加工する処理との2段階で実行するプログラミングモデルはどれか。",
    "choices": {
      "ア": "2相コミット",
      "イ": "KVS",
      "ウ": "MapReduce",
      "エ": "マルチスレッド"
    },
    "answer": "ウ",
    "explanation": "正解はウ。MapReduceは，Mapで入力から中間キーと値を生成し，同じキーに属する値をReduceでまとめて処理する。キーごとに処理を分けられるので，大量のデータを複数の計算資源で並列処理しやすい。",
    "choiceExplanations": {
      "ア": "分散した複数の参加者の更新をまとめて確定・取消しする手順であり，キー単位の二段階のデータ加工ではない。",
      "イ": "キーと値の組でデータを保存・取得する仕組みであり，MapとReduceからなる処理モデルそのものではない。",
      "ウ": "中間キーと値を作るMapと，キーごとの値を加工するReduceという，設問の二段階に一致する。",
      "エ": "一つのプロセス内で複数の実行の流れを動かす方法であり，設問のキーを用いた加工の段階を定めない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/"
    ]
  },
  {
    "id": "sa-2015a-am2-q7",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "デザインパターン",
    "topicTags": [
      "デザインパターン"
    ],
    "difficulty": 3,
    "question": "オブジェクト指向におけるデザインパターンに関する記述として，適切なものはどれか。",
    "choices": {
      "ア": "幾つかのクラスに共通する性質を抽出して，一般化したクラスを定義したものである。",
      "イ": "同じ性質をもつオブジェクト群を，更にクラスとして抽象化したものである。",
      "ウ": "オブジェクトの内部にデータを隠し，オブジェクトの仕様と実装とを分離したものである。",
      "エ": "システムの構造や機能について，典型的な設計上の問題とその解決策を示し，再利用できるようにしたものである。"
    },
    "answer": "エ",
    "explanation": "正解はエ。デザインパターンは，設計で繰り返し現れる問題に対して，クラスやオブジェクトの役割と協調関係による解決の形を整理したものである。そのまま実行する部品ではなく，状況に応じて適用する設計上の知識を再利用する。",
    "choiceExplanations": {
      "ア": "複数のクラスの共通点を上位クラスにまとめる汎化の説明であり，設計問題と解決策の再利用を表さない。",
      "イ": "オブジェクトの共通の性質をクラスとしてまとめる抽象化の説明であり，デザインパターンの定義とは異なる。",
      "ウ": "内部の実装を隠して外部との境界を設けるカプセル化の説明であり，パターン全体の定義ではない。",
      "エ": "繰り返される設計課題と適用できる解決の形をまとめるという，デザインパターンの目的に一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2015a-am2-q8",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "ブラックボックステスト",
    "topicTags": [
      "ブラックボックステスト"
    ],
    "difficulty": 3,
    "question": "ブラックボックステストにおけるテストケースの設計に関する記述として，適切なものはどれか。",
    "choices": {
      "ア": "実データからテストデータを無作為に抽出して，テストケースを設計する。",
      "イ": "実データのうち使用頻度が高いものを重点的に抽出して，テストケースを設計する。",
      "ウ": "プログラムがどのような機能を果たすのかを仕様書で調べて，テストケースを設計する。",
      "エ": "プログラムの全命令が少なくとも1回は実行されるように，テストケースを設計する。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。ブラックボックステストでは，内部のプログラム構造ではなく，仕様で定められた入力と出力の関係からテストを設計する。同値分割や境界値分析などを使い，正常な入力だけでなく仕様上必要な異常入力も検証する。",
    "choiceExplanations": {
      "ア": "無作為抽出だけでは，仕様上確認が必要な境界や異常な条件を十分に含められるとは限らない。",
      "イ": "高頻度のデータだけでは低頻度の例外条件が抜けるため，仕様に基づくテスト設計の説明として不十分である。",
      "ウ": "外から観察できる機能を仕様書から把握し，入力と期待結果を決める方法がブラックボックステストである。",
      "エ": "全命令の実行を確かめる命令網羅は，プログラム内部の構造に基づくホワイトボックステストの基準である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2015a-am2-q9",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "品質コスト",
    "topicTags": [
      "品質コスト"
    ],
    "difficulty": 3,
    "question": "製品を出荷前に全数検査することによって，出荷後の故障数を減少させ，全体の費用を低減させたい。次の条件で全数検査を行ったときに低減させられる費用は何万円か。ここで，検査時に故障が発見された製品は修理して出荷するものとする。\n\n〔条件〕\n(1) 製造する個数：500個\n(2) 全数検査を実施しなかった場合の，出荷個数に対する故障率：3%\n(3) 全数検査で発見される製造個数に対する故障率：2%\n(4) 全数検査を実施した場合の，出荷個数に対する故障率：1%\n(5) 検査費用：1万円／個\n(6) 出荷前の故障修理費用：50万円／個\n(7) 出荷後の故障修理費用：200万円／個",
    "choices": {
      "ア": "1,000",
      "イ": "1,500",
      "ウ": "2,000",
      "エ": "2,250"
    },
    "answer": "ア",
    "explanation": "正解はア。検査なしでは500×0.03＝15個が出荷後に故障し，修理費は15×200＝3,000万円。検査ありでは検査500万円，出荷前修理500×0.02×50＝500万円，出荷後修理500×0.01×200＝1,000万円で計2,000万円。低減額は3,000−2,000＝1,000万円となる。",
    "choiceExplanations": {
      "ア": "検査なしの3,000万円から，検査と出荷前後の修理の合計2,000万円を引いた低減額である。",
      "イ": "出荷後修理費の減少2,000万円から検査費500万円だけを引くとこの値になるが，出荷前修理費も必要である。",
      "ウ": "検査を行った場合の総費用そのものに当たり，検査によって低減できた額ではない。",
      "エ": "検査・出荷前修理・出荷後修理を全て計上した差額は1,000万円であり，この金額にはならない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "sa-2015a-am2-q10",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "テスト設計",
    "topicTags": [
      "テスト設計"
    ],
    "difficulty": 3,
    "question": "学生レコードを処理するプログラムをテストするために，実験計画法を用いてテストケースを決定する。学生レコード中のデータ項目（学生番号，科目コード，得点）は二つの状態をとる。テスト対象のデータ項目から任意に二つのデータ項目を選び，二つのデータ項目がとる状態の全ての組合せが必ず同一回数ずつ存在するように基準を設けた場合に，次の8件のテストケースの候補から，最少で幾つを採択すればよいか。\n\n| テストケースNo. | 学生番号 | 科目コード | 得点 |\n| --- | --- | --- | --- |\n| 1 | 存在する | 存在する | 数字である |\n| 2 | 存在する | 存在する | 数字でない |\n| 3 | 存在する | 存在しない | 数字である |\n| 4 | 存在する | 存在しない | 数字でない |\n| 5 | 存在しない | 存在する | 数字である |\n| 6 | 存在しない | 存在する | 数字でない |\n| 7 | 存在しない | 存在しない | 数字である |\n| 8 | 存在しない | 存在しない | 数字でない |",
    "choices": {
      "ア": "2",
      "イ": "3",
      "ウ": "4",
      "エ": "6"
    },
    "answer": "ウ",
    "explanation": "正解はウ。二つの項目の状態の組合せは2×2＝4通りあり，各テストはそのうち1通りを含むので，少なくとも4件必要である。例えばNo.1・4・6・7を選ぶと，学生番号と科目コード，学生番号と得点，科目コードと得点のどの組でも4通りが各1回現れ，4件で条件を満たす。",
    "choiceExplanations": {
      "ア": "二つの項目だけでも状態の組合せは4通りある。2件のテストではそれら全てを含められない。",
      "イ": "三つの項目があることと必要件数は別である。3件では二項目の4通りの組合せを網羅できない。",
      "ウ": "No.1・4・6・7を選ぶと任意の二項目の4通りが各1回現れるため，下限の4件で達成できる。",
      "エ": "6件で各二項目の4通りを同じ回数にすることはできず，条件を満たす最少件数の4件にも当たらない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "sa-2015a-am2-q11",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "共通フレーム",
    "topicTags": [
      "共通フレーム"
    ],
    "difficulty": 3,
    "question": "共通フレームにおけるシステム開発プロセスのアクティビティであるシステム適格性確認テストの説明として，最も適切なものはどれか。",
    "choices": {
      "ア": "システムが運用環境に適合し，利用者の用途を満足しているかどうかを，実運用環境又は擬似運用環境において評価する。",
      "イ": "システムが業務運用時に使いやすいかどうかを定期的に評価する。",
      "ウ": "システムの投資効果及び業務効果の実績を評価する。",
      "エ": "システム要件について実装の適合性をテストし，システムの納入準備ができているかどうかを評価する。"
    },
    "answer": "エ",
    "explanation": "正解はエ。システム適格性確認テストでは，統合されたシステムが定めたシステム要件を満たすかを確認する。その結果から納入準備の可否を判断する。運用中の使いやすさや導入後の投資効果を継続評価する活動とは，対象と実施段階が異なる。",
    "choiceExplanations": {
      "ア": "実際の利用目的や運用環境に照らして有効性を確かめる妥当性確認の観点であり，要件への適合性を主眼とする説明とは異なる。",
      "イ": "運用を続ける中で使いやすさを定期的に確認する活動であり，開発したシステムの納入準備の確認ではない。",
      "ウ": "導入したシステムの効果を事後評価する活動であり，システム要件を満たすかをテストする活動ではない。",
      "エ": "システム要件への実装の適合性と納入準備の可否を確認しており，システム適格性確認テストに対応する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2015a-am2-q12",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "教育効果の評価",
    "topicTags": [
      "教育効果の評価"
    ],
    "difficulty": 3,
    "question": "新システムの受入れ支援において，利用者への教育訓練に対する教育効果の測定を，カークパトリックモデルの4段階評価を用いて行う。レベル1（Reaction），レベル2（Learning），レベル3（Behavior），レベル4（Results）の各段階にそれぞれ対応したa〜dの活動のうち，レベル2のものはどれか。\n\na　受講者にアンケートを実施し，教育訓練プログラムの改善に活用する。\nb　受講者に行動計画を作成させ，後日，新システムの活用状況を確認する。\nc　受講者の行動による組織業績の変化を分析し，ROIなどを算出する。\nd　理解度確認テストを実施し，テスト結果を受講者にフィードバックする。",
    "choices": {
      "ア": "a",
      "イ": "b",
      "ウ": "c",
      "エ": "d"
    },
    "answer": "エ",
    "explanation": "正解はエ。レベル2のLearningは，教育によって知識や技能などを身に付けたかを評価する。理解度確認テストは学習の到達度を直接確かめられる。受講者の反応，現場での行動の変化，組織の業績は，それぞれ別の段階で評価する。",
    "choiceExplanations": {
      "ア": "アンケートで受講者の反応を把握する活動は，レベル1のReactionに対応する。",
      "イ": "受講後の現場での活用という行動の変化を確認する活動は，レベル3のBehaviorに対応する。",
      "ウ": "組織の業績や投資に対する成果を確認する活動は，レベル4のResultsに対応する。",
      "エ": "テストで知識や理解の習得状況を確認する活動なので，レベル2のLearningに対応する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.kirkpatrickpartners.com/the-kirkpatrick-model/"
    ]
  },
  {
    "id": "sa-2015a-am2-q13",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "ソフトウェア再利用",
    "topicTags": [
      "ソフトウェア再利用"
    ],
    "difficulty": 3,
    "question": "銀行の勘定系システムなどのような特定の分野のシステムに対して，業務知識，再利用部品，ツールなどを体系的に整備し，再利用を促進することによって，ソフトウェア開発の効率向上を図る活動や手法はどれか。",
    "choices": {
      "ア": "コンカレントエンジニアリング",
      "イ": "ドメインエンジニアリング",
      "ウ": "フォワードエンジニアリング",
      "エ": "リバースエンジニアリング"
    },
    "answer": "イ",
    "explanation": "正解はイ。ドメインエンジニアリングは，特定の業務分野に共通する知識や構造を分析し，再利用できる部品などを整備して，その分野の開発に活用する。単一のシステムを作るだけでなく，同じ分野の複数のシステムへ知識や資産を展開する点が手掛かりになる。",
    "choiceExplanations": {
      "ア": "関連する設計や開発の作業を並行して進め，全体の期間短縮などを図る考え方であり，特定分野の資産整備とは異なる。",
      "イ": "特定の分野に共通する知識・部品・ツールを体系化し，再利用で開発効率を高める手法に当たる。",
      "ウ": "仕様や設計から実装へと開発を進める方向を表すもので，分野固有の再利用資産の整備を意味しない。",
      "エ": "既存の実装から構造や仕様などを読み取る手法であり，設問の活動全体の名称ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2015a-am2-q14",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "要求分析",
    "topicTags": [
      "要求分析"
    ],
    "difficulty": 3,
    "question": "BABOKでは，要求をビジネス要求，ステークホルダ要求，ソリューション要求及び移行要求の4種類に分類している。ソリューション要求の説明はどれか。",
    "choices": {
      "ア": "経営戦略や情報化戦略などから求められる要求であり，エンタープライズアナリシスの活動で定義している。",
      "イ": "新システムへのデータ変換や要員教育などに関する要求であり，ソリューションのアセスメントと妥当性確認の活動で定義している。",
      "ウ": "組織・業務・システムが実現すべき機能要求と非機能要求であり，要求アナリシスの活動で定義している。",
      "エ": "利用部門や運用部門などから個別に発せられるニーズであり，要求アナリシスの活動で定義している。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。ソリューション要求は，解決策が満たすべき機能や品質などの具体的な能力・特性を示す。経営上の目的を表すビジネス要求，関係者のニーズを表すステークホルダ要求，移行中に必要な移行要求と区別する。本問は出題当時のBABOKの活動名を用いている。",
    "choiceExplanations": {
      "ア": "組織として達成したい経営上の目的や方向性を示しており，ビジネス要求に対応する。",
      "イ": "データ変換や教育など，現状から新しい仕組みに移るために必要な内容なので，移行要求に対応する。",
      "ウ": "解決策が実現する機能と非機能の要求を具体化しており，ソリューション要求に対応する。",
      "エ": "個々の関係者や部門のニーズを示しており，ステークホルダ要求に対応する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2015a-am2-q15",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "システム化計画",
    "topicTags": [
      "システム化計画"
    ],
    "difficulty": 3,
    "question": "共通フレームによれば，システム化計画が承認された後に実施する作業はどれか。",
    "choices": {
      "ア": "現行システムの内容，流れの調査及び課題の分析，抽出",
      "イ": "システム稼働時期の設定と全体開発スケジュールの作成",
      "ウ": "システム化の対象となる利害関係者の要件の抽出",
      "エ": "システム実現のための費用と実現時の効果の予測"
    },
    "answer": "ウ",
    "explanation": "正解はウ。システム化計画では現状の課題，開発の時期や予定，費用と効果などを整理し，実施する計画の承認を得る。その後，利害関係者が何を必要としているかを詳しく抽出し，システムに求める要件へつなげる。",
    "choiceExplanations": {
      "ア": "現状の調査と課題の分析は，何をシステム化するかという計画の根拠を作るため，計画承認前に行う。",
      "イ": "稼働時期と全体スケジュールは，計画を判断・承認するために整理する事項に当たる。",
      "ウ": "承認された計画に従い，対象となる利害関係者の要求を具体的に抽出する段階の作業である。",
      "エ": "費用と効果の予測は実施の妥当性を判断する材料なので，システム化計画の承認より前に必要となる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2015a-am2-q16",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "契約方式",
    "topicTags": [
      "契約方式"
    ],
    "difficulty": 3,
    "question": "システム開発におけるベンダとの契約方法のうち，実費償還型契約はどれか。",
    "choices": {
      "ア": "委託業務の遂行中に発生するリスクはベンダが負い，発注者は注文時に合意した価格を支払う。",
      "イ": "契約期間が長期にわたる場合などで，インフレ率や特定の商品コストの変化に応じて，あらかじめ取り決められた契約金額を調整する。",
      "ウ": "注文時に，目標とするコスト，利益，利益配分率，上限額を合意し，目標コストと実際に発生したコストの差異に基づいて利益を配分する。",
      "エ": "ベンダの役務や技術に対する報酬に加え，委託業務の遂行に要した費用の全てをベンダに支払う。"
    },
    "answer": "エ",
    "explanation": "正解はエ。実費償還型契約では，業務で実際に発生した契約対象の費用を発注者が償還し，別途，報酬を支払う。実際の費用にかかわらず合意価格を支払う定額型と比べ，費用が増加した場合の負担の置き方が異なる。",
    "choiceExplanations": {
      "ア": "実際にかかった費用にかかわらず合意した価格を支払う説明なので，確定した定額型の契約に対応する。",
      "イ": "物価などの変動に応じて契約価格を調整する方式であり，発生費用をそのまま償還する説明ではない。",
      "ウ": "目標コストとの差異を基に利益を配分するインセンティブを伴う方式であり，実費償還の説明とは異なる。",
      "エ": "遂行に要した費用を償還し，それにベンダへの報酬を加えるという，実費償還型契約の特徴を示す。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2015a-am2-q17",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "事業継続",
    "topicTags": [
      "事業継続"
    ],
    "difficulty": 3,
    "question": "BCP策定に際して，目標復旧時間となるものはどれか。",
    "choices": {
      "ア": "災害時に代替手段で運用していた業務が，完全に元の状態に戻るまでの時間",
      "イ": "災害による業務の停止が深刻な被害とならないために許容される時間",
      "ウ": "障害発生後のシステムの縮退運用を継続することが許容される時間",
      "エ": "対策本部の立上げや判定会議の時間を除く，待機系への切替えに要する時間"
    },
    "answer": "イ",
    "explanation": "正解はイ。目標復旧時間（RTO）は，業務の中断からどの程度の時間で復旧することを目指すかを表す。本問では，停止による深刻な被害を避けるために許容される時間が対応する。待機系への技術的な切替え時間だけでなく，業務の復旧全体を考える。",
    "choiceExplanations": {
      "ア": "代替手段によって業務を再開できても，元の状態への完全復帰にはさらに時間がかかり得るため，RTOそのものではない。",
      "イ": "業務の停止による影響を踏まえ，その時間内での復旧を目指すという設問の目標復旧時間に対応する。",
      "ウ": "縮退して業務を継続できる時間の制限であり，中断した業務を復旧するまでの目標時間とは異なる。",
      "エ": "対策本部の判断なども業務の復旧に要する時間に含まれるので，機器の切替え時間だけでは不十分である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2015a-am2-q18",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "割込み",
    "topicTags": [
      "割込み"
    ],
    "difficulty": 3,
    "question": "SVC（SuperVisor Call）割込みが発生する要因として，適切なものはどれか。",
    "choices": {
      "ア": "OSがシステム異常を検出した。",
      "イ": "ウォッチドッグタイマが最大カウントに達した。",
      "ウ": "システム監視LSIが割込み要求を出した。",
      "エ": "ユーザプログラムがカーネルの機能を呼び出した。"
    },
    "answer": "エ",
    "explanation": "正解はエ。SVC割込みは，ユーザプログラムからOSの機能を利用するために起こすソフトウェア割込みである。ユーザ側からカーネル側の処理へ制御を移す入口となる。タイマや監視回路など外部の装置からの割込み要求とは区別する。",
    "choiceExplanations": {
      "ア": "システム異常の検出による処理は，ユーザプログラムがOSのサービスを呼び出すSVCとは要因が異なる。",
      "イ": "ウォッチドッグタイマの満了は監視用タイマによる事象であり，OSサービスの呼出しではない。",
      "ウ": "監視LSIというハードウェアからの要求なので，プログラムが起こすSVC割込みの説明ではない。",
      "エ": "ユーザプログラムがOSのサービスを要求するためにカーネルへ制御を移す場合が，SVC割込みに当たる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2015a-am2-q19",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "フォールトトレランス",
    "topicTags": [
      "フォールトトレランス"
    ],
    "difficulty": 3,
    "question": "フォールトトレランスに関する説明のうち，適切なものはどれか。",
    "choices": {
      "ア": "ソフトウェアのバグによるシステム故障のようなソフトウェアフォールトに対処した設計を，フェールソフトと呼ぶ。",
      "イ": "フェールセーフはフォールトトレランスに含まれるが，フェールソフトは含まれない。",
      "ウ": "フォールトトレランスの例として，システム全体を二重化する方式がある。",
      "エ": "フォールトトレランスは，システムを多重化することなく，故障の検出から回復までの時間をゼロにすることである。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。フォールトトレランスは，構成要素に故障が起きても，必要なシステム機能を継続できるようにする考え方である。システムを二重化して正常な系で処理を続ける方式が一例となる。フェールソフトのソフトは，ソフトウェアの意味ではない。",
    "choiceExplanations": {
      "ア": "フェールソフトは故障時に機能や性能を縮小して処理を継続する考え方で，ソフトウェアのバグ対策だけを意味しない。",
      "イ": "機能を縮小しても処理を継続するフェールソフトを，故障に耐える考え方から一律に除外する記述は適切でない。",
      "ウ": "正常な別系統で処理を継続できる二重化は，一部の故障がサービス停止に直結しないようにする方式である。",
      "エ": "多重化を行わないことや検出から回復までを必ずゼロにすることは，フォールトトレランスの定義ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2015a-am2-q20",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "並列処理",
    "topicTags": [
      "並列処理"
    ],
    "difficulty": 3,
    "question": "マルチプロセッサによる並列処理において，1プロセッサのときに対する性能向上比はアムダールの法則で説明することができる。性能向上比に関する記述のうち，適切なものはどれか。\n\n〔アムダールの法則〕",
    "choices": {
      "ア": "プロセッサ数が一定の場合，性能向上比は並列化可能部の割合に比例する。",
      "イ": "プロセッサ数を増やした場合，性能向上比は並列化可能部の割合に反比例する。",
      "ウ": "並列化可能部の割合が0.5の場合は，プロセッサ数をいくら増やしても性能向上比が2を超えることはない。",
      "エ": "並列化可能部の割合が最低0.9以上であれば，性能向上比はプロセッサ数の半分以上の値となる。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。並列化可能部の割合をp，プロセッサ数をnとすると，性能向上比は1／{(1−p)＋p／n}である。p＝0.5なら分母は0.5＋0.5／nなので，nを増やしても性能向上比は2を超えない。並列化できない部分が性能の上限を決める。",
    "choiceExplanations": {
      "ア": "性能向上比は1／{1−p＋p／n}であり，pが増えると改善するが，pに単純に比例する式ではない。",
      "イ": "プロセッサ数の増加による効果はpが大きいほど得やすく，pに反比例するという関係ではない。",
      "ウ": "並列化できない0.5の処理時間が必ず残るため，nを無限に増やしたときの上限も2となる。",
      "エ": "p＝0.9，n＝100なら性能向上比は約9.17であり，プロセッサ数の半分である50に達しない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true,
    "imageUrls": [
      "/images/questions/sa/2015-autumn-am2-q20.png"
    ],
    "imageAltTexts": [
      "性能向上比＝1／｛（1−並列化可能部の割合）＋並列化可能部の割合／プロセッサ数｝"
    ]
  },
  {
    "id": "sa-2015a-am2-q21",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "OLAP",
    "topicTags": [
      "OLAP"
    ],
    "difficulty": 3,
    "question": "OLAPによって，商品の販売状況分析を商品軸，販売チャネル軸，時間軸，顧客タイプ軸で行う。データ集計の観点を，商品，販売チャネルごとから，商品，顧客タイプごとに切り替える操作はどれか。",
    "choices": {
      "ア": "ダイス",
      "イ": "データクレンジング",
      "ウ": "ドリルダウン",
      "エ": "ロールアップ"
    },
    "answer": "ア",
    "explanation": "正解はア。ダイスは，多次元データを分析するときに，見る軸の組合せを変えて集計の切り口を切り替える操作である。設問では商品軸はそのままに，販売チャネル軸から顧客タイプ軸へ切り替えている。粒度を細かくしたり粗くしたりする操作とは異なる。",
    "choiceExplanations": {
      "ア": "商品と組み合わせる分析軸を販売チャネルから顧客タイプへ切り替えており，ダイスに対応する。",
      "イ": "データの誤りや表記の不統一などを修正・整理する処理であり，分析軸を切り替える操作ではない。",
      "ウ": "年から月へなど，同じ分析軸の中で詳細な粒度に掘り下げる操作であり，軸の交換とは異なる。",
      "エ": "月から年へなど，詳細データをより大きな単位へまとめる操作であり，軸の組合せの変更ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2015a-am2-q22",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "LANアクセス制御",
    "topicTags": [
      "LANアクセス制御"
    ],
    "difficulty": 3,
    "question": "CSMA/CAやCSMA/CDのLANの制御に共通しているCSMA方式に関する記述として，適切なものはどれか。",
    "choices": {
      "ア": "キャリア信号を検出して，データの送信を制御する。",
      "イ": "送信権をもつメッセージ（トークン）を得た端末がデータを送信する。",
      "ウ": "データ送信中に衝突が起こった場合は，直ちに再送を行う。",
      "エ": "伝送路が使用中でもデータの送信はできる。"
    },
    "answer": "ア",
    "explanation": "正解はア。CSMAは，送信前に伝送路上のキャリアを調べ，他の端末が通信中かを確認して送信を制御する方式である。CSMA/CDは衝突の検出，CSMA/CAは衝突の回避に工夫を加えるが，キャリアを確認する点は共通している。",
    "choiceExplanations": {
      "ア": "Carrier Senseという名称のとおり，伝送路上の信号を調べて送信を制御するのが共通の特徴である。",
      "イ": "トークンを取得した端末に送信権を与える方式の説明であり，CSMAのアクセス制御とは異なる。",
      "ウ": "衝突後は所定の待ち時間を設ける。衝突を繰り返さないためにも，直ちに再送するとは限らない。",
      "エ": "伝送路が使用中かを確認して送信を制御するので，使用中でもそのまま送信するという説明は適切でない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2015a-am2-q23",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "暗号化",
    "topicTags": [
      "暗号化"
    ],
    "difficulty": 3,
    "question": "ファイルを送受信する際の情報漏えい対策のうち，適切なものはどれか。",
    "choices": {
      "ア": "送信者Aは，共通鍵暗号方式の鍵でファイルを暗号化し，鍵と一緒に暗号化ファイルを受信者Bへ送付する。受信者Bは，受信した鍵で暗号化ファイルを復号する。",
      "イ": "送信者Aは，公開鍵暗号方式において送信者Aが公開している鍵でファイルを暗号化し，暗号化ファイルを受信者Bへ送付する。受信者Bは，受信者Bが秘密に管理している鍵で暗号化ファイルを復号する。",
      "ウ": "送信者Aは，公開鍵暗号方式において送信者Aが秘密に管理している鍵でファイルを暗号化し，暗号化ファイルを受信者Bへ送付する。受信者Bは，送信者Aが公開している鍵で暗号化ファイルを復号する。",
      "エ": "送信者Aは，パスワードから生成した共通鍵暗号方式の鍵でファイルを暗号化し，暗号化ファイルを受信者Bへ送付する。受信者Bは，送信者Aからパスワードの通知を別手段で受け，そのパスワードから生成した鍵で暗号化ファイルを復号する。"
    },
    "answer": "エ",
    "explanation": "正解はエ。暗号文と復号に必要な秘密を別の手段で渡せば，一方の経路だけを盗み見られたときに両方がそろう危険を減らせる。公開鍵暗号で受信者だけが読めるようにする場合は，受信者の公開鍵で暗号化し，対応する受信者の秘密鍵で復号する。",
    "choiceExplanations": {
      "ア": "暗号文と鍵を一緒に取得されると復号されてしまうため，情報漏えい対策として鍵の渡し方が不適切である。",
      "イ": "Aの公開鍵に対応するのはAの秘密鍵であり，Bの秘密鍵で復号できるという組合せになっていない。",
      "ウ": "Aの公開鍵は第三者も利用できるため，その鍵で読める情報は受信者Bだけに秘匿されたものにならない。",
      "エ": "復号用の秘密を暗号文とは別手段で通知し，受信者が同じ鍵を生成して復号するという対策である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2015a-am2-q24",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "PKI",
    "topicTags": [
      "PKI"
    ],
    "difficulty": 3,
    "question": "何らかの理由で有効期間中に失効したディジタル証明書の一覧を示すデータはどれか。",
    "choices": {
      "ア": "CA",
      "イ": "CP",
      "ウ": "CPS",
      "エ": "CRL"
    },
    "answer": "エ",
    "explanation": "正解はエ。CRLはCertificate Revocation Listで，失効した証明書の情報を記載する。証明書の有効期限がまだ残っていても，秘密鍵の漏えいなどで失効していれば有効なものとして扱えない。認証局の名称や運用方針を示す文書とは区別する。",
    "choiceExplanations": {
      "ア": "CAは証明書を発行する認証局を表す語であり，失効した証明書の一覧データではない。",
      "イ": "CPは証明書ポリシを表し，証明書に適用する方針を定めるもので，失効一覧ではない。",
      "ウ": "CPSは認証局の認証実施規定を表し，実際の運用方法などを記述するもので，失効一覧ではない。",
      "エ": "Certificate Revocation Listの略であり，有効期間中に失効した証明書を確認するための一覧である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc5280.html#section-5"
    ]
  },
  {
    "id": "sa-2015a-am2-q25",
    "exam": "sa",
    "session": "am2",
    "year": 2015,
    "season": "autumn",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "WAF",
    "topicTags": [
      "WAF"
    ],
    "difficulty": 3,
    "question": "WAFの説明はどれか。",
    "choices": {
      "ア": "Webアプリケーションへの攻撃を監視し阻止する。",
      "イ": "Webブラウザの通信内容を改ざんする攻撃をPC内で監視し検出する。",
      "ウ": "サーバへの不正なログインを監視する。",
      "エ": "ファイルのウイルス感染を監視し検出する。"
    },
    "answer": "ア",
    "explanation": "正解はア。WAFはWeb Application Firewallで，Webアプリケーションに向けられた通信を調べ，攻撃に該当する要求を検知・遮断する。Webアプリへの入力を悪用する攻撃への対策であり，端末内の監視やファイルのウイルス検査そのものではない。",
    "choiceExplanations": {
      "ア": "Webアプリケーションへの通信を対象に攻撃を監視し遮断するという，WAFの役割を示している。",
      "イ": "PC内部でブラウザの通信への改ざんを監視する端末側の対策であり，WAFの説明ではない。",
      "ウ": "サーバへのログインの監視一般を示しており，Webアプリケーションへの攻撃を防ぐWAFの定義とは異なる。",
      "エ": "ファイルのマルウェア感染を調べるウイルス対策ソフトなどの役割であり，WAFの役割ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000gxj0-att/2015h27a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  }
];
