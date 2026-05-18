# Google Search Console URL Inspection コピペ用最終版

作成日: 2026-05-19
ベース: logs/gsc-submit-priority-urls.md
対象アカウント: kameking@anzen-ai.com
本番ホスト: https://www.kakomon-ai.jp/

本ファイルは GSC URL Inspection 投入時に「URL をそのままコピペするだけ」で submit 可能な最終リスト。
本人作業時間目安: Day-0 は約 5 分 (第一優先 8 URL のみ)

---

## 重要 — プロパティ切替確認 (作業前必読)

GSC ログイン直後は「sc-domain:anzen-ai-portal.jp」が既定プロパティになっている可能性が高い。
作業前に必ずプロパティを切り替えること。

切替手順:
1. https://search.google.com/search-console にログイン
2. 左上の「プロパティ選択」ドロップダウンをクリック
3. 「sc-domain:kakomon-ai.jp」を選択 (または「https://www.kakomon-ai.jp/」)
4. ドメインプロパティが未登録の場合は「プロパティを追加」→ DNS TXT 認証で登録

確認方法:
- 上部ヘッダーに「sc-domain:kakomon-ai.jp」と表示されていれば OK
- 「sc-domain:anzen-ai-portal.jp」と表示されていたら切替忘れ

---

## submit 手順 (各 URL 共通)

1. 上部の「URL を検査」テキストボックスをクリック
2. 対象 URL を貼り付け → Enter
3. 「Google index からのデータを取得しています…」が表示される (10-30 秒)
4. 結果画面が表示されたら「インデックス登録をリクエスト」をクリック
5. Live test が実行される (15-60 秒)
6. 「インデックス登録をリクエストしました」のトースト確認
7. 次の URL へ

注意: 1 日 10 URL/プロパティのソフトリミットがあるため、優先 8 URL は Day-0 に submit、
残りは Day-1, Day-2 に分けて投入。

---

## 第一優先 (Day-0 投入 / 8 URL)

ローンチ時点で最もインプレッションを期待するページ。
ハブ + 主要ランディング + 教育貢献体裁を伝えるページ。

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

各 URL について実施:
- URL Inspection 実行
- 「インデックス登録をリクエスト」クリック
- Live test PASS 確認 (canonical, mobile-friendly, ロボット制御)

---

## 第二優先 (Day-1 投入 / 10 URL)

試験区分別の主要ランディング。Day-0 で十分な熱が伝わった段階で submit。

---コピーここから---
https://www.kakomon-ai.jp/ap
https://www.kakomon-ai.jp/ip
https://www.kakomon-ai.jp/sg
https://www.kakomon-ai.jp/fe
https://www.kakomon-ai.jp/sc
https://www.kakomon-ai.jp/nw
https://www.kakomon-ai.jp/db
https://www.kakomon-ai.jp/pm
https://www.kakomon-ai.jp/faq
https://www.kakomon-ai.jp/community-guidelines
---コピーここまで---

---

## 第三優先 (Day-2〜Day-7 で順次 / 任意)

ハブ記事・成功事例・ロングテール。手動 submit は重要 URL に絞り、残りは
sitemap 経由のクロールに任せる。

---コピーここから---
https://www.kakomon-ai.jp/blog/ap-passing-strategies
https://www.kakomon-ai.jp/blog/sc-essay-structure
https://www.kakomon-ai.jp/blog/ipa-application-guide
https://www.kakomon-ai.jp/success-stories
https://www.kakomon-ai.jp/glossary
https://www.kakomon-ai.jp/keywords
https://www.kakomon-ai.jp/topics
https://www.kakomon-ai.jp/recommended-books
https://www.kakomon-ai.jp/mock-exam
https://www.kakomon-ai.jp/search
---コピーここまで---

submit 前確認: 上記 URL が 404 でないことを下記コマンドで確認。
404 の URL はリストから除外する。

```bash
for url in https://www.kakomon-ai.jp/blog/ap-passing-strategies https://www.kakomon-ai.jp/blog/sc-essay-structure https://www.kakomon-ai.jp/blog/ipa-application-guide https://www.kakomon-ai.jp/success-stories https://www.kakomon-ai.jp/glossary https://www.kakomon-ai.jp/keywords https://www.kakomon-ai.jp/topics https://www.kakomon-ai.jp/recommended-books https://www.kakomon-ai.jp/mock-exam https://www.kakomon-ai.jp/search; do
  echo -n "$url => "
  curl -sI "$url" | head -1
done
```

---

## sitemap 全件 submit (並行作業 / 約 1 分)

URL Inspection だけでなく、sitemap 全体の submit も並行で実施。

1. GSC 左メニュー「サイトマップ」
2. 「新しいサイトマップの追加」テキストボックスに下記を入力:

---コピーここから---
sitemap.xml
---コピーここまで---

3. 「送信」をクリック
4. 「ステータス: 成功」が表示されれば完了
5. 既に submit 済の場合は再 submit 不要、ステータス確認のみ

sitemap には 4,166 URL が含まれる (PR #238 で 4,136 + 30 件追加)。

---

## 確認指標

- 24 時間後: 第一優先 8 URL のうち、最低 5 件が「インデックス登録済み」または「検出済み」
- 72 時間後: 第二優先 10 URL のうち、最低 7 件が「インデックス登録済み」
- 7 日後: GSC「カバレッジ」レポートで有効 URL 数が 1,000 を超える

進捗が遅い場合の対処:
- robots.txt の Disallow 漏れ確認 (`curl -s https://www.kakomon-ai.jp/robots.txt`)
- sitemap.xml の `<lastmod>` 値確認 (古すぎないか)
- canonical タグ確認 (重複認識されていないか)
- Bing 経由の IndexNow 並行送信 (logs/bing-submit-copy-paste.md 参照)

---

## トラブルシューティング

### Q: 「URL is not on Google」と表示される

これは初回 submit 直後の期待値。「インデックス登録をリクエスト」を実行すれば OK。

### Q: 「リクエスト処理中にエラーが発生しました」

- robots.txt で当該 URL が Disallow になっていないか確認
- canonical が別 URL を指していないか確認
- 数時間後に再試行 (GSC の一時的なエラーの可能性)

### Q: ソフトリミット (10 URL/日) に到達

- 翌日の同時刻にリセットされる
- 急ぎの URL は IndexNow 並行送信で Bing 側に通知

---

## 関連ドキュメント

- logs/gsc-submit-priority-urls.md (本ファイルの原典)
- logs/gsc-setup-guide-kakomon.md (GSC 初期セットアップ)
- logs/bing-submit-copy-paste.md (Bing 側並行 submit)
- logs/launch-execution-master.md (統合実行手順書)
