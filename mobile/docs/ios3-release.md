# IOS3 ログイン運用（2026-11-04）

## 前提の訂正と4.8の判断

オーナーによる本番確認では、現在有効な通常ログインはGoogleだけ。SMTP・GitHubの環境変数は未設定なのでメールのマジックリンクを審査手順に使わない。IOS2の「既存会員を手作業で用意する」手順は本書で置き換える。

[Apple App Review Guidelines 4.8](https://developer.apple.com/app-store/review/guidelines/#login-services) は、主要アカウントに外部ログインを使うアプリに、氏名・メールに限る収集、メールを非公開にする選択、同意のない広告目的の操作収集をしない同等のログイン手段を求める。本アプリは一般向けの学習サービスで、既存の学校・企業アカウントを必須とする教育アプリ等の例外には当たらないと判断した。審査専用コードは一般ユーザーの同等の選択肢ではないため、Sign in with Appleを提供する。

既存NextAuth Appleプロバイダを明示的にname/emailスコープ・state/nonce検証・form_postで構成。Appleの非公開リレーメールをそのまま会員メールとして保存し、実メールやGoogle連携を要求しない。メール一致による自動リンクは無効。既存Google会員が同じメールでApple登録するとOAuthAccountNotLinkedになる。非公開メールで作った別会員に既存の購入・履歴は自動統合されない。

Webでは同じログイン画面にAppleとGoogleのボタンを並べる。アプリのWebViewでは既存のシステムブラウザ認証→確認画面→60秒・1回限りPKCE→WebViewのHttpOnly Cookieで復帰する。AppleからのクロスサイトPOSTで復帰先を失わないよう、HTTPS環境のcallback-url CookieをSecure/HttpOnly/SameSite=Noneにした。state/nonceの同Cookie属性は導入済みAuth.jsが設定する。Apple未設定時のアプリ経路ではGoogle/GitHubを表示しない既存ゲートを維持する。設定後の実機検証までは4.8適合完了・審査通過を断定しない。

## 審査専用会員の自動作成

有効な設定・正しいコード・共有KV制限を通ったログインでのみ、既存Userモデルへ固定ID `app-review-ios-v1` の会員をupsertする。作成時はfree、OAuth Account・Subscription・Stripe顧客・購入権利は作らない。メールはサーバー固定の非配送用 `.invalid` アドレスで、入力・受信・Googleアカウントは不要。DBスキーマ変更・移行追加なし。実際の本番会員作成は、将来このコードを反映し審査ログインを使った時に行われる。

既存行のupdateは空で、プロフィールや契約をリセットしない。固定ID/メールの競合、free以外、Stripe顧客、OAuth連携、Subscriptionがある場合は拒否。通常会員のID/メールを環境変数で指定する旧方式は廃止した。審査会員への外部アカウントリンクも拒否する。

必要なサーバー専用環境変数は `config/app-review.env.example` を参照する。

| 名前 | 設定する内容（実値は記録しない） |
|---|---|
| `APP_REVIEW_LOGIN_ENABLED` | 審査期間中だけ有効にするフラグ |
| `APP_REVIEW_CODE_SHA256` | 32バイト以上の暗号学的乱数をbase64url化したコードのSHA-256小文字hex |
| `APP_REVIEW_EXPIRES_AT` | タイムゾーン付きISO-8601の絶対期限 |
| `AUTH_URL` / `AUTH_SECRET` | 正規の本番HTTPS origin / 既存セッション署名秘密値 |
| `DATABASE_URL` | 既存会員DB |
| `KV_REST_API_URL` / `KV_REST_API_TOKEN` | 既存共有KV。未設定・障害時は拒否 |

`APP_REVIEW_USER_ID` / `APP_REVIEW_EMAIL` は不要で、残存していても認証対象を変更しない。生コードはオーナーの秘密管理とASCの審査資格情報欄だけで管理し、リポジトリ・ログ・URL・配布アプリ・NEXT_PUBLIC_環境変数へ書かない。

Auth.js CSRF、固定Origin、定時間ハッシュ比較を維持。送信元10回/分・100回/日、正しいコードだけ全送信元共通20回/時・100回/日を共有KVで制限する。信頼済みVercelプロキシで送信元ヘッダーを上書きする構成が前提。無効なコードでDB作成や共有の正しいコード枠を消費しない。監査は結果・ランダム試行ID・時刻だけ。共有NATの枠消費や漏洩コードの利用はあり得るため、監査を確認し必要時はコードを更新する。

無効化・期限切れ・コード変更は次のサーバー認証時に審査JWTと未使用PKCEコードを失効させる。既存User.createdAtもバージョンへ結び、削除後の再作成で古いCookie・PKCEコードを復活させない。IOS2発行の審査セッションも新方式では失効する。通常会員は影響しない。

失効履歴は既存共有KVの `auth:app-review:revocations:v1` に原子的に永続保存する。新しい設定/会員作成日時のバージョンへ切り替わると旧版を退役させ、旧設定へ戻してもログイン/JWT/PKCEを再許可しない。署名済み審査セッションが無効化・期限切れを観測した時も退役する。KV障害時は審査認証を拒否する。このキーを削除・TTL設定・バックアップ巻き戻しで復元しない。Previewには本番と別のKVを使う。

**無効化・コード更新・再有効化の運用:** まず全インスタンスで審査ログインを無効化し、既存リクエストが完了した後、対象本番KVの環境変数を安全に読み込んだ端末で `pnpm exec tsx scripts/revoke-app-review.ts` を実行し成功を確認する（秘密値を表示しない）。その後に必ず新しい乱数コードとハッシュ・期限を設定して再有効化する。無アクセスの間の環境変数切り替えはサーバーから観測できないので、この明示的失効を省略しない。KV資格情報を外す前にも失効を実行する。旧ハッシュを戻して復旧しようとせず新コードを作る。誤ったKVへ実行しない。

審査コード所持者は同じ会員の学習データや削除機能を共有するため、個人情報を入れない。削除後は次の有効なコードログインで自動再作成する。無料枠・課金判定は通常どおりで、コードだけでは有料化しない。Sandbox購入の権利をログイン時に消さない。契約・連携が存在してログイン拒否となる場合は、コードでリセットせず所有者が状態を調査する。

## Apple側のオーナー設定

1. Certificates, Identifiers & Profilesで、Sign in with Apple有効化済みのApp ID `jp.kakomon-ai.app` がPrimary App IDとして利用できることを確認する。
2. Identifiersの追加からServices IDを作成し、Sign in with Appleを有効化→Configureで上記Primary App IDへ関連付ける。Services IDはWeb OAuthのclient_idとして使う。ネイティブApp IDをAUTH_APPLE_IDへ入れない。
3. Domains and Subdomainsへ実際の正規認証ホストを登録する。現行アプリが利用する `www.kakomon-ai.jp` と `AUTH_URL` のホストを一致させる。apex `kakomon-ai.jp` を認証originとして使う場合は別途登録し、アプリのoriginも揃える。
4. Return URLsには正規origin直下の `/api/auth/callback/apple` を完全一致で登録する。wwwを使う場合は `https://www.kakomon-ai.jp/api/auth/callback/apple`。apexを使う場合は `https://kakomon-ai.jp/api/auth/callback/apple`。リダイレクトでホストが切り替わるURL、localhost、HTTP、`kakomonai://auth` はAppleのReturn URLにしない。アプリ用URL schemeはサーバー認証完了後の既存PKCE復帰専用。
5. KeysでSign in with Apple用Keyを作成し、同じPrimary App IDへ関連付ける。.p8は一度だけダウンロードできるので秘密管理へ保管し、Key IDとTeam IDを控える。リポジトリや配布アプリへ入れない。
6. 安全なローカル環境で、そのKeyからES256のclient-secret JWTを生成する。ヘッダーalg/kid、ペイロードiss=Team ID、sub=Services ID、aud=Appleの認証origin、iat/expを設定する。expはAppleの上限6か月以内（推奨は短め）とし、P1363形式の署名を使う。秘密鍵や生成JWTを外部のJWTデバッガへ貼らない。
7. 本番サーバーに `AUTH_APPLE_ID`（Services ID）と `AUTH_APPLE_SECRET`（生成JWT）を設定する。.p8そのものはAUTH_APPLE_SECRETではない。既存の `AUTH_URL` / `AUTH_SECRET` / `DATABASE_URL` も必要。Team ID・Key ID・.p8は生成作業用で、今回のサーバー実装が読む環境変数ではない。
8. JWTの有効期限を秘密管理側で記録して更新担当・期限前更新を設定する。更新時は全本番インスタンスへ反映し、ログインと既存のAppleトークン失効APIによるアカウント削除を確認する。キーを失効する場合は新キーへ移行してから行う。Appleメールリレーへサービスからメール送信する場合は送信ドメイン/アドレスとSPF/DKIMも登録する（本番メールログインを有効化する手順ではない）。

公式資料：[Web/Services ID設定](https://developer.apple.com/help/account/capabilities/configure-sign-in-with-apple-for-the-web/)、[Key作成](https://developer.apple.com/help/account/capabilities/create-a-sign-in-with-apple-private-key/)、[client secret](https://developer.apple.com/documentation/accountorganizationaldatasharing/creating-a-client-secret)、[Auth.js Apple設定](https://authjs.dev/getting-started/providers/apple)。

## App Review Informationメモ案

> 「ログイン画面を開く」からシステムブラウザへ進み、「App Review 審査用ログイン」でPassword欄の審査用コードだけを入力してください。Google・Appleのアカウントやメール受信は不要です。「確認してアプリに戻る」で続けられます。通常の無料会員と同じ機能・1日10問の無料枠です。有料機能は設定済みのApp Store Sandbox商品で購入・復元を確認できます。今回のビルドはアプリ内広告を停止しています。

ASCのSign-in requiredを有効にし、User nameには任意の審査用表示名、Passwordには生コードを入れる。画面はUser nameを入力しないことをメモで伝える。審査中に設定を無効化・期限切れにしない。有料商品・復元を実機で確認するまでは全機能確認済みと記載しない。

## 反映後に必要な実環境確認

今回はpush・PR・デプロイ・Apple設定・ASC編集・本番DB操作をしない。Web変更の反映後、Appleの新規登録/再ログイン/メール非公開/キャンセル、通常WebとアプリWebViewへの復帰、コールド起動、Cookie属性、Googleとの併存、Apple再認証→削除を実機で確認する。審査コードの初回作成・再ログイン・ローテーション・期限切れ・削除→再作成も確認する。

既存IOS1のMobileAuthCode（authenticatedAtを含む）などの本番適用状況は別途確認が必要。IOS3はスキーマを追加しない。IOS2の広告・ATT・プライバシー・購入に関する残条件も継続する。
