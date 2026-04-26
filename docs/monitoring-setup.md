# モニタリング セットアップ手順書

過去問AI の本番モニタリングは以下 3 層で構成する:

1. **Sentry** — エラートラッキング（5xx 例外、フロント JS エラー）
2. **UptimeRobot** — 主要エンドポイントの死活監視
3. **Vercel Analytics** — リアルユーザー計測（既に組み込み済み）

## 1. Sentry

### プロジェクト作成

1. <https://sentry.io/signup/> にサインアップ（GitHub 認証）
2. Organization 作成後 → `Create Project`
3. Platform: **Next.js**
4. Project name: `ipa-quiz-site`
5. Alert frequency: `Alert me on every new issue`

### DSN 取得

Project → `Settings` → `Client Keys (DSN)` から `DSN` をコピー。
形式: `https://<key>@o<org>.ingest.sentry.io/<project>`

### Vercel 環境変数登録

| Key | Value | Environment |
|---|---|---|
| `SENTRY_DSN` | DSN（サーバー側） | Production, Preview |
| `NEXT_PUBLIC_SENTRY_DSN` | 同 DSN（クライアント側） | Production, Preview |
| `SENTRY_ENVIRONMENT` | `production` / `preview` | 各 Environment |

`SENTRY_DSN` 未設定時は SDK が `noop` 動作するよう `lib/sentry.ts` で初期化を制御する。

### サンプリング率

初期は `tracesSampleRate: 0.1`（10%）でコスト抑制。
高負荷時は `0.05` に引き下げる。

## 2. UptimeRobot

### モニター登録

<https://uptimerobot.com> で 5 分間隔の HTTP モニターを作成:

| URL | 期待値 | 種類 |
|---|---|---|
| `https://ipa-quiz-site.vercel.app/` | HTTP 200 | Keyword "過去問AI" |
| `https://ipa-quiz-site.vercel.app/api/auth/session` | HTTP 200 | JSON `{` |
| `https://ipa-quiz-site.vercel.app/admin/team` | HTTP 401 | Status code |
| `https://ipa-quiz-site.vercel.app/sitemap.xml` | HTTP 200 | Keyword `<urlset` |

### アラート通知

- Email: `kakomon.ai.jp@gmail.com`
- 通知トリガー: `Down` から 2 分継続 / `Up` 復帰

### SLA 目標

- 月間稼働率 99.5% (= ダウン許容 3 時間/月)
- 24 時間以内に Sentry / UptimeRobot 両方を確認する運用

## 3. Vercel Analytics

`@vercel/analytics` は既に依存に含まれており `<Analytics />` がレイアウトに組み込み済み。
追加設定なしで Real User Monitoring がダッシュボード可視化される。

Vercel Dashboard → Project → Analytics タブで確認:
- Web Vitals (LCP / FID / CLS)
- ページ別 Visitors / Page Views

## 4. 確認 curl

```bash
curl -sS --ssl-no-revoke -o /dev/null -w "HTTP %{http_code}\n" \
  https://ipa-quiz-site.vercel.app/api/auth/session
# → HTTP 200

curl -sS --ssl-no-revoke -o /dev/null -w "HTTP %{http_code}\n" \
  https://ipa-quiz-site.vercel.app/admin/team
# → HTTP 401
```

## 5. インシデント時の手順

1. UptimeRobot でアラート受信 → Sentry の最新 issue を確認
2. Vercel Dashboard → Deployments → 最新の Build ログを確認
3. 必要なら Vercel `Promote to Production` で 1 つ前のデプロイへロールバック
4. ロールバック後、原因コミットをローカルで再現 → 修正 PR
