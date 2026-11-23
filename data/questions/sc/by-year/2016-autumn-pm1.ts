import type { Question } from "@/lib/questions/types";

export const SC_QUESTIONS_2016_AUTUMN_PM1: Question[] = [
  {
    "id": "sc-2016a-pm1-q1",
    "exam": "sc",
    "year": 2016,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "組込み機器",
      "公開鍵認証",
      "ディジタル署名"
    ],
    "difficulty": 4,
    "question": "問1　組込み機器を利用したシステムのセキュリティ対策",
    "answer": "問１\n                       出題趣旨\n   IoT（Internet of Things）への取組みが進み，モノとモノがつながることによるリスクの増大が予想されてい\nる。\n  本問では，IoT へのセキュリティ対策を進める上で基本となる，組込み機器のセキュリティ対策に焦点を当\nて，組込み機器に発生しがちな情報セキュリティインシデントを踏まえ，インシデント対応やセキュリティ対\n策に必要となる知識，能力を問う。\n\n\n  設問                解答例・解答の要点                備考\n  設問１     a エ\n              b ア\n 設問２(1)  c   x1.x2.x3.x4\n              d   y1.y2.y3.y4\n         (2) パスワード認証を無効化し，公開鍵認証を使用する。\n 設問３(1)  e 送信元IP アドレスを監視端末のIP アドレスに限定\n         (2) 中間者攻撃による通信内容の盗聴\n         (3) 作成時 秘密鍵を使用してイメージファイルにディジタル署名を付与する。\n      更新時 公開鍵を使用してイメージファイルのディジタル署名を検証する。\n         (4) LTE ルータにログインしてファイルシステムの中から見つける。",
    "explanation": "ルータの通信経路とアクセスの許可範囲を図で確認します。SSHの公開鍵認証とファームウェアのディジタル署名は、何を認証するかと鍵を持つ主体を分けて整理します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/sc/2016-autumn-pm1/page-02.webp",
      "/questions/ipa/sc/2016-autumn-pm1/page-03.webp",
      "/questions/ipa/sc/2016-autumn-pm1/page-04.webp",
      "/questions/ipa/sc/2016-autumn-pm1/page-05.webp"
    ],
    "imageAltTexts": [
      "情報セキュリティスペシャリスト 2016年度秋期 午後I 問1　組込み機器を利用したシステムのセキュリティ対策（公式問題PDF 2ページ）",
      "情報セキュリティスペシャリスト 2016年度秋期 午後I 問1　組込み機器を利用したシステムのセキュリティ対策（公式問題PDF 3ページ）",
      "情報セキュリティスペシャリスト 2016年度秋期 午後I 問1　組込み機器を利用したシステムのセキュリティ対策（公式問題PDF 4ページ）",
      "情報セキュリティスペシャリスト 2016年度秋期 午後I 問1　組込み機器を利用したシステムのセキュリティ対策（公式問題PDF 5ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/sc/2016-autumn-pm1/answer-q1-p01.webp"
    ],
    "answerImageAltTexts": [
      "情報セキュリティスペシャリスト 2016年度秋期 午後I 問1　組込み機器を利用したシステムのセキュリティ対策 公式解答例（公式PDF 1ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sc_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sc_pm1_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）情報セキュリティスペシャリスト 2016年度秋期 午後I",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "sc-2016a-pm1-q3",
    "exam": "sc",
    "year": 2016,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 3,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "プロキシ",
      "マルウェア対策"
    ],
    "difficulty": 4,
    "question": "問3　プロキシサーバによるマルウェア対策",
    "answer": "問３\n                       出題趣旨\n 昨今，特定企業を狙った標的型の電子メールを利用した攻撃の被害が多発しており，マルウェア対策の強化\nが求められている。\n  本問では，PC におけるプログラムの起動禁止設定やプロキシサーバにおけるフィルタリング機能とプロキ\nシ認証機能を用いて，マルウェアに対応する方法を考える能力を問う。\n\n\n  設問                解答例・解答の要点                備考\n  設問１     a エ\n 設問２(1)  b イ\n              c オ\n         (2) プログラムの内容を変え，かつ，プログラム名を変える場合\n 設問３(1) 送信元IP アドレスがプロキシ1 のIP アドレスとなるので\n         (2)  d オ\n 設問４(1) Web ブラウザからプロキシサーバへの通信を盗聴して認証情報を取得し，プロ\n      キシサーバに送信する。\n         (2) URL フィルタリング機能     ホワイトリストに業務に必要かつ安全であ\n                        ることを確認したURL を設定する。\n      カテゴリ単位フィルタリング機能 業務に不要であるカテゴリを遮断する。\n\n\n\n\n\n                                                2/2\n\n                                                                   ©2016 独立行政法人情報処理推進機構",
    "explanation": "端末、第一プロキシ、第二プロキシの順に通信を追うと、どのログに端末の情報が残るかを判断できます。URL単位とカテゴリ単位の制限を組み合わせ、業務に必要な通信を整理します。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa/sc/2016-autumn-pm1/page-11.webp",
      "/questions/ipa/sc/2016-autumn-pm1/page-12.webp",
      "/questions/ipa/sc/2016-autumn-pm1/page-13.webp",
      "/questions/ipa/sc/2016-autumn-pm1/page-14.webp",
      "/questions/ipa/sc/2016-autumn-pm1/page-15.webp",
      "/questions/ipa/sc/2016-autumn-pm1/page-16.webp"
    ],
    "imageAltTexts": [
      "情報セキュリティスペシャリスト 2016年度秋期 午後I 問3　プロキシサーバによるマルウェア対策（公式問題PDF 11ページ）",
      "情報セキュリティスペシャリスト 2016年度秋期 午後I 問3　プロキシサーバによるマルウェア対策（公式問題PDF 12ページ）",
      "情報セキュリティスペシャリスト 2016年度秋期 午後I 問3　プロキシサーバによるマルウェア対策（公式問題PDF 13ページ）",
      "情報セキュリティスペシャリスト 2016年度秋期 午後I 問3　プロキシサーバによるマルウェア対策（公式問題PDF 14ページ）",
      "情報セキュリティスペシャリスト 2016年度秋期 午後I 問3　プロキシサーバによるマルウェア対策（公式問題PDF 15ページ）",
      "情報セキュリティスペシャリスト 2016年度秋期 午後I 問3　プロキシサーバによるマルウェア対策（公式問題PDF 16ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa/sc/2016-autumn-pm1/answer-q3-p02.webp"
    ],
    "answerImageAltTexts": [
      "情報セキュリティスペシャリスト 2016年度秋期 午後I 問3　プロキシサーバによるマルウェア対策 公式解答例（公式PDF 2ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sc_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000g6fw-att/2016h28a_sc_pm1_ans.pdf",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）情報セキュリティスペシャリスト 2016年度秋期 午後I",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  }
];
