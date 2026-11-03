# 2級建築施工管理技術検定（第一次検定）直近2回の監査

確認日：2026-11-03（UTC）。依頼に記載されたオーナー決定日：2026-11-04。

## 今回の結果：権利理由の除外を撤回、収録は未完了

オーナーの権利確認済み決定に従い、前回コミット `81f12b99` の「転載禁止を理由に100問を除外する」判断を撤回した。権利未確認・転載条件・過去の取得STOP記録を停止理由にはしない。

既存の資格台帳 `lib/qualifications/catalog.ts` の `sekou-kenchiku2` を土台に、`permission-required` から `ready-to-ingest` へ変更し、権利取得の残作業を削除した。この状態は収録着手可能という意味であり、公開準備完了・問題本文追加完了を意味しない。公開状態は `live` ではなく、`examCode` も未登録。

**今回の追加0問、公開0問、権利理由の除外0問、収録未完了100問。依頼全体は未完了。** 問題本文・全肢解説・図版はまだ追加できていない。環境制限の迂回は行わず、下記の実行結果を記録する。

## 対象回と公式根拠

一般財団法人建設業振興基金の[過去の受検状況・検定問題・合格基準](https://www.fcip-shiken.jp/about/)を今回も閲覧し、「検定問題・正答肢」→建築施工管理技術検定→2級→第一次検定の前期・後期リンクを確認した。前期は令和8年度、後期は令和7年度であり、年度・回を推測していない。

| 対象回 | 実施日（PDF表紙） | 公式問題・正答肢PDF | 出題数 | 追加数 | 収録未完了数 |
| --- | --- | --- | ---: | ---: | ---: |
| 令和8年度前期 第一次検定 | 2026-06-14 | [令和8年度前期](https://www.fcip-shiken.jp/pdf/r08_2kgz_mondai.pdf) | 50 | 0 | 50 |
| 令和7年度後期 第一次検定 | 2025-11-09 | [令和7年度後期](https://www.fcip-shiken.jp/pdf/r07_2kg_mondai.pdf) | 50 | 0 | 50 |
| 合計 | | | 100 | 0 | 100 |

両回とも50問出題、40問解答。No.38～42は五肢択一、それ以外は四肢択一。正答肢は問題PDFの末尾に付属する。令和7年度後期の表記は「正答肢（案）」。前回確認の表紙・末尾の記録を引き継ぎ、今回も公式一覧のリンク先が両PDFであることを閲覧ツールで確認した。ただし全100問の本文・全選択肢・正答・図版の再照合は未実施。

公式一覧フッターの「本サイトに掲載されている記事・写真・図表などの転載を禁じます。」という文言は記録に残す。オーナー決定に基づき、今回の収録除外・権利確認の再要求の根拠にはしない。

## 実行できなかった操作と取得できなかったPDF

### 公式PDFの通常取得

次の2件を `curl -fsSL` で通常取得したが、いずれも `curl: (22) The requested URL returned error: 403`。ローカルPDFは作成されず、`pdftotext -layout` による抽出も実行できなかった。

- `https://www.fcip-shiken.jp/pdf/r08_2kgz_mondai.pdf`
- `https://www.fcip-shiken.jp/pdf/r07_2kg_mondai.pdf`

閲覧ツールでは両PDFの抽出テキストを開けた（前期26ページ、後期25ページ）。そのため「公式に問題や正答が非公開」「PDFの閲覧が一切不可能」とは判定していない。一方、このセッションでは図版を取得して目視照合できず、全100問の完全な収録・検収に必要な原資料をローカルに確保できていない。本文の一部が読めることを全問検収済みの根拠にはしない。ログイン・CAPTCHA・ボット拒否やサンドボックス制限を回避する取得は行っていない。403の発生原因は断定しない。

### Gitの読み取り専用制限

着手時の作業ブランチは `claude/blissful-rubin-pks6ce`、作業ツリーは変更なし。指定どおり以下を試したが失敗した。

```text
git fetch origin '+refs/heads/claude/*:refs/remotes/origin/claude/*' '+refs/heads/qual/*:refs/remotes/origin/qual/*' '+refs/heads/codex/*:refs/remotes/origin/codex/*' --prune
error: cannot open '.git/FETCH_HEAD': Read-only file system
```

環境設定で `.git` は読み取り専用。fetch・コミットに必要なGitメタデータを書けないため、権限変更・別Gitディレクトリへの移設などの迂回を行わない。今回の変更は作業ツリーに残し、コミット・pushは未実施。pushはもともと監督側の担当。

### 指定の独立レビュー

指定モデル・推論強度・サンドボックスで、読み取りのみのレビューを起動した。

```text
codex exec -m gpt-6-astra -c model_reasoning_effort=medium -s workspace-write --skip-git-repo-check -C /home/user/ipa-quiz-site -o /tmp/kenchiku2/review-preflight.md <レビュー依頼>
Error: failed to initialize in-process app-server client: Read-only file system (os error 30)
```

初期化で停止し、レビューは実行されていない。独立レビューPASS・再レビューPASSとは扱わない。別の権限設定やサンドボックス外での再起動による迂回はしていない。前回コミットのレビューPASSは当時の除外監査の結果であり、今回の100問収録の合格判定として流用しない。

## 重複確認と既存方式

- ローカルの `data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library`、`data/qualification-staging` を確認した。本資格の一致は前回作成した資格台帳だけであり、今回はその台帳を更新している。ユーザーが前回成果への継続を明示しているため、既存台帳を重複新規作成の理由で停止しない。
- 前回監査ではoriginの359ブランチ・異なるテキストblob 3,867個を調べ、対象資格・回の一致0、読み取り失敗0と記録されていた。これは前回の記録であり、今回の最新リモート全件確認済みとは扱わない。
- 今回は読み取り専用の `git ls-remote --heads origin 'claude/*' 'qual/*' 'codex/*'` に成功。372ブランチを確認し、ローカルにある360ブランチはすべて同じコミットだった。残る12ブランチはfetchの制限により内容未確認。比較証跡は `/tmp/kenchiku2/remote-comparison.json`。最新リモート全体の重複監査は未完了。
- 類似資格の `data/questions/civil2/index.ts` は年度別JSONを問題型へ変換し、問題・正答URLと全肢解説・図版を保持する。将来の収録ではこの方式を基本に、No.38～42の五肢択一にも対応する必要がある。
- `data/questions/index.ts` の公開登録と資格一覧は台帳の `live` 判定を使用する。今回は問題・試験コード・ルート・公表試験カタログへの追加がないため、演習入口は未作成。既存の `data/qualification-staging` も確認したが、未取得の本文を空データとして登録していない。

## 検証

以下は今回の実行結果。問題追加0問のため、今回依頼された100問を検証できたことは意味しない。

- `pnpm install`：未完了。`ERR_PNPM_EROFS`（読み取り専用）のパッケージ取得エラーが繰り返されたため中断、exit 130。ストアの移設などによる迂回は行っていない。
- 既存の依存関係で `pnpm validate:questions`：exit 0。26,444問、ok=26,444、fail=0、warn=16,808。警告は既存問題に関するもの。
- 既存の依存関係で `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：exit 0。
- 既存の依存関係で `pnpm exec vitest run __tests__/questions/qualification-expansion.test.ts __tests__/questions/live-qualification-coverage.test.ts __tests__/seo/qualification-coverage-copy.test.tsx __tests__/exam-library-coverage.test.ts`：exit 0、4ファイル・1,083テスト成功。
- 台帳の実データ確認：対象slugは1件、`ready-to-ingest`、`examCode` 未登録、許諾取得の残作業なし（exit 0）。
- `git diff --check`：成功。

ログは `/tmp/kenchiku2/install.log`、`validate.log`、`typecheck.log`、`tests.log`、`staging-check.log`、`review-preflight.log`。新規インストール成功後の検証と指定の独立レビューは、環境制限が解消された際に改めて必要。

## 再開時の残作業

1. 通常の方法で取得できる両公式PDFと図版、および指定サンドボックスで独立レビューを起動できる環境を確保する。Gitの制限が解消された環境で残るリモートブランチの重複確認を完了する。
2. 対象回を増やさず、100問の原文・選択肢・公式正答・全肢解説・必要図・出典URLを未公開ステージングに収録する。法令問題は出題時点の法令であることを明示する。
3. 全問照合・件数照合・関連検証を完了し、指定の独立レビューと指摘修正・再レビューを行う。公開準備が整っても依頼どおり未公開を維持する。
4. 本レポートを実績で更新し、現在のclaudeブランチへ資格単位でコミットする。pushは監督側が行う。

`pnpm build`・デプロイ・Vercel・PR作成・pushは実行しない。
