# マンション維持修繕技術者（iji-shuzen）直近2回の監査

確認日：2026-11-03。オーナー決定（2026-11-04 01:30、権利確認済み）を適用。

## 対象と追加数

[公式試験ページ](https://www.kanrikyo.or.jp/iji/siken.html)の「過去の試験問題・合格基準点 等」を再確認。2026年度は受験案内のみで、問題・正答の掲載はなく、公開済みの直近2回は第25回・第24回だった。

| 資格 | 対象回 | 公式問題 | 公式正答 | 追加数 |
| --- | --- | --- | --- | --- |
| マンション維持修繕技術者 | 第25回・2025年度（9月実施） | [問題](https://www.kanrikyo.or.jp/iji/iji_R07/2025mondai.pdf) | [正答](https://www.kanrikyo.or.jp/iji/iji_R07/2025seikai.pdf) | 択一45＋記述2＝47問 |
| マンション維持修繕技術者 | 第24回・2024年度（9月実施） | [問題](https://www.kanrikyo.or.jp/iji/iji_R06/2024mondai.pdf) | [正答](https://www.kanrikyo.or.jp/iji/iji_R06/2024seikai.pdf) | 択一45＋記述2＝47問 |

**追加は合計94原問。除外0問、取得できなかった対象PDFは0本。** 問題冊子の表紙に各47問と明記され、各年度の問1～47を欠番・重複なく保持。記述の回答欄は各年度3欄だが、問46を分割せず、原問数で計数した。2026年度は問題・正答未公表のため対象外。第23回以前は直近2回の範囲外。

前回は通信障害で導入0問だった。今回は前回レポートと対象回を引き継ぎ、通信復旧後に再確認・収録した。

## 重複調査

- 開始時の作業ツリーはクリーン。作業ブランチは `claude/awesome-bohr-5b3jqe`。
- `data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library` を資格名・slugで確認し、既存成果なし。
- `git ls-remote --heads origin 'claude/*' 'qual/*' 'codex/*'` で372ブランチを取得。一時チェックアウトへ全対象参照をfetchし、一覧に記録した372個のブランチ先端SHAそれぞれについて、上記3箇所を `git grep` で確認した。終了コードは全件1（該当なし）、読取失敗0件。同資格・同回の既存成果なし。
- ブランチ先端一覧のハッシュと参照数は `reports/iji-shuzen-source-audit.json` に記録した。作業開始後のorigin更新までは保証しない。

## 原本と正答の照合

- 公式の問題2本・正答2本を取得。PDFのSHA-256と全90択一問の正答番号、記述4問の正解例を `reports/iji-shuzen-source-audit.json` に保存した。
- 択一90問は問題文・全360選択肢をテキスト化し、PDF抽出テキストと照合。別のXML抽出でも本文の文字列を照合し、ルビ・傍点・改行・空白の除去による欠落を点検した。
- 2025問12は平方根・二乗・立方根の組版を `√t`・`t²`・`∛t` に転記。2025問40の抽出に残る「企画」・孤立した「規格」は原本画像の「規格委員会」に復元。2025問24の選択肢4後半はPDF抽出の読み順が逆転するため、原本の順序に復元した。抽出で欠落した2024問45「るもの」、2025問2「との」も原文に復元した。
- 正答は各公式正答表の45問全てと照合。公式番号1～4を内部キーのア～エへ順番どおり対応付け、画面の注意書きで対応を明記した。
- 記述問46・47は、指定語句・字数・解答欄の印刷済み前置き・確認事項を保持。公式正解例を `modelAnswer` に収録し、独自解説と自己採点基準を付けた。例の字数が「程度」の目安から多少異なる箇所も、公式例を改変して合わせていない。
- 両問題冊子の全ページを画像でも確認。設問に必要な図・写真はなく、記述欄のマス目のみなので、94問とも `hasImage: false`。マス目をテキストの解答欄表示に置換し、印刷済み文言を保持した。本文を画像だけにした問題、類題・生成問題はない。
- 各問に問題PDF（該当ページ指定）・正答PDF・協会の出典表記を付与。全360肢に独自解説を付け、数え上げ・組合せ問題では各肢の成否も説明した。
- 法令・制度は出題時点のものと各問で明記。表紙に従い、2025年度は2025-04-01、2024年度は2024-04-01を基準日として保持した。

## ステージングと利用条件

- 同協会の管理業務主任者 `data/questions/kanri` と、未公開候補を検証する既存方式を調査し、`data/questions/iji-shuzen/{2024,2025}.json` と `index.ts` に登録した。
- 資格カタログの状態は `ready-to-ingest`。既存の `status === "live"` による公開判定を使い、資格一覧、静的ルート用一覧、eager/lazy問題取得、横断問題群に未公開データが出ないようにした。将来の公開切替に必要な試験コード・設定・日本語ラベル・SEO名称と説明も登録した。
- 検証スクリプトには未公開の94問も明示的に含めた。別系統の `data/exam-library` には重複登録していない。
- [協会の利用条件](https://www.kanrikyo.or.jp/kanri/pdf/kakomonshiyou.pdf)は著作権の帰属、教育目的等での許諾・使用料不要、出典明記、改変時の表示、PDF以外の電子データ提供不可を定める。オーナーの権利確認済み決定に従い、これらを理由に収録を中止していない。選択肢表示の対応と記述マス目のテキスト置換は各問の注意書きに表示した。

## 検証と独立レビュー

- `COREPACK_HOME=/tmp/iji-shuzen/corepack npm_config_store_dir=/tmp/iji-shuzen/store pnpm install --frozen-lockfile`：pnpm 10.33.0で成功。ロックファイル変更なし。既定のCorepack/pnpmキャッシュ先は書込不可だったため、書込可能な一時ディレクトリへ変更した。
- `pnpm validate:questions`：全26,538問、ok=26,538、fail=0。既存データの警告16,808件は残る。追加分だけの `--exam=iji-shuzen` は94問、fail=0、warn=0。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功。初回に検出したSEO説明辞書の資格コード不足を修正して再実行した。
- `pnpm exec vitest run __tests__/questions/iji-shuzen.test.ts __tests__/lib/exam-config-integrity.test.ts __tests__/questions/qualification-expansion.test.ts`：3ファイル・1,075テスト合格。原問数・公式正答・全肢解説・記述例・数式と選択肢の復元・未公開の一覧と取得遮断を確認。新規テストの初回は15字の説明に対する最小長検査で失敗したため、当該説明を具体化して再実行した。
- `git diff --check`：成功。
- 初回の `pnpm test -- ...` は引数区切りにより全体スイートを起動したため途中で停止し、上記の `pnpm exec vitest run` で関連3ファイルを指定し直した。全体テストスイートの完走・合格は主張しない。
- 指定の `codex exec -m gpt-6-astra -c model_reasoning_effort=medium -c sandbox_workspace_write.network_access=true -s workspace-write --skip-git-repo-check` を使用して独立レビューを実施。書込可能な `CODEX_HOME` を指定。WebSocket接続失敗後、CLIのHTTPSフォールバックで推論は成功した。
- 入れ子sandboxのローカルファイル読取は `app-server socket directory must be a user-owned directory with mode 0700` で失敗したため、公式PDFの抽出テキスト4本、登録JSON94問、変更差分、テストを標準入力で全て渡した。別Codexはツールを使わず全94問・360肢・公式正答・記述例を独立照合した。画像照合・URL到達性・テスト実行は本作業側が担当しており、独立レビュー側が実行したものとはしていない。
- 初回は本文の復元1件、具体性不足の解説4件、参考図書への未確認の出典断定1件が指摘された。原本画像で2025問40の「日本電気技術規格委員会」を確認し、ノンシール工法、ガス管資産区分、石目地用シーリング材、連結送水管の放水用器具について修正・補足。ガス管・シーリング材・消防設備は事業者・国交省・消防庁の一次資料でも確認した。
- 同じ指定モデルで修正後の全94問を再レビューし、**PASS・追加指摘なし**。初回と再レビューの全文は `reports/iji-shuzen-independent-review-1.md` と `reports/iji-shuzen-independent-review-2.md` に保存した。

## コミットと禁止操作

元の `.git` は環境の権限設定で読み取り専用（fetchは `.git/FETCH_HEAD` 作成時に失敗）。そのため書き込み可能な `/tmp/iji-shuzen-work` に同じ開始コミットから一時チェックアウトを作成し、origin確認と最終コミットを行う。元の作業フォルダにも全変更を反映する。コミット先のブランチは `codex/iji-shuzen-latest2`。再適用用Git bundleは `/tmp/iji-shuzen-latest2.bundle` に保存する（開始コミットを前提とする差分bundle）。元フォルダの `.git` へは書き込めないため、元フォルダは変更ファイルとして残る。

`pnpm build`、mainへのpush、その他のpush、PR作成、デプロイは実行していない。秘密値はレポート・ログ出力に含めていない。
