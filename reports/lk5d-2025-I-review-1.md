**FAIL — 修正必須の解説誤りが1件あります。**

**問23・選択肢イの解説：交流低圧の上限が誤っています。**  
[2025-I.ts:1085](C:/Users/kanet/20260522/wt-kenchikushi2/data/qualification-staging/kenchikushi2/2025-I.ts:1085) の「2025年時点の交流低圧の上限は1,000 V」は不正確です。電気設備に関する技術基準を定める省令第2条では、交流低圧は**600 V以下**です。依頼文の「実際は1,000 V」という前提も訂正が必要です。[省令第2条](https://laws.e-gov.go.jp/law/409M50000400052)、[経産省の省令解説](https://www.meti.go.jp/policy/safety_security/industrial_safety/oshirase/2022/06/20220610-06.pdf)

原文「交流600 V以下」と公式正答「5」は維持し、解説を「交流600 V以下は、省令第2条に定める低圧に該当する」と直すべきです。

確認結果は以下のとおりです。

- **原文：PASS。** 全25本文・125選択肢をPDFMinerで再照合し、PDF2～10の全画像も確認。問1・7・17のルビ、問15の組版分数1/3、図表なしを確認しました。
- **公式正答：PASS。** 全25件が提供解答PDFと一致。正答列は `3214245134214552233144551`。
- **独自解説：FAIL。** 全125件を内容面から評価し、上記1件を修正必須と判断。他に明確な修正必須の誤りは検出しませんでした。

重点項目の根拠確認：

| 問 | 判定・確認内容 |
|---|---|
| 12 | PASS：20×2＋15＝55 m²。[国交省](https://www.mlit.go.jp/policy/shingikai/content/001383110.pdf) |
| 14 | PASS：1.98×20＝39.6 m²、45 m²は充足。[厚労省](https://www.mhlw.go.jp/file/05-Shingikai-11901000-Koyoukintoujidoukateikyoku-Soumuka/0000034882.pdf) |
| 16 | PASS：6.4×4×2/3＝約17.1 m²、10 m²は不足。[医療法施行規則](https://www.mhlw.go.jp/web/t_doc?dataId=80092000) |
| 17 | PASS：住宅の蹴込み30 mm以下。[国交省指針](https://www.mlit.go.jp/notice/noticedata/sgml/2001/26aa2661/26aa2661.html) |
| 21 | PASS：開口上端から600 mm以上、または水平3 m以上。[鹿児島市指針](https://www.city.kagoshima.lg.jp/suido/soumu/kyuhaisui/gesuido/nyusatsu/jigyosha/documents/haisui05.pdf) |
| 22 | PASS：一般的な泥だめ150 mm以上。[吹田市基準](https://www.city.suita.osaka.jp/_res/projects/default_project/_page_/001/041/136/sekoukijun.pdf) |
| 24 | PASS：広範囲型2号消火栓は1人操作。[消防庁資料](https://www.fdma.go.jp/singi_kento/kento/items/kento140_48_shiryo3-11.pdf) |

manifest・index・README・テスト・verifierも確認しました。125/400問、次回2025-II問1、非公開・要レビュー状態、法令基準日2025-01-01と表紙の2025-04-01例外は整合しています。公開レジストリ・ルートへの接続は検出しませんでした。

verifier再実行は **PASS（125本文・625肢・400正答）**。既存ログの28テスト成功・型検査exit 0・検証fail 0も確認しましたが、これらは解説の技術的正確性を保証しません。

読み取りのみで実施し、2025-IIは除外しました。Git操作禁止に従い、コミットとの同一性確認は行っていません。