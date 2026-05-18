# Bing sitemap 再 submit 手順書

作成日: 2026-05-18
対象: Bing Webmaster Tools
本番ホスト: https://www.kakomon-ai.jp

Bing は IndexNow をサポートしており、API 経由での即時 ping が可能。
本手順書は (A) Bing Webmaster Tools での手動 sitemap submit と (B) IndexNow API 経由の通知の両ルートを記載する。

---

## A. Bing Webmaster Tools 手動 submit

### A-1. 事前確認 (Day-0 投入前)

- [ ] https://www.bing.com/webmasters にログイン (Microsoft アカウント)
- [ ] プロパティ「kakomon-ai.jp」が登録されていることを確認
- [ ] 未登録の場合は「Sites」→「Add a site」→ URL 入力 → DNS TXT または HTML タグ認証
- [ ] 認証後、左メニュー「Sitemaps」が表示可能なことを確認

### A-2. sitemap submit (Day-0 朝 09:30 JST)

1. https://www.bing.com/webmasters/sitemaps?siteUrl=https://www.kakomon-ai.jp
2. 「Submit sitemap」または既存の sitemap.xml 行右側「Resubmit」をクリック
3. URL 入力欄に `https://www.kakomon-ai.jp/sitemap.xml` を貼り付け
4. 「Submit」クリック
5. Status が「Pending」→ 数分後「Success」に変わることを確認
6. URL count が表示されることを確認 (sitemap index 経由で 4136 URL 程度)

### A-3. 個別 URL の URL Submission (任意)

Bing Webmaster Tools の「URL Submission」機能で個別 URL の即時 submit が可能。
1 日あたり 10 URL/プロパティのソフトリミット。

優先 URL (logs/gsc-submit-priority-urls.md の第一優先と同一):
1. https://www.kakomon-ai.jp/
2. https://www.kakomon-ai.jp/about
3. https://www.kakomon-ai.jp/transparency
4. https://www.kakomon-ai.jp/operator
5. https://www.kakomon-ai.jp/license
6. https://www.kakomon-ai.jp/essays/sc
7. https://www.kakomon-ai.jp/stats
8. https://www.kakomon-ai.jp/blog

submit 方法:
1. 左メニュー「URL Submission」
2. URL を 1 行 1 URL で貼り付け
3. 「Submit URLs」クリック
4. Status「Success」を確認

---

## B. IndexNow API 経由の通知

IndexNow は Bing/Yandex/Naver が共同サポートする即時通知プロトコル。
本サイトは `/api/indexnow` エンドポイントで実装済 (PR #238)。

### B-1. 事前確認

- [ ] Vercel 環境変数 `INDEXNOW_KEY` 設定済 (2026-05-16 確認済)
- [ ] Vercel 環境変数 `INDEXNOW_ADMIN_TOKEN` 設定済 (2026-05-16 確認済)
- [ ] Vercel block 解除確認 (本番 deploy が反映されていること)
- [ ] `https://www.kakomon-ai.jp/<INDEXNOW_KEY>.txt` で key 検証ファイルが 200 で取得できる

### B-2. bulk submit (Day-0 朝 09:30 JST)

IndexNow bulk submit は `/api/indexnow/bulk` エンドポイント経由 (要 admin token)。

```bash
# 環境変数を export してから実行
export INDEXNOW_ADMIN_TOKEN="$(read -s -p 'token: ' t && echo $t)"

curl -X POST https://www.kakomon-ai.jp/api/indexnow/bulk \
  -H "Authorization: Bearer $INDEXNOW_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"source": "sitemap"}'
```

期待レスポンス:
```json
{
  "submitted": 4166,
  "batches": 5,
  "status": "ok",
  "indexnow_responses": [200, 200, 200, 200, 200]
}
```

### B-3. 個別 URL 単発 submit

```bash
curl -X POST https://www.kakomon-ai.jp/api/indexnow \
  -H "Content-Type: application/json" \
  -d '{
    "urls": [
      "https://www.kakomon-ai.jp/",
      "https://www.kakomon-ai.jp/about",
      "https://www.kakomon-ai.jp/essays/sc"
    ]
  }'
```

### B-4. レート制限の考慮

- IndexNow 公式仕様: 1 リクエストあたり最大 10000 URL
- 実運用: 1 分あたり 100 リクエスト程度に抑える (Bing 側 throttle 回避)
- bulk submit は内部で 1000 URL/バッチに分割済 (PR #238)

---

## C. submit 後の確認

### C-1. Bing Webmaster Tools での確認 (24 時間後)

- [ ] 「Sitemaps」→ submitted URL count と Discovered URL count を比較
- [ ] 「Reports & Data」→「Site Activity」で Crawl Pages 数の増加を確認
- [ ] 「URL Submission」の Status が全て「Success」

### C-2. 検索インデックス確認 (72 時間後)

Bing 検索で `site:kakomon-ai.jp` を実行:
- 期待値: 1000 URL 以上
- 期待値未達の場合は B-3 で再 submit、または robots.txt / canonical を再点検

### C-3. IndexNow 通知履歴の確認

```bash
# admin ダッシュボードから確認 (Basic Auth 必須)
curl -u admin:<ADMIN_BASIC_PASS> https://www.kakomon-ai.jp/admin/deployment-status
```

または Vercel Function Logs で `/api/indexnow` 呼出履歴を確認。

---

## D. トラブルシューティング

### Q: Bing で sitemap submit が「Failed」になる

- A1: sitemap.xml の URL が 200 で開くか確認 (`curl -sI https://www.kakomon-ai.jp/sitemap.xml`)
- A2: sitemap が `<sitemapindex>` 形式の場合、子 sitemap も 200 で開くか確認
- A3: robots.txt で sitemap がブロックされていないか確認
- A4: 一度「Remove」してから再 submit

### Q: IndexNow API が 401/403 を返す

- A1: `INDEXNOW_KEY` 検証ファイル `/<KEY>.txt` が 200 で取得できるか
- A2: Vercel 環境変数 `INDEXNOW_ADMIN_TOKEN` が正確か (改行・空白混入)
- A3: bulk submit は Authorization ヘッダ必須

### Q: submit したのに Bing インデックスに出ない

- A1: 3-7 日待つ (Bing のクロール頻度は Google より低い場合あり)
- A2: ページ内容が薄い (300 字未満) と low quality 判定で除外される可能性
- A3: noindex タグが残っていないか確認 (`<meta name="robots" content="noindex">`)

---

## 関連ドキュメント

- logs/indexnow-final-submit.md (IndexNow 初回 bulk submit の記録)
- logs/indexnow-new-urls.txt (新規追加 URL の一覧)
- logs/gsc-submit-priority-urls.md (Google 側の優先 URL)
- logs/launch-execution-runbook.md (ローンチ実行手順書)
