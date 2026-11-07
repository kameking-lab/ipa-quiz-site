# LQ3B 作業報告（2026-11-04）

今回の採用は3回105問・525肢解説。全体目標19回665問のうち、残り16回560問は未制作・未接続。40分の区切りで継続できる状態を保存する。権利や過去の取得STOPを理由に中断していない。

- worktree: `C:/Users/kanet/20260522/wt-LQ3`
- branch: `qual/LQ3-20261104`
- 起点: `bbd229e32`（前回LQ3最終コミット）
- オーナー決定: 2026-11-04 01:30「今ダッシュボードに出ている資格は全て権利問題ないので止めるな」。本実行は通常アクセスのみ。push・PR・デプロイは未実施。

## 採用済み

| 部門 | 年度 | 問題数 | 全肢解説 | 正答一致 |
|---|---:|---:|---:|---:|
| 衛生工学 | 2025 | 35 | 175 | 35/35 |
| 衛生工学 | 2024 | 35 | 175 | 35/35 |
| 情報工学 | 2024 | 35 | 175 | 35/35 |

衛生工学と情報工学は2025・2024の直近2回になった。前回から2回分ある森林も維持。技術士専門科目の接続総数は17部門・20回700問（採点699、情報2025 Q25の参照専用を維持）、全3,500肢解説。

新規105問は問題文・選択肢をテキスト優先で作成し、数式・表も可能な限り文字で保持。情報2024 Q24は選択肢自体が因果ループ図なので公式原問画像を使用。その他の必要な木構造・フロー・UML・コード等を公式ページ画像で保持。衛生2025 Q2は必要な図のみ切り出し、代替テキストも付けた。

情報2024 Q32はNISTの2024年8月第2公開草案と照合し、2025年最終版との要件の違いを明記。Q11は公式正答①を維持しつつ、広義のADASにはレベル0の警報・一時的支援も含まれることを補足。

## 原稿の再利用と取得

前回LQ3の17回の本文・正答・画像・解説は作り直していない。既存公式正答PDF（2024/2025）を再利用。Documents/Codex配下のqual-new関連619 JSONを年度属性まで調べ、対象2024年度の既存問題稿は森林以外には見つからなかった。探索記録は `reports/LQ3B-20261104/existing-payload-year-search.json`。

追加対象19回の公式問題PDFはすべてHTTP 200で通常取得できた。取得不能PDFは**0件**。Claudeによるブラウザ補完が必要なPDFは今回なし。正答PDF2件と問題PDF19件、出典URL・SHA256を保存済み。全19回362ページのOCRも保存済み。ただし未制作16回のOCRは未校正の作業用であり、採用済みとは扱わない。

- 公式問題索引: https://www.engineer.or.jp/c_categories/index02021.html
- 2025公式正答: https://www.engineer.or.jp/c_topics/004/attached/attach_4106_4.pdf
- 2024公式正答: https://www.engineer.or.jp/c_topics/004/attached/attach_4106_5.pdf
- 各問題PDFの正確なURL・ローカル保存先・SHA256: `reports/LQ3B-20261104/acquisition.json`
- 取得不能一覧: `reports/LQ3B-20261104/unavailable-pdfs.json`（空配列）
- 年度・部門別の採用/残件: `reports/LQ3B-20261104/continuation-plan.json`
- 校正済み稿: `reports/LQ3B-20261104/manuscripts/`
- 採用ハッシュ・画像ハッシュ: `reports/LQ3B-20261104/adoption-manifest.json`
- 原本: `reports/LQ3B-20261104/sources/`
- 未校正OCR: `reports/LQ3B-20261104/YYYY-DD-sorted.txt`
- 画像・座標付きOCRのローカルキャッシュ: `reports/LQ3B-20261104/rendered/`（Git対象外）

## 検証と独立レビュー

- `corepack pnpm validate:questions`: 26,444問、fail=0、既存warn=16,808。native問題用コマンドなので、LQ3Bの105問は以下の専用テストと原本照合で別途確認。
- `corepack pnpm typecheck`: 成功。最終修正後の結果は `typecheck-final.log`。
- 関連Vitest: 10ファイル68テスト成功（`tests-related.log`）。
- レビュー指摘修正後: 5ファイル38テスト成功（`tests-final.log`）。Pythonの字下げ保持・原本コード表示・ADAS補足の回帰検証を含む。
- 独立レビューは必ず `C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only` を使用。
- 第1票 `astra-review-1.md`: 全50ページを目視し、105問の本文/選択肢/ページ対応、525肢解説、独自抽出した公式105正答との一致、全50ページPNGの原本再描画との画素一致、前回LQ3不変を確認。FAILの必須2件はPython字下げ表示とADAS用語注記。
- 上記2件は修正済み。最終再レビュー票 `astra-review-final.md`: **PASS**（採用済み3回105問・525肢の範囲）。2件の修正、公式105正答の再抽出一致、原稿・採用データ・PDF・画像51点のハッシュ一致を独立確認。独立側も `tsc --noEmit --incremental false` を終了コード0で完了。全体19回の完成を意味しない。

## 残件と再開

2024年度の追加が残る14部門: 航空・宇宙、電気電子、化学、繊維、金属、資源工学、上下水道、農業、水産、経営工学、応用理学、生物工学、環境、原子力・放射線。船舶・海洋は2025・2024の2回とも未制作。合計16回560問・2,800肢解説が残る。

1. `git -C C:/Users/kanet/20260522/wt-LQ3 status --short` と本報告を読む。
2. `continuation-plan.json` の `source-cached-manuscript-pending` から部門を選ぶ。例: 資源工学2024は `sources/2024-08.pdf`、OCRは `2024-08-sorted.txt`、公式キーは `official-keys-2024.json` の `8`。
3. 原本と照合して `manuscripts/pe-first-<slug>-<year>.json` を完成させる。必要項目はnumber/page/answer/summary/reasons[5]、可能ならtext/choices[5]、図が必要ならhasFigure。情報Q24のような図選択肢は画像表示を使う。未校正OCRを直接接続しない。
4. `python scripts/import-lq3b.py <year> <公式部門番号>` で完成35問だけ接続。既存LQ3を再取込する `scripts/import-lq3-manuscripts.py` は実行しない（新しいカタログを上書きするため）。
5. 本文/全肢/図/35問/公式正答/出典を確認し、専用テスト・typecheck・validate:questionsを実行。指定CLIのAstraで独立受入まで修正し、部門ごとにコミットする。
6. 自作LQ3B稿を修正した場合だけ `--refresh` を使う。既存稿の再制作には使わない。校正済み稿を再生成用prepareスクリプトで不用意に上書きしない。

PDF/OCRキャッシュを再作成する場合は `python scripts/prepare-lq3b-sources.py`、ローカルの `scripts/ocr-lq3b.ps1 -ImageDirectory <renderedの絶対パス>`、`python scripts/prepare-lq3b-sources.py --collect-ocr`。通常のローカルOCRを使い、実行ポリシー変更・取得制限迂回はしていない。

## コミット

- `012eca23f` 公式問題PDF19件・正答2件・検証キー・取込補助
- `e2b96fa4a` 衛生工学2025の35問を接続
- `a3f4bf89e` 衛生工学2024の35問を接続
- `53ef6f3d8` 情報工学2024の35問を接続
- `3f88fc66c` 独立レビュー指摘2件を修正、字下げ・原本画像・ADAS注記の回帰テスト
- `9ff97907c` 全19回362ページのOCR・残件一覧・検証ログを保存
- `36b197b18` 最終受入票・本報告を保存。ログのUTF-8整形等の最終整理は後続コミット。

開始時から残っていた前回LQ3のAGENTS.md・未追跡ログ等には手を加えていない。本実行の大きなrenderedキャッシュと詳細ログは.gitignoreで区別し、最終検証ログ・校正済み稿・原本PDF・OCR本文・受入票をコミットに残す。秘密値を出力していない。追加差分限定の秘密値形式検査も該当0件（`secret-pattern-check.json`）。

01:30 JST着手。02:05 JSTに独立再レビューPASSを確認。最終コミット時刻・状態は `git log -1` と `git status --short` で確認できる。
