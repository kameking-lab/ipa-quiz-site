# 弁理士試験 短答式筆記試験（未公開）

CQ1・COV1 B 第5候補。2026・2025年度の各60問を対象とする。起点は origin/main の bb912dfd0494f7095ec5387f9f2e53f46381cd1f。

2026-11-04 に Windows PowerShell Invoke-WebRequest -UseBasicParsing の通常GETで公式掲載ページ2本と問題・正答PDF4本を200取得。ヘッダー変更、ログイン、CAPTCHA、ボット拒否の迂回はしていない。PDFのURL・バイト数・SHA-256は source-manifest.json。取得不能の対象問題・正答PDFはない。

一般利用規約・別紙の通常GETは202で本文0バイト、Web取得は403。検索インデックスのPDL1.0表示を本文確認の代用として権利処理済みとはしない。工業所有権法逐条解説の文章は転用しない。

公開ゲートは publicAllowed=false。公開試験コード、公開問題レジストリ、公開ルートへ接続しない。原本PDFは一時領域のみとし、本文・原ページPNG・正答転記・ハッシュを残す。

原文の転記と問題単位の独自解説草稿は feat/benrishi-local-20261103 の 3989c0f8f から活用し、今回取得したPDFから再抽出して照合する。全肢解説、図表保持、独立レビューをこのタスクで追加する。


## 完成データと検証

- `2025.json` / `2026.json`: 各60原問、原文の5選択肢、公式正答番号、全肢の独自解説、個数・組合せ設問の内部記述ごとの独自理由。
- `assets/`: 問題の全128本文ページと正答2ページ。図表、語群、空欄枠を原ページで保持する。2025年度特許19は表もテキスト化し、原表2ページを併記。
- `source-audit.json`: 生成器とは別ライブラリpypdfで119問の原文全字をNFKC・空白のみ正規化して一致確認。表形式の1問は原ページ目視照合を明示。
- `legal-sources.json`: e-Gov API v2の施行履歴と各試験日以前の最新施行版の本文・ハッシュ。2025年5月18日は参照日の作業前提であり、公式法令基準日の一次確認済みという意味ではない。2026年5月17日は受験案内表紙で試験日と適用基準を確認済み。
- `needsReview=true`: 人手の校閲完了をAIレビューで代替しない。全肢説明の存在と、公開許可・専門家校閲は別の状態として保持する。

通常の `validate:questions` は公開形式の既存データと分けて未公開120問を検証する。`--exam=benrishi` でも専用検証を実行する。試験コードを公開型へ追加しないため、公開形式の件数は0、未公開ステージングは120と別表示される。

```powershell
corepack pnpm validate:questions --exam=benrishi
corepack pnpm validate:questions
corepack pnpm typecheck
corepack pnpm exec vitest run __tests__/questions/benrishi-staging.test.ts __tests__/lib/exam-config-integrity.test.ts __tests__/questions/live-qualification-coverage.test.ts __tests__/seo/qualification-coverage-copy.test.tsx --maxWorkers=2
python scripts/ingest-benrishi.py PDF_DIRECTORY --check
python scripts/audit-benrishi-source.py PDF_DIRECTORY
```

PDF_DIRECTORYには通常GETで得た `2025-question.pdf`、`2025-answer.pdf`、`2026-question.pdf`、`2026-answer.pdf` を置く。再取得時はmanifestのSHA-256と照合する。本文再抽出にはPyMuPDF、独立照合にはpypdfを使用する。アプリ・Vitest検証はPythonやPDFを必要としない。

## 独立レビュー結果

指定のgpt-6-astraを別プロセス・read-onlyで6回実行し、FAIL指摘を修正後、実装コミット `efb78e7b08694151b6e41ee7c73b42327d96bcba` が未公開収録としてPASS。[レビュー結果](../../../reports/cq1-benrishi/review-r6.md)と[検証記録](../../../reports/cq1-benrishi/qa.json)を保存。公開許可・人手専門家校閲の完了を意味しない。
