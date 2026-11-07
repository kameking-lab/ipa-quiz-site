# ASC5: API外の作業と自動化の範囲

2026-11-05。元資料はASC1 asc1-kakomon-listing.md（task-2）。この一覧は掲載workflowのartifactにも保存する。記載だけで設定完了とは扱わない。

## オーナーがASC画面で行う操作

- アプリレコード新規作成: Apps APIは既存レコードの管理用。過去問AI6830358918は作成済み。次の資格・安全AIの未作成レコードはオーナーが作成する。Bundle ID登録とは別の作業。
- App Privacyの収集データ・利用目的・関連付け・Tracking回答と公開: 公開OpenAPI **4.6**（2026-11-05取得、1,027 paths）に質問票の書込みpathはない。privacyPolicyUrl / PrivacyInfo.xcprivacy / Xcode privacy reportはラベル回答の代わりにならない。元資料§4の保留を実通信・保持設定で確定してから、オーナーが入力・公開する。
- 必要な本人・法的手続き: Account Holder等の契約同意、未完了の場合の税務・銀行・本人確認、配信地域に応じたDSA情報など。APIキーからApple IDセッションを作ることはできない。

## 過去問AIで実装済みのAPI経路（ASCへの反映は未実施）

- 従来の掲載タグ: ja掲載文・ストア画像・明示した既存buildの選択。
- 審査連絡先・コード・Notes: ASC_REVIEW_INFO_READY=true時の既存ASC再利用、または従来のCodemagic秘密変数environment経路。画面入力は必須ではない。実値をチャット/リポジトリ/成果物に保存せず、本番ログイン・期限は別途確認する。
- **catalog準備タグ**: グループ、kakomon_proの新規自動更新商品、ja表示名/説明、審査メモ、1か月980円の価格、日本での販売。別の既存Product IDを自動置換しない。ASC1では権利IDのみ確認されていたが、ASC5ではユーザーが新規Product IDとして指定。MOBILE_RC_PRODUCT_ID・RevenueCatと一致すると確認してから実行する。
- **iapshot準備タグ**: 実際の購入画面のPNGを、予約→PUT→MD5commit→COMPLETE確認で添付。実画像の別撮影とRevenueCat設定が必要。匿名5画面は購入画面の代わりにならない。
- **settings準備タグ**: 年齢質問票、Content Rights、ja、アプリ本体無料、日本配信、明示したbuildへの免除暗号申告。全回答の確認フラグが必要。4+や暗号分類を自動推測しない。既存価格/配信国が案と異なる場合は止め、技術担当がAPIで調整方針を決める。
- **iapreview準備タグ**: App版 + subscriptionVersion + subscriptionGroupVersionを同一ドラフトへ追加。snapshot作成後の元情報変更を避け、未添付の古いsnapshotは明示停止して照合する。
- 既存submitタグ: app/IAP/groupの3件・ID・状態・選択build・レビュー情報・MANUAL公開設定を検証して提出。専用webhook、ready、copyright、ASC_PREREQUISITES_CONFIRMED=trueの従来ガードを維持。新規準備タグは提出も公開もしない。詳細は [setup-README.md](setup-README.md)。

次の資格・安全AIはこの過去問AI専用workflowの対象外。APIを使える項目も、担当者が対象IDへの接続を実装/実行する作業が残る。安全AI初版はPro新規販売なしでIAPを追加しない。非免除暗号の実書類・宣言管理、承認後のrelease requestもAPIで扱えるが、今回自動実行しない。

## ASC入力以外に残る検証

- 公開privacy/termsとiOS広告・課金・削除・同意撤回説明の整合。
- Sign in with Appleの本番設定、IOS3審査コードの有効化と審査中の期限確保。
- RevenueCat/StoreKit商品・サーバー権利・購入復元・オフライン保存の実機確認。
- ADS1 ATT/CMP同意前後の実通信。拒否時も学習できること。
- 掲載画像は実行時のWeb/Simulator。対象Archiveとの機能・表示一致を担当者が確認する。05は学習リマインダー代替で、保存・オフライン動作の撮影済みとは扱わない。

## 一次資料

- [Apple Apps API](https://developer.apple.com/documentation/appstoreconnectapi/apps)
- [Apple公開OpenAPI](https://developer.apple.com/sample-code/app-store-connect/app-store-connect-openapi-specification.zip)
- [Apple App Privacyの入力と公開](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy)
- [AppleサブスクAPI](https://developer.apple.com/documentation/appstoreconnectapi/managing-auto-renewable-subscriptions)
- [Apple審査画像API](https://developer.apple.com/documentation/appstoreconnectapi/subscription-app-store-review-screenshots)
