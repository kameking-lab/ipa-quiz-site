# UptimeRobot セットアップ手順書

主要エンドポイントの 5 分間隔死活監視を UptimeRobot で行う。
無料プラン（50 モニターまで、5 分間隔）で十分。

---

## 0. 前提

- 通知先: `kakomon.ai.jp@gmail.com`
- SLA 目標: 月間稼働率 99.5%（= ダウン許容 3 時間/月）

## 1. アカウント作成

1. <https://uptimerobot.com/signUp> にアクセス
2. メールアドレス + パスワードでサインアップ
3. メール認証リンクをクリック
4. ログイン後、ダッシュボード上部の `+ Add New Monitor`

## 2. モニター 4 本を登録

下表の通り 4 つの HTTP モニターを作る。各モニターで `+ Add New Monitor` を繰り返す。

### モニター 1: ホームページ（Keyword 監視）

| 項目 | 値 |
|---|---|
| Monitor Type | `Keyword` |
| Friendly Name | `過去問AI - Home` |
| URL | `https://ipa-quiz-site.vercel.app/` |
| Keyword Type | `exists` |
| Keyword Value | `IPA` |
| Monitoring Interval | `5 minutes` |
| Monitoring Timeout | `30 seconds` |
| Alert Contacts | （手順 3 で設定） |

### モニター 2: Auth Session API

| 項目 | 値 |
|---|---|
| Monitor Type | `HTTP(s)` |
| Friendly Name | `過去問AI - /api/auth/session` |
| URL | `https://ipa-quiz-site.vercel.app/api/auth/session` |
| Monitoring Interval | `5 minutes` |
| Expected Status Codes | `200` |

### モニター 3: Admin Team（401 期待）

UptimeRobot の標準モニターは 200 系を `Up` とみなすため、`401` を `Up` 扱いにするには `Custom HTTP Status` を使う。

| 項目 | 値 |
|---|---|
| Monitor Type | `HTTP(s)` |
| Friendly Name | `過去問AI - /admin/team (auth gate)` |
| URL | `https://ipa-quiz-site.vercel.app/admin/team` |
| Monitoring Interval | `5 minutes` |
| Custom HTTP Statuses | `401:up, 200:up, 5xx:down, 0:down` |

これで Basic 認証ゲートが効いている = `Up`、500 系で落ちたら `Down` として通知される。

### モニター 4: sitemap.xml

| 項目 | 値 |
|---|---|
| Monitor Type | `Keyword` |
| Friendly Name | `過去問AI - sitemap` |
| URL | `https://ipa-quiz-site.vercel.app/sitemap.xml` |
| Keyword Type | `exists` |
| Keyword Value | `<urlset` |
| Monitoring Interval | `5 minutes` |

## 3. アラート連絡先（Alert Contacts）追加

左メニュー `My Settings` → `Alert Contacts` → `Add Alert Contact`:

| 項目 | 値 |
|---|---|
| Alert Contact Type | `E-mail` |
| Friendly Name | `kanata-primary` |
| E-mail to Send | `kakomon.ai.jp@gmail.com` |
| Notify when | `Down` AND `Up`（両方） |

検証メールが届くので承認リンククリック。

各モニター編集画面に戻り、上記コンタクトを **Selected Alert Contacts** に追加する。

### 通知遅延設定

各モニターの `Edit` → `Alert Contacts` → そのコンタクトの `Threshold`:

- `Notify when down for: 2 minutes` （= 1 回 fail で即通知ではなく 2 連続を要求）

これでフラッキー検出によるノイズを減らせる。

## 4. ステータスページ（任意）

公開ステータスページを作ると `https://stats.uptimerobot.com/...` でユーザーに状態を見せられる。

左メニュー `Status Pages` → `Add New Status Page`:

| 項目 | 値 |
|---|---|
| Friendly Name | `過去問AI Status` |
| Status Page Type | `Public` |
| Custom Domain | `status.ipa-quiz.jp`（独自ドメインがあれば。なくても uptimerobot.com サブドメインで公開可） |
| Monitors | 上記 4 つを全選択 |

外部公開しないなら `Password Protected` でも可。

## 5. 動作確認

1. UptimeRobot Dashboard で 4 モニターが全て **Up（緑）** になっていること
2. 故意にダウン検出を試す（任意）:
   - モニター 2 の URL を `https://ipa-quiz-site.vercel.app/api/auth/sessionXXXX` に一時的に変更
   - 10 分以内に Down メールが来ることを確認
   - URL を元に戻す → Up メールが来る

## 6. SLA 計測

各モニター行の右側 `Uptime` 列に過去 24h / 7d / 30d の稼働率が表示される。
目標 99.5% を下回ったら週次で原因分析する運用。

## 7. インシデント対応フロー

```
UptimeRobot Down メール受信
  ↓
Sentry の最新 issue を確認（同時刻のエラー有無）
  ↓
Vercel Dashboard → Deployments → 最新 Build ログ確認
  ↓
直近デプロイ起因なら `Promote to Production` で 1 つ前のデプロイへロールバック
  ↓
ロールバック完了後、UptimeRobot で Up に戻ったか確認
  ↓
ローカルで原因コミット再現 → 修正 PR
```

## 8. トラブルシューティング

| 症状 | 原因 / 対処 |
|---|---|
| メール届かない | (1) `My Settings` でメール検証済みか確認 (2) Gmail スパムフォルダ確認 (3) `Alert Contacts` 列が空のモニターがないか確認 |
| 401 が `Down` になる | モニター 3 の `Custom HTTP Statuses` 設定漏れ。`401:up` を追加 |
| Vercel デプロイ直後に false alarm | デプロイ瞬間の数秒 502 が出る場合あり。`Notify when down for: 2 minutes` に設定すれば吸収される |
| キーワード検出失敗 | ページが SSR から CSR に変わって初期 HTML に文字列がない可能性。検出キーワードを SSR 出力から選び直す |
