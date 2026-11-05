# App Store掲載・匿名撮影・タグ起動（ASC3）

Codemagicの既存 `App Store Key` 連携と `kakomon_ios` グループを利用する。
ClaudeはAPIキー・Codemagicトークン・審査コードを取得・入力せず、Gitタグのpushで起動できる。
通常ブランチpushは従来のTestFlightビルドだけ。ASC workflowは `tag` イベントだけを監視する。
タグpushには既存CodemagicアプリのGit webhookが必要。登録状況・実起動はWindows静的検証の対象外。

## タグ起動

対象版のIPAを通常workflowでアップロードし、ASCで処理済みの**実在するビルド番号**を確認する。
タグには `asc-kakomon-[submit-]vVERSION-bBUILD-rRUN` を使う。
VERSIONは数値2〜3要素、BUILDは先頭0なしの正整数、RUNは英数字で始まる英数字・ハイフン1〜40文字。
タグの版・番号を優先し、latestを自動選択しない。以下の17は例であり実在番号に置き換える。

```powershell
git switch feat/ios-app-v1-20261103
git pull --ff-only origin feat/ios-app-v1-20261103
git tag asc-kakomon-v1.0.0-b17-r20261105-01 HEAD
git push origin refs/tags/asc-kakomon-v1.0.0-b17-r20261105-01
```

`kakomon-asc-metadata` が撮影し、掲載情報と画像をアップロードする。審査提出はfalse。
成果物の10枚、manifest、`result.json` を確認し、画像と提出対象Archiveの機能・表示が一致することを確認する。
同じ版・番号を再実行する場合はRUNを変え、新しいタグを使う。タグを移動・強制pushしない。

提出条件が揃ったときだけ別タグをpushする。

```powershell
git tag asc-kakomon-submit-v1.0.0-b17-r20261105-01 HEAD
git push origin refs/tags/asc-kakomon-submit-v1.0.0-b17-r20261105-01
```

このタグだけ `SUBMIT_FOR_REVIEW=true` を導出する。submitタグは `CM_TRIGGER_SOURCE=webhook` が必須。
通常タグにtrueを指定する操作、タグなし手動/API起動でのtrue、形式違いは停止する。
手動UI/APIの掲載更新は引き続き可能（既存番号・版を指定しfalseのまま）。
`cancel_previous_builds=false` だが、同一アプリの掲載更新と提出を同時に走らせない。
提出後にASCの実状態を確認して成功を記録し、公開方式は手動のまま。

## 匿名の5画面

1. 資格選択（IT分野・IPA）
2. 最初の無料演習の問題・選択肢（未回答）
3. 実際に選択肢を押した後の結果・解説
4. 3問の実回答による端末内学習履歴・統計
5. 端末内の学習リマインダー（ASC1 §8.2の代替）

新しいSimulatorを機種ごとに作成し、ログインせず3問だけ回答する。AI質問や追加10問は消費しない。
`ASC_SCREENSHOT_REVIEW_CODE` は不要で、設定済みでも読み取らない。匿名枠の表示がなければ停止する。
権利・履歴・応答の偽造はしない。05は保存・オフライン権利の証明ではない。
iPhone 16 Pro（1206×2622）と16 Pro Max（1320×2868）の各5枚、合計10枚。
原寸PNGをJPEGへ変換し、寸法・枚数・SHA-256を送信前に検証する。画像の引き伸ばしはしない。
Mac/Xcode・該当Simulator・公開Web接続と既存 `MOBILE_RC_IOS_PUBLIC_KEY` は必要。
シミュレーター用Debug生成物のみWKWebView inspectionを有効化し、作成した端末だけを削除する。
fastlane 2.241.2、Appium 3.9.0、XCUITest driver 12.22.8を利用する。

## 審査情報・提出の条件

Appleの条件とサーバー側コード発行案は [review-access.md](review-access.md)。
匿名撮影ができることは、会員機能の審査用アクセスが不要になることを意味しない。
デフォルトの `ASC_REVIEW_SOURCE=existing` は、オーナーがASCの対象版に直接登録した情報を再利用する。
Codemagicへ審査コードを登録する必要はない。

- ASCのApp Review Informationに実連絡先4項目、Sign-in required有効、User name `App Review`、
  Passwordに有効な審査用コードをオーナーが一度登録する。コードをClaudeに渡さない。
- オーナーが本番ログイン・追加10問・審査用購入と復元を確認し、審査期間中のコード有効期限を確保する。
- 非秘密の `ASC_REVIEW_INFO_READY=true`、確定 `ASC_COPYRIGHT`、
  `ASC_PREREQUISITES_CONFIRMED=true` を `kakomon_ios` グループまたはYAMLのvarsに設定する。
  Claudeが公開設定をコードで変更する場合も、実確認の証拠に基づき変更する。初期状態では未確認。
- ASC1と [api-followup.md](api-followup.md) のPrivacy公開、契約、IAP初回追加なども完了する。

既存モードでは実連絡先・コードの存在と形式をAPIで確認し、NotesだけPATCHする。
コードをdeliver引数・ログ・artifactへ渡さず、連絡先・Passwordを上書きしない。
API上の存在確認だけで本番ログイン成功とは扱わない。readyは担当者による動作・期限確認を意味する。
通常の掲載タグではready未設定でも動くが、Notes更新はready時のみ。未準備のsubmitタグは送信前に停止する。

ASC2互換の `ASC_REVIEW_SOURCE=environment` は、ready時に秘密変数
`ASC_REVIEW_FIRST_NAME / LAST_NAME / PHONE / EMAIL / CODE` を全て必要とする任意経路。
Claudeは入力しない。新規運用では既存ASC情報の再利用を使う。
`review-notes.ja.txt` は匿名主要機能、審査ログイン、課金、意見による追加10問の手順を説明する。

## Windows検証

```powershell
python mobile/scripts/asc_validate.py
python -m unittest discover -s mobile/scripts -p "asc*test.py" -v
ruby mobile/scripts/asc_config_test.rb
ruby mobile/scripts/asc_lane_test.rb
bash -n mobile/scripts/asc_capture.sh
ruby -c mobile/scripts/asc_config.rb
ruby -c mobile/fastlane/Fastfile
git diff --check
```

RubyがPATHにない場合は既存portable Rubyの絶対パスを使う。YAML構文と全埋め込みBashも検証する。
Macビルド・実撮影・Codemagic webhook発火・ASC書き込み・審査提出は、Windowsの検証から成功と報告しない。

一次資料: [Codemagicタグ起動](https://docs.codemagic.io/yaml-running-builds/starting-builds-automatically/)、
[CM_TAG / CM_ENV](https://docs.codemagic.io/yaml-basic-configuration/environment-variables/)、
[fastlane deliver](https://docs.fastlane.tools/actions/deliver/)。
