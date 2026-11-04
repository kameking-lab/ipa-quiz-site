# ASC2: API外の作業・今回の自動化の範囲

2026-11-05。出典資料: ASC1 `asc1-kakomon-listing.md`（task-2）。
この一覧はビルドartifactにも保存する。実行結果は `result.json` を確認する。
一覧の出力は、ASCの設定が完了していることを意味しない。

## 公開APIで入力できず、別の認証済み手段が必要な項目

- **App Privacyの収集データ・利用目的・ユーザーへの紐付け・トラッキング回答と公開**。
  公開App Store Connect APIには、この質問票の書き込みエンドポイントがない。
  `privacy_url.txt` の反映やPrivacyInfo.xcprivacyの同梱では代替できない。
  Claudeは既存の認証済みASCセッション等を使える担当者と連携して入力・公開する。
  APIキーからApple IDログインセッションを作ることはできない。
  Apple公開OpenAPI仕様4.5.1（2026-11-05取得）でも質問票用のpathがないことを確認した。
  ASC1 §4の案をGoogle広告SDK・RevenueCat・実通信・保持期間で確定してから反映する。
- **契約への同意、必要に応じた税務・銀行・本人確認など、Account Holder等の本人操作**。
  API連携への権限追加で本人同意を代行できるとは扱わない。
  DSA事業者情報の認証・法的確認を含め、アカウント状態に応じた対応を担当者へ引き継ぐ。

## APIで扱えるが、このworkflowでは入力しない／条件が必要な項目

- **年齢区分質問票**: APIの `ageRatingDeclarations` で更新可能。ASC1 §3の医療教材・UGC・広告を
  含む全範囲の回答案を確認後、別実装で反映する。4+を固定しない。
- **Content Rights**: App情報APIで扱える。第三者問題の権利・出典確認後に確定する。
- **価格・提供国・主言語**: APIで扱える。無料アプリ、ja、日本先行の判断等は今回変更しない。
- **著作権**: `ASC_COPYRIGHT` を指定したときだけ反映。ASC1候補は `2026 kameking-lab`。
  候補の採用可否を確定するまで空のままにし、架空の権利者を作らない。
- **審査担当者氏名・電話・メール、審査コード、Notes**: API/deliverで入力可能。
  `ASC_REVIEW_INFO_READY=true` と全 `ASC_REVIEW_*` の秘密環境変数を設定したときのみ更新する。
  Notesは `asc/review-notes.ja.txt`。未確認機能を確認済みとして送らない。
- **IAP商品・サブスクリプショングループ・980円/月の価格・日本語説明・IAP審査画像・初回提出への追加**:
  公開APIで多くを管理できるが、deliverのアプリ掲載アップロードには含まれない。ASC1 §7を別実装で反映する。
  `kakomon_pro` は現時点ではRevenueCat entitlement ID。実際のProduct IDを決めつけない。
- **輸出コンプライアンス・必要な書類**: Info.plistと関連公開APIで対応可能な部分がある。
  Archive内SDKを確認してから回答・書類要否を確定する。法律上の分類を自動推測しない。
- **アプリアイコン**: 署名済みArchiveのAsset Catalog由来。掲載文workflowから差し替えない。

## ASCへの入力以外に残る実装・検証

- 公開privacy/termsのiOS広告・課金・削除・同意撤回説明の整合。
- Sign in with Appleの本番設定、IOS3コードの本番有効化と審査期間中の期限管理。
- RevenueCatとStoreKit商品・サーバー権利・復元・オフライン保存の実機確認。
- ADS1のATT/CMP同意前後の実通信確認。拒否時も学習可能なこと。
- 05はASC1 §8.2で認められた「学習リマインダー」代替。オフライン保存の撮影・検証済みとは扱わない。
- 撮影するオンライン画面は実行時の公開Web版。提出対象Archiveとの機能・表示の一致を確認する。

`SUBMIT_FOR_REVIEW=true` は審査提出を実行する。加えてレビュー情報・著作権の入力と
`ASC_PREREQUISITES_CONFIRMED=true`（上記とASC1の提出条件を担当者が確認済み）が必要。
デフォルトはアップロードだけ。審査通過後の公開方式も手動で、自動リリースしない。

## 一次資料

- [Apple App Store Connect API / OpenAPI](https://developer.apple.com/documentation/appstoreconnectapi)
- [Apple App Privacyの入力と公開](https://developer.apple.com/help/app-store-connect/manage-app-information/manage-app-privacy)
- [Appleスクリーンショット仕様](https://developer.apple.com/help/app-store-connect/reference/app-information/screenshot-specifications/)
- [fastlane deliver](https://docs.fastlane.tools/actions/deliver/)
- [Codemagic ASC連携](https://docs.codemagic.io/yaml-publishing/app-store-connect/)
