# Google Search Console 連携セットアップ手順 — /stats ダッシュボード

`/stats` ページ最上部の「Google で月◯◯,◯◯◯回表示されています」ヒーロー値を
本物の Search Console データで埋めるための、サービスアカウント発行手順です。

セットアップ完了までは `/stats` は「Search Console 連携準備中」と表示されます
（コードは graceful fallback します）。連携完了後、自動的に実数が表示されます。

## 1. Google Cloud プロジェクトでサービスアカウントを作成

1. <https://console.cloud.google.com/> を開き、適切なプロジェクトを選択
   （無ければ新規作成: 例 `ipa-quiz-stats`）
2. **APIs & Services → Library** で **Google Search Console API** を有効化
3. **IAM & Admin → Service Accounts → Create Service Account**
   - 名前: `ipa-quiz-gsc-reader`
   - 説明: `Read-only access to Search Console for /stats dashboard`
4. 作成したサービスアカウントを開き、**Keys → Add Key → Create new key → JSON** で
   キー JSON をダウンロード（以下「キー JSON」と呼ぶ）

> キー JSON はパスワード相当。Git に絶対コミットしないこと。

## 2. Search Console プロパティにサービスアカウントを招待

1. <https://search.google.com/search-console> を開く
2. 過去問AI のプロパティ（例 `https://www.kakomon-ai.jp/` または `sc-domain:kakomon-ai.jp`）を選択
3. **設定 → ユーザーと権限 → ユーザーを追加** をクリック
4. キー JSON の `client_email`（例 `ipa-quiz-gsc-reader@xxx.iam.gserviceaccount.com`）を入力
5. 権限: **制限付き（閲覧者）** で OK
6. 追加して完了

## 3. Vercel 環境変数を追加

Vercel プロジェクト → Settings → Environment Variables に以下 3 つを追加。
**Production / Preview / Development** すべてにチェック。

| Key | Value |
| --- | --- |
| `GSC_SITE_URL` | Search Console プロパティの URL。URL プレフィックス型なら `https://www.kakomon-ai.jp/`、ドメイン型なら `sc-domain:kakomon-ai.jp` |
| `GSC_SERVICE_ACCOUNT_EMAIL` | キー JSON の `client_email` 値 |
| `GSC_SERVICE_ACCOUNT_KEY` | キー JSON の `private_key` 値（改行は `\n` のままで OK。`-----BEGIN PRIVATE KEY-----` 〜 `-----END PRIVATE KEY-----\n` を全部貼り付け） |

## 4. PostHog 側の環境変数（既存・/stats でも利用）

`/stats` の機能別アクセス比率・流入元グラフは PostHog の HogQL API を叩きます。
未設定でも graceful fallback しますが、フルに動かすには:

| Key | Value |
| --- | --- |
| `POSTHOG_API_KEY` | PostHog の **Personal API Key**（Project API Key ではない） |
| `POSTHOG_PROJECT_ID` | PostHog プロジェクト ID（数字） |
| `POSTHOG_HOST` | 既定 `https://us.posthog.com`。EU リージョンなら `https://eu.posthog.com` |

## 5. 再デプロイして検証

1. Vercel ダッシュボードで **Redeploy** （または `main` に push）
2. デプロイ完了後、ブラウザで `https://www.kakomon-ai.jp/stats` を開く
   （非 www ドメインは canonical で `www.kakomon-ai.jp` に統一されます）
3. ヒーロー値が「Search Console 連携準備中」から実数に切り替わる
4. CLI 検証: `curl -s https://www.kakomon-ai.jp/api/stats/gsc | jq '.totals.impressions'` で数値が返ること
   （`logs/gsc-setup-guide-kakomon.md` は本ファイルへのエイリアスとして同内容で参照可能）

## 6. キャッシュとレート制限

- `/api/stats/gsc` は **6 時間** インメモリキャッシュ
- `/api/stats/posthog` は **30 分** インメモリキャッシュ
- 1 日あたり数回しか GSC API を叩かないので Google 側のクォータには余裕がある
- ページ自体は ISR で 30 分キャッシュ

## トラブルシューティング

- **`Search Console 連携準備中` のまま**: 環境変数 3 つすべてが設定されているか確認。
  特に `GSC_SERVICE_ACCOUNT_KEY` の改行が崩れているケースが多い（`\n` リテラルでも実改行でも可）。
- **403 / Permission denied**: Search Console プロパティでサービスアカウントが
  「閲覧者」として招待されているか確認。プロパティ名（URL プレフィックス vs sc-domain）の
  ミスマッチも要注意。
- **24 時間表示が `0` のまま**: GSC のデータには 1〜2 日のラグがある。コードは
  `endDate = today - 2 days` で取得しているので、新規プロパティだとデータ反映に最大 3 日かかる。
