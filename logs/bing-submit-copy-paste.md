# Bing Webmaster Tools sitemap submit コピペ用最終版

作成日: 2026-05-19
ベース: logs/bing-sitemap-resubmit-procedure.md
対象: https://www.bing.com/webmasters/
本番ホスト: https://www.kakomon-ai.jp/

本ファイルは Bing sitemap submit 時に「URL をそのままコピペするだけ」で投入可能な最終手順。
本人作業時間目安: 約 1 分 (sitemap 再 submit のみ)

---

## 事前確認 (作業前必読)

ローカルから sitemap が 200 で取得できることを確認:

```bash
curl -sI https://www.kakomon-ai.jp/sitemap.xml | head -1
```

期待値: `HTTP/2 200`
失敗時: Bing submit 前に本番デプロイ状態を /admin/launch-monitoring で確認。

---

## submit 手順 (Bing Webmaster Tools)

1. https://www.bing.com/webmasters/ にログイン (Microsoft アカウント)
2. プロパティ「kakomon-ai.jp」が登録されていることを確認
   - 未登録の場合は「サイトの追加」→ URL 入力 → DNS TXT または HTML タグ認証
3. 左メニュー「サイトマップ」をクリック
4. 「サイトマップを送信」または既存 sitemap.xml 行右側「再送信」をクリック
5. URL 入力欄に下記をコピペ:

---コピーここから---
https://www.kakomon-ai.jp/sitemap.xml
---コピーここまで---

6. 「送信」クリック
7. ステータスが「保留中」→ 数分後「成功」に変わることを確認
8. URL 件数が表示されることを確認 (sitemap index 経由で約 4,166 URL)

---

## 個別 URL Submission (任意 / 約 2 分)

Bing Webmaster Tools の「URL 送信」機能で個別 URL の即時 submit が可能。
1 日あたり 10 URL/プロパティのソフトリミット。

優先 URL (GSC 第一優先と同一):

---コピーここから---
https://www.kakomon-ai.jp/
https://www.kakomon-ai.jp/about
https://www.kakomon-ai.jp/transparency
https://www.kakomon-ai.jp/operator
https://www.kakomon-ai.jp/license
https://www.kakomon-ai.jp/essays/sc
https://www.kakomon-ai.jp/stats
https://www.kakomon-ai.jp/blog
---コピーここまで---

submit 方法:
1. 左メニュー「URL 送信」
2. 上記 URL を 1 行 1 URL で貼り付け
3. 「URL を送信」クリック
4. ステータス「成功」を確認

---

## IndexNow API 経由の通知 (自動化済 / 確認のみ)

本サイトは `/api/indexnow` エンドポイントを実装済 (PR #238)。
sitemap submit と並行で IndexNow も活用すれば、Bing/Yandex/Naver に即時通知される。

事前確認:

```bash
# IndexNow key 検証ファイルが 200 で取得できることを確認
curl -sI https://www.kakomon-ai.jp/$(echo $INDEXNOW_KEY).txt | head -1
```

bulk submit (本人が ADMIN_TOKEN を保有している場合のみ):

```bash
curl -X POST https://www.kakomon-ai.jp/api/indexnow/bulk \
  -H "Authorization: Bearer $INDEXNOW_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"source": "sitemap"}'
```

期待レスポンス:
- `submitted`: 約 4,166
- `status`: "ok"
- `indexnow_responses`: 全 200

---

## submit 後の確認

### 24 時間後

- 「サイトマップ」→ 送信 URL 数と検出 URL 数を比較
- 「レポート」→「サイト アクティビティ」でクロール数の増加を確認
- 「URL 送信」のステータスが全て「成功」

### 72 時間後

Bing 検索で `site:kakomon-ai.jp` を実行:
- 期待値: 1,000 URL 以上
- 未達の場合は IndexNow 再送信、または robots.txt / canonical を再点検

---

## トラブルシューティング

### Q: sitemap submit が「失敗」になる

- sitemap.xml の URL が 200 で開くか確認 (`curl -sI https://www.kakomon-ai.jp/sitemap.xml`)
- sitemap index 形式の場合、子 sitemap も 200 か確認
- robots.txt で sitemap がブロックされていないか確認
- 一度「削除」してから再 submit

### Q: IndexNow API が 401/403 を返す

- INDEXNOW_KEY 検証ファイル `/<KEY>.txt` が 200 で取得できるか
- Vercel 環境変数 INDEXNOW_ADMIN_TOKEN が正確か (改行・空白混入)
- bulk submit は Authorization ヘッダ必須

### Q: submit したのに Bing インデックスに出ない

- 3-7 日待つ (Bing は Google よりクロール頻度が低い場合あり)
- ページ内容が薄い (300 字未満) と低品質判定で除外される可能性
- noindex タグが残っていないか確認

---

## 関連ドキュメント

- logs/bing-sitemap-resubmit-procedure.md (本ファイルの原典)
- logs/indexnow-final-submit.md (IndexNow 初回 bulk submit の記録)
- logs/gsc-submit-copy-paste.md (Google 側並行 submit)
- logs/launch-execution-master.md (統合実行手順書)
