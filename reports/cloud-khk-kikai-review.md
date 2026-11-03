**判定：FAIL（修正必要）**。対象は `HEAD e309b9f`。同梱16PDFから独立に照合し、以下を確認しました。コード・ファイルの変更はありません。

| 重要度 | 対象 | 問題点 |
|---|---|---|
| P2 | 令和7年度・乙種機械・学識問1「ロ」 | 公式の `kg・m²/s²` が **`kg・m²/s2`** に変わっています。正誤判定対象の単位表記なので修正が必要です。[該当データ](/home/user/ipa-quiz-site/data/qualification-staging/khk-kikai/khk-kikai-otsu/questions.json:4410)／[公式PDF・2ページ](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACFZ-W.pdf#page=2) |
| P3 | 令和6年度・甲種機械・学識問5 | グラフの切出し範囲が狭く、左側の縦軸ラベル **`8ⁿ` の一部が欠けています**。[収録画像](/home/user/ipa-quiz-site/data/qualification-staging/khk-kikai/figures/2024-gakushiki-q5-p8.png)／[公式PDF・8ページ](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACEZ-W.pdf#page=8) |
| P3 | 令和6年度・甲種機械・学識問1(1) | 作図問題の解答が「図を描く」という文章のみで、**汚れ付着後の解答図がありません**。数値・流れの説明はありますが、添付画像は付着前の問題図だけです。[解答データ](/home/user/ipa-quiz-site/data/qualification-staging/khk-kikai/khk-kikai-kou/questions.json:1855)／[公式解答例・1ページ](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6fy_02.pdf#page=1) |

その他の照合結果です。

- **問題数：一致。** 甲種80問・乙種100問、計180問。年度・科目別の欠番、ID重複なし。
- **正答：択一170問すべて一致。** 転記済みJSONだけでなく、公式PDFの機械資格の行から直接照合。記述10問の数値・式・要点にも不一致は見つかりませんでした。[令和6年度正答](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6fy_kaitou.pdf)、[令和7年度正答](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7fy_kaitou.pdf)
- **問題文・選択肢：上記以外の不一致は検出なし。** 共通設例、表の選択肢への転記も確認しました。
- **解説：空欄なし。** 全180問の解説、択一850肢の解説、記述10問の解答例を確認。ただし上記作図解答は補完が必要です。
- **出典：問題なし。** 全180問の年度・資格・科目との対応、16PDFのURL到達性、同梱ファイルの記録SHA256・ページ数を確認しました。

既存の専用バリデータは180問で成功しましたが、上記の指数崩れ・画像の切れ・解答図不足は検出できていません。