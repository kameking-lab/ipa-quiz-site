# 山口県 食品関係3資格・直近2回 監査（再開）

確認日: 2026-11-03 UTC。作業ブランチ: `claude/lucid-johnson-etmru0`。

3資格とも直近2回を未公開ステージングに追加済み。調理師120問、製菓衛生師132問、ふぐ学科37大問（200解答欄）。計452演習単位、1,883選択肢の独自解説。全回収録、除外0。監督役による独立レビューと公開判断は未実施。

## 根拠と取得

山口県生活衛生課の[各試験過去問について](https://www.pref.yamaguchi.lg.jp/site/syoku-anshin/320296.html)（2026-09-11更新）の保存済み公式一覧 `LISTINGS.json` と `COVERAGE.json` を確認。3資格とも令和8・7年が直近2回。調理師・製菓衛生師は「年度」、ふぐ処理師は「年」が正式表記。

今回は提供済み `/tmp/src-pdfs/yamaguchi-shoku/` の公式PDF全6件を使用し、全件でMANIFESTのSHA256と一致した。全PDFが問題・正答を同梱し、FAILED.jsonは空。旧報告の「0問・取得不可」は今回の取得済み原本による作業結果に更新する。サイト接続制限の迂回は行っていない。

|資格|対象回|公式PDF|今回の追加|
|---|---|---|---:|
|調理師（山口県）|令和8年度|[問題・正答247840](https://www.pref.yamaguchi.lg.jp/uploaded/attachment/247840.pdf)|60問|
|調理師（山口県）|令和7年度|[問題・正答221379](https://www.pref.yamaguchi.lg.jp/uploaded/attachment/221379.pdf)|60問|
|製菓衛生師（山口県）|令和8年度|[問題・正答247841](https://www.pref.yamaguchi.lg.jp/uploaded/attachment/247841.pdf)|66問|
|製菓衛生師（山口県）|令和7年度|[問題・正答221380](https://www.pref.yamaguchi.lg.jp/uploaded/attachment/221380.pdf)|66問|
|ふぐ処理師（山口県・学科）|令和8年|[問題・正答245007](https://www.pref.yamaguchi.lg.jp/uploaded/attachment/245007.pdf)|100解答欄（19大問）|
|ふぐ処理師（山口県・学科）|令和7年|[問題・正答213285](https://www.pref.yamaguchi.lg.jp/uploaded/attachment/213285.pdf)|100解答欄（18大問）|

## 重複確認と追加方式

作業前に `data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library` を検索し既存成果なし。originのclaude/*・qual/*・codex/*をライブ取得し、388ブランチ、257個の異なるdataツリーについてquestions・exam-library・qualification-stagingのパスを検索。同資格候補のパスなし。検索語はyamaguchi/shoku/chori/chouri/seika/fugu。任意の別名の全本文検索までは保証しない。ref一覧と6件の取得証跡は [evidence](./cloud-yamaguchi-shoku-evidence.json) に保存。

既存の資格台帳 `ready-to-ingest` と `isExamPublished` の方式で未公開登録。型・試験設定・資格名・SEO名・同期登録・遅延ローダー・数字選択肢表示を接続し、公開一覧と公開ルートでは既存ゲートで非公開とする。問題検証には未公開候補を明示的に含める。`data/exam-library/official-catalog.json` は別の公開用カタログなので追加しない。

調理師の内部コードは `yamaguchi-chori`、各60問・計120問、全480肢に独自解説。公式正答表（最終ページ）を画像でも照合。令和7年度問14の構成図と問58の対応表を必要部分だけ切出し、hasImage・代替文・本文テキストを保持。法令・制度は出題時点と明記する。除外0問。

## 権利・検証・引継ぎ

オーナーの権利確認済み決定を適用。[山口県サイト利用条件](https://www.pref.yamaguchi.lg.jp/soshiki/21/26951.html)の著作権に関する記述は記録のみとし、停止理由にしない。新たな許諾取得を主張していない。

`pnpm install` は成功（CI=true、キャッシュ・storeは/tmp）。問題検証・型検査・関連テストの結果は下記に記録する。build、デプロイ、push、PR作成は実行しない。独立レビューは依頼に従い作者から起動せず、監督役の別プロセス実施を待つ。公開ステータスの切替は行わない。

元ワークスペースの.gitは読み取り専用のため、前回同様 `/tmp/yamaguchi-local-git` をGitメタデータとして、このワークスペースをwork-treeに指定して資格ごとにコミットする。

調理師完成時: `pnpm validate:questions` は26,564問・失敗0・警告16,808（既存警告）。通常型検査は終了134のため指定の8GB上限で再実行し、`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` 成功。`yamaguchi-shoku`・`get-questions`・`home-directory`・`official-catalog-note-links` の4ファイル110テスト成功。


製菓衛生師の内部コードは `yamaguchi-seika`。各回の共通57問と和菓子・洋菓子・製パンの各3問、各66問・計132問を収録（実際の受験は選択1科目を含む60問）。原問58～60を科目別session・IDに分け、公式の番号を保持。全528肢に独自解説。令和7年度問17の構成図は当該PDFから切出し、本文にも分類を文字で保持。各科目の全公表問題を含め、除外0問。正答表27ページを画像照合した。

製菓衛生師完成時: `pnpm validate:questions` は26,696問・失敗0・既存警告16,808。8GB上限の型チェック成功。関連4ファイル113テスト成功。追加した科目sessionの演習ラベルとSEOラベルも接続し、専用データ・SEOの2ファイル16テストを追加確認して成功。


ふぐ処理師の内部コードは `yamaguchi-fugu`。令和8年19大問・100欄、令和7年18大問・100欄、計37大問・200解答欄を収録。演習用は原本の通し解答欄番号1～100をqNumberとし、元大問番号・科目・全文・全語群を保持する。200原大問という数え方はしない。全875選択肢の独自解説を付け、○×はア=○・イ=×で採点し、公式の○・×・カナは別途保存。対応付け・語群選択のカナの順序を保持する。令和8年の欄90～95は原本12ページから鑑別図を必要範囲だけ切出し、6分岐すべてをテキストでも保存。除外0大問・0解答欄、実技試験は依頼範囲外。正答表の令和8年13ページ・令和7年12ページを画像照合した。

原本の注意点: 令和7年欄8は厚生労働大臣（イ）が公式正答。原問・公表正答を採用した旨を解説に明記し、現行法への置換で正答を改変しない。令和8年欄12は旧規格基準設定権限・審議会の記述を×とする公式採点に合わせた。


ふぐ処理師完成時（3資格全体の最終検証）: `pnpm validate:questions` は26,896問・失敗0・警告16,808（既存分のみ）。`NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` 成功。専用データ・ローダー・資格一覧・公開カタログのリンク・SEOの5ファイル126テスト成功。短いふぐ解説に部位別判断や鑑別根拠を補記後、問題検証と専用テストを再確認。Git差分の空白検査も成功（既存CRLFファイルはcr-at-eol指定）。
