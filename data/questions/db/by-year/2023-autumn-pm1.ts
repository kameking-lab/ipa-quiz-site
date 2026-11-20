import type { Question } from "@/lib/questions/types";

export const DB_QUESTIONS_2023_AUTUMN_PM1: Question[] = [
  {
    "id": "db-2023a-pm1-q1",
    "exam": "db",
    "year": 2023,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "候補キー",
      "正規化",
      "概念データモデル"
    ],
    "difficulty": 4,
    "question": "問1　調達システムのデータベース設計\n\n次の記述を読んで、設問に答えよ。",
    "answer": "設問１(1) {社員コード，社員所属組織コード}\n       {社員コード，社員所属組織名}\n         (2) 正規形 第1正規形\n\n       根拠  ・全ての属性が単一値をとり，候補キーの一部である“社員コー\n            ド”に関数従属する“社員氏名”があるから\n           ・全ての属性が単一値をとり，候補キーの一部である“社員所属組\n            織コード”に関数従属する“社員所属上位組織コード”があるか\n            ら\n           ・全ての属性が単一値をとり，候補キーの一部である“社員所属組\n            織名”に関数従属する“社員所属上位組織名”があるから\n       関係  社員（社員コード，社員氏名）\n      スキーマ 組織（組織コード，組織名，上位組織コード）\n           社員所属（社員コード，所属組織コード，役職コード，\n                報告先社員コード）\n           役職（役職コード，役職名）\n\n 設問２(1) 概念データモデル：公式解答図参照。\n(2)  a 試作案件番号\n\n              b 得意先支給数量，必要調達数量\n\n              c 取引先コード，試作案件番号\n\n              d 見積依頼番号，メーカー型式番号，ロットサイズ，提案理由\n\n              e 見積依頼番号，見積回答明細番号，発注ロット数\n\n\n\n\n設問３(1) (a) ・品目分類に自己参照型のリレーションシップを追加する。\n        ・品目分類に再帰リレーションシップを追加する。\n        ・品目分類から自分自身へ１対多のリレーションシップを追加する。\n\n           (b) 関係名 品目分類\n\n        属性名 上位品目分類コード\n\n       (2) (a) 発注明細と入荷明細との間のリレーションシップを，１対１から１対多へ\n        変更する。\n\n           (b) ① 関係名 発注明細\n\n          属性名 発注残ロット数\n                                          ①と②は順不同\n        ② 関係名 入荷明細\n\n          属性名 入荷ロット数",
    "modelAnswer": "```text\n設問１(1) {社員コード，社員所属組織コード}\n       {社員コード，社員所属組織名}\n         (2) 正規形 第1正規形\n\n       根拠  ・全ての属性が単一値をとり，候補キーの一部である“社員コー\n            ド”に関数従属する“社員氏名”があるから\n           ・全ての属性が単一値をとり，候補キーの一部である“社員所属組\n            織コード”に関数従属する“社員所属上位組織コード”があるか\n            ら\n           ・全ての属性が単一値をとり，候補キーの一部である“社員所属組\n            織名”に関数従属する“社員所属上位組織名”があるから\n       関係  社員（社員コード，社員氏名）\n      スキーマ 組織（組織コード，組織名，上位組織コード）\n           社員所属（社員コード，所属組織コード，役職コード，\n                報告先社員コード）\n           役職（役職コード，役職名）\n\n 設問２(1) 概念データモデル：公式解答図参照。\n(2)  a 試作案件番号\n\n              b 得意先支給数量，必要調達数量\n\n              c 取引先コード，試作案件番号\n\n              d 見積依頼番号，メーカー型式番号，ロットサイズ，提案理由\n\n              e 見積依頼番号，見積回答明細番号，発注ロット数\n\n\n\n\n設問３(1) (a) ・品目分類に自己参照型のリレーションシップを追加する。\n        ・品目分類に再帰リレーションシップを追加する。\n        ・品目分類から自分自身へ１対多のリレーションシップを追加する。\n\n           (b) 関係名 品目分類\n\n        属性名 上位品目分類コード\n\n       (2) (a) 発注明細と入荷明細との間のリレーションシップを，１対１から１対多へ\n        変更する。\n\n           (b) ① 関係名 発注明細\n\n          属性名 発注残ロット数\n                                          ①と②は順不同\n        ② 関係名 入荷明細\n\n          属性名 入荷ロット数\n```",
    "scoringCriteria": "設問番号、空欄記号、指定文字数を原問と対応させて、IPA公式解答例と照合する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-07.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-08.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-09.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-10.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-11.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-12.webp"
    ],
    "imageAltTexts": [
      "データベーススペシャリスト 2023年秋期 午後I 問1 本文・図表・設問（公式問題PDF 7ページ）",
      "データベーススペシャリスト 2023年秋期 午後I 問1 本文・図表・設問（公式問題PDF 8ページ）",
      "データベーススペシャリスト 2023年秋期 午後I 問1 本文・図表・設問（公式問題PDF 9ページ）",
      "データベーススペシャリスト 2023年秋期 午後I 問1 本文・図表・設問（公式問題PDF 10ページ）",
      "データベーススペシャリスト 2023年秋期 午後I 問1 本文・図表・設問（公式問題PDF 11ページ）",
      "データベーススペシャリスト 2023年秋期 午後I 問1 本文・図表・設問（公式問題PDF 12ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb9/db-2023a-pm1/answer-page-01.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/answer-page-02.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問1（公式PDF 1ページ）",
      "IPA公式解答例 問1（公式PDF 2ページ）"
    ],
    "explanation": "候補キーの組合せと部分関数従属性を確認し、社員・組織・所属・役職を分離する。階層化や分納の追加要件では、再帰的な関連、多重度、発注残と入荷実績の保持を対応付ける。解答の関連線とキー表記は公式解答図で照合する。\n\n[公式問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05a_db_pm1_qs.pdf) / [公式解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05a_db_pm1_ans.pdf)",
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05a_db_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05a_db_pm1_ans.pdf",
    "sourceAttribution": "出典：IPA（独立行政法人情報処理推進機構）2023年秋期 データベーススペシャリスト 午後I",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "db-2023a-pm1-q2",
    "exam": "db",
    "year": 2023,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "概念データモデル",
      "SQL",
      "ポイント管理"
    ],
    "difficulty": 4,
    "question": "問2　ホテルの予約システムの再構築\n\n次の記述を読んで、設問に答えよ。",
    "answer": "設問１(1) 概念データモデル：公式解答図参照。\n(2) ア 客室タイプコード\nイ ホテルコード，客室タイプコード，旅行会社コード，宿泊割引券番号\nウ ホテルコード，客室番号，宿泊割引券番号，館内施設割引券番号\nエ 予約番号\n\n設問２(1) a 宿泊、b 会員番号\nc 予約区分、d 自社サイト予約（又は c 旅行会社コード、d NULL）\n(2) e 割引券ステータス、f 未利用、g 割引券区分、h 宿泊割引券\n（又は e 割引券区分、f 宿泊割引券、g 割引券ステータス、h 未利用）\ni 会員番号、j 会員番号\n\n設問３(1) 概念データモデル：公式解答図参照。\n(2) オ 必要累計泊数，ポイント付与率\nカ 商品名，ポイント数\nキ ポイント増減区分，ポイント増減数，ポイント増減時刻\nク 有効期限年月日，未利用ポイント数\nケ 失効後メール送付日時\nコ 支払充当区分\nサ 商品コード，個数\n(3) (a) 未利用ポイント数が0より大きい。\n(b) 有効期限年月日が近い順",
    "modelAnswer": "```text\n設問１(1) 概念データモデル：公式解答図参照。\n(2) ア 客室タイプコード\nイ ホテルコード，客室タイプコード，旅行会社コード，宿泊割引券番号\nウ ホテルコード，客室番号，宿泊割引券番号，館内施設割引券番号\nエ 予約番号\n\n設問２(1) a 宿泊、b 会員番号\nc 予約区分、d 自社サイト予約（又は c 旅行会社コード、d NULL）\n(2) e 割引券ステータス、f 未利用、g 割引券区分、h 宿泊割引券\n（又は e 割引券区分、f 宿泊割引券、g 割引券ステータス、h 未利用）\ni 会員番号、j 会員番号\n\n設問３(1) 概念データモデル：公式解答図参照。\n(2) オ 必要累計泊数，ポイント付与率\nカ 商品名，ポイント数\nキ ポイント増減区分，ポイント増減数，ポイント増減時刻\nク 有効期限年月日，未利用ポイント数\nケ 失効後メール送付日時\nコ 支払充当区分\nサ 商品コード，個数\n(3) (a) 未利用ポイント数が0より大きい。\n(b) 有効期限年月日が近い順\n```",
    "scoringCriteria": "設問番号、空欄記号、指定文字数を原問と対応させて、IPA公式解答例と照合する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-13.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-14.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-15.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-16.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-17.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-18.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-19.webp"
    ],
    "imageAltTexts": [
      "データベーススペシャリスト 2023年秋期 午後I 問2 本文・図表・設問（公式問題PDF 13ページ）",
      "データベーススペシャリスト 2023年秋期 午後I 問2 本文・図表・設問（公式問題PDF 14ページ）",
      "データベーススペシャリスト 2023年秋期 午後I 問2 本文・図表・設問（公式問題PDF 15ページ）",
      "データベーススペシャリスト 2023年秋期 午後I 問2 本文・図表・設問（公式問題PDF 16ページ）",
      "データベーススペシャリスト 2023年秋期 午後I 問2 本文・図表・設問（公式問題PDF 17ページ）",
      "データベーススペシャリスト 2023年秋期 午後I 問2 本文・図表・設問（公式問題PDF 18ページ）",
      "データベーススペシャリスト 2023年秋期 午後I 問2 本文・図表・設問（公式問題PDF 19ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb9/db-2023a-pm1/answer-page-03.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/answer-page-04.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問2（公式PDF 3ページ）",
      "IPA公式解答例 問2（公式PDF 4ページ）"
    ],
    "explanation": "現行業務の予約経路と割引券の関係を整理してから、新しいポイント管理をモデルへ加える。SQLは対象会員、割引券の区分と状態を条件へ反映し、ポイント利用は残数があるものを有効期限の近い順に充当する。\n\n[公式問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05a_db_pm1_qs.pdf) / [公式解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05a_db_pm1_ans.pdf)",
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05a_db_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05a_db_pm1_ans.pdf",
    "sourceAttribution": "出典：IPA（独立行政法人情報処理推進機構）2023年秋期 データベーススペシャリスト 午後I",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "db-2023a-pm1-q3",
    "exam": "db",
    "year": 2023,
    "season": "autumn",
    "session": "pm1",
    "qNumber": 3,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "ウィンドウ関数",
      "表領域",
      "性能見積り"
    ],
    "difficulty": 4,
    "question": "問3　観測データ分析システム\n\n次の記述を読んで、設問に答えよ。",
    "answer": "設問１(1)  a 圃場ID, 農事日付, AVG(分平均温度)\n              b 圃場ID, 農事日付\n         (2) ・日出時刻が日々異なり1 日の分数が同じとは限らないから\n       ・農事日付の1 日は1,440 分とは限らないから\n         (3)  c  14.0\n              d  15.0\n              e  16.0\n         (4)  f 日平均温度\n              g 圃場ID\n              h ・農事日付\n         ・圃場ID，農事日付\n 設問２(1) ・区分を追加する都度，全体の行の再分配が必要になるから\n      ・同じ圃場に異なる圃場の観測データが混在する可能性があるから\n      ・レンジ区分でも区分の行数をほぼ同じにする利点が得られるから\n         (2) ア  9,000\n         (3) 同じ圃場の行は，1 ページに1 行しか格納できないから\n         (4) 元日の日出時刻までのデータは前日の農事日付に含まれるから\n         (5) イ ①\n       ウ ④\n       エ ⑤\n       オ ①\n       カ ②",
    "modelAnswer": "```text\n設問１(1)  a 圃場ID, 農事日付, AVG(分平均温度)\n              b 圃場ID, 農事日付\n         (2) ・日出時刻が日々異なり1 日の分数が同じとは限らないから\n       ・農事日付の1 日は1,440 分とは限らないから\n         (3)  c  14.0\n              d  15.0\n              e  16.0\n         (4)  f 日平均温度\n              g 圃場ID\n              h ・農事日付\n         ・圃場ID，農事日付\n 設問２(1) ・区分を追加する都度，全体の行の再分配が必要になるから\n      ・同じ圃場に異なる圃場の観測データが混在する可能性があるから\n      ・レンジ区分でも区分の行数をほぼ同じにする利点が得られるから\n         (2) ア  9,000\n         (3) 同じ圃場の行は，1 ページに1 行しか格納できないから\n         (4) 元日の日出時刻までのデータは前日の農事日付に含まれるから\n         (5) イ ①\n       ウ ④\n       エ ⑤\n       オ ①\n       カ ②\n```",
    "scoringCriteria": "設問番号、空欄記号、指定文字数を原問と対応させて、IPA公式解答例と照合する。",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-20.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-21.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-22.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-23.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-24.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-25.webp",
      "/questions/ipa-plan5-qb9/db-2023a-pm1/question-page-26.webp"
    ],
    "imageAltTexts": [
      "データベーススペシャリスト 2023年秋期 午後I 問3 本文・図表・設問（公式問題PDF 20ページ）",
      "データベーススペシャリスト 2023年秋期 午後I 問3 本文・図表・設問（公式問題PDF 21ページ）",
      "データベーススペシャリスト 2023年秋期 午後I 問3 本文・図表・設問（公式問題PDF 22ページ）",
      "データベーススペシャリスト 2023年秋期 午後I 問3 本文・図表・設問（公式問題PDF 23ページ）",
      "データベーススペシャリスト 2023年秋期 午後I 問3 本文・図表・設問（公式問題PDF 24ページ）",
      "データベーススペシャリスト 2023年秋期 午後I 問3 本文・図表・設問（公式問題PDF 25ページ）",
      "データベーススペシャリスト 2023年秋期 午後I 問3 本文・図表・設問（公式問題PDF 26ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb9/db-2023a-pm1/answer-page-04.webp"
    ],
    "answerImageAltTexts": [
      "IPA公式解答例 問3（公式PDF 4ページ）"
    ],
    "explanation": "日出を境界とする農事日付は常に1,440分とは限らないため、平均値の集計単位とウィンドウの並びを確認する。圃場ごとの区分化では、データ追加時の再分配、ページ内の格納行数、日付境界を含めて容量と運用を見積もる。\n\n設問2(1)の公式解答例には「同じ圃場に」とあります。本文のハッシュ区分では、同じ区分に異なる圃場の観測データが入り得ます。\n\n[公式問題](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05a_db_pm1_qs.pdf) / [公式解答例](https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05a_db_pm1_ans.pdf)",
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05a_db_pm1_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/ps6vr70000010d6y-att/2023r05a_db_pm1_ans.pdf",
    "sourceAttribution": "出典：IPA（独立行政法人情報処理推進機構）2023年秋期 データベーススペシャリスト 午後I",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  }
];
