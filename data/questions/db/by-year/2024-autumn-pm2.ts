import type { Question } from "@/lib/questions/types";

export const DB_QUESTIONS_2024_AUTUMN_PM2: Question[] = [
  {
    "id": "db-2024a-pm2-q1",
    "exam": "db",
    "year": 2024,
    "season": "autumn",
    "session": "pm2",
    "qNumber": 1,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "排他制御",
      "リカバリ",
      "性能見積り"
    ],
    "difficulty": 4,
    "question": "問1　オートリース会社の車両保守業務におけるデータベースの実装・運用に関する次の記述を読んで，設問に答えよ。",
    "answer": "設問                解答例・解答の要点                 備考\n設問１(1)\n          テーブル名 顧  委  契  受  車  予  進  実  点  報  記\n                客  託  約  託  両  定  捗  施  検  告  録\n                   先         表    結  率    簿\n        契機                        果\n\n                 T1             〇  〇  〇  〇  〇     〇     〇\n\n                 T2\n                 T3                         〇       〇\n\n                 T4                    〇\n\n                 T5                 〇  〇  〇          〇\n\n                 T6                〇              〇  〇\n\n\n       (2) (a)  a  WK1\n                 b 再定義\n                 c 点検抽出\n                 d 車検抽出2                           順不同\n                 e 実施登録\n                 f  WK2\n                 g 車検抽出1\n           (b)  h 予定表作成，進捗更新\n                 i なし\n                 j  140\n           (c)  k 予定表作成，進捗更新，報告作成，点検率更新\n                 l 報告作成，点検率更新\n                 m  300\n設問２(1) (a) ア 受託\n        イ 専有ロック\n           (b) 報告の追加と受託の更新を一定回数繰り返すごとにコミットする。\n           (c) 有無   有  ・  無\n        根拠 次回報告YMD の更新をコミットした行は，再処理時に選択されない\n           から\n       (2) (a) ウ  7 又は 7（完了確認）\n        エ  6 又は 6（出庫予約受付）\n           (b) 予約登録\n\n(c) ・“予定表”テーブルの行にFOR UPDATE 句を指定して読み込む。\n        ・“予定表”テーブルの行に専有ロックを掛けて読み込む。\n       (3) (a) 異なるジョブで同じ契約#の行を異なる順に更新するとき\n           (b) 読込み順を契約#順に変更する。\n           (c)   AP 名  実施登録\n        変更内容 ソート順を，報告YMD，契約#順に変更する。\n設問３(1) オ  9,500\n      カ  95\n      キ  100,000\n      ク  1,000\n      ケ  3\n       (2) コ ロールフォワード\n      サ 行単位のロックが新たに掛かる\n      シ ロックメモリ",
    "modelAnswer": "IPA公式解答例\n\n```text\n設問                解答例・解答の要点                 備考\n設問１(1)\n          テーブル名 顧  委  契  受  車  予  進  実  点  報  記\n                客  託  約  託  両  定  捗  施  検  告  録\n                   先         表    結  率    簿\n        契機                        果\n\n                 T1             〇  〇  〇  〇  〇     〇     〇\n\n                 T2\n                 T3                         〇       〇\n\n                 T4                    〇\n\n                 T5                 〇  〇  〇          〇\n\n                 T6                〇              〇  〇\n\n\n       (2) (a)  a  WK1\n                 b 再定義\n                 c 点検抽出\n                 d 車検抽出2                           順不同\n                 e 実施登録\n                 f  WK2\n                 g 車検抽出1\n           (b)  h 予定表作成，進捗更新\n                 i なし\n                 j  140\n           (c)  k 予定表作成，進捗更新，報告作成，点検率更新\n                 l 報告作成，点検率更新\n                 m  300\n設問２(1) (a) ア 受託\n        イ 専有ロック\n           (b) 報告の追加と受託の更新を一定回数繰り返すごとにコミットする。\n           (c) 有無   有  ・  無\n        根拠 次回報告YMD の更新をコミットした行は，再処理時に選択されない\n           から\n       (2) (a) ウ  7 又は 7（完了確認）\n        エ  6 又は 6（出庫予約受付）\n           (b) 予約登録\n\n(c) ・“予定表”テーブルの行にFOR UPDATE 句を指定して読み込む。\n        ・“予定表”テーブルの行に専有ロックを掛けて読み込む。\n       (3) (a) 異なるジョブで同じ契約#の行を異なる順に更新するとき\n           (b) 読込み順を契約#順に変更する。\n           (c)   AP 名  実施登録\n        変更内容 ソート順を，報告YMD，契約#順に変更する。\n設問３(1) オ  9,500\n      カ  95\n      キ  100,000\n      ク  1,000\n      ケ  3\n       (2) コ ロールフォワード\n      サ 行単位のロックが新たに掛かる\n      シ ロックメモリ\n```",
    "explanation": "設問1：ジョブの処理順と各表の更新契機を対応させ、障害後にどこから再実行するかを考える。バックアップ対象、作業表、再定義や抽出の順序は、原本の表と処理の依存関係を追って判断する。\n\n設問2：オンライン処理とバッチ処理の競合では、ロックの対象、保持時間、更新順序を分けて検討する。一定回数ごとのコミットはロックの保持時間を抑える一方、再処理時に既に処理済みの行を選ばない条件も必要となる。更新前提を保護する読込みではFOR UPDATEや専有ロックを使い、複数ジョブの更新順をそろえてデッドロックを防ぐ。\n\n設問3：性能やロック資源の見積りは、件数、処理単位、同時に保持する資源の数を明確にして計算する。ロールフォワードで更新を再適用する場面と、通常の行ロックの増加を区別し、原本の数値条件と公式解答表を対応させて確認する。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm2_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm2_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p3.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p4.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p5.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p6.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p7.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p8.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p9.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p10.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p11.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p12.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p13.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p14.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p15.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p16.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p17.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p18.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p19.webp"
    ],
    "imageAltTexts": [
      "2024年秋期 DB 問1 本文・図表・設問（公式PDF 3ページ）",
      "2024年秋期 DB 問1 本文・図表・設問（公式PDF 4ページ）",
      "2024年秋期 DB 問1 本文・図表・設問（公式PDF 5ページ）",
      "2024年秋期 DB 問1 本文・図表・設問（公式PDF 6ページ）",
      "2024年秋期 DB 問1 本文・図表・設問（公式PDF 7ページ）",
      "2024年秋期 DB 問1 本文・図表・設問（公式PDF 8ページ）",
      "2024年秋期 DB 問1 本文・図表・設問（公式PDF 9ページ）",
      "2024年秋期 DB 問1 本文・図表・設問（公式PDF 10ページ）",
      "2024年秋期 DB 問1 本文・図表・設問（公式PDF 11ページ）",
      "2024年秋期 DB 問1 本文・図表・設問（公式PDF 12ページ）",
      "2024年秋期 DB 問1 本文・図表・設問（公式PDF 13ページ）",
      "2024年秋期 DB 問1 本文・図表・設問（公式PDF 14ページ）",
      "2024年秋期 DB 問1 本文・図表・設問（公式PDF 15ページ）",
      "2024年秋期 DB 問1 本文・図表・設問（公式PDF 16ページ）",
      "2024年秋期 DB 問1 本文・図表・設問（公式PDF 17ページ）",
      "2024年秋期 DB 問1 本文・図表・設問（公式PDF 18ページ）",
      "2024年秋期 DB 問1 本文・図表・設問（公式PDF 19ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb8/db-2024a-pm2-q1-answer-1.webp",
      "/questions/ipa-plan5-qb8/db-2024a-pm2-q1-answer-2.webp"
    ],
    "answerImageAltTexts": [
      "db-2024a-pm2-q1 IPA公式解答例 1（解答表・図）",
      "db-2024a-pm2-q1 IPA公式解答例 2（解答表・図）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  },
  {
    "id": "db-2024a-pm2-q2",
    "exam": "db",
    "year": 2024,
    "season": "autumn",
    "session": "pm2",
    "qNumber": 2,
    "type": "descriptive",
    "category": "午後記述",
    "topicTags": [
      "概念データモデル",
      "関係スキーマ",
      "資材調達"
    ],
    "difficulty": 4,
    "question": "問2　車体部品メーカーの資材調達業務の概念データモデリングに関する次の記述を読んで，設問に答えよ。",
    "answer": "設問                解答例・解答の要点                 備考\n (1)\n\n\n\n             組織\n\n\n                       資材\n             倉庫             品目分類                      メーカー\n\n\n\n                棚            資材\n\n\n                                     定量\n                                      発注品\n\n\n\n             倉庫別\n             在庫\n                     金属材料  樹脂材料  薬品類  梱包資材\n\n\n\n              棚別在庫\n\n\n (2)\n\n\n                  発注\n\n                   長期発注         スポット発注   定量発注     保管条件付き発注  保管条件付き発注検収\n\n\n                                              定量発注\n                                              納入\n\n\n                                                       保管条件                                                             保管条件                   長期発注                          長期発注                                スポット                                              定量発注                                                      付き発注                                                             付き発注\n                   納入依頼                          納入                                発注納入                                              納入明細                                                       納入依頼                                                             納入\n\n\n\n                                       金属材料\n                                        ロール                   入庫\n                                       納入明細\n\n                                スポット                          長期発注\n                                 発注                          納入明細                                納入明細\n\n(3)  ア 上位組織C\n   イ 品目名，資材メーカーC，品目分類C\n   ウ 購入LS，納入LT，購入@\n   エ 規格Q，金属仕様\n   オ 樹脂仕様\n   カ 取扱注意事項\n   キ 印刷サイズ，納入LS，納入LT\n   ク 倉庫C，品目C，基準在庫Q，倉庫別在庫Q\n   ケ 倉庫C，棚#，品目C，棚別在庫Q\n(4)  コ 金属資材品目C，月当たり納入予定Q，納入開始YM，納入月数，購入@\n   サ 金属資材品目C，納入先倉庫C，購入@，納入期限YMD，発注Q\n   シ 納入先倉庫C，定量発注品品目C，納入予定YMD\n   ス 梱包資材品目C，検収予定YMD，購入@，発注Q，保管期限YMD\n   セ 検収YMD，購入\\\n   ソ 購入対象YM，月内納入依頼#，通知YMD，納入先倉庫C，納入予定YMD，\n     納入依頼Q\n   タ 保管条件付き発注#，納入先倉庫C，納入依頼YMD\n   チ 長期発注#，購入対象YM，月内納入依頼#，納入YMD，購入\\\n   ツ ロール製造#，長期発注#，購入対象YM，月内納入依頼#\n   テ スポット発注#，納入YMD，購入\\\n   ト ロール製造#，スポット発注#，納入YMD，ロール明細#\n   ナ 定量発注納入#\n   ニ 保管条件付き発注#，納入先倉庫C，納入依頼YMD\n   ヌ 発注#，ロール製造#，納入依頼YMD，入庫Q",
    "modelAnswer": "IPA公式解答例\n\n```text\n設問                解答例・解答の要点                 備考\n (1)\n\n\n\n             組織\n\n\n                       資材\n             倉庫             品目分類                      メーカー\n\n\n\n                棚            資材\n\n\n                                     定量\n                                      発注品\n\n\n\n             倉庫別\n             在庫\n                     金属材料  樹脂材料  薬品類  梱包資材\n\n\n\n              棚別在庫\n\n\n (2)\n\n\n                  発注\n\n                   長期発注         スポット発注   定量発注     保管条件付き発注  保管条件付き発注検収\n\n\n                                              定量発注\n                                              納入\n\n\n                                                       保管条件                                                             保管条件                   長期発注                          長期発注                                スポット                                              定量発注                                                      付き発注                                                             付き発注\n                   納入依頼                          納入                                発注納入                                              納入明細                                                       納入依頼                                                             納入\n\n\n\n                                       金属材料\n                                        ロール                   入庫\n                                       納入明細\n\n                                スポット                          長期発注\n                                 発注                          納入明細                                納入明細\n\n(3)  ア 上位組織C\n   イ 品目名，資材メーカーC，品目分類C\n   ウ 購入LS，納入LT，購入@\n   エ 規格Q，金属仕様\n   オ 樹脂仕様\n   カ 取扱注意事項\n   キ 印刷サイズ，納入LS，納入LT\n   ク 倉庫C，品目C，基準在庫Q，倉庫別在庫Q\n   ケ 倉庫C，棚#，品目C，棚別在庫Q\n(4)  コ 金属資材品目C，月当たり納入予定Q，納入開始YM，納入月数，購入@\n   サ 金属資材品目C，納入先倉庫C，購入@，納入期限YMD，発注Q\n   シ 納入先倉庫C，定量発注品品目C，納入予定YMD\n   ス 梱包資材品目C，検収予定YMD，購入@，発注Q，保管期限YMD\n   セ 検収YMD，購入\\\n   ソ 購入対象YM，月内納入依頼#，通知YMD，納入先倉庫C，納入予定YMD，\n     納入依頼Q\n   タ 保管条件付き発注#，納入先倉庫C，納入依頼YMD\n   チ 長期発注#，購入対象YM，月内納入依頼#，納入YMD，購入\\\n   ツ ロール製造#，長期発注#，購入対象YM，月内納入依頼#\n   テ スポット発注#，納入YMD，購入\\\n   ト ロール製造#，スポット発注#，納入YMD，ロール明細#\n   ナ 定量発注納入#\n   ニ 保管条件付き発注#，納入先倉庫C，納入依頼YMD\n   ヌ 発注#，ロール製造#，納入依頼YMD，入庫Q\n```",
    "explanation": "設問(1)：業務の中で識別する対象を洗い出し、資材の種類とその共通部分を分ける。倉庫別在庫と棚別在庫は、在庫を管理する粒度が異なるため、同じ識別子だけで扱わない。エンティティ間の関係と多重度は公式解答図と照合する。\n\n設問(2)：長期、スポット、定量、保管条件付きの各発注では、納入依頼、納入、明細がどの発注に対応するかを追う。一つの名称が似ていることだけで統合せず、業務上の識別単位と記録するタイミングを根拠に関係を決める。\n\n設問(3)・(4)：関係スキーマの空欄は、識別に必要な属性と対象に従属する属性を分けて埋める。倉庫C、棚#、品目C、発注#、納入依頼の番号などが、どの範囲で一意になるかを確認し、原本に指定された属性名の表記で答える。\n\n出典：IPA公式問題 https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm2_qs.pdf\n公式解答例 https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm2_ans.pdf",
    "hasImage": true,
    "imageUrls": [
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p3.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p4.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p5.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p20.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p21.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p22.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p23.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p24.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p25.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p26.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p27.webp",
      "/questions/ipa-plan5-qb8/2024r06a_db_pm2-p28.webp"
    ],
    "imageAltTexts": [
      "2024年秋期 DB 問2 本文・図表・設問（公式PDF 3ページ）",
      "2024年秋期 DB 問2 本文・図表・設問（公式PDF 4ページ）",
      "2024年秋期 DB 問2 本文・図表・設問（公式PDF 5ページ）",
      "2024年秋期 DB 問2 本文・図表・設問（公式PDF 20ページ）",
      "2024年秋期 DB 問2 本文・図表・設問（公式PDF 21ページ）",
      "2024年秋期 DB 問2 本文・図表・設問（公式PDF 22ページ）",
      "2024年秋期 DB 問2 本文・図表・設問（公式PDF 23ページ）",
      "2024年秋期 DB 問2 本文・図表・設問（公式PDF 24ページ）",
      "2024年秋期 DB 問2 本文・図表・設問（公式PDF 25ページ）",
      "2024年秋期 DB 問2 本文・図表・設問（公式PDF 26ページ）",
      "2024年秋期 DB 問2 本文・図表・設問（公式PDF 27ページ）",
      "2024年秋期 DB 問2 本文・図表・設問（公式PDF 28ページ）"
    ],
    "answerImageUrls": [
      "/questions/ipa-plan5-qb8/db-2024a-pm2-q2-answer-1.webp",
      "/questions/ipa-plan5-qb8/db-2024a-pm2-q2-answer-2.webp"
    ],
    "answerImageAltTexts": [
      "db-2024a-pm2-q2 IPA公式解答例 1（解答表・図）",
      "db-2024a-pm2-q2 IPA公式解答例 2（解答表・図）"
    ],
    "sourcePdfUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm2_qs.pdf",
    "sourceAnswerUrl": "https://www.ipa.go.jp/shiken/mondai-kaiotu/m42obm000000afqx-att/2024r06a_db_pm2_ans.pdf",
    "license": "IPA-public",
    "lastUpdated": "2026-11-18"
  }
];
