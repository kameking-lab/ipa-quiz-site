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

## 審査用ログイン

`config/app-review.env.example` の名前だけを参照し、値はサーバーの秘密設定で管理する。通常の既存アカウントを1件用意し、その不変のUser.idとメールを両方指定する。個人の本アカウント・管理用アカウント・teamアカウントを指定しない。アカウントの作成/有料権利の付与は今回行っていない。

- `APP_REVIEW_LOGIN_ENABLED` がtrue、必要設定が全て存在し、`APP_REVIEW_EXPIRES_AT` が未来の場合だけUIと認証が有効。`AUTH_URL` は本番のHTTPS origin。
- `APP_REVIEW_CODE_SHA256` は32バイト以上の暗号学的乱数から作ったbase64urlコードのSHA-256（小文字hex）。生コードは環境変数・コード・報告書に保存しない。オーナーの秘密管理とApp Store Connectの審査資格情報欄でだけ共有する。短い数字コードを使わない。
- NextAuth Credentials（app-review）を既存のJWT認証に追加。既存Auth.jsのCSRF検証、明示origin検証、定時間ハッシュ比較を通す。対象以外のメールではログインできない。DBから既存IDとメールの一致を再確認し、新規登録・アカウントリンク・会員プランの昇格は行わない。
- 既存共有KVで送信元を原子的に制限（UTC固定時間枠で10回/分・100回/日）。正しい資格情報にだけ別枠の全送信元共通20回/時・100回/日を適用し、無関係な不正試行で審査アカウント全体をロックしない。送信元ヘッダーを書き換える信頼済みVercelプロキシ配下だけで有効にする。分散総当たりへの防御は推測不可能な256bit以上のコードが前提で、短いコードの代用にはならない。境界で枠は更新される。KV未設定・通信失敗・不正応答では拒否し、メモリへフォールバックしない。共有NAT内の攻撃/コード漏洩は枠を消費し得るため、監査ログで確認して必要時はコードを更新する。
- 監査ログは `app_review_login`、accepted/denied/limited/unavailable、ランダム試行ID、時刻。メール・生IP・コード・ハッシュ・輸送例外は出力しない。通常の基盤ログの保持期間はオーナーが確認する。
- 発行JWTは設定バージョンに固定。無効化・コード/メール/ID/期限の変更・期限切れは次のサーバー認証確認で失効する。アカウント削除も既存確認で失効する。
- システムブラウザで認証後は既存の確認画面→60秒の1回限りPKCEコード→アプリ内HttpOnly Cookieという経路。既存MobileAuthCode.challenge（TEXT）へ審査認証バージョンを結び、設定変更後に残ったPKCEコードから権限を再発行しない。DBスキーマ変更なし。

固定コードは審査期間中に複数回利用できる。審査担当者を秘密コードの所持で認証するので、Appleの端末やIPを暗黙に信頼しない。コード漏洩時にアクセス可能なのは審査用の1アカウントの既存機能・データ。削除操作も通常どおり可能なので再審査時は同じIDが実在することを確認する。有料機能確認には通常の権利設定またはStoreKit sandbox購入が必要で、認証バイパスで有料化しない。

## App Review Information のメモ案（秘密値なし）

> ログイン画面で「ログイン画面を開く」を選択し、システムブラウザの「App Review 審査用ログイン」を開いてください。Sign-in information欄のメールアドレスとコードを入力すると、メール受信なしでログインできます。表示された「確認してアプリに戻る」を選択してください。通常の会員機能と同じ画面を確認できます。無料会員は全資格共通で1日10問です。有料機能はApp Storeのsandbox購入と購入復元で確認できます。追跡の許可を拒否しても学習機能を利用できます。今回のビルドはアプリ内広告を停止しています。

オーナーがSign-in requiredを有効にし、User name欄に対象メール、Password欄に生コードを安全に入力する。審査中に期限切れ/無効化しない。メモに「有料機能を全て確認できる」と書くのは実際の権利・商品・sandbox実機検証が終わってから。外部承認待ちの広告ありビルドではメモとプライバシー申告も更新する。

## 実環境で残る確認

WindowsではSwift/Xcodeコンパイル・署名IPA・実機ATT・広告遮断のネットワーク検証はできない。macOSの `npm run ios:prepare`→Archiveでプラグイン登録・plist・manifest同梱を確認し、初回/許可/拒否/制限/設定変更後の状態を検証する。現行ゲートでは広告もATT要求も出ない。希望するTracking Yesの構成は未完成で、そのまま広告あり申告で提出しない。

既存IOS1の本番MobileAuthCodeテーブル（authenticatedAt含む）・RevenueCat対応表が未承認/未適用なら、アプリへの復帰・購入確認は引き続き不可。IOS2のスキーマ変更はないが、既存移行の承認/適用済み確認は別に必要。新規外部サービス契約、DB適用、ASC編集、push/PR/デプロイは今回の作業対象外。

審査用ログインには、このコミットのWeb側認証変更を `www.kakomon-ai.jp` へ反映する作業も必要。環境変数を設定するだけでは現行公開サイトにログインUIやAPIは追加されない。Webと配布アプリの版を揃え、変更後の認証設定が全インスタンスへ反映されることを確認する。

## 検証結果

Windows / Node 22.23.4。rootのtypecheck・build、mobileのtypecheck・test（76件）・build、変更TS/TSXのESLintはPASS。root全テストは `pnpm exec vitest run --maxWorkers=4 --minWorkers=1 --testTimeout=60000` で7,187件PASS、既存DB依存8件skip。大量コーパスのcold importで既定並列実行がタイムアウトしたため、並列数と待ち時間を明示した。AI同意と既存会員ゲートに合わない旧テスト前提も修正したが、本体AI・費用上限・無料枠は変更していない。

指定の `codex.cmd exec -m gpt-6-astra -s read-only` による独立セキュリティレビューは、共有枠ロックアウト・診断申告不足・戻りURLの問題を修正後にPASS。認証情報はランダムなテスト用値だけで検証し、実際の秘密設定・本番DBは使用していない。macOS/実機確認は上記のとおり残る。
