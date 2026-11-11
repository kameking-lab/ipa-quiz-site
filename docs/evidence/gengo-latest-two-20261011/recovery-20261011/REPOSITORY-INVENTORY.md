# 言語聴覚士 第27・28回 既存リポジトリ原本調査

調査日時: 2026-10-11 JST。対象は `source-manifest.json` の `missingIds` 393件のみ。既存原稿5件、27AM36/48（公式除外）、28AM35/83（保留）は対象外とした。

## 結果

対象393件に新しく対応する、取得元とSHAを確認できる公式原問題冊子・図表は見つからなかった。追加で回収できたIDは **0件**。393件の原文・選択肢・図表は引き続き未確認であり、公式解答400件から問題文を補完できない。

## 検索範囲と証拠

- `C:\Users\kanet\20260522\ipa-quiz-site` と、`C:\wt` の `ipa-` / `kakomon-` を含む関連checkout 107件、合計108 rootを調査した。
- 各rootの `data/raw_pdfs`、`data/questions`、`docs/evidence` のファイル名を走査した。`node_modules`、`.git`、`.next`、`apt-fixture-o0uwf4vc`、`.env`、`session` は除外した。
- `data/raw_pdfs` の直下に存在した資料群は `denko1` と `denko2` のみ。言語聴覚士の原本候補はなかった。
- manifest / receipt / source-intake 型のテキストメタデータ8,732件を対象資格名・識別子で調べた。該当は担当checkout内の `data/questions/gengo-chokakushi/source-manifest.json` と `docs/evidence/gengo-latest-two-20261011/SOURCE-INTAKE.json` の2件のみ。両者は既知の同一取得台帳で、追加の393件を含まない。
- 資格名を含むファイルは担当checkoutの `data/questions/gengo-chokakushi` と `docs/evidence/gengo-latest-two-20261011` の既存ファイルに限られた。`data/questions/st` および `docs/evidence/st-choice-explanations-2024-2025` はIPA ITストラテジスト用で、流用していない。

## 見つかった候補の判定

担当checkoutのmanifestにはMHLW公式PDF `28A14/35/69/83.pdf` と `27A36/40/48.pdf` のURL・HTTP 200・SHA-256が記録されている。7件のIDはいずれも今回の393件に含まれない。MHLW公式正答PDF `27seitou.pdf`・`28seitou.pdf` は正答400件の根拠だが、未収集393件の問題本文・図表を含む原問題冊子ではない。`OFFICIAL-SOURCE-RECHECK.json` の既存記録も、当時観察したMHLW/PMETページでは完全問題冊子リンクが見つからず、`fullPaperCountAcquired: 0` としている。

拒否済provider、個別STOP資料にはアクセスしていない。ネット取得、原稿生成、共有checkout編集、Git操作は行っていない。

次に必要なのは、393 IDに対応する第27・28回AM/PMの正規原問題冊子と図表について、取得元・receipt・SHAを備えた既存保存物または許可された一次資料の提示。今回の指定リポジトリ範囲からは得られなかった。
