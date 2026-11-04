# INT5B: Vercel本番ビルドでDB1 migrationを自動適用

作業日: 2026-11-04〜05 JST。オーナー指示: 2026-11-04 23:05「自分でやれ」。実装・ローカル検証・独立レビュー・コミットを担当し、push・PR・デプロイ・本番DB接続は行わない。

状態: 全検査・最終独立レビューPASS。Vercel本番ビルドの自動適用を実装済み。本番への実適用は行っていない。

## 対象と実装

- worktree: `C:/Users/kanet/20260522/wt-batch2`
- branch: `release/batch2-20261105`
- 開始HEAD: `7f97cc66184cdf13102ad2e22477f46f3f3d711c`。開始時worktreeはclean。
- `scripts/vercel-migrate.mjs` を `package.json` のbuild前段に直接接続し、失敗時は `&&` によりNextビルドを開始しない。package.jsonの改行をLFへ正規化した以外、buildスクリプトだけを変更。
- `vercel.json` の `buildCommand=pnpm run build` で管理画面の上書き設定にも優先する。`.vercelignore` がscripts全体を除外していたため、実行スクリプトだけを再包含。
- ホストVercelのProduction（`VERCEL=1`, `VERCEL_ENV=production`, `VERCEL_DEPLOYMENT_ID=dpl_...`）だけ実行。Preview・通常ローカル・通常CI・デプロイIDのないローカルVercelビルドではDBアクセス前にスキップ。Vercel自身の `CI=1` は許容し、外部CIマーカーは除外。
- 直結URLは `DATABASE_URL_UNPOOLED` → 既存ドキュメントの `DIRECT_URL` → `POSTGRES_URL_NON_POOLING`。アプリ用 `DATABASE_URL` にフォールバックしない。値は引数・ログ・成果物へ出さず、Prismaの出力と生例外も抑止。
- 全migrationを一時領域へ固定し、履歴の存在・完了・未知名・重複・SQL SHA256（LF/CRLF差許容）を検査。本物の `prisma migrate status` も実行。
- 未適用がDB1の3本すべてだけ、または0本の場合にだけ `migrate deploy`。DB1以外・部分適用・失敗履歴・チェックサム不一致はdeploy前に停止する。
- advisory transaction lockで協調する本番ビルドを排他。deploy後は未適用0とstatus正常を確認してからNextへ進む。
- DB1のSQL3本・Prismaモデル・アプリの認証/課金/AI経路は変更していない。手順書 [mobile-db-migrations.md](../../docs/mobile-db-migrations.md) を自動適用へ更新し、オーナーがSensitive envを読出して貼る旧手順を撤去した。

## ローカル検証

コマンドの出力とSHA256を [validation/](./validation) に保存。サービス資格情報を継承せず、秘密のenvファイルを読み込まずに実行した。環境はWindows・Node 24.13.1・pnpm 10.33.0・Prisma 6.19.3・Next.js 16.4.5・Vitest 4.1.12。

| 検査 | 結果 |
| --- | --- |
| `pnpm typecheck` | PASS、終了0 |
| `pnpm lint`（最終再確認） | PASS、エラー0・既存警告12 |
| `pnpm test --maxWorkers=1` | PASS、終了0。770ファイル成功・1ファイルskip、7,872件成功・失敗0・10件skip |
| `pnpm build` | PASS、終了0、17,958静的ページ。ローカルのmigrationスキップも確認 |
| `node --test scripts/vercel-migrate.test.mjs` | 5件PASS |
| embedded PostgreSQLの実migration | 0本・3本・想定外あり、追加の停止/秘匿/排他検証もPASS |

buildには従来のmiddleware/Edge非推奨とSSRチャート寸法の警告がある。全テストの途中出力にはJSDOMの画面遷移未実装診断があるが、最終集計は失敗0・終了0。10件skipは従来の任意Postgres検証8件と保存PDF照合2件。Vitestの自動選択されたagent reporterは成功ケースの途中ログを省略する。1 workerの全テストは2,835.35秒で完了した。

最終6検査の終了0、各ログSHA256、[実装・migration 21ファイルのハッシュ](./implementation-inventory.json) を照合した結果は [validation-summary.json](./validation-summary.json)。本番DBの接続・実env値の取得・実AI呼出し・push・PR・デプロイは行っていない。

初回は全テスト（4 workers）とbuildを並行実行したが、共有マシンの空きメモリが約0.7GBとなり進行が遅くなったため、当タスクのプロセスだけを停止して負荷を調整した。全テストを1 workerで再実行し、lint完了後にbuildを再開した。中断した2回分は `*-concurrent-aborted.log` / `*.result.json` に保持する。アプリの不具合による失敗として扱わず、再実行の正常終了を必須とする。

新しいゲート単体テストは `node --test scripts/vercel-migrate.test.mjs`。実DBハーネスは `node scripts/check-vercel-migrate-postgres.mjs C:/Users/kanet/AppData/Local/Temp/codex-work/int5b-postgres-tools`。toolingはリポジトリ外で `@embedded-postgres/windows-x64@18.6.0-beta.19` と `pg@8.23.1` を導入。PostgreSQL 18.6を新規一時クラスタ・127.0.0.1で起動し、合成User/StudyRecordを含む全テーブルを比較する。

| 未適用 | 期待 | 検証内容 |
| --- | --- | --- |
| DB1の3本のみ | 成功、3本適用 | 全migration完了、iOSの13列、補助確認SQL成功、既存行保持 |
| 0本 | 成功、冪等deploy | 全テーブルとmigration履歴が完全一致 |
| DB1の3本＋既存feedback migration | 適用前に終了1 | 全テーブルと履歴が完全一致、Preflight成功ログなし |

さらにPreview/ローカル/外部CI/ローカルVercel相当は存在しないDB名でもスキップし、接続しないことを確認する。無効なアプリ用pooler URLを併置し、実際の接続が直結URLだけになることを確認する。ログへのURL/ホスト/ダミーパスワード漏出をassertする。失敗履歴と競合ビルドも停止し、実際の `pnpm build` がURL不足時にNext起動前に終了1になることを検証する。

## 失敗ビルドと旧版の配信

Vercelは最新の**成功した**本番ビルドを本番ドメインへ昇格する仕様であり、migration失敗がbuildの非0終了へ伝播するため、そのビルドで旧本番デプロイを置換しない。[Vercel公式 Deployment Checks](https://vercel.com/docs/deployment-checks)。実装側の停止伝播はローカルの実buildコマンドで確認する。実デプロイを意図的に失敗させる試験は、デプロイ禁止に従い行っていない。

migration成功後にNextだけが失敗した場合、DBの追加テーブルは残る。DB1は追加DDLのみで旧版と後方互換を維持し、次回は0本として再実行できる。SQL途中失敗時は部分DDL/失敗履歴が残りうるため、自動resolve/reset/逆migrationはせず次回ビルドも停止する。外部から同時に実行する非協調のmigrationツールや本番の実状態は今回の検証対象外。

Vercel Productionの実envの存在/値・本番履歴は今回取得していない。上記いずれかの直結envが存在する構成なら、オーナーが接続文字列を読出す作業なしで動作する。env不足や想定外migrationを検知した場合は、今回の承認範囲を超えて自動修復せず、安全にビルドを止める。

## ClaudeへのPreview実行引継ぎ（CLAUDE.md §7）

この実行はユーザー指示どおり**ClaudeがPreviewで担当する**。INT5BではPreviewを作成/変更せず、実AIも呼んでいない。INT5で未実施だった条件は、以下の実行証跡が揃うまで「実AI検証済み」にしない。モックE2Eやローカルbuildの成功を代用しない。

### 事前条件と共通手順

1. Claudeが対象Preview URL・Deployment ID・commit SHAを固定する。本番URLを使わない。PreviewのbuildログでmigrationがSkippedになっていることを確認する。
2. PreviewのGeminiと共有KV設定を既存の秘密管理経路で利用する。キーやKVトークンを取得/表示/報告しない。`X-Provider: mock`、mock応答、費用/会員状態不明による503を成功扱いしない。月額上限50,000円・レート値・無料枠・モデルを変更しない。
3. 実際の画面から問題と答案を選び、必要な会員ログイン/権限を確保する。新しいAI送信同意UIで同意前には非送信、同意後だけ送信することを確認する。strict gateが有効なら正規のcontent grantと `X-Kakomon-AI-Consent: 20261103` を使う。Cookie/トークンを報告へ残さない。
4. 各リクエストの直前・完了後に、Previewで使用する共有KVの `ai_cost:YYYY-MM` を読取りで比較する（月境界はJST）。予約額の増加中ではなく、応答完了と精算後の実測差分を見る。予算変更やキーの書換えは行わない。`/api/admin/api-usage` はこの費用キーを返すAPIではないので代用しない。
5. 下表4経路を各1回、重複送信せず実行する。DevTools NetworkでURL・送信bodyの形式・HTTP status・安全な応答ヘッダー・応答本文を確認する。本文を目視し、問題に対応した内容、採点根拠、JSON/文章の末尾まで確認する。
6. 同じリクエストの実行時刻/questionIdでPreview Runtime Logsを照合し、`finishReason=STOP` と実測トークン数を確認する。`MAX_TOKENS`、途中切断、タイムアウト、簡易/モック判定、費用不増加は不合格。HTTP 200だけでは合格にしない。

### 確認するAPIと入力・合格条件

| POST API | 画面/入力bodyの要点 | 確認する応答と証跡 |
| --- | --- | --- |
| `/api/copilot` | 通常の午前問題を表示し質問を送信。`question:{id}`, `messages:[{role:"user",content:"この問題の根拠を説明して"}]`。実在するidは画面から取得 | `X-Provider: gemini`、`X-Model`が実モデル、text streamが問題の根拠を説明。`[copilot] completed`ログのSTOP/実測tokens、費用増加 |
| `/api/copilot/exam-library` | 資格ライブラリの選択問題で質問。`examId`, `questionId`, `messages`、必要なら `selectedChoice`（1〜9の整数またはnull） | `X-Provider: gemini`、完了したtext stream、STOPの証跡、費用増加。下記の観測上の注意を参照 |
| `/api/scoring` | 午後記述問題に実際の答案を入力して採点。`questionId`, `answers:[{label:"画面の設問ラベル",text:"答案"}]` | JSONの `status:"graded"`, `gradingMode:"ai"`、全設問の採点根拠と得点。`[scoring] response received`ログのSTOP/実測tokens、費用増加 |
| `/api/essay-grade` | 独自論述問題のア/イ/ウと業種を入力して採点。`questionId`, `industry`（例 `it`）, `answers:{ア:"答案",イ:"答案",ウ:"答案"}` | `status:"graded"`, `gradingMode:"ai"`、ア/イ/ウの評価/改善点が答案に対応。`[essay-grade] response received`ログのSTOP/実測tokens、費用増加 |

`/api/copilot/exam-library` は現状、HTTPヘッダー/本文にfinishReasonを返さず、onCompleteにもSTOPのログを出していない。他のコパイロットのログから推測しない。Claudeはこの経路のPreview検証時に、onCompleteでquestionId/model/finishReason/トークン件数だけを記録するPreview用観測を用意するか、同一リクエストのプロバイダ側メタデータを取得してSTOPを証明する。秘密値・プロンプト・答案のログ追加は不要。証跡が得られなければ§7のSTOP確認は未達と明記する。INT5BではAIコード自体を変更していない。

類題生成は現行の2つのコパイロットで `requestsNewQuestion` によりprovider実行前に拒否する仕様。両APIで「類題を作って」を送る追加の拒否確認は `400 original_question_explanation_only` かつ非課金が期待値。類題生成の有効化やプロンプト変更はしない。

Claudeの記録はAPI別に、Preview/commit/questionId/時刻、status、provider/model、採点ならgradingMode、finishReason、実測tokens、費用キーと前後値、本文目視結果を残す。認証情報を含むHAR全体をそのまま保存しない。4経路と拒否動作の結果を別報告として返す。

## 独立レビューとコミット

指定の `C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only` による [初回コードレビュー](./independent-review.md) はPASS。初回時点では全テスト/buildが未完了だったためコミットせず、全検査の終了0を待った。[最終独立レビュー](./independent-review-final.md) も `VERDICT: PASS`、終了0。6検査・ログSHA256・実装21ファイルの一致、DB3ケース、ビルドの停止伝播、文書と担当範囲を独立に確認した。[レビュー証跡のハッシュ](./review-receipts.json) を保存した。コミット対象は実装と本報告・証跡で、確定コミットSHAは指定先の `C:/Users/kanet/Documents/Codex/2026-11-02/task-2/int5b-report.md` に記録する。

作業中に現れた `reports/int1b-20261104/count-audit.json` の別件差分は編集・取り消し・コミット対象に含めない。
