FAIL

対象は **`00e49b940 → 76b6a7d2d` の収録全体（54ファイル）**です。旧FAIL4項目の修正は確認できましたが、全肢解説の十分性に問題が残っています。

1. **[P2] 正しい記述の解説が欠落したまま `explanationCoverage: "full"`**

   R7第一種・保安管理技術の以下3問で、本文解説にも全5選択肢の解説にも該当記述の根拠がありません。
   - [問3・1021行](C:/Users/kanet/20260522/wt-khk-reito/data/questions/khk-reito-1/latest-two.json:1021)：ハの「吸込み温度・圧力・過熱度と過熱運転の関係」。
   - [問8・1236行](C:/Users/kanet/20260522/wt-khk-reito/data/questions/khk-reito-1/latest-two.json:1236)：ニの「温度式／圧力式冷却水調整弁の動作」。
   - [問10・1322行](C:/Users/kanet/20260522/wt-khk-reito/data/questions/khk-reito-1/latest-two.json:1322)：ハの「低圧受液器が液分離器を兼ねる理由」。

   組合せの正誤を示すだけでは、欠けた記述の解説になりません。該当部分の説明追加が必要です。根拠：[公式問題・問3／8／10](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACGY-W.pdf)。

2. **[P2] 誤記述について、何がどう誤っているか説明していない**

   [R6第一種・保安問15、3239行](C:/Users/kanet/20260522/wt-khk-reito/data/questions/khk-reito-1/latest-two.json:3239)は、ロに対して「冷媒や…熱交換器の説明を混同してはならない」とするだけです。問題中の「吐出しガス」「蒸発器」のどこを訂正するのか示さず、同文が全5選択肢に繰り返されています。誤りの具体的な訂正と理由が必要です。根拠：[公式問題・問15](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACGY-W.pdf)。

確認結果：230問の内訳（80／80／70）、ID重複なし、択一220問の公式正答番号・選択肢対応、法令基準日を確認しました。記述式10問、ローカル図表8点、公開ゲートと表示変更も点検しました。公式正答照合元：[R6](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6fy_kaitou.pdf)、[R7](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7fy_kaitou.pdf)。

未確認事項：全230問の原本との逐字照合、PDFハッシュ再検証、ブラウザでの回帰確認は完了していません。Vitestは起動時の `spawn EPERM` で実行不能でした。これは上記の内容上のFAILとは別です。

ファイル変更なし。作業ツリーはクリーンです。
