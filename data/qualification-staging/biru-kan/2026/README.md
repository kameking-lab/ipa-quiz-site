# 建築物環境衛生管理技術者・2026年度

第56回の午前は問1〜90、午後は問91〜180。既存年度に合わせ、IDは `biru-kan-2026-am-001`〜`090`、午後は `biru-kan-2026-pm-091`〜`180` とする。`exam=biru-kan`、`season=annual`、`session=gakka`、`category=am/pm`。問番号は午前・午後を通算する。

午前・午後の公式問題PDF及び正答PDFの取得先とハッシュを sources.json に保存。原本PDFとOCR下書きは実行フォルダ tools/q2-new-4/ と tools/q2-new-5/。

午前・午後の全180問を未公開データとして保存。公開ローダーや年度範囲は変更していない。

## 午前の成果

- `am-questions.json`：90問、独自解説90件、選択肢別解説450件。公式の数字の選択肢1～5を既存データと同じア～オに対応付け、`officialAnswerNumber` に元の正答番号を保持。
- `am-review.json`：問ごとの原本ページ・原文ハッシュ、表18件、図2点の切出し位置とハッシュ、計算7問の再計算結果。
- `sources.json`：公式問題・公式正答PDFのURLとハッシュ、補足出典23件の取得記録。試験問題・公式正答を基本出典とし、補足がある設問は `officialReferenceUrls` で対応付ける。
- `images/`：問46の立方体、問73の送風機特性曲線を原本から直接切出し。公開用の画像登録は行っていない。

検証コマンド：`pnpm validate:questions --staging=biru-kan-2026-am`、`pnpm typecheck`、`pnpm exec vitest run __tests__/questions/biru-kan-2026-am.test.ts --maxWorkers=1`。

## 原本の疑義

問37の公式正答は5をそのまま保持した。肢3「地球磁場は時間によって変動しない」は国土地理院の公式説明と一致しないため、レポートに疑義として記載。原文・公式正答・正答の許容数は変更していない。

## 午後の成果

- `pm-questions.json`：問91～180の90問、独自解説90件、選択肢別解説450件。建築物の構造概論15問、給水及び排水の管理35問、清掃25問、ねずみ・昆虫等の防除15問。
- `pm-review.json`：全90問の原本ページ・転記ハッシュ、組合せ表17件、計算2問の再計算結果。午後には切出しが必要な図はない。
- 問95・100・110はOCRの出力順を使わず原本の選択肢番号で照合。問118は管長100m、Q＝0.0143×H_L÷Δtを保持。問130の泥だまり150mm、問142・159の空欄も原本で補正した。
- `official-answer-keys.json`：午前90件・午後90件。午後はPyMuPDFとpypdfの独立抽出で90/90一致。
- `sources.json`：午後問題PDFの取得記録、午後着手直前の重複確認、厚労省マニュアル・e-Gov法令・環境省統計等の補足出典を追記。

午後の検証：`pnpm validate:questions --staging=biru-kan-2026-pm`、`pnpm typecheck`、`pnpm exec vitest run __tests__/questions/biru-kan-2026-am.test.ts __tests__/questions/biru-kan-2026-pm.test.ts --maxWorkers=1`。

## 統合への引継ぎ

午前・午後は本文とレビューを別ファイルに保存。manifest は合計180問・900肢解説・表35件・図2点・計算9問。原本画像が必要な午前2図は `images/` に保持している。

公開統合では既存2024・2025年度360問に2026年度180問を追加し、公開用の午前画像パスと年度範囲・件数を整合させる。現在の公開ローダーは360問のまま。午前問37の疑義は `am-review.json` と q2-new-4 のレポートに保存しており、公式正答5は変更していない。
