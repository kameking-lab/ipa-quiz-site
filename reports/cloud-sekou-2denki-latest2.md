# 2級電気工事施工管理技術検定（第一次検定）直近2回

作業日: 2026-11-03 UTC。slug `sekou-2denki`、内部試験コード `denki2`。
現在の `claude/loving-brahmagupta-79ljqk` で作成。未公開ステージング。

## 対象回と根拠

一般財団法人建設業振興基金の[検定問題・正答肢一覧](https://www.fcip-shiken.jp/about/index.html#section04)の取得済み記録を確認した。令和8年度2級電気工事第一次検定の前期と、令和7年度後期へのリンクが掲載されている。取得済み一覧と日程一覧の記録は `sekou-2denki/official-listings.json` に保存した。
令和8年度後期は2026-11-08予定で、作業日時点では未実施のため対象に含めない（TASK指定と取得済み公式一覧に基づく）。

| 回 | 試験日 | 公式問題・正答PDF | 追加問数 | 正答ページ | 図 |
| --- | --- | --- | ---: | ---: | ---: |
| 令和8年度前期 | 2026-06-14 | https://www.fcip-shiken.jp/pdf/r08_2dgz_mondai.pdf | 62 | PDF 26ページ | 7 |
| 令和7年度後期 | 2025-11-09 | https://www.fcip-shiken.jp/pdf/r07_2dg_mondai.pdf | 62 | PDF 29ページ | 14 |

合計124原問、504選択肢と全肢解説、21図。試験では62問から40問を解答するが、選択問題も全て収録する。各回No.37〜40は五肢択一、それ以外は四肢択一。第二次検定は対象外。
収録対象内の除外・保留は0問。類題・生成問題は収録していない。解説は独自作成。

## 出典と照合

取得済み `/tmp/srcpdf/sekou-2denki/` の公式PDFを利用し、取得し直していない。
SHA256は提供されたMANIFESTと一致する。

- r08_2dgz_mondai.pdf: `3d0418240791dde75619d02fde747e0a9d7080b8641f9cbb3b88c07f037478ac`
- r07_2dg_mondai.pdf: `1821e17cf358c3057b7fae9b15f3f8bd9ec6c80ce48ec3cca66036acc3ec1a35`

通常のpdftotextはAdobe-Japan1マッピング不足で本文を欠落させるため、PyMuPDFで本文を抽出した。フォントサイズでふりがなを除外し、本文・選択肢をテキストとして保存。数式の添字・上付き、表の列対応、空欄、図の選択肢は原本表示で確認・補正した。図は必要な領域を公式PDFから切り出し、hasImage/imageUrlsを設定。図だけの選択肢には識別用テキストを付記している。原図と座標・画像SHAは `sekou-2denki/figures.json` に記録。

正答表の問題番号と正答番号をPDF内の座標で対応付け、全124問をJSONの正答と自動照合した。結果は `sekou-2denki/source-check.json`。原文抽出記録は `r07-extract.json` / `r08-extract.json`、作成した全肢解説は `explanations-2025.txt` / `explanations-2026.txt` に保存。
法令・規程・規格を扱う解説には出題時点であることを明記した。

令和7年度後期No.9は公式正答4を保持。「周囲温度からの影響を受けやすい」を不適当とする試験上の整理に加え、実機の高温劣化と放熱の必要性も説明し、無条件に温度影響がないとはしていない。

公式一覧には「本サイトに掲載されている記事・写真・図表などの転載を禁じます。」の文言がある。TASKのオーナー決定（2026-11-04 01:30、依頼資格は権利確認済み）を適用し、停止理由にしていない。内部権利区分は `FCIP-owner-confirmed`。サイトが一般向けに転載許可していると主張するものではない。

## 重複確認と登録

作業前に `data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library` を検索し、この資格・対象回の既存収録は見つからなかった。
`git ls-remote --heads origin 'claude/*' 'qual/*' 'codex/*'` で388参照を確認し、同資格名の候補ブランチはなかった。確認した参照は `sekou-2denki/remote-heads.txt` に保存。ただし、`git fetch origin` は `.git/FETCH_HEAD` が読み取り専用で失敗し、未取得の全リモートブランチ内のファイルまでは検査できていない。制限を迂回していない。

類似のkankoji2/civil2と同じJSON・Questionアダプタ方式。資格カタログは `ready-to-ingest`。QUESTIONS_BY_EXAM、遅延ローダー、ALL_QUIZ_EXAM_CODESは既存の `isExamPublished` ゲートを適用し、公開演習に出さない。IPA試験集合からも除外。資格一覧のslugは `sekou-2denki`。公式資料リンクと構造化データの出典団体も登録。

## 検証

通過:

- `PYTHONPATH=/tmp/sekou-python python reports/sekou-2denki/verify-source.py`: 全124正答一致、全504肢解説、図21件、出典URLとPDF SHA。
- `node reports/sekou-2denki/verify-runtime.cjs /opt/node22/lib/node_modules/typescript`: 変換後124問、選択肢・全肢解説、図件数、カタログ・試験設定・遅延ローダーの未公開ゲート。
- 既存環境のTypeScriptによる対象限定の型確認: 問題アダプタ、Question型、資格カタログ、試験設定。変更したTypeScriptの構文確認も通過。これはプロジェクト全体のpnpm typecheckではない。
- `git diff --check`。

起動できなかった検証:

- `pnpm install`
- `pnpm validate:questions`
- `pnpm typecheck`
- `pnpm exec vitest run __tests__/questions/denki2-latest2.test.ts __tests__/lib/exam-config-integrity.test.ts`

上記はいずれもCorepackが `/root/.cache/node/corepack/v1` を作成できず `ENOENT` で停止した。依存パッケージ導入・pnpm標準検証は未完了。キャッシュ先変更や別パッケージマネージャへの切替で制限を迂回していない。回帰テストは `__tests__/questions/denki2-latest2.test.ts` に追加したが、Vitestでは未実行。

build・デプロイ・Vercel・push・独立レビューは実行していない。独立レビューは指定どおり監督役が別途行う。

## 残件

- `.git` 書き込み制限のない実行環境で、リモート枝内の重複確認を完了する。
- pnpm install後、validate:questions・typecheck・関連Vitestを実行する。
- 監督役による独立レビューと公開判定。
- 作成差分と本報告のコミット（結果は下に記録）。pushは呼び出し元監督役が担当する。

コミット結果: 未完了。対象ファイルを指定した `git add` が `fatal: Unable to create '/home/user/ipa-quiz-site/.git/index.lock': Read-only file system` で失敗した。ステージングできないためコミットは実行できない。別のGIT_DIR、代替インデックス、別クローン等の迂回はしていない。全差分は作業ツリーに保存済み。
