# 建築物環境衛生管理技術者・2026年度

第56回の午前は問1〜90、午後は問91〜180。既存年度に合わせ、IDは `biru-kan-2026-am-001`〜`090`、午後は `biru-kan-2026-pm-091`〜`180` とする。`exam=biru-kan`、`season=annual`、`session=gakka`、`category=am/pm`。問番号は午前・午後を通算する。

午前の公式問題PDF・正答PDFの取得先とハッシュを sources.json に保存。原本PDFとOCR下書きは実行フォルダ tools/q2-new-4/。午後は q2-new-5 で追加する。

未公開の作成データとして保存し、全180問の統合前に公開ローダーや年度範囲は変更しない。

## 午前の成果

- `am-questions.json`：90問、独自解説90件、選択肢別解説450件。公式の数字の選択肢1～5を既存データと同じア～オに対応付け、`officialAnswerNumber` に元の正答番号を保持。
- `am-review.json`：問ごとの原本ページ・原文ハッシュ、表18件、図2点の切出し位置とハッシュ、計算7問の再計算結果。
- `sources.json`：公式問題・公式正答PDFのURLとハッシュ、補足出典23件の取得記録。試験問題・公式正答を基本出典とし、補足がある設問は `officialReferenceUrls` で対応付ける。
- `images/`：問46の立方体、問73の送風機特性曲線を原本から直接切出し。公開用の画像登録は行っていない。

検証コマンド：`pnpm validate:questions --staging=biru-kan-2026-am`、`pnpm typecheck`、`pnpm exec vitest run __tests__/questions/biru-kan-2026-am.test.ts --maxWorkers=1`。

## 原本の疑義

問37の公式正答は5をそのまま保持した。肢3「地球磁場は時間によって変動しない」は国土地理院の公式説明と一致しないため、レポートに疑義として記載。原文・公式正答・正答の許容数は変更していない。

## 午後への引継ぎ

午前は `am-questions.json` と `am-review.json` に分離しており、午後の本文を含まない。午後は `pm-questions.json` 等で問91～180を保存できる。`official-answer-keys.json` は現在午前の90件のみ。午後を加える場合も通算問番号と `session=gakka` を維持する。manifest の午前・午後件数と、公開前の全180問の対応確認を更新する。
