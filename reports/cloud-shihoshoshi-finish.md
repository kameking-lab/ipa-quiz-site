# 司法書士（択一）仕上げ結果

作業日：2026-11-03。対象：`slug=shihoshoshi`、既存の令和8・7年度のみ。

**判定：公開合格には未到達。採点対象139問を理由つき保留とする。** 指定の独立レビューがサンドボックスの読み取り専用制約で起動できず、公式サイトも403となった。既存の解説139問は全肢の法的理由を満たさないため、`ready-to-ingest` / `needsReview: true` を維持した。新しい回の追加、build、デプロイ、push、PR作成は行っていない。

## 1. 指定の独立レビュー

最初に、指定の別Codexを次のオプションで起動した。レビュー対象・公開要件・権利確認済み・迂回禁止をプロンプトに渡し、独立レビューを依頼した。

```sh
codex exec -m gpt-6-astra -c model_reasoning_effort=medium -s workspace-write --skip-git-repo-check '<独立レビュープロンプト>'
```

結果は終了コード1。モデルによるレビュー開始前に次のエラーとなった。

```text
Error: failed to initialize in-process app-server client: Read-only file system (os error 30)
```

独立レビューの指摘一覧・合格結果は得られていない。設定場所の移動やサンドボックス変更による迂回は行っていない。以下の照合は作業担当自身のローカル確認であり、指定の独立レビューの代わりではない。再レビュー合格も未達である。

## 2. 問題数と出典

`reports/cloud-shihoshoshi-latest2.md`、既存JSON、`sources.json`、`source-text/`、公開ゲートと関連テストを確認した。

| 年度・区分 | 原問数 | 採点対象 | 保留 | 公式問題PDF | 公式正答PDF |
| --- | ---: | ---: | ---: | --- | --- |
| 2026 午前 | 35 | 35 | 35 | [問題](https://www.moj.go.jp/content/001467964.pdf) | [正答](https://www.moj.go.jp/content/001467955.pdf) |
| 2026 午後 | 35 | 35 | 35 | [問題](https://www.moj.go.jp/content/001467965.pdf) | 同上 |
| 2025 午前 | 35 | 35 | 35 | [問題](https://www.moj.go.jp/content/001444126.pdf) | [正答](https://www.moj.go.jp/content/001444124.pdf) |
| 2025 午後 | 35 | 34 | 34 | [問題](https://www.moj.go.jp/content/001444127.pdf) | 同上 |
| 合計 | **140** | **139** | **139** | | |

2025午後第33問は既存の`excluded.json`に保持されている。保存済み正答表では「-」（全員正解）で、正答番号を作らず通常の択一採点から除外する。問題・選択肢・[公式告知URL](https://www.moj.go.jp/content/001444130.pdf)を維持した。この1問は採点対象139問の保留とは別枠である。午後第36・37問の記述式は対象外。

全問・正答が公式に非公開であると確認して飛ばした回は**0回**。今回の403は取得不能であり、非公開回との判定には使用していない。

## 3. 全問のローカル照合

`scripts/audit-shihoshoshi-local.py`を追加した。標準ライブラリのみで動作する。

```sh
python3 scripts/audit-shihoshoshi-local.py
```

結果：終了コード0、`localChecksPassed: true`、エラー0件、`publicationApproved: false`。

- 本文と全5選択肢：採点対象139問＋除外1問の計140問を、保存済み公式PDF抽出テキストの該当番号区間と照合した。空白・改行・互換文字・抽出制御文字・冊子フッターを正規化し、別途付記された共通前提を除いた本文と番号付き全選択肢の連続一致を確認した。新規取得PDFとの照合ではない。
- 正答：保存済み正答表の35行×午前午後×2年＝140枠と照合。139問の公式正答番号・内部解答キーと除外1問が一致した。
- 件数：各区分の原問番号1〜35を確認。採点対象ID139個は重複なし。
- 出典：全140問の問題・正答URLを`sources.json`の対応URLと照合した。PDFバイナリがないため記録済みSHA-256の再検証は未実施。
- 法令：採点対象139問すべてに**出題時点の法令**（2025-04-01 / 2026-04-01）を記録し、解説中の同じ基準日も確認した。現行法への更新は行っていない。
- 図表：2026午後第20問の登記記録はテキストと補助画像が存在する。ローカル画像を表示し、甲区1件・乙区の根抵当権／地上権／地上権抵当権と、日付・受付番号・金額・当事者のテキスト対応を確認した。他の図表の欠落有無を含む公式PDF全ページの視覚的確認は未達。
- 解説：139問すべてに5つの`choiceExplanations`キーは存在するが、`explanationCoverage: "official-summary"`である。「正答の組合せと一致する／しない」の説明だけでは各記述の法的理由を説明できない。全139問を解説充足とは判定しなかった。

照合スクリプトの検出能力も、メモリ内で2025午前第1問の本文・解答キー・選択肢を個別に改変し、各改変を失敗として検出することで確認した。実データの改変は行っていない。

## 4. 権利判断と取得制限

オーナー決定は**権利確認済み**。`lib/qualifications/catalog.ts`の資格台帳へ明記し、転載条件の確認を公開待ち理由から除いた。使用許諾申請や転載条件の文言を理由に作業を停止していない。

今回参照した[法務省利用条件](https://www.moj.go.jp/hisho06_00280.html)、[令和8年度問題掲載ページ](https://www.moj.go.jp/MINJI/minji05_00777.html)、[令和7年度問題掲載ページ](https://www.moj.go.jp/MINJI/minji05_00715.html)、2026午前問題PDFは、Web取得でいずれも403だった。そのため利用条件・使用許諾申請に関するページ本文の正確な文言は今回取得・引用できていない。推測で文言を補っていない。既存報告の「公開前に第三者権利等の条件を確認する」は前回時点の記録であり、今回の保留理由ではない。

前回報告にあるUser-Agent変更・クエリ付与による取得は今回再実行していない。ログイン、CAPTCHA、ボット拒否・サンドボックスの迂回は行っていない。

## 5. 指定コマンド

`pnpm install`を最初に実行した後、指定チェックをそれぞれ試行した。

| 操作 | 結果 |
| --- | --- |
| `pnpm install` | 終了コード1。Corepackのキャッシュディレクトリ作成で失敗 |
| `pnpm validate:questions` | 終了コード1。同じCorepackエラーにより検証処理開始前に失敗 |
| `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` | 終了コード1。同じCorepackエラーにより型検査開始前に失敗 |
| `NODE_OPTIONS=--max-old-space-size=8192 pnpm test __tests__/questions/shihoshoshi-staging.test.ts __tests__/questions/qualification-expansion.test.ts --maxWorkers=1` | 終了コード1。同じCorepackエラーによりテスト開始前に失敗 |
| Pythonによる全問ローカル照合・改変検出確認 | 成功 |
| `git diff --check` | 成功 |
| `pnpm build`、デプロイ、push、PR作成 | 未実行（指示どおり） |

Corepackエラーは`ENOENT: no such file or directory, mkdir '/root/.cache/node/corepack/v1'`。`node_modules`は存在しない。キャッシュや実行環境の付け替えによる迂回は行っていない。今回の指定チェックは未完了であり、前回報告の成功件数を今回の成功結果として流用していない。

## 6. 保留と残作業

保留の重複を除いた件数は**139問**。内訳は上表のとおり。

| 未充足項目 | 対象 | 理由・次の作業 |
| --- | ---: | --- |
| 各記述・全選択肢の法的理由 | 139問 | 条文・判例等に基づく説明を補完し、出題時点の法令で内容レビューする |
| 公式PDFとの最終照合 | 139問 | 403で原本を取得できず、文字抽出で失われる図表・レイアウトを含む確認ができない。正常に取得できる環境で確認する |
| 指定独立レビュー・再レビュー合格 | 139問 | Codexが初期化時に失敗。正常に起動できる環境で実施し、指摘を修正する |
| 指定検証 | 資格全体 | pnpm初期化で失敗。通常のインストールが可能な環境で再実行する |

公開ゲートは維持した。権利確認の再承認は不要。秘密値の読み出し・出力は行っていない。

## 7. コミット

`git add lib/qualifications/catalog.ts scripts/audit-shihoshoshi-local.py reports/cloud-shihoshoshi-finish.md`は終了コード128で失敗した。

```text
fatal: Unable to create '/home/user/ipa-quiz-site/.git/index.lock': Read-only file system
```

ステージングができないためコミットは作成できなかった。`.git`の場所・権限の変更や別Gitディレクトリによる迂回は行っていない。変更は作業ツリーの上記3ファイルに残っている。
