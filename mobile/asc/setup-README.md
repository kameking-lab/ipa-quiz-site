# ASC5 — 商品準備・設定・初回IAP審査ドラフト

既存 `kakomon-asc-metadata` / `App Store Key` / `kakomon_ios` を利用。
Apple ID・パスワードは不要。**ASC5ではタグを作成・pushせず、ASCへ書き込んでいない。**
Apple公開OpenAPI **4.6**（2026-11-05）を確認。対象は `6830358918 / jp.kakomon-ai.app` 固定。
次の資格・安全AIには実行しない。

## 実行順（技術担当）

専用タグは `asc-kakomon-(catalog|iapshot|settings|iapreview)-rRUN`。
RUNは英数字で始まる英数字・ハイフン1〜40文字。普通の掲載・submitタグとは区別する。
準備タグの `SUBMIT_FOR_REVIEW` はfalse必須。タグだけのworkflowで通常のIPAビルド設定は変更しない。
同じASCリソースを変更するworkflowは直列実行する。失敗後のリソースは削除・巻き戻しせず照合して再実行する。

全準備タグ: Codemagicの非秘密変数 `ASC_SETUP_CONFIRMED=true` を、対象ID・本番・権利の整合確認後に設定。
秘密のASCキー3変数は既存integrationから直接読む。JWT、鍵、審査用コードはログ・artifactに出さない。

1. **catalog**: `MOBILE_RC_PRODUCT_ID=kakomon_pro` をRevenueCat側Product/Offering/Entitlementと照合。
   ユーザー指定に従い未作成時のProduct IDをkakomon_proにする。別の既存Product IDがあれば停止する。
   グループ `Kakomon Pro`、1か月・日本980円・Family Sharingなし・ja表示名/説明・審査メモ・日本配信を作成。
   特典・トライアルを足さない。価格ポイントIDはAPIで980円を検索し、固定tierを使わない。
   同一IDは再利用。既存価格/地域の相違、複数価格、提出中/承認済み商品は自動で置換しない。
2. 通常の掲載タグ `asc-kakomon-v1.0.0-bBUILD-rRUN` で実在の処理済みビルドを指定し、
   掲載文・ストア画像・レビュー情報を反映する。レビュー情報は既存ASC再利用または従来のenvironment経路。
   本番のコードと審査アクセス、サインイン、購入・復元、広告同意を担当者が検証する。
3. **iapshot**: RevenueCat設定後、商品名・980円/1か月・特典・規約/復元が表示された**実際の購入画面**を撮影。
   ログイン情報・個人情報を含めない。画像の捏造、掲載用の別画面の流用はしない。
   PNG原寸は1206×2622 / 1320×2868 / 1284×2778 / 1242×2688のいずれか、最大20 MB。
   `ASC_IAP_SCREENSHOT_URL`（HTTPS、必要なら有効期限付きURL。secret扱い）と
   `ASC_IAP_SCREENSHOT_SHA256`（小文字64桁）を設定。ローカル実行時だけ `ASC_IAP_SCREENSHOT_PATH` も使える。
   URLのリダイレクトは追わない。URLやキーをログへ出さない。ダウンロード画像のハッシュ・寸法を照合してからAPIへ。
   予約→Apple指定PUT/chunk→MD5でcommit→`COMPLETE`の観測まで実行。異なる既存画像は自動削除しない。
   既存の匿名5画面撮影は会員・購入画面を撮らないため、この画像の撮影は別の技術作業。
4. **settings**: `ASC_SETTINGS_CONFIRMED=true` は `setup.json` の年齢回答（医療Frequent、UGC・広告あり）、
   第三者コンテンツ利用権、ja、アプリ無料、日本先行配信を確認した意味。
   `ASC_EXPORT_EXEMPT_CONFIRMED=true` と `ASC_APP_VERSION=1.0.0` / `ASC_BUILD_NUMBER=実番号` も必要。
   最終ArchiveとSDKが免除条件を満たすと確認した場合だけ対象buildの`usesNonExemptEncryption=false`を反映。
   HTTPS/TLSを「暗号を一切使わない」と申告する意味ではない。非免除暗号と既に申告したbuildは停止する。
   年齢質問票・Content Rights・主言語・無料価格・日本配信をAPIで処理する。
   既存の異なる価格/国を黙って変更しない。相違時は技術担当が現状を読取り、APIで調整方針を決める。
   非免除暗号の書類申請はこのscriptに含めない（APIで宣言/書類管理は可能だが、実書類・分類が未提供）。
5. オーナーがApp Privacyを公開する。契約・税務銀行等の必要な本人操作を完了する。
6. **iapreview**: `ASC_APP_VERSION=1.0.0`, `ASC_IAP_REVIEW_CONFIRMED=true`。
   対象版の掲載・選択ビルド・レビュー情報、IAP画像・価格・ローカライズを完成後に実行。
   App版 + subscriptionVersion + subscriptionGroupVersionを同一reviewSubmissionドラフトへ追加。
   再実行は同じドラフトと既に添付済みのsnapshotを再利用する。App追加後の途中失敗も再開できる。
   作成成功・添付失敗等で未添付snapshotが残る場合は、古い内容を使わず明示停止する。
   技術担当がAPIで該当snapshotを照合・整理してから再開する。**提出しない**。snapshot作成後に元メタデータを変えない。
7. 既存の **submitタグ** `asc-kakomon-submit-vVERSION-bBUILD-rRUN` で初めて提出。
   従来のwebhook/`ASC_REVIEW_INFO_READY`/`ASC_PREREQUISITES_CONFIRMED`/copyrightガードを維持。
   ASC5では提出対象はREADY_FOR_REVIEWの既存ドラフトに限定し、掲載文/画像/ビルドを再変更しない。
   fastlane 2.241.2は自分が作らなかったIAP入りドラフトを拒否するため、deliverの自動submitは使わず、
   `asc_setup.py --submit-staged-review`でapp + 商品 + グループの**3件だけ**のID・状態と実在buildを再検証してAPI提出。
   審査用情報の欠落、別商品/別版/余分な項目は停止。staging・提出直前ともreleaseType=MANUALを検証。
   成功はAPIの審査状態で確認。公開方式は手動のまま。

タグpush例（この作業では実行しない）:

```powershell
git tag asc-kakomon-catalog-r20261105-01 HEAD
git push origin refs/tags/asc-kakomon-catalog-r20261105-01
```

`setup-result.json`は準備結果専用で`submitted_for_review=false`, `released=false`。
提出は従来の`result.json`で観測する。APIリクエストはトランザクションではないため途中成功があり得る。
失敗時に「何も変更されていない」とは扱わない。新規作成の重複、地域の削除、公開版や価格の変更を避ける。

## Apple一次資料

- [公開OpenAPIダウンロード](https://developer.apple.com/sample-code/app-store-connect/app-store-connect-openapi-specification.zip)
- [Subscription管理](https://developer.apple.com/documentation/appstoreconnectapi/managing-auto-renewable-subscriptions)
- [Subscription審査画像](https://developer.apple.com/documentation/appstoreconnectapi/subscription-app-store-review-screenshots)
- [Subscription version](https://developer.apple.com/documentation/appstoreconnectapi/post-v1-subscriptionversions)
- [Group version](https://developer.apple.com/documentation/appstoreconnectapi/post-v1-subscriptiongroupversions)
- [Review item](https://developer.apple.com/documentation/appstoreconnectapi/post-v1-reviewsubmissionitems)
- [初回IAPは新版と同時審査](https://developer.apple.com/help/app-store-connect/manage-submissions-to-app-review/submit-an-in-app-purchase/)
- [fastlane固定版のsubmit実装](https://github.com/fastlane/fastlane/blob/2.241.2/deliver/lib/deliver/submit_for_review.rb)
