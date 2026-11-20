import type { Question } from "@/lib/questions/types";

export const DB_2020_AUTUMN_PM1_QUESTIONS: Question[] = [
  {
    "id": "db-2020a-pm1-q1",
    "exam": "db",
    "year": 2020,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 1,
    "type": "descriptive",
    "category": "データベース",
    "topicTags": [
      "概念データモデル",
      "関係スキーマ"
    ],
    "difficulty": 4,
    "question": "データベース設計",
    "answer": "公式解答例は画像で確認できます。",
    "modelAnswer": "公式解答例は画像で確認できます。",
    "explanation": "発注と明細、配送の区間を別の単位として扱う。新しい商品や委託先の追加が、各エンティティの識別子と関係の多重度へ及ぼす影響を確認する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/db/2020-autumn-pm1/p03.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p04.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p05.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p06.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p07.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p08.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p09.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p10.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p11.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p12.webp"
    ],
    "imageAltTexts": [
      "2020年度秋期 データベーススペシャリスト 午後I 共通事項（公式問題PDF 3ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 共通事項（公式問題PDF 4ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 共通事項（公式問題PDF 5ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問1 データベース設計（公式問題PDF 6ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問1 データベース設計（公式問題PDF 7ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問1 データベース設計（公式問題PDF 8ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問1 データベース設計（公式問題PDF 9ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問1 データベース設計（公式問題PDF 10ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問1 データベース設計（公式問題PDF 11ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問1 データベース設計（公式問題PDF 12ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/db/2020-autumn-pm1/q1-answer-p01.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/q1-answer-p02.webp"
    ],
    "answerImageAltTexts": [
      "問1の公式解答例（1ページ）",
      "問1の公式解答例（2ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000d05l-att/2020r02o_db_pm1_qs.pdf#page=6",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000d05l-att/2020r02o_db_pm1_ans.pdf#page=1",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2020年度秋期 データベーススペシャリスト 午後I」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "db-2020a-pm1-q2",
    "exam": "db",
    "year": 2020,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 2,
    "type": "descriptive",
    "category": "データベース",
    "topicTags": [
      "レプリケーション",
      "トランザクション"
    ],
    "difficulty": 4,
    "question": "データベースの実装",
    "answer": "設問１     a  CASE WHEN\n              b  IS NULL\n              c  LEFT [OUTER] JOIN\n              d  BETWEEN\n              e  AND\n              f  ORDER BY\n              g  DESC\n 設問２  (1) あ 同じ座席 又は 同じチケット\n       い 購入できない\n       う 購入番号\n       え NULL\n       お コミット\n         (2)  ISOLATION レベル ②\n       理由 同時実行した他者が同じ座席を仮予約できないようにするため\n 設問３  (1) ア 席種在庫\n                                          順不同\n       イ 座席状況\n       ウ  1 か所のデータを複数か所に複製\n         (2) エ キャンセルされた座席が空席として表示されない。\n         (3)\n            レプリケーション元テーブル     レプリケーション対象列\n\n           座席状況             空席フラグ\n\n           席種在庫             空席数",
    "modelAnswer": "```text\n設問１     a  CASE WHEN\n              b  IS NULL\n              c  LEFT [OUTER] JOIN\n              d  BETWEEN\n              e  AND\n              f  ORDER BY\n              g  DESC\n 設問２  (1) あ 同じ座席 又は 同じチケット\n       い 購入できない\n       う 購入番号\n       え NULL\n       お コミット\n         (2)  ISOLATION レベル ②\n       理由 同時実行した他者が同じ座席を仮予約できないようにするため\n 設問３  (1) ア 席種在庫\n                                          順不同\n       イ 座席状況\n       ウ  1 か所のデータを複数か所に複製\n         (2) エ キャンセルされた座席が空席として表示されない。\n         (3)\n            レプリケーション元テーブル     レプリケーション対象列\n\n           座席状況             空席フラグ\n\n           席種在庫             空席数\n```",
    "explanation": "テーブルの更新と複製先に反映される時点を追う。同じ座席を複数の会員が選ぶ場合は、予約状態の更新とロックの範囲を照合する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/db/2020-autumn-pm1/p03.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p04.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p05.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p13.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p14.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p15.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p16.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p17.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p18.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p19.webp"
    ],
    "imageAltTexts": [
      "2020年度秋期 データベーススペシャリスト 午後I 共通事項（公式問題PDF 3ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 共通事項（公式問題PDF 4ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 共通事項（公式問題PDF 5ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問2 データベースの実装（公式問題PDF 13ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問2 データベースの実装（公式問題PDF 14ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問2 データベースの実装（公式問題PDF 15ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問2 データベースの実装（公式問題PDF 16ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問2 データベースの実装（公式問題PDF 17ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問2 データベースの実装（公式問題PDF 18ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問2 データベースの実装（公式問題PDF 19ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/db/2020-autumn-pm1/q2-answer-p03.webp"
    ],
    "answerImageAltTexts": [
      "問2の公式解答例（3ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000d05l-att/2020r02o_db_pm1_qs.pdf#page=13",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000d05l-att/2020r02o_db_pm1_ans.pdf#page=3",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2020年度秋期 データベーススペシャリスト 午後I」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  },
  {
    "id": "db-2020a-pm1-q3",
    "exam": "db",
    "year": 2020,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 3,
    "type": "descriptive",
    "category": "データベース",
    "topicTags": [
      "外部キー",
      "集計"
    ],
    "difficulty": 4,
    "question": "データウェアハウス",
    "answer": "設問１  (1)  a 地域(地域コード)\n              b 社員(社員ID)\n         (2) 場合 個人会員番号と法人会員番号が重複する場合\n       不都合 会員番号の登録が主キー重複違反で失敗する\n         (3)  c  Y\n              d  Y\n              e  N\n              f  N\n              g  N\n              h  RESTRICT\n              i  SET NULL\n              j 性別 IN (‘M’,‘F’)\n              k 年代 IS NOT NULL                         順不同\n              l 担当社員ID IS NULL\n              m 年代 IS NULL\n 設問２  (1) あ ②\n       い ①\n       う ⑥\n                                          順不同\n       え ④\n       お ⑧\n       か ⑨                                 順不同\n       き ⑩\n       く ⑫\n         (2)  販売額  分析対象の商品が全く売れなかった店舗の場合\n       クーポン額 分析対象の商品にクーポンを適用しなかった場合\n 設問３  (1) イ  200\n       ロ  36,000\n       ハ  4,200\n         (2)  A 性別，年代，小分類コード",
    "modelAnswer": "```text\n設問１  (1)  a 地域(地域コード)\n              b 社員(社員ID)\n         (2) 場合 個人会員番号と法人会員番号が重複する場合\n       不都合 会員番号の登録が主キー重複違反で失敗する\n         (3)  c  Y\n              d  Y\n              e  N\n              f  N\n              g  N\n              h  RESTRICT\n              i  SET NULL\n              j 性別 IN (‘M’,‘F’)\n              k 年代 IS NOT NULL                         順不同\n              l 担当社員ID IS NULL\n              m 年代 IS NULL\n 設問２  (1) あ ②\n       い ①\n       う ⑥\n                                          順不同\n       え ④\n       お ⑧\n       か ⑨                                 順不同\n       き ⑩\n       く ⑫\n         (2)  販売額  分析対象の商品が全く売れなかった店舗の場合\n       クーポン額 分析対象の商品にクーポンを適用しなかった場合\n 設問３  (1) イ  200\n       ロ  36,000\n       ハ  4,200\n         (2)  A 性別，年代，小分類コード\n```",
    "explanation": "個人会員と法人会員の属性を分け、どの行で値が必須かを確認する。集計用SQLは、売上がない店舗を結果に残す条件も追う。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-official/db/2020-autumn-pm1/p03.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p04.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p05.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p20.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p21.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p22.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p23.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p24.webp",
      "/questions/ipa-official/db/2020-autumn-pm1/p25.webp"
    ],
    "imageAltTexts": [
      "2020年度秋期 データベーススペシャリスト 午後I 共通事項（公式問題PDF 3ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 共通事項（公式問題PDF 4ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 共通事項（公式問題PDF 5ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問3 データウェアハウス（公式問題PDF 20ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問3 データウェアハウス（公式問題PDF 21ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問3 データウェアハウス（公式問題PDF 22ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問3 データウェアハウス（公式問題PDF 23ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問3 データウェアハウス（公式問題PDF 24ページ）",
      "2020年度秋期 データベーススペシャリスト 午後I 問3 データウェアハウス（公式問題PDF 25ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-official/db/2020-autumn-pm1/q3-answer-p04.webp"
    ],
    "answerImageAltTexts": [
      "問3の公式解答例（4ページ）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000d05l-att/2020r02o_db_pm1_qs.pdf#page=20",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000d05l-att/2020r02o_db_pm1_ans.pdf#page=4",
    "sourceAttribution": "出典：独立行政法人情報処理推進機構（IPA）「2020年度秋期 データベーススペシャリスト 午後I」",
    "license": "IPA-public",
    "lastUpdated": "2026-11-19"
  }
];
