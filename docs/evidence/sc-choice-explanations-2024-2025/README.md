# SC 2024・2025 全肢解説

情報処理安全確保支援士試験の2024年・2025年公開問題を対象に、正答肢と誤答肢の理由を個別に表示する。

- 対象: 220問・880肢
- 問題紙: 2024/2025 × 春/秋 × 午前I/午前II の8紙
- 紙ごとの件数: 午前I 30問、午前II 25問
- 独立査読: 220/220問（全問 `PASS`、未解消issues 0）
- 参照中の実Opus呼出し: 62バッチ
- 査読モデル: requested/canonical ともに `claude-opus-5-5`
- provider: `firstParty`
- 参照中modelUsage合計: input 524 / output 303,772 / cache read 40,504,338 / cache creation 3,119,757 tokens / $39.1364596
- 根拠: IPA公式問題PDF・公式解答PDFの取得内容をSHA-256で固定

`review-receipts.json` は問題入力、査読前候補、一次資料、受入後解説のhashと、実際の `modelUsage` を問題ごとに追跡する。午前Iと午前IIを同じ査読バッチに含めないことをテストで固定している。
