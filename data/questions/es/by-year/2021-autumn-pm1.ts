import type { Question } from "@/lib/questions/types";

export const ES_QUESTIONS_2021_AUTUMN_PM1: Question[] = [
  {
    "id": "es-2021a-pm1-q1",
    "exam": "es",
    "year": 2021,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "状態遷移",
      "制御",
      "要求仕様"
    ],
    "difficulty": 4,
    "question": "問1　ペット医療向けシリンジポンプ\n\n次の記述を読んで、設問に答えよ。",
    "answer": "設問１(1) ① ・設定可\n       ② ・設定中\n       ③ ・準備中\n         (2) 0.5\n         (3)  シャフト    144\n       パルスレート  128\n 設問２(1)  a キー判定\n              b 設定終了キーが押されたこと\n         (2)  c シリンジID，点滴流量，点滴量\n         (3)  状態情報  点滴中\n       発生した事象 圧力センサの出力値が基準値を超えた事象\n 設問３(1)  d 設定開始\n              e 設定中\n              f 準備\n              g 準備中\n         (2) 状態表示領域に“設定完了”が表示されているときにリーダが接続された場合",
    "modelAnswer": "```text\n設問１(1) ① ・設定可\n       ② ・設定中\n       ③ ・準備中\n         (2) 0.5\n         (3)  シャフト    144\n       パルスレート  128\n 設問２(1)  a キー判定\n              b 設定終了キーが押されたこと\n         (2)  c シリンジID，点滴流量，点滴量\n         (3)  状態情報  点滴中\n       発生した事象 圧力センサの出力値が基準値を超えた事象\n 設問３(1)  d 設定開始\n              e 設定中\n              f 準備\n              g 準備中\n         (2) 状態表示領域に“設定完了”が表示されているときにリーダが接続された場合\n```",
    "scoringCriteria": "設問番号、空欄記号、指定文字数を原問と対応させて、IPA公式解答例と照合する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-02.webp",
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-03.webp",
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-04.webp",
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-05.webp",
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-06.webp",
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-07.webp"
    ],
    "imageAltTexts": [
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問1 本文・図表・設問（公式問題PDF 2ページ）",
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問1 本文・図表・設問（公式問題PDF 3ページ）",
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問1 本文・図表・設問（公式問題PDF 4ページ）",
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問1 本文・図表・設問（公式問題PDF 5ページ）",
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問1 本文・図表・設問（公式問題PDF 6ページ）",
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問1 本文・図表・設問（公式問題PDF 7ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb9/es-2021a-pm1/answer-page-01.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問1（公式PDF 1ページ）"
    ],
    "explanation": "状態名とキー操作の対応を状態遷移で確認し、流量の設定値からモータの回転量とパルスレートを求める。仕様追加では、既存状態で発生する新しい事象と、表示やタスク間通知への影響を追う。\n\n[公式問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_es_pm1_qs.pdf) / [公式解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_es_pm1_ans.pdf)",
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_es_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_es_pm1_ans.pdf",
    "sourceAttribution": "出典：IPA（独立行政法人情報処理推進機構）2021年秋期 エンベデッドシステムスペシャリスト 午後I",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "es-2021a-pm1-q2",
    "exam": "es",
    "year": 2021,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "IoT",
      "タスク設計",
      "配膳ロボット"
    ],
    "difficulty": 4,
    "question": "問2　レストランのDX\n\n次の記述を読んで、設問に答えよ。",
    "answer": "設問１(1) 0.38\n         (2) テーブル端末に品切れ情報が登録されるより前に該当する料理が注文された場\n      合\n 設問２(1) ① ・入店\n       ② ・精算\n       ③ ・キッチン\n         (2)  a 注文履歴情報\n              b 該当する料理\n              c 指示タスク\n              d 片付け指示\n              e 空席管理情報の自テーブル\n         (3)  f メニュー情報を更新して，全てのテーブルタスクにメニュー更新を通知す\n         る\n 設問３(1) 着座人数が1 人以上で，かつ，ロボに料理が格納されている場合\n         (2)  g 注文履歴情報の該当する料理を配膳済みに更新する\n         (3)  h 指示端末に配膳完了ボタンを表示する",
    "modelAnswer": "```text\n設問１(1) 0.38\n         (2) テーブル端末に品切れ情報が登録されるより前に該当する料理が注文された場\n      合\n 設問２(1) ① ・入店\n       ② ・精算\n       ③ ・キッチン\n         (2)  a 注文履歴情報\n              b 該当する料理\n              c 指示タスク\n              d 片付け指示\n              e 空席管理情報の自テーブル\n         (3)  f メニュー情報を更新して，全てのテーブルタスクにメニュー更新を通知す\n         る\n 設問３(1) 着座人数が1 人以上で，かつ，ロボに料理が格納されている場合\n         (2)  g 注文履歴情報の該当する料理を配膳済みに更新する\n         (3)  h 指示端末に配膳完了ボタンを表示する\n```",
    "scoringCriteria": "設問番号、空欄記号、指定文字数を原問と対応させて、IPA公式解答例と照合する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-08.webp",
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-09.webp",
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-10.webp",
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-11.webp",
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-12.webp",
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-13.webp"
    ],
    "imageAltTexts": [
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問2 本文・図表・設問（公式問題PDF 8ページ）",
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問2 本文・図表・設問（公式問題PDF 9ページ）",
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問2 本文・図表・設問（公式問題PDF 10ページ）",
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問2 本文・図表・設問（公式問題PDF 11ページ）",
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問2 本文・図表・設問（公式問題PDF 12ページ）",
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問2 本文・図表・設問（公式問題PDF 13ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb9/es-2021a-pm1/answer-page-02.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問2（公式PDF 2ページ）"
    ],
    "explanation": "注文、品切れ通知、配膳完了は非同期に進むため、処理の前後関係から不整合が起きる条件を読む。タスク間で引き渡す情報と更新対象を明確にし、着座人数と料理格納状態の両条件でロボットの動作を判断する。\n\n[公式問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_es_pm1_qs.pdf) / [公式解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_es_pm1_ans.pdf)",
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_es_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_es_pm1_ans.pdf",
    "sourceAttribution": "出典：IPA（独立行政法人情報処理推進機構）2021年秋期 エンベデッドシステムスペシャリスト 午後I",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "es-2021a-pm1-q3",
    "exam": "es",
    "year": 2021,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 3,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "センサ",
      "GPS",
      "通信周期"
    ],
    "difficulty": 4,
    "question": "問3　スマート畜産システム\n\n次の記述を読んで、設問に答えよ。",
    "answer": "設問１(1) 気圧が高く，加速度センサが振動を検出していないから\n         (2)  a 歩行\n              b 採食\n 設問２(1) 牛舎内ではGPS の電波を受信できない場合があるから\n         (2) 牛ID ごとの時刻データの更新を監視する。\n         (3) (a)  0.12\n             (b) 978\n 設問３(1) (a) 1\n             (b) ビーコン3 とビーコン4 が同じでビーコン1 より大きい。\n             (c) 牛ID1  2\n             牛ID2  1\n             牛ID3  2\n         (2) 通信周期が3 分であるから\n         (3) 首輪デバイスと牛舎サーバの時刻を合わせる機能",
    "modelAnswer": "```text\n設問１(1) 気圧が高く，加速度センサが振動を検出していないから\n         (2)  a 歩行\n              b 採食\n 設問２(1) 牛舎内ではGPS の電波を受信できない場合があるから\n         (2) 牛ID ごとの時刻データの更新を監視する。\n         (3) (a)  0.12\n             (b) 978\n 設問３(1) (a) 1\n             (b) ビーコン3 とビーコン4 が同じでビーコン1 より大きい。\n             (c) 牛ID1  2\n             牛ID2  1\n             牛ID3  2\n         (2) 通信周期が3 分であるから\n         (3) 首輪デバイスと牛舎サーバの時刻を合わせる機能\n```",
    "scoringCriteria": "設問番号、空欄記号、指定文字数を原問と対応させて、IPA公式解答例と照合する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-14.webp",
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-15.webp",
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-16.webp",
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-17.webp",
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-18.webp",
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-19.webp",
      "/questions/ipa-plan5-qb9/es-2021a-pm1/question-page-20.webp"
    ],
    "imageAltTexts": [
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問3 本文・図表・設問（公式問題PDF 14ページ）",
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問3 本文・図表・設問（公式問題PDF 15ページ）",
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問3 本文・図表・設問（公式問題PDF 16ページ）",
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問3 本文・図表・設問（公式問題PDF 17ページ）",
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問3 本文・図表・設問（公式問題PDF 18ページ）",
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問3 本文・図表・設問（公式問題PDF 19ページ）",
      "エンベデッドシステムスペシャリスト 2021年秋期 午後I 問3 本文・図表・設問（公式問題PDF 20ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb9/es-2021a-pm1/answer-page-02.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問3（公式PDF 2ページ）"
    ],
    "explanation": "牛の位置や行動は、気圧、加速度、GPS、ビーコンの特徴を組み合わせて推定する。時刻データの更新停止を監視し、通信周期から推定が遅れる理由と、機器間で時刻を合わせる必要性を説明する。\n\n[公式問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_es_pm1_qs.pdf) / [公式解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_es_pm1_ans.pdf)",
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_es_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000apad-att/2021r03a_es_pm1_ans.pdf",
    "sourceAttribution": "出典：IPA（独立行政法人情報処理推進機構）2021年秋期 エンベデッドシステムスペシャリスト 午後I",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  }
];
