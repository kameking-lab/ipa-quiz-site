# 1級管工事施工管理技術検定（第一次検定）追加監査

- slug: `sekou-1kankoji`、内部試験コード: `kankoji1`
- 作業ブランチ: `claude/bold-dirac-ypnxox`
- 確認日: 2026-11-03（UTC）
- 作者が直接実装。他のエージェント・codex exec・独立レビューは起動していない。push、build、デプロイは行っていない。

## 対象回・公式根拠

公式一覧 https://www.jctc.jp/mondai/ を再確認。令和8年度1級管工事施工管理技術検定「第一次検定」の問題A・B・正答肢が掲載されている。直近の年度は令和8年度、次の年度は令和7年度。掲載中の令和7年度1級管工事は「第二次検定」であり、今回の第一次検定の代替にはしない。

| 年度 | 原問数 | 追加数 | 除外・扱い |
| --- | ---: | ---: | --- |
| 令和8年度 問題A | 44 | 44 | No.1〜44を全件収録 |
| 令和8年度 問題B | 29 | 29 | No.1〜29を全件収録、正答訂正を反映 |
| 令和7年度 第一次検定 | 未確定 | 0 | 公式一覧で掲載終了、旧問題A・B・正答URLは404。第三者転載で代用しない |
| 合計 | 令和8年度73問 | 73 | 2回分の完備とは報告しない |

公式問題PDFの出典：

- A: https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907k_mondaia.pdf
- B: https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907k_mondaib.pdf
- 訂正後正答: https://www.jctc.jp/wjctcp/wp-content/uploads/2026/09/20260907k_seitou.pdf

取得済みPDFのSHA256をMANIFESTと照合。原本・取得記録・失敗記録を `docs/evidence/sekou-1kankoji-latest2/` に保存した。各問に問題PDF・正答PDFのURL、出典、加工内容を設定した。

| PDF | SHA256 |
| --- | --- |
| 問題A | bf7a011fc196d96879be5f35b44f70f67c6548b1f75be887a14ac5defe68c932 |
| 問題B | ed56f24c925ad680766350b199654d27f1f0b50d3d8e1ff5edd38dee22beaabf |
| 正答 | 41275e1e50a50ff648c397a667de865b9cf9a880bbd71342c253be9d9e20e698 |

令和7年度の取得不能URL（既存FAILED.jsonで全てHTTP 404）：

- https://www.jctc.jp/wjctcp/wp-content/uploads/2025/09/20250908k_mondaia.pdf
- https://www.jctc.jp/wjctcp/wp-content/uploads/2025/09/20250908k_mondaib.pdf
- https://www.jctc.jp/wjctcp/wp-content/uploads/2025/09/20250908k_seitou.pdf

## 実装・原本照合

`data/questions/jctc-first-2026.ts`、`kankoji2`、問題A/Bを分ける`zoen1`の既存構成に合わせ、JSON＋Question変換を追加。カタログを`ready-to-ingest`とし、同期・遅延読込・演習資格一覧への公開をゲートする。公開問題ライブラリ（data/exam-library）へは追加しない。監督役の独立レビュー・公開判断は別工程。

問題文と全292選択肢をテキストで収録した。ルビと改行を整理し、上付き・下付きの単位や指数、分数を原本表示と照合して復元（例：A6のm²、A22の10⁻³ m³/m³、A14の1/2、B13の1/8）。二列・三列の組合せはテキストの列順を保持し、列区切りを補った。B1肢4の不正確な提出先表現も原文のまま保持した。実出題だけを収録し、生成問題・類題は追加していない。

独自解説は全問・全選択肢に付与。法令・約款に関する解説には出題時点（令和8年度）の内容であることを明記した。原本図はA3・6・7・8・17・24、B2の7点を切り出し、hasImageとimageUrlsを設定。切出しページ・PDF座標・画像SHA256は `reports/sekou-1kankoji/figures.json`。

実試験の選択問題も欠落させず全問収録した。受検時の解答指定は、A1〜14必須、A15〜37のうち12問、A38〜44必須、B1〜9必須、B10〜21のうち10問、B22〜29必須。収録数73と実際に受検者が解答する60問を区別する。

### 訂正後正答

- B1：公式は2・4のどちらか1肢を認める。answer配列を「両方必須」と誤解しない設定にした。
- B22〜24・27〜29：公式の二肢を両方選ぶ必要がある。
- B25・26：公式訂正で、当初誤りとされたB25の3、B26の2を「適当でないもの」としない。訂正後表に載る正答集合は各問とも `[1]`、`[1,2]`、`[1,3]`、`[1,4]`。全肢を単純に許容する方式にはせず、acceptedAnswerCombinationsで集合を保持した。
- 原問題の「二つとも答えなさい」は保持し、公式訂正の注記を表示。二つの回答UIでは1〜2肢を選んで明示的に確定する。共通採点、採点API、AI解説の正誤判定、学習報酬検証も同じ集合を参照する。

全73問の公式正答マニフェストは `reports/sekou-1kankoji/official-answers.json`。原本正答ページを目視確認し、番号の連続性、全件の正答、B25・26の16通りの肢集合をテストする。

## 重複確認

ローカルのdata/questions、資格カタログ、data/exam-libraryに同資格の既存成果なし。originのclaude/*・qual/*・codex/*の388ブランチについて、別の読み取り用bare取得先で問題・ライブラリのツリーを調べ、kankoji1/1kankojiに一致する成果パスなし。さらに各ブランチの資格カタログ・公式問題ライブラリの異なる155個のblobをGitHub公式APIで直接読み取り、slug・内部コード・資格名の一致なし（読取失敗0件）。列挙結果と重複確認結果を証跡に保存。既存の2級管工事（kankoji2）は別資格として維持。

## 権利・転載表記

ユーザー指示のオーナー決定（2026-11-04 01:30）に従い、権利確認済みとして作業。公式一覧の著作権表示は「All right reserved. Copyright © 2023 Japan Construction Training Center.」。この文言は記録事項とし、過去のSTOP記録や転載条件を理由に作業を止めていない。ログイン・CAPTCHA・ボット拒否の迂回はしていない。

## 検証結果

- `pnpm install` 成功。環境のホーム領域が書込不可のため、Corepack・pnpmデータ・storeを/tmpへ指定して実行。
- `pnpm validate:questions`：全26,517問、ok=26,517、fail=0、warn=16,808（既存データの警告）。
- `pnpm validate:questions --exam=kankoji1`：73問、ok=73、fail=0、warn=0。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功。
- `pnpm exec vitest run` に対象ファイルを指定：6ファイル、1,097テスト成功。対象はkankoji1追加、JCTC既存データ、通常二肢選択、許容肢からの二肢選択、試験設定整合性、資格追加回帰。
- 画面操作でB25の単独1肢回答、B26の1を含む二肢と含まない二肢を確認。両回答UIの採点履歴まで照合。
- `git diff --check`：成功。
- `pnpm test -- ...` は引数転送が全件実行になったため中断し、対象を明示する `pnpm exec vitest run ...` で完了した。

## コミット環境

この実行環境は元リポジトリの `.git` を読み取り専用にマウントしている。通常のfetchは `cannot open '.git/FETCH_HEAD': Read-only file system` で失敗。通常の `git add` も `.git/index.lock: Read-only file system` で失敗したため、元ブランチのHEADは更新できない。

書込可能な別のGit領域 `/tmp/sekou-1kankoji-final.git` で、元のHEADを親として同名ブランチに変更をコミットし、`/tmp/sekou-1kankoji-commit.bundle` と `/tmp/sekou-1kankoji-commit.patch` に保存した。元作業ツリーには実装ファイルを残し、元.gitには書き込まない。レビュー後に監督役が権限のある環境へ取り込める形の成果物とする。pushは行わない。
