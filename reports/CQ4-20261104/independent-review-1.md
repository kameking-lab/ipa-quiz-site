**FAIL — 原本画像2枚に印刷文字の欠落があります。**

対象は指定基点からHEAD `7e787e0f`までの全115ファイル。編集・コミット・委任はしていません。

| ファイル・設問 | 根拠 | 必要な修正 |
|---|---|---|
| [2026-q02.webp](/C:/Users/kanet/20260522/wt-jokaso-setsubishi/data/qualification-staging/jokaso-setsubishi/images/2026-q02.webp)・問2 | 「問題」と肢番号⑴〜⑷が欠落。既存原ページ`2026/p05.png`には存在します。 | 番号を含め正常に描画できる条件で再生成し、原ページと目視照合する。 |
| [2026-q39.webp](/C:/Users/kanet/20260522/wt-jokaso-setsubishi/data/qualification-staging/jokaso-setsubishi/images/2026-q39.webp)・問39 | 「問題」と肢番号⑵〜⑷が欠落。同じPDFを倍率2でメモリ上に描画すると全番号を確認できました。 | 正常な描画条件で再生成し、全肢番号を確認する。 |

修正後は`2026.json`と`source-audit.json`の画像ハッシュ・描画条件を更新し、原本監査を再実行してください。現在の監査は同じ描画条件で照合するため、この欠落があってもピクセル一致で通過します。

確認した範囲：

- 全100問の本文・400肢の順序と数値を画像と読合せ、全400肢解説を通読。上記以外の明確な不一致は見つかりませんでした。
- 原本監査を独立実行：4PDFハッシュ、100正答、100画像のピクセル一致は通過。
- 各50問、全問`publicAllowed=false`、`lawReferenceDate=null`を確認。公開レジストリ・ExamCode・通常ローダーへの接続はありません。
- 問29の数値、問35の黄色、問47の改正内容を一次資料で確認しました。[厚労省](https://www.mhlw.go.jp/web/t_doc?dataId=74003000&dataType=0)、[クボタ](https://www.kubota.co.jp/product/johkasou/products/small/hs2/pdf/HSII_maintenance_manual_2104.pdf)、[環境省](https://www.env.go.jp/press/press_02611.html)
- 検証接続・専用テストを確認し、既存ログの`[staging] ... 100 questions`を確認。テストは再実行していません。型チェックは`tsc`不在で実行できず、成功とは扱っていません。

指定モデル`gpt-6-astra`での実行は、この応答から確認できていません。公開許可や報告書未作成はFAIL理由に含めていません。