# INT8 公開バッチ3・後続改善の統合

対象PR：[kameking-lab/ipa-quiz-site#791](https://github.com/kameking-lab/ipa-quiz-site/pull/791)。対象worktreeは `C:/Users/kanet/20260522/wt-batch3`、ブランチは `release/batch3-20261105`。起点は `f95bd49d0a9affc4ad34795b94dc9d3f20ecf9eb`、取り込み元は `feat/exam-top-20261105` の固定先端 `127be5504913e54fdc70eb8034c46fb92c33a47f`。取り込み元のリモートrefは存在しなかったため、既存ローカルの指定SHAを使用しました。PRのリモート先端が起点と一致することを確認しています。

## 統合内容

- KGROW2：ブログ179記事の1問体験と演習への継続、問い合わせ・補足の配信確認と受付番号。
- KPERF1：解説の事前準備、装飾・広告・補足機能の遅延読み込み、不要な先読みの抑制。
- KUX1：主要区分からの直接演習、初回10問中の割り込み抑制、上限後に無料の復習・再開を先に案内。
- KUX2：SC・NW・ST・SA・APのトップ、年度別・分野別の実リンク、午後対策と収録範囲の表示改善。

既存batch3の新資格・問題データ・資格表示修正、iOS認可と広告同意、次の資格のUTM・問い合わせ振り分け・計測、既存のfeedback追加枠処理を保持しました。11競合ファイルでは改行差を正規化して実際の差分を分離し、重複した宣言・propsを解消しました。過去のUIハッシュ台帳を変更せず、INT8用台帳を追加し、元データ・core pinsと回答記録処理の固定検査を維持しています。

公開予定一覧は指定の `batch3-publish-list.md` に追記し、worktreeの `reports/int8-20261105/` にも保存しました。

## DB変更とmigrationガード

保留中の「フィードバックで+10」のDBマイグレーションを含む別ブランチは取り込んでいません。起点に既にある機能・migrationは維持し、今回の差分では `prisma/`・`scripts/vercel-migrate.mjs`・そのテスト・`package.json`・lockfileは変更ゼロです。

実ファイルを使ったローカル検査で、全適用済み0件、既存DB1の3件だけ未適用のケースを許可し、既存feedback分が未適用のケースと未承認migrationの追加を拒否することを確認しました。11 migrationを対象とし、schemaとガードのSHA256を `integration-audit.json` に記録しています。本番DBへの接続・migration実行はしていません。本番の実適用状況を推測せず、想定外の未適用migrationがあればINT5Bがビルドを停止する仕様を維持します。

## 独立レビューと修正

指定の `C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only` を使用しました。

初回の実装レビューはFAILで、(1) strictモードでブログ体験が問題・解説を無認可でシリアライズする、(2) DB・ESの午後採点未対応案内が競合解消で失われている、の2件を指摘しました。両方をビルド前に修正しています。strictモードはサーバー側で問題・解説のpropsを出さず、特定問題IDを保持して既存の認可付き `/quiz` へ案内します。通常Webの記事内体験は保持します。DB・ESには未対応案内だけを出し、採点リンクを出しません。実ページのSSR出力を検査する回帰テストを追加しました。

修正レビューは **VERDICT: PASS**（`independent-review-fixes.md`）。全検証後の最終レビューも **VERDICT: PASS**（`independent-review-final.md`、終了コード0、2026-11-04 23:41:58〜23:43:18 UTC、約79.8秒）。独立したAstraが単一ビルドとのソース一致、manifest・ログのハッシュ、テスト件数、保全した再試行トレース、27画面のコンタクトシート、migration・データの固定を確認しました。必須修正なしです。最終判定ファイルに加え、照合過程は `independent-review-final.log` に保存しています。

## ローカル検証の最終結果

全採用チェックは終了コード0です。証跡はworktreeの `reports/int8-20261105/`。`final-validation.json` に実行コマンド・時刻・ログSHA256・画面SHA256を集約しました。

| 検証 | 結果 | 採用証跡 |
|---|---|---|
| typecheck | PASS、QA修正後も再確認 | `typecheck-final.*` |
| lint | PASS、0エラー・既存12警告。追加QA/証跡スクリプトのlintもPASS | `lint-final.*`、`qa-lint.*` |
| 全ユニットテスト | 7,927件＝7,917成功・10skip・失敗0。784ファイル＝783成功・1skip | `test-final.log` / `.json` / `.result.json` |
| validate:questions | public-schema 36,981件正常、fail 0、warn 20,972。別に非公開原稿40件 | `validate.*` |
| ローカル本番build | **1回でPASS**、19,591ページ、628.5秒。migrationはローカルとしてSkipped | `build.*` |
| CIと同じ全E2E | 433件＝419成功・12skip・2 flaky（retry成功）・失敗0、242.1秒 | `e2e-final.*` |
| スマホ実画面 | 320px/390px、27枚を目視。横はみ出し・ブラウザ例外・意図しないAI送信は各0 | `visual.*`、`visual-receipt.json`、`visual-qa.md`、`screenshots/` |
| migration・CI集約ガード、安全系出典、政府リンク | 全PASS | `gates.*`、`integration-audit.*`、`safety.*`、`government.*` |

ビルドIDは `rLYtLffAkkksdVeHFcCJ4`。ビルド・最終typecheck/lint・全ユニット・全E2E・実画面のアプリ差分署名はすべて `50003d093dcaadda95f8ed4bddc43d2649cc3c060499267c1a7f4574911bee7d` で一致します。ビルド後にアプリを変更していません。`source-manifest.json` と `source-manifest-final.json` でも、後続変更が以下のQA 3ファイルだけであることを照合しました。

- `tests/e2e/contact-site.spec.ts`：旧 `{ok:true}` のモックを配信確認・受付番号つきの応答へ更新し、受付番号表示も検査。
- `__tests__/billing/QuizClient.quiet.test.tsx`：KUX1の通常Webを含む割り込み抑制へ期待値を更新。
- `__tests__/streak/practice-quiet.test.tsx`：旧 `getStats` モックを実装の `getAllEntries` と当日の回答データへ更新。

中間結果を成功扱いしていません。実装レビュー修正により初回全ユニットを中断（`test-interrupted.json`）。その後の全件実行で上記の旧仕様テスト3件が失敗し、修正・対象8件PASS後に**全7,927件を再実行して合格**しました。失敗時の全ログ・JSONは `test-before-quiet-fixes.*` に保存しています。最終ユニットはメモリ状況を確認して最大4 workersで実行しました。

初回全E2Eは問い合わせモック1件が失敗し、既存404検査1件がretry成功。アプリを変えずテストだけ修正し、同じビルドで全433件を再実行しました。最終のflaky 2件は、自習室の `data-motion-visible` が初回falseのままという表示状態確認と、存在しないURLで初回 `ECONNRESET` です。両方ともCI既定のretry 1回で成功しました。トレース・画面・エラー文脈を `final-e2e-flaky/` に保持し、初回PASSとは区別しています。

ユニットskip 10件は任意PostgreSQL統合8件（DB未設定）とPoppler原本照合2件（Windowsにpdftotextなし）。E2E skip 12件は専用環境を要するKFUN 7件とPAID_MODE法人問い合わせ5件で、今回実行済みとは扱いません。以前のINT7の専用検証結果も、今回の実行数には合算していません。

ローカル環境はWindows／Node 24.13.1。検証ラッパーはCorepack経由で指定のpnpm 10.33.0を使用し、秘密envファイル・サービス資格情報を読み込まず、OS環境のallowlistだけで実行しました。E2Eは `pnpm e2e`、`CI=1`、同じPlaywright設定の2 workers・retry最大1です。GitHubのLinux／Node 22実行と同一環境という意味ではなく、その結果はpush後に確認します。

lintの12警告、validateの20,972警告、buildの既存middleware/Edge Runtime非推奨・チャート寸法警告は残っています。実問い合わせ・実AI・実決済・本番DB・ネイティブ実機の検証はしていません。従前のPreview実AI確認の引継ぎはINT7報告のまま維持します。

## pushとCI確認

最終証跡の独立レビューPASS後に、指定PRブランチだけへ通常pushし、`gh pr checks 791` で新HEADのCIを確認します。この節はpush後に正本へ実測結果を追記します。worktree内の本報告はpush前の検証スナップショットとし、CI結果記録だけの追加push・追加ビルドは行いません。正本は `C:/Users/kanet/Documents/Codex/2026-11-02/task-2/int8-report.md` です。

INT8ではPRブランチへの通常pushのみが許可対象です。mainへのpush・force push・PRのmainへのマージ・手動デプロイ・本番DB接続は行いません。pushに連動して既存のGitHub CI・Vercel Previewチェックが起動する場合は、そのチェック結果を確認します。
