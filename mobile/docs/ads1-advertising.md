# 過去問AI iOS 1.0.3の広告

画面下のAdMobバナーを1枠、ホーム・IPA資格トップ・資格紹介・学習記事の閲覧時に使う。連続演習、個別問題、復習、オフライン、ログイン、購入、会員設定、問い合わせは対象外。全画面広告は0回。バナーはWebViewと別の専用領域に置き、下部ナビゲーションとの間隔を確保する。空配信・通信失敗時は領域を閉じる。Googleの広告内の情報表示と、運営への「広告を報告」を実機で確認する。 [Apple審査ガイドライン 1.3・2.5.18](https://developer.apple.com/app-store/review/guidelines/) [Googleのバナー配置](https://support.google.com/admob/answer/6275335)

## 会員判定と同意

- 既存の会員UIで無料と判明した後、`POST /api/mobile/entitlement` でWeb契約とRevenueCatのサーバー権利を確認する。失敗・判定待ち・購入処理中は広告初期化に進まない。サインアウト・購入・復元開始で即時に枠を閉じる。アプリ側でも対象商品のStoreKit権利を照合し、取引更新時は枠を破棄する。
- Google UMPで無料利用を確認した起動の同意状況を更新する。必要なフォームの完了と `canRequestAds` を確認してからATTを要求する。ATT許可・地域別同意が揃えばパーソナライズが可能。ATT拒否時はGoogleのPPTを無効化モードに設定し `npa=1` を指定する。SDKは拒否時のリクエストにIDFAを含めない。制限・判定未了、UMP障害時は枠なし。Publisher first-party IDとメディエーション初期化を無効にする。アプリは位置情報の許可を要求しない。Googleの配信条件とOSの追跡ドメイン遮断により、非パーソナライズでも空配信になり得る。 [Google UMP](https://developers.google.com/admob/ios/privacy) [Google ATTとIDFA](https://developers.google.com/admob/ios/privacy/idfa) [Google PPT](https://developers.google.com/admob/ios/targeting#publisher_privacy_treatment) [Apple Privacy Manifest](https://developer.apple.com/documentation/bundleresources/privacy-manifest-files)
- 地域別の同意を変更する場合は「会員・設定」の「広告のプライバシー設定」を使う。最初の同意画面を実機で確認し、米国州のオプトアウトと欧州の撤回後は次の広告リクエストにUMPの選択が反映されていることを確認する。
- 1.0.3のCapacitor WebViewでは既存のAdSense登録を無効化し、WebViewの広告配信ドメインの遮断を維持する。AdSenseのWeb設定とAdMobのアプリ設定は管理画面でそれぞれ公開する。
- 広告SDKのSwift実装とWeb側の `NativeTools` が連携する。1.0.3を提出する前に、新しい `NativeTools` と `/privacy` を本番へ反映する。旧Webのままの1.0.3および旧アプリと新Webの組み合わせでは新バナーの呼び出しが成立しない。

## Codemagicの設定

既存のenvironment group `kakomon_ios` に入力する。

| 環境変数 | 値の出どころ |
|---|---|
| `MOBILE_GAD_APPLICATION_ID` | AdMob → アプリ → 過去問AI iOS → アプリの設定。区切り文字が `~` のアプリ ID |
| `MOBILE_ADMOB_BANNER_ID` | 同じアプリ → 広告ユニット → 「過去問AI iOS 無料 閲覧バナー」。区切り文字が `/` の広告ユニット ID |
| `MOBILE_ADS_NATIVE_CONSENT_READY` | AdMobの地域別メッセージをアプリに割り当て、公開後に `true` |
| `MOBILE_ADS_ENABLED` | 広告有効ビルドで `true` |

必須値の不足・形式不正・パブリッシャー不一致・Googleの公開サンプルIDは無効版として生成する。無効版からはSDK Pods、ATTの説明文、AdMobのInfo.plist設定・SKAdNetworkリスト、広告追跡のPrivacy Manifest項目を除く。1.0.3のバナーは旧環境変数 `MOBILE_ADS_WEB_CONSENT_READY`、`MOBILE_ADSENSE_CLIENT`、`MOBILE_ADSENSE_SLOT`、`MOBILE_ADS_CMP_SCRIPT_URL` を参照しない。

## 管理画面

1. AdMobでiOSアプリを追加し、App Storeの過去問AI（Bundle ID `jp.kakomon-ai.app`）に関連付ける。バナーの広告ユニット「過去問AI iOS 無料 閲覧バナー」を1本登録し、初回確認の自動更新はオフにする。広告レーティング上限G、配信はGoogle広告のみ。テスト端末はAdMobのテストデバイス設定に登録する。 [AdMobアプリ設定](https://support.google.com/admob/answer/9989980) [Googleテスト広告](https://developers.google.com/admob/ios/test-ads)
2. AdMob「プライバシーとメッセージ」で欧州規制（EEA・英国・スイス）と米国州規制のメッセージを上記iOSアプリ向けに公開する。拒否・同意変更・米国の販売や共有のオプトアウトを確認する。ATTのOSダイアログはアプリが出すため、今回AdMobのIDFAメッセージは無効にする。 [GoogleのiOS同意設定](https://developers.google.com/admob/ios/privacy)
3. ASCの掲載情報に実際の開発者Webサイトを設定する。AdMobが示す販売者行を、そのドメインのルートの `/app-ads.txt` に公開し、AdMobで検出と配信準備完了を確認する。 [Google app-ads.txt](https://support.google.com/admob/answer/9363762)
4. AdSense「プライバシーとメッセージ」でも承認済みの過去問AIサイト向けに欧州規制と米国州規制のメッセージを公開する。サイト選択・公開済み表示・地域別の拒否と選択変更を確認する。 [Google AdSenseのCMP要件](https://support.google.com/adsense/answer/13554116)
5. ASC「Appのプライバシー」は、広告有効版でデータ収集あり・トラッキングありを選び、[申告表](./ios2-app-privacy.md)の広告データ、デバイスID、製品の操作、おおよその位置、診断情報をXcodeのPrivacy Reportと照合する。年齢レーティングの広告は「あり」。一般向け資格学習アプリとしての配信とクリエイティブの対象年齢を確認する。

## 出荷前の確認

Windowsの `ios:prepare -- --allow-non-macos` と `ios:test` は設定生成・検証。macOSのコンパイル、SDKの通信、署名IPAは別途確認する。AdMobのテスト端末で、無料・Web有料・App Store有料・購入直後・復元直後、ATT全状態、EEA・英国・スイス・米国州・その他の地域、CMP撤回、通信障害・空配信を確認する。広告の情報表示・通報、画面下の余白、端末設定から戻った直後、アクセシビリティテキストサイズも確認対象。
