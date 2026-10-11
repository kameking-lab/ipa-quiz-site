# 理容師 最新2回 完成原稿

第53回（2026-03-01）・第54回（2026-09-06）の筆記各55問、計110問を既存保存原稿から引き継いだ。問題・選択肢・正答を公式PDF全ページで照合し、全440肢の説明と7原図を用意した。`needsReview` は全問 false、内容保留は0問。

- [公式問題一覧](https://www.rbc.or.jp/exam/past_question/)
- [第53回 問題・赤丸正答](https://www.rbc.or.jp/wp-content/uploads/2026/03/53rhikki-1.pdf)
- [第54回 問題・赤丸正答](https://www.rbc.or.jp/wp-content/uploads/2026/09/54rhikki.pdf)

改行・ルビ・表や空欄の配置はWeb表示用に整理している。OCRとのバイト一致を原文照合の代用としていない。図版は保存済み公式クロップをそのまま使い、赤丸正答の混入がないことを目視した。

## 証跡

- `source-checks.json`：引継ぎ元、PDFハッシュ、110問の原本・正答・図の照合、日付別法令資料。
- `content-deltas.json`：保存原稿からの修正箇所。
- `content-snapshot.json`：完成数と保存ファイルのハッシュ。
- `image-crops.json`：7原図の出典ページ、SHA-256と寸法。
- `resolved-source-notes.json`：最後の2問の追加根拠。署名百科事典項目は二次資料と明示。
- `local-review.json`：難問だけの独立局所査読と制約。全量二重査読ではなく、新たな Opus 承認を意味しない。
- `duplicate-audit.json`：最新mainと全open PRの全ファイルをページ末尾まで確認した重複検査。
- `verification.json`：実行コマンド、結果、全体検査の失敗と分離再確認。

## 公開引継ぎ

保存増分110問、今回の公開増分0問。本番マージ・公開は統合主担当が担当する。

`data/questions/riyoshi/release.json` は `approved:false`、`reviewedQuestionIds:[]`。カタログは `ready-to-ingest`。公開読込はこの両方と各問 `needsReview:false` を検査する。統合主担当が最終受入れと掲載判断を記録して公開に進める際は、台帳の承認・対象110IDとカタログ状態を整合させる。

`RBC-attributed` は出典を表すラベルで、利用許諾取得の主張ではない。検査日を法令の公式基準日と偽る `lawReferenceDate` も追加していない。
