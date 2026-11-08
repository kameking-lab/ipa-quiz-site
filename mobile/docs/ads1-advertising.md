# ADS1: iOS WebView 広告と同意

2026-11-04 14:30 のオーナー承認「広告あり・トラッキングあり」に対応する。通常ブラウザの既存 AdSense 枠は維持し、iOS では以下の全条件を満たす場合だけ同じ記事末尾枠を有効にする。AdSense 未承認・空配信・スクリプト障害は学習機能を妨げない。

## 方式と一次資料

- Google Mobile Ads SDK **13.11.0**、依存 GoogleUserMessagingPlatform **3.1.0** を CocoaPods で固定。CocoaPods 公開 spec と Google 配布アーカイブの `GADMobileAds.h` / privacy manifest を照合した。UMP は SDK の依存として含まれるが、アプリから UMP の同意 API は呼ばない。
- [WebView API for Ads](https://developers.google.com/admob/ios/browser/webview/api-for-ads) に従い、`GADIntegrationManager=webview` を設定。実際の Capacitor WKWebView をメインスレッドで `MobileAds.shared.register(webView)` に登録し、その後に広告タグを読み込む。広告表示前の登録を徹底するため、ATT・Web 同意を待って登録する。`MobileAds.start` やネイティブ広告ユニットは使わない。全 script message handlers を削除する操作も行わない。
- 同資料は、アプリ側の同意を WebView の広告タグへ自動伝播しないと明記する。したがって UMP だけで済ませず、**WebView 内の Google Privacy & messaging（Google 認定 CMP）** を使う。AdMob アプリ・App ID・ネイティブ広告枠は、この方式には必須ではない。
- [Google の CMP 要件](https://support.google.com/adsense/answer/13554116?hl=en) に従い EEA・英国・スイス向けの認定 CMP/TCF を設定する。米国州法向けメッセージと GPP、GPC にも対応する。[Privacy & messaging API](https://developers.google.com/funding-choices/fc-api-docs) の callbackQueue で同意準備完了を待つ。法的要件の有無を言語や端末地域から推測しない。
- [Apple ATT](https://developer.apple.com/app-store/user-privacy-and-data-use/) の許可と地域別同意を別々に確認する。アプリ自身は AdSupport/IDFA を取得しない。SDK と広告タグを通じた広告識別子利用は ATT が authorized の場合だけ可能にする。

## 同意と通信ゲート

1. 同梱画面の起動前に WKContentRuleList を設定し、Google 広告配信・品質測定ドメインを遮断する。準備自体に失敗した場合は、保護なしでオンライン画面を開かない。
2. オンライン画面でネイティブのビルド設定を取得。未設定なら ATT・CMP・広告 SDK 登録を開始しない。設定値は Preferences/localStorage や URL パラメータから復元しない。
3. 設定済みの場合、前面のアプリで ATT を要求。denied / restricted / notDetermined / 例外・不明では広告を表示せず、遮断を保持する。NPA だけで追跡停止を保証する方式にはしない。
4. authorized の場合だけ、オーナーが指定した publisher 固有の Google CMP スクリプトを読み込む。広告タグはまだ読み込まない。必要な CSP 許可もドメインを限定して追加した。
5. Consent Mode の広告3用途と analytics_storage が GRANTED または NOT_APPLICABLE、TCF の適用判定が確定、米国 opt-out 状態が確定した場合だけ次へ進む。UNKNOWN / DENIED / NOT_CONFIGURED は停止。GDPR 適用時は TCF の完了状態、TC string、Google vendor 755 と目的1/3/4の同意も必須。GPC=true、米国 opt-out、GPP 不明/障害も停止。
6. ネイティブ側でも設定・信頼する HTTPS origin・前面状態・ATT authorized を再検証。WKWebView 登録を行ってから広告遮断ルールを外し、Web 側で AdSense タグと枠をマウントする。ブリッジ失敗では枠を出さない。
7. TCF 更新、GPP sectionChange、CMP/Consent Mode/GPC の変化で広告を停止。ネイティブ遮断を直ちに戻す。同意変更 UI の表示前に届く not-ready / cmpuishown では再読込せず画面を保持し、選択保存後の ready / useractioncomplete で再読込して古いタグを終了する。エラーでは広告を停止し、保護できなければ再読込する。同意撤回と登録完了が競合しても再有効化しない。初期 US 状態のスナップショットを更新後に使い回さない。
8. iOS 設定から ATT を変更して戻る際もネイティブで再確認し、撤回時は遮断・再読込する。フッターの「広告のプライバシー設定」で EU 同意画面を再表示できる。Google の米国「販売または共有しない」標準リンクは隠さない。GPP の変更後は安全側に広告停止し、次のページ読込で再評価する。

PostHog / Vercel Analytics / Speed Insights の native 内停止は維持する。会員 ID・メール・購入履歴・回答履歴を広告 SDK に明示的に渡す処理は追加しない。

GPP は [IAB の一次仕様](https://github.com/InteractiveAdvertisingBureau/Global-Privacy-Platform/blob/main/Core/CMP%20API%20Specification.md) に従い、listenerRegistered を同意準備完了とみなさず、各イベントの `pingData.cmpStatus=loaded` / `signalStatus=ready` を確認する。初期不明・エラー・有効化待機中の状態変更も広告許可へ進めない。

## オーナーの設定

Codemagic の既存 environment group **`kakomon_ios`** に設定する。例は `mobile/config/ads.env.example`。`NEXT_PUBLIC_` やサーバー秘密値は不要。

| 環境変数 | 内容 |
|---|---|
| `MOBILE_ADS_ENABLED` | 広告を有効にするビルドで `true` |
| `MOBILE_ADS_WEB_CONSENT_READY` | 下記の Web CMP 設定・公開と実機確認が済んだら `true` |
| `MOBILE_ADSENSE_CLIENT` | オーナーの AdSense publisher ID。形式 `ca-pub-` + 16桁 |
| `MOBILE_ADSENSE_SLOT` | 記事末尾ディスプレイ枠の10桁 slot ID |
| `MOBILE_ADS_CMP_SCRIPT_URL` | Google UI が提示する同じ publisher の `https://fundingchoicesmessages.google.com/i/pub-<16桁>?ers=1`。別ドメイン・他 publisher・任意 JS は受け付けない |
| `MOBILE_GAD_APPLICATION_ID` | 任意。AdMob を別途作成した場合の `ca-app-pub-<16桁>~<10桁>` を Info.plist の GADApplicationIdentifier へ設定。WebView 専用では空でよい |

必須5値の一つでも不足・不正なら広告は無効。App ID を空にしてもビルドを通し、Google のサンプル ID に置き換えない。非空の不正 App ID は設定ミスとして生成を停止する。設定を削除して再生成すると古い App ID と広告値を消す。

広告無効時は `configure-ios.rb` が Info.plist の `NSUserTrackingUsageDescription` と全 `GAD*` キーを削除する。生成する PrivacyInfo.xcprivacy は Tracking=false、TrackingDomains なし、各収集区分の Tracking=false とし、第三者広告目的と広告専用の Device ID / Advertising Data / Coarse Location 区分を除く。Required Reason API と学習・会員機能の収集区分は維持する。`ios-assets/PrivacyInfo.xcprivacy` は広告有効版の原本であり、直接コピーせず有効判定に応じて生成する。有効に戻すと原本の宣言を復元する。`mobile/ios/` は Git 管理外の生成物である。

`ios-ads-config.rb` の同じ判定を Podfile 設定にも使用する。広告無効時は Google Mobile Ads / UMP の依存を削除してから `cap sync` / `pod install` を実行し、SDK の起動時 App ID 検査と付属の追跡 manifest も除く。Swift の SDK import と登録処理は `canImport(GoogleMobileAds)` で条件コンパイルする。広告有効時のバージョン固定・登録・同意ゲートは維持する。

AdSense 管理画面で `www.kakomon-ai.jp` の承認と該当枠を確認し、Privacy & messaging で EU（EEA/英国/スイス）と米国州規制メッセージを公開する。EU の Consent Mode サポートを有効にし、広告・分析の4用途が未設定にならないようにする。Google 自身の vendor と必要な目的、拒否・撤回導線、米国の標準 opt-out リンク、GPC を確認する。CMP 単独ロードがこの publisher/サイトで機能することも確認する。未公開・応答しない・AdSense 未承認なら広告が出ないまま学習できる。

この Web 側変更（layout / ContentEndAd / CMP / CSP / privacy）を本番へ反映し、アプリと版を揃える必要がある。本タスクでは push・デプロイ・管理画面変更は行わない。

## CI と実機確認

`ios:prepare` は cap add の後、cap sync が pod install を実行する**前**に Podfile を更新する。Capacitor の既存 hook、RevenueCat、CM3 の登録済み Bundle ID `jp.kakomon-ai.app` 復元、ビルド番号、use-profiles 後検証は維持する。Xcode 27 対応で全 pod の最低 deployment target を15.0に揃える。`ios:test` は設定不足・有効設定・再生成時の古い値削除と CM3 の署名条件を検証する。

Windows で native project 生成・Ruby 検証は可能だが、pod install、Swift コンパイル、署名 IPA、SDK 実通信は macOS / 実機で確認する。Codemagic の Archive と、以下の検証を提出前に実施する。

- 必須値なしでも起動・会員認証・演習が使え、ATT/CMP/広告通信がない。
- ATT 4状態・状態取得失敗、CMPの許可/拒否/途中離脱/ネットワーク障害、EEA/英国/スイス/米国州/対象外地域、GPC、同意撤回・iOS設定変更後の復帰。未許可時に広告/IDFA通信がない。
- AdSense 未承認/空配信/読込エラー時に演習が正常動作し、空枠が隠れる。
- 所有するテスト用構成で [Google 公式テスト](https://google.github.io/webview-ads/test/#api-for-ads-tests) による WKWebView 登録と Cookie/JavaScript を確認する。本番の信頼 origin を緩めてテストページを一般利用者へ開放しない。Capacitor 8.6.0 は inline media / autoplay の公式推奨設定を既に持つ。
- Xcode privacy report で SDK 付属 manifest とアプリ manifest、App Store Connect の回答案、公開 privacy ページ、実際の通信を照合する。

## プライバシー申告

広告有効版は `PrivacyInfo.xcprivacy` の Tracking=true、Device ID / Advertising Data / Product Interaction / Coarse Location / 診断の広告・分析目的を記載する。関連付けと tracking はアプリ全体の保守的な回答案。SDK 付属 manifest の収集区分もそのまま同梱されるが、SDK の既定値だけでアプリ側の追跡あり方針を否定しない。[Google data disclosure](https://developers.google.com/admob/ios/privacy/data-disclosure) と実通信で最終確認する。既存の Required Reason API 理由を維持する。

`ios2-app-privacy.md` と外部 `ios2-report.md` の表を ADS1 の Tracking あり版へ更新する。機能提供のためのメール・User ID・購入・学習コンテンツは、広告向け tracking とは分けて申告する。週1レポート登録の提供に合わせ、メールの Developer's Advertising or Marketing 用途も追加する。広告を無効のまま配布する場合は、広告有効版の申告をそのまま確定せず、出荷設定・通信と回答を合わせる。
