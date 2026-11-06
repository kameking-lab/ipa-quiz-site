# 過去問AI iOS — IOS1D

CM3のBundle ID・ネイティブ生成・署名検証手順は [docs/cm3-build.md](./docs/cm3-build.md) を参照。

広告はADS1の承認に基づき、Google Mobile Ads SDK / WebView APIとATT・Web CMPの同意ゲートを導入した。必須環境変数なしでは広告無効のまま動作する。設定・実機確認は [docs/ads1-advertising.md](./docs/ads1-advertising.md)、審査ログインは [docs/ios3-release.md](./docs/ios3-release.md) を参照。

IOS1Dの変更と公開前に必要な実環境確認は [docs/ios1d-release.md](./docs/ios1d-release.md) を参照。

2026-11-03の所有者の最終指示に対応した初版。旧36問アプリを廃止し、App Storeの月額課金も初版に実装した。公開・審査・実機ビルドの完了報告ではない。

## 同じソースを利用する構成

起動はCapacitorの同梱画面。オンラインでは同じWebView内で `https://www.kakomon-ai.jp` の既存Next.jsページ・React・APIを実行する。iframeは使わず、`server.url` も設定しない。許可するリモート遷移先はこのホストだけ。通信失敗時は同梱画面へ戻る。

全125ページの棚卸しは `docs/route-matrix.json`、問題数・容量は `docs/content-size.json`。`npm run catalog` はウェブの公開ローダーと品質判定から全目次を生成する。非公開・照合保留の扱いもウェブと同じ。本文はオンライン取得と有料会員の任意保存で提供する。Viteの `no-question-bundles` 検査で本文ソースの混入を拒否する（公式PDFの出典URL一覧は許可）。

同梱画面も通常の `QuizPlayer`、`ExamQuestionPlayer`、FP実技・応用編、電験原問・二次記述、社労士選択式、中小企業診断士二次、論述エディターを直接importする。表示部分はウェブのページから共通Reactビューへ移動し、本文・HTML・採点ロジックをコピーして二重管理しない。

オンラインの全モード、模試、検索、ブックマーク、履歴・統計、学習計画、ランキング・報酬、AI、記述・論述採点、意見送信、アカウント・同期、情報ページは同じウェブの経路で利用する。AI・クラウド同期・サーバー採点には通信が必要。

## 無料枠・会員権利

- アプリ（`X-Kakomon-Native: ios`）はウェブと同じモデル：ログイン不要の匿名ゲストで全資格共通の1日10問 → 意見送信1回で+10問（ログインは意見送信の段階だけ）→ それ以上はウェブ月額会員またはApp Storeサブスク（`kakomon_pro`）。JST 0時更新、その日に許可した異なる問題IDをサーバーの既存台帳で数える。再取得は重複消費しない。
- `MOBILE_IAP_ENABLED` はiOSのRevenueCat経路（SDKキー・Offering配布、権利確認、Webhook）だけを有効にする。ウェブの挙動は変えない。
- ウェブ全体の厳格ゲート（ログイン必須・SSR問題ページの差し替え・公開GET/AIの本文付与制限）は別フラグ `WEB_STRICT_CONTENT_GATE=true`（既定オフ）。ビルド時・実行時の両方で設定した場合のみ有効。この構成では移行猶予や意見送信による追加枠は付与しない。
- 通常演習、問題ページ、模試、ストリーム、チャレンジ、別形式のアプリ用UIは共通のサーバー開始判定を通す。ローカルのpremiumフラグやSDKの自己申告では解除しない。
- 有効なウェブ会員権利を最優先し、次にサーバーがRevenueCatから確認した `kakomon_pro` を採用する。有料は全資格を回数無制限。既存AIの不正利用防止・費用上限は保持する。

## App Store / RevenueCat

公式 `@revenuecat/purchases-capacitor` を使用する。商品は1か月の自動更新サブスク1種。商品ID・Offering・公開SDKキーは設定値。価格表示はStoreKitの商品情報を使い、ウェブの共通オファー（月額980円・税込）と一致するJPYの商品を購入できる。

購入直前にも会員状態と価格を再確認する。ウェブ有料会員には追加購入を出さない。承認待ち・確認待ちは再購入を止め、購入復元と権利再確認に誘導する。復元、App Store管理・解約、利用規約、プライバシー、Apple標準EULAを表示する。アプリ内の `/billing/*` はStoreKit用画面に置き換え、ウェブ決済を実行しない。IAP有効会員はウェブの追加購入APIでも拒否する。

StoreKitの商品自体の期間が `P1M` であることも検証する。価格/商品確認が終わってから購入待ちを保存し、購入画面を開く。キャンセル・明示的な購入拒否は再試行可能にし、承認待ちや結果不明の通信失敗は確認待ちを保持する。復元後にサーバーが権利を認めない場合は成功と表示しない。RevenueCatから確認した有効な支払猶予期間も権利期限に反映する。

App User IDは認証済み会員IDからHMACで生成する。Webhookは認証ヘッダーとアプリID・環境を検証し、DB行ロック取得後にRevenueCatの最新状態を取得する。重複・逆順通知から古い権利を復活させない。移管元・先、返金、失効も再確認する。Webhook本文・SDKのCustomerInfo自体を有料権利の根拠にはしない。

`config/server.env.example` は空値の設定一覧。実値は今回使用していない。主な設定は以下。

| 設定 | 用途 |
|---|---|
| `MOBILE_IAP_ENABLED` | iOSのRevenueCat連携の有効化（ウェブの演習ゲートには影響しない） |
| `WEB_STRICT_CONTENT_GATE` | ウェブ厳格ゲート。既定オフ。アプリ販売には不要 |
| `MOBILE_RC_IOS_PUBLIC_KEY` | iOS用公開SDKキー |
| `MOBILE_RC_PRODUCT_ID` / `MOBILE_RC_OFFERING_ID` | 月額商品とOffering |
| `MOBILE_RC_ENTITLEMENT` | `kakomon_pro` |
| `MOBILE_RC_APP_ID` | Webhookのアプリ識別子 |
| `MOBILE_RC_SECRET_KEY` | サーバーでの購読確認専用 |
| `MOBILE_RC_WEBHOOK_AUTHORIZATION` | Webhook認証ヘッダー全体 |
| `MOBILE_RC_IDENTITY_SECRET` | 32文字以上のID生成用秘密値 |
| `MOBILE_LEASE_PRIVATE_KEY` / `MOBILE_LEASE_PUBLIC_KEY` | P-256 ECDSA鍵（PEM） |
| `config/public.json` の `leasePublicKey` | 配布アプリに固定する同じ公開鍵 |
| `AUTH_APPLE_ID` / `AUTH_APPLE_SECRET` | Sign in with Appleのサーバー設定 |

秘密鍵・秘密APIキーはクライアントへ出さない。公開鍵は初期状態では空。未設定の購入・保存を成功したようには見せない。既存ウェブの会員DB・無料枠用KV・Auth設定も共用する。

DB用SQLの3本は `../prisma/migrations/20261104*` に移管した。会員とRevenueCatの対応表、PKCEコード、削除後の課金保持用テーブルと追加列を含む。2026-11-04 14:30 JSTにオーナー承認済み。本番適用は未実施。[対応表](./migrations/README.md) と [適用・確認手順](../docs/mobile-db-migrations.md) を参照。

## ログイン・同期

最新の審査用会員自動作成、Apple Services ID/Return URL/Keyの設定、環境変数と検証条件は [IOS3ログイン運用](./docs/ios3-release.md) を参照。本番の通常ログインは現時点でGoogleのみで、メールのマジックリンクは未使用。

Appleログインを追加した。Apple未設定のアプリ用ログイン経路には他の外部プロバイダーを表示しない。認証はシステムブラウザで行い、PKCE・state・利用者の確認画面・60秒の一度だけ使えるコードでアプリへ戻す。コードとverifierはPOSTで交換し、セッショントークンはHttpOnly Cookieにする。戻りURLにはセッショントークンを含めない。`kakomonai://auth` をiOS生成スクリプトに登録する。意見送信の下書きなどの復帰先も保持する。

ウェブと同梱画面の学習記録は、会員の所有者を確認したPreferencesスナップショットで受け渡す。Cookieや課金フラグは復元対象外。既存の履歴・ブックマーク・タグ・計画同期APIを共用し、別アカウントへの自動取り込みをしない。

スナップショットはゲスト/各会員ごとに保存する。論述の下書き・採点履歴、学習計画、試験紙の進捗/セッション、復習・報酬の状態も引き継ぐ。有料のオフライン権利が切れても履歴の所有者情報は維持し、ログアウト時はゲストの記録へ切り替える。アプリがバックグラウンドへ移る時にも保存する。PKCE交換後のセッションにはサーバーDBのプロフィールを含め、削除済みアカウントにはセッションを発行しない。

## 有料限定ダウンロードとネイティブ機能

全目次・オンライン問題は全員が利用可能。無料の保存ボタンは有料特典の案内だけ。サーバーも無料・未ログイン・署名なしの保存を403にする。資格単位で関連形式をまとめて保存し、APIは10件ずつ返す。全件数・ID重複・SHA-256を確認してから参照先を切り替え、中止・破損・版変更・ディスク不足では既存データを保持する。オンラインでも現行本文のハッシュと開始権利が一致すると保存済み本文を使って転送を省く。

利用には固定公開鍵で検証できる署名付き権利が必要。期限は有料期間末と発行後24時間の早い方。ログアウト、アカウント変更、オンラインでの失効確認で保存済みデータを無効にする。契約満了は署名期限で止める。完全圏外で生じた取消・返金は即時検知できないため、停止には署名済み許可の残存期間（最大24時間）がある。端末時計の巻戻しも検出する。

画像は必要な問題の表示時に取得し、100MB上限でキャッシュ。未保存の図表はオンライン確認を案内する。毎日のローカル通知、通知からの復習、OSの共有シートも実装する。通知許可は設定時だけ要求する。

権利の読取/更新/失効を直列化し、確認中の保存処理が失効した権利を復活させない。失効通知は表示中の通常問題・試験紙・別形式にも反映する。画像キャッシュはOSによるファイル削除を検知して再取得し、問題切替中に前の図を表示しない。

## ローカル検証と配布前の確認

### IOS1C: 資格の日程・申込情報とカレンダー

オンラインの資格ページ・演習ページと端末内の資格カードに、日程取得・カレンダー追加・「次の資格」の資格情報ページを追加した。`shared/qualification-links.json` は2026-11-03の公開検索APIに照合した対応表。211目次のうち209件に対応し、ガス主任技術者の乙種・丙種は該当ページが確認できないため追加・誤誘導をしない。共通ページしかない級・区分は情報リンクだけを表示する。

日程は `https://tsugino-shikaku.jp/api/qualification-summaries?ids={id}&schedules=1` からCapacitorのネイティブHTTPで取得する。確定状態、日付、公式出典、出典確認日、有効期限、推定フラグ、日付間の矛盾を検査し、保存直前にも再取得する。未確定・過去・期限切れ・予約者本人の日付を特定できないCBT期間は試験日として追加しない。申込方法別の締切は別々に示す。予定は終日で、締切時刻と消印・必着の条件は出典で確認する。

`ios-assets/QualificationBridgeViewController.swift` のEventKitUI標準編集画面で利用者が保存・キャンセルを選ぶ。カレンダーを読まず、権限要求・直接保存は行わない。この方式はiOS 17以降限定で、既存アプリのiOS 15/16対応は保持する。iOS 15/16では追加操作時に対応OSを案内し、情報リンクを利用できる。`ios:prepare` はSwiftソースのコピー・Xcodeターゲット登録・Storyboardのカスタムコントローラー設定まで行う（Windowsでは実行しない）。

資格情報のリンクは `/shikaku/{id}` のみ許可する。`UIApplication.open(..., universalLinksOnly: true)` に成功すれば相手アプリへ移動し、未インストール／関連付け不成立なら `@capacitor/browser`（iOSではSFSafariViewController）で開く。今回、遷移先サイトのAASAは `.well-known` とルートの双方が404だった。相手側のAssociated Domains/AASA公開と実機確認は残る。設定変更・公開はしていない。

購入CTA・課金ページへの直接リンクは追加していない。リンクは申込方法・日程・関連資格の確認目的で、アプリ内の有料機能を外部決済で解除する導線ではない。リンク先には教材・PR案内もあるため、提出前に最新内容を再確認する。App Review 3.1の判断と未検証範囲は [IOS1C-REPORT.md](./IOS1C-REPORT.md) を参照。

```powershell
# リポジトリのルート
npx --yes pnpm@10.33.0 install --frozen-lockfile --ignore-scripts
npx --no-install prisma generate
cd mobile
npm ci
npm run typecheck
npm test
npm run test:e2e
npm run build
```

### CM2: Node 22でのクリーンビルド再現

Node 22.23.4をPATHの先頭に置き、`node --version` が `v22.23.4` であることを確認する。
コミット済みのローカルリポジトリから新規cloneを作ると、既存の依存・生成物・未追跡ファイルを引き継がずに検証できる。
以下はmacOS/Linuxのシェル例（`/path/to/ipa-quiz-ios1` は実際のローカルパスへ置き換える）。

```sh
set -eu
test "$(node --version)" = v22.23.4
git clone --no-local --branch feat/ios-app-v1-20261103 /path/to/ipa-quiz-ios1 /tmp/ipa-quiz-cm2-clean
cd /tmp/ipa-quiz-cm2-clean
npx --yes pnpm@10.33.0 install --frozen-lockfile --ignore-scripts
npx --no-install prisma generate
cd mobile
npm ci
npm run typecheck
npm test
npm run build
```

ルートのpnpm依存は共有ソースの解決に必要。mobileの依存は `package-lock.json` に従って `npm ci` で入れ直す。
検証には環境ファイルやSDKキーを用意しない。Codemagicの配布時の公開キー確認は既存の手順で行う。
`catalog` はtsxのrequire hookを使って共有ソースを読み込む。mobileのESMとルートのCommonJS境界をNode 22のESM名前付きexport推論で越えないため、ルート全体の `type` 変更やViteの `--configLoader native` は不要。
VitestはVite経由で変換するため、このローダー境界の回帰確認には通常の `npm run build` まで実行する。

`build` はアプリ用Vite静的アセットの生成だけで、Next.js/Vercelビルドではない。`test:e2e` は毎回モック用鍵を生成する。鍵・本文フィクスチャは `.cache/` だけに置く。通常の配布用ビルドにはテスト用ハーネスと鍵を入れない。テスト後は通常の `build` を実行する。

通常ビルドの最後に `scripts/measure-bundle.mjs` がファイル容量/gzip容量を `docs/bundle-size.json` へ記録し、E2Eハーネスが残っていれば失敗する。IPAとApp Store表示の容量はmacOS/App Storeで別に測定する。購入キャンセル・承認待ちの再起動保持・価格変更・復元対象なしのE2Eも、SDKアダプターへ注入したモックで検証する。

`codemagic.yaml` の `kakomon-ios-testflight` は共通依存を導入し、macOSで署名済みIPAを生成してApp Store Connectへアップロードする設定。`feat/ios-app-*` へのpushでmobile/codemagic.yamlに変更があれば自動実行する。TestFlight配信・App Store審査への提出は無効。環境変数グループ `kakomon_ios` の `MOBILE_RC_IOS_PUBLIC_KEY` をVite経由で同梱し、RevenueCat初期化に使う（サーバー用秘密値は渡さない）。署名資材はCodemagicのCode signing identitiesで事前にfetch/作成・登録する。ビルド番号取得後、`ios:prepare` が未生成時のcap add ios（CocoaPods指定）、cap sync ios、既存ios-assetsの組み込み、登録済みBundle IDの復元・検証を実行する。profile適用後にもBundle IDとexport optionsを検証してからIPAを作る。ネイティブへの変更は再現用スクリプト・素材で管理し、`mobile/ios/` は引き続きgit管理外。Windowsでは生成・設定処理と回帰テストまで検証できるが、CocoaPods導入・Swiftコンパイル・実署名・アップロードはmacOSでの確認が必要。App Store商品登録、RevenueCat・Apple設定、実機での購入／復元／Cookie復帰／通知、App Privacy、アーカイブの実容量と審査は公開前の確認事項。

公式資料: [RevenueCat Capacitor SDK](https://www.revenuecat.com/docs/getting-started/installation/capacitor)、[Webhook](https://www.revenuecat.com/docs/integrations/webhooks)、[Apple審査](https://developer.apple.com/app-store/review/guidelines/)、[Appleの容量上限](https://developer.apple.com/help/app-store-connect/reference/app-uploads/maximum-build-file-sizes/)。
