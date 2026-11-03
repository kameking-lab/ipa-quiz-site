# 過去問AI iOS — IOS1B

2026-11-03の所有者の最終指示に対応した初版。旧36問アプリを廃止し、App Storeの月額課金も初版に実装した。公開・審査・実機ビルドの完了報告ではない。

## 同じソースを利用する構成

起動はCapacitorの同梱画面。オンラインでは同じWebView内で `https://www.kakomon-ai.jp` の既存Next.jsページ・React・APIを実行する。iframeは使わず、`server.url` も設定しない。許可するリモート遷移先はこのホストだけ。通信失敗時は同梱画面へ戻る。

全125ページの棚卸しは `docs/route-matrix.json`、問題数・容量は `docs/content-size.json`。`npm run catalog` はウェブの公開ローダーと品質判定から全目次を生成する。非公開・照合保留の扱いもウェブと同じ。本文はオンライン取得と有料会員の任意保存で提供する。Viteの `no-question-bundles` 検査で本文ソースの混入を拒否する（公式PDFの出典URL一覧は許可）。

同梱画面も通常の `QuizPlayer`、`ExamQuestionPlayer`、FP実技・応用編、電験原問・二次記述、社労士選択式、中小企業診断士二次、論述エディターを直接importする。表示部分はウェブのページから共通Reactビューへ移動し、本文・HTML・採点ロジックをコピーして二重管理しない。

オンラインの全モード、模試、検索、ブックマーク、履歴・統計、学習計画、ランキング・報酬、AI、記述・論述採点、意見送信、アカウント・同期、情報ページは同じウェブの経路で利用する。AI・クラウド同期・サーバー採点には通信が必要。

## 無料枠・会員権利

- 無料は全資格・全問題から1日10問。最初の10問はログイン不要。
- 既存 `POST /api/billing/question` のRedis署名Cookie、アカウントへの引継ぎ、JST 0時更新、意見で追加10問のDB判定を共有する。数え方はその日に開始した異なる問題ID。再取得・複数空欄で重複消費しない。
- 通常演習、問題ページ、模試、ストリーム、チャレンジ、別形式のアプリ用UIは共通のサーバー開始判定を通す。ローカルのpremiumフラグやSDKの自己申告では解除しない。
- 有効なウェブ会員権利を最優先し、次にサーバーがRevenueCatから確認した `kakomon_pro` を採用する。有料は全資格を回数無制限。既存AIの不正利用防止・費用上限は保持する。

## App Store / RevenueCat

公式 `@revenuecat/purchases-capacitor` を使用する。商品は1か月の自動更新サブスク1種。商品ID・Offering・公開SDKキーは設定値。価格表示はStoreKitの商品情報を使い、ウェブの共通オファー（月額980円・税込）と一致するJPYの商品を購入できる。

購入直前にも会員状態と価格を再確認する。ウェブ有料会員には追加購入を出さない。承認待ち・確認待ちは再購入を止め、購入復元と権利再確認に誘導する。復元、App Store管理・解約、利用規約、プライバシー、Apple標準EULAを表示する。アプリ内の `/billing/*` はStoreKit用画面に置き換え、ウェブ決済を実行しない。IAP有効会員はウェブの追加購入APIでも拒否する。

App User IDは認証済み会員IDからHMACで生成する。Webhookは認証ヘッダーとアプリID・環境を検証し、DB行ロック取得後にRevenueCatの最新状態を取得する。重複・逆順通知から古い権利を復活させない。移管元・先、返金、失効も再確認する。Webhook本文・SDKのCustomerInfo自体を有料権利の根拠にはしない。

`config/server.env.example` は空値の設定一覧。実値は今回使用していない。主な設定は以下。

| 設定 | 用途 |
|---|---|
| `MOBILE_IAP_ENABLED` | RevenueCat連携の有効化 |
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

`migrations/20261103_mobile_revenuecat.sql` は会員とRevenueCatの対応表、およびPKCEコード用テーブル。**本番DBへの適用は所有者承認待ちで、今回は適用していない。**

## ログイン・同期

Appleログインを追加した。Apple未設定のアプリ用ログイン経路には他の外部プロバイダーを表示しない。認証はシステムブラウザで行い、PKCE・state・利用者の確認画面・60秒の一度だけ使えるコードでアプリへ戻す。コードとverifierはPOSTで交換し、セッショントークンはHttpOnly Cookieにする。戻りURLにはセッショントークンを含めない。`kakomonai://auth` をiOS生成スクリプトに登録する。意見送信の下書きなどの復帰先も保持する。

ウェブと同梱画面の学習記録は、会員の所有者を確認したPreferencesスナップショットで受け渡す。Cookieや課金フラグは復元対象外。既存の履歴・ブックマーク・タグ・計画同期APIを共用し、別アカウントへの自動取り込みをしない。

## 有料限定ダウンロードとネイティブ機能

全目次・オンライン問題は全員が利用可能。無料の保存ボタンは有料特典の案内だけ。サーバーも無料・未ログイン・署名なしの保存を403にする。資格単位で関連形式をまとめて保存し、APIは10件ずつ返す。全件数・ID重複・SHA-256を確認してから参照先を切り替え、中止・破損・版変更・ディスク不足では既存データを保持する。オンラインでも現行本文のハッシュと開始権利が一致すると保存済み本文を使って転送を省く。

利用には固定公開鍵で検証できる署名付き権利が必要。期限は有料期間末と発行後24時間の早い方。ログアウト、アカウント変更、オンラインでの失効確認で保存済みデータを無効にする。契約満了は署名期限で止める。完全圏外で生じた取消・返金は即時検知できないため、停止には署名済み許可の残存期間（最大24時間）がある。端末時計の巻戻しも検出する。

画像は必要な問題の表示時に取得し、100MB上限でキャッシュ。未保存の図表はオンライン確認を案内する。毎日のローカル通知、通知からの復習、OSの共有シートも実装する。通知許可は設定時だけ要求する。

## ローカル検証と配布前の確認

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

`build` はアプリ用Vite静的アセットの生成だけで、Next.js/Vercelビルドではない。`test:e2e` は毎回モック用鍵を生成する。鍵・本文フィクスチャは `.cache/` だけに置く。通常の配布用ビルドにはテスト用ハーネスと鍵を入れない。テスト後は通常の `build` を実行する。

`codemagic.yaml` は共通依存を導入してからmacOSでunsigned archiveを作る設定。今回、Codemagic実行・署名・アップロード・トリガー設定はしていない。WindowsではiOS生成・Xcodeビルドは未実施。App Store商品登録、RevenueCat・Apple設定、実機での購入／復元／Cookie復帰／通知、App Privacy、アーカイブの実容量と審査は公開前の確認事項。

公式資料: [RevenueCat Capacitor SDK](https://www.revenuecat.com/docs/getting-started/installation/capacitor)、[Webhook](https://www.revenuecat.com/docs/integrations/webhooks)、[Apple審査](https://developer.apple.com/app-store/review/guidelines/)、[Appleの容量上限](https://developer.apple.com/help/app-store-connect/reference/app-uploads/maximum-build-file-sizes/)。
