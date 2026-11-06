# 自動車整備5科目 前年度回（W2, 2026-11-06）

一級小型（筆記）・二級シャシ・三級２輪・電装の令和6年度第2回（2025-03-23）と、二級２輪の令和7年度第1回（2025-10-05）。
公開データは `data/questions/automotive/prior-sittings.json`（190問）と `prior-assets.json`（原問題ページ図）。

- `source-manifest.json`: 公式PDFのURL・取得日時・SHA256・ページ数（画像PDF、テキスト層なし）。
- `official-answers.json`: 公式正答PDFの転記（作者が拡大画像で転記、各レビュアーが画像から独立に再読）。
- `source-audit.json`: 回の選定根拠・取得方法・権利メモ。
- `review/`: 作者・レビュアー指示書、科目別の独立レビュー票、修正後の再レビュー票、作者の留意メモ。

既存の lq1b/lq1c 回収台帳とは独立。再生成時は `reviewed.json` 系スクリプトでこのファイルを上書きしないこと。
