# GSC URL Inspection 手順書 — 2026-05-16

## 概要

Google Search Console (GSC) の URL 検査機能を使って、主要URLをGoogleに個別申請する手順書。
IndexNow で 4,136 URL 一括申請済みだが、GSC からの個別申請でクロール優先度を上げられる。

---

## GSC へのアクセス

1. https://search.google.com/search-console を開く
2. プロパティを選択: **https://www.kakomon-ai.jp/** (wwwあり・確認済みプロパティ)
   ※ wwwなし (https://kakomon-ai.jp/) も登録済み。IndexNow 申請はwwwありで実施済み
3. 左ナビの「URL 検査」をクリック

---

## URL個別申請の手順

1. 「URL 検査」画面上部の検索バーに対象URLを入力
2. Enter を押してURL検査を実行
3. 「インデックス登録をリクエスト」ボタンをクリック
4. 「リクエストされました」の表示を確認
5. 次のURLへ（間隔：2〜3秒程度）

---

## 優先度別申請対象リスト

### 最優先（本日追加のハブ記事5本 + 重要ページ）

1. https://www.kakomon-ai.jp/blog/kakumon-gakushuu-science
2. https://www.kakomon-ai.jp/blog/ap-goukaku-go-koudo-senryaku
3. https://www.kakomon-ai.jp/blog/ipa-shiken-kumi-awase-senryaku
4. https://www.kakomon-ai.jp/blog/ipa-kyoutsuu-juyou-theme
5. https://www.kakomon-ai.jp/blog/ipa-sanko-mondaishu-2026
6. https://www.kakomon-ai.jp/stats
7. https://www.kakomon-ai.jp/about
8. https://www.kakomon-ai.jp/transparency

### 高優先（13試験区分トップページ）

9.  https://www.kakomon-ai.jp/ip
10. https://www.kakomon-ai.jp/sg
11. https://www.kakomon-ai.jp/fe
12. https://www.kakomon-ai.jp/ap
13. https://www.kakomon-ai.jp/st
14. https://www.kakomon-ai.jp/sa
15. https://www.kakomon-ai.jp/pm
16. https://www.kakomon-ai.jp/nw
17. https://www.kakomon-ai.jp/db
18. https://www.kakomon-ai.jp/es
19. https://www.kakomon-ai.jp/sc
20. https://www.kakomon-ai.jp/sm
21. https://www.kakomon-ai.jp/au

### 中優先（主要ブログ記事〜既存75+本）

IndexNow 送信済みだが Google 側のインデックスステータスを確認する：

GSC の「対象範囲」> 「インデックス登録済み」でブログURLが表示されているか確認。
未インデックスのものを優先して個別申請する。

主要ブログURL例:
- https://www.kakomon-ai.jp/blog
- https://www.kakomon-ai.jp/blog/ipa-shiken-zenkubun-hikaku
- https://www.kakomon-ai.jp/blog/ap-goukaku-benkyouhou
- https://www.kakomon-ai.jp/blog/sc-goukaku-benkyouhou

### 低優先（essays・個別問題ページ）

IndexNow 送信済み。GSCの「カバレッジ」レポートで進捗確認後、
未インデックスのものを随時申請。

---

## 注意事項

- GSCのURL検査は1日あたりの上限がある（具体的な数字は非公開だが50〜200件程度と推定）
- 「リクエスト済み」になってもクロールは非同期。反映まで数日〜数週間かかる場合がある
- 同じURLを何度もリクエストしても効果は増えない

---

## GSC で確認すべきこと

### インデックス登録状況

「インデックス登録」メニュー > 「ページ」で:
- インデックス登録済みページ数の推移
- インデックス未登録の理由（「クロール済み - 現在インデックス未登録」が要注意）

### GSCパフォーマンスで見るべき指標

「検索パフォーマンス」> 「検索結果」で:
- 表示回数・クリック数・CTR・掲載順位
- ブログURL別のパフォーマンス（ページ別フィルタ）

---

## Claude in Chrome を使った自動化案（本人選択で実施）

Claude in Chrome MCP を使えば、GSC の URL 申請を半自動化できる。
本Dispatchでは実施しないが、以下の手順で実行可能：

1. Chrome で GSC を開いた状態にする
2. Claude Code セッションで Claude in Chrome MCP を有効化
3. 「GSCのURL検査ページで以下のURLを順番に申請して」と指示
4. 各URL申請後のスクリーンショットで確認

ただし GSC は reCAPTCHA や動的レンダリングがあるため、
手動申請の方が確実な場合も多い。

---

## sitemap.xml 確認

sitemap.xml がGSCに登録されているか確認:
GSC > 「サイトマップ」> https://www.kakomon-ai.jp/sitemap.xml

ステータスが「成功」であれば、sitemapからのクロールは正常。
