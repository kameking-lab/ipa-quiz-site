import type { Question } from "@/lib/questions/types";

export const ES_QUESTIONS_2022_AUTUMN_PM1: Question[] = [
  {
    "id": "es-2022a-pm1-q1",
    "exam": "es",
    "year": 2022,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "パワーアシストスーツ"
    ],
    "difficulty": 4,
    "question": "問1　パワーアシストスーツに関する次の記述を読んで、設問に答えよ。",
    "answer": "令和４年度 秋期 エンベデッドシステムスペシャリスト試験 解答例\n\n午後Ⅰ試験\n\n問１\n\n                       出題趣旨\n 肉体労働の現場では，人手不足が顕在化し，パワーアシストスーツが利用され始めている。パワーアシスト\nスーツの開発には，多数のセンサーやモーターなどが利用され，組込みシステムの設計技術が要求される。\n 本問では，パワーアシストスーツを題材として，組込みシステムの開発に必要となる，図，表に記載された\n内容を含めた要求仕様の理解力，要求仕様に基づいた組込みソフトウェアの設計能力，及び要求仕様の変更要\n求に基づいた対応能力を問う。\n\n\n  設問                解答例・解答の要点                 備考\n 設問１(1) 持下げ\n         (2) (a) 手袋スイッチがON，かつ，角度センサーの値が持上げ開始角度内から減\n         少したから\n             (b)   a  背中にあるIMU のY 軸の値が0 近辺でないとき\n 設問２(1) タスク名 下肢角度計測タスク\n        情報  下肢の角度情報\n         (2)  b アシストレベル情報\n              c  PA スーツの状態 又は  PA スーツの状態遷移\n         (3) 515\n 設問３(1)  情報    IMU 計測情報 又は  IMU の計測値\n        理由    IMU 計測情報の角速度からふらつきを検出できるから\n         (2)  d 足裏荷重情報から体重を引いた値を荷物の重量として記録する\n         (3)  e 筋肉への負荷\n\n\n\n\n\n                                                1/3\n\n                                                                            ©2022 独立行政法人情報処理推進機構",
    "modelAnswer": "### IPA公式の解答例",
    "explanation": "状態遷移を、センサー入力の条件とタスク間で受け渡す情報に分けて整理します。\n\n- 設問1：手袋スイッチだけでなく、角度の範囲と増減方向を組み合わせて、動作の開始条件を確認します。背中のIMUのY軸の値が示す姿勢も、本文の定義に対応付けます。\n- 設問2：下肢の角度情報を生成するタスクと、アシストレベルやスーツの状態を利用するタスクを結び付けます。時間の計算は、表にある処理の実行条件と対象期間をそろえて追います。\n- 設問3：ふらつきはIMUの角速度から検出できる点、荷物の重量は足裏荷重から体重を差し引いて求める点に着目します。追加した計測値が、何の判定や記録に必要なのかを答案に明示します。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_ans.pdf)",
    "scoringCriteria": "状態遷移を、センサー入力の条件とタスク間で受け渡す情報に分けて整理します。\n\n- 設問1：手袋スイッチだけでなく、角度の範囲と増減方向を組み合わせて、動作の開始条件を確認します。背中のIMUのY軸の値が示す姿勢も、本文の定義に対応付けます。\n- 設問2：下肢の角度情報を生成するタスクと、アシストレベルやスーツの状態を利用するタスクを結び付けます。時間の計算は、表にある処理の実行条件と対象期間をそろえて追います。\n- 設問3：ふらつきはIMUの角速度から検出できる点、荷物の重量は足裏荷重から体重を差し引いて求める点に着目します。追加した計測値が、何の判定や記録に必要なのかを答案に明示します。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_ans.pdf)",
    "hasImage": true,
    "imageUrls": [
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p02.webp",
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p03.webp",
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p04.webp",
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p05.webp",
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p06.webp",
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p07.webp"
    ],
    "imageAltTexts": [
      "IPA公式問題 問1 パワーアシストスーツ（PDF 2ページ）",
      "IPA公式問題 問1 パワーアシストスーツ（PDF 3ページ）",
      "IPA公式問題 問1 パワーアシストスーツ（PDF 4ページ）",
      "IPA公式問題 問1 パワーアシストスーツ（PDF 5ページ）",
      "IPA公式問題 問1 パワーアシストスーツ（PDF 6ページ）",
      "IPA公式問題 問1 パワーアシストスーツ（PDF 7ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）",
    "answerImageUrls": [
      "/images/ipa-written-qb7/es/2022-autumn-pm1/q1-answer-p01.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問1（PDF 1ページ）"
    ]
  },
  {
    "id": "es-2022a-pm1-q2",
    "exam": "es",
    "year": 2022,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "競泳計時システム"
    ],
    "difficulty": 4,
    "question": "問2　競泳計時システムに関する次の記述を読んで、設問に答えよ。",
    "answer": "問２\n\n                       出題趣旨\n スポーツの審判・計時は，人為ミスを極力低減して，正確性・公平性を確保することが求められる。この分\n野において，リアルタイム処理に適した組込みシステムが，人間に代わってその任を果たすために用いられて\nいる。\n 本問では，競泳競技用プールに設置される競泳計時システムのソフトウェアを題材として，システム仕様を\n理解する能力，システム仕様を実現するための組込みソフトウェア設計能力，及び機能追加を題材として応用\n能力を問う。\n\n\n  設問                解答例・解答の要点                 備考\n 設問１(1) (a) 320\n             (b) 87\n         (2) 出力元ID000 の記録の前に，出力元ID100 の記録を検出する。\n 設問２(1)  a “選手セット”ボタン押下\n              b 競技タスク\n              c タイマー異常\n         (2)  d 表示タスク\n              e “準備完了”の表示\n              f 合図機タスク\n              g ホイッスル音の出力\n              h セット完了音の出力\n              i 全ての使用タスク\n              j 競技終了\n         (3) (a)  k 出力元ID が110 の計時割込みを検知する\n             (b) 上位2 ビットが00 のとき\n             (c) “競技終了”を通知するとき\n 設問３(1) 競技タスク，機器間通信・監視タスク，LAN 通信タスク\n         (2)  l 合図機タスクに指示を送らない\n         (3)  m 競技タスク\n                                           順不同\n              n レーンタスク\n\n\n\n\n\n                                                2/3\n\n                                                                            ©2022 独立行政法人情報処理推進機構",
    "modelAnswer": "### IPA公式の解答例",
    "explanation": "競技の進行順序と、割込み・通知・表示を担当するタスクを対応付けます。\n\n- 設問1：計時データの出力元IDと発生順序を追い、スタートやタッチの情報が規定の順で記録されているかを確認します。\n- 設問2：選手セットから競技開始・終了までのイベントを状態遷移に並べます。表示を行うタスクと合図音を出すタスクの役割を分け、通知先を本文のタスク一覧と照合します。計時割込みの検知条件と、上位2ビットで判定する条件も混同しないようにします。\n- 設問3：機能追加で影響するタスクをデータの送受信経路に沿って確認します。合図機への指示を送らない条件、競技タスクとレーンタスクで管理する情報を整理すると、変更箇所を絞り込めます。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_ans.pdf)",
    "scoringCriteria": "競技の進行順序と、割込み・通知・表示を担当するタスクを対応付けます。\n\n- 設問1：計時データの出力元IDと発生順序を追い、スタートやタッチの情報が規定の順で記録されているかを確認します。\n- 設問2：選手セットから競技開始・終了までのイベントを状態遷移に並べます。表示を行うタスクと合図音を出すタスクの役割を分け、通知先を本文のタスク一覧と照合します。計時割込みの検知条件と、上位2ビットで判定する条件も混同しないようにします。\n- 設問3：機能追加で影響するタスクをデータの送受信経路に沿って確認します。合図機への指示を送らない条件、競技タスクとレーンタスクで管理する情報を整理すると、変更箇所を絞り込めます。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_ans.pdf)",
    "hasImage": true,
    "imageUrls": [
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p08.webp",
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p09.webp",
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p10.webp",
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p11.webp",
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p12.webp",
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p13.webp",
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p14.webp"
    ],
    "imageAltTexts": [
      "IPA公式問題 問2 競泳計時システム（PDF 8ページ）",
      "IPA公式問題 問2 競泳計時システム（PDF 9ページ）",
      "IPA公式問題 問2 競泳計時システム（PDF 10ページ）",
      "IPA公式問題 問2 競泳計時システム（PDF 11ページ）",
      "IPA公式問題 問2 競泳計時システム（PDF 12ページ）",
      "IPA公式問題 問2 競泳計時システム（PDF 13ページ）",
      "IPA公式問題 問2 競泳計時システム（PDF 14ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）",
    "answerImageUrls": [
      "/images/ipa-written-qb7/es/2022-autumn-pm1/q2-answer-p02.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問2（PDF 2ページ）"
    ]
  },
  {
    "id": "es-2022a-pm1-q3",
    "exam": "es",
    "year": 2022,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 3,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "無人店舗システム"
    ],
    "difficulty": 4,
    "question": "問3　無人店舗システムに関する次の記述を読んで、設問に答えよ。",
    "answer": "問３\n\n                       出題趣旨\n  2010 年代にIT 機器を用いたウォークスルー型の無人店舗が登場してから，センサー精度の向上，AI 技術の\n進歩につれ，世界中で無人店舗が登場している。日本国内においても徐々に広がりを見せており，今後も増え\nる見込みである。\n 本問では，無人店舗システムを題材として，店内のデータを収集し連携して処理するシステム仕様の理解\n力，処理時間に制約がある中での性能改善内容を把握する能力を問う。\n\n\n  設問                解答例・解答の要点                 備考\n設問１(1) 棚に陳列された商品の在庫状況を把握すること\n        (2) (a) 122\n            (b) その会員へのおすすめ商品として表示する機能\n        (3) 手渡した利用者の仮想カートにその商品が登録されたままの状態\n設問２(1) 1.5\n        (2) データの競合を避けるため\n        (3) (a) 37.7\n            (b) 162.5\n設問３(1) 方式1\n        (2) 出力データのレイテンシが小さい\n        (3)  a  105\n             b  525\n             c  1,000\n\n\n\n\n\n                                                3/3\n\n                                                                            ©2022 独立行政法人情報処理推進機構",
    "modelAnswer": "### IPA公式の解答例",
    "explanation": "センサーから集めた情報が在庫、利用者の動作、仮想カートにどう反映されるかを追います。\n\n- 設問1：商品の持出しだけでなく、利用者同士で手渡された場合に仮想カートの対応が残る問題を確認します。棚の在庫把握と、会員への商品推薦は異なる利用目的です。\n- 設問2：競合するデータを同時に更新しないための排他と、処理時間の計算を区別します。時間は同じ単位にそろえ、並列に進められる処理と前の処理の完了を待つ部分を分けて追ってください。\n- 設問3：方式の比較では、出力までの遅延と一定期間に処理できる量を混同しないことが大切です。方式1を選ぶ理由と、公式解答の105、525、1,000に至る処理周期・回数を、本文のタイミング図と対応付けます。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_ans.pdf)",
    "scoringCriteria": "センサーから集めた情報が在庫、利用者の動作、仮想カートにどう反映されるかを追います。\n\n- 設問1：商品の持出しだけでなく、利用者同士で手渡された場合に仮想カートの対応が残る問題を確認します。棚の在庫把握と、会員への商品推薦は異なる利用目的です。\n- 設問2：競合するデータを同時に更新しないための排他と、処理時間の計算を区別します。時間は同じ単位にそろえ、並列に進められる処理と前の処理の完了を待つ部分を分けて追ってください。\n- 設問3：方式の比較では、出力までの遅延と一定期間に処理できる量を混同しないことが大切です。方式1を選ぶ理由と、公式解答の105、525、1,000に至る処理周期・回数を、本文のタイミング図と対応付けます。\n\n出典：[IPA公式問題（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_qs.pdf) / [IPA公式解答例（PDF）](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_ans.pdf)",
    "hasImage": true,
    "imageUrls": [
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p15.webp",
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p16.webp",
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p17.webp",
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p18.webp",
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p19.webp",
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p20.webp",
      "/images/ipa-written-qb7/es/2022-autumn-pm1/question-p21.webp"
    ],
    "imageAltTexts": [
      "IPA公式問題 問3 無人店舗システム（PDF 15ページ）",
      "IPA公式問題 問3 無人店舗システム（PDF 16ページ）",
      "IPA公式問題 問3 無人店舗システム（PDF 17ページ）",
      "IPA公式問題 問3 無人店舗システム（PDF 18ページ）",
      "IPA公式問題 問3 無人店舗システム（PDF 19ページ）",
      "IPA公式問題 問3 無人店舗システム（PDF 20ページ）",
      "IPA公式問題 問3 無人店舗システム（PDF 21ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt80000008smf-att/2022r04a_es_pm1_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）",
    "answerImageUrls": [
      "/images/ipa-written-qb7/es/2022-autumn-pm1/q3-answer-p03.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問3（PDF 3ページ）"
    ]
  }
];
