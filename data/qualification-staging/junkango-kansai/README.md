# CQ6 准看護師試験（関西広域連合）

slug: `junkango-kansai`。COV1 B・候補4を根拠に、令和7年度（2026年2月1日）と令和6年度（2025年2月2日）の各150問を非公開で追加する。`year` は実施年、`fiscalYear` は年度を保持する。

全データは `publicAllowed=false`、公開レジストリに未接続。資格コードやライセンスを別の資格に偽装しない。`needsReview=true` は公開前の専門家による確認が残ることを表し、独立コードレビューの合否とは分ける。

公式の[過去問一覧](https://www.kouiki-kansai.jp/koikirengo/jisijimu/shikakumenkyo/junan_top/jyunkangosisiken/9838.html)から問題・正答PDF4件を通常GETで取得した。認証・CAPTCHA・ボット拒否の迂回は行っていない。取得できなかったPDFはない。受領URL、HTTP結果、サイズ、SHA-256は `source-receipts.json` に保存する。公式が示すPDF公開日と一律の法令基準日は確認できないため推定しない。

`2026-annual.json` と `2025-annual.json` は原文の本文・4肢・公式正答を保持する。ルビは本文の読みを重複させないよう検索用テキストでは省き、改行・空白を整形する。意味を持つ小字の添字・上付き数字は保持する。`assets/` の各問原本領域画像はルビ、図表、罫線、記号を含む。画像は `public/` の外に置く。画像と切出し位置・ハッシュの対応は `source-assets.json` に記録する。公式の問題・正答と独自解説を区別する。

令和7年度問6は公式正答表の `-` をそのまま保存する。全員正解は、医学的に全肢を正しいとみなすことではない。無回答も含めた採点上の特例として扱う。問139は `2・4` を保存し、2または4を単独選択した場合に正解とする。[公式の採点上の取扱い](https://www.kouiki-kansai.jp/koikirengo/jisijimu/shikakumenkyo/junan_top/jyunkangosisiken/9022.html)を各問に紐づける。

原本PDF・抽出草稿はコミット対象外。再取得後の抽出は `python scripts/junkango-kansai/extract.py --source-dir <一時PDFディレクトリ>`。このコマンドは本文データを再生成するため、独自解説の適用工程も再実行する。

独自解説の編集元は`explanations/2025.tsv`・`2026.tsv`。`python scripts/junkango-kansai/enrich.py`で全1,200肢を適用する。参照した一次資料は`explanation-references.json`、原問の用語・医学的注意点は`qa/editorial-notes.json`に記録する。URLを付けていない一般的説明を、個別の一次資料照合済みと主張するものではない。

`python scripts/junkango-kansai/audit_source.py --source-dir <一時PDFディレクトリ>`は独立のpdfplumber抽出で300問の文字の個数と空白を除いた文字順（ルビを除き意味のある小字を含む）、正答表300セルを検査する。計25,349文字と全正答セルが一致した。画像内の線画やルビの見た目はテキスト比較では検査できないため、原本画像の照合を併用する。

検証：`pnpm exec tsx scripts/validate-junkango-kansai.ts`、`pnpm exec vitest run __tests__/questions/junkango-kansai-staging.test.ts`、`pnpm validate:questions`、`pnpm typecheck`。全体検証は公開側の既存データ、専用検証はこの未公開300問を対象とする。

独立レビューは指定の`codex.cmd exec -m gpt-6-astra -s read-only`を別プロセスで2回実行した。初回は問88（2025年）の急性・遅発性悪心の区分に1件の指摘でFAILとなり、訂正・根拠資料・回帰テストを追加した再レビューはPASS。結果全文は`qa/astra-review-1.json`と`qa/astra-review-2.json`、実行条件と検証結果は`qa/verification.json`。PASSは未公開原稿としての受入れを意味し、専門家の公開前承認や権利許諾を代替しない。
