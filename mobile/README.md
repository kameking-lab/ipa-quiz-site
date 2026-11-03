# 過去問AI iOS v1

所有者決定（2026-11-03）に基づく、Capacitor 8 の同梱アプリ。Bundle ID は仮の `jp.kakomon-ai.app`。ログイン・IAP・広告SDK・分析SDKは導入しない。既存サイト全体のリモート表示は行わない。

## ローカル確認（Windows可）

```powershell
cd mobile
npm ci
npm run typecheck
npm test
npm run build
npx playwright install chromium
npm run test:e2e
```

`build` は独立したアプリ用の静的アセット生成だけを行う。Next.js/Vercelビルド・デプロイは行わない。`npm run dev` はブラウザプレビュー用。プレビューの通知は使えず、別originの本番APIにはCORSが必要となるため、E2EではAPIをモックする。

## 実装した体験

- 資格選択→四択→同一画面の解答・固定解説。ITパスポート20問、基本情報科目A16問を同梱。初回から外部接続なしで使用可能。
- 誤答・自信のない正解を復習。自信を持って正解すると復習対象から外れる。日次／累計記録、回答済み画面と再開位置を端末保存。履歴は最大50,000件で、超過時は保存を拒否し既存履歴を保持する。
- 問題パックの手動差分更新。版・スキーマ・資格・問題ID重複・SHA-256を検証し、保存成功後に切替。失敗時は旧パックで演習を続ける。
- 日時指定のローカル通知を1件、毎日繰り返す。許可は利用者が設定した時だけ要求。拒否でも演習可能。通知タップで復習タブを開く。現地時刻で動作する。
- AI送信への明示同意後、オンライン時のみ既存 `POST /api/copilot` を利用。初回10回/日、JST 0時リセットを共有定数から参照。サーバーのIP制限・費用ガードを維持。ログイン不要。課金／フィードバック特典への誘導は入れない。

## 分離とデータ契約

アプリコード・データ・テスト・iOS生成素材はすべて `mobile/`。ルート側の追加は専用API入口 `app/api/mobile/packs/route.ts` と `codemagic.yaml`。`tsconfig.json` では `mobile` を既存サイトの包括チェックから除外し、アプリは専用tsconfigで検査する。APIからimportされる共有モジュールは既存サイトの型チェックでも検査される。既存画面・AIルート・認証・無料枠・料金・DBには変更しない。

`src/domain.ts` はデータだけのスキーマ、差分検証、復習判定。`src/state.ts` はRepository。ネイティブの `Directory.Data` に2つのJSONスナップショットを持ち、`Preferences` の小さなポインタで確定する。書込・ポインタ確定が成功するまでメモリ上の状態を変更せず、更新を直列化する。保存破損時は前の有効スナップショットから復旧して通知し、両方が壊れている場合は上書きしない。アプリ削除時にはOSにより端末データが消える。端末バックアップからの復元はOSの設定に従う。クラウド同期はない。

### 問題パックAPI

`GET https://www.kakomon-ai.jp/api/mobile/packs?pack=ip&since=1`

- `204`: 最新、本文なし。
- `200`: `schema`, `packId`, `fromVersion`, `toVersion`, `updatedAt`, `attribution`, `rightsUrl`, `upserts`, `deletedIds`, `sha256`。
- `400`: 不正なパラメーター。`409`: 未対応版。`503`: パック利用不可。
- `sha256` は `PackSchema.parse()` 後のパックJSON全体をハッシュ化。問題はIDの英語locale順。TLS・固定ホストで配信し、ハッシュは整合性検査として扱う。実行コードは配信しない。
- v1公開時の現行パックはv1なので通常は204。差分追加・編集・撤回の200経路はv2フィクスチャでテスト済み。
- 更新時は `server/packs.ts` のrelease履歴へ検証済み新版を追記し、過去版を保持する。同じ版のファイルは変更しない。互換性を失う機能はアプリ更新にする。
- このAPIはソース追加のみ。デプロイしていないため、本番で利用可能とはしていない。

### AI通信

`src/platform.ts` の固定ホストのネイティブ `CapacitorHttp` を使い、WebViewのCORS/Cookie共有に依存しない。ブラウザのfetch/XHRの全面パッチは無効。既存のplain-textストリームはネイティブHTTPで全体受信して表示する。接続15秒／読込45秒。HTTP 200内のタイムアウト・エラー表記も保持する。

ローカル枠は送信前に永続化し、同時送信でも11回目を止める。到達前の通信失敗も試行として数える。自動再試行しない。実際の上限はサーバー判定が優先され、同じIPのWeb利用により10回より前に制限されることがある。`429`のフィードバック／購入案内はアプリに表示しない。問題・選択肢・正解・選択結果・入力した質問をAPIへ送り、学習履歴全体や会員識別子を送らない。AI会話は端末に永続化しない。

## 問題・権利とプライバシー

既存の公開TSデータから画像・図表依存・要確認問題を除き、最小パックにする。抽出スクリプトは `scripts/generate-packs.ts`。既存の誤った出典URLをアプリパックに限って公式PDF URLへ置き換え、公式正答PDFも追加した。

`src/packs/inventory.json` に問題ID・元ファイル・版・件数・パックhashを、`content-review.json` に2026-11-03の原典照合方法・PDF hash・公式正答を保持。IPはスキャンPDFを目視、FEは全採用問題／選択肢を正規化テキストで比較し、双方の採用36問は公式正答表と一致。固定解説は過去問AIの学習用解説と表示する。配布前には所有者による編集・権利の最終確認を行う。

アプリ内から既存のプライバシーポリシー／問い合わせへ到達可能。AIの送信先プロバイダー、保持条件と本番設定の整合、App Privacy申告は提出前に確定する。端末のみの履歴とAI送信内容を区別する。`ios-assets/PrivacyInfo.xcprivacy` はPreferences用UserDefaults `CA92.1` とFilesystem用FileTimestamp `C617.1` を申告する。これは本番サーバー側の収集・保持に関するApp Privacy申告の代替ではない。

## Codemagic（macOSのみ）

ルートの `codemagic.yaml` は、手動選択用の `ios1-unsigned` ワークフロー。Node 22、Xcode 26.0、CocoaPodsを利用する。`npm ci`→型チェック／テスト／静的アセット生成→`npm run ios:prepare`→署名なしarchive。自動トリガー、署名情報、ASC連携、アップロード、publishingは設定していない。

`ios:prepare` はmacOS以外で書込前に停止する。macOS上で公式テンプレートからCocoaPodsプロジェクト生成・同期し、Bundle ID、iPhoneのみ、iOS 15以上、v1.0.0、ビルド番号、日本語表示、Privacy ManifestのResources登録、独自アイコンを設定する。`ios/` は生成物で、テンプレートと固定lockfileから再生成する。初回のクラウドビルドは未実行であり、archive成功は未確認。

生成物の `.xcarchive` は未署名で、現状のままTestFlight／App Storeへ配布できない。署名・登録・提出はこのタスクの対象外。

公式参考：[Capacitor iOS](https://capacitorjs.com/docs/ios)、[HTTP](https://capacitorjs.com/docs/apis/http)、[通知](https://capacitorjs.com/docs/apis/local-notifications)、[PreferencesのPrivacy Manifest](https://capacitorjs.com/docs/apis/preferences)、[FilesystemのPrivacy Manifest](https://capacitorjs.com/docs/apis/filesystem)、[Codemagic Capacitor](https://docs.codemagic.io/yaml-quick-start/building-an-ionic-app/)。

## v1.1以降の差込口

`src/services.ts` の `EntitlementProvider` はv1では `free/v1-free`。RevenueCat＋IAP導入時にこの境界をサーバー検証付き実装へ置換する。端末のpremiumフラグを認可の根拠にしない。購入／復元、失効、匿名購入と会員の対応、Web既存権利の照合は次版で追加。ログインが必要になった場合のAppleログインもその時に設計する。v1には購入UIや秘密キーを同梱しない。

WidgetKitは設計のみ。将来の `jp.kakomon-ai.app.widget` 拡張と `group.jp.kakomon-ai.app` のApp Groupを予定し、`schema`, `updatedAt`, `todayAnswered`, `reviewDue`, `lastExam` の小さな集計だけを共有する。SwiftのWidgetKitがsnapshotを読み、未更新時は最終更新時刻を表示し、タップで復習を開く。問題本文・AI入力・会員情報は共有しない。App Group登録・entitlements・拡張ターゲットの作成は未実施。

## 後続の実機確認

クラウドmacOSでの初回archive、機内モード初回起動／強制終了後復元、容量不足時の保存、ネイティブHTTPでの既存AI応答／タイムアウト／429、通知の許可・拒否・変更・停止・タップ・集中モード・時差変更、VoiceOverと大きな文字表示をiPhoneで確認する。ブラウザE2EはこれらのOS動作を保証しない。4.2向けの説明は、初回圏外でも演習・解説・端末復習が完結し、通知から復習へ戻れる点を実際の画面で示す。審査通過は未検証。
