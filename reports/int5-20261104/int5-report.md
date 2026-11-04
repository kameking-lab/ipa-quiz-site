# INT5 公開バッチ2 統合報告

状態：ローカル統合・全検証・最終独立レビューPASS。公開・pushは未実施。

## 作業先と固定成果

- worktree：`C:/Users/kanet/20260522/wt-batch2`
- ブランチ：`release/batch2-20261105`。upstreamは未設定。
- `git fetch origin` 後の起点：`ca99d7f72`。`origin/release/batch1-20261105` 最新、FX790を含む。
- 固定成果は [source-inventory.json](source-inventory.json)、公開範囲は [batch2-publish-list.md](batch2-publish-list.md)。元の作業worktreeにあった未コミット変更は持ち込んでいない。
- `88da5050d`：iOS `aaff4ba4d`、DB1、SEC1共通ライブラリとiOS AIパッチを統合。
- `da75498d9`：SEC1パッチの改行を正規化。
- `5dc48b7a4`：一級建築士LK4C `60a78b1e5`（`261c69de3`を含む）。
- `0941b80c5`：高圧ガス化学LK2D `6a9ea5f08`。
- `8be74b0fe`：1級建築施工管理RS1K `51fc02325`。
- `e870bdbd1`・`48c28c74b`：公開投影、公開設定、画像、一覧・検索・サイトマップの接続。
- `c017ab7b0`：制限付きbuildの気象リーダー隔離と、オフライン画像収集における引用リンクの区別。strict buildの検証対象。
- `a58a2a30b`：ローカル検証の環境隔離・HTTP確認。
- `1856dce99`・`5b45d3fb8`：通常Webのバッジ通知を維持し、native・制限付き演習のみ静かな表示にする。AI送信E2Eで同意拒否→未送信→明示許可→送信を確認する。
- `b8fb14de4`・`4c8e24cf4`：テストfixtureの必須戻り先propと、購入確認の分析effectを待つ検証を補完。全検証時のHEADは `4c8e24cf4`。

通常Webの最終buildは `5b45d3fb8` を起点に実行した。後続2コミットはテストfixtureだけ。`3339fd295` はコード改行のCRLF→LF正規化と履歴証跡の属性指定のみで、配信コードは改行を除いて同一（[build-equivalence.json](build-equivalence.json)）。型検査・lint・最終全件テスト・E2E・実画面はfixture補完後も確認した。

## 公開範囲とデータ保持

新規は一級建築士250原問中249演習、高圧ガス化学422原問、1級建築施工管理144原問。新規816原問・815演習。

一級建築士は受入原稿250問を保持し、令和8年法規問29の全員加点1問を通常の正誤演習から除外した。`scripts/build-batch2-projections.ts` は公開投影だけの公開・確認フラグと画像経路を変更し、本文・選択肢・正答・全肢解説・法令基準日を保持する。31画像はSHA256名のpublic配信ファイルと原図のバイト一致を検証する。受入時のmanifest・権利判断を公開指示によって改竄せず、権利者から許諾を取得したという表示はしない。

高圧ガス化学は択一410問・2050肢の解説と、甲種学識12問の独自解答・自己採点基準を保持した。公開クライアント用配列は受入済み `ready.json` と同一。49画像は許可リスト付き画像APIで配信する。R6液石学識問20の公式採点と技術的留保を保持する。自己採点チェックは正誤履歴・報酬・自動採点へ加算しない。

1級建築施工管理は令和7・8年度各72問、午前44・午後28の計144問。RS1KのR7 No.31断熱工法の修正とR8 No.51原文注記を含む。R7 No.57は公式訂正どおり3・4どちらか一方を正答とし、同時選択を要求しない。

高圧ガス機械 `a688a1e73` と冷凍 `65f0ef46b` は起点に含まれていたため再取込みしない。甲種機械80・乙種機械100、第一種冷凍80・第二種冷凍80・第三種冷凍70を継承し再検証する。合計確認範囲は1,226原問・1,225演習。ほかのバッチ1公開範囲・保留を維持する。

## iOS・DB・既存Webの境界

iOS固定HEADのサーバー・API・認証・アカウント削除、依存するfeedback-unlock実装、`mobile/`・`codemagic.yaml` を統合した。バッチ1の依存関係のセキュリティ更新、数値・順序・記述式対応、公式番号、技術士のトレース設定を保持する。mobileカタログは統合後の公開データから再生成した。nativeの日程連携に元から検証済みの対応がない資格77件は `mobile/shared/qualification-source-gaps.json` へ明示し、日程や別資格への対応を創作していない。

DB1の3本は `prisma/migrations/20261104000000_mobile_revenuecat`、`20261104010000_mobile_account_deletion`、`20261104020000_mobile_store_environments`。SQLはDB1成果と一致し、raw SQL管理を維持する。`schema.prisma` へのモデル追加やmigration実行はしていない。`prisma generate` はローカルClientの生成だけ。

**後続の本番適用順序：** `docs/mobile-db-migrations.md` と `docs/mobile-db-check.sql` に従い、DB1の事前確認→未適用が対象3本だけであることの確認→migration適用→事後照合→iOSサーバー差分の反映→必要なmobile設定の有効化・利用、とする。mobile認証・アカウント削除を使う前に必ず適用する。以前のfeedback用migrationが未適用なら別途停止・確認する。buildはmigrationを自動実行しない。本作業では本番接続・適用・実効Vercel設定確認をしていない。INT5でのDB検証は [migration-receipt.json](migration-receipt.json) の静的一致確認であり、DB1が行ったローカルPostgres検証を再実行したものではない。

`MOBILE_IAP_ENABLED` 未設定時はstrict gateが無効で、RevenueCat処理はSQL前に戻る。新テーブルが存在しない模擬DBを使うテストで、既存APと新規3資格のWeb問題経路が200を返しSQLを呼ばないことを検証する。通常Webの実HTTP・E2EはDB・認証・mobile・実AIキー未設定で行う。

独立レビュー初回は技術士の正答インデックスがstrict/nativeバンドルへ混入する経路を指摘した。`reference-aware-grading-index` も認可済みプレーヤーデータを使う空のインデックスへ置換し、監査に追加した。

追加の生成物監査は、バッチ1の気象予報士専用リーダーが本文をクライアントへ同梱していたことを検出した。この専用リーダーはまだgrant対応がないためstrict/native buildではコーパスを供給せず、専用詳細経路は404となる。通常Web（mobile未設定）の専用リーダーは従来どおり。mobile有効化時の完全な専用リーダー対応済みとは扱わない。

オフライン画像収集は、表示画像と `officialReferenceUrls` の参考リンクを区別する。外部JPGへの参考リンクはダウンロードせず、実際の外部表示画像は拒否を維持する。inline画像は問題JSON内のバイトとして保持する。

## AI経路と残条件

SEC1 `7ab33c41a` の共通予算予約・精算、KV不明時の拒否、Gemini totalTokens記録と、指定のiOSパッチを4 AI APIへ統合した。iOSのcontent grantを維持し、月50,000円の上限値・レート値・料金・無料枠の設定は変えていない。これをSEC1の中低所見すべての解決とは扱わない。

**CLAUDE.md §7に該当する。** コパイロット2経路・午後採点・論述採点、およびクライアントのAI送信同意に変更がある。実AIをPreviewで1回実行し、実応答、`STOP`、費用増加を目視確認する作業は未実施。ユーザーのデプロイ禁止を優先しており、公開前の残条件とする。モックのE2Eやローカルbuildを実AI検証の代わりにしない。

## 検証と独立レビュー

最終結果は [validation.json](validation.json)、コマンド・終了コード・ログSHA256は [validation/](validation/)、実画面は [browser/receipt.json](browser/receipt.json) に保存した。CI相当E2E自身が出力した5画像も [ci-browser/receipt.json](ci-browser/receipt.json) に別途保管した。

| 検証 | 結果 |
|---|---|
| `corepack pnpm typecheck` | PASS、終了0 |
| `corepack pnpm lint` | PASS、エラー0・警告12 |
| `corepack pnpm test --maxWorkers=4` | PASS、770ファイル成功・1ファイルskip、7,872件成功・失敗0・10件skip |
| `corepack pnpm build` | PASS、Next.js 16.4.5、17,958静的ページ |
| `corepack pnpm e2e`、`CI=true` | PASS、全347件中341件が初回成功、1件がCI設定の再試行で成功、5件skip。2 workers・retry 1 |
| `corepack pnpm validate:questions` | PASS、35,199問、fail=0、品質警告20,515 |
| CIのworkflow gate・安全資格・官公庁リンク検査 | 全てPASS。外部リンクのlive取得はしない `--skip-live` |
| 同期・遅延ローダー／実HTTP検索 | 141資格・33,188演習の件数一致。新規815問と継承410問も一致 |
| 実画面 | 8資格・24フロー＋技術士2経路。幅390/1280、ブラウザ例外0、横幅のはみ出しなし。PNG80点 |
| 実画像HTTP | 新規投影31＋化学49の80画像全て200、原図SHA256と一致 |
| HTTP境界 | health 200、秘密未設定cron 503、未認証メール401、6セキュリティヘッダー、8資格のsitemap掲載 |
| strict Web build＋生成物監査 | PASS。17,880静的ページ、保護対象HTML/RSC各9,151、クライアント135チャンク、本文・解答・正答indexの漏えい検出0 |
| native Webアセット | PASS、13ファイル・1,837,857 bytes、gzip 453,769 bytes。コーパス混入を検査。Xcode/IPAではない |
| mobile単体・E2E | 79件PASS、34件PASS。E2Eはローカルfixture／通信モックであり実App Store・実RevenueCatの検証ではない |
| 公開投影の再生成 | 再実行後の追跡出力差分0。受入原稿・画像ハッシュを保持 |

ローカル環境はWindows・Node 24.13.1・pnpm 10.33.0。E2EはCIと同じコマンド・設定であり、GitHub上のUbuntu/Node 22ジョブを実行したという意味ではない。E2Eの404経路1件は初回 `ECONNRESET` 後にretryで成功し、flakyとして記録する。5件skipはPAID_MODE無効時のEnterprise確認で、今回有効化しない。単体テスト10件skipは任意Postgres確認8件と保存PDFの追加照合2件。buildには既存のEdge/middleware非推奨とSSRチャート寸法の警告、nativeアセットには大きいchunkの警告がある。

strict監査は `c017ab7b0` の隔離worktree `C:/Users/kanet/AppData/Local/Temp/codex-work/int5-gated-c017ab7b0` で実行した。以後の配信コード差分は `QuizClient` のquiet条件だけで、strict時は引き続きtrue。監査は生成済みHTML/RSCとクライアントチャンクが対象で、全ての動的認証・有料経路やliveサービスを実行したものではない。

実画面では一覧→資格→年度→問題→解答→解説を操作し、記述の自己確認、化学の自己採点チェック、公式解答図、R7 No.57の代替正答、R8 No.51の原文注記を確認した。数式・図・自己採点の要所はPNGを目視した。実画面確認では外部通信・AI経路・非GET通信を遮断し、画面の応答を偽装していない。E2EのAI送信契約だけは既存どおりAPIをローカルでinterceptし、実AIを呼ばない。

初回全テストの失敗は、新しいVitest・pnpm配置に対するテストのimport、Node用Authテストの実行環境、SEC1のfail-closed admissionとprovider回帰テストの境界、科目ラベル、画像収集で切り分けた。provider専用テストはadmissionを独立fixtureとし、別のsecurityテストで実際のfail-closed制約を維持する。通過済みの検査を緩めて本番制約を解除したものではない。

全テストの追加実行で購入確認の分析effectに対する待機不足を1件検出し、イベント名・回数・重複防止の期待値を保持して完了を待つよう修正した。E2Eでは無条件quietによる通常Webバッジ抑制を修正した。独立レビュー4の必須prop欠落も修正し、その後の型検査を通した。

独立レビューは指定の `C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only` を別プロセスで実施。初回FAIL→再レビュー2 PASS（`48c28c74b`）、追加修正レビュー3 PASS（`c017ab7b0`）、レビュー4のテスト型不備FAIL→修正→最終レビュー5 PASS（検証証跡を含む `178f827f4`）。[最終独立レビュー](independent-review5.md) は9検証ログと80画面画像のハッシュ一致も独立に確認した。全原問の再校閲・本番疎通・デプロイ承認を意味しない。

push・PR・mainマージ・デプロイ・本番設定変更・本番DB接続は実施していない。秘密値をログ・Git・本報告へ出していない。`C:/Users/kanet/secrets-local` は参照していない。
