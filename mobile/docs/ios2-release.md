# IOS2 審査提出前の変更（2026-11-04）

## 広告とATTの現状

オーナー方針は広告あり・Tracking Yes。現行のWKWebViewへAdSenseタグだけを表示する構成はGoogleの技術要件を満たさないため、今回のビルドは**広告停止・追跡停止**とする。広告SDKの新規導入は承認待ちで、導入・外部設定・デプロイはしていない。

- [AdSense プログラムポリシー](https://support.google.com/adsense/answer/48182?hl=en) の「Technical requirements for web content viewing frames for apps」はGoogle Mobile Ads SDKへのWebView登録等を要求する。
- [GoogleのiOS WebView API for Ads](https://developers.google.com/admob/ios/browser/webview/api-for-ads) はSDK 9.6.0以降と `MobileAds.shared.register(webView)` を要求する。WebView専用なら `GADIntegrationManager=webview` の方法がある。AdMobのネイティブ広告枠を必ず購入するという意味ではない。
- AdSense自体がWebViewで全面禁止という結論ではない。**今の未登録WKWebViewでタグだけを有効にする実装は採用しない**。SFSafariViewControllerへ置き換えることで現行iOSの例外に該当すると解釈しない。

承認後の案：Google Mobile Ads SDKを追加しCapacitorの実WKWebViewを登録、WebView側の地域別同意を実装する。AdMobのネイティブ広告を使うなら別途AdMobアプリ/広告枠設定も必要。ATTはGoogleの同意管理を代替せず、WebView APIもアプリ側同意をWebタグへ自動伝播しない。未許可はIDFA不使用・他社データ結合なし。非パーソナライズ設定だけで追跡なしと断言せず、限定広告または広告停止へ倒す。

`TrackingTransparencyPlugin.swift` はローカルCapacitorプラグイン（外部依存追加なし）。iOSのATT状態取得と、フォアグラウンドで未決定時に一度だけシステムダイアログを出す処理を実装。`configure-ios.rb` が日本語の `NSUserTrackingUsageDescription` をInfo.plistへ登録する。現状はSwift/TS両方の広告ゲートがfalseなので目的のないダイアログは表示しない。広告導入時はこのゲートだけでなく、下記の広告ブロック・manifest・申告も同時に更新する必要がある。

アプリ同梱画面の起動前にWKContentRuleListを登録し、Google広告関連ドメインを遮断する。失敗時はオンラインUIを起動しない。WebのContentEndAdも環境検出が済むまでスクリプトを生成せず、Capacitorでは常に停止する。PostHog/Vercel Analytics/Speed InsightsもCapacitor内では停止。通常ブラウザの広告は維持する。RevenueCatは広告識別子収集APIを呼ばず、購読確認用のHMAC会員IDを使う。サーバー側Sentry等の運用データと機能上の履歴同期は残る。

PrivacyInfo.xcprivacyは実際の今回構成に合わせTracking false・広告ドメインなし、確実な収集項目を追加した。オーナーのTracking Yesを実装前に申告してよいという意味ではない。広告ありで提出するにはSDK導入承認と追加実装が残る。

## 審査用ログイン（IOS3で更新）

本番の通常ログインはGoogleのみで、メールのマジックリンクは未使用。IOS2の手作業で既存会員を用意する方式は廃止し、正しい審査コードでの初回認証時にサーバーが専用の無料・未契約会員を自動作成する。メール入力・受信・Googleアカウント・USER_ID/EMAIL環境変数は不要。DBスキーマ変更なし。

現行の環境変数、失効・悪用防止、Apple 4.8対応、オーナー設定、ASCメモは [IOS3ログイン運用](./ios3-release.md) を使用する。以下のIOS2検証結果はIOS2時点の履歴である。

## 実環境で残る確認

WindowsではSwift/Xcodeコンパイル・署名IPA・実機ATT・広告遮断のネットワーク検証はできない。macOSの `npm run ios:prepare`→Archiveでプラグイン登録・plist・manifest同梱を確認し、初回/許可/拒否/制限/設定変更後の状態を検証する。現行ゲートでは広告もATT要求も出ない。希望するTracking Yesの構成は未完成で、そのまま広告あり申告で提出しない。

既存IOS1の本番MobileAuthCodeテーブル（authenticatedAt含む）・RevenueCat対応表が未承認/未適用なら、アプリへの復帰・購入確認は引き続き不可。IOS2のスキーマ変更はないが、既存移行の承認/適用済み確認は別に必要。新規外部サービス契約、DB適用、ASC編集、push/PR/デプロイは今回の作業対象外。

審査用ログインには、このコミットのWeb側認証変更を `www.kakomon-ai.jp` へ反映する作業も必要。環境変数を設定するだけでは現行公開サイトにログインUIやAPIは追加されない。Webと配布アプリの版を揃え、変更後の認証設定が全インスタンスへ反映されることを確認する。

## 検証結果

Windows / Node 22.23.4。rootのtypecheck・build、mobileのtypecheck・test（76件）・build、変更TS/TSXのESLintはPASS。root全テストは `pnpm exec vitest run --maxWorkers=4 --minWorkers=1 --testTimeout=60000` で7,187件PASS、既存DB依存8件skip。大量コーパスのcold importで既定並列実行がタイムアウトしたため、並列数と待ち時間を明示した。AI同意と既存会員ゲートに合わない旧テスト前提も修正したが、本体AI・費用上限・無料枠は変更していない。

指定の `codex.cmd exec -m gpt-6-astra -s read-only` による独立セキュリティレビューは、共有枠ロックアウト・診断申告不足・戻りURLの問題を修正後にPASS。認証情報はランダムなテスト用値だけで検証し、実際の秘密設定・本番DBは使用していない。macOS/実機確認は上記のとおり残る。
