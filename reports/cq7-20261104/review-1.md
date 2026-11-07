FAIL
完了状況：PARTIAL（問題40/80問収録。2025年度は正答40件のみ）

指定の **gpt-6-astra別プロセス・read-only** で基点からHEADをレビューしました。取得済み部分に参照条項の誤りが2件あります。2025年度の未取得とは別の問題です。

1. **[P2] 問1：50ha基準の参照条項が誤り**

   [explanations.json:21](C:/Users/kanet/20260522/wt-kukaku-seiri/data/qualification-staging/kukaku-seiri/explanations.json:21)、[2026-annual.json:53](C:/Users/kanet/20260522/wt-kukaku-seiri/data/qualification-staging/kukaku-seiri/2026-annual.json:53)の「都市計画法施行令第9条」は、**第10条第1号**に修正が必要です。公式取得XMLで確認しました。解説本文・正答は合っていますが、根拠の追跡先を誤ります。

2. **[P2] 問12：公共施設の参照条項が誤り**

   [explanations.json:226](C:/Users/kanet/20260522/wt-kukaku-seiri/data/qualification-staging/kukaku-seiri/explanations.json:226)、[2026-annual.json:654](C:/Users/kanet/20260522/wt-kukaku-seiri/data/qualification-staging/kukaku-seiri/2026-annual.json:654)の「土地区画整理法施行令第1条（公共施設）」は、**第67条**に修正が必要です。第1条は規準・規約・定款等の記載事項であり、無関係な条項へ誘導します。

検査範囲と結果：

| 対象 | 確認結果 |
|---|---|
| 問題・4肢 | pdfplumber/pdfminer監査をメモリ上で再実行し39問一致。問24は原画像で全4肢と分数`A/ℓ`・`V/A`を確認 |
| 正答 | 両年度各40件を公式PDFと照合、一致 |
| 全160肢解説 | 全件通読し、法令XML・国交省指針・評価資料と照合。組合せラベル、意見／同意を含め、上記以外に明確な本文・正答矛盾は未発見 |
| 図表 | 全44枚のPNGを原PDFから再描画しハッシュ一致。11,316文字の画像被覆と12図形の収容を確認 |
| 公開隔離 | 公開レジストリ・ルートへの流入なし。カタログの公開条件も確認 |
| 検証接続 | 共通validatorへの接続を確認。書込なしtypecheck成功。validator再実行は`spawn EPERM`で停止。既存のvalidator・1077テスト成功ログは読取確認のみ |

2025年度問題の取得不能候補は以下です。通常GETの404記録があり、保存済み公式一覧にも問題リンクはありません。命名規則から構成した候補で、過去の実在を確認したURLではありません。

`https://www.jctc.jp/wjctcp/wp-content/uploads/2025/09/20250908t_mondaia.pdf`

**2025年度本文40問、転載条件の確認、人手最終確認が残ります。** 問6・10・17等の技術的慣行・数値は公式設問・正答に依存する部分があり、専門教材による全面的な裏付けまでは確認していません。法令基準日は推定せず、`twoRoundComplete=false`・`publicAllowed=false`を維持する扱いは適切です。

編集・ファイル生成・コミット・push・PR・デプロイ・main操作・外部連絡は行っていません。終了時も作業ツリーはcleanでした。
