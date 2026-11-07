# 高圧ガス製造保安責任者 甲種機械・乙種機械（未公開）

令和7・6年度の国家試験180原問。甲種80問（択一70・記述10）、乙種100問（択一100）。資格別に `khk-kikai-kou/questions.json` と `khk-kikai-otsu/questions.json` へ分離。

全問 `publicAllowed=false`・`needsReview=true`。公開レジストリには未接続。資格台帳の `ready-to-ingest` は公開を意味しない。独立レビューと公開判断は監督役へ引き渡す。

- `official-verification.json`：直近2回の公式根拠、転載禁止文言、取得結果、origin調査記録。
- `official-sources.json` / `sources/`：公式16PDFのURL・SHA256・ページ数とPDF及び抽出テキスト。
- `official-answers.json`：機械の科目別公式正答170件と原表の該当行。
- `manifest.json`：科目・年度別件数、整形内容、公開時の残作業。
- `figures.json` / `figures/`：入力図6点の原本・ページ・切出し位置、公式解答例から切り出した令和6年度甲種学識問1(1)の解答図1点、独自の解答用SVG1点。

`imageUrls`・`answerImageUrls` はこのディレクトリからの相対パス。public配下には配置していない。図がある問も問題文はテキスト。記述式の `modelAnswer` は独自記述で公式例と照合済み。小問別の公式配点は不明なので採点基準は学習用の確認方針を示す。

検証はリポジトリの `pnpm validate:questions` に組込み済み。対象だけなら `pnpm validate:questions --exam=khk-kikai`。新規の収録・公開設定破損検出テストは `pnpm exec vitest run __tests__/questions/khk-kikai-staging.test.ts`。

作者監査の詳細：[reports/cloud-khk-kikai-latest2.md](../../../reports/cloud-khk-kikai-latest2.md)。
