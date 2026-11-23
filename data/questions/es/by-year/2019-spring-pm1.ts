import type { Question } from "@/lib/questions/types";

export const ES_QUESTIONS_2019_SPRING_PM1: Question[] = [
  {
    "id": "es-2019s-pm1-q1",
    "exam": "es",
    "year": 2019,
    "season": "spring",
    "session": "pm1",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "気象観測・予測システム"
    ],
    "difficulty": 4,
    "question": "問1　気象観測・予測システム",
    "answer": "問１\n                       出題趣旨\n 近年，予測が困難な局地的大雨が多く観測されるようになり，気象予測の重要性が高まっている。\n 本問では，気象の予測を行う気象観測・予測システムと，気象データを収集して，システムに提供するディ\nジタル百葉箱を題材に，仕様の理解力，ハードウェアの理解力，及びソフトウェアの設計能力を問う。\n\n\n  設問                解答例・解答の要点                備考\n 設問１(1) 分析装置が同報通信で時刻の設定を指示する。\n         (2) ディジタル地図におけるディジタル百葉箱の位置情報\n 設問２(1) 4.6\n         (2) 76\n 設問３(1)  a 通信\n              b 動画撮影開始指示\n              c 通常\n              d 動画撮影終了指示\n              e 節電\n         (2)  f 送信したデータをフラッシュメモリから削除する\n         (3) モード管理タスクの優先度を高にする。\n\n\n\n\n\n                                                1/3\n\n                                                                   ©2019 独立行政法人情報処理推進機構",
    "explanation": "複数のディジタル百葉箱で同じ時刻のデータを比較できるように、時刻設定と計測の順序を確認します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/es/2019-spring-pm1/page-02.webp",
      "/questions/ipa/es/2019-spring-pm1/page-03.webp",
      "/questions/ipa/es/2019-spring-pm1/page-04.webp",
      "/questions/ipa/es/2019-spring-pm1/page-05.webp",
      "/questions/ipa/es/2019-spring-pm1/page-06.webp"
    ],
    "imageAltTexts": [
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問1　気象観測・予測システム（公式問題PDF 2ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問1　気象観測・予測システム（公式問題PDF 3ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問1　気象観測・予測システム（公式問題PDF 4ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問1　気象観測・予測システム（公式問題PDF 5ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問1　気象観測・予測システム（公式問題PDF 6ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/es/2019-spring-pm1/answer-q1-p01.webp"
    ],
    "answerImageAltTexts": [
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問1　気象観測・予測システム 公式解答例（公式PDF 1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000ddiw-att/2019h31h_es_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000ddiw-att/2019h31h_es_pm1_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）エンベデッドシステムスペシャリスト 2019年度春期 午後I",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "es-2019s-pm1-q2",
    "exam": "es",
    "year": 2019,
    "season": "spring",
    "session": "pm1",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "高齢者を見守るためのロボット"
    ],
    "difficulty": 4,
    "question": "問2　高齢者を見守るためのロボット",
    "answer": "問２\n                       出題趣旨\n 少子高齢化が加速している状況において，一人暮らしの高齢者を見守る方法が各種提案されている。\n 本問では，一人暮らしの高齢者でも容易に操作可能な見守りロボットを題材に，組込みソフトウェア技術者\nに必要な要求仕様の理解力，要求仕様を基にソフトウェアを開発する能力，及び要求仕様の変更への対応能力\nを問う。\n\n\n  設問                解答例・解答の要点                備考\n 設問１(1) (a) 事象発生無し状況が10 分間継続した場合\n             (b) 設定スイッチが押されたときの割込み\n         (2)  a 確率値の平均値\n              b  45\n              c  50\n              d もう一度言って\n         (3) 音声認識再生モジュールへの電力の供給\n 設問２(1) ① ・再生音声選択\n       ② ・メイン\n       ③ ・割込み時刻判定\n         (2)  e 設定開始・終了\n              f 項目設定\n              g 設定開始\n              h 設定終了\n              i 次の割込み時刻を設定\n         (3) 割込み時刻判定タスクから，就寝時刻の割込み時刻になったことの通知を受け\n      たとき\n         (4) お出掛けするよ\n 設問３(1) タッチセンサ\n         (2)  j 音声認識結果\n              k メイン\n         異常検出\n              m 呼び掛け\n\n\n\n\n\n                                                2/3\n\n                                                                   ©2019 独立行政法人情報処理推進機構",
    "explanation": "見守りロボットの各状態について、割込み、タスクへの通知、省エネモードを解除する条件を対応付けます。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/es/2019-spring-pm1/page-07.webp",
      "/questions/ipa/es/2019-spring-pm1/page-08.webp",
      "/questions/ipa/es/2019-spring-pm1/page-09.webp",
      "/questions/ipa/es/2019-spring-pm1/page-10.webp",
      "/questions/ipa/es/2019-spring-pm1/page-11.webp",
      "/questions/ipa/es/2019-spring-pm1/page-12.webp",
      "/questions/ipa/es/2019-spring-pm1/page-13.webp"
    ],
    "imageAltTexts": [
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問2　高齢者を見守るためのロボット（公式問題PDF 7ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問2　高齢者を見守るためのロボット（公式問題PDF 8ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問2　高齢者を見守るためのロボット（公式問題PDF 9ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問2　高齢者を見守るためのロボット（公式問題PDF 10ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問2　高齢者を見守るためのロボット（公式問題PDF 11ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問2　高齢者を見守るためのロボット（公式問題PDF 12ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問2　高齢者を見守るためのロボット（公式問題PDF 13ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/es/2019-spring-pm1/answer-q2-p02.webp"
    ],
    "answerImageAltTexts": [
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問2　高齢者を見守るためのロボット 公式解答例（公式PDF 2ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000ddiw-att/2019h31h_es_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000ddiw-att/2019h31h_es_pm1_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）エンベデッドシステムスペシャリスト 2019年度春期 午後I",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "es-2019s-pm1-q3",
    "exam": "es",
    "year": 2019,
    "season": "spring",
    "session": "pm1",
    "qNumber": 3,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "バッティングを評価するシステム"
    ],
    "difficulty": 4,
    "question": "問3　バッティングを評価するシステム",
    "answer": "問３\n                       出題趣旨\n  東京オリンピックへの期待が高まっていく中，スポーツの分野ではMEMS（micro-electromechanical\nsystems）を利用したセンサが，アスリートの育成に利用され始めている。\n 本問では，スイングセンサを用いたバッティング評価システムを題材に，要求仕様の理解力，システムを設\n計する能力，通信仕様を評価する能力，省電力化を評価する能力などを問う。\n\n\n  設問                解答例・解答の要点                備考\n 設問１(1) 振動時刻\n         (2) F800\n         (3) 固有振動数730 Hz を計測できないから\n 設問２(1) ④，⑤\n         (2) モーションデータを取得する周期にばらつきが出る。\n         (3)  a 制御部からの計測終了指示受信時\n              b 振動情報\n 設問３(1) 16\n         (2) 40\n         (3) (a) クラスB より動作電流の少ないクラスC の無線通信が使用できる。\n             (b) 40\n\n\n\n\n\n                                                3/3\n\n                                                                   ©2019 独立行政法人情報処理推進機構",
    "explanation": "センサが取得するデータを表示側が利用できる形にする処理を追い、通信時間と省電力の条件を分けて確認します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/es/2019-spring-pm1/page-14.webp",
      "/questions/ipa/es/2019-spring-pm1/page-15.webp",
      "/questions/ipa/es/2019-spring-pm1/page-16.webp",
      "/questions/ipa/es/2019-spring-pm1/page-17.webp",
      "/questions/ipa/es/2019-spring-pm1/page-18.webp",
      "/questions/ipa/es/2019-spring-pm1/page-19.webp"
    ],
    "imageAltTexts": [
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問3　バッティングを評価するシステム（公式問題PDF 14ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問3　バッティングを評価するシステム（公式問題PDF 15ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問3　バッティングを評価するシステム（公式問題PDF 16ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問3　バッティングを評価するシステム（公式問題PDF 17ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問3　バッティングを評価するシステム（公式問題PDF 18ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問3　バッティングを評価するシステム（公式問題PDF 19ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/es/2019-spring-pm1/answer-q3-p03.webp"
    ],
    "answerImageAltTexts": [
      "エンベデッドシステムスペシャリスト 2019年度春期 午後I 問3　バッティングを評価するシステム 公式解答例（公式PDF 3ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000ddiw-att/2019h31h_es_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000ddiw-att/2019h31h_es_pm1_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）エンベデッドシステムスペシャリスト 2019年度春期 午後I",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  }
];
