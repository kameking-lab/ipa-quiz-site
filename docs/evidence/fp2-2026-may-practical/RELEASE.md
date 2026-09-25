# FP2級 2026年5月公表 実技（資産設計提案業務）

## 出典と範囲

- 公開元：[日本FP協会の試験問題・模範解答](https://www.jafp.or.jp/exam/mohan/)。2026年5月欄の実技[問題PDF](https://www.jafp.or.jp/exam/mohan/files/j2_202605_q.pdf)と[模範解答PDF](https://www.jafp.or.jp/exam/mohan/files/j2_202605_a.pdf)を別々に取得。
- PDFのSHA-256、ページ数、収録件数は `manifest.json` に固定。設問40/40、公式模範解答40/40。学科60問とは別の実技導線に表示する。
- [協会の利用条件](https://www.jafp.or.jp/exam/mohan/files/exam_riyou.pdf)に従い、各ページで出典、加工（改行・空白・図表の切り出し）、原典リンクを表示する。実技のPDFには全問共通の法令基準日の記載がないため、学科セットの日付を流用しない。
- 本文は選択可能なテキスト。レイアウトが意味を持つ図表のみ38パネルを原典からWebPに変換。問8の道路幅と問38の出勤日を含む図版は自動検出の切り出し不足を手動で補い、完全な範囲を採用した。原図ラベルのPDF抽出結果が文末に紛れ込む問23・24・26・38は、図版を残したうえで冗長なラベル列を除去した。

## 解説の検収

- `claude-opus-5-5` 明示のClaude CLIで10問ずつ4バッチをレビュー。各バッチの実応答receiptは `opus-batch-01-receipt.json` から `04`。4件とも `modelUsage["claude-opus-5-5"].canonicalModel = claude-opus-5-5`、`provider = firstParty`、出力トークンあり。
- 問38は四択組合せに対して小問別の理由しかなかったため、追加のOpus実応答 `opus-q38-correction-receipt.json` で1～4の全肢理由へ補完した。
- `fp2_2026_practical_apply_reviews.py` が回答番号・公式解答文字列・出典ページ・全肢理由・モデルreceiptを確認。`review-coverage.json` は40問レビュー、40問承認、保留0。計算問題は式と単位、○×や複数空欄は小問ごとの理由を表示する。
- 国の資料への根拠URLは32件の一意リンクをHEADで確認し、すべてHTTP 200。結果は `government-links-check.json`。公式模範解答そのものへのリンクは全問に別途設置する。

## 公開後の確認対象

- `/fp2/practical` は5セット200問、`/fp2/practical/202605` は40問。
- 問1、問8（完全な敷地図）、問23・24（関係図）、問38（出勤カレンダーと全4肢理由）、問40の匿名ページを開き、正答、PDFリンク、画像と390px画面を確認する。
- 主ページ `/fp2` と `/qualifications` で学科と実技の件数が混ざっていないことを確認する。
