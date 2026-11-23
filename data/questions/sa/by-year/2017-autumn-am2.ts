// IPA公式冊子から転記。原典・照合記録: ../2017-autumn-am2-sources.json
import type { Question } from "@/lib/questions/types";

export const SA_QUESTIONS_2017_AUTUMN_AM2: Question[] = [
  {
    "id": "sa-2017a-am2-q1",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 1,
    "type": "multiple-choice",
    "category": "アジャイル開発",
    "topicTags": [
      "アジャイル開発"
    ],
    "difficulty": 3,
    "question": "アジャイル開発プロセスにおいて，Bill Wake が提案した“INVEST”と呼ばれる六つの観点を用いて行うことはどれか。",
    "choices": {
      "ア": "効率よくアクティビティ図を作成する。",
      "イ": "コード化できるレベルまで詳細化されたデータフロー図を作成する。",
      "ウ": "再利用しやすいソフトウェアパターンとなっているかどうかを評価する。",
      "エ": "質の高いユーザーストーリとなっているかどうかを評価する。"
    },
    "answer": "エ",
    "explanation": "正解はエ。INVESTはユーザーストーリを点検する観点である。独立性，交渉可能性，価値，見積可能性，小ささ，テスト可能性を確認し，実装と検証に取り組みやすい単位に整える。",
    "choiceExplanations": {
      "ア": "アクティビティ図は処理の流れを表す図であり，INVESTで評価するユーザーストーリとは対象が異なる。",
      "イ": "データフロー図の詳細化ではなく，利用者にとって価値のある要求の単位を点検する。",
      "ウ": "再利用可能な設計の型を評価する手法ではなく，ユーザーストーリの品質を点検する観点である。",
      "エ": "ユーザーストーリが独立し，価値を持ち，小さくテスト可能かなどを確認する用途に一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://xp123.com/invest-in-good-stories-and-smart-tasks/"
    ]
  },
  {
    "id": "sa-2017a-am2-q2",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 2,
    "type": "multiple-choice",
    "category": "機能要件",
    "topicTags": [
      "機能要件"
    ],
    "difficulty": 3,
    "question": "機能要件と非機能要件のうち，機能要件を満たすために行う設計はどれか。",
    "choices": {
      "ア": "業務システムを開発するための開発環境を設計する。",
      "イ": "業務の重要度を分析して障害発生時の復旧時間を明確にする。",
      "ウ": "業務を構成する要素間のデータの流れを明確にする。",
      "エ": "部門業務の効率性と業務間の関連性を考慮して最適なサーバ配置を設計する。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。機能要件はシステムが何を行うかを定める。業務の要素と，それらの間で受け渡すデータを明らかにする設計は，必要な処理の具体化に当たる。",
    "choiceExplanations": {
      "ア": "開発を支える環境の設計であり，業務システム自身が実現する機能の定義ではない。",
      "イ": "障害からの復旧時間は，可用性や事業継続に関する非機能要件の設計である。",
      "ウ": "業務処理の入力・出力や要素間の連携を具体化するため，機能要件を満たす設計に当たる。",
      "エ": "サーバの配置はシステム構成や運用・性能などを考慮する設計であり，業務機能そのものの定義ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2017a-am2-q3",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 3,
    "type": "multiple-choice",
    "category": "UML",
    "topicTags": [
      "UML"
    ],
    "difficulty": 3,
    "question": "図は“顧客が商品を注文する”を表現したUMLのクラス図である。“顧客が複数の商品をまとめて注文する”を表現したクラス図はどれか。ここで，注文明細は注文に含まれる一つの商品に対応し，注文は一つ以上の注文明細を束ねたもので，一つの注文に対応する。",
    "choices": {
      "ア": "図のア",
      "イ": "図のイ",
      "ウ": "図のウ",
      "エ": "図のエ"
    },
    "answer": "ア",
    "explanation": "正解はア。一つの注文に1件以上の注文明細が属し，各明細は一つの商品を参照する。注文を全体，注文明細を部分とするコンポジションと，各関連の多重度がこの条件を満たす図を選ぶ。",
    "choiceExplanations": {
      "ア": "注文側が1，注文明細側が1..*であり，各明細が一つの商品に対応する。顧客と注文の関連も維持される。",
      "イ": "注文側が1..*，明細側が1になっており，注文が複数の明細を束ねるという条件と逆になる。",
      "ウ": "顧客が注文明細に直接結び付くため，顧客が注文を行い，注文が明細を束ねる構造にならない。",
      "エ": "注文と商品の直接関連が残り，明細と商品の対応を表していないため，明細ごとに商品を特定できない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/sa/2017-autumn-am2-q3.png"
    ],
    "imageAltTexts": [
      "注文と商品の元のクラス図，多重度とコンポジションの凡例，及び選択肢ア〜エのクラス図。"
    ]
  },
  {
    "id": "sa-2017a-am2-q4",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 4,
    "type": "multiple-choice",
    "category": "SysML",
    "topicTags": [
      "SysML"
    ],
    "difficulty": 3,
    "question": "複数のシステムの組合せによって実現するSoS（System of Systems）をモデル化するのに適した表記法であるSysMLの特徴はどれか。",
    "choices": {
      "ア": "オブジェクト図によって，インスタンスの静的なスナップショットが記述できる。",
      "イ": "単純な図形と矢印によって，システムのデータの流れが記述できる。",
      "ウ": "パラメトリック図によって，モデル要素間の制約条件が記述できる。",
      "エ": "連接，反復，選択の記述パターンによって，ソフトウェアの構造を分かりやすく視覚化できる。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。SysMLのパラメトリック図は，モデル内の値に関する制約を結び付け，数式などによる関係を表すための図である。モデル要素間の制約条件という説明が該当する。",
    "choiceExplanations": {
      "ア": "インスタンスのある時点の状態を示すオブジェクト図の説明であり，問われているSysMLの特徴とは異なる。",
      "イ": "処理やデータストアの間のデータの流れを示すDFDの説明に当たる。",
      "ウ": "パラメトリック図は制約と値の結び付きによって，モデル要素間の数量的関係などを記述する。",
      "エ": "連接・反復・選択による構造化された処理の表現であり，パラメトリック図による制約の記述ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.omg.org/spec/SysML/1.5/PDF"
    ]
  },
  {
    "id": "sa-2017a-am2-q5",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 5,
    "type": "multiple-choice",
    "category": "デザインパターン",
    "topicTags": [
      "デザインパターン"
    ],
    "difficulty": 3,
    "question": "ソフトウェアパターンのうち，GoFのデザインパターンの説明はどれか。",
    "choices": {
      "ア": "Javaのパターンとして引数オブジェクト，オブジェクトの可変性などで構成される。",
      "イ": "オブジェクト指向開発のためのパターンとして生成，構造，振る舞いの三つのカテゴリで分類される。",
      "ウ": "構造，分散システム，対話型システム及び適合型システムの四つのカテゴリで分類される。",
      "エ": "抽象度が異なる要素を分割して階層化するためのLayers，コンポーネント分割のためのBrokerなどで構成される。"
    },
    "answer": "イ",
    "explanation": "正解はイ。GoFのデザインパターンは，オブジェクトの生成方法，クラスやオブジェクトの構成，責務や相互作用という三つの観点で整理される。カテゴリ名は生成・構造・振る舞いである。",
    "choiceExplanations": {
      "ア": "特定言語の実装上の慣用的なパターンに関する説明であり，GoFの三分類ではない。",
      "イ": "生成，構造，振る舞いという三分類が，GoFのデザインパターンの分類に一致する。",
      "ウ": "システム全体の構成に関わるアーキテクチャパターンの分類であり，GoFの三分類ではない。",
      "エ": "LayersやBrokerは全体構造を扱うアーキテクチャパターンであり，GoFのデザインパターンとは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2017a-am2-q6",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 6,
    "type": "multiple-choice",
    "category": "組込みシステム",
    "topicTags": [
      "組込みシステム"
    ],
    "difficulty": 3,
    "question": "組込みシステムの開発における，ハードウェアとソフトウェアのコデザインを適用した開発手法の説明として，適切なものはどれか。",
    "choices": {
      "ア": "ハードウェアとソフトウェアの切分けをシミュレーションによって十分に検証し，その後もシミュレーションを活用しながらハードウェアとソフトウェアを並行して開発していく手法",
      "イ": "ハードウェアの開発とソフトウェアの開発を独立して行い，それぞれの完了後に組み合わせて統合テストを行う手法",
      "ウ": "ハードウェアの開発をアウトソーシングし，ソフトウェアの開発に注力することによって，短期間に高機能の製品を市場に出す手法",
      "エ": "ハードウェアをプラットフォーム化し，主にソフトウェアで機能を差別化することによって，短期間に多数の製品ラインアップを構築する手法"
    },
    "answer": "ア",
    "explanation": "正解はア。コデザインではハードウェアとソフトウェアの役割分担を合わせて検討する。シミュレーションで切分けを検証し，両者の整合を確認しながら並行開発する点が要点となる。",
    "choiceExplanations": {
      "ア": "役割分担を事前に検証し，その後も両者を合わせて確認しながら並行開発するため，コデザインに該当する。",
      "イ": "独立に完成させて最後に結合する方式では，開発途中から協調して設計を検証する特徴がない。",
      "ウ": "外部委託の有無は分業方法であり，ハードウェアとソフトウェアを協調設計するかとは別の観点である。",
      "エ": "共通基盤とソフトウェアによる製品展開の説明であり，設計時の協調検証を直接説明していない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2017a-am2-q7",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 7,
    "type": "multiple-choice",
    "category": "シーケンス図",
    "topicTags": [
      "シーケンス図"
    ],
    "difficulty": 3,
    "question": "イベント駆動型のアプリケーションにおけるイベント処理のタイミングを設計するのに有用なものはどれか。",
    "choices": {
      "ア": "DFD",
      "イ": "E-R図",
      "ウ": "シーケンス図",
      "エ": "ペトリネット"
    },
    "answer": "ウ",
    "explanation": "正解はウ。シーケンス図は，参加するオブジェクト間でどの順にメッセージが送られるかを時間の流れに沿って示す。イベントを受けた処理と後続の呼出しの順序を設計するのに適している。",
    "choiceExplanations": {
      "ア": "DFDはデータが処理やデータストアの間を流れる様子を表し，イベント処理の時間順序を主目的としない。",
      "イ": "E-R図はデータの実体と関連を表し，メッセージ交換のタイミングを表す図ではない。",
      "ウ": "メッセージを時間順に並べて表せるため，イベントに応じた相互作用の設計に利用できる。",
      "エ": "状態や遷移による並行動作の解析に使えるが，本問のイベント処理のやり取りにはシーケンス図を選ぶ。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2017a-am2-q8",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 8,
    "type": "multiple-choice",
    "category": "フェールセーフ",
    "topicTags": [
      "フェールセーフ"
    ],
    "difficulty": 3,
    "question": "フェールセーフの考えに基づいて設計したものはどれか。",
    "choices": {
      "ア": "乾電池のプラスとマイナスを逆にすると，乾電池が装填できないようにする。",
      "イ": "交通管制システムが故障したときには，信号機に赤色が点灯するようにする。",
      "ウ": "ネットワークカードのコントローラを二重化しておき，故障したコントローラの方を切り離して運用できるようにする。",
      "エ": "ハードディスクにRAID1を採用して，MTBFで示される信頼性が向上するようにする。"
    },
    "answer": "イ",
    "explanation": "正解はイ。フェールセーフは，故障時に安全側へ移るように設計する考え方である。交通信号を赤にして車両を停止させる設計は，故障時の危険を抑えるための動作に当たる。",
    "choiceExplanations": {
      "ア": "誤った向きで装填できなくするのは，人の操作ミスを防ぐフールプルーフの考え方である。",
      "イ": "故障が起きたときに赤信号という安全側の状態へ移すため，フェールセーフに該当する。",
      "ウ": "故障した要素を切り離して処理を継続する設計であり，安全側への停止を目的とするものではない。",
      "エ": "ディスクの冗長化によって信頼性を高める設計であり，故障時の安全側への移行とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2017a-am2-q9",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 9,
    "type": "multiple-choice",
    "category": "エラー埋込み法",
    "topicTags": [
      "エラー埋込み法"
    ],
    "difficulty": 3,
    "question": "ソフトウェアの潜在エラー数を推定する方法の一つにエラー埋込み法がある。100個のエラーを意図的に埋め込んだプログラムを，そのエラーの存在を知らない検査グループがテストして30個のエラーを発見した。そのうち20個は意図的に埋め込んでおいたものであった。この時点で，このプログラムの埋込みエラーを除く残存エラー数は幾つと推定できるか。",
    "choices": {
      "ア": "40",
      "イ": "50",
      "ウ": "70",
      "エ": "150"
    },
    "answer": "ア",
    "explanation": "正解はア。埋込みエラーの発見率は20÷100＝0.2である。元からあったエラーの発見数は30−20＝10なので，元の総数を10÷0.2＝50個と推定する。既に10個発見したため，残りは50−10＝40個となる。",
    "choiceExplanations": {
      "ア": "元の推定総数50個から，既に発見した元のエラー10個を差し引いた残存数である。",
      "イ": "50個は元から存在したエラーの推定総数であり，既に発見した10個をまだ差し引いていない。",
      "ウ": "埋込みエラーと元のエラーを分けずに計算しており，元から存在する未発見エラー数にならない。",
      "エ": "発見した30個を全て元のエラーとして発見率で割った値であり，埋込み20個の除外ができていない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "sa-2017a-am2-q10",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 10,
    "type": "multiple-choice",
    "category": "ペアプログラミング",
    "topicTags": [
      "ペアプログラミング"
    ],
    "difficulty": 3,
    "question": "ハードウェアの経験が豊富なプログラマAと，経験の少ないプログラマBがペアプログラミングの手法を利用して組込みシステムの開発を進める。ペアプログラミングによる開発の進め方として，適切なものはどれか。",
    "choices": {
      "ア": "Aがデバイスドライバの開発を担当し，Bがアプリケーションの開発を担当する。",
      "イ": "Aがプロジェクトマネージャとして，プロジェクトの調整役になる。",
      "ウ": "AとBがエディタの画面を共有し，Bが記述したコードに対してAが助言する。",
      "エ": "ハードウェアとソフトウェアの切分けをシミュレーションで検証してから，AとBで分担して開発する。"
    },
    "answer": "ウ",
    "explanation": "正解はウ。ペアプログラミングでは，二人が同じコードを見ながら実装と確認を協力して進める。Bの入力をAが確認して助言する進め方なら，経験をその場で共有しつつ開発できる。",
    "choiceExplanations": {
      "ア": "別々の部品をそれぞれ担当する通常の分業であり，同じコードを二人で扱う進め方ではない。",
      "イ": "管理と調整を担当する役割分担であり，二人が共同で実装するペアプログラミングではない。",
      "ウ": "同じ画面とコードを共有し，一人の実装をもう一人が確認・助言するため，手法の特徴に一致する。",
      "エ": "ハードウェアとソフトウェアの分担を決める開発方式であり，ペアでコードを書くことを表していない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2017a-am2-q11",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 11,
    "type": "multiple-choice",
    "category": "探索的テスト",
    "topicTags": [
      "探索的テスト"
    ],
    "difficulty": 3,
    "question": "探索的テスト技法の説明はどれか。",
    "choices": {
      "ア": "起こり得る全ての条件と，それに対して実行すべき動作とを組み合わせた表に基づいてテストする技法",
      "イ": "経験に基づいて，起こりがちなエラーを推測してテストケースを決定する技法",
      "ウ": "経験や推測から重要と思われる領域に焦点を当ててテストし，その結果を基にした新たなテストケースを作成して，テストを繰り返す技法",
      "エ": "システムの取り得る状態と，状態を遷移させる事象又は条件を示した図に基づいてテストする技法"
    },
    "answer": "ウ",
    "explanation": "正解はウ。探索的テストでは，対象を学びながらテストを設計して実行し，得られた結果を次の調査やテストに反映する。最初に決めたケースを消化するだけでなく，発見に応じて探索を進める点が特徴である。",
    "choiceExplanations": {
      "ア": "条件と動作の組合せ表を使うデシジョンテーブルテストの説明であり，探索的テストではない。",
      "イ": "経験から誤りを予想してケースを選ぶエラー推測の説明であり，結果から次の探索を進める特徴がない。",
      "ウ": "実行結果を学習し，次のテストケースへ反映して繰り返す進め方が探索的テストに一致する。",
      "エ": "状態と事象を表したモデルに基づく状態遷移テストの説明であり，探索的テストではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2017a-am2-q12",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 12,
    "type": "multiple-choice",
    "category": "FMEA",
    "topicTags": [
      "FMEA"
    ],
    "difficulty": 3,
    "question": "故障の予防を目的とした解析手法であるFMEAの説明はどれか。",
    "choices": {
      "ア": "個々のシステム構成要素に起こり得る潜在的な故障モードを特定し，それらの影響度を評価する。",
      "イ": "故障を，発生した工程や箇所などで分類し，改善すべき工程や箇所を特定する。",
      "ウ": "発生した故障について，故障の原因に関係するデータ，事象などを収集し，“なぜ”を繰り返して原因を掘り下げ，根本的な原因を追究する。",
      "エ": "発生した故障について，その引き金となる原因を列挙し，それらの関係を木構造で表現する。"
    },
    "answer": "ア",
    "explanation": "正解はア。FMEAは，構成要素ごとに想定する故障の起こり方を洗い出し，それがシステムなどへ及ぼす影響を調べる。故障モードから影響へと検討を積み上げる点で，故障事象から原因を展開するFTAと区別できる。",
    "choiceExplanations": {
      "ア": "構成要素の故障モードを出発点に影響を評価するという，FMEAの解析の方向に一致する。",
      "イ": "工程や箇所による層別・分類であり，故障モードごとに影響を評価する手法の説明ではない。",
      "ウ": "既に起きた故障の根本原因を，なぜの繰返しで追究する原因分析の説明である。",
      "エ": "故障という上位事象から原因を木構造で展開するFTAの説明であり，FMEAとは解析の方向が異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2017a-am2-q13",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 13,
    "type": "multiple-choice",
    "category": "ドメインエンジニアリング",
    "topicTags": [
      "ドメインエンジニアリング"
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
    "explanation": "正解はイ。ドメインは対象となる業務などの分野を指す。分野に共通する知識や部品を整理して再利用可能にし，同じ分野のシステム開発を効率化する活動がドメインエンジニアリングである。",
    "choiceExplanations": {
      "ア": "複数の工程を並行して進める考え方であり，特定分野の知識と部品を体系化する活動ではない。",
      "イ": "特定の業務分野の共通性を整理して再利用を促すため，設問の活動に一致する。",
      "ウ": "要求や設計から実装へと開発を進める方向を指し，分野別の再利用資産の整備とは異なる。",
      "エ": "既存のソフトウェアから設計や仕様を解析する活動であり，設問の分野別再利用の体系化とは異なる。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2017a-am2-q14",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 14,
    "type": "multiple-choice",
    "category": "IT投資評価",
    "topicTags": [
      "IT投資評価"
    ],
    "difficulty": 3,
    "question": "IT投資を，投資目的によって表のように分類した。IT投資評価のKPIのうち，戦略的投資に対するKPIの例はどれか。\n\n| 分類 | 投資目的 |\n| --- | --- |\n| 業務効率投資 | 業務の効率向上，業務の生産性向上など |\n| 情報活用投資 | ナレッジの共有，管理精度の向上など |\n| 戦略的投資 | 競争優位の確立，ビジネスの創出など |\n| IT基盤投資 | ITコスト削減，システム性能向上など |",
    "choices": {
      "ア": "システムの障害件数",
      "イ": "新製品投入後の市場シェア",
      "ウ": "提案事例の登録件数",
      "エ": "連結決算処理の所要日数"
    },
    "answer": "イ",
    "explanation": "正解はイ。表では戦略的投資の目的を競争優位の確立やビジネスの創出としている。新製品を投入した後にどれだけ市場を獲得したかという市場シェアは，その目的に対応する成果指標である。",
    "choiceExplanations": {
      "ア": "障害件数はIT基盤の安定性を測る指標であり，競争優位や新規ビジネスの成果を直接測らない。",
      "イ": "新製品による市場の獲得を測るため，競争優位を目指す戦略的投資の評価に適している。",
      "ウ": "共有できる事例の蓄積量を測るため，表の情報活用投資に対応する指標である。",
      "エ": "処理に要する期間を測る業務効率の指標であり，市場での競争優位の指標ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2017a-am2-q15",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 15,
    "type": "multiple-choice",
    "category": "知的財産",
    "topicTags": [
      "知的財産"
    ],
    "difficulty": 3,
    "question": "グラントバックの説明はどれか。",
    "choices": {
      "ア": "異なる分野で特許技術をもつ事業者同士が技術供与協定を締結し，互いに無償で特許の実施権を許諾すること",
      "イ": "自社固有のビジネスモデルに関してビジネスモデル特許を取得した上で，無償で広くその利用を許諾すること",
      "ウ": "ライセンスを受けた者が特許技術を改良し，新たに取得した特許は，ライセンスを与えた者に実施権が許諾されること",
      "エ": "ライセンスを受けた者が特許技術を改良し，新たに取得した特許は，ライセンスを与えた者へ譲渡される義務が課されること"
    },
    "answer": "ウ",
    "explanation": "正解はウ。グラントバックは，ライセンスを受けた側が生んだ改良技術について，元のライセンサーへ利用を許諾することである。特許そのものを譲り渡すアサインバックとは区別する。",
    "choiceExplanations": {
      "ア": "複数の事業者が互いの特許の実施を許諾するクロスライセンスの説明である。",
      "イ": "特許の無償開放の説明であり，ライセンシーの改良技術を元の許諾者へ利用許諾するものではない。",
      "ウ": "改良技術の権利を受け手に残しつつ，元のライセンサーに実施を許諾するため，グラントバックに当たる。",
      "エ": "改良技術の権利そのものを元のライセンサーへ譲渡するアサインバックの説明である。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.jftc.go.jp/dk/guideline/unyoukijun/chitekizaisan_files/chitekizaisangl.pdf"
    ]
  },
  {
    "id": "sa-2017a-am2-q16",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 16,
    "type": "multiple-choice",
    "category": "契約方式",
    "topicTags": [
      "契約方式"
    ],
    "difficulty": 3,
    "question": "システム開発における発注者とベンダとの契約方法のうち，実費償還型契約はどれか。",
    "choices": {
      "ア": "委託業務の進行中に発生するリスクはベンダが負い，発注者は注文時に合意した価格を支払う。",
      "イ": "インフレ率や特定の製品の調達コストの変化に応じて，あらかじめ取り決められた契約金額を調整する。",
      "ウ": "契約時に，目標とするコスト，利益，利益配分率，上限額を合意し，目標とするコストと実際に発生したコストの差に基づいて利益を配分する。",
      "エ": "ベンダの役務や技術に対する報酬に加え，委託業務の遂行に要した費用の全てをベンダに支払う。"
    },
    "answer": "エ",
    "explanation": "正解はエ。実費償還型契約では，業務の実施で実際に発生した費用を償還し，それに報酬を加えて支払う。最初から決まった価格だけを払う定額型とは，費用変動を負担する仕組みが異なる。",
    "choiceExplanations": {
      "ア": "合意済みの価格を支払い，費用増加のリスクをベンダが負う定額型契約の説明である。",
      "イ": "物価などの変動に合わせて合意価格を調整する方式であり，実費全額に報酬を加える説明ではない。",
      "ウ": "目標原価との差額を合意した割合で配分するインセンティブ付きの定額型契約の説明である。",
      "エ": "実際に要した費用を償還した上で役務・技術への報酬を加えるため，実費償還型に一致する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2017a-am2-q17",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 17,
    "type": "multiple-choice",
    "category": "データサイエンス",
    "topicTags": [
      "データサイエンス"
    ],
    "difficulty": 3,
    "question": "ビッグデータを有効活用し，事業価値を生み出す役割を担う専門人材であるデータサイエンティストに求められるスキルセットを表の三つの領域と定義した。データサイエンス力に該当する具体的なスキルはどれか。\n\nデータサイエンティストに求められるスキルセット\n\n| 領域 | 定義 |\n| --- | --- |\n| ビジネス力 | 課題の背景を理解した上で，ビジネス課題を整理・分析し，解決する力 |\n| データサイエンス力 | 人工知能や統計学などの情報科学に関する知識を用いて，予測，検定，関係性の把握及びデータ加工・可視化する力 |\n| データエンジニアリング力 | データ分析によって作成したモデルを使えるように，分析システムを実装，運用する力 |",
    "choices": {
      "ア": "扱うデータの規模や機密性を理解した上で，分析システムをオンプレミスで構築するか，クラウドコンピューティングを利用して構築するか判断し設計できる。",
      "イ": "事業モデルやバリューチェーンなどの特徴や事業の主たる課題を自力で構造的に理解でき，問題の大枠を整理できる。",
      "ウ": "分散処理のフレームワークを用いて，計算処理を複数サーバに分散させる並列処理システムを設計できる。",
      "エ": "分析要件に応じ，決定木分析，ニューラルネットワークなどのモデリング手法の選択，モデルのパラメタの設定，分析結果の評価ができる。"
    },
    "answer": "エ",
    "explanation": "正解はエ。表のデータサイエンス力は，統計や人工知能の知識を用いた分析に関する能力である。分析手法を選び，モデルの設定を調整して結果を評価するスキルが，この定義に対応する。",
    "choiceExplanations": {
      "ア": "分析システムの配置や構成の設計であり，表のデータエンジニアリング力に対応する。",
      "イ": "事業と課題の構造を理解するスキルであり，表のビジネス力に対応する。",
      "ウ": "分析を実行する分散処理基盤の設計であり，表のデータエンジニアリング力に対応する。",
      "エ": "モデルの手法選択・パラメタ設定・結果の評価は，情報科学の知識を使うデータサイエンス力に対応する。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2017a-am2-q18",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 18,
    "type": "multiple-choice",
    "category": "プロセッサ性能",
    "topicTags": [
      "プロセッサ性能"
    ],
    "difficulty": 3,
    "question": "表のCPIと構成比率で，3種類の演算命令が合計1,000,000命令実行されるプログラムを，クロック周波数が1GHzのプロセッサで実行するのに必要な時間は何ミリ秒か。\n\n| 演算命令 | CPI（Cycles Per Instruction） | 構成比率（%） |\n| --- | ---: | ---: |\n| 浮動小数点加算 | 3 | 20 |\n| 浮動小数点乗算 | 5 | 20 |\n| 整数演算 | 2 | 60 |",
    "choices": {
      "ア": "0.4",
      "イ": "2.8",
      "ウ": "4.0",
      "エ": "28.0"
    },
    "answer": "イ",
    "explanation": "正解はイ。平均CPIは3×0.2＋5×0.2＋2×0.6＝2.8である。100万命令に必要なのは280万クロック。1GHzは毎秒10億クロックなので，実行時間は2,800,000÷1,000,000,000＝0.0028秒，すなわち2.8ミリ秒となる。",
    "choiceExplanations": {
      "ア": "命令ごとのクロック数と構成比率から求める実行時間は2.8ミリ秒であり，0.4ミリ秒にはならない。",
      "イ": "構成比率で加重平均したCPI2.8と，100万命令・1GHzから求めた実行時間に一致する。",
      "ウ": "CPIを単純に扱うのではなく，命令構成比率で重み付けして必要クロック数を求める必要がある。",
      "エ": "正しい計算結果2.8ミリ秒より10倍大きく，クロック周波数と時間の単位の換算が合わない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "sa-2017a-am2-q19",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 19,
    "type": "multiple-choice",
    "category": "RPC",
    "topicTags": [
      "RPC"
    ],
    "difficulty": 3,
    "question": "WebブラウザやHTTPを用いず，独自のGUIとデータ転送機能を用いた，ネットワーク対戦型のゲームを作成する。仕様の（2）の実現に用いることができる仕組みはどれか。\n\n〔仕様〕\n\n（1）ゲームは囲碁や将棋のように2人のプレーヤの間で行われ，ゲームの状態はサーバで管理する。プレーヤはそれぞれクライアントプログラムを操作してゲームに参加する。\n\n（2）プレーヤが新たな手を打ったとき，クライアントプログラムはサーバにある関数を呼び出す。サーバにある関数は，その手がルールに従っているかどうかを調べ，ルールに従った手であればゲームの状態を変化させ，そうでなければその手が無効であることをクライアントプログラムに知らせる。\n\n（3）ゲームの状態に変化があれば，サーバは各クライアントプログラムにその旨を知らせることによってGUIに反映させる。",
    "choices": {
      "ア": "CGI",
      "イ": "PHP",
      "ウ": "RPC",
      "エ": "XML"
    },
    "answer": "ウ",
    "explanation": "正解はウ。RPCは，ネットワーク越しに別のコンピュータ上の手続きを呼び出す仕組みである。クライアントがサーバの関数を呼び，処理結果を受け取るという仕様（2）に対応する。",
    "choiceExplanations": {
      "ア": "CGIはWebサーバが外部プログラムを起動して応答を生成するための仕組みであり，設問の構成には合わない。",
      "イ": "PHPはプログラミング言語であり，遠隔の手続きを呼び出す仕組みの名称ではない。",
      "ウ": "サーバ上の関数をネットワーク越しに呼び出して結果を受け取るため，仕様（2）を実現できる。",
      "エ": "XMLは構造化データを記述する形式であり，関数を遠隔呼出しする機構ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2017a-am2-q20",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 20,
    "type": "multiple-choice",
    "category": "並列処理",
    "topicTags": [
      "並列処理"
    ],
    "difficulty": 3,
    "question": "マルチプロセッサによる並列処理で得られる高速化率（単一プロセッサのときと比べた倍率）Eを，次の式によって評価する。r＝0.9のアプリケーションの高速化率がr＝0.3のものの3倍となるのは，プロセッサが何台のときか。\n\nE＝1 / (1−r＋r/n)\n\nここで，\n\nn：プロセッサの台数（1≦n）\n\nr：対象とする処理のうち，並列化が可能な部分の割合（0≦r≦1）\n\nとし，並列化に伴うオーバヘッドは考えないものとする。",
    "choices": {
      "ア": "3",
      "イ": "4",
      "ウ": "5",
      "エ": "6"
    },
    "answer": "エ",
    "explanation": "正解はエ。高速化率の比は（0.7＋0.3/n）÷（0.1＋0.9/n）である。これを3とすると，0.7n＋0.3＝0.3n＋2.7となり，0.4n＝2.4からn＝6。6台ではそれぞれ4倍と4/3倍となり，比は3である。",
    "choiceExplanations": {
      "ア": "3台では高速化率が2.5倍と1.25倍なので，比は2となり，3倍という条件を満たさない。",
      "イ": "4台では比が（0.7＋0.075）÷（0.1＋0.225）＝31/13であり，3にはならない。",
      "ウ": "5台では比が（0.7＋0.06）÷（0.1＋0.18）＝19/7であり，3にはならない。",
      "エ": "6台では高速化率が4倍と4/3倍になり，4÷（4/3）＝3という条件を満たす。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "isCalculation": true
  },
  {
    "id": "sa-2017a-am2-q21",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 21,
    "type": "multiple-choice",
    "category": "データモデリング",
    "topicTags": [
      "データモデリング"
    ],
    "difficulty": 3,
    "question": "UMLを用いて表した図のデータモデルを基にして設計したテーブルのうち，適切なものはどれか。ここで，“担当委員会ID”と“所属委員会ID”は“委員会ID”を参照する外部キーである。“役員ID”と“委員ID”は“生徒ID”を参照する外部キーである。実線の下線は主キー，破線の下線は外部キーを表す。",
    "choices": {
      "ア": "委員会（委員会ID，委員会名），所属関連（所属委員会ID，委員ID），生徒（生徒ID，氏名，担当委員会ID）",
      "イ": "委員会（委員会ID，委員会名），役員関連（担当委員会ID，役員ID），生徒（生徒ID，氏名，所属委員会ID）",
      "ウ": "委員会（委員会ID，委員会名，委員ID），生徒（生徒ID，氏名，所属委員会ID，担当委員会ID）",
      "エ": "委員会（委員会ID，委員会名，役員ID），生徒（生徒ID，氏名，所属委員会ID）"
    },
    "answer": "ア",
    "explanation": "正解はア。所属は委員会と生徒の多対多なので，所属委員会IDと委員IDの組を持つ中間テーブルが必要である。担当は，一つの委員会に複数の役員が対応し，生徒側からは担当委員会が高々一つなので，生徒テーブルに担当委員会IDを置ける。",
    "choiceExplanations": {
      "ア": "所属の多対多を中間テーブルで表し，担当委員会を生徒の外部キーで表すため，両方の多重度を満たす。",
      "イ": "生徒に所属委員会IDを一つだけ置くと，生徒が複数の委員会に所属できるという多重度を表せない。",
      "ウ": "所属の多対多のための中間テーブルがなく，委員会に単一の委員IDを置く設計では複数の委員を扱えない。",
      "エ": "委員会に単一の役員IDを置くと複数役員を表せず，所属の多対多に必要な中間テーブルもない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/sa/2017-autumn-am2-q21.png"
    ],
    "imageAltTexts": [
      "委員会と生徒の担当・所属の多重度を示すUMLデータモデル，及び主キーを実線，外部キーを破線で示す選択肢ア〜エのテーブル定義。"
    ]
  },
  {
    "id": "sa-2017a-am2-q22",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 22,
    "type": "multiple-choice",
    "category": "VoIP",
    "topicTags": [
      "VoIP"
    ],
    "difficulty": 3,
    "question": "図は，既存の電話機とPBXを使用した企業内の内線網を，IPネットワークに統合する場合の接続構成を示している。図中のa〜cに該当する装置の適切な組合せはどれか。",
    "choices": {
      "ア": "a：PBX，b：VoIPゲートウェイ，c：ルータ",
      "イ": "a：PBX，b：ルータ，c：VoIPゲートウェイ",
      "ウ": "a：VoIPゲートウェイ，b：PBX，c：ルータ",
      "エ": "a：VoIPゲートウェイ，b：ルータ，c：PBX"
    },
    "answer": "ア",
    "explanation": "正解はア。既存の電話機をPBXへ接続し，PBX側の音声とIP網の間でVoIPゲートウェイが変換を行う。その後ルータを介してIPネットワークへ接続するので，aがPBX，bがVoIPゲートウェイ，cがルータとなる。",
    "choiceExplanations": {
      "ア": "既存の電話機からPBX，音声のIP化を担うVoIPゲートウェイ，IP網へつなぐルータの順となり，接続構成に合う。",
      "イ": "PBXからIP網に接続する前に音声を変換する必要があり，ルータとVoIPゲートウェイの順序が逆である。",
      "ウ": "既存の電話機はまずPBXで内線として収容するので，電話機直後をVoIPゲートウェイとする構成は合わない。",
      "エ": "PBXとルータの間に音声とIPの変換点が必要であり，示された順序では既存内線網からの接続にならない。"
    },
    "explanationCoverage": "full",
    "hasImage": true,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "imageUrls": [
      "/images/questions/sa/2017-autumn-am2-q22.png"
    ],
    "imageAltTexts": [
      "電話機からa，b，cの各装置を順につないでIPネットワークへ接続する構成図。"
    ]
  },
  {
    "id": "sa-2017a-am2-q23",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 23,
    "type": "multiple-choice",
    "category": "電子証明書",
    "topicTags": [
      "電子証明書"
    ],
    "difficulty": 3,
    "question": "署名されたソフトウェアを導入する前に，そのソフトウェアの開発元又は発行元を確認するために使用する証明書はどれか。",
    "choices": {
      "ア": "EV SSL証明書",
      "イ": "クライアント証明書",
      "ウ": "コードサイニング証明書",
      "エ": "サーバ証明書"
    },
    "answer": "ウ",
    "explanation": "正解はウ。コードサイニング証明書は，ソフトウェアなどのコードへ付けたデジタル署名の検証に用いる。署名者である開発元や発行元の確認と，署名後のコードの改変検出に利用できる。",
    "choiceExplanations": {
      "ア": "Webサイトの運営組織を確認するためのサーバ証明書の一種であり，ソフトウェアの発行元確認用ではない。",
      "イ": "接続してくる利用者や端末などを認証するための証明書であり，コードへの署名を検証する用途とは異なる。",
      "ウ": "ソフトウェアに付いた署名を検証し，発行元や署名後の改変の有無を確認する用途に対応する。",
      "エ": "通信相手のサーバを認証するための証明書であり，配布されたソフトウェアの開発元確認用ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17"
  },
  {
    "id": "sa-2017a-am2-q24",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 24,
    "type": "multiple-choice",
    "category": "AES",
    "topicTags": [
      "AES"
    ],
    "difficulty": 3,
    "question": "米国NISTが制定した，AESにおける鍵長の条件はどれか。",
    "choices": {
      "ア": "128ビット，192ビット，256ビットから選択する。",
      "イ": "256ビット未満で任意に指定する。",
      "ウ": "暗号化処理単位のブロック長よりも32ビット長くする。",
      "エ": "暗号化処理単位のブロック長よりも32ビット短くする。"
    },
    "answer": "ア",
    "explanation": "正解はア。AESは128・192・256ビットの三つの鍵長を規定する。ブロック長は128ビットで共通であり，鍵長とブロック長を混同しないことがポイントである。",
    "choiceExplanations": {
      "ア": "AESで規定されている三つの鍵長を全て挙げており，規格の条件に一致する。",
      "イ": "任意の長さを指定することはできず，128・192・256ビットのいずれかを用いる。",
      "ウ": "ブロック長128ビットに32ビットを足した160ビットは，AESに定められた鍵長ではない。",
      "エ": "ブロック長128ビットから32ビットを引いた96ビットは，AESに定められた鍵長ではない。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://csrc.nist.gov/pubs/fips/197/final"
    ]
  },
  {
    "id": "sa-2017a-am2-q25",
    "exam": "sa",
    "session": "am2",
    "year": 2017,
    "season": "autumn",
    "qNumber": 25,
    "type": "multiple-choice",
    "category": "メールセキュリティ",
    "topicTags": [
      "メールセキュリティ"
    ],
    "difficulty": 3,
    "question": "スパムメール対策として，サブミッションポート（ポート番号587）を導入する目的はどれか。",
    "choices": {
      "ア": "DNSサーバにSPFレコードを問い合わせる。",
      "イ": "DNSサーバに登録されている公開鍵を用いて署名を検証する。",
      "ウ": "POP before SMTPを使用して，メール送信者を認証する。",
      "エ": "SMTP-AUTHを使用して，メール送信者を認証する。"
    },
    "answer": "エ",
    "explanation": "正解はエ。サブミッションポートは，利用者からのメール投稿をサーバ間の転送と分けて受け付けるためのポートである。SMTP-AUTHによる認証を組み合わせ，正規の利用者による投稿かを確認する。",
    "choiceExplanations": {
      "ア": "SPFは送信元IPアドレスがドメインに許可されたものかをDNSの情報で確認する方式であり，投稿ポートの目的とは異なる。",
      "イ": "DNS上の公開鍵でメールの署名を確認するDKIMの説明であり，SMTPでの投稿者認証ではない。",
      "ウ": "POPでの受信認証を先に行う方式であり，サブミッションポートとSMTP-AUTHによる認証の説明ではない。",
      "エ": "利用者のメール投稿を587番ポートで受け付け，SMTP-AUTHで投稿者を認証するという目的に合う。"
    },
    "explanationCoverage": "full",
    "hasImage": false,
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000fqpm-att/2017h29a_sa_am2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-17",
    "officialReferenceUrls": [
      "https://www.rfc-editor.org/rfc/rfc6409"
    ]
  }
];
