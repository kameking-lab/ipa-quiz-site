# マンション維持修繕技術者（iji-shuzen）直近2回の導入前監査

確認日：2026-11-03

## 結果

**未完了・導入保留。追加0問。** 公式出典と利用条件は確認できたが、実行環境の通信障害により origin の最新ブランチ確認を完了できなかった。重複確認を完了した扱いにはせず、問題本文・資格登録・ルーティングは追加していない。転載禁止や公式問題の非公開を理由とする除外ではない。

## 対象回と根拠

公式の[試験ページ](https://www.kanrikyo.or.jp/iji/siken.html)の「過去の試験問題・合格基準点 等」で、問題・正答の掲載順と回次を確認した。2026年度の受験案内は掲載されているが、同年度の問題・正答へのリンクは確認できず、公開されている直近2回は次のとおり。

| 資格 | 対象回 | 公式問題 | 公式正答 | 公称問数 | 今回の追加 |
| --- | --- | --- | --- | --- | --- |
| マンション維持修繕技術者 | 第25回・2025（令和7）年度・2025年9月実施 | [問題PDF](https://www.kanrikyo.or.jp/iji/iji_R07/2025mondai.pdf) | [正答PDF](https://www.kanrikyo.or.jp/iji/iji_R07/2025seikai.pdf) | 択一45問＋記述2問＝47問 | 0問 |
| マンション維持修繕技術者 | 第24回・2024（令和6）年度・2024年9月実施 | [問題PDF](https://www.kanrikyo.or.jp/iji/iji_R06/2024mondai.pdf) | [正答PDF](https://www.kanrikyo.or.jp/iji/iji_R06/2024seikai.pdf) | 択一45問＋記述2問＝47問 | 0問 |

両問題PDFの表紙にそれぞれ47問と明記されている。対象は計94原問であり、記述式4原問も対象に含む。全ページの転記・設問単位の突合は未実施。法令基準日は表紙に従い、2025年度は2025-04-01、2024年度は2024-04-01とする必要がある。

## 利用条件

試験ページの「過去問の使用について」がリンクする[協会の使用条件PDF](https://www.kanrikyo.or.jp/kanri/pdf/kakomonshiyou.pdf)を確認した。著作権は協会に帰属し、教育目的など試験制度の意義に反しない利用は許諾・使用料不要とされている。出典の明記が必要で、問題の一部を改変した場合はその旨を明記する。確認した利用条件は転載・複製を一律に禁止していない。

## 既存成果の確認

- 作業開始時のワークツリーはクリーン。現在の作業ブランチは `claude/awesome-bohr-5b3jqe`。
- `data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library` を `iji-shuzen` と正式資格名で検索し、該当なし。
- `git branch -r --list 'origin/claude/*' 'origin/qual/*' 'origin/codex/*'` で手元に存在する該当参照は `origin/claude/awesome-bohr-5b3jqe` のみ。その参照の上記3箇所も `git grep` で検索し、該当なし。
- 最新の一覧取得として `git ls-remote --heads origin 'claude/*' 'qual/*' 'codex/*'` を試行したが、設定済みプロキシへの接続失敗で終了した。プロキシを使わない接続も `Could not resolve host: github.com` で失敗。Web経由のブランチ一覧取得も失敗した。
- したがって、**手元の参照には既存成果が見つからなかったが、origin 全体の最新状態における重複なしは未確認**。同資格の既存成果を発見したための中止ではない。

## 既存の追加方式の調査

- 同じ協会の管理業務主任者は `data/questions/kanri/index.ts` と年度・分割データを `Question[]` として登録している。公式問題・正答URL、出典、全肢解説、利用条件、法令基準日を各問に保持している。
- `lib/questions/types.ts` が資格コードと問題形式、`lib/exam-config.ts` が試験設定を定義する。
- `lib/qualifications/catalog.ts` の `isExamPublished` は登録済み資格の `status === "live"` を公開条件とする。未公開の資格をコードだけ追加すると、カタログ未登録の資格を公開扱いする既存仕様に注意が必要。
- `data/questions/index.ts`、`lib/questions/get-questions.ts`、`ALL_QUIZ_EXAM_CODES` は公開条件を参照する。`app/[exam]/page.tsx` は公開資格から静的ルートを生成し、利用可能な資格を確認する。
- ステージングとして追加する場合も同じ公開条件に従い、公開資格一覧と問題取得を遮断したまま、検証対象には未公開データを明示的に含める必要がある（`scripts/validate-questions.ts` の既存方式）。本作業では登録変更はしていない。

## 除外・保留

権利条件や非公開を理由に確定除外した設問は0問。対象94原問は全て未収録として保留した。理由は origin の最新状態を確認できず、必要なインストール・検証・独立レビューも完了できないため。本文照合・全正答照合・全選択肢解説・必要図の準備は未実施であり、公開可能な完成データは存在しない。

## 実行環境と検証

- 公式サイトとPDFは Web ツールで参照できた。一方、シェルからの公式PDF取得は名前解決エラーで失敗した。
- `pnpm install --offline --frozen-lockfile` は Corepack のキャッシュディレクトリ作成エラーで失敗。
- 書込可能な `/tmp` に `COREPACK_HOME` とキャッシュを向けた `pnpm install --frozen-lockfile` も、指定バージョン `pnpm@10.33.0` のダウンロード時に `EAI_AGAIN registry.npmjs.org` で失敗した。
- 環境に既存の pnpm 10.28.0 でもバージョン自動取得を無効にし、`--frozen-lockfile --fetch-retries=0` でインストールを試したが、依存パッケージの取得が同じ `EAI_AGAIN` で失敗した。指定バージョンでの導入成功の代替とは扱わない。ロックファイルは変更していない。
- 既存の pnpm から `validate:questions` を実行したが `tsx: not found` で失敗した。
- 関連テストとして `__tests__/questions/qualification-expansion.test.ts` と `__tests__/lib/exam-config-integrity.test.ts` を指定したが、`vitest: not found` で失敗した。
- `NODE_OPTIONS=--max-old-space-size=8192` を付けた `typecheck` も終了コード2で失敗。`@vitejs/plugin-react`、`@testing-library/jest-dom`、`vitest` などのモジュール・型宣言が見つからないエラーが出た。依存関係の導入・検証・型チェック・関連テストはいずれも成功していない。
- 指定モデルによる `codex exec -m gpt-6-astra -c model_reasoning_effort=medium --ephemeral` を導入前調査および本レポート作成後のレビューで試行したが、いずれも `failed to initialize in-process app-server client: Read-only file system (os error 30)` で起動前に終了した。独立レビューの指摘・合格判定は得られていない。
- レポートの `git add` とコミットを試行したが、`.git/index.lock` の作成が `Read-only file system` で失敗した。レポートは未追跡ファイルとして残っており、コミットは作成できていない。
- `pnpm build`、push、PR作成、デプロイは実行していない。

## 再開時に必要な作業

1. origin の対象ブランチ一覧と各候補の既存成果を確認し、同資格・同回の成果があれば再作成しない。
2. 公式ページの最新公開回と利用条件を再確認し、対象の全原問（記述式を含む）を公式PDFと照合して収録する。
3. 全正答照合、全選択肢の独自解説、必要図、出典表示、出題時法令の表示を完成させる。
4. 既存方式で未公開登録し、一覧・直接ルート・問題取得の公開遮断を確認する。
5. 指定バージョンで `pnpm install` 後に検証・型チェック・関連テストを実行する。
6. 指定の別Codexによる独立レビュー、指摘修正、再レビュー合格を完了し、本監査を更新してコミットする。
