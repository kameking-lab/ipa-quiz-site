# CM3: 登録済みBundle IDを維持するiOS生成

Apple側のBundle IDは **`jp.kakomon-ai.app`** 固定。App Store Connectのアプリ、署名profile `kakomon_appstore`、RevenueCatのApple App Store設定はこのBundle IDを使う。生成用IDを外部サービスへ登録しない。

## Capacitor CLIの制約と復元順序

固定版Capacitor CLI 8.6.0の [`addCommand`](https://github.com/ionic-team/capacitor/blob/8.6.0/cli/src/tasks/add.ts) は新規生成のたびに [`checkAppConfig` / `checkAppId`](https://github.com/ionic-team/capacitor/blob/8.6.0/cli/src/common.ts) を呼ぶ。正規表現はハイフンを許可しない。`cap init --skip-appid-validation` はinitの検証だけを省略するため、addの回避にはならない。CLIやnode_modulesを改変しない。

1. `capacitor.config.ts` の `appId: jp.kakomonai.app` はCLI生成専用。
2. `ios:prepare` が固定されたローカルCLIで `cap add ios --packagemanager CocoaPods`（未生成時）と `cap sync ios` を実行する。
3. `configure-ios.rb` がxcodeprojでAppターゲットの全構成（Debug/Release）の `PRODUCT_BUNDLE_IDENTIFIER` を `jp.kakomon-ai.app` に設定する。Info.plistの `CFBundleIdentifier` は `$(PRODUCT_BUNDLE_IDENTIFIER)`、`CFBundleVersion` は `$(CURRENT_PROJECT_VERSION)` を使う。
4. syncがコピーしたネイティブ側の `capacitor.config.json` も登録済みIDへ修正する。再prepareでも毎回sync後に復元する。
5. `verify-ios.rb` がディスクから読み直してID・ビルド番号・認証URLを検証する。以後、署名完了まで単独の `cap add` / `cap sync` を追加しない。必要なら `ios:prepare` 全体を再実行する。

生成後のID・バージョンは `@capacitor/app` の `getInfo()` とStoreKitが使うInfo.plistにも反映される。認証のURL名は `jp.kakomon-ai.app.auth`、URL schemeは既存の `kakomonai://auth`。

## Bundle IDと混同しない設定

- RevenueCatのApple App Store接続の **Bundle ID** は `jp.kakomon-ai.app`。`MOBILE_RC_IOS_PUBLIC_KEY` はそのRevenueCatアプリの `appl_...` 公開キー。サーバーの `MOBILE_RC_APP_ID` はWebhookの `app_id` を照合するRevenueCat独自のアプリIDであり、Apple Bundle IDへ置き換えない。
- Sign in with Appleは既存のWeb OAuth方式。Primary App IDは `jp.kakomon-ai.app`、`AUTH_APPLE_ID` はそのPrimary App IDに関連付けた **Services ID**。ネイティブApple認証のentitlementは使っていない。詳しくは [IOS3](./ios3-release.md)。
- Associated Domainsのentitlementと自サイトAASAは現在生成していない。認証復帰はカスタムURL scheme。資格サイトへのUniversal Linkは相手アプリを開く機能であり、こちらのAssociated Domainsは不要。将来こちらへのUniversal Linkを追加する場合、AASAのappIDは `<App ID Prefix>.jp.kakomon-ai.app` を使う。

外部ダッシュボード上の実設定・profileの有効期限・証明書との対応は、ソースやWindowsの生成だけでは確認できない。登録済み資材は変更せず、macOS CIで実際に適用する。

## Codemagicでの署名

`ios_signing.distribution_type: app_store` と `bundle_identifier: jp.kakomon-ai.app` を維持。登録済みprofileと対応証明書を自動fetchする。Codemagic公式の制約に従い、この指定と `provisioning_profiles` / `certificates` の個別参照指定は併用しない。

生成後の `xcode-project use-profiles --project ios/App/App.xcodeproj` でAppだけを設定し、Podsプロジェクトを探索対象に含めない。生成する `build/ios/export_options.plist` をIPAビルドにも明示的に渡す。profile適用後の `verify-ios.rb build/ios/export_options.plist` が、登録済みIDのprofile割当・App Store export method・全構成のteam/profile設定を検証する。手動profileとXcode管理profileの両方に対応する。profile未一致を警告だけで通過させない。

IPAの出力は `mobile/build/ios/ipa/*.ipa`。既存のintegration認証、ビルド番号取得のエラー停止、公開SDKキー検査、アップロードのみの設定を維持する。

一次資料: [Codemagic iOS署名設定](https://docs.codemagic.io/yaml-code-signing/signing-ios/)、[use-profiles / build-ipa実装](https://github.com/codemagic-ci-cd/cli-tools/blob/master/src/codemagic/tools/xcode_project.py)、[CLI引数定義](https://github.com/codemagic-ci-cd/cli-tools/blob/master/src/codemagic/tools/_xcode_project/arguments.py)、[RevenueCat Apple接続](https://www.revenuecat.com/docs/projects/connect-a-store)。

## Windowsでの再現

Node 22.23.4、固定lockfileの依存、Rubyと `xcodeproj` gem（検証時1.27.0）を用意する。RubyはPATHに置く。ルート依存・Prisma生成・`mobile/npm ci` はREADMEと同じ。

```powershell
cd mobile
npm run typecheck
npm test
npm run build
$env:BUILD_NUMBER = '37' # ローカル検証用。CIではASCから次番号を取得する
npm run ios:prepare -- --allow-non-macos
npm run ios:test
npm run ios:prepare -- --allow-non-macos # 既存プロジェクトへの再sync・再設定も確認
```

各コマンドの終了コード0を確認し、失敗したらそこで止める。通常のWindows実行は明示オプションなしではファイル変更前に停止する。Capacitor自身がWindowsではpod install / xcodebuildをスキップするため、生成とRuby処理を実行してもmacOSの依存解決・コンパイル・実署名・アップロード成功を意味しない。

`ios:test` は生成済みプロジェクトの小さな一時コピーを用い、設定の再実行、Debug/ReleaseのID差異、ビルド番号、ネイティブ設定、Info.plist、export/profile未一致を検証する。署名関連のfixtureは架空値であり、証明書・秘密キー・ネットワークを使わない。CIでもprepare直後に実行する。
