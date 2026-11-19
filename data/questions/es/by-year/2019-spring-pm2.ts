import type { Question } from "@/lib/questions/types";

export const ES_QUESTIONS_2019_SPRING_PM2: Question[] = [
  {
    "id": "es-2019s-pm2-q1",
    "exam": "es",
    "year": 2019,
    "season": "spring",
    "session": "pm2",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "無線式列車制御システム"
    ],
    "difficulty": 4,
    "question": "問1　無線式列車制御システム",
    "answer": "問１\n                       出題趣旨\n 近年，線路沿線の機器を省略し，柔軟な運転を実現する無線式列車制御システムが注目されている。\n 本問では，無線式列車制御システムを題材にして，組込みシステム技術者に求められる機器の制御時間に制\n約のあるリアルタイム制御についての理解力及び計算能力を評価する。また，機能の異なる複数のシステムが\n共存する場合の制御手法について検討する能力，その解決能力及び安全性を高めるための仕組みを考える能力\nについても問う。\n\n\n  設問                解答例・解答の要点                 備考\n 設問１(1) 57.6\n        (2) (a) ① ・踏切\n         ② ・転てつ器\n             (b) ・列車の接近によって，踏切が遮断され，通過可能になった。\n         ・列車の前方にある転てつ器が，列車の進行方向に切り替わった。\n        (3) 制限速度情報\n 設問２(1)  優先度方式     60\n         巡回方式      170\n        (2)  a  960\n              b  50\n              c  100\n              d  1\n              e   964.4\n        (3) 列車速度が上限速度を超えそうな場合に，自動ブレーキの動作以前に運転士が\n      速度を制御できるから\n        (4) (a) 900\n             (b)  1.00\n 設問３(1) (a) ①・列車番号\n        ②・自ステータス 又は 列車の位置 又は 列車の長さ\n             (b) 新システムから指定された停止限界による上限速度を使用する。\n        (2) (a) 二つ以上の車軸で同時に同じ量のスリップを検出する可能性は低いから\n             (b) パルスの間隔の急激な変化を検出する。\n        (3) (a)  f 自己診断\n                  g 一定時間\n                  h 応答\n             (b) 正常と判断された予備のCPU と置き換えるため\n\n\n\n\n\n                                                1/2\n\n                                                                   ©2019 独立行政法人情報処理推進機構",
    "explanation": "走行速度と制御処理の所要時間から距離を求めます。中央制御装置との通信が途切れたときも含め、停止限界までに必要な条件を確認します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/es/2019-spring-pm2/page-02.webp",
      "/questions/ipa/es/2019-spring-pm2/page-03.webp",
      "/questions/ipa/es/2019-spring-pm2/page-04.webp",
      "/questions/ipa/es/2019-spring-pm2/page-05.webp",
      "/questions/ipa/es/2019-spring-pm2/page-06.webp",
      "/questions/ipa/es/2019-spring-pm2/page-07.webp",
      "/questions/ipa/es/2019-spring-pm2/page-08.webp",
      "/questions/ipa/es/2019-spring-pm2/page-09.webp",
      "/questions/ipa/es/2019-spring-pm2/page-10.webp",
      "/questions/ipa/es/2019-spring-pm2/page-11.webp",
      "/questions/ipa/es/2019-spring-pm2/page-12.webp"
    ],
    "imageAltTexts": [
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問1　無線式列車制御システム（公式問題PDF 2ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問1　無線式列車制御システム（公式問題PDF 3ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問1　無線式列車制御システム（公式問題PDF 4ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問1　無線式列車制御システム（公式問題PDF 5ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問1　無線式列車制御システム（公式問題PDF 6ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問1　無線式列車制御システム（公式問題PDF 7ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問1　無線式列車制御システム（公式問題PDF 8ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問1　無線式列車制御システム（公式問題PDF 9ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問1　無線式列車制御システム（公式問題PDF 10ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問1　無線式列車制御システム（公式問題PDF 11ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問1　無線式列車制御システム（公式問題PDF 12ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/es/2019-spring-pm2/answer-q1-p01.webp"
    ],
    "answerImageAltTexts": [
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問1　無線式列車制御システム 公式解答例（公式PDF 1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000ddiw-att/2019h31h_es_pm2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000ddiw-att/2019h31h_es_pm2_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）エンベデッドシステムスペシャリスト 2019年度春期 午後II",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "es-2019s-pm2-q2",
    "exam": "es",
    "year": 2019,
    "season": "spring",
    "session": "pm2",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "土砂災害予知システム"
    ],
    "difficulty": 4,
    "question": "問2　土砂災害予知システム",
    "answer": "問２\n                       出題趣旨\n 近年，気象環境の急激な変化による土砂災害や洪水などの自然災害が増えている。こうした災害に対して，\n IoT やAI の活用によって，災害の発生を検知するだけでなく，早期に予知し，防災・減災に役立てる試みがな\nされている。\n 本問では，土砂災害予知システムを題材に，無線センサネットワーク及び監視装置に関する仕様理解力，監\n視装置を制御するためのタスク設計を通して，基本的なタスク設計能力，さらには，監視装置のソフトウェア\nの機能検証を行うためのテストシステムの構築をはじめとする，ソフトウェアテスト対応能力を問う。\n\n\n  設問                解答例・解答の要点                備考\n 設問１(1) (a) 450\n             (b) 自ノードのホップ数に1 を加える。\n        (2) ノードの消費電力を削減して，一次電池の交換頻度を減らすことができるから\n        (3) (a)  a ① ・収集したときの時刻\n          ② ・ノードのGPS 位置情報\n          ③ ・ノードの電池残量\n             (b)  e 子ノードを持たないノード\n 設問２(1) (a) ① ・UI\n         ② ・サーバ通信\n         ③ ・データ解析\n             (b) データ周期\n             (c) 装置アラーム発生通知\n        (2)  b 商用電源からの電力供給が開始したことを検知\n        (3)  c  WSN に参加した時刻\n              d 新たにセンサデータがエリア情報に保存される\n 設問３(1) (a) ① ・自ノードのアドレス\n         ② ・隣接ノード\n             (b) ・該当するノードに対する電源OFF を記述する。\n         ・該当するノードに対する電池残量0 を記述する。\n             (c)  f 電源ON のシナリオメッセージを受けるまで待機する\n        (2)  g 該当するノードタスク\n        (3) テストシナリオに設定した時刻どおりにシナリオイベントを発生させるため\n\n\n\n\n\n                                                2/2\n\n                                                                   ©2019 独立行政法人情報処理推進機構",
    "explanation": "観測ノードから監視装置までの送信経路を整理します。監視装置単体の試験では、外部装置の動作や通信途絶をテストシナリオで再現する条件を確認します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/es/2019-spring-pm2/page-13.webp",
      "/questions/ipa/es/2019-spring-pm2/page-14.webp",
      "/questions/ipa/es/2019-spring-pm2/page-15.webp",
      "/questions/ipa/es/2019-spring-pm2/page-16.webp",
      "/questions/ipa/es/2019-spring-pm2/page-17.webp",
      "/questions/ipa/es/2019-spring-pm2/page-18.webp",
      "/questions/ipa/es/2019-spring-pm2/page-19.webp",
      "/questions/ipa/es/2019-spring-pm2/page-20.webp",
      "/questions/ipa/es/2019-spring-pm2/page-21.webp",
      "/questions/ipa/es/2019-spring-pm2/page-22.webp",
      "/questions/ipa/es/2019-spring-pm2/page-23.webp",
      "/questions/ipa/es/2019-spring-pm2/page-24.webp",
      "/questions/ipa/es/2019-spring-pm2/page-25.webp"
    ],
    "imageAltTexts": [
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問2　土砂災害予知システム（公式問題PDF 13ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問2　土砂災害予知システム（公式問題PDF 14ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問2　土砂災害予知システム（公式問題PDF 15ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問2　土砂災害予知システム（公式問題PDF 16ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問2　土砂災害予知システム（公式問題PDF 17ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問2　土砂災害予知システム（公式問題PDF 18ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問2　土砂災害予知システム（公式問題PDF 19ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問2　土砂災害予知システム（公式問題PDF 20ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問2　土砂災害予知システム（公式問題PDF 21ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問2　土砂災害予知システム（公式問題PDF 22ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問2　土砂災害予知システム（公式問題PDF 23ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問2　土砂災害予知システム（公式問題PDF 24ページ）",
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問2　土砂災害予知システム（公式問題PDF 25ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/es/2019-spring-pm2/answer-q2-p02.webp"
    ],
    "answerImageAltTexts": [
      "エンベデッドシステムスペシャリスト 2019年度春期 午後II 問2　土砂災害予知システム 公式解答例（公式PDF 2ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000ddiw-att/2019h31h_es_pm2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000ddiw-att/2019h31h_es_pm2_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）エンベデッドシステムスペシャリスト 2019年度春期 午後II",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  }
];
