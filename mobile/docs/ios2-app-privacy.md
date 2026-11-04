# IOS2 App Store Connect「App のプライバシー」入力案

2026-11-04のコードに基づく案。実機・本番設定の確認前の申告案であり、ASCへの入力は行っていない。ios1sub/02-app-privacy.mdのTracking未確定部分を本書で具体化する。

## ADS1 広告あり・トラッキングあり版の回答案

ADS1（2026-11-04 14:30 承認）で Google Mobile Ads SDK / WebView API と Web CMP の同意ゲートを実装した。広告有効版の回答は「データを収集する」＝はい、「トラッキングに使用するデータ」＝あり。署名実機の通信と privacy report による提出前照合は残る。ATT許可済みの利用者にだけトラッキングする場合も、アプリ全体の広告データについてTracking Yesが必要。

| データ種類 | 目的 | ユーザーに関連付け | トラッキング | コード・確認根拠 |
|---|---|---|---|---|
| 連絡先情報：氏名 | App Functionality | はい | いいえ | NextAuth/OAuth、User.name、問い合わせ任意氏名 |
| 連絡先情報：メールアドレス | App Functionality、Developer's Advertising or Marketing（週1レポート登録を提供する場合） | はい | いいえ | User.email、メール認証、contact、EmailLeadCapture。審査メールも含む |
| 識別子：ユーザーID | App Functionality、Analytics | はい | いいえ | User.id、RevenueCatのHMAC App User ID。対応表がある仮名IDは匿名ではない |
| 購入：購入履歴 | App Functionality、Analytics | はい | いいえ | StoreKit/RevenueCat、既存web会員権利。広告網への共有は今回コードにない |
| ユーザーコンテンツ：その他 | App Functionality、Product Personalization | はい | いいえ | Geminiへ質問/会話/答案/業種/問題文脈、Bookmark/CustomTag/StudyPlan同期、復習 |
| ユーザーコンテンツ：カスタマーサポート | App Functionality | はい（保守的） | いいえ | contact本文・任意連絡先。設定次第でResend/Slackへ転送 |
| 使用状況：製品の操作 | App Functionality、Product Personalization | はい | いいえ | StudyRecord/Streak、正誤/回答時刻/無料枠。広告ページ/操作の共有範囲は別行のThird-Party Advertising・Tracking Yesを合わせて申告 |
| 診断：クラッシュデータ | App Functionality、Analytics、Third-Party Advertising | はい（保守的） | はい（広告用途を保守的に申告） | Sentry有効時とGoogle SDKの広告・測定用途を保守的に含む。部分PII除去だけでは非関連を保証できない |
| 診断：パフォーマンスデータ | App Functionality、Analytics、Third-Party Advertising | はい（保守的） | はい（広告用途を保守的に申告） | Sentry tracesとGoogle SDKの広告・測定用途を保守的に含む。nativeではVercel Speed Insights停止 |
| 診断：その他の診断データ | App Functionality、Analytics、Third-Party Advertising | はい（保守的） | はい（広告用途を保守的に申告） | Sentry文脈とGoogle SDKの広告・測定用途を保守的に含む。実際のDSNと通信を確認 |
| **識別子：デバイスID（ADS1 広告有効版）** | **Third-Party Advertising、Analytics（測定）** | **はい（保守的）** | **はい** | ATT authorized と Web 同意が揃った場合だけ Google SDK/タグが広告識別子を利用可能。アプリ自身のIDFA取得とRevenueCatのcollectDeviceIdentifiersは呼ばない |
| **使用状況：広告データ（ADS1 広告有効版）** | **Third-Party Advertising、Analytics（測定）** | **はい（保守的）** | **はい** | 同意後のAdSense表示/クリック/広告イベント。承認・配信状況により空配信もある |
| **使用状況：製品の操作（広告共有する範囲）** | **Third-Party Advertising、Analytics** | **はい（保守的）** | **はい** | Googleへ共有するページ/操作イベントを実通信で特定して追加。学習履歴・会員ID・メール・購入情報を広告SDKへ明示送信しない |
| **位置情報：おおよその位置（ADS1 広告有効版）** | **Third-Party Advertising、Analytics** | **はい（保守的）** | **はい（保守的）** | GoogleのIP由来位置。位置権限は要求しない |

Google SDK 13.11.0 の付属 manifest と公式開示を照合した。広告・分析に使う診断3種類にも Third-Party Advertising を追加し、アプリ側では Tracking Yes を保守的に申告する。SDK付属manifestの各既定値とアプリ全体の申告は分けて判断する。公式の[Google Mobile Ads SDK data disclosure](https://developers.google.com/admob/ios/privacy/data-disclosure)とXcode privacy report・通信証跡で、IP由来のCoarse Location、Device ID、Product Interaction、Advertising Data、診断を確認し追加する。広告網へ会員メールや購入履歴を渡す実装は今回行っていないので、それらへ一律Tracking Yesを付けない。

## ADS1 の配布設定と提出前確認

広告有効版は **収集：はい、Tracking：はい**。アプリ manifest も Tracking true と広告ドメイン、上表の広告用途を記載する。オーナーの必須設定が無いビルドは広告を無効にして正常起動する。この無効版を配布する場合は、そのビルドの通信と申告を合わせ、広告有効版の回答を機械的に確定しない。

SDKはCocoaPodsでGoogle-Mobile-Ads-SDK 13.11.0 / GoogleUserMessagingPlatform 3.1.0を固定。WebView専用は GADIntegrationManager=webview で App ID 不要。ネイティブUMPの同意はWebタグへ自動伝達されないため、Web内のGoogle認定CMPを使う。設定手順と実機確認は [ADS1広告運用](./ads1-advertising.md)。

## 設定・通信を確認して追加判定する項目

- Device ID：Sentry等の永続的端末/インストール識別子が実際に保持される場合は追加。PostHogは今回native内の初期化を停止。システムブラウザ認証ページでもPostHog/Vercel解析の初期化を止める。
- Search History：検索語がSentry URL、サーバーログ等に保存される場合はAnalytics／関連付けは保守的Yes／Tracking No。サイト内検索は他社サイト閲覧のBrowsing Historyと混同しない。
- Other Data Types：IP/UA/セキュリティ監査・保持フィールドに応じて追加。IP通信だけでCoarse Locationとせず、位置推定保存の有無を確認する。
- EmailLeadCapture：週1レポート登録が本番で提供されるならメールにDeveloper's Advertising or Marketingを追加（manifestも同時更新）。この登録がnative内で提供されないことを確認するまでは、提出時に用途を除外しない。
- Photos or Videos：OAuth画像URLの保存/画像取得・第三者保持を確認。Audio Data：ブラウザ音声認識を出荷WebViewで使える場合は送信先と保持を確認。図表教材を表示するだけで利用者の写真収集とはしない。
- Geminiの有償/無償契約、ログ保持と学習利用、Sentry DSN/トレース設定、contactのResend/Slack/Turnstile、基盤ログ保存、削除後のベンダー保持をオーナーが確認する。

RevenueCatだけでは氏名/メール/端末IDを常に収集するわけではない。実装はPurchases.configure/logIn/getOfferings/purchasePackage/restorePurchasesを使用し、広告識別子・顧客連絡先の追加API呼出しはない。購入履歴とユーザーIDの機能提供・分析を申告する。カード番号/セキュリティコードはアプリで受領しないためPayment Infoは非収集案。カレンダーはEventKitUIで利用者が保存し、一覧の読取・外部送信は行わない。

AppleはWebView内の通信も含めて第三者コードの収集を開発者が申告することを求める。[Apple App privacy details](https://developer.apple.com/app-store/app-privacy-details/)。RevenueCat固有の分類は[公式Apple App Privacy](https://www.revenuecat.com/docs/platform-resources/apple-platform-resources/apple-app-privacy)を照合した。App Store Connectの回答とPrivacyInfo.xcprivacy、公開privacyページ、実ビルドの通信を揃えてから提出する。
